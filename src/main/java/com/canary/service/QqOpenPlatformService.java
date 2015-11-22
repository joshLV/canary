package com.canary.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.sunny.exception.CustomException;
import com.sunny.tool.LoggerTool;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * OpenPlatformService
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-11-11
 */
@Service
public class QqOpenPlatformService {

    private  String clientId = "101268614";

//    @Value("${}")
    private  String clientSecret = "0887aaff0cd3501ea3bd35bc972f822f";

//    @Value("${}")
    private  String redirectUri = "http://127.0.0.1/login/qq";

    /**
     * 通过Authorization Code获取用户信息
     *
     * @param authorizationCode 授权码
     */
    public  QqUserModel getUserByAuthorizationCode(String authorizationCode) {
        //通过auth code获取access token
        AccessTokenModel accessTokenModel = getAccessToken(authorizationCode);
        String accessToken = accessTokenModel.getAccessToken();

        //todo 特殊处理
        accessTokenModel.getExpiresIn();
        accessTokenModel.getRefreshToken();

        //通过access token获取用户信息
        return getUserByAccessToken(accessToken);
    }

    /**
     * 通过access token 获取qq信息
     *
     * @param accessToken 默认有效期三个月
     */
    public  QqUserModel getUserByAccessToken(String accessToken) {
        QqUserModel result = new QqUserModel();
        result.setAccessToken(accessToken);

        //通过access token 获取openid
        String openId = getOpenId(accessToken);
        result.setOpenId(openId);

        //通过openid获取用户信息
        UserInfo qqUserInfo = getUserInfo(accessToken, openId);
        result.setNickname(qqUserInfo.getNickname());
        result.setGender(qqUserInfo.gender);
        result.setQqImage(qqUserInfo.getFigureUrlQq1());
        return result;
    }

    private  AccessTokenModel getAccessToken(String authorizationCode) {
        AccessTokenModel result = new AccessTokenModel();

        //通过authorization code获取access token
        String url = "https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id={client_id}&client_secret={client_secret}&code={authorization_code}&redirect_uri={redirect_uri}";
        url = url.replace("{client_id}", clientId);
        url = url.replace("{client_secret}", clientSecret);
        url = url.replace("{authorization_code}", authorizationCode);
        url = url.replace("{redirect_uri}", redirectUri);
        RestTemplate restTemplate = new RestTemplate();
        String stringResult = restTemplate.getForObject(url, String.class);

        //解析结果，格式为access_token=EE2195405DA4068DB7758BEC&expires_in=7776000&refresh_token=1C3C7C3F9C33E5EC21843BF99F767D88
        String[] keyValues = stringResult.split("&");
        for (String keyValue : keyValues) {
            String[] tmp = keyValue.split("=");
            if ("access_token".equals(tmp[0])) {
                result.setAccessToken(tmp[1]);
            } else if ("expires_in".equals(tmp[0])) {
                result.setExpiresIn(Long.parseLong(tmp[1]));
            } else if ("refresh_token".equals(tmp[0])) {
                result.setRefreshToken(tmp[1]);
            }
        }
        return result;
    }

    private  String getOpenId(String accessToken) {
        //通过access token 获取openid
        String url = "https://graph.qq.com/oauth2.0/me?access_token={access_token}".replace("{access_token}", accessToken);
        RestTemplate restTemplate = new RestTemplate();
        String stringResult = restTemplate.getForObject(url, String.class);

        //解析 正确结果和错误结果格式不一样
//        callback({
//            error: 100016,
//            error_description: "access token check failed"
//        })
//        callback({
//            client_id: "222425",
//            openid: "CCD59349785C52953056BE66C2F6FA37"
//        })
        String json = stringResult.replace("callback( ", "").replace(" );", "");
        JSONObject jsonObject = JSON.parseObject(json);
        if (jsonObject.containsKey("openid")) {
            return jsonObject.getString("openid");
        } else {
            throw new CustomException(jsonObject.getInteger("error"), jsonObject.getString("error_description"));
        }
    }

    /**
     * 根据access token 和openid获取用户信息
     *
     * @param accessToken 访问令牌
     * @param openId      openid
     * @return 结果
     */
    private  UserInfo getUserInfo(String accessToken, String openId) {
        UserInfo result = new UserInfo();

        //请求用户信息
        String url = "https://graph.qq.com/user/get_user_info?access_token={access_token}&oauth_consumer_key={client_id}&openid={openid}";
        url = url.replace("{access_token}", accessToken).replace("{client_id}", clientId).replace("{openid}", openId);
        RestTemplate restTemplate = new RestTemplate();
        String json = restTemplate.getForObject(url, String.class);

        //解析
        JSONObject jsonObject = JSON.parseObject(json);
        Integer ret = jsonObject.getInteger("ret");
        String msg = jsonObject.getString("msg");
        if (ret < 0) {
            throw new CustomException(ret, msg);
        }
        result.setRet(ret);
        result.setMsg(msg);
        result.setNickname(jsonObject.getString("nickname"));
        result.setFigureUrl(jsonObject.getString("figureurl"));
        result.setFigureUrl1(jsonObject.getString("figureurl_1"));
        result.setFigureUrl2(jsonObject.getString("figureurl_2"));
        result.setFigureUrlQq1(jsonObject.getString("figureurl_qq_1"));
        result.setFigureUrlQq2(jsonObject.getString("figureurl_qq_2"));
        result.setGender(jsonObject.getString("gender"));
        result.setIsYellowVip(jsonObject.getString("is_yellow_vip"));
        result.setYellowVipLevel(jsonObject.getString("yellow_vip_level"));
        result.setIsYellowYearVip(jsonObject.getString("is_yellow_year_vip"));

        return result;
    }

