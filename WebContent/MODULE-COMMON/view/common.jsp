<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!--
	@author: Tran Minh Dang(DangTM)
	@day:	 25/12/2015
 -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<title>
			<tiles:insertAttribute name="title" ignore="true" />
		</title>
		<link href="${pageContext.request.contextPath}/MODULE-COMMON/css/app.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/MODULE-COMMON/css/app.datetimepicker.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/MODULE-COMMON/css/app.toggle.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/MODULE-COMMON/css/jquery-ui.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/MODULE-COMMON/css/animate.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/MODULE-COMMON/css/font.min.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/MODULE-COMMON/css/jquery-contextmenu.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/MODULE-COMMON/css/style.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/MODULE-COMMON/css/style.ehotel.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/MODULE-COMMON/css/dataTables.bootstrap.min.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/MODULE-COMMON/css/jquery-jcrop.css" rel="stylesheet">
		<link href="${pageContext.request.contextPath}/MODULE-COMMON/css/colorpicker.min.css" rel="stylesheet">
		
		<link rel="shortcut icon" href="${pageContext.request.contextPath}/MODULE-COMMON/images/ic-e.png">
		
		<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery-2.1.3.min.js"></script>
		<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/common.js"></script>
		<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/redirect.js"></script>
		<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/header.js"></script>
		
	</head>
<body>
	<tiles:insertAttribute name="header" ignore="true" /><!-- /.header -->
	<tiles:insertAttribute name="content" ignore="true" /> <!-- /.content -->
	<tiles:insertAttribute name="footer" ignore="true" /> <!-- /.footer -->
	<tiles:insertAttribute name="message" ignore="true" /> <!-- /.message -->

	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/app.min.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/app.datetimepicker.min.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/app.toggle.min.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery.easing.min.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery.cookie.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery-ui.min.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/classie.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/gnmenu.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/app.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery-contextmenu.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery.numberic.min.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery.dataTables.min.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/function-upload.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery.jcrop.min.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/colorpicker.min.js"></script>
	<%-- <script src="${pageContext.request.contextPath}/MODULE-COMMON/js/formValidation.js"></script> --%>
</body>
</html>