$(function () {
  //短信验证功能
    $(".getCode").on("click",function () {
        // console.log(123);
        var $this =$(this);
        //判断是否有disabled类
        if($this.hasClass("disabled")){
            return false;
        }
        $this.addClass("disabled").html("正在发送中....");
        //发送ajax请求
        $.ajax({
            type:"get",
            url:"/user/vCode",
            success:function (data) {
                console.log(data);

                //倒计时功能
                var num =60;
                var timer = setInterval(function () {
                   num--;
                    $this.html(num+"秒后重新发送");
                    if(num<=0){
                        $this.html("再次发送").removeClass("disabled");
                        clearInterval(timer);
                    }
                },1000)
            }
        })

    });

    //手机注册的功能
    $(".register").on("click",function () {
        // console.log(456);
        //获取后台所需数据
        var username = $("[name='username']").val();
        var password = $("[name='password']").val();
        var repassword = $("[name='repassword']").val();
        var mobile   = $("[name='mobile']").val();
        var vCode    = $("[name='vCode']").val();

        //表单校验
        if(!username){
            mui.toast("请输入用户名");
            return false;
        }
        if(!password){
            mui.toast("请输入密码");
            return false;
        }
        if(!repassword){
            mui.toast("请输入确认密码");
            return false;
        }
        if(password != repassword){
            mui.toast("两次密码不一致，请重新输入");
            return false;
        }
        if(!mobile){
            mui.toast("请输入手机号");
            return false;
        }
        if(!/^1[34578]\d{9}$/.test(mobile)){
            mui.toast("请输入有效的手机号");
            return false;
        }
        if(!vCode){
            mui.toast("请输入验证码");
            return false;
        }
        if(!/^\d{6}$/.test(vCode)){
            mui.toast("请输入有效的验证码");
            return false;
        }

        //发送ajax请求
        $.ajax({
            type:"post",
            url:"/user/register",
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vCode
            },
            success:function (data) {
                // console.log(data);
                if(data.success){
                   mui.toast("登录成功");
                    setTimeout(function () {
                    location.href = "login.html";
                    },1000)
                }else{
                    mui.toast(data.message);
                }
            }
        })

    })
})
