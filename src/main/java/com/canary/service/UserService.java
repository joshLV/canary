package com.canary.service;

import com.canary.common.CanaryConstant;
import com.canary.dao.UserDao;
import com.canary.model.UserModel;
import com.canary.param.InsertUserParam;
import com.sunny.enums.SexEnum;
import com.sunny.exception.CustomException;
import com.sunny.model.PagingResult;
import com.sunny.tool.CommonTool;
import com.sunny.tool.SecurityTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * UserService
 *
 * @author sunny
 * @version 1.0.0
 * @since 2014-11-10
 */
@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    /**
     * login
     *
     * @return user info
     */
    public UserModel login(UserModel model) {
        UserModel tmpModel = new UserModel();
        tmpModel.setUsername(model.getUsername());
        tmpModel.setQuestion(model.getQuestion());
        tmpModel.setAnswer(model.getAnswer());

        // 查询用户
        List<UserModel> users = userDao.select(tmpModel);
        if (users == null || users.size() != 1) {
            throw new RuntimeException("登陆失败");
        }

        UserModel user = users.get(0);
        //如果是管理员用户，需要判断问题和答案必须存在
//        String question = model.getQuestion();
//        String answer = model.getAnswer();
//        if ((RoleEnum.ADMIN.getName().equals(user.getRole()) || RoleEnum.SUPER.getName().equals(user.getRole()))
//                && (question == null || question.trim().length() <= 0 || answer == null || answer.trim().length() <= 0)) {
//            throw new RuntimeException("管理员登录请输入问题和答案");
//        }

        //判断用户登录失败次数是否超过规定次数
        if (System.currentTimeMillis() - user.getOperateTime().getTime() < CanaryConstant.LOGIN_FAIL_INTERVAL * 1000 * 60 * 60
                && user.getLoginFailTimes() >= CanaryConstant.MAX_LOGIN_FAIL_TIMES) {
            throw new RuntimeException("错误次数超过上限，请" + CanaryConstant.LOGIN_FAIL_INTERVAL + "小时后再试");
        }

        //判断用户密码是否正确
        String password = SecurityTool.encodeAes(model.getPassword(), user.getSign());
        if (password.equals(user.getPassword())) {
            return user;
        } else {
            throw new RuntimeException("登陆失败,用户名或密码错误");
        }
    }

    /**
     * 根据主键和用户名查询私钥
     *
     * @param id       管理员主键
     * @param username 管理员用户名
     * @return 私钥
     */
    public String selectSign(Long id, String username) {
        //查询私钥
        UserModel tmpModel = new UserModel();
        tmpModel.setId(id);
        tmpModel.setUsername(username);

        List<UserModel> users = userDao.select(tmpModel);
        if (users != null && users.size() == 1) {
            return users.get(0).getSign();
        } else {
            throw new RuntimeException("查询私钥失败");
        }
    }

    /**
     * insert user
     *
     * @param param param
     * @return return data is the inserted data
     */
    @Transactional
    public UserModel insert(InsertUserParam param) {
        //select if the user exist or not
        UserModel model = new UserModel();
        model.setUsername(param.getUsername());
        List<UserModel> tmp = userDao.select(model);
        if (tmp != null && tmp.size() > 0) {
            throw new RuntimeException("the user exist");
        }

        //昵称设置为用户名，用户可以自由修改
        model.setNickname(param.getUsername());
        //生成秘钥 加密密码
        String sign = CommonTool.getUuid();
        model.setPassword(SecurityTool.encodeAes(param.getPassword(), sign));
        model.setQuestion(param.getQuestion());
        model.setAnswer(param.getAnswer());
        model.setRole(param.getRole());
        model.setSign(sign);
        model.setEmail(param.getEmail());
        model.setMobile(param.getMobile());
        model.setQq(param.getQq());

        //未填写性别的设置为保密
        if (param.getSex() == null || param.getSex().trim().length() <= 0) {
            model.setSex(SexEnum.SECRET.getName());
        } else {
            model.setSex(param.getSex());
        }
        model.setAge(param.getAge());
        model.setBirthday(param.getBirthday());
        model.setImage(CanaryConstant.DEFAULT_AVATAR_PATH);
        model.setOperator(param.getOperator());
        model.setCreator(param.getCreator());
        Long id = userDao.insert(model);

        //select the insert user
        model.setId(id);
        List<UserModel> insertDataList = userDao.select(model);
        if (insertDataList != null && insertDataList.size() == 1) {
            return insertDataList.get(0);
        } else {
            throw new CustomException(-1, "select data exception");
        }
    }

    /**
     * delete user
     *
     * @param model id and operator
     */
    public void delete(UserModel model) {
        userDao.delete(model);
    }

    /**
     * 管理员修改用户信息，无需验证密码直接修改
     */
    public void update(UserModel model) {
        UserModel tmpModel = new UserModel();
        tmpModel.setId(model.getId());
        tmpModel.setNickname(model.getNickname());
        tmpModel.setUsername(model.getUsername());
        //如果修改密码则重新生成sign，让用户当前cookie解析失败，重新登陆，如果不修改密码则不生成sign
        if (model.getPassword() != null && model.getPassword().trim().length() > 0) {
            String sign = CommonTool.getUuid();
            tmpModel.setPassword(SecurityTool.encodeAes(model.getPassword(), sign));
            tmpModel.setSign(sign);
        }
        tmpModel.setQuestion(model.getQuestion());
        tmpModel.setAnswer(model.getAnswer());
        tmpModel.setRole(model.getRole());
        tmpModel.setEmail(model.getEmail());
        tmpModel.setMobile(model.getMobile());
        tmpModel.setQq(model.getQq());
        tmpModel.setSex(model.getSex());
        tmpModel.setAge(model.getAge());
        tmpModel.setBirthday(model.getBirthday());
        tmpModel.setLoginFailTimes(model.getLoginFailTimes());
        tmpModel.setOperator(model.getOperator());
        userDao.update(tmpModel);
    }

    /**
     * 记录登陆失败次数登陆成功设置错误次数为0，登陆失败设置错误次数加1
     *
     * @param code     成功还是失败状态码，0代表成功
     * @param username 用户名
     */
    public void recordLoginFailTimes(Integer code, String username) {
        UserModel user = new UserModel();
        user.setUsername(username);
        if (code == 0) {
            user.setLoginFailTimes(0);
            update(user);
        } else {
            userDao.updateLoginFailTimes(user);
        }
    }

    /**
     * select the total users
     */
    public PagingResult<UserModel> select(UserModel model) {
        //查询数据
        List<UserModel> data = userDao.select(model);

        //查询总数
        Long total = userDao.selectTotalCount(model);

        //返回
        PagingResult<UserModel> result = new PagingResult<UserModel>();
        result.setTotal(total);
        result.setData(data);

        return result;
    }

}
