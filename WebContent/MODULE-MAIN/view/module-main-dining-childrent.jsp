<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<meta charset="utf-8">
<title>Insert title here</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/MODULE-TOOL/css/editor.css" />
<link rel="stylesheet" href="<%=request.getContextPath()%>/MODULE-MAIN/css/main.css" />
<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery-1.11.1.min.js"></script>
<script src="${pageContext.request.contextPath}/MODULE-MAIN/js/module-main-dining-childrent.js"></script>
<script src="${pageContext.request.contextPath}/MODULE-MAIN/js/module-main-dining-item.js"></script>

<%-- <script type="text/javascript" src="<%=request.getContextPath()%>/MODULE-TOOL/js/add_web_editor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/MODULE-TOOL/js/edit_web_editor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/MODULE-TOOL/js/editor.js"></script> --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/MODULE-TOOL/js/bootstrap-select.js"></script>
</head>
<body>
<section class="home-section">
	<div class="container">
		<div class="row" >	
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="panel panel-default">
					<div class="panel-body">
						<div id="div-list-group" class="list-group text-left" style="height: 300px;overflow: auto;"></div>
					</div>
					<div class="panel-footer text-center">
						<button class="btn btn-primary btn-xs" type="button" onclick="dialogInsertSubject()">
							<i class="fa fa-plus-circle"></i> <s:property value="getText('button.add')"/>
						</button>
						<button class="btn btn-default btn-xs" type="button" onclick="dialogEditSubject()">
							<i class="fa fa-pencil-square-o"></i> <s:property value="getText('button.edit')"/>
						</button>
						<button class="btn btn-danger btn-xs" type="button" onclick="deleteSubject()">
							<i class="fa fa-trash"></i> <s:property value="getText('button.delete')"/>
						</button>
					</div>
				</div>
			</div>
			
			<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9" >
				<div id="media" class="tab-pane active" role="tabpanel">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 panel panel-default">
						<button class="btn btn-primary btn-xs" type="button" onclick="openAddDialog()" style="margin-top: 15px">
							<i class="fa fa-plus-circle"></i> <s:property value="getText('button.add')"/>
						</button>
						<table id="table-item" class="table text-left" style="width: 100%">
							<thead>
								<tr>
									<th width="10%"><s:property value="getText('item.no')"/></th>
									<th width="55%"><s:property value="getText('item.name')"/></th>
									<th width="15%"><s:property value="getText('item.image')"/></th>									
									<th width="10%"><s:property value="getText('item.status')"/></th>									
									<th width="10%"><s:property value="getText('item.action')"/></th>
								</tr>
							</thead>
							<tbody id="tbody-item">
							</tbody>
						</table>
					</div>
				</div>
			</div>	
		</div>
	</div>
</section>

<!-- Item Dialog -->
<div id="item-dialog" class="modal fade" role="dialog">
	<form id="item-upload-form"
		action="${pageContext.request.contextPath}/upload_file_main.elcom"
		method="post" enctype="multipart/form-data">
		<div class="modal-dialog" style="width: 600px;">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="item-title"></h5>
				</div>
				<div class="modal-body">
					<table class="tableLayout">
						<tr>
							<td colspan="4">
								<div class="input-group">
									<div id="item-container-error" class="alert alert-danger"
										style="display: none"></div>
								</div>
							</td>
						</tr>
						<tr>
							<td width="10%"><s:property value="getText('item.name')" /></td>
							<td width="40%"><input type="text" name="name"
								id="item-name" style="width: 100%"></td>
						</tr>
						<tr>

							<td width="10%"><s:property value="getText('item.status')" /></td>
							<td width="40%" id="status-td"></td>

						</tr>
						<tr>

							<td width="10%"><s:property value="getText('item.idx')" />
							<td width="40%"><input type="text" name="index"
								id="item-index" style="width: 100%"></td>

						</tr>
						<tr>
							<td><s:property value="getText('item.image')" /></td>
							<td><input type="file" name="file" id="item-file"
								style="width: 100%"
								onchange="previewFileImage_Rectangle('item-container-error', 'item-image', 'item-file', 'item-file-name', 1)">
								<span style="color:red;font-size: 12px;">Image with width &#8805; 220px, height &#8805; 110px</span>
								<input type="hidden" name="fileName" id="item-file-name">
							</td>

						</tr>
						<tr>
							<td></td>
							<td>
								<div id="div-item-image">
									<img id="item-image" alt="" src="">
								</div>
							</td>
						</tr>
						<tr class="process-upload">
							<td colspan="4">
								<div class="progress-style">
									<div class="progress-bar"></div>
									<div class="progress-percent">0%</div>
								</div>
							</td>
						</tr>
					</table>
					<input type="hidden" id="item-old-file-name" name="oldFileName">					
					<input type="hidden" id="item-status" name="status"> <input
						type="hidden" id="item-cropX" name="cropX"> <input
						type="hidden" id="item-cropY" name="cropY"> <input
						type="hidden" id="item-cropW" name="cropW"> <input
						type="hidden" id="item-cropH" name="cropH"> <input
						type="hidden" id="item-host" name="host"> <input
						type="hidden" id="item-port" name="port"> <input
						type="hidden" id="item-user" name="user"> <input
						type="hidden" id="item-pass" name="pass"> <input
						type="hidden" id="item-type" name="type"> <input
						type="hidden" id="item-path" name="mediaPath">
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-sm btn-primary btn-save"></button>
					<button type="button" class="btn btn-sm btn-danger"
						onclick="closeDialogItem()">
						<s:property value="getText('button.cancel')" />
					</button>
				</div>
			</div>
		</div>
	</form>
