$(function () {

    var currentPage = 1;
    var pageSize = 8;
    var imgArray = [];

    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (data) {
                // console.log(data);
                $("tbody").html(template("tpl", data));

                //设置分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages: Math.ceil(data.total / pageSize),
                    size: "small",
                    onPageClicked: function (event, originalEvent, type, page) {
                        currentPage:page;
                        render()
                    }
                });
            }
        })
    }

    render();

    $(".btn_add").on("click", function () {
        $("#addModal").modal("show");

        //添加二级分类
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (data) {
                $(".dropdown-menu").html(template("tpl1", data));
            }
        })
    });

    $(".dropdown-menu").on("click", "a", function () {
        // console.log(1)
        $(".dropdown_text").text($(this).text());
        $("#brandId").val($(this).data("id"))
    })

    $("#fileupload").fileupload({
        dataType: "json",
        done: function (e, data) {
            //动态创建img
            $(".img_box").append('<img src="' + data.result.picAddr + '" width="100" height="100">');
            imgArray.push(data.result);
            //判断数组的长度。如果是3就说明上传成功了
            if (imgArray.length === 3) {
                $form.data('bootstrapValidator').updateStatus("productLogo", "VALID");
            } else {
                $form.data('bootstrapValidator').updateStatus("productLogo", "INVALID");
            }
        }
    });

    //表单验证
    var $form = $("#form");
    $form.bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    regexp: {
                        //必须是0以上的数字
                        regexp: /^[1-9]\d*$/,
                        message: "请输入一个大于0的库存"
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺寸"
                    },
                    regexp: {
                        //33-55
                        regexp: /^\d{2}-\d{2}$/,
                        message: "请输入正确的尺码（30-50）"
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品的折扣价"
                    }
                }
            },
            productLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传三张图片"
                    }
                }
            }
        }
    });

    $form.on('success.form.bv', function (e) {
        e.preventDefault();

        var param = $form.serialize();
        //需要拼接三张图片的地址
        param +="&picName1="+imgArray[0].picName+"&picAddr1="+imgArray[0].picAddr;
        param +="&picName2="+imgArray[1].picName+"&picAddr1="+imgArray[1].picAddr;
        param +="&picName3="+imgArray[2].picName+"&picAddr1="+imgArray[2].picAddr;

        //使用ajax提交逻辑
        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:param,
            success:function (data) {
                console.log(data);
                if(data.success){
                    //关闭模态框
                    $("#addModal").modal("hide");
                    //渲染第一页
                    currentPage = 1;
                    render();
                    //重置表单与样式
                    $form[0].reset();
                    $form.data('bootstrapValidator').resetForm();
                    //手动清空二级分类名称和图片内容
                    $(".dropdown_text").text("请选择二级分类");
                    $(".img_box img").remove();
                    imgArray=[];


                }
            }
        })

    });

})
