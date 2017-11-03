var tools = {
    //获取地址栏中的所有的参数
    getParamObj: function () {
        var obj = {};
        var search = location.search;
        //去除最前端的问号
        search = search.slice(1);
        // 按照“&”分割成数组
        var arr = search.split("&");
        // console.log(arr)
        for (var i = 0; i < arr.length; i++) {
            var key =arr[i].split("=")[0];
            var value =decodeURI(arr[i].split("=")[1]);
            obj[key] = value;
        }
        return obj ;
    },
    getParam:function (key) {
        return this.getParamObj()[key];
    }
}