package com.canary.admin;

import com.alibaba.fastjson.JSON;
import com.canary.annotation.Role;
import com.sunny.model.Result;
import com.sunny.tool.LoggerTool;
import com.sunny.validator.ValidatorTool;
import net.sf.ehcache.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;

/**
 * CacheController
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-09-07
 */
@Controller
public class CacheAdminController {

    @Autowired
    private CacheManager cacheManager;

    /**
     * 获取所有缓存
     */
    @Role(role = {"Admin", "Super"})
    @RequestMapping(value = "/admin/cache/select", method = RequestMethod.GET)
    @ResponseBody
    public Result select() {
        Result<Object> result = new Result<Object>();
        try {
            result.setCode(0);
            result.setMessage("success");
            HashMap<Object, Object> object = new HashMap<Object, Object>();

            //获取缓存全部数据
            Cache cache = cacheManager.getCache("customCache");
            Object c = cache.getNativeCache();
            if (c instanceof net.sf.ehcache.Cache) {
                net.sf.ehcache.Cache ehcache = (net.sf.ehcache.Cache) c;
                List<?> keys = ehcache.getKeys();
                for (Object key : keys) {
                    Element element = ehcache.get(key);
                    if (element != null) {
                        Object value = element.getObjectValue();
                        object.put(key, value);
                    }
                }
            }
            result.setObject(object);
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
     * 清除缓存
     */
    @RequestMapping(value = "/admin/cache/clear", method = RequestMethod.POST)
    @ResponseBody
    public Result clear(String key) {
        Result<Object> result = new Result<Object>();
        try {
            //验证参数
            ValidatorTool.validateString(key, 1, Integer.MAX_VALUE, "-1", "param exception.");

            result.setCode(0);
            result.setMessage("success");

            //清除
            Cache cache = cacheManager.getCache("customCache");
            cache.evict(key);
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
