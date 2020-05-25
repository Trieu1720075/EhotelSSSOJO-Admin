var $name_image;
$(function(){
	Load_List_Main();	
});

function opendialogadd(){
	openWindow("form_dialog");
}

function closedialogadd(){
	closeWindow("form_dialog");
}

function closedialogedit(){
	closeWindow("form_dialog_update");
}
function Load_List_Main(){		
	 $.ajax({
		 type : "GET",
			url : $pathWebService + "system",
			cache : false,
			async : true,
			data : {			
				action : 'getservice',
				langid : $langId,
				parentid: "-1"
			},
			success : function(response) {
				$("#listmain").empty();			
				var html="";				
				$.each(response, function(i, item) {	
					var name_=item.name;
					var str = "'" + item.id+"','"+item.name+"','"+item.index+"','"+item.image + "'";
					/*if (item.id == 24) {
						html += '<a  href="' + getValueField("contextPath") + '/main/main-children.elcom?id=' + item.id + '">';
					}*/
					html+='<div class="col-md-3" style="margin-bottom: 10px;">';
					html+='<div class="thumbnail text-center margin_thumnail_main" style="height: 150px;width: 150px;" data-id="'+item.id+'">';
					if (item.id == 24) {
						html += '<a  href="' + getValueField("contextPath") + '/main/mystay.elcom?id=' + item.id + '">';
					} else if (item.id == 25) {
						html += '<a href="' + getValueField("contextPath") + '/main/main-retaurent.elcom?id=' + item.id + '">';
					} else if (item.id == 23) {
						html += '<a href="' + getValueField("contextPath") + '/main/myhotel.elcom">';
					} else if(item.id==16){
						html+='<a  href="' + getValueField("contextPath") + '/main/main-message.elcom?id='+item.id+'">';	
					}else if(item.id==4){
						html+='<a  href="' + getValueField("contextPath") + '/movies/movies.elcom">';	
					}else if(item.id==3){
						html+='<a  href="' + getValueField("contextPath") + '/music/music.elcom">';	
					}else if(item.id==2){
						html+='<a  href="' + getValueField("contextPath") + '/livetv/livetv.elcom">';	
					}
					html+='<div style="font-size:60px">';					
					html+='<img alt=""  src="'+$path_image+item.image+'"';
					html+='style="height: 140px; width: 100%;">';
					html+='</div>';					
					html+='</a>';
					html+='</div>';
					html+='<div class="caption text-center" style="padding: 0px;width: 150px;white-space: nowrap;margin-top:5px;">';
					html+='<p style="margin-bottom:0px"><b>'+name_+'</b></p>';
					html+='</div>';
					html+='<div class="panel-footer text-center"  style="width: 150px;">';		
					html+='<button type="button" class="btn btn-default btn-xs"  onclick="EditMain('+str+')";><i class="fa fa-pencil-square-o" ></i></button>';
					//html+='<button type="button" class="btn btn-danger btn-xs" onclick="DeleteMain('+item.id+')"><i class="fa fa-trash-o"></i></button>';
					if(item.invisible==1){
						html+='<input id="isactive'+item.id+'" name="isactive"  type="checkbox" data-toggle="toggle" data-size="mini" onchange="getChangestatus('+item.id+')">';
					}else if(item.invisible==0){
						html+='<input id="isactive'+item.id+'" name="isactive" checked="checked"  type="checkbox" data-toggle="toggle" data-size="mini" onchange="getChangestatus('+item.id+')">';
					}
					
					
					html+='</div>';
					html+='</div>';										
					html+='</div>';	
					
				});					
		
				$("#listmain").append(html);				
				$.each(response, function(i, item) {
					$("#isactive"+item.id).bootstrapToggle();
				});
			}
		});
}



function getChangestatus(id) {		
	var isChecked = document.getElementById('isactive'+id).checked;
	var the_value = isChecked ? 1 : 0;	  
	$.ajax({
		type : "POST",
		url : $pathWebService+"system",		
		cache : false,
		data : {			
			action: "updateinviservice",					
			idservice:	id	,
			//value:the_value
		},
		success : function(response) {			
			if(response>0){
				//alert("Edit successful");		
				showMessageSuccess(getValueField("edit-success"));
				Load_List_Main();
			}else {				
			//	alert("Edit not successful");
				showMessageError(getValueField("edit-fail"));
			}
		
		}
	});

}

function EditMain(id,noidung,idx,url_image){	
	openWindow("form_dialog_update");
	$("#id_main_update").val(id);
	$("#txt_noidung_update").val(noidung);	
	$("#txt_index_update").val(idx);	
	$("#name_image_old").val(url_image);
	$('#img_lag_update').attr('src',$path_image+url_image);		
	
}



function DeleteMain(id){
	if (confirm("Are you sure?")) {
	$.ajax({
		type : "POST",
		url : $pathWebService+"pmslanguage",		
		cache : false,
		data : {			
			action: "deletemain",					
			id:	id			
		},
		success : function(response) {
			if(response>0){
			//	alert("delete successful");		
				showMessageSuccess(getValueField("delete-success"));
				Load_List_Main();
			}else {				
			//	alert("delete not successful");
				showMessageError(getValueField("delete-fail"));
			}
		
		}
	});
	}
	 return false;
}

