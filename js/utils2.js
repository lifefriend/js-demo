/**
 * Created by xiangliubo on 2016/1/6. 
 */
define([], function () {
    'use strict';
    var _this;
    var utils = function () {
        _this = this;

        if (!Array.prototype.indexOf) {
            _this.extendArrayIndexOf();
        }
    }
        //判断文件是否存在
        utils.prototype.getFileStatus=function(filePath){
            var fileActiveObj;
            if(window.XMLHttpRequest){
                fileActiveObj=new XMLHttpRequest()
            }else{
                fileActiveObj=new ActiveXObject("Microsoft.XMLHTTP");
            }
            fileActiveObj.open('get',filePath,false);
            fileActiveObj.send();
            if(fileActiveObj.readyState==4){
                if(fileActiveObj.status==200){
                    return true;
                }else{
                    return false;
                }
            }

        }
    utils.prototype.convertDotNetString2Date = function (dateStr) {
        var D, dtime, T, tz, off,
            dobj = dateStr.match(/(\d+)|([+-])|(\d{4})/g);
        T = parseInt(dobj[0]);
        tz = dobj[1];
        off = dobj[2];
        if (!!off) {
            off = (parseInt(off.substring(0, 2), 10) * 3600000) + (parseInt(off.substring(2), 10) * 600000);
            if (tz == '-') off *= -1;
        } else {
            off = 0;
        }
        //return new Date(T += off);
        return new Date(T);
    }
    /*
     * 关于Date类的扩展
     * */
    Date.prototype.toDotNetString = function () {
        var str = '\/Date(' + this.getTime() + '+0800)\/';
        return str;
    }
    /*
     * 关于Date类的扩展
     * */
    Date.prototype.format = function (fmt) { //author: meizz
        var zArr = ['日', '一', '二', '三', '四', '五', '六'];
        var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds(),             //毫秒
            "z": zArr[this.getDay()]                       //周
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

        return fmt;
    }
    /* 判断两个对象是否相等，数组只比较长度 */
    utils.prototype.simpleEquals = function (obj, otherObj) {
        if (obj == otherObj) {
            return true;
        }
        for (var i in obj) {
            if (!otherObj[i]) {
                return false;
            }
            if (obj[i] instanceof Array) {
                if (obj[i].length != otherObj[i].length) {
                    return false;
                }
            } else if (obj[i] instanceof Object) {
                var b = this.simpleEquals(obj[i], otherObj[i]);
                if (!b) {
                    return false;
                }
            } else {
                if (obj[i]  != otherObj[i] ) {
                    return false;
                }
            }
        }
        return true;
    }

    utils.prototype.createTimeSpanFromDonNet = function (dotNetStr) {
        var ret = {
            d: 0,
            h: 0,
            m: 0,
            s: 0,
            ms: 0
        };
        var r = /(\d*)DT(\d*)H(\d*)M(\d*)\.{0,1}(\d*)S/;
        var m = r.exec(dotNetStr);
        if (m[1]) {
            ret.d = parseInt(m[1]);
        }
        if (m[2]) {
            ret.h = parseInt(m[2]);
        }
        if (m[3]) {
            ret.m = parseInt(m[3]);
        }
        if (m[4]) {
            ret.s = parseInt(m[4]);
        }
        if (m[5]) {
            ret.ms = parseInt(m[5]) * 1000;
        }
        return ret;
    }
    /*
     * 将。net timeSapn 字符串转换为xx时xx分xx秒
     * */
    utils.prototype.formatTimeSpan = function (timeSpanObj, formatStr) {
        var o = {
            "d+": this.d,                    //日
            "h+": this.h,                   //小时
            "m+": this.m,                 //分
            "s+": this.s,                 //秒
            "ms+": this.ms,                 //秒
        };
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

        return fmt;
    }

    utils.prototype.getUrlParameter = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return results[1] || 0;
        }
    }
    /*
     * 关于Array的扩展
     * */
    utils.prototype.extendArrayIndexOf = function () {
        Array.prototype.indexOf = function (searchElement) {
            if (this === void 0 || this === null) {
                throw new TypeError('"this" is null or not defined');
            }

            var t = Object(this);
            var len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }

            var n = 0;
            if (arguments.length > 0) {
                n = Number(arguments[1]);
                if (n !== n) {
                    n = 0;
                } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }
            if (n >= len) {
                return -1;
            }

            var k = n >= 0
                ? n
                : Math.max(len - Math.abs(n), 0);

            for (; k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k;
                }
            }

            return -1;
        }
    }

    return new utils();
}
)
;