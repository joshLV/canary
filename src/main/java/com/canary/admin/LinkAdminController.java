package com.canary.admin;

import com.alibaba.fastjson.JSON;
import com.canary.annotation.Role;
import com.canary.common.WebsiteConstant;
import com.canary.model.WebsiteModel;
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
 * 友情链接管理控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-03-30
 */
@Controller
public class LinkAdminController {

    @Autowired
    private WebsiteService websiteService;

    /**
     * 管理员修改链接
     */
    @Role(role = {"SUPER"})
    @RequestMapping(value = "/admin/link/update", method = RequestMethod.POST)
    @ResponseBody
    public Result updateLink(String value) {
        LoggerTool.info("param is {}", JSON.toJSONString(value));

        //验证参数
        ValidatorTool.validateString(value, 1, 1024, -1, "参数错误");

        //设置用户
        WebsiteModel param = new WebsiteModel();
        param.setName(WebsiteConstant.LINK);
        param.setValue(value);
        param.setOperator(UserRequestContext.getUsername());

        //修改
        WebsiteModel object = websiteService.updateLink(param);

        Result<Object> result = new Result<Object>(object);
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 管理员查询友情链接
     */
    @Role(role = {"SUPER"})
    @RequestMapping(value = "/admin/link/select", method = RequestMethod.GET)
    @ResponseBody
    public Result selectLink() {
        LoggerTool.info("no param");

        //查询
        WebsiteModel object = websiteService.selectLink();

        Result<Object> result = new Result<Object>(object);
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

}