function AddMain(){
	var d = new Date();
	var image_name = time_format(d);
	var txt_noidung=$("#txt_noidung").val();	
	var file_lag =  document.getElementById("file_lag").files[0];	
	if(txt_noidung==null || txt_noidung==""){
		//alert("Please input content");
		showMessageError("Please input content");
		return false;
	}
	if(document.getElementById("file_lag").files.length == 0){
		alert("Please choose file");
		return false;
	}	
	var oData = new FormData(document.forms.namedItem("id_form_dialog"));	
	 oData.append("image_name", image_name);
	 oData.append("txt_noidung", txt_noidung);
	 oData.append("file_image", file_lag);
	 $.ajax({
			type : "POST",
			url : 'main/save_main.elcom',
			cache : false,
			data : oData,
			processData: false,  // tell jQuery not to process the data
	        contentType: false ,
			success : function(response) {
				var fileName =response.fileName;
				if(fileName!=null){
					$name_image=fileName;
					addMainDataBase($name_image);
				}
				
			}
		});
}

function addMainDataBase(name){
	var txt_noidung=$("#txt_noidung").val();	
	
	$.ajax({
		type : "POST",
		url : $pathWebService+"pmslanguage",		
		cache : false,
		data : {			
			action: "addmain",
			content:txt_noidung,			
			imagename:	name
		
		},
		success : function(response) {
			if(response>0){
			//	alert("Add image successful");
				showMessageSuccess(getValueField("create-success"));	
				closeWindow("form_dialog");
			}else if(response=-2){
				showMessageError(getValueField("create-fail"));
				//alert("Add image exits");
			}else if(response=-1){				
			//	alert("Add image not successful");
				showMessageError(getValueField("create-fail"));
			}
		
		}
	});
}

function editMainDataBase(name){
	//var name_image_old=$("#name_image_old").val();	

	var txt_noidung=$("#txt_noidung_update").val();	
	var id=$("#id_main_update").val();	
	var txt_index_update=$("#txt_index_update").val();
	$.ajax({
		type : "POST",
		url : $pathWebService+"system",		
		cache : false,
		data : {			
			action: "editsystemservice",
			idservice:id,
			name:txt_noidung,			
			image:	name,
			index:txt_index_update,
			langid:$langId,
			invisible:0
		},
		success : function(response) {
			if(response>0){
				//alert("edit successful");
				showMessageSuccess(getValueField("edit-success"));
				Load_List_Main();
				closeWindow("form_dialog_update");
			}else {				
				//alert("edit not successful");
				showMessageError(getValueField("edit-fail"));
			}
		
		}
	});
}


function EditMain_(){
	var path =getValueField("contextPath");
	var d = new Date();
	//$("#file_lag_update").val("");
	$("#name_lag_update").val("");
	var image_name = time_format(d);
	var txt_noidung=$("#txt_noidung_update").val();
	var name_image_old=$("#name_image_old").val();
	//var file_lag =  document.getElementById("file_lag_update").files[0];	
	var file_lag = document.getElementById("file_lag_update").files[0];
	if(txt_noidung==null || txt_noidung==""){		
		showMessageError("Please input content");
		return false;
	}
	var form = document.getElementById("id_form_dialog_update");
	var oData = new FormData(form);
	//var oData = new FormData($('#id_form_dialog_update')[0]);
	if(document.getElementById("file_lag_update").files.length != 0){
			//(document.forms.namedItem("id_form_dialog_update")
		 oData.append("image_name", image_name);
		 oData.append("txt_noidung", txt_noidung);
		 oData.append("file_image", file_lag);
		 $.ajax({
				type : "POST",
				url : path+'/main/save_main.elcom',				
				data : oData,
				processData: false,  // tell jQuery not to process the data
		        contentType: false ,
				success : function(response) {
					var fileName =response.fileName;
					if(fileName!=null){
						$name_image=fileName;
						editMainDataBase($name_image);
					}
					
				}
			});
	}else{
		editMainDataBase(name_image_old);
	}	
	
}


//open window
function openWindow(id) {
	//$('#' + id).window('open');
	$("#" + id).modal("show");
}

// close window
function closeWindow(id) {
	//$('#' + id).window('close');
	 $("#" + id).modal("hide");
}


function time_format(d) {
	day =format_two_digits(d.getDay()+1);
    hours = format_two_digits(d.getHours());
    minutes = format_two_digits(d.getMinutes());
    seconds = format_two_digits(d.getSeconds());
    return day+hours +minutes + seconds;
}

function format_two_digits(n) {
    return n < 10 ? '0' + n : n;
}
//upload a image file 
function previewFile(idImage, idFile, idFileName) {
	var image = document.getElementById(idImage);
    var file =  document.getElementById(idFile).files[0]; 
    var fileName = document.getElementById(idFileName);	
    var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = function() {
		if (checkFileImgage(file)) {
			image.src = reader.result;
			fileName.value = file.name;			
		} else {
			image.src = "";
			fileName.value = "";
			document.getElementById(idFile).value="";
			alert("Please choose image");			
		}
	};
}

// check file upload must be image file
function checkFileImgage(file) {
	var fileName = file.name;
	var extension = fileName.substr((fileName.lastIndexOf('.') + 1));
	if (extension == 'jpg' || extension == 'jpeg' || extension == 'gif'
			|| extension == 'png' || extension == 'bmp') {
		return true;
	} else {
		return false;
	}
}