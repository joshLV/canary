package com.canary.aop;

import com.canary.service.UserService;
import com.sunny.constant.Constant;
import com.sunny.context.UserHolder;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * PrivilegeAop
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-11-16
 */
@Aspect
@Component
public class PrivilegeAop {

    @Autowired
    private UserService userService;

    @Around("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public Object around(ProceedingJoinPoint point) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();

        //获取当前用户
        UserHolder userHolder = (UserHolder) request.getAttribute(Constant.USER_HOLDER_KEY);

        return point.proceed();
    }

}
