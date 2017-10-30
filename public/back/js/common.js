$(function () {

    if (location.href.indexOf("login.html") < 0) {
        $.ajax({
            type: "get",
            url: "/employee/checkRootLogin",
            success: function (data) {
                // console.log(data)
                if (data.error === 400) {
                    location.href = "login.html";
                }
            }
        });
    }
    $(document).ajaxStart(function () {
        NProgress.start();
    });

    $(document).ajaxStop(function () {
        setTimeout(function () {
            NProgress.done();
        }, 500);

    });

    //点击分类管理显示或者隐藏二级分类
    //prev()上一层兄弟
    // slideToggle()显示和隐藏之间切换
    $(".child").prev().on("click", function () {
        $(".child").slideToggle();
    })
    //点击icon_menu显示或者隐藏侧边栏 header的长度变长
    $(".icon_menu").on("click", function () {
        $(".ad_aside").toggleClass("now");
        $(".ad_main").toggleClass("now");
    })
    //公用退出的功能
    $(".icon_loginout").on("click",function () {
        $('#logoutModal').modal("show");
    });
    $(".btn_logout").on("click",function () {
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            success:function (data) {
                // console.log(data);
                if(data.success){
                    location.href="login.html";
                }
            }
        })
    })
});

