$(function () {
 //渲染个人中心
    $.ajax({
        type:"get",
        url:"/user/queryUserMessage",
        success:function (data) {
           console.log(data);
            // id: 1, username: "itcast", password: "lueSGJZetyySpUndWjMBEg==", mobile: "15102324243", isDelete: 1}id: 1isDelete: 1mobile: "15102324243"password: "lueSGJZetyySpUndWjMBEg=="username: "itcast"
            $(".userinfo").html(template("tpl",data))
        }
    });
    
    //退出功能
    $(".logout a").on("click",function () {
       mui.confirm("确定要退出系统吗？","提示",["是","否"],function (e) {
           // console.log(e);
           // {index: 0, value: "是"}
           // {index: 1, value: "否"}
           if(e.index===1){
               mui.toast("操作取消");
           }else{
               $.ajax({
                  type:"get",
                   url:"/user/logout",
                   success:function (data) {
                       if(data.success){
                           location.href="login.html";
                       }
                   }
               })
           }

       })
    })




})
