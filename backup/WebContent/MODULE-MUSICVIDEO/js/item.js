var $itemId = 0;
var $itemName = "";
var $listItem = [];
var $listItemIn = [];
var $listItemOut = [];
var $status = 1;
var $listFTP = [];

$(function() {
	getListFTP();
	
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
					createItem(response.fileName, response.mediaName, response.result);
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
		url : $pathWebService + "vod",
		cache : false,
		data : {
			action : "getlistcontent",
			idsubject : $subjectId,
			langid : $langId
		},
		success : function(response) {
			resetDataTable("table-item");
			createTableItem(response);
			createDataTable("table-item");
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
		}
	});
}

function createTableItem(data) {
	$listItem = [];
	$("#tbody-item").empty();
	var myBody = document.getElementById("tbody-item");
	$.each(data, function(i, item) {
		$listItem.push(item);
		var id = item.idContent;
		var name = unescape(item.name);
		var plot = unescape(item.plot);
		var link = item.url;
		var image = item.poster;
		var invisible = item.invisible;
		var isnew = item.isnew;
		
		var row = myBody.insertRow(myBody.rows.length);
		var col1 = row.insertCell(0);
		col1.innerHTML = i + 1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = name;
		
		var col3 = row.insertCell(2);
		col3.innerHTML = link;
		
		var col4 = row.insertCell(3);
		col4.appendChild(createItemImage($pathVideo + image));
		
		var col5 = row.insertCell(4);
		col5.appendChild(createItemInvisible(invisible));

		var col6 = row.insertCell(5);
		var btnEdit = createButton(1);
		var str = "'" + id + "','" + name + "', '" + plot + "', '" + link + "', '" 
			+ image + "', '" + invisible + "', '" + isnew + "'";
		btnEdit.setAttribute("onclick", "openEditDialog(" + str + ")");
		var btnDelete = createButton(2);
		btnDelete.setAttribute("onclick", "openDeleteDialog('" + id + "', '" + name + "', '" + link + "')");
		col6.appendChild(btnEdit);
		col6.appendChild(btnDelete);
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
	$("#item-title").html(getValueField("mv-create-title"));
	setValueField("item-subject", $subjectId);
	setValueField("item-name", "");
	setValueField("item-description", "");
	setValueField("item-link", "");
	setValueField("item-file", "");
	setValueField("item-file-name", "");
	setValueField("item-old-file-name", "");
	setValueImage("item-image", "");
	setValueField("item-status", 0);
	setValueField("item-isnew", 1);
	setValueField("item-type", 1);
	createStatus(0);
	createIsNew(1);
	$(".btn-save").html(getValueField("btn-create"));
	$("#div-item-image").attr("style", "width:0px; height:0px");
	$("#item-image").attr("style", "");
	$typeMode = 1;
}

function openEditDialog(id, name, plot, link, image, invisible, isnew) {
	openDialog("item-dialog");
	destroyCropImage("item-image");
	$(".process-upload").hide();
	$("#container-ftp").hide();
	$("#media-player").show();
	closeMessageCheck("item-container-error");
	$("#item-title").html(getValueField("mv-edit-title"));
	setValueField("item-subject", $subjectId);
	setValueField("item-name", name);
	setValueField("item-description", plot);
	setValueField("item-link", link);
	setValueField("item-file", "");
	setValueField("item-file-name", "");
	setValueField("item-old-file-name", image);
	setValueImage("item-image", $pathVideo + image);
	setValueField("item-status", invisible);
	setValueField("item-isnew", isnew);
	setValueField("item-type", 2);
	setValueMedia("media-player", link, 2);
	createStatus(invisible);
	createIsNew(isnew);
	$(".btn-save").html(getValueField("btn-save"));
	$("#div-item-image").attr("style", "width:135px; height:200px");
	$("#item-image").attr("style", "width:135px; height:200px");
	$itemId = id;
	$typeMode = 2;
}

function openDeleteDialog(id, name, link) {
	openDialog("item-delete-dialog");
	$("#item-delete").html(name);
	$itemId = id;
	$itemName = link;
}

function createItem(fileName, mediaName, result) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "vod",
		cache : false,
		data : {
			action : 'addmovie',
			idsubject : getValueField("item-subject"),
			name : escape(getValueField("item-name")),
			poster : fileName,
			plot : escape(getValueField("item-description")),
			url : mediaName,
			invisible : getValueField("item-status"),
			isnew : getValueField("item-isnew"),
			uuid : result,
			productor : '',
			director : '',
			actor : '',
			price : '',
			iunit : ''
		},
		success : function(response) {
			closeDialog("item-dialog");
			if (response > 0) {
				getItem();
				setTimeout(function() {
					getListFTP();
				}, 1000);
				showMessageSuccess(getValueField("mv-create-success"));
			} else {
				showMessageError(getValueField("mv-create-fail"));
			}
		}
	});
}

