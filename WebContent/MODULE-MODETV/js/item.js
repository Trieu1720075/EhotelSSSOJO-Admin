var $itemId = 0;
var $listItem = [];
var $listItemIn = [];
var $listItemOut = [];
var $status = 1;
var $maxIndex = 0;
var $image = "";

$(function() {
	$("#item-upload-form").submit(function() {
		var name = getValueField("item-name");
		var address = getValueField("item-address");
		var content = getValueField("item-file-name");
		if ($typeMode == 1 && !checkErrorItemCreate(name, address, content)) {
			return false;
		} else if ($typeMode == 2 && !checkErrorItemEdit(name, address)) {
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

$(function() {
	$("#video-item-upload-form").submit(function() {
		var name = getValueField("myhotel-item-name");
		var address = getValueField("myhotel-item-link");
		var content = $image;
		if ($typeMode == 1 && !checkErrorItemCreate(name, address, content)) {
			return false;
		} else if ($typeMode == 2 && !checkErrorItemEdit(name, address)) {
			return false;
		} else {
			return true;
		}
	});
	
	var bar = $('.progress-bar');
	var percent = $('.progress-percent');
	
	$("#video-item-upload-form").ajaxForm({
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
					createItemVideo(response.mediaName)
					editVideo(response.mediaName);
				}
			} else {
				closeDialog("item-dialog");
				showMessageError(getValueField("item-upload-fail"));
			}
	    }
	});
});

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
	$
			.ajax({
				type : "GET",
				url : $pathWebService + "configftp",
				cache : false,
				timeout : 3000,
				data : {
					action : "getlistfile",
					type : 'video'
				},
				success : function(response) {
					$("#container-ftp").empty();
					if (response.length == 0) {
						$("#container-ftp").append(
								getValueField("message-file-empty"));
					}
					$
							.each(
									response,
									function(i, item) {
										var temp = '<div class="item-ftp" data-path="'
												+ item.path
												+ '" data-name="'
												+ item.filename
												+ '" onclick="chooseFileFTP(this)"><img src="../MODULE-COMMON/images/icons/ic_file.gif" height="16px" width="16px"><span>'
												+ item.filename
												+ '</span></div>';
										$("#container-ftp").append(temp);
									});
				},
				error : function() {
					$("#container-ftp").empty();
					$("#container-ftp").append(
							getValueField("message-file-empty"));
				}
			});
}

function getItem() {
	$.ajax({
		type : "GET",
		url : $pathWebService + "mode",
		cache : false,
		async : true,
		data : {
			action : 'getlistmode',
			langid : $langId
		},
		success : function(response) {
			resetDataTable("table-item");
			createTableItem(response);
			createDataTable("table-item");
		}
	});
}

function createTableItem(data) {
	$listItem = [];
	$listItemIn = [];
	$("#tbody-item").empty();
	var myBody = document.getElementById("tbody-item");
	$.each(data, function(i, item) {
		if (i == 0) {
			$maxIndex = parseInt(item.maxindex);
		}
		$listItem.push(item);
		$listItemIn.push(item);
		var id = item.id;
		var name = unescape(item.name);
		var video = unescape(item.video);
		var image = item.image;
		var status = item.status;
		
		var row = myBody.insertRow(myBody.rows.length);
		var col1 = row.insertCell(0);
		col1.innerHTML = i + 1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = name;
		
		var col3 = row.insertCell(2);
		col3.innerHTML = video;
		
		var col4 = row.insertCell(3);
		col4.appendChild(createItemImage($pathMode + image));
		
		var col5 = row.insertCell(4);
		col5.appendChild(createItemInvisible_(id,name,video,image,status));
		
		var col6 = row.insertCell(5);
		var btnEdit = createButton(1);
		btnEdit.setAttribute("onclick", "openEditDialog('" + id + "','" + name + "', '" + video + "', '" + image + "', '" + status + "')");
		var btnDelete = createButton(2);
		btnDelete.setAttribute("onclick", "openDeleteDialog('" + id + "', '" + name + "')");
		var btnEditVideo = createButton(4);
		btnEditVideo.setAttribute("onclick", "openCreateVideoDialog('" + id + "','" + name + "', '" + video + "', '" + image + "', '" + status + "')");
		col6.appendChild(btnEdit);
		col6.appendChild(btnDelete);
		col6.appendChild(btnEditVideo);
	});
}


function createItemInvisible_(id,name,video,image,status) {
	var str = "'" + id + "','" + name+ "','" + video+ "','" + image+"','"+status+"'";
	var button = document.createElement("button"); 
	button.setAttribute('type', 'button');
	button.setAttribute('onclick', 'changeStatusData('+str+')');
	if (status == 1) {
		button.className = "status-active";
	} else {
		button.className = "status-inactive";
	}
	return button;
}

function changeStatusData(id,name,video,image,status){
	if(status=="1" || status==1){
		status=0;
	}else{
		status=1;
	}
	$.ajax({
		type : "POST",
		url : $pathWebService + "mode",
		cache : false,
		data : {
			action : 'editmode',
			id : id,
			name : name,
			video : video,
			image : image,
			status : status,
			langid : $langId
		},
		success : function(response) {
			closeDialog("item-dialog");
			if (response > 0) {
				getItem();
				//showMessageSuccess(getValueField("livetv-edit-success"));
			} else {
				showMessageError(getValueField("modetv-edit-fail"));
			}
		}
	});
	
/*	$.ajax({
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
    });	*/
}

function createTableItemIn() {
	if ($listItemIn.length == 0) {
		createRowEmpty("tbody-item-in", 3);
	} else {
		$("#tbody-item-in").empty();
		var myTable = document.getElementById("tbody-item-in");
		$.each($listItemIn, function(i, item) {
			var rowContent = myTable.insertRow(myTable.rows.length);
			
			var colContent1 = rowContent.insertCell(0);
			colContent1.innerHTML = i + 1;
			
			var colContent2 = rowContent.insertCell(1);
			colContent2.innerHTML = item.name;
			
			var colContent3 = rowContent.insertCell(2);
			colContent3.appendChild(createItemImage(item.image));

			var colContent4 = rowContent.insertCell(3);
			var btn = createButton(3);
			btn.setAttribute("onclick", "setOutItem('" + item.idChannel + "')");
			colContent4.appendChild(btn);
		});
	}
}

function createTableItemOut() {
	if ($listItemOut.length == 0) {
		createRowEmpty("tbody-item-out", 3);
	} else {
		$("#tbody-item-out").empty();
		var myTable = document.getElementById("tbody-item-out");
		$.each($listItemOut, function(i, item) {
			var rowContent = myTable.insertRow(myTable.rows.length);
			
			var colContent1 = rowContent.insertCell(0);
			colContent1.innerHTML = i + 1;
			
			var colContent2 = rowContent.insertCell(1);
			colContent2.innerHTML = item.name;
			
			var colContent3 = rowContent.insertCell(2);
			colContent3.appendChild(createItemImage(item.image));

			var colContent4 = rowContent.insertCell(3);
			var btn = createButton(4);
			btn.setAttribute("onclick", "setInItem('" + item.idChannel + "')");
			colContent4.appendChild(btn);
		});
	}
}

function openNewDialog() {
	openDialog("item-dialog");
	//destroyCropImage("item-image");
	$(".process-upload").hide();
	$("#div-item-image").attr("style", "width:150px; height:150px");
	$("#item-image").attr("style", "width:150px; height:150px");

	closeMessageCheck("item-container-error");
	$("#item-title").html(getValueField("modetv-create-title"));
	setValueField("item-name", "");
	setValueField("item-address", "");
	setValueField("item-idx", $maxIndex + 1);
	setValueField("item-file", "");
	setValueField("item-file-name", "");
	setValueField("item-old-file-name", "");
	setValueImage("item-image", "");
	setValueField("item-status", 1);
	createStatus(1);
	$(".btn-save").html(getValueField("btn-create"));
	
	$typeMode = 1;
}

function openEditDialog(id, name, video, image, status) {
	openDialog("item-dialog");
	//destroyCropImage("item-image");
	$(".process-upload").hide();
	closeMessageCheck("item-container-error");
	$("#item-title").html(getValueField("modetv-edit-title"));
	setValueField("item-name", name);
	setValueField("item-address", video);
	setValueField("item-file", "");
	setValueField("item-file-name", "");
	setValueField("item-old-file-name", image);
	setValueImage("item-image", $pathMode + image);
	setValueField("item-status", status);
	createStatus(status);
	$(".btn-save").html(getValueField("btn-save"));
	$("#div-item-image").attr("style", "width:150px; height:150px");
	$("#item-image").attr("style", "width:150px; height:150px");
	$itemId = id;
	$typeMode = 2;
}

function openCreateVideoDialog(id, name, video, image, status) {
	openDialog("myhotel-item-dialog");
	getConfig();
	destroyCropImage("myhotel-item-image");
	$(".process-upload").hide();
	$("#container-ftp").show();
	$("#media-player").hide();
	closeMessageCheck("myhotel-item-container-error");
	$("#myhotel-item-title").html('Edit Mode Video');
	setValueField("myhotel-item-name", name);
	setValueField("myhotel-item-link", "");
	setValueField("myhotel-item-file", "");
	setValueField("myhotel-item-file-name", "");
	setValueField("myhotel-item-old-file-name", "");
	setValueImage("myhotel-item-image", image);
	setValueField("myhotel-item-status", status);
	createMyhotelStatus(status);
	setValueField("item-type", 1);
	$(".btn-save").html(getValueField("btn-create"));
	$typeMode = 2;
	$itemId = id;
	$image = image;
}

function createItemVideo(mediaName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : 'addwelcomemedia',			
			name : getValueField("item-name-video"),
			filename : mediaName,
			type : "VIDEO"
		},
		success : function(response) {
			if (response > 0) {
				showMessageSuccess("Upload Video Success");
			} else {
				showMessageError(getValueField("Upload Video Fail"));
			}
		}
	});
}

