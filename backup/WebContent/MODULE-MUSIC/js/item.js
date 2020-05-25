var $itemId = 0;
var $listItem = [];
var $listItemIn = [];
var $listItemOut = [];
var $status = 1;

$(function() {
	$("#item-upload-form").submit(function() {
		var name = getValueField("item-name");
		var link = getValueField("item-link");
		if ($typeMode == 1 && !checkErrorItemCreate(name, link)) {
			return false;
		} else if ($typeMode == 2 && !checkErrorItemEdit(name)) {
			return false;
		} else {
			return true;
		}
	});
	
	$("#item-upload-form").ajaxForm({
	    success: function(response) {
	        if (response.status == 'SUCCESS') {
        		if ($typeMode == 1) {
					createItem(response.mediaName, response.result);
				} else {
					editItem();
				}
			} else {
				closeDialog("item-dialog");
				showMessageError(getValueField("item-upload-fail"));
			}
	    }
	});
});

function getItem() {
	$.ajax({
		type : "GET",
		url : $pathWebService + "mod",
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
			type : 'audio'
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
		var url = item.url;
		var invisible = item.invisible;
		
		var row = myBody.insertRow(myBody.rows.length);
		var col1 = row.insertCell(0);
		col1.innerHTML = i + 1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = name;
		
		var col3 = row.insertCell(2);
		col3.innerHTML = url;
		
		var col4 = row.insertCell(3);
		col4.appendChild(createItemInvisible(invisible));
		
		var col5 = row.insertCell(4);
		var btnEdit = createButton(1);
		btnEdit.setAttribute("onclick", "openEditDialog('" + id + "', '" + name + "', '" + url + "', '" + invisible + "')");
		var btnDelete = createButton(2);
		btnDelete.setAttribute("onclick", "openDeleteDialog('" + id + "', '" + name + "')");
		col5.appendChild(btnEdit);
		col5.appendChild(btnDelete);
	});
}

function openNewDialog() {
	openDialog("item-dialog");
	getConfig();
	$("#container-ftp").show();
	$("#media-player").hide();
	closeMessageCheck("item-container-error");
	$("#item-title").html(getValueField("music-create-title"));
	setValueField("item-subject", $subjectId);
	setValueField("item-name", "");
	setValueField("item-link", "");
	setValueField("item-status", 0);
	setValueField("item-type", 1);
	createStatus(0);
	$(".btn-save").html(getValueField("btn-create"));
	$typeMode = 1;
}

function openEditDialog(id, name, link, invisible) {
	openDialog("item-dialog");
	$("#container-ftp").hide();
	$("#media-player").show();
	closeMessageCheck("item-container-error");
	$("#item-title").html(getValueField("music-edit-title"));
	setValueField("item-subject", $subjectId);
	setValueField("item-name", name);
	setValueField("item-link", link);
	setValueField("item-status", invisible);
	setValueField("item-type", 2);
	setValueMedia("media-player", link, 1);
	createStatus(invisible);
	$(".btn-save").html(getValueField("btn-save"));
	$itemId = id;
	$typeMode = 2;
}

function openDeleteDialog(id, name) {
	openDialog("item-delete-dialog");
	$("#item-delete").html(name);
	$itemId = id;
}

function createItem(mediaName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "mod",
		cache : false,
		data : {
			action : 'addmod',
			idsubject : getValueField("item-subject"),
			name : escape(getValueField("item-name")),
			url : mediaName,
			invisible : getValueField("item-status")
		},
		success : function(response) {
			closeDialog("item-dialog");
			if (response > 0) {
				getItem();
				showMessageSuccess(getValueField("music-create-success"));
			} else {
				showMessageError(getValueField("music-create-fail"));
			}
		}
	});
}

function editItem() {
	$.ajax({
		type : "POST",
		url : $pathWebService + "mod",
		cache : false,
		data : {
			action : 'editmod',
			idsubject : getValueField("item-subject"),
			idcontent : $itemId,
			name : escape(getValueField("item-name")),
			invisible : getValueField("item-status"),
			langid : $langId
		},
		success : function(response) {
			closeDialogItem();
			if (response > 0) {
				getItem();
				showMessageSuccess(getValueField("music-edit-success"));
			} else {
				showMessageError(getValueField("music-edit-fail"));
			}
		}
	});
}

function deleteItem() {
	$.ajax({
		type : "POST",
		url : $pathWebService + "mod",
		cache : false,
		data : {
			action : 'deletemovie',
			idcontent : $itemId
		},
		success : function(response) {
			closeDialog("item-delete-dialog");
			if (response > 0) {
				getItem();
				showMessageSuccess(getValueField("music-delete-success"));
			} else if (response == -2) {
				showMessageError(getValueField("music-delete-duplicate"));
			} else {
				showMessageError(getValueField("music-delete-fail"));
			}
		}
	});
}

function checkErrorItemCreate(name, link) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error", getValueField("message-music-name"));
		return false;
	} 
	if (checkRequiredField(link)) {
		showMessageCheck("item-container-error", getValueField("message-music-link"));
		return false;
	} 
	return true;
}

function checkErrorItemEdit(name) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error", getValueField("message-music-name"));
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