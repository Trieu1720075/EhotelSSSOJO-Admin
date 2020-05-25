<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/MODULE-USER/css/module-user.css" />
<script src="${pageContext.request.contextPath}/MODULE-USER/js/module-user.js"></script>
</head>
<body>

<section class="home-section">
	<div id="exTab2" class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<button class="btn btn-primary btn-sm" onclick="openDialogAddUser()"><i class="fa fa-plus-circle"></i> <s:property value="getText('user.add')"/></button>
				<table id="table-user" class="table text-left">
					<thead>
						<tr>
							<th width="10%"><s:property value="getText('item.no')" /></th>
							<th width="15%"><s:property value="getText('user.username')" /></th>
							<th width="15%"><s:property	value="getText('user.fullname')" /></th>
							<th width="40%"><s:property	value="getText('user.permission')" /></th>
							<th width="10%"><s:property	value="getText('item.action')" /></th>
						</tr>
					</thead>
					<tbody id="tbody-user">
					</tbody>
				</table>

			</div>
		</div>
	</div>
</section>

<div id="dialog-mng-user" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="item-user-title"><s:property value="getText('user.manage.title')" /></h5>
			</div>
			<div class="modal-body">
				<div id="item-container-error" class="alert alert-danger" style="display: none"></div>
				<div class="row">
					<div class="col-md-2">
						<label>Username</label>
					</div> 
					<div class="col-md-4">
						<input type="text" id="item-username" style="width: 100%;">
					</div>
					<div class="col-md-2">
						<label>Full name</label>
					</div>
					<div class="col-md-4">
						<input type="text" id="item-fullname" style="width: 100%;">
					</div>
				</div>
				<div class="row row-pass" style="display:none; margin-top:10px">
					<div class="col-md-2">
						<label>Password</label>
					</div> 
					<div class="col-md-4">
						<input type="password" id="item-pass" style="width: 100%;">
					</div>
				</div>
				<div style="margin-top: 15px;">
					<label>Grant Permission</label>
				</div>
				<div>
					<table id="table-permission" class="table table-bordered">
						<thead>
						<tr>
						</tr>
						</thead>
						<tbody id="tbody-permission">
	
						</tbody>
					</table>
				</div>
			</div>
			<div class="modal-footer">
				<button id="btn-user-save" type="button" class="btn btn-sm btn-primary"></button>
				<button type="button" class="btn btn-sm btn-danger" data-dismiss="modal"><s:property value="getText('button.cancel')"/></button>
			</div>
		</div>
	</div>
</div>

<!-- Delete Item Dialog -->
<div id="dialog-delete" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 400px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"><s:property value="getText('user.delete')"/></h5>
			</div>
			<div class="modal-body">
				<s:property value="getText('user.delete.confirm')"/> "<span style="color: red;" id="item-delete"></span>" ?
				<input type="hidden" id="item-user-id" />
			</div>
			<div class="modal-footer">
				<button id="btn-delete" type="button" class="btn btn-sm btn-danger" onclick="deleteUser()"><s:property value="getText('button.yes')"/></button>
				<button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><s:property value="getText('button.no')"/></button>
			</div>
		</div>
	</div>
</div>

</body>
</html>