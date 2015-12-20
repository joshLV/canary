package com.canary.model;

import com.sunny.model.BasicModel;

/**
 * WebsiteModel
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-03-30
 */
public class WebsiteModel extends BasicModel {

    /**
     * 主键
     */
    private Long id;

    /**
     * 键
     */
    private String name;

    /**
     * 值
     */
    private String value;

    /**
     * 描述
     */
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
