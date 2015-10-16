package org.extra.model;

/**
 * 管理员后台权限模型
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-05-08
 */
public class PrivilegeModel {

    /**
     * 名称
     */
    private String name;

    /**
     * 资源值
     */
    private String value;

    /**
     * 类型 菜单和方法
     */
    private String type;

    /**
     * 标记拥有权限的角色
     */
    private String role;

    public PrivilegeModel() {
    }

    public PrivilegeModel(String name, String value, String type, String role) {
        this.name = name;
        this.value = value;
        this.type = type;
        this.role = role;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
