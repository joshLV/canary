package com.canary.model;

import java.util.ArrayList;
import java.util.List;

/**
 * 表格模型
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-30
 */
@SuppressWarnings(value = "unused")
public class TableModel {

    private List<TableHeadModel> head = new ArrayList<TableHeadModel>();

    private List<List<String>> body = new ArrayList<List<String>>();


    public List<TableHeadModel> getHead() {
        return head;
    }

    public void setHead(List<TableHeadModel> head) {
        this.head = head;
    }

    public List<List<String>> getBody() {
        return body;
    }

    public void setBody(List<List<String>> body) {
        this.body = body;
    }

    public void addHead(String code, String name, Boolean display) {
        TableHeadModel model = new TableHeadModel();
        model.setCode(code);
        model.setName(name);
        model.setDisplay(display);
        this.head.add(model);
    }

    public void addHead(String code, String name) {
        TableHeadModel model = new TableHeadModel();
        model.setCode(code);
        model.setName(name);
        this.head.add(model);
    }

}
