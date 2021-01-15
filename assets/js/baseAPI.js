//1.开发环境
var baseURL = "http://api-breakingnews-web.itheima.net"
//2.测试环境
// var testURL = "http://api-breakingnews-web.itheima.net"
//3.生产环境
// var tureURL = "http://api-breakingnews-web.itheima.net"
$.ajaxPrefilter(function (res) {
    res.url = baseURL + res.url;
});