$(function () {
    var currentPage = 1;
    var pageSize = 5;

    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                // console.log(data);
                var html = template("tpl", data);
                $("tbody").html(html);

                //设置分页的功能

                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: currentPage,//当前页
                    totalPages: Math.ceil(data.total / pageSize),//总页数
                    size: "small",//设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });

                //启用、禁用 用户
                //因为按钮是动态渲染出来的所以需要给他的父亲绑定委托事件
                $("tbody").on("click", ".btn", function () {
                    //获取数据
                    $("#userModal").modal("show");
                    // console.log(data);
                    var id = $(this).parent().data("id");
                    var isDelete = $(this).parent().data("isDelete");
                    //判断isDelete如果是禁用状态就改成启用状态 ，启用状态同理
                    isDelete = isDelete === 1 ? 0 : 1;
                    //点击确定按钮需要禁用或者启用该用户
                    $(".btn_confirm").off().on("click",function () {
                        $.ajax({
                            type:"post",
                            url:"/user/updateUser",
                            data:{
                                id:id,
                                isDelete:isDelete
                            },
                            success:function (data) {
                                //关闭模态框
                                if(data.success){
                                    $("#userModal").modal("hide");
                                    //重新获取数据
                                    render();
                                }

                            }
                        })
                    })

                })


            }
        });
    }

    render();
});
