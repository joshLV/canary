package com.canary.controller;

import com.alibaba.fastjson.JSON;
import com.sunny.model.Result;
import com.canary.service.WebsiteService;
import com.sunny.tool.LoggerTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 站点信息控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-02
 */
@Controller
public class WebsiteController {

    @Autowired
    private WebsiteService websiteService;

    /**
     * 获取站点信息
     */
    @RequestMapping(value = "/website", method = RequestMethod.GET)
    @ResponseBody
    public Result website() {
        LoggerTool.info("no param");
        Result<Object> result = new Result<Object>();
        result.setCode(0);
        result.setMessage("success");
        result.setObject(websiteService.select());
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 关于我们
     */
    @RequestMapping(value = "/about", method = RequestMethod.GET)
    @ResponseBody
    public Result about() {
        LoggerTool.info("no param");
        Result<Object> result = new Result<Object>();
        result.setCode(0);
        result.setMessage("success");
        result.setObject(websiteService.selectAbout());
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 联系我们
     */
    @RequestMapping(value = "/contact", method = RequestMethod.GET)
    @ResponseBody
    public Result contact() {
        LoggerTool.info("no param");
        Result<Object> result = new Result<Object>();
        result.setCode(0);
        result.setMessage("success");
        result.setObject(websiteService.selectContact());
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 投稿
     */
    @RequestMapping(value = "/contribution", method = RequestMethod.GET)
    @ResponseBody
    public Result contribution() {
        LoggerTool.info("no param");
        Result<Object> result = new Result<Object>();
        result.setCode(0);
        result.setMessage("success");
        result.setObject(websiteService.selectContribution());
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 版权声明
     */
    @RequestMapping(value = "/copyright", method = RequestMethod.GET)
    @ResponseBody
    public Result copyright() {
        LoggerTool.info("no param");
        Result<Object> result = new Result<Object>();
        result.setCode(0);
        result.setMessage("success");
        result.setObject(websiteService.selectCopyright());
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

}
