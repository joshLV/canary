package com.canary.service;

import com.canary.dao.TagDao;
import com.canary.model.TagModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 标签服务层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-03
 */
@Service
public class TagService {

    @Autowired
    private TagDao tagDao;

    /**
     * 新增标签
     *
     * @param model 标签对象
     * @return 标签的主键
     */
    public Long insert(TagModel model) {
        return tagDao.insert(model);
    }

    /**
     * 删除标签
     *
     * @param model 标签主键 操作人
     */
    public void delete(TagModel model) {
        tagDao.delete(model);
    }

    /**
     * 修改标签
     *
     * @param model 标签对象
     */
    public void update(TagModel model) {
        tagDao.update(model);
    }

    /**
     * 管理员查询标签
     */
    @Cacheable(value = "customCache", key = "'TagService.select'")
    public List<TagModel> select() {
        return tagDao.select();
    }

}