    public static void main(String[] args) {
        QqOpenPlatformService service = new QqOpenPlatformService();
        LoggerTool.info("get qq info by auth token result is {}", JSON.toJSONString(service.getUserByAuthorizationCode("")));
        LoggerTool.info("get qq info by access token result is {}", JSON.toJSONString(service.getUserByAccessToken("")));
    }

    @SuppressWarnings("unused")
    public static class AccessTokenModel {
        /**
         * 访问令牌
         */
        private String accessToken;

        /**
         * 过期时间，单位秒
         */
        private Long expiresIn;

        /**
         * 刷新令牌
         */
        private String refreshToken;

        public String getAccessToken() {
            return accessToken;
        }

        public void setAccessToken(String accessToken) {
            this.accessToken = accessToken;
        }

        public Long getExpiresIn() {
            return expiresIn;
        }

        public void setExpiresIn(Long expiresIn) {
            this.expiresIn = expiresIn;
        }

        public String getRefreshToken() {
            return refreshToken;
        }

        public void setRefreshToken(String refreshToken) {
            this.refreshToken = refreshToken;
        }
    }

    @SuppressWarnings("unused")
    public static class UserInfo {

        private Integer ret;
        private String msg;
        private String nickname;
        private String figureUrl;
        private String figureUrl1;
        private String figureUrl2;
        private String figureUrlQq1;
        private String figureUrlQq2;
        private String gender;
        private String isYellowVip;
        private String yellowVipLevel;
        private String isYellowYearVip;

        public Integer getRet() {
            return ret;
        }

        public void setRet(Integer ret) {
            this.ret = ret;
        }

        public String getMsg() {
            return msg;
        }

        public void setMsg(String msg) {
            this.msg = msg;
        }

        public String getNickname() {
            return nickname;
        }

        public void setNickname(String nickname) {
            this.nickname = nickname;
        }

        public String getFigureUrl() {
            return figureUrl;
        }

        public void setFigureUrl(String figureUrl) {
            this.figureUrl = figureUrl;
        }

        public String getFigureUrl1() {
            return figureUrl1;
        }

        public void setFigureUrl1(String figureUrl1) {
            this.figureUrl1 = figureUrl1;
        }

        public String getFigureUrl2() {
            return figureUrl2;
        }

        public void setFigureUrl2(String figureUrl2) {
            this.figureUrl2 = figureUrl2;
        }

        public String getFigureUrlQq1() {
            return figureUrlQq1;
        }

        public void setFigureUrlQq1(String figureUrlQq1) {
            this.figureUrlQq1 = figureUrlQq1;
        }

        public String getFigureUrlQq2() {
            return figureUrlQq2;
        }

        public void setFigureUrlQq2(String figureUrlQq2) {
            this.figureUrlQq2 = figureUrlQq2;
        }

        public String getGender() {
            return gender;
        }

        public void setGender(String gender) {
            this.gender = gender;
        }

        public String getIsYellowVip() {
            return isYellowVip;
        }

        public void setIsYellowVip(String isYellowVip) {
            this.isYellowVip = isYellowVip;
        }

        public String getYellowVipLevel() {
            return yellowVipLevel;
        }

        public void setYellowVipLevel(String yellowVipLevel) {
            this.yellowVipLevel = yellowVipLevel;
        }

        public String getIsYellowYearVip() {
            return isYellowYearVip;
        }

        public void setIsYellowYearVip(String isYellowYearVip) {
            this.isYellowYearVip = isYellowYearVip;
        }
    }

    @SuppressWarnings("unused")
    public static class QqUserModel {
        /**
         * 访问令牌
         */
        private String accessToken;

        /**
         * 用户id
         */
        private String openId;

        /**
         * 昵称
         */
        private String nickname;

        /**
         * 性别
         */
        private String gender;

        /**
         * qq头像
         */
        private String qqImage;

        public String getAccessToken() {
            return accessToken;
        }

        public void setAccessToken(String accessToken) {
            this.accessToken = accessToken;
        }

        public String getOpenId() {
            return openId;
        }

        public void setOpenId(String openId) {
            this.openId = openId;
        }

        public String getNickname() {
            return nickname;
        }

        public void setNickname(String nickname) {
            this.nickname = nickname;
        }

        public String getGender() {
            return gender;
        }

        public void setGender(String gender) {
            this.gender = gender;
        }

        public String getQqImage() {
            return qqImage;
        }

        public void setQqImage(String qqImage) {
            this.qqImage = qqImage;
        }
    }

}
