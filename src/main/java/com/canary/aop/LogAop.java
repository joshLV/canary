package com.canary.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;

/**
 * 参数和结果日志
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-11-21
 */
public class LogAop {

    @Around("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public Object around(ProceedingJoinPoint point) throws Throwable {
        return point.proceed();
    }

}