function chooseFileFTP(obj) {
	var name = $(obj).attr("data-name");
	var path = $(obj).attr("data-path");
	setValueField("myhotel-item-link", name);
	setValueField("myhotel-item-path", path);
}

function createMyhotelStatus(status) {
	var statusItem = createItemStatus(status);
	statusItem.setAttribute("onclick", "changeMyhotelStatus()");
	$("#myhotel-status-td").empty();
	document.getElementById("myhotel-status-td").appendChild(statusItem);
}

function openDeleteDialog(id, name) {
	openDialog("item-delete-dialog");
	$("#item-delete").html(name);
	$itemId = id;
}

function createItem(fileName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "mode",
		cache : false,
		data : {
			action : 'addnewmode',
			idsubject : $subjectId,
			name : getValueField("item-name"),
			video : getValueField("item-address"),
			index : getValueField("item-idx"),
			image : fileName,
			status : getValueField("item-status"),
			language : 'VN',
			subtitle : ''
		},
		success : function(response) {
			closeDialog("item-dialog");
			if (response > 0) {
				getItem();
				//showMessageSuccess(getValueField("livetv-create-success"));
			} else {
				showMessageError(getValueField("modetv-create-fail"));
			}
		}
	});
}

function editItem(fileName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "mode",
		cache : false,
		data : {
			action : 'editmode',
			id : $itemId,
			name : getValueField("item-name"),
			video : getValueField("item-address"),
			image : fileName,
			status : getValueField("item-status"),
			langid : $langId,
		},
		success : function(response) {
			closeDialog("item-dialog");
			if (response > 0) {
				getItem();
				//showMessageSuccess(getValueField("livetv-edit-success"));
			} else {
				showMessageError(getValueField("modetv-edit-fail"));
			}
		}
	});
}

