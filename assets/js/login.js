$(function () {
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })

    $("#link_login").on("click", function () {
        $(".reg-box").hide();
        $(".login-box").show();
    })

    //自定义验证规则
    var form = layui.form;
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $(".reg-box [name=password]").val()
            if (pwd !== value) {
                return "两次密码输入不一致"
            }
        }
    });

    //监控注册表单提交事件
    $("#form_reg").on("submit", function (e) {
        var layer=layui.layer
        // 阻止表单默认提交
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username:$(".reg-box [name=username]").val(),
                password:$(".reg-box [name=password]").val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //提交成功后处理代码
                layer.msg("注册成功，请登录")
                //手动切换到登录页面
                $("#link_login").click();
                // 重置form表单,清空输入框的内容
                $("#form_reg")[0].reset();
            }
        })
    })

    //监控登录表单提交事件
    $("#form_login").on("submit", function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //提交成功后处理代码
                layer.msg("登录成功!")
                //在本地保存token
                localStorage.setItem("token",res.token)
                // 跳转到后台
                location.href = "/index.html";
            }
        })
    })
})