<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/MODULE-ROOM/css/module-room.css" />
<script src="${pageContext.request.contextPath}/MODULE-ROOM/js/room.js"></script>
<script src="${pageContext.request.contextPath}/MODULE-ROOM/js/room_smartcard.js"></script>
<script src="${pageContext.request.contextPath}/MODULE-ROOM/js/list_smartcard.js"></script>
</head>
<body>

<section class="home-section">
	<div id="exTab2" class="container">
		<ul class="nav nav-tabs">
			<li class="active"><a href="#1" data-toggle="tab"><s:property value="getText('room.room')" /></a></li>
			 <li><a href="#2" data-toggle="tab"><s:property value="getText('room.smartcart')" /></a></li>
			<!-- <li><a href="#3" data-toggle="tab">Solution</a></li> -->
		</ul>
	<br>
		<div class="tab-content ">
			<div class="tab-pane active " id="1">
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

								<table id="table-item" class="table text-left">
									<thead>
										<tr>
											<th width="10%"><s:property value="getText('item.no')" /></th>
											<th width="20%"><s:property
													value="getText('room.smartcart')" /></th>
											<th width="30%"><s:property value="getText('room.ip')" /></th>

											<th width="10%"><s:property
													value="getText('item.action')" /></th>
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
			<div class="tab-pane" id="2">
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
						<table id="table-item-smartcard" class="table text-left">
							<thead>
								<tr>
									<th width="10%"><s:property value="getText('item.no')" /></th>
									<th width="10%"><s:property value="getText('room.room')" /></th>
									<th width="20%"><s:property value="getText('room.smartcart')" /></th>									
									<th width="30%"><s:property value="getText('room.ip')" /></th>
									
								</tr>
							</thead>
							<tbody id="tbody-item-smartcard">
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<!--<div class="tab-pane" id="3">
				<h3>add clearfix to tab-content (see the css)</h3>
			</div> -->
		</div>
	
	</div>
</section>


<!-- Delete Item Dialog -->
<div id="dialog-delete" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 400px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"><s:property value="getText('delete.title.smartcard')"/></h5>
			</div>
			<div class="modal-body">
				<s:property value="getText('delete.title.smartcard.confirm')"/> "<span style="color: red;" id="item-delete"></span>" ?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-danger" onclick="deleteSmartcard()"><s:property value="getText('button.yes')"/></button>
				<button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><s:property value="getText('button.no')"/></button>
			</div>
		</div>
	</div>
</div>

</body>
</html>