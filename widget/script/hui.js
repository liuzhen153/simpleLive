/*!
 * 文件名称：hui.js
 * 文件版本：Version 2.0.2
 * 文件作者：百小僧
 * 编写日期：2016年05月30日
 * 版权所有：百签软件（中山）有限公司
 * 企业官网：http://www.baisoft.org
 * 开源协议：MIT License
 * 文件描述：一切从简，只为了更懒！
 */
; !function (factory) {
    "use strict";
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        var target = module['exports'] || exports;
        factory(target);
    } else if (typeof define === 'function' && define['amd']) {
        define(['exports'], factory);
    } else {
        factory(window['hui'] = {});
    }
}(function (HExports) {
    var exports = typeof HExports !== 'undefined' ? HExports : {};
    exports.v = "2.0.0 alpha";
    // 基础方法
    exports.isTargetType = function (obj, typeStr) {
        return typeof obj === typeStr;
    }
    ;
    exports.isUndefined = function (obj) {
        var that = this;
        return that.isTargetType(obj, 'undefined');
    }
    ;
    exports.isValid = function (obj) {
        var that = this;
        return !that.isUndefined(obj) && obj != null;
    }
    ;
    exports.isNumber = function (obj) {
        var that = this;
        if (!that.isValid(obj)) {
            return false;
        }
        return !isNaN(obj);
    }
    ;
    exports.isFunction = function (obj) {
        var that = this;
        if (!that.isValid(obj)) {
            return false;
        }
        return that.isTargetType(obj, 'function');
    }
    ;
    exports.isBoolean = function (obj) {
        var that = this;
        if (!that.isValid(obj)) {
            return false;
        }
        return that.isTargetType(obj, 'boolean');
    }
    ;
    exports.isString = function (obj) {
        var that = this;
        if (!that.isValid(obj)) {
            return false;
        }
        return that.isTargetType(obj, 'string');
    }
    ;
    exports.isDate = function (obj) {
        var that = this;
        if (!that.isValid(obj)) {
            return false;
        }
        return (/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))(\s+([01][0-9]:|2[0-3]:)?[0-5][0-9]:[0-5][0-9])?$/).test(obj);
    }
    ;
    exports.isPlusDecimal = function (obj) {
        var that = this;
        if (!that.isValid(obj)) {
            return false;
        }
        return (/^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/).test(obj);
    }
    ;
    exports.isJson = function (obj) {
        var that = this;
        return that.isTargetType(obj, 'object') && Object.prototype.toString.call(obj).toLowerCase() == '[object object]' && !obj.length;
    }
    ;
    exports.isArray = function (obj) {
        return (toString.apply(obj) === '[object Array]') || obj instanceof NodeList;
    }
    ;
    exports.isElement = function (obj) {
        return !!(obj && (obj.nodeType == 1 || obj.nodeType == 9));
    }
    ;
    exports.getCustomType = function (obj) {
        return ((/function\s+(\w[0-9a-zA-Z_]*)\(/i).exec(obj.constructor))[1];
    }
    ;
    exports.getFunctionName = function (functionStr) {
        return ((/function\s+(\w[0-9a-zA-Z_]*)\(/i).exec(functionStr))[1];
    }
    ;
    exports.trim = function (obj) {
        var that = this;
        if (!that.isValid(obj)) {
            return obj;
        }
        return obj.replace(/(^\s*)|(\s*$)/g, '');
    }
    ;
    exports.trimAll = function (obj) {
        var that = this;
        if (!that.isValid(obj)) {
            return obj;
        }
        return obj.replace(/\s*/g, '')
    }
    ;
    exports.apiExit = function () {
        var that = this;
        return typeof api !== 'undefined' && typeof api.appVersion !== 'undefined';
    }
    ;
    exports.objParse = function (obj) {
        return JSON.stringify(obj);
    }
    ;
    exports.guid = function () {
        function core() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (core() + core() + "-" + core() + "-" + core() + "-" + core() + "-" + core() + core() + core());
    }
    ;
    // 将url地址参数变为json对象
    exports.parseQueryString = function (url) {
        var obj = {};
        var keyvalue = [];
        var key = ""
          , value = "";
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        for (var i in paraString) {
            keyvalue = paraString[i].split("=");
            key = keyvalue[0];
            value = keyvalue[1];
            obj[key] = value;
        }
        return obj;
    }
    ;
    exports.serialize = function (obj) {
        var s = ""
        for (var itm in obj) {
            if (obj[itm] instanceof Array == true) {
                s += "&" + itm + "_count=" + obj[itm].length;
                for (var i = 0; i < obj[itm].length; i++) {
                    if (obj[itm][i] instanceof Array == true) {
                        s += arguments.callee(obj[itm][i]);
                    } else if (obj[itm][i] instanceof Object == true) {
                        s += arguments.callee(obj[itm][i]);
                    } else {
                        s += "&" + encodeURI(obj[itm][i]) + "=" + encodeURI(obj[itm][i]);
                    }
                }
            } else if (obj[itm] instanceof Object == true) {
                s += arguments.callee(obj[itm]);
            } else {
                s += "&" + encodeURI(itm) + "=" + encodeURI(obj[itm]);
            }
        }
        return s;
    }
    ;
    exports.getValueTypeFormat = function (value) {
        if (typeof value == "string") {
            return "'" + value + "'";
        } else {
            return JSON.stringify(value);
        }
    }
    ;
    exports.uzStorage = function () {
        var ls = window.localStorage;
        if ((/android/gi).test(navigator.appVersion)) {
            ls = os.localStorage();
        }
        return ls;
    }
    ;
    exports.setStorage = function (key, value) {
        var that = this;
        if (arguments.length === 2) {
            var v = value;
            if (typeof v == 'object') {
                v = JSON.stringify(v);
                v = 'obj-' + v;
            } else {
                v = 'str-' + v;
            }
            var ls = that.uzStorage();
            if (ls) {
                ls.setItem(key, v);
            }
        }
    }
    ;
    exports.getStorage = function (key) {
        var that = this;

        var ls = that.uzStorage();
        if (ls) {
            var v = ls.getItem(key);
            if (!v) {
                return;
            }
            if (v.indexOf('obj-') === 0) {
                v = v.slice(4);
                return JSON.parse(v);
            } else if (v.indexOf('str-') === 0) {
                return v.slice(4);
            }
        }
    }
    ;
    // 对象深度拷贝（https://github.com/sindresorhus/deep-assign）
    function isObj(x) {
        var type = typeof x;
        return x !== null && (type === 'object' || type === 'function');
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
        if (val === null || val === undefined) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        return Object(val);
    }
    function assignKey(to, from, key) {
        var val = from[key];
        if (val === undefined || val === null) {
            return;
        }
        if (hasOwnProperty.call(to, key)) {
            if (to[key] === undefined || to[key] === null) {
                throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
            }
        }
        if (!hasOwnProperty.call(to, key) || !isObj(val)) {
            to[key] = val;
        } else {
            to[key] = assign(Object(to[key]), from[key]);
        }
    }
    function assign(to, from) {
        if (to === from) {
            return to;
        }
        from = Object(from);
        for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
                assignKey(to, from, key);
            }
        }
        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
                if (propIsEnumerable.call(from, symbols[i])) {
                    assignKey(to, from, symbols[i]);
                }
            }
        }
        return to;
    }
    exports.deepAssign = function (target) {
        target = toObject(target);
        for (var s = 1; s < arguments.length; s++) {
            assign(target, arguments[s]);
        }
        return target;
    }
    ;
    // DOM操作
    exports.byId = function (elementId) {
        return document.getElementById(elementId);
    }
    ;
    exports.byClassName = function (className) {
        return document.getElementsByClassName(className);
    }
    ;
    exports.byTagName = function (tagName) {
        return document.getElementsByTagName(tagName);
    }
    ;
    exports.$ = function (selectors) {
        return document.querySelectorAll(selectors);
    }
    ;
    exports.single = function (selectors) {
        return document.querySelector(selectors);
    }
    ;
    exports.first = function (selectors) {
        var that = this;
        var elems = that.$(selectors);
        if (elems && elems.length > 0) {
            return elems[0];
        } else {
            console.warn("没有找到元素。");
            return null;
        }
    }
    ;
    exports.last = function (selectors) {
        var that = this;
        var elems = that.$(selectors);
        if (elems && elems.length > 0) {
            return elems[elems.length - 1];
        } else {
            console.warn("没有找到元素。");
            return null;
        }
    }
    ;
    exports.find = function (element, selectors) {
        return element.querySelectorAll(selectors);
    }
    ;
    exports.getCss = function (element, cssProp) {
        const win = element.ownerDocument.defaultView;
        return win.getComputedStyle(element, null)[cssProp];
    }
    ;
    exports.offset = function (selectors) {
        var that = this;
        var element = that.single(selectors);
        var box = element.getBoundingClientRect();
        return {
            t: box.top + window.pageYOffset - document.documentElement.clientTop,
            l: box.left + window.pageXOffset - document.documentElement.clientLeft,
            w: element.offsetWidth,
            h: element.offsetHeight
        }
    }
    ;
    // 载入link import模板
    exports.LoadLinkTppl = function (templateSelectors, targetSelectors) {
        var that = this;
        var links = that.$('link[rel="import"]');
        Array.prototype.forEach.call(links, function (link) {
            var template = link.import.querySelector(templateSelectors);
            var clone = document.importNode(template.content, true);
            that.single(targetSelectors).appendChild(clone);
        })
    }
    ;
    // Javscript模板引擎
    exports.tppl_flag = ["<%", "%>"];
    exports.tppl = function (tpl, data) {
        var that = this;
        var fn = function (d) {
            var i, k = [], v = [];
            for (i in d) {
                k.push(i);
                v.push(d[i]);
            }
            ; return (new Function(k, fn.$)).apply(d, v);
        }
        ;
        if (!fn.$) {
            var tpls = tpl.split(that.tppl_flag[0]);
            fn.$ = "var $=''";
            for (var t = 0; t < tpls.length; t++) {
                var p = tpls[t].split(that.tppl_flag[1]);
                if (t != 0) {
                    fn.$ += '=' == p[0].charAt(0) ? "+(" + p[0].substr(1) + ")" : ";" + p[0].replace(/\r\n/g, '') + "$=$"
                }
                fn.$ += "+'" + p[p.length - 1].replace(/\'/g, "\\'").replace(/\r\n/g, '\\n').replace(/\n/g, '\\n').replace(/\r/g, '\\n') + "'";
            }
            fn.$ += ";return $;";
        }
        return data ? fn(data) : fn;
    }
    ;
    // APICloud属性
    var apiProperties = ["appId", "appName", "appVersion", "systemType", "systemVersion", "version", "deviceId", "deviceToken", "deviceModel", "deviceName", "operator", "connectionType", "fullScreen", "screenWidth", "screenHeight", "winName", "winWidth", "winHeight", "frameName", "frameWidth", "frameHeight", "pageParam", "wgtParam", "appParam", "statusBarAppearance", "wgtRootDir", "fsDir", "cacheDir", "debug"];
    apiProperties.forEach(function (property) {
        Object.defineProperty(exports, property, {
            get: function () {
                var that = this;
                if (!that.apiExit()) {
                    return;
                }
                return api[property];
            }
        });
    });
    // APICloud常量
    exports.constant = {
        toast_location: {
            top: "top",
            middle: "middle",
            bottom: "bottom"
        },
        sensor_type: {
            accelerometer: "accelerometer",
            gyroscope: "gyroscope",
            magnetic_field: "magnetic_field",
            proximity: "proximity"
        },
        error_code: {
            0: "错误",
            1: "没有指定模块",
            2: "没有指定方法",
            3: "参数不匹配",
            4: "没有权限"
        },
        call_type: {
            tel: "tel",
            tel_prompt: "tel_prompt",
            facetime: "facetime"
        },
        location_accuracy: {
            "10m": "10m",
            "100m": "100m",
            "1km": "1km",
            "3km": "3km"
        },
        animation_type: {
            none: "none",
            push: "push",
            movein: "movein",
            fade: "fade",
            flip: "flip",
            reveal: "reveal",
            ripple: "ripple",
            curl: "curl",
            un_curl: "un_curl",
            suck: "suck",
            cube: "cube"
        },
        animation_curve: {
            ease_in_out: "ease_in_out",
            ease_in: "ease_in",
            ease_out: "ease_out",
            linear: "linear"
        },
        animation_subType: {
            from_right: "from_right",
            from_left: "from_left",
            from_top: "from_top",
            from_bottom: "from_bottom"
        },
        showProgress_animationType: {
            fade: "fade",
            zoom: "zoom"
        },
        showProgress_style: {
            default: "default"
        },
        getPicture_mediaValue: {
            pic: "pic",
            video: "video",
            all: "all"
        },
        getPicture_videoQuality: {
            low: "low",
            medium: "medium",
            high: "high"
        },
        openPicker_type: {
            date: "date",
            time: "time",
            date_time: "date_time"
        },
        getPicture_encodingType: {
            jpg: "jpg",
            png: "png"
        },
        getPicture_destinationType: {
            base64: "base64",
            url: "url"
        },
        getPicture_sourceType: {
            library: "library",
            camera: "camera",
            album: "album"
        },
        connectionType: {
            unknown: "unknown",
            ethernet: "ethernet",
            wifi: "wifi",
            "2g": "2g",
            "3g": "3g",
            "4g": "4g",
            none: "none"
        },
        file_error_code: {
            "0": "没有错误",
            "1": "找不到文件错误",
            "2": "不可读取错误",
            "3": "编码格式错误",
            "4": "无效操作错误",
            "5": "无效修改错误",
            "6": "磁盘溢出错误",
            "7": "文件已存在错误"
        },
        systemType: {
            ios: "ios",
            android: "android",
            win: "win",
            wp: "wp"
        },
        download_state: {
            "0": "下载中",
            "1": "下载完成",
            "2": "下载失败"
        },
        ajax_error_code: {
            "0": "连接错误",
            "1": "超时",
            "2": "授权错误",
            "3": "数据类型错误"
        },
        ajax_dataType: {
            json: "json",
            text: "text"
        },
        ajax_method: {
            get: "get",
            post: "post",
            put: "put",
            delete: "delete",
            head: "head"
        },
        statusBar_style: {
            dark: "dark",
            light: "light"
        },
        screen_orientation: {
            portrait_up: "portrait_up",
            portrait_down: "portrait_down",
            landscape_left: "landscape_left",
            landscape_right: "landscape_right",
            auto: "auto",
            auto_portrait: "auto_portrait",
            auto_landscape: "auto_landscape"
        },
        ajax_upload_status: {
            "0": "上传中",
            "1": "上传完成",
            "2": "上传失败"
        },
        softInputMode: {
            resize: "resize",
            pan: "pan",
            auto: "auto"
        },
        imageCache_policy: {
            default: "default",
            cache_else_network: "cache_else_network",
            no_cache: "no_cache",
            cache_only: "cache_only"
        },
        progress_type: {
            default: "default",
            page: "page"
        },
        openSlidLayout_type: {
            left: "left",
            right: "right",
            all: "all"
        },
        openDrawerLayout_type: {
            left: "left",
            right: "right"
        },
        code_type: {
            "utf-8": "utf-8",
            "gb2312": "gb2312",
            "gbk": "gbk"
        },
        notification_sound: {
            default: "default"
        },
        prompt_type: {
            text: "text",
            password: "password",
            number: "number",
            email: "email",
            url: "url"
        }
    };
    // APICloud方法
    // 方法默认配置
    exports.config = {
        openWin: {
            //name: exports.guid(),
            //url: "http://www.baisoft.org",
            //useWKWebView: false,
            //pageParam: {},
            //bounces: false,
            //bgColor: "rgba(0,0,0,0)",
            //scrollToTop: true,
            vScrollBarEnabled: false,
            hScrollBarEnabled: false,
            //scaleEnabled: false,
            //slidBackEnabled: true,
            //slidBackType: "full",
            //animation: {
            //    type: exports.constant.animation_type.push,
            //    subType: exports.constant.animation_subType.from_right,
            //    duration: 300
            //},
            //showProgress: false,
            /*
            progress: {
                type: "",
                title: "",
                text: "",
                color: ""
            },*/
            delay: 300,
            //reload: false,
            //allowEdit: false,
            //softInputMode: "auto"
            /*, customRefreshHeader: "" */
        },
        closeWin: {//name: exports.winName,
            //animation: {
            //    type: exports.constant.animation_type.push,
            //    subType: exports.constant.animation_subType.from_left,
            //    duration: 300
            //}
        },
        closeToWin: {
            name: "root"//, animation: {
            //    type: exports.constant.animation_type.push,
            //    subType: exports.constant.animation_subType.from_left,
            //    duration: 300
            //}
        },
        setWinAttr: {/*
            bounces: false,
            bgColor: "rgba(0,0,0,0)",
            scrollToTop: true,
            vScrollBarEnabled: false,
            hScrollBarEnabled: false,
            scaleEnabled: false,
            slidBackEnabled: true,
            softInputMode: "auto"
            */
        },
        openFrame: {
            //name: exports.guid(),
            //url: "http://www.baisoft.org",
            //useWKWebView: false,
            //pageParam: {},
            bounces: false,
            //bgColor: 'rgba(0,0,0,0)',
            //scrollToTop: true,
            vScrollBarEnabled: false,
            hScrollBarEnabled: false,
            //scaleEnabled: false,
            //rect: {
            //    x: 0,
            //    y: 0,
            //    w: 'auto',
            //    h: 'auto',
            //    marginLeft: 0,
            //    marginTop: 0,
            //    marginBottom: 0,
            //    marginRight: 0
            //},
            //showProgress: false,
            /*
            progress: {
                type: "",
                title: "",
                text: "",
                color: ""
            },*/
            //reload: false,
            //allowEdit: false,
            //softInputMode: 'auto'
            //, animation: {
            //    type: exports.constant.animation_type.none,
            //    subType: exports.constant.animation_subType.from_right,
            //    duration: 300
            //},
            /*, customRefreshHeader: "" */
        },
        closeFrame: {//name: exports.frameName
        },
        setFrameAttr: {//name: exports.frameName,
            //bounces: false,
            //hidden: false,
            //bgColor: 'rgba(0,0,0,0)',
            //scrollToTop: true,
            //vScrollBarEnabled: false,
            //hScrollBarEnabled: false,
            //scaleEnabled: false,
            //rect: {
            //    x: 0,
            //    y: 0,
            //    w: 'auto',
            //    h: 'auto',
            //    marginLeft: 0,
            //    marginTop: 0,
            //    marginBottom: 0,
            //    marginRight: 0
            //},
            //softInputMode: 'auto'
        },
        bringFrameToFront: {//from: exports.frameName,
            //to: ""
        },
        sendFrameToBack: {//from: exports.frameName,
            //to: ""
        },
        setFrameClient: {//frameName: ""
        },
        animation: {//name: exports.frameName,
            //delay: 0,
            //duration: 300,
            //curve: exports.constant.animation_curve.ease_in_out,
            //repeatCount: 0,
            //autoreverse: false,
            //alpha: 1,
            //translation: {
            //    x: 0,
            //    y: 0,
            //    z: 0
            //},
            //scale: {
            //    x: 1,
            //    y: 1,
            //    z: 1
            //},
            //rotation: {
            //    degree: 0,
            //    x: 0,
            //    y: 0,
            //    z: 1
            //}
        },
        openFrameGroup: {
            //name: exports.guid(),
            //background: 'rgba(0,0,0,0)',
            scrollEnabled: true,
            //rect: {
            //    x: 0,
            //    y: 0,
            //    w: 'auto',
            //    h: 'auto',
            //    marginLeft: 0,
            //    marginTop: 0,
            //    marginBottom: 0,
            //    marginRight: 0
            //},
            //index: 0,
            //preload: 1,
            //frames: []
        },
        closeFrameGroup: {//name: ""
        },
        setFrameGroupAttr: {//name: "",
            //hidden: false,
            //scrollEnabled: true,
            //rect: {
            //    x: 0,
            //    y: 0,
            //    w: 'auto',
            //    h: 'auto'
            //}
        },
        setFrameGroupIndex: {//name: "",
            //index: 0,
            //scroll: true,
            //reload: false
        },
        openPopoverWin: {
            width: 540,
            height: 620,
            //name: exports.guid(),
            //url: "http://www.winu.net",
            //pageParam: {},
            //bounces: false,
            //bgColor: 'rgba(0,0,0,0)',
            //scrollToTop: true,
            vScrollBarEnabled: false,
            hScrollBarEnabled: false,
            //scaleEnabled: false,
            //showProgress: false,
            /*
           progress: {
               type: "",
               title: "",
               text: "",
               color: ""
           },*/
            //allowEdit: false,
            //softInputMode: 'auto',
            /*, customRefreshHeader: "" */
        },
        openSlidLayout: {
            type: exports.constant.openSlidLayout_type.left //,leftEdge: 80,
            //rightEdge: 80,
            //slidPaneStyle: {
            //    leftEdge: 80,
            //    rightEdge: 80,
            //    leftScale: 1,
            //    rightScale: 1
            //}
            //,fixedPaneStyle: {
            //    leftEdge: 0,
            //    rightEdge: 0,
            //    leftScale: 1,
            //    rightScale: 1
            //    , leftMaskBg: 'rgba(0,0,0,0)',
            //    rightMaskBg: 'rgba(0,0,0,0)',
            //    leftBg: 'rgba(0,0,0,0)',
            //    rightBg: 'rgba(0,0,0,0)',
            //},
            //fixedPane: {},
            //slidPane: {}
        },
        openSlidPane: {
            type: exports.constant.openSlidLayout_type.left
        },
        openDrawerLayout: {//leftPane: {}
            //,rightPane: {}
        },
        openDrawerPane: {
            type: exports.constant.openDrawerLayout_type.left
        },
        execScript: {//name: exports.winName,
            //frameName: "",
            //script: "console.log('');"
        },
        removeLaunchView: {//animation: {
            //    type: exports.constant.animation_type.fade,
            //    subType: exports.constant.animation_subType.from_right,
            //    duration: 300
            //}
        },
        installApp: {//appUri: ""
        },
        uninstallApp: {//packageName: ""
        },
        openApp: {
            //appParam: {},
            //iosUrl: "",
            androidPkg: "Android.intent.action.VIEW",
            mimeType: "text/html",
            //uri: ""
        },
        appInstalled: {//appBundle: "",
            //sync: false
        },
        openWidget: {//id: "",
            //wgtParam: {},
            //animation: {
            //    type: exports.constant.animation_type.push,
            //    subType: exports.constant.animation_subType.from_right,
            //    duration: 300
            //}
        },
        closeWidget: {//id: "",
            //retData: {},
            //silent: false
            //,animation: {
            //    type: exports.constant.animation_type.push,
            //    subType: exports.constant.animation_subType.from_right,
            //    duration: 300
            //}
        },
        ajax: {
            //url: "",
            //tag: exports.guid(),
            //method: exports.constant.ajax_method.get,
            //cache: false,
            //timeout: 30,
            //dataType: exports.constant.ajax_dataType.json,
            //charset: exports.constant.code_type["utf-8"],
            //headers: {},
            //report: false,
            //returnAll: false,
            data: {
                //stream: "",
                //body: "",
                values: {},
                files: {}
            }//, certificate: {}
        },
        cancelAjax: {//tag: ""
        },
        download: {
            //url: "",
            //savePath:"",
            report: true,
            cache: true,
            allowResume: true
        },
        cancelDownload: {//url: ""
        },
        imageCache: {//url: "",
            //policy: exports.constant.imageCache_policy.default,
            //thumbnail: true
        },
        readFile: {//path: "",
            //sync: false
        },
        writeFile: {
            //path: "",
            //data: "",
            append: true
        },
        setPrefs: {//key: "",
            //value: ""
        },
        getPrefs: {//key: "",
            //sync: false
        },
        removePrefs: {//key: ""
        },
        clearCache: {//timeThreshold: 0
        },
        loadSecureValue: {//key: "",
            //sync: false
        },
        addEventListener: {//name: "",
            //extra: {}
        },
        removeEventListener: {//name: ""
        },
        sendEvent: {//name: "",
            //extra: {}
        },
        accessNative: {//name: "",
            //extra: {}
        },
        notification: {
            vibrate: [500, 500],
            sound: exports.constant.notification_sound.default,
            light: false,
            //notify: {
            //    title: exports.appName,
            //    content: "有新消息",
            //    extra: "",
            //    updateCurrent: false
            //},
            //alarm: {
            //    hour: new Date().getHours(),
            //    minutes: new Date().getMinutes(),
            //    daysOfWeek: [1, 2, 3, 4, 5],
            //    time: ""
            //}
        },
        cancelNotification: {
            id: 0
        },
        startLocation: {
            accuracy: exports.constant.location_accuracy["10m"],
            filter: 1.0,
            autoStop: true
        },
        startSensor: {//type: ""
        },
        stopSensor: {//type: ""
        },
        call: {
            type: exports.constant.call_type.tel_prompt,
            number: "18676265646"
        },
        sms: {
            numbers: ["18676265646"],
            text: "",
            silent: false
        },
        mail: {
            recipients: ["8020292@qq.com"],
            subject: exports.appName,
            body: ""//,attachments: []
        },
        setFullScreen: {
            fullScreen: true
        },
        setStatusBarStyle: {//style: exports.constant.statusBar_style.light,
            //color: "#000"
        },
        setScreenOrientation: {//orientation: ""
        },
        setKeepScreenOn: {
            keepOn: false
        },
        setScreenSecure: {
            secure: false
        },
        setAppIconBadge: {
            badge: 0
        },
        alert: {
            title: exports.appName,
            msg: "",
            buttons: ["确定"]
        },
        confirm: {
            title: exports.appName,
            msg: "请选择操作类型：",
            buttons: ["取消", "确定"]
        },
        prompt: {
            title: exports.appName,
            msg: "请输入以下值：",
            text: "",
            type: exports.constant.prompt_type.text,
            buttons: ["取消", "确定"]
        },
        actionSheet: {
            title: "请选择操作类型：",
            cancelTitle: "取消",
            //destructiveTitle: "",
            //buttons: [],
            //style: {
            //    layerColor: '',
            //    itemNormalColor: '',
            //    itemPressColor: '',
            //    fontNormalColor: '',
            //    fontPressColor: '',
            //    titleFontColor: ''
            //}
        },
        showProgress: {
            style: exports.constant.showProgress_style.default,
            animationType: exports.constant.showProgress_animationType.zoom,
            title: '努力加载中...',
            text: '先喝杯茶...',
            modal: false
        },
        toast: {
            msg: exports.appName,
            duration: 3000,
            location: exports.constant.toast_location.bottom,
            global: false
        },
        openPicker: {
            type: exports.constant.openPicker_type.date,
            //date: new Date().toLocaleDateString(),
            title: "请选择日期或时间"
        },
        setRefreshHeaderInfo: {
            visible: true,
            //loadingImg:"",
            bgColor: '#f1f1f1',
            textColor: '#999',
            textDown: '下拉可以刷新...',
            textUp: '松开可以刷新...',
            textLoading: '加载中...',
            //textTime: new Date().toLocaleDateString(),
            showTime: true
        },
        showFloatBox: {
            //iconPath: "",
            duration: 5000
        },
        getPicture: {
            sourceType: exports.constant.getPicture_sourceType.album,
            encodingType: exports.constant.getPicture_encodingType.jpg,
            mediaValue: exports.constant.getPicture_mediaValue.pic,
            destinationType: exports.constant.getPicture_destinationType.base64,
            allowEdit: true,
            quality: 80,
            videoQuality: exports.constant.getPicture_videoQuality.medium,
            //targetWidth: 500,
            //targetHeight: 500,
            saveToPhotoAlbum: true
        }
    };
    // APICloud 中间件
    /*
        enable: false,
        handle: function () {
        },
        emitter: functionName
    */
    exports.filter = [];
    exports.use = function (callback) {
        var that = this;
        var result;
        if (that.filter.length > 0) {
            var caller = arguments.callee.caller;
            // 判断调用者传入的参数是否包含JSON对象并且包含filterEnable属性，值为false
            var callerArgs = caller.arguments;
            var filterEnable;
            if (callerArgs.length > 0) {
                for (var i = 0; i < callerArgs.length; i++) {
                    if (that.isJson(callerArgs[i]) && callerArgs[i].hasOwnProperty("filterEnable") && callerArgs[i].filterEnable == false) {
                        filterEnable = false;
                        break;
                    }
                }
            }
            if (filterEnable != false) {
                for (var i = 0; i < that.filter.length; i++) {
                    if (that.filter[i]) {
                        var obj = that.filter[i];
                        if ((obj.hasOwnProperty("enable") && obj.enable == true) && (obj.hasOwnProperty("handle") && that.isFunction(obj.handle) == true) && (obj.hasOwnProperty("emitter") && that.isValid(obj.emitter) == true && obj.emitter.toString() == caller)) {
                            result = obj.handle(callerArgs);
                            if (result == false) {
                                break;
                            }
                        }
                    }
                }
            }
        }
        if (result != false) {
            if (that.isFunction(callback)) {
                callback();
            }
        }
    }
    ;
    // -窗口系统
    exports.openWin = function (name, url, pageParam, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!that.isString(name)) {
                console.log("必须传入name。");
                return;
            }
            url = url ? url : name + ".html";
            if (!that.isJson(pageParam)) {
                pageParam = that.pageParam;
            }
            // 兼容url写法传参数
            var urlParams = that.parseQueryString(url);
            var _pageParam = that.deepAssign({}, urlParams, pageParam);
            if (!that.isJson(params)) {
                params = {};
            }
            // 处理IOS和Android的Delay问题，IOS不需要Delay
            var delayObj = {
                delay: (that.systemType == that.constant.systemType.ios) ? 0 : that.config.openWin.delay
            };
            api.openWin(that.deepAssign({}, that.config.openWin, delayObj, {
                name: name,
                url: url,
                pageParam: _pageParam
            }, params));
        });
    }
    ;
    exports.closeWin = function (name) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            name = name ? name : that.winName;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.closeWin(that.deepAssign({}, exports.config.closeWin, {
                name: name
            }), params);
        });
    }
    ;
    exports.closeToWin = function (name) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            name = name ? name : "root";
            var params = that.isJson(args[1]) ? args[1] : {};
            api.closeToWin(that.deepAssign({}, exports.config.closeWin, {
                name: name
            }), params);
        });
    }
    ;
    exports.setWinAttr = function (params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            params = that.isJson(params) ? params : {};
            api.setWinAttr(that.deepAssign({}, that.config.setWinAttr, params));
        });
    }
    ;
    exports.openFrame = function (name, url, pageParam, bounces, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!that.isString(name)) {
                console.log("必须传入name。");
                return;
            }
            url = url ? url : name + ".html";
            if (!that.isJson(pageParam)) {
                pageParam = that.pageParam;
            }
            if (!that.isJson(params)) {
                params = {};
            }
            // 兼容url写法传参数
            var urlParams = that.parseQueryString(url);
            var _pageParam = that.deepAssign({}, urlParams, pageParam);
            bounces = that.isBoolean(bounces) ? bounces : that.config.openFrame.bounces;
            api.openFrame(that.deepAssign({}, that.config.openFrame, {
                name: name,
                url: url,
                pageParam: _pageParam,
                bounces: bounces
            }, params));
        });
    }
    ;
    exports.closeFrame = function (name) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            name = name ? name : that.frameName;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.closeFrame(that.deepAssign({}, exports.config.closeFrame, {
                name: name
            }), params);
        });
    }
    ;
    exports.setFrameAttr = function (name, bounces, hidden, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            name = name ? name : that.frameName;
            var opt = {
                name: name
            };
            if (that.isBoolean(bounces)) {
                opt.bounces = bounces;
            }
            if (that.isBoolean(hidden)) {
                opt.hidden = hidden;
            }
            params = that.isJson(params) ? params : {};
            api.setFrameAttr(that.deepAssign({}, that.config.setFrameAttr, opt, params));
        });
    }
    ;
    exports.bringFrameToFront = function (from, to, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            from = from ? from : that.frameName;
            var opt = {
                from: from
            };
            if (to) {
                opt.to = to.toString();
            }
            params = that.isJson(params) ? params : {};
            api.bringFrameToFront(that.deepAssign({}, that.config.bringFrameToFront, opt, params));
        });
    }
    ;
    exports.sendFrameToBack = function (from, to, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            from = from ? from : that.frameName;
            var opt = {
                from: from
            };
            if (to) {
                opt.to = to.toString();
            }
            params = that.isJson(params) ? params : {};
            api.sendFrameToBack(that.deepAssign({}, that.config.sendFrameToBack, opt, params));
        });
    }
    ;
    exports.setFrameClient = function (callback, frameName, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!frameName) {
                console.warn("必须传入有效的frame名称。");
            }
            params = that.isJson(params) ? params : {};
            api.setFrameClient(that.deepAssign({}, that.config.setFrameClient, {
                frameName: frameName
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.animation = function (callback, name, duration, curve, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            name = name ? name : that.frameName;
            duration = that.isNumber(duration) ? Math.abs(duration) : 0;
            if (!that.constant.animation_curve.hasOwnProperty(curve)) {
                curve = that.constant.animation_curve.ease_in_out;
            }
            api.animation(that.deepAssign({}, that.config.animation, {
                name: name,
                duration: duration,
                curve: curve
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.openFrameGroup = function (callback, name, frames, index, scrollEnabled, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            name = name ? name : that.guid();
            var opt = {
                name: name
            };
            if (that.isBoolean(scrollEnabled)) {
                opt.scrollEnabled = scrollEnabled;
            }
            if (!that.isArray(frames)) {
                console.warn("frames必须是一个frame对象数组");
                return;
            }
            var isJsonFrameArray = true;
            frames.forEach(function (obj) {
                if (!that.isJson(obj)) {
                    isJsonFrameArray = false;
                    return;
                }
                if (!obj.hasOwnProperty("url")) {
                    isJsonFrameArray = false;
                    return;
                }
            });
            if (!isJsonFrameArray) {
                console.warn("frames必须是一个frame对象数组");
                return;
            }
            var _frames = [];
            frames.forEach(function (obj) {
                _frames.push(that.deepAssign({}, that.config.openFrame, obj));
            });
            opt.frames = _frames;
            if (!(that.isNumber(index) && index >= 0 && parseInt(index) <= frames.length - 1)) {
                index = 0;
            }
            opt.index = index;
            params = that.isJson(params) ? params : {};
            api.openFrameGroup(that.deepAssign({}, that.config.openFrameGroup, opt, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.closeFrameGroup = function (name) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!name) {
                console.warn("name不是一个有效的frameGroup名称。");
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.closeFrameGroup(that.deepAssign({}, exports.config.closeFrameGroup, {
                name: name
            }), params);
        });
    }
    ;
    exports.setFrameGroupAttr = function (name, scrollEnabled, hidden, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!name) {
                console.warn("name不是一个有效的frameGroup名称。");
                return;
            }
            var opt = {
                name: name
            };
            if (that.isBoolean(scrollEnabled)) {
                opt.scrollEnabled = scrollEnabled;
            }
            if (that.isBoolean(hidden)) {
                opt.hidden = hidden;
            }
            params = that.isJson(params) ? params : {};
            api.setFrameGroupAttr(that.deepAssign({}, that.config.setFrameGroupAttr, opt, params));
        });
    }
    ;
    exports.setFrameGroupIndex = function (name, index, scroll, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!name) {
                console.warn("name不是一个有效的frameGroup名称。");
                return;
            }
            if (!(that.isNumber(index) && index >= 0)) {
                console.warn("index只能是正整数，并且index只能小于或等于frames数组的长度减1。");
                return;
            }
            var opt = {
                name: name
            };
            if (that.isBoolean(scroll)) {
                opt.scroll = scroll;
            }
            params = that.isJson(params) ? params : {};
            api.setFrameGroupIndex(that.deepAssign({}, that.config.setFrameGroupIndex, opt, params));
        });
    }
    ;
    exports.openPopoverWin = function (name, url, pageParam, width, height, bounces, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!that.isJson(pageParam)) {
                pageParam = that.pageParam;
            }
            params = that.isJson(params) ? params : {};
            width = that.isNumber(width) ? Math.abs(width) : 540;
            height = that.isNumber(height) ? Math.abs(height) : 620;
            bounces = that.isBoolean(bounces) ? bounces : true;
            api.openPopoverWin(that.deepAssign({}, that.config.openPopoverWin, {
                name: name,
                url: url,
                width: width,
                height: height,
                pageParam: pageParam,
                bounces: bounces
            }, params));
        });
    }
    ;
    exports.closePopoverWin = function () {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            //var args = arguments.callee.caller.caller.arguments;
            //var params = that.isJson(args[0]) ? args[0] : {};
            api.closePopoverWin();
        });
    }
    ;
    exports.openSlidLayout = function (callback, fixedPane, slidPane, leftEdge, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!(that.isJson(fixedPane) && fixedPane.hasOwnProperty("url"))) {
                console.warn("fixedPane必须是一个api window对象，并且包含url属性。");
                return;
            }
            if (!(that.isJson(slidPane) && slidPane.hasOwnProperty("url"))) {
                console.warn("slidPane必须是一个api window对象，并且包含url属性。");
                return;
            }
            leftEdge = that.isNumber(leftEdge) ? Math.abs(leftEdge) : 80;
            var opt = {
                leftEdge: leftEdge
            };
            opt.fixedPane = that.deepAssign({}, that.config.openWin, fixedPane);
            opt.slidPane = that.deepAssign({}, that.config.openWin, slidPane);
            opt.slidPaneStyle = that.deepAssign({}, that.config.openSlidLayout.slidPaneStyle, {
                leftEdge: leftEdge
            });
            params = that.isJson(params) ? params : {};
            api.openSlidLayout(that.deepAssign({}, that.config.openSlidLayout, opt, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.openSlidPane = function () {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[0]) ? args[0] : {};
            api.openSlidPane(that.deepAssign({}, that.config.openSlidPane, params));
        });
    }
    ;
    exports.closeSlidPane = function () {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            //var args = arguments.callee.caller.caller.arguments;
            //var params = that.isJson(args[0]) ? args[0] : {};
            api.closeSlidPane();
        });
    }
    ;
    exports.lockSlidPane = function () {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            //var args = arguments.callee.caller.caller.arguments;
            //var params = that.isJson(args[0]) ? args[0] : {};
            api.lockSlidPane();
        });
    }
    ;
    exports.unlockSlidPane = function () {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            //var args = arguments.callee.caller.caller.arguments;
            //var params = that.isJson(args[0]) ? args[0] : {};
            api.unlockSlidPane();
        });
    }
    ;
    exports.openDrawerLayout = function (fixedPane, slidPane, type, edge, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!(that.isJson(fixedPane) && fixedPane.hasOwnProperty("url"))) {
                console.warn("fixedPane必须是一个api window对象，并且包含url属性。");
                return;
            }
            if (!(that.isJson(slidPane) && slidPane.hasOwnProperty("url"))) {
                console.warn("slidPane必须是一个api window对象，并且包含url属性。");
                return;
            }
            if (!that.constant.openDrawerLayout_type.hasOwnProperty(type)) {
                type = that.constant.openDrawerLayout_type.left;
            }
            edge = that.isNumber(edge) ? Math.abs(edge) : 80;
            var opt = that.deepAssign({}, that.config.openDrawerLayout, slidPane);
            if (type == that.constant.openDrawerLayout_type.left) {
                opt.leftPane = that.deepAssign({}, that.config.openWin, {
                    edge: edge
                }, fixedPane);
            } else {
                opt.rightPane = that.deepAssign({}, that.config.openWin, {
                    edge: edge
                }, fixedPane);
            }
            params = that.isJson(params) ? params : {};
            api.openDrawerLayout(that.deepAssign({}, that.config.openDrawerLayout, opt, params));
        });
    }
    ;
    exports.openDrawerPane = function (type) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!that.constant.openDrawerLayout_type.hasOwnProperty(type)) {
                type = that.constant.openDrawerLayout_type.left;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.openDrawerPane(that.deepAssign({}, that.config.openDrawerPane, params));
        });
    }
    ;
    exports.closeDrawerPane = function () {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            //var args = arguments.callee.caller.caller.arguments;
            //var params = that.isJson(args[0]) ? args[0] : {};
            api.closeDrawerPane();
        });
    }
    ;
    // 注：
    // obj为字符串的时候，直接执行，不方便书写，无法调用外部参数
    // obj为匿名方法的时候，解析执行，方便书写，无法调用外部参数
    // obj为JSON对象时（格式：{params:{},callback:function(){}} ），解析执行，方便书写，可以通过params带入参数，非常灵活
    exports.execScript = function (obj, frameName, name) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var opt = {};
            if (frameName) {
                opt.frameName = frameName;
            }
            if (name) {
                opt.name = name;
            }
            if (that.isFunction(obj)) {
                opt.script = "(" + (obj.toString()) + "()" + ")";
            }// json的可以带参数进来，格式：{params:{},callback:function(){}}
            else if (that.isJson(obj)) {
                var _script = "";
                // 判断是否带参数
                if (obj["params"] && that.isJson(obj["params"])) {
                    for (var key in obj["params"]) {
                        _script += "var " + key + " = " + that.getValueTypeFormat((obj["params"])[key]) + ";";
                    }
                }
                // 判断是否传入callback
                if (obj["callback"] && that.isFunction(obj["callback"])) {
                    _script += "(" + (obj["callback"].toString()) + "()" + ")";
                }
                opt.script = _script;
            } else {
                opt.script = that.isValid(obj) ? (obj.toString() + ";") : "console.log('并未传入任何执行程序，此次为默认输出！');";
            }

            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[3]) ? args[3] : {};
            api.execScript(that.deepAssign({}, that.config.execScript, opt, params));
        });
    }
    ;
    exports.removeLaunchView = function (params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            params = that.isJson(params) ? params : {};
            api.removeLaunchView(that.deepAssign({}, that.config.removeLaunchView, params));
        });
    }
    ;
    exports.parseTapmode = function () {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            api.parseTapmode();
        });
    }
    ;
    // -应用管理
    exports.installApp = function (appUri) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!appUri) {
                console.warn("appUri必须是目标应用的资源文件标识。")
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.installApp(that.deepAssign({}, that.config.installApp, {
                appUri: appUri
            }, params));
        });
    }
    ;
    exports.uninstallApp = function (packageName) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!packageName) {
                console.warn("必须插入packageName，通常是应用的包名字符串。")
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.uninstallApp(that.deepAssign({}, that.config.uninstallApp, {
                packageName: packageName
            }, params));
        });
    }
    ;
    exports.openApp = function (callback, url, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!url) {
                console.warn("必须传入url，可以是URL地址或URL Scheme等协议地址。")
                return;
            }
            var opt = {};
            if (that.systemVersion == that.constant.systemType.ios) {
                opt.iosUrl = url;
            }
            if (that.systemVersion == that.constant.systemType.android) {
                opt.uri = url;
            }
            params = that.isJson(params) ? params : {};
            api.openApp(that.deepAssign({}, that.config.openApp, opt, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.appInstalled = function (callback, appBundle) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            if (!that.isFunction(args[0])) {
                if (that.isString(args[0])) {
                    return api.appInstalled(that.deepAssign({}, that.config.appInstalled, {
                        sync: true,
                        appBundle: args[0]
                    }));
                } else {
                    console.warn("必须传入appBundle，可以是包名或URL Scheme等协议地址。");
                    return;
                }
            } else {
                if (!that.isString(appBundle)) {
                    console.warn("必须传入appBundle，可以是包名或URL Scheme等协议地址。");
                    return;
                }
                var params = that.isJson(args[2]) ? args[2] : {};
                api.appInstalled(that.deepAssign({}, that.config.appInstalled, {
                    appBundle: appBundle
                }, params), function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            }
        });
    }
    ;
    exports.rebootApp = function () {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            //var args = arguments.callee.caller.caller.arguments;
            //var params = that.isJson(args[0]) ? args[0] : {};
            api.rebootApp();
        });
    }
    ;
    exports.openWidget = function (callback, id, wgtParam, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!id) {
                console.warn("id不是一个有效的widget ID")
                return;
            }
            if (!that.isJson(wgtParam)) {
                wgtParam = that.wgtParam;
            }
            params = that.isJson(params) ? params : {};
            api.openWidget(that.deepAssign({}, that.config.openWidget, {
                id: id,
                wgtParam: wgtParam
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.closeWidget = function (callback, id, silent, retData, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var opt = {};
            if (id) {
                opt.id = id;
            }
            if (that.isBoolean(silent)) {
                opt.silent = silent;
            }
            opt.retData = that.isJson(retData) ? retData : {};
            params = that.isJson(params) ? params : {};
            api.closeWidget(that.deepAssign({}, that.config.closeWidget, opt, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    // -网络通信
    exports.ajax = function (callback, url, data, method, dataType, headers, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!url) {
                console.warn("必须传入URL地址。");
                return;
            }
            if (!that.constant.ajax_method.hasOwnProperty(method)) {
                method = that.constant.ajax_method.get;
            }
            if (!that.constant.ajax_dataType.hasOwnProperty(dataType)) {
                dataType = that.constant.ajax_dataType.json;
            }
            var opt = {
                url: url,
                method: method,
                dataType: dataType
            };
            if (that.isJson(headers)) {
                opt.headers = headers;
            }
            if (method == that.constant.ajax_method.get && that.isJson(data)) {
                var dataSerialize = that.serialize(data);
                opt.url = (url.substr(url.length - 1) == "?") ? (url + dataSerialize) : (url + "?" + dataSerialize);
            }
            if (method == that.constant.ajax_method.post && that.isJson(data)) {
                var postData = {};
                if (!that.isValid(data.values)) {
                    postData.values = data;
                } else {
                    postData = data;
                }
                opt.data = postData;
            }
            params = that.isJson(params) ? params : {};
            api.ajax(that.deepAssign({}, that.config.ajax, opt, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.cancelAjax = function (tag) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!tag) {
                console.warn("必须传入tag标识。");
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.cancelAjax(that.deepAssign({}, that.config.cancelAjax, {
                tag: tag
            }, params));
        });
    }
    ;
    exports.download = function (callback, url, savePath, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!url) {
                console.warn("必须传入URL地址。");
                return;
            }
            var opt = {
                url: url
            };
            if (savePath) {
                opt.savePath = savePath;
            }
            params = that.isJson(params) ? params : {};
            api.download(that.deepAssign({}, that.config.download, opt, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.cancelDownload = function (url) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!url) {
                console.warn("必须传入URL地址。");
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.cancelDownload(that.deepAssign({}, that.config.cancelDownload, {
                url: url
            }, params));
        });
    }
    ;
    exports.imageCache = function (callback, url, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!url) {
                console.warn("必须传入URL地址。");
                return;
            }
            params = that.isJson(params) ? params : {};
            api.imageCache(that.deepAssign({}, that.config.imageCache, {
                url: url
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    // -数据存储
    exports.readFile = function (callback, path) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            if (!that.isFunction(args[0])) {
                if (that.isString(args[0])) {
                    return api.readFile(that.deepAssign({}, that.config.readFile, {
                        sync: true,
                        path: args[0]
                    }));
                } else {
                    console.warn("path必须是字符串类型，且是有效是文件路径。");
                    return;
                }
            } else {
                if (!that.isString(path)) {
                    console.warn("path必须是字符串类型，且是有效是文件路径。");
                    return;
                }
                var params = that.isJson(args[2]) ? args[2] : {};
                api.readFile(that.deepAssign({}, that.config.readFile, {
                    path: path
                }, params), function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            }
        });
    }
    ;
    exports.writeFile = function (callback, path, data, isAppend) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!path) {
                console.warn("必须传入文件地址。");
                return;
            }
            if (!that.isValid(data)) {
                console.warn("内容不能为空");
                return;
            }
            isAppend = that.isBoolean(isAppend) ? isAppend : true;
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[4]) ? args[4] : {};
            api.writeFile(that.deepAssign({}, that.config.writeFile, {
                path: path,
                data: data,
                append: isAppend
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.setPrefs = function (callback, key, value) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!key) {
                console.warn("必须传入key。");
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[3]) ? args[3] : {};
            api.setPrefs(that.deepAssign({}, that.config.setPrefs, {
                key: key,
                value: that.objParse(value)
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.getPrefs = function (callback, key) {
        var that = this;

        var result;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            if (!that.isFunction(args[0])) {
                if (that.isString(args[0])) {
                    result = api.getPrefs(that.deepAssign({}, that.config.getPrefs, {
                        sync: true,
                        key: args[0]
                    }));
                } else {
                    console.warn("key必须是字符串类型。");
                    return;
                }
            } else {
                if (!that.isString(key)) {
                    console.warn("key必须是字符串类型。");
                    return;
                }
                var params = that.isJson(args[2]) ? args[2] : {};
                api.getPrefs(that.deepAssign({}, that.config.getPrefs, {
                    key: key,
                    sync: false
                }, params), function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            }
        });

        return result;
    }
    ;
    exports.removePrefs = function (callback, key) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!key) {
                console.warn("必须传入key。");
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[2]) ? args[2] : {};
            api.removePrefs(that.deepAssign({}, that.config.removePrefs, {
                key: key
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.clearCache = function (callback, timeThreshold) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            timeThreshold = that.isNumber(timeThreshold) ? Math.abs(timeThreshold) : 0;
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[2]) ? args[2] : {};
            api.clearCache(that.deepAssign({}, that.config.clearCache, {
                timeThreshold: timeThreshold
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.getCacheSize = function (callback) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (that.isFunction(callback)) {
                api.getCacheSize(function (ret, err) {
                    if (that.isFunction(callback)) {
                        ret.sizek = (ret.size / 1000).toFixed(2);
                        ret.sizem = (ret.sizek / 1000).toFixed(2);
                        ret.sizeg = (ret.sizem / 1000).toFixed(2);
                        callback(ret, err);
                    }
                });
            } else {
                var size = api.getCacheSize({
                    sync: true
                });
                var sizek = (size / 1000).toFixed(2);
                var sizem = (sizek / 1000).toFixed(2);
                var sizeg = (sizem / 1000).toFixed(2);
                return {
                    sizek: sizek,
                    sizem: sizem,
                    sizeg: sizeg
                }
            }
        });
    }
    ;
    exports.getFreeDiskSpace = function (callback) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (that.isFunction(callback)) {
                api.getFreeDiskSpace(function (ret, err) {
                    if (that.isFunction(callback)) {
                        ret.sizek = (ret.size / 1000).toFixed(2);
                        ret.sizem = (ret.sizek / 1000).toFixed(2);
                        ret.sizeg = (ret.sizem / 1000).toFixed(2);
                        callback(ret, err);
                    }
                });
            } else {
                var size = api.getFreeDiskSpace({
                    sync: true
                });
                var sizek = (size / 1000).toFixed(2);
                var sizem = (sizek / 1000).toFixed(2);
                var sizeg = (sizem / 1000).toFixed(2);
                return {
                    sizek: sizek,
                    sizem: sizem,
                    sizeg: sizeg
                }
            }
        });
    }
    ;
    exports.loadSecureValue = function (callback, key) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            if (!that.isFunction(args[0])) {
                if (that.isString(args[0])) {
                    return api.loadSecureValue(that.deepAssign({}, that.config.loadSecureValue, {
                        sync: true,
                        key: args[0]
                    }));
                } else {
                    console.warn("key必须是字符串类型，通常配置在res文件夹下的key.xml中。");
                    return;
                }
            } else {
                if (!that.isString(key)) {
                    console.warn("key必须是字符串类型，通常配置在res文件夹下的key.xml中。");
                    return;
                }
                var params = that.isJson(args[2]) ? args[2] : {};
                api.loadSecureValue(that.deepAssign({}, that.config.loadSecureValue, {
                    key: key
                }, params), function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            }
        });
    }
    ;
    // -消息事件
    exports.addEventListener = function (callback, name, extra) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!name) {
                console.warn("name必须是有效字符串。");
                return;
            }
            extra = that.isJson(extra) ? extra : {};
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[3]) ? args[3] : {};
            api.addEventListener(that.deepAssign({}, that.config.addEventListener, {
                name: name,
                extra: extra
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.removeEventListener = function (name) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!name) {
                console.warn("name必须是有效字符串。");
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.removeEventListener(that.deepAssign({}, exports.config.removeEventListener, {
                name: name
            }), params);
        });
    }
    ;
    exports.sendEvent = function (name, extra) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!name) {
                console.warn("name必须是有效字符串。");
                return;
            }
            extra = that.isJson(extra) ? extra : {};
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[2]) ? args[2] : {};
            api.sendEvent(that.deepAssign({}, that.config.sendEvent, {
                name: name,
                extra: extra
            }, params));
        });
    }
    ;
    exports.accessNative = function (callback, name, extra) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!name) {
                console.warn("name必须是有效字符串。");
                return;
            }
            extra = that.isJson(extra) ? extra : {};
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[3]) ? args[3] : {};
            api.accessNative(that.deepAssign({}, that.config.accessNative, {
                name: name,
                extra: extra
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.notification = function (callback, notify, vibrate, light, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var opt = {};
            if (that.isJson(notify)) {
                opt.notify = notify;
            }
            if (that.isBoolean(light)) {
                opt.light = light;
            }
            if (that.isArray(vibrate)) {
                opt.vibrate = vibrate;
            }
            params = that.isJson(params) ? params : {};
            api.notification(that.deepAssign({}, that.config.notification, opt, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.cancelNotification = function (id) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!that.isNumber(id)) {
                console.warn("id必须是有效的整数。");
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.cancelNotification(that.deepAssign({}, that.config.cancelNotification, {
                id: id
            }, params));
        });
    }
    ;
    // -设备访问
    exports.startLocation = function (callback, autoStop, filter, accuracy) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var opt = {};
            if (that.isBoolean(autoStop)) {
                opt.autoStop = autoStop;
            }
            if (that.isNumber(filter)) {
                opt.filter = Math.abs(filter);
            }
            if (!that.constant.location_accuracy.hasOwnProperty(accuracy)) {
                opt.accuracy = that.constant.location_accuracy["10m"];
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[4]) ? args[4] : {};
            api.startLocation(that.deepAssign({}, that.config.startLocation, opt, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.stopLocation = function () {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            //var args = arguments.callee.caller.caller.arguments;
            //var params = that.isJson(args[0]) ? args[0] : {};
            api.stopLocation();
        });
    }
    ;
    exports.getLocation = function (callback) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            //var args = arguments.callee.caller.caller.arguments;
            //var params = that.isJson(args[0]) ? args[0] : {};
            api.getLocation(function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.startSensor = function (callback, type) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!type) {
                console.warn("必须传入传感器type类型。");
                return;
            }
            if (!that.constant.sensor_type.hasOwnProperty(type)) {
                console.warn("传感器类型不正确。")
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[2]) ? args[2] : {};
            api.startSensor(that.deepAssign({}, that.config.startSensor, {
                type: type
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.stopSensor = function (type) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!type) {
                console.warn("必须传入传感器type类型。");
                return;
            }
            if (!that.constant.sensor_type.hasOwnProperty(type)) {
                console.warn("传感器类型不正确。")
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.stopSensor(that.deepAssign({}, exports.config.stopSensor, {
                type: type
            }), params);
        });
    }
    ;
    exports.call = function (number, type) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!number) {
                console.warn("必须传入要拨打的电话号码。");
                return;
            }
            if (!that.constant.call_type.hasOwnProperty(type)) {
                type = that.constant.call_type.tel_prompt;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[2]) ? args[2] : {};
            api.call(that.deepAssign({}, exports.config.call, {
                number: number,
                type: type
            }), params);
        });
    }
    ;
    exports.sms = function (callback, numbers, text, silent) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var _numbers = [];
            if (!that.isValid(numbers)) {
                console.warn("请输入有效的电话号码。");
                return;
            }
            if (!that.isArray(numbers)) {
                if (numbers.indexOf(",") > 0) {
                    var arr = numbers.split(",");
                    if (that.isArray(arr) && arr.length > 0) {
                        for (var i = 0; i < arr.length; i++) {
                            _numbers.push(arr[i]);
                        }
                    }
                } else {
                    _numbers.push(numbers.toString());
                }
            }
            _numbers = numbers;
            if (!that.isValid(text)) {
                console.warn("发送的内容不能为空。");
                return;
            }
            silent = that.isBoolean(silent) ? silent : false;
            if (silent && _numbers.length > 1) {
                console.warn("IOS系统不支持后台发送。");
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[4]) ? args[4] : {};
            api.sms(that.deepAssign({}, that.config.sms, {
                silent: false,
                text: text,
                numbers: _numbers
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.mail = function (callback, recipients, subject, body, attachments) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var _recipients = [];
            if (!that.isValid(recipients)) {
                console.warn("请输入有效的电话号码。");
                return;
            }
            if (!that.isArray(recipients)) {
                if (recipients.indexOf(",") > 0) {
                    var arr = recipients.split(",");
                    if (that.isArray(arr) && arr.length > 0) {
                        for (var i = 0; i < arr.length; i++) {
                            _recipients.push(arr[i]);
                        }
                    }
                } else {
                    _recipients.push(recipients.toString());
                }
            }
            _recipients = recipients;
            if (!subject) {
                console.warn("邮件主题不能为空。");
                return;
            }
            var opt = {
                recipients: _recipients,
                subject: subject
            };
            if (that.isValid(attachments)) {
                var _attachments = [];
                if (!that.isArray(attachments)) {
                    if (attachments.indexOf(",") > 0) {
                        var arr = attachments.split(",");
                        if (that.isArray(arr) && arr.length > 0) {
                            for (var i = 0; i < arr.length; i++) {
                                _attachments.push(arr[i]);
                            }
                        }
                    } else {
                        _attachments.push(attachments.toString());
                    }
                }
                opt.attachments = _attachments;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[5]) ? args[5] : {};
            api.mail(that.deepAssign({}, that.config.mail, opt, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.openContacts = function (callback) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            //var args = arguments.callee.caller.caller.arguments;
            //var params = that.isJson(args[0]) ? args[0] : {};
            api.openContacts(function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.setFullScreen = function (fullScreen) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!that.isBoolean(fullScreen)) {
                console.warn("fullScreen必须是Boolean类型。")
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.setFullScreen(that.deepAssign({}, exports.config.setFullScreen, {
                fullScreen: fullScreen
            }), params);
        });
    }
    ;
    exports.setStatusBarStyle = function (style_color) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var opt = {};
            if (that.systemType == that.constant.systemType.ios) {
                if (!that.constant.statusBar_style.hasOwnProperty(style_color)) {
                    console.warn("IOS系统目前只支持dark和light两个配置选项。")
                    return;
                }
                opt.style = style_color;
            }
            if (that.systemType == that.constant.systemType.android) {
                opt.color = that.isValid(style_color) ? style_color : "#000";
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.setStatusBarStyle(that.deepAssign({}, exports.config.setStatusBarStyle, opt), params);
        });
    }
    ;
    exports.setScreenOrientation = function (orientation) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!orientation) {
                console.warn("必须传入传感器type类型。");
                return;
            }
            if (!that.constant.screen_orientation.hasOwnProperty(orientation)) {
                console.warn("屏幕旋转方向参数不正确。")
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.setScreenOrientation(that.deepAssign({}, exports.config.setScreenOrientation, {
                orientation: orientation
            }), params);
        });
    }
    ;
    exports.setKeepScreenOn = function (keepOn) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!that.isBoolean(keepOn)) {
                console.warn("keepOn必须是Boolean类型。")
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.setKeepScreenOn(that.deepAssign({}, exports.config.setKeepScreenOn, {
                keepOn: keepOn
            }), params);
        });
    }
    ;
    exports.toLauncher = function () {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            api.toLauncher();
        });
    }
    ;
    exports.setScreenSecure = function (secure) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!that.isBoolean(secure)) {
                console.warn("secure必须是Boolean类型。")
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.setScreenSecure(that.deepAssign({}, exports.config.setScreenSecure, {
                secure: secure
            }), params);
        });
    }
    ;
    exports.setAppIconBadge = function (badge) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            badge = that.isNumber(badge) ? parseInt(Math.abs(badge)) : 0;
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.setAppIconBadge(that.deepAssign({}, exports.config.setAppIconBadge, {
                badge: badge
            }), params);
        });
    }
    ;
    exports.getPhoneNumber = function (callback) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (that.isFunction(callback)) {
                api.getPhoneNumber(function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            } else {
                return api.getPhoneNumber({
                    sync: true
                });
            }
        });
    }
    ;
    // -UI组件
    exports.alert = function (callback, msg, title, button, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            if (args.length == 0) {
                console.warn("必须传入消息内容。");
                return;
            }
            var opt = {};
            if (!that.isFunction(args[0])) {
                opt.msg = that.isString(args[0]) ? args[0] : that.objParse(args[0]);
            } else {
                opt.msg = that.isString(msg) ? msg : that.objParse(msg);
            }
            if (that.isValid(title)) {
                opt.title = title.toString();
            }
            if (that.isValid(button)) {
                opt.buttons = [button.toString()];
            }
            params = that.isJson(params) ? params : {};
            api.alert(that.deepAssign({}, that.config.alert, opt, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.confirm = function (callback, msg, title, buttons, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            if (args.length == 0) {
                console.warn("必须传入消息内容。");
                return;
            }
            var opt = {};
            if (!that.isFunction(args[0])) {
                opt.msg = that.isString(args[0]) ? args[0] : that.config.confirm.msg;
            } else {
                opt.msg = that.isString(msg) ? msg : that.config.confirm.msg;
            }
            if (that.isValid(title)) {
                opt.title = title.toString();
            }
            if (that.isArray(buttons)) {
                opt.buttons = buttons;
            }
            params = that.isJson(params) ? params : {};
            api.confirm(that.deepAssign({}, that.config.confirm, opt, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.prompt = function (callback, msg, title, text, type, buttons, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            if (args.length == 0) {
                console.warn("必须传入消息内容。");
                return;
            }
            var opt = {};
            if (!that.isFunction(args[0])) {
                opt.msg = that.isString(args[0]) ? args[0] : that.config.prompt.msg;
            } else {
                opt.msg = that.isString(msg) ? msg : that.config.prompt.msg;
            }
            if (that.isValid(title)) {
                opt.title = title.toString();
            }
            if (that.isValid(text)) {
                opt.text = text.toString();
            }
            if (that.isArray(buttons)) {
                opt.buttons = buttons;
            }
            if (!that.constant.prompt_type.hasOwnProperty(type)) {
                opt.type = that.constant.prompt_type.text;
            }
            params = that.isJson(params) ? params : {};
            api.prompt(that.deepAssign({}, that.config.prompt, opt, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.actionSheet = function (callback, buttons, title, cancelTitle, destructiveTitle, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var opt = {};
            if (that.isArray(buttons)) {
                opt.buttons = buttons;
            }
            if (that.isValid(title)) {
                opt.title = title;
            }
            if (that.isValid(cancelTitle)) {
                opt.cancelTitle = cancelTitle;
            }
            if (that.isValid(destructiveTitle)) {
                opt.destructiveTitle = destructiveTitle;
            }
            params = that.isJson(params) ? params : {};
            api.actionSheet(that.deepAssign({}, that.config.actionSheet, opt, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.showProgress = function (title, text, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var opt = {};
            if (that.isValid(title)) {
                opt.title = title;
            }
            if (that.isValid(text)) {
                opt.text = text;
            }
            params = that.isJson(params) ? params : {};
            api.showProgress(that.deepAssign({}, that.config.showProgress, opt, params));
        });
    }
    ;
    exports.hideProgress = function () {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            //var args = arguments.callee.caller.caller.arguments;
            //var params = that.isJson(args[0]) ? args[0] : {};
            api.hideProgress();
        });
    }
    ;
    exports.toast = function (msg, duration, location, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var opt = {};
            opt.msg = that.isString(msg) ? msg : that.objParse(msg);
            if (that.isNumber(duration)) {
                opt.duration = Math.abs(Number(duration));
            }
            if (!that.constant.toast_location.hasOwnProperty(location)) {
                opt.location = that.constant.toast_location.bottom;
            }
            params = that.isJson(params) ? params : {};
            api.toast(that.deepAssign({}, that.config.toast, opt, params));
        });
    }
    ;
    exports.openPicker = function (callback, type, title, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var opt = {};
            if (!that.constant.openPicker_type.hasOwnProperty(type)) {
                opt.type = that.constant.openPicker_type.date;
            }
            if (that.isValid(title)) {
                opt.title = title;
            }
            params = that.isJson(params) ? params : {};
            api.openPicker(that.deepAssign({}, that.config.openPicker, opt, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.setRefreshHeaderInfo = function (callback, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            params = that.isJson(params) ? params : {};
            api.setRefreshHeaderInfo(that.deepAssign({}, that.config.setRefreshHeaderInfo, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.setCustomRefreshHeaderInfo = function (callback, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            params = that.isJson(params) ? params : {};
            api.setCustomRefreshHeaderInfo(params, function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.refreshHeaderLoading = function () {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            //var args = arguments.callee.caller.caller.arguments;
            //var params = that.isJson(args[0]) ? args[0] : {};
            api.refreshHeaderLoading();
        });
    }
    ;
    exports.refreshHeaderLoadDone = function () {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            //var args = arguments.callee.caller.caller.arguments;
            //var params = that.isJson(args[0]) ? args[0] : {};
            api.refreshHeaderLoadDone();
        });
    }
    ;
    exports.showFloatBox = function (iconPath, duration) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var opt = {};
            if (that.isValid(iconPath)) {
                opt.iconPath = iconPath;
            }
            if (that.isNumber(duration)) {
                opt.duration = Math.abs(Number(duration));
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[2]) ? args[2] : {};
            api.showFloatBox(that.deepAssign({}, that.config.showFloatBox, opt, params));
        });
    }
    ;
    // -多媒体
    exports.getPicture = function (callback, sourceType, quality, targetWidth, targetHeight, params) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var opt = {};
            if (!that.constant.getPicture_sourceType.hasOwnProperty(sourceType)) {
                opt.sourceType = that.constant.getPicture_sourceType.album;
            }
            if (that.isNumber(quality) && Number(quality) >= 0 && Number(quality) <= 100) {
                opt.quality = Number(quality);
            }
            if (that.isNumber(targetWidth) && Number(targetWidth) >= 0) {
                opt.targetWidth = Number(targetWidth);
            }
            if (that.isNumber(targetHeight) && Number(targetHeight) >= 0) {
                opt.targetWidth = Number(targetHeight);
            }
            params = that.isJson(params) ? params : {};
            api.getPicture(that.deepAssign({}, that.config.getPicture, opt, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.saveMediaToAlbum = function (callback, path) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!that.isString(path)) {
                console.warn("媒体路径不能为空。");
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[2]) ? args[2] : {};
            api.saveMediaToAlbum(that.deepAssign({}, {
                path: path
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.startRecord = function (path) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            var opt = {};
            if (that.isString(path)) {
                opt.path = path;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.startRecord(that.deepAssign({}, opt, params));
        });
    }
    ;
    exports.stopRecord = function (callback) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            api.stopRecord(function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.startPlay = function (callback, path) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!that.isString(path)) {
                console.warn("音频路径不能为空。");
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[2]) ? args[2] : {};
            api.startPlay(that.deepAssign({}, {
                path: path
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.stopPlay = function () {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            //var args = arguments.callee.caller.caller.arguments;
            //var params = that.isJson(args[0]) ? args[0] : {};
            api.stopPlay();
        });
    }
    ;
    exports.openVideo = function (url) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!that.isString(url)) {
                console.warn("视频路径不能为空。");
                return;
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[1]) ? args[1] : {};
            api.openVideo(that.deepAssign({}, {
                url: url
            }, params));
        });
    }
    ;
    // -WebApp历史
    exports.historyBack = function (callback, frameName) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!frameName) {
                console.warn("必须传入有效的frame名称。");
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[2]) ? args[2] : {};
            api.historyBack(that.deepAssign({}, {
                frameName: frameName
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.historyForward = function (callback, frameName) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            if (!frameName) {
                console.warn("必须传入有效的frame名称。");
            }
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[2]) ? args[2] : {};
            api.historyForward(that.deepAssign({}, {
                frameName: frameName
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    // - 其他
    exports.pageUp = function (callback, top) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            top = that.isBoolean(top) ? top : false;
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[2]) ? args[2] : {};
            api.pageUp(that.deepAssign({}, {
                top: top
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    exports.pageDown = function (callback, bottom) {
        var that = this;
        // 载入中间件
        that.use(function () {
            if (!that.apiExit()) {
                return;
            }
            bottom = that.isBoolean(bottom) ? bottom : false;
            var args = arguments.callee.caller.caller.arguments;
            var params = that.isJson(args[2]) ? args[2] : {};
            api.pageDown(that.deepAssign({}, {
                bottom: bottom
            }, params), function (ret, err) {
                if (that.isFunction(callback)) {
                    callback(ret, err);
                }
            });
        });
    }
    ;
    // APICloud 事件
    var apiEvents = ["batterylow", "batterystatus", "keyback", "keymenu", "volumeup", "volumedown", "offline", "online", "pause", "resume", "scrolltobottom", "shake", "takescreenshot", "swipedown", "swipeleft", "swiperight", "swipeup", "tap", "longpress", "viewappear", "viewdisappear", "noticeclicked", "appintent", "smartupdatefinish", "launchviewclicked"];
    apiEvents.forEach(function (event) {
        exports[event] = function (callback) {
            var extra = {}
              , options = {};
            if (arguments.length > 1 && exports.isJson(arguments[1])) {
                extra = arguments[1];
            }
            if (arguments.length > 2 && exports.isJson(arguments[2])) {
                options = arguments[2];
            }
            exports.addEventListener(callback, event, extra, options);
        }
        ;
    });
    // APICloud api对象载入
    exports.ready = function (callback, DOMContentLoaded) {
        var that = this;
        document.addEventListener("DOMContentLoaded", function (event) {
            if (that.isFunction(DOMContentLoaded)) {
                DOMContentLoaded();
            }
        });
        apiready = function () {
            if (that.isFunction(callback)) {
                callback();
            }
        }
        ;
    }
    ;
    // APICloud 模块载入
    exports.M = {};
    exports.require = function (modules) {
        var that = this;
        if (!that.apiExit()) {
            return;
        }
        if (!that.isValid(modules)) {
            console.warn("模块名称不能为空。");
            return;
        }
        function loadModule(mos) {
            if (mos.length > 0) {
                var _modules = [];
                for (var i = 0; i < mos.length; i++) {
                    if (that.isString(mos[i])) {
                        var m = api.require(mos[i]);
                        that.M[mos[i]] = m;
                        _modules.push(m);
                    }
                }
                return _modules;
            }
        }
        ; if (that.isArray(modules)) {
            return loadModule(modules);
        } else if (that.isString(modules)) {
            if (modules.indexOf(",") > -1) {
                return loadModule(modules.split(","));
            } else {
                var m = api.require(modules);
                that.M[modules] = m;
                return m;
            }
        } else {
            return null;
        }
    }
    ;
    // 语法糖
    // -基础语法糖
    exports.timeDifference = function (tmpTime) {
        var mm = 1000;
        var minute = mm * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var month = day * 30;
        var ansTimeDifference = 0;
        var tmpTimeStamp = tmpTime ? Date.parse(tmpTime.replace(/-/gi, "/")) : new Date().getTime();
        var nowTime = new Date().getTime();
        var tmpTimeDifference = nowTime - tmpTimeStamp;
        if (tmpTimeDifference < 0) {
            console.warn("开始日期大于结束日期，计算失败！");
            return 0;
        }
        var DifferebceMonth = tmpTimeDifference / month;
        var DifferebceWeek = tmpTimeDifference / (7 * day);
        var DifferebceDay = tmpTimeDifference / day;
        var DifferebceHour = tmpTimeDifference / hour;
        var DifferebceMinute = tmpTimeDifference / minute;
        if (DifferebceMonth >= 1) {
            return tmpTime;
        } else if (DifferebceWeek >= 1) {
            ansTimeDifference = parseInt(DifferebceWeek) + "个星期前";
        } else if (DifferebceDay >= 1) {
            ansTimeDifference = parseInt(DifferebceDay) + "天前";
        } else if (DifferebceHour >= 1) {
            ansTimeDifference = parseInt(DifferebceHour) + "个小时前";
        } else if (DifferebceMinute >= 1) {
            ansTimeDifference = parseInt(DifferebceMinute) + "分钟前";
        } else {
            ansTimeDifference = "刚刚";
        }
        return ansTimeDifference;
    }
    ;
    // - APICloud 语法糖
    exports.dblclickExit = function (exit) {
        var that = this;
        var current = new Date().getTime();
        that.keyback(function (ret, err) {
            if ((new Date().getTime() - current) > 2000) {
                current = new Date().getTime();
                that.toast('再按一次退出' + that.appName, 2000);
            } else {
                exit = that.isBoolean(exit) ? exit : false;
                if (exit) {
                    that.closeWidget(null, null, true);
                } else {
                    that.toLauncher();
                }
            }
        });
    }
    ;
    exports.fixStatusBar = function (selectors) {
        var that = this;
        if (!that.apiExit()) {
            return;
        }
        var ele = that.single(selectors);
        if (ele && that.statusBarAppearance) {
            if (that.systemType == that.constant.systemType.ios) {
                ele.style.paddingTop = "20px";
            } else if (that.systemType == that.constant.systemType.android) {
                ele.style.paddingTop = "25px";
            }
        }
    }
    ;
    // minus是数组，有三个元素。
    // 第一、第二元素是一个DOM数组，第一个元素表示frame上边元素集合，第二个元素表示frame下边元素集合，第三个元素是设置是否沉浸式，默认为true
    // minus示例：[["#header"],["#footer"],true]
    exports.openContentFrame = function (name, url, minus, pageParam, bounces, params) {
        var that = this;
        var totalTopHeight = 0
          , totalBottomHeight = 0;
        if (that.isArray(minus)) {
            if (that.isArray(minus[0])) {
                if (that.isString((minus[0])[0])) {
                    // 判断是否需要设置沉浸式
                    if ((!that.isBoolean(minus[2])) || minus[2] == true) {
                        that.fixStatusBar((minus[0])[0]);
                    }
                }
                for (var i = 0; i < minus[0].length; i++) {
                    var c = (minus[0])[i];
                    if (that.single(c)) {
                        totalTopHeight += that.offset(c).h;
                    }
                }
            }
            if (that.isArray(minus[1])) {
                for (var i = 0; i < minus[1].length; i++) {
                    var c = (minus[1])[i];
                    if (that.single(c)) {
                        totalBottomHeight += that.offset(c).h;
                    }
                }
            }
        }
        var _params = that.deepAssign({
            rect: {
                x: 0,
                y: totalTopHeight,
                w: that.winWidth,
                h: that.winHeight - totalTopHeight - totalBottomHeight
            }
        }, params);

        // 开启openWin加速（还得优化）
        if (_params["quicken"] && _params["quicken"] == true) {
            that.viewappear(function (ret, err) {
                that.openFrame(name, url, pageParam, bounces, _params);
            });
        }
        else {
            that.openFrame(name, url, pageParam, bounces, _params);
        }
    }
    ;
    // minus是数组，有三个元素。
    // 第一、第二元素是一个DOM数组，第一个元素表示frame上边元素集合，第二个元素表示frame下边元素集合，第三个元素是设置是否沉浸式，默认为true
    // minus示例：[["#header"],["#footer"],true]
    exports.openContentFrameGroup = function (callback, name, frames, minus, index, scrollEnabled, params) {
        var that = this;
        var totalTopHeight = 0
          , totalBottomHeight = 0;
        if (that.isArray(minus)) {
            if (that.isArray(minus[0])) {
                if (that.isString((minus[0])[0])) {
                    // 判断是否需要设置沉浸式
                    if ((!that.isBoolean(minus[2])) || minus[2] == true) {
                        that.fixStatusBar((minus[0])[0]);
                    }
                }
                for (var i = 0; i < minus[0].length; i++) {
                    var c = (minus[0])[i];
                    if (that.single(c)) {
                        totalTopHeight += that.offset(c).h;
                    }
                }
            }
            if (that.isArray(minus[1])) {
                for (var i = 0; i < minus[1].length; i++) {
                    var c = (minus[1])[i];
                    if (that.single(c)) {
                        totalBottomHeight += that.offset(c).h;
                    }
                }
            }
        }
        that.openFrameGroup(callback, name, frames, index, scrollEnabled, that.deepAssign({
            rect: {
                x: 0,
                y: totalTopHeight,
                w: that.winWidth,
                h: that.winHeight - totalTopHeight - totalBottomHeight
            }
        }, params));
    }
    ;
    // frames 是frame数组集合，默认每一个frame集成了Frame对象所有的Options属性，并且还拓展了 switch，trigger，handle属性，frames格式如下
    //frames = [
    //        {
    //            switch: [["#header"], "hui-display-none",true],
    //            trigger: [[".hui-footer-item:nth-child(1)"], "hui-display-none"],
    //            handle: function (obj) {
    //                return false;
    //            },
    //            name: "home_body",
    //            url: "home_body.html"
    //        }
    //];
    exports.openSwitchFrame = function (frames, index) {

    }
    ;
    // 解决openWin切换性能问题，需为frame页面的body添加 hui-body-show 类
    exports.optimizeLocation = function (frameName, animateClassName, delay) {
        var that = this;
        animateClassName = that.isString(animateClassName) ? animateClassName : "hui-body-show";
        delay = that.isNumber(delay) ? Math.abs(delay) : 100;
        that.setFrameClient(function (ret, err) {
            if (ret.state == 2) {
                that.execScript({
                    params: {
                        "animateClassName": animateClassName,
                        "delay": delay
                    },
                    callback: function () {
                        setTimeout(function () {
                            document.body.classList.add(animateClassName);
                        }, delay);
                    }
                }, frameName);
            }
        }, frameName);
    }
    ;
    // 优化openWin切换卡顿问题，主要用于合并页面（也就是不分window，frame页面）
    // 由于APICloud的机制中只优化了Frame，没有优化Window，导致一个页面打开非常卡顿，所以不推荐此方法
    exports.mergeRenderPage = function (selectors) {
        var that = this;
        that.fixStatusBar(selectors);   // 设置沉浸式

        var frameContainer = document.getElementsByClassName("hui-frame-container")[0];
        var animateClassName = "hui-frame-container-show";
        that.viewappear(function (ret, err) {
            if (!frameContainer.classList.contains(animateClassName)) {
                setTimeout(function () {
                    frameContainer.classList.add(animateClassName);
                }, 100);
            }
        });
        that.viewdisappear(function (ret, err) {
            setTimeout(function () {
                frameContainer.classList.remove(animateClassName);
            }, 100);
        });
    }
    ;
    // 解决 IOS active问题
    if (document.body) {
        document.body.addEventListener('touchstart', function () { });
    }
});
