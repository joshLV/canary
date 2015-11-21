package com.canary.enums;

/**
 * 角色枚举
 *
 * @author sunny
 * @version 1.0.0
 * @since 2014-07-07
 */
@SuppressWarnings(value = "unused")
public enum RoleEnum {

    GUEST(1, "GUEST", "游客"),
    USER(2, "USER", "普通"),
    ADMIN(3, "ADMIN", "管理"),
    SUPER(4, "SUPER", "超级");

    private Integer code;
    private String name;
    private String message;

    /**
     * @param code    code
     * @param name    name
     * @param message message
     */
    RoleEnum(Integer code, String name, String message) {
        this.code = code;
        this.name = name;
        this.message = message;
    }

    /**
     * get the code of the enum
     */
    public Integer getCode() {
        return this.code;
    }

    /**
     * get the name of the enum
     */
    public String getName() {
        return this.name;
    }

    /**
     * get the message of the enum
     */
    public String getMessage() {
        return this.message;
    }

    /**
     * get the enum by code
     *
     * @param code code
     * @return the enum
     */
    public static RoleEnum enumValueOf(Integer code) {
        RoleEnum[] values = RoleEnum.values();
        RoleEnum v = null;
        for (RoleEnum value : values) {
            if (code.equals(value.getCode())) {
                v = value;
                break;
            }
        }
        return v;
    }

    /**
     * get the enum by name
     *
     * @param name name
     * @return the enum
     */
    public static RoleEnum enumValueOf(String name) {
        RoleEnum[] values = RoleEnum.values();
        RoleEnum v = null;
        for (RoleEnum value : values) {
            if (name.equalsIgnoreCase(value.getName())) {
                v = value;
                break;
            }
        }
        return v;
    }

}
