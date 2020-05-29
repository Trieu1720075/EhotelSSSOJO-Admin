var $itemMyhotelId = 0;
var $itemMyhotelName = "";
var $status = 1;
var $listFTP = [];

$(function() {
	getMyhotelItem();
	
	$("#myhotel-item-upload-form").submit(function() {
		var name = getValueField("myhotel-item-name");
		var link = getValueField("myhotel-item-link");
		var image = getValueField("myhotel-item-file-name");
		if ($typeMode == 1 && !checkErrorMyhotelItemCreate(name, link, image)) {
			return false;
		} else if ($typeMode == 2 && !checkErrorMyhotelItemEdit(name)) {
			return false;
		} else {
			return true;
		}
	});
	
	var bar = $('.progress-bar');
	var percent = $('.progress-percent');
	
	$("#myhotel-item-upload-form").ajaxForm({
	    beforeSend: function() {
	    	var file =  document.getElementById("myhotel-item-file").files[0]; 
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
					createMyhotelItem(response.fileName, response.mediaName);
				} else {
					editMyhotelItem(response.fileName);
				}
			} else {
				closeDialog("myhotel-item-dialog");
				showMessageError(getValueField("item-upload-fail"));
			}
	    }
	});
});

function getMyhotelItem() {
	$checkAjaxShow = true;
	$.ajax({
		type : "GET",
		url : $pathWebService + "livetv",
		cache : false,
		data : {
			action : "getlistadvertise",
			type: 2,
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

function openMyhotelNewDialog() {
	openDialog("myhotel-item-dialog");
	getConfig();
	destroyCropImage("myhotel-item-image");
	$(".process-upload").hide();
	$("#container-ftp").show();
	$("#media-player").hide();
	closeMessageCheck("myhotel-item-container-error");
	$("#myhotel-item-title").html('Edit Mode Video');
	setValueField("myhotel-item-name", "");
	setValueField("myhotel-item-link", "");
	setValueField("myhotel-item-file", "");
	setValueField("myhotel-item-file-name", "");
	setValueField("myhotel-item-old-file-name", "");
	setValueImage("myhotel-item-image", "");
	setValueField("myhotel-item-status", 1);
	setValueField("item-type", 1);
	createMyhotelStatus(1);
	$(".btn-save").html(getValueField("btn-create"));
	$("#myhotel-div-item-image").attr("style", "width:0px; height:0px");
	$("#myhotel-item-image").attr("style", "");
	$typeMode = 1;
}

function openMyhotelEditDialog($trigger) {
	openDialog("myhotel-item-dialog");
	destroyCropImage("myhotel-item-image");
	$(".process-upload").hide();
	$("#container-ftp").hide();
	$("#media-player").show();
	closeMessageCheck("myhotel-item-container-error");
	$("#myhotel-item-title").html('Video Channel');
	setValueField("myhotel-item-name", $($trigger).attr("data-name"));
	setValueField("myhotel-item-link", $($trigger).attr("data-url"));
	setValueField("myhotel-item-file", "");
	setValueField("myhotel-item-file-name", "");
	setValueField("myhotel-item-old-file-name", $($trigger).attr("data-image"));
	setValueImage("myhotel-item-image", $pathLiveTV + $($trigger).attr("data-image"));
	setValueField("myhotel-item-status", $($trigger).attr("data-status"));
	setValueField("item-type", 2);
	setValueMedia("media-player", $($trigger).attr("data-status"), 2);
	createMyhotelStatus($($trigger).attr("data-status"));
	$(".btn-save").html(getValueField("btn-save"));
	$("#myhotel-div-item-image").attr("style", "width:135px; height:200px");
	$("#myhotel-item-image").attr("style", "width:135px; height:200px");
	$itemMyhotelId = $($trigger).attr("data-id");
	$typeMode = 2;
}

function openMyhotelDeleteDialog($trigger) {
	openDialog("myhotel-item-delete-dialog");
	$("#myhotel-item-delete").html($($trigger).attr("data-name"));
	$itemMyhotelId = $($trigger).attr("data-id");
	$itemMyhotelName = $($trigger).attr("data-name");
}

function createMyhotelItem(fileName, mediaName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "mode",
		cache : false,
		data : {
			action : 'editmode',
			name : getValueField("myhotel-item-name"),
			image : fileName,
			video : mediaName,
			status : getValueField("myhotel-item-status"),
			langid: $langId,
		},
		success : function(response) {
			closeDialog("myhotel-item-dialog");
			if (response > 0) {
				getMyhotelItem();
				//showMessageSuccess(getValueField("hotel-create-success"));
			} else {
				showMessageError(getValueField("hotel-create-fail"));
			}
		}
	});
}

function editMyhotelItem(fileName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "livetv",
		cache : false,
		data : {
			action : 'editchanneladvertise',
			channelid : $itemMyhotelId,
			name : getValueField("myhotel-item-name"),
			image : fileName,
			status : getValueField("myhotel-item-status"),
			type: 2,
		},
		success : function(response) {
			closeDialogItem();
			if (response > 0) {
				getMyhotelItem();
				//showMessageSuccess(getValueField("hotel-edit-success"));
			} else {
				showMessageError(getValueField("hotel-edit-fail"));
			}
		}
	});
}

