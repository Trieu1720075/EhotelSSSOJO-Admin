<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<title>Error</title>
</head>
<body>
	<div style="color: red; font-size: 16px;display: table-caption;">
		<p>Error Name: <s:property value="exception"/></p>
		<p>Error Stack Trace:</p> <s:property value="exceptionStack"/>
	</div>
	
	<img src="${pageContext.request.contextPath}/STYLE-INF/images/404.jpg" alt="Page Error" style="z-index: -1;position: absolute; left: 75%; top: 50%; margin-left: -285px; margin-top: -190px;">
</body>
</html>