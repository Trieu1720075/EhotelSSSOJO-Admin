
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!--
    @author: Tran Minh Dang(DangTM)
    @day:    25/12/2015
 -->
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title><tiles:insertAttribute name="title" ignore="true" /></title>
<link href='${pageContext.request.contextPath}/MODULE-COMMON/css/bootstrap.min.css' rel='stylesheet'>
<link href='${pageContext.request.contextPath}/MODULE-COMMON/css/app.login.css' rel='stylesheet'>
<link href='${pageContext.request.contextPath}/MODULE-LOGIN/css/module-login.css' rel='stylesheet'>
<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery-2.1.3.min.js"></script>
<script src="${pageContext.request.contextPath}/MODULE-LOGIN/js/login.js"></script>



	<style>
			html, body{
				height:100%;
				margin: 0px;
				padding: 0px;
			}
			.container-fluid{
					  height:100%;
					  display:table;
					  width: 100%;
					  padding: 0;
			}
			.row-fluid {
				height: 100%; 
				display:table-cell; 
				vertical-align: middle;
			}
			
		</style>

</head>
<body>
	<!-- <div class="container">
	    <div class="row">
	        <div class="col-md-12">
	            <div class="wrap">
	                <p class="form-title"> Sign In</p>
	                <form class="login">
		                <div class='c-login-process' style="color: red; font-size: 14px"></div>
		                <input type="text" placeholder="Username" id="username" autofocus/>
		                <input type="password" placeholder="Password" id="password" />
		                <input type="button" value="Sign In" onclick="fnLogin()" class="btn btn-success btn-sm" />
	                </form>
	            </div>
	        </div>
	    </div>
	</div> -->
	
	
	
	<div class="container-fluid">
	<div class="row-fluid">
	<div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
		<div class="login-panel panel panel-primary" style="border-radius: 5px;">
			<div class="panel-heading" style="text-align:center; border-radius: 5px 5px 0px 0px;">Sign In</div>
			<div class="panel-body">
				<form role="form">
					<fieldset>
						<div class="form-group">
							<input class="form-control" placeholder="Username"
								name="username" id='username' type="text" value="" autofocus>
						</div>
						<div class="form-group">
							<input class="form-control" value="" placeholder="Password"
								name="password" id='password' type="password" value="">
						</div>
						<div class='c-login-process' style="text-align:center;padding-bottom: 11px;font-size: 12px;color:#e51c23">
						</div>
						<div class="btn-login" style="text-align:center">
							 <input type="button" value="Login" onclick="fnLogin()" class="btn btn-primary" />
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	</div> <!-- /.col-->
</div>
</div> <!-- /.row -->
	
	<div id='ajax-loading' style="display: none;">
    	<img src="${pageContext.request.contextPath}/MODULE-COMMON/images/spinner.gif" class="img-loading"></img>
	</div>
	
	<script src="${pageContext.request.contextPath}/MODULE-LOGIN/js/jquery.backstretch.min.js"></script>
	<script>
	$.backstretch(["${pageContext.request.contextPath}/MODULE-LOGIN/images/bg_01.png", "${pageContext.request.contextPath}/MODULE-LOGIN/images/bg_02.png"], {speed: 1000});

</script>
</body>
</html>

