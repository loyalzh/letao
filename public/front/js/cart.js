$(function () {
    //下拉刷新功能
    mui.init({
        pullRefresh:{
            container:".mui-scroll-wrapper",
            down:{
                auto:true,
                callback:function () {
                    //渲染购物车的功能
                    $.ajax({
                        type:"get",
                        url:" /cart/queryCart",
                        success:function (data) {
                            console.log(data);
                            setTimeout(function () {
                                // console.log(data);
                                tools.checkLogin(data);
                                $("#OA_task_2").html(template("tpl",{data:data}));
                                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                            },1000);

                        }
                    })
                }
            }
        }
    })
    
    //删除功能 为了ios上一个bug，如果用到了下拉刷新或者上拉加载，mui禁用了click，需要使用tap
    $("#OA_task_2").on("tap",".btn_delete",function () {
        //先获取对应的id
        var id = $(this).data("id");
        // console.log(id);
        mui.confirm("确定删除吗？","提示",["是","否"],function(e){
            // console.log(e);
            if(e.index===1){
                mui.toast("操作取消");
            }else{
                $.ajax({
                    type:"get",
                    url:" /cart/deleteCart",
                    data:{
                        id:[id]//文档中id是一个数组
                    },
                    success:function (data) {
                      tools.checkLogin(data);
                        if(data.success){
                            mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                        }
                    }
                })
            }
        })
    })

    //编辑的功能
    $("#OA_task_2").on("tap",".btn_edit",function () {
        // console.log("呵呵");
        var $this=$(this);
        console.log(this.dataset);
        var data = this.dataset;
        var html =template("tpl2",data)
        html=html.replace(/\n/g,"");
        mui.confirm(html,"编辑商品",["确定","取消"],function (e) {
            if(e.index===1){
                mui.toast("操作取消");
            }else{
               $.ajax({
                   type:"post",
                   url:" /cart/updateCart",
                   data:{
                       id:data.id,
                       size:$(".lt_edit_size span.now").html(),
                       num:$(".mui-numbox-input").val()
                   },
                   success:function (data) {
                       tools.checkLogin(data);
                       //重新刷新
                       if(data.success){
                           mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();

                       }
                   }
               });
            }
        });
        mui(".mui-numbox").numbox();
        $(".lt_edit_size span").on("tap",function () {
            $(this).addClass("now").siblings().removeClass("now");
        })
    });

    //计算总金额的功能 事件tap/click/change都可
    $("#OA_task_2").on("change",".ck",function () {
        console.log("呵呵")
        var total =0;
        // 所有被选中的Checkbox
        $(":checked").each(function (i,e) {
            total+=$(this).data("num")*$(this).data("price");
        });
        $(".lt_total span").html(total);
    })




})
