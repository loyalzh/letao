$(function () {
    var currentPage = 1;
    var pageSize = 100;
    //渲染一级分类的功能
    function render() {
        //发送ajax请求
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                console.log(data);
                var html = template("tpl", data);
                $("tbody").html(html);
                //设置分页功能
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / pageSize),
                    size: "small",
                    onPageClicked: function (event, originalEvent, type, page) {
                        currentPage = page;
                        //重新渲染
                        render();
                    }
                });
            }
        })
    }
    render();
    //显示添加模态框
    $(".btn_add").on("click", function () {
        $("#addModal").modal("show");
    })
    //给表单做校验
    var $form = $("#form");
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    }
                }
            }
        }

    });

    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$form.serialize(),
            success:function (data) {
                // console.log(data);
                //关闭模态框
                if(data.success){
                    //关闭模态框
                    $("#addModal").modal("hide");
                    //将新添加的显示在表的第一页开头
                    currentPage = 1;
                    //重新获取后台数据
                    render();
                    //重置表单
                    var validator = $form.data('bootstrapValidator');
                    validator.resetForm();
                    $form[0].reset();
                }
            }
        })

    });

});
