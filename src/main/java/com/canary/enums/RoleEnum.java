package com.canary.enums;

import java.util.TreeMap;

/**
 * 角色枚举
 *
 * @author sunny
 * @version 1.0.0
 * @since 2014-07-07
 */
@SuppressWarnings(value = "unused")
public enum RoleEnum {

    Guest(1, "Guest", "游客"),
    User(2, "User", "普通"),
    Admin(3, "Admin", "管理"),
    Super(4, "Super", "超级");

    private Integer code;
    private String name;
    private String description;

    /**
     * @param code        code
     * @param name        name
     * @param description description
     */
    RoleEnum(Integer code, String name, String description) {
        this.code = code;
        this.name = name;
        this.description = description;
    }


    /**
     * get the code of the enum
     */
    public Integer toCode() {
        return this.code;
    }

    /**
     * get the name of the enum
     */
    public String toName() {
        return this.name;
    }

    /**
     * get the description of the enum
     */
    public String toDescription() {
        return this.description;
    }

    /**
     * get the description of the enum
     */
    public String toString() {
        return this.description;
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
            if (code.equals(value.toCode())) {
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
            if (name.equalsIgnoreCase(value.toName())) {
                v = value;
                break;
            }
        }
        return v;
    }

    /**
     * get map ,the key is enum code,value is enum description
     *
     * @return map
     */
    public static TreeMap<Integer, String> toCodeDescriptionMap() {
        TreeMap<Integer, String> map = new TreeMap<Integer, String>();
        for (int i = 0; i < RoleEnum.values().length; i++) {
            map.put(RoleEnum.values()[i].toCode(), RoleEnum.values()[i].toDescription());
        }
        return map;
    }

    /**
     * get map ,the key is enum name,value is enum description
     *
     * @return map
     */
    public static TreeMap<String, String> toNameDescriptionMap() {
        TreeMap<String, String> map = new TreeMap<String, String>();
        for (int i = 0; i < RoleEnum.values().length; i++) {
            map.put(RoleEnum.values()[i].toName(), RoleEnum.values()[i].toDescription());
        }
        return map;
    }

}
