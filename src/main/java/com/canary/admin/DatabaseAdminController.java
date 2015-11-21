package com.canary.admin;

import com.alibaba.fastjson.JSON;
import com.canary.annotation.Role;
import com.canary.model.TableModel;
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
        LoggerTool.info("sql is {}", sql);

        //验证参数
        ValidatorTool.validateString(sql, 1, Integer.MAX_VALUE, -1, "参数错误");

        //操作数据库
        TableModel data = databaseService.executeSql(sql);

        Result<Object> result = new Result<Object>(data);
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

}