function editVideo(fileName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "mode",
		cache : false,
		data : {
			action : 'editmode',
			id : $itemId,
			name : getValueField("myhotel-item-name"),
			video : fileName,
			image : $image,
			status : getValueField("myhotel-item-status"),
			langid : $langId,
		},
		success : function(response) {
			closeDialog("myhotel-item-dialog");
			if (response > 0) {
				getItem();
				//showMessageSuccess(getValueField("livetv-edit-success"));
			} else {
				showMessageError(getValueField("modetv-edit-fail"));
			}
		}
	});
}

function deleteItem() {
	$.ajax({
		type : "POST",
		url : $pathWebService + "mode",
		cache : false,
		data : {
			action : 'deletemode',
			idchannel : $itemId
		},
		success : function(response) {
			closeDialog("item-delete-dialog");
			if (response > 0) {
				getItem();
				//showMessageSuccess(getValueField("livetv-delete-success"));
			} else if (response == -2) {
				showMessageError(getValueField("modetv-delete-duplicate"));
			} else {
				showMessageError(getValueField("modetv-delete-fail"));
			}
		}
	});
}

function closeDialogItem() {
	closeDialog("myhotel-item-dialog");
	$("#media-player").empty();
}

function checkErrorItemCreate(name, address, content) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error", getValueField("message-modetv-name"));
		return false;
	} 
	if (checkRequiredField(address)) {
		showMessageCheck("item-container-error", getValueField("message-modetv-address"));
		return false;
	} 
	if (checkRequiredField(content)) {
		showMessageCheck("item-container-error", getValueField("message-image"));
		return false;
	}
	return true;
}

function checkErrorItemEdit(name, address) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error", getValueField("message-modetv-name"));
		return false;
	} 
	if (checkRequiredField(address)) {
		showMessageCheck("item-container-error", getValueField("message-modetv-address"));
		return false;
	} 
	return true;
}

function changeStatus() {
	if (getValueField("item-status") == 0) {
		setValueField("item-status", 1);
		createStatus(1);
	} else {
		setValueField("item-status", 0);
		createStatus(0);
	}
}

function createStatus(status) {
	var statusItem = createItemStatus(status);
	statusItem.setAttribute("onclick", "changeStatus()");
	$("#status-td").empty();
	document.getElementById("status-td").appendChild(statusItem);
}