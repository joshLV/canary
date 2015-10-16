package com.canary.model;

/**
 * 表头模型
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-30
 */
public class TableHeadModel {

    /**
     * 列数据的英文编码
     */
    private String code;

    /**
     * 列的中文名称
     */
    private String name;

    /**
     * 此列是否展示
     */
    private Boolean display = true;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getDisplay() {
        return display;
    }

    public void setDisplay(Boolean display) {
        this.display = display;
    }

}
