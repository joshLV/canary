package org.extra.controller;

import com.alibaba.fastjson.JSON;
import org.extra.model.AdModel;
import org.extra.service.AdService;
import com.sunny.context.UserRequestContext;
import com.sunny.enums.EnableStatusEnum;
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
    private AdService adService;

    /**
     * 管理员修改广告
     */
    @RequestMapping(value = "/admin/ad/update", method = RequestMethod.POST)
    @ResponseBody
    public Result updateAd(AdModel param) {
        LoggerTool.getLogger().debug("param " + JSON.toJSONString(param));
        Result<Object> result = new Result<Object>();
        try {
            //验证参数
            ValidatorTool.validateNumber(param.getId(), "-1", "参数错误");
            ValidatorTool.validateString(param.getScript(), 1, 1024, "-1", "参数错误");
            ValidatorTool.validateStringAmong(param.getEnableStatus(), new String[]{EnableStatusEnum.Enable.toName(), EnableStatusEnum.Disable.toName()}, "-1", "参数错误");

            //设置用户
            param.setOperator(UserRequestContext.getUsername());

            //修改
            adService.update(param);

            result.setCode(0);
            result.setMessage("success");
            LoggerTool.getLogger().debug("result " + JSON.toJSONString(result));
            return result;
        } catch (Exception e) {
            result.setCode(-1);
            result.setMessage("fail");
            LoggerTool.getLogger().error("exception " + e.getMessage());
            return result;
        }
    }

    /**
     * 查询广告
     */
    @RequestMapping(value = "/admin/ad/select", method = RequestMethod.POST)
    @ResponseBody
    public Result link() {
        LoggerTool.getLogger().debug("no param");
        Result<Object> result = new Result<Object>();
        try {
            result.setCode(0);
            result.setMessage("success");
            result.setObject(adService.select());
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
