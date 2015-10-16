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
    private Integer id;

    /**
     * 文章主键
     */
    private Integer articleId;

    /**
     * 标签主键
     */
    private Integer tagId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getArticleId() {
        return articleId;
    }

    public void setArticleId(Integer articleId) {
        this.articleId = articleId;
    }

    public Integer getTagId() {
        return tagId;
    }

    public void setTagId(Integer tagId) {
        this.tagId = tagId;
    }

}
