$(function () {
    // 功能1
    $('#link_reg').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    });
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });
    // 功能1结束
    //功能2校验开始
    const form = layui.form;// 从 layui 中获取 form 对象
    const layer = layui.layer;//从 layui 中获取 layer 对象
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) { //value表单的值
            const pwd = $('.reg-box [name=password]').val();//密码框的值 
            console.log(pwd);
            if (pwd !== value) {
               return '亲，密码不一致哦'
            }
        }
    });
     //功能2校验结束
    // 功能3监听注册表单的提交事件开始
    $('#form_reg').submit(function (e) {
        e.preventDefault();
        const data = {
            username : $('#form_reg [name=username]').val(),
            password :$('#form_reg [name=password]').val()
        }
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: data,
            success: function (res) {
                if (res.status !== 0) { 
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('注册成功，请登录！', { icon: 6 });
                $('#link_login').click();
            }
        });
    });
    // 功能3监听注册表单的提交事件结束
    // 功能4监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) { 
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('登录成功！');
                localStorage.setItem('token', res.token);//token 字符串保存到localStorage
                location.href = 'index.html';//跳转主页
            }
        });
    });
    // 功能4监听登录表单的提交事件结束





































});