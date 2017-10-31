
$(function () {

    var currentPage = 1;
    var pageSize = 5;

    //发送ajax请求
    function render() {
        $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        success:function (data) {
            // console.log(data);
            $("tbody").html(template("tpl",data));

            //分页功能
            $("#paginator").bootstrapPaginator({
                bootstrapMajorVersion:3,
                currentPage:currentPage,
                totalPages:Math.ceil(data.total/pageSize),
                size:"small",
                onPageClicked:function(event, originalEvent, type,page){
                    currentPage=page;
                    render();
                }
            });

        }
    })

    }
    render();

    //显示模态框
    $(".btn_add").on("click",function () {
        $("#addModal").modal("show");
    });

    //发送ajax请求，获取一级分类的数据，渲染下拉框
    $.ajax({
        type:"get",
        url:"/category/queryTopCategoryPaging",
        data:{
            page:1,
            pageSize:100
        },
        success:function (data) {
           // console.log(data)
            $(".dropdown-menu").html(template("tpl1",data));
        }
    });
    //点击下拉框，让某个选中
    
    $(".dropdown-menu").on("click","a",function () {
        $(".dropdown_text").text($(this).text());
        $("#categoryId").val($(this).data("id"));
        $form.data('bootstrapValidator').updateStatus("categoryId","VALID");

    })


    //文件上传
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
           console.log(data);
            $(".img_box img").attr("src",data.result.picAddr);
            $("#brandLogo").val(data.result.picAddr);
            $("#hot").val(1);
            $form.data('bootstrapValidator').updateStatus("categoryId","VALID");
        }
    });




    // 表单校验
    var $form = $("#form");
    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
           categoryId:{
               validators:{
                   notEmpty:{
                       message:"请选择一级分类"
                   }
               }
           },
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传图片"
                    }
                }
            },
            hot:{
                validators:{
                    notEmpty:{
                        message:"请输入火热品牌"
                    }
                }
            }
        }
    });
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$form.serialize(),
            success:function (data) {
                if(data.success){
                    // console.log(data)
                    $("#addModal").modal("hide");
                    currentPage = 1;
                    render();
                    $form[0].reset();
                    $form.data("bootstrapValidator").resetForm();
                    $(".dropdown-text").text("请选择一级分类");
                    $(".img_box img").attr("src","images/none.png");
                }
            }
        })
    });




});