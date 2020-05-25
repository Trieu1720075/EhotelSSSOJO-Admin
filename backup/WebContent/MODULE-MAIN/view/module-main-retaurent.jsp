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
<script src="${pageContext.request.contextPath}/MODULE-MAIN/js/module-main-retaurent.js"></script>


<script type="text/javascript" src="<%=request.getContextPath()%>/MODULE-TOOL/js/add_web_editor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/MODULE-TOOL/js/edit_web_editor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/MODULE-TOOL/js/editor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/MODULE-TOOL/js/bootstrap-select.js"></script>
</head>
<body>
<section class="home-section">
	<div class="container">
		<div class="row" >
		<%-- 	<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" >
				<div class="panel panel-default">
					<div class="panel-body">
						<div id="div-list-group" class="list-group text-left" style="height: 300px;overflow: auto;"></div>
					</div>
					<div class="panel-footer text-center" ><!-- style="visibility: hidden;" -->
					<button class="btn btn-default btn-xs" type="button" onclick="dialogEditService()">
							<i class="fa fa-pencil-square-o"></i> <s:property value="getText('button.edit')"/>
						</button>
						<button class="btn btn-primary btn-xs" type="button" onclick="openNewSubjectDialog()">
							<i class="fa fa-plus-circle"></i> <s:property value="getText('button.add')"/>
						</button>
						<button class="btn btn-default btn-xs" type="button" onclick="dialogEditService()">
							<i class="fa fa-pencil-square-o"></i> <s:property value="getText('button.edit')"/>
						</button>
						<button class="btn btn-danger btn-xs" type="button" onclick="openDeleteSubjectDialog()">
							<i class="fa fa-trash"></i> <s:property value="getText('button.delete')"/>
						</button>
					</div>
				</div>
			</div> --%>
				<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
				<div class="panel panel-default">
					<div class="panel-body">
						<div id="div-list-group_2" class="list-group text-left" style="height: 300px;overflow: auto;"></div>
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
			
			<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9" style="height: 400px;overflow: auto;">
				<div id="media" class="tab-pane active" role="tabpanel">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 panel panel-default">
						<button class="btn btn-primary btn-xs" type="button" onclick="New_html_Dialog()" style="margin-top: 15px">
							<i class="fa fa-plus-circle"></i> <s:property value="getText('button.add')"/>
						</button>
						<table id="table-item" class="table text-left" style="width: 100%">
							<thead>
								<tr>
									<th width="5%"><s:property value="getText('item.no')"/></th>
									<th width="25%"><s:property value="getText('item.name')"/></th>
									<th width="40%"><s:property value="getText('item.link')"/></th>
									<%-- <th ><s:property value="getText('item.image')"/></th> --%>
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

	<!-- Subject Dialog -->
<div id="subject-dialog" class="modal fade" role="dialog">
	<form id="subject-upload-form" action="${pageContext.request.contextPath}/upload_file_action.elcom" 
		method="post" enctype="multipart/form-data">
		<div class="modal-dialog" style="width: 500px;">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="subject-title"></h5>
				</div>
				<div class="modal-body">
					<table class="tableLayout">
						<tr>
							<td colspan="2">
								<div class="input-group">
								  	<div id="subject-container-error" class="alert alert-danger" style="display: none"></div>
								</div>			
							</td>
						</tr>
						<tr>
							<td width="25%"><s:property value="getText('item.name')"/></td>
							<td width="75%">
								<input type="text" id="subject-name" style="width: 100%">
							</td>
						</tr>
						<tr>
							<td width="25%"><s:property value="getText('item.idx')"/></td>
							<td width="75%">
								<input type="text" id="subject-index" style="width: 100%">
							</td>
						</tr>
						<tr>
							<td><s:property value="getText('item.status')"/></td>
							<td id="status-subject-td">
							</td>
						</tr>
						<tr>
							<td><s:property value="getText('item.image')"/></td>
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
				</div>
				<div class="modal-footer">	
					<button type="submit" class="btn btn-sm btn-primary btn-save"></button>
					<button type="button" class="btn btn-sm btn-danger" data-dismiss="modal"><s:property value="getText('button.cancel')"/></button>
				</div>
			</div>
		</div>
	</form>
</div>


<%-- 	<section class="home-section"> --%>
	<div class="container" id="item-html">
		<div class="row" style="margin-top: 50px; height: 500px;">
			<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<div class="panel panel-default" >
		<div class="panel-heading">	
			<div class="text-right">							
		        <div id="id_template">		       
		        <input type="text" id="file_name" name="file_name" placeholder="Enter file name here" ></input>			        		      
		            <select name="size" id="cbb_change" >
		                <option value="temp0">Choose a template</option>
		                <option value="temp1">Template 1</option>
		                <option value="temp2">Template 2</option>	
		                <option value="temp3">Template 3</option>		
		                <option value="temp4">Template 4</option>	
		                <option value="temp5">Template 5</option>	
		                <option value="temp6">Template 6</option>		
		                <option value="temp7">Template 7</option>				              
		            </select>	        
		            <button type="button" id="btn_save_file" onclick="save_file()" class="btn btn-info btn-sm"><i class="fa fa-floppy-o"></i> Save file</button>
		            <button type="button" id="btn_edit_file" onclick="upload_file_html_edit()" class="btn btn-info btn-sm"><i class="fa fa-floppy-o"></i> Edit file</button>
		        </div>
			</div>
		</div>
		<div class="panel-body color_edit_editor" id="div_center" style="overflow: auto;height: 500px;" >
			
		</div>
	</div>
			</div>
		</div>
		<input type="hidden" id="id_item_file"></input>		
		<input type="hidden" id="status_item_file"></input>
	</div>
<%-- 	</section> --%>

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



</body>
</html>