</div>



<!-- cho nay de hien thi form nhap du lieu chi tiet -->
	<div id="myModal" class="modal fade bd-example-modal-lg" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<form id="form_image" enctype="multipart/form-data" method="post">
					<input type="file" id="file_upload" name="file_upload"
						onchange="previewFile()" style="visibility: hidden;"> <input
						type="hidden" name="fileNameUpload" id="fileNameUpload">
				</form>
				<textarea id="txt_content" name="txt_content" class="form-control"
					rows="5"></textarea>
			</div>
			<div class="modal-footer">
				<button type="button" id="btn_send_data" onclick="get_content_form()" class="btn btn-default" data-dismiss="modal">Send and Close</button>
			</div>
		</div>
	</div>
<!-- cho nay de  ket thuc hien thi form nhap du lieu chi tiet -->

<!-- Delete Item Dialog -->
<div id="item-delete-dialog" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 400px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"><s:property value="getText('dining-delete-title')"/></h5>
			</div>
			<div class="modal-body">
				<s:property value="getText('dining-delete-title')"/> "<span style="color: red;" id="item-delete"></span>" ?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-danger" onclick="deleteItemSub()"><s:property value="getText('button.yes')"/></button>
				<button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><s:property value="getText('button.no')"/></button>
			</div>
		</div>
	</div>
</div>


<!-- Delete Item Dialog -->
<div id="delete-dialog-item" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 400px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"><s:property value="getText('dining-delete-title')"/></h5>
			</div>
			<div class="modal-body">
				<s:property value="getText('dining-delete-title')"/> "<span style="color: red;" id="item-delete-item"></span>" ?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-danger" onclick="deleteItem()"><s:property value="getText('button.yes')"/></button>
				<button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><s:property value="getText('button.no')"/></button>
			</div>
		</div>
	</div>
</div>

<!-- Item Dialog -->
<div id="item-dialog-dining" class="modal fade" role="dialog">
	<form id="item-upload-form-dining" action="${pageContext.request.contextPath}/upload_file_dining.elcom" 
		method="post" enctype="multipart/form-data">
		<div class="modal-dialog" style="width: 600px;">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="item-title-dining"></h5>
				</div>
				<div class="modal-body">
					<table class="tableLayout">
						<tr>
							<td colspan="6">
								<div class="input-group">
								  	<div id="item-container-error-dining" class="alert alert-danger" style="display: none"></div>
								</div>			
							</td>
						</tr>
						<tr>							
							<td width="10%"><s:property value="getText('item.name')"/></td>
							<td width="40%">
								<input type="text" name="name" id="item-name-dining" style="width: 100%">
							</td>
							
						</tr>				
						<tr>						
							<td width="10%"><s:property value="getText('item.description')"/></td>
							<td width="40%">
								<textarea name="def" id="item-def-dining" style="width: 100%; height: 150px"></textarea>
							</td>
							
						</tr>
					<tr>
							<td><s:property value="getText('item.price')"/></td>
							<td width="15%">
								<input type="text" name="price" class="item-numberic" id="item-price-dining" style="width: 100%">
							</td>
							
						</tr>
						<tr>
						<td width="10%"><s:property value="getText('item.iunit')"/></td>
							<td width="40%">
								<select id="item-iunit-dining" style="width: 100%">
									<option value="VND">VND</option>
									<option value="USD">USD</option>
								</select>
							</td>
						</tr>
						<tr>							
							<td width="10%"><s:property value="getText('item.idx')"/></td>
							<td width="40%">
								<input type="text" name="index" id="item-index-dining" style="width: 100%">
							</td>
							
						</tr>
						<tr>
							<td><s:property value="getText('item.status')"/></td>
							<td id="status-td-dining">
							</td>
										
						</tr>
						<tr>						
							<td><s:property value="getText('item.image')"/></td>
							<td>
								<input type="file" name="fileDining" id="item-file-dining" style="width: 100%" 
								onchange="previewFileImage('item-container-error', 'item-image-dining', 'item-file-dining', 'item-file-name-dining', 0)">
								<input type="hidden" name="fileNameDining" id="item-file-name-dining">
							</td>
						</tr>
						<tr>
							<td width="10%"></td>
							<td width="40%"><img id="item-image-dining" alt="" src="" style="max-width: 100%; max-height: 150px"></td>
							
						</tr>
						<tr class="process-upload">
							<td colspan="6">
								<div class="progress-style">
									<div class="progress-bar"></div>
									<div class="progress-percent">0%</div>
								</div>
							</td>
						</tr>
					</table>
					<input type="hidden" id="item-old-file-name-dining" name="oldFileNameDining">
					<input type="hidden" id="item-status-dining" name="status">					
					<input type="hidden" id="item-cropX" name="cropX">
					<input type="hidden" id="item-cropY" name="cropY">
					<input type="hidden" id="item-cropW" name="cropW">
					<input type="hidden" id="item-cropH" name="cropH">					
				</div>
				<div class="modal-footer">	
					<button type="submit" class="btn btn-sm btn-primary btn-save"><s:property value="getText('button.save')"/></button>
					<button type="button" class="btn btn-sm btn-danger" onclick="closeDialogItemDining()">
						<s:property value="getText('button.cancel')"/>
					</button>
				</div>
			</div>
		</div>
	</form>
</div>

</body>
</html>