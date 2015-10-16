package com.canary.dao;

import com.canary.model.MenuModel;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * MenuDao
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-02
 */
@Repository
public class MenuDao {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    /**
     * 新增菜单
     *
     * @param model 菜单对象
     * @return 添加的菜单的主键
     */
    public Integer insert(MenuModel model) {
        sqlSessionTemplate.insert("com.canary.mapper.MenuMapper.insert", model);
        return model.getId();
    }

    /**
     * 删除菜单
     *
     * @param model 菜单主键 操作人
     */
    public void delete(MenuModel model) {
        sqlSessionTemplate.delete("com.canary.mapper.MenuMapper.delete", model);
    }

    /**
     * 修改菜单
     *
     * @param model 菜单对象
     */
    public void update(MenuModel model) {
        sqlSessionTemplate.update("com.canary.mapper.MenuMapper.update", model);
    }

    /**
     * 查询所有菜单
     */
    public List<MenuModel> select() {
        return sqlSessionTemplate.selectList("com.canary.mapper.MenuMapper.select");
    }

}
