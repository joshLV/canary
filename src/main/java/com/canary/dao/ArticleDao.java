package com.canary.dao;

import com.canary.model.ArticleModel;
import com.canary.model.ArticleRelationModel;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * MenuDao
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-02
 */
@Repository
public class ArticleDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    /**
     * 增
     */
    @Transactional
    public Integer insert(ArticleModel model) {
        sqlSessionTemplate.insert("com.canary.mapper.ArticleMapper.insert", model);
        model.setRank(model.getId());
        update(model);
        return model.getId();
    }

    /**
     * 删除
     *
     * @param model 主键 操作人
     */
    public void delete(ArticleModel model) {
        sqlSessionTemplate.delete("com.canary.mapper.ArticleMapper.delete", model);
    }

    /**
     * 修改
     *
     * @param model 对象
     */
    public void update(ArticleModel model) {
        sqlSessionTemplate.update("com.canary.mapper.ArticleMapper.update", model);
    }

    /**
     * 根据主键查询文章
     */
    public ArticleRelationModel selectById(Integer id) {
        return sqlSessionTemplate.selectOne("com.canary.mapper.ArticleMapper.selectById", id);
    }

    /**
     * 查 分页查询文章 包括关联表
     */
    public List<ArticleRelationModel> select(ArticleModel model) {
        return sqlSessionTemplate.selectList("com.canary.mapper.ArticleMapper.select", model);
    }

    /**
     * 分页查询文章，不包括关联表
     */
    public List<ArticleModel> selectArticleModelList(ArticleModel model) {
        return sqlSessionTemplate.selectList("com.canary.mapper.ArticleMapper.selectArticleModelList", model);
    }

    /**
     * 查询文章总数
     */
    public Integer selectTotalCount(ArticleModel model) {
        return sqlSessionTemplate.selectOne("com.canary.mapper.ArticleMapper.selectTotalCount", model);
    }

    /**
     * 查询热门文章
     */
    public List<ArticleModel> selectHot(ArticleModel model) {
        return sqlSessionTemplate.selectList("com.canary.mapper.ArticleMapper.selectHot", model);
    }

}