function editItem(fileName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "vod",
		cache : false,
		data : {
			action : 'editmovie',
			idsubject : getValueField("item-subject"),
			idcontent : $itemId,
			langid : $langId,
			name : escape(getValueField("item-name")),
			poster : fileName,
			plot : escape(getValueField("item-description")),
			invisible : getValueField("item-status"),
			isnew : getValueField("item-status"),
			productor : '',
			director : '',
			actor : '',
			price : '',
			iunit : ''
		},
		success : function(response) {
			closeDialogItem();
			if (response > 0) {
				getItem();
				showMessageSuccess(getValueField("mv-edit-success"));
			} else {
				showMessageError(getValueField("mv-edit-fail"));
			}
		}
	});
}

function deleteItem() {
	$.ajax({
		type : "POST",
		url : $pathWebService + "vod",
		cache : false,
		data : {
			action : 'deletemovie',
			idcontent : $itemId,
			uuid : getUUID(),
			ipserver : window.location.host.split(":")[0]
		},
		success : function(response) {
			closeDialog("item-delete-dialog");
			if (response > 0) {
				getItem();
				showMessageSuccess(getValueField("mv-delete-success"));
			} else if (response == -2) {
				showMessageError(getValueField("mv-delete-duplicate"));
			} else {
				showMessageError(getValueField("mv-delete-fail"));
			}
		}
	});
}

function checkErrorItemCreate(name, link, image) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error", getValueField("message-mv-name"));
		return false;
	} 
	if (checkRequiredField(link)) {
		showMessageCheck("item-container-error", getValueField("message-mv-link"));
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
		showMessageCheck("item-container-error", getValueField("message-mv-name"));
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
	var statusItem = createItemInvisible(status);
	statusItem.setAttribute("onclick", "changeStatus()");
	$("#status-td").empty();
	document.getElementById("status-td").appendChild(statusItem);
}

function changeIsNew() {
	if (getValueField("item-isnew") == 1) {
		setValueField("item-isnew", 0);
		createIsNew(0);
	} else {
		setValueField("item-isnew", 1);
		createIsNew(1);
	}
}

function createIsNew(status) {
	var statusItem = createItemStatus(status);
	statusItem.setAttribute("onclick", "changeIsNew()");
	$("#isnew-td").empty();
	document.getElementById("isnew-td").appendChild(statusItem);
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

function getListFTP() {
	var host = window.location.host;
	$.ajax({
		type : "GET",
		url : $pathWebService + "vod",
		cache : false,
		data : {
			action : "getlistuuid",
			ipserver : host.split(":")[0]
		},
		success : function(response) {
			$("#div-download").html("");
			$("#div-download").show();
			var download = 0;
			var html = "";
			$listFTP = [];
			$.each(response, function(i, item) {
				$listFTP.push(item);
				if (item.status == '1') {
					html += "File " + item.filename + " " + getValueField("ftp-complete")  + "</br>";
				} else {
					html += "File " + item.filename + " " + getValueField("ftp-download")  + "</br>";
					download++;
				}
			});
			$("#div-download").html(html);
			if (download == 0) {
				$checkAjaxShow = true;
				autoHideFTP();
			} else {
				setTimeout(function() {
					$checkAjaxShow = false;
					getListFTP();
				}, 5000);
			}
		}
	});
}

function autoHideFTP() {
	setTimeout(function() {
		$("#div-download").hide();
	}, 3000);
}

function getUUID() {
	var result = "";
	$.each($listFTP, function(i, item) {
		if ($itemName == item.filename && !checkRequiredField(item.uuid)) {
			result = item.uuid;
		}
	});
	return result;
}