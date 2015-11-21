package com.canary.admin;

import com.alibaba.fastjson.JSON;
import com.canary.annotation.Role;
import com.canary.model.ArticleModel;
import com.canary.model.ArticleRelationModel;
import com.canary.param.ArticleParam;
import com.canary.service.ArticleService;
import com.sunny.context.UserRequestContext;
import com.sunny.exception.CustomException;
import com.sunny.model.PagingResult;
import com.sunny.model.Result;
import com.sunny.tool.LoggerTool;
import com.sunny.tool.StringTool;
import com.sunny.validator.ValidatorTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * 文章管理控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-04-26
 */
@Controller
public class ArticleAdminController {

    @Autowired
    private ArticleService articleService;

    /**
     * 新增文章
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/article/insert", method = RequestMethod.POST)
    @ResponseBody
    public Result<Object> insert(ArticleParam param) {
        LoggerTool.info("param is {}", JSON.toJSONString(param));

        //设置用户
        param.setOperator(UserRequestContext.getUsername());
        param.setCreator(UserRequestContext.getUsername());

        // 验证参数
        ValidatorTool.validateNotNull(param, -1, "参数有误");
        ValidatorTool.validateNotNull(param.getMenuId(), -1, "参数有误");
        ValidatorTool.validateString(param.getTags(), 0, Integer.MAX_VALUE, -1, "参数有误");
        ValidatorTool.validateString(param.getTitle(), 0, Integer.MAX_VALUE, -1, "参数有误");
        ValidatorTool.validateString(param.getContent(), 0, Integer.MAX_VALUE, -1, "参数有误");
        ValidatorTool.validateString(param.getAuthor(), 0, Integer.MAX_VALUE, -1, "参数有误");
        ValidatorTool.validateNumber(param.getRank(), -1, "参数有误");
        //来源名称和来源链接可以为空
//            ValidatorTool.validateString(param.getSourceName(),0,Integer.MAX_VALUE,-1,"参数有误");
//            ValidatorTool.validateString(param.getSourceUrl(), 0, Integer.MAX_VALUE, -1, "参数有误");

        //新增文章 返回文章主键
        Integer object = articleService.insert(param);

        Result<Object> result = new Result<Object>(object);
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 管理员删除文章
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/article/delete", method = RequestMethod.POST)
    @ResponseBody
    public Result deleteArticle(ArticleParam param) {
        LoggerTool.info("param is {}", JSON.toJSONString(param));

        //设置用户
        param.setOperator(UserRequestContext.getUsername());

        //验证参数
        ValidatorTool.validate(param, -1, "参数错误");
        ValidatorTool.validate(param.getId(), -1, "参数错误");

        //删除
        articleService.delete(param);

        Result<Object> result = new Result<Object>();
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 管理员修改文章
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/article/update", method = RequestMethod.POST)
    @ResponseBody
    public Result updateArticle(ArticleParam param) {
        LoggerTool.info("param is {}", JSON.toJSONString(param));

        //设置用户
        param.setOperator(UserRequestContext.getUsername());

        // 验证参数
        ValidatorTool.validateNotNull(param, -1, "参数有误");
        ValidatorTool.validate(param.getId(), -1, "参数错误");
        ValidatorTool.validateNotNull(param.getMenuId(), -1, "参数有误");
        ValidatorTool.validateString(param.getTags(), 0, Integer.MAX_VALUE, -1, "参数有误");
        ValidatorTool.validateString(param.getTitle(), 0, Integer.MAX_VALUE, -1, "参数有误");
        ValidatorTool.validateString(param.getContent(), 0, Integer.MAX_VALUE, -1, "参数有误");
        ValidatorTool.validateString(param.getAuthor(), 0, Integer.MAX_VALUE, -1, "参数有误");
        ValidatorTool.validateNumber(param.getRank(), -1, "参数有误");

        //修改
        articleService.update(param);

        Result<Object> result = new Result<Object>();
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 管理员查询文章
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/articles/select", method = RequestMethod.GET)
    @ResponseBody
    public Result selectArticleList(ArticleParam param) {
        LoggerTool.info("param is {}", JSON.toJSONString(param));

        // 验证参数
        ValidatorTool.validate(param.getMenuId(), -1, "参数有误");
        ValidatorTool.validateNumber(param.getCount(), 10, 50, -1, "参数有误");
        ValidatorTool.validateNumber(param.getPage(), 1, Integer.MAX_VALUE, -1, "参数有误");

        //构造查询参数
        ArticleModel model = new ArticleModel();
        model.setMenuId(param.getMenuId());
        model.setPage(param.getPage());
        model.setCount(param.getCount());
        model.setTitle(param.getTitle());
        PagingResult<ArticleRelationModel> object = articleService.select(model);

        Result<Object> result = new Result<Object>(object);
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 管理员查询文章
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/article/select", method = RequestMethod.POST)
    @ResponseBody
    public Result selectArticle(@RequestParam Integer id) {
        LoggerTool.info("id is {}", id);

        ArticleRelationModel object = articleService.selectById(id);

        Result<Object> result = new Result<Object>(object);
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 图片上传
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/image/upload", method = RequestMethod.POST)
    @ResponseBody
    public Result imageUpload(@RequestParam("files") CommonsMultipartFile[] files, HttpServletRequest request) {
        List<String> names = new ArrayList<String>();
        for (CommonsMultipartFile file : files) {
            //check if the file is empty
            if (file.isEmpty()) {
                return new Result<Object>(-1, "file is empty.");
            }

            // check the file type
            String filename = file.getOriginalFilename();
            String fileType = getImageFileType(filename);
            if (fileType == null || fileType.length() == 0) {
                return new Result<Object>(-1, "file type is error.");
            }

            //generate the new file name
            String realPath = request.getSession().getServletContext().getRealPath("/");
            String relativePath = "upload";
            String newFilename = new SimpleDateFormat("yyyyMMdd").format(new Date()) + "_" + UUID.randomUUID().toString().replaceAll("-", "") + "_" + StringTool.randomString("0123456789", 8) + fileType;
            String relativeFilename = File.separator + relativePath + File.separator + newFilename;
            String finalPath = realPath + relativeFilename;
            File output = new File(finalPath);

            //create the directory
            boolean flag = output.mkdirs();
            if (flag) {
                LoggerTool.info("{} parent directory is not exist,create it success.", finalPath);
            } else {
                LoggerTool.info("{} parent directory is exist", finalPath);
            }

            try {
                file.transferTo(output);
            } catch (IOException e) {
                throw new CustomException(-1, "write image file exception.");
            }
            names.add(relativeFilename);
        }

        return new Result<Object>(names);
    }

    public static String getImageFileType(String filename) {
        ValidatorTool.validateString(filename, 1, 1000, -1, "file name error,file name length is too long");

        // to lower case
        filename = filename.toLowerCase();

        // file type
        String fileType = null;
        if (filename.endsWith(".jpg")) {
            fileType = ".jpg";
        } else if (filename.endsWith(".bmp")) {
            fileType = ".bmp";
        } else if (filename.endsWith(".gif")) {
            fileType = ".gif";
        } else if (filename.endsWith(".png")) {
            fileType = ".png";
        } else if (filename.endsWith(".jpeg")) {
            fileType = ".jpeg";
        }

        return fileType;
    }

}
