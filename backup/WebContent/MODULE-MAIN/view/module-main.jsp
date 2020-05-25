<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<title>Insert title here</title>
<link href='${pageContext.request.contextPath}/MODULE-MAIN/css/main.css'
	rel='stylesheet'>
<%-- <link href='${pageContext.request.contextPath}/MODULE-MAIN/css/bootstrap-toggle.min.css' rel='stylesheet'> --%>
<%-- <script
	src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery-1.11.1.min.js"></script> --%>
<%-- <script src="${pageContext.request.contextPath}/MODULE-MAIN/js/bootstrap-toggle.min.js"></script> --%>
<script
	src="${pageContext.request.contextPath}/MODULE-MAIN/js/module-main.js"></script>

</head>
<body>
	<section class="home-section">
	<div class="container">
		<div class="col-md-12">
			<!--Create or Edit Playlist-->
			<div class="panel panel-default">
				<div class="panel-heading text-center" style="font-size: 18px;">
					<s:property value="getText('welcome.list.main')" />
					<!-- <div class="text-right">	 -->
					<!-- <button type="button" class="btn btn-info btn-sm" onclick="opendialogadd()"><i class="fa fa-floppy-o"></i> ADD</button> -->
					<!-- <button type="button" class="btn btn-default btn-sm"><i class="fa fa-times"></i> Close</button> -->
					<!-- </div>		 -->
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col-md-11 col-md-offset-1" id="listmain"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</section>

	<!-- cho nay dung de add form main -->
	<div class="modal fade" id="form_dialog" role="dialog">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header text-center" style="font-size: 18px;">
				<s:property value="getText('welcome.list.main')" />
					<!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="id_form_dialog" role="form">
						<div class="form-group">
							<label class="control-label col-sm-3"><s:property value="getText('welcome.main.content')" />:</label>
							<div class="col-sm-9">
								<input type="text" class="form-control" id="txt_noidung"
									placeholder="">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-offset-3 col-sm-5">
								<input id="file_lag" name="file_lag" type="file"
									class="file-loading"
									onchange="previewFile('img_lag','file_lag','name_lag')">
								<input id="name_lag" name="name_lag" type="hidden">
							</div>
							<div class="col-sm-4">
								<img id="img_lag" alt="" src=""
									style="height: 30px; width: 80px; float: right;">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-12">
								<div class="text-right">
									<button type="button" class="btn btn-info btn-sm"
										onclick="AddMain();">
										<i class="fa fa-floppy-o"></i>Submit
									</button>
									<button type="button" class="btn btn-default btn-sm"
										onclick="closedialogadd();">
										<i class="fa fa-times"></i>Close
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>

			</div>
		</div>
	</div>


	<!-- cho nay dung de edit form main -->
	<div class="modal fade" id="form_dialog_update" role="dialog">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header text-center" style="font-size: 18px;">
				<s:property value="getText('welcome.item.main')" />
					
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="id_form_dialog_update"
						role="form">
						<input type="hidden" id="id_main_update"></input> <input
							type="hidden" id="name_image_old"></input>
						<div class="form-group">
							<label class="control-label col-sm-3"><s:property value="getText('welcome.main.content')" />:</label>
							<div class="col-sm-9">
								<input type="text" class="form-control" id="txt_noidung_update"
									placeholder="">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-3"><s:property value="getText('welcome.main.index')" />:</label>
							<div class="col-sm-9">
								<input type="text" class="form-control" id="txt_index_update"
									placeholder="">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-offset-3 col-sm-5">
								<input id="file_lag_update" name="file_lag_update" type="file"
									class="file-loading"
									onchange="previewFile('img_lag_update','file_lag_update','name_lag_update')">
								<input id="name_lag_update" name="name_lag_update" type="hidden">
							</div>
							<div class="col-sm-4">
								<img id="img_lag_update" alt="" src=""
									style="height: 30px; width: 80px; float: right;">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-12">
								<div class="text-right">
									<button type="button" class="btn btn-info btn-sm"
										onclick="EditMain_();">
										<i class="fa fa-floppy-o"></i>Submit
									</button>
									<button type="button" class="btn btn-default btn-sm"
										onclick="closedialogedit();">
										<i class="fa fa-times"></i>Close
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>