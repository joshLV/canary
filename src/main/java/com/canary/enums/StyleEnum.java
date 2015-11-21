package com.canary.enums;

/**
 * 菜单下文章列表显示风格枚举
 *
 * @author sunny
 * @version 1.0.0
 * @since 2014-07-07
 */
@SuppressWarnings(value = "unused")
public enum StyleEnum {

    IMAGE(1, "IMAGE", "图片风格"),

    DETAIL(2, "DETAIL", "详情风格");

    private Integer code;
    private String name;
    private String message;

    /**
     * @param code        code
     * @param name        name
     * @param message message
     */
    StyleEnum(Integer code, String name, String message) {
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
    public static StyleEnum enumValueOf(Integer code) {
        StyleEnum[] values = StyleEnum.values();
        StyleEnum v = null;
        for (StyleEnum value : values) {
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
    public static StyleEnum enumValueOf(String name) {
        StyleEnum[] values = StyleEnum.values();
        StyleEnum v = null;
        for (StyleEnum value : values) {
            if (name.equalsIgnoreCase(value.getName())) {
                v = value;
                break;
            }
        }
        return v;
    }

}