function deleteMyhotelItem() {
	$.ajax({
		type : "POST",
		url : $pathWebService + "livetv",
		cache : false,
		data : {
			action : 'deletechanneladvertise',
			channelid : $itemMyhotelId,
			type : 2,
		},
		success : function(response) {
			closeDialog("myhotel-item-delete-dialog");
			if (response > 0) {
				getMyhotelItem();
				//showMessageSuccess(getValueField("hotel-delete-success"));
			} else if (response == -2) {
				showMessageError(getValueField("hotel-delete-duplicate"));
			} else {
				showMessageError(getValueField("hotel-delete-fail"));
			}
		}
	});
}

function checkErrorMyhotelItemCreate(name, link, image) {
	if (checkRequiredField(name)) {
		showMessageCheck("myhotel-item-container-error", getValueField("message-hotel-name"));
		return false;
	} 
	if (checkRequiredField(link)) {
		showMessageCheck("myhotel-item-container-error", getValueField("message-hotel-link"));
		return false;
	} 
	if (checkRequiredField(image)) {
		showMessageCheck("myhotel-item-container-error", getValueField("message-image"));
		return false;
	}
	return true;
}

function checkErrorMyhotelItemEdit(name) {
	if (checkRequiredField(name)) {
		showMessageCheck("myhotel-item-container-error", getValueField("message-hotel-name"));
		return false;
	}
	return true;
}

function changeMyhotelStatus() {
	if (getValueField("myhotel-item-status") == 1) {
		setValueField("myhotel-item-status", 0);
		createMyhotelStatus(0);
	} else {
		setValueField("myhotel-item-status", 1);
		createMyhotelStatus(1);
	}
}

function createMyhotelStatus(status) {
	var statusItem = createItemStatus(status);
	statusItem.setAttribute("onclick", "changeMyhotelStatus()");
	$("#myhotel-status-td").empty();
	document.getElementById("myhotel-status-td").appendChild(statusItem);
}

function closeDialogItem() {
	closeDialog("myhotel-item-dialog");
	$("#media-player").empty();
}

function chooseFileFTP(obj) {
	var name = $(obj).attr("data-name");
	var path = $(obj).attr("data-path");
	setValueField("myhotel-item-link", name);
	setValueField("myhotel-item-path", path);
}

function initContext() {
    $.contextMenu({
        selector: '.container-item-myhotel .thumbnail',
        build: function ($trigger, e) {
            return {
                callback: function (e, options) {
					if (e == 'update') {
						openMyhotelEditDialog($trigger);
					} else if (e == 'delete') {
						openMyhotelDeleteDialog($trigger);
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

function previewMyhotelFileImage(idDiv, idImage, idFile, idFileName, mode) {
	var image = document.getElementById(idImage);	
    var file =  document.getElementById(idFile).files[0]; 
    var fileName = document.getElementById(idFileName);	
    var _URL = window.URL || window.webkitURL;
    var file_, img;

	if (file_ = file) {
	    img = new Image();
	    img.onload = function() {
	        width=this.width;
	        height=this.height;
	        
	        var reader = new FileReader();
	        reader.readAsDataURL(file);
	    	reader.onloadend = function() {		
	    		if (file.size >= $fileSize) {
	    			image.src = "";
	    			fileName.value = "";
	    			showMessageCheck(idDiv, getValueField("message-image-size"));
	    		}
	    		else if (checkFileImgage(file)) {
	    			image.src = reader.result;
	    			fileName.value = file.name.replace(/\s/g, "_");			
	    			closeMessageCheck(idDiv);
	    				
	    			if (mode == 1) {					
	    				$("#myhotel-item-image").attr("style", "");
	    				$("#myhotel-div-item-image").attr("style", "");						
	    			
	    				
	    				if(width < 135 || height < 200){
	    					image.src = "";
	    					fileName.value = "";
	    					showMessageCheck(idDiv, "Please choose image with width &#8805; 135px, height &#8805; 200px");
	    					destroyCropImage("myhotel-item-image");
	    				}else{
	    					closeMessageCheck(idDiv);
	    					
	    				}
	    				
	    				if (file.size < $fileSizeMin) {					
	    					image.src = "";
	    					fileName.value = "";
	    					showMessageCheck(idDiv, getValueField("message-image-size-min"));
	    					destroyCropImage("myhotel-item-image");
	    				}
	    				else {
	    					$('#myhotel-div-item-image').addClass('div-item-image');
	    					destroyCropImage("myhotel-item-image");
	    					cropImage("myhotel-item-image");
	    				}
	    			}
	    		} 
	    		else {
	    			image.src = "";
	    			fileName.value = "";
	    			showMessageCheck(idDiv, getValueField("message-image-type"));
	    		}
	    	};
	        
	    };
	    
	    
	    img.onerror = function() {};
	    img.src = _URL.createObjectURL(file_);

	}
}
