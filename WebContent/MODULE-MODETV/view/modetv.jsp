<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!--
	@author: elcomprime.com.vn
	@modify:	 25/12/2015
-->
<link href='${pageContext.request.contextPath}/MODULE-MAIN/css/main.css' rel='stylesheet'>
<section class="home-section">
	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-md-12 col-lg-12">
				<ul class="nav nav-tabs">
					<li class="active"><a href="#list-modetv" data-toggle="tab"><s:property value="getText('modetv.mode')" /></a></li>
				</ul>
				<div class="tab-content ">
					<div class="tab-pane active" id="channel-livetv" style="margin-bottom:15px">
						<div class="col-xs-12 col-sm-12 col-md-9 col-lg-12">
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
												<th width="25%"><s:property value="getText('item.video')"/></th>
												<th width="10%"><s:property value="getText('item.image')"/></th>
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
								<td colspan="2">
									<div class="input-group">
									  	<div id="subject-container-error" class="alert alert-danger" style="display: none"></div>
									</div>			
								</td>
							</tr>
							<tr>
								<td width="25%"><s:property value="getText('item.name')"/> : </td>
								<td width="75%">
									<input type="text" id="subject-name" style="width: 100%">
								</td>
							</tr>
							<tr>
								<td><s:property value="getText('item.status')"/></td>
								<td id="status-subject-td">
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
						</table>
						<input type="hidden" id="subject-old-file-name" name="oldFileName">
						<input type="hidden" id="subject-status" name="status">
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
	<form id="item-upload-form" action="${pageContext.request.contextPath}/upload-file.elcom" 
		method="post" enctype="multipart/form-data">
		<div class="modal-dialog" style="width: 500px;">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="item-title">Edit Mode</h5>
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
							<td><s:property value="getText('item.video')"/> : </td>
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
							<td><s:property value="getText('item.image')"/> : </td>
							<td>
								<input type="file" name="file" id="item-file" style="width: 100%" 
								onchange="previewFileImage('item-container-error', 'item-image', 'item-file', 'item-file-name',0)">
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
					<input type="hidden" name="type" value="1">
					<!--
					<input type="hidden" id="item-cropX" name="cropX">
					<input type="hidden" id="item-cropY" name="cropY">
					<input type="hidden" id="item-cropW" name="cropW">
					<input type="hidden" id="item-cropH" name="cropH">
					-->
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
				<h5 class="modal-title"><s:property value="getText('modetv.delete.item.title')"/></h5>
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

<!--MyHotel Item Dialog -->
<div id="myhotel-item-dialog" class="modal fade" role="dialog">
	<form id="myhotel-item-upload-form" action="${pageContext.request.contextPath}/upload-file-myhotel.elcom" 
		method="post" enctype="multipart/form-data">
		<div class="modal-dialog" style="width: 1000px;">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="myhotel-item-title"></h5>
				</div>
				<div class="modal-body">
					<table class="tableLayout">
						<tr>
							<td colspan="4">
								<div class="input-group">
								  	<div id="myhotel-item-container-error" class="alert alert-danger" style="display: none"></div>
								</div>			
							</td>
						</tr>
						<tr>
							<td width="10%"><s:property value="getText('item.name')"/></td>
							<td width="40%">
								<input type="text" name="name" id="myhotel-item-name" style="width: 100%">
							</td>
							<td width="10%"><s:property value="getText('item.status')"/></td>
							<td width="40%" id="myhotel-status-td"></td>
						</tr>		
						<tr>
							<td><s:property value="getText('item.link')"/></td>
							<td>
								<input type="text" name="mediaName" id="myhotel-item-link" style="width: 100%" readonly="readonly">
							</td>
							<td><s:property value="getText('item.image')"/></td>
							<td>
								<input type="file" name="file" id="myhotel-item-file" style="width: 100%" 
								onchange="previewMyhotelFileImage('myhotel-item-container-error', 'myhotel-item-image', 'myhotel-item-file', 'myhotel-item-file-name', 1)">
								<span style="color:red;font-size: 12px;">Image with width &#8805; 135px, height &#8805; 200px</span>
								<input type="hidden" name="fileName" id="myhotel-item-file-name">
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<div id="container-ftp" class="container-ftp"></div>
								<div id="media-player" class="media-player"></div>
							</td>
							<td></td>
							<td>
								<div id="myhotel-div-item-image">
									<img id="myhotel-item-image" alt="" src="">
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
					<input type="hidden" id="myhotel-item-old-file-name" name="oldFileName">
					<input type="hidden" id="myhotel-item-status" name="status">

					<input type="hidden" id="item-cropX" name="cropX">
					<input type="hidden" id="item-cropY" name="cropY">
					<input type="hidden" id="item-cropW" name="cropW">
					<input type="hidden" id="item-cropH" name="cropH">

					<input type="hidden" id="item-host" name="host">
					<input type="hidden" id="item-port" name="port">
					<input type="hidden" id="item-user" name="user">
					<input type="hidden" id="item-pass" name="pass">
					<input type="hidden" id="item-type" name="type">
					<input type="hidden" id="myhotel-item-path" name="mediaPath">
				</div>
				<div class="modal-footer">	
					<button type="submit" class="btn btn-sm btn-primary btn-save"></button>
					<button type="button" class="btn btn-sm btn-danger" onclick="closeDialogItem()">
						<s:property value="getText('button.cancel')"/>
					</button>
				</div>
			</div>
		</div>
	</form>
</div>

<!-- MyHotel delete item dialog -->
<div id="myhotel-item-delete-dialog" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 400px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"><s:property value="getText('hotel.delete.item.title')"/></h5>
			</div>
			<div class="modal-body">
				<s:property value="getText('hotel.delete.item.confirm')"/> "<span style="color: red;" id="myhotel-item-delete"></span>" ?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-danger" onclick="deleteMyhotelItem()"><s:property value="getText('button.yes')"/></button>
				<button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><s:property value="getText('button.no')"/></button>
			</div>
		</div>
	</div>
</div>



<script src="${pageContext.request.contextPath}/MODULE-MODETV/js/subject.js"></script>
<script src="${pageContext.request.contextPath}/MODULE-MODETV/js/item.js"></script>
<script src="${pageContext.request.contextPath}/MODULE-MODETV/js/myhotel.js"></script>
