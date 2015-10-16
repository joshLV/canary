package com.canary.dao;

import com.canary.model.TagModel;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 标签数据层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-05-04
 */
@Repository
public class TagDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    /**
     * 新增标签
     *
     * @param model 标签对象
     * @return 添加的标签的主键
     */
    public Integer insert(TagModel model) {
        sqlSessionTemplate.insert("com.canary.mapper.TagMapper.insert", model);
        return model.getId();
    }

    /**
     * 删除标签
     *
     * @param model 标签主键 操作人
     */
    public void delete(TagModel model) {
        sqlSessionTemplate.delete("com.canary.mapper.TagMapper.delete", model);
    }

    /**
     * 修改标签
     *
     * @param model 标签对象
     */
    public void update(TagModel model) {
        sqlSessionTemplate.update("com.canary.mapper.TagMapper.update", model);
    }

    /**
     * 查询所有标签
     */
    public List<TagModel> select() {
        return sqlSessionTemplate.selectList("com.canary.mapper.TagMapper.select");
    }

}
