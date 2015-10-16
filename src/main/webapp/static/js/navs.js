/**
 * Created by cindy on 14-9-16.
 */

define(['angular', 'grace', 'config'], function(angular, grace, config){
    var zwxNav = angular.module("navs", [])
        .controller('navsController', navsController)
        .factory('navsFactory', navsFactory)
        .directive('paginationInput1', paging);
    function paging() {
        return {
            restirct:"EA",
            link:function(scope,element,attr){

                var $el = $(element[0]);
                var numTest = /^\d+$/;
                var maxPages = attr['maxPages'];
                function check(evt){
                    var val = $el.val();
                    if(evt.type == "keyup" && evt.keyCode == 13
                        && numTest.test(val)){
                        if((scope.notices.totalPages !== undefined && parseInt(val) <= scope.notices.totalPages)
                            || scope.notices.totalPages == undefined){
                            doApply(val);
                        }
                    }
                    else if(evt.type == "blur"
                        && numTest.test(val)){
                        if((scope.notices.totalPages !== undefined && parseInt(val) <= scope.notices.totalPages)
                            || scope.notices.totalPages == undefined){
                            doApply(val);
                        }
                    }
                }

                function doApply(val){
                    scope.$apply(function(){
                        scope.notices.currentPage = val;
                    });
                    scope.$apply(function(){
                        scope.notices.changePage();
                    });
                }

                $el.bind("keyup",check);

                $el.bind("blur",check);
            }
        }
    }
    function navsController($scope, $rootScope, navsFactory){
        
    }
    function navsFactory($http){
        

        var selectAllNoReadCounts = function($scope){
            $http({
                url: config.manage_notice.selectAllNoReadCounts,
                method:'get',
                dataType:'json',
                params:{}
            })
                .success(function(res){
                    if(res.success){
                        $scope.noticeNum = res.obj.length == 0 ? '' : res.obj.length;
                    }
                }).error(function(res, status){
                    console.log('selectAllNoReadCounts error');
                });
        };

        return {
            selectAllNoReadCounts: selectAllNoReadCounts
        }
    }

    return zwxNav;
});
