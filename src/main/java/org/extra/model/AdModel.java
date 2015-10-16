package org.extra.model;

import com.sunny.model.BasicModel;

/**
 * 广告模型
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-05-07
 */
public class AdModel extends BasicModel {

    /**
     * 主键
     */
    private Integer id;

    /**
     * 位置
     */
    private String site;

    /**
     * 脚本
     */
    private String script;

    /**
     * 启用状态
     */
    private String enableStatus;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public String getEnableStatus() {
        return enableStatus;
    }

    public void setEnableStatus(String enableStatus) {
        this.enableStatus = enableStatus;
    }

}
