package com.canary.dao;

import com.canary.model.UserModel;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * UserDao
 *
 * @author sunny
 * @version 1.0.0
 * @since 2014-11-10
 */
@Repository
public class UserDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    /**
     * insert
     *
     * @param model user model
     * @return the key
     */
    public Integer insert(UserModel model) {
        sqlSessionTemplate.insert("com.canary.mapper.UserMapper.insert", model);
        return model.getId();
    }

    /**
     * delete
     *
     * @param model the key
     */
    public void delete(UserModel model) {
        sqlSessionTemplate.update("com.canary.mapper.UserMapper.delete", model);
    }

    /**
     * update
     */
    public void update(UserModel model) {
        sqlSessionTemplate.update("com.canary.mapper.UserMapper.update", model);
    }

    /**
     * LoginFailTimes column add one
     */
    public void updateLoginFailTimes(UserModel model) {
        sqlSessionTemplate.update("com.canary.mapper.UserMapper.updateLoginFailTimesAddOne", model);
    }

    /**
     * select
     *
     * @param model model
     * @return return
     */
    public List<UserModel> select(UserModel model) {
        return sqlSessionTemplate.selectList("com.canary.mapper.UserMapper.select", model);
    }

    /**
     * 查询总数
     *
     * @param model 参数
     * @return 结果
     */
    public Integer selectTotalCount(UserModel model) {
        return sqlSessionTemplate.selectOne("com.canary.mapper.UserMapper.selectTotalCount", model);
    }

}
