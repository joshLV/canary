package org.extra.dao;

import org.extra.model.AdModel;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 广告数据层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-03-30
 */
@Repository
public class AdDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    /**
     * 修改广告
     *
     * @param model 对象
     */
    public void update(AdModel model) {
        sqlSessionTemplate.update("com.canary.mapper.AdMapper.update", model);
    }

    /**
     * 查询所有广告
     */
    public List<AdModel> select() {
        return sqlSessionTemplate.selectList("com.canary.mapper.AdMapper.select");
    }

}
