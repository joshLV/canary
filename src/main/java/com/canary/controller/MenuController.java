package com.canary.controller;

import com.alibaba.fastjson.JSON;
import com.canary.model.MenuModel;
import com.sunny.model.Result;
import com.canary.service.MenuService;
import com.sunny.tool.LoggerTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 菜单控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-01
 */
@Controller
public class MenuController {

    @Autowired
    private MenuService menuService;

    @RequestMapping(value = "/menu", method = RequestMethod.GET)
    @ResponseBody
    public Result menu() {
        LoggerTool.info("no param");
        List<MenuModel> data =  menuService.selectWithIndex();
        Result<Object> result = new Result<Object>(data);
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

}
