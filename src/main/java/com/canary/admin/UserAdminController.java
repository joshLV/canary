package com.canary.admin;

import com.alibaba.fastjson.JSON;
import com.canary.annotation.Role;
import com.canary.enums.RoleEnum;
import com.canary.model.UserModel;
import com.canary.param.InsertUserParam;
import com.canary.service.UserService;
import com.sunny.context.UserRequestContext;
import com.sunny.enums.QuestionEnum;
import com.sunny.enums.SexEnum;
import com.sunny.model.PagingResult;
import com.sunny.model.Result;
import com.sunny.tool.LoggerTool;
import com.sunny.validator.ValidatorTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 用户管理控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-05-08
 */
@Controller
public class UserAdminController {

    @Autowired
    private UserService userService;

    /**
     * 新增用户并设置用户级别
     */
    @Role(role = {"Super"})
    @RequestMapping(value = "/admin/user/insert", method = {RequestMethod.POST})
    @ResponseBody
    public Result insert(InsertUserParam param) {
        LoggerTool.info("param is {}", JSON.toJSONString(param));

        //验证参数
        ValidatorTool.validateString(param.getUsername(), 5, 20, "-1", "参数错误");
        ValidatorTool.validateString(param.getPassword(), 5, 20, "-1", "参数错误");
        ValidatorTool.validateStringAmong(param.getQuestion(), new String[]{QuestionEnum.Q1.toDescription(), QuestionEnum.Q2.toDescription(), QuestionEnum.Q3.toDescription(), QuestionEnum.Q4.toDescription(), QuestionEnum.Q5.toDescription(), QuestionEnum.Q6.toDescription()}, "-1", "参数错误");
        ValidatorTool.validateString(param.getAnswer(), 5, 20, "-1", "参数错误");
        ValidatorTool.validateStringAmong(param.getRole(), new String[]{RoleEnum.User.toName(), RoleEnum.Admin.toName(), RoleEnum.Super.toName()}, "-1", "参数错误");
        ValidatorTool.validateString(param.getEmail(), 5, 30, "-1", "参数错误");
        ValidatorTool.validateString(param.getMobile(), 11, 11, "-1", "参数错误");

        //设置用户
        param.setOperator(UserRequestContext.getUsername());
        param.setCreator(UserRequestContext.getUsername());

        //新增
        UserModel object = userService.insert(param);

        Result<Object> result = new Result<Object>(object);
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 删除用户
     */
    @Role(role = {"Super"})
    @RequestMapping(value = "/admin/user/delete", method = {RequestMethod.POST})
    @ResponseBody
    public Result delete(Integer id) {
        LoggerTool.info("id is {}", id);

        //验证参数
        ValidatorTool.validate(id, "-1", "参数错误");

        //删除
        UserModel model = new UserModel();
        model.setId(id);
        model.setOperator(UserRequestContext.getUsername());
        userService.delete(model);

        Result<Object> result = new Result<Object>();
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 修改用户
     */
    @Role(role = {"Super"})
    @RequestMapping(value = "/admin/user/update", method = {RequestMethod.POST})
    @ResponseBody
    public Result update(UserModel param) {
        LoggerTool.info("param is {}", JSON.toJSONString(param));

        //验证参数
        ValidatorTool.validateNumber(param.getId(), "-1", "参数错误");
        ValidatorTool.validateString(param.getNickname(), 5, 20, "-1", "参数错误");
        ValidatorTool.validateString(param.getUsername(), 5, 20, "-1", "参数错误");
        ValidatorTool.validateString(param.getPassword(), 5, 20, "-1", "参数错误");
        ValidatorTool.validateStringAmong(param.getQuestion(), new String[]{QuestionEnum.Q1.toDescription(), QuestionEnum.Q2.toDescription(), QuestionEnum.Q3.toDescription(), QuestionEnum.Q4.toDescription(), QuestionEnum.Q5.toDescription(), QuestionEnum.Q6.toDescription()}, "-1", "参数错误");
        ValidatorTool.validateString(param.getAnswer(), 5, 20, "-1", "参数错误");
        ValidatorTool.validateStringAmong(param.getRole(), new String[]{RoleEnum.User.toName(), RoleEnum.Admin.toName(), RoleEnum.Super.toName()}, "-1", "参数错误");
        ValidatorTool.validateString(param.getEmail(), 5, 30, "-1", "参数错误");
        ValidatorTool.validateString(param.getMobile(), 11, 11, "-1", "参数错误");
        //如果设置了性别，性别必须是性别枚举中四种类型中的一种
        if (param.getSex() != null) {
            ValidatorTool.validateStringAmong(param.getSex(), new String[]{SexEnum.Man.toName(), SexEnum.Woman.toName(), SexEnum.Other.toName(), SexEnum.Secret.toName()}, "-1", "参数错误");
        }
//            ValidatorTool.validateString(param.getQq(), 5, 12, "-1", "参数错误");
//            ValidatorTool.validateNumber(param.getAge(), "-1", "参数错误");
//            ValidatorTool.validate(param.getBirthday(), "-1", "参数错误");

        //设置用户
        param.setOperator(UserRequestContext.getUsername());

        //修改
        userService.update(param);

        Result<Object> result = new Result<Object>();
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 分页查询用户
     */
    @Role(role = {"Super"})
    @RequestMapping(value = "/admin/user/select", method = {RequestMethod.GET})
    @ResponseBody
    public Result select(UserModel param) {
        LoggerTool.info("param is {}", JSON.toJSONString(param));

        ValidatorTool.validateNumber(param.getPage(), 1, Integer.MAX_VALUE, "-1", "参数有误");
        //验证参数
        ValidatorTool.validateNumber(param.getCount(), 10, 50, "-1", "参数有误");
        ValidatorTool.validateNumber(param.getPage(), 1, Integer.MAX_VALUE, "-1", "参数有误");

        //查询
        PagingResult<UserModel> object = userService.select(param);

        Result<Object> result = new Result<Object>(object);
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

}