/*
 * grace-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.0.2-a1 - 2015-04-23
 * License: MIT
 */
angular.module("grace.bootstrap", ["grace.bootstrap.tpls", "grace.bootstrap.bindHtml","grace.bootstrap.bindTemplate","grace.bootstrap.checkbox","grace.bootstrap.chosenAssociate","grace.bootstrap.dataFormatter","grace.bootstrap.dataAdapterModelManager","grace.bootstrap.dataAdapter","grace.bootstrap.date","grace.bootstrap.dateparser","grace.bootstrap.position","grace.bootstrap.datepicker","grace.bootstrap.dimension","grace.bootstrap.dimensionBaseSelect","grace.bootstrap.dimensionSelectWithCheckBox","grace.bootstrap.dimensionSelectWithCustom","grace.bootstrap.dimensionSelectWithRadioBox","grace.bootstrap.dropdown","grace.bootstrap.fieldManager","grace.bootstrap.pagination","grace.bootstrap.tooltip","grace.bootstrap.grid","grace.bootstrap.input","grace.bootstrap.transition","grace.bootstrap.modal","grace.bootstrap.nav","grace.bootstrap.radio","grace.bootstrap.select","grace.bootstrap.selectByGroup","grace.bootstrap.string","grace.bootstrap.summary","grace.bootstrap.summaryList","grace.bootstrap.table","grace.bootstrap.tabs"]);
angular.module("grace.bootstrap.tpls", ["template/checkbox/checkbox.html","template/chosenAssociate/chosenAssociate.html","template/datepicker/datepicker.html","template/datepicker/daterangepicker.html","template/datepicker/day.html","template/datepicker/dayrange.html","template/datepicker/hour.html","template/datepicker/minuteOrSecond.html","template/datepicker/month.html","template/datepicker/popup.html","template/datepicker/year.html","template/dimension/dimension.html","template/dimensionBaseSelect/dimensionBaseSelect.html","template/dimensionBaseSelect/dimensionSelectWithCheckBox.html","template/dimensionBaseSelect/dimensionSelectWithCustom.html","template/dimensionBaseSelect/dimensionSelectWithRadioBox.html","template/pagination/pager.html","template/pagination/pagination.html","template/tooltip/tooltip-html-unsafe-popup.html","template/tooltip/tooltip-popup.html","template/grid/grid.html","template/grid/gridBody.html","template/grid/gridCell.html","template/grid/gridFooter.html","template/grid/gridFooterCell.html","template/grid/gridHeader.html","template/grid/gridHeaderCell.html","template/grid/gridPagination.html","template/grid/gridScreener.html","template/grid/gridSearchAll.html","template/input/input.html","template/modal/backdrop.html","template/modal/window.html","template/nav/nav.html","template/radio/radio.html","template/select/select.html","template/selectByGroup/selectByGroup.html","template/summary/summary-item.html","template/summary/summary.html","template/summaryList/summaryList.html","template/table/table.html","template/tabs/tab.html","template/tabs/tabset.html"]);
angular.module('grace.bootstrap.bindHtml', [])

    .directive('graceBindHtmlUnsafe', function () {
        return function (scope, element, attr) {
            element.addClass('ng-binding').data('$binding', attr.graceBindHtmlUnsafe);
            scope.$watch(attr.graceBindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
                element.html(value || '');
            });
        };
    });
angular.module('grace.bootstrap.bindTemplate', [])

    .directive('graceBindTemplate',['$compile', function ($compile) {
        return function (scope, element, attr) {
            element.addClass('ng-binding').data('$binding', attr.graceBindTemplate);
            scope.$watch(attr.graceBindTemplate, function bindTemplateWatchAction(value) {
                element.html(value || '');
                $compile(element.contents())(scope);
            });
        };
    }]);
/**
 * Created by zb on 03/02/20 下午7:40.
 */

angular.module("grace.bootstrap.checkbox",[])
	.constant('checkboxConfig', {
        checkboxList: []
    })
	.controller('checkboxController', ['$scope', 'checkboxConfig', function($scope, checkboxConfig){
        $scope.checkboxList = $scope['checkboxDatas'] ? $scope['checkboxDatas'] : checkboxConfig['checkboxList'];
        $scope.selection = [];
        $scope.changeboxChange = function(ck, evt){
            ck.checked = !ck.checked;
            if(ck.checked){
                $scope.selection.push(ck.value);
            }
            else{
                angular.forEach($scope.selection, function(value, key){
                    if(value === ck.value){
                        $scope.selection.splice(key, 1);
                    }
                })
            }

            $scope.selectValue($scope.selection)
        };
        $scope.$watch('checkboxDatas', function (newValue) {
            $scope.checkboxList = newValue ? newValue : checkboxConfig['checkboxList'];
            $scope.selection = [];
            if($scope.isAllSelected){
                var i = 0;
                while(i < $scope.checkboxList.length){
                    $scope.selection.push($scope.checkboxList[i].value);
                    $scope.checkboxList[i].checked = true;
                    i++;    
                }
            }
        });
	}])
    .directive('graceCheckbox', [ function(){
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/checkbox/checkbox.html',
            scope: {
                checkboxDatas: '=?',
                selectValue: '=?',
                isAllSelected: '=?'
            },
            controller: 'checkboxController',
            link: function (scope, element, attrs, ctrls) {
                if(angular.isString(attrs['horizontal'])){
                    scope.horizontal = 'horizontal';
                }
            }
        }
    }]);


var app = angular.module("grace.bootstrap.chosenAssociate",[])

    .constant("chosenAssociateConfig",{
        "isPaging":false,
        "plural": false,
        "isDefault": true
    })
    .controller("chosenAssociateController",["$scope", "$http", "chosenAssociateConfig", "$sce", function($scope,$http,chosenAssociateConfig,$sce){
        $scope.bodyShow = false;
        $scope.isPaging = $scope.isPaging === undefined ? chosenAssociateConfig.isPaging : $scope.isPaging;
        $scope.plural = $scope.plural === undefined ? chosenAssociateConfig.plural : $scope.plural;
        $scope.isDefault = $scope.isDefault === undefined ? chosenAssociateConfig.isDefault : $scope.isDefault;
        $scope.expression = '';
        if(!$scope.ngModel){
            $scope.ngModel = {selected: '', param: ''};
        
            if($scope.plural){
                $scope.ngModel['selected'] = [];    
            }
            else{
                $scope.ngModel['selected'] = '';
            }    
        }
        
        $scope.trust = function(htmlBody){
            return $sce.trustAsHtml(htmlBody);
        };

        $scope.$watch('data', function(){
            if(!$scope.data){
                return;
            }

            if(!$scope.plural && !$scope.isDefault){
                $scope.ngModel['selected'] = '';
            }
            else{
                $scope.ngModel['selected'] = !$scope.ngModel['selected'] ? $scope.data[0] : $scope.ngModel['selected'];
            }
            $scope.currentPageData = angular.copy($scope.data);
        },true);
        
        $scope.changeConfigured = function(con){
            if($scope.plural){
                var isHave = false;
                angular.forEach($scope.ngModel['selected'], function(value, key){
                    if(value.code == con.code){
                        isHave = true;
                    }
                });
                if(isHave){
                    return;
                }
                $scope.ngModel['selected'].push(con);
            }
            else{
                //$scope.expression = '';
                $scope.currentPageData = angular.copy($scope.data);
                $scope.ngModel['selected'] = con;
            }
            /*$scope.getWidth();*/
        };

        $scope.selectFuzzy = function(){
            if(!$scope.loadData){
                var reg = new RegExp($scope.expression, 'i');
                var temp = [];
                for(var i= 0,idata;(idata = $scope.data[i]);i++){
                    if( reg.test(idata.name) || reg.test(idata.code)){
                        temp.push({'name':idata.name, 'code':idata.code});
                    }
                }
                $scope.currentPageData = temp;
            }
            else{
                $scope.ngModel['param'] = $scope.expression;
                $scope.loadData && $scope.loadData();      
            }
        }

        $scope.choiceCloseClick = function(con){
            for(var i = 0, idata; (idata = $scope.ngModel['selected'][i]); i++){
                if(idata.code == con.code){
                    $scope.ngModel['selected'].splice(i, 1);
                    break;
                }
            }
            angular.element('.plural-expression').focus();
        }

        $scope.getWidth = function(evt){
            elm = $(evt.target).parent();
            elm.find('.plural-expression').width(elm.width() - elm.find('span').length * 58 - 12);
        }

        $scope.setWidth = function(evt){
            elm = $(evt.target).parent();
            elm.find('.plural-expression').width('20');
        }
    }])

    

    .directive("graceChosenAssociate",["$window", function(win){

        return {
            restrict:"EA",
            require:['graceChosenAssociate', '^ngModel'],
            controller:"chosenAssociateController",
            templateUrl:"template/chosenAssociate/chosenAssociate.html",
            replace:true,
            scope:{
                data: '=',
                ngModel: '=',
                isPaging: '=?',
                plural: '=?',
                loadData: '=?',
                isDefault: '=?' 
            },
            link:function(scope,element,attr,ctrl){
                var awin = angular.element(win);
                awin.on("click",function(){
                    scope.$apply(function(){
                        scope.bodyShow = false;
                        scope.currentPageData = angular.copy(scope.data);
                        //scope.ngModel['param'] = scope.expression = '';
                    });
                }); 
                var associateInput = element.find('#chose-single');
                associateInput.on('click', function(evt){
                    scope.ngModel['param'] = scope.expression;
                    //scope.loadData && scope.loadData();  
                    scope.$apply(function(){
                        scope.bodyShow = !scope.bodyShow;
                    });
                    evt.originalEvent.cancelBubble = true;
                });

                var associateInputPlural = element.find('#chose-plural');
                var pluralExpression = element.find('.plural-expression');
                associateInputPlural.on('click', function(evt){
                    pluralExpression.focus();
                    scope.ngModel['param'] = angular.copy(scope.expression);
                    //scope.loadData && scope.loadData();  

                    scope.$apply(function(){
                        scope.bodyShow = !scope.bodyShow;
                    });
                    evt.originalEvent.cancelBubble = true;
                });

                var associateExpression = element.find('.associate-body input');
                associateExpression.on('click', function(evt){
                    evt.originalEvent.cancelBubble = true;
                });

                element.find('#chose-plural').delegate('.choice-close', 'click', function(evt){
                    evt.stopPropagation();
                });
            }
        }

    }]);

/**
 * Created by liujiangtao on 15/1/22 下午3:23.
 */

angular.module("grace.bootstrap.dataFormatter",[])

    .factory("$gDataFormatterFactory",["$filter",function($filter){

        var tmpDateFormat = "yyyy-MM-dd";
        var tmpCurrency = "￥";
        var tmpPercentCharactor = "%";

        var formatters = {

            number:function(input,param){
                input = parseFloat(input);
                param = param || "";
                var tmp = param.split("_");
                var res = $filter("number")(input,tmp[0] || 0);
                if(parseInt(tmp[1])){
                    input > 0 && (res = "+"+res)
                }
                return res;
            },

            percent:function(input,param){
                var multiply100;
                if(param && (multiply100 = param.split("_")[2]) && parseInt(multiply100)){
                    input = parseFloat(input)*100;
                }
                return this.number(input,param)+tmpPercentCharactor;
            },

            date:function(input,param){
                if(!param){
                    return $filter("date")(input,tmpDateFormat);
                }
                else{
                    return $filter("date")(input,param);
                }
            },

            currency:function(input,param){

                if(!param){
                    return $filter("currency")(input,tmpCurrency);
                }
                else{
                    return $filter("currency")(input,param);
                }

            },

            limitTo:function(input,param){

                if(!param) return input;

                return $filter("limitTo")(input,param);
            },

            typeCast:function(input,param){

                switch(param){
                    case "i":
                        return parseInt(input);
                    case 'f':
                        return parseFloat(input);
                    case 's':
                        if(input instanceof Object) return JSON.stringify(input);
                        return input+"";
                    case 'o':
                        return input && JSON.parse(input) || input;
                    case 'b':
                        if(input == 'true') return true;
                        else if(input == 'false' || input == '0' || input == 'undefined' || input == 'null') return false;
                        else return !!input;
                    default :
                        return input;
                        break;
                }

            }

        }

        function valueFormatter(input,param){

            var index = param.indexOf("_");

            if(index == -1){
                var type = param;
                param = null;
            }
            else{
                var type = param.substr(0,index);
                param = param.substr(index+1);
            }

            if(formatters[type]){

                return formatters[type](input,param);
            }


            return input;

        }

        return valueFormatter

    }])

    .filter("dataFormatterFilter",["$gDataFormatterFactory",function(dataFormatter){


        return dataFormatter;

    }]);
/**
 * Created by liujiangtao on 15/1/20 下午7:40.
 */

angular.module("grace.bootstrap.dataAdapterModelManager",["grace.bootstrap.dataFormatter"])
/**
 * 管理Model的服务，可定义model也可获取model
 *
 * 注入graceModelManager之后，假设得到的实例变量名为ModelManager，要定义一个Model，
 * 可以像下面这样
 ModelManager.define("gUsers",{

    //wakaka是解析结果的字段名，users是被解析的数据对象中的字段名
    "wakaka|users":[
        {
            //
            uid:"id",
            uname:"name",
            birthday:"$.yoxi.date",
            "uorders|orders":[
                {
                    orderId:"id",
                    total:"total",
                    info:"$.smth"
                }
            ],
            "orderMap|orders":{
                "#autoKey|id":{
                    orderId:"id",
                    total:"total",
                    info:"$.smth"
                }
            }
        }
    ]
})

 ModelManager.define("NH.WW.YY.Users",{
    "wakaka|users":[
        "@NH.User"
 ]
 })

 ModelManager.define("NH.User",{
    uid:"id",
    uname:"name",
    birthday:"$.yoxi.date",
    "uorders|orders":[
        "@Order"
 ],
 "orderMap|orders":{
        "#autoKey|id":"@Order"
 }
 })

 ModelManager.define("Order",{
    orderId:"id",
    total:"total",
    info:"$.smth"
})


 *
 */

    .factory("$gDataAdapterModelManagerFactory",function(){


        var models = {};
        var constants = {};

        var exports = {

            define:function(modelName,modelStructure){

                if(models[modelName]) return ;

                var packages = modelName.split(".");
                modelName = packages.pop();

                var cPackage = models;
                var cPackageName;
                while(cPackageName = packages.shift()){
                    !cPackage[cPackageName] && (cPackage[cPackageName] = {isPackage:true});
                    cPackage = cPackage[cPackageName];
                }

                cPackage[modelName] = modelStructure;
            },

            constant:function(modelName,modelStructure){

                /*if(constants[modelName]) return ;

                var packages = modelName.split(".");
                modelName = packages.pop();

                var cPackage = constants;
                var cPackageName;
                while(cPackageName = packages.shift()){
                    !cPackage[cPackageName] && (cPackage[cPackageName] = {isPackage:true});
                    cPackage = cPackage[cPackageName];
                }

                cPackage[modelName] = modelStructure;*/

                this.define(modelName,modelStructure);

            },

            get:function(modelName){
                var packages = modelName.split(".");

                var cModel = models;
                var cModelName;

                while(cModelName = packages.shift()){
                    cModel = cModel[cModelName];
                }

                return cModel;
            }
        }

        return exports;

    })

/**

 {
    "body": {
        "data": [
            [
                "201410021837",
                "852454",
                "1309299",
                "515111085"
            ],
            [
                "201410031837",
                "824017",
                "1272170",
                "505233436"
            ]
        ],
        "meta": {
            "meta": [
                {
                    "di": "TotalAmountBeforeDiscount",
                    "type": ""
                },
                {
                    "di": "TotalEffectiveOrders",
                    "type": ""
                },
                {
                    "di": "TimeMinuteDay",
                    "type": ""
                },
                {
                    "di": "UserNumberPlaceOrder",
                    "type": ""
                }
            ],
            "metaIndex": {
                "TimeMinuteDay": 0,
                "TotalAmountBeforeDiscount": 3,
                "TotalEffectiveOrders": 2,
                "UserNumberPlaceOrder": 1
            }
        },
        "size": 2
    },
    "header": {
        "code": "200",
        "desc": "successful"
    }
}

 */
/**
 * Created by liujiangtao on 15/1/20 下午7:40.
 */

angular.module("grace.bootstrap.dataAdapter",["grace.bootstrap.dataFormatter", "grace.bootstrap.dataAdapterModelManager"])

    .factory("$gDataAdapterFactory",["$gDataFormatterFactory", '$gDataAdapterModelManagerFactory', function(dataFormatter,ModelManager){

        var exports = {};

        var tmpOption = {
            root:"data",
            success:"success",
            message:"message",
            propertyRegRoot:"$",
            propertyJoiner:".",
            propertyModelPre:"@",
            propertyConstantPre:"&",
            parentKey:"#parentKey",
            autoWalkKey:"#autoKey",
            autoWalkKeyReg:/#autoKey\*?/,
            enableFormatter:true,
            dynamicModel:{}
        }

        var readOption = null;
        var wholeData = null;
        var readModel = null;

        var complexProperty = /{{(.*?)}}/g;
        var referOuterProperty = /&([^\[]*)(\[(.*?)\])?/;
        var property2Parse = /^(\$\.)?([^\s'"<>]+\.)+[^\s'"<>]+$/;
        var selfReg = /_this_/;

        var constantProperty = /^=(.*)/;

        function extend(dst,src){
            if(arguments.length < 2) return dst;
            for(var p in src){
                dst[p] = src[p];
            }
            return dst;
        }

        function getRoot(){

            return readOption.root ? getCurrentData(wholeData,readOption.root) : wholeData;

        }

        function getModel(modelName){

            var rslt;
            if(readOption.dynamicModel[modelName]){
                rslt = getCurrentData(getRoot(),readOption.dynamicModel[modelName]);
                if (!rslt){
                    throw new Error("没有找到动态的Model:"+modelName);
                }
            }
            else{
                rslt = ModelManager.get(modelName);
                if (!rslt){
                    throw new Error("没有找到预定义Model:"+modelName);
                }
            }

            return rslt;
        }

        function getModeln(modelName){
            if(modelName instanceof Object) return modelName;

            if(modelName.indexOf && modelName.indexOf(readOption.propertyModelPre) != -1){
                return getModel(modelName.replace(readOption.propertyModelPre,""));
            }
        }

//        function data2RealType(){}
        /**
        *  @desc 遍历输入的对象， 如果对象元素的key含#track  ； 且 key对应的值为字符串； 取出值对应的model； 返回 
        *  @param [obj]
           @return [key, modelObj]  key为输入对象的下标， modelObj为key对应值所对应的模型对象
        */
        function arrayToHash(cmodel){

            for(var p in cmodel){

                if(p.indexOf("#track") != -1){
                    var tmp = cmodel[p];
                    if(typeof tmp == "string"){
                        tmp = getModel(tmp.replace(readOption.propertyModelPre,""));
                    }
                    return [p,tmp];
                }

            }

            return null;
        }

        /**
         * 根据输入的数据以及属性，从输入的数据中，找到所给属性对应的值，并返回，
         * 如果所给的属性包含格式化信息，返回的数据会被格式化
         * @param data  输入数据
         * @param property 要查找的属性
         * @returns {*}
         */
        function getCurrentData(data,property){

            //字符串化
            property += "";

            //将属性的格式化的pattern分离出去
            var props = property.split("::");
            property = props[0];
            var formatPattern = props[1];

            //如果属性有根标识，就从根找数据
            if(property.indexOf(readOption.propertyRegRoot)!=-1){
                data = getRoot();
                property = property.replace(readOption.propertyRegRoot+readOption.propertyJoiner,"");
            }

            //如果属性是多层级的，就多层级的来找
            if(property.indexOf(readOption.propertyJoiner) != -1){
                var props = property.split(".");
                var i = 0;
                while(props[i]){
                     data = data[props[i]];
                     if(!data){
                        break;
                    }
                    i++;
                }

                //允许格式化，且配置了格式化的pattern，会将数据格式化掉
                return (readOption.enableFormatter && formatPattern) ? dataFormatter(data,formatPattern) : data;
            }
            return (readOption.enableFormatter && formatPattern) ? dataFormatter(data[property],formatPattern) : data[property];
        }
        /**
        *    记录配置
              model 数据类型  
              判断key类型
              判断数据类型
        *  
        */
        var Handle = {
           /**
            *  @param model [string]
            *  @return object
            */
            modelString: function(model){
                var ret = {};
                
                //INDEX  "name"
                //TEMPLATE_TRACK  "#parentKey"
                //TEMPLATE_FORMAT  "body.meta.metaIndex"  "$.smth"
                //         "my name is {{name}} and my birthday is {{$.yoxi.date::date_yyyy/MM/dd}}. Thank you All!"
                //         $.yoxi.date::date_yyyy/MM/dd
                //CONSTANT    "=haha it's great"  "=123.45::typeCast_f"
                //THIS    "_this_"
                //OUTTER  "@order"
              
                // ret.type = 'INDEX'; //INDEX  TEMPLATE_TRACK、 TEMPLATE_FORMAT  THIS  CONSTANT
                // ret.formater = '';

                if( /^_this_$/.test(model) ){
                    ret.type = 'THIS';
                    ret.model = model; 
                } 
                else if( new RegExp('^'+readOption.propertyModelPre).test(model) ){
                    ret = Handle.modelType( getModel(model.replace(readOption.propertyModelPre,"")) );
                    // ret.type = 'OUTTER';
                    // ret.model = getModel(model.replace(readOption.propertyModelPre,"")) ;
                }
                else if( /^#parentKey$/.test(model) ){
                    ret.type = 'TEMPLATE_TRACK';
                    ret.model = model;
                }
                else if( /^=/.test(model) ){
                    var matchResult;
                    ret.type = 'CONSTANT';
                    ret.formater = !!(matchResult=model.match(/::(\w+)$/) )?matchResult[1]:"";
                    ret.model = !!ret.formater?model.replace(matchResult[0], ''):model;
                    ret.data = ret.model.replace(/^=/, '');
                }
                else if( /^[a-z A-Z 0-9 _]+$/.test(model) ){
                    ret.type = 'INDEX';
                    ret.formater = !!(matchResult=model.match(/::(\w+)$/) )?matchResult[1]:"";
                    ret.model = model;
                }else{
                    ret.type = "TEMPLATE_FORMAT";
                    ret.model = model;
                }
                return ret; 
            },
            /**
            *  @param model [string obj array] 
               model 类型是数组，表示返回值为数组类型
               model 类型为 json， 表示返回值类型为 json

            */
            modelType: function(model){
                var ret = {};
                // console.log('============modelType in===========');
                (typeof model).toUpperCase() == 'NUMBER' && (model += "");
                ret.type = (typeof model).toUpperCase(); 
                ret.model = model ;
                if(ret.type === 'STRING'){
                    ret = Handle.modelString(model);
                    // return ret;
                }
                return ret;
            },
             /**
            *  解析源数据索引模板  和  模板类型的字符串模型
            *  @param [string]  
            *  {{#parentKey}}、 id  、body.summary.model  、$.summary.{{#parentKey}}

                模板类型的字符串模型    "&woha.ah[a.b.c.{{decimal}}]"
                模板类型的字符串模型  my name is {{name}} and my birthday is {{$.yoxi.date::date_yyyy/MM/dd}}. Thank you All!
               @return [object] 返回解析后的数据
            */
            sourceDataTemplate: function(sourceTpl, currentData, parentKey){
                 var ret = {};
                if( referOuterProperty.test(sourceTpl) ){
                    var matchResult = sourceTpl.match(referOuterProperty);
                    var outerConstant = ModelManager.get(matchResult[1]);
                    if(matchResult[3]){
                        if(complexProperty.test(matchResult[3])){
                            matchResult[3] = matchResult[3].replace(complexProperty,function(a,b,i){
                                if(b == readOption.parentKey) return parentKey;
                                else return getCurrentData(currentData,b);
                            })

                        }
                        ret.tdata = getCurrentData(outerConstant,matchResult[3]);
                    }
                    else{
                        ret.tdata = outerConstant;
                    }
                }

                else if(complexProperty.test(sourceTpl)){
                        sourceTpl = sourceTpl.replace(complexProperty,function(a,b,i){
                            if(b == readOption.parentKey) return parentKey;
                            else return getCurrentData(currentData,b);
                        })
                        //如果sourceTpl是索引
                        if(property2Parse.test(sourceTpl)){
                           ret.tdata = getCurrentData(currentData, sourceTpl);
                        }
                        //当sourceTpl只是常量字符串模板，
                        else{
                           ret.tdata = sourceTpl;
                        }

                         
                }
                else{
                    ret.tdata = getCurrentData(currentData, sourceTpl); 
                }
               
                ret.sourceTpl = sourceTpl;
                return ret; 
            },
            /**
            *  模型类型为数组，则返回值类型为数组
               et: 
                  ["name"]    srouceData [{name:'juici'}, {name:'jhon'}, {name:'mick'}] 
                                 newData ["juici", "jhon", "mick"]

                  [{name:'name'}]  srouceData [{name:'juici'}, {name:'jhon'}, {name:'mick'}]  
                                              { f:{name:'juici'}, s:{name:'jhon'}, d:{name:'mick'} }
                                 newData [ {name:"juici"},{name:"jhon"},{name:"mick"}]


                  ["name", "age", "family"]  sourceData { name:"juicy", age:'27', family:'big' }
                                                newData { "juicy", "27", "big" }


            *  currentData 表示解析当前模型对应的数据
               model需要解析的模型
               parentKey  指向当前数据的 key
              
            */
            array: function(currentData, model, parentKey){
                var len = model.length, res=[],  model_0, modelInfo_0 ;
                if( len===1 ){
                    // model_0 = model[0];
                    modelInfo_0 = Handle.modelType(model[0]);


                    if( modelInfo_0.type == 'INDEX' && ( currentData instanceof Array) ){
                        for(var i=0,len=currentData.length; ic=currentData[i]; i++){
                            res.push( ic[modelInfo_0.model] );
                        }
                        return res;
                    }
                    if( modelInfo_0.type == 'OBJECT' && ( currentData instanceof Array ) ){
                        for(var i=0,len=currentData.length; ic=currentData[i]; i++){
                            res.push( readan(ic, modelInfo_0.model, i, 0, modelInfo_0  ) );
                        }   
                    }
                    else if(modelInfo_0.type == 'OBJECT' && (typeof currentData === 'object')){
                        for(var p in currentData){
                            res.push( readan(currentData[p], modelInfo_0.model, p, 0, modelInfo_0  ) );
                        }
                    }
                    return res;
                }

                //模型为指标id数组
                for(var i= 0,im; (im = model[i]); i++){
                     res[i] = currentData[im];
                }

                
               
                return  res;
            },
           
            /**
            *  模型返回数据是对象
               currentData 待解析的源数据
               model  待解析的模型
               parentKey  源数据父级key
              

               模型只有一个key，且key 为 #parentKey
               
               {'#autoKey': { rname:'name', rid:'id' }}  sourceData[array|object]   [{name:'juciy', id:'229'}, {name:'juciy33', id:'220'}]
                            outputData :  { 0:{rname:juciy, rid:229}, 1: {rname:'juciy33', rid:220} }


               {'#autoKey|name': {rname:'name', rid:'id'} }  sourceData[array|object]   [{name:'juciy', id:'229'}, {name:'juciy33', id:'220'}]

                           outputData :  { juiciy:{rname:juciy, rid:229}, juciy33: {rname:'juciy33', rid:220} }
            *
            *
            */
            object: function(currentData, model, parentKey){
                var modelInfo_0 = {};
                var res={}; 
                for( var p in model ){

                    //'#autoKey':'childModel'
                    //'#autoKey*childKey':'childModel'
                    if(/#autoKey\*?/.test(p)){
                        var pInfo = p.split("*");

                        modelInfo_0 = Handle.modelType(model[p]);
                        for(var k in currentData){
                            var cd = currentData[k];
                            res[ pInfo[1] ? cd[pInfo[1]] : k] = readan( cd, modelInfo_0.model, k  );
                        }
                        return res;
                    }
//                    //'#autoKey' ==> {{$.#autoKey}}
//                    if(p==='#autoKey'){
//
//                          modelInfo_0 = Handle.modelType(model[p]);
//                          for(var k in currentData){
//                            res[k] = readan( currentData[k], modelInfo_0.model, k  );
//                          }
//                          return res;
//                    }
//                    //"#autoKey|name"  ==>    "{{$.#autoKey.name}}"
//                    if(/^#autoKey\|/.test(p)){
//                        var pInfo = p.split("|");
//                        modelInfo_0 = Handle.modelType(model[p]);
//                        // var tmodel = getModeln(model[p]);
//
//                        for(var i= 0,ic;(ic = currentData[i]);i++){
//                            res[ ic[pInfo[1]] ] = readan(ic, modelInfo_0.model, i);
//                        }
//
//                        return res;
//                    }
                    //p含字符 |
                    //name|{{#parentKey}}
                    if(/\|/.test(p)){
                       var pInfo = p.split("|"), tplAnalyze;
                        modelInfo_0 = Handle.modelType(model[p]) ;

                        tplAnalyze = Handle.sourceDataTemplate(pInfo[1], currentData, parentKey  );

                        res[pInfo[0]] = readan(tplAnalyze.tdata, modelInfo_0.model, tplAnalyze.sourceTpl);
                    }

                    if( /^[a-z A-Z 0-9 _$]+$/.test(p) ){
                        modelInfo_0 = Handle.modelType( model[p] );
                        switch(modelInfo_0.type){
                            case  'THIS':
                                res[p] = currentData;
                                break;
                            case 'TEMPLATE_TRACK':
                               res[p] = parentKey;
                               break;
                            case 'CONSTANT':
                               if(modelInfo_0.formater){
                                    res[p] =  dataFormatter.apply(null,[modelInfo_0.data, modelInfo_0.formater]);
                               }else{
                                    res[p] = modelInfo_0.data;
                               }
                               break;

                            case 'INDEX':
                               res[p] = getCurrentData(currentData,modelInfo_0.model);
                               break;

                            case 'TEMPLATE_FORMAT':
                               res[p] = Handle.sourceDataTemplate(modelInfo_0.model, currentData, parentKey ).tdata;

                               break;

                            default:
                              res[p]= currentData
                              break;
                        }
                    }


                }
                return res; 

            }//object

        } //end of Handle;   
        

        function readan(currentData, model, parentKey ){
            var rule = {}, res , type;
            if(!model){
                return currentData;
            }
            type = typeof model;
            if( model instanceof Array){
                type = 'array';
            }
            res = Handle[type](currentData, model, parentKey);
            return res;
           
        }

        exports.read = function(data,model,option){

            readOption = extend(extend({},tmpOption),option);
            wholeData = data;
            readModel = model;

            var rootData = getRoot();

            if(!rootData) return;

            var res = readan(rootData,model,readOption.root);

            return res;
        }

        return exports;

    }])
/*
* 添加_this_关键字
* 添加hash到hash的自动遍历
* */
/**
 * 管理Model的服务，可定义model也可获取model
 *
 * 注入graceModelManager之后，假设得到的实例变量名为ModelManager，要定义一个Model，
 * 可以像下面这样
 ModelManager.define("gUsers",{

    //wakaka是解析结果的字段名，users是被解析的数据对象中的字段名
    "wakaka|users":[
        {
            //
            uid:"id",
            uname:"name",
            birthday:"$.yoxi.date",
            "uorders|orders":[
                {
                    orderId:"id",
                    total:"total",
                    info:"$.smth"
                }
            ],
            "orderMap|orders":{
                "#autoKey|id":{
                    orderId:"id",
                    total:"total",
                    info:"$.smth"
                }
            }
        }
    ]
})

 ModelManager.define("NH.WW.YY.Users",{
    "wakaka|users":[
        "@NH.User"
 ]
 })

 ModelManager.define("NH.User",{
    uid:"id",
    uname:"name",
    birthday:"$.yoxi.date",
    "uorders|orders":[
        "@Order"
 ],
 "orderMap|orders":{
        "#autoKey|id":"@Order"
 }
 })

 ModelManager.define("Order",{
    orderId:"id",
    total:"total",
    info:"$.smth"
})


 *
 */
 
/**
 * 日期转换API
 */
Date.prototype.toJSON = function () { return this.toString();}      //JSON化Date时默认转换为当前时区
angular.module("grace.bootstrap.date", [])
    .constant("graceDateConfig", {
        pattern_ymd: 'yyyy-MM-dd',
        pattern_ym: 'yyyy-MM',
        pattern_md: 'MM-dd',
        pattern_week: ['SUN','MON','TUE','WED','THU','FRI','SAT'],
        pattern_ymd_cn: 'yyyy年MM月dd日',
        pattern_ym_cn: 'yyyy年MM月',
        pattern_md_cn: 'MM月dd日',
        pattern_week_cn: ['日','一','二','三','四','五','六'],

        datetime_mm: 6e4,
        datetime_hh: 36e5,
        datetime_dd: 864e5
    })
    .factory('graceDateServ', ["graceDateConfig",function (_graceDateConfig) {
        var format = function(_date, _pattern){
            _date = _date||new Date();
            var returnVal = _pattern||_graceDateConfig.pattern_ymd;
            returnVal = returnVal.replace(/yyyy|YYYY/,_date.getFullYear());
            returnVal = returnVal.replace(/yy|YY/,(_date.getFullYear() % 100)>9?(_date.getFullYear() % 100).toString():'0' + (_date.getFullYear() % 100));
            returnVal = returnVal.replace(/MM/,(_date.getMonth()+1)>9?(_date.getMonth()+1).toString():'0'+(_date.getMonth()+1));
            returnVal = returnVal.replace(/M/g,_date.getMonth()+1);
            returnVal = returnVal.replace(/w|W/g,_graceDateConfig.pattern_week_cn[_date.getDay()]);
            returnVal = returnVal.replace(/dd|DD/,_date.getDate()>9?_date.getDate().toString():'0' + _date.getDate());
            returnVal = returnVal.replace(/d|D/g,_date.getDate());
            returnVal = returnVal.replace(/hh|HH/,_date.getHours()>9?_date.getHours().toString():'0' + _date.getHours());
            returnVal = returnVal.replace(/h|H/g,_date.getHours());
            returnVal = returnVal.replace(/mm/,_date.getMinutes()>9?_date.getMinutes().toString():'0' + _date.getMinutes());
            returnVal = returnVal.replace(/m/g,_date.getMinutes());
            returnVal = returnVal.replace(/ss|SS/,_date.getSeconds()>9?_date.getSeconds().toString():'0' + _date.getSeconds());
            returnVal = returnVal.replace(/s|S/g,_date.getSeconds());
            return returnVal;
        };
        /**
         * 获取当前日期前_n天的单日期
         * @param _date
         * @param _n
         * @param _pattern
         * @returns {{date: Date, format: *}}
         */
        var previousDay = function(_date, _n, _pattern){
            _date = _date||new Date();
            _pattern = _pattern||_graceDateConfig.pattern_ymd;
            _n = _n||1;
            var day = new Date(_date.getTime());
            day.setDate(day.getDate()-_n);
            return {
                date: day,
                format: format(day, _pattern)
            };
        };

        /**
         * 获取当前日期之前_n天的日期集合
         * @param _date
         * @param _n
         * @param _pattern
         * @returns {Array}
         */
        var previousDays = function(_date, _n, _pattern){
            _pattern = _pattern||_graceDateConfig.pattern_ymd;
            _date = _date||new Date();
            var days = [];
            for(var i=1;i<=_n;i++) {
                days[i-1] = previousDay(_date, i, _pattern);
            }
            return days;
        };
        /**
         * 获取当前一周内的任意一天的日期
         * @param _date
         * @param _n
         * @param _pattern
         * @returns {{date: Date, format: *}}
         */
        var dayOfCurrentWeek = function(_date, _n, _pattern){
            _date = _date||new Date();
            _pattern = _pattern||_graceDateConfig.pattern_ymd;
            var returnDate = new Date(_date.getTime());
            /*
             * 取得一周内的第一天、第二天、第三天... (本月的第几天-本周的第几天+下标)
             * myDate.getDay()==0?7:myDate.getDay() 本周表示周一~周日，和标准有区别
             */
            returnDate.setDate(_date.getDate() - (_date.getDay()==0?7:_date.getDay()) + _n);
            return {
                date: returnDate,
                format: format(returnDate, _pattern)
            };
        };
        /**
         * 获取当前日期一周内的7天日期集合
         * @param _date
         * @param _pattern
         * @returns {Array}
         */
        var daysOfCurrentWeek = function(_date, _pattern){
            _date = _date||new Date();
            _pattern = _pattern||_graceDateConfig.pattern_ymd;
            var days = [];
            for(var i=1;i<=7;i++) {
                days[i-1] = dayOfCurrentWeek(_date, i, _pattern);
            }
            return days;
        };
        /**
         * 获取当前日期前/后 n周的7天日期集合
         * @param _date
         * @param _n
         * @param _pattern
         * @returns {Array}
         */
        var daysOfPreviousWeek = function(_date, _n, _pattern){
           _date = _date||new Date();
           _pattern = _pattern||_graceDateConfig.pattern_ymd;
           _n = _n||1;
           var day = previousDay(_date, 7*_n, _pattern).date, days = daysOfCurrentWeek(day, _pattern);
           return days;
        };
        /**
         * 获取本月第N天的日期
         * @param _date
         * @param _n
         * @param _pattern
         * @returns {{date: (*|Function|date|date|Function|date), format: (*|Function)}}
         */
        var dayOfCurrentMonth = function(_date, _n, _pattern){
            var daysOfMonth = daysOfCurrentMonth(_date, 0, _pattern);
            return {
                date: daysOfMonth[_n].date,
                format: daysOfMonth[_n].format
            }
        };
        /**
         * 获取本月的开始和结束日期
         * @param _prevDayNum
         * @returns {Array}
         */
        var daysOfCurrentMonth = function(_date, _maxDayNum, _pattern){
            _pattern = _pattern||_graceDateConfig.pattern_ymd;
            _maxDayNum = _maxDayNum||1;
            _date = _date||new Date();
            var today = new Date(),
                day,
                days = [],
                firstDayOfCurrentMonth = new Date(_date.getFullYear(), _date.getMonth(), 1),
                firstDayOfNextMonth = new Date(_date.getFullYear(), _date.getMonth()+1, 1),
                daySize = (firstDayOfNextMonth - firstDayOfCurrentMonth)/_graceDateConfig.datetime_dd;     //计算当前月份的天数
            for(var i=0;i<daySize;i++){
                day = new Date(_date.getFullYear(), _date.getMonth(), i+1);
                days.push({
                    date: day,
                    format: format(day, _pattern)
                });
            }
            if(_date.getFullYear()===today.getFullYear()&&_date.getMonth()===today.getMonth()){       //判断是否当前年月
                days = days.slice(0, days.length-_maxDayNum);       //减去最大日期数（D-N规则）
            }
            return days;
        };
        /**
         * 获取前/后_n月的日期集合
         * @param _date
         * @param _n
         * @param _maxDayNum
         * @param _pattern
         * @returns {Array}
         */
        var daysOfPreviousMonth = function(_date, _n, _maxDayNum, _pattern){
            _pattern = _pattern||_graceDateConfig.pattern_ymd;
            _n = _n||1;
            _maxDayNum = _maxDayNum||1;
            _date = _date||new Date();
            var targetDate = new Date(_date.getFullYear(), _date.getMonth()-_n, 1);
            return daysOfCurrentMonth(targetDate, _maxDayNum, _pattern);
        };
        /**
         * 获取日期所属季节的日期集合
         * @param _date
         * @param _pattern
         * @returns {Array}
         */
        var daysOfCurrentSeason = function(_date, _pattern){
            _date = _date||new Date();
            _pattern = _pattern||_graceDateConfig.pattern_ymd;
            var days = [],day,
                seasonIndex = currentSeasonIndex(_date),
                year = _date.getFullYear(),
                startDate = new Date(year, (seasonIndex-1)*3, 1),
                endDate = new Date(year, seasonIndex*3, 1),
                daySize = (endDate-startDate)/_graceDateConfig.datetime_dd;
            for(var i=0;i<daySize;i++){
                day = new Date(startDate.getTime()+i*_graceDateConfig.datetime_dd);
                days.push({
                    date: day,
                    format: format(day, _pattern)
                });
            }
            return  days;
        };
        /**
         * 获取上季度范围从始月到末月
         * @returns {*}
         */
        var daysOfPreviousSeason = function(_date, _pattern){
            _date = _date||new Date();
            _pattern = _pattern||_graceDateConfig.pattern_ymd;
            var curYear = _date.getFullYear(),
                seasonIndex = currentSeasonIndex(_date),
                step = 3,
                days = [],
                day,
                daySize,
                startDate,
                endDate;
            if(seasonIndex-2<0){
                startDate = new Date(curYear-1, 9, 1);
                endDate = new Date(curYear, 0, 1);
            }else{
                startDate = new Date(curYear, (seasonIndex-2)*step, 1);
                endDate = new Date(curYear, (seasonIndex-1)*step, 1);
            }
            daySize = (endDate-startDate)/_graceDateConfig.datetime_dd;
            for(var i=0;i<daySize;i++){
                day = new Date(startDate.getTime()+i*_graceDateConfig.datetime_dd);
                days.push({
                    date: day,
                    format: format(day, _pattern)
                });
            }
            return  days;
        };
        /**
         * 获取当前季度下标
         * @param _date
         * @returns {number}
         */
        var currentSeasonIndex = function(_date){
            _date = _date||new Date();
            return _date.getMonth()/3 + 1;
        };
        /**
         * 获取上季度下标
         * @param _date
         * @returns {{}}
         */
        var previousSeasonIndex = function(_date){
            _date = _date||new Date();
            var curYear = _date.getFullYear(),curMonth = _date.getMonth(),step = 3,index = {};
            if(curMonth-step<=0){
                index = {
                    year: --curYear,
                    index: 4
                };
            }else{
                index = {
                    year: curYear,
                    index: Math.floor(curMonth/step)
                };
            }
            return index;
        }
        /**
         * 判断闰年
         * @param _date
         * @returns {boolean}
         */
        var ifLeapYear = function(_date){
            _date = _date||new Date();
            var year = _date.getFullYear();
            return (0==year%4&&((year%100!=0)||(year%400==0)));
        };
        /**
         * 根据日期获取周数
         * @param _date
         * @returns {number}
         */
        var getISO8601WeekNumber = function(_date){
            var checkDate = new Date(_date);
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));     //星期四为界定跨年第一周
            var time = checkDate.getTime();
            checkDate.setMonth(0);
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1;
        };
        /**
         * 通过年份+周数获取日期集
         * @param _weekNum
         * @param _year
         * @returns {Array}
         */
        var getDatesByWeek = function(_weekNum, _year){
            var firstDayOfYear = new Date(_year,0,1),
                dayOfWeek = new Date(firstDayOfYear.getTime()+(_weekNum-1)*864e5*7),
                dates = [],
                dayIndexOfWeek = dayOfWeek.getDay(),
                tmpDate;
            for(var i=1;i<=7;i++){
                tmpDate = new Date((i-dayIndexOfWeek)*864e5+dayOfWeek.getTime());
                dates.push(tmpDate);
            }
            return dates;
        }
        return {
            format: format,
            previousDay: previousDay,
            previousDays: previousDays,
            daysOfPreviousWeek: daysOfPreviousWeek,
            dayOfCurrentWeek: dayOfCurrentWeek,
            daysOfCurrentWeek: daysOfCurrentWeek,
            dayOfCurrentMonth: dayOfCurrentMonth,
            daysOfCurrentMonth: daysOfCurrentMonth,
            daysOfPreviousMonth: daysOfPreviousMonth,
            daysOfCurrentSeason: daysOfCurrentSeason,
            daysOfPreviousSeason: daysOfPreviousSeason,
            currentSeasonIndex: currentSeasonIndex,
            previousSeasonIndex: previousSeasonIndex,
            getISO8601WeekNumber: getISO8601WeekNumber,
            getDatesByWeek: getDatesByWeek,
            ifLeapYear: ifLeapYear
        }
    }])
    .filter("graceDateFilter",['graceDateServ', function(_graceDateServ){
        var input, days, returnDates = [];
        return function(_input, _options){
            var options = eval('('+_options+')');
            if(_input instanceof Date){
                input = _input;
            }else{
                input = new Date(_input.replace(/(-|\/)/g, '/'));
            }
            switch(options.type){
                /* 本周的开始、结束日期 START */
                case 'current_week_121': days = _graceDateServ.daysOfCurrentWeek(input, options.pattern);
                                          returnDates = [days[0].format, days[days.length-1].format];
                                          break;
                /* 本周的开始、结束日期 END */
                /* 上N周的开始、结束日期 START */
                case 'previous_week_121': days = _graceDateServ.daysOfPreviousWeek(input, options.n||1, options.pattern);
                    returnDates = [days[0].format, days[days.length-1].format];
                    break;
                /* 上N周的开始、结束日期 END */
                /* 本月的开始、结束日期 START */
                case 'current_month_121': days = _graceDateServ.daysOfCurrentMonth(input, options.pattern);
                                        returnDates = [days[0].format, days[days.length-1].format];
                                        break;
                /* 本月的开始、结束日期 END */
                /* 上N月的开始、结束日期 START */
                case 'previous_month_121': days = _graceDateServ.daysOfPreviousMonth(input, options.n||1, 0, options.pattern);
                    returnDates = [days[0].format, days[days.length-1].format];
                    break;
                /* 上N月的开始、结束日期 END */
                /* 本季度的开始、结束日期 START */
                case 'current_season_121': days = _graceDateServ.daysOfCurrentSeason(input, options.pattern);
                                        returnDates = [days[0].format, days[days.length-1].format];
                                        break;
                /* 本季度的开始、结束日期 END */
                /* 上季度的开始、结束日期 START */
                case 'previous_season_121': days = _graceDateServ.daysOfPreviousSeason(input, options.pattern);
                    returnDates = [days[0].format, days[days.length-1].format];
                    break;
                /* 上季度的开始、结束日期 END */
                /* 默认当前日期 START */
                default: returnDates = [_graceDateServ.format(input, options.pattern)];
                          break;
                /* 默认当前日期 END */
            }
            return returnDates.join(',');
        }
    }]);


angular.module('grace.bootstrap.dateparser', [])

.service('$gDateParserService', ['$locale', 'orderByFilter', function($locale, orderByFilter) {

  this.parsers = {};

  var formatCodeToRegex = {
    'yyyy': {
      regex: '\\d{4}',
      apply: function(value) { this.year = +value; }
    },
    'yy': {
      regex: '\\d{2}',
      apply: function(value) { this.year = +value + 2000; }
    },
    'y': {
      regex: '\\d{1,4}',
      apply: function(value) { this.year = +value; }
    },
    'MMMM': {
      regex: $locale.DATETIME_FORMATS.MONTH.join('|'),
      apply: function(value) { this.month = $locale.DATETIME_FORMATS.MONTH.indexOf(value); }
    },
    'MMM': {
      regex: $locale.DATETIME_FORMATS.SHORTMONTH.join('|'),
      apply: function(value) { this.month = $locale.DATETIME_FORMATS.SHORTMONTH.indexOf(value); }
    },
    'MM': {
      regex: '0[1-9]|1[0-2]',
      apply: function(value) { this.month = value - 1; }
    },
    'M': {
      regex: '[1-9]|1[0-2]',
      apply: function(value) { this.month = value - 1; }
    },
    'dd': {
      regex: '[0-2][0-9]{1}|3[0-1]{1}',
      apply: function(value) { this.date = +value; }
    },
    'd': {
      regex: '[1-2]?[0-9]{1}|3[0-1]{1}',
      apply: function(value) { this.date = +value; }
    },
    'w':{
      regex: '[1-9]|[1-5][0-9]',
      apply: function(value){ this.date = + value; }
    },
    'ww':{
      regex: '0[1-9]|[1-5][0-9]',
      apply:function(value){this.date = +value; }
    },
    'EEEE': {
      regex: $locale.DATETIME_FORMATS.DAY.join('|')
    },
    'EEE': {
      regex: $locale.DATETIME_FORMATS.SHORTDAY.join('|')
    }
  };

  function createParser(format) {
    var map = [], regex = format.split('');

    angular.forEach(formatCodeToRegex, function(data, code) {
      var index = format.indexOf(code);

      if (index > -1) {
        format = format.split('');

        regex[index] = '(' + data.regex + ')';
        format[index] = '$'; // Custom symbol to define consumed part of format
        for (var i = index + 1, n = index + code.length; i < n; i++) {
          regex[i] = '';
          format[i] = '$';
        }
        format = format.join('');

        map.push({ index: index, apply: data.apply });
      }
    });

    return {
      regex: new RegExp('^' + regex.join('') + '$'),
      map: orderByFilter(map, 'index')
    };
  }

  this.parse = function(input, format) {
    if ( !angular.isString(input) || !format ) {
      return input;
    }

    format = $locale.DATETIME_FORMATS[format] || format;

    if ( !this.parsers[format] ) {
      this.parsers[format] = createParser(format);
    }

    var parser = this.parsers[format],
        regex = parser.regex,
        map = parser.map,
        results = input.match(regex);

    if ( results && results.length ) {
      var fields = { year: 1900, month: 0, date: 1, hours: 0 }, dt;

      for( var i = 1, n = results.length; i < n; i++ ) {
        var mapper = map[i-1];
        if ( mapper.apply ) {
          mapper.apply.call(fields, results[i]);
        }
      }

      if ( isValid(fields.year, fields.month, fields.date) ) {
        dt = new Date( fields.year, fields.month, fields.date, fields.hours);
      }

      return dt;
    }
  };

  // Check if date is valid for specific month (and year for February).
  // Month: 0 = Jan, 1 = Feb, etc
  function isValid(year, month, date) {
    if ( month === 1 && date > 28) {
        return date === 29 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
    }

    if ( month === 3 || month === 5 || month === 8 || month === 10) {
        return date < 31;
    }

    return true;
  }
}]);

angular.module('grace.bootstrap.position', [])

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
  .factory('$position', ['$document', '$window', function ($document, $window) {

    function getStyle(el, cssprop) {
      if (el.currentStyle) { //IE
        return el.currentStyle[cssprop];
      } else if ($window.getComputedStyle) {
        return $window.getComputedStyle(el)[cssprop];
      }
      // finally try and get inline style
      return el.style[cssprop];
    }

    /**
     * Checks if a given element is statically positioned
     * @param element - raw DOM element
     */
    function isStaticPositioned(element) {
      return (getStyle(element, 'position') || 'static' ) === 'static';
    }

    /**
     * returns the closest, non-statically positioned parentOffset of a given element
     * @param element
     */
    var parentOffsetEl = function (element) {
      var docDomEl = $document[0];
      var offsetParent = element.offsetParent || docDomEl;
      while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docDomEl;
    };

    return {
      /**
       * Provides read-only equivalent of jQuery's position function:
       * http://api.jquery.com/position/
       */
      position: function (element) {
        var elBCR = this.offset(element);
        var offsetParentBCR = { top: 0, left: 0 };
        var offsetParentEl = parentOffsetEl(element[0]);
        if (offsetParentEl != $document[0]) {
          offsetParentBCR = this.offset(angular.element(offsetParentEl));
          offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
          offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: elBCR.top - offsetParentBCR.top,
          left: elBCR.left - offsetParentBCR.left
        };
      },

      /**
       * Provides read-only equivalent of jQuery's offset function:
       * http://api.jquery.com/offset/
       */
      offset: function (element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
          left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
        };
      },

      /**
       * Provides coordinates for the targetEl in relation to hostEl
       */
      positionElements: function (hostEl, targetEl, positionStr, appendToBody) {

        var positionStrParts = positionStr.split('-');
        var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || 'center';

        var hostElPos,
          targetElWidth,
          targetElHeight,
          targetElPos;

        hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);

        targetElWidth = targetEl.prop('offsetWidth');
        targetElHeight = targetEl.prop('offsetHeight');

        var shiftWidth = {
          center: function () {
            return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
          },
          left: function () {
            return hostElPos.left;
          },
          right: function () {
            return hostElPos.left + hostElPos.width;
          }
        };

        var shiftHeight = {
          center: function () {
            return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
          },
          top: function () {
            return hostElPos.top;
          },
          bottom: function () {
            return hostElPos.top + hostElPos.height;
          }
        };

        switch (pos0) {
          case 'right':
            targetElPos = {
              top: shiftHeight[pos1](),
              left: shiftWidth[pos0]()
            };
            break;
          case 'left':
            targetElPos = {
              top: shiftHeight[pos1](),
              left: hostElPos.left - targetElWidth
            };
            break;
          case 'bottom':
            targetElPos = {
              top: shiftHeight[pos0](),
              left: shiftWidth[pos1]()
            };
            break;
          default:
            targetElPos = {
              top: hostElPos.top - targetElHeight,
              left: shiftWidth[pos1]()
            };
            break;
        }

        return targetElPos;
      }
    };
  }]);

angular.module('grace.bootstrap.datepicker', ['grace.bootstrap.dateparser', 'grace.bootstrap.position', 'grace.bootstrap.date'])

    .constant('datepickerConfig', {
        formatMinute:'HH:mm',
        formatHour: 'HH:mm',
        formatDay: 'dd',
        formatMonth: 'MMMM',
        formatYear: 'yyyy',
        formatDayHeader: 'EEE',
        formatMinuteTitle:"yyyy/MM/dd",
        formatHourTitle:"yyyy/MM/dd",
        formatWeekTitle: 'yyyy/WW',
        formatDayTitle: 'yyyy/MM',
        formatMonthTitle: 'yyyy',
        datepickerMode: 'day',
        minMode: 'day',
        maxMode: 'year',
        showWeeks: true,
        startingDay: 1,
        graceYearRange: 20,
        minDate: null,
        maxDate: null,
        weekMode:false
    })

    .controller('datepickerController', ['$scope', '$attrs', '$parse', '$interpolate', '$timeout', '$log', '$locale', 'dateFilter', 'datepickerConfig','graceDateServ', function ($scope, $attrs, $parse, $interpolate, $timeout, $log, $locale, dateFilter, datepickerConfig,graceDateServ) {
        var self = this,
            ngModelCtrl = { $setViewValue: angular.noop }; // nullModelCtrl;
        /* 覆写周的显示 START */
        angular.extend($locale.DATETIME_FORMATS, {
            DAY: ['日','一','二','三','四','五','六'],
            SHORTDAY: ['日','一','二','三','四','五','六']
        });
        /* 覆写周的显示 END */

        // Modes chain
        this.modes = ['minute', 'hour', 'day', 'month', 'year'];

        // Configuration attributes
        angular.forEach(['formatMinute','formatHour','formatDay', 'formatMonth', 'formatYear', 'formatDayHeader', 'formatMinuteTitle', 'formatHourTitle', 'formatDayTitle', 'formatMonthTitle',
            'minMode', 'maxMode', 'showWeeks', 'startingDay', 'graceYearRange','weekMode'], function (key, index) {
            self[key] = angular.isDefined($attrs[key]) ? (index < 11 ? $interpolate($attrs[key])($scope.$parent) : $scope.$parent.$eval($attrs[key])) : datepickerConfig[key];
        });
        // Watchable date attributes
        angular.forEach(['minDate', 'maxDate'], function (key) {
            if ($attrs[key]) {
                $scope.$parent.$watch($parse($attrs[key]), function (value) {
                    self[key] = value ? new Date(value) : null;
                    self.refreshView();
                });
            } else {
                self[key] = datepickerConfig[key] ? new Date(datepickerConfig[key]) : null;
            }
        });

        /*$attrs.$observe("minMode",function(d){
            console.log("min",d);
        });

        $attrs.$observe("maxMode",function(d){
            console.log("max",d);
        });*/

        $scope.datepickerMode = $scope.datepickerMode || datepickerConfig.datepickerMode;
        $scope.uniqueId = 'grace-datepicker-' + $scope.$id + '-' + Math.floor(Math.random() * 10000);
        self.activeDate = angular.isDefined($attrs.initDate) ? $scope.$parent.$eval($attrs.initDate) : new Date();
        $scope.isActive = function (dateObject) {
            if (self.compare(dateObject.date, self.activeDate) === 0) {
                $scope.activeDateId = dateObject.uid;
                return true;
            }
            return false;
        };

        this.init = function (ngModelCtrl_) {
            ngModelCtrl = ngModelCtrl_;

            ngModelCtrl.$render = function () {
                self.render();
            };
        };

        this.render = function () {
            if (ngModelCtrl.$modelValue) {
                var date = new Date(ngModelCtrl.$modelValue),
                    isValid = !isNaN(date);

                if (isValid) {
                    this.activeDate = date;
                } else {
                    $log.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
                }
                ngModelCtrl.$setValidity('date', isValid);
            }
            this.refreshView();
        };

        this.refreshView = function () {
            if (this.element) {
                this._refreshView();

                var date = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : null;
                ngModelCtrl.$setValidity('date-disabled', !date || (this.element && !this.isDisabled(date)));
            }
        };

        $scope.currentWeek = null;
        var monthCN = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        function getMonthCN(monthIndex){
            return monthCN[monthIndex - 1];
        }
        this.createDateObject = function (date, format) {
            var model = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : null;
            if(!self.weekMode){
                return {
                    date: date,
                    label: format == 'MMMM' ? getMonthCN(parseInt(dateFilter(date, 'M'))) : dateFilter(date, format),
                    selected: model && this.compare(date, model) === 0,
                    disabled: this.isDisabled(date),
                    current: this.compare(date, new Date()) === 0,
                    weekend:date.getDay()==6 || date.getDay() == 0
                };
            }
            else{
                var modelWeek = self.getWeekNumber(model),curWeek = self.getWeekNumber(new Date()),week = self.getWeekNumber(date);
                return {
                    date: date,
                    label: format == 'MMMM' ? getMonthCN(parseInt(dateFilter(date, 'M'))) : dateFilter(date, format),
                    selected: model && week == modelWeek,
                    disabled: this.isDisabled(date),
                    current: curWeek == week,
                    weekend:date.getDay()==6 || date.getDay() == 0,
                    weekIndex: week
                };
            }
        };
        this.createWeekObject =  function (_weekObj) {
            var model = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : null;
            console.log(model);
            return angular.extend({},_weekObj,{
                selected: _weekObj.week==graceDateServ.getISO8601WeekNumber(model)&&self.weekMode
            })
        };

        this.isDisabled = function (date) {
            return ((this.minDate && this.compare(date, this.minDate) < 0) || (this.maxDate && this.compare(date, this.maxDate) > 0) || ($attrs.dateDisabled && $scope.dateDisabled({date: date, mode: $scope.datepickerMode})));
        };

        // Split array into smaller arrays
        this.split = function (arr, size) {
            var arrays = [];
            while (arr.length > 0) {
                arrays.push(arr.splice(0, size));
            }
            return arrays;
        };

        $scope.select = function (date, _dateStr) {
            if(self.weekMode&&angular.isArray(date)){        //如果是周视图
                if(_dateStr&&/^\d{4}-\d{2}$/.test(_dateStr)){
                    var year = _dateStr.split('-')[0],
                        week = _dateStr.split('-')[1];
                    console.log($scope);
                    $scope.weekIndex = $scope.$parent.$parent.weekIndex = week;
                    if(self.minDate&&date[0]<(new Date(self.minDate))){
                        ngModelCtrl.$setViewValue(new Date(self.minDate));
                    }else{
                        ngModelCtrl.$setViewValue(date[0]);
                    }
                    ngModelCtrl.$render();
                }
                return;
            }
            if ($scope.datepickerMode === self.minMode) {
                var dt = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
                dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
                dt.setHours(date.getHours());
                dt.setMinutes(date.getMinutes());
                ngModelCtrl.$setViewValue(dt);
                ngModelCtrl.$render();
            } else {
                self.activeDate = date;
                if(!$scope.switchDisabled){
                    $scope.datepickerMode = self.modes[ self.modes.indexOf($scope.datepickerMode) - 1 ];
                }
            }
        };

        $scope.move = function (direction) {
            var year = self.activeDate.getFullYear() + direction * (self.step.years || 0),
                month = self.activeDate.getMonth() + direction * (self.step.months || 0);
            self.activeDate.setFullYear(year, month, 1);
            self.refreshView();
        };

        $scope.toggleMode = function (direction) {
            if(!$scope.switchDisabled){
                direction = direction || 1;

                if (($scope.datepickerMode === self.maxMode && direction === 1) || ($scope.datepickerMode === self.minMode && direction === -1)) {
                    return;
                }

                $scope.datepickerMode = self.modes[ self.modes.indexOf($scope.datepickerMode) + direction ];
            }
        };

        // Key event mapper
        $scope.keys = { 13: 'enter', 32: 'space', 33: 'pageup', 34: 'pagedown', 35: 'end', 36: 'home', 37: 'left', 38: 'up', 39: 'right', 40: 'down' };

        var focusElement = function () {
            $timeout(function () {
                self.element[0].focus();
            }, 0, false);
        };

        // Listen for focus requests from popup directive
        $scope.$on('datepicker.focus', focusElement);

        $scope.keydown = function (evt) {
            var key = $scope.keys[evt.which];

            if (!key || evt.shiftKey || evt.altKey) {
                return;
            }

            evt.preventDefault();
            evt.stopPropagation();

            if (key === 'enter' || key === 'space') {
                if (self.isDisabled(self.activeDate)) {
                    return; // do nothing
                }
                $scope.select(self.activeDate);
                focusElement();
            } else if (evt.ctrlKey && (key === 'up' || key === 'down')) {
                $scope.toggleMode(key === 'up' ? 1 : -1);
                focusElement();
            } else {
                self.handleKeyDown(key, evt);
                self.refreshView();
            }
        };
    }])

    .directive('graceDatepicker', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/datepicker/datepicker.html',
            scope: {
                datepickerMode: '=?',
                switchDisabled: '=?',
                dateDisabled: '&'
            },
            require: ['graceDatepicker', '?^ngModel'],
            controller: 'datepickerController',
            link: function (scope, element, attrs, ctrls) {
                var datepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];
                if (ngModelCtrl) {
                    datepickerCtrl.init(ngModelCtrl);
                }
            }
        };
    })

    .directive('graceDaypicker', ['dateFilter', 'graceDateServ',function (dateFilter, graceDateServ) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/datepicker/day.html',
            require: '^graceDatepicker',
            link: function (scope, element, attrs, ctrl) {
                scope.showWeeks = ctrl.showWeeks;
                ctrl.step = { months: 1 };
                ctrl.element = element;

                var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                function getDaysInMonth(year, month) {
                    return ((month === 1) && (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
                }

                function getDates(startDate, n) {
                    var dates = new Array(n), current = new Date(startDate), i = 0;
                    current.setHours(12); // Prevent repeated dates because of timezone bug
                    while (i < n) {
                        dates[i++] = new Date(current);
                        current.setDate(current.getDate() + 1);
                    }
                    return dates;
                }

                ctrl._refreshView = function () {
                    var year = ctrl.activeDate.getFullYear(),
                        month = ctrl.activeDate.getMonth(),
                        firstDayOfMonth = new Date(year, month, 1),
                        difference = ctrl.startingDay - firstDayOfMonth.getDay(),
                        numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference,
                        firstDate = new Date(firstDayOfMonth);

                    if (numDisplayedFromPreviousMonth > 0) {
                        firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
                    }

                    // 42 is the number of days on a six-month calendar
                    var days = getDates(firstDate, 42);
                    for (var i = 0; i < 42; i++) {
                        days[i] = angular.extend(ctrl.createDateObject(days[i], ctrl.formatDay), {
                            secondary: days[i].getMonth() !== month,
                            uid: scope.uniqueId + '-' + i
                        });
                    }
                    scope.labels = new Array(7);
                    for (var j = 0; j < 7; j++) {
                        scope.labels[j] = {
                            abbr: dateFilter(days[j].date, ctrl.formatDayHeader),
                            full: dateFilter(days[j].date, 'EEEE')
                        };
                    }
                    scope.rows = ctrl.split(days, 7);
                    if (scope.showWeeks) {
                        scope.title = dateFilter(ctrl.activeDate, ctrl.formatDayTitle);
                        scope.weekNumbers = [];
                        var weekSize = scope.rows.length,
                            lastDateOfWeek,
                            weekNum;
                        for(var i=0;i<weekSize;i++){
                            lastDateOfWeek = scope.rows[i][scope.rows[i].length-1].date;
                            weekNum = graceDateServ.getISO8601WeekNumber(lastDateOfWeek);
                            scope.weekNumbers.push(ctrl.createWeekObject({
                                year: lastDateOfWeek.getFullYear(),
                                week: weekNum
                            }));
                        }
                    }else{
                        scope.title = dateFilter(ctrl.activeDate, ctrl.formatDayTitle);
                    }
                };

                ctrl.compare = function (date1, date2) {
                    return (new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()) );
                };

                scope.selectWeek = function(_weekObj){
                    scope.select(graceDateServ.getDatesByWeek(_weekObj.week,_weekObj.year), _weekObj.year+'-'+(_weekObj.week<10?('0'+_weekObj.week):_weekObj.week));
                };

                ctrl.getWeekNumber = graceDateServ.getISO8601WeekNumber;

                ctrl.handleKeyDown = function (key, evt) {
                    var date = ctrl.activeDate.getDate();

                    if (key === 'left') {
                        date = date - 1;   // up
                    } else if (key === 'up') {
                        date = date - 7;   // down
                    } else if (key === 'right') {
                        date = date + 1;   // down
                    } else if (key === 'down') {
                        date = date + 7;
                    } else if (key === 'pageup' || key === 'pagedown') {
                        var month = ctrl.activeDate.getMonth() + (key === 'pageup' ? -1 : 1);
                        ctrl.activeDate.setMonth(month, 1);
                        date = Math.min(getDaysInMonth(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth()), date);
                    } else if (key === 'home') {
                        date = 1;
                    } else if (key === 'end') {
                        date = getDaysInMonth(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth());
                    }
                    ctrl.activeDate.setDate(date);
                };

                ctrl.refreshView();
            }
        };
    }])

    .directive('graceHourpicker', ['dateFilter', function (dateFilter) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/datepicker/hour.html',
            require: '^graceDatepicker',
            link: function (scope, element, attrs, ctrl) {

                ctrl.element = element;

                ctrl._refreshView = function () {
                    var actdate = ctrl.activeDate,
                        hours = new Array(25),
                        date = actdate.getDate(),
                        month = actdate.getMonth(),
                        year = actdate.getFullYear();

                    for (var i = 0; i < 24; i++) {
                        hours[i] = angular.extend(ctrl.createDateObject(new Date(year, month, date, i), ctrl.formatHour), {
                            uid: scope.uniqueId + '-' + i
                        });
                    }
                    hours[24] = null;

                    scope.title = dateFilter(ctrl.activeDate, ctrl.formatHourTitle);
                    scope.rows = ctrl.split(hours, 5);
                };

                ctrl.compare = function (date1, date2) {
                    return new Date(date1.getFullYear(), date1.getMonth(),date1.getDate(),date1.getHours())
                        - new Date(date2.getFullYear(), date2.getMonth(),date2.getDate(),date2.getHours());
                };

                ctrl.handleKeyDown = function (key, evt) {
                    return;
                    var date = ctrl.activeDate.getMonth();

                    if (key === 'left') {
                        date = date - 1;   // up
                    } else if (key === 'up') {
                        date = date - 3;   // down
                    } else if (key === 'right') {
                        date = date + 1;   // down
                    } else if (key === 'down') {
                        date = date + 3;
                    } else if (key === 'pageup' || key === 'pagedown') {
                        var year = ctrl.activeDate.getFullYear() + (key === 'pageup' ? -1 : 1);
                        ctrl.activeDate.setFullYear(year);
                    } else if (key === 'home') {
                        date = 0;
                    } else if (key === 'end') {
                        date = 11;
                    }
                    ctrl.activeDate.setMonth(date);
                };

                ctrl.refreshView();
            }
        };
    }])

    .directive('graceMinutepicker', ['dateFilter', function (dateFilter) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/datepicker/minuteOrSecond.html',
            require: '^graceDatepicker',
            link: function (scope, element, attrs, ctrl) {

                ctrl.element = element;
                //1、2、3、4、5、6、10、12、15、20、30

                var minuteGranule = 5;
                var colCount = 5;

                ctrl._refreshView = function () {
                    var actdate = ctrl.activeDate,
                        count = 60/minuteGranule,
                        tcount = Math.ceil(count/colCount)*colCount,
                        minutes = new Array(tcount),
                        hour = actdate.getHours(),
                        date = actdate.getDate(),
                        month = actdate.getMonth(),
                        year = actdate.getFullYear();

                    for (var i = 0; i < tcount; i++) {

                        minutes[i] = i<count ? angular.extend(ctrl.createDateObject(new Date(year, month, date, hour, i*minuteGranule), ctrl.formatMinute), {
                            uid: scope.uniqueId + '-' + i
                        }) : {
                            uid: scope.uniqueId + '-' + i
                        };
                    }

                    scope.title = dateFilter(ctrl.activeDate, ctrl.formatMinuteTitle);
                    scope.rows = ctrl.split(minutes, colCount);
                };

                ctrl.compare = function (date1, date2) {
                    return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate(), date1.getHours(), date1.getMinutes())
                        - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes());
                };

                ctrl.handleKeyDown = function (key, evt) {
                    return;
                    var date = ctrl.activeDate.getMonth();

                    if (key === 'left') {
                        date = date - 1;   // up
                    } else if (key === 'up') {
                        date = date - 3;   // down
                    } else if (key === 'right') {
                        date = date + 1;   // down
                    } else if (key === 'down') {
                        date = date + 3;
                    } else if (key === 'pageup' || key === 'pagedown') {
                        var year = ctrl.activeDate.getFullYear() + (key === 'pageup' ? -1 : 1);
                        ctrl.activeDate.setFullYear(year);
                    } else if (key === 'home') {
                        date = 0;
                    } else if (key === 'end') {
                        date = 11;
                    }
                    ctrl.activeDate.setMonth(date);
                };

                ctrl.refreshView();
            }
        };
    }])

    .directive('graceMonthpicker', ['dateFilter', function (dateFilter) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/datepicker/month.html',
            require: '^graceDatepicker',
            link: function (scope, element, attrs, ctrl) {
                ctrl.step = { years: 1 };
                ctrl.element = element;

                ctrl._refreshView = function () {
                    var months = new Array(12),
                        year = ctrl.activeDate.getFullYear();
                    for (var i = 0; i < 12; i++) {
                        months[i] = angular.extend(ctrl.createDateObject(new Date(year, i, 1), ctrl.formatMonth), {
                            uid: scope.uniqueId + '-' + i
                        });
                    }

                    scope.title = dateFilter(ctrl.activeDate, ctrl.formatMonthTitle);
                    scope.rows = ctrl.split(months, 3);
                };

                ctrl.compare = function (date1, date2) {
                    return new Date(date1.getFullYear(), date1.getMonth()) - new Date(date2.getFullYear(), date2.getMonth());
                };

                ctrl.handleKeyDown = function (key, evt) {
                    var date = ctrl.activeDate.getMonth();

                    if (key === 'left') {
                        date = date - 1;   // up
                    } else if (key === 'up') {
                        date = date - 3;   // down
                    } else if (key === 'right') {
                        date = date + 1;   // down
                    } else if (key === 'down') {
                        date = date + 3;
                    } else if (key === 'pageup' || key === 'pagedown') {
                        var year = ctrl.activeDate.getFullYear() + (key === 'pageup' ? -1 : 1);
                        ctrl.activeDate.setFullYear(year);
                    } else if (key === 'home') {
                        date = 0;
                    } else if (key === 'end') {
                        date = 11;
                    }
                    ctrl.activeDate.setMonth(date);
                };

                ctrl.refreshView();
            }
        };
    }])

    .directive('graceYearpicker', ['dateFilter', function (dateFilter) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/datepicker/year.html',
            require: '^graceDatepicker',
            link: function (scope, element, attrs, ctrl) {
                var range = ctrl.graceYearRange;

                ctrl.step = { years: range };
                ctrl.element = element;

                function getStartingYear(year) {
                    return parseInt((year - 1) / range, 10) * range + 1;
                }

                ctrl._refreshView = function () {
                    var years = new Array(range);

                    for (var i = 0, start = getStartingYear(ctrl.activeDate.getFullYear()); i < range; i++) {
                        years[i] = angular.extend(ctrl.createDateObject(new Date(start + i, 0, 1), ctrl.formatYear), {
                            uid: scope.uniqueId + '-' + i
                        });
                    }

                    scope.title = [years[0].label, years[range - 1].label].join(' - ');
                    scope.rows = ctrl.split(years, 5);
                };

                ctrl.compare = function (date1, date2) {
                    return date1.getFullYear() - date2.getFullYear();
                };

                ctrl.handleKeyDown = function (key, evt) {
                    var date = ctrl.activeDate.getFullYear();

                    if (key === 'left') {
                        date = date - 1;   // up
                    } else if (key === 'up') {
                        date = date - 5;   // down
                    } else if (key === 'right') {
                        date = date + 1;   // down
                    } else if (key === 'down') {
                        date = date + 5;
                    } else if (key === 'pageup' || key === 'pagedown') {
                        date += (key === 'pageup' ? -1 : 1) * ctrl.step.years;
                    } else if (key === 'home') {
                        date = getStartingYear(ctrl.activeDate.getFullYear());
                    } else if (key === 'end') {
                        date = getStartingYear(ctrl.activeDate.getFullYear()) + range - 1;
                    }
                    ctrl.activeDate.setFullYear(date);
                };

                ctrl.refreshView();
            }
        };
    }])

    .constant('datepickerPopupConfig', {
        graceDatepickerPopup: 'yyyy-MM-dd',
        currentText: 'Today',
        clearText: 'Clear',
        closeText: 'Done',
        enterText: "Enter",
        closeOnDateSelection: false,
        appendToBody: true,
        showButtonBar: true,
        switchDisabled: true,
        buttons:['current','close','clear'],
        rangeJoint:" 至 "
    })

    .directive('graceDatepickerPopup', ['$compile', '$parse', '$document', '$position', 'dateFilter', '$gDateParserService', 'datepickerPopupConfig','$timeout','graceDateServ',
        function ($compile, $parse, $document, $position, dateFilter, $gDateParserService, datepickerPopupConfig, $timeout,graceDateServ) {
            return {
                restrict: 'EA',
                require: 'ngModel',
                scope: {
                    isOpen: '=?',
                    currentText: '@',
                    clearText: '@',
                    closeText: '@',
                    enterText: "@",
                    dateDisabled: '&'
                    ,datepickerMode: '=?'
                },
                link: function (scope, element, attrs, ngModel) {
                    var dateFormat,
                        closeOnDateSelection = angular.isDefined(attrs.closeOnDateSelection) ? scope.$parent.$eval(attrs.closeOnDateSelection) : datepickerPopupConfig.closeOnDateSelection,
                        appendToBody = angular.isDefined(attrs.datepickerAppendToBody) ? scope.$parent.$eval(attrs.datepickerAppendToBody) : datepickerPopupConfig.appendToBody,
                        buttons = angular.isDefined(attrs.buttons) ? scope.$parent.$eval(attrs.buttons) : datepickerPopupConfig.buttons,
                        rangeJoint = angular.isDefined(attrs.rangeJoint) ? scope.$parent.$eval(attrs.rangeJoint) : datepickerPopupConfig.rangeJoint,
                        onEnter = angular.isDefined(attrs.onEnter) ? scope.$parent.$eval(attrs.onEnter) : undefined,
                        onClose = angular.isDefined(attrs.onClose) ? scope.$parent.$eval(attrs.onClose) : undefined,
                        nm = scope.$parent.$eval(attrs.ngModel);

                    scope.uniqId = "graceDataPikcerPopupWrap"+scope.$id+"_"+(new Date()).getTime();

                    scope.showButtonBar = angular.isDefined(attrs.showButtonBar) ? scope.$parent.$eval(attrs.showButtonBar) : datepickerPopupConfig.showButtonBar;

                    scope.datepickerMode = attrs.datepickerMode;
                    scope.switchDisabled = angular.isDefined(attrs.switchDisabled) ? scope.$parent.$eval(attrs.switchDisabled) : datepickerPopupConfig.switchDisabled
                    if(buttons.indexOf("current") != -1){
                        scope.showCurrentButton = true;
                    }
                    if(buttons.indexOf("clear") != -1){
                        scope.showClearButton = true;
                    }
                    if(buttons.indexOf("enter") != -1){
                        scope.showEnterButton = true;
                    }
                    if(buttons.indexOf("close") != -1){
                        scope.showCloseButton = true;
                    }

                    scope.getText = function (key) {
                        return scope[key + 'Text'] || datepickerPopupConfig[key + 'Text'];
                    };

                    attrs.$observe('graceDatepickerPopup', function (value) {
                        dateFormat = value || datepickerPopupConfig.graceDatepickerPopup;
                        ngModel.$render();
                    });

                    // popup element used to display calendar
                    if(angular.isArray(nm)){
                        var popupEl = angular.element('<div grace-datepicker-popup-wrap><div grace-datepicker-range ></div></div>');
                    }
                    else{
                        var popupEl = angular.element('<div grace-datepicker-popup-wrap><div grace-datepicker ></div></div>');
                    }
                    popupEl.attr({
                        'ng-model': 'date',
                        'ng-change': 'dateSelection()'
                    });

                    function cameltoDash(string) {
                        return string.replace(/([A-Z])/g, function ($1) {
                            return '-' + $1.toLowerCase();
                        });
                    }

                    // datepicker element
                    var datepickerEl = angular.element(popupEl.children()[0]);
                    if (attrs.datepickerOptions) {
                        angular.forEach(scope.$parent.$eval(attrs.datepickerOptions), function (value, option) {
                            datepickerEl.attr(cameltoDash(option), value);
                        });
                    }

                    scope.watchData = {};
                    angular.forEach(['minDate', 'maxDate', 'datepickerMode', 'switchDisabled'], function (key) {
                        if (attrs[key]) {
                            var getAttribute = $parse(attrs[key]);
                            scope.$parent.$watch(getAttribute, function (value) {
                                scope.watchData[key] = value;
                            });
                            datepickerEl.attr(cameltoDash(key), 'watchData.' + key);

                            // Propagate changes from datepicker to outside
                            if (key === 'datepickerMode') {
                                var setAttribute = getAttribute.assign;
                                scope.$watch('watchData.' + key, function (value, oldvalue) {
                                    if (value !== oldvalue) {
                                        setAttribute(scope.$parent, value);
                                    }
                                });
                            }
                        }
                    });
                    if (attrs.dateDisabled) {
                        datepickerEl.attr('date-disabled', 'dateDisabled({ date: date, mode: mode })');
                    }

                    function parseDate(viewValue) {
                        if(angular.isArray(viewValue)){
                            var res = [];
                            angular.forEach(viewValue,function(val,i){
                                res[i] = parseDate(val)
                            })
                            return res;
                        }
                        //                        else if (!viewValue) {
//                            ngModel.$setValidity('date', true);
//                            return null;
//                        } else if (angular.isDate(viewValue) && !isNaN(viewValue)) {
//                            ngModel.$setValidity('date', true);
//                            return viewValue;
//                        } else if (angular.isString(viewValue)) {
//                            var date = $gDateParserService.parse(viewValue, dateFormat) || new Date(viewValue);
//                            if (isNaN(date)) {
//                                ngModel.$setValidity('date', false);
//                                return undefined;
//                            } else {
//                                ngModel.$setValidity('date', true);
//                                return date;
//                            }
//                        } else {
//                            ngModel.$setValidity('date', false);
//                            return undefined;
//                        }     //屏蔽验证
                        return viewValue;
                    }

                    ngModel.$parsers.unshift(parseDate);

                    // Inner change
                    scope.dateSelection = function (dt) {
                        if(angular.isDefined(dt)){
                            scope.date = dt;
                        }
                        doRender();

                        if (closeOnDateSelection) {
                            scope.isOpen = false;
                            element[0].focus();
                        }
                    };

                    function doRender(){
                        ngModel.$setViewValue(scope.date);
                        ngModel.$render();
                    }

                    element.bind('input change keyup', function () {
                        scope.$apply(function () {
                            scope.date = ngModel.$modelValue;
                        });
                    });

                    function formatWeek(date,format){
                        var weekNum = graceDateServ.getISO8601WeekNumber(date);
                        var res = dateFilter(date,format);

                        if(format.indexOf("ww") > -1){
                            return res.replace("ww",weekNum>9?weekNum:("0"+weekNum));
                        }
                        else{
                            return res.replace("w",weekNum);
                        }
                    }

                    ngModel.$render = function () {
                        if(angular.isArray(ngModel.$viewValue)){
                            var date = [];
                            scope.date = [];
                            angular.forEach(ngModel.$viewValue,function(val,i){
                                date[i] = dateFilter(val,dateFormat);
                            })
                            element.val(date.join(rangeJoint));
                            scope.date = parseDate(ngModel.$modelValue);
                        }
                        else{
                            if(!dateFormat ||dateFormat.indexOf("w") == -1){
                                var date = ngModel.$viewValue ? dateFilter(ngModel.$viewValue, dateFormat) : '';
                            }
                            else{
                                var date = ngModel.$viewValue ? formatWeek(ngModel.$viewValue, dateFormat) : '';
                            }

                            element.val(date);
                            scope.date = parseDate(ngModel.$modelValue);
                        }
                    };

                    var documentClickBind = function (event) {
                        if (scope.isOpen && event.target !== element[0]) {
                            scope.$apply(function () {
                                scope.isOpen = false;
                            });
                        }
                    };

                    var keydown = function (evt, noApply) {
                        scope.keydown(evt);
                    };
                    element.bind('keydown', keydown);

                    scope.keydown = function (evt) {
                        if (evt.which === 27) {
                            evt.preventDefault();
                            evt.stopPropagation();
                            scope.close();
                        } else if (evt.which === 40 && !scope.isOpen) {
                            scope.isOpen = true;
                        }
                    };

                    scope.$watch('isOpen', function (value) {
                        if (value) {
                            scope.$broadcast('graceDatepicker.focus');
                            scope.position = appendToBody ? $position.offset(element) : $position.position(element);
                            var wrapper = angular.element("#"+scope.uniqId);
                            wrapper.css("visibility","hidden");

                            $timeout(function(){
                                scope.$apply(function(){
                                    var pickerWidth = wrapper.prop("offsetWidth");
                                    if(scope.position.left+pickerWidth > screen.width){
                                        scope.position.left = screen.width-pickerWidth;
                                    }
                                    wrapper.css("visibility","visible");
                                })
                            },0,false);

                            scope.position.top = scope.position.top + element.prop('offsetHeight');
                            $document.bind('click', documentClickBind);
                        } else {
                            $document.unbind('click', documentClickBind);
                        }
                    });

                    scope.select = function (date) {
                        if (date === 'today') {
                            var today = new Date();
                            if (angular.isDate(ngModel.$modelValue)) {
                                date = new Date(ngModel.$modelValue);
                                date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
                            } else {
                                date = new Date(today.setHours(0, 0, 0, 0));
                            }
                        }
                        scope.dateSelection(date);
                    };

                    scope.close = function () {
                        scope.isOpen = false;
                        element[0].focus();
                        angular.isFunction(onClose) && onClose.call(scope.$parent);
                    };

                    scope.enter = function(){
                        scope.isOpen = false;
                        element[0].focus();
                        angular.isFunction(onEnter) && onEnter.call(scope.$parent,element.val());
                    }

                    var $popup = $compile(popupEl)(scope);
                    if (appendToBody) {
                        $document.find('body').append($popup);
                    } else {
                        element.after($popup);
                    }

                    scope.$on('$destroy', function () {
                        $popup.remove();
                        element.unbind('keydown', keydown);
                        $document.unbind('click', documentClickBind);
                    });
                }
            };
        }])

    .directive('graceDatepickerPopupWrap', function () {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            templateUrl: 'template/datepicker/popup.html',
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                });
            }
        };
    })

    .constant('daterangepickerConfig', {
        pickerCount:1
    })

    .controller('datepickerRangeController', ['$scope', '$attrs', '$parse', '$interpolate', '$timeout', '$log', 'dateFilter', 'datepickerConfig', 'daterangepickerConfig', function ($scope, $attrs, $parse, $interpolate, $timeout, $log, dateFilter, datepickerConfig, daterangepickerConfig) {
        var self = this,
            ngModelCtrl = { $setViewValue: angular.noop }; // nullModelCtrl;

        // Modes chain
        this.modes = ['day', 'month', 'year'];

        // Configuration attributes
        angular.forEach(['formatDay', 'formatMonth', 'formatYear', 'formatDayHeader', 'formatDayTitle', 'formatMonthTitle',
            'minMode', 'maxMode', 'showWeeks', 'startingDay', 'graceYearRange', 'pickerCount'], function (key, index) {
            self[key] = angular.isDefined($attrs[key]) ?
                (index < 8 ? $interpolate($attrs[key])($scope.$parent) : $scope.$parent.$eval($attrs[key])) :
                (daterangepickerConfig[key] || datepickerConfig[key]);
        });

        // Watchable date attributes
        angular.forEach(['minDate', 'maxDate'], function (key) {
            if ($attrs[key]) {
                $scope.$parent.$watch($parse($attrs[key]), function (value) {
                    self[key] = value ? new Date(value) : null;
                    self.refreshView();
                });
            } else {
                self[key] = datepickerConfig[key] ? new Date(datepickerConfig[key]) : null;
            }
        });

        $scope.datepickerMode = $scope.datepickerMode || datepickerConfig.datepickerMode;
        $scope.uniqueId = 'grace-datepicker-' + $scope.$id + '-' + Math.floor(Math.random() * 10000);
//        this.activeDate = angular.isDefined($attrs.initDate) ? $scope.$parent.$eval($attrs.initDate) : new Date();
        $scope.isActive = function (dateObject) {
            if (self.compare(dateObject.date, self.activeDate) === 0) {
                $scope.activeDateId = dateObject.uid;
                return true;
            }
            return false;
        };

        this.init = function (ngModelCtrl_) {
            ngModelCtrl = ngModelCtrl_;

            ngModelCtrl.$render = function () {
                self.render();
            };
        };

        this.render = function () {
            if (ngModelCtrl.$modelValue) {
                var sdate = new Date(ngModelCtrl.$modelValue[0]),
                    edate = new Date(ngModelCtrl.$modelValue[1]),
                    isValid = !isNaN(sdate) && !isNaN(edate);

                if (isValid && !this.activeDate) {
                    this.activeDate = [sdate,edate];
                } else if(!isValid) {
                    $log.error('DateRangepicker directive: "ng-model" value must be a Array of Date objects, numbers of milliseconds since 01.01.1970 or strings representing an RFC2822 or ISO 8601 date.');
                }
                ngModelCtrl.$setValidity('date', isValid);
            }
            this.refreshView();
        };

        this.refreshView = function () {
            if (this.element) {
                this._refreshView();

//                var date = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : null;
//                ngModelCtrl.$setValidity('date-disabled', !date || (this.element && !this.isDisabled(date)));
            }
        };

        this.createDateObject = function (date, format) {
//            var model = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : null;
            var sdate,edate,sdate = edate = null;
            if(ngModelCtrl.$modelValue){
                sdate = new Date(ngModelCtrl.$modelValue[0]);
                edate = new Date(ngModelCtrl.$modelValue[1]);
            }
            return {
                date: date,
                label: dateFilter(date, format),
                selected: sdate && edate && this.compare(date, sdate, edate),
                disabled: this.isDisabled(date),
                current: false,
                weekend:date.getDay()==6 || date.getDay() == 0
            };
        };

        this.isDisabled = function (date) {
            return (
                (this.minDate && this.compare(date, this.minDate) < 0) ||
                (this.maxDate && this.compare(date, this.maxDate) > 0) ||
                    ($attrs.dateDisabled && $scope.dateDisabled({date: date, mode: $scope.datepickerMode}))
                );
        };

        // Split array into smaller arrays
        this.split = function (arr, size) {
            var arrays = [];
            while (arr.length > 0) {
                arrays.push(arr.splice(0, size));
            }
            return arrays;
        };

        $scope.select = function (date) {
            if(self._select && !self._select(date,ngModelCtrl)) return;
            if ($scope.datepickerMode === self.minMode) {
                var dt = ngModelCtrl.$modelValue ? new Date(ngModelCtrl.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
                dt.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
                ngModelCtrl.$setViewValue(dt);
                ngModelCtrl.$render();
            } else {
                self.activeDate = date;
                $scope.datepickerMode = self.modes[ self.modes.indexOf($scope.datepickerMode) - 1 ];
            }
        };

        $scope.move = function (direction) {
            var syear = self.activeDate[0].getFullYear() + direction * (self.step.years || 0),
                smonth = self.activeDate[0].getMonth() + direction * (self.step.months || 0),
                eyear = self.activeDate[1].getFullYear() + direction * (self.step.years || 0),
                emonth = self.activeDate[1].getMonth() + direction * (self.step.months || 0);
            self.activeDate[0].setFullYear(syear, smonth, 1);
            self.activeDate[1].setFullYear(eyear, emonth, 1);
            self.refreshView();
        };

        $scope.toggleMode = function (direction) {
            return;     //禁用range-datepicker的切换
            direction = direction || 1;

            if (($scope.datepickerMode === self.maxMode && direction === 1) || ($scope.datepickerMode === self.minMode && direction === -1)) {
                return;
            }

            $scope.datepickerMode = self.modes[ self.modes.indexOf($scope.datepickerMode) + direction ];
        };

        // Key event mapper
        $scope.keys = { 13: 'enter', 32: 'space', 33: 'pageup', 34: 'pagedown', 35: 'end', 36: 'home', 37: 'left', 38: 'up', 39: 'right', 40: 'down' };

        var focusElement = function () {
            $timeout(function () {
                self.element[0].focus();
            }, 0, false);
        };

        // Listen for focus requests from popup directive
        $scope.$on('datepicker.focus', focusElement);

        $scope.keydown = function (evt) {
            var key = $scope.keys[evt.which];

            if (!key || evt.shiftKey || evt.altKey) {
                return;
            }

            evt.preventDefault();
            evt.stopPropagation();

            if (key === 'enter' || key === 'space') {
                if (self.isDisabled(self.activeDate)) {
                    return; // do nothing
                }
                $scope.select(self.activeDate);
                focusElement();
            } else if (evt.ctrlKey && (key === 'up' || key === 'down')) {
                $scope.toggleMode(key === 'up' ? 1 : -1);
                focusElement();
            } else {
                self.handleKeyDown(key, evt);
                self.refreshView();
            }
        };
    }])

    .directive('graceDatepickerRange',function(){
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/datepicker/daterangepicker.html',
            scope: {
                datepickerMode: '=?',
                quickSelectMode:"=?",
                dateDisabled: '&'
            },
            require: ['graceDatepickerRange', '?^ngModel'],
            controller: 'datepickerRangeController',
            link: function (scope, element, attrs, ctrls) {
                var datepickerCtrl = ctrls[0], ngModelCtrl = ctrls[1];

                if (ngModelCtrl) {
                    datepickerCtrl.init(ngModelCtrl);
                }
            }
        };
    })

    .directive('graceDaypickerRange', ['dateFilter','graceDateServ', function (dateFilter, graceDateServ) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/datepicker/dayrange.html',
            require: '^graceDatepickerRange',
            link: function (scope, element, attrs, ctrl) {
                scope.showWeeks = ctrl.showWeeks;

                ctrl.step = { months: 1 };
                ctrl.element = element;

                var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                function getDaysInMonth(year, month) {
                    return ((month === 1) && (year % 4 === 0) && ((year % 100 !== 0) || (year % 400 === 0))) ? 29 : DAYS_IN_MONTH[month];
                }

                function getDates(startDate, n) {
                    var dates = new Array(n), current = new Date(startDate), i = 0;
                    current.setHours(12); // Prevent repeated dates because of timezone bug
                    while (i < n) {
                        dates[i++] = new Date(current);
                        current.setDate(current.getDate() + 1);
                    }
                    return dates;
                }

                function getFirstDate(year,month){
                    var firstDayOfMonth = new Date(year, month, 1),
                        difference = ctrl.startingDay - firstDayOfMonth.getDay(),
                        numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference,
                        firstDate = new Date(firstDayOfMonth);

                    if (numDisplayedFromPreviousMonth > 0) {
                        firstDate.setDate(-numDisplayedFromPreviousMonth + 1);
                    }
                    return firstDate;
                }

                var clickCount = 0;

                ctrl._select = function (date, ngModelCtrl) {
                    var dt;
                    if (ngModelCtrl.$modelValue && ngModelCtrl.$modelValue[1]) {
                        if(clickCount == 0){
                            dt = [new Date(date.getFullYear(),date.getMonth(),date.getDate()), new Date(date.getFullYear(),date.getMonth(),date.getDate())];
                        }
                        else if(compare(date,ngModelCtrl.$modelValue[0]) < 0){
                            dt = [new Date(date.getFullYear(),date.getMonth(),date.getDate()), new Date(ngModelCtrl.$modelValue[1])];
                        }
                        else{
                            dt = [new Date(ngModelCtrl.$modelValue[0]), new Date(date.getFullYear(),date.getMonth(),date.getDate())];
                        }
                    }
                    else {
                        dt = [new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 0, 0, 0, 0)];
                    }

                    ngModelCtrl.$setViewValue(dt);
                    ngModelCtrl.$render();
                    clickCount = ++clickCount%2;
                    return false;
                }

                ctrl._refreshView = function () {
                    var year = ctrl.activeDate[0].getFullYear(),
                        month = ctrl.activeDate[0].getMonth();

                    var ey = ctrl.activeDate[1].getFullYear(),
                        em = ctrl.activeDate[1].getMonth(),
                        mc = (ey-year)*12+(em-month)+ 1,
                        mi = 0;
                    mc = parseInt(ctrl.pickerCount) || mc;
                    scope.titles = [];
                    scope.rowsGroup = [];
                    scope.weekNumbersGroup = [];
                    while(mi<mc){
                        var tm = (month+mi)%12,
                            ty = year + Math.floor((month+mi)/12);
                        var firstDate = getFirstDate(ty,tm);
                        var days = getDates(firstDate,42);
                        for (var i = 0; i < 42; i++) {
                            days[i] = angular.extend(ctrl.createDateObject(days[i], ctrl.formatDay), {
                                secondary: days[i].getMonth() !== tm,
                                uid: scope.uniqueId + '-' + i
                            });
                        }

                        scope.titles.push(dateFilter(new Date(ty,tm,1), ctrl.formatDayTitle));

                        var rows = ctrl.split(days, 7);

                        if (scope.showWeeks) {
                            var weekNumbers = [],
                                weekSize = rows.length,
                                lastDateOfWeek,
                                weekNum;
                            for(var i=0;i<weekSize;i++){
                                lastDateOfWeek = rows[i][rows[i].length-1].date;
                                weekNum = graceDateServ.getISO8601WeekNumber(lastDateOfWeek);
                                weekNumbers.push({
                                    year: lastDateOfWeek.getFullYear(),
                                    week: weekNum
                                });
                            }
                            scope.weekNumbersGroup.push(weekNumbers);
                        }

                        scope.rowsGroup.push(rows);
                        mi++;
                    }

                    scope.labels = new Array(7);
                    for (var j = 0; j < 7; j++) {
                        scope.labels[j] = {
                            abbr: dateFilter(scope.rowsGroup[0][0][j].date, ctrl.formatDayHeader),
                            full: dateFilter(scope.rowsGroup[0][0][j].date, 'EEEE')
                        };
                    }
                };

                function compare (date1, date2, date3) {
                    if(arguments.length == 3){
                        return compare(date1,date2) >= 0 && compare(date1,date3) <=0;
                    }
                    else{
                        return (new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) - new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()) );
                    }

                };

                ctrl.compare = compare

                ctrl.handleKeyDown = function (key, evt) {
                    return;
                    var date = ctrl.activeDate.getDate();

                    if (key === 'left') {
                        date = date - 1;   // up
                    } else if (key === 'up') {
                        date = date - 7;   // down
                    } else if (key === 'right') {
                        date = date + 1;   // down
                    } else if (key === 'down') {
                        date = date + 7;
                    } else if (key === 'pageup' || key === 'pagedown') {
                        var month = ctrl.activeDate.getMonth() + (key === 'pageup' ? -1 : 1);
                        ctrl.activeDate.setMonth(month, 1);
                        date = Math.min(getDaysInMonth(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth()), date);
                    } else if (key === 'home') {
                        date = 1;
                    } else if (key === 'end') {
                        date = getDaysInMonth(ctrl.activeDate.getFullYear(), ctrl.activeDate.getMonth());
                    }
                    ctrl.activeDate.setDate(date);
                };

                ctrl.refreshView();
            }
        };
    }]);

/**
 * @ngdoc overview
 * @name grace.bootstrap.dimension
 *
 * @description
 * AngularJS version of the tabs directive.
 */

var app = angular.module("grace.bootstrap.dimension",['grace.bootstrap.position'])

    .constant("dimensionConfig",{
        "autoIncrement":false,
        'dimensionContrast':false,
        showDimension23:false,
        showDimension45:false,
        enableContrast:true,
        isCodeUniq:false
    })


    .controller("dimensionController",["$scope", 'dimensionConfig', "$http", "dimensionFactory",  function($scope,dimensionConfig,$http,dServ){

        $scope.dContrast = dimensionConfig.dimensionContrast;

        if($scope.isContrast == undefined){
            $scope.isContrast = dimensionConfig.dimensionContrast;
        }
        if($scope.enableContrast == undefined){
            $scope.enableContrast = dimensionConfig.enableContrast;
        }

        $scope.showDimension23 = dimensionConfig.showDimension23;
        $scope.showDimension45 = dimensionConfig.showDimension45;

        $scope.searchResult23 = {};
        $scope.searchResult23Empty = true;
        $scope.searchResult45 = {};
        $scope.searchResult45Empty = true;

        $scope.searchKeyWord23 = "";
        $scope.searchKeyWord45 = "";

        $scope.$watch("dimensionData",function(dd){
            if(!dd) return;

            doClear();

            $scope.nodeIndex = dServ.createNodeIndex($scope.dimensionData,$scope);

            if($scope._initSelect) $scope._initSelect.checked = false;

            contrastLimitNum = $scope.isContrast ? 2:1;

            $scope.nodeClick(null,$scope._initSelect || $scope.dimensionData[0].children[0]);

            $scope.onAction();

        });

        function doClear(){
            $scope._initSelect = null;

            /*for(var p in $scope.selected){
                $scope.selected[p] = undefined;
            }
            for(var i=0,ilen = $scope.selectedNode.length;i<ilen;i++){
                $scope.nodeClick(null,selectedNode[i])
            }*/
            var i = 0;
            while(selectedNode.length){
                $scope.nodeClick(null,selectedNode[0]);
            }
        }

        var contrastLimitNum = 1;

        $scope.checkContrast = function(){
            if(!$scope.enableContrast) {
                $scope.onContrastSwitchClick && $scope.onContrastSwitchClick(false);
                return;
            }
            $scope.isContrast = !$scope.isContrast;
            $scope.onContrastSwitchClick && $scope.onContrastSwitchClick($scope.isContrast);
            contrastLimitNum = $scope.isContrast ? 2 : 1;
            if(!$scope.isContrast && selectedNode.length == 2){
                clearSelected();
                //$scope.nodeClick(null,selectedNode[selectedNode.length-1]);
            }
        }

        $scope.selected = {};

        function dealWithChainInfo(node){
            if($scope.selected[node.code]){
                delete $scope.selected[node.code];
            }
            else{
                $scope.selected[node.code] = dServ.makeNodeChainInfo(node.code,$scope.nodeIndex)
            }
        }

        function clearSelected(){
            for(var i= 0,inode;(inode = selectedNode[i]);){
                $scope.nodeClick(null,inode);
            }

            $scope.nodeClick(null,$scope.dimensionData[0].children[0]);

            $scope.onAction();
        }

        var selectedNode = $scope.selectedNode = [];
        function existInSelected(node){
            var code = typeof node == "object" ? node.code:node;
            for(var i= 0,idata;(idata = selectedNode[i]);i++){
                if(idata.code == code){
                    return idata;
                }
            }
            return false;
        }

        function removeFromSelected(node){
            for(var i= 0,idata;(idata = selectedNode[i]);i++){
                if(idata.code == node.code){
                    return selectedNode.splice(i,1);
                }
            }
        }

        $scope.cancelSelect = function(code){
            var node = existInSelected(code);
            node && $scope.nodeClick(null,node);
        }

        function isLegalNode2Select(node){
            if(selectedNode[0]){
                if(selectedNode[0].level == node.level){
                    return true;
                }
            }
            else{
                return true;
            }
        }

        function retractList(evt, isSelected){
            if(evt){
                var _evt = angular.element(evt.target);
                var _input = _evt.parent().siblings('.grace-dimension-searchbox');
                if(_input.attr('level') == 23){
                    $scope.closeSearchBox(23);
                }
                else if(_input.attr('level') == 45){
                    $scope.closeSearchBox(45);
                }

                if(isSelected){
                    _input.val('');
                }
                else{
                    _input.val(_evt.text());
                }
            }
        }

        $scope.nodeClick = function(evt,node){
            if(node.unavailable){
                return;
            }
            if(existInSelected(node)){
                node.checked = !node.checked;
                removeFromSelected(node);
                dealWithChainInfo(node);
                retractList(evt, true);
            }
            else if(!existInSelected(node) && selectedNode.length < contrastLimitNum){
                if(isLegalNode2Select(node)){
                    selectedNode.push(node);
                    node.checked = !node.checked;
                    dealWithChainInfo(node);
                    retractList(evt, false);
                }
                else{
                    alert("维度应该在同一级");
                }

            }
            else if(!existInSelected(node) && selectedNode.length == contrastLimitNum && contrastLimitNum > 1){
                alert("维度选择超数量限制")
            }
            else if(!existInSelected(node) && selectedNode.length == contrastLimitNum && contrastLimitNum == 1){
                var abNode = selectedNode.shift();
                abNode.checked = !abNode.checked;
                dealWithChainInfo(abNode);
                selectedNode.push(node);
                node.checked = !node.checked;
                dealWithChainInfo(node);
                retractList(evt, false);
            }

        }

        $scope.curLevel1Node = null;
        $scope.curLevel3Node = null;

        $scope.showSubDimension = function(evt,node){

            if(node.level == 1){
                if(!$scope.curLevel1Node || $scope.curLevel1Node == node.code){
                    $scope.showDimension23 = !$scope.showDimension23;
                }
                else if($scope.curLevel1Node !== null && $scope.curLevel1Node != node.code){
                    $scope.showDimension23 = true;
                }
                $scope.curLevel1Node = node.code
                $scope.curDimensionData23 = node;
                $scope.showDimension45 = false;
            }
            else if(node.level == 3){
                if(!$scope.curLevel3Node || $scope.curLevel3Node == node.code){
                    $scope.showDimension45 = !$scope.showDimension45;
                }
                else if($scope.curLevel3Node !== null && $scope.curLevel3Node != node.code){
                    $scope.showDimension45 = true;
                }
                $scope.curLevel3Node = node.code;
                $scope.curDimensionData45 = node;
            }

        }

        $scope.doSearch = function(keyword,level){

            if(level == "23"){
                $scope.searchResult23 = dServ.searchNode(keyword,$scope.curDimensionData23,function(node){
                    return node.name.indexOf(keyword) != -1 && (node.level == 3 || node.level == 2);
                })
                $scope.searchResult23Empty = isEmptyObj($scope.searchResult23);
                $scope.$apply();
            }
            else if(level == "45"){
                $scope.searchResult45 = dServ.searchNode(keyword,$scope.curDimensionData45,function(node){
                    return node.name.indexOf(keyword) != -1 && (node.level == 5 || node.level == 4);
                })
                $scope.searchResult45Empty = isEmptyObj($scope.searchResult45);
                $scope.$apply();
            }

        }

        $scope.closeSearchBox = function(level){
            if(level == 23){
                $scope.searchResult23 = {}
                $scope.searchResult23Empty = true;
            }
            else if(level == 45){
                $scope.searchResult45 = {}
                $scope.searchResult45Empty = true;
            }
        }

        function isEmptyObj(obj){
            for(var p in obj){
                return false;
            }
            return true;
        }

        $scope.onAction = function(){

            if(selectedNode.length < contrastLimitNum) return;
            if(dimensionConfig.isCodeUniq){
                $scope.action(selectedNode,$scope.selected);
            }
            else{
                $scope.action(dServ.restoreNode(selectedNode),dServ.restoreNodeChain($scope.selected,$scope.nodeIndex));
            }

        }

    }])

    .factory("dimensionFactory",["dimensionConfig",function(dimensionConfig){

        var uid = 1;
        var _scope = null;
        function createNodeIndex(nodeData,$scope){
            var nodeIndex = {}
            !_scope && (_scope = $scope);
            if(!dimensionConfig.isCodeUniq){
                backupNodeCode(nodeData);
            }

            iterateNodes(nodeData,nodeIndex,null,null,0);

            return nodeIndex;
        }

        function backupNodeCode(node){
            for(var i= 0,idata;(idata = node[i]);i++){
                if(idata.children && idata.children.length){
                    backupNodeCode(idata.children);
                }
                //交换code
                idata.oldCode = idata.code;
                idata.code = uid++;

                if(!_scope._initSelect && idata.checked){
                    _scope._initSelect = idata;
                }
            }
        }

        function restoreNode(node){

            var resultNodes = [];
            for(var i = 0,inode;(inode = node[i]);i++){
                var obj = {
                    code:inode.oldCode,
                    name:inode.name
                }
                resultNodes.push(obj);
            }

            return resultNodes;
        }

        function restoreNodeChain(nodeChain,nodeIndex){
            var resultNodeChain = {};
            for(var p in nodeChain){
                var tmp = nodeChain[p];
//                var cc = tmp.codeChain;

//                for(var i = 0,ilen = cc.length;i<ilen;i++){
//                    cc[i] = nodeIndex[cc[i]].oldCode
//                }

                resultNodeChain[nodeIndex[p].oldCode] = tmp;
            }
            return resultNodeChain;
        }

        /**
         * 遍历树形节点数据，返回散列表形式的节点数据，以节点的code为key存放于散列表之中
         * @param node  {Array} 存放节点数据
         * @param ni  {HashMap} 存放整理好的数据
         * @param pcode {String/Int} 存放父节点的code
         * @param filter {function} 过滤用的
         * @param level {Int} 节点的深度等级
         */

        function iterateNodes(node,ni,pcode,filter,level){
            for(var i= 0,idata;(idata = node[i]);i++){
                if(idata.children && idata.children.length){
                    iterateNodes(idata.children,ni,idata.code,filter,level != undefined ? (level+1) : undefined);
                }
                if(!filter || filter(idata)){
                    ni[idata.code] = idata;
                    idata.pcode = pcode || null;
                    level != undefined && (idata.level = level);
                }
            }
        }

        function makeNodeChainInfo(code,nodeIndex){
            var info = {
                nameChain:[],
                codeChain:[]
            };

            _makeCCI(code,info,nodeIndex);
            info.nameChain.reverse();
            info.codeChain.reverse();
            return info;
        }

        function _makeCCI(code,info,nodeIndex){
            var cNode = nodeIndex[code];
            if(cNode && dimensionConfig.isCodeUniq){
                info.nameChain.push(cNode.name);
                info.codeChain.push(cNode.code);
                _makeCCI(cNode.pcode,info,nodeIndex);
            }
            else if(cNode && !dimensionConfig.isCodeUniq && cNode.oldCode){
                info.nameChain.push(cNode.name);
                info.codeChain.push(cNode.oldCode);
                _makeCCI(cNode.pcode,info,nodeIndex);
            }
        }

        function searchNode(keyword,node,filter){

            var res = {};

            iterateNodes(node.children,res,node.code,filter);

            return res;
        }

        return {
            createNodeIndex:createNodeIndex,
            makeNodeChainInfo:makeNodeChainInfo,
            searchNode:searchNode,
            restoreNode:restoreNode,
            restoreNodeChain:restoreNodeChain
        }

    }])

    .directive("graceDimension",["$window", "$position",function(win,pos){

        return {
            restrict:"EA",
            require:['graceDimension'],
            controller:"dimensionController",
            templateUrl:"template/dimension/dimension.html",
            replace:true,
            scope:{
                dimensionData:"=",
                action:"=",
                enableContrast:"=",
                isContrast:"=",
                onContrastSwitchClick:"=?"
            },
            link:function(scope,element,attr,ctrl){

                var awin = angular.element(win);

                scope.showContrastOption = attr["showContrastOption"] != "false";

                awin.on("click",function(){

                    scope.$apply(function(){
                        scope.showDimension45 = false;
                        scope.showDimension23 = false;
                    })

                    dimensionContainer23 && dimensionContainer23.css({height:"auto"});
                    dimensionContainer45 && dimensionContainer45.css({height:"auto"});
                });

                var dimension23 = angular.element(".grace-section-dimension23");
                var dimension45 = angular.element(".grace-section-dimension45");

                dimension23.on("click",function(evt){
                    dimension23.find(".grace-dimension-searchbox").val("");
                    scope.$apply(function(){
                        scope.closeSearchBox(23);
                    })
                    var el = angular.element(evt.target);
                    if(!el.hasClass(".grace-dimension-dropdown") && evt.target.tagName != "I"){

                        scope.$apply(function(){
                            scope.closeSearchBox(45);
                            scope.showDimension45 = false;
                        })

                        evt.originalEvent.cancelBubble = true;
                    }
                })
                dimension45.on("click",function(evt){
                    dimension45.find(".grace-dimension-searchbox").val("");
                    scope.$apply(function(){
                        scope.closeSearchBox(45);
                    })
                    evt.originalEvent.cancelBubble = true;
                })

                var dimensionContainer23 = null;
                var dimensionContainer45 = null;
                var curEl = null;

                element.on("click",".grace-dimension-dropdown",function(evt){

                    curEl = angular.element(evt.currentTarget);

                    var elParent = curEl.parent();
                    var position = pos.position(elParent);
                    var offset = pos.offset(elParent);
                    if(curEl.hasClass("level1")){
                        var dl = dimensionContainer23 = curEl.parent().parent();
                        dl.css({
                            height:"auto"
                        })
                        var dlPos = pos.offset(dl);
                        dl.append(dimension23);

                        dimension23.css({
                            top:offset.top+offset.height+8-dlPos.top
                        })

                        dimension23.find(".grace-dimension-arrow").css({
                            left:position.left+position.width/2
                        })

                        var dim23Pos = pos.offset(dimension23);
                        if(dim23Pos.top+dim23Pos.height>dlPos.height+dlPos.top){
                            dl.css({
                                height:dim23Pos.top-dlPos.top+dim23Pos.height
                            });
                        }

                        evt.originalEvent.cancelBubble = true;
                    }
                    else if(curEl.hasClass("level3") && !dimension45.hasClass("ng-hide")){
                        var dl = dimensionContainer45 = curEl.parent().parent().parent().parent().parent();
                        dl.append(dimension45);

                        dimension45.css({top:"auto"});
                        var p45 = pos.offset(dimension45);

                        var p23 = pos.offset(dimension23);

                        dimension45.css({
                            top:offset.top-p23.top+offset.height+8,
                            left:0
                        });

                        dimension45.find(".grace-dimension-arrow").css({
                            left:position.left+position.width/2
                        })

                        evt.originalEvent.cancelBubble = true;
                    }
                    else if(curEl.hasClass("level3") && dimension45.hasClass("ng-hide")){
                        dimension23.css({
                            height:"auto"
                        })

                        evt.originalEvent.cancelBubble = true;
                    }

                })
                element.find(".grace-search-group").on("click",function(evt){
                    evt.originalEvent.cancelBubble = true;
                });

                function delayExe(func,cd){
                    var isCd = true;
                    return function(arg){
                        if(isCd){
                            func(arg);
                            isCd = false;
                            setTimeout(function(){
                                isCd = true;
                            },cd);
                        }
                    }
                }

                var doSearch = delayExe(function(arg){
                    var el = angular.element(arg.target);
                    var val = el.val();
                    if(val){
                        scope.doSearch(val,el.attr("level"));
                    }
                    else{
                        el.parent().find(".grace-searchbox-closebtn").triggerHandler("click");
                    }
                },100);

                element.find(".grace-dimension-searchbox").bind("keyup",doSearch);
                element.find(".grace-searchbox-closebtn").bind("click",function(evt){
                    var el = angular.element(evt.target);
                    el.parent().find(".grace-dimension-searchbox").val("");
                })

            }
        }

    }]);

/**
 * create by yuhongping
 */
angular.module('grace.bootstrap.dimensionBaseSelect', ["template/dimensionBaseSelect/dimensionBaseSelect.html"])
    .controller('dimensionBaseSelectController', ['$scope', '$attrs', '$parse', function($scope, $attrs, $parse) {
        var self = this,
            ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl;
        hideList = false, lastSelect = [];
        $scope.lastSelect = angular.noop;
        this.init = function( ngModelCtrl_ ) {
            ngModelCtrl = ngModelCtrl_;
        };
        $scope.$watch('data', function() {
            if (!$scope.data) {
                return;
            }
            self.render();
        });
        $scope.$watch($scope.getHideListValue, function() {
            if (hideList == true) {
                $scope.selStatus = [''];
            }
        }, true);

        $scope.getHideListValue = function() {
            return hideList;
        }
        // 自定义城市的input的keyup事件
        $scope.keyUp = function(event, val) {
            var newValue = $(event.target).val();
            $scope.selStatus[0] = newValue;
        }
        this.render = function() {
            //保存选中的项
            $scope.selStatus = [];
            if ($scope.data.detail && $scope.data.detail.length > 0) {
                //第一项为全部时，默认选中所有的项
                if ($scope.data.detail[0].code.toLowerCase().substring($scope.data.detail[0].code.length-3) == 'all') {
                    for (var i = 0; i < $scope.data.detail.length; i++) {
                        if ($scope.data.detail[i].code != 'custom') {
                            $scope.selStatus.push($scope.data.detail[i].code);
                        }
                    }
                } else {
                    //判断是否为多选
                    if ($scope.isMult) {
                        for (var i = 0; i < $scope.data.detail.length; i++) {
                            if ($scope.data.detail[i].selected == true) {
                                $scope.selStatus.push($scope.data.detail[i].code);
                            }
                        }
                    } else  {
                        for (var i = 0; i < $scope.data.detail.length; i++) {
                            if ($scope.data.detail[i].selected == true) {
                                $scope.selStatus.push($scope.data.detail[i].code);
                                break;
                            }
                        }
                        if ($scope.selStatus.length == 0) {
                            $scope.selStatus.push($scope.data.detail[0].code);
                        }
                    }
                }
            }
            $scope.lastSelect = angular.copy($scope.selStatus);
            ngModelCtrl.$setViewValue($scope.selStatus);
        }
        $scope.rankValue = function() {
            var newArr = angular.copy($scope.selStatus);
            $scope.selStatus.length = 0;
            for (var i = 0, iv; (iv = $scope.data.detail[i]); i++) {
                for (var j = 0, ip; (ip = newArr[j]); j++) {
                    if (iv.code == ip) {
                        $scope.selStatus.push(ip);
                    }
                }
            }
        }
        $scope.select = function(di, index) {
            // 如果是自定义
            if (di.code == 'custom') {
                $scope.hideList = !$scope.hideList;
            } else {
                //判断是否为多选
                if ($scope.isMult) {
                    //如果该项已被选中，则取消
                    if ($scope.selStatus.indexOf(di.code) != -1) { // 已选中
                        if ($scope.selStatus[0].toLowerCase().substring($scope.selStatus[0].length-3) == 'all') {
                            $scope.selStatus.shift();
                        }
                        if (di.code.toLowerCase().substring(di.code.length-3) != 'all') {
                            $scope.selStatus.splice($scope.selStatus.indexOf(di.code), 1);
                        }
                    } else { // 未选中
                        //判断选择的是否是全选项
                        if (di.code.toLowerCase().substring(di.code.length-3) == 'all') {
                            $scope.selStatus = [];
                            for (var i = 0; i < $scope.data.detail.length; i++) {
                                $scope.selStatus.push($scope.data.detail[i].code);
                            }
                            $scope.selStatus.shift();
                        } else {
                            $scope.selStatus.push(di.code);
                            $scope.rankValue();
                        }
                    }
                    // 这里还要增加是否各项已经都被选中，如果已经都被选中了，则需要把全部的样式也加上
                    if ($scope.selStatus.length == $scope.data.detail.length - 1 && $scope.selStatus.indexOf('$scope.data.detail[0].code') < 0) {
                        $scope.selStatus.unshift($scope.data.detail[0].code);
                    }
                } else {
                    if (di.code.toLowerCase().substring(di.code.length-3) == 'all') {
                        $scope.selStatus = [];
                        for (var i = 0; i < $scope.data.detail.length; i++) {
                            $scope.selStatus.push($scope.data.detail[i].code);
                        }
                        $scope.selStatus.pop();
                    } else {
                        $scope.selStatus = [di.code];
                    }
                }
                $scope.lastSelect = angular.copy($scope.selStatus);
            }
            ngModelCtrl.$setViewValue($scope.selStatus);
        }

        $scope.return = function() {
            $scope.selStatus = angular.copy($scope.lastSelect);
            $scope.hideList = !$scope.hideList;
            ngModelCtrl.$setViewValue($scope.selStatus);
        }
    }])
    .directive('graceDimensionBaseSelect', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'template/dimensionBaseSelect/dimensionBaseSelect.html',
            scope: {
                data: '=data',
                isMult: '=ismult'
            },
            require: ['graceDimensionBaseSelect', '?^ngModel'],
            controller: 'dimensionBaseSelectController',
            link: function($scope, $element, $attr, $ctrls) {
                var dimensionBaseSelectCtrl = $ctrls[0], ngModelCtrl = $ctrls[1];

                if ( ngModelCtrl ) {
                    dimensionBaseSelectCtrl.init( ngModelCtrl );
                }
            }
        }
    });


angular.module('grace.bootstrap.dimensionSelectWithCheckBox', ["template/dimensionBaseSelect/dimensionSelectWithCheckBox.html"])
    .directive('graceDimensionSelectWithCheckBox', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: 'template/dimensionBaseSelect/dimensionSelectWithCheckBox.html',
            scope: {
                data: '=data'
            },
            require: ['ngModel'],
            link: function($scope, $element, $attr, $ctrls) {
                // 为了全部按钮好使，点击全部按钮，就会把所有的值都赋上
                $scope.allSelStatus = [];
                // 所有的checked项
                $scope.allOrderType = [];
                // 记录哪些是该选中的
                $scope._orderType = [];
                // 保存选中的项，这个变量是要往后台传的参数
                $scope.selStatus = [];
                // 上一次选中的带有下拉列表的项
                $scope.lastDi = {};
                // 获得Model
                var ngModel = $ctrls[0];
                $scope.$watch('data', function() {
                    if (!$scope.data) {
                        return;
                    }
                    // 初始化
                    if ($scope.data.detail && $scope.data.detail.length > 0) {
                        // 这个组件需要很特殊的处理， 有带有下拉列表的，还有单独复选的，很复杂的
                        // 如果第一项为全部也不能说明就一定要全部选中，因为这个是根据结果集里面的selected属性去选择的
                        // 首先要遍历detail
                        for (var i = 0; i < $scope.data.detail.length; i++) {
                            // 说明是一个checklist，还有子项
                            if ($scope.data.detail[i].detail) {
                                var detailTmp = $scope.data.detail[i].detail;
                                for (var j = 0; j < detailTmp.length; j++) {
                                    // 赋值
                                    $scope.allSelStatus.push(detailTmp[j].code);
                                    var showButtonValue = new originCheckBoxValueForShowBotton(detailTmp[j].code, ($scope.data.detail[i].name + '-' + detailTmp[j].name));
                                    $scope.allOrderType.push(showButtonValue);
                                    if (detailTmp[j].selected) {
                                        $scope.selStatus.push(detailTmp[j].code);
                                        $scope._orderType.push(showButtonValue);
                                    }
                                }
                            } else {
                                // 赋值
                                $scope.allSelStatus.push($scope.data.detail[i].code);
                                if ($scope.data.detail[i].selected == true) {
                                    $scope.selStatus.push($scope.data.detail[i].code);
                                }
                            }
                        }
                    }
                    // link执行的时候设置value
                    ngModel.$setViewValue($scope.selStatus, $scope._orderType);
                })
                /**
                 * [originCheckBoxValueForShowBotton 删除button的对象]
                 * @param  {[type]} code    [description]
                 * @param  {[type]} newName [description]
                 * @return {[type]}         [description]
                 */
                function originCheckBoxValueForShowBotton(code, newName) {
                    this.code = code;
                    this.newName = newName;
                }
                /**
                 * [arrayRemove 公共方法从数据中移除一项]
                 * @param  {[Array]} array [目标数组]
                 * @param  {[Any]} value [要移除的值]
                 * @return {[Any]}       [要移除的值]
                 */
                function arrayRemove(array, value) {
                    var index = array.indexOf(value);
                    if (index >= 0) {
                        array.splice(index, 1);
                    }
                    return value;
                }
                /**
                 * [contain 判断一个数组中是否包含该值]
                 * @param  {[type]} array [目标数组]
                 * @param  {[type]} value [包含的值]
                 * @return {[boolean]}       [数组中是否包含该值]
                 */
                function contain(array, value) {
                    var contain = false;
                    if (array.indexOf(value) >= 0) {
                        contain = true;
                    }
                    return contain;
                }
                /**
                 * [changeAllStatus 检查全部的状态做出相应的调整]
                 * @return {null} [
                 */
                $scope.changeAllStatus = function() {
                    // 如果已经是把所有的值都选上的，那么自动把all的值也选上
                    if (($scope.allSelStatus.length - 1) > $scope.selStatus.length) {
                        return;
                    } else {
                        // 小于是不可能的只有等于的情况
                        // 这种情况是原来是全部选中状态
                        if (contain($scope.selStatus, $scope.allSelStatus[0])) {
                            arrayRemove($scope.selStatus, $scope.allSelStatus[0]);
                        } else {
                            // 这种状况是应该把全部加上
                            $scope.selStatus = angular.copy($scope.allSelStatus, []);
                        }
                    }
                }
                /**
                 * [updateShowButtonForCheck description]
                 * @param  {[type]} code [description]
                 * @return {[type]}      [description]
                 */
                $scope.updateShowButtonForCheck = function(code, di) {
                    // 取消勾选
                    if (contain($scope.selStatus, code)) {
                        $scope.updateShowButton(code, di);
                        $scope.rankValue();
                    } else {
                        // 勾选
                        // 赋值
                        $scope.selStatus.push(code);
                        // 重新对$scope._orderType变量进行赋值，为什么要重新赋值呢，因为现实被勾选了那些项是有顺序的
                        for (var i = 0; i < $scope.allOrderType.length; i++) {
                            if (code == $scope.allOrderType[i].code) {
                                $scope._orderType.push($scope.allOrderType[i]);
                                break;
                            }
                        }
                        // 对数组重新排序，按照下拉列的顺序
                        $scope._orderType.sort(function(a, b) {
                            var indexA, indexB;
                            indexA = $scope.allOrderType.indexOf(a);
                            indexB = $scope.allOrderType.indexOf(b);
                            return indexA - indexB;
                        });
                        $scope.changeAllStatus();
                        $scope.rankValue();
                    }
                    // 更新页面
                    ngModel.$setViewValue($scope.selStatus);
                }
                /**
                 * [updateShowButton 移除带有叉号的button]
                 * @param  {[String]} code [botton 的code]
                 * @return {null}
                 */
                $scope.updateShowButton = function(code, di) {
                    if (!di) {
                        for (var i = 0, ip; (ip = $scope.data.detail[i]); i++) {
                            if (ip.detail) {
                                for (var j = 0, iq; (iq = ip.detail[j]); j++) {
                                    if (iq.code == code) {
                                        di = ip;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    di._checked = false;
                    arrayRemove($scope.selStatus, code);
                    for (var i = 0; i < $scope._orderType.length; i++) {
                        if (code == $scope._orderType[i].code) {
                            arrayRemove($scope._orderType, $scope._orderType[i]);
                            break;
                        }
                    }
                    $scope.rankValue();
                    $scope.changeAllStatus();
                    // 更新页面
                    ngModel.$setViewValue($scope.selStatus, $scope._orderType);
                }
                $scope.rankValue = function() {
                    var newArr = angular.copy($scope.selStatus);
                    $scope.selStatus.length = 0;
                    for (var i = 0, iv; (iv = $scope.data.detail[i]); i++) {
                        if (iv.detail) {
                            for (var k = 0, iq; (iq = iv.detail[k]); k++) {
                                for (var j = 0, ip; (ip = newArr[j]); j++) {
                                    if (iq.code == ip) {
                                        $scope.selStatus.push(ip);
                                    }
                                }
                            }
                        } else {
                            for (var j = 0, ip; (ip = newArr[j]); j++) {
                                if (iv.code == ip) {
                                    $scope.selStatus.push(ip);
                                }
                            }
                        }
                    }
                }
                /**
                 * [select 选中的操作]
                 * @param  {[Object]} di    [选择节点对应的对象]
                 * @param  {[number]} index [对应节点的index]
                 * @return {null}
                 */
                $scope.select = function(di, index, detail) {
                    // 判断是全部， 还是其他， 其他里面还有带有下来列表的和不带有下来的两种
                    // 先把上一次设置的带有checkbox的选中设置为false
                    $scope.lastDi.showCheckBoxList = false;
                    $scope.lastDi.checkboxselect = false;
                    $scope.lastDi.isDrop = false;
                    // 全部按钮
                    if (di.code.toLowerCase().substring(di.code.length-3) == 'all' || index == 0) {
                        // 如果 全部按钮已经是选的了，则直接退出不做任何操作，否则的话选择全部
                        if (contain($scope.selStatus, di.code)) {
                            return;
                        } else {
                            $scope.selStatus = angular.copy($scope.allSelStatus, []);
                            $scope._orderType = angular.copy($scope.allOrderType, []);
                            // ngModel.$setViewValue($scope.selStatus, $scope._orderType);
                        }
                    } else {
                        // 带有下拉列表的
                        if (di.detail) {
                            di.isDrop = true;
                            $scope.lastDi.checkboxselect = false;
                            // 要把下拉列表现实出来
                            di.showCheckBoxList = true;
                            // 把样式设置为选中
                            di.checkboxselect = true;
                            // 存储本次设置的di
                            $scope.lastDi = di;
                            // ngModel.$setViewValue($scope.selStatus);
                        } else {
                            // 要判断是选中还是取消选中
                            // 取消选中
                            if (contain($scope.selStatus, di.code)) {
                                // 移除该code
                                arrayRemove($scope.selStatus, di.code);
                            } else {
                                // 选中,把code增加到selStatus即可
                                $scope.selStatus.push(di.code);
                            }
                            $scope.changeAllStatus();
                            $scope.rankValue();
                            ngModel.$setViewValue($scope.selStatus);
                        }
                    }
                    // 更新页面
                    ngModel.$setViewValue($scope.selStatus);
                }
                /**
                 * [hideCheckboxList 鼠标离开div时，隐藏checkbox列表]
                 * @param  {[object]} di [节点对象]
                 * @return {null}
                 */
                $scope.hideCheckboxList = function (di) {
                    di.showCheckBoxList = false;
                    di.checkboxselect = false;
                    di.isDrop = false;
                }
                /**
                 * [hideCheckboxListForClick 点击隐藏按钮，隐藏checkbox列表]
                 * @param di
                 * @param isDrop
                 */
                $scope.hideCheckboxListForClick = function (di, isDrop, $event) {
                    if (isDrop) {
                        di.showCheckBoxList = false;
                        di.checkboxselect = false;
                        di.isDrop = false;
                        $event.stopPropagation();
                    }
                }
            }
        }
    });
/**
 * create by yuhongping
 */
angular.module('grace.bootstrap.dimensionSelectWithCustom', ["template/dimensionBaseSelect/dimensionSelectWithCustom.html"])
    .controller('dimensionSelectWithCustomController', ['$scope', '$attrs', '$parse', function($scope, $attrs, $parse) {
        $scope.isCustom = function(_di){
            return _di.code=="custom";
        };
        $scope.isBrand = function(){
            return $scope.code=="statisticalClassification";
        }
    }])
    .directive('graceDimensionSelectWithCustom', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'template/dimensionBaseSelect/dimensionSelectWithCustom.html',
            scope: {
                data: '=data',
                isMult: '=ismult',
                code: '=code'
            },
            require: ['ngModel'],
            controller: 'dimensionSelectWithCustomController',
            link: function($scope, $element, $attr, $ctrls) {
                //保存选中的项
                $scope.selStatus = [];
                $scope.$watch('data', function(data){
                    if(data){
                        var detailLen = $scope.data.detail.length;
                        if ($scope.data.detail && $scope.data.detail.length > 0) {
                            //第一项为全部时，默认选中所有的项
                            if ($scope.data.detail[0].code.toLowerCase().substring($scope.data.detail[0].code.length-3) == 'all') {
                                for (var i = 0; i < $scope.data.detail.length; i++) {
                                    if ($scope.data.detail[i].code != 'custom') {
                                        $scope.selStatus.push($scope.data.detail[i].code);
                                    }else{
                                        detailLen--;
                                    }
                                }
                            }else {
                                //判断是否为多选
                                if ($scope.isMult) {
                                    for (var i = 0; i < $scope.data.detail.length; i++) {
                                        if ($scope.data.detail[i].selected == true) {
                                            $scope.selStatus.push($scope.data.detail[i].code);
                                        }
                                    }
                                } else  {
                                    for (var i = 0; i < $scope.data.detail.length; i++) {
                                        if ($scope.data.detail[i].selected == true) {
                                            $scope.selStatus.push($scope.data.detail[i].code);
                                            break;
                                        }
                                    }
                                    if ($scope.selStatus.length == 0) {
                                        $scope.selStatus.push($scope.data.detail[0].code);
                                    }
                                }
                            }
                        }
                        var ngModel = $ctrls[0];
                        ngModel.$setViewValue($scope.selStatus);
                        var self = this, hideList = false, lastSelect = [];
                        $scope.lastSelect = angular.copy($scope.selStatus);
                        $scope.return = function() {
                            if($scope.$parent.cancelCustom){
                                $scope.$parent.cancelCustom();
                            }
                            $scope.selStatus = angular.copy($scope.lastSelect);
                            $scope.hideList = !$scope.hideList;
                            ngModel.$setViewValue($scope.selStatus);
                        }
                        $scope.select = function(di, index) {
                            /* 判断当前SCOPE是否BRAND统计 START */
                            if($scope.isBrand()&&$scope.$parent.switchBrand){
                                $scope.$parent.switchBrand(di);
                            }
                            /* 判断当前SCOPE是否BRAND统计 END */
                            // 如果是自定义
                            if (di.code == 'custom') {
                                $scope.hideList = !$scope.hideList;
                                $scope.customSelected = true;
                                document.getElementById('graceDiCusInputBox').value = '';
                            }else {
                                $scope.customSelected = false;
                                //判断是否为多选
                                if ($scope.isMult) {
                                    //如果该项已被选中，则取消
                                    if ($scope.selStatus.indexOf(di.code) != -1) { // 已选中
                                        if ($scope.selStatus[0].toLowerCase().substring($scope.selStatus[0].length-3) == 'all') {
                                            $scope.selStatus.shift();
                                        }
                                        if (di.code.toLowerCase().substring(di.code.length-3) != 'all') {
                                            $scope.selStatus.splice($scope.selStatus.indexOf(di.code), 1);
                                        }
                                    } else { // 未选中
                                        //判断选择的是否是全选项
                                        if (di.code.toLowerCase().substring(di.code.length-3) == 'all') {
                                            $scope.selStatus = [];
                                            for (var i = 0; i < detailLen; i++) {
                                                $scope.selStatus.push($scope.data.detail[i].code);
                                            }
//                                            $scope.selStatus.pop();
                                        } else {
                                            $scope.selStatus.push(di.code);
                                        }
                                    }
                                    // 这里还要增加是否各项已经都被选中，如果已经都被选中了，则需要把全部的样式也加上
                                    if ($scope.selStatus.length == detailLen - 1 && $scope.selStatus.indexOf('$scope.data.detail[0].code') < 0) {
                                        $scope.selStatus.unshift($scope.data.detail[0].code);
                                    }
                                } else {
                                    if (di.code.toLowerCase().substring(di.code.length-3) == 'all') {
                                        $scope.selStatus = [];
                                        for (var i = 0; i < detailLen; i++) {
                                            $scope.selStatus.push($scope.data.detail[i].code);
                                        }
//                                        $scope.selStatus.pop();
                                    } else {
                                        $scope.selStatus = [di.code];
                                    }
                                }
                                $scope.lastSelect = angular.copy($scope.selStatus);
                            }
                            ngModel.$setViewValue($scope.selStatus);
                        }
                    }
                });
            }
        }
    });
angular.module('grace.bootstrap.dimensionSelectWithRadioBox', ["template/dimensionBaseSelect/dimensionSelectWithRadioBox.html"])
    .directive('graceDimensionSelectWithRadioBox', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: 'template/dimensionBaseSelect/dimensionSelectWithRadioBox.html',
            scope: {
                data: '=data'
            },
            require: ['ngModel'],
            link: function($scope, $element, $attr, $ctrls) {
//                // 为了全部按钮好使，点击全部按钮，就会把所有的值都赋上
//                $scope.allSelStatus = [];
//                // 保存选中的项，这个变量是要往后台传的参数
//                $scope.selStatus = [];
//                // 获得Model
//                var ngModel = $ctrls[0];
//                // 初始化
//                if ($scope.data.detail && $scope.data.detail.length > 0) {
//                    // 首先要遍历detail
//                    for (var i = 0; i < $scope.data.detail.length; i++) {
//                        // 说明是一个checklist，还有子项
//                        if ($scope.data.detail[i].detail) {
//                            var detailTmp = $scope.data.detail[i].detail;
//                            //$scope.diWithCheckBox.push(detailTmp);
//                            for (var j = 0; j < detailTmp.length; j++) {
//                                // 赋值
//                                $scope.allSelStatus.push(detailTmp[j].code);
////                                var showButtonValue = new originCheckBoxValueForShowBotton(detailTmp[j].code, ($scope.data.detail[i].name + '-' + detailTmp[j].name));
////                                $scope.allOrderType.push(showButtonValue);
////                                if (detailTmp[j].selected) {
////                                    $scope.selStatus.push(detailTmp[j].code);
////                                    $scope._orderType.push(showButtonValue);
////                                }
//                            }
//                        } else {
//                            // 赋值
//                            $scope.allSelStatus.push($scope.data.detail[i].code);
//                            if ($scope.data.detail[i].selected == true) {
//                                $scope.selStatus.push($scope.data.detail[i].code);
//                            }
//                        }
//                    }
//                }
//                return;
                ///////-------------------//////
                // 为了全部按钮好使，点击全部按钮，就会把所有的值都赋上
                $scope.allSelStatus = [];
                // 所有的checked项
                $scope.allOrderType = [];
                // 记录哪些是该选中的
                $scope._orderType = [];
                // 保存选中的项，这个变量是要往后台传的参数
                $scope.selStatus = [];
                // 上一次选中的带有下拉列表的项
                $scope.lastDi = {};
                // 获得Model
                var ngModel = $ctrls[0];
                $scope.$watch('data', function() {
                    if (!$scope.data) {
                        return;
                    }
                    // 初始化
                    if ($scope.data.detail && $scope.data.detail.length > 0) {
                        // 这个组件需要很特殊的处理， 有带有下拉列表的，还有单独复选的，很复杂的
                        // 如果第一项为全部也不能说明就一定要全部选中，因为这个是根据结果集里面的selected属性去选择的
                        // 首先要遍历detail
                        for (var i = 0; i < $scope.data.detail.length; i++) {
                            // 说明是一个checklist，还有子项
                            if ($scope.data.detail[i].detail) {
                                var detailTmp = $scope.data.detail[i].detail;
                                //$scope.diWithCheckBox.push(detailTmp);
                                for (var j = 0; j < detailTmp.length; j++) {
                                    // 赋值
                                    var showButtonValue = new originCheckBoxValueForShowBotton(detailTmp[j].code, ($scope.data.detail[i].name + '-' + detailTmp[j].name));
                                    $scope.allOrderType.push(showButtonValue);
                                    if (detailTmp[j].selected) {
                                        $scope.allSelStatus.push(detailTmp[j].code);
                                        $scope.selStatus.push(detailTmp[j].code);
                                        $scope._orderType.push(showButtonValue);
                                    }
//                                    $scope.allSelStatus.push(detailTmp[j].code);
//                                    var showButtonValue = new originCheckBoxValueForShowBotton(detailTmp[j].code, ($scope.data.detail[i].name + '-' + detailTmp[j].name));
//                                    $scope.allOrderType.push(showButtonValue);
//                                    if (detailTmp[j].selected) {
//                                        $scope.selStatus.push(detailTmp[j].code);
//                                        $scope._orderType.push(showButtonValue);
//                                    }
                                }
                            } else {
                                // 赋值
                                $scope.allSelStatus.push($scope.data.detail[i].code);
                                if ($scope.data.detail[i].selected == true) {
                                    $scope.selStatus.push($scope.data.detail[i].code);
                                }
                            }
                        }
                    }

                    // link执行的时候设置value
                    ngModel.$setViewValue($scope.selStatus, $scope._orderType);
                    // 触发全部选中
                    var temp = {};
                    temp.code =  'orderTypeAll';
                    $scope.select(temp, 0);
                })
//                // 初始化
//                if ($scope.data.detail && $scope.data.detail.length > 0) {
//                    // 这个组件需要很特殊的处理， 有带有下拉列表的，还有单独复选的，很复杂的
//                    // 如果第一项为全部也不能说明就一定要全部选中，因为这个是根据结果集里面的selected属性去选择的
//                    // 首先要遍历detail
//                    for (var i = 0; i < $scope.data.detail.length; i++) {
//                        // 说明是一个checklist，还有子项
//                        if ($scope.data.detail[i].detail) {
//                            var detailTmp = $scope.data.detail[i].detail;
//                            //$scope.diWithCheckBox.push(detailTmp);
//                            for (var j = 0; j < detailTmp.length; j++) {
//                                // 赋值
//                                $scope.allSelStatus.push(detailTmp[j].code);
//                                var showButtonValue = new originCheckBoxValueForShowBotton(detailTmp[j].code, ($scope.data.detail[i].name + '-' + detailTmp[j].name));
//                                $scope.allOrderType.push(showButtonValue);
//                                if (detailTmp[j].selected) {
//                                    $scope.selStatus.push(detailTmp[j].code);
//                                    $scope._orderType.push(showButtonValue);
//                                }
//                            }
//                        } else {
//                            // 赋值
//                            $scope.allSelStatus.push($scope.data.detail[i].code);
//                            if ($scope.data.detail[i].selected == true) {
//                                $scope.selStatus.push($scope.data.detail[i].code);
//                            }
//                        }
//                    }
//                }
//
//                // link执行的时候设置value
//                ngModel.$setViewValue($scope.selStatus, $scope._orderType);
                /**
                 * [originCheckBoxValueForShowBotton 删除button的对象]
                 * @param  {[type]} code    [description]
                 * @param  {[type]} newName [description]
                 * @return {[type]}         [description]
                 */
                function originCheckBoxValueForShowBotton(code, newName) {
                    this.code = code;
                    this.newName = newName;
                }
                /**
                 * [arrayRemove 公共方法从数据中移除一项]
                 * @param  {[Array]} array [目标数组]
                 * @param  {[Any]} value [要移除的值]
                 * @return {[Any]}       [要移除的值]
                 */
                function arrayRemove(array, value) {
                    var index = array.indexOf(value);
                    if (index >= 0) {
                        array.splice(index, 1);
                    }
                    return value;
                }
                /**
                 * [contain 判断一个数组中是否包含该值]
                 * @param  {[type]} array [目标数组]
                 * @param  {[type]} value [包含的值]
                 * @return {[boolean]}       [数组中是否包含该值]
                 */
                function contain(array, value) {
                    var contain = false;
                    if (array.indexOf(value) >= 0) {
                        contain = true;
                    }
                    return contain;
                }
                /**
                 * [changeAllStatus 检查全部的状态做出相应的调整]
                 * @return {null} [
                 */
                $scope.changeAllStatus = function() {
                    // 如果已经是把所有的值都选上的，那么自动把all的值也选上
                    if (($scope.allSelStatus.length - 1) > $scope.selStatus.length) {
                        return;
                    } else {
                        // 小于是不可能的只有等于的情况
                        // 这种情况是原来是全部选中状态
                        if (contain($scope.selStatus, $scope.allSelStatus[0])) {
                            arrayRemove($scope.selStatus, $scope.allSelStatus[0]);
                        } else {
                            // 这种状况是应该把全部加上
                            $scope.selStatus = angular.copy($scope.allSelStatus, []);
                        }
                    }
                }
                /**
                 * [updateShowButtonForCheck description]
                 * @param  {[type]} code [description]
                 * @return {[type]}      [description]
                 */
                $scope.updateShowButtonForCheck = function(code) {
                    $scope.selStatus = [];
                    // 只选择一个值
                    for (var i = 0; i < $scope.allOrderType.length; i++) {
                        if (code == $scope.allOrderType[i].code) {
                            $scope._orderType = [];
                            $scope._orderType.push($scope.allOrderType[i]);
                            break;
                        }
                    }
                    $scope.selStatus.push($scope.allOrderType[i].code);
                    $scope.changeAllStatus();
                    ngModel.$setViewValue($scope.selStatus);
                    return;
                    // 取消勾选
                    if (contain($scope.selStatus, code)) {
                        $scope.updateShowButton(code);
                    } else {
                        // 勾选
                        // 赋值
                        $scope.selStatus.push(code);
                        // 重新对$scope._orderType变量进行赋值，为什么要重新赋值呢，因为现实被勾选了那些项是有顺序的
                        for (var i = 0; i < $scope.allOrderType.length; i++) {
                            if (code == $scope.allOrderType[i].code) {
                                $scope._orderType.push($scope.allOrderType[i]);
                                break;
                            }
                        }
                        // 对数组重新排序，按照下拉列的顺序
                        $scope._orderType.sort(function(a, b) {
                            var indexA, indexB;
                            indexA = $scope.allOrderType.indexOf(a);
                            indexB = $scope.allOrderType.indexOf(b);
                            return indexA - indexB;
                        });
                        $scope.changeAllStatus();
                        // ngModel.$setViewValue($scope.selStatus, $scope._orderType);
                    }
                    // 更新页面
                    ngModel.$setViewValue($scope.selStatus);
                }
                /**
                 * [updateShowButton 移除带有叉号的button]
                 * @param  {[String]} code [botton 的code]
                 * @return {null}
                 */
                $scope.updateShowButton = function(code, di) {
                    if (!di) {
                        for (var i = 0, ip; (ip = $scope.data.detail[i]); i++) {
                            if (ip.detail) {
                                for (var j = 0, iq; (iq = ip.detail[j]); j++) {
                                    if (iq.code == code) {
                                        di = ip;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    di._checked = false;
                    arrayRemove($scope.selStatus, code);
                    for (var i = 0; i < $scope._orderType.length; i++) {
                        if (code == $scope._orderType[i].code) {
                            arrayRemove($scope._orderType, $scope._orderType[i]);
                            break;
                        }
                    }
                    $scope.changeAllStatus();
                    // 更新页面
                    ngModel.$setViewValue($scope.selStatus, $scope._orderType);
                }
                /**
                 * [select 选中的操作]
                 * @param  {[Object]} di    [选择节点对应的对象]
                 * @param  {[number]} index [对应节点的index]
                 * @return {null}
                 */
                $scope.select = function(di, index, detail) {
                    // 判断是全部， 还是其他， 其他里面还有带有下来列表的和不带有下来的两种
                    // 先把上一次设置的带有checkbox的选中设置为false
                    $scope.lastDi.showCheckBoxList = false;
                    $scope.lastDi.checkboxselect = false;
                    $scope.lastDi.isDrop = false;
                    // 全部按钮
                    if (di.code.toLowerCase().substring(di.code.length-3) == 'all' || index == 0) {
                        // 如果 全部按钮已经是选的了，则直接退出不做任何操作，否则的话选择全部
                        if (contain($scope.selStatus, di.code)) {
                            return;
                        } else {
                            $scope.selStatus = angular.copy($scope.allSelStatus, []);
                            $scope._orderType = angular.copy($scope.allOrderType, []);
                            $scope._orderType = $scope._orderType.slice(0,1);
                            // ngModel.$setViewValue($scope.selStatus, $scope._orderType);
                        }
                    } else {
                        // 带有下拉列表的
                        if (di.detail) {
                            di.isDrop = true;
                            $scope.lastDi.checkboxselect = false;
                            // 要把下拉列表现实出来
                            di.showCheckBoxList = true;
                            // 把样式设置为选中
                            di.checkboxselect = true;
                            // 存储本次设置的di
                            $scope.lastDi = di;
                            // ngModel.$setViewValue($scope.selStatus);
                        } else {
                            // 要判断是选中还是取消选中
                            // 取消选中
//                            if (contain($scope.selStatus, di.code)) {
//                                // 移除该code
//                                arrayRemove($scope.selStatus, di.code);
//                            } else {
//                                // 选中,把code增加到selStatus即可
//                                $scope.selStatus.push(di.code);
//                            }
                            $scope.selStatus = [];
                            $scope.selStatus.push(di.code);
                            $scope.changeAllStatus();
                            // 移除下拉列表的选中的项
                            $scope.changeDropStatus();
                            ngModel.$setViewValue($scope.selStatus);
                        }
                    }
                    // 更新页面
                    ngModel.$setViewValue($scope.selStatus);
                }
                /**
                 *  去掉dorpdown的选项
                 */
                $scope.changeDropStatus = function() {
                    var temp = angular.copy($scope._orderType);
                    for (var i = 0; i < temp.length; i++) {
                        $scope.updateShowButton(temp[i].code);
                    }
                }
                /**
                 * [hideCheckboxList 鼠标离开div时，隐藏checkbox列表]
                 * @param  {[object]} di [节点对象]
                 * @return {null}
                 */
                $scope.hideCheckboxList = function(di) {
                    di.showCheckBoxList = false;
                    di.checkboxselect = false;
                    di.isDrop = false;
                }
                /**
                 * [hideCheckboxListForClick 点击隐藏按钮，隐藏checkbox列表]
                 * @param di
                 * @param isDrop
                 */
                $scope.hideCheckboxListForClick = function (di, isDrop, $event) {
                    if (isDrop) {
                        di.showCheckBoxList = false;
                        di.checkboxselect = false;
                        di.isDrop = false;
                        $event.stopPropagation();
                    }
                }
//                // 触发全部选中
//                var temp = {};
//                temp.code =  'orderTypeAll';
//                $scope.select(temp, 0);
            }
        }
    });
angular.module('grace.bootstrap.dropdown', [])

.constant('dropdownConfig', {
  openClass: 'open'
})

.service('dropdownService', ['$document', function($document) {
  var openScope = null;

  this.open = function( dropdownScope ) {
    if ( !openScope ) {
      $document.bind('click', closeDropdown);
      $document.bind('keydown', escapeKeyBind);
    }

    if ( openScope && openScope !== dropdownScope ) {
        openScope.isOpen = false;
    }

    openScope = dropdownScope;
  };

  this.close = function( dropdownScope ) {
    if ( openScope === dropdownScope ) {
      openScope = null;
      $document.unbind('click', closeDropdown);
      $document.unbind('keydown', escapeKeyBind);
    }
  };

  var closeDropdown = function( evt ) {
    var toggleElement = openScope.getToggleElement();
    if ( evt && toggleElement && toggleElement[0].contains(evt.target) ) {
        return;
    }

    openScope.$apply(function() {
      openScope.isOpen = false;
    });
  };

  var escapeKeyBind = function( evt ) {
    if ( evt.which === 27 ) {
      openScope.focusToggleElement();
      closeDropdown();
    }
  };
}])

.controller('DropdownController', ['$scope', '$attrs', '$parse', 'dropdownConfig', 'dropdownService', '$animate', function($scope, $attrs, $parse, dropdownConfig, dropdownService, $animate) {
  var self = this,
      scope = $scope.$new(), // create a child scope so we are not polluting original one
      openClass = dropdownConfig.openClass,
      getIsOpen,
      setIsOpen = angular.noop,
      toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop;

  this.init = function( element ) {
    self.$element = element;

    if ( $attrs.isOpen ) {
      getIsOpen = $parse($attrs.isOpen);
      setIsOpen = getIsOpen.assign;

      $scope.$watch(getIsOpen, function(value) {
        scope.isOpen = !!value;
      });
    }
  };

  this.toggle = function( open ) {
    return scope.isOpen = arguments.length ? !!open : !scope.isOpen;
  };

  // Allow other directives to watch status
  this.isOpen = function() {
    return scope.isOpen;
  };

  scope.getToggleElement = function() {
    return self.toggleElement;
  };

  scope.focusToggleElement = function() {
    if ( self.toggleElement ) {
      self.toggleElement[0].focus();
    }
  };

  scope.$watch('isOpen', function( isOpen, wasOpen ) {
    $animate[isOpen ? 'addClass' : 'removeClass'](self.$element, openClass);

    if ( isOpen ) {
      scope.focusToggleElement();
      dropdownService.open( scope );
    } else {
      dropdownService.close( scope );
    }

    setIsOpen($scope, isOpen);
    if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
      toggleInvoker($scope, { open: !!isOpen });
    }
  });

  $scope.$on('$locationChangeSuccess', function() {
    scope.isOpen = false;
  });

  $scope.$on('$destroy', function() {
    scope.$destroy();
  });
}])

.directive('dropdown', function() {
  return {
    controller: 'DropdownController',
    link: function(scope, element, attrs, dropdownCtrl) {
      dropdownCtrl.init( element );
    }
  };
})

.directive('dropdownToggle', function() {
  return {
    require: '?^dropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if ( !dropdownCtrl ) {
        return;
      }

      dropdownCtrl.toggleElement = element;

      var toggleDropdown = function(event) {
        event.preventDefault();

        if ( !element.hasClass('disabled') && !attrs.disabled ) {
          scope.$apply(function() {
            dropdownCtrl.toggle();
          });
        }
      };

      element.bind('click', toggleDropdown);

      // WAI-ARIA
      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
      scope.$watch(dropdownCtrl.isOpen, function( isOpen ) {
        element.attr('aria-expanded', !!isOpen);
      });

      scope.$on('$destroy', function() {
        element.unbind('click', toggleDropdown);
      });
    }
  };
});

/**
 * Created by lvu on 4/7/15.
 */

angular.module('grace.bootstrap.fieldManager', [])


    .controller('fieldManagerController', ['$scope', function ($scope) {
        var self = this,
            fields = [];

        /**
         *
         * @param field   {type: '', element: '', scope: ''}
         */
        self.addField = function (field) {
            fields.push(field);
        };
        self.getField = function () {
            return fields;
        };
        self.getFieldValue = function (name) {
            var v = [], s;
            for (var i = 0, len = fields.length; i < len; i++) {
                s = fields[i].scope;
                if (arguments.length && name !== s.getName()) {  //如果有name，并且name和当前遍历的不同，那么下一个
                    continue;
                }
                v.push({
                    name: s.getName(),
                    value: s.getValue()
                });
            }
            return v;
        };
        //回传句柄
        $scope.handler({
            getFieldValue: self.getFieldValue
        });
    }])
    .directive('graceFieldManager', [function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                handler: '='
            },
            controller: 'fieldManagerController',
            link: function ($scope, iElement, attrs, ctrl) {

            }
        };
    }]);
angular.module('grace.bootstrap.pagination', [])

.controller('PaginationController', ['$scope', '$attrs', '$parse', function ($scope, $attrs, $parse) {
  var self = this,
      ngModelCtrl = { $setViewValue: angular.noop }, // nullModelCtrl
      setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;

  this.init = function(ngModelCtrl_, config) {
    ngModelCtrl = ngModelCtrl_;
    this.config = config;

    ngModelCtrl.$render = function() {
      self.render();
    };

    if ($attrs.itemsPerPage) {
      $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
        self.itemsPerPage = parseInt(value, 10);
        $scope.totalPages = self.calculateTotalPages();
      });
    } else {
      this.itemsPerPage = config.itemsPerPage;
    }
  };

  this.calculateTotalPages = function() {
    var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
    return Math.max(totalPages || 0, 1);
  };

  this.render = function() {
    $scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;
  };

  $scope.selectPage = function(page) {
    if ( $scope.page !== page && page > 0 && page <= $scope.totalPages) {
      ngModelCtrl.$setViewValue(page);
      ngModelCtrl.$render();
    }
  };

  $scope.getText = function( key ) {
    return $scope[key + 'Text'] || self.config[key + 'Text'];
  };
  $scope.noPrevious = function() {
    return $scope.page === 1;
  };
  $scope.noNext = function() {
    return $scope.page === $scope.totalPages;
  };

  $scope.$watch('totalItems', function() {
    $scope.totalPages = self.calculateTotalPages();
  });

  $scope.$watch('totalPages', function(value) {
    setNumPages($scope.$parent, value); // Readonly variable

    if ( $scope.page > value ) {
      $scope.selectPage(value);
    } else {
      ngModelCtrl.$render();
    }
  });
}])

.constant('paginationConfig', {
  itemsPerPage: 10,
  boundaryLinks: false,
  directionLinks: true,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last',
  rotate: true
})

.directive('pagination', ['$parse', 'paginationConfig', function($parse, paginationConfig) {
  return {
    restrict: 'EA',
    scope: {
      totalItems: '=',
      firstText: '@',
      previousText: '@',
      nextText: '@',
      lastText: '@'
    },
    require: ['pagination', '?ngModel'],
    controller: 'PaginationController',
    templateUrl: 'template/pagination/pagination.html',
    replace: true,
    link: function(scope, element, attrs, ctrls) {
      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (!ngModelCtrl) {
         return; // do nothing if no ng-model
      }

      // Setup configuration parameters
      var maxSize = angular.isDefined(attrs.maxSize) ? scope.$parent.$eval(attrs.maxSize) : paginationConfig.maxSize,
          rotate = angular.isDefined(attrs.rotate) ? scope.$parent.$eval(attrs.rotate) : paginationConfig.rotate;
      scope.boundaryLinks = angular.isDefined(attrs.boundaryLinks) ? scope.$parent.$eval(attrs.boundaryLinks) : paginationConfig.boundaryLinks;
      scope.directionLinks = angular.isDefined(attrs.directionLinks) ? scope.$parent.$eval(attrs.directionLinks) : paginationConfig.directionLinks;

      paginationCtrl.init(ngModelCtrl, paginationConfig);

      if (attrs.maxSize) {
        scope.$parent.$watch($parse(attrs.maxSize), function(value) {
          maxSize = parseInt(value, 10);
          paginationCtrl.render();
        });
      }

      // Create page object used in template
      function makePage(number, text, isActive) {
        return {
          number: number,
          text: text,
          active: isActive
        };
      }

      function getPages(currentPage, totalPages) {
        var pages = [];

        // Default page limits
        var startPage = 1, endPage = totalPages;
        var isMaxSized = ( angular.isDefined(maxSize) && maxSize < totalPages );

        // recompute if maxSize
        if ( isMaxSized ) {
          if ( rotate ) {
            // Current page is displayed in the middle of the visible ones
            startPage = Math.max(currentPage - Math.floor(maxSize/2), 1);
            endPage   = startPage + maxSize - 1;

            // Adjust if limit is exceeded
            if (endPage > totalPages) {
              endPage   = totalPages;
              startPage = endPage - maxSize + 1;
            }
          } else {
            // Visible pages are paginated with maxSize
            startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;

            // Adjust last page if limit is exceeded
            endPage = Math.min(startPage + maxSize - 1, totalPages);
          }
        }

        // Add page number links
        for (var number = startPage; number <= endPage; number++) {
          var page = makePage(number, number, number === currentPage);
          pages.push(page);
        }

        // Add links to move between page sets
        if ( isMaxSized && ! rotate ) {
          if ( startPage > 1 ) {
            var previousPageSet = makePage(startPage - 1, '...', false);
            pages.unshift(previousPageSet);
          }

          if ( endPage < totalPages ) {
            var nextPageSet = makePage(endPage + 1, '...', false);
            pages.push(nextPageSet);
          }
        }

        return pages;
      }

      var originalRender = paginationCtrl.render;
      paginationCtrl.render = function() {
        originalRender();
        if (scope.page > 0 && scope.page <= scope.totalPages) {
          scope.pages = getPages(scope.page, scope.totalPages);
        }
      };
    }
  };
}])

.constant('pagerConfig', {
  itemsPerPage: 10,
  previousText: '« Previous',
  nextText: 'Next »',
  align: true
})

.directive('pager', ['pagerConfig', function(pagerConfig) {
  return {
    restrict: 'EA',
    scope: {
      totalItems: '=',
      previousText: '@',
      nextText: '@'
    },
    require: ['pager', '?ngModel'],
    controller: 'PaginationController',
    templateUrl: 'template/pagination/pager.html',
    replace: true,
    link: function(scope, element, attrs, ctrls) {
      var paginationCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      if (!ngModelCtrl) {
         return; // do nothing if no ng-model
      }

      scope.align = angular.isDefined(attrs.align) ? scope.$parent.$eval(attrs.align) : pagerConfig.align;
      paginationCtrl.init(ngModelCtrl, pagerConfig);
    }
  };
}]);

/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
angular.module('grace.bootstrap.tooltip', [ 'grace.bootstrap.position', 'grace.bootstrap.bindHtml' ])

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
    .provider('$tooltip', function () {
        // The default options tooltip and popover.
        var defaultOptions = {
            placement: 'top',
            animation: true,
            popupDelay: 0
        };

        // Default hide triggers for each show trigger
        var triggerMap = {
            'mouseenter': 'mouseleave',
            'click': 'click',
            'focus': 'blur'
        };

        // The options specified to the provider globally.
        var globalOptions = {};

        /**
         * `options({})` allows global configuration of all tooltips in the
         * application.
         *
         *   var app = angular.module( 'App', ['grace.bootstrap.tooltip'], function( $tooltipProvider ) {
   *     // place tooltips left instead of top by default
   *     $tooltipProvider.options( { placement: 'left' } );
   *   });
         */
        this.options = function (value) {
            angular.extend(globalOptions, value);
        };

        /**
         * This allows you to extend the set of trigger mappings available. E.g.:
         *
         *   $tooltipProvider.setTriggers( 'openTrigger': 'closeTrigger' );
         */
        this.setTriggers = function setTriggers(triggers) {
            angular.extend(triggerMap, triggers);
        };

        /**
         * This is a helper function for translating camel-case to snake-case.
         */
        function snake_case(name) {
            var regexp = /[A-Z]/g;
            var separator = '-';
            return name.replace(regexp, function (letter, pos) {
                return (pos ? separator : '') + letter.toLowerCase();
            });
        }

        /**
         * Returns the actual instance of the $tooltip service.
         * TODO support multiple triggers
         */
        this.$get = [ '$window', '$compile', '$timeout', '$parse', '$document', '$position', '$interpolate', function ($window, $compile, $timeout, $parse, $document, $position, $interpolate) {
            return function $tooltip(type, prefix, defaultTriggerShow) {
                var options = angular.extend({}, defaultOptions, globalOptions);

                /**
                 * Returns an object of show and hide triggers.
                 *
                 * If a trigger is supplied,
                 * it is used to show the tooltip; otherwise, it will use the `trigger`
                 * option passed to the `$tooltipProvider.options` method; else it will
                 * default to the trigger supplied to this directive factory.
                 *
                 * The hide trigger is based on the show trigger. If the `trigger` option
                 * was passed to the `$tooltipProvider.options` method, it will use the
                 * mapped trigger from `triggerMap` or the passed trigger if the map is
                 * undefined; otherwise, it uses the `triggerMap` value of the show
                 * trigger; else it will just use the show trigger.
                 */
                function getTriggers(trigger) {
                    var show = trigger || options.trigger || defaultTriggerShow;
                    var hide = triggerMap[show] || show;
                    return {
                        show: show,
                        hide: hide
                    };
                }

                var directiveName = snake_case(type);

                var startSym = $interpolate.startSymbol();
                var endSym = $interpolate.endSymbol();
                var template =
                    '<div ' + directiveName + '-popup ' +
                    'title="' + startSym + 'tt_title' + endSym + '" ' +
                    'content="' + startSym + 'tt_content' + endSym + '" ' +
                    'placement="' + startSym + 'tt_placement' + endSym + '" ' +
                    'animation="tt_animation" ' +
                    'is-open="tt_isOpen"' +
                    '>' +
                    '</div>';

                return {
                    restrict: 'EA',
                    scope: true,
                    compile: function (tElem, tAttrs) {
                        var tooltipLinker = $compile(template);

                        return function link(scope, element, attrs) {
                            var tooltip;
                            var transitionTimeout;
                            var popupTimeout;
                            var appendToBody = angular.isDefined(options.appendToBody) ? options.appendToBody : false;
                            var triggers = getTriggers(undefined);
                            var hasEnableExp = angular.isDefined(attrs[prefix + 'Enable']);

                            var positionTooltip = function () {

                                var ttPosition = $position.positionElements(element, tooltip, scope.tt_placement, appendToBody);
                                ttPosition.top += 'px';
                                ttPosition.left += 'px';

                                // Now set the calculated positioning.
                                tooltip.css(ttPosition);
                            };

                            // By default, the tooltip is not open.
                            // TODO add ability to start tooltip opened
                            scope.tt_isOpen = false;

                            function toggleTooltipBind() {
                                if (!scope.tt_isOpen) {
                                    showTooltipBind();
                                } else {
                                    hideTooltipBind();
                                }
                            }

                            // Show the tooltip with delay if specified, otherwise show it immediately
                            function showTooltipBind() {
                                if (hasEnableExp && !scope.$eval(attrs[prefix + 'Enable'])) {
                                    return;
                                }
                                if (scope.tt_popupDelay) {
                                    // Do nothing if the tooltip was already scheduled to pop-up.
                                    // This happens if show is triggered multiple times before any hide is triggered.
                                    if (!popupTimeout) {
                                        popupTimeout = $timeout(show, scope.tt_popupDelay, false);
                                        popupTimeout.then(function (reposition) {
                                            reposition();
                                        });
                                    }
                                } else {
                                    show()();
                                }
                            }

                            function hideTooltipBind() {
                                scope.$apply(function () {
                                    hide();
                                });
                            }

                            // Show the tooltip popup element.
                            function show() {

                                popupTimeout = null;

                                // If there is a pending remove transition, we must cancel it, lest the
                                // tooltip be mysteriously removed.
                                if (transitionTimeout) {
                                    $timeout.cancel(transitionTimeout);
                                    transitionTimeout = null;
                                }

                                // Don't show empty tooltips.
                                if (!scope.tt_content) {
                                    return angular.noop;
                                }

                                createTooltip();

                                // Set the initial positioning.
                                tooltip.css({ top: 0, left: 0, display: 'block' });

                                // Now we add it to the DOM because need some info about it. But it's not
                                // visible yet anyway.
                                if (appendToBody) {
                                    $document.find('body').append(tooltip);
                                } else {
                                    element.after(tooltip);
                                }

                                positionTooltip();

                                // And show the tooltip.
                                scope.tt_isOpen = true;
                                scope.$digest(); // digest required as $apply is not called

                                // Return positioning function as promise callback for correct
                                // positioning after draw.
                                return positionTooltip;
                            }

                            // Hide the tooltip popup element.
                            function hide() {
                                // First things first: we don't show it anymore.
                                scope.tt_isOpen = false;

                                //if tooltip is going to be shown after delay, we must cancel this
                                $timeout.cancel(popupTimeout);
                                popupTimeout = null;

                                // And now we remove it from the DOM. However, if we have animation, we
                                // need to wait for it to expire beforehand.
                                // FIXME: this is a placeholder for a port of the transitions library.
                                if (scope.tt_animation) {
                                    if (!transitionTimeout) {
                                        transitionTimeout = $timeout(removeTooltip, 500);
                                    }
                                } else {
                                    removeTooltip();
                                }
                            }

                            function createTooltip() {
                                // There can only be one tooltip element per directive shown at once.
                                if (tooltip) {
                                    removeTooltip();
                                }
                                tooltip = tooltipLinker(scope, function () {
                                });

                                // Get contents rendered into the tooltip
                                scope.$digest();
                            }

                            function removeTooltip() {
                                transitionTimeout = null;
                                if (tooltip) {
                                    tooltip.remove();
                                    tooltip = null;
                                }
                            }

                            function getAttrs(attr) {
                                return scope.$eval(attrs[prefix + attr]);
                            }

                            function _init() {

                                scope.tt_title = getAttrs('Title');

                                var delay = parseInt(getAttrs('PopupDelay'), 10);
                                scope.tt_popupDelay = !isNaN(delay) ? delay : options.popupDelay;

                                var val = getAttrs("Placement");
                                scope.tt_placement = angular.isDefined(val) ? val : options.placement;

                                registerTriggers(getAttrs('Trigger'));

                                val = getAttrs("AppendToBody");
                                appendToBody = angular.isDefined(val) ? $parse(val)(scope) : appendToBody;

                            }

                            /**
                             * Observe the relevant attributes.
                             */
                            attrs.$observe(type, function (val) {
                                scope.tt_content = val;

                                if (!val && scope.tt_isOpen) {
                                    hide();
                                }
                            });

                            attrs.$observe(prefix + 'Title', function (val) {
                                scope.tt_title = val;
                            });

                            attrs.$observe(prefix + 'Placement', function (val) {
                                scope.tt_placement = angular.isDefined(val) ? val : options.placement;
                            });

                            attrs.$observe(prefix + 'PopupDelay', function (val) {
                                var delay = parseInt(val, 10);
                                scope.tt_popupDelay = !isNaN(delay) ? delay : options.popupDelay;
                            });

                            var unregisterTriggers = function () {
                                element.unbind(triggers.show, showTooltipBind);
                                element.unbind(triggers.hide, hideTooltipBind);
                            };

                            var registerTriggers = function (val) {
                                unregisterTriggers();

                                triggers = getTriggers(val);

                                if (triggers.show === triggers.hide) {
                                    element.bind(triggers.show, toggleTooltipBind);
                                } else {
                                    element.bind(triggers.show, showTooltipBind);
                                    element.bind(triggers.hide, hideTooltipBind);
                                }
                            }

                            attrs.$observe(prefix + 'Trigger', registerTriggers);

                            var animation = scope.$eval(attrs[prefix + 'Animation']);
                            scope.tt_animation = angular.isDefined(animation) ? !!animation : options.animation;

                            attrs.$observe(prefix + 'AppendToBody', function (val) {
                                appendToBody = angular.isDefined(val) ? $parse(val)(scope) : appendToBody;
                            });

                            // if a tooltip is attached to <body> we need to remove it on
                            // location change as its parent scope will probably not be destroyed
                            // by the change.
                            if (appendToBody) {
                                scope.$on('$locationChangeSuccess', function closeTooltipOnLocationChangeSuccess() {
                                    if (scope.tt_isOpen) {
                                        hide();
                                    }
                                });
                            }

                            // Make sure tooltip is destroyed and removed.
                            scope.$on('$destroy', function onDestroyTooltip() {
                                $timeout.cancel(transitionTimeout);
                                $timeout.cancel(popupTimeout);
                                unregisterTriggers();
                                removeTooltip();
                            });

                            _init();
                        };
                    }
                };
            };
        }];
    })

    .directive('tooltipPopup', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
            templateUrl: 'template/tooltip/tooltip-popup.html'
        };
    })

    .directive('tooltip', [ '$tooltip', function ($tooltip) {
        return $tooltip('tooltip', 'tooltip', 'mouseenter');
    }])

    .directive('tooltipHtmlUnsafePopup', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
            templateUrl: 'template/tooltip/tooltip-html-unsafe-popup.html'
        };
    })

    .directive('tooltipHtmlUnsafe', [ '$tooltip', function ($tooltip) {
        return $tooltip('tooltipHtmlUnsafe', 'tooltip', 'mouseenter');
    }]);

/**
 * Created by giantliu on 14/12/25.
 */

angular.module("grace.bootstrap.grid",['grace.bootstrap.pagination','grace.bootstrap.tooltip', 'grace.bootstrap.bindHtml', 'grace.bootstrap.position',"grace.bootstrap.dataFormatter","grace.bootstrap.bindTemplate"])

    .constant("gridConstant",{

        rowHeight:30,
        headerRowHeight:30,
        minColumnWidth:50,
        minBodyHeight:200,
        enablePagination:true,
        enableSort:false,
        enableFilter:false,

        enableScreen:false,
        screenConfig:{
            screenLabel:"显示/隐藏:",
            type:"in-line",   //drop-down
            dropDownWidth:300,
            dropDownColumnCount:3
        },
        enablePinning:false,
        enableSelection:false,
        enableSelectionMulti:false,

        expandableTable:false,
        expandingConfig:{
            remote:true
        },

        enableColumnResize:false,
        enableTooltip:false,
        paginationConfig:{
            pageSize:10,
            paginationSize:5,
            pageSizes:[10,20,50,100],
            firstText: '首页',
            previousText: '上一页',
            nextText: '下一页',
            lastText: '尾页'
        },
        useRemoteData:false,
        ajaxConfig:{
//            url:"",
            dataType:"json",
            method:"get"
//            externalParam:function(){},
//            resultParser:function(res){}
        },
        pageSize:10,
        paginationSize:5,

        emptyPlaceHolder:"-",

        tooltipConfig:{
            place:"bottom",
            append2Body:true,
            showDelay:0
        },

        enableInfiniteScroll:false,
        infiniteScrollConfig:{
            iStep:5
        },

        lockHeader:false,
        lockHeaderType:"normal", //normal或者top normal是跟随表格，top是脱离表格固定在屏幕顶端

        enableSearchAll:false,
        searchAllConfig:{
            columnsPass:null
        },

        enableAutoResize:false,

        enableRowDragging:false,

        dataEmptyText:"没有相关数据",

        columnClassPrefix:"grid-column"

    })

    .controller("gridController",["$scope", 'gridConstant', 'gridHeaderService', 'gridBodyService', 'gridUtil', '$timeout', 'GridApi', "$http",
        function($scope, gridConstant, headerService, bodyService, gridUtil, $timeout, GridApi, $http){
            var self = this;
            $scope.gridId = gridUtil.newId();
            $scope.$watch("gridOptions",function(data){
                if(!data) return;
                if(gridUtil.isEmptyObj(data)) return;
                self.update(data);
            });

            self.scope = $scope;

            self.gridApi = new GridApi();

            var broType = gridUtil.browserType;
            $scope.IE = gridUtil.browserType.ie;

            $scope.ieCompensation = $scope.IE ? 1 : 0;
            $scope.compensation = broType.ie && 2 || broType.chrome && 1 || broType.safari && 1 || broType.firefox && 2;

            $scope.showScroller = false;
            $scope.isDraggingMode = false;

            $scope.valueParse = function(val,unit){
                val += "";
                if(val == 'auto'
                    || val.indexOf("%")!=-1
                    || val.indexOf('px')!=-1) return val;
                else if(!val) return 0;
                else return val+(unit ||"px");
            }

            /*if(self.showOrHideWatcher){
             self.showOrHideWatcher();
             }

             self.showOrHideWatcher = $scope.$watch(function(){
             return gridUtil.isElementVisible($scope.gridContainerEl)
             },function(data){

             console.log($scope.gridId,'visible',data);

             })*/

            self.updateBody = function(){

                //表身的所有信息
                $scope.bodyInfo = bodyService.createBody(self.options.gridData,$scope);

                //表身的宽度
                $scope.bodyInfo.totalWidth = $scope.headerInfo.totalWidth;

                self.applyCurrentData();
            }

            self.update = function(data){

                self.options = data;

                //行高
                $scope.rowHeight = data.rowHeight || gridConstant.rowHeight;
                $scope.headerRowHeight = data.headerRowHeight || gridConstant.headerRowHeight;
                $scope.minColumnWidth = data.minColumnWidth || gridConstant.minColumnWidth;

                //是否是拖拽模式
                $scope.enableRowDragging = data.enableRowDragging !== undefined ? data.enableRowDragging : gridConstant.enableRowDragging;

                //空数据
                $scope.dataEmptyText = data.dataEmptyText || gridConstant.dataEmptyText;
                $scope.gridDataEmpty = !(data.gridData && data.gridData.length);

                $scope.enableAutoResize = data.enableAutoResize !== undefined ? data.enableAutoResize : gridConstant.enableAutoResize;
                if($scope.enableAutoResize){

                    window.removeEventListener('resize',resizeFn,false);
                    window.addEventListener('resize',resizeFn,false);

                }

                //占位字符
                $scope.emptyPlaceHolder = data.emptyPlaceHolder != undefined ? data.emptyPlaceHolder : gridConstant.emptyPlaceHolder;

                //无限滚动
                $scope.enableInfiniteScroll = data.enableInfiniteScroll !== undefined ? data.enableInfiniteScroll : gridConstant.enableInfiniteScroll;
                if($scope.enableInfiniteScroll){
                    $scope.infiniteScrollConfig = angular.extend(angular.extend({},gridConstant.infiniteScrollConfig),data.infiniteScrollConfig);
                }

                //开启分页功能
                $scope.enablePagination = angular.isDefined(data.enablePagination) ? data.enablePagination : gridConstant.enablePagination;
                if($scope.enablePagination){
                    $scope.paginationConfig = angular.extend(angular.extend({},gridConstant.paginationConfig),data.paginationConfig);
                }
                if(self.paginationHeightWatcher){
                    self.paginationHeightWatcher();
                }
                if($scope.enablePagination){
                    self.paginationHeightWatcher = $scope.$watch(function(){
                        return self.getPaginationHeight && self.getPaginationHeight();
                    },function(height){
                        height = height || 0;
                        $scope.paginationHeight = height;
                    })
                }

                //远程数据
                $scope.useRemoteData = data.useRemoteData !== undefined ? data.useRemoteData : gridConstant.useRemoteData;
                if($scope.useRemoteData){
                    $scope.ajaxConfig = angular.extend(angular.extend({},gridConstant.ajaxConfig),data.ajaxConfig);
                }

                //开启排序功能
                $scope.enableSort = angular.isDefined(data.enableSort) ? data.enableSort : gridConstant.enableSort;

                //开启过滤功能
                $scope.enableFilter = angular.isDefined(data.enableFilter) ? data.enableFilter : gridConstant.enableFilter;

                //开启列筛选功能
                $scope.enableScreen = angular.isDefined(data.enableScreen) ? data.enableScreen : gridConstant.enableScreen;
                if(self.screenerHeightWatcher){
                    self.screenerHeightWatcher();
                }
                if($scope.enableScreen){
                    $scope.screenConfig = angular.extend(angular.extend({},gridConstant.screenConfig),data.screenConfig);
                    self.screenerHeightWatcher = $scope.$watch(function(){
                        return self.getScreenerHeight && self.getScreenerHeight();
                    },function(height){
                        height = height || 0;
                        $scope.screenerHeight = height;
                    })
                }

                //开启Pinning功能
                $scope.enablePinning = angular.isDefined(data.enablePinning) ? data.enablePinning : gridConstant.enablePinning;

                //开启行选择
                $scope.enableSelection = angular.isDefined(data.enableSelection) ? data.enableSelection : gridConstant.enableSelection;

                //开启多行选择
                $scope.enableSelectionMulti = angular.isDefined(data.enableSelectionMulti) ? data.enableSelectionMulti : gridConstant.enableSelectionMulti;

                //开启分组功能
                $scope.expandableTable = angular.isDefined(data.expandableTable) ? data.expandableTable : gridConstant.expandableTable;
                if($scope.expandableTable){
                    $scope.expandingConfig = angular.extend(angular.extend({},gridConstant.expandingConfig),data.expandingConfig);
                }
                $scope.groupingMode = $scope.expandableTable;

                //tooltip的配置
//                $scope.enableTooltip = angular.isDefined(data.enableTooltip) ? data.enableTooltip : gridConstant.enableTooltip;
                $scope.tooltipConfig = angular.extend(angular.extend({},gridConstant.tooltipConfig),data.tooltipConfig);


                //开启列宽手动设定
                $scope.enableColumnResize = angular.isDefined(data.enableColumnResize) ? data.enableColumnResize : gridConstant.enableColumnResize;

                //开启头部锁定
                $scope.lockHeader = angular.isDefined(data.lockHeader) ? data.lockHeader : gridConstant.lockHeader;
                $scope.lockHeaderType = angular.isDefined(data.lockHeaderType) ? data.lockHeaderType : gridConstant.lockHeaderType;

                if($scope.lockHeader && $scope.lockHeaderType == 'top'){
                    $scope.lockHeader2Top();
                }
                else{
                    $scope.unlockHeader2Top();
                }

                //开启全局搜索
                $scope.enableSearchAll = angular.isDefined(data.enableSearchAll) ? data.enableSearchAll : gridConstant.enableSearchAll;
                if($scope.enableSearchAll){
                    $scope.searchAllConfig = angular.extend(angular.extend({},gridConstant.searchAllConfig),data.searchAllConfig);
                }

                if($scope.gridWidthWatcher) $scope.gridWidthWatcher();
                $scope.gridWidthWatcher = $scope.$watch(function(){
                    if($scope.IE){
                        return $scope.gridWrapperEl.parent()[0].offsetWidth;
                    }
                    else{
                        return parseFloat(gridUtil.getStyles($scope.gridWrapperEl.parent()).width.replace("px",''));
                    }
                },function(width){
                    width = width || 0;

                    if(0 == width){
                        return;
                    }

                    self.setGridWidth(width);

                })

                //表头的所有信息
                $scope.headerInfo = headerService.createHeader(data.columnsDef || [],$scope);

                //表身的所有信息
                $scope.bodyInfo = bodyService.createBody(data.gridData || [],$scope);

                //在渲染之前执行
                $timeout(function(){

                    //表头展示用的数据
                    $scope.headerData = $scope.headerInfo.columns2Render;
                    //表身展示数据
                    $scope.bodyData = $scope.bodyInfo.rows2Render;
                    //表身高度
                    $scope.bodyInfo.height = $scope.gridHeight == 'auto' ? 'auto' : Math.max($scope.gridHeight - $scope.headerInfo.height ,gridConstant.minBodyHeight);
                    if($scope.enableInfiniteScroll && $scope.bodyInfo.height == 'auto' ){
                        $scope.bodyInfo.height = gridConstant.minBodyHeight;
                    }
                    //表身的宽度
                    $scope.bodyInfo.totalWidth = $scope.headerInfo.totalWidth;

                    if($scope.headerInfo.totalWidth>$scope.gridWidth) {
                        $scope.showScroller = true;
                        if(gridUtil.osType == 'windows' && $scope.gridHeight != 'auto'){
                            $scope.gridHeight = $scope.getViewPortInfo().height +  gridUtil.getScrollBarInfo().horizontalBarHeight;
                        }
                    }
                    else
                        $scope.showScroller = false;

                    self.applyCurrentData();

                    //在渲染之后执行
                    $timeout(function(){

                        GridApi.update(self.gridApi,self);

                        data.onReady && data.onReady(self.gridApi);

                    },0)

                },0);

            }

            var resizeFn = gridUtil.delayExe(function(){

                if($scope.gridContainerEl[0].offsetWidth == 0) return;

                self.setGridWidth($scope.gridContainerEl[0].offsetWidth);

            },50);

            self.setGridWidth = function(width){

                $scope.gridWidth = width;
                if($scope.headerInfo){
                    $scope.headerInfo.viewPortWidth = width;
                    self.resizeAutoWidthColumns();
                }

            }

            self.resizeAutoWidthColumns = function(){
                headerService.updateColumnWidth($scope.headerInfo);
                headerService.computeColumnCss($scope.headerInfo,$scope);
                $scope.bodyInfo.totalWidth = $scope.headerInfo.totalWidth;
                if($scope.headerInfo.totalWidth>$scope.gridWidth) {
                    $scope.showScroller = true;
                    if(gridUtil.osType == 'windows' && $scope.gridHeight != 'auto'){
                        $scope.gridHeight = $scope.getViewPortInfo().height +  gridUtil.getScrollBarInfo().horizontalBarHeight;
                    }
                }
                else
                    $scope.showScroller = false;
            }

            self.resizeColumn = function(column,changed){

                $scope.$apply(function(){
                    headerService.resizeColumn(column,changed,$scope.headerInfo,$scope);
                    $scope.bodyInfo.totalWidth = $scope.headerInfo.totalWidth

                    if($scope.headerInfo.totalWidth>$scope.gridWidth) {
                        $scope.showScroller = true;
                        if(gridUtil.osType == 'windows' && $scope.gridHeight != 'auto'){
                            $scope.gridHeight = $scope.getViewPortInfo().height +  gridUtil.getScrollBarInfo().horizontalBarHeight;
                        }
                    }
                    else
                        $scope.showScroller = false;
                })

            }

            self.addRows2Body = function(insetIndex,rowsData,row){

                var rslt;
                if($scope.expandableTable){
                    rslt = bodyService.addRows($scope,rowsData,insetIndex,row);

                }
                else{
                    rslt = bodyService.addRows($scope,rowsData,insetIndex,row);
                }

                return rslt;
            }

            function toggleGroup(group,tof){
                group.forEach(function(row){
                    row.rowInfo.visible = tof;

                    if(row.rowInfo.hasChildren && row.rowInfo.children && row.rowInfo.children.length){
                        row.rowInfo.expanded = tof;
                        var childrenMap = $scope.bodyInfo.rowsChildrenMap;
                        toggleGroup(childrenMap[row.rowInfo.rowId],tof);
                    }
                })
            }

            self.groupExpand = function(row,callback){

                var childrenMap = $scope.bodyInfo.rowsChildrenMap;
                row.rowInfo.expanded = true;
                if(childrenMap[row.rowInfo.rowId]){

                    childrenMap[row.rowInfo.rowId].forEach(function(crow){
                        crow.rowInfo.visible = true;
                    })
//                    toggleGroup(childrenMap[row.rowInfo.rowId],true);
                    callback && callback();
                    return;
                }

                var expandingConfig = $scope.expandingConfig;

                $http({
                    method:"get",
                    dataType:"json",
                    url:expandingConfig.dataUrl,
                    params:expandingConfig.paramParser(row.rowInfo.rawData)
                }).success(function(res){
                    res = expandingConfig.resultParser(res);
                    var addedRows= self.addRows2Body(row.rowInfo.originalRowIndex+1,res,row);
                    $scope.bodyInfo.rowsChildrenMap[row.rowInfo.rowId] = addedRows;
                    callback && callback();
                })

            }



            self.groupCollapse = function(row,callback){

                var collapseRows = $scope.bodyInfo.rowsChildrenMap[row.rowInfo.rowId];
                row.rowInfo.expanded = false;
                /*collapseRows.forEach(function(crow){
                 crow.rowInfo.visible = false;
                 })*/
                if(collapseRows && collapseRows.length){
                    toggleGroup(collapseRows,false);
                }

                callback && callback();
            }

            self.groupCollapseRows = function(rows,callback){
                for(var i= 0,ir;(ir = rows[i]);i++){
                    self.groupCollapse(ir);
                }
                callback && callback();
            }

            /*$scope.$on("columnResize",function(evt,data){

             headerService.resizeColumn(data.column,data.changed,$scope.headerInfo,$scope);

             })*/

            function initData(){

                var headerInfo = $scope.headerInfo,
                    allColumns = headerInfo.columnsByDepth,
                    bodyInfo = $scope.bodyInfo,
                    allRows = bodyInfo.rows,
                    rowsChildrenMap = bodyInfo.rowsChildrenMap;

                headerInfo.columns2Render = gridUtil.copy2DArray(allColumns);

                //可展开的表格，先把子行从渲染列表中过滤掉，把子行创建个拷贝，在后面再把子行拷贝添加主渲染列表
                if($scope.expandableTable){
                    var rslt = {};
                    for(var p in rowsChildrenMap){
                        rslt[p] = bodyService.copyBody(rowsChildrenMap[p]);
                    }
                    bodyInfo.rowsChildrenMap2Render = rslt;
                    allRows = allRows.filter(function(row){
//                        return row.rowInfo.isGrouper == true;
                        return row.rowInfo.depth == 0;
                    })

                }

                bodyInfo.rows2Render = bodyService.copyBody(allRows);// gridUtil.copy2DArray(allRows);
            }

            function mergeChildren2Render(){
                bodyService.mergeRows2Render($scope.bodyInfo);
            }

            self.applyCurrentData = function applyCurrentData(){

//                console.time("applyCurrentData:");

                //初始化一份数据
                initData();

                //试着全局过滤
                $scope.enableSearchAll && self.searchAll && self.searchAll($scope.searchAllKeywords);

                //试着过滤
                $scope.enableFilter && self.filtering && self.filtering($scope);

                //试着排序
                $scope.enableSort &&  self.sorting && self.sorting($scope);

                //试着分页
                $scope.enablePagination && self.paging && self.paging($scope);

                //如果是可展开的表格，添加前面过滤掉的子行
                if($scope.expandableTable){
                    mergeChildren2Render();
                }


                //试着过滤列
                $scope.enableScreen && self.screening && self.screening($scope);

                //试着固定列
                $scope.enablePinning && self.pinning && self.pinning($scope);

                //无限滚动过滤
                $scope.enableInfiniteScroll && self.infiniteScrollStart && self.infiniteScrollStart();

//                console.timeEnd("applyCurrentData:")

//                console.time('applyDataToView');

//                $timeout(function(){
//                    console.timeEnd('applyDataToView');
//                },0)

            }


            self.searchAll = function(keywords){

                if(!keywords) return;

                var bodyInfo = $scope.bodyInfo;
                var rows2Render = bodyInfo.rows2Render;
                var rowsChildrenMap2Render = bodyInfo.rowsChildrenMap2Render;

                var walkedChildren = {};

                var expandableTable = $scope.expandableTable;
                var searchAllConfig = $scope.searchAllConfig;
                function _doSearch(rows){

                    var tagReg = /<.*?>|<\s*\/.*?>/g;

                    return rows.filter(function(row){
                        var rslt = false;

                        for(var i= 0,ir;(ir = row[i]);i++){
                            if(searchAllConfig.columnsPass && searchAllConfig.columnsPass.indexOf(ir.field) >= 0) continue;
                            switch(ir.type){
                                case "html":
                                    if(ir.content.replace(tagReg,"").indexOf(keywords) !=-1){
                                        rslt = true;
                                        i = row.length;
                                    }
                                    break;
                                case "button":
                                    break;
                                default :
                                    if((ir.content+"").indexOf(keywords) != -1){
                                        rslt = true;
                                        i = row.length;
                                    }
                                    break;
                            }

                        }

                        if(expandableTable){
                            var rowInfo = row.rowInfo;
                            if(rowInfo.children && rowInfo.children.length){

                                if(!walkedChildren[rowInfo.rowId]) {

                                    walkedChildren[rowInfo.rowId] = true;

                                    rowsChildrenMap2Render[rowInfo.rowId] = _doSearch(rowsChildrenMap2Render[rowInfo.rowId]);

                                    if(rowsChildrenMap2Render[rowInfo.rowId].length) rslt = true;
                                }

                            }

                        }
                        return rslt;
                    })
                }

                bodyInfo.rows2Render = _doSearch(rows2Render);
//                for(var i= 0,abc)
            }

            $scope.$on('selectAll',function(){
                self.selectAll.apply(null,arguments);
            })

            $scope.$on('selectOne',function($event,options){

                if(!$scope.enableSelectionMulti) return;

                var status = options.selectOrUnSelect;

                var bodyInfo = $scope.bodyInfo;
                var headerInfo = $scope.headerInfo;
                var columns = headerInfo.columns;
                var rowSelectColumn = columns[0];
                if(rowSelectColumn.columnType != 'rowSelector') return;
                if(!status){
                    rowSelectColumn.isAllSelected = false;
                }

                if(!$scope.enableInfiniteScroll){
                    var rows2Render = bodyInfo.rows2Render;
                }
                else{
                    var rows2Render = bodyInfo.rows2RenderCache;
                }
                var allSelected = true;
                for(var i= 0,ir;(ir = rows2Render[i]);i++){
                    if(!ir.rowInfo.selected){
                        allSelected = false;
                        break;
                    }
                }
                rowSelectColumn.isAllSelected = allSelected;

            })

        }])


    .factory("GridApi",function(){

        function GridEvent(){

            this.eventHandlers = {};

        }

        GridEvent.prototype.on = function(eventName,handler,context){
            var eventHandlers = this.eventHandlers[eventName];
            !eventHandlers && (eventHandlers = this.eventHandlers[eventName] = []);

            eventHandlers.push([handler,context]);

        }

        GridEvent.prototype.off = function(eventName,handler){

            var eventHandlers = this.eventHandlers[eventName];

            if(!eventHandlers) return;

            for(var i= 0,ie;(ie = eventHandlers[i]);i++){
                if(ie[0] === handler){
                    eventHandlers.splice(i,1);
                    i--;
                }
            }

        }

        GridEvent.prototype.trigger = function(eventName,arg){

            var eventHandlers = this.eventHandlers[eventName];
            if(!eventHandlers) return;

            for(var i= 0,ie;(ie = eventHandlers[i]);i++){
                ie[0].apply(ie[1],arg);
            }

        }



        function GridApi(){

            this.event = new GridEvent();

        }

        GridApi.update = function(gridApi,ctrl){
            var scope = ctrl.scope;

            if(scope.expandableTable){
                gridApi.groupExpand = ctrl.groupExpand;
                gridApi.groupCollapse = ctrl.groupCollapse;

                gridApi.groupExpandAll = function(){

                    var rows = scope.bodyInfo.rows2Render.filter(function(row){
//                        return row.rowInfo.isGrouper == true;
                        return row.rowInfo.hasChildren == true;
                    })
                    var reqLen = rows.length;
                    for(var i= 0,ir;(ir = rows[i]);i++){

                        ctrl.groupExpand(ir,function(){
                            if(!(--reqLen)){
                                ctrl.applyCurrentData();
                                gridApi.event.trigger('afterExpandAllRows',[]);
                            }
                        })

                    }

                }

                gridApi.groupCollapseAll = function(){

                    var rows = scope.bodyInfo.rows2Render.filter(function(row){
//                        return row.rowInfo.isGrouper == true;
                        return row.rowInfo.depth == 0;
                    })
                    ctrl.groupCollapseRows(rows,function(){

                        ctrl.applyCurrentData();

                    })

                }
            }

            if(scope.enableScreen){

                gridApi.showColumn = function(columnName){
                    var column = scope.headerInfo.columnsMap[columnName];
                    if(column.visible) return;
                    column.visible = true;
                    ctrl.applyCurrentData();
                }

                gridApi.hideColumn = function(columnName){
                    var column = scope.headerInfo.columnsMap[columnName];
                    if(!column.visible) return;
                    column.visible = false;
                    ctrl.applyCurrentData();
                }

            }

            if(scope.enableSearchAll){

                gridApi.searchAll = function(keywords){

                    scope.searchAllKeywords = keywords;

                    ctrl.applyCurrentData();

                    scope.searchAllKeywords = undefined;
                }

            }

            if(scope.enableSort){

                gridApi.sort = function(fieldName,sortType,sortFn){
                    ctrl.sortingExposed(fieldName,sortType);
                }

            }

            if(scope.enablePinning){
                gridApi.pinning = function(fieldName){

                    ctrl.pinningExposed(fieldName)

                }
            }

            if(scope.enableRowDragging){

                gridApi.draggingMode = function(arg){
                    if(arg !== undefined){
                        scope.isDraggingMode = !!arg;
                    }
                    return scope.isDraggingMode;
                }

            }

            if(scope.useRemoteData){

                gridApi.reload = function(){

                    ctrl.reloadCurrentPage();

                    scope.$broadcast('gridReload',{type:'apiReload'});
                }

            }

            gridApi.getGridData = function(){

                var bodyInfo = scope.bodyInfo;
                var rows = bodyInfo.rows;
                var rslt = [];
                for(var i = 0,ir;(ir = rows[i]);i++){
                    rslt.push(ir.rowInfo.rawData);
                }
                return rslt;
            };

            gridApi.getCurrentPageData = function(){
                var bodyInfo = scope.bodyInfo;
                var rows = bodyInfo.rows2Render;
                var rslt = [];
                for(var i = 0,ir;(ir = rows[i]);i++){
                    rslt.push(ir.rowInfo.rawData);
                }
                return rslt;
            };

            gridApi.setGridWidth = function(width){
                ctrl.setGridWidth(width)
            }

        }



        return GridApi
    })

    .factory("gridHeaderService",['gridConstant', 'gridUtil', function(gridConstant,gridUtil){

        var headerCellTemplate = {
            name:"",
            displayName:"",
//            minWidth:gridConstant.minColumnWidth,
            width:"auto",
            drawnWidth:100,
            field:"",
            colspan:1,
            rowspan:1,
            visible:true
        }

        var service = {};

        service.createHeader = function createHeader(head,$scope){
            var headerInfo = {
                totalDepth:0,
                totalWidth:0,
                minColumnWidth:$scope.minColumnWidth,
                viewPortWidth:$scope.gridWidth,
                viewPortHeight:$scope.gridHeight,
                enableResize:$scope.enableColumnResize,
                enableSort:$scope.enableSort,
                columns:[],
                columnsMap:{},
                autoWidthColumns:[],
                givenWidthColumns:[],
                columnsByDepth:[]
            }

            formatHeader(head,headerInfo);

            autoColumnWidth(headerInfo);

            computeColumnCss(headerInfo,$scope);

            fixColumn(head,headerInfo);

            headerInfo.height = headerInfo.totalDepth*$scope.headerRowHeight;
            return headerInfo;
        }

        function computeColumnCss(headerInfo,$scope){

            var columns = headerInfo.columns;
            var rslt = [];
            for(var i= 0,ic;(ic = columns[i]);i++){
                rslt.push(
                    gridUtil.formatStr(
                        ".grid{1} .{2}{3}{width:{4}px}\n.grid{1} .{2}{3} .cell-content{width:{5}px;}",
                        $scope.gridId,
                        gridConstant.columnClassPrefix,
                        ic.columnId,
                        ic.drawnWidth,
                            ic.drawnWidth-1
                    )
                );
            }
            headerInfo.columnCss = rslt.join("\n");
        }

        function resizeColumn(column,changed,headerInfo,$scope){

            var rslt = column.drawnWidth + changed;

            if(rslt < column.minWidth){
                var tmp = column.drawnWidth;
                column.drawnWidth = column.minWidth;
                changed = column.drawnWidth-tmp;
            }
            else{
                column.drawnWidth = rslt;
            }

            if(column.parent){
                resizeColumn(column.parent,changed,headerInfo,$scope);
            }
            else{
                computeColumnCss(headerInfo,$scope);
                headerInfo.totalWidth += changed;
            }
        }

        service.computeColumnCss = computeColumnCss;
        service.resizeColumn = resizeColumn;

        function updateColumnWidth(headerInfo){

            if(!headerInfo.autoWidthColumns.length) return;

            var columnAutoWidth = gridConstant.minColumnWidth;

            var autoWidthColumns = headerInfo.autoWidthColumns.filter(function(a){return a.visible});

            if(headerInfo.viewPortWidth - headerInfo.totalWidth > autoWidthColumns.length*columnAutoWidth){
                columnAutoWidth = (headerInfo.viewPortWidth - headerInfo.totalWidth)/autoWidthColumns.length;

            }
            columnAutoWidth = Math.floor(columnAutoWidth);
            for(var i= 0,ih;(ih = autoWidthColumns[i]);i++){

                if(columnAutoWidth < ih.minWidth){
                    ih.drawnWidth = ih.minWidth;
                }
                else{
                    ih.drawnWidth = columnAutoWidth;
                }

                headerInfo.totalWidth += ih.drawnWidth;

            }

            if(headerInfo.viewPortWidth > headerInfo.totalWidth && autoWidthColumns[0]){
                autoWidthColumns[0].drawnWidth += Math.floor( headerInfo.viewPortWidth - headerInfo.totalWidth)-1;
            }
        }

        function getTotalWidth(columns){
            var totalWidth = 0;
            var i = columns.length;
            var ic;
            while(ic = columns[--i]){
                totalWidth += ic.drawnWidth
            }
            return totalWidth;
        }

        function autoColumnWidth(headerInfo){

            if(!headerInfo.autoWidthColumns.length) return;

            var givenTotalWidth = getTotalWidth(headerInfo.givenWidthColumns.filter(function(a){return a.visible}));
//            var autoTotalWidth = getTotalWidth(headerInfo.autoWidthColumns.filter(function(a){return a.visible}));

            var autoWidthColumns = headerInfo.autoWidthColumns.filter(function(a){return a.visible});

            var columnAutoWidth = gridConstant.minColumnWidth;

//            if(headerInfo.viewPortWidth - givenTotalWidth >= autoTotalWidth){
            columnAutoWidth = Math.max((headerInfo.viewPortWidth - givenTotalWidth)/autoWidthColumns.length,columnAutoWidth);
//            }
            columnAutoWidth = Math.floor(columnAutoWidth);
            var autoColumnsTotalWidth = 0;
            for(var i= 0,ih;(ih = autoWidthColumns[i]);i++){

                if(columnAutoWidth < ih.minWidth){
                    ih.drawnWidth = ih.minWidth;
                }
                else{
                    ih.drawnWidth = columnAutoWidth;
                }

                autoColumnsTotalWidth += ih.drawnWidth;
            }
            headerInfo.totalWidth = givenTotalWidth + autoColumnsTotalWidth;

            if(headerInfo.viewPortWidth > headerInfo.totalWidth && autoWidthColumns[0]){
                var tmp = Math.floor( headerInfo.viewPortWidth - headerInfo.totalWidth)-1;
                autoWidthColumns[0].drawnWidth += tmp;
                headerInfo.totalWidth += tmp;
            }
        }

        service.updateColumnWidth = autoColumnWidth;

        function formatHeader(head,headerInfo,parent){
            for(var i= 0,ih;(ih = head[i]);i++){
                var chidlren = ih['children'];
                ih.children = null;
                var tmp = angular.copy(headerCellTemplate);

                tmp.minWidth = headerInfo.minColumnWidth;

                head.splice(i,1,angular.extend(tmp,ih));

                if(tmp.enableResize === undefined){
                    tmp.enableResize = headerInfo.enableResize;
                }

                tmp.drawnWidth =  tmp.width == 'auto' ? 'auto' : parseFloat(tmp.width);

                tmp.displayName = tmp.name || tmp.field;

                tmp.sortable = headerInfo.enableSort && tmp.disableSort != true

                tmp.columnId = gridUtil.newId();

                tmp.columnClasses = gridConstant.columnClassPrefix+tmp.columnId;

                tmp.customClasses && (tmp.columnClasses += " "+tmp.customClasses);

                tmp.parent = parent;

                if(chidlren){
                    formatHeader(chidlren,headerInfo,ih);
                    tmp.children = chidlren;
                    tmp.colspan = 0;
                }
                else{
                    headerInfo.columns.push(tmp);

                    headerInfo.columnsMap[tmp.field] = tmp;

                    tmp.columnIndex = headerInfo.columns.length-1;

                    if(tmp.drawnWidth == "auto"){
//                        headerInfo.totalWidth += tmp.drawnWidth;
                        headerInfo.autoWidthColumns.push(tmp);
                    }
                    else{
                        headerInfo.givenWidthColumns.push(tmp);
                        headerInfo.totalWidth += tmp.drawnWidth;
                    }

                }
            }
        }

        service.formatHeader = formatHeader;

        function fixColumn(columns,columnInfo){
            //总深度，用于计算rowspan
            columnInfo.totalDepth = 0;
            columnInfo.columnsByDepth = [];
            function calculateWidth(column,depth){
                var width = 0;
                if(column.children){
                    column.drawnWidth = 0;
                    column.colspan = 0;
                    var c = column.children;
                    for(var p= 0;p < c.length;p++){
                        var r = calculateWidth(c[p],depth+1);
                        width += r.w;
                        column.colspan += r.cs;
                    }
                    column.drawnWidth = width;
                }
                column.depth = depth;
                columnInfo.totalDepth = Math.max(depth,columnInfo.totalDepth);
                !columnInfo.columnsByDepth[depth-1] && (columnInfo.columnsByDepth[depth-1] = []);
                columnInfo.columnsByDepth[depth-1].push(column);
                return {
                    w:column.drawnWidth,
                    cs:column.colspan
                };
            }
            for(var i= 0,ic;(ic = columns[i]);i++){
                calculateWidth(ic,1);
            }
            for(var i= 0,ic;(ic = columnInfo.columnsByDepth[i]);i++){
                for(var j = 0,jc;(jc = ic[j]);j++){
                    jc.rowspan = jc.children ? jc.rowspan :(columnInfo.totalDepth - jc.depth + 1);
                }
            }
        }
        service.fixColumn = fixColumn;
        return service;
    }])

    .factory("gridRowFactory",function(){

        var exports = {};

        var tmpRowOption = {
//            isGrouper:false,
            rowId:"",
            visible:true
        };

        exports.copy = function(src){

            var rslt = [].concat(src);

            rslt.rowInfo = src.rowInfo;

            return rslt;
        }

        exports.create = function(rowOption,rowData){
            var rslt = [];
            if(rowData){
                rslt = rslt.concat(rowData);
            }

            rslt.rowInfo = angular.extend(angular.extend({},tmpRowOption),rowOption);

            return rslt;
        }

        return exports;
    })

    .factory("gridBodyService",['$gDataFormatterFactory', 'gridUtil', 'gridRowFactory', 'gridConstant',function(valueFormatter, gridUtil, rowFactory, gridConstant){

        var service = {};

        var bodyCellTemplate = {
            content:"",
            displayContent:"",
            width:100,
            visible:true
        };

        /*var number = /number/,
         percent = /percent/,
         date = /date_/,
         currency = /currency/*/

        /*function formatNumber(input,param){
         input = parseFloat(input);
         var tmp = param.split("_");
         var res = $filter("number")(input,tmp[1] || 0);
         if(tmp[2]){
         input > 0 && (res = "+"+res)
         }
         return res;
         }*/

        /*function valueFormatter(input,param){

         if(number.test(param)){
         input = formatNumber(input,param);
         }
         else if(percent.test(param)){
         input = formatNumber(input,param)+"%";
         }
         else if(date.test(param)){
         input = $filter("date")(input,param.replace("date_",""));
         }
         else if(currency.test(param)){
         input = $filter("currency")(input,param.replace(/currency_?/,"") || "￥");
         }


         return input;

         }*/

        service.copyBody = function(srcBody){

            var rslt = [];

            for(var i = 0,ilen = srcBody.length;i<ilen;i++){

                var tmpRow = srcBody[i],row = rowFactory.copy(tmpRow);

                if(row.rowInfo.visible){
                    rslt.push(row);
                }

            }
            return rslt;
        }

        service.copy2Render = function(bodyInfo){
            var allRows = bodyInfo.rows;
            var childrenMap = bodyInfo.rowsChildrenMap;
            bodyInfo.rows2Render = service.copyBody(allRows);
            var rslt = {};
            for(var p in childrenMap){
                rslt[p] = service.copyBody(childrenMap[p]);
            }
            bodyInfo.rowsChildrenMap2Render = rslt;
        }

        function buildRow(columns,ib,rowOptions,$scope){

            var row = rowFactory.create(rowOptions);
            row.rowInfo.rawData = ib;
            for(var j= 0,jc;(jc = columns[j]);j++){

                var tbc = angular.copy(bodyCellTemplate);
                //此处将来可以加上格式化
                tbc.content = ib[jc.field];

                if(typeof jc.formatter == "string"){
                    tbc.displayContent = valueFormatter(tbc.content,jc.formatter);
                }
                else if(typeof jc.formatter == "function"){
                    tbc.displayContent = jc.formatter(tbc.content);
                }
                else{
                    tbc.displayContent = tbc.content;
                }

                //normal,text,check,select,date,button,html
                tbc.type = jc.columnType || "normal";
                tbc.editable = jc.editable || true;
                if(tbc.type == "normal"){
                    tbc.editable = false;
                    tbc.displayContent = tbc.displayContent || $scope.emptyPlaceHolder
                }
                if(tbc.type == "select")
                    tbc.selectModel = jc.selectModel || [tbc.displayContent];
                if(tbc.type == 'check' || tbc.type == 'rowSelector'){
                    tbc.displayContent = !!tbc.content;
                }

                if(jc.enableTooltip){
                    if(jc.tooltiper){
                        tbc.tooltip = jc.tooltiper(ib);
                    }
                    else{
                        tbc.tooltip = tbc.displayContent;
                    }
                    tbc.enableTooltip = true;
                }

                tbc.width = jc.drawnWidth;
//                tbc.originalRowIndex = i;
                tbc.originalColumnIndex = j;
                tbc.field = jc.field;

                tbc.cellId = gridUtil.newId();

                tbc.columnId = jc.columnId;

                tbc.columnClasses = jc.columnClasses;

                row.push(tbc);

            }

            return row;
        }

        service.mergeRows2Render = function(bodyInfo){

            var rows2Render = bodyInfo.rows2Render;

            var childrenMap = bodyInfo.rowsChildrenMap2Render;

            for(var i= 0,ir;(ir = rows2Render[i]);i++){
                var children = childrenMap[ir.rowInfo.rowId];

                if(children){
                    var offset = children.length;
                    children = [].concat(children);
                    children.unshift(0);
                    children.unshift(i+1);
                    rows2Render.splice.apply(rows2Render,children);
//                    i += offset;
                }
            }

        }

        service.addRows = function($scope,newRows,insertIndex,parentRow){

            var allRows = $scope.bodyInfo.rows;
            var columns = $scope.headerInfo.columns;
            var orginalBody = $scope.gridOptions.gridData;

            var expandableTable = $scope.expandableTable;

            if(expandableTable){
                parentRow.rowInfo.children = newRows;
                newRows = flatRows(newRows,parentRow.rowInfo.depth+1,parentRow);
            }

            var len = allRows.length-1;
            var offset = newRows.length;
            while(len >= insertIndex){
                allRows[len--].rowInfo.originalRowIndex += offset;
            }

            var rslt = []

            for(var i= 0,ib;(ib = newRows[i]);i++){
                var nOptions = {};
                var rowIndex = insertIndex+i;
                nOptions.originalRowIndex = rowIndex;
                nOptions.rowId = gridUtil.newId();
//                nOptions.rawData = ib;

                if(expandableTable){
                    nOptions.hasChildren = ib.$hasChildren || false;
                    nOptions.children = ib.$children;
                    nOptions.depth = ib.$depth;
                    nOptions.parent = ib.$parent;
                }

                var row = buildRow(columns,ib,nOptions,$scope);
                allRows.splice(rowIndex,0,row);
                orginalBody.splice(rowIndex,0,ib);
                rslt.push(row);
            }

            return rslt;
        }

        function flatRows(rows,depth,parent){

            var rslt = [];

            depth = depth || 0;

            var tmp;

            for(var i= 0,ir;(ir = rows[i]);i++){

                ir.$depth = depth;

                parent && (ir.$parent = parent);

                rslt.push(ir);

                if(ir.$hasChildren && ir.$children && ir.$children.length){
                    tmp = flatRows(ir.$children,depth+1,ir);
                    rslt = rslt.concat(tmp);
                }
            }

            return rslt;
        }

        service.createBody = function createBody(body,$scope){

            var bodyInfo = {
                rows:[],
                rowsChildrenMap:{}
            };

            var columns = $scope.headerInfo.columns;

            var expandableTable = $scope.expandableTable;

            /*if(expandableTable){
             body = flatRows(body);
             }*/
            var orgIndex = 0;
            function _create(mbody,depth,parent){

//                index = index || 0;
                depth = depth || 0;

                var res = [];

                for(var i= 0,ib;(ib = mbody[i]);i++){


                    var rowOptions = {
                        rowId:gridUtil.newId(),
                        visible:true,
                        originalRowIndex:orgIndex++,
                        "parent":parent,
                        'depth':depth,
                        hasChildren:ib.$hasChildren || false,
                        expanded:false
                    }

                    if(expandableTable){

                        if(ib.$hasChildren && ib.$children && ib.$children.length){

                            body.splice.apply(body,[orgIndex,0].concat(ib.$children))
                            i+= ib.$children.length;

                            rowOptions.children = _create(ib.$children,depth+1,ib);

                            rowOptions.expanded = true;
                            bodyInfo.rowsChildrenMap[rowOptions.rowId] = rowOptions.children;

                        }
                    }

                    var row = buildRow(columns,ib,rowOptions,$scope);

                    res.push(row);

                    if(expandableTable){
                        rowOptions.children && (res = res.concat(rowOptions.children));
                    }

                }

                return res;
            }

            /*for(var i= 0,ib;(ib = body[i]);i++){

             var rowOptions = {
             rowId:gridUtil.newId(),
             visible:true,
             originalRowIndex:i
             }

             if(expandableTable){
             rowOptions.hasChildren = ib.$hasChildren || false;
             rowOptions.children = ib.$children;
             rowOptions.depth = ib.$depth;
             rowOptions.parent = ib.$parent;
             }

             var row = buildRow(columns,ib,rowOptions);

             bodyInfo.rows.push(row);
             }*/
            bodyInfo.rows = _create(body,0,0);

            return bodyInfo;
        }

        return service;

    }])

    .directive("graceGrid",["$window", 'gridUtil', '$position', function($window, gridUtil, pos){
        return {
            restrict:"EA",
            priority:1,
            replace:true,
            controller:"gridController",
            templateUrl:"template/grid/grid.html",
            scope:{
                gridOptions:"="
            },
            compile:function(){
                return {
                    pre:function($scope,$elm,$attrs){

                        var ae = angular.element;

                        function getViewPortInfo(){
                            var styles = gridUtil.getStyles($elm);

                            var height = parseFloat(styles.height.replace("px","")) || 'auto';
                            var width = parseFloat(styles.width.replace("px","")) || 'auto';
                            if(height >= 0 && $elm[0].clientHeight <=5){
                                height = 'auto';
                            }

                            return {
                                'width':width,
                                'height':height
                            }
                        }

                        var viewPort = getViewPortInfo();

                        $scope.gridWidth = viewPort.width;
                        $scope.gridHeight = viewPort.height;

                        $scope.getViewPortInfo = getViewPortInfo;

                        $scope.getBodyHeight = function(){
                            var section = $elm[0].querySelector('section');
                            if(!section) return 0;
                            return parseFloat(gridUtil.getStyles(ae(section)).height.replace('px',"")) || 'auto';
                        }

                        $scope.gridWrapperEl = ae($elm[0].querySelector(".grace-grid-wrapper"));
                        $scope.gridContainerEl = $elm;
                    },
                    post:function($scope,$elm,$attrs,ctrls){


//                        if($scope.enablePinning){
                        var el = $elm[0];
                        var ae = angular.element;
                        var wrapper = el.querySelector(".grace-grid-wrapper");
                        var header = el.querySelector("header");
                        var eheader = angular.element(header);
                        var aw = angular.element(wrapper);
//                            aw.css("webkitTransform","translateZ(0)");
                        wrapper.addEventListener("scroll", function (event) {
                            var scrollLeft = wrapper.scrollLeft;
                            var scrollTop = wrapper.scrollTop;
                            var pinningHeader = angular.element(wrapper.querySelector(".pinning-header"));
                            var pinningBody = angular.element(wrapper.querySelector(".pinning-body"));

                            var cssObj = gridUtil.cssFixer("transform","translateX(" + scrollLeft + "px)");

                            pinningHeader.css(cssObj);
                            pinningBody.css(cssObj);

                            if($scope.lockHeader && $scope.lockHeaderType === 'normal'){

                                eheader.css( gridUtil.cssFixer("transform","translateY(" + scrollTop + "px)"));
                            }
                        }, false);

                        var headerOffset = null;
                        function lockHeader2Top(event){

                            if(!headerOffset){
                                headerOffset = pos.offset(eheader);
                            }

                            var scrollY = $scope.IE ? document.documentElement.scrollTop : $window.scrollY;
//                            console.log(scrollY);
                            var offsetTop = headerOffset.top;

                            if(offsetTop<scrollY){
                                eheader.css(gridUtil.cssFixer('transform','translateY('+(scrollY-offsetTop)+'px)'));
                            }
                            else{
                                eheader.css(gridUtil.cssFixer('transform','translateY(0px)'));
                            }

                        }

                        $scope.lockHeader2Top = function(){

                            $scope.unlockHeader2Top();

                            $window.addEventListener('scroll',lockHeader2Top,false);

                        }

                        $scope.unlockHeader2Top = function(){
                            $window.removeEventListener('scroll',lockHeader2Top,false);
                        }

                    }
                }
            }
        }
    }])

    .controller("graceGridCellController",['gridConstant',function(gridConstant){

    }])

    .directive('graceGridCell',['$compile', function($compile){
        return {
            restrict:"EA",
            replace:true,
            templateUrl:"template/grid/gridCell.html",
            require:["^graceGrid","^graceGridBody"],
            scope:{
                cellData:"=",
                rowIndex:"="
            },
            compile:function(){

                return {
                    pre:function($scope,$elm,$attrs,ctrls){

                        var gridCtrl = ctrls[0];
                        var expandableTable = gridCtrl.scope.expandableTable;
                        var gridScope = gridCtrl.scope;

                        var html = '<div class="cell-content" >'

                        if(expandableTable){
                            html += '<i class="cell-icon" ng-click="iconClick($event)" ></i>';
                        }

                        var cellData = $scope.cellData;

                        html += '<span '+( cellData.enableTooltip ? 'tooltip="'+cellData.tooltip+'" ' +
                            'tooltip-placement="'+gridScope.tooltipConfig.place+'" ' +
                            'tooltip-popup-delay="'+gridScope.tooltipConfig.showDelay+'" ' +
                            'tooltip-append-to-body="'+gridScope.tooltipConfig.append2Body+'"': '')+'>';
                        switch(cellData.type){
                            case 'normal':
                                html += '<span  class="cell-content-normal"  >'+cellData.displayContent+'</span>';
                                break;
                            case "text":
                                html+=('<span class="cell-content-text" >'+
                                    '<input type="text"'+
                                    'ng-model="cellData.displayContent"'+
                                    'ng-model-options="{updateOn:\'blur\',debounce:{blur:\'10\'}}"'+
                                    'ng-change="contentChange($event,cellData)"'+
                                    'ng-click="elClick($event,cellData)"'+
                                    'ng-class="{active:cellData.active}"'+
                                    'ng-blur="elBlur($event,cellData)"'+
                                    'ng-disabled="gridScope.isDraggingMode" />'+
                                    '</span>')
                                break;
                            case "check":
                                html += ('<span  class="cell-content-check" >'+
                                    '<i class="grid-check-icon"'+
                                    'ng-class="{\'grace-icon-check\':cellData.displayContent,\'grace-icon-unchecked\':!cellData.displayContent}"'+
                                    'ng-click="doCheck($event,cellData)" ></i>'+
                                    '</span>')
                                break;
                            case "select":
                                html += ('<span  class="cell-content-select" >'+
                                    '<select ng-model="cellData.displayContent"'+
                                    'ng-change="contentChange($event,cellData)"'+
                                    'ng-options="value for value in cellData.selectModel"'+
                                    'ng-click="selectionClick($event)"'+
                                    'ng-disabled="gridScope.isDraggingMode" ></select>'+
                                    '</span>')
                                break;
                            case "rowSelector":
                                html += ('<span  class="cell-content-check" >'+
                                    '<i class="grid-check-icon"'+
                                    'ng-class="{\'grace-icon-check\':cellData.displayContent,\'grace-icon-unchecked\':!cellData.displayContent}"'+
//                                    'ng-click="doSelect($event,cellData)" ></i>'+
                                    '</span>')
                                break;
                            case "date":
                                html += "<span></span>"
                                break;
                            case "button":
                                html += ('<span class="cell-content-button" >'+
                                    '<button class="'+cellData.displayContent.class+'"'+
                                    'ng-click="buttonClick($event,cellData)"'+
                                    'ng-disabled="gridScope.isDraggingMode"  >'+cellData.displayContent.text+'</button>'+
                                    '</span')
                                break;
                            case "buttons":
                                html += '<span class="cell-content-buttons">';
                                for(var i= 0,ib;(ib = cellData.displayContent[i]);i++){
                                    html += ('<button ng-click="buttonClick($event,cellData,'+i+')"'+
                                        'class="'+ib.class+'"'+
                                        'ng-disabled="gridScope.isDraggingMode"  >'+ib.text+'</button>')
                                }
                                html += '</span>';
                                break;
                            case "html":
                                html += '<span  class="cell-content-html" >'+cellData.displayContent+'</span>'
                                break;
                            case "template":
                                html += '<span  grace-bind-template="cellData.displayContent" class="cell-content-html" ></span>'
                                break;
                        }
                        html +=('</span>'+
                            '</div>');

                        $elm.append($compile(html)($scope));
                    },
                    post:function($scope,$elm,$attrs,ctrls){

                        var gridCtrl = ctrls[0];
                        var gridBodyCtrl = ctrls[1];

                        var gridApi = gridCtrl.gridApi;
                        var expandableTable = gridCtrl.scope.expandableTable;
                        var bodyInfo = gridCtrl.scope.bodyInfo;
                        $scope.gridScope = gridCtrl.scope;

                        $scope.iconClick = function($event){

                            if($scope.gridScope.isDraggingMode){
                                return;
                            }

                            $event.stopPropagation();

                            if(expandableTable){

                                gridBodyCtrl.expandOrCollapseRow(bodyInfo.rows[$scope.rowIndex]);
                            }

                        }

                        $scope.elBlur = function($event,cellData){

                            cellData.active = false;

                        }

                        $scope.selectionClick =function($event){

//                            if($scope.gridScope.isDraggingMode){
//                                $event.preventDefault();
//                            }

                            $event.stopPropagation();
                        }

                        $scope.elClick = function($event,cellData){
                            $event.stopPropagation();

                            if(cellData.editable){
                                cellData.active = true;
                            }

                        }

                        $scope.contentChange = function($event,cellData){

                            switch (cellData.type){
                                case "text":

                                    gridApi.event.trigger("contentEdit",[$event,$scope.rowIndex,cellData.field,cellData.displayContent]);

                                    break;
                                case "select":

                                    gridApi.event.trigger("contentEdit",[$event,$scope.rowIndex,cellData.field,cellData.displayContent]);
                                    break;
                                default:break;
                            }


                        }

                        $scope.buttonClick = function($event,cellData,buttonIndex){

                            $event.stopPropagation();

                            gridApi.event.trigger("buttonClick",[$event,$scope.rowIndex,cellData.field,buttonIndex])
                        }

                        $scope.doCheck =function($event,cellData){

                            if($scope.gridScope.isDraggingMode){
                                return;
                            }

                            $event.stopPropagation();

                            cellData.displayContent = !cellData.displayContent;

                            gridApi.event.trigger('checkStatusChange',[$event,$scope.rowIndex,cellData.field,cellData.displayContent]);
                        }

                    }
                }
            }
        }
    }])

    .directive('graceGridHeaderCell',["$position", 'gridUtil', '$compile', function($position, gridUtil, $compile){
        return {
            restrict:"EA",
            replace:true,
            require:["^graceGrid",'^graceGridHeader'],
            templateUrl:"template/grid/gridHeaderCell.html",
            scope:{
                cellData:"=",
                columnIndex:"=",
                rowIndex:"="
            },
            compile:function(){
                return {
                    pre:function($scope,$elm,$attrs,ctrls){
                        var cellData = $scope.cellData;
                        var gridCtrl = ctrls[0];
                        var gridScope = gridCtrl.scope;

                        var html = '<div class="cell-content"  >';
                        if(cellData.desc){
                            html += ('<span '+
                                'tooltip="'+cellData.desc+'"'+
                                'tooltip-append-to-body="'+gridScope.tooltipConfig.append2Body+'"'+
                                'tooltip-popup-delay="'+gridScope.tooltipConfig.showDelay+'"'+
                                'tooltip-placement="'+gridScope.tooltipConfig.place+'" >'+
                                '<i class="grace-icon-question-sign" ></i>'+
                                '</span>')
                        }

                        if(cellData.columnType == 'rowSelector'){
                            html += '<span class="cell-value"  >'+
                                '<i ng-class="{\'grace-icon-check\':cellData.isAllSelected,\'grace-icon-unchecked\':!cellData.isAllSelected}" ng-click="selectAll($event)" ></i>'+
                                '</span></div>'
                        }
                        else{
                            html += '<span class="cell-value" ng-click="valueClick($event)"  >'+
                                '{{cellData.displayName}}'+
                                '<i ng-if="cellData.sortable && !cellData.children" ng-class="{\'grace-icon-sort-down\':sortTypeIndex == 2,\'grace-icon-sort-up\':sortTypeIndex == 1,\'grace-icon-sort\':sortTypeIndex == 0}" ></i>'+
                                '</span>'+
                                '<div ng-if="!cellData.children && gridOptions.enableFilter && !cellData.disableFilter" class="column-filter" >'+
                                '<input type="text" ng-model="cellData.filterKeyWord" ng-change="filterChange($event)" />'+
                                '</div>'+
                                '</div>';
                        }

                        if(cellData.pinnable && !cellData.disablePinning && cellData.columnType != 'rowSelector'){
                            html += ('<div  class="pin-icon" ng-class="{pinned:cellData.pinned}" ng-click="togglePinning($event)" >'+
                                '<i class="grace-icon-pushpin" ></i>'+
                                '</div>')
                        }
                        if(gridScope.enableColumnResize && cellData.enableResize && !cellData.children){
                            html += '<div  class="resize-bar" ng-mousedown="beginResize($event)" ></div>';
                        }

                        $elm.append($compile(html)($scope));
                    },

                    post:function($scope,$elm,$attrs,ctrls){
                        var gridCtrl = ctrls[0];
                        var gridHeaderCtrl = ctrls[1];
                        var sortTypesIndex = 0;
                        var gridApi = gridCtrl.gridApi;

                        $scope.gridScope = gridCtrl.scope;

                        $scope.gridOptions = gridCtrl.options;
                        $scope.sortTypeIndex = sortTypesIndex;

                        gridHeaderCtrl.addColumnScope($scope);

                        $scope.resetSort = function(){
                            sortTypesIndex = 0;
                            $scope.sortTypeIndex = sortTypesIndex;
                        }

                        $scope.selectAll = function($event,cellData){

                            var cellData = $scope.cellData;

                            var status = cellData.isAllSelected = !cellData.isAllSelected

                            $scope.$emit('selectAll',{selectOrUnSelect:status});
                        }

                        $scope.valueClick = function($event,typeIndex){

                            if($scope.cellData.children) return;
                            if(!gridCtrl.scope.enableSort) return;
                            if($scope.cellData.disableSort) return;

                            if(typeIndex != undefined){
                                sortTypesIndex = typeIndex;
                            }
                            else{
                                sortTypesIndex ++;
                                sortTypesIndex %= 3;
                            }


                            gridHeaderCtrl.doSort(sortTypesIndex,$scope.rowIndex, $scope.columnIndex,$scope);
                            $scope.sortTypeIndex = sortTypesIndex;
                        }

                        $scope.filterChange = function($event){
                            gridHeaderCtrl.doFilter($scope.cellData);
                        }

                        $scope.togglePinning = function($event){
                            if($scope.cellData.children || $scope.cellData.parent) return;
                            if(!gridCtrl.scope.enablePinning) return;
                            if($scope.cellData.disablePinning) return;
                            $scope.cellData.pinned = !$scope.cellData.pinned;
                            gridHeaderCtrl.doPinning($scope.cellData);
                        }


                        var startToResize = false;
                        var startX,offsetX=0;
                        var resizeBarEl = null;
                        var baseLineEl = null;

                        function getEvtX(evt){
                            evt = evt.originalEvent || evt;
                            return evt.pageX;
                        }
                        //手动拖动设置列宽
                        $scope.beginResize = function($event){
                            if(!gridCtrl.scope.enableColumnResize) return;
                            resizeBarEl = angular.element($event.target);
                            startToResize = true;
                            startX = getEvtX($event);


                            angular.element(document.body).bind("mousemove",doResize);

                            angular.element(document.body).bind("mouseup",stopResize);

                            baseLineEl = angular.element("<div class='base-line' ></div>");

                            gridCtrl.scope.gridWrapperEl.append(baseLineEl);

                            var targetPos = $position.offset(resizeBarEl);
                            var gridPos = $position.offset(gridCtrl.scope.gridWrapperEl);

                            baseLineEl.css("left",(targetPos.left-gridPos.left+gridCtrl.scope.gridWrapperEl[0].scrollLeft)+"px");

//                            console.log($event);
                            $event.preventDefault();
                        }

                        function doResize($event){
                            if(!gridCtrl.scope.enableColumnResize) return;
                            if(!startToResize) return;
                            offsetX = getEvtX($event) - startX;

                            var cssObj = gridUtil.cssFixer("transform","translateX("+offsetX+"px)");

                            resizeBarEl.css(cssObj);
                            baseLineEl.css(cssObj);

//                            console.log($event);
                            $event.preventDefault();
                        }

                        function stopResize ($event){
                            if(!gridCtrl.scope.enableColumnResize) return;

                            startToResize = false;

                            gridCtrl.resizeColumn($scope.cellData,offsetX);

                            gridApi.event.trigger("columnResize",[$event,$scope.cellData.originalColumnIndex,offsetX])
                            /*$scope.$emit("columnResize",{sssss
                             column:$scope.cellData,
                             changed:offsetX
                             })*/

                            offsetX = 0;

                            resizeBarEl.css(gridUtil.cssFixer("transform","translateX("+0+"px)"));

                            resizeBarEl = null;
                            $event.preventDefault();

                            angular.element(document.body).unbind("mousemove",doResize)

                            angular.element(document.body).unbind("mouseup",stopResize)

                            baseLineEl.remove();

                        }

                        $scope.doResize = doResize;

                        $scope.stopResize = stopResize
                    }
                }
            }
        }
    }])

    .controller("graceGridHeaderController",['gridConstant',function(gridConstant){
        var self = this;
        self.sortTypes = ['none','asc','des'];
        self.sortTypeIndexMap = {
            'none':0,
            'asc':1,
            'des':2
        }
        self.sorters = {
            asc:function(a,b){
                var c = a-b;
                return isNaN(c) ? (a>b ? 1 : a == b ? 0 : -1) : c;
            },
            des:function(a,b){
                var c = b-a;
                return isNaN(c) ? (a > b ? -1 : a == b ? 0 : 1) : c;
            }
        };
        self.filters = [];

        var columnScopes = {};
        self.addColumnScope = function(columnScope){
            var columnField = columnScope.cellData.field;
            columnScopes[columnField] = columnScope
        }
        self.getColumnScope = function(field){
            return columnScopes[field];
        }
    }])

    /*.directive("graceGridHeaderPinning",function(){
     return {
     restrict:"EA",
     replace:true,
     templateUrl:"template/grid/gridHeader.html",
     scope:{
     headerData:"="
     },
     link:function($scope,$elm,$attrs){
     }
     }
     })*/

    .directive('graceGridHeader',['gridUtil', function(gridUtil){
        return {
            restrict:"EA",
            replace:true,
            require:["^graceGrid",'graceGridHeader'],
            controller:"graceGridHeaderController",
            templateUrl:"template/grid/gridHeader.html",
            scope:{
                headerData:"="
            },
            compile:function(){
                return {
                    post:function($scope,$elm,$attrs,ctrls){

                        var gridCtrl = ctrls[0];
                        var gridHeaderCtrl = ctrls[1];
                        var sortType = "none";
                        var sortColumn = null;

                        $scope.gridOptions = gridCtrl.scope.gridOptions;
                        $scope.gridScope = gridCtrl.scope;
                        var gridScope = gridCtrl.scope;
                        var curSortedColumn = null;
                        gridHeaderCtrl.doSort = function(typeIndex ,rowIndex, columnIndex, headerCellScope){

                            if(curSortedColumn && curSortedColumn.$id != headerCellScope.$id){
                                curSortedColumn.resetSort();
                            }
                            curSortedColumn = headerCellScope;

                            sortType = gridHeaderCtrl.sortTypes[typeIndex];
                            sortColumn = $scope.headerData.columns2Render[rowIndex][columnIndex];
                            $scope.curRowIndex = rowIndex;
                            $scope.curColumnIndex = columnIndex;
                            gridCtrl.applyCurrentData();

                        }

                        gridCtrl.sortingExposed = function(field,sortType){
                            var curScope = gridHeaderCtrl.getColumnScope(field);
                            var typeIndex = gridHeaderCtrl.sortTypeIndexMap[sortType];
                            if(curScope && typeIndex != undefined){
                                curScope.valueClick(null,typeIndex);
                            }
                        }

                        gridCtrl.sorting = function(scope){

                            if(sortType == "none") return;
                            if(!sortColumn) return;
                            var sorter = (sortColumn.sorter && sortColumn.sorter[sortType]) || gridHeaderCtrl.sorters[sortType];
                            var sorterPro = sortColumn.sorterPro && sortColumn.sorterPro[sortType]
                            var bodyInfo = scope.bodyInfo;
                            var rows2Render = bodyInfo.rows2Render;
                            var columnIndex = scope.headerInfo.columns.indexOf(sortColumn);

                            var sortFn;
                            if(sorterPro){
                                sortFn = function(a,b){
                                    return sorterPro(a.rowInfo.rawData, b.rowInfo.rawData);
                                }
                            }
                            else{
                                sortFn = function(a,b){
                                    return sorter(a[columnIndex].content,b[columnIndex].content);
                                }
                            }


                            rows2Render.sort(sortFn)

                            if(gridScope.expandableTable){
                                var rowsChildrenMap2Render = bodyInfo.rowsChildrenMap2Render;
                                for(var p in rowsChildrenMap2Render){
                                    rowsChildrenMap2Render[p].sort(sortFn)
                                }
                            }

                        }
                        gridHeaderCtrl.doFilter = function(headerColumn){

                            if(gridHeaderCtrl.filters.indexOf(headerColumn) == -1){
                                gridHeaderCtrl.filters.push(headerColumn);
                            }

                            gridCtrl.applyCurrentData();
                        }
                        gridCtrl.filtering = function(scope){

                            var filters = gridHeaderCtrl.filters;
                            var columnsIndex = [];

                            for(var i= 0,ft;(ft = filters[i]);i++){
                                columnsIndex.push(scope.headerInfo.columns.indexOf(ft));
                            }

                            var bodyInfo = scope.bodyInfo;
                            var rows2Render = bodyInfo.rows2Render;

                            function filterFn(value,index,ary){
                                var res = true;
                                for(var i= 0,ft;(ft = filters[i]);i++){
                                    var tnt = value[scope.headerInfo.columns.indexOf(ft)].content;
                                    if(!tnt) return false;
                                    res = (tnt + "").indexOf(ft.filterKeyWord) != -1
                                    if(!res) return false;
                                }
                                return res;
                            }

                            bodyInfo.rows2Render = rows2Render.filter(filterFn);

                            if(gridScope.expandableTable){
                                var rowsChildrenMap2Render = bodyInfo.rowsChildrenMap2Render;
                                for(var p in rowsChildrenMap2Render){
                                    rowsChildrenMap2Render[p] = rowsChildrenMap2Render[p].filter(filterFn)
                                }
                            }
                        }

                        $scope.pinnings = [];

                        gridHeaderCtrl.doPinning = function(headerColumn){
                            if($scope.pinnings.indexOf(headerColumn) == -1){
                                $scope.pinnings.push(headerColumn);
                            }
                            else{
                                $scope.pinnings.splice($scope.pinnings.indexOf(headerColumn),1)
                            }
                            gridCtrl.applyCurrentData();
                        }

                        gridCtrl.pinningExposed = function(field){
                            var curScope = gridHeaderCtrl.getColumnScope(field);
                            if(curScope){
                                curScope.togglePinning(null);
                            }
                        }

                        gridCtrl.pinning = function(scope){

                            var headerInfo = scope.headerInfo;
                            var cd = headerInfo.columns2Render;

                            for(var i= 0,len =cd[0].length;i<len;i++){
                                var tmp = cd[0][i];
                                if(tmp.children) continue;
                                tmp.pinnable = tmp.pinnable === undefined ? true : tmp.pinnable;
                                if($scope.pinnings.indexOf(tmp) != -1){
                                    cd[0].splice(i,1);
                                    i--;
                                    len-=1;
                                }
                            }

                            scope.headerInfo.columns2Pinning = [$scope.pinnings];
                            var bodyInfo = scope.bodyInfo;
                            scope.bodyInfo.rows2Pinning = [];

                            for(var i= 0,ib;(ib = bodyInfo.rows2Render[i]);i++){

                                var tmp = [];

                                for(var j= 0,jp;(jp = $scope.pinnings[j]);j++){
                                    tmp.push(ib.splice(jp.columnIndex,1,null)[0]);
                                }
                                tmp.rowInfo = ib.rowInfo;

                                ib = ib.filter(function(a){return a != null});

                                ib.rowInfo = tmp.rowInfo;

                                bodyInfo.rows2Render[i] = ib;
                                scope.bodyInfo.rows2Pinning.push(tmp);
                            }
                        }
                    }
                }
            }
        }
    }])

    .controller("graceGridBodyController",['$scope', function($scope){



    }])

    .directive('graceGridBody',['gridUtil', '$position', '$compile', function(gridUtil, $pos, $compile){
        return {
            restrict:"EA",
            replace:true,
            require:["^graceGrid",'graceGridBody'],
            templateUrl:"template/grid/gridBody.html",
            controller:"graceGridBodyController",
            scope:{
                bodyData:"="
            },
            compile:function(){
                return {
                    pre:function($scope,$elm,$attrs,ctrls){

                        /*var gridCtrl = ctrls[0];
                         var bodyCtrl = ctrls[1];
                         var gridApi = gridCtrl.gridApi;
                         var gridScope = gridCtrl.scope;
                         var selectedRowIndexes = [];

                         var ae = angular.element;

                         $scope.gridScope = gridCtrl.scope;

                         var html =  '';
                         if($scope.bodyData.rows2Pinning && $scope.bodyData.rows2Pinning[0] && $scope.bodyData.rows2Pinning[0][0]){
                         html += ('<div style="float: left" class="pinning-body" >'+
                         '<table class="grace-grid-body">'+
                         '<tbody>'+
                         '<tr ng-repeat="row in bodyData.rows2Pinning track by row.rowInfo.rowId"'+
                         'ng-class="{grouper:gridScope.groupingMode && row.rowInfo.hasChildren,'+
                         'grouperChild:gridScope.groupingMode && !row.rowInfo.hasChildren,'+
                         'expanded:row.rowInfo.expanded}"'+
                         'class="row-depth{{row.rowInfo.depth}}"'+
                         'ng-mousedown="rowMousedown(row,$event,$index)"'+
                         'ng-click="rowClick(row,$event)"'+
                         'ng-if="row.rowInfo.visible"'+
                         'tr-index="{{$index}}" >'+
                         '<td ng-repeat="rowCell in row track by rowCell.cellId"'+
                         'grace-grid-cell'+
                         'cell-data="rowCell"'+
                         'row-index="row.rowInfo.originalRowIndex"'+
                         'ng-if="rowCell.visible"'+
                         'ng-class="{selected:rowCell.selected}" ></td>'+
                         '</tr>'+
                         '</tbody>'+
                         '</table>'+
                         '</div>')
                         }

                         html += '<div style="float: left" class="normal-body" >'+
                         '<table class="grace-grid-body">'+
                         '<tbody>'+
                         '<tr ng-repeat="row in bodyData.rows2Render track by row.rowInfo.rowId"'+
                         'ng-class="{grouper:gridScope.groupingMode && row.rowInfo.hasChildren && !bodyData.rows2Pinning[0][0],'+
                         'grouperChild:gridScope.groupingMode && !row.rowInfo.hasChildren && !bodyData.rows2Pinning[0][0],'+
                         'expanded:row.rowInfo.expanded && !bodyData.rows2Pinning[0][0]}"'+
                         'class="row-depth{{row.rowInfo.depth}}"'+
                         'ng-mousedown="rowMousedown(row,$event,$index)"'+
                         'ng-click="rowClick(row,$event)"'+
                         'ng-if="row.rowInfo.visible"'+
                         'tr-index="{{$index}}" >'+
                         '<td ng-repeat="rowCell in row track by rowCell.cellId"'+
                         'grace-grid-cell'+
                         'cell-data="rowCell"'+
                         'row-index="row.rowInfo.originalRowIndex"'+
                         'ng-if="rowCell.visible"'+
                         'ng-class="{selected:rowCell.selected}" ></td>'+
                         '</tr>'+
                         '</tbody>'+
                         '</table>'+
                         '</div>'

                         $elm.append($compile(html)($scope));*/

                    },
                    post:function($scope,$elm,$attrs,ctrls){

                        var gridCtrl = ctrls[0];
                        var bodyCtrl = ctrls[1];
                        var gridApi = gridCtrl.gridApi;
                        var gridScope = gridCtrl.scope;
                        var selectedRowIndexes = [];

                        var ae = angular.element;

                        $scope.gridScope = gridCtrl.scope;

                        $scope.$on('gridReload',function(){

                            selectedRowIndexes = [];
                        })


                        if($scope.gridScope.rowHeight == 'auto'){

                            $scope.rowHeightWatcher && $scope.rowHeightWatcher();
                            $scope.rowHeightWatcher = $scope.$watch(function(){

                                allPinTr = ae(document.querySelectorAll('.pinning-body tr'));
                                allNorTr = ae(document.querySelectorAll('.normal-body tr'));
                                var rowHeights = "";
                                function _(e,i){
                                    rowHeights += (e.offsetHeight+",");
                                }
                                angular.forEach(allPinTr,_)
                                rowHeights = rowHeights.substr(0,rowHeights.length-1) + "_";
                                angular.forEach(allNorTr,_)
                                rowHeights = rowHeights.substr(0,rowHeights.length-1)

                                return rowHeights;
                            },function(heights){

                                if(!heights) return;

                                allPinTr = ae(document.querySelectorAll('.pinning-body tr'));
                                allNorTr = ae(document.querySelectorAll('.normal-body tr'));

                                heights = heights.split("_");

                                var ph = heights[0].split(",");
                                var nh = heights[1].split(",");

                                function _(e,i){
                                    var t = Math.max(ph[i] || 0,nh[i] || 0);
                                    if(e.offsetHeight < t){
                                        e.style.height = t+"px";

                                    }
                                }

                                gridUtil.forEach(allPinTr,_);
                                gridUtil.forEach(allNorTr,_);

                            })

                            $scope.$on("$destroy", function() {

                                $scope.rowHeightWatcher();

                            });
                        }

                        bodyCtrl.expandOrCollapseRow = function(row){

                            if(gridScope.expandableTable && row.rowInfo.hasChildren){

                                //收起
                                if(row.rowInfo.expanded){

//                                    row.rowInfo.expanded = false;
                                    gridCtrl.groupCollapse(row,function(){
                                        gridCtrl.applyCurrentData();
                                    });
                                }
                                else{

//                                    row.rowInfo.expanded = true;
                                    gridCtrl.groupExpand(row,function(){
                                        gridCtrl.applyCurrentData();

                                        gridCtrl.gridApi.event.trigger('afterExpandRow',[null,row.rowInfo.rawData]);
                                    });
                                }


                            }

                        }

                        var startDragging = false;
                        var startDraggingY = 0;

                        function getEvtY(evt){
                            evt = evt.originalEvent || evt;
                            return evt.pageY;

                        }

                        function doRowDragging(event){

                            var curY = getEvtY(event);
                            var offsetY = curY - startDraggingY;

                            curDragg.css(gridUtil.cssFixer({'transform':"translateY("+offsetY+"px)"}));

                            //code below works for ie
                            if($scope.gridScope.IE) {
                                var pos, i = -1;
                                while (pos = allTrPoses[++i]) {
                                    if (curY >= pos[0] && curY < pos[1]) {
                                        break;
                                    }
                                }
                                targetTrIndex = i;
                            }
                            //code ends here

                            event.preventDefault();

                        }

                        function switchEl(ary,ai,bi){
                            var tmp = ary[ai];
                            ary[ai] = ary[bi];
                            ary[bi] = tmp;
                        }

                        function switchIndex(ary,ai,bi){
                            var tmp = ary[ai].rowInfo.originalRowIndex
                            ary[ai].rowInfo.originalRowIndex = ary[bi].rowInfo.originalRowIndex;
                            ary[bi].rowInfo.originalRowIndex = tmp;
                        }

                        function stopRowDragging(event){

                            var rows = $scope.gridScope.bodyInfo.rows;
                            switchEl(rows,curTrIndex,targetTrIndex);
                            switchIndex(rows,curTrIndex,targetTrIndex);
                            rows = $scope.gridScope.bodyInfo.rows2Render;
                            switchEl(rows,curTrIndex,targetTrIndex);
                            rows = $scope.gridScope.bodyInfo.rows2Pinning;
                            switchEl(rows,curTrIndex,targetTrIndex);

                            curDragg.css({
                                position:'relative',
                                zIndex:"0",
                                'pointer-events':'auto'
                            }).css(gridUtil.cssFixer({'transform':"translateY(0)"}))

                            curDraggTrPinPlaceHolder && curDraggTrPinPlaceHolder.remove();
                            curDraggTrPlaceHolder && curDraggTrPlaceHolder.remove();
                            trPCssPh && trPCssPh.remove();
                            trCssPh && trCssPh.remove();
                            ae(document.body).unbind('mousemove',doRowDragging);
                            ae(document.body).unbind('mouseup',stopRowDragging);
                            $elm.find('tr').unbind('mouseover',enterTr);
                        }

                        function enterTr(event){
//                            console.log('enter',event);
                            var el = event.target;

                            while(el.tagName != 'TR'){
                                el = el.parentElement;
                            }

                            targetTrIndex = el.getAttribute('tr-index');

                            if(!targetTrIndex){
                                targetTrIndex = curTrIndex;
                            }
//                            console.log(curTrIndex,targetTrIndex);

                        }

                        var curDraggTrPin = null;
                        var curDraggTrPinPlaceHolder = null;
                        var curDraggTr = null;
                        var curDraggTrPlaceHolder = null;
                        var trPCssPh = null,trCssPh = null;
                        var curDragg = null;
                        var allTr = null;
                        var curTrIndex = 0;
                        var targetTrIndex = 0;

                        //坑爹的IE，真是。。。坑死爹啊！
                        var allPinTr = null;
                        var allNorTr = null;
                        var allTrPoses = null;

                        function startDragg(row,$event,trIndex){
                            startDragging = true;
                            startDraggingY = getEvtY($event);

                            targetTrIndex = curTrIndex = trIndex;
//                                document.querySelector("header");
                            curDraggTrPin = ae($elm[0].querySelector('.pinning-body tr:nth-child('+(trIndex+1)+')'));
                            curDraggTr = ae($elm[0].querySelector('.normal-body tr:nth-child('+(trIndex+1)+')'));
                            curDragg = ae($elm[0].querySelectorAll('tr:nth-child('+(trIndex+1)+')'));

                            //code below works for ie
                            if($scope.gridScope.IE) {
                                allNorTr = ae(document.querySelectorAll('.normal-body tr'));
                                allPinTr = ae(document.querySelectorAll('.pinning-body tr'));
                                allTrPoses = [];
                                function _(e, i) {
                                    var os = $pos.offset(ae(e))
                                    allTrPoses[i] = [os.top, os.top + os.height];
                                }

                                gridUtil.forEach(allNorTr, _)
                                if (!allTrPoses.length) {
                                    gridUtil.forEach(allPinTr, _)
                                }
//                                console.log(allTrPoses)
                            }
                            //ends here

                            allTr = $elm.find("tr");
                            var hi = $scope.gridScope.headerInfo;
                            var pcount = hi.columns2Pinning[0] && hi.columns2Pinning[0].length || 0;
                            var ncount = hi.columns.length - pcount;
                            //columns2Pinning
                            if(curDraggTrPin[0]){
                                curDraggTrPinPlaceHolder =  ae('<tr><td colspan="'+pcount+'" ></td></tr>')
                                curDraggTrPinPlaceHolder.css({
                                    width:curDraggTrPin[0].offsetWidth+"px",
                                    height:curDraggTrPin[0].offsetHeight+"px"
                                })
                                curDraggTrPin.css({
                                    position:'absolute',
                                    zIndex:10,
                                    'pointer-events':'none'
                                })
                                trPCssPh = ae('<tr style="display: none;" ></tr>')
                                curDraggTrPin.after(curDraggTrPinPlaceHolder).after(trPCssPh);
                            }
                            if(curDraggTr[0]){

                                curDraggTrPlaceHolder = ae('<tr><td colspan="'+ncount+'" ></td></tr>');
                                curDraggTrPlaceHolder.css({
                                    width:curDraggTr[0].offsetWidth+"px",
                                    height:curDraggTr[0].offsetHeight+"px"
                                })
                                curDraggTr.css({
                                    position:'absolute',
                                    zIndex:10,
                                    'pointer-events':'none'
                                })
                                trCssPh = ae('<tr style="display: none;" ></tr>')
                                curDraggTr.after(curDraggTrPlaceHolder).after(trCssPh);
                            }


                            ae(document.body).bind('mousemove',doRowDragging);
                            ae(document.body).bind('mouseup',stopRowDragging);
//                                $elm[0].querySelectorAll('tr').addEventListener('mouseover',enterTr,false);
//                                allTr.bind('mouseover',enterTr);
                            if(!$scope.gridScope.IE){
                                $elm.find('tr').bind('mouseover',enterTr);
                            }
                        }

                        $scope.rowClick = function(row,$event){

                            if(gridScope.enableSelection && !gridScope.isDraggingMode){
                                doSelection(row,$event)

                                $event.stopPropagation();
                                $event.preventDefault();
                            }
                        }

                        $scope.rowMousedown = function(row,$event,trIndex){

                            if(gridScope.isDraggingMode){

                                startDragg(row,$event,trIndex)
                            }

                        }



                        function doSelection(row,$event){

                            var originalRowIndex = row.rowInfo.originalRowIndex;

                            var bodyInfo = gridScope.bodyInfo;
                            var renderRow = bodyInfo.rows[originalRowIndex];

                            renderRow.rowInfo.selected = !renderRow.rowInfo.selected;
                            if(renderRow[0].type == 'rowSelector'){
                                renderRow[0].displayContent = !renderRow[0].displayContent;
                            }
                            //cell.selected = !cell.selected;
                            //已经选择过的
                            if(selectedRowIndexes.indexOf(originalRowIndex) != -1){

                                selectedRowIndexes.splice(selectedRowIndexes.indexOf(originalRowIndex),1);


                                $scope.$emit('selectOne',{selectOrUnSelect:false});
                                gridApi.event.trigger("rowUnSelect",[$event,originalRowIndex,selectedRowIndexes]);
                            }
                            else{

                                if(gridScope.enableSelectionMulti){
                                    selectedRowIndexes.push(originalRowIndex);
                                }
                                else{
                                    var lastIndex = selectedRowIndexes[0];
                                    if(lastIndex != undefined){
                                        var lrr = bodyInfo.rows[lastIndex];

                                        if(lrr[0].columnType == 'rowSelector'){
                                            lrr[0].displayContent = false;
                                        }

                                    }
                                    selectedRowIndexes[0] = originalRowIndex;
                                }

                                $scope.$emit('selectOne',{selectOrUnSelect:true});
                                gridApi.event.trigger("rowSelect",[$event,originalRowIndex,selectedRowIndexes]);
                            }

                        }

                        gridCtrl.selectOne = doSelection;

                        gridCtrl.selectAll = function($event,options){

                            var selectOrUnSelect = options.selectOrUnSelect;

                            var gridScope = $scope.gridScope;
                            var bodyInfo = gridScope.bodyInfo;
                            var rows = bodyInfo.rows;
                            if(!gridScope.enableInfiniteScroll){
                                var rows2Render = bodyInfo.rows2Render;
                            }
                            else{
                                var rows2Render = bodyInfo.rows2RenderCache;
                            }

                            if(selectOrUnSelect){
                                rows2Render.forEach(function(v){

                                    var orgIndex= v.rowInfo.originalRowIndex;
                                    var r = rows[orgIndex];
                                    r.rowInfo.selected = true;
                                    if(r[0].type == 'rowSelector'){
                                        r[0].displayContent = true;
                                    }
                                    if(selectedRowIndexes.indexOf(orgIndex) == -1){
                                        selectedRowIndexes.push(orgIndex);

                                    }

                                })

                                gridApi.event.trigger("rowSelectAll",[$event,selectedRowIndexes]);
                            }
                            else{

                                rows2Render.forEach(function(v){

                                    var orgIndex= v.rowInfo.originalRowIndex;
                                    var r = rows[orgIndex];
                                    var ti = selectedRowIndexes.indexOf(orgIndex);
                                    if(r[0].type == 'rowSelector'){
                                        r[0].displayContent = false;
                                    }
                                    r.rowInfo.selected = false;
                                    if(ti != -1){
                                        selectedRowIndexes.splice(ti,1);
                                    }

                                })

                                gridApi.event.trigger("rowUnSelectAll",[$event,selectedRowIndexes]);

                            }


                        };

                    }
                }
            }
        }
    }])

    .directive('graceGridPagination',['gridUtil', 'gridConstant', '$http',function(gridUtil, gridConstant, $http){
        return {
            restrict:"EA",
//            priority:0,
            replace:true,
            require:["^graceGrid"],
            templateUrl:"template/grid/gridPagination.html",
            compile:function(){
                return {
                    post:function($scope,$elm,$attrs,ctrls){

                        var gridCtrl = ctrls[0];
                        var gridScope = gridCtrl.scope;
                        var headerInfo = gridScope.headerInfo;
                        var config = gridScope.paginationConfig;

                        $scope.currentPageIndex = 1;
                        $scope.paginationSize = config.paginationSize || gridConstant.paginationSize;
                        $scope.pageSizes = angular.copy(config.pageSizes);
                        $scope.pageSize = config.pageSize;
                        $scope.totalItems = gridScope.bodyInfo.rows.length;

                        if($scope.pageSizes.indexOf($scope.pageSize) == -1){
                            $scope.pageSizes.push($scope.pageSize);
                            $scope.pageSizes.sort(function(a,b){return a-b});
                        }
                        $scope.changePage = function(){

                            if(!/^\d+$/.test($scope.currentPageIndex+"")){
                                $scope.currentPageIndex = 1
                            }
                            else if($scope.currentPageIndex < 1){
                                $scope.currentPageIndex = 1
                            }
                            else if($scope.currentPageIndex > $scope.totalPages){
                                $scope.currentPageIndex = $scope.totalPages
                            }
                            gridCtrl.gridApi.event.trigger("prePaging",[$scope.currentPageIndex,$scope.pageSize]);
                            if($scope.useRemoteData){
                                loadPaginationData();
                            }
                            else{
                                gridCtrl.applyCurrentData();
                            }

                        };

                        gridCtrl.getCurrentPageData = function(rows2Render){

                            if(!$scope.useRemoteData){
                                rows2Render = rows2Render.slice(($scope.currentPageIndex-1)*$scope.pageSize,$scope.pageSize*$scope.currentPageIndex)
                            }

                            return rows2Render;
                        }

                        gridCtrl.paging = function(scope){

                            var bodyInfo = scope.bodyInfo;
                            var rows2Render = bodyInfo.rows2Render;

                            if(!gridScope.useRemoteData){
                                $scope.totalItems = bodyInfo.rows.length;
                            }

                            rows2Render = gridCtrl.getCurrentPageData(rows2Render);


                            bodyInfo.rows2Render = rows2Render;

                            gridCtrl.gridApi.event.trigger("paging",[$scope.currentPageIndex,$scope.pageSize]);

                        }

                        gridCtrl.getPaginationHeight = function(){
                            return $elm[0].offsetHeight;
                        }

                        var ajaxConfig = $scope.ajaxConfig;

                        function loadPaginationData(){

                            var options = {
                                url:ajaxConfig.url,
                                dataType:ajaxConfig.dataType,
                                method:ajaxConfig.method
                            }

                            var tmp = {
                                rows:$scope.pageSize,
                                page:$scope.currentPageIndex
                            }

                            if(ajaxConfig.method == 'get'){

                                var params = tmp

                                if(ajaxConfig.externalParam){
                                    params = angular.extend(params, typeof ajaxConfig.externalParam == 'function' ? ajaxConfig.externalParam() : ajaxConfig.externalParam);
                                }

                                options.params = params
                            }


                            else if(ajaxConfig.method == 'post'){

                                var data = tmp;
                                var params = {};

                                options.headers = {
                                    'Content-type':"application/x-www-form-urlencoded;charset=UTF-8"
                                };

                                if(ajaxConfig.externalParam){
                                    params = typeof ajaxConfig.externalParam == 'function' ? ajaxConfig.externalParam() : ajaxConfig.externalParam;
                                }

                                if(ajaxConfig.externalData){

                                    data = angular.extend(data, typeof ajaxConfig.externalData == 'function' ? ajaxConfig.externalData() : ajaxConfig.externalData);

                                    data = gridUtil.json2query(data);

                                }

                                options.params = params;
                                options.data = data
                            }

                            $http(options).success(function(res){
                                if(ajaxConfig.resultParser)
                                    res = ajaxConfig.resultParser(res);
                                $scope.totalItems = res.records;
                                gridCtrl.options.gridData = res.rows;
                                gridCtrl.update(gridCtrl.options);
                            }).error(function(error){
                                    console.error(error);
                                })
                        }

                        gridCtrl.reloadCurrentPage = loadPaginationData;

                        if($scope.useRemoteData){
                            loadPaginationData();
                        }

                    }
                }
            }
        }
    }])
    .directive("graceGridScreen",['gridUtil', '$position', "$document",function(gridUtil, $position, $document){
        return {
            restrict:"EA",
            replace:true,
            require:["^graceGrid"],
            templateUrl:"template/grid/gridScreener.html",
            compile:function(){
                return {
                    pre:function($scope,$elm,$attr,ctrls){
                        var gridCtrl = ctrls[0];
                        var headerInfo = $scope.headerInfo;
                        var bodyInfo = $scope.bodyInfo;

                        $scope.screener = [];
                        $scope.visibleCount = 0;
                        for(var i= 0,ic;(ic = headerInfo.columns[i]);i++){
                            if(ic.columnType == 'rowSelector') continue;
                            $scope.screener.push({
                                label:ic.displayName,
                                checked:ic.visible,
                                field:ic.field
                            });
                            ic.visible && $scope.visibleCount++;
                        }
                    },
                    post:function($scope,$elm,$attr,ctrls){
                        var gridCtrl = ctrls[0];
                        var gridApi = gridCtrl.gridApi;
//                        $scope.gridApi
                        $scope.gridScope = gridCtrl.scope;
                        $scope.doCheck = function($index,$event){

                            var item = $scope.screener[$index];

                            if($scope.visibleCount <= 1 && item.checked){
                                return;
                            }

                            item.checked = !item.checked;
                            item.checked && $scope.visibleCount++ || $scope.visibleCount--;
                            gridCtrl.scope.headerInfo.columns[$index].visible = item.checked;
                            gridCtrl.applyCurrentData();
                            $event.preventDefault();
                            $event.stopPropagation();
                        };
                        function screenColumns(columns2Render){
                            var totalWidth = 0;
                            function _calculate(column){
                                if(column.children){
                                    var width = 0;
                                    var c = ir.children;
                                    column.drawnWidth = 0;
                                    column.colspan = 0;
                                    for(var i= 0,ic;(ic = c[i]);i++){
                                        var t = _calculate(ic);
                                        column.drawnWidth += t.w;
                                        column.colspan += t.cs;
                                    }
                                }
                                if(column.visible){
                                    return {
                                        w:column.drawnWidth,
                                        cs:column.colspan
                                    }
                                }
                                else{
                                    return {w:0,cs:0}
                                }
                            }
                            for(var i = 0,ir;(ir = columns2Render[0][i]);i++){
                                totalWidth += _calculate(ir).w;
                            }
                            return totalWidth;
                        }
                        gridCtrl.screening = function(scope){
                            var headerInfo = scope.headerInfo;
                            var bodyInfo = scope.bodyInfo;
                            var columns2Render = headerInfo.columns2Render;
                            var width = screenColumns(columns2Render);
                            headerInfo.totalWidth = width;
                            bodyInfo.totalWidth = width;
                            var columns = headerInfo.columns;
                            var rows2Render = bodyInfo.rows2Render;
                            for(var i= 0,ir;(ir = rows2Render[i]);i++){
//                                if(!ir.rowInfo.visible) continue;
                                for(var j= 0,jc;(jc = columns[j]);j++){
                                    ir[j].visible = jc.visible;
                                }
                            }

                            gridCtrl.resizeAutoWidthColumns && gridCtrl.resizeAutoWidthColumns();
                        };
                        gridCtrl.getScreenerHeight = function(){
                            return $elm[0].offsetHeight;
                        }

                        $scope.dropDownConfig = {
                            active : false
                        }

                        $scope.showDropDown = function($event){
                            var dropDownTrigger = $elm[0].querySelector(".screen-drop-down-trigger");
                            var dropDown = $elm[0].querySelector(".screen-drop-down");
                            var pos = $position.position(angular.element(dropDownTrigger));
                            dropDown.style.top = (pos.top+pos.height-1)+"px";
                            $scope.dropDownConfig.active = true;

                            $event.preventDefault();
                            $event.stopPropagation();
                        }

                        function hideDropDown(){
                            $scope.$apply(function(){
                                $scope.dropDownConfig.active = false;
                            })

                        }

                        $document.bind("click",hideDropDown)
                    }
                }
            }
        }
    }])

    .directive('graceGridScrollbarVertical',['gridUtil', '$compile', 'gridConstant', '$timeout', '$document', function(gridUtil, $compile, gridConstant, $timeout, $doc){

        return {
            restrict:"EA",
            replace:true,
            template:'<div class="grace-grid-scrollbar-v" ></div>',
            require:["^graceGrid"],
            compile:function(){

                return {
                    pre:function($scope,$elm,$attrs){
                        var _ = gridUtil,html='';

                        if(_.osType == 'osx'){

                            $elm.addClass('osx');

                            html += '<div class="scroll-handle-bar" ></div>';


                        }
                        else{

                            $elm.addClass('win')

                            html += '<div class="scroll-handle-button-up" ><i class="grace-icon-angle-up" ></i></div>' +
                                '<div class="scroll-slot" >' +
                                '<div class="scroll-handle-bar" ></div>' +
                                '</div>' +
                                '<div class="scroll-handle-button-down" ><i class="grace-icon-angle-down" ></i></div>'
                        }

                        $elm.append($compile(html)($scope))
                    },
                    post:function($scope,$elm,$attrs,ctrls){

                        var _ = gridUtil,
                            ae = angular.element,
                            ctrl = ctrls[0],
                            bodySection = $scope.gridWrapperEl.find("section");

                        var handleBar = ae($elm[0].querySelector('.scroll-handle-bar'));
                        if(_.osType == 'osx'){
                            var scrollSlot = $elm;
                        }
                        else{
                            var scrollSlot = ae($elm[0].querySelector('.scroll-slot'));
                            var handleBtnUp = ae($elm[0].querySelector('.scroll-handle-button-up'));
                            var handleBtnDown = ae($elm[0].querySelector('.scroll-handle-button-down'));

                            handleBtnUp.bind('click',function(evt){
                                $scope.$apply(function(){
                                    ctrl.infiniteScroll(1)
                                })

                            })

                            handleBtnDown.bind('click',function(evt){

                                $scope.$apply(function(){
                                    ctrl.infiniteScroll(-1)
                                })

                            })
                        }

                        scrollSlot.bind('click',function(evt){

                        });

                        var startDragHandleBar = false;
                        var lastY;
                        var curY;

                        function draggingHandler(evt){

                            evt = evt.originalEvent || evt;

                            curY = evt.pageY;
                            var offset = curY - lastY;

                            lastY = curY;
                            var handleBarTop = parseFloat(handleBar.css('top').replace('%',''));
                            var slotHeight = scrollSlot[0].clientHeight;
                            var handleBarHeight = parseFloat(handleBar.css('height').replace('%',''));
                            var offsetPercent = offset/slotHeight*100;

                            handleBarTop += offsetPercent;

                            if(handleBarTop < 0){
//                                offsetPercent -= handleBarTop
                                handleBarTop = 0;
                            }
                            if(handleBarTop > 100 - handleBarHeight){
//                                offsetPercent -= (handleBarTop - 100 + handleBarHeight)
                                handleBarTop = 100 - handleBarHeight
                            }

                            handleBar.css('top',handleBarTop+"%");

                            evt.preventDefault();
                        }


                        function stopDraggingHandler(evt){
                            startDragHandleBar = false;
                            $elm.removeClass('dragging');
                            var bodyInfo = $scope.bodyInfo;
                            var rows2Render = bodyInfo.rows2RenderCache;
                            var rows2Pinning = bodyInfo.rows2PinningCache;
                            var totalLen = rows2Render.length || (rows2Pinning && rows2Pinning.length)

                            var handleBarTop = parseFloat(handleBar.css('top').replace('%',''));
                            $scope.curStartIndex =  parseInt(handleBarTop/100*totalLen);
                            $scope.curEndIndex = $scope.curStartIndex+$scope.iSPageSize;

                            ctrl.infiniteScroll();

                            $doc.unbind('mousemove',draggingHandler);
                            $doc.unbind('mouseup',stopDraggingHandler);
                        }
                        handleBar.bind('mousedown',function(evt){
                            evt = evt.originalEvent || evt;
                            startDragHandleBar = true;

                            $elm.addClass('dragging');

                            lastY = evt.pageY;

                            $doc.bind('mousemove',draggingHandler);
                            $doc.bind('mouseup',stopDraggingHandler);

                        });

                        $scope.$watch(function(){
                            if(!$scope.bodyInfo || !$scope.bodyInfo.rows2Render || !$scope.bodyInfo.rows2RenderCache) return undefined;
                            var totalLength = $scope.bodyInfo.rows2RenderCache.length;
                            var renderLength = $scope.bodyInfo.rows2Render.length;
                            return totalLength+","+renderLength;

                        },function(val){

                            if(!val) return;

                            var lens = val.split(",");

                            $scope.scrollHandlerBarLen = Math.max(Math.ceil(lens[1]/lens[0]*100),5);

                            handleBar.css('height',$scope.scrollHandlerBarLen+"%");

                            var visible = parseInt(lens[1]) < parseInt(lens[0]);

                            $elm.css({'height':$scope.bodyInfo.height+"px",top:'auto'});

                            $elm[visible?"addClass":"removeClass"]('is-visible');

                        });

                        $scope.curStartIndex = 0;
                        $scope.iSPageSize;
                        $scope.scrollHandlerBarLen = 5;

                        ctrl.infiniteScrollStart = function infiniteScrollStart(){
                            //infiniteScrollConfig
                            if($scope.iSPageSize == undefined) getIPageSize();

                            var infiniteScrollConfig = $scope.infiniteScrollConfig;
                            var bodyInfo = $scope.bodyInfo;
                            var rows2Render = bodyInfo.rows2Render;
                            var rows2Pinning = bodyInfo.rows2Pinning;
                            var pageSize = $scope.iSPageSize;
                            $scope.curEndIndex === undefined && ($scope.curEndIndex = pageSize)
                            if($scope.curEndIndex > rows2Render.length){
                                if(rows2Render.length > pageSize){
                                    $scope.curEndIndex = rows2Render.length;
                                    $scope.curStartIndex = $scope.curEndIndex - pageSize;

                                }
                                else{
                                    $scope.curStartIndex = 0;
                                    $scope.curEndIndex = $scope.curStartIndex + pageSize;
                                }
                            }
                            bodyInfo.rows2Render = rows2Render.slice($scope.curStartIndex,$scope.curEndIndex);

                            bodyInfo.rows2RenderCache = rows2Render;

                            atTop = $scope.curStartIndex == 0;
                            atBottom = $scope.curEndIndex == rows2Render.length

                            if($scope.enablePinning){
                                bodyInfo.rows2Pinning = rows2Pinning.slice($scope.curStartIndex,$scope.curEndIndex);
                                bodyInfo.rows2PinningCache = rows2Pinning;
                            }

                            setHandleBarPosition();

                        }

                        function getIPageSize(){
                            var bodyInfo = $scope.bodyInfo,
                                bodyHeight = bodyInfo.height,
                                rowHeightCompensation = 0,
                                rowHeight = $scope.rowHeight+rowHeightCompensation,
                                left = bodyHeight%rowHeight,
                                size = Math.ceil(bodyHeight/rowHeight),
                                overflow = rowHeight - left;
                            $scope.iSPageSize = size;
                            $scope.bodyHeightOverFlow = overflow
                        }

                        /**
                         *
                         * @param direction <0 向下  >0 向上
                         */
                        var atTop = false;
                        var atBottom = false;
                        ctrl.infiniteScroll = function(delta){

//                            console.time('infiniteScroll')
                            var infiniteScrollConfig = $scope.infiniteScrollConfig;
                            var dd = infiniteScrollConfig.iStep;
                            delta = delta > 0 ? -dd : delta == 0 ? 0 : dd;

                            if(delta === 0) return;

                            var bodyInfo = $scope.bodyInfo;
                            var rows2Render = bodyInfo.rows2RenderCache;
                            var rows2Pinning = bodyInfo.rows2PinningCache;

                            if($scope.curStartIndex+delta < 0){

                                $scope.curStartIndex = 0;
                                $scope.curEndIndex = $scope.iSPageSize;

                            }
                            else if($scope.curStartIndex + $scope.iSPageSize + delta > rows2Render.length){

                                $scope.curStartIndex = rows2Render.length - $scope.iSPageSize;
                                $scope.curEndIndex = rows2Render.length;

                            }
                            else{
                                $scope.curStartIndex += delta;
                                $scope.curEndIndex += delta;
                            }

                            var tmp = rows2Render.slice($scope.curStartIndex, $scope.curEndIndex);
                            overRide(bodyInfo.rows2Render, tmp);

                            if ($scope.enablePinning) {
                                tmp = rows2Pinning.slice($scope.curStartIndex, $scope.curEndIndex);
                                overRide(bodyInfo.rows2Pinning, tmp);
                            }

                            atTop = $scope.curStartIndex == 0;
                            atBottom = $scope.curEndIndex == rows2Render.length

                            setHandleBarPosition();

//                            setTimeout(function(){
//                                console.timeEnd('infiniteScroll')
//                            },0);
                        }



                        function setHandleBarPosition(){

                            var bodyInfo = $scope.bodyInfo;
                            var rows2Render = bodyInfo.rows2RenderCache;
                            var rows2Pinning = bodyInfo.rows2PinningCache;
                            var totalLen = rows2Render.length || (rows2Pinning && rows2Pinning.length)

                            var percent = Math.floor($scope.curStartIndex*100/totalLen);

                            handleBar.css('top',percent+"%");
                        }

                        function overRide(dest,src){
                            for(var i= 0,ilen = dest.length;i<ilen;i++){
                                dest[i] = src[i];
                            }
                        }

                        var infiniteScroll = _.delayExe(function(direction){

                            ctrl.infiniteScroll(direction);
                        },50);

                        var wheelEvtName = _.browserType.firefox ? "DOMMouseScroll" : "mousewheel";

                        function getEvtDetal (event){

                            var event = event.originalEvent || event;

                            return  event.wheelDeltaY !== undefined ? event.wheelDeltaY : event.wheelDelta !== undefined ? event.wheelDelta : event.detail
                        }

                        function wheelEvtHandle(evt){

                            if(startDragHandleBar) return;

                            var direction = getEvtDetal(evt);

                            var bodyInfo = $scope.bodyInfo

                            var cssObj;
                            if(direction == 0) return;
                            if(bodyInfo.rows2Render.length >= $scope.iSPageSize){
                                if(direction > 0){
                                    cssObj = _.cssFixer("transform","translateY(0px)");

                                }
                                else {
                                    cssObj = _.cssFixer("transform","translateY(" + (-$scope.bodyHeightOverFlow) + "px)");
                                }
                                $scope.gridWrapperEl.find("section").css(cssObj)
                            }

                            infiniteScroll(getEvtDetal(evt))

                            if(!evt.wheelDeltaX && !(atTop && direction > 0) && !(atBottom && direction < 0)){
                                evt.preventDefault();
                            }
                        }

                        function wrapperScrollHandle(evt){

                            var scrollLeft = $scope.gridWrapperEl[0].scrollLeft;

                            var cssObj = gridUtil.cssFixer("transform","translateX(" + scrollLeft + "px)");

                            $elm.css(cssObj);

                        }

                        $scope.bindInfiniteScroll = function(){
                            $scope.unbindInfiniteScroll();

                            $scope.gridWrapperEl.bind(wheelEvtName,wheelEvtHandle)
                                .bind('scroll',wrapperScrollHandle);
                        }

                        $scope.unbindInfiniteScroll = function(){

                            $scope.gridWrapperEl.unbind(wheelEvtName,wheelEvtHandle)
                                .unbind('scroll',wrapperScrollHandle)

                        }

                        $scope.bindInfiniteScroll();
                    }
                }
            }
        }

    }])

    .factory("gridUtil",['$timeout', function($timeout){
        var util ={}
        util.newId = (function(){
            var id = new Date().getTime();
            return function(){
                return id += 1;
            }
        })();
        util.isEmptyObject = function(val){
            if(typeof val == 'object' ){
                for(var p in val){
                    return false;
                }
            }
            return true;
        }
        util.formatStr = function(str){

            var args = arguments;

            return str.replace(/{(\d+)}/g,function(a,b,i){
                return args[b];
            })

        }
        util.copy2DArray = function copy2DArray(src){
            var dest = [];
            for(var i= 0,ir;(ir = src[i]);i++){
                var ta = [];
                for(var j= 0,jc;(jc = ir[j]);j++){
                    ta.push(jc);
                }
                dest.push(ta);
            }
            return dest;
        }
        util.getStyles = function getStyles(elem) {
            var e = elem;
            if (typeof(e.length) !== 'undefined' && e.length) {
                e = elem[0];
            }
            return e.ownerDocument.defaultView.getComputedStyle(e, null);
        }

        /*util.getStyles = function(node){
         var style = null;
         if (typeof(node.length) !== 'undefined' && node.length) {
         node = node[0];
         }
         if(window.getComputedStyle) {
         style = window.getComputedStyle(node, null);
         }else{
         style = node.currentStyle;
         }

         return style;
         }*/

        /*util.delayExec = function delayExe(func,cd){
         var isCd = true;
         return function(arg){
         if(isCd){
         func(arg);
         isCd = false;
         setTimeout(function(){
         isCd = true;
         },cd);
         }
         }
         }*/

        util.delayExe = function(func,cd){
            var isCd = true;
            var startFunc = func;
            return function(arg){
                if(isCd){
                    startFunc && startFunc(arg);
                    startFunc = null;
                    isCd = false;
                    $timeout(function(){
                        func(arg);
                        isCd = true;
                    },cd);
                }
            }
        }

        util.browserType = (function(){
            var ua = navigator.userAgent;
            return {
                ie:/MSIE/i.test(ua) || /trident/i.test(ua),
                chrome:/chrome.*safari/i.test(ua),
                safari:/version.*safari/i.test(ua),
                firefox:/gecko.*firefox/i.test(ua)
            }

        })();

        util.osType = (function(){
            var pt = navigator.platform;
            if(/mac/i.test(pt)) return 'osx';
            if(/win/i.test(pt)) return 'windows';
            if(/x11/i.test(pt)) return 'unix';
            if(/linux/i.test(pt)) return 'linux';
            return 'other';
        })();

        util.getScrollBarInfo = function(){
            var elo = document.createElement('div');
            elo.style.cssText = "position:absolute;left:0;top:0;width:100px;height:100px;overflow:scroll;visibility:hidden";
            document.body.appendChild(elo);
            var rslt = {
                verticalBarWidth:elo.offsetWidth - elo.clientWidth,
                horizontalBarHeight:elo.offsetHeight - elo.clientHeight
            }
            document.body.removeChild(elo);
            return rslt;
        }

        var need2Hack = {
            transform:true,
            "box-shadow":true
        };

        util.register2Hack = function(css){
            need2Hack[css] = true;
        }

        function makeCssObj(cssProperty,cssValue){
            var prefixes = ['webkit','Moz','ms','o'];
            var rslt = {};
            for(var i= 0,ilen = prefixes.length;i<ilen;i++){
                rslt[prefixes[i] + cssProperty.replace(/^\w/,cssProperty[0].toUpperCase())] = cssValue;
            }
            return rslt;
        }

        util.cssFixer = function(){

            if(arguments.length == 2){
                if(need2Hack[arguments[0]])
                    return makeCssObj.apply(null,arguments);
                else
                    return arguments;
            }
            else{
                var cssObj = arguments[0];
                var objs = [cssObj];
                for(var p in cssObj){
                    objs.push(makeCssObj(p,cssObj[p]));
                }
                angular.extend.apply(angular,objs);
            }
            return cssObj;
        }

        util.isElementVisible = function(el){

            while(el[0] && el[0] != document){
                if(util.getStyles(el)['display'] !== 'none'){
                    el = el.parent();
                }
                else{
                    return false
                }
            }
            return true;

        }

        util.forEach = function(ary,fn){
            if(!fn) return;
            for(var i= 0,len = ary.length;i<len;i++){
                fn && fn(ary[i],i);
            }
        }

        util.json2query = function(obj){
            var res = []
            for(var p in obj){
                res.push(p+"="+obj[p]);
            }
            return res.join("&");
        }

        util.isEmptyObj = function(obj){
            if(!obj) return true;
            for(var p in obj){
                return false;
            }
            return true;
        }

        return util;
    }])
    .directive('graceGridStyle', ['gridUtil', '$interpolate', function (gridUtil, $interpolate) {
        return {
            // restrict: 'A',
//            priority: 1000,
            // require: '?^uiGrid',
            link: function ($scope, $elm, $attrs, uiGridCtrl) {
                var interpolateFn = $interpolate($elm.text(), true);
                if (interpolateFn) {
                    $scope.$watch(interpolateFn, function (value) {
                        $elm.text(value);
                    });
                }
            }
        };
    }])
/**
 * Created by lvu on 3/18/15.
 */

angular.module('grace.bootstrap.input', [])

    .constant('graceInputConstant', {
        enter: '请输入',
        type: ['text', 'number', 'password'],
        typeReg: {
            number: /^[-\+]?\d+(\.\d+)?$/
        },
        requireText: '该字段不能为空'
    }).factory('graceInputService', ['graceInputConstant', function (constant) {
        /**
         * 格式化配置
         * @param config
         */
        function formatConfig (config) {
            if (!angular.isObject(config.label)) {
                config.label = {
                    text: config.label,
                    style: {}
                };
            }
            if (config.input) {
                config.input.type && (constant.type.indexOf(config.input.type) == -1) && (config.input.type = '');
            }
            if (angular.isUndefined(config.$v)) {
                config.$v = {};
            }
            angular.isUndefined(config.value) && (config.value = '');
            return config;
        }

        function isEmpty (value) {
            return angular.isUndefined(value) || value === '' || value === null || value !== value;
        }

        return {
            formatConfig: formatConfig,
            isEmpty: isEmpty
        };
    }]).directive('graceInput', ['graceInputService', 'graceInputConstant', function (graceInputService, constant) {
        return {
            restrict: 'EA',
            replace: true,
            require: ['^?graceFieldManager'],
            templateUrl: 'template/input/input.html',
            scope: {
                config: '='
            },
            link: function ($scope, iElement, attrs, ctrls) {
                //一些变量
                $scope.first = true;
                //DOM处理
                //第一次点击 input 之后，就可以显示提示了
                iElement.find('input').blur(function () {
                    $scope.$apply(function () {
                        $scope.first = false;
                    });
                });

                //处理配置
                $scope.$watch('config', function (newValue, oldValue) {
                    if (newValue) {
                        graceInputService.formatConfig($scope.config);  //格式化配置
                        var v, t,
                            $v = $scope.config.$v, //所有的提示信息保存在$v中
                            ok = true;
                        if (newValue.input) {
                            //自定义校验
                            if (v = newValue.input.valid) {
                                var r = v.validFn.call(this, newValue.value);   //每次值发生变化的时候，就进行一次验证
                                if (!r || (angular.isArray(r) && !r[0])) {
                                    $v.text = !r ? v.inValidText : r[1];
                                    ok = false;
                                }
                            }
                            //默认校验
                            if (graceInputService.isEmpty(newValue.value)) {
                                //必需字段校验
                                if (angular.isDefined(newValue.input.require) && newValue.input.require) {
                                    $v.text = constant.requireText;
                                    ok = false;
                                }
                            } else {
                                //数字校验(如果当前值不是数字，则保持上一次的值)
                                ((t = newValue.input.type) == 'number') && (!constant.typeReg[t].test(newValue.value)) && (newValue.value = oldValue.value);
                                //长度校验
                                newValue.input.maxLength && newValue.input.maxLength < newValue.value.length && (newValue.value = oldValue.value);
                            }

                            ok && ($v.text = '');
                        }
                    }
                }, true);

                //实现form接口-----------------------------------------

                //获取值
                $scope.getValue = function () {
                    return $scope.config.value;
                };

                //获取名称
                $scope.getName = function () {
                    return $scope.config.input ? $scope.config.input.name : '';
                };

                //组件注册
                if (ctrls.length) {
                    ctrls[0] && ctrls[0].addField({
                        type: 'input',
                        element: iElement,
                        scope: $scope
                    });
                }
            }
        };
    }]);
angular.module('grace.bootstrap.transition', [])

/**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
.factory('$transition', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope) {

  var $transition = function(element, trigger, options) {
    options = options || {};
    var deferred = $q.defer();
    var endEventName = $transition[options.animation ? 'animationEndEventName' : 'transitionEndEventName'];

    var transitionEndHandler = function(event) {
      $rootScope.$apply(function() {
        element.unbind(endEventName, transitionEndHandler);
        deferred.resolve(element);
      });
    };

    if (endEventName) {
      element.bind(endEventName, transitionEndHandler);
    }

    // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
    $timeout(function() {
      if ( angular.isString(trigger) ) {
        element.addClass(trigger);
      } else if ( angular.isFunction(trigger) ) {
        trigger(element);
      } else if ( angular.isObject(trigger) ) {
        element.css(trigger);
      }
      //If browser does not support transitions, instantly resolve
      if ( !endEventName ) {
        deferred.resolve(element);
      }
    });

    // Add our custom cancel function to the promise that is returned
    // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
    // i.e. it will therefore never raise a transitionEnd event for that transition
    deferred.promise.cancel = function() {
      if ( endEventName ) {
        element.unbind(endEventName, transitionEndHandler);
      }
      deferred.reject('Transition cancelled');
    };

    return deferred.promise;
  };

  // Work out the name of the transitionEnd event
  var transElement = document.createElement('trans');
  var transitionEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'transition': 'transitionend'
  };
  var animationEndEventNames = {
    'WebkitTransition': 'webkitAnimationEnd',
    'MozTransition': 'animationend',
    'OTransition': 'oAnimationEnd',
    'transition': 'animationend'
  };
  function findEndEventName(endEventNames) {
    for (var name in endEventNames){
      if (transElement.style[name] !== undefined) {
        return endEventNames[name];
      }
    }
  }
  $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
  $transition.animationEndEventName = findEndEventName(animationEndEventNames);
  return $transition;
}]);

angular.module('grace.bootstrap.modal', ['grace.bootstrap.transition'])

/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function () {
    return {
      createNew: function () {
        var stack = [];

        return {
          add: function (key, value) {
            stack.push({
              key: key,
              value: value
            });
          },
          get: function (key) {
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                return stack[i];
              }
            }
          },
          keys: function() {
            var keys = [];
            for (var i = 0; i < stack.length; i++) {
              keys.push(stack[i].key);
            }
            return keys;
          },
          top: function () {
            return stack[stack.length - 1];
          },
          remove: function (key) {
            var idx = -1;
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                idx = i;
                break;
              }
            }
            return stack.splice(idx, 1)[0];
          },
          removeTop: function () {
            return stack.splice(stack.length - 1, 1)[0];
          },
          length: function () {
            return stack.length;
          }
        };
      }
    };
  })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
  .directive('modalBackdrop', ['$timeout', function ($timeout) {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/modal/backdrop.html',
      link: function (scope, element, attrs) {
        scope.backdropClass = attrs.backdropClass || '';

        scope.animate = false;

        //trigger CSS transitions
        $timeout(function () {
          scope.animate = true;
        });
      }
    };
  }])

  .directive('modalWindow', ['$modalStack', '$timeout', function ($modalStack, $timeout) {
    return {
      restrict: 'EA',
      scope: {
        index: '@',
        animate: '='
      },
      replace: true,
      transclude: true,
      templateUrl: function(tElement, tAttrs) {
        return tAttrs.templateUrl || 'template/modal/window.html';
      },
      link: function (scope, element, attrs) {
        element.addClass(attrs.windowClass || '');
        scope.size = attrs.size;

        $timeout(function () {
          // trigger CSS transitions
          scope.animate = true;

          /**
           * Auto-focusing of a freshly-opened modal element causes any child elements
           * with the autofocus attribute to loose focus. This is an issue on touch
           * based devices which will show and then hide the onscreen keyboard.
           * Attempts to refocus the autofocus element via JavaScript will not reopen
           * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
           * the modal element if the modal does not contain an autofocus element.
           */
          if (!element[0].querySelectorAll('[autofocus]').length) {
            element[0].focus();
          }
        });

        scope.close = function (evt) {
          var modal = $modalStack.getTop();
          if (modal && modal.value.backdrop && modal.value.backdrop != 'static' && (evt.target === evt.currentTarget)) {
            evt.preventDefault();
            evt.stopPropagation();
            $modalStack.dismiss(modal.key, 'backdrop click');
          }
        };
      }
    };
  }])

  .directive('modalTransclude', function () {
    return {
      link: function($scope, $element, $attrs, controller, $transclude) {
        $transclude($scope.$parent, function(clone) {
          $element.empty();
          $element.append(clone);
        });
      }
    };
  })

  .factory('$modalStack', ['$transition', '$timeout', '$document', '$compile', '$rootScope', '$$stackedMap',
    function ($transition, $timeout, $document, $compile, $rootScope, $$stackedMap) {

      var OPENED_MODAL_CLASS = 'modal-open';

      var backdropDomEl, backdropScope;
      var openedWindows = $$stackedMap.createNew();
      var $modalStack = {};

      function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
          if (openedWindows.get(opened[i]).value.backdrop) {
            topBackdropIndex = i;
          }
        }
        return topBackdropIndex;
      }

      $rootScope.$watch(backdropIndex, function(newBackdropIndex){
        if (backdropScope) {
          backdropScope.index = newBackdropIndex;
        }
      });

      function removeModalWindow(modalInstance) {

        var body = $document.find('body').eq(0);
        var modalWindow = openedWindows.get(modalInstance).value;

        //clean up the stack
        openedWindows.remove(modalInstance);

        //remove window DOM element
        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, 300, function() {
          modalWindow.modalScope.$destroy();
          body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);
          checkRemoveBackdrop();
        });
      }

      function checkRemoveBackdrop() {
          //remove backdrop if no longer needed
          if (backdropDomEl && backdropIndex() == -1) {
            var backdropScopeRef = backdropScope;
            removeAfterAnimate(backdropDomEl, backdropScope, 150, function () {
              backdropScopeRef.$destroy();
              backdropScopeRef = null;
            });
            backdropDomEl = undefined;
            backdropScope = undefined;
          }
      }

      function removeAfterAnimate(domEl, scope, emulateTime, done) {
        // Closing animation
        scope.animate = false;

        var transitionEndEventName = $transition.transitionEndEventName;
        if (transitionEndEventName) {
          // transition out
          var timeout = $timeout(afterAnimating, emulateTime);

          domEl.bind(transitionEndEventName, function () {
            $timeout.cancel(timeout);
            afterAnimating();
            scope.$apply();
          });
        } else {
          // Ensure this call is async
          $timeout(afterAnimating);
        }

        function afterAnimating() {
          if (afterAnimating.done) {
            return;
          }
          afterAnimating.done = true;

          domEl.remove();
          if (done) {
            done();
          }
        }
      }

      $document.bind('keydown', function (evt) {
        var modal;

        if (evt.which === 27) {
          modal = openedWindows.top();
          if (modal && modal.value.keyboard) {
            evt.preventDefault();
            $rootScope.$apply(function () {
              $modalStack.dismiss(modal.key, 'escape key press');
            });
          }
        }
      });

      $modalStack.open = function (modalInstance, modal) {

        openedWindows.add(modalInstance, {
          deferred: modal.deferred,
          modalScope: modal.scope,
          backdrop: modal.backdrop,
          keyboard: modal.keyboard
        });

        var body = $document.find('body').eq(0),
            currBackdropIndex = backdropIndex();

        if (currBackdropIndex >= 0 && !backdropDomEl) {
          backdropScope = $rootScope.$new(true);
          backdropScope.index = currBackdropIndex;
          var angularBackgroundDomEl = angular.element('<div modal-backdrop></div>');
          angularBackgroundDomEl.attr('backdrop-class', modal.backdropClass);
          backdropDomEl = $compile(angularBackgroundDomEl)(backdropScope);
          body.append(backdropDomEl);
        }

        var angularDomEl = angular.element('<div modal-window></div>');
        angularDomEl.attr({
          'template-url': modal.windowTemplateUrl,
          'window-class': modal.windowClass,
          'size': modal.size,
          'index': openedWindows.length() - 1,
          'animate': 'animate'
        }).html(modal.content);

        var modalDomEl = $compile(angularDomEl)(modal.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;
        body.append(modalDomEl);
        body.addClass(OPENED_MODAL_CLASS);
      };

      $modalStack.close = function (modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
          modalWindow.value.deferred.resolve(result);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.dismiss = function (modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
          modalWindow.value.deferred.reject(reason);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.dismissAll = function (reason) {
        var topModal = this.getTop();
        while (topModal) {
          this.dismiss(topModal.key, reason);
          topModal = this.getTop();
        }
      };

      $modalStack.getTop = function () {
        return openedWindows.top();
      };

      return $modalStack;
    }])

  .provider('$modal', function () {

    var $modalProvider = {
      options: {
        backdrop: true, //can be also false or 'static'
        keyboard: true
      },
      $get: ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$modalStack',
        function ($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {

          var $modal = {};

          function getTemplatePromise(options) {
            return options.template ? $q.when(options.template) :
              $http.get(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl,
                {cache: $templateCache}).then(function (result) {
                  return result.data;
              });
          }

          function getResolvePromises(resolves) {
            var promisesArr = [];
            angular.forEach(resolves, function (value) {
              if (angular.isFunction(value) || angular.isArray(value)) {
                promisesArr.push($q.when($injector.invoke(value)));
              }
            });
            return promisesArr;
          }

          $modal.open = function (modalOptions) {

            var modalResultDeferred = $q.defer();
            var modalOpenedDeferred = $q.defer();

            //prepare an instance of a modal to be injected into controllers and returned to a caller
            var modalInstance = {
              result: modalResultDeferred.promise,
              opened: modalOpenedDeferred.promise,
              close: function (result) {
                $modalStack.close(modalInstance, result);
              },
              dismiss: function (reason) {
                $modalStack.dismiss(modalInstance, reason);
              }
            };

            //merge and clean up options
            modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
            modalOptions.resolve = modalOptions.resolve || {};

            //verify options
            if (!modalOptions.template && !modalOptions.templateUrl) {
              throw new Error('One of template or templateUrl options is required.');
            }

            var templateAndResolvePromise =
              $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));


            templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

              var modalScope = (modalOptions.scope || $rootScope).$new();
              modalScope.$close = modalInstance.close;
              modalScope.$dismiss = modalInstance.dismiss;

              var ctrlInstance, ctrlLocals = {};
              var resolveIter = 1;

              //controllers
              if (modalOptions.controller) {
                ctrlLocals.$scope = modalScope;
                ctrlLocals.$modalInstance = modalInstance;
                angular.forEach(modalOptions.resolve, function (value, key) {
                  ctrlLocals[key] = tplAndVars[resolveIter++];
                });

                ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                if (modalOptions.controller) {
                  modalScope[modalOptions.controllerAs] = ctrlInstance;
                }
              }

              $modalStack.open(modalInstance, {
                scope: modalScope,
                deferred: modalResultDeferred,
                content: tplAndVars[0],
                backdrop: modalOptions.backdrop,
                keyboard: modalOptions.keyboard,
                backdropClass: modalOptions.backdropClass,
                windowClass: modalOptions.windowClass,
                windowTemplateUrl: modalOptions.windowTemplateUrl,
                size: modalOptions.size
              });

            }, function resolveError(reason) {
              modalResultDeferred.reject(reason);
            });

            templateAndResolvePromise.then(function () {
              modalOpenedDeferred.resolve(true);
            }, function () {
              modalOpenedDeferred.reject(false);
            });

            return modalInstance;
          };

          return $modal;
        }]
    };

    return $modalProvider;
  });

angular.module('grace.bootstrap.nav', [])
    
    .directive('graceNav', ['$rootScope', function($rootScope){
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'template/nav/nav.html',
            scope:{
                navsData:"=",
                vm:"="
            },
            link: function($scope, $element, attr, ctrls){

            }
        }
    }]);
angular.module('grace.bootstrap.radio', [])
    .factory('radioService', [function () {
        /**
         * 确保 f 是一个函数，否则返回一个空函数
         * @param f
         * @returns {*}
         */
        function fn (f) {
            return angular.isFunction(f) ? f : angular.noop;
        }

        return {
            fn: fn
        };
    }])
    .controller('RadioController', ['$scope', 'radioService', function ($scope, radioService) {
        if (!$scope.data) {
            $scope.data = {setting: {}, list: []};
        }

        //配置的默认值
        $scope.radioConfig = {
            selectIndex: 0,             //默认选中的索引值
            extraCSS: 'default',        //附加的css样式
            callback: {                 //支持的回调： onClick，和 onChange
                onChange: null          //选项发生变化时触发
            }
        };

        //使用用户的设置覆盖默认的设置
        var updateRadioConfig = function (setting) {
            angular.extend($scope.radioConfig, setting);
        };

        //用户设置发生变化的适合，得重新格式化一下组建的设置
        $scope.$watch('data.setting', function (newValue) {
            updateRadioConfig(newValue);
            $scope.select($scope.radioConfig.selectIndex);   //选中当前的index
        });

        //设置或者获取当前选中的索引
        $scope.select = function (index) {
            if (arguments.length) {
                $scope.currentSelect = index;
            } else {
                return $scope.currentSelect;
            }
        };

        //获取当前选中的项
        $scope.getCurrentItem = function () {
            return {
                item: $scope.data.list[$scope.currentSelect],
                index: $scope.currentSelect
            };
        };

        //根据过滤函数选中某个item
        $scope.selectByFilter = function (filter) {
            if (angular.isFunction(filter)) {
                var list = $scope.data.list;
                for (var i = 0, len = list.length; i < len; i++) {
                    if (filter(list[i], i, list)) {
                        $scope.select(i);
                        break;
                    }
                }
            }
        };

        //监听选中项的变化，调用回调
        $scope.$watch('currentSelect', function (newValue, oldValue) {
            radioService.fn($scope.radioConfig.callback.onChange)($scope.data.list[newValue], newValue, $scope.data.list);
            $scope.result = $scope.data.list[newValue];
        });

    }])
    .directive('graceRadio', ['radioService', function (radioService) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                data: '=?graceRadio',
                result: '=?result'
            },
            templateUrl: 'template/radio/radio.html',
            controller: 'RadioController',
            link: function ($scope, iElement, attrs, ctrls) {
                //code...
            }
        };
    }]);
/**
 * Created by lvu on 4/9/15.
 */
/**
 * Created by lvu on 4/7/15.
 */

angular.module('grace.bootstrap.select', ['grace.bootstrap.dropdown'])

    .directive('graceSelect', [function () {
        return {
            restrict: 'EA',
            replace: true,
            require: ['^?graceFieldManager'],
            templateUrl: 'template/select/select.html',
            scope: {
                config: '='
            },
            link: function ($scope, iElement, attrs, ctrls) {
                var v = $scope.config.value;

                $scope.selectItem = function (item) {
                    $scope.currentItem = item;
                };

                /**
                 * 使用过滤函数选中某项
                 * @param filter
                 */
                $scope.select = function (filter) {
                    if (angular.isFunction(filter)) {
                        var list = $scope.config.list;
                        for (var i = 0, len = list.length; i < len; i++) {
                            if (filter(list[i], i, list)) {
                                $scope.selectItem(list[i]);
                                break;
                            }
                        }
                    }
                };

                if (angular.isDefined(v)) {   //如果定义了value，使用value初始化
                    $scope.select(function (item) {
                        return item.value === v;
                    });
                }

                $scope.$watch('currentItem', function (newValue, oldValue) {
                    if (angular.isDefined(newValue)) {
                        $scope.config.value = newValue.value;
                    }
                });

                iElement.find('div.item-select').focus(function () {
                    $(this).addClass('focus');
                }).blur(function () {
                    $(this).removeClass('focus');
                });

                //实现form接口-----------------------------------------

                //获取值
                $scope.getValue = function () {
                    return $scope.config.value;
                };

                //获取名称
                $scope.getName = function () {
                    return $scope.config.input ? $scope.config.input.name : '';
                };

                //组件注册
                if (ctrls.length) {
                    ctrls[0] && ctrls[0].addField({
                        type: 'select',
                        element: iElement,
                        scope: $scope
                    });
                }

                //发布api接口
                $scope.config.api = {
                    select: $scope.select,
                    selectItem: $scope.selectItem
                };
            }
        };
    }]);


var app = angular.module("grace.bootstrap.selectByGroup",['grace.bootstrap.position'])


    .controller("selectByGroupController",["$scope", "$http", function($scope,$http){

        var titleList = ['A-E', 'F-J','K-O','P-T','U-Z'];
        $scope.curCode = '';
        $scope.$watch('data', function(){
            if( !$scope.data || !$scope.data.length){
                return;
            }
            $scope.baseFirst = $scope.data[0];
            $scope.curCode = $scope.baseFirst.code;
            if($scope.curCode == 'own'){
                $scope.selectionData = $scope.baseFirst.children;
            }
            else{
                $scope.selectionData = {title: [], body: []};
                $scope.selectionData['title'] = titleList;
                for(var i = 0, iData; (iData = titleList[i]); i++){
                    $scope.selectionData['body'].push($scope.baseFirst.children[iData]);
                }
            }
            $scope.changTitle(0);
        });
        

        $scope.changeSelectionShow = function(){
            //$scope.selectionShow = !$scope.selectionShow;
        }

        $scope.changTitle = function(idx){
            $scope.index = idx;
            if($scope.curCode == 'own'){
                $scope.curDataList = $scope.selectionData;     
            }
            else{
                $scope.curTitle = $scope.selectionData['title'][idx];
                $scope.curDataList = $scope.selectionData['body'][idx];       
            }
            
        }

        
        $scope.doSearch = function(keyword){
            $scope.searchResult23 = searchNode(keyword,$scope.curDataList,function(node){
                return node.name.indexOf(keyword) != -1 ;
            })
            $scope.searchResult23Empty = isEmptyObj($scope.searchResult23);
            $scope.$apply();

        };

        function isEmptyObj(obj){
            for(var p in obj){
                return false;
            }
            return true;
        }

        function searchNode(keyword,node,filter){

            var res = {};

            iterateNodes(node,res,filter);

            return res;
        }
        function iterateNodes(node,ni,filter){
            for(var i= 0,idata;(idata = node[i]);i++){
                if(!filter || filter(idata)){
                    ni[idata.code] = idata;
                }
            }
        }

        $scope.nodeClick = function(item){
            $scope.ngModel = item;
            $scope.ngModel['pid'] = $scope.curCode;
            angular.element(".selectionList").hide();
            angular.element(".selectByGroup").parent().css('height', 'auto');
        }

    }])

    

    .directive("graceSelectByGroup",["$window", "$position", function(win, pos){

        return {
            restrict:"EA",
            require:['graceSelectByGroup', '^ngModel'],
            controller:"selectByGroupController",
            templateUrl:"template/selectByGroup/selectByGroup.html",
            replace:true,
            scope:{
                data: '=',
                ngModel: '=' 
            },
            link:function(scope,element,attr,ctrl){

                var awin = angular.element(win);
                var dimensionContainer23 = null;
                awin.on("click",function(){

                    scope.$apply(function(){
                        angular.element(".selectionList", element).hide();
                    });

                    dimensionContainer23 && dimensionContainer23.css({height:"auto"});
                }); 

                angular.element('.selectionList').on('click', function(evt){
                    evt.originalEvent.cancelBubble = true;
                });

                element.on("click",".selection",function(evt){
                    /*if($(this).text().indexOf('我的') > -1){
                        if(!scope.selectionData.length){
                            return;
                        }    
                    }*/
                    if(angular.isArray(scope.selectionData)){
                        if(!scope.selectionData.length){
                            return;
                        }   
                    }
                    
                    angular.element(".selectionList").hide();
                    curEl = angular.element(evt.currentTarget);

                    var elParent = curEl.parent();
                    var position = pos.position(elParent);
                    var offset = pos.offset(elParent);
                    var dimension23 = angular.element(".selectionList", element);
                    dimension23.toggle();
                    var dl = dimensionContainer23 = curEl.parent().parent();
                    dl.css({
                        height:"auto"
                    })
                    var dlPos = pos.offset(dl);
                    //dl.append(dimension23);

                    dimension23.css({
                        top:offset.top+offset.height+8-dlPos.top,
                        left:0
                    })

                    dimension23.find(".selection-arrow").css({
                        left:position.left+position.width/2
                    })

                    var dim23Pos = pos.offset(dimension23);
                    if(dim23Pos.top+dim23Pos.height>dlPos.height+dlPos.top){
                        dl.css({
                            height:dim23Pos.top-dlPos.top+dim23Pos.height
                        });
                    }

                    evt.originalEvent.cancelBubble = true;

                }); 

                function delayExe(func,cd){
                    var isCd = true;
                    return function(arg){
                        if(isCd){
                            func(arg);
                            isCd = false;
                            setTimeout(function(){
                                isCd = true;
                            },cd);
                        }
                    }
                } 

                var doSearch = delayExe(function(arg){
                    var el = angular.element(arg.target);
                    var val = el.val();
                    if(val){
                        scope.doSearch(val);
                    }
                    else{
                        el.parent().find(".selection-search-searchbtn").triggerHandler("click");
                    }
                },100);

            element.find(".selection-search-searchbox").bind("keyup",doSearch);   

            }
        }

    }]);

angular.module('grace.bootstrap.string', [])

.service('$gStringService', [function() {

  var self = this;

  self.trim = function(input){
      return input.replace(/(^\s+)|(\s+$)|(^　+)|(　+$)/g, "");
  };

  self.ltrim = function(input){
      return input.replace(/(^\s+)|(^　+)/g,""); 
  };

  self.rtrim = function(input){
      return input.replace(/(\s+$)|(　+$)/g,"");
  };

  self.isNumber = function(input) {
      return (input.isInt() || input.isFloat() || input.isPercent());
  };

  self.isFloat = function(input) {
      return /^(?:-?|\+?)\d+(,\d\d\d)*\.\d+$/g.test(input);
  };

  self.isInt = function(input) {
      return /^(?:-?|\+?)\d+(,\d\d\d)*$/g.test(input);
  };

  self.isPercent = function(input) {
      return /^(?:-?|\+?)\d+(,\d\d\d)*(\.\d+)?\%$/g.test(input);
  };

  self.isPlus = function(input) {
      return self.isPlusInt() || self.isPlusFloat();
  };

  self.isPlusFloat = function(input) {
      return /^\+?\d*\.\d+$/g.test(input);
  };

  self.isPlusInt = function(input) {
      return /^\+?\d+$/.test(input);
  };

  self.isMinus = function(input) {
      return self.isMinusInt() || self.isMinusFloat();
  };

  self.isMinusFloat = function(input) {
      return /^-\d*\.\d+$/g.test(input);
  };

  self.isMinusInt = function(input) {
      return /^-\d+$/g.test(input);
  };

  self.isLeastCharSet = function(input) {
      return !(/[^A-Za-z0-9_]/g.test(input));
  };

  self.isEmail = function(input) {
      return /^\w+@.+\.\w+$/g.test(input);
  };

  self.isZip = function(input) {
      return /^\d{6}$/g.test(input);
  };

  self.isPhone = function(input) {
      return /^(\d{2,4}-)?((\(\d{3,5}\))|(\d{3,5}-))?\d{3,18}(-\d+)?$/g.test(input);
  };

  self.isMobile = function(input) {
      return /^((13)|(15))\d{9}$/g.test(input);
  };

  self.isTel = function(input) {
      return self.isMobileTelephone() || self.isFixedTelephone();
  };

  self.hasMark = function(input) {
      var reg = new RegExp("("+_mark+")","g");
      return ((input.match(reg))?(input.match(reg)).length:0)>0;
  };

  self.getLen = function(input) {
      var cArr = input.match(/[^\x00-\xff]/ig);
      return input.length + (cArr==null?0:cArr.length);
  };

  self.encodeHtml = function(input){
      var REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g,
      s = input.toString();
      return (typeof s != "string") ? s :
          s.replace(REGX_HTML_ENCODE,
              function($0){
                  var c = $0.charCodeAt(0), r = ["&#"];
                  c = (c == 0x20) ? 0xA0 : c;
                  r.push(c); r.push(";");
                  return r.join("");
              });
  };

        /**
         * 占位符从1开始
         * @param str
         * @returns {*}
         */
  self.format = function(str){

      var args = arguments;

      return str.replace(/{(\d+)}/g,function(a,b,i){
          return args[b];
      })

  }

  self.decodeHtml = function(input){
      var REGX_HTML_DECODE = /&\w+;|&#(\d+);/g,
      HTML_DECODE = {
          "&lt;" : "<",
          "&gt;" : ">",
          "&amp;" : "&",
          "&nbsp;": " ",
          "&quot;": "\"",
          "&copy;": ""
          // Add more
      },
      s = input.toString();
      return (typeof s != "string") ? s :
          s.replace(REGX_HTML_DECODE,
              function($0, $1){
                  var c = HTML_DECODE[$0];
                  if(c == undefined){
                      // Maybe is Entity Number
                      if(!isNaN($1)){
                          c = String.fromCharCode(($1 == 160) ? 32:$1);
                      }else{
                          c = $0;
                      }
                  }
                  return c;
              });
    };

}]);

/**
 * Created by cindy on 14/12/11.
 * 概览组件
 */

angular.module("grace.bootstrap.summary", ["grace.bootstrap.tooltip"])

    .constant("summaryConfig", {
        footLeft:{},
        footRight:{},
        mainValue:{},
        //最多展示几条概览
        maxItemCount:5,
        deepWatch:false
    })

    .controller("summaryController", ["$scope", "summaryConfig", "summaryFactory", "$attrs", function ($scope, summaryConfig, summaryFactory, $attrs) {

        //选中条目在页面展示中的索引值
        $scope.selectedIndex = 0;

        //当前的概览数据
        $scope.curSummrayData = null;
        //益处的概览数据
        $scope.overFlowData = null;
        //在益出的概览数据中选中的
        $scope.selectedOverFlow = null;
        //溢出概览数据中选中的索引
        $scope.selectedOverFlowIndex = 0;

        //获取配置信息
        if($attrs["summaryOptions"]){
            $scope.options = $scope.$parent.$eval($attrs["summaryOptions"]);
        }

        var self = this;

        //最多展示条目
        if($scope.options){
            $scope.maxItemCount = $scope.options.maxItemCount || summaryConfig.maxItemCount;
        }

        if($scope.options){
            $scope.deepWatch = $scope.options.deepWatch || summaryConfig.deepWatch;
        }

//        $scope.triggerSelectOnLoaded = $attrs['triggerSelectOnLoaded'] ? $scope.$parent.$eval($attrs['triggerSelectOnLoaded']) : summaryConfig.triggerSelectOnLoaded;

        //条目点击响应
        $scope.itemClick = function(index,$event){

            if($scope.summaryData[index].disable){
                return;
            }

            $scope.selectedIndex = index;

            $scope.onSelect && $scope.onSelect(index,$scope.summaryData[index]);
        }

        //溢出的条目点击响应
        $scope.overFlowItemClick = function($event){

            if(!$scope.selectedOverFlow) return;
            //
            if($scope.selectedOverFlowIndex == 0) return;

            $scope.selectedIndex = $scope.maxItemCount-1;

//            var index = $scope.overFlowData.indexOf($scope.selectedOverFlow);

            $scope.onSelect && $scope.onSelect($scope.maxItemCount+$scope.selectedOverFlowIndex - 2,$scope.selectedOverFlow);

        }

        $scope.onSelectClick = function($event){
            $event.preventDefault();
            $event.stopPropagation();
        }

        $scope.overFlowItemChanged = function($event){

            $scope.selectedOverFlowIndex = $scope.overFlowData.indexOf($scope.selectedOverFlow);

            if($scope.selectedOverFlowIndex == 0) return;

            $scope.selectedIndex = $scope.maxItemCount-1;

            self.odometerUpdateByIndex($scope.selectedIndex);

            $scope.onSelect && $scope.onSelect($scope.maxItemCount+$scope.selectedOverFlowIndex - 2,$scope.selectedOverFlow);
        }

        this.updateData = function(data){

            if(!data) return;

            var tmp = summaryFactory.formatData(data,$scope);

            if(tmp.length > $scope.maxItemCount){
                $scope.curSummaryData = tmp.slice(0,$scope.maxItemCount-1);
                $scope.overFlowData = tmp.slice($scope.maxItemCount-1);

                $scope.overFlowData.unshift({title:"请选择"});

                $scope.selectedOverFlow = $scope.overFlowData[$scope.selectedOverFlowIndex]
            }
            else{
                $scope.curSummaryData = tmp;
            }
        }

    }])

    /*
     * 订单汇总service
     **/
    .factory('summaryFactory', ["$filter",function ($filter) {

        var options = null;

        function formatValue(value,valueTemplate){
            var res = {
                value:"",
                style:"",
                class:"",
                format:""
            };
            valueTemplate && (res = angular.extend(res,valueTemplate));
            if(typeof value == "string"){
                res.value = value;
            }
            else if(typeof value == "object"){
                angular.extend(res,value);
            }
            else {
                return null;
            }
            return res;
        }

        function formatData(data,$scope){

            options = $scope.options;

            var res = [];

            for(var i= 0,idata;(idata = data[i]);i++){
                var tmp = angular.extend({},idata);

                tmp.mainValue = formatValue(tmp.mainValue,options.main);
                tmp.footLeftValue = formatValue(tmp.footLeftValue,options.footLeft);
                tmp.footRightValue = formatValue(tmp.footRightValue,options.footRight);

                res.push(tmp);
            }
            return res;
        }

        return {
            formatData:formatData
        }

    }])

    .filter("summaryFilter",["$filter",function($filter){

        var number = /number/,
            percent = /percent/,
            date = /date_/,
            currency = /currency/

        function formatNumber(input,param){
            input = parseFloat(input);
            var tmp = param.split("_");
            var res = $filter("number")(input,tmp[1] || 0);
            if(tmp[2]){
                input > 0 && (res = "+"+res)
            }
            return res;
        }

        return function(input,param){

            if(number.test(param)){
                input = formatNumber(input,param);
            }
            else if(percent.test(param)){
                input = formatNumber(input,param)+"%";
            }
            else if(date.test(param)){
                input = $filter("date")(input,param.replace("date_",""));
            }
            else if(currency.test(param)){
                input = $filter("currency")(input,param.replace(/currency_?/,"") || "￥");
            }


            return input;
        }

    }])

    .directive("graceSummary", ["$timeout", "$window", "summaryConfig", function ($timeout, $window, summaryConfig) {

        return {
            restrict: "A",
            scope: {
                summaryData: "=",
                onSelect:"=?",
                triggerSelectOnLoaded:"@?"
            },
            replace: true,
            templateUrl: "template/summary/summary.html",
            controller: "summaryController",
            link: function (_scope, _element, _attrs, _ctrl) {

                $timeout(function(){
                    $window.Odometer && Odometer.init();
                },0);

                var odometerElements;

                _ctrl.odometerUpdateByIndex = function(key){

                    if(key >= _scope.curSummaryData.length){
                        _scope.selectedOverFlow && _scope.selectedOverFlow.mainValue && $(odometerElements[key]).html(_scope.selectedOverFlow.mainValue.value);
                    }
                    else{
                        $(odometerElements[key]).html(_scope.curSummaryData[key].mainValue.value);
                    }

                }

                function updateView(data){

                    if(data){
                        data = _scope.summaryData;
                        _ctrl.updateData(data);

                        $timeout(function(){
                            odometerElements = _element.find(".odometer");
                            odometerElements.each(_ctrl.odometerUpdateByIndex)
                        },10)

                    }

                }

                if(_scope.options.deepWatch){

                    _scope.$watch(function(){

                        var sumData = _scope.summaryData;
                        var rslt = "";
                        for(var i= 0,sum;(sum = sumData[i]);i++){

                            rslt += sum.mainValue.value;
                            sum.footLeftValue && (rslt += sum.footLeftValue.value)
                            sum.footRightValue && (rslt += sum.footRightValue.value)

                        }

                        return rslt;

                    },updateView)

                }
                else{
                    _scope.$watch("summaryData",updateView)
                }

            }
        }

    }]);


/**
 * Created by cindy on 14/12/11.
 * 概览组件
   输入： title icon配置 ； 数据  数据显示格式
   {
      title:"销量",
      titleClass:"visit",
      height: 40,

      'data|4':[{
          value:"@INT(10000000,100000000)",
          desc:"@LAST @LAST @LAST @LAST @LAST @LAST @LAST @LAST @LAST",
          name:"@LAST",
          format:'number_0'
      }]
    }
 */

angular.module("grace.bootstrap.summaryList", ["grace.bootstrap.tooltip","grace.bootstrap.dataFormatter"])
  .controller('SummaryListController', ['$scope','$gDataFormatterFactory',function($scope, dataFormatter){
     $scope.format = function( data ){
        if(!data) return data;
        for(var i=0,len=data.length; i<len; i++){
           if(data[i].format){
             data[i].value = dataFormatter( data[i].value, data[i].format );
           }
        }
        return data ;
     }
     $scope.adapterDataLength = function(summaryData){
          var data = summaryData.data ;
          if(!data) return summaryData; 
          var repeatIndex=0, last=0, ti=0;
          for(var i=0; i<4; i++){
             if(!!data[i]){
                 continue;
             }else{
                data.push({});
             }
          }

         //将 [obj, obj,obj,obj,obj,obj] 转换为  [[obj,obj], [obj,obj], obj, obj]
          if(data.length>4){
             repeatIndex = Math.floor(data.length/4 );
             last = data.length%4;

             if( repeatIndex>1 ){
                data[0] = [ data[0] ];
                data[1] = [ data[1] ];
                data[2] = [ data[2] ];
                data[3] = [ data[3] ]; 
                for(var i=1; i<repeatIndex; i++){
                  ti = 4*i;
                  data[0].push( data[ ti ] );
                  data[1].push( data[ ti+1 ] );
                  data[2].push( data[ ti+2 ] );
                  data[3].push( data[ ti+3 ] );
                }
               
             }
             
             for(var i=0; i<last; i++){
                if( !(data[i] instanceof Array ) ){
                   data[i] = [ data[i] ];
                }
                data[i].push(data[4*repeatIndex+i]);  
                
             }

             data.splice(4);
             if(!summaryData.height){
               summaryData.height= 40*(repeatIndex+ (last>0?1:0) ) -10;
             }
          }
          return summaryData ;
      }

  }])
  .directive('graceSummaryList', function (){
      return {
         templateUrl: "template/summaryList/summaryList.html",
         restrict: "AE",
         scope:{
            summaryListData: '='
         },
         controller: 'SummaryListController',
         link: function(scope, el, $attr, _ctrl){

            // var height = scope.summaryListData.height ;
            // if(height){
              
            // }
            if(scope.summaryListData.data && scope.summaryListData.data.length>0){
              scope.summaryListData.data = scope.format( scope.summaryListData.data );  
              scope.summaryListData = scope.adapterDataLength( scope.summaryListData ) ;
              
            }
            scope.rowheight = scope.summaryListData.height ?scope.summaryListData.height:40 ;
            // var height = scope.summaryListData.height ;
            // if(scope.rowheight){
            el.find('h3').css('height', scope.rowheight+'px').css('line-height', scope.rowheight+'px');
            // }
           
         }
         
      }
  });


/**
 * @ngdoc overview
 * @name grace.bootstrap.table
 *
 * @description
 * AngularJS version of the tabs directive.
 */

var app = angular.module("grace.bootstrap.table",['grace.bootstrap.dropdown'])
 
    .constant("tableConfig",{
        "autoIncrement":false,
        enableFn:true,
        fnThText:"操作",
        NORMAL_TYPE : 'x,xxx.xx', //常规数据格式化
        formatType: null, //配置的格式化类型
        isFormat: false//是否进行格式化，默认不进行
    })

    .config(["$sceProvider",function($sceProvider) {

        $sceProvider.enabled(false);

    }])
    .controller("tableController",["$scope", 'tableConfig', "$http", "tableFactory", function($scope,tableConfig,$http,tableFactory){


        $scope.autoIncrement = tableConfig.autoIncrement;
        $scope.enableFn = tableConfig.enableFn;
        $scope.fnThText = tableConfig.fnThText;

        $scope.isArray = function(val){
            if(val instanceof Array && val instanceof Object){
                return true;
            }
            return false;
        }
        $scope.isObject = function(val){
            if(val instanceof Object && !(val instanceof Array)){
                return true;
            }
            else return false;
        }
        $scope.isFnConfig = function(val){
            if(typeof val == "object" && val.fn){
                return true;
            }
            return false;
        }
        $scope.isFnCell = function(val){
            if($scope.isArray(val)){
                return $scope.isFnConfig(val[0]);
            }
            else{
                return $scope.isFnConfig(val);
            }
        }
        $scope.searchData = function($event, obj){
            var target = $event.target; 
            var query = angular.element(target).parent().find('input').val();
           // console.log($event);
            if( $event.keyCode === 13 || typeof $event.keyCode==='undefined' )  {
                 if(!$scope.action){
                    console.error('Table: Search Title Must Have Action');
                    return ;
                }
                $scope.action( {code: obj.code, query:query } );
            } 
            
           return ;
           
        }

        $scope.$watch("tableData",function(data){
            if(!data) return;
            tableFactory.formatData($scope,data);
        });


        $scope.isThEmpty = function(){
            if($scope.tableData && $scope.tableData.head[0]){
                return false;
            }
            return true;
        }

        $scope.editCell = function(headData,itemData,colIndex){

            $scope.curEditItem = itemData;
            $scope.curColIndex = colIndex;

        }

        $scope.onEditDispatch = function(){

            var thead = $scope.tableData.head;

            var curHead = thead[$scope.curColIndex];

            if(curHead.onEdit){

                curHead.onEdit(thead,$scope.curEditItem,$scope.curColIndex);

            }

        }
        //去除html标签
        $scope.tipBubbleFormatter = function(val){

            if(!val) return val;

            if(angular.isNumber(val)) val += "";

            return val.replace(/<.*?>/g,"");
        }

        $scope.onFilterDispatch = function(th,index){

            th.selected = th.filter[index];

            if($scope.filterAction){
                $scope.filterAction(th,th.selected);
            }
            console.log(arguments);
        }

        $scope.htmlLog = function(){
            console.log(arguments);
        }

    }])
    .factory("tableFactory",["tableConfig",function(cfg){


        function formatData($scope,data){
            var body = data.body;
            var head = data.head;

            var desBody = [];
            //desBody = desBody.concat(body);
            var desHead = [];
            desHead = desHead.concat(head);
            if($scope.autoIncrement){
                desHead.unshift({
                    name:"",
                    code:null
                })
            }
            if($scope.enableFn){
                desHead.push({
                    name:$scope.fnThText,
                    code:null
                })
            }

            for(var j= 0,jhead;(jhead = desHead[j]);j++){
                if(jhead.isSearch){
                    jhead.type = "search";
                }

                if(jhead.type == "filter"){
                    if(!jhead.selected){
                        jhead.selected = jhead.filter[0];
                    }
                }
            }

            for(var i= 0,idata;(idata = body[i]);i++){
                var tmp = [];
                tmp = tmp.concat(idata);
                if($scope.autoIncrement){
                    tmp.unshift(i+1);
                }

                if(cfg.enableFn && !idata.$$fn){
                    idata.$$fn =[
                        {
                            name:"remove",
                            text:"删除",
                            iconClass:"",
                            fn:function(arg){
                                console.log("to remove...")
                            }
                        },
                        {
                            name:"modify",
                            text:"修改",
                            iconClass:"",
                            fn:function(arg){
                                console.log("to modify...");
                            }
                        }
                    ]
                }
                else if(cfg.enableFn){
                    tmp.$$fn = idata.$$fn;
                }

                desBody.push(tmp);
            }
            data.body = desBody;
            data.head = desHead;

        }

        /**
         *
         * */
        function formatCell(cellData,options,isChild){

            var resData = [];
            options = options || {};
            var tmp = {
                name:"",
                text:"",
                iconClass:"",
                fn:null,
                formatter:null,
                editable:false,
                inline:false
            }

            if(angular.isString(cellData) || angular.isNumber(cellData)){
                tmp = angular.extend(tmp,options);
                tmp.text = tmp.formatter ? tmp.formatter(cellData): cellData;
                resData.push(tmp);

            }
            else if(angular.isArray(cellData)){
                for(var i= 0,ic;(ic = cellData[i]);i++){
                    resData.push(formatCell(ic,options,true));
                }
            }
            else if(angular.isObject(cellData)){
                tmp = angular.extend(tmp,options);
                cellData.text = tmp.formatter ? tmp.formatter(cellData.text) : cellData.text;
                resData.push(angular.extend(tmp,cellData));
            }

            return isChild ? resData[0] : resData;
        }

        return {
            formatData:formatData
        }

    }]).
     filter("tableFilter", ['tableConfig','$filter',  function(config, $filter){
      
       
       //将数据转成百分数 x 100 再添加 %号
       function mkRate(input){
            var ret = (""+input).match(/(-?|\+?){0,1}([\d\.]+)(%?)$/);

            if(!ret || isNaN(ret[2])){
                return input;
            }
            ret[2] = ret[2].replace(/\.0*$/, '');
            ret[2] = parseFloat(ret[2]) * 100;
            //保留2为小数
            ret[2] = (""+ret[2]).replace(/(\.\d{2}).*/, "$1");
            ret[3] = !!ret[3]?ret[3]:'%';
            return (!!ret[1]?ret[1]:'') + $filter('number')(ret[2])  + ret[3];
        }

        //如果时长超过16小时，就会出错
        //val单位为毫秒，返回格式为 xx:xx:xx
        function mkTimeLen(val){
            var ret = val , len;
            ret = (new Date(val)+"").match(/\d{2}:\d{2}:\d{2}/)[0].split(':');

            ret[0] = ((parseInt(ret[0])-8)+"").replace(/^(\d?)(\d)$/, function(){
                return ( !!arguments[1]?arguments[1]:"0" )+arguments[3] ;
            }) ;
            return ret.join(':');
            
        }
        //做普通格式化 x,xxx.xx
        function normalType(input){
             //拆解出+ -  数字和 %；  如-2.12%   返回['-2.12%', '-', 2.12, '%']
                var ret = (""+input).match(/^(-?|\+?){0,1}([\d\.]+)(%?)$/);

                if(!ret || isNaN(ret[2])){
                    return input;
                }
                 ret[2] = ret[2].replace(/\.0*$/, '');
               
                
                //保留2为小数
                input = (""+ret[2]).replace(/(\.\d{2}).*/, "$1");
                
                return  (!!ret[1]?ret[1]:'') +$filter('number')(input) + (!!ret[3]?ret[3]:'');
        }

       return  function(input, fractionSize){
           if(fractionSize == "SkuId" || fractionSize == "TimeDay" || fractionSize == "BatchesId" || fractionSize == "BatchId"){
                return input;
            }
             
             //如果是默认格式化类型
             if( (config.isFormat && config.formatType == config.NORMAL_TYPE)
            || (config.isFormat && !config.formatType) ){
               
                var ret = val = input;
                switch (fractionSize){
                    case 'BouncesRate':
                    case 'SiteConversionRate':
                    case 'GoalConversionRate':
                    case 'NewVisitorVisitsPercent':

                        ret = mkRate(val);
                        break;
                    //值单位为秒
                    case 'AvgPageRt':
                        ret = mkTimeLen(val*1000);
                        break;
                    //毫秒
                    case 'AvgLoadSec':
                        ret = (val / 1000).toFixed(2) + 's' ;
                        break;
                    //值单位为秒
                    case 'AvgSiteRt':
                        ret = mkTimeLen(val*1000);
                        break;
                    default:
                        ret = normalType(val);
                        break;
                    }
                return ret;
            }
            else{
              return input;
            }
        }
        

        

    }]).
    directive("graceTable",['tableConfig', function(tableConfig){

        return {
            restrict:"EA",
            require:['graceTable'],
            controller:"tableController",
            templateUrl:"template/table/table.html",
            replace:true,
            scope:{
                tableData:"=",
                action: '=',
                filterAction:'='
            },
            link:function(scope,element,attr){
                if(attr['autoIncrement'] == 'true'){
                    scope.autoIncrement = true;
                }
                if(attr['fnThText']){
                    scope.fnThText = attr['fnThText'];
                }
                //根据配置值决定是否格式化
                if(attr['formatType']){
                    tableConfig.formatType =  attr['formatType']
                }
                if(attr['isFormat']){
                    tableConfig.isFormat =  !!attr['isFormat'] ;
                }

                if(attr['enableFn'] == 'true'){
                    scope.enableFn = true
                }
                else{
                    scope.enableFn = false
                }

                var el = angular.element(element);

                var editMode = false;

                var curTableCell = null;

                el.on("click",".grace-table-btn-edit",function(evt){

                    var curEl = angular.element(evt.currentTarget);

                    var elParent = curEl.parent();

                    if(curTableCell && elParent != curTableCell){
                        resetTableCell(curTableCell);
                    }

                    curTableCell = elParent;

                    curEl.prev().hide();
                    curEl.hide();

                    var editBoxHtml = "<span class='grace-table-group' autofocus >" +
                        "<input class='grace-table-input-edit' />" +
                        "<i class='grace-table-btn-ok' >&#10004;</i>" +
                        "<i class='grace-table-btn-cancel'>&#10008;</i>" +
                        "</span>"
                    var editBox = angular.element(editBoxHtml);

                    elParent.append(editBox);

                    editBox.find(".grace-table-input-edit").val(scope.curEditItem[scope.curColIndex]);

                    editMode = true;

                })
                    .on("click",".grace-table-btn-ok",function(evt){
                        var curEl = angular.element(evt.currentTarget);
                        console.log("ok.......")
                        var editBox = curEl.parent();
                        var tableCell = editBox.parent();

                        var editor = editBox.find(".grace-table-input-edit");
                        var val = editor.val();

                        if(!val){
                            alert("不能为空");
                            return;
                        }

                        scope.$apply(function(){
                            scope.curEditItem[scope.curColIndex] = val;
                            scope.onEditDispatch()
                        })
                        resetTableCell(tableCell);
                    })
                    .on("click",".grace-table-btn-cancel",function(evt){
                        var curEl = angular.element(evt.currentTarget);
                        console.log("cancel....")
                        var editBox = curEl.parent();
                        var tableCell = editBox.parent();

                        resetTableCell(tableCell);
                    })
                    .on("keyup",".grace-table-input-edit",function(evt){
                        var curEl = angular.element(evt.currentTarget);

                        var editBox = curEl.parent();
                        var tableCell = editBox.parent();

                        var editer = curEl;
                        var val = editer.val();

                        if(evt.keyCode == 13){
                            editBox.find(".grace-table-btn-ok").trigger("click");
                        }

                    })
                    .on("click",function(evt){
                        evt.stopPropagation();
                    })

                    .on("click","span.grace-table-group",function(evt){

                        evt.stopPropagation();
                    });

                function resetTableCell(cell){
                    var editBox = cell.find(".grace-table-group");
                    editBox.remove();
                    cell.children().show();
                }
//                var doc = angular.element(document.body);
//                doc.on("click",function(evt){
//
//                    //doc.find(".grace-table-group .grace-table-btn-cancel").trigger("click");
//
//                })

            }
        }

    }])
    .directive("graceTableCell",function(){

        return {
            restrict:"A",
            require:"^graceTable",
            scope:{
                cellData:"="
            },
            link:function(scope,el){
                var data = scope.cellData;
                if(typeof data == 'object'){
                    el.html(data[0]);
                    var elStr = ""
                    for(var i= 1,cdata;(cdata = data[i]);i++ ){
                        elStr += ("<div>"+cdata+"</div>");
                    }
                    elStr && el.after(angular.element(elStr));
                }
                else{
                    el.html(data);
                }
            }
        }

    });

/**
 * @ngdoc overview
 * @name grace.bootstrap.tabs
 *
 * @description
 * AngularJS version of the tabs directive.
 */

angular.module('grace.bootstrap.tabs', [])

    .controller('TabsetController', ['$scope', function TabsetCtrl($scope) {
        var ctrl = this,
            tabs = ctrl.tabs = $scope.tabs = [];

        ctrl.select = function(selectedTab) {
            angular.forEach(tabs, function(tab) {
                if (tab.active && tab !== selectedTab) {
                    tab.active = false;
                    tab.onDeselect();
                }
            });
            selectedTab.active = true;
            selectedTab.onSelect();
        };

        ctrl.addTab = function addTab(tab) {
            tabs.push(tab);
            // we can't run the select function on the first tab
            // since that would select it twice
            if (tabs.length === 1) {
                tab.active = true;
            } else if (tab.active) {
                ctrl.select(tab);
            }
        };

        ctrl.removeTab = function removeTab(tab) {
            var index = tabs.indexOf(tab);
            //Select a new tab if the tab to be removed is selected
            if (tab.active && tabs.length > 1) {
                //If this is the last tab, select the previous tab. else, the next tab.
                var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
                ctrl.select(tabs[newActiveIndex]);
            }
            tabs.splice(index, 1);
        };
    }])

/**
 * @ngdoc directive
 * @name grace.bootstrap.tabs.directive:tabset
 * @restrict EA
 *
 * @description
 * Tabset is the outer container for the tabs directive
 *
 * @param {boolean=} vertical Whether or not to use vertical styling for the tabs.
 * @param {boolean=} justified Whether or not to use justified styling for the tabs.
 *
 * @example
 <example module="grace.bootstrap">
 <file name="index.html">
 <tabset>
 <tab heading="Tab 1"><b>First</b> Content!</tab>
 <tab heading="Tab 2"><i>Second</i> Content!</tab>
 </tabset>
 <hr />
 <tabset vertical="true">
 <tab heading="Vertical Tab 1"><b>First</b> Vertical Content!</tab>
 <tab heading="Vertical Tab 2"><i>Second</i> Vertical Content!</tab>
 </tabset>
 <tabset justified="true">
 <tab heading="Justified Tab 1"><b>First</b> Justified Content!</tab>
 <tab heading="Justified Tab 2"><i>Second</i> Justified Content!</tab>
 </tabset>
 </file>
 </example>
 */
    .directive('tabset', function() {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            scope: {
                type: '@'
            },
            controller: 'TabsetController',
            templateUrl: 'template/tabs/tabset.html',
            link: function(scope, element, attrs) {
                scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
                scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
            }
        };
    })

/**
 * @ngdoc directive
 * @name grace.bootstrap.tabs.directive:tab
 * @restrict EA
 *
 * @param {string=} heading The visible heading, or title, of the tab. Set HTML headings with {@link grace.bootstrap.tabs.directive:tabHeading tabHeading}.
 * @param {string=} select An expression to evaluate when the tab is selected.
 * @param {boolean=} active A binding, telling whether or not this tab is selected.
 * @param {boolean=} disabled A binding, telling whether or not this tab is disabled.
 *
 * @description
 * Creates a tab with a heading and content. Must be placed within a {@link grace.bootstrap.tabs.directive:tabset tabset}.
 *
 * @example
 <example module="grace.bootstrap">
 <file name="index.html">
 <div ng-controller="TabsDemoCtrl">
 <button class="btn btn-small" ng-click="items[0].active = true">
 Select item 1, using active binding
 </button>
 <button class="btn btn-small" ng-click="items[1].disabled = !items[1].disabled">
 Enable/disable item 2, using disabled binding
 </button>
 <br />
 <tabset>
 <tab heading="Tab 1">First Tab</tab>
 <tab select="alertMe()">
 <tab-heading><i class="icon-bell"></i> Alert me!</tab-heading>
 Second Tab, with alert callback and html heading!
 </tab>
 <tab ng-repeat="item in items"
 heading="{{item.title}}"
 disabled="item.disabled"
 active="item.active">
 {{item.content}}
 </tab>
 </tabset>
 </div>
 </file>
 <file name="script.js">
 function TabsDemoCtrl($scope) {
      $scope.items = [
        { title:"Dynamic Title 1", content:"Dynamic Item 0" },
        { title:"Dynamic Title 2", content:"Dynamic Item 1", disabled: true }
      ];

      $scope.alertMe = function() {
        setTimeout(function() {
          alert("You've selected the alert tab!");
        });
      };
    };
 </file>
 </example>
 */

/**
 * @ngdoc directive
 * @name grace.bootstrap.tabs.directive:tabHeading
 * @restrict EA
 *
 * @description
 * Creates an HTML heading for a {@link grace.bootstrap.tabs.directive:tab tab}. Must be placed as a child of a tab element.
 *
 * @example
 <example module="grace.bootstrap">
 <file name="index.html">
 <tabset>
 <tab>
 <tab-heading><b>HTML</b> in my titles?!</tab-heading>
 And some content, too!
 </tab>
 <tab>
 <tab-heading><i class="icon-heart"></i> Icon heading?!?</tab-heading>
 That's right.
 </tab>
 </tabset>
 </file>
 </example>
 */
    .directive('tab', ['$parse', function($parse) {
        return {
            require: '^tabset',
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/tabs/tab.html',
            transclude: true,
            scope: {
                active: '=?',
                heading: '@',
                onSelect: '&select', //This callback is called in contentHeadingTransclude
                //once it inserts the tab's content into the dom
                onDeselect: '&deselect'
            },
            controller: function() {
                //Empty controller so other directives can require being 'under' a tab
            },
            compile: function(elm, attrs, transclude) {
                return function postLink(scope, elm, attrs, tabsetCtrl) {
                    scope.$watch('active', function(active) {
                        if (active) {
                            tabsetCtrl.select(scope);
                        }
                    });

                    scope.disabled = false;
                    if ( attrs.disabled ) {
                        scope.$parent.$watch($parse(attrs.disabled), function(value) {
                            scope.disabled = !! value;
                        });
                    }

                    scope.select = function() {
                        if ( !scope.disabled ) {
                            scope.active = true;
                        }
                    };

                    tabsetCtrl.addTab(scope);
                    scope.$on('$destroy', function() {
                        tabsetCtrl.removeTab(scope);
                    });

                    //We need to transclude later, once the content container is ready.
                    //when this link happens, we're inside a tab heading.
                    scope.$transcludeFn = transclude;
                };
            }
        };
    }])

    .directive('tabHeadingTransclude', [function() {
        return {
            restrict: 'A',
            require: '^tab',
            link: function(scope, elm, attrs, tabCtrl) {
                scope.$watch('headingElement', function updateHeadingElement(heading) {
                    if (heading) {
                        elm.html('');
                        elm.append(heading);
                    }
                });
            }
        };
    }])

    .directive('tabContentTransclude', function() {
        return {
            restrict: 'A',
            require: '^tabset',
            link: function(scope, elm, attrs) {
                var tab = scope.$eval(attrs.tabContentTransclude);

                //Now our tab is ready to be transcluded: both the tab heading area
                //and the tab content area are loaded.  Transclude 'em both.
                tab.$transcludeFn(tab.$parent, function(contents) {
                    angular.forEach(contents, function(node) {
                        if (isTabHeading(node)) {
                            //Let tabHeadingTransclude know.
                            tab.headingElement = node;
                        } else {
                            elm.append(node);
                        }
                    });
                });
            }
        };
        function isTabHeading(node) {
            return node.tagName &&  (
                node.hasAttribute('tab-heading') ||
                node.hasAttribute('data-tab-heading') ||
                node.tagName.toLowerCase() === 'tab-heading' ||
                node.tagName.toLowerCase() === 'data-tab-heading'
                );
        }
    })

;

angular.module("template/checkbox/checkbox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/checkbox/checkbox.html",
    "<div class=\"grace-checkbox\">\n" +
    "	<div ng-repeat=\"ck in checkboxList\" ng-click=\"changeboxChange(ck, $event)\" class=\"grace-checkbox-item {{horizontal}}\">\n" +
    "		<i ng-class=\"{checked:ck.checked}\"></i><input type=\"checkbox\" value=\"ck.value\" ng-model=\"ck.checked\"/><label >{{ck.text}}</label>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/chosenAssociate/chosenAssociate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/chosenAssociate/chosenAssociate.html",
    "<div class=\"grace-select-by-associate\">\n" +
    "	<div class=\"associate-input\" id=\"chose-single\" ng-show=\"!plural\"><span ng-bind=\"ngModel.selected.name\"></span><b></b></div>\n" +
    "	<div class=\"associate-input\" id=\"chose-plural\" ng-show=\"plural\">\n" +
    "		<span class=\"choice-close\" ng-repeat=\"con in ngModel.selected\"><a ng-mouseup=\"choiceCloseClick(con)\"></a><i ng-class=\"con.class\" ng-bind-html=\"trust(con.name)\"></i></span>\n" +
    "		<input class=\"plural-expression\" ng-model=\"expression\" ng-focus=\"getWidth($event)\" ng-blur=\"setWidth($event)\"  ng-keyup=\"selectFuzzy()\" type=\"text\"/>\n" +
    "	</div>\n" +
    "	<div class=\"associate-body body-plural{{plural}}\" ng-style={display:bodyShow?'block':'none'}>\n" +
    "		<input class=\"associate-expression\" ng-show=\"!plural\" type=\"text\" ng-model=\"expression\" ng-keyup=\"selectFuzzy()\"/>\n" +
    "		<div class=\"associate-box\">\n" +
    "	        <p ng-show=\"!currentPageData.length\">\n" +
    "	            没有匹配项\n" +
    "	        </p>\n" +
    "		    <ul class=\"chosen chosen{isPaging}\">\n" +
    "		        <li ng-repeat=\"con in currentPageData\">\n" +
    "		            <a ng-click=\"changeConfigured(con)\" ng-bind-html=\"trust(con.name)\"></a>\n" +
    "		        </li>\n" +
    "		    </ul>\n" +
    "		    <div class=\"pagination-container found-pages\" ng-show=\"isPaging\" style=\"position:relative;\">\n" +
    "		        <div class=\"pagination-info\">\n" +
    "		            <span>共{{pagegroup.totalPages}}页</span>\n" +
    "		            <span>到第<input pagination-input tableType=\"pagegroup\" type=\"tel\"/>页</span>\n" +
    "		        </div>\n" +
    "		        <pagination ng-change=\"pagegroup.changePage()\" boundary-links=\"true\" total-items=\"pagegroup.totalItems\"\n" +
    "		                    ng-model=\"pagegroup.currentPage\" items-per-page=\"pagegroup.itemsPerPage\" class=\"pagination-sm\"\n" +
    "		                    previous-text=\"&lsaquo;\" next-text=\"&rsaquo;\" first-text=\"&laquo;\"\n" +
    "		                    last-text=\"&raquo;\"></pagination>\n" +
    "		    </div>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/datepicker.html",
    "<div ng-switch=\"datepickerMode\" role=\"application\" ng-keydown=\"keydown($event)\" class=\"grc datepicker\" >\n" +
    "  <grace-daypicker  ng-switch-when=\"day\" tabindex=\"0\"></grace-daypicker>\n" +
    "  <grace-monthpicker  ng-switch-when=\"month\" tabindex=\"0\"></grace-monthpicker>\n" +
    "  <grace-yearpicker  ng-switch-when=\"year\" tabindex=\"0\"></grace-yearpicker>\n" +
    "    <grace-hourpicker ng-switch-when=\"hour\" tabindex=\"0\"></grace-hourpicker>\n" +
    "    <grace-minutepicker ng-switch-when=\"minute\" tabindex=\"0\"></grace-minutepicker>\n" +
    "</div>");
}]);

angular.module("template/datepicker/daterangepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/daterangepicker.html",
    "<div ng-switch=\"datepickerMode\" role=\"application\" ng-keydown=\"keydown($event)\" class=\"grc datepicker\" >\n" +
    "    <grace-daypicker-range ng-switch-when=\"day\" tabindex=\"0\"></grace-daypicker-range>\n" +
    "</div>");
}]);

angular.module("template/datepicker/day.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/day.html",
    "<table role=\"grid\" class=\"day-picker\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th class=\"th-arrow\"><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"grace-icon-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"{{5 + showWeeks}}\" class=\"th-header\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-class=\"{'click-disabled': switchDisabled}\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th class=\"th-arrow\"><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"grace-icon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <th ng-show=\"showWeeks\" class=\"text-center\">周</th>\n" +
    "      <th ng-repeat=\"label in labels track by $index\" class=\"text-center\"><small aria-label=\"{{label.full}}\">{{label.abbr}}</small></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-show=\"showWeeks\" class=\"text-center h6\">\n" +
    "          <em class=\"btn btn-default btn-sm\"\n" +
    "                  ng-click=\"selectWeek(weekNumbers[$index])\" ng-class=\"{active: weekNumbers[$index].selected}\">{{ weekNumbers[$index].week }}</em>\n" +
    "      </td>\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default btn-sm\"\n" +
    "                ng-class=\"{'btn-info': dt.selected, active: dt.selected,'cell-muted': dt.secondary,weekend:dt.weekend}\"\n" +
    "                ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\">\n" +
    "            <span ng-class=\"{'text-muted': dt.secondary, 'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/datepicker/dayrange.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/dayrange.html",
    "<div class=\"datepicker-group\" >\n" +
    "    <table role=\"grid\" class=\"day-picker\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\" ng-repeat=\"rows in rowsGroup track by $index\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "            <th class=\"th-arrow\"><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"grace-icon-chevron-left\"></i></button></th>\n" +
    "            <th colspan=\"{{5 + showWeeks}}\" class=\"th-header\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-class=\"{'click-disabled': switchDisabled}\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{titles[$index]}}</strong></button></th>\n" +
    "            <th class=\"th-arrow\"><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"grace-icon-chevron-right\"></i></button></th>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <th ng-show=\"showWeeks\" class=\"text-center\">周</th>\n" +
    "            <th ng-repeat=\"label in labels track by $index\" class=\"text-center\"><small aria-label=\"{{label.full}}\">{{label.abbr}}</small></th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody ng-init=\"weekNumbers = weekNumbersGroup[$index]\" >\n" +
    "        <tr ng-repeat=\"row in rows track by $index\">\n" +
    "            <td ng-show=\"showWeeks\" class=\"text-center h6\">\n" +
    "                <em class=\"btn btn-default btn-sm\"\n" +
    "                    ng-click=\"selectWeek(weekNumbers[$index])\" ng-class=\"{active: weekNumbers[$index].selected}\">{{ weekNumbers[$index].week }}</em>\n" +
    "            </td>\n" +
    "            <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "                <button type=\"button\" style=\"width:100%;\"\n" +
    "                        class=\"btn btn-default btn-sm\" ng-class=\"{'btn-info': dt.selected, active: dt.selected, 'cell-muted': dt.secondary,'weekend':dt.weekend}\"\n" +
    "                        ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\">\n" +
    "                    <span ng-class=\"{'text-muted': dt.secondary, 'text-info': dt.current}\">{{dt.label}}</span>\n" +
    "                </button>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("template/datepicker/hour.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/hour.html",
    "<table role=\"grid\" class=\"hour-picker\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "    <thead>\n" +
    "    <tr>\n" +
    "        <th class=\"th-arrow\"><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"grace-icon-chevron-left\"></i></button></th>\n" +
    "        <th colspan=\"3\"  class=\"th-header\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-class=\"{'click-disabled': switchDisabled}\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "        <th class=\"th-arrow\"><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"grace-icon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "        <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "            <button type=\"button\"\n" +
    "                    style=\"width:100%;\"\n" +
    "                    class=\"btn btn-default\"\n" +
    "                    ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\"\n" +
    "                    ng-click=\"select(dt.date)\"\n" +
    "                    ng-disabled=\"dt.disabled\"\n" +
    "                    ng-if=\"!!dt\"\n" +
    "                    tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/datepicker/minuteOrSecond.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/minuteOrSecond.html",
    "<table role=\"grid\" class=\"minuteOrSecond-picker\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "    <thead>\n" +
    "    <tr>\n" +
    "        <th class=\"th-arrow\"><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"grace-icon-chevron-left\"></i></button></th>\n" +
    "        <th colspan=\"3\"  class=\"th-header\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-class=\"{'click-disabled': switchDisabled}\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "        <th class=\"th-arrow\"><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"grace-icon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "        <td ng-repeat=\"dt in row track by dt.uid\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "            <button type=\"button\"\n" +
    "                    style=\"width:100%;\"\n" +
    "                    class=\"btn btn-default\"\n" +
    "                    ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\"\n" +
    "                    ng-click=\"select(dt.date)\"\n" +
    "                    ng-disabled=\"dt.disabled\"\n" +
    "                    ng-if=\"!!dt.date\"\n" +
    "                    tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/datepicker/month.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/month.html",
    "<table role=\"grid\" class=\"month-picker\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th class=\"th-arrow\"><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"grace-icon-chevron-left\"></i></button></th>\n" +
    "      <th class=\"th-header\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-class=\"{'click-disabled': switchDisabled}\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th class=\"th-arrow\"><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"grace-icon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/datepicker/popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/popup.html",
    "<ul class=\"dropdown-menu\" id=\"{{uniqId}}\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\" ng-keydown=\"keydown($event)\">\n" +
    "	<li ng-transclude></li>\n" +
    "	<li ng-if=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n" +
    "		<span class=\"btn-group\">\n" +
    "			<button ng-if=\"showCurrentButton\"  type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"select('today')\">{{ getText('current') }}</button>\n" +
    "			<button ng-if=\"showClearButton\" type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"select(null)\">{{ getText('clear') }}</button>\n" +
    "            <button ng-if=\"showEnterButton\" type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"enter()\" >{{ getText('enter') }}</button>\n" +
    "		</span>\n" +
    "		<button ng-if=\"showCloseButton\" type=\"button\" class=\"btn btn-sm btn-success pull-right\" ng-click=\"close()\">{{ getText('close') }}</button>\n" +
    "	</li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/datepicker/year.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/year.html",
    "<table role=\"grid\" class=\"year-picker\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th class=\"th-arrow\"><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"grace-icon-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"3\" class=\"th-header\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" ng-class=\"{'click-disabled': switchDisabled}\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th class=\"th-arrow\"><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"grace-icon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/dimension/dimension.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dimension/dimension.html",
    "<section>\n" +
    "    <section class=\"grace-section-dimension01\" >\n" +
    "        <div class=\"grace-dimension-0\" ng-show=\"showContrastOption\" ><dt><label>维度对比</label> </dt><span ng-click=\"checkContrast()\" class=\"grace-dimension-contrast\"  ng-class=\"{'on':isContrast}\" ></span></div>\n" +
    "        <dl ng-repeat=\"node0 in dimensionData\"  class=\"grace-dimension-0\" >\n" +
    "            <dt><label>{{node0.name}}:</label></dt>\n" +
    "            <dd ng-repeat=\"node1 in node0.children\"  ng-class=\"{checked:node1.checked}\" >\n" +
    "                <a ng-click=\"nodeClick($event,node1)\" >{{node1.name}}</a>\n" +
    "                <span ng-if=\"node1.children.length\" ng-click=\"showSubDimension($event,node1)\" class=\"grace-dimension-dropdown level{{node1.level}}\" >\n" +
    "                    <i></i>\n" +
    "                </span>\n" +
    "            </dd>\n" +
    "        </dl>\n" +
    "        <dl class=\"grace-dimension-0 selected\" >\n" +
    "            <dt><label>已选择：</label></dt>\n" +
    "            <dd ng-repeat=\"(k,s) in selected\" class=\"checked\" >\n" +
    "                <a>{{s.nameChain.join(' > ')}}</a>\n" +
    "                <span class=\"grace-dimension-x\" ng-click=\"cancelSelect(k)\" >&times;</span>\n" +
    "            </dd>\n" +
    "        </dl>\n" +
    "        <div class=\"grace-dimension-0\" >\n" +
    "            <span class=\"grace-dimension-button\" ng-click=\"onAction()\" ng-class=\"{disable:!selectedNode.length}\" >查询</span>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "    <section class=\"grace-section-dimension23\" ng-show=\"showDimension23\" >\n" +
    "        <div>\n" +
    "            <div class=\"grace-search-group\" >\n" +
    "                <input type=\"text\" placeholder=\"请输入要搜索的内容\" level=\"23\"  class=\"grace-dimension-searchbox\" />\n" +
    "                <span class=\"grace-dimension-searchbtn\" ></span>\n" +
    "                <span class=\"grace-searchbox-closebtn\" ng-click=\"closeSearchBox(23)\" ng-show=\"searchKeyWord23\" >&times;</span>\n" +
    "                <div class=\"grace-searchbox-searchResult\" ng-show=\"!searchResult23Empty\" >\n" +
    "                    <span class=\"grace-searchbox-resultItem\"  ng-repeat=\"item in searchResult23\" ng-click=\"nodeClick($event,item)\" ng-class=\"{checked:item.checked}\" >{{item.name}}</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"grace-dimension-2\"  >\n" +
    "            <div ng-repeat=\"c2 in curDimensionData23.children\" >\n" +
    "                <ul>\n" +
    "                    <div><a ng-class=\"{checked:c2.checked}\" ng-click=\"nodeClick($event,c2)\" >{{c2.name}}</a></div>\n" +
    "                    <li ng-repeat=\"c3 in c2.children\" ng-class=\"{checked:c3.checked}\" >\n" +
    "                        <a ng-click=\"nodeClick($event,c3)\" >{{c3.name}}</a>\n" +
    "                        <span ng-if=\"c3.children.length\" ng-click=\"showSubDimension($event,c3)\" class=\"grace-dimension-dropdown level{{c3.level}}\" >\n" +
    "                            <i></i>\n" +
    "                        </span>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <i class=\"grace-dimension-arrow\" ></i>\n" +
    "    </section>\n" +
    "    <section class=\"grace-section-dimension45\" ng-show=\"showDimension45\" >\n" +
    "        <div>\n" +
    "            <div class=\"grace-search-group\" >\n" +
    "                <input type=\"text\" placeholder=\"请输入要搜索的内容\" class=\"grace-dimension-searchbox\" level=\"45\" />\n" +
    "                <span class=\"grace-dimension-searchbtn\" ></span>\n" +
    "                <span class=\"grace-searchbox-closebtn\" ng-click=\"closeSearchBox(45)\" ng-show=\"searchKeyWord45\" >&times;</span>\n" +
    "                <div class=\"grace-searchbox-searchResult\" ng-show=\"!searchResult45Empty\" >\n" +
    "                    <span class=\"grace-searchbox-resultItem\"  ng-repeat=\"item in searchResult45\" ng-click=\"nodeClick($event,item)\" ng-class=\"{checked:item.checked}\"  >{{item.name}}</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"grace-dimension-4\" >\n" +
    "            <div ng-repeat=\"c4 in curDimensionData45.children\" >\n" +
    "                <ul>\n" +
    "                    <div><a ng-class=\"{checked:c4.checked}\" ng-click=\"nodeClick($event,c4)\" >{{c4.name}}</a></div>\n" +
    "                    <li ng-repeat=\"c5 in c4.children\" ng-class=\"{checked:c5.checked}\" >\n" +
    "                        <a ng-click=\"nodeClick($event,c5)\" >{{c5.name}}</a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <i class=\"grace-dimension-arrow\" ></i>\n" +
    "    </section>\n" +
    "\n" +
    "</section>");
}]);

angular.module("template/dimensionBaseSelect/dimensionBaseSelect.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dimensionBaseSelect/dimensionBaseSelect.html",
    "<div class=\"grace-search-conditions clearfix\">\n" +
    "   <div class=\"search-item-title clearfix\">\n" +
    "       <span class=\"search-title\" code=\"{{data.code}}\">{{data.name}}</span> <span class=\"semicolon-right\">:</span>\n" +
    "   </div>\n" +
    "   <div class=\"search-list\">\n" +
    "       <div class=\"search-label\" ng-class=\"{hidelist:hideList}\" ng-repeat=\"di in data.detail\">\n" +
    "           <span ng-class=\"{active:(selStatus.indexOf(di.code)>-1 && isMult), active2:(selStatus.indexOf(di.code)>-1 && !isMult), active3:!isMult}\"  ng-click=\"select(di,$index)\" code=\"{{di.code}}\">\n" +
    "            <div ng-if=\"isMult\" class=\"occupy\" ng-class=\"{active:selStatus.indexOf(di.code)>-1}\"></div> {{di.name}}\n" +
    "           </span>\n" +
    "       </div>\n" +
    "       <div class=\"search-custom\" ng-class=\"{showcustom:hideList}\">\n" +
    "           <input class=\"city-input\" placeholder=\"搜索省份及城市\" ng-keyup=\"keyUp($event)\"/>\n" +
    "           <span class=\"cancel-button\" ng-click=\"return()\">取消</span>\n" +
    "       </div>\n" +
    "   </div>\n" +
    "</div>");
}]);

angular.module("template/dimensionBaseSelect/dimensionSelectWithCheckBox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dimensionBaseSelect/dimensionSelectWithCheckBox.html",
    "<div class=\"grace-search-conditions clearfix\">\n" +
    "    <div class=\"clearfix\">\n" +
    "        <div class=\"search-item-title clearfix\">\n" +
    "            <span class=\"search-title\" code=\"{{data.code}}\">{{data.name}}</span> <span class=\"semicolon-right\">:</span>\n" +
    "        </div>\n" +
    "        <div class=\"search-list\">\n" +
    "            <div class=\"search-label\" ng-repeat=\"di in data.detail\">\n" +
    "                <span ng-class=\"{active:selStatus.indexOf(di.code)>-1?true:false, active1:di.checkboxselect, di_sel: di.isDrop, active4:di.detail}\" ng-click=\"select(di, $index, data.detail)\" code=\"{{di.code}}\">\n" +
    "                    <div ng-if=\"!di.detail\" class=\"occupy\" ng-class=\"{active:selStatus.indexOf(di.code)>-1?true:false, active2:(di._checked)}\"></div>\n" +
    "                    <i style=\"font-style: normal;\" ng-bind=\"di.name\"></i>\n" +
    "                    <em class=\"triangle-png-down\" ng-if=\"di.detail\"></em>\n" +
    "                </span>\n" +
    "                <div ng-if=\"di.detail\" class=\"cond-dropdown\" ng-show=\"di.showCheckBoxList\" ng-mouseleave=\"hideCheckboxList(di)\">\n" +
    "                    <ul>\n" +
    "                        <li ng-repeat=\"diDrop in di.detail\" style=\"border-bottom:0px;\">\n" +
    "                            <label>\n" +
    "                                <div name=\"{{diDrop.code}}\" code=\"{{diDrop.code}}\" ng-click=\"updateShowButtonForCheck(diDrop.code, di)\">\n" +
    "                                    <div class=\"occupy\" ng-class=\"{active:selStatus.indexOf(diDrop.code)>-1?(di._checked=true):false}\" ></div>\n" +
    "                                    <i style=\"font-style: normal;\" ng-bind=\"diDrop.name\"></i>\n" +
    "                                </div>\n" +
    "                            </label>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"ordertypediv clearfix\" style=\"display: none;\">\n" +
    "        <div class=\"ordertypediv-content\">\n" +
    "            <ul>\n" +
    "                <li ng-repeat=\"val in _orderType\" class=\"\">\n" +
    "                    <div class=\"dropdownshowbutton clearfix\">{{val.newName}}\n" +
    "                        <div class=\"close-img\" ng-click=\"updateShowButton(val.code)\"><div>\n" +
    "                        </div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/dimensionBaseSelect/dimensionSelectWithCustom.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dimensionBaseSelect/dimensionSelectWithCustom.html",
    "<div class=\"grace-search-conditions clearfix\">\n" +
    "   <div class=\"search-item-title\">\n" +
    "       <span class=\"search-title\" code=\"{{data.code}}\">{{data.name}}</span><span class=\"semicolon-right\">:</span>\n" +
    "   </div>\n" +
    "   <div class=\"search-list\">\n" +
    "       <div class=\"search-label\"  ng-class=\"{hidelist:hideList}\" ng-repeat=\"di in data.detail\">\n" +
    "           <!--<span ng-class=\"{active:selStatus.indexOf(di.code)>-1?true:false}\"  ng-click=\"select(di,$index)\" code=\"{{di.code}}\">-->\n" +
    "           <span ng-if=\"!isCustom(di)\" ng-class=\"{active:(selStatus.indexOf(di.code)>-1 && isMult), active2:(selStatus.indexOf(di.code)>-1 && !isMult), active3:!isMult}\"  ng-click=\"select(di,$index)\" code=\"{{di.code}}\">\n" +
    "               <div ng-if=\"isMult\" class=\"occupy\" ng-class=\"{active:selStatus.indexOf(di.code)>-1?true:false}\"></div> {{di.name}}\n" +
    "           </span>\n" +
    "           <span id=\"graceDiCustom\" ng-if=\"isCustom(di)\" class=\"custom\"  ng-class=\"{active: customSelected}\"  ng-click=\"select(di,$index)\" code=\"{{di.code}}\">\n" +
    "           {{di.name}}\n" +
    "           </span>\n" +
    "       </div>\n" +
    "       <div  class=\"search-custom\" ng-class=\"{showcustom:hideList}\">\n" +
    "           <input id=\"graceDiCusInputBox\" class=\"city-input\" placeholder=\"搜索省份及城市\"/>\n" +
    "           <span class=\"cancel-button\" ng-click=\"return()\">取消</span>\n" +
    "       </div>\n" +
    "   </div>\n" +
    "</div>");
}]);

angular.module("template/dimensionBaseSelect/dimensionSelectWithRadioBox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/dimensionBaseSelect/dimensionSelectWithRadioBox.html",
    "<div class=\"grace-search-conditions clearfix\">\n" +
    "    <div class=\"clearfix\">\n" +
    "        <div class=\"search-item-title clearfix\">\n" +
    "            <span class=\"search-title\" code=\"{{data.code}}\">{{data.name}}</span>\n" +
    "            <span class=\"semicolon-right\">:</span>\n" +
    "        </div>\n" +
    "        <div class=\"search-list\">\n" +
    "            <div class=\"search-label\" ng-repeat=\"di in data.detail\">\n" +
    "                <span ng-class=\"{active:selStatus.indexOf(di.code)>-1?true:false, active1:di.checkboxselect, di_sel: di.isDrop, active4:di.detail}\" ng-click=\"select(di, $index, data.detail)\" code=\"{{di.code}}\">\n" +
    "                    <div ng-if=\"!di.detail\" class=\"occupy\" ng-class=\"{active:selStatus.indexOf(di.code)>-1?true:false, active2:(di._checked)}\"></div>\n" +
    "                    <i style=\"font-style: normal;\" ng-bind=\"di.name\"></i>\n" +
    "                    <em class=\"triangle-png-down\" ng-if=\"di.detail\" ng-click=\"hideCheckboxListForClick(di, di.isDrop, $event)\"></em>\n" +
    "                </span>\n" +
    "                <div ng-if=\"di.detail\" class=\"cond-dropdown\" ng-show=\"di.showCheckBoxList\" ng-mouseleave=\"hideCheckboxList(di)\">\n" +
    "                    <ul style=\"min-width: 90px;margin: 5px 0;\">\n" +
    "                        <li ng-repeat=\"diDrop in di.detail\" style=\"border-bottom:0px;\">\n" +
    "                            <label style=\"padding: 0;\">\n" +
    "                                <div name=\"{{diDrop.code}}\" code=\"{{diDrop.code}}\" ng-click=\"updateShowButtonForCheck(diDrop.code, di)\" ng-class=\"{activeradio:selStatus.indexOf(diDrop.code)>-1?(di._checked=true):false}\" style=\"padding-left: 10px;\">\n" +
    "                                    {{diDrop.name}}\n" +
    "                                </div>\n" +
    "                            </label>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("template/pagination/pager.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/pagination/pager.html",
    "<ul class=\"pager\">\n" +
    "  <li ng-class=\"{disabled: noPrevious(), previous: align}\"><a href ng-click=\"selectPage(page - 1)\">{{getText('previous')}}</a></li>\n" +
    "  <li ng-class=\"{disabled: noNext(), next: align}\"><a href ng-click=\"selectPage(page + 1)\">{{getText('next')}}</a></li>\n" +
    "</ul>");
}]);

angular.module("template/pagination/pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/pagination/pagination.html",
    "<ul class=\"pagination\">\n" +
    "  <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(1)\">{{getText('first')}}</a></li>\n" +
    "  <li ng-if=\"directionLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(page - 1)\">{{getText('previous')}}</a></li>\n" +
    "  <li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active}\"><a href ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>\n" +
    "  <li ng-if=\"directionLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(page + 1)\">{{getText('next')}}</a></li>\n" +
    "  <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(totalPages)\">{{getText('last')}}</a></li>\n" +
    "</ul>");
}]);

angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-html-unsafe-popup.html",
    "<div class=\"grace-tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"grace-tooltip-arrow\"></div>\n" +
    "  <div class=\"grace-tooltip-inner\" grace-bind-html-unsafe=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-popup.html",
    "<div class=\"grace-tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"grace-tooltip-arrow\"></div>\n" +
    "  <div class=\"grace-tooltip-inner\" ng-bind=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/grid/grid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/grid/grid.html",
    "<div class=\"grace-grid-container grace-grid-container{{gridId}}\" >\n" +
    "    <style grace-grid-style >\n" +
    "        .grace-grid-container{{gridId}} {\n" +
    "            padding-top:{{valueParse(screenerHeight)}};\n" +
    "            padding-bottom:{{valueParse(paginationHeight)}};\n" +
    "        }\n" +
    "        .grid{{ gridId }} {\n" +
    "            width:{{valueParse(gridWidth)}};\n" +
    "            height:{{valueParse(gridHeight)}};\n" +
    "            overflow-x:{{ showScroller ? 'scroll':'hidden'}};\n" +
    "            overflow-y:{{gridHeight != 'auto' && !enableInfiniteScroll && (gridHeight < getBodyHeight() + headerInfo.height) && 'scroll' || 'hidden' }};\n" +
    "        }\n" +
    "        .grid{{gridId}} .grace-grid-body .grace-grid-cell .cell-content {\n" +
    "            height: {{valueParse(rowHeight == 'auto' ? rowHeight:rowHeight-1)}};\n" +
    "            white-space: {{rowHeight == 'auto' ? 'normal':'nowrap'}};\n" +
    "            text-overflow: {{rowHeight == 'auto' ? 'initial' : 'ellipsis'}};\n" +
    "            {{rowHeight != 'auto' && ('line-height:'+valueParse(rowHeight-1)+\";\") }}\n" +
    "        }\n" +
    "        .grid{{gridId}} .grace-grid-body .grace-grid-cell .cell-content > span{\n" +
    "            position: {{rowHeight == 'auto' ? 'relative':'absolute'}};\n" +
    "        }\n" +
    "        .grid{{gridId}} .grace-grid-body .grace-grid-cell .cell-content > span > span{\n" +
    "            position: {{rowHeight == 'auto' ? 'relative':'absolute'}};\n" +
    "        }\n" +
    "        .grid{{gridId}} .grace-grid-header-cell{\n" +
    "            height: {{valueParse(headerRowHeight)}};\n" +
    "        }\n" +
    "        .grid{{gridId}} header>div>div{\n" +
    "            height: {{valueParse(headerInfo.height)}};\n" +
    "        }\n" +
    "        .grid{{gridId}} header{\n" +
    "            height:{{valueParse(headerInfo.height)}};\n" +
    "            width: {{valueParse(headerInfo.totalWidth + compensation )}};\n" +
    "        }\n" +
    "        .grid{{gridId}} section{\n" +
    "            width: {{valueParse(bodyInfo.totalWidth + compensation )}};\n" +
    "        }\n" +
    "        .grid{{gridId}} .pinning-header .grace-grid-header-cell{\n" +
    "            height:{{valueParse(headerInfo.height)}};\n" +
    "        }\n" +
    "        .grid{{gridId}} .empty-tips{\n" +
    "            width: {{valueParse(headerInfo.totalWidth + compensation )}};\n" +
    "        }\n" +
    "        {{headerInfo.columnCss}}\n" +
    "    </style>\n" +
    "    <div grace-grid-screen ng-if=\"enableScreen\" ></div>\n" +
    "\n" +
    "    <div grace-grid-search-all ng-if=\"enableSearchAll\" ></div>\n" +
    "\n" +
    "    <div class=\"grid{{gridId}} grace-grid-wrapper\"  >\n" +
    "        <div class=\"grace-grid-scroller\" id=\"gridScroller\" >\n" +
    "            <header class=\"clearfix\" >\n" +
    "                <div grace-grid-header header-data=\"headerInfo\"></div>\n" +
    "            </header>\n" +
    "            <section ng-if=\"!gridDataEmpty\" ng-class=\"{'row-dragging-mode':isDraggingMode}\" >\n" +
    "                <div grace-grid-body body-data=\"bodyInfo\"></div>\n" +
    "            </section>\n" +
    "            <div ng-if=\"gridDataEmpty\" class=\"empty-tips\" >\n" +
    "                {{dataEmptyText}}\n" +
    "            </div>\n" +
    "            <footer>\n" +
    "            </footer>\n" +
    "        </div>\n" +
    "        <div grace-grid-scrollbar-vertical ng-if=\"enableInfiniteScroll\" ></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div grace-grid-pagination ng-if=\"enablePagination\" ></div>\n" +
    "</div>");
}]);

angular.module("template/grid/gridBody.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/grid/gridBody.html",
    "<div class=\"clearfix\" >\n" +
    "    <div style=\"float: left\" class=\"pinning-body\" ng-if=\"bodyData.rows2Pinning[0][0]\" >\n" +
    "        <table class=\"grace-grid-body\">\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"row in bodyData.rows2Pinning track by row.rowInfo.rowId\"\n" +
    "                    ng-class=\"{grouper:gridScope.groupingMode && row.rowInfo.hasChildren,\n" +
    "                    grouperChild:gridScope.groupingMode && !row.rowInfo.hasChildren,\n" +
    "                    expanded:row.rowInfo.expanded,\n" +
    "                    selected:row.rowInfo.selected}\"\n" +
    "                    class=\"grace-grid-body-row row-depth{{row.rowInfo.depth}}\"\n" +
    "                    ng-mousedown=\"rowMousedown(row,$event,$index)\"\n" +
    "                    ng-click=\"rowClick(row,$event)\"\n" +
    "                    ng-if=\"row.rowInfo.visible\"\n" +
    "                    tr-index=\"{{$index}}\" >\n" +
    "                    <td ng-repeat=\"rowCell in row track by rowCell.cellId\"\n" +
    "                        grace-grid-cell\n" +
    "                        cell-data=\"rowCell\"\n" +
    "                        row-index=\"row.rowInfo.originalRowIndex\"\n" +
    "                        ng-if=\"rowCell.visible\" ></td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div style=\"float: left\" class=\"normal-body\" >\n" +
    "        <table class=\"grace-grid-body\">\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"row in bodyData.rows2Render track by row.rowInfo.rowId\"\n" +
    "                    ng-class=\"{grouper:gridScope.groupingMode && row.rowInfo.hasChildren && !bodyData.rows2Pinning[0][0],\n" +
    "                    grouperChild:gridScope.groupingMode && !row.rowInfo.hasChildren && !bodyData.rows2Pinning[0][0],\n" +
    "                    expanded:row.rowInfo.expanded && !bodyData.rows2Pinning[0][0],\n" +
    "                    selected:row.rowInfo.selected}\"\n" +
    "                    class=\"grace-grid-body-row row-depth{{row.rowInfo.depth}}\"\n" +
    "                    ng-mousedown=\"rowMousedown(row,$event,$index)\"\n" +
    "                    ng-click=\"rowClick(row,$event)\"\n" +
    "                    ng-if=\"row.rowInfo.visible\"\n" +
    "                    tr-index=\"{{$index}}\" >\n" +
    "                    <td ng-repeat=\"rowCell in row track by rowCell.cellId\"\n" +
    "                        grace-grid-cell\n" +
    "                        cell-data=\"rowCell\"\n" +
    "                        row-index=\"row.rowInfo.originalRowIndex\"\n" +
    "                        ng-if=\"rowCell.visible\"  ></td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/grid/gridCell.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/grid/gridCell.html",
    "<td class=\"grace-grid-cell {{cellData.columnClasses}}\"  >\n" +
    "\n" +
    "</td>");
}]);

angular.module("template/grid/gridFooter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/grid/gridFooter.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head lang=\"en\">\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <title></title>\n" +
    "</head>\n" +
    "<body>\n" +
    "\n" +
    "</body>\n" +
    "</html>");
}]);

angular.module("template/grid/gridFooterCell.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/grid/gridFooterCell.html",
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head lang=\"en\">\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <title></title>\n" +
    "</head>\n" +
    "<body>\n" +
    "\n" +
    "</body>\n" +
    "</html>");
}]);

angular.module("template/grid/gridHeader.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/grid/gridHeader.html",
    "<div>\n" +
    "    <div style=\"display: table-cell;float:left;\" class=\"pinning-header\" ng-if=\"headerData.columns2Pinning[0][0]\" >\n" +
    "    <table class=\"grace-grid-header \" ng-if=\"gridScope.gridOptions.enablePinning\" >\n" +
    "        <thead>\n" +
    "        <tr ng-repeat=\"cells in headerData.columns2Pinning track by $index\" vars=\"{{rowIndex = $index}}\" >\n" +
    "            <th grace-grid-header-cell\n" +
    "                ng-repeat=\"cell in cells track by cell.columnId\"\n" +
    "                cell-data=\"cell\"\n" +
    "                row-index=\"rowIndex\"\n" +
    "                column-index=\"$index\"\n" +
    "\n" +
    "\n" +
    "                ng-if=\"gridScope.gridOptions.enableScreen && cell.visible || !gridScope.gridOptions.enableScreen\"\n" +
    "                    ></th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "    </table>\n" +
    "    </div>\n" +
    "    <div class=\"normal-header\" style=\"display: table-cell;float:left;\" >\n" +
    "    <table class=\"grace-grid-header\" >\n" +
    "        <thead>\n" +
    "        <tr ng-repeat=\"cells in headerData.columns2Render track by $index\" vars=\"{{rowIndex = $index}}\" >\n" +
    "            <th grace-grid-header-cell\n" +
    "                ng-repeat=\"cell in cells track by cell.columnId\"\n" +
    "                cell-data=\"cell\"\n" +
    "                row-index=\"rowIndex\"\n" +
    "                column-index=\"$index\"\n" +
    "\n" +
    "\n" +
    "                ng-if=\"gridScope.gridOptions.enableScreen && cell.visible || !gridScope.gridOptions.enableScreen\"\n" +
    "                    ></th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "    </table>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/grid/gridHeaderCell.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/grid/gridHeaderCell.html",
    "<th class=\"grace-grid-header-cell {{cellData.columnClasses}}\"  colspan=\"{{cellData.colspan}}\" rowspan=\"{{cellData.rowspan}}\" >\n" +
    "   <!-- <div class=\"cell-content\"  >\n" +
    "        <span ng-if=\"cellData.desc\"\n" +
    "              tooltip=\"{{cellData.desc}}\"\n" +
    "              tooltip-append-to-body=\"{{gridScope.tooltipConfig.append2Body}}\"\n" +
    "              tooltip-popup-delay=\"{{gridScope.tooltipConfig.showDelay}}\"\n" +
    "              tooltip-placement=\"{{gridScope.tooltipConfig.place}}\" >\n" +
    "            <i class=\"grace-icon-question-sign\" ></i>\n" +
    "        </span>\n" +
    "        <span class=\"cell-value\" ng-click=\"valueClick($event)\"  >\n" +
    "            {{cellData.displayName}}\n" +
    "            <i ng-if=\"cellData.sortable && !cellData.children\" ng-class=\"{'grace-icon-sort-down':sortTypeIndex == 2,'grace-icon-sort-up':sortTypeIndex == 1,'grace-icon-sort':sortTypeIndex == 0}\" ></i>\n" +
    "        </span>\n" +
    "        <div ng-if=\"!cellData.children && gridOptions.enableFilter && !cellData.disableFilter\" class=\"column-filter\" >\n" +
    "            <input type=\"text\" ng-model=\"cellData.filterKeyWord\" ng-change=\"filterChange($event)\" />\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <div ng-if=\"cellData.pinnable && !cellData.disablePinning\" class=\"pin-icon\" ng-class=\"{pinned:cellData.pinned}\" ng-click=\"togglePinning($event)\" >\n" +
    "        <i class=\"grace-icon-pushpin\" ></i>\n" +
    "    </div>\n" +
    "    <div ng-if=\"gridScope.enableColumnResize && cellData.enableResize && !cellData.children\" class=\"resize-bar\" ng-mousedown=\"beginResize($event)\" ></div>-->\n" +
    "</th>");
}]);

angular.module("template/grid/gridPagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/grid/gridPagination.html",
    "<div class=\"grace-grid-pagination grace-clear\"  >\n" +
    "\n" +
    "    <pagination  total-items=\"totalItems\"\n" +
    "                ng-model=\"currentPageIndex\"\n" +
    "                max-size=\"paginationSize\"\n" +
    "                class=\"pagination-sm\"\n" +
    "                boundary-links=\"true\"\n" +
    "                rotate=\"true\"\n" +
    "                items-per-page=\"pageSize\"\n" +
    "                ng-change=\"changePage()\"\n" +
    "                num-pages=\"totalPages\"\n" +
    "                previous-text=\"上一页\"\n" +
    "                next-text=\"下一页\"\n" +
    "                first-text=\"首页\"\n" +
    "                last-text=\"尾页\"></pagination>\n" +
    "\n" +
    "    <div class=\"pagination-info\" >\n" +
    "        <span>第{{currentPageIndex}}/{{totalPages}}页</span>\n" +
    "    </div>\n" +
    "    <div class=\"pagination-info\" >\n" +
    "        <span>\n" +
    "            到\n" +
    "            <input type=\"number\" ng-model=\"currentPageIndex\" ng-change=\"changePage()\" />\n" +
    "            页\n" +
    "        </span>\n" +
    "    </div>\n" +
    "    <div class=\"pagination-sizes\" >\n" +
    "        每页<select ng-model=\"pageSize\" ng-options=\"item for item in pageSizes\" ng-change=\"changePage()\" ></select>条\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"record-num\" >\n" +
    "        共{{totalItems}}条\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("template/grid/gridScreener.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/grid/gridScreener.html",
    "<div class=\"grace-grid-screen grace-clear\" >\n" +
    "    <div ng-if=\"screenConfig.type == 'in-line'\" >\n" +
    "        <div class=\"screen-left\" >{{screenConfig.screenLabel}}</div>\n" +
    "        <div class=\"screen-right grace-clear\">\n" +
    "            <div class=\"screen-item\" ng-repeat=\"si in screener track by $index\" ng-click=\"doCheck($index,$event)\" >\n" +
    "                <label>{{si.label}}</label><i class=\"{{si.checked?'grace-icon-check':'grace-icon-unchecked'}}\"></i>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-if=\"screenConfig.type == 'drop-down'\" >\n" +
    "        <div class=\"screen-drop-down-trigger\" ng-click=\"showDropDown($event)\" ng-class=\"{'active':dropDownConfig.active}\" var=\"{{dropDownConfig.active}}\" >\n" +
    "            <span>{{screenConfig.screenLabel}}</span><i class=\"grace-icon-caret-down\" ></i>\n" +
    "        </div>\n" +
    "        <div class=\"screen-drop-down\"  ng-class=\"{active:dropDownConfig.active}\" >\n" +
    "            <ul class=\"clearfix\"  ng-style=\"{width:screenConfig.dropDownWidth+'px'}\" ng-class=\"{unClickable:visibleCount<=1}\" >\n" +
    "                <li class=\"screen-drop-down-item\" ng-repeat=\"si in screener track by $index\" ng-click=\"doCheck($index,$event)\" ng-style=\"{width:1/screenConfig.dropDownColumnCount*100+'%'}\"  >\n" +
    "                    <i class=\"{{si.checked?'grace-icon-check':'grace-icon-unchecked'}}\" ></i><label>{{si.label}}</label>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/grid/gridSearchAll.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/grid/gridSearchAll.html",
    "");
}]);

angular.module("template/input/input.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/input/input.html",
    "<div class=\"grace-input clearfix\">\n" +
    "    <label ng-style=\"config.label.style\" ng-show=\"config.label.text\">{{config.label.text}}</label>\n" +
    "    <input class=\"form-control {{!!config.label.text ? '' : 'all'}}\" ng-style=\"config.input.style\"\n" +
    "           placeholder=\"{{config.input.placeholder}}\"\n" +
    "           ng-model=\"config.value\"\n" +
    "           type=\"{{config.input.type != 'number' ? config.input.type : ''}}\" name=\"{{config.input.name}}\"\n" +
    "           tooltip=\"{{config.$v.text}}\" tooltip-trigger=\"blur\" tooltip-placement=\"bottom\"\n" +
    "           ng-class=\"{error: angular.isDefined(config.$v.text) && (config.$v.text != '') && !first}\">\n" +
    "</div>");
}]);

angular.module("template/modal/backdrop.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/backdrop.html",
    "<div class=\"modal-backdrop fade {{ backdropClass }}\"\n" +
    "     ng-class=\"{in: animate}\"\n" +
    "     ng-style=\"{'z-index': 1040 + (index && 1 || 0) + index*10}\"\n" +
    "></div>\n" +
    "");
}]);

angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/window.html",
    "<div tabindex=\"-1\" role=\"dialog\" class=\"modal fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
    "    <div class=\"modal-dialog\" ng-class=\"{'modal-sm': size == 'sm', 'modal-lg': size == 'lg'}\"><div class=\"modal-content\" modal-transclude></div></div>\n" +
    "</div>");
}]);

angular.module("template/nav/nav.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/nav/nav.html",
    "<div class=\"grace-nav-new clearfix\"> \n" +
    "  <a ng-class=\"vm.logo\"></a>\n" +
    "  <ul class=\"grace-nav-list\">\n" +
    "    <li class=\"grace-nav-item-{{($index+1)}}\" ng-repeat=\"navData in navsData track by $index\" ng-mouseover=\"listShow = true\" ng-mouseleave=\"listShow = false\"> <a ng-bind=\"navData.title\" ng-href=\"{{navData.url}}\" ng-class=\"{on:listShow}\"></a>\n" +
    "      <dl ng-if=\"navData.detail\" ng-show=\"listShow\">\n" +
    "        <dd ng-repeat=\"nav in navData.detail\" class=\"grace-nav-item-{{($index+1)}}\"> <a ng-bind=\"nav.title\" ng-href=\"{{nav.url}}\"></a> </dd>\n" +
    "      </dl>\n" +
    "      <i class=\"grace-nav-icon-role\" ng-if=\"navData.detail\" ng-show=\"listShow\"></i> </li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("template/radio/radio.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/radio/radio.html",
    "<div class=\"grace-radio-wrapper {{radioConfig.extraCSS}}\">\n" +
    "    <div class=\"grace-radio-item-wrapper\">\n" +
    "        <span ng-repeat=\"item in data.list\" class=\"grace-radio-item\"\n" +
    "              ng-class=\"{selected: $index == select()}\" ng-click=\"select($index)\">\n" +
    "            <span class=\"grace-radio-item-icon\"></span>\n" +
    "            <span class=\"grace-radio-item-text\">{{item.name || item}}</span>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/select/select.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/select/select.html",
    "<div class=\"grace-select clearfix\">\n" +
    "    <label class=\"control-label\" ng-style=\"config.label.style\" ng-show=\"config.label.text\">{{config.label.text}}</label>\n" +
    "    <div class=\"dropdown-container {{!!config.label.text ? '' : 'all'}}\" dropdown ng-style=\"config.input.style\">\n" +
    "        <div class=\"item-select\" tabindex=\"0\" hidefocus=\"true\" dropdown-toggle>\n" +
    "            <span class=\"item-name\" ng-bind=\"currentItem.text\"></span>\n" +
    "            <a class=\"toggle\"></a>\n" +
    "        </div>\n" +
    "        <ul class=\"dropdown-menu\">\n" +
    "            <li ng-repeat=\"item in config.list\" ng-class=\"{selected: item.value == currentItem.value}\">\n" +
    "                <a href value=\"{{item.value}}\" ng-click=\"selectItem(item);\">{{item.text}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("template/selectByGroup/selectByGroup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/selectByGroup/selectByGroup.html",
    "<div class=\"selectByGroup\">\n" +
    "    <a class=\"selection\" ng-class=\"{isMore:selectionData.length == 0}\" ng-click=\"changeSelectionShow()\"> {{baseFirst.name}}<span class=\"selection-dropdown\"></span></a>\n" +
    "    <div class=\"selectionList\">\n" +
    "		<div class=\"selection-title\" ng-hide=\"curCode == 'own'\">\n" +
    "			<ul class=\"clearfix\">\n" +
    "				<li ng-class=\"{on:index == $index}\" ng-repeat=\"t in selectionData.title\" ng-click=\"changTitle($index)\" ng-bind=\"t\"></li>\n" +
    "			</ul>\n" +
    "			<div class=\"selection-search\">\n" +
    "				<input type=\"text\" placeholder=\"请输入要搜索的内容\" class=\"selection-search-searchbox\">\n" +
    "				<span class=\"selection-search-searchbtn\"></span>\n" +
    "				<div class=\"selection-searchbox-searchResult\" ng-show=\"!searchResult23Empty\" >\n" +
    "                    <span class=\"selection-searchbox-resultItem\"  ng-repeat=\"item in searchResult23\" ng-click=\"nodeClick(item)\" >{{item.name}}</span>\n" +
    "                </div>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "		<div class=\"selection-body clearfix\">\n" +
    "			<a ng-repeat=\"item in curDataList\"><span ng-bind=\"item.name\" ng-class=\"{on:item.checked}\" ng-click=\"nodeClick(item)\"></span></a>\n" +
    "    	</div>\n" +
    "    	<i class=\"selection-arrow\"></i>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("template/summary/summary-item.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/summary/summary-item.html",
    "<li class=\"grace-summary-item\">\n" +
    "    <div class=\"arrow-outer\">\n" +
    "        <div class=\"arrow-inner\"></div>\n" +
    "    </div>\n" +
    "    <h6 class=\"summary-title\"><label desc=\"{{sum.desc}}\">{{sum.value}}</label></h6>\n" +
    "    <span>\n" +
    "        <div id=\"Odometer{{sum.id}}\" class=\"odometer\">{{sum.currentData}}</div>\n" +
    "        <label class=\"percent\" ng-bind-html=\"to_trusted(sum.currentType)\">{{sum.currentType}}</label>\n" +
    "    </span>\n" +
    "\n" +
    "    <div id=\"Trend{{sum.id}}\" class=\"clearfix trendDataOutDiv num {{sum.trendCss}}\">\n" +
    "        <b><label ng-class=\"{abnormal:sum.abnormal}\">{{sum.trendRatio}}</label></b>\n" +
    "\n" +
    "        <div class=\"isBrFlag\" style=\"display: none\"><br/></div>\n" +
    "        <em class=\"trendData\">{{sum.trendData}}</em>\n" +
    "    </div>\n" +
    "</li>");
}]);

angular.module("template/summary/summary.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/summary/summary.html",
    "<div class=\"grace-summary\" >\n" +
    "    <ul class=\"grace-clear summary-list\"  >\n" +
    "        <li class=\"summary-item\"\n" +
    "            ng-repeat=\"sum in curSummaryData track by $index\"\n" +
    "            ng-class=\"{disable:sum.disable,selected:selectedIndex == $index}\"\n" +
    "            ng-click=\"itemClick($index,$event)\" >\n" +
    "            <div class=\"arrow-outer\" >\n" +
    "                <div class=\"arrow-inner\"></div>\n" +
    "            </div>\n" +
    "            <h6 class=\"summary-title\">\n" +
    "                <label tooltip=\"{{sum.desc}}\" tooltip-placement=\"bottom\" tooltip-append-to-body=\"true\" >{{sum.title}}</label>\n" +
    "            </h6>\n" +
    "\n" +
    "            <div class=\"summary-body\" >\n" +
    "                <div class=\"odometer {{sum.mainValue.class}}\" style=\"{{sum.mainValue.style}}\" ></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"summary-foot grace-clear\" ng-if=\"sum.footLeftValue || sum.footRightValue\" >\n" +
    "                <b ng-if=\"sum.footLeftValue\"\n" +
    "                   class=\"foot-left {{sum.footLeftValue.class}}\"\n" +
    "                   style=\"{{sum.footLeftValue.style}}\" >{{sum.footLeftValue.value | summaryFilter:sum.footLeftValue.format}}</b>\n" +
    "                <b ng-if=\"sum.footRightValue\"\n" +
    "                   class=\"foot-right {{sum.footRightValue.class}}\"\n" +
    "                   style=\"{{sum.footRightValue.style}}\" >{{sum.footRightValue.value | summaryFilter:sum.footRightValue.format}}</b>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "        <li class=\"summary-item\"\n" +
    "            ng-show=\"overFlowData\"\n" +
    "            ng-class=\"{selected:selectedIndex == maxItemCount-1}\"\n" +
    "            ng-click=\"overFlowItemClick($event)\" >\n" +
    "            <div class=\"arrow-outer\" >\n" +
    "                <div class=\"arrow-inner\"></div>\n" +
    "            </div>\n" +
    "            <h6 class=\"summary-title\" >\n" +
    "                <select ng-click=\"onSelectClick($event)\"\n" +
    "                        ng-change=\"overFlowItemChanged($event)\"\n" +
    "                        ng-model=\"selectedOverFlow\"\n" +
    "                        ng-options=\"item.title for item in overFlowData\"></select>\n" +
    "            </h6>\n" +
    "\n" +
    "            <div class=\"summary-body\" ng-show=\"selectedOverFlow.mainValue\" >\n" +
    "                <!--<div style=\"display: none\" class=\"odometer-value\" >{{sum.value}}</div>-->\n" +
    "                <div class=\"odometer\" ></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"summary-foot grace-clear\" ng-if=\"selectedOverFlow.footLeftValue || selectedOverFlow.footRightValue\" >\n" +
    "                <b ng-if=\"selectedOverFlow.footLeftValue\"\n" +
    "                   class=\"foot-left {{selectedOverFlow.footLeftValue.class}}\"\n" +
    "                   style=\"{{selectedOverFlow.footLeftValue.style}}\" >{{selectedOverFlow.footLeftValue.value | summaryFilter:selectedOverFlow.footLeftValue.format}}</b>\n" +
    "                <b ng-if=\"selectedOverFlow.footRightValue\"\n" +
    "                   class=\"foot-right {{sum.footRightValue.class}}\"\n" +
    "                   style=\"{{selectedOverFlow.footRightValue.style}}\" >{{selectedOverFlow.footRightValue.value | summaryFilter:selectedOverFlow.footRightValue.format}}</b>\n" +
    "            </div>\n" +
    "\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>");
}]);

angular.module("template/summaryList/summaryList.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/summaryList/summaryList.html",
    "<div  class=\"grace-summaryList clearfix\">\n" +
    "\n" +
    "        <h3><i class=\"{{summaryListData.titleClass}}\"></i>{{summaryListData.title}}</h3>\n" +
    "      \n" +
    "     <div class=\"summary-item\" ng-repeat=\"item in summaryListData.data track by $index\" style=\"height:{{rowheight}}px\">\n" +
    "             <div class=\"summary-inner\" ng-if=\"item&&item.name\"  >\n" +
    "                <label class=\"icon-help\"  tooltip=\"{{item.desc}}\" tooltip-placement=\"bottom\"></label>\n" +
    "                <span ng-bind=\"item.name\"></span>\n" +
    "                <strong ng-bind=\"item.value\"></strong>\n" +
    "             </div>\n" +
    "             \n" +
    "             <div class=\"summary-inner\" ng-if=\"item&&item.length>1\" ng-repeat=\"ii in item track by $index\"  style=\"margin-top:11px\">\n" +
    "                <label class=\"icon-help\"  tooltip=\"{{ii.desc}}\" tooltip-placement=\"bottom\"></label>\n" +
    "                <span ng-bind=\"ii.name\"></span>\n" +
    "                <strong ng-bind=\"ii.value\"></strong>\n" +
    "             </div>\n" +
    "             <div class=\"summary-inner\" ng-if=\"!(item&&item.name)\"></div>\n" +
    "      </div>\n" +
    "    \n" +
    "    </div>\n" +
    "");
}]);

angular.module("template/table/table.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/table/table.html",
    "<table class=\"grace-table\" >\n" +
    "    <thead>\n" +
    "        <th class=\"grace-table-th\" ng-repeat=\"th in tableData.head\" ng-if=\"th.hide !== true\" ng-switch on=\"th.type\" >\n" +
    "\n" +
    "             <!--<span ng-if=\"!th.isSearch\">{{th.name}}</span>\n" +
    "             <div ng-if=\"th.isSearch\" id=\"{{'th_'+(th.code?th.code:'')}}\">\n" +
    "                 <div class=\"search-wrapper\">\n" +
    "                     <input type=\"text\" placeholder=\"{{th.placeholder}}\" >\n" +
    "                     <i ng-click=\"searchData($event, th)\"></i>\n" +
    "                 </div>\n" +
    "             </div>-->\n" +
    "            <div ng-switch-when=\"search\" id=\"{{'th_'+(th.code?th.code:'')}}\" >\n" +
    "                <div class=\"search-wrapper\">\n" +
    "                    <input type=\"text\" placeholder=\"{{th.placeholder}}\" value=\"{{th.text}}\"  ng-keypress=\"searchData($event, th)\">\n" +
    "                    <i ng-click=\"searchData($event, th)\"></i>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div ng-switch-when=\"filter\" class=\"btn-group dropdown-box\" dropdown dropdown-toggle>\n" +
    "                <!--<select ng-model=\"th.selected\" ng-options=\"f.name for f in th.filter\" ng-change=\"onFilterDispatch($index,th.selected)\" ></select>-->\n" +
    "                <button type=\"button\" class=\"btn\">{{th.selected.name}}</button>\n" +
    "                <button type=\"button\" class=\"btn dropdown-toggle\">\n" +
    "                    &nabla;\n" +
    "                </button>\n" +
    "                <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "                    <li ng-repeat=\"f in th.filter\" ng-click=\"onFilterDispatch(th,$index)\" ><a>{{f.name}}</a></li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <span ng-switch-default >{{th.name}}</span>\n" +
    "        </th>\n" +
    "        <!--<th class=\"grace-table-th\" ng-if=\"enableFn\" >{{fnThText}}</th>-->\n" +
    "    </thead>\n" +
    "\n" +
    "    <tbody>\n" +
    "    <tr class=\"grace-table-tr\" ng-repeat=\"item in tableData.body\" >\n" +
    "        <td class=\"grace-table-td\"\n" +
    "            ng-repeat=\"it in item track by $index\"\n" +
    "            var=\"{{itIndex = $index;colFilterable = tableData.head[itIndex].formatter;colCode = tableData.head[itIndex].code}}\"\n" +
    "            ng-if=\"tableData.head[$index].hide !== true\" >\n" +
    "            <tsc ng-if=\"!isArray(it) && !isObject(it)\" >\n" +
    "                <a ng-bind-html=\"it|tableFilter:colCode\" class=\"grace-table-value\" title=\"{{tableData.head[itIndex].tipBubble ? tipBubbleFormatter(it) : ''}}\" ></a>\n" +
    "                <i ng-if=\"tableData.head[$index].editable\" ng-click=\"editCell(table.head,item,$index,$event)\" class=\"grace-table-btn-edit\" >&#9998;</i>\n" +
    "            </tsc>\n" +
    "            <tsc ng-if=\"isArray(it)\"  ng-repeat=\"t in it track by $index\" ng-class=\"{'grace-table-cell-fn':t.fn}\" >\n" +
    "                <span ng-if=\"!isObject(t)\" ng-bind-html=\"t|tableFilter:colCode\" title=\"{{tableData.head[itIndex].tipBubble ? tipBubbleFormatter(t) : ''}}\" ></span>\n" +
    "                <span ng-if=\"isObject(t)\" >\n" +
    "                    <i ng-if=\"t.iconClass\" class=\"{{t.iconClass}}\" ></i>\n" +
    "                    <a ng-click=\"t.fn(tableData.head,item,$event)\" ng-bind-html=\"t.text|tableFilter:colCode\" title=\"{{tableData.head[itIndex].tipBubble ? tipBubbleFormatter(t.text) : ''}}\" ></a>\n" +
    "                </span>\n" +
    "            </tsc>\n" +
    "            <tsc ng-if=\"isObject(it)\"  ng-click=\"it.fn(tableData.head,item,$index,$event)\">\n" +
    "                <i ng-if=\"it.iconClass\" class=\"{{it.iconClass}}\" ></i>\n" +
    "                <a ng-bind-html=\"it.text\" title=\"{{tableData.head[itIndex].tipBubble ? tipBubbleFormatter(it.text) : ''}}\" ></a>\n" +
    "            </tsc>\n" +
    "        </td>\n" +
    "        <td class=\"grace-table-td\" ng-if=\"enableFn && item.$$fn\" >\n" +
    "            <span class=\"grace-table-btn\" ng-repeat=\"fn in item.$$fn track by $index\" >\n" +
    "                <i ng-if=\"fn.iconClass\" class=\"{{fn.iconClass}}\" ></i>\n" +
    "                <a ng-click=\"fn.fn(tableData.head,item)\" ng-bind-html=\"fn.text\" ></a>\n" +
    "            </span>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    </tbody>\n" +
    "\n" +
    "</table>");
}]);

angular.module("template/tabs/tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tab.html",
    "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
    "    <a ng-click=\"select()\" tab-heading-transclude>{{heading}}</a>\n" +
    "</li>\n" +
    "");
}]);

angular.module("template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tabset.html",
    "<div>\n" +
    "    <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "    <div class=\"tab-content\">\n" +
    "        <div class=\"tab-pane\"\n" +
    "             ng-repeat=\"tab in tabs\"\n" +
    "             ng-class=\"{active: tab.active}\"\n" +
    "             tab-content-transclude=\"tab\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
