package com.canary.admin;

import com.alibaba.fastjson.JSON;
import com.canary.annotation.Role;
import com.sunny.context.UserRequestContext;
import com.sunny.model.Result;
import com.sunny.tool.LoggerTool;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 管理员权限控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-05-08
 */
@Controller
public class PrivilegeAdminController {

    /**
     * 获取有权限的管理后台菜单
     */
    @Role(role = {"ADMIN", "SUPER"})
    @RequestMapping(value = "/admin/privilege/select", method = {RequestMethod.GET})
    @ResponseBody
    public Result selectPrivilege() {
        LoggerTool.info("no param");

        //获取管理员权限等级 根据等级设置菜单
        String role = UserRequestContext.getRole();

        List<String> menus = selectPrivilegeByRole(role);

        Result<Object> result = new Result<Object>(menus);
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 获取有权限的页面
     *
     * @param role 角色
     * @return 结果
     */
    public static List<String> selectPrivilegeByRole(String role) {
        List<String> result = new ArrayList<String>();
        Method[] methods = PageAdminController.class.getMethods();

        //没有方法直接返回
        if (methods == null || methods.length <= 0) {
            return result;
        }

        //处理所有方法
        for (Method method : methods) {
            RequestMapping requestMappingAnnotation = method.getAnnotation(RequestMapping.class);
            Role roleAnnotation = method.getAnnotation(Role.class);
            if (requestMappingAnnotation == null || roleAnnotation == null) {
                continue;
            }
            String[] urls = requestMappingAnnotation.value();
            String[] roles = roleAnnotation.role();
            if (urls == null || urls.length <= 0 || roles == null || roles.length <= 0) {
                continue;
            }
            String url = urls[0];
            //有此角色的注解声明，并且地址以view结尾的方法，添加链接到结果集
            if (Arrays.asList(roles).contains(role) && url.endsWith("view")) {
                result.add(url);
            }
        }
        return result;
    }

}
