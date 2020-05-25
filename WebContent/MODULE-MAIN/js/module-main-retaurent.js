var $subjectId="";
var $subjectName="";
var $subjectImage="";
var $subjectStatus="";
var $subjectIndex="";
var $id_Main="";
var $id_lever_one="";
var $path_file_html="";
/*var $listLanguage=[];*/
var $idItemRetaurent="0";

$(function(){
	$("#item-html").hide();	
	Load_Event_Click();
	$id_Main = getUrl_par('id');
	getChildren_level_1();
	$("#subject-upload-form").submit(function() {
		var name = $("#subject-name").val();
		var image = $("#subject-file-name").val();		
		var index = $("#subject-index").val();
	});
	var bar = $('.progress-bar');
	var percent = $('.progress-percent');
	
	$("#subject-upload-form").ajaxForm({
	    beforeSend: function() {
	    	var file =  document.getElementById("subject-file").files[0]; 
	    	if (file != null) {
	    		$(".process-upload").show();
	    	}
	        var percentVal = '0%';
	        bar.width(percentVal);
	        percent.html(percentVal);
	    },
	    uploadProgress: function(event, position, total, percentComplete) {
	        var percentVal = percentComplete + '%';
	        bar.width(percentVal);
	        percent.html(percentVal + " " + getValueField("item-uploading"));
	        if (percentComplete == 100) {
	        	percent.html(percentVal + " " + getValueField("item-saving"));
	        }
	    },
	    success: function(response) {
	        var percentVal = '100%';
	        bar.width(percentVal);
	        percent.html(percentVal + " " + getValueField("item-complete"));
	        
	        if (response.status == 'SUCCESS') {	        	
	        		if($tyle_insert_edit==1){
		        		editSubject(response.fileName);//	        		
		        	}else{
		        		addSubject(response.fileName);	        		
		        	}     
	        	}
	        	   	
	        else {
				closeDialog("subject-dialog");
				showMessageError(getValueField("item-upload-fail"));
			}
	    }
	});
	
});

function EditContentInfo(name_){
	var id=$("#id_item_file").val();	
	var status=$("#status_item_file").val();
	
	$.ajax({
		type : "POST",
		url : $pathWebService + "pmsinfo",
		cache : false,
		async : true,
		data : {
			action : 'editcontentinfo',		
			contentid: id,
			name: name_,
			invisible:status,
			langid: $langId,
		
		},		
        success: function(response){     
        	//showMessageSuccess(getValueField("edit-success"));
        	getcontent_html();        	
        },
        error: function(x,e){
          
        //	showMessageError("error occur");
        	showMessageError(getValueField("edit-fail"));
        } 
    });		
}

function getChildren_level_1(){	
	$.ajax({
		type : "GET",
		url : $pathWebService + "pmsinfo",
		cache : false,
		async : false,
		data : {
			action : 'getsubjectinfo',
			langid : $langId,	
			serviceid:$id_Main
		},
		success : function(response) {
			var listSubject = [];
			$('#div-list-group_2').empty();
			if(response.length>0){
				$.each(response, function(i, item) {
					var obj = {
						id : item.subjectId,
						name : unescape(item.subjectName),
						image : unescape(item.image),
						index : item.index,
						status : item.invisible,
						serviceId:item.serviceId
					};
					listSubject.push(obj);
					create_Item_Subject_HTML("div-list-group_2", "item-subject_html", obj, $path_image_background);
				});
				
				$subjectId = $('.item-selected').attr("data-id");
				$subjectName = $('.item-selected').attr("data-name");
				$subjectImage = $('.item-selected').attr("data-image");
				$subjectStatus = $('.item-selected').attr("data-status");
				$subjectIndex = $('.item-selected').attr("data-index");
				$(".panel-title").html($subjectName);				
				$id_lever_one=$('.item-subject_html:first').attr("data-id");	
				getcontent_html();
				$('.item-subject_html').click(function(e) {
					$("#item-html").hide();	
					//$tyle_service_subject=2;
					$('.item-subject_html').removeClass("item-selected");
					$(this).addClass("item-selected");
					$subjectId= $('.item-selected').attr("data-id");
					$subjectName= $('.item-selected').attr("data-name");
					$subjectImage= $('.item-selected').attr("data-image");
					$subjectStatus = $('.item-selected').attr("data-status");
					$subjectIndex= $('.item-selected').attr("data-index");
					$(".panel-title").html($subjectName);
					$id_lever_one=$('.item-selected').attr("data-id");				
					getcontent_html();
				});
			}
		}
	});
}

