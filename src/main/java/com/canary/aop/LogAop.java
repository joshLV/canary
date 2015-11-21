package com.canary.aop;

import com.alibaba.fastjson.JSON;
import com.sunny.tool.LoggerTool;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

/**
 * 参数和结果日志
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-11-21
 */
@Aspect
@Component
public class LogAop {

    @Around("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public Object around(ProceedingJoinPoint point) throws Throwable {
        //记录参数
        Object[] params = point.getArgs();
        LoggerTool.info("params are {}", JSON.toJSONString(params));
//        if (params != null && params.length > 0) {
//            for (Object param : params) {
//                LoggerTool.info("param is {}", JSON.toJSONString(param));
//            }
//        }

        //执行
        Object result = point.proceed();

        //记录结果
        LoggerTool.info("result is {}", JSON.toJSONString(result));

        return result;
    }

}
