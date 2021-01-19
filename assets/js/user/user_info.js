$(function () {
    //1.自定义验证规则
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1-6位之间!";
            }
        }
    });
    //2.用户渲染
    initUserInfo()
    //3.初始化用户信息
    var layer = layui.layer;
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // console.log(res);
                //成功.后渲染
                form.val("formUserInfo", res.data);
            }
        })
    }
    //4.表单重置
    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        initUserInfo()
    })

    $('.layui-form').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data:$(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("用户信息修改成功")
                window.parent.getUserInfo();
            }
        })
    })
})