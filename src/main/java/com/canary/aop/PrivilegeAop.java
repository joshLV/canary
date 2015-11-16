package com.canary.aop;

import com.alibaba.fastjson.JSON;
import com.canary.annotation.Role;
import com.canary.common.CanaryConstant;
import com.canary.enums.RoleEnum;
import com.canary.service.UserService;
import com.sunny.constant.Constant;
import com.sunny.context.UserHolder;
import com.sunny.tool.CookieTool;
import com.sunny.tool.HttpTool;
import com.sunny.tool.LoggerTool;
import com.sunny.tool.SecurityTool;
import com.sunny.validator.ValidatorTool;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;

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

        //如果用户为空，重新设置cookie，并获取当前用户
        if (userHolder == null) {
            setCookie(request, response);
            userHolder = (UserHolder) request.getAttribute(Constant.USER_HOLDER_KEY);
        }

        //获取用户角色
        String role = RoleEnum.Guest.toName();
        if (userHolder != null ){
            role = userHolder.getRole();
        }

        //判断是否有权限
        if (hasPrivilege(role,request,response)){
            return point.proceed();
        }else{
            HttpTool.writeResult(request, response, -1, "error,no privilege", null);
            return null;
        }

//        System.out.println(point.getArgs());
//        System.out.println(point.getKind());
//        System.out.println(point.getStaticPart());
//        System.out.println();
    }

    /**
     * 设置cookie
     *
     * @param request  请求
     * @param response 响应
     * @return 结果
     */
    public UserHolder setCookie(HttpServletRequest request, HttpServletResponse response) {
        UserHolder userHolder;
        try {
            //从cookie中获取用户主键和用户名
            Integer id = Integer.parseInt(CookieTool.getCookie(request, response, "id"));
            String username = CookieTool.getCookie(request, response, "username");
            ValidatorTool.validateNotNull(id, "-1", "用户主键错误");
            ValidatorTool.validateString(username, 5, 20, "-1", "用户名错误");

            //根据主键和用户名查出私钥
            String sign = userService.selectSign(id, username);

            //解析cookie
            String cookieValue = SecurityTool.decodeAes(CookieTool.getCookie(request, response, CanaryConstant.COOKIE_NAME), sign);
            LoggerTool.info("cookie value is {}", cookieValue);

            userHolder = JSON.parseObject(cookieValue, UserHolder.class);
            request.setAttribute(Constant.USER_HOLDER_KEY, userHolder);
            LoggerTool.info("userHolder is {}", JSON.toJSONString(userHolder));
            return userHolder;
        } catch (Exception e) {
            LoggerTool.info("user is not login");
            return null;
        }
    }

    public Boolean hasPrivilege(String role, HttpServletRequest request, HttpServletResponse response) {
        boolean flag = false;
        try {
            Role annotationRole = null;

            //没有角色注解不验证权限
            if (annotationRole == null) {
                flag = true;
            }
            //有角色注解验证权限
            else {
                List<String> annotationRoles = Arrays.asList(annotationRole.role());

                if (annotationRoles.size() > 0 && annotationRoles.contains(role)) {
                    flag = true;
                    LoggerTool.info("have {} privilege", request.getRequestURI());
                } else {
                    LoggerTool.info("not have {} privilege", request.getRequestURI());
                }
            }
        } catch (Exception e) {
            LoggerTool.error("exception ,message is {}", e);
        }
        return flag;
    }
}
