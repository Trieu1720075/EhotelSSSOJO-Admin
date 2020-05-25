<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<meta charset="utf-8">
<title>Insert title here</title>
<%-- <link rel="stylesheet" href="<%=request.getContextPath()%>/MODULE-TOOL/css/editor.css" /> --%>
<link rel="stylesheet" href="<%=request.getContextPath()%>/MODULE-MAIN/css/main.css" />
<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery-1.11.1.min.js"></script>
<script src="${pageContext.request.contextPath}/MODULE-MAIN/js/module-main-promotion.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/MODULE-TOOL/js/bootstrap-select.js"></script>
</head>
<body>
<section class="home-section">
	<div class="container">
		<div class="row" >				
			<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-md-offset-1" style="height: 500px;overflow: auto;">
				<div id="exchange_rate" class="tab-pane active" role="tabpanel">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 panel panel-default">
						<button class="btn btn-primary btn-xs" type="button" onclick="openNewDialog()" style="margin-top: 15px">
							<i class="fa fa-plus-circle"></i> <s:property value="getText('button.add')"/>
						</button>					
						<table id="table-item" class="table text-left" style="width: 100%">
							<thead>
								<tr>
									<th width="10%"><s:property value="getText('item.no')"/></th>
									<th width="10%"><s:property value="getText('item.name')"/></th>
									<th width="20%"><s:property value="getText('item.link')"/></th>		
									<th width="20%"><s:property value="getText('item.link')"/></th>									
									<th width="20%"><s:property value="getText('item.status')"/></th>									
									<th width="5%"><s:property value="getText('item.action')"/></th>
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

<!-- item Dialog -->
<div id="item-dialog" class="modal fade" role="dialog">
	<form id="item-upload-form" action="${pageContext.request.contextPath}/upload_file_promotion.elcom" 
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
							<td colspan="2">
								<div class="input-group">
								  	<div id="item-container-error" class="alert alert-danger" style="display: none"></div>
								</div>			
							</td>
						</tr>
						<tr>
							<td width="25%"><s:property value="getText('item.name')"/></td>
							<td width="75%">
								<input type="text" id="item-name" style="width: 100%">
							</td>
						</tr>
						<tr>
							<td width="25%"><s:property value="getText('item.content')"/></td>
							<td width="75%">
								<input type="text" id="item-content" style="width: 100%">
							</td>
						</tr>
						<tr>
							<td width="25%"><s:property value="getText('item.status')"/></td>
							<td width="75%" id="status-td">
								
							</td>
						</tr>									
						<tr>
							<td><s:property value="getText('exchange.image')"/></td>
							<td>
								<input type="file" name="file" id="item-file" style="width: 100%" 
								onchange="previewFileImage('item-container-error', 'item-image', 'item-file', 'item-file-name', 0)">
								<input type="hidden" name="fileName" id="item-file-name">
							</td>
						</tr>			
						<tr>
							<td width="25%"></td>
							<td width="75%"><img id="item-image" alt="" src="" style="max-width: 100%; max-height: 150px"></td>
							
						</tr>
							<tr>
								<td width="25%">background</td>
								<td width="75%">
									<div class="panel-body color_edit_editor" id="div_center" style="overflow: auto; height: 300px;">
										<div class="col-xs-12 col-md-12 div-content" id="div-content" style="padding: 0px !important;">
											<img src="../images/no-image.png" id="myImg" width="100%" style="padding: 5px 5px 5px 5px;">
										</div>
									</div>
								</td>
							</tr>
							<tr class="process-upload" style="display: none">
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
				</div>
				<div class="modal-footer">	
					<button type="submit" class="btn btn-sm btn-primary btn-save"><s:property value="getText('button.save')"/></button>
					<button type="button" class="btn btn-sm btn-danger" data-dismiss="modal"><s:property value="getText('button.cancel')"/></button>
				</div>
			</div>
		</div>
	</form>
</div>




</body>
</html>