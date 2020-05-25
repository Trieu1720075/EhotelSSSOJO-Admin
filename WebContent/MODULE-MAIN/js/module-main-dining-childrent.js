var $id_Main="";
var $subjectId = "";
var $subjectName= "";
var $subjectImage = "";
var $subjectStatus = "";
var $subjectIndex="";
var $id_lever_one="";
var $typeMode=0;

$(function(){
	$id_Main = getUrl_par('id');
	getItem();	
	$("#item-upload-form").submit(function() {
		var name = getValueField("item-name");		
		var image = getValueField("item-file-name");	
	
		if ($typeMode == 1 && !checkErrorItemCreateSubject(name, image)) {
			return false;
		} else if ($typeMode == 2 && !checkErrorItemEditSubject(name)) {
			return false;
		} else {
			return true;
		}
	});
	
	var bar = $('.progress-bar');
	var percent = $('.progress-percent');
	
	$("#item-upload-form").ajaxForm({
	    beforeSend: function() {
	    	var file =  document.getElementById("item-file").files[0]; 
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
	        	if ($typeMode == 1) {
					createItem(response.fileName);
				} else {
					editItem(response.fileName);
				}
			} else {
				closeDialog("item-dialog");
				showMessageError(getValueField("item-upload-fail"));
			}
	    }
	});
});

function checkErrorItemCreateSubject(name, image) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error", getValueField("name-is-null"));
		return false;
	} 
	if (checkRequiredField(image)) {
		showMessageCheck("item-container-error", getValueField("image-is-null"));
		return false;
	} 
	return true;
}

function checkErrorItemEditSubject(name) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error", getValueField("name-is-null"));
		return false;
	}
	return true;
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


function getItem() {
	$checkAjaxShow = true;
	$.ajax({
		type : "GET",
		url : $pathWebService + "pmsdining",
		cache : false,
		data : {
			action : "getsubjectdining",
			langid : $langId,	
			parentid:$id_Main
		},
		success : function(response) {
			var listSubject = [];
			$('#div-list-group').empty();
			if(response.length>0){
				$.each(response, function(i, item) {
					var obj = {
						id : item.id,
						name : unescape(item.name),
						image : unescape(item.image),
						index : item.index,
						status : item.active,
						menuno:item.menuno,
					};
					listSubject.push(obj);
					create_Item_Subject_Dining("div-list-group", "item-subject_html", obj, $path_image);
				});
				$('.item-subject_html:first').addClass("item-selected");
				$subjectId = $('.item-selected').attr("data-id");
				$subjectName= $('.item-selected').attr("data-name");
				$subjectImage = $('.item-selected').attr("data-image");
				$subjectStatus = $('.item-selected').attr("data-status");
				$subjectIndex= $('.item-selected').attr("data-index");
				$(".panel-title").html($subjectName);				
				$id_lever_one=$('.item-subject_html:first').attr("data-id");	
				Load_list_Item_Dining();
				$('.item-subject_html').click(function(e) {							
					$('.item-subject_html').removeClass("item-selected");
					$(this).addClass("item-selected");
					$subjectId= $('.item-selected').attr("data-id");
					$subjectName = $('.item-selected').attr("data-name");
					$subjectImage = $('.item-selected').attr("data-image");
					$subjectStatus = $('.item-selected').attr("data-status");
					$subjectIndex= $('.item-selected').attr("data-index");
					$(".panel-title").html($subjectName);
					$id_lever_one=$('.item-selected').attr("data-id");				
					Load_list_Item_Dining();
				});
			}
		}
	});
}

function dialogEditSubject(){
	var date = new Date().getTime();	
	$typeMode=2;
	if ($subjectId != 0) {
		openDialog("item-dialog");
		$(".process-upload").hide();
		//$("#item-title").html(getValueField("subject-edit-title"));		
		destroyCropImage("item-image");
		$(".process-upload").hide();		
		closeMessageCheck("item-container-error");
		$("#item-title").html(getValueField("dining-edit-title"));
		setValueField("item-name",$subjectName);		
		setValueField("item-file", "");
		setValueField("item-file-name","");
		setValueField("item-old-file-name",$subjectImage);
		setValueImage("item-image", $path_image+ $subjectImage+ '?param=' + date);
		setValueField("item-status", $subjectStatus);
		
		setValueField("item-index",$subjectIndex);	
		createStatusSubject($subjectStatus);
		$(".btn-save").html(getValueField("btn-save"));
		$("#div-item-image").attr("style", "width:220px; height:110px");
		$("#item-image").attr("style", "width:220px; height:110px");		
		$typeMode = 2;
	}
}

