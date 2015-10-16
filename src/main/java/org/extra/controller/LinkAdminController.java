package org.extra.controller;

import com.alibaba.fastjson.JSON;
import org.extra.model.LinkModel;
import org.extra.service.LinkService;
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
 * 友情链接管理控制层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-03-30
 */
@Controller
public class LinkAdminController {

    @Autowired
    private LinkService linkService;

    /**
     * 新增友情链接
     */
    @RequestMapping(value = "/admin/link/insert", method = RequestMethod.POST)
    @ResponseBody
    public Result insertLink(LinkModel param) {
        LoggerTool.getLogger().debug("param " + JSON.toJSONString(param));
        Result<Object> result = new Result<Object>();
        try {
            //设置用户
            param.setOperator(UserRequestContext.getUsername());
            param.setCreator(UserRequestContext.getUsername());

            //验证参数
            ValidatorTool.validateString(param.getName(), 1, 20, "-1", "参数错误");
            ValidatorTool.validateString(param.getUrl(), 1, 128, "-1", "参数错误");
            ValidatorTool.validateString(param.getDescription(), 1, 20, "-1", "参数错误");
            ValidatorTool.validateNumber(param.getRank(), "-1", "参数错误");

            //操作数据库
            result.setObject(linkService.insert(param));

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
     * 管理员删除友情链接
     */
    @RequestMapping(value = "/admin/link/delete", method = RequestMethod.POST)
    @ResponseBody
    public Result deleteLink(LinkModel param) {
        LoggerTool.getLogger().debug("param " + JSON.toJSONString(param));
        Result<Object> result = new Result<Object>();
        try {
            //设置用户
            param.setOperator(UserRequestContext.getUsername());

            //验证参数
            ValidatorTool.validate(param, "-1", "参数错误");
            ValidatorTool.validate(param.getId(), "-1", "参数错误");

            //删除
            linkService.delete(param);

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
     * 管理员修改链接
     */
    @RequestMapping(value = "/admin/link/update", method = RequestMethod.POST)
    @ResponseBody
    public Result updateLink(LinkModel param) {
        LoggerTool.getLogger().debug("param " + JSON.toJSONString(param));
        Result<Object> result = new Result<Object>();
        try {
            //设置用户
            param.setOperator(UserRequestContext.getUsername());

            //验证参数
            ValidatorTool.validateNumber(param.getId(), "-1", "参数错误");
            ValidatorTool.validateString(param.getUrl(), 1, 128, "-1", "参数错误");
            ValidatorTool.validateString(param.getName(), 1, 20, "-1", "参数错误");
            ValidatorTool.validateString(param.getDescription(), 1, 20, "-1", "参数错误");
            ValidatorTool.validateNumber(param.getRank(), "-1", "参数错误");

            //修改
            linkService.update(param);

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
     * 管理员查询友情链接
     */
    @RequestMapping(value = "/admin/link/select", method = RequestMethod.POST)
    @ResponseBody
    public Result selectLink() {
        LoggerTool.getLogger().debug("no param");
        Result<Object> result = new Result<Object>();
        try {
            //查询
            result.setObject(linkService.select());

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
