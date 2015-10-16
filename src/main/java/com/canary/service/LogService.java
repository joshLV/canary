package com.canary.service;

import com.canary.dao.LogDao;
import com.canary.model.LogModel;
import com.sunny.model.PagingResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * LogService
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-28
 */
@Service
public class LogService {

    @Autowired
    private LogDao logDao;

    /**
     * 记录管理员登陆日志
     */
    public void insert(LogModel model){
        logDao.insert(model);
    }

    /**
     * 查 按用户名时间倒序分页查询登陆记录
     */
    public PagingResult<LogModel> select(LogModel model){
        //查询数据
        List<LogModel> data = logDao.select(model);

        //查询总数
        Integer total = logDao.selectTotalCount(model);

        //返回
        PagingResult<LogModel> result = new PagingResult<LogModel>();
        result.setTotal(total);
        result.setData(data);

        return result;
    }

}
