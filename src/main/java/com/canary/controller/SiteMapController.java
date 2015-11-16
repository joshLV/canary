package com.canary.controller;

import com.canary.model.MenuModel;
import com.canary.model.SiteMapUrlModel;
import com.canary.service.MenuService;
import com.sunny.tool.LoggerTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * SiteMapController
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-07-23
 */
@Controller
public class SiteMapController {

    @Autowired
    private MenuService menuService;

    /**
     * 站点地图
     */
    @RequestMapping(value = "/sitemap.xml", method = RequestMethod.GET)
    @ResponseBody
    public String map(HttpServletRequest request) {
        LoggerTool.info("no param");
        String result;
        List<SiteMapUrlModel> urlset = new ArrayList<SiteMapUrlModel>();

        //获取域名和端口
        String scheme = request.getScheme();
        String serverName = request.getServerName();
        int serverPort = request.getServerPort();
        String domain = scheme + "://" + serverName;
        if (serverPort != 80) {
            domain = domain + ":" + serverPort;
        }


        //首页
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        SiteMapUrlModel indexUrl = new SiteMapUrlModel();
        indexUrl.setLoc(domain + "/index.html");
        indexUrl.setLastmod(simpleDateFormat.format(new Date()));
        indexUrl.setChangefreq("daily");
        indexUrl.setPriority("0.8");
        urlset.add(indexUrl);

        //文章列表页
        List<MenuModel> menus = menuService.select();
        if (menus != null) {
            for (MenuModel model : menus) {
                SiteMapUrlModel menuUrl = new SiteMapUrlModel();
                menuUrl.setLoc(domain + "/menu/" + model.getId() + ".html");
                menuUrl.setLastmod(simpleDateFormat.format(new Date()));
                menuUrl.setChangefreq("daily");
                menuUrl.setPriority("0.8");
                urlset.add(menuUrl);
            }
        }

        //关于我们
        SiteMapUrlModel aboutUrl = new SiteMapUrlModel();
        aboutUrl.setLoc(domain + "/about.html");
        aboutUrl.setLastmod(simpleDateFormat.format(new Date()));
        aboutUrl.setChangefreq("daily");
        aboutUrl.setPriority("0.8");
        urlset.add(aboutUrl);

        //联系我们
        SiteMapUrlModel contactUrl = new SiteMapUrlModel();
        contactUrl.setLoc(domain + "/contact.html");
        contactUrl.setLastmod(simpleDateFormat.format(new Date()));
        contactUrl.setChangefreq("daily");
        contactUrl.setPriority("0.8");
        urlset.add(contactUrl);

        //投稿
        SiteMapUrlModel contributionUrl = new SiteMapUrlModel();
        contributionUrl.setLoc(domain + "/contribution.html");
        contributionUrl.setLastmod(simpleDateFormat.format(new Date()));
        contributionUrl.setChangefreq("daily");
        contributionUrl.setPriority("0.8");
        urlset.add(contributionUrl);

        //版权声明
        SiteMapUrlModel copyrightUrl = new SiteMapUrlModel();
        copyrightUrl.setLoc(domain + "/copyright.html");
        copyrightUrl.setLastmod(simpleDateFormat.format(new Date()));
        copyrightUrl.setChangefreq("daily");
        copyrightUrl.setPriority("0.8");
        urlset.add(copyrightUrl);

        result = toXml(urlset);
        LoggerTool.info("result is {}", result);
        return result;
    }

    public String toXml(List<SiteMapUrlModel> urlset) {
        StringBuilder result = new StringBuilder();
        result.append("<urlset xmlns=\"http://www.google.com/schemas/sitemap/0.84\">");
        result.append("\n");
        for (SiteMapUrlModel url : urlset) {
            result.append("<url>");
            result.append("\n");
            result.append("<loc>");
            result.append(url.getLoc());
            result.append("</loc>");
            result.append("\n");
            result.append("<lastmod>");
            result.append(url.getLastmod());
            result.append("</lastmod>");
            result.append("\n");
            result.append("<changefreq>");
            result.append(url.getChangefreq());
            result.append("</changefreq>");
            result.append("\n");
            result.append("<priority>");
            result.append(url.getPriority());
            result.append("</priority>");
            result.append("\n");
            result.append("</url>");
            result.append("\n");
        }
        result.append("</urlset>");
        result.append("\n");
        return result.toString();
    }
}
