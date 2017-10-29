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
})
