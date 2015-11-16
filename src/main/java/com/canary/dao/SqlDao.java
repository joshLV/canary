package com.canary.dao;

import com.canary.model.TableHeadModel;
import com.canary.model.TableModel;
import com.sunny.tool.LoggerTool;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.SqlSessionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.ResultSetMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 * 执行SQL语句
 */
@Repository
public class SqlDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public TableModel execute(String sql) {
        //处理sql语句
        sql = processSql(sql);

        //构造返回结构
        TableModel model = new TableModel();
        List<TableHeadModel> head = model.getHead();
        List<List<String>> body = model.getBody();

        Connection connection = null;
        Statement statement = null;
        try {
            connection = SqlSessionUtils.getSqlSession(sqlSessionTemplate.getSqlSessionFactory(), sqlSessionTemplate.getExecutorType(), sqlSessionTemplate.getPersistenceExceptionTranslator()).getConnection();
            statement = connection.createStatement();
            boolean flag = statement.execute(sql);
            if (flag) {
                //返回结果为ResultSet
                ResultSet resultSet = statement.getResultSet();
                ResultSetMetaData meta = resultSet.getMetaData();
                int columnCount = meta.getColumnCount();
                LoggerTool.info("column count : " + columnCount);
                for (int i = 0; i < columnCount; i++) {
                    TableHeadModel column = new TableHeadModel();
                    column.setCode(meta.getColumnName(i + 1));
                    column.setName(meta.getColumnName(i + 1));
                    head.add(column);
                }
                while (resultSet.next()) {
                    List<String> row = new ArrayList<String>();
                    for (int i = 0; i < columnCount; i++) {
                        row.add(String.valueOf(resultSet.getObject(i + 1)));
                    }
                    body.add(row);
                }
            } else {
                //返回结果不是ResultSet，即返回更新计数或者无返回
                int count = statement.getUpdateCount();
                TableHeadModel column = new TableHeadModel();
                column.setCode("UpdateCount");
                column.setName("更新数据");
                head.add(column);
                List<String> row = new ArrayList<String>();
                row.add(String.valueOf(count));
                body.add(row);
            }
        } catch (SQLException e) {
            LoggerTool.error("sql exception,message is {}", e);
        } finally {
            if (statement != null) {
                try {
                    statement.close();
                } catch (SQLException e) {
                    LoggerTool.error("close statement exception,message is {}", e.getMessage());
                }
            }
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    LoggerTool.error("close connection exception,message is {}", e.getMessage());
                }
            }
        }
        return model;
    }

    public static String processSql(String sql) {
        if (sql != null && sql.startsWith("select") && !sql.contains("limit")) {
            sql = sql + " limit 1000";
        }
        return sql;
    }

}

