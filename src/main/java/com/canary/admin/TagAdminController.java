package com.canary.admin;

import com.alibaba.fastjson.JSON;
import com.canary.annotation.Role;
import com.canary.model.TagModel;
import com.canary.service.TagService;
import com.sunny.context.UserRequestContext;
import com.sunny.model.Result;
import com.sunny.tool.LoggerTool;
import com.sunny.validator.ValidatorTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 标签管理控制器
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-05-04
 */
@Controller
public class TagAdminController {

    @Autowired
    private TagService tagService;

    /**
     * 管理员添加标签
     */
    @Role(role = {"Admin","Super"})
    @RequestMapping(value = "/admin/tag/insert", method = RequestMethod.POST)
    @ResponseBody
    public Result insertTag(TagModel param) {
        LoggerTool.getLogger().debug("param " + JSON.toJSONString(param));
        Result<Object> result = new Result<Object>();
        try {
            //设置用户
            param.setOperator(UserRequestContext.getUsername());
            param.setCreator(UserRequestContext.getUsername());

            //验证参数
            ValidatorTool.validateString(param.getName(), 1, 20, "-1", "参数错误");
            ValidatorTool.validateString(param.getDescription(), 1, 20, "-1", "参数错误");
            ValidatorTool.validateNumber(param.getRank(), "-1", "参数错误");

            //操作数据库
            result.setObject(tagService.insert(param));

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
     * 管理员删除标签
     */
    @Role(role = {"Admin","Super"})
    @RequestMapping(value = "/admin/tag/delete", method = RequestMethod.POST)
    @ResponseBody
    public Result deleteTag(TagModel param) {
        LoggerTool.getLogger().debug("param " + JSON.toJSONString(param));
        Result<Object> result = new Result<Object>();
        try {
            //设置用户
            param.setOperator(UserRequestContext.getUsername());

            //验证参数
            ValidatorTool.validate(param, "-1", "参数错误");
            ValidatorTool.validate(param.getId(), "-1", "参数错误");

            //删除
            tagService.delete(param);

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
     * 管理员修改标签
     */
    @Role(role = {"Admin","Super"})
    @RequestMapping(value = "/admin/tag/update", method = RequestMethod.POST)
    @ResponseBody
    public Result updateTag(TagModel param) {
        LoggerTool.getLogger().debug("param " + JSON.toJSONString(param));
        Result<Object> result = new Result<Object>();
        try {
            //设置用户
            param.setOperator(UserRequestContext.getUsername());

            //验证参数
            ValidatorTool.validateNumber(param.getId(), "-1", "参数错误");
            ValidatorTool.validateString(param.getName(), 1, 20, "-1", "参数错误");
            ValidatorTool.validateString(param.getDescription(), 1, 20, "-1", "参数错误");
            ValidatorTool.validateNumber(param.getRank(), "-1", "参数错误");

            //修改
            tagService.update(param);

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
     * 管理员查询标签
     */
    @Role(role = {"Admin","Super"})
    @RequestMapping(value = "/admin/tag/select", method = RequestMethod.GET)
    @ResponseBody
    public Result selectTag() {
        LoggerTool.getLogger().debug("no param");
        Result<Object> result = new Result<Object>();
        try {
            //查询
            result.setObject(tagService.select());

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

}
