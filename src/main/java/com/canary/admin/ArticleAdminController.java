package com.canary.admin;

import com.alibaba.fastjson.JSON;
import com.canary.annotation.Role;
import com.canary.model.ArticleModel;
import com.canary.param.ArticleParam;
import com.canary.service.ArticleService;
import com.sunny.context.UserRequestContext;
import com.sunny.exception.CustomException;
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
import javax.servlet.http.HttpServletResponse;
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
        LoggerTool.getLogger().debug("param " + JSON.toJSONString(param));
        Result<Object> result = new Result<Object>();
        try {
            //设置用户
            param.setOperator(UserRequestContext.getUsername());
            param.setCreator(UserRequestContext.getUsername());

            //todo 验证参数

            //新增文章 返回文章主键
            result.setObject(articleService.insert(param));

            result.setCode(0);
            result.setMessage("success");
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
     * 管理员删除文章
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/article/delete", method = RequestMethod.POST)
    @ResponseBody
    public Result deleteArticle(ArticleParam param) {
        LoggerTool.getLogger().debug("param " + JSON.toJSONString(param));
        Result<Object> result = new Result<Object>();
        try {
            //设置用户
            param.setOperator(UserRequestContext.getUsername());

            //验证参数
            ValidatorTool.validate(param, "-1", "参数错误");
            ValidatorTool.validate(param.getId(), "-1", "参数错误");

            //删除
            articleService.delete(param);

            result.setCode(0);
            result.setMessage("success");
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
     * 管理员修改文章
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/article/update", method = RequestMethod.POST)
    @ResponseBody
    public Result updateArticle(ArticleParam param) {
        LoggerTool.getLogger().debug("param " + JSON.toJSONString(param));
        Result<Object> result = new Result<Object>();
        try {
            //设置用户
            param.setOperator(UserRequestContext.getUsername());

            //todo 验证参数
            ValidatorTool.validate(param, "-1", "参数错误");
            ValidatorTool.validate(param.getId(), "-1", "参数错误");

            //删除
            articleService.update(param);

            result.setCode(0);
            result.setMessage("success");
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
     * 管理员查询文章
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/articles/select", method = RequestMethod.GET)
    @ResponseBody
    public Result selectArticleList(ArticleParam param) {
        LoggerTool.getLogger().debug("param " + JSON.toJSONString(param));
        Result<Object> result = new Result<Object>();
        try {
            // 验证参数
            ValidatorTool.validate(param.getMenuId(), "-1", "参数有误");
            ValidatorTool.validateNumber(param.getCount(), 10, 50, "-1", "参数有误");
            ValidatorTool.validateNumber(param.getPage(), 1, Integer.MAX_VALUE, "-1", "参数有误");

            //构造查询参数
            ArticleModel model = new ArticleModel();
            model.setMenuId(param.getMenuId());
            model.setPage(param.getPage());
            model.setCount(param.getCount());
            model.setTitle(param.getTitle());
            result.setObject(articleService.select(model));

            result.setCode(0);
            result.setMessage("success");
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
     * 管理员查询文章
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/article/select", method = RequestMethod.POST)
    @ResponseBody
    public Result selectArticle(@RequestParam Integer id) {
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
     * 图片上传
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/image/upload", method = RequestMethod.POST)
    @ResponseBody
    public Result imageUpload(@RequestParam("files") CommonsMultipartFile[] files, HttpServletRequest request, HttpServletResponse response) {
        Result<Object> result = new Result<Object>();

        List<String> names = new ArrayList<String>();

        for (CommonsMultipartFile file : files) {
            //check if the file is empty
            if (file.isEmpty()) {
                result.setCode(-1);
                result.setMessage("file is empty.");
                return result;
            }

            // check the file type
            String filename = file.getOriginalFilename();
            String fileType = getImageFileType(filename);
            if (fileType == null || fileType.length() == 0) {
                result.setCode(-1);
                result.setMessage("file type is error.");
                return result;
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

        result.setObject(names);
        return result;
    }

    public static String getImageFileType(String filename) {
        ValidatorTool.validateString(filename, 1, 1000, "-1", "file name error,file name length is too long");

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
