<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!--
	@author: Tran Minh Dang(DangTM)
	@modify:	 25/12/2015
-->
<section class="home-section">
	<div class="container">
		<div class="row">
			<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="panel panel-default">
					<div class="panel-body">
						<div id="div-list-group" class="list-group text-left"></div>
					</div>
					<div class="panel-footer text-center">
						<button class="btn btn-primary btn-xs" type="button" onclick="openNewSubjectDialog()">
							<i class="fa fa-plus-circle"></i> <s:property value="getText('button.add')"/>
						</button>
						<button class="btn btn-default btn-xs" type="button" onclick="openEditSubjectDialog()">
							<i class="fa fa-pencil-square-o"></i> <s:property value="getText('button.edit')"/>
						</button>
						<button class="btn btn-danger btn-xs" type="button" onclick="openDeleteSubjectDialog()">
							<i class="fa fa-trash"></i> <s:property value="getText('button.delete')"/>
						</button>
					</div>
				</div>
			</div>
			
			<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
				<div id="media" class="tab-pane active" role="tabpanel">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 panel panel-default">
						<button class="btn btn-primary btn-xs" type="button" onclick="openNewDialog()" style="margin-top: 15px">
							<i class="fa fa-plus-circle"></i> <s:property value="getText('button.add')"/>
						</button>
						<table id="table-item" class="table text-left">
							<thead>
								<tr>
									<th width="10%"><s:property value="getText('item.no')"/></th>
									<th width="25%"><s:property value="getText('item.name')"/></th>
									<th width="25%"><s:property value="getText('item.address')"/></th>
									<th width="10%"><s:property value="getText('item.image')"/></th>
									<th width="10%"><s:property value="getText('item.status')"/></th>
									<th width="10%"><s:property value="getText('item.idx')"/></th>
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
	<div class="container">
		<!--edit group-->
		<div class="panel panel-default div-container" style="margin-top: 20px; display: none;">
			<form id="subject-upload-form" action="${pageContext.request.contextPath}/upload-file.elcom" 
				method="post" enctype="multipart/form-data">
				<div class="panel-heading text-right">
					<button type="submit" class="btn btn-info btn-sm">
						<i class="fa fa-floppy-o"></i> <s:property value="getText('button.save')"/>
					</button>
					<button type="button" class="btn btn-default btn-sm" onclick="closeLayout()">
						<i class="fa fa-times"></i> <s:property value="getText('button.close')"/>
					</button>
				</div>
				<div class="panel-body">
					<div class="col-md-4">
						<table class="tableLayout">
							<tr>
								<td width="25%"><s:property value="getText('item.name')"/> : </td>
								<td width="75%">
									<input type="text" id="subject-name" style="width: 100%">
								</td>
							</tr>
							<tr>
								<td><s:property value="getText('item.image')"/> : </td>
								<td>
									<input type="file" name="file" id="subject-file" style="width: 100%" 
									onchange="previewFileImage('subject-container-error', 'subject-image', 'subject-file', 'subject-file-name', 0)">
									<input type="hidden" name="fileName" id="subject-file-name">
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<img id="subject-image" alt="" src="" style="max-width: 100%; max-height: 150px">
								</td>
							</tr>
							<tr class="process-upload">
								<td></td>
								<td>
									<div class="progress-style">
										<div class="progress-bar"></div>
										<div class="progress-percent">0%</div>
									</div>
								</td>
							</tr>
							<tr>
								<td colspan="2">
									<div class="input-group">
									  	<div id="subject-container-error" class="alert alert-danger" style="display: none"></div>
									</div>			
								</td>
							</tr>
						</table>
						<input type="hidden" id="subject-old-file-name" name="oldFileName">
						<input type="hidden" name="type" value="1">
					</div>
					<div class="col-md-4">
						<div class="panel panel-default">
							<div class="panel-heading text-center panel-title"></div>
							<div class="panel-body" style="max-height: 300px; overflow: auto;">
								<table class="table text-left">
									<thead>
										<tr>
											<th width="10%"><s:property value="getText('item.no')"/></th>
											<th width="55%"><s:property value="getText('item.name')"/></th>
											<th width="20%"><s:property value="getText('item.image')"/></th>
											<th width="15%"><s:property value="getText('item.remove')"/></th>
										</tr>
									</thead>
									<tbody id="tbody-item-in"></tbody>
								</table>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="panel panel-default">
							<div class="panel-heading text-center">Live TV</div>
							<div class="panel-body" style="max-height: 300px; overflow: auto;">
								<table class="table text-left">
									<thead>
										<tr>
											<th width="10%"><s:property value="getText('item.no')"/></th>
											<th width="55%"><s:property value="getText('item.name')"/></th>
											<th width="20%"><s:property value="getText('item.image')"/></th>
											<th width="15%"><s:property value="getText('item.add')"/></th>
										</tr>
									</thead>
									<tbody id="tbody-item-out"></tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</section>

