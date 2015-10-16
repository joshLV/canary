package com.canary.dao;

import com.canary.model.ArticleTagRelationModel;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 文章标签关系数据层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-03-30
 */
@Repository
public class ArticleTagRelationDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    /**
     * 新增
     *
     * @param model 对象
     * @return 添加的主键
     */
    public Integer insert(ArticleTagRelationModel model) {
        sqlSessionTemplate.insert("com.canary.mapper.ArticleTagRelationMapper.insert", model);
        return model.getId();
    }

    /**
     * 增 批量
     *
     * @param list 对象
     */
    public void batchInsert(List<ArticleTagRelationModel> list) {
        sqlSessionTemplate.insert("com.canary.mapper.ArticleTagRelationMapper.batchInsert", list);
    }

    /**
     * 删除
     *
     * @param model 主键 操作人
     */
    public void delete(ArticleTagRelationModel model) {
        sqlSessionTemplate.delete("com.canary.mapper.ArticleTagRelationMapper.delete", model);
    }

    /**
     * 根据文章主键删除
     *
     * @param model 文章主键 操作人
     */
    public void deleteByArticleId(ArticleTagRelationModel model) {
        sqlSessionTemplate.delete("com.canary.mapper.ArticleTagRelationMapper.deleteByArticleId", model);
    }

    /**
     * 修改
     *
     * @param model 对象
     */
//    public void update(ArticleTagRelationModel model) {
//        sqlSessionTemplate.update("com.canary.mapper.ArticleTagRelationMapper.update", model);
//    }

}
