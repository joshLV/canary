package com.canary.controller;

import com.alibaba.fastjson.JSON;
import com.canary.service.WebsiteService;
import com.sunny.model.Result;
import com.sunny.tool.LoggerTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 友情链接控制层 RestController中无法跳转链接
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-03-30
 */
@Controller
public class LinkController {

    @Autowired
    private WebsiteService websiteService;

    /**
     * 友情链接
     */
    @RequestMapping(value = "/link", method = RequestMethod.GET)
    @ResponseBody
    public Result link() {
        LoggerTool.debug("no param");
        Result<Object> result = new Result<Object>();
        result.setCode(0);
        result.setMessage("success");
        result.setObject(websiteService.selectLink());
        LoggerTool.debug("result is {}", JSON.toJSONString(result));
        return result;
    }

}
