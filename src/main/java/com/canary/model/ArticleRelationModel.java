package com.canary.model;

import com.sunny.model.BasicModel;

import java.util.List;

/**
 * 文章与管理表结果模型
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-05-05
 */
@SuppressWarnings(value = "unused")
public class ArticleRelationModel extends BasicModel {

    /**
     * 主键
     */
    private Long id;

    /**
     * 菜单
     */
    private MenuModel menu;

    /**
     * 标签
     */
    private List<TagModel> tags;

    /**
     * 标题
     */
    private String title;

    /**
     * 内容
     */
    private String content;

    /**
     * 作者
     */
    private String author;

    /**
     * 来源名称
     */
    private String sourceName;

    /**
     * 来源链接
     */
    private String sourceUrl;

    /**
     * 点击量
     */
    private Long clickCount;

    /**
     * 顶
     */
    private Long upCount;

    /**
     * 踩
     */
    private Long downCount;

    /**
     * 排序值
     */
    private Long rank;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MenuModel getMenu() {
        return menu;
    }

    public void setMenu(MenuModel menu) {
        this.menu = menu;
    }

    public List<TagModel> getTags() {
        return tags;
    }

    public void setTags(List<TagModel> tags) {
        this.tags = tags;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getSourceUrl() {
        return sourceUrl;
    }

    public void setSourceUrl(String sourceUrl) {
        this.sourceUrl = sourceUrl;
    }

    public Long getClickCount() {
        return clickCount;
    }

    public void setClickCount(Long clickCount) {
        this.clickCount = clickCount;
    }

    public Long getUpCount() {
        return upCount;
    }

    public void setUpCount(Long upCount) {
        this.upCount = upCount;
    }

    public Long getDownCount() {
        return downCount;
    }

    public void setDownCount(Long downCount) {
        this.downCount = downCount;
    }

    public Long getRank() {
        return rank;
    }

    public void setRank(Long rank) {
        this.rank = rank;
    }

}
