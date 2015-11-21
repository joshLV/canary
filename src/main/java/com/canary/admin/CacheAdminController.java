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
    @Role(role = {"ADMIN", "SUPER"})
    @RequestMapping(value = "/admin/cache/select", method = RequestMethod.GET)
    @ResponseBody
    public Result select() {
        HashMap<Object, Object> data = new HashMap<Object, Object>();

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
                    data.put(key, value);
                }
            }
        }

        Result<Object> result = new Result<Object>(data);
        LoggerTool.info("result is{}", JSON.toJSONString(result));
        return result;
    }

    /**
     * 清除缓存
     */
    @Role(role = {"ADMIN", "SUPER"})
    @RequestMapping(value = "/admin/cache/clear", method = RequestMethod.POST)
    @ResponseBody
    public Result clear(String key) {

        //验证参数
        ValidatorTool.validateString(key, 1, Integer.MAX_VALUE, -1, "param exception.");

        //清除
        Cache cache = cacheManager.getCache("customCache");
        cache.evict(key);

        Result<Object> result = new Result<Object>();
        LoggerTool.info("result is {}", JSON.toJSONString(result));
        return result;
    }

}
