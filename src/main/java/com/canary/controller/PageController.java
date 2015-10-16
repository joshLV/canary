package com.canary.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 页面跳转控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-07-24
 */
@Controller
public class PageController {

    /**
     * 首页
     */
    @RequestMapping(value = "/")
    public String index() {
        return "/index";
    }

    /**
     * 首页
     */
    @RequestMapping(value = {"/index", "/index/view"})
    public String indexHtml() {
        return "/index";
    }

    /**
     * 用户登录页面
     */
    @RequestMapping(value = {"/login/view"})
    public String login() {
        return "/login";
    }

    /**
     * 错误页
     */
    @RequestMapping(value = {"/error", "/error/view"})
    public String error() {
        return "/error";
    }

}