function dialogInsertSubject(){
	$typeMode=1;
		openDialog("item-dialog");
		$(".process-upload").hide();
		$("#item-title").html(getValueField("dining-add-title"));
		closeMessageCheck("item-container-error");
		setValueField("item-name", "");
		setValueField("item-index", "1");
		setValueField("item-file", "");
		setValueField("item-file-name", "");
		setValueField("item-old-file-name", "");
		setValueImage("item-image", "");
		setValueField("item-status", "1");
		createStatusSubject(1);
		$("#div-item-image").attr("style", "width:0px; height:0px");
		$("#item-image").attr("style", "width:0px; height:0px");		
		$(".btn-save").html(getValueField("btn-save"));		
	
}

function createStatusSubject(status) {
	var statusItem = createItemInvisible_Dining(status);
	statusItem.setAttribute("onclick", "changeStatusSubject()");
	$("#status-td").empty();
	document.getElementById("status-td").appendChild(statusItem);
}
function changeStatusSubject() {
	if (getValueField("item-status") == 1) {
		setValueField("item-status", 0);
		createStatusSubject(0);
	} else if(getValueField("item-status")==0){
		setValueField("item-status", 1);
		createStatusSubject(1);
	}else{
		setValueField("item-status", 0);
		createStatusSubject(0);
	}
}

function createStatusDining(status) {
	var statusItem = createItemInvisible_Dining(status);
	statusItem.setAttribute("onclick", "changeStatusDining()");
	$("#status-td-dining").empty();
	document.getElementById("status-td-dining").appendChild(statusItem);
}
function changeStatusDining() {
	if (getValueField("item-status-dining") == 1) {
		setValueField("item-status-dining", 0);
		createStatusDining(0);
	} else if(getValueField("item-status-dining")==0){
		setValueField("item-status-dining", 1);
		createStatusDining(1);
	}else{
		setValueField("item-status-dining", 0);
		createStatusDining(0);
	}
}


function createItemInvisible_Dining(status) {
	var button = document.createElement("button"); 
	button.setAttribute('type', 'button');
	if (status == 0) {
		button.className = "status-inactive";
	} else {
		button.className = "status-active";
	}
	return button;
}

function createItem(fileName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "pmsdining",
		cache : false,
		data : {
			action : 'addsubjectdining',
			parentid: $id_Main,
			name : getValueField("item-name"),
			image : fileName,
			/*langid : $langId,			*/
			active : getValueField("item-status"),
			index:getValueField("item-index"),
			
		},
		success : function(response) {	
			closeDialogItem();
			if (response > 0) {			
				//showMessageSuccess(getValueField("edit-success"));
				getItem();
			} else {
				showMessageError(getValueField("edit-fail"));
			}
		}
	});
}

function editItem(fileName) {

	$.ajax({
		type : "POST",
		url : $pathWebService + "pmsdining",
		cache : false,
		data : {
			action : 'editsubjectdining',
			subjectid: $id_lever_one,
			name : getValueField("item-name"),
			image : fileName,
			langid : $langId,			
			active : getValueField("item-status"),
			index:getValueField("item-index"),
			
		},
		success : function(response) {	
			closeDialogItem();
			if (response > 0) {			
				//showMessageSuccess(getValueField("edit-success"));
				getItem();
			} else {
				showMessageError(getValueField("edit-fail"));
			}
		}
	});
}
function deleteItemSub() {
	$.ajax({
		type : "POST",
		url : $pathWebService + "pmsdining",
		cache : false,
		data : {
			action : 'deletesubjectdining',
			subjectid : $id_lever_one,
		},
		success : function(response) {
			closeDialog("item-delete-dialog");
			if (response > 0) {
				getItem();
				//showMessageSuccess(getValueField("delete-success"));
			}else {
				showMessageError(getValueField("delete-fail"));
			}
		}
	});
}

function closeDialogItem(){
	closeDialog("item-dialog");
}


function deleteSubject(){	
	openDialog("item-delete-dialog");
	$("#item-delete").html( $subjectName);	
}


