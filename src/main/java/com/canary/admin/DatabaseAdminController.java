package com.canary.admin;

import com.alibaba.fastjson.JSON;
import com.canary.annotation.Role;
import com.canary.service.DatabaseService;
import com.sunny.model.Result;
import com.sunny.tool.LoggerTool;
import com.sunny.validator.ValidatorTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 数据库管理控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-30
 */
@Controller
public class DatabaseAdminController {

    @Autowired
    private DatabaseService databaseService;

    /**
     * 执行sql语句
     */
    @Role(role = {"Super"})
    @RequestMapping(value = "/admin/database/execute", method = RequestMethod.POST)
    @ResponseBody
    public Result execute(String sql) {
        LoggerTool.getLogger().debug("sql " + sql);
        Result<Object> result = new Result<Object>();
        try {
            //验证参数
            ValidatorTool.validateString(sql, 1, Integer.MAX_VALUE, "-1", "参数错误");

            //操作数据库
            result.setObject(databaseService.executeSql(sql));

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
