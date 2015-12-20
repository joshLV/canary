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
    private Long id;

    /**
     * 菜单主键
     */
    private Long menuId;

    /**
     * 标签 逗号分隔
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
    private Long rank;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMenuId() {
        return menuId;
    }

    public void setMenuId(Long menuId) {
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

    public Long getRank() {
        return rank;
    }

    public void setRank(Long rank) {
        this.rank = rank;
    }

}
