
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
<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery-1.11.1.min.js"></script>
<script src="${pageContext.request.contextPath}/MODULE-LOGIN/js/login.js"></script>
</head>
<body>
	<div class="container">
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
<!-- 		<div class="copy-right">
			&copy; 2016 by Elcom HCM. eHotel is brand of system
			eHotel | Design by <a target="blank" href="http://elcom.com.vn/">Elcomer</a>
		</div> -->
	</div>
	
	<div id='ajax-loading' style="display: none;">
    	<img src="${pageContext.request.contextPath}/MODULE-COMMON/images/spinner.gif" class="img-loading"></img>
	</div>
</body>
</html>

