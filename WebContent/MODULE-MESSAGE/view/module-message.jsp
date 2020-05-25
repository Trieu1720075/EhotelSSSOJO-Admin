<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!--
	@author: Tran Minh Dang(DangTM)
	@modify:	 25/12/2015
-->
<section class="home-section">
	<div class="container">
		<div class="row">
			<div class="col-xs-5 col-sm-5 col-md-5 col-lg-5">
				<div
					class="col-xs-12 col-sm-12 col-md-12 col-lg-12 panel panel-default">
					<table id="table-room" class="table text-left">
						<thead>
							<tr>
								<th width="10%"><s:property value="getText('item.no')" /></th>
								<th width="45%"><s:property
										value="getText('message.item.room')" /></th>
								<th width="45%"><s:property
										value="getText('message.item.type')" /></th>
							</tr>
						</thead>
						<tbody id="tbody-room">
						</tbody>
					</table>
				</div>
			</div>
			<div class="col-xs-7 col-sm-7 col-md-7 col-lg-7">
				<div id="media" class="tab-pane active" role="tabpanel">
					<div
						class="col-xs-12 col-sm-12 col-md-12 col-lg-12 panel panel-default">
						<button class="btn btn-primary btn-xs" type="button"
							onclick="openNewDialog()" style="margin-top: 15px">
							<i class="fa fa-plus-circle"></i>
							<s:property value="getText('button.add')" />
						</button>
						<table id="table-item" class="table text-left">
							<thead>
								<tr>
									<th width="10%"><s:property value="getText('item.no')" /></th>
									<th width="20%"><s:property
											value="getText('message.item.sender')" /></th>
									<th width="30%"><s:property
											value="getText('message.item.title')" /></th>
									<th width="30%"><s:property
											value="getText('message.item.createdate')" /></th>
									<th width="10%"><s:property value="getText('item.action')" /></th>
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

<!-- Edit and add message Dialog -->
 <div id="item-edit-dialog" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 1000px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"><s:property value="getText('message.item.subtitle')"/></h5>
			</div>
			<div class="modal-body">
				<table class="tableLayout">					
					<tr>							
						<td width="12%" style="font-size: 18px;"><s:property value="getText('message.item.sender')" />&nbsp;&nbsp;*</td>
						<td width="88%"><input style="width: 850px;" id="item-sender" placeholder="---input sender---"></input</td>					
					</tr>
					<tr>
						<td width="12%" style="font-size: 18px;"><s:property value="getText('message.item.title')"/>&nbsp;&nbsp;*</td>
						<td width="88%" ><input style="width: 850px;" id="item-title" placeholder="---input title---"></input</td>
										
					</tr>					
					<tr>
						<td width="12%" style="font-size: 18px;"><s:property value="getText('message.item.content')" /></td>
						<td width="88%" ><textarea style="width: 600px;height: 500px;background-color: #b3b3b3" id="item-content"></textarea></td>					
					</tr>
				</table>
			</div>			
			<div class="modal-footer">				
			<button type="button" id="item-save-message" onclick="addNewMessage();" class="btn btn-sm btn-default"><s:property value="getText('button.save')"/></button>
				<button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><s:property value="getText('button.close')"/></button>
			</div>
		</div>
	</div>
</div>

<!-- Delete Item Dialog -->
<div id="item-delete-dialog" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 400px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"><s:property value="getText('delete.message')"/></h5>
			</div>
			<div class="modal-body">
				<s:property value="getText('delete.message')"/> "<span style="color: red;" id="item-delete"></span>" ?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-danger" onclick="deleteItem()"><s:property value="getText('button.yes')"/></button>
				<button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><s:property value="getText('button.no')"/></button>
			</div>
		</div>
	</div>
</div>


<link rel="stylesheet"
	href="<%=request.getContextPath()%>/MODULE-MESSAGE/css/module-message.css" />
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/MODULE-TOOL/css/editor.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/MODULE-TOOL/js/editor.js"></script>
<script
	src="${pageContext.request.contextPath}/MODULE-MESSAGE/js/room.js"></script>
<script
	src="${pageContext.request.contextPath}/MODULE-MESSAGE/js/listMessageInRoom.js"></script>