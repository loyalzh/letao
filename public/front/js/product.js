$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,
        indicators:false
    });

    var id = tools.getParam("productId");
    //id没有获取到！！！
    // console.log(id);
    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{
            id:id
        },
        success:function (data) {
             console.log(data);
            var size = data.size.split("-");
            var sizeArr = [];
            for(var i=size[0];i<=size[1];i++){
                sizeArr.push(i);
            }
            data.sizeArray = sizeArr;
            console.log(sizeArr);
            $(".mui-scroll").html( template("tpl", data) );
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:1000
            });
            mui(".mui-numbox").numbox();
        }

    })

    //尺码选择的功能(委托事件)
    $(".mui-scroll").on("click",".size",function () {
        // console.log("hehe");
        $(this).addClass("now").siblings().removeClass("now");
    })
    //添加到购物车的功能
    $(".btn_cart").on("click",function () {
        //获取数据 尺码、数量
        var size = $(".size.now").html();
        var num = $(".mui-numbox-input").val();
        // console.log(size);
        // console.log(num);
        //判断是否选择了尺码
        if(!size){
            mui.toast("请选择合适的尺码");
            return;
        }
        //发送ajax请求添加到购物车中
        $.ajax({
            type:"post",
            url:" /cart/addCart",
            data:{
                productId:id,
                size:size,
                num:num
            },
            success:function (data) {
                // console.log(data);
                if(data.success){
                    mui.toast("添加购物车成功");
                }
                if(data.error===400){
                    //未登录，需要跳转到登录界面 ，并保持原先的路径
                    location.href="login.html?retURL="+location.href;
                }
            }
        })

    })





})