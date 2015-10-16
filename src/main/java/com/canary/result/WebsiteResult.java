package com.canary.result;

/**
 * WebsiteResult
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-05-31
 */
@SuppressWarnings(value = "unused")
public class WebsiteResult {

    /**
     * 网站标题
     */
    private String title;

    /**
     * 网站描述
     */
    private String description;

    /**
     * 网站关键字
     */
    private String keywords;

    /**
     * 网站链接
     */
    private String url;

    /**
     * 网站邮箱
     */
    private String email;

    /**
     * 网站备案信息
     */
    private String icp;

    /**
     * 网站统计代码
     */
    private String meta;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIcp() {
        return icp;
    }

    public void setIcp(String icp) {
        this.icp = icp;
    }

    public String getMeta() {
        return meta;
    }

    public void setMeta(String meta) {
        this.meta = meta;
    }
}
