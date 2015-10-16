package com.canary.interceptor;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.resource.DefaultServletHttpRequestHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;

/**
 * 权限拦截器
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-05-08
 */
public class RoleInterceptor implements HandlerInterceptor {

    @Autowired
    private UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        //判断当前用户角色
        String requestURI = request.getRequestURI();
        LoggerTool.info("uri is {}", requestURI);
        String role;
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

            UserHolder userHolder = JSON.parseObject(cookieValue, UserHolder.class);
            request.setAttribute(Constant.USER_HOLDER_KEY, userHolder);
            role = userHolder.getRole();
            LoggerTool.info("userHolder is {}", JSON.toJSONString(userHolder));
        } catch (Exception e) {
            role = RoleEnum.Guest.toName();
            LoggerTool.info("user is not login");
        }

        boolean flag = false;
        try {
            //静态资源
            if (o instanceof DefaultServletHttpRequestHandler){
                return true;
            }

            //方法
            HandlerMethod handlerMethod = (HandlerMethod) o;
            Role annotationRole = handlerMethod.getMethodAnnotation(Role.class);

            //没有角色注解不验证权限
            if (annotationRole == null) {
                flag = true;
            }
            //有角色注解验证权限
            else {
                List<String> annotationRoles = Arrays.asList(annotationRole.role());

                if (annotationRoles.size() > 0 && annotationRoles.contains(role)) {
                    flag = true;
                    LoggerTool.info("have {} privilege", requestURI);
                } else {
                    LoggerTool.info("not have {} privilege", requestURI);
                    HttpTool.writeResult(request, response, -1, "error,no privilege", null);
                }
            }
        } catch (Exception e) {
            LoggerTool.error("exception ", e);
            HttpTool.writeResult(request, response, -1, "error,no privilege", null);
        }
        return flag;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }

}
