package com.canary.dao;

import com.canary.model.LogModel;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 管理员登陆日志数据层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2014-11-10
 */
@Repository
public class LogDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    /**
     * 新增
     *
     * @param model 数据
     * @return the key
     */
    public Long insert(LogModel model) {
        sqlSessionTemplate.insert("com.canary.mapper.LogMapper.insert", model);
        return model.getId();
    }

    /**
     * 删除
     *
     * @param model the key and operator
     */
    public void delete(LogModel model) {
        sqlSessionTemplate.update("com.canary.mapper.LogMapper.delete", model);
    }

    /**
     * 查 按用户名时间倒序分页查询登陆记录
     *
     * @param model model
     * @return return
     */
    public List<LogModel> select(LogModel model) {
        return sqlSessionTemplate.selectList("com.canary.mapper.LogMapper.select", model);
    }

    /**
     * 查询总数
     *
     * @param model 参数
     * @return 结果
     */
    public Long selectTotalCount(LogModel model) {
        return sqlSessionTemplate.selectOne("com.canary.mapper.LogMapper.selectTotalCount", model);
    }

}
