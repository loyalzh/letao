$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005,
        indicators: false
    });

    var data = {
        proName: "",
        brandId: "",
        price: "",
        num: "",
        page: 1,
        pageSize:10
    }

    function render(data) {
        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: data,
            success: function (data) {
                console.log(data);
                setTimeout(function () {
                    $(".lt_product").html(template("tpl", data));
                }, 1000)
            }
        })
    }

    var key = tools.getParam("key");
     // console.log(key);
    $(".lt_search_text").val(key);

    data.proName = key;
       // console.log(data);
    render(data);
    // $(".lt_search_text").val("");

    //点击搜索按钮
    $(".lt_search_btn").on("click", function () {
        //把所有的a的now样式清掉，同时，把两个排序也清掉
        $(".lt_sort a").removeClass("now");
        $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
        data.price = '';
        data.num = '';
    
        //获取用户输入的内容
        var key = $(".lt_search_text").val().trim();
        if (key === "") {
            mui.toast("请输入搜索的内容");
        }
        $(".lt_product").html('<div class="loading"></div>');
    console.log('here')
        data.proName = key;
        render(data);
    
    });

    //排序功能
    $(".lt_sort>a[data-type]").on("click", function () {
        var $this = $(this);
        var $span = $(this).find("span");

        if ($this.hasClass("now")) {
            $span.toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        } else {
            //a没有now
            $(this).addClass("now").siblings().removeClass("now");
            $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }

        //判断是哪个排序
        var type = $this.data("type");
        var value = $span.hasClass("fa-angle-down") ? 2 : 1;

        //设置num或者price ，在这之前需要保证之前的清空
        data[type] = value;
        render(data);

    });

})