function createTableItem(data) {
	$listItem = [];
	$("#tbody-item").empty();
	var myBody = document.getElementById("tbody-item");
	$.each(data, function(i, item) {
		$listItem.push(item);
		var id = item.contentId;
		var subjectId = item.subjectId;
		var name = unescape(item.name);
		var description = unescape(item.description);		
		var image = item.image;
		var invisible = item.invisible;		
		
		var row = myBody.insertRow(myBody.rows.length);
		var col1 = row.insertCell(0);
		col1.innerHTML = i + 1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = name;
		
		var col3 = row.insertCell(2);
		col3.innerHTML = description;
		
		/*var col4 = row.insertCell(3);
		col4.appendChild(createItemImage($path_image + image));*/
		
		var col4 = row.insertCell(3);
		col4.appendChild(createItemInvisible_(id,name,invisible,$langId));		
	
	
		var col5 = row.insertCell(4);
		var btnEdit = createButton(1);
		var str = "'" + id + "','" + name + "', '" + description + "', '" + image + "', '" + invisible + "'";
		btnEdit.setAttribute("onclick", "Edit_html_Dialog(" + str + ")");
		var btnDelete = createButton(2);
		btnDelete.setAttribute("onclick", "deleteContentInfo('" + id + "','"+name+"')");
		col5.appendChild(btnEdit);
		col5.appendChild(btnDelete);
	});
}

function editSubject(fileName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "pmsinfo",
		cache : false,
		data : {
			action : 'editsubjectinfo',
			serviceId: $id_Main,
			subjectid : $id_lever_one,
			langid : $langId,			
			subjectname :getValueField("subject-name"),
			image : fileName,
			invisible : getValueField("subject-status"),
			index:getValueField("subject-index"),
			
		},
		success : function(response) {
		
			closeDialog("subject-dialog");
			if (response > 0) {			
				//showMessageSuccess(getValueField("edit-success"));
				getChildren_level_1();
			} else {
				showMessageError(getValueField("edit-fail"));
			}
		}
	});
}

function addSubject(fileName) {
//	alert(getValueField("subject-status"));
	$.ajax({
		type : "POST",
		url : $pathWebService + "pmsinfo",
		cache : false,
		data : {
			action : 'addsubjectinfo',
			serviceid : $id_Main,
			langid : $langId,			
			subjectname :getValueField("subject-name"),
			image : fileName,
			invisible : getValueField("subject-status"),
			index:getValueField("subject-index"),
		},
		success : function(response) {
			//alert(response);
			closeDialog("subject-dialog");
			if (response > 0) {
				getChildren_level_1();
				//showMessageSuccess(getValueField("add-success"));
			} else {
				showMessageError(getValueField("add-fail"));
			}
		}
	});
}


function deleteSubject(){	
	openDialog("item-delete-dialog");
	$("#item-delete").html( $subjectName);	
}

function deleteSubjectRetaurent(){
	$.ajax({
		type : "POST",
		url : $pathWebService + "pmsinfo",
		cache : false,
		data : {
			action : 'deletesubjectinfo',
			subjectid : $id_lever_one,
			serviceid: $id_Main,
			//langid : $langId,	
		},
		success : function(response) {
			if(response>0){
				//alert("Delete sucessful");
				//showMessageSuccess(getValueField("delete-success"));				
				closeDialog("item-delete-dialog");
				getChildren_level_1();
			}else{
				//alert("Delete Not sucessful");
				showMessageError(getValueField("delete-fail"));
			}
		}
	});
}

function getcontent_html(){
	$.ajax({
		type : "GET",
		url : $pathWebService + "pmsinfo",
		cache : false,
		async : true,
		data : {
			action : 'getcontentinfo',
			langid : $langId,	
			subjectid:$id_lever_one
		},
		success : function(response) {		
			resetDataTable("table-item");
			createTableItem(response);
			createDataTable("table-item");
		}
	});
}

function createItemInvisible_(id,name,status,langid) {
	var str = "'" + id + "','" + name+ "','" + status+ "','" + langid+"'";
	var button = document.createElement("button"); 
	button.setAttribute('type', 'button');
	button.setAttribute('onclick', 'changeStatusData('+str+')');
	if (status == 1) {
		button.className = "status-inactive";
	} else {
		button.className = "status-active";
	}
	return button;
}

function changeStatusData(id,name,status,langid){
	if(status=="1" || status==1){
		status=0;
	}else{
		status=1;
	}
	$.ajax({
		type : "POST",
		url : $pathWebService + "pmsinfo",
		cache : false,
		async : true,
		data : {
			action : 'editcontentinfo',		
			contentid: id,
			name:      name,
			invisible:status,
			langid:langid
		},		
        success: function(response){       	
        	//alert("response editcontentinfo: "+response);
        	getcontent_html();
        	$("#item-html").hide();	
        },
        error: function(x,e){
        	showMessageError("error occur");
        } 
    });	
}

function dialogInsertSubject(){
	$tyle_insert_edit=2;
	openDialog("subject-dialog");
	$(".process-upload").hide();
	$("#subject-title").html(getValueField("subject-create-title"));
	closeMessageCheck("subject-container-error");
	setValueField("subject-name", "");
	setValueField("subject-index", "1");
	setValueField("subject-file", "");
	setValueField("subject-file-name", "");
	setValueField("subject-old-file-name", "");
	setValueImage("subject-image", "");
	setValueField("subject-status", "0");
	createStatusSubject(0);
	$(".btn-save").html(getValueField("btn-save"));		

}

