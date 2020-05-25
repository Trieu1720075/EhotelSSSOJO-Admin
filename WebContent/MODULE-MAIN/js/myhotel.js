var $itemId = 0;
var $itemName = "";
var $listItem = [];
var $listItemIn = [];
var $listItemOut = [];
var $status = 1;
var $listFTP = [];

$(function() {
	getItem();
	
	$("#item-upload-form").submit(function() {
		var name = getValueField("item-name");
		var link = getValueField("item-link");
		var image = getValueField("item-file-name");
		if ($typeMode == 1 && !checkErrorItemCreate(name, link, image)) {
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
					createItem(response.fileName, response.mediaName);
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
		url : $pathWebService + "livetv",
		cache : false,
		data : {
			action : "getlistadvertise",
			type : 1,
		},
		success : function(response) {
			$("#container-item-myhotel").empty();
			$.each(response, function(i, item) {
				$("#container-item-myhotel").append(drawItem(item));
			});
			initContext();
		}
	});
}

function getConfig() {
	$checkAjaxShow = true;
	$.ajax({
		type : "GET",
		url : $pathWebService + "configftp",
		cache : false,
		data : {
			action : "getconfig"
		},
		success : function(response) {
			var item = response;
			setValueField("item-host", item.host);
			setValueField("item-port", item.port);
			setValueField("item-user", item.user);
			setValueField("item-pass", item.pass);
			getListFile();
		}
	});
}

function getListFile() {
	$.ajax({
		type : "GET",
		url : $pathWebService + "configftp",
		cache : false,
		timeout:3000,
		data : {
			action : "getlistfile",
			type : 'video'
		},
		success : function(response) {
			$("#container-ftp").empty();
			if (response.length == 0) {
				$("#container-ftp").append(getValueField("message-file-empty"));
			}
			$.each(response, function(i, item) {
				var temp = '<div class="item-ftp" data-path="' + item.path + '" data-name="' + item.filename 
					+ '" onclick="chooseFileFTP(this)"><img src="../MODULE-COMMON/images/icons/ic_file.gif" height="16px" width="16px"><span>' 
					+ item.filename + '</span></div>';
				$("#container-ftp").append(temp);
			});
		},
		error : function () {
			$("#container-ftp").empty();
			$("#container-ftp").append(getValueField("message-file-empty"));
		}
	});
}

function openNewDialog() {
	openDialog("item-dialog");
	getConfig();
	destroyCropImage("item-image");
	$(".process-upload").hide();
	$("#container-ftp").show();
	$("#media-player").hide();
	closeMessageCheck("item-container-error");
	$("#item-title").html(getValueField("hotel-create-title"));
	setValueField("item-name", "");
	setValueField("item-link", "");
	setValueField("item-file", "");
	setValueField("item-file-name", "");
	setValueField("item-old-file-name", "");
	setValueImage("item-image", "");
	setValueField("item-status", 1);
	setValueField("item-type", 1);
	createStatus(1);
	$(".btn-save").html(getValueField("btn-create"));
	$("#div-item-image").attr("style", "width:0px; height:0px");
	$("#item-image").attr("style", "");
	$typeMode = 1;
}

function openEditDialog($trigger) {
	openDialog("item-dialog");
	destroyCropImage("item-image");
	$(".process-upload").hide();
	$("#container-ftp").hide();
	$("#media-player").show();
	closeMessageCheck("item-container-error");
	$("#item-title").html(getValueField("hotel-edit-title"));
	setValueField("item-name", $($trigger).attr("data-name"));
	setValueField("item-link", $($trigger).attr("data-url"));
	setValueField("item-file", "");
	setValueField("item-file-name", "");
	setValueField("item-old-file-name", $($trigger).attr("data-image"));
	setValueImage("item-image", $pathLiveTV + $($trigger).attr("data-image"));
	setValueField("item-status", $($trigger).attr("data-status"));
	setValueField("item-type", 2);
	setValueMedia("media-player", $($trigger).attr("data-status"), 2);
	createStatus($($trigger).attr("data-status"));
	$(".btn-save").html(getValueField("btn-save"));
	$("#div-item-image").attr("style", "width:135px; height:200px");
	$("#item-image").attr("style", "width:135px; height:200px");
	$itemId = $($trigger).attr("data-id");
	$typeMode = 2;
}

function openDeleteDialog($trigger) {
	openDialog("item-delete-dialog");
	$("#item-delete").html($($trigger).attr("data-name"));
	$itemId = $($trigger).attr("data-id");
	$itemName = $($trigger).attr("data-name");
}

function createItem(fileName, mediaName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "livetv",
		cache : false,
		data : {
			action : 'addchanneladvertise',
			name : getValueField("item-name"),
			image : fileName,
			filename : mediaName,
			status : getValueField("item-status"),
			type : 1,
		},
		success : function(response) {
			closeDialog("item-dialog");
			if (response > 0) {
				getItem();
				//showMessageSuccess(getValueField("hotel-create-success"));
			} else {
				showMessageError(getValueField("hotel-create-fail"));
			}
		}
	});
}

