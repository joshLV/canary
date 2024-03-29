package com.canary.controller;

import com.alibaba.fastjson.JSON;
import com.canary.model.WebsiteModel;
import com.canary.service.WebsiteService;
import com.sunny.model.Result;
import com.sunny.tool.LoggerTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 广告控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-03-30
 */
@RestController
public class AdController {

    @Autowired
    private WebsiteService websiteService;

    /**
     * 查询启用的广告
     */
    @RequestMapping(value = "/ad", method = RequestMethod.GET)
    @ResponseBody
    public Result ad() {
        LoggerTool.info("no param");

        List<WebsiteModel> data = websiteService.selectAd();
        Result<Object> result = new Result<Object>(data);
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

}
