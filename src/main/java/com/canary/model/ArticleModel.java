package com.canary.model;

import com.sunny.model.BasicParam;

import java.util.List;

/**
 * 文章模型
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-02
 */
@SuppressWarnings(value = "unused")
public class ArticleModel extends BasicParam {

    /**
     * 主键
     */
    private Integer id;

    /**
     * 菜单
     */
    private Integer menuId;

    /**
     * 标题
     */
    private String title;

    /**
     * 预览图片
     */
    private List<String> images;

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
    private Integer clickCount;

    /**
     * 顶
     */
    private Integer upCount;

    /**
     * 踩
     */
    private Integer downCount;

    /**
     * 排序值
     */
    private Integer rank;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMenuId() {
        return menuId;
    }

    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
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

    public Integer getClickCount() {
        return clickCount;
    }

    public void setClickCount(Integer clickCount) {
        this.clickCount = clickCount;
    }

    public Integer getUpCount() {
        return upCount;
    }

    public void setUpCount(Integer upCount) {
        this.upCount = upCount;
    }

    public Integer getDownCount() {
        return downCount;
    }

    public void setDownCount(Integer downCount) {
        this.downCount = downCount;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

}
