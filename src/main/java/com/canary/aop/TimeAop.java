package com.canary.aop;

import com.alibaba.fastjson.JSON;
import com.sunny.tool.LoggerTool;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

/**
 * 参数和结果日志
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-11-21
 */
@Aspect
@Component
public class TimeAop {

    @Around("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public Object around(ProceedingJoinPoint point) throws Throwable {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        //执行
        Object result = point.proceed();

        stopWatch.stop();
        LoggerTool.info("spend time {} millis",stopWatch.getTotalTimeMillis());
        return result;
    }

}
