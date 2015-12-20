package com.canary.model;

import com.sunny.model.BasicModel;

/**
 * 文章标签关系模型
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-05-04
 */
@SuppressWarnings(value = "unused")
public class ArticleTagRelationModel extends BasicModel {

    /**
     * 主键
     */
    private Long id;

    /**
     * 文章主键
     */
    private Long articleId;

    /**
     * 标签主键
     */
    private Long tagId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }

    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long tagId) {
        this.tagId = tagId;
    }

}
