package com.canary.admin;

import com.alibaba.fastjson.JSON;
import com.canary.annotation.Role;
import com.canary.param.WebsiteParam;
import com.canary.result.WebsiteResult;
import com.canary.service.WebsiteService;
import com.sunny.context.UserRequestContext;
import com.sunny.model.Result;
import com.sunny.tool.LoggerTool;
import com.sunny.validator.ValidatorTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 基础信息管理控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-29
 */
@Controller
public class WebsiteAdminController {

    @Autowired
    private WebsiteService websiteService;

    /**
     * 查询基础信息
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/website/select", method = RequestMethod.GET)
    @ResponseBody
    public Result selectWebsite() {
        LoggerTool.info("no param");

        WebsiteResult object = websiteService.select();

        Result<Object> result = new Result<Object>(object);
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 修改基础信息
     */
    @Role(role = {"Admin", "Super"})
    @SuppressWarnings(value = "unused,unchecked")
    @RequestMapping(value = "/admin/website/update", method = RequestMethod.POST)
    @ResponseBody
    public Result updateWebsite(WebsiteParam param) {
        LoggerTool.info("param is {}", JSON.toJSONString(param));

        //验证参数
        ValidatorTool.validate(param, -1, "param error");

        //设置操作人
        param.setOperator(UserRequestContext.getUsername());

        //修改
        websiteService.update(param);

        Result<Object> result = new Result<Object>();
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

}
