package com.canary.admin;

import com.canary.annotation.Role;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * PageAdminController
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-07-27
 */
@Controller
public class PageAdminController {

    /**
     * 后台
     */
    @Role(role = {"ADMIN", "SUPER"})
    @RequestMapping(value = {"/admin"})
    public String admin() {
        return "/admin";
    }

    /**
     * 基础信息
     */
    @Role(role = {"ADMIN", "SUPER"})
    @RequestMapping(value = {"/admin/website/view"})
    public String website() {
        return "/website";
    }

    /**
     * 菜单
     */
    @Role(role = {"ADMIN", "SUPER"})
    @RequestMapping(value = {"/admin/menu/view"})
    public String menu() {
        return "/menu";
    }

    /**
     * 标签
     */
    @Role(role = {"ADMIN", "SUPER"})
    @RequestMapping(value = {"/admin/tag/view"})
    public String tag() {
        return "/tag";
    }

    /**
     * 文章
     */
    @Role(role = {"ADMIN", "SUPER"})
    @RequestMapping(value = {"/admin/article/view"})
    public String article() {
        return "/article";
    }

    /**
     * 超级管理员权限链接
     */
    @Role(role = {"SUPER"})
    @RequestMapping(value = {"/admin/link/view"})
    public String link() {
        return "/link";
    }

    /**
     * 超级管理员权限广告
     */
    @Role(role = {"SUPER"})
    @RequestMapping(value = {"/admin/ad/view"})
    public String ad() {
        return "/ad";
    }

    /**
     * 超级管理员权限用户
     */
    @Role(role = {"SUPER"})
    @RequestMapping(value = {"/admin/user/view"})
    public String user() {
        return "/user";
    }

    /**
     * 超级管理员权限数据
     */
    @Role(role = {"SUPER"})
    @RequestMapping(value = {"/admin/sql/view"})
    public String sql() {
        return "/sql";
    }

    /**
     * 超级管理员权限日志
     */
    @Role(role = {"SUPER"})
    @RequestMapping(value = {"/admin/log/view"})
    public String log() {
        return "/log";
    }

}
