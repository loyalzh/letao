mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false
});
//获取缓存中的数据
function getHistory() {
    var search_history = localStorage.getItem("lt_search_history") || "[]";
    //将JSON字符串转化为数组
    var arr = JSON.parse(search_history);
    return arr;
}

function render() {
    var arr = getHistory();
    console.log(arr);
    $(".lt_history").html(template("tpl", {arr: arr}));
}
render();

//清空功能(委托事件)
$(".lt_history").on("click", ".icon_empty", function () {
    //清除缓存的数据
    localStorage.removeItem("lt_search_history");
    render();
})

//删除功能(委托事件)
$(".lt_history").on("click",".icon_close",function () {
    // console.log(123);
    var btnArr = ['是','否'];
    var index = $(this).data("index");
    mui.confirm("你确定要删除这条记录吗","温馨提示",btnArr,function (data) {
       console.log(data);
        if(data.index === 0){
            var arr =getHistory();
            //获取页面中对应哪一条数据 index 是前面自定义属性中存储的数组的下标。
            console.log(index);
            arr.splice(index,1);
            //删除后的数据重新存储在localStorage,并将数组转化为JSON字符串
            localStorage.setItem("lt_search_history",JSON.stringify(arr));
            //重新渲染一次数据
            render();
            mui.toast("操作成功");
        }else{
            mui.toast("操作取消");
        }
    })
});

//添加的功能
//1.注册点击事件（给搜索按钮添加）
//2. 获取文本框中的value值，判断如果没有输入关键字，给用户一个提示
//3. 需要把这个value值存储到缓存中
//4. 页面需要跳转到搜索详情页-  把关键字带过去
$(".lt_search_btn").on("click",function () {
   // console.log(123);
    var key = $(".lt_search_text").val();
    if(key.trim()===""){
        mui.alert("请输入要搜索的内容","温馨提示");
        return;
    }
    //1.获取缓存中的数据
    var arr =getHistory();
    var index = arr.indexOf(key);
    if(index>-1){
        // 存在该条数据，然后删除这条数据
        arr.splice(index,1);
    }
    if(arr.length>=10){
        //删除最后一条
        arr.pop();
    }
    arr.unshift(key);
    localStorage.setItem("lt_search_history",JSON.stringify(arr));
    //页面跳转时需要将数据key一起携带过去
    location.href = "searchList.html?key="+key;
    //将输入框的内容清空
    $(".lt_search_text").val("");
    
})

