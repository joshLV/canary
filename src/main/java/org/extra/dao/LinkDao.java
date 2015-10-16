package org.extra.dao;

import org.extra.model.LinkModel;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 链接数据层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-03-30
 */
@Repository
public class LinkDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    /**
     * 新增友情链接
     *
     * @param model 友情链接对象
     * @return 添加的友情链接的主键
     */
    public Integer insert(LinkModel model) {
        sqlSessionTemplate.insert("com.canary.mapper.LinkMapper.insert", model);
        return model.getId();
    }

    /**
     * 删除友情链接
     *
     * @param model 友情链接主键 操作人
     */
    public void delete(LinkModel model) {
        sqlSessionTemplate.delete("com.canary.mapper.LinkMapper.delete", model);
    }

    /**
     * 修改友情链接
     *
     * @param model 友情链接对象
     */
    public void update(LinkModel model) {
        sqlSessionTemplate.update("com.canary.mapper.LinkMapper.update", model);
    }

    /**
     * 查询友情链接
     */
    public List<LinkModel> select() {
        return sqlSessionTemplate.selectList("com.canary.mapper.LinkMapper.select");
    }


}
