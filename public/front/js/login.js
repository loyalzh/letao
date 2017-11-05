$(function () {

//点击登录按钮实现登录功能
    $(".btn_login").on("click",function () {
        //先获取用户名和密码的值
        var username= $("[type='text']").val();
        var password= $("[type='password']").val();
        // console.log(username);
        // console.log(password);
        //校验看用户名和密码是否都存在
        if(!username){
            mui.toast("请输入用户名");
            return false;
        }
        if(!password){
            mui.toast("请输入密码");
            return false;
        }
        //发送ajax请求
        $.ajax({
            type:"post",
            url:" /user/login",
            data:{
                username:username,
                password:password
            },
            success:function (data) {
                // console.log(data);
                if(data.success){
                    //登录成功，跳转到哪儿？
                    //首先要获取到回跳的地址
                    var search = location.search;
                    console.log(search);
                    //search: "?retURL=http://localhost:3000/front/product.html?productId=1"
                    if(search.indexOf("retURL")>-1){
                        search = search.replace("?retURL=","");
                        location.href = search;
                    }else{
                        location.href = "user.html";
                    }
                }
                if(data.error===403){
                    mui.toast(data.message);
                }
            }
        })
    })






})