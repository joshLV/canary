<%@ page language="java" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>canary</title>
</head>
<body>

用户登陆
<label for="username">用户</label><input type="text" id="username" name="username">
<label for="password">密码</label><input type="password" id="password" name="password">
<a href="javascript:void(0)" onclick="submit()">登陆</a>

<a href="javascript:void(0)" onclick="">QQ登陆</a>
<img src="/static/image/qq.jpg" onclick="qqLogin()">

<script type="text/javascript" src="${pageContext.request.contextPath}/static/jquery/jquery-1.11.3.js" charset="UTF-8"></script>
<script>

    function submit() {
        $.ajax({
            type: "post",
            url: "/login",
            data: {"username": $("#username").val(), "password": $("#password").val()},
            success: function (result) {
                //成功
                if (result.code == 0 ) {
                    window.location.href = "/index";
                }
                //失败
                else {
                    window.location.href = "/login/view";
                }
            }
        });
    }

    /**
    * qq登录
     */
    function qqLogin(){
        https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=222425&redirect_uri=http://www.mwkong.com


    }

</script>

</body>
</html>