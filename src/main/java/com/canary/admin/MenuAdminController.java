package com.canary.admin;

import com.alibaba.fastjson.JSON;
import com.canary.annotation.Role;
import com.canary.model.MenuModel;
import com.canary.service.MenuService;
import com.sunny.context.UserRequestContext;
import com.sunny.model.Result;
import com.sunny.tool.LoggerTool;
import com.sunny.validator.ValidatorTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 菜单管理控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-01
 */
@Controller
public class MenuAdminController {

    @Autowired
    private MenuService menuService;

    /**
     * 管理员添加菜单
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/menu/insert", method = RequestMethod.POST)
    @ResponseBody
    public Result insertMenu(MenuModel param) {
        LoggerTool.info("param is {}", JSON.toJSONString(param));

        //验证参数
        ValidatorTool.validateString(param.getName(), 1, 20, -1, "参数错误");
        ValidatorTool.validateString(param.getDescription(), 1, 20, -1, "参数错误");
        ValidatorTool.validateNumber(param.getRank(), -1, "参数错误");

        //设置用户
        param.setOperator(UserRequestContext.getUsername());
        param.setCreator(UserRequestContext.getUsername());

        //操作数据库
        Integer id = menuService.insert(param);

        Result<Object> result = new Result<Object>(id);
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 管理员删除菜单
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/menu/delete", method = RequestMethod.POST)
    @ResponseBody
    public Result deleteMenu(MenuModel param) {
        LoggerTool.info("param is {}", JSON.toJSONString(param));

        //验证参数
        ValidatorTool.validate(param, -1, "参数错误");
        ValidatorTool.validate(param.getId(), -1, "参数错误");

        //设置用户
        param.setOperator(UserRequestContext.getUsername());

        //删除
        menuService.delete(param);

        Result<Object> result = new Result<Object>();
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 管理员修改菜单
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/menu/update", method = RequestMethod.POST)
    @ResponseBody
    public Result updateMenu(MenuModel param) {
        LoggerTool.info("param is {}", JSON.toJSONString(param));

        //验证参数
        ValidatorTool.validateNumber(param.getId(), -1, "参数错误");
        ValidatorTool.validateString(param.getName(), 1, 20, -1, "参数错误");
        ValidatorTool.validateString(param.getDescription(), 1, 20, -1, "参数错误");
        ValidatorTool.validateNumber(param.getRank(), -1, "参数错误");

        //设置用户
        param.setOperator(UserRequestContext.getUsername());

        //修改
        menuService.update(param);

        Result<Object> result = new Result<Object>();
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 管理员查询菜单
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/menu/select", method = RequestMethod.GET)
    @ResponseBody
    public Result selectMenu() {
        LoggerTool.info("no param");

        //查询
        List<MenuModel> menuModelList = menuService.select();

        Result<Object> result = new Result<Object>(menuModelList);
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

}
