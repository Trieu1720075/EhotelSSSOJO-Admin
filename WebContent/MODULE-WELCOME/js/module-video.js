var $itemIdVideo = 0;
var $nameDeleteVideo="";

$(function() {
	$("#item-upload-form-video").submit(function() {
		var name = getValueField("item-name-video");
		var link = getValueField("item-link-video");
		if ($typeMode == 1 && !checkErrorItemCreate(name, link)) {
			return false;
		} else if ($typeMode == 2 && !checkErrorItemEdit(name)) {
			return false;
		} else {
			return true;
		}
	});
	
	$("#item-upload-form-video").ajaxForm({
	    success: function(response) {
	        if (response.status == 'SUCCESS') {
        		if ($typeMode == 1) {
					createItemVideo(response.mediaName);
				} else {
					editItemVideo();
				}
			} else {
				closeDialog("video-dialog");
				showMessageError(getValueField("upload-file-fail"));
			}
	    }
	});
	getItemVideo();
});

function getItemVideo() {
	$.ajax({
		type : "GET",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "getwelcomemedia",
			type : "VIDEO",
			//langid : $langId
		},
		success : function(response) {
			resetDataTable("table-item-video");
			createTableItemVideo(response);
			createDataTable("table-item-video");
		},
		error : function () {
			showMessageWarning("Get data not success")
		}
	});
}

function getConfigVideo() {
	$.ajax({
		type : "GET",
		url : $pathWebService + "configftp",
		cache : false,
		data : {
			action : "getconfig"
		},
		success : function(response) {
			var item = response;
			setValueField("item-host-video", item.host);
			setValueField("item-port-video", item.port);
			setValueField("item-user-video", item.user);
			setValueField("item-pass-video", item.pass);
			getListFileVideo();
		}
	});
}

function getListFileVideo() {
	$.ajax({
		type : "GET",
		url : $pathWebService + "configftp",
		cache : false,
		timeout : 3000,
		data : {
			action : "getlistfile",
			type : 'video'
		},
		success : function(response) {
			$("#container-ftp-video").empty();
			if (response.length == 0) {
				$("#container-ftp-video").append(getValueField("message-file-empty"));
			}
			$.each(response, function(i, item) {
				var temp = '<div class="item-ftp" data-path="' + item.path + '" data-name="' + item.filename 
					+ '" onclick="chooseFileFTPVideo(this)"><img src="../MODULE-COMMON/images/icons/ic_file.gif" height="16px" width="16px"><span>' 
					+ item.filename + '</span></div>';
				$("#container-ftp-video").append(temp);
			});
		},
		error : function () {
			$("#container-ftp-video").empty();
			$("#container-ftp-video").append(getValueField("message-file-empty"));
		}
	});
}

function createTableItemVideo(data) {
	$listItem = [];
	$("#tbody-item-video").empty();
	var myBody = document.getElementById("tbody-item-video");
	$.each(data, function(i, item) {
		$listItem.push(item);
		var id = item.id;
		var name = unescape(item.name);
		var url = item.filename;
		var invisible = item.status;
		var index = item.index;
		
		var row = myBody.insertRow(myBody.rows.length);
		var col1 = row.insertCell(0);
		col1.innerHTML = i + 1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = name;
		
		var col3 = row.insertCell(2);
		col3.innerHTML = url;
		
		var col4 = row.insertCell(3);
		col4.appendChild(createItemInvisible_Video(id,name,url,invisible,index));
		
		var col5 = row.insertCell(4);
		var btnEdit = createButton(1);
		btnEdit.setAttribute("onclick", "openEditDialogVideo('" + id + "', '" + name + "', '" + url + "', '" + invisible + "', '" + index + "')");
		var btnDelete = createButton(2);
		btnDelete.setAttribute("onclick", "openDeleteDialogVideo('" + id + "', '" + name + "')");
		col5.appendChild(btnEdit);
		col5.appendChild(btnDelete);
	});
}

function createItemInvisible_Video(id,name,url,invisible,index) {
	var str = "'" + id + "','" + name + "','" + url + "','" + invisible + "','" + index + "'";
	var button = document.createElement("button"); 
	button.setAttribute('type', 'button');
	button.setAttribute('onclick', 'changeStatusDataVideo('+ str +')');
	if (invisible == 1) {
		button.className = "status-active";
	} else {
		button.className = "status-inactive";
	}
	return button;
}

