package org.extra.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.sunny.model.BasicModel;

/**
 * 友情链接模型
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-03-30
 */
public class LinkModel extends BasicModel {

    /**
     * 主键
     */
    @JsonView(CommonJsonView.class)
    private Integer id;

    /**
     * 名称
     */
    @JsonView(CommonJsonView.class)
    private String name;

    /**
     * 链接
     */
    @JsonView(CommonJsonView.class)
    private String url;

    /**
     * 描述
     */
    @JsonView(ExtraJsonView.class)
    private String description;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

}
