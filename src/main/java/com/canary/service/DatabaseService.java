package com.canary.service;

import com.canary.dao.SqlDao;
import com.canary.model.TableModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;

/**
 * 数据库服务层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-30
 */
@Service
public class DatabaseService {

    @Autowired
    private SqlDao sqlDao;

    public TableModel executeSql(String sql) throws SQLException {
        return sqlDao.execute(sql);
    }

}