function editItem(fileName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "livetv",
		cache : false,
		data : {
			action : 'editchanneladvertise',
			channelid : $itemId,
			name : getValueField("item-name"),
			image : fileName,
			status : getValueField("item-status"),
			type : 1,
		},
		success : function(response) {
			closeDialogItem();
			if (response > 0) {
				getItem();
				//showMessageSuccess(getValueField("hotel-edit-success"));
			} else {
				showMessageError(getValueField("hotel-edit-fail"));
			}
		}
	});
}

function deleteItem() {
	$.ajax({
		type : "POST",
		url : $pathWebService + "livetv",
		cache : false,
		data : {
			action : 'deletechanneladvertise',
			channelid : $itemId,
			type : 1,
		},
		success : function(response) {
			closeDialog("item-delete-dialog");
			if (response > 0) {
				getItem();
				//showMessageSuccess(getValueField("hotel-delete-success"));
			} else if (response == -2) {
				showMessageError(getValueField("hotel-delete-duplicate"));
			} else {
				showMessageError(getValueField("hotel-delete-fail"));
			}
		}
	});
}

function checkErrorItemCreate(name, link, image) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error", getValueField("message-hotel-name"));
		return false;
	} 
	if (checkRequiredField(link)) {
		showMessageCheck("item-container-error", getValueField("message-hotel-link"));
		return false;
	} 
	if (checkRequiredField(image)) {
		showMessageCheck("item-container-error", getValueField("message-image"));
		return false;
	}
	return true;
}

function checkErrorItemEdit(name) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error", getValueField("message-hotel-name"));
		return false;
	}
	return true;
}

function changeStatus() {
	if (getValueField("item-status") == 1) {
		setValueField("item-status", 0);
		createStatus(0);
	} else {
		setValueField("item-status", 1);
		createStatus(1);
	}
}

function createStatus(status) {
	var statusItem = createItemStatus(status);
	statusItem.setAttribute("onclick", "changeStatus()");
	$("#status-td").empty();
	document.getElementById("status-td").appendChild(statusItem);
}

function closeDialogItem() {
	closeDialog("item-dialog");
	$("#media-player").empty();
}

function chooseFileFTP(obj) {
	var name = $(obj).attr("data-name");
	var path = $(obj).attr("data-path");
	setValueField("item-link", name);
	setValueField("item-path", path);
}

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
	    	        "sep2": "---------",
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
	var ui = '<div class="col-md-2" style="text-align:center; padding: 0px;display: table-cell;">'
        +'	<div class="thumbnail" data-image="'+obj.image+'" data-url="'+obj.link+'" data-name="'+unescape(obj.name)+'" data-id="'+obj.idChannel+'" data-status="'+obj.status+'" onclick="">'
        +'      <div class="caption">'
        +'        	<h4>'+unescape(obj.name)+'</h4>'
        +'      </div>'
        +'      <img class="img-myhotel" src="' + $pathLiveTV +  obj.image + '">'
        +'    </div>'
        +'</div>';
	return ui;
}