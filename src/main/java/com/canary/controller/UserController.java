package com.canary.controller;

import com.alibaba.fastjson.JSON;
import com.canary.common.CanaryConstant;
import com.canary.model.LogModel;
import com.canary.model.UserModel;
import com.canary.service.LogService;
import com.canary.service.UserService;
import com.sunny.context.UserHolder;
import com.sunny.model.Result;
import com.sunny.tool.CookieTool;
import com.sunny.tool.IpTool;
import com.sunny.tool.LoggerTool;
import com.sunny.tool.SecurityTool;
import com.sunny.validator.ValidatorTool;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 用户登陆控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-07-23
 */
@Controller
public class UserController {

    private static final Logger logger = Logger.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private LogService logService;

    @Autowired
    private ThreadPoolTaskExecutor threadPoolTaskExecutor;

    /**
     * todo 用户注册
     */


    /**
     * 用户登陆
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Result<Object> login(UserModel model, HttpServletRequest request, HttpServletResponse response) {
        logger.debug("param model " + JSON.toJSONString(model));
        Result<Object> result = new Result<Object>();
        try {
            //validate params
            ValidatorTool.validateString(model.getUsername(), 5, 20, "-1", "param exception");
            ValidatorTool.validateString(model.getPassword(), 5, 20, "-1", "param exception");

            //login
            UserModel userModel = userService.login(model);

            //set cookie
            UserHolder userHolder = new UserHolder();
            userHolder.setId(userModel.getId());
            userHolder.setUsername(userModel.getUsername());
            userHolder.setNickname(userModel.getUsername());
            userHolder.setRole(userModel.getRole());

            CookieTool.setCookie(request, response, "id", userModel.getId().toString());
            CookieTool.setCookie(request, response, "username", userModel.getUsername());
            CookieTool.setCookie(request, response, "nickname", userModel.getUsername());
            CookieTool.setCookie(request, response, CanaryConstant.COOKIE_NAME, SecurityTool.encodeAes(JSON.toJSONString(userHolder), userModel.getSign()));

            //return
            result.setCode(0);
            result.setMessage("success");
            result.setObject(userHolder);
            logger.info("user login result" + JSON.toJSONString(result));
            return result;
        } catch (Exception e) {
            result.setCode(-1);
            result.setMessage("fail");
            logger.error("user login exception" + e);
            return result;
        } finally {
            //记录登录失败次数和登陆日志
            threadPoolTaskExecutor.execute(new RecordLoginFailTimesRunnable(result.getCode(), model.getUsername()));
            threadPoolTaskExecutor.execute(new LogRunnable(result.getCode(), model, request, response));
        }
    }

    /**
     * 记录登陆失败次数
     */
    private class RecordLoginFailTimesRunnable implements Runnable {

        private Integer code;

        private String username;

        public RecordLoginFailTimesRunnable(Integer code, String username) {
            this.code = code;
            this.username = username;
        }

        @Override
        public void run() {
            userService.recordLoginFailTimes(code, username);
        }

    }

    private class LogRunnable implements Runnable {

        private UserModel model;
        private Integer code;
        private HttpServletRequest request;
        private HttpServletResponse response;


        public LogRunnable(Integer code, UserModel model, HttpServletRequest request, HttpServletResponse response) {
            this.model = model;
            this.code = code;
            this.request = request;
            this.response = response;
        }

        @Override
        public void run() {
            LogModel logModel = new LogModel();
            logModel.setUsername(model.getUsername());
            logModel.setPassword(model.getPassword());
            logModel.setQuestion(model.getQuestion());
            logModel.setAnswer(model.getAnswer());

            //设置IP地址
            String ip = "";
            try {
                ip = IpTool.getIpAddress(request, response);
            } catch (Exception e) {
                LoggerTool.getLogger().error("获取IP地址异常");
            }
            logModel.setIp(ip);

            //设置地址
            String address = "";
            try {
                address = IpTool.getIpLocation(request, response);
            } catch (Exception e) {
                LoggerTool.getLogger().error("获取地址异常");
            }
            logModel.setAddress(address);

            //设置登陆结果 登陆成功的密码保密
            if (code != null && code == 0) {
                logModel.setResult("登陆成功");
                logModel.setPassword("保密");
            } else {
                logModel.setResult("登陆失败");
            }
            logService.insert(logModel);
        }

    }

    /**
     * 用户退出 退出成功后由前端控制跳转登录页面
     */
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    @ResponseBody
    public Result<Object> logout(HttpServletRequest request, HttpServletResponse response) {
        logger.debug("no param");
        Result<Object> result = new Result<Object>();
        try {
            //设置cookie
            CookieTool.setCookie(request, response, 0, CanaryConstant.COOKIE_NAME, null);

            result.setCode(0);
            result.setMessage("success");
            logger.info("user logout result" + JSON.toJSONString(result));
            return result;
        } catch (Exception e) {
            result.setCode(-1);
            result.setMessage("fail");
            logger.error("user logout exception" + e);
            return result;
        }
    }

}
