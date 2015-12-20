package com.canary.service;

import com.canary.dao.ArticleDao;
import com.canary.dao.ArticleTagRelationDao;
import com.canary.model.ArticleModel;
import com.canary.model.ArticleRelationModel;
import com.canary.param.ArticleParam;
import com.canary.model.ArticleTagRelationModel;
import com.google.common.base.Function;
import com.google.common.base.Splitter;
import com.google.common.collect.Lists;
import com.sunny.model.PagingResult;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 * ArticleService
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-02
 */
@Service
public class ArticleService {

    @Autowired
    private ArticleDao articleDao;

    @Autowired
    private ArticleTagRelationDao articleTagRelationDao;

    /**
     * 新增
     *
     * @param param 模型
     * @return 主键
     */
    @Transactional
    public Long insert(ArticleParam param) {
        //新增文章
        ArticleModel model = new ArticleModel();
        BeanUtils.copyProperties(param, model);
        Long id = articleDao.insert(model);

        //新增标签
        String tags = param.getTags();
        List<String> tagStringList = Splitter.on(",").splitToList(tags);
        List<Long> tagList =  Lists.transform(tagStringList, new Function<String, Long>() {
            @Override
            public Long apply(String input) {
                return Long.valueOf(input);
            }
        });

        if (tagList.size() > 0) {
            List<ArticleTagRelationModel> list = new ArrayList<ArticleTagRelationModel>();
            for (Long tagId : tagList) {
                ArticleTagRelationModel relationModel = new ArticleTagRelationModel();
                relationModel.setArticleId(id);
                relationModel.setTagId(tagId);
                relationModel.setOperator(param.getOperator());
                relationModel.setCreator(param.getCreator());
                list.add(relationModel);
            }
            articleTagRelationDao.batchInsert(list);
        }
        return id;
    }

    /**
     * 删除
     *
     * @param param 主键 操作人
     */
    public void delete(ArticleParam param) {
        ArticleModel model = new ArticleModel();
        model.setId(param.getId());
        model.setOperator(param.getOperator());
        articleDao.delete(model);
    }

    /**
     * 修改
     *
     * @param param 文章
     */
    @Transactional
    public void update(ArticleParam param) {
        //修改文章
        ArticleModel model = new ArticleModel();
        model.setId(param.getId());
        model.setMenuId(param.getMenuId());
        model.setTitle(param.getTitle());
        model.setContent(param.getContent());
        model.setAuthor(param.getAuthor());
        model.setSourceName(param.getSourceName());
        model.setSourceUrl(param.getSourceUrl());
        model.setRank(param.getRank());
        model.setOperator(param.getOperator());
        articleDao.update(model);

        //修改标签 根据文章主键删除所有标签
        ArticleTagRelationModel deleteModel = new ArticleTagRelationModel();
        deleteModel.setArticleId(param.getId());
        deleteModel.setOperator(param.getOperator());
        articleTagRelationDao.deleteByArticleId(deleteModel);

        //重新插入新的标签
        String tags = param.getTags();
        List<String> tagStringList = Splitter.on(",").splitToList(tags);
        List<Long> tagList =  Lists.transform(tagStringList, new Function<String, Long>() {
            @Override
            public Long apply(String input) {
                return Long.valueOf(input);
            }
        });

        if (tagList.size() > 0) {
            List<ArticleTagRelationModel> list = new ArrayList<ArticleTagRelationModel>();
            for (Long tagId : tagList) {
                ArticleTagRelationModel relationModel = new ArticleTagRelationModel();
                relationModel.setArticleId(param.getId());
                relationModel.setTagId(tagId);
                relationModel.setOperator(param.getOperator());
                relationModel.setCreator(param.getOperator());
                list.add(relationModel);
            }
            articleTagRelationDao.batchInsert(list);
        }
    }

    /**
     * 根据文章主键查询文章
     *
     * @param id 主键
     * @return 文章
     */
    @Cacheable(value = "customCache", key = "'ArticleService.selectArticleById' + T(com.alibaba.fastjson.JSON).toJSONString(#id) ")
    public ArticleRelationModel selectById(Integer id) {
        return articleDao.selectById(id);
    }

    /**
     * 根据菜单分页查询文章列表
     *
     * @param model 参数 菜单编号 偏移量 分页数量
     * @return 返回
     */
    @Cacheable(value = "customCache", key = "'ArticleService.selectArticleModelList' + T(com.alibaba.fastjson.JSON).toJSONString(#model) ")
    public PagingResult<ArticleModel> selectArticleModelList(ArticleModel model) {
        //构造查询参数
        ArticleModel m = new ArticleModel();
        m.setMenuId(model.getMenuId());
        m.setCount(model.getCount());
        m.setOffset(model.getOffset());
        //查询文章
        List<ArticleModel> data = articleDao.selectArticleModelList(m);
        handleContent(data);

        //查询总数
        Long total = articleDao.selectTotalCount(m);

        //返回
        PagingResult<ArticleModel> result = new PagingResult<ArticleModel>();
        result.setTotal(total);
        result.setData(data);

        return result;
    }

    /**
     * 根据参数分页查询文章 后台管理使用此方法查询文章
     *
     * @param model 模型
     * @return 文章
     */
    @Cacheable(value = "customCache", key = "'ArticleService.select' + T(com.alibaba.fastjson.JSON).toJSONString(#model) ")
    public PagingResult<ArticleRelationModel> select(ArticleModel model) {
        //查询文章
        List<ArticleRelationModel> data = articleDao.select(model);

        //查询总数
        Long total = articleDao.selectTotalCount(model);

        //返回
        PagingResult<ArticleRelationModel> result = new PagingResult<ArticleRelationModel>();
        result.setTotal(total);
        result.setData(data);

        return result;
    }

    /**
     * 查询热门文章
     *
     * @param model 参数
     * @return 结果
     */
    @Cacheable(value = "customCache", key = "'ArticleService.selectHot' + T(com.alibaba.fastjson.JSON).toJSONString(#model) ")
    public List<ArticleModel> selectHot(ArticleModel model) {
        return articleDao.selectHot(model);
    }

    /**
     * 根据文章内容找出图片列表
     */
    private static void handleContent(List<ArticleModel> articles) {
        for (ArticleModel model : articles) {
            String content = model.getContent();
            if (content != null && content.trim().length() > 0) {
                ArrayList<String> images = new ArrayList<String>();

                //解析html找出图片，只解析3张
                Document document = Jsoup.parseBodyFragment(content);
                Elements elements = document.select("img[src]");
                for (Element element : elements) {
                    String image = element.attr("src");
                    if (image != null && image.trim().length() > 0 && images.size() < 3 && isMoreThanOneHundred(image)) {
                        images.add(image);
                    }
                }

                model.setImages(images);
            }
        }
    }

    /**
     * 判断图片长宽是否超过100
     *
     * @param imageUrl 图片地址
     * @return 结果
     */
    public static Boolean isMoreThanOneHundred(String imageUrl) {
        try {
            BufferedImage bufferedImage = ImageIO.read(new URL(imageUrl));
            return bufferedImage != null && bufferedImage.getHeight() > 100 && bufferedImage.getWidth() > 100;
        } catch (IOException e) {
            return false;
        }
    }

}
