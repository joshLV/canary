
function getRequirePathConfig(){

    var path = {
        'angular': 'common/angular',
        'nav': 'common/navs',
        'grace': "../grace_release/grace-bootstrap-tpls-2.2.3.min"
    }

    var urlPath = location.pathname;
    switch (urlPath){
        case "/canary/index":
            path.coreCtrl = "found/controllers/srcAnalysis-controller";
            path.coreServ = "found/services/srcAnalysis-service";
            path.coreDir = "found/directives/srcAnalysis-directive";
            break;
    }
    return path;
}

require.config({
    baseUrl: "/canary/js",
    paths: getRequirePathConfig(),
    shim: {
        'angular': {
            exports: 'angular'
        },
        'jquery': {
            exports: '$'
        }
    },
    priority: [
        "angular"
    ],
    waitSeconds: 20
});

var obj = {urlArgs: "d="+G_STATIC_TIME};
require.config.call(this, obj);

require(['nav','coreCtrl','angular'], function (nav,coreApp,angular) {

    coreApp.config(function($httpProvider){

        return $httpProvider.interceptors.push(function() {
            var count = 0;
            return {
                request: function(config) {
                    return config;
                },
                response: function(response) {
                    return response;
                },
                'responseError': function(rejection) {
                    return rejection;
                }
            };
        });
});
    angular.bootstrap(document, ['navs','coreApp']);
});