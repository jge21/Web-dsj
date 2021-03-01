$(function () {
    getUserInfo();
    //退出功能
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        // console.log(1);
        layer.confirm('是否退出', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');//清空本地储存
            location.href = '/login.html';//强制跳转
            layer.close(index);
        });
        
    });
 
 });

//获取用户信息

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data);
        }
    });
}
// 渲染 头像
function renderAvatar(user) { 
    // console.log(user);
    const name = user.nickname || user.username
    // console.log(name);
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else { 
        $('.layui-nav-img').hide()
        const first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}