<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!--
	@author: Tran Minh Dang(DangTM)
	@modify:	 25/12/2015
-->
<link href='${pageContext.request.contextPath}/MODULE-MAIN/css/main.css' rel='stylesheet'>

<section class="home-section">
	<div class="container">
		<div class="row">
			<div class="col-md-10 col-md-offset-1">
				<div class="panel panel-default">
					<div class="panel-heading text-right">
						<button type="button" class="btn btn-default btn-sm" onclick="location.href='${pageContext.request.contextPath}/main/main.elcom'">
							<i class="fa fa fa-reply"></i> <s:property value="getText('button.back')"/>
						</button>			
						<%-- <button type="button" class="btn btn-info btn-sm" onclick="openNewDialog()">
							<i class="fa fa-floppy-o"></i> <s:property value="getText('button.add')"/>
						</button> --%>
					</div>
					<div class="panel-body container-item-mystay" id="container-item-myhotel">
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
								onchange="previewFileImage('item-container-error', 'item-image', 'item-file', 'item-file-name', 1)">
								<span style="color:red; font-size: 12px;">Image with width &#8805; 135px, height &#8805; 200px</span>
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

<!-- Delete Item Dialog -->
<div id="item-delete-dialog" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 400px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"><s:property value="getText('mystay.delete.item.title')"/></h5>
			</div>
			<div class="modal-body">
				<s:property value="getText('mystay.delete.item.confirm')"/> "<span style="color: red;" id="item-delete"></span>" ?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-danger" onclick="deleteItem()"><s:property value="getText('button.yes')"/></button>
				<button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><s:property value="getText('button.no')"/></button>
			</div>
		</div>
	</div>
</div>

<div class="div-download" id="div-download" style="display: none;"></div>

<script src="${pageContext.request.contextPath}/MODULE-MAIN/js/mystay.js"></script>