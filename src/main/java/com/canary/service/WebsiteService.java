package com.canary.service;

import com.canary.common.WebsiteConstant;
import com.canary.dao.WebsiteDao;
import com.canary.model.WebsiteModel;
import com.canary.param.WebsiteParam;
import com.canary.result.WebsiteResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * WebsiteService
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-02
 */
@Service
public class WebsiteService {

    @Autowired
    private WebsiteDao websiteDao;

    /**
     * 查询所有站点信息
     */
    @Cacheable(value = "customCache", key = "'WebsiteService.select'")
    public WebsiteResult select() {
        WebsiteResult result = new WebsiteResult();
        List<WebsiteModel> list = websiteDao.select();
        for (WebsiteModel m : list) {
            String name = m.getName();
            String value = m.getValue();

            if (WebsiteConstant.TITLE.equals(name)) {
                result.setTitle(value);
            } else if (WebsiteConstant.DESCRIPTION.equals(name)) {
                result.setDescription(value);
            } else if (WebsiteConstant.KEYWORDS.equals(name)) {
                result.setKeywords(value);
            } else if (WebsiteConstant.URL.equals(name)) {
                result.setUrl(value);
            } else if (WebsiteConstant.EMAIL.equals(name)) {
                result.setEmail(value);
            } else if (WebsiteConstant.ICP.equals(name)) {
                result.setIcp(value);
            } else if (WebsiteConstant.META.equals(name)) {
                result.setMeta(value);
            }
        }
        return result;
    }

    /**
     * 修改站点信息
     */
    public void update(WebsiteParam param) {
        WebsiteModel model = new WebsiteModel();
        model.setOperator(param.getOperator());

        //修改网站标题
        model.setName("title");
        model.setValue(param.getTitle());
        websiteDao.update(model);

        //修改网站描述
        model.setName("description");
        model.setValue(param.getDescription());
        websiteDao.update(model);

        //修改网站关键字
        model.setName("keywords");
        model.setValue(param.getKeywords());
        websiteDao.update(model);

        //修改网站链接
        model.setName("url");
        model.setValue(param.getUrl());
        websiteDao.update(model);

        //修改网站邮箱
        model.setName("email");
        model.setValue(param.getEmail());
        websiteDao.update(model);

        //修改网站备案信息
        model.setName("icp");
        model.setValue(param.getIcp());
        websiteDao.update(model);

        //修改网站统计代码
        model.setName("meta");
        model.setValue(param.getMeta());
        websiteDao.update(model);
    }

    /**
     * 查询友情链接
     */
    @Cacheable(value = "customCache", key = "'WebsiteService.selectLink'")
    public WebsiteModel selectLink() {
        return websiteDao.selectByName(WebsiteConstant.LINK);
    }

    /**
     * 修改友情链接
     * @param param 参数
     * @return 结果
     */
    public WebsiteModel updateLink(WebsiteModel param) {
        websiteDao.update(param);
        return websiteDao.selectByName(WebsiteConstant.LINK);
    }

    /**
     * 查询关于我们
     */
    @Cacheable(value = "customCache", key = "'WebsiteService.selectAbout'")
    public WebsiteModel selectAbout() {
        return websiteDao.selectByName(WebsiteConstant.ABOUT);
    }

    /**
     * 查询联系我们
     */
    @Cacheable(value = "customCache", key = "'WebsiteService.selectContact'")
    public WebsiteModel selectContact() {
        return websiteDao.selectByName(WebsiteConstant.CONTACT);
    }

    /**
     * 查询投稿信息
     */
    @Cacheable(value = "customCache", key = "'WebsiteService.selectContribution'")
    public WebsiteModel selectContribution() {
        return websiteDao.selectByName(WebsiteConstant.CONTRIBUTION);
    }

    /**
     * 查询版权信息
     */
    @Cacheable(value = "customCache", key = "'WebsiteService.selectCopyright'")
    public WebsiteModel selectCopyright() {
        return websiteDao.selectByName(WebsiteConstant.COPYRIGHT);
    }

    /**
     * 查询广告
     */
    @Cacheable(value = "customCache", key = "'WebsiteService.selectAd'")
    public List<WebsiteModel> selectAd() {
        List<WebsiteModel> result = new ArrayList<WebsiteModel>();
        List<WebsiteModel> list = websiteDao.select();
        for (WebsiteModel m : list) {
            String key = m.getName();
            if (key.equals(WebsiteConstant.TOP_AD) || key.equals(WebsiteConstant.CENTER_AD) || key.equals(WebsiteConstant.BOTTOM_AD) || key.equals(WebsiteConstant.RIGHT_AD)) {
                result.add(m);
            }
        }
        return result;
    }

    /**
     * 修改广告
     * @param param 参数
     * @return 结果
     */
    public List<WebsiteModel> updateAd(WebsiteModel param) {
        websiteDao.update(param);
        return selectAd();
    }

}
