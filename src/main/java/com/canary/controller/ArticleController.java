package com.canary.controller;

import com.alibaba.fastjson.JSON;
import com.canary.annotation.Role;
import com.canary.common.CanaryConstant;
import com.canary.model.ArticleModel;
import com.sunny.model.Result;
import com.canary.service.ArticleService;
import com.sunny.tool.LoggerTool;
import com.sunny.validator.ValidatorTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * 文章控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-03-30
 */
@Controller
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    /**
     * 分页获取菜单下文章列表，按rank operate_time排序
     */
    @RequestMapping(value = "/articles/{menu}/{page}", method = RequestMethod.GET)
    @ResponseBody
    public Result selectArticleByMenuId(@PathVariable("menu") Integer menu, @PathVariable("page") Integer page) {
        LoggerTool.getLogger().debug("menuId " + menu);
        LoggerTool.getLogger().debug("page " + page);
        Result<Object> result = new Result<Object>();
        try {
            //验证参数
            ValidatorTool.validate(menu, "-1", "参数有误");
            ValidatorTool.validateNumber(page, 1, Integer.MAX_VALUE, "-1", "参数有误");

            //设置默认数据
            int count = CanaryConstant.DEFAULT_PAGING_COUNT;

            //查询数据
            ArticleModel param = new ArticleModel();
            param.setMenuId(menu);

            param.setPage(page);
            param.setCount(count);
            result.setObject(articleService.selectArticleModelList(param));

            result.setCode(0);
            result.setMessage("success");
            LoggerTool.getLogger().debug("result " + JSON.toJSONString(result));
            return result;
        } catch (Exception e) {
            result.setCode(-1);
            result.setMessage("fail");
            LoggerTool.getLogger().error("exception " + e.getMessage());
            return result;
        }
    }

    /**
     * 获取文章
     */
    @RequestMapping(value = "/article/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Result article(@PathVariable Integer id) {
        LoggerTool.getLogger().debug("id " + id);
        Result<Object> result = new Result<Object>();
        try {
            result.setCode(0);
            result.setMessage("success");
            result.setObject(articleService.selectById(id));
            LoggerTool.getLogger().debug("result " + JSON.toJSONString(result));
            return result;
        } catch (Exception e) {
            result.setCode(-1);
            result.setMessage("fail");
            LoggerTool.getLogger().error("exception" + e.getMessage());
            return result;
        }
    }

    /**
     * 分页查询最新文章，按rank operate_time排序
     */
    @RequestMapping(value = "/new/{page}", method = RequestMethod.GET)
    @ResponseBody
    public Result newArticles(@PathVariable("page") Integer page) {
        LoggerTool.debug("page " + page);
        Result<Object> result = new Result<Object>();
        try {
            //验证参数
            ValidatorTool.validateNumber(page, 0, Integer.MAX_VALUE, "-1", "参数有误");
            int count = CanaryConstant.DEFAULT_PAGING_COUNT;

            //查询数据
            ArticleModel param = new ArticleModel();
            param.setMenuId(null);
            param.setPage(page);
            param.setCount(count);
            result.setObject(articleService.selectArticleModelList(param));
            result.setCode(0);
            result.setMessage("success");
            LoggerTool.getLogger().debug("result " + JSON.toJSONString(result));
            return result;
        } catch (Exception e) {
            result.setCode(-1);
            result.setMessage("fail");
            LoggerTool.getLogger().error("exception " + e.getMessage());
            return result;
        }
    }

    /**
     * 查询最热文章排行榜
     */
    @RequestMapping(value = "/hot", method = RequestMethod.GET)
    @ResponseBody
    public Result hot() {
        LoggerTool.debug("no param");
        Result<Object> result = new Result<Object>();
        try {
            //查询数据
            ArticleModel param = new ArticleModel();
            int count = CanaryConstant.DEFAULT_PAGING_COUNT;
            param.setCount(count);
            result.setObject(articleService.selectHot(param));
            result.setCode(0);
            result.setMessage("success");
            LoggerTool.getLogger().debug("result " + JSON.toJSONString(result));
            return result;
        } catch (Exception e) {
            result.setCode(-1);
            result.setMessage("fail");
            LoggerTool.getLogger().error("exception " + e.getMessage());
            return result;
        }
    }

    /**
     * todo 赞
     */
    @Role(role = {"User","Admin","Super"})
    @RequestMapping(value = "/user/up", method = RequestMethod.POST)
    @ResponseBody
    public Result up(Integer id) {
        LoggerTool.debug("id is {}", id);
        Result<Object> result = new Result<Object>();
        try {
            //查询数据

            result.setObject("");
            result.setCode(0);
            result.setMessage("success");
            LoggerTool.getLogger().debug("result " + JSON.toJSONString(result));
            return result;
        } catch (Exception e) {
            result.setCode(-1);
            result.setMessage("fail");
            LoggerTool.getLogger().error("exception " + e.getMessage());
            return result;
        }
    }

}
