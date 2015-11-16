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
 * 广告管理控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-05-07
 */
@Controller
public class AdAdminController {

    @Autowired
    private WebsiteService websiteService;

    /**
     * 管理员修改广告
     */
    @Role(role = {"Super"})
    @RequestMapping(value = "/admin/ad/update", method = RequestMethod.POST)
    @ResponseBody
    public Result updateAd(WebsiteModel param) {
        LoggerTool.getLogger().debug("param " + JSON.toJSONString(param));

        //验证参数
        String[] names = new String[]{WebsiteConstant.TOP_AD, WebsiteConstant.CENTER_AD, WebsiteConstant.BOTTOM_AD, WebsiteConstant.RIGHT_AD};
        ValidatorTool.validateStringAmong(param.getName(), names, "-1", "参数错误");
        ValidatorTool.validateString(param.getValue(), 1, 1024, "-1", "参数错误");

        //设置用户
        param.setOperator(UserRequestContext.getUsername());

        //修改
        websiteService.updateAd(param);

        Result<Object> result = new Result<Object>();
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 查询广告
     */
    @Role(role = {"Super"})
    @RequestMapping(value = "/admin/ad/select", method = RequestMethod.GET)
    @ResponseBody
    public Result link() {
        LoggerTool.info("no param");
        Result<Object> result = new Result<Object>(websiteService.selectAd());
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

}
