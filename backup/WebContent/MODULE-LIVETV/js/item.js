var $itemId = 0;
var $listItem = [];
var $listItemIn = [];
var $listItemOut = [];
var $status = 1;
var $maxIndex = 0;

$(function() {
	$("#item-upload-form").submit(function() {
		var name = getValueField("item-name");
		var address = getValueField("item-address");
		var content = getValueField("item-file-name");
		var index = getValueField("item-idx");
		if ($typeMode == 1 && !checkErrorItemCreate(name, address, content, index)) {
			return false;
		} else if ($typeMode == 2 && !checkErrorItemEdit(name, address, index)) {
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
	$.ajax({
		type : "GET",
		url : $pathWebService + "livetv",
		cache : false,
		data : {
			action : "getlistchannel",
			idsubject : $subjectId
		},
		success : function(response) {
			resetDataTable("table-item");
			createTableItem(response);
			createDataTable("table-item");
			getItemOutSubject();
		}
	});
}

function getItemOutSubject() {
	$.ajax({
		type : "GET",
		url : $pathWebService + "livetv",
		cache : false,
		data : {
			action : "getlistchannel",
			idsubject : 0
		},
		success : function(response) {
			$listItemOut = [];
			$.each(response, function(i, item) {
				$listItemOut.push(item);
			});
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
		var id = item.idChannel;
		var name = unescape(item.name);
		var link = unescape(item.link);
		var image = item.image;
		var status = item.status;
		var idx = item.code;
		
		var row = myBody.insertRow(myBody.rows.length);
		var col1 = row.insertCell(0);
		col1.innerHTML = i + 1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = name;
		
		var col3 = row.insertCell(2);
		col3.innerHTML = link;
		
		var col4 = row.insertCell(3);
		col4.appendChild(createItemImage($pathLiveTV + image));
		
		var col5 = row.insertCell(4);
		col5.appendChild(createItemStatus(status));
		
		var col6 = row.insertCell(5);
		col6.innerHTML = idx;
		
		var col7 = row.insertCell(6);
		var btnEdit = createButton(1);
		btnEdit.setAttribute("onclick", "openEditDialog('" + id + "','" + name + "', '" + link + "', '" + image + "', '" + status + "', '" + idx + "')");
		var btnDelete = createButton(2);
		btnDelete.setAttribute("onclick", "openDeleteDialog('" + id + "', '" + name + "')");
		col7.appendChild(btnEdit);
		col7.appendChild(btnDelete);
	});
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
	destroyCropImage("item-image");
	$(".process-upload").hide();
	$("#div-item-image").attr("style", "width:0px; height:0px");
	closeMessageCheck("item-container-error");
	$("#item-title").html(getValueField("livetv-create-title"));
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
	$("#item-image").attr("style", "");
	$typeMode = 1;
}

function openEditDialog(id, name, link, image, status, idx) {
	openDialog("item-dialog");
	destroyCropImage("item-image");
	$(".process-upload").hide();
	closeMessageCheck("item-container-error");
	$("#item-title").html(getValueField("livetv-edit-title"));
	setValueField("item-name", name);
	setValueField("item-address", link);
	setValueField("item-idx", idx);
	setValueField("item-file", "");
	setValueField("item-file-name", "");
	setValueField("item-old-file-name", image);
	setValueImage("item-image", $pathLiveTV + image);
	setValueField("item-status", status);
	createStatus(status);
	$(".btn-save").html(getValueField("btn-save"));
	$("#div-item-image").attr("style", "width:135px; height:200px");
	$("#item-image").attr("style", "width:135px; height:200px");
	$itemId = id;
	$typeMode = 2;
}

function openDeleteDialog(id, name) {
	openDialog("item-delete-dialog");
	$("#item-delete").html(name);
	$itemId = id;
}

function createItem(fileName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "livetv",
		cache : false,
		data : {
			action : 'addnewchannel',
			idsubject : $subjectId,
			name : escape(getValueField("item-name")),
			link : escape(getValueField("item-address")),
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
				showMessageSuccess(getValueField("livetv-create-success"));
			} else {
				showMessageError(getValueField("livetv-create-fail"));
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
			action : 'editchannel',
			idchannel : $itemId,
			name : escape(getValueField("item-name")),
			link : escape(getValueField("item-address")),
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
				showMessageSuccess(getValueField("livetv-edit-success"));
			} else {
				showMessageError(getValueField("livetv-edit-fail"));
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
			action : 'deletechannel',
			idchannel : $itemId
		},
		success : function(response) {
			closeDialog("item-delete-dialog");
			if (response > 0) {
				getItem();
				showMessageSuccess(getValueField("livetv-delete-success"));
			} else if (response == -2) {
				showMessageError(getValueField("livetv-delete-duplicate"));
			} else {
				showMessageError(getValueField("livetv-delete-fail"));
			}
		}
	});
}

function checkErrorItemCreate(name, address, content, index) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error", getValueField("message-livetv-name"));
		return false;
	} 
	if (checkRequiredField(address)) {
		showMessageCheck("item-container-error", getValueField("message-livetv-address"));
		return false;
	} 
	if (checkRequiredField(index)) {
		showMessageCheck("item-container-error", getValueField("message-livetv-index"));
		return false;
	} 
	if (checkMaxMin(index, 1, $maxIndex + 1)) {
		showMessageCheck("item-container-error", getValueField("message-livetv-index-size") + ($maxIndex + 1));
		return false;
	}
	if (checkRequiredField(content)) {
		showMessageCheck("item-container-error", getValueField("message-image"));
		return false;
	}
	return true;
}

function checkErrorItemEdit(name, address, index) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error", getValueField("message-livetv-name"));
		return false;
	} 
	if (checkRequiredField(address)) {
		showMessageCheck("item-container-error", getValueField("message-livetv-address"));
		return false;
	} 
	if (checkRequiredField(index)) {
		showMessageCheck("item-container-error", getValueField("message-livetv-index"));
		return false;
	}
	if (checkMaxMin(index, 1, $maxIndex)) {
		showMessageCheck("item-container-error", getValueField("message-livetv-index-size") + $maxIndex);
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