function Edit_html_Dialog(id,name,description,image,invisible){
	$("#cbb_change").hide();
	$("#btn_edit_file").show();	
	$("#btn_save_file").hide();
	$("#item-html").show();
	$("#file_name").val(name);
	$("#id_item_file").val(id);
	$("#link_item_file").val(description);
	$("#status_item_file").val(invisible);
	$path_file_html=description;
	Load_File_Data();
	$("html, body").animate({ scrollTop: 600 }, 600);
}

/*function getListLanguage(){
	$.ajax({
		type : "GET",
		url : $pathWebService + "pmslanguage",
		cache : false,
		async : true,
		data : {
			action : 'getlistlanguage',			
		},
		success : function(response) {		
			$.each(response, function(i, item) {
				var listlang = {
					id : item.idLang,
					name : unescape(item.name),
					code : unescape(item.code),
					invisible : item.invisible,					
					image:item.flagimage
				};
				$listLanguage.push(listlang);				
			});
			
		}
	});
}*/

function addContentfFiletoDatabase(name_){
	//var link='http://ehotel.elcom.tv:8080/html/'+file_name;
	var link=$path_link_html+file_name;
	$.ajax({
		type : "POST",
		url : $pathWebService + "pmsinfo",
		cache : false,
		async : true,
		data : {
			action : 'addcontentinfo',		
			subjectid: $id_lever_one,
			name:      name_,
			description:link,
			invisible:'0',
		},		
        success: function(response){       	
        	//alert("response addcontentinfo: "+response);
        	//showMessageSuccess("add-success");
        	getcontent_html();
        	$("#item-html").hide();	
        },
        error: function(x,e){
        	showMessageError("error occur");
        	//showMessageError(getValueField("add-fail"));
        } 
    });	
}

function deleteItemRetaurent(){
	$.ajax({
		type : "POST",
		url : $pathWebService + "pmsinfo",
		cache : false,
		async : true,
		data : {
			action : 'deletecontentinfo',		
			contentid: $idItemRetaurent,
		
		},		
        success: function(response){ 	
        	closeDialog("delete-dialog-item");
        	getcontent_html();
        	
        },
        error: function(x,e){
        	showMessageError("error occur");
        } 
    });
}

function deleteContentInfo(id,name){
	openDialog("delete-dialog-item");
	$idItemRetaurent=id;
	$("#item-delete-item").html( name);	
}

function New_html_Dialog(){
	$("#div-content").empty();
	$("#btn_save_file").show();	
	$("#btn_edit_file").hide();	
	$("#item-html").show();
	$("#file_name").val("");
	$("#id_item_file").val("");
	$("#cbb_change").show();
	$("html, body").animate({ scrollTop: 600 }, 600);
}

function dialogEditSubject(){	
	var date = new Date().getTime();	
	$tyle_insert_edit=1;
	if ($subjectId != 0) {
		openDialog("subject-dialog");
		$(".process-upload").hide();
		$("#subject-title").html(getValueField("subject-edit-title"));
		closeMessageCheck("subject-container-error");
		setValueField("subject-name", unescape($subjectName));
		setValueField("subject-index", $subjectIndex);
		setValueField("subject-file", "");
		setValueField("subject-file-name", "");
		setValueField("subject-old-file-name", $subjectImage);
		setValueImage("subject-image", $path_image_background + $subjectImage+ '?param=' + date);
		setValueField("subject-status", $subjectStatus);
		createStatusSubject($subjectStatus);
		$(".btn-save").html(getValueField("btn-save"));
		
	}
}

function createStatusSubject(status) {
	var statusItem = createItemInvisible(status);
	statusItem.setAttribute("onclick", "changeStatusSubject()");
	$("#status-subject-td").empty();
	document.getElementById("status-subject-td").appendChild(statusItem);
}
function changeStatusSubject() {
	if (getValueField("subject-status") == 1) {
		setValueField("subject-status", 0);
		createStatusSubject(0);
	} else if(getValueField("subject-status")==0){
		setValueField("subject-status", 1);
		createStatusSubject(1);
	}else{
		setValueField("subject-status", 0);
		createStatusSubject(0);
	}
}


function Load_Event_Click(){
	$("#txt_content").empty();			
	$("#content-paste").on("click",function(){			
		$(".Editor-editor").empty();	
		$(".Editor-editor").removeData();		
		$("#txt_content").Editor("setText",$("#content-paste").html());	
		openWindow("myModal");
				
	});	
	$('#myImg').click(function () {
		$("input[id='file_upload']").focus().click();		
	});

}

function getUrl_par(sParam){
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('?');
	for (var i = 0; i < sURLVariables.length; i++)
	{
	var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam)
		{
			 return sParameterName[1].split( '&' )[0];//.split( '&' )[0] là bỏ tham số ngon ngu

		}
	}
}