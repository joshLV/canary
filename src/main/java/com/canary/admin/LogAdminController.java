package com.canary.admin;

import com.alibaba.fastjson.JSON;
import com.canary.annotation.Role;
import com.canary.model.LogModel;
import com.canary.service.LogService;
import com.sunny.model.Result;
import com.sunny.tool.LoggerTool;
import com.sunny.validator.ValidatorTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 管理员登陆记录控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-05-06
 */
@Controller
public class LogAdminController {

    @Autowired
    private LogService logService;

    /**
     * 查询管理员登陆日志
     */
    @Role(role = {"Super"})
    @RequestMapping(value = "/admin/log/select", method = RequestMethod.GET)
    @ResponseBody
    public Result selectLog(LogModel param) {
        LoggerTool.getLogger().debug("param " + JSON.toJSONString(param));
        Result<Object> result = new Result<Object>();
        try {
            //验证参数 用户名不验证 页数不能为空
            ValidatorTool.validateNumber(param.getCount(), 10, 50, "-1", "参数有误");
            ValidatorTool.validateNumber(param.getPage(), 1, Integer.MAX_VALUE, "-1", "参数有误");

            //查询
            LogModel model = new LogModel();
            model.setUsername(param.getUsername());
            model.setPage(param.getPage());
            model.setCount(param.getCount());
            result.setObject(logService.select(model));

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

}
