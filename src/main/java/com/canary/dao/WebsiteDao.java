package com.canary.dao;

import com.canary.model.WebsiteModel;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * WebsiteDao
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-03-30
 */
@Repository
public class WebsiteDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    /**
     * 查询网站信息
     */
    public List<WebsiteModel> select() {
        return sqlSessionTemplate.selectList("com.canary.mapper.WebsiteMapper.select");
    }

    public void update(WebsiteModel model) {
        sqlSessionTemplate.update("com.canary.mapper.WebsiteMapper.update", model);
    }

    /**
     * 根据PropertyKey查询网站信息
     */
    public WebsiteModel selectByName(String name) {
        return sqlSessionTemplate.selectOne("com.canary.mapper.WebsiteMapper.selectByName", name);
    }

}
