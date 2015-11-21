package com.canary.service;

import com.canary.dao.MenuDao;
import com.canary.model.MenuModel;
import com.sunny.enums.DeleteStatusEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * MenuService
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-01
 */
@Service
public class MenuService {

    @Autowired
    private MenuDao menuDao;

    /**
     * 新增菜单
     *
     * @param model 菜单对象
     * @return 菜单的主键
     */
    public Integer insert(MenuModel model) {
        return menuDao.insert(model);
    }

    /**
     * 删除菜单
     *
     * @param model 菜单主键
     */
    public void delete(MenuModel model) {
        menuDao.delete(model);
    }

    /**
     * 修改菜单
     *
     * @param model 菜单对象
     */
    public void update(MenuModel model) {
        menuDao.update(model);
    }

    /**
     * 管理员查询菜单 没有首页
     */
    @Cacheable(value = "customCache", key = "'MenuService.select'")
    public List<MenuModel> select() {
        return menuDao.select();
    }

    /**
     * 查询菜单 包括首页
     */
    @Cacheable(value = "customCache", key = "'MenuService.selectWithIndex'")
    public List<MenuModel> selectWithIndex() {
        ArrayList<MenuModel> result = new ArrayList<MenuModel>();

        //添加首页
        MenuModel index = new MenuModel();
        index.setId(0);
        index.setName("首页");
//        index.setUrl("/index");
        index.setDescription("首页");
        index.setRank(0);
        index.setDeleteStatus(DeleteStatusEnum.NOT_DELETE.getName());
        index.setOperator("system");
        Date time = new Date();
        index.setOperateTime(time);
        index.setCreator("system");
        index.setCreateTime(time);
        result.add(index);

        //添加菜单 格式 /list/菜单主键
        List<MenuModel> menus = menuDao.select();
//        for (MenuModel m : menus) {
//            m.setUrl("/articles/" + m.getId());
//        }
        result.addAll(menus);
        return result;
    }

}
