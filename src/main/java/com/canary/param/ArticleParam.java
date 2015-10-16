package com.canary.param;

import com.sunny.model.BasicParam;

/**
 * ArticleParam
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-05-04
 */
@SuppressWarnings(value = "unused")
public class ArticleParam extends BasicParam {

    /**
     * 主键
     */
    private Integer id;

    /**
     * 菜单主键
     */
    private Integer menuId;

    /**
     * 标签 竖线分隔
     */
    private String tags;

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
     * 排序值
     */
    private Integer rank;

    public Integer getMenuId() {
        return menuId;
    }

    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

}
