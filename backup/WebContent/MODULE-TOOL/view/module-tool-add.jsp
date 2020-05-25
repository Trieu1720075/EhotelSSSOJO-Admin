<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>

<link rel="stylesheet" href="<%=request.getContextPath()%>/MODULE-TOOL/css/editor.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/MODULE-TOOL/js/add_web_editor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/MODULE-TOOL/js/editor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/MODULE-TOOL/js/bootstrap-select.js"></script>

<style type="text/css">

.icon-add{
	background:url('STYLE-INF/images/icons/ic_copy.png') no-repeat center center;
}
</style>

</head>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>

<body bgcolor="#000000">
<div class="col-md-10 col-md-offset-1" style="margin-top: 100px" >
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
		        </div>
			</div>
		</div>
		<div class="panel-body" id="div_center" style="overflow: auto;height: 500px;" >
			
		</div>
	</div>
	
</div>	
	

<div class="col-md-10 col-md-offset-1" id="id_form">	
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

</body>
</html>