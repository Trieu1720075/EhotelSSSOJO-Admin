<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Tool Welcome</title>
	<link href="${pageContext.request.contextPath}/MODULE-COMMON/css/app.min.css" rel="stylesheet">
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.0/themes/base/jquery-ui.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/MODULE-COMMON/css/style.css" />
	<link href="${pageContext.request.contextPath}/MODULE-COMMON/css/font.min.css" rel="stylesheet">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/MODULE-WELCOME/css/style.signage.css" />
	<link href="${pageContext.request.contextPath}/MODULE-COMMON/css/app.datetimepicker.min.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/MODULE-COMMON/css/dataTables.bootstrap.min.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/MODULE-COMMON/css/font.min.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/MODULE-COMMON/css/jquery-contextmenu.css" rel="stylesheet">
	
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script>
    <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script> 

    <script src="${pageContext.request.contextPath}/MODULE-WELCOME/js/tool-welcome.js"></script>
    <script src="${pageContext.request.contextPath}/MODULE-WELCOME/js/ELCUpload.js"></script>
<%--     <script src="${pageContext.request.contextPath}/MODULE-WELCOME/js/jquery.numberic.min.js"></script>    --%>     
<%--   	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> --%>
  	
</head>
<body>
	<section class="home-section text-center">
	<div class="container">
		<div class="row">
			<div class="col-md-12" style="visibility: hidden;" ><!-- -->
				<div class="panel panel-default">
					<div class="panel-heading">Layout detail</div>
					<div class="panel-body"
						style="overflow: auto; max-height: 100px; padding: 0px">
						<table class="table">
							<thead>
								<tr>
									<td>No</td>
									<td>Name</td>
									<td>Type</td>
									<td>X</td>
									<td>Y</td>
									<td>Width</td>
									<td>Height</td>
									<!-- <td>Delete</td> -->
								</tr>
							</thead>
							<tbody id="tbody-location2"></tbody>
						</table>
					</div>
				</div>
			</div>
			<br>
			<div class="col-md-12" style="margin-top: 10px;">
				<div class="panel panel-default">
					<div class="panel-heading text-right">
						<div class="dropdown keep-open-resolution">
							<button class="btn btn-primary btn-sm" type="button"
								onclick="createNewLayout()">
								<i class="fa fa-floppy-o"></i> Reset
							</button>							
							<button class="btn btn-default btn-sm dropdown-toggle"
								type="button" id="sizescreen" data-toggle="dropdown"
								aria-haspopup="true" aria-expanded="true">
								<i class="fa fa-desktop"></i> <span>HD 1280x720</span> <span
									class="caret"></span>
							</button>
							<ul class="dropdown-menu dropdown-menu-resolution pull-right"
								aria-labelledby="sizescreen">
								<li><a href="javascript:void(0)" data-height="720"
									data-width="1280" data-value="1"><i class="fa fa-desktop"></i>
										HD 1280x720</a></li>
								<li><a href="javascript:void(0)" data-height="1080"
									data-width="1920" data-value="2"><i class="fa fa-desktop"></i>
										Full HD 1920x1080</a></li>
								<li><a href="javascript:void(0)" data-height="1080"
									data-width="2048" data-value="3"><i class="fa fa-desktop"></i>
										2K 2048x1080</a></li>
								<li><a href="javascript:void(0)" data-height="2160"
									data-width="3840" data-value="4"><i class="fa fa-desktop"></i>
										4K 3840x2160</a></li>
							</ul>
						</div>
					</div>

					<div class="panel-body">
						<div class="col-md-3 box">
							<div class="col-md-8 col-md-offset-2" id="gallery-drap-drop">

								<div class="drag-image fa fa-picture-o" title="Image"></div>

								<div class="drag-text fa fa-file-text-o" title="Text"></div>

								<div class="drag-video fa fa-film" title="Video"></div>
							</div>
						</div>
						<div class="col-md-12" style="height: 400px;">
							<div id="div-tivi" class="div-tivi">
							</div>
						</div>
						<div>
							<form class="form-horizontal" role="form" id="form_image">
								<input type="file" id="item-file" name="item-file"
									style="visibility: hidden;">
								<!-- onchange="previewFileImage('item-image','item-file','file-name')" -->
								<img id="item-image" alt="" src=""
									style="visibility: hidden; max-width: 20px; max-height: 20px;">
								<input type="hidden" name="fileName" id="file-name">
							</form>
						</div>

						<div>
							<input id="file-video" type="file" name="uploads[]"
								style="display: none;">
						</div>
					</div>
				</div>

			</div>
			<div class="col-md-12" >
				<div class="panel panel-default">
					<div class="panel-heading">Layout detail</div>
					<div class="panel-body"
						style="overflow: auto; max-height: 500px; padding: 0px">
						<table class="table">
							<thead>
								<tr>
									<td>No</td>
									<td>Name</td>
									<td>Type</td>
									<td>X</td>
									<td>Y</td>
									<td>Width</td>
									<td>Height</td>
								</tr>
							</thead>
							<tbody id="tbody-location"></tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	</section>
	
	<!-- Delete Item Dialog -->
<div id="item-delete-dialog" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 400px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"><s:property value="getText('welcome.delete')" /></h5>
			</div>
			<div class="modal-body">
				<span style="color: red;" id="item-delete"><s:property value="getText('welcome.delete.confirm')" /></span> 
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-danger" onclick="deleteItem()"><s:property value="getText('welcome.delete')" /></button>
				<button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><s:property value="getText('welcome.cancel')" /></button>
			</div>
		</div>
	</div>
</div>
</body>
</html>