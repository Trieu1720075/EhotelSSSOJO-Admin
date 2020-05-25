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
		var index = getValueField("item-index");
		var status = getValueField("item-status");
		var image = getValueField("item-file-name");	
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
					//createItem(response.fileName, response.mediaName);
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
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "getservice",
			langid : $langId,	
			parentid:$id_Main
		},
		success : function(response) {
			$("#container-item-myhotel").empty();
			$.each(response, function(i, item) {
				$("#container-item-myhotel").append(drawItem(item));				
				$("#isactive"+item.id).bootstrapToggle();
			});
			
			showFunctionByPermission();
		//	initContext();
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

/*
function openEditDialog($trigger) {

	openDialog("item-dialog");
	destroyCropImage("item-image");
	$(".process-upload").hide();
	//$("#container-ftp").hide();
	closeMessageCheck("item-container-error");
	$("#item-title").html(getValueField("mystay-edit-title"));
	setValueField("item-name", $($trigger).attr("data-name"));		
	setValueField("item-file", "");
	setValueField("item-file-name", $($trigger).attr("data-image"));
	setValueField("item-old-file-name", $($trigger).attr("data-image"));
	setValueImage("item-image", $path_image + $($trigger).attr("data-image"));
	setValueField("item-status", $($trigger).attr("data-status"));
	setValueField("item-index", $($trigger).attr("data-index"));	
	createStatus($($trigger).attr("data-status"));
	$(".btn-save").html(getValueField("btn-save"));
	$("#div-item-image").attr("style", "width:135px; height:200px");
	$("#item-image").attr("style", "width:135px; height:200px");
	$itemId = $($trigger).attr("data-id");
	$typeMode = 2;
}*/



function openEditDialog(id,image,name,invisibel,index) {
	//"'"+obj.id+"','"+obj.image+"','"+obj.name+"','"+obj.invisible+"','"+obj.index+"'";
//alert("vao toi opendialong ");
	openDialog("item-dialog");
	destroyCropImage("item-image");
	$(".process-upload").hide();
	//$("#container-ftp").hide();
	closeMessageCheck("item-container-error");
	$("#item-title").html(getValueField("mystay-edit-title"));
	setValueField("item-name", name);		
	setValueField("item-file", "");
	setValueField("item-file-name", image);
	setValueField("item-old-file-name",image);
	setValueImage("item-image", $path_image + image);
	setValueField("item-status", invisibel);
	setValueField("item-index",index);	
	createStatus(invisibel);
	$(".btn-save").html(getValueField("btn-save"));
	$("#div-item-image").attr("style", "width:135px; height:200px");
	$("#item-image").attr("style", "width:135px; height:200px");
	$itemId = id;
	$typeMode = 2;
}

/*function openDeleteDialog($trigger) {
	openDialog("item-delete-dialog");
	$("#item-delete").html($($trigger).attr("data-name"));
	$itemId = id;
	$itemName = $($trigger).attr("data-id");
}*/


function editItem(fileName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : 'editsystemservice',
			idservice: $itemId,
			name : getValueField("item-name"),
			image : fileName,
			langid : $langId,			
			invisible : getValueField("item-status"),
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
	if (status == 0) {
		button.className = "status-active";
	} else {
		button.className = "status-inactive";
	}
	return button;
}

function closeDialogItem() {
	closeDialog("item-dialog");
	//$("#media-player").empty();
}

function chooseFileFTP(obj) {
	var name = $(obj).attr("data-name");
	var path = $(obj).attr("data-path");
	setValueField("item-link", name);
	setValueField("item-path", path);
}

function initContext() {
    $.contextMenu({
        selector: '.container-item-mystay .thumbnail',
        build: function ($trigger, e) {
            return {
                callback: function (e, options) {
					if (e == 'update') {
						openEditDialog($trigger);
					} else if (e == 'delete') {
						openDeleteDialog();
					}
                },
                items: {
	    	      /*  "update": {
	    	            name: getValueField("btn-edit"),
	    	            icon: "update"
	    	        }*/
	    	      /*  "sep2": "---------",
	    	        "delete": {
	    	            name: getValueField("btn-delete"),
	    	            icon: "delete"
	    	        }*/
                }
            };
        }
    });
}

function drawItem(obj) {
	var date = new Date().getTime();
	var html="";
	for (var i = 0; i < $list_Main_HTML.length; i++) {
		if (obj.id == $list_Main_HTML[i]) {
			
			
			if(obj.invisible==1){
				html='<input id="isactive'+obj.id+'" name="isactive"  type="checkbox" data-toggle="toggle" data-size="mini" onchange="getChangestatus('+obj.id+')">'
			}else if(obj.invisible==0){
				html='<input id="isactive'+obj.id+'" name="isactive" checked="checked"  type="checkbox" data-toggle="toggle" data-size="mini" onchange="getChangestatus('+obj.id+')">'
			}
	
			var str="'"+obj.id+"','"+obj.image+"','"+obj.name+"','"+obj.invisible+"','"+obj.index+"'";
			var ui = '<div class="col-md-2 mng-info" style="text-align:center; padding: 0px;display: table-cell;margin-top:40px;">'
					+ '	<div class="thumbnail" data-image="'
					+ obj.image
					+ '" data-name="'
					+ unescape(obj.name)
					+ '" data-id="'
					+ obj.id
					+ '" data-status="'
					+ obj.invisible
					+ '" data-index="'
					+ obj.index
					+ '" onclick="">'					
					+ '      <div class="caption">'					
					+ '        	<h4>'
					+ unescape(obj.name)
					+ '</h4>'
					+ '      </div>'
					+'<a  href="' + getValueField("contextPath") + '/main/main-children.elcom?id=' + obj.id + '">'
					+ '      <img class="img-myhotel" src="'
					+ $path_image
					+ obj.image+ '?param=' + date+ '">'					
					+'</a>'					
					+'<div class="panel-footer text-center"  style="width: 100%; margin-top:10px;">'	
					+'<button type="button" class="btn btn-default btn-xs" onclick="openEditDialog('+str+')"  ><i class="fa fa-pencil-square-o" ></i></button>'						
					+html			
					+ '</div>'
					+ '</div>'
					+ '</div>'				
					
			return ui;
					
			
		}
	}
	
	for (var i = 0; i < $list_Main_Exchange.length; i++) {
		if (obj.id == $list_Main_Exchange[i]) {
			
			var str="'"+obj.id+"','"+obj.image+"','"+obj.name+"','"+obj.invisible+"','"+obj.index+"'";
			if(obj.invisible==1){
				html='<input id="isactive'+obj.id+'" name="isactive"  type="checkbox" data-toggle="toggle" data-size="mini" onchange="getChangestatus('+obj.id+')">'
			}else if(obj.invisible==0){
				html='<input id="isactive'+obj.id+'" name="isactive" checked="checked"  type="checkbox" data-toggle="toggle" data-size="mini" onchange="getChangestatus('+obj.id+')">'
			}
			
			var ui = '<div class="col-md-2 mng-currency" style="text-align:center; padding: 0px;display: table-cell;;margin-top:40px;">'
					+ '	<div class="thumbnail" data-image="'
					+ obj.image
					+ '" data-name="'
					+ unescape(obj.name)
					+ '" data-id="'
					+ obj.id
					+ '" data-status="'
					+ obj.invisible
					+ '" data-index="'
					+ obj.index
					+ '" onclick="">'
					+ '      <div class="caption">'
					+ '        	<h4>'
					+ unescape(obj.name)
					+ '</h4>'
					+ '      </div>'
					+'<a  href="' + getValueField("contextPath") + '/main/module-main-exchange.elcom?id=' + obj.id + '">'
					+ '      <img class="img-myhotel" src="'
					+ $path_image
					+ obj.image+ '?param=' + date
					+ '">'
					+'</a>'			
					+'<div class="panel-footer text-center"  style="width: 100%; margin-top:10px;">'	
					+'<button type="button" class="btn btn-default btn-xs" onclick="openEditDialog('+str+')" ><i class="fa fa-pencil-square-o" ></i></button>'		
					+html
					+ '</div>'
					+ '</div>'
					+ '</div>';
			return ui;
		}
	}
	
	for (var i = 0; i < $list_Main_Dining.length; i++) {
		if (obj.id == $list_Main_Dining[i]) {
			var str="'"+obj.id+"','"+obj.image+"','"+obj.name+"','"+obj.invisible+"','"+obj.index+"'";
			if(obj.invisible==1){
				html='<input id="isactive'+obj.id+'" name="isactive"  type="checkbox" data-toggle="toggle" data-size="mini" onchange="getChangestatus('+obj.id+')">'
			}else if(obj.invisible==0){
				html='<input id="isactive'+obj.id+'" name="isactive" checked="checked"  type="checkbox" data-toggle="toggle" data-size="mini" onchange="getChangestatus('+obj.id+')">'
			}
			
			var ui = '<div class="col-md-2 mng-dining" style="text-align:center; padding: 0px;display: table-cell;;margin-top:40px;">'
					+ '	<div class="thumbnail" data-image="'
					+ obj.image
					+ '" data-name="'
					+ unescape(obj.name)
					+ '" data-id="'
					+ obj.id
					+ '" data-status="'
					+ obj.invisible
					+ '" data-index="'
					+ obj.index
					+ '" onclick="">'
					+ '      <div class="caption">'
					+ '        	<h4>'
					+ unescape(obj.name)
					+ '</h4>'
					+ '      </div>'
					+'<a  href="' + getValueField("contextPath") + '/main/module-main-dining.elcom?id=' + obj.id + '">'
					+ '      <img class="img-myhotel" src="'
					+ $path_image
					+ obj.image+ '?param=' + date
					+ '">'
					+'</a>'			
					+'<div class="panel-footer text-center"  style="width: 100%; margin-top:10px;">'	
					+'<button type="button" class="btn btn-default btn-xs" onclick="openEditDialog('+str+')" ><i class="fa fa-pencil-square-o" ></i></button>'		
					+html
					+ '</div>'
					+ '</div>'
					+ '</div>';
			return ui;
		}
	}
	
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
				//showMessageSuccess(getValueField("edit-success"));
				getItem();
			}else {			
			
				showMessageError(getValueField("edit-fail"));
			}
		
		}
	});

}