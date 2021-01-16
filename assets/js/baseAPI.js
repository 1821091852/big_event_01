//1.开发环境
var baseURL = "http://api-breakingnews-web.itheima.net"
//2.测试环境
// var testURL = "http://api-breakingnews-web.itheima.net"
//3.生产环境
// var tureURL = "http://api-breakingnews-web.itheima.net"
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url;

    //统一为有权限的接口,设置header请求头
    // 查不到的值,indexOf()为-1
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
             Authorization:localStorage.getItem('token') || ''
        }
    }

    //不登陆,不允许访问后台
    options.complete= function(res) {
        // console.log('执行了 complete 回调：')
        // console.log(res)
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
          // 1. 强制清空 token
          localStorage.removeItem('token')
          // 2. 强制跳转到登录页面
          location.href = '/login.html'
        }
      }
});