var $id_Main="";
var $itemId = 0;
var $itemName = "";
var $listItem = [];
var $listItemIn = [];
var $listItemOut = [];
var $status = 1;
var $listFTP = [];

$(function() {
	$id_Main = getUrl_par('id');
	getItem();	
	$("#item-upload-form").submit(function() {
		var name = getValueField("item-name");
		
		var image = getValueField("item-file-name");	
		
		if ($typeMode == 1 && !checkErrorItemCreate(name, image)) {
			return false;
		} else if ($typeMode == 2 && !checkErrorItemEdit(name)) {
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


function getItem() {
	$checkAjaxShow = true;
	$.ajax({
		type : "GET",
		url : $pathWebService + "pmsdining",
		cache : false,
		data : {
			action : "getsubjectdining",
			langid : $langId,	
			parentid:-9012
		},
		success : function(response) {
			$("#container-item-myhotel").empty();
			$.each(response, function(i, item) {
				$("#container-item-myhotel").append(drawItem(item));
			});
			//initContext();
		}
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

function openNewDialog() {
	openDialog("item-dialog");	
	destroyCropImage("item-image");
	$(".process-upload").hide();		
	closeMessageCheck("item-container-error");
	$("#item-title").html(getValueField("dining-add-title"));
	setValueField("item-name", "");	
	setValueField("item-file", "");
	setValueField("item-file-name", "");
	setValueField("item-old-file-name", "");
	setValueImage("item-image", "");
	setValueField("item-status", 1);	
	setValueField("item-index", 0);	
	createStatus(1);
	$(".btn-save").html(getValueField("btn-create"));
	$("#div-item-image").attr("style", "width:150px; height:150px");
	$("#item-image").attr("style", "width:150px; height:150px");
	$typeMode = 1;
}


/*function openEditDialog($trigger) {
	openDialog("item-dialog");
	destroyCropImage("item-image");
	$(".process-upload").hide();
	//$("#container-ftp").hide();
	closeMessageCheck("item-container-error");
	$("#item-title").html(getValueField("dining-edit-title"));
	setValueField("item-name", $($trigger).attr("data-name"));		
	setValueField("item-file", "");
	setValueField("item-file-name", $($trigger).attr("data-image"));
	setValueField("item-old-file-name", $($trigger).attr("data-image"));
	setValueImage("item-image", $path_image + $($trigger).attr("data-image"));
	setValueField("item-status", $($trigger).attr("data-status"));
	
	setValueField("item-index", $($trigger).attr("data-index"));	
	createStatus($($trigger).attr("data-status"));
	$(".btn-save").html(getValueField("btn-save"));
	$("#div-item-image").attr("style", "width:150px; height:150px");
	$("#item-image").attr("style", "width:150px; height:150px");
	$itemId = $($trigger).attr("data-id");
	$typeMode = 2;
}*/

/*function openDeleteDialog($trigger) {
	openDialog("item-delete-dialog");
	$("#item-delete").html($($trigger).attr("data-name"));	
	$itemId = $($trigger).attr("data-id");
}*/
//"'"+obj.id+"','"+obj.image+"','"+obj.name+"','"+obj.active+"','"+obj.index+"'";
function openEditDialog(id,image,name,active,index) {
	openDialog("item-dialog");
	destroyCropImage("item-image");
	$(".process-upload").hide();
	//$("#container-ftp").hide();
	closeMessageCheck("item-container-error");
	$("#item-title").html(getValueField("dining-edit-title"));
	setValueField("item-name", name);		
	setValueField("item-file", "");
	setValueField("item-file-name",image);
	setValueField("item-old-file-name", image);
	setValueImage("item-image", $path_image + image);
	setValueField("item-status", active);
	
	setValueField("item-index", index);	
	createStatus(active);
	$(".btn-save").html(getValueField("btn-save"));
	$("#div-item-image").attr("style", "width:150px; height:150px");
	$("#item-image").attr("style", "width:150px; height:150px");
	$itemId = id;
	$typeMode = 2;
}

function openDeleteDialog(id,name) {
	openDialog("item-delete-dialog");
	$("#item-delete").html(name);	
	$itemId = id;
}


function createItem(fileName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "pmsdining",
		cache : false,
		data : {
			action : 'addsubjectdining',
			parentid: -9012,
			name : getValueField("item-name"),
			image : fileName,
			/*langid : $langId,			*/
			active : getValueField("item-status"),
			index:getValueField("item-index"),
			
		},
		success : function(response) {	
			closeDialogItem();
			if (response > 0) {			
				getItem();
			} else {
				showMessageError(getValueField("create-fail"));
			}
		},
		error : function () {
			closeDialogItem();
			showMessageError(getValueField("create-fail"));
			console.log("Error HTTP 500");
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
			subjectid: $itemId,
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
		},
		error : function () {
			closeDialogItem();
			showMessageError(getValueField("edit-fail"));
			console.log("Error HTTP 500");
		}
	});
}
function deleteItem() {
	$.ajax({
		type : "POST",
		url : $pathWebService + "pmsdining",
		cache : false,
		data : {
			action : 'deletesubjectdining',
			subjectid : $itemId
		},
		success : function(response) {
			closeDialog("item-delete-dialog");
			if (response > 0) {
				getItem();
				//showMessageSuccess(getValueField("delete-success"));
			}else {
				showMessageError(getValueField("delete-fail"));
			}
		},
		error : function () {
			closeDialog("item-delete-dialog");
			showMessageError(getValueField("delete-fail"));
			console.log("Error HTTP 500");
		}
	});
}

function checkErrorItemCreate(name,  image) {
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

function checkErrorItemEdit(name) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error", getValueField("name-is-null"));
		return false;
	}
	return true;
}

function changeStatus() {
	if (getValueField("item-status") == 1) {
		setValueField("item-status", 0);
		createStatus(0);
	} else if(getValueField("item-status") == 0) {
		setValueField("item-status", 1);
		createStatus(1);
	}
}

function createStatus(status) {
	var statusItem = createItemStatusMyStay(status);
	statusItem.setAttribute("onclick", "changeStatus()");
	$("#status-td").empty();
	document.getElementById("status-td").appendChild(statusItem);
}

function createItemStatusMyStay(status) {
	var button = document.createElement("button"); 
	button.setAttribute('type', 'button');
	if (status == 1) {
		button.className = "status-active";
	} else {
		button.className = "status-inactive";
	}
	return button;
}

function closeDialogItem() {
	closeDialog("item-dialog");
}

/*
function chooseFileFTP(obj) {
	var name = $(obj).attr("data-name");
	var path = $(obj).attr("data-path");
	setValueField("item-link", name);
	setValueField("item-path", path);
}
*/
function initContext() {
    $.contextMenu({
        selector: '.container-item-myhotel .thumbnail',
        build: function ($trigger, e) {
            return {
                callback: function (e, options) {
					if (e == 'update') {
						openEditDialog($trigger);
					} else if (e == 'delete') {
						openDeleteDialog($trigger);
					}
                },
                items: {
	    	        "update": {
	    	            name: getValueField("btn-edit"),
	    	            icon: "update"
	    	        },	    	      
	    	        "delete": {
	    	            name: getValueField("btn-delete"),
	    	            icon: "delete"
	    	        }
                }
            };
        }
    });
}

function drawItem(obj) {
	var date = new Date().getTime();
	var str="'"+obj.id+"','"+obj.image+"','"+obj.name+"','"+obj.active+"','"+obj.index+"'";
	var str_del = "'" + obj.id + "','" + obj.name +"'";
			var ui = '<div class="col-md-2" style="text-align:center; padding: 0px;display: table-cell;">'
					+ '	<div class="thumbnail" data-image="'
					+ obj.image
					+ '" data-name="'
					+ unescape(obj.name)
					+ '" data-id="'
					+ obj.id
					+ '" data-status="'
					+ obj.active
					+ '" data-index="'
					+ obj.index
					+ '" onclick="">'
					+ '      <div class="caption">'
					+ '        	<h4>'
					+ unescape(obj.name)
					+ '</h4>'
					+ '      </div>'
					+'<a  href="' + getValueField("contextPath") + '/main/module-main-dining-childrent.elcom?id=' + obj.id + '">'
					+ '      <img class="img-myhotel" src="'
					+ $path_image
					+ obj.image+ '?param=' + date
					+ '">'
					+'</a>'		
					+'<div class="panel-footer text-center"  style="width: 100%; margin-top:10px;">'	
					+'<button type="button" class="btn btn-default btn-xs" onclick="openEditDialog('+str+')"  ><i class="fa fa-pencil-square-o" ></i></button>'						
					+'<button type="button" class="btn btn btn-danger btn-xs" onclick="openDeleteDialog('+ str_del +')"  ><i class="fa fa fa-trash-o" ></i></button>'								
					+ '</div>'
					+ '</div>'
					+ '</div>';
			return ui;		
}