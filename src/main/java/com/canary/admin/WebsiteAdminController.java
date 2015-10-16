package com.canary.admin;

import com.alibaba.fastjson.JSON;
import com.canary.annotation.Role;
import com.canary.param.WebsiteParam;
import com.canary.service.WebsiteService;
import com.sunny.context.UserRequestContext;
import com.sunny.model.Result;
import com.sunny.tool.LoggerTool;
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
    @Role(role = {"Admin","Super"})
    @RequestMapping(value = "/admin/website/select", method = RequestMethod.GET)
    @ResponseBody
    public Result selectWebsite() {
        LoggerTool.getLogger().debug("no param");
        Result<Object> result = new Result<Object>();
        try {
            result.setObject(websiteService.select());

            result.setCode(0);
            result.setMessage("success");
            LoggerTool.getLogger().debug("result " + JSON.toJSONString(result));
            return result;
        } catch (Exception e) {
            result.setCode(-1);
            result.setMessage("fail");
            LoggerTool.getLogger().error("exception" + e.getMessage());
            return result;
        }
    }

    /**
     * 修改基础信息
     */
    @Role(role = {"Admin","Super"})
    @SuppressWarnings(value = "unused,unchecked")
    @RequestMapping(value = "/admin/website/update", method = RequestMethod.POST)
    @ResponseBody
    public Result updateWebsite(WebsiteParam param) {
        LoggerTool.getLogger().debug("param" + JSON.toJSONString(param));
        Result<Object> result = new Result<Object>();
        try {
            //验证参数
            if (param == null) {
                throw new RuntimeException("参数错误");
            }

            //设置操作人
            param.setOperator(UserRequestContext.getUsername());

            //修改
            websiteService.update(param);

            result.setCode(0);
            result.setMessage("success");
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
