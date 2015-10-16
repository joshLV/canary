package org.extra.service;

import org.extra.dao.AdDao;
import org.extra.model.AdModel;
import com.sunny.enums.EnableStatusEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 广告服务层
 *
 * @author sunny
 * @version 1.0.0
 * @since 2015-03-30
 */
@Service
public class AdService {

    @Autowired
    private AdDao adDao;

    /**
     * 修改广告
     *
     * @param model 广告对象
     */
    public void update(AdModel model) {
        adDao.update(model);
    }

    /**
     * 查询广告
     */
    public List<AdModel> select() {
        return adDao.select();
    }

    /**
     * 查询启用的广告
     */
    public List<AdModel> selectEnableAd() {
        List<AdModel> result = new ArrayList<AdModel>();

        List<AdModel> tmp = adDao.select();
        if (tmp == null || tmp.size() <= 0) {
            throw new RuntimeException("查询广告错误");
        }
        for (AdModel ad : tmp) {
            if (isEnable(ad) && isCorrectSite(ad)) {
                result.add(ad);
            }
        }
        return result;
    }

    public static boolean isEnable(AdModel ad) {
        return EnableStatusEnum.Enable.toName().equalsIgnoreCase(ad.getEnableStatus());
    }

    public static boolean isCorrectSite(AdModel ad) {
        boolean result = false;
        if ("top".equalsIgnoreCase(ad.getSite())) {
            result = true;
        } else if ("center".equalsIgnoreCase(ad.getSite())) {
            result = true;
        } else if ("bottom".equalsIgnoreCase(ad.getSite())) {
            result = true;
        } else if ("right".equalsIgnoreCase(ad.getSite())) {
            result = true;
        }
        return result;
    }

}
