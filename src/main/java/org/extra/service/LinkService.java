package org.extra.service;

import org.extra.dao.LinkDao;
import org.extra.model.LinkModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 友情链接服务层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-03-30
 */
@Service
public class LinkService {

    @Autowired
    private LinkDao linkDao;

    /**
     * 新增友情链接
     *
     * @param model 友情链接对象
     * @return 友情链接的主键
     */
    public Integer insert(LinkModel model) {
        return linkDao.insert(model);
    }

    /**
     * 删除友情链接
     *
     * @param model 友情链接主键 操作人
     */
    public void delete(LinkModel model) {
        linkDao.delete(model);
    }

    /**
     * 修改友情链接
     *
     * @param model 友情链接对象
     */
    public void update(LinkModel model) {
        linkDao.update(model);
    }

    /**
     * 查询友情链接
     */
    public List<LinkModel> select() {
        return linkDao.select();
    }

}
