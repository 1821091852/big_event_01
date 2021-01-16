$(function () {
    //1.获取用户信息,并渲染用户名和头像
    getUserInfo();
    //2.点击退出
    $("#btnLogout").on("click", function () {
        //弹出询问框
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            //1.清空本地token
            localStorage.removeItem("token");
            //2.跳回登录页面
            location.href = "/login.html"
            //3.关闭询问框
            layer.close(index);
        });
    })
})
//获取用户信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败")
            }
            //调用渲染用头像的函数
            randerAvatar(res.data)
        }   
    })
}

//渲染用头像的函数
function randerAvatar(user) {
    //1.获取用户头像
    var name = user.nickname || user.username
    //2.设置欢迎文本
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    //3.渲染头像
    if (user.user_pic !== null) {
        //有图片
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide();
    } else {
        //没有图片,渲染文字头像
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".text-avatar").show().html(text);
    }
}