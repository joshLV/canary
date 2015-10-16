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
    @Role(role = {"Super"})
    @RequestMapping(value = "/admin/link/update", method = RequestMethod.POST)
    @ResponseBody
    public Result updateLink(String value) {
        LoggerTool.getLogger().debug("param " + JSON.toJSONString(value));
        Result<Object> result = new Result<Object>();
        try {
            //验证参数
            ValidatorTool.validateString(value, 1, 1024, "-1", "参数错误");

            //设置用户
            WebsiteModel param = new WebsiteModel();
            param.setName(WebsiteConstant.LINK);
            param.setValue(value);
            param.setOperator(UserRequestContext.getUsername());

            //修改
            websiteService.updateLink(param);

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
     * 管理员查询友情链接
     */
    @Role(role = {"Super"})
    @RequestMapping(value = "/admin/link/select", method = RequestMethod.GET)
    @ResponseBody
    public Result selectLink() {
        LoggerTool.getLogger().debug("no param");
        Result<Object> result = new Result<Object>();
        try {
            //查询
            result.setObject(websiteService.selectLink());

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
