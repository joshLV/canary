package com.canary.controller;

import com.alibaba.fastjson.JSON;
import com.canary.service.WebsiteService;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.sunny.model.Result;
import com.sunny.tool.LoggerTool;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.util.ArrayList;
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

    static {
        try {
            //must start without /
            File file = ResourceUtils.getFile("classpath:config/develop/canary.properties");
            List<String> contentList = FileUtils.readLines(file);
            List<Long> localContent = Lists.transform(contentList, new Function<String, Long>() {
                @Override
                public Long apply(String input) {
                    return Long.parseLong(input);
                }
            });

            //在读取list内容的时候才会报异常，转换的时候和读取长度的时候不报异常。
//            if (localContent.size() > 0) {
//                System.out.println("load file local_deal_id.txt success.deal size is " + localContent.size());
//                for (Long content : localContent){
//                    System.out.println(content);
//                }
//            }

        } catch (IOException e) {
            System.out.println("can not load file local_deal_id.txt" + e.getMessage());
        }
    }

    private static List<Long> localUpgradeSuccessDeal = new ArrayList<Long>();

    static {
        try {
            File file = ResourceUtils.getFile("classpath:config/develop/canary.properties");
            List<String> contentList = FileUtils.readLines(file);
            for (String content : contentList) {
                localUpgradeSuccessDeal.add(Long.parseLong(content));
            }
            if (localUpgradeSuccessDeal.size() > 0) {
                System.out.println("load file local_deal_id.txt success.deal size is " + localUpgradeSuccessDeal.size());
            }
        } catch (Exception e) {
            System.out.println("can not load file local_deal_id.txt" + e.getMessage());
        }
    }

    /**
     * 查询启用的广告
     */
    @RequestMapping(value = "/ad", method = RequestMethod.GET)
    @ResponseBody
    public Result ad() {
        LoggerTool.getLogger().debug("no param");
        Result<Object> result = new Result<Object>();
        try {
            result.setCode(0);
            result.setMessage("success");
            result.setObject(websiteService.selectAd());
            LoggerTool.getLogger().debug("result " + JSON.toJSONString(result));
            return result;
        } catch (Exception e) {
            result.setCode(-1);
            result.setMessage("fail");
            LoggerTool.getLogger().error("exception" + e.getMessage());
            return result;
        }
    }

}