<!-- Delete Subject Dialog -->
<div id="subject-delete-dialog" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 400px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"><s:property value="getText('subject.delete.title')"/></h5>
			</div>
			<div class="modal-body">
				<s:property value="getText('subject.delete.confirm')"/> "<span style="color: red;" id="subject-content-delete"></span>" ?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-danger" onclick="deleteSubject()"><s:property value="getText('button.yes')"/></button>
				<button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><s:property value="getText('button.no')"/></button>
			</div>
		</div>
	</div>
</div>

<!-- Item Dialog -->
<div id="item-dialog" class="modal fade" role="dialog">
	<form id="item-upload-form" action="${pageContext.request.contextPath}/upload-file-crop.elcom" 
		method="post" enctype="multipart/form-data">
		<div class="modal-dialog" style="width: 500px;">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="item-title"></h5>
				</div>
				<div class="modal-body">
					<table class="tableLayout">
						<tr>
							<td colspan="2">
								<div class="input-group">
								  	<div id="item-container-error" class="alert alert-danger" style="display: none"></div>
								</div>			
							</td>
						</tr>
						<tr>
							<td><s:property value="getText('item.name')"/> : </td>
							<td>
								<input type="text" name="name" id="item-name" style="width: 100%">
							</td>
						</tr>
						<tr>
							<td><s:property value="getText('item.address')"/> : </td>
							<td>
								<input type="text" name="address" id="item-address" style="width: 100%">
							</td>
						</tr>
						<tr>
							<td width="25%"><s:property value="getText('item.status')"/> : </td>
							<td width="75%" id="status-td">
							</td>
						</tr>
						<tr>
							<td width="25%"><s:property value="getText('item.idx')"/> : </td>
							<td width="75%">
								<input type="text" id="item-idx" name="idx" class="item-numberic">
							</td>
						</tr>
						<tr>
							<td><s:property value="getText('item.image')"/> : </td>
							<td>
								<input type="file" name="file" id="item-file" style="width: 100%" 
								onchange="previewFileImage('item-container-error', 'item-image', 'item-file', 'item-file-name', 1)">
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
							<td></td>
							<td>
								<div class="progress-style">
									<div class="progress-bar"></div>
									<div class="progress-percent">0%</div>
								</div>
							</td>
						</tr>
					</table>
					<input type="hidden" id="item-old-file-name" name="oldFileName">
					<input type="hidden" id="item-status">
					<input type="hidden" id="item-cropX" name="cropX">
					<input type="hidden" id="item-cropY" name="cropY">
					<input type="hidden" id="item-cropW" name="cropW">
					<input type="hidden" id="item-cropH" name="cropH">
				</div>
				<div class="modal-footer">	
					<button type="submit" class="btn btn-sm btn-primary btn-save"></button>
					<button type="button" class="btn btn-sm btn-danger" data-dismiss="modal"><s:property value="getText('button.cancel')"/></button>
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
				<h5 class="modal-title"><s:property value="getText('livetv.delete.item.title')"/></h5>
			</div>
			<div class="modal-body">
				<s:property value="getText('livetv.delete.item.confirm')"/> "<span style="color: red;" id="item-delete"></span>" ?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-danger" onclick="deleteItem()"><s:property value="getText('button.yes')"/></button>
				<button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><s:property value="getText('button.no')"/></button>
			</div>
		</div>
	</div>
</div>

<script src="${pageContext.request.contextPath}/MODULE-LIVETV/js/subject.js"></script>
<script src="${pageContext.request.contextPath}/MODULE-LIVETV/js/item.js"></script>