function changeStatusDataVideo(id,name,url,status,index){
	
	if(status=="1" || status==1){
		status=0;
	}else{
		status=1;
	}
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : 'editwelcomemedia',			
			id : id,
			name : name,
			filename:url,
			status : status,
			index : index
		},
		success : function(response) {
			closeDialogItem();
			if (response > 0) {
				getItemVideo();
				showMessageSuccess(getValueField("mv-edit-success"));
			} else {
				showMessageError(getValueField("mv-edit-fail"));
			}
		}
	});	
	
}

function openNewDialogVideo() {
	openDialog("video-dialog");
	getConfigVideo();
	$("#container-ftp-video").show();
	$("#media-player-video").hide();
	closeMessageCheck("item-container-error-video");
	$("#item-title-video").html(getValueField("mv-create-title"));	
	setValueField("item-name-video", "");
	setValueField("item-link-video", "");
	setValueField("item-status-video", 0);
	setValueField("item-type-video", 1);
	//createStatus(0);
	$(".btn-save").html(getValueField("btn-create"));
	$typeMode = 1;
}

function openEditDialogVideo(id, name, link, invisible,index) {
	openDialog("video-dialog");
	$("#container-ftp-video").hide();
	$("#media-player-video").show();
	closeMessageCheck("item-container-error-video");
	$("#item-title-video").html(getValueField("mv-edit-title"));
	
	setValueField("item-name-video", name);
	setValueField("item-link-video", link);
	setValueField("item-status-video", invisible);
	setValueField("item-type-video", 2);
	setValueField("item-index-video", 2);
	setValueMedia("media-player-video", link, 1);
	createStatusVideo(invisible);
	$(".btn-save").html(getValueField("btn-save"));
	$itemIdVideo = id;
	$typeMode = 2;
}

function openDeleteDialogVideo(id, name) {
	openDialog("video-delete-dialog");
	$("#item-delete-video").html(name);
	$itemIdVideo = id;
	$nameDeleteVideo=name;
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
			closeDialog("video-dialog");
			if (response > 0) {
				getItemVideo();
				showMessageSuccess(getValueField("mv-create-success"));
			} else {
				showMessageError(getValueField("mv-create-fail"));
			}
		}
	});
}

function editItemVideo() {
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : 'editwelcomemedia',		
			id : $itemIdVideo,
			name : getValueField("item-name-video"),
			filename: getValueField("item-link-video"),
			status : getValueField("item-status-video"),
			index: getValueField("item-index-video"),
		},
		success : function(response) {
			closeDialog("video-dialog");
			if (response > 0) {
				getItemVideo();
				showMessageSuccess(getValueField("mv-edit-success"));
			} else {
				showMessageError(getValueField("mv-edit-fail"));
			}
		}
	});
}

function deleteVideo() {
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : 'deletewelcomemedia',
			id : $itemIdVideo
		},
		success : function(response) {
			closeDialog("video-delete-dialog");
			if (response > 0) {
				getItemVideo();
				showMessageSuccess(getValueField("mv-delete-success"));
			} else if (response == -2) {
				showMessageError(getValueField("mv-delete-duplicate"));
			} else {
				showMessageError(getValueField("mv-delete-fail"));
			}
		}
	});
}

function checkErrorItemCreate(name, link) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error-video", getValueField("message-mv-name"));
		return false;
	} 
	if (checkRequiredField(link)) {
		showMessageCheck("item-container-error-video", getValueField("message-mv-link"));
		return false;
	} 
	return true;
}

function checkErrorItemEdit(name) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error-video", getValueField("message-mv-name"));
		return false;
	}
	return true;
}

function changeStatusVideo() {
	if (getValueField("item-status-video") == 1) {
		setValueField("item-status-video", 0);
		createStatusVideo(0);
	} else {
		setValueField("item-status-video", 1);
		createStatusVideo(1);
	}
}

function createStatusVideo(status) {
	var statusItem = createItemInvisible(status);
	statusItem.setAttribute("onclick", "changeStatusVideo()");
	$("#status-td-video").empty();
	document.getElementById("status-td-video").appendChild(statusItem);
}


function createItemInvisible(status) {
	var button = document.createElement("button"); 
	button.setAttribute('type', 'button');
	if (status == 0) {
		button.className = "status-inactive";
	} else {
		button.className = "status-active";
	}
	return button;
}

function closeDialogItemVideo() {
	closeDialog("video-dialog");
	$("#media-player-video").empty();
}

function chooseFileFTPVideo(obj) {
	var name = $(obj).attr("data-name");
	var path = $(obj).attr("data-path");
	setValueField("item-link-video", name);
	setValueField("item-path-video", path);
}