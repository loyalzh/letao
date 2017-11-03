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





})