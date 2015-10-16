define([], function (){
    // var exports = {};
    var _prefix_ = '/zwx'
    var config = {
        area: ["北京","上海","广州","成都","武汉","沈阳","天津","重庆","河北","云南","辽宁" ] ,
        indecator:["浏览量","独立访客数","访问次数","跳出次数", "平均访问深度","商品页访次"],
        logo:'grace-nav-logo',
        userLogout: _prefix_ + '/login/userLogout',
        homepage:{
            summary: _prefix_ +'/home/selectOverview',
            summary_indecator: _prefix_ +'/home/selectCustomOverviewNotAddedIndicators',
            remove_indecator: _prefix_ +'/home/deleteCustomOverviewIndicator',
            addIndicator:  _prefix_ + '/home/addedOverviewIndicators',
            getTrend: _prefix_ +'/home/getTrend',
            trend_page: _prefix_ +'homepage/trendpage',
            getIndicators: _prefix_ +'/common/selectIndicator',
            peiDate: _prefix_ +'/home/proportionAnalysis',
            getAllSites: _prefix_ +'/homeinit/getAllSites',
            pageTop: _prefix_ +'/home/pageTop'
        },
        vision:{
            dataIndex: _prefix_ +'/vision/channel_indicators_user_data'
        },
        vision_channel:{
            baseIndicator: _prefix_ +'/vision/channel_indicators_trend',
            meta_data: _prefix_ +'/vision/channel_indicators',
            flow_data: _prefix_ + '/vision/channel_flow',
            new_data: _prefix_ + '/vision/channel_new',
            order_data: _prefix_ + '/vision/channel_item',
            dimension: _prefix_ +"/dimension/getchannel"
        },
        vision_category:{
            buy_data: _prefix_ + '/vision/category_user_region',
            cate_data: _prefix_ + '/vision/category_browse_region',
            sales_data: _prefix_ + '/vision/category_sales_rank',
            baseIndicator: _prefix_ +'/vision/category_indicators_trend',
            meta_data: _prefix_ +'/vision/category_indicators',
            dataIndex: _prefix_ +'/vision/category_indicators_user_data',
            dimension: _prefix_ +"/vision/category_dimension"
        },
        vision_area:{
            baseIndicator: _prefix_ +'/vision/region_indicators_trend',
            meta_data: _prefix_ +'/vision/region_indicators',
            dataIndex: _prefix_ +'/vision/region_indicators_user_data',
            orderDistribution: _prefix_ +'/vision/region_order_category_analysis',
            pageVisitRank: _prefix_ +"/vision/region_browse_page_rank",
            dimension: _prefix_ +"/vision/region_dimension"
        },
        vision_contents:{
            baseIndicator: _prefix_ +'/vision/content_indicators_trend',
            meta_data: _prefix_ +'/vision/content_indicators',
            getFlowStructData: _prefix_ +'/vision/getFlowStructData',
            getRankData: _prefix_ +'/vision/getRankData',
            dimension: _prefix_ +"/dimension/getpagegroup",
            getUpstreamInnerData : _prefix_ +  '/vision/content_upstream_inner',   // 流量构成上游站内
            getUpstreamOuterData:  _prefix_ + '/vision/content_upstream_outer',    // 流量上游构成站外
            getDownstreamData: _prefix_ + '/vision/content_downstream',             // 流量构成 下游
            getPageViewRankData: _prefix_ + '/vision/content_url_display',         // 页面流量排行榜
            getFlowChannel: _prefix_ +  '/vision/content_flow_channel',             // 着陆页, 来源渠道构成
            getUserReAnl: _prefix_ + '/vision/content_user_region_analysis'        // 着陆页, 用户地域分析
        },
        vision_user:{
            meta_data: _prefix_ +'/vision/user_indicators',
            baseIndicator: _prefix_ +'/vision/user_indicators_trend',
            dataIndex: _prefix_ +'/vision/user_analysis'
        },
        found_srcSanalysis:{
            dim: _prefix_ +'/manage/getsourceanalyse',
            srcTable: _prefix_ +'/found/stream_analysis_data',
            srcAdvancedTable: _prefix_ +'/found/stream_analysis_data_advanced',
            srcType: _prefix_ +'/found/found_srcType',
            getIndicators: _prefix_ +'/found/found_getIndicators'
        },
        found_clsTagfQuery:{
            srcTable: _prefix_ +'/found/self_query_clstag',
            getClsTagTrend: _prefix_ +'/found/getClsTagTrend',
            self_query_clstag_now: _prefix_ +'/found/self_query_clstag_now'
        },
        found_selfQuery:{
            getIndicators: _prefix_ +'/found/self_query_indicators',
            addSubscribeData: _prefix_ +'/found/self_query_add_subscribe_data',
            configured: _prefix_ +'/dimension/getpagegroupurl',
            srcTable: _prefix_ +'/found/self_query_select_subscribe_data',
            deleteSubscribeData: _prefix_ +'/found/self_query_delete_subscribe_data',
            getTrend: _prefix_ +'/found/self_query_get_trend_data',
            summary: _prefix_ +'/found/self_query_get_overview_data',
            user_spread: _prefix_ +'/found/self_query_get_user_data',
            outsideStation: _prefix_ +'/found/self_query_get_flow_composition',
            browseRank: _prefix_ +'/found/self_query_page_rank'
        },
        manager_filter:{
            srcTable: _prefix_ +'/manage/funnel/select',
            clickId: _prefix_ +'/manage/log_clickIdData',
            brower: _prefix_ +'/manager/log_DetailInfo',
            deleteFilter: _prefix_ +'/manage/funnel/delete',
            editFilter: _prefix_ +'/manage/funnel/update',
            addFilter: _prefix_ +'/manage/funnel/insert',
            editOkFilter: _prefix_ +'/manage/funnel/update',
            form_url: _prefix_ +'/manage/funnel/update',
            selecturl: _prefix_ + '/manage/funnel/selecturl',
            selectByFunnelId: _prefix_ + '/manage/funnel/selectByFunnelId'
        },
        manager_urlmanage:{
            dataTable: _prefix_ +'/manage/url/select',
            addUrl: _prefix_ +'/manage/url/insert',
            eidtUrl: _prefix_ +'/manage/url/update',
            deleteUrl: _prefix_ +'/manage/url/delete',
            acceptUrl: _prefix_ +'/manage/url/pass',
            rejectUrl: _prefix_ +'/manage/url/nopass'
        },
        manage_log:{
            clickId: _prefix_ +"/manage/log/select",
            browser: _prefix_ +"/manage/logBrowser",
            applyId: _prefix_ +"/manage/log/insert",
            clickIdDetail: _prefix_ +"/manage/log/selectDetail",
            clickIdCheck: _prefix_ +"/manage/logManage/logById",
            applyCancel: _prefix_ +"/manage/log/cancel",
            clickIdExport: _prefix_ +"/manage/log/download",
            clickIdEdit: _prefix_ +"/manage/log/updateBatchesName",
            filterClickId: _prefix_ +"/manage/log/selectByState",
            applyReject:_prefix_+"/manage/log/nopass",
            applyAccept:_prefix_+"/manage/log/pass",
            deleteId:_prefix_+"/manage/log/delete",
            selectPoint:_prefix_+"/manage/log/selectPoint",
            statisticalObject:_prefix_ + "/manage/log/selectStatisticalObject",
            businessType:_prefix_ + "/manage/log/selectBusinessType",
            platformType:_prefix_ + "/manage/log/selectPlatformType",
            applyPoint:_prefix_ + "/manage/log/applyPoint",
            checkPointPass:_prefix_ + "/manage/log/checkPointPass",
            checkPointReject:_prefix_ + "/manage/log/checkPointReject",
            deletePoint:_prefix_ + "/manage/log/deletePoint",
            existDomain:_prefix_+ "/manage/log/existDomain"
        },
        manage_notice:{
            insert: _prefix_ + "/notice/insert",
            delete: _prefix_ + "/notice/delete",
            update: _prefix_ + "/notice/update",
            select: _prefix_ + "/notice/selectAll",
            selectAllNoRead: _prefix_ + "/notice/selectAllNoRead",
            selectAllNoReadCounts: _prefix_ + "/notice/selectAllNoReadCounts"
        },

        manage_policyInfo:{
            getAppInfo: _prefix_ + '/policyInfo/getAppInfo',
            getPolicyInfo: _prefix_ + '/policyInfo/getPolicyInfo',
            updateReport: _prefix_ + '/policyInfo/updateReport',
            delete: _prefix_ + '/policyInfo/deletePolicyInfo',
            insert: _prefix_ + '/policyInfo/insertPolicyInfo',
            select: _prefix_ + '/policyInfo/select'
        },

        manage_policyDetail:{
            getAppInfo: _prefix_ + '/policyInfo/getAppInfo',
            getPolicyHisInfo: _prefix_ + '/policyInfo/getPolicyHisInfo',
            updatePolicyHisInfo: _prefix_ + '/policyInfo/updatePolicyHisInfo',
            deletePolicyHisInfo: _prefix_ + '/policyInfo/deletePolicyHisInfo',
            useversion: _prefix_ + '/policyInfo/useversion',
            select: _prefix_ + '/policyInfo/selectPolicyHisInfo'
        },

        manage_appInfo:{
            getAppInfo: _prefix_ + '/appInfo/getAppInfo',
            updateAppInfo: _prefix_ + '/appInfo/updateAppInfo',
            deleteAppInfo: _prefix_ + '/appInfo/deleteAppInfo',
            select: _prefix_ + '/appInfo/selectAppInfo'
        },

        found_selfSel:{
            remove_indecator: _prefix_ +'/found/deleteCustomOverviewIndicator',
            buy_data:  _prefix_ +'/found/category_buy',
            user_spread: _prefix_ + '/found/user_spread',
            brower_spread: _prefix_ + '/found/brower_spread',
            system_spread: _prefix_ + '/found/system_spread',
            instation: _prefix_ +'/found/instation',
            flow_stream: _prefix_ +'/found/self_query_flow_upstream_and_downstream'

        },
        found_funnelAnalysis:{
            dim: _prefix_ +"/found/select_funnel",
            analysis: _prefix_ +"/found/funnel_trend",
            funnel: _prefix_ +"/found/funnel_graph",
            funnelDetail: _prefix_ +"/found/funnel_graph_detail"
        },
        getMenu: _prefix_ +"/common/getMenuBySiteCode",
        getIndicator: _prefix_ + "/common/selectIndicator",
        indicatorDesc:{
            selectIndicatorBySite: _prefix_ + "/common/selectIndicatorBySite",
            selectIndicatorFromURMBySiteAndName: _prefix_ + "/common/selectIndicatorFromURMBySiteAndName"
        },

            navsurl:[
            {title:'首页', css:'home', url: _prefix_ +'/homepage/view'},
            {title:'视角', css:'view', url:'', detail:[{title:'渠道',url: _prefix_ +'/vision/channel'},{title:'品类',url: _prefix_ +'/vision/category'},{title:'地域',url: _prefix_ +'/vision/region'},{title:'用户',url: _prefix_ +'/vision/users'}]},
            {title:'发现', css:'find', url:'', detail:[{title:'来源分析',url: _prefix_ +'/found/srcAnalysis'},{title:'漏斗分析',url: _prefix_ +'/found/funnelAnalysis'},{title:'内容分析',url: _prefix_ +'/found/contents'},{title:'clstag查询',url: _prefix_ +'/found/clstagSel'},{title:'自助查询',url: _prefix_ +'/found/selfSel'}]},
            {title:'管理',css:'manage',url:'',detail:[{title:'日志管理',url: _prefix_ +'/manage/logView'},{title:'URL管理',url: _prefix_ +'/manage/url/view'},{title:'漏斗管理',url: _prefix_ +'/manage/funnelView'}]}
        ],
        navsurl1:[
            {title:'首页', css:'home', url: _prefix_ +'/homepage/view'},
            {title:'视角', css:'view', url:'', detail:[{title:'渠道',url: _prefix_ +'/vision/channel'},{title:'品类',url: _prefix_ +'/vision/category'},{title:'地域',url: _prefix_ +'/vision/region'},{title:'用户',url: _prefix_ +'/vision/users'}]},
            {title:'发现', css:'find', url:'', detail:[{title:'来源分析',url: _prefix_ +'/found/srcAnalysis'},{title:'漏斗分析',url: _prefix_ +'/found/funnelAnalysis'},{title:'内容分析',url: _prefix_ +'/found/contents'},{title:'clstag查询',url: _prefix_ +'/found/clstagSel'},{title:'自助查询',url: _prefix_ +'/found/selfSel'}]},
        ],
        navsurl2:[
            {title:'首页', css:'home', url: _prefix_ +'/homepage/view'},
            {title:'视角', css:'view', url:'', detail:[{title:'渠道',url: _prefix_ +'/vision/channel'},{title:'品类',url: _prefix_ +'/vision/category'},{title:'地域',url: _prefix_ +'/vision/region'},{title:'用户',url: _prefix_ +'/vision/users'}]},
            {title:'发现', css:'find', url:'', detail:[{title:'来源分析',url: _prefix_ +'/found/srcAnalysis'},{title:'内容分析',url: _prefix_ +'/found/contents'}]},
        ],
        /*sourceUrl : [
            {title:'web站点',code:0},
            {title:'www.google.com',code:1},
            {title:'www.google.com',code:8}*//*,
            {title:'www.google.com',code:99}*//*
        ],*/
        sourceUrl: [
            {"title":"web站点","code":0,"children":[{"title":"","code":1,"children":[]},{"title":"","code":8,"children":[]}]},
            {title: "应用产品", code: -99, children: [{title: "", code: 14, children: []}]}
        ],
        sourceUrl1 : [
            {"title":"web站点","code":0,"children":[]}
        ]
    }
    return config;
});


