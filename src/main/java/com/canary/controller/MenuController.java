package com.canary.controller;

import com.alibaba.fastjson.JSON;
import com.sunny.model.Result;
import com.canary.service.MenuService;
import com.sunny.tool.LoggerTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
        Result<Object> result = new Result<Object>();
        result.setCode(0);
        result.setMessage("success");
        result.setObject(menuService.selectWithIndex());
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

}
