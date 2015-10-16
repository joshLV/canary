package com.canary.controller;

import com.alibaba.fastjson.JSON;
import com.sunny.enums.QuestionEnum;
import com.sunny.model.Result;
import com.sunny.tool.LoggerTool;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

/**
 * CommonController
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-06-06
 */
@Controller
public class CommonController {

    /**
     * 查询密保问题列表
     */
    @RequestMapping(value = "/question", method = RequestMethod.GET)
    @ResponseBody
    public Result question() {
        LoggerTool.getLogger().debug("no param");
        Result<Object> result = new Result<Object>();
        try {
            result.setCode(0);
            result.setMessage("success");
            result.setObject(questionEnumToList());
            LoggerTool.getLogger().debug("result " + JSON.toJSONString(result));
            return result;
        } catch (Exception e) {
            result.setCode(-1);
            result.setMessage("fail");
            LoggerTool.getLogger().error("exception" + e.getMessage());
            return result;
        }
    }

    public static List<?> questionEnumToList() {
        List<Object> result = new ArrayList<Object>();
        for (int i = 0; i < QuestionEnum.values().length; i++) {
            HashMap<Object, Object> tmp = new HashMap<Object, Object>();
            tmp.put("code", QuestionEnum.values()[i].toCode());
            tmp.put("name", QuestionEnum.values()[i].toName());
            tmp.put("description", QuestionEnum.values()[i].toDescription());
            result.add(tmp);
        }
        return result;
    }

}
