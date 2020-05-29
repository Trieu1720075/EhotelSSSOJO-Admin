var $subjectId = 0;
var $subjectName = "";
var $subjectImage = "";
var $typeMode = 0;

$(function() {
	getItem();
	$("#subject-upload-form").submit(function() {
		var name = $("#subject-name").val();
		var image = $("#subject-file-name").val();
		if ($typeMode == 1 && !checkErrorSubjectCreate(name, image)) {
			return false;
		} else if ($typeMode == 2 && !checkErrorSubjectEdit(name)) {
			return false;
		} else {
			return true;
		}
	});

	var bar = $('.progress-bar');
	var percent = $('.progress-percent');

	$("#subject-upload-form").ajaxForm({
		beforeSend : function() {
			var file = document.getElementById("subject-file").files[0];
			if (file != null) {
				$(".process-upload").show();
			}
			var percentVal = '0%';
			bar.width(percentVal);
			percent.html(percentVal);
		},
		uploadProgress : function(event, position, total, percentComplete) {
			var percentVal = percentComplete + '%';
			bar.width(percentVal);
			percent.html(percentVal + " " + getValueField("item-uploading"));
			if (percentComplete == 100) {
				percent.html(percentVal + " " + getValueField("item-saving"));
			}
		},
		success : function(response) {
			var percentVal = '100%';
			bar.width(percentVal);
			percent.html(percentVal + " " + getValueField("item-complete"));

			if (response.status == 'SUCCESS') {
				if ($typeMode == 1) {
					createSubject(response.fileName);
				} else {
					editSubject(response.fileName);
				}
			} else {
				closeDialog("subject-dialog");
				showMessageError(getValueField("item-upload-fail"));
			}
		}
	});
});


function openNewSubjectDialog() {
	$(".div-container").show();
	$(".process-upload").hide();
	$(".panel-title").html("None");
	closeMessageCheck("subject-container-error");
	setValueField("subject-name", "");
	setValueField("subject-file", "");
	setValueField("subject-file-name", "");
	setValueField("subject-old-file-name", "");
	setValueImage("subject-image", "");
	$typeMode = 1;
	$listItemIn = [];
	createTableItemIn();
	createTableItemOut();
}

function openEditSubjectDialog() {
	if ($subjectId != 0) {
		$(".div-container").show();
		$(".process-upload").hide();
		closeMessageCheck("subject-container-error");
		setValueField("subject-name", $subjectName);
		setValueField("subject-file", "");
		setValueField("subject-file-name", "");
		setValueField("subject-old-file-name", $subjectImage);
		setValueImage("subject-image", $pathLiveTV + $subjectImage);
		$typeMode = 2;
		createTableItemIn();
		createTableItemOut();
	} else {
		showMessageWarning(getValueField("item-edit-fail"));
	}
}

function openDeleteSubjectDialog() {
	if ($subjectId != 0) {
		openDialog("subject-delete-dialog");
		$("#subject-content-delete").html($subjectName);
	} else {
		showMessageWarning(getValueField("item-delete-fail"));
	}
}

function createSubject(fileName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "livetv",
		cache : false,
		data : {
			action : 'addnewsubject',
			name : escape($("#subject-name").val()),
			image : fileName,
			listadd : createListItemInAdd()
		},
		success : function(response) {
			closeDialog("subject-dialog");
			if (response > 0) {
				getSubject(1);
				showMessageSuccess(getValueField("subject-create-success"));
			} else {
				showMessageError(getValueField("subject-create-fail"));
			}

		}
	});
}

function editSubject(fileName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "livetv",
		cache : false,
		data : {
			action : 'editsubject',
			langid : $langId,
			idsubject : $subjectId,
			name : escape($("#subject-name").val()),
			image : fileName,
			listadd : createListItemInEdit(),
			listremove : createListItemOutEdit()
		},
		success : function(response) {
			closeDialog("subject-dialog");
			if (response > 0) {
				getSubject(2);
				showMessageSuccess(getValueField("subject-edit-success"));
			} else {
				showMessageError(getValueField("subject-edit-fail"));
			}
		}
	});
}

function deleteSubject() {
	$.ajax({
		type : "POST",
		url : $pathWebService + "livetv",
		cache : false,
		data : {
			action : 'deletesubject',
			idsubject : $subjectId
		},
		success : function(response) {
			closeDialog("subject-delete-dialog");
			if (response > 0) {
				getSubject(3);
				showMessageSuccess(getValueField("subject-delete-success"));
			} else if (response == -2) {
				showMessageError(getValueField("subject-delete-fail"));
			} else {
				showMessageError(getValueField("subject-delete-duplicate"));
			}
		}
	});
}

function checkErrorSubject(name) {
	if (checkRequiredField(name)) {
		showMessageCheck("subject-container-error",
				getValueField("message-subject-name"));
		return false;
	}
	return true;
}

$(document).ready(function() {
	$('button[submit]').keydown(function(event) {
		if (event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});
});

function closeLayout() {
	$(".div-container").hide();

}

function checkErrorSubjectCreate(name, image) {
	if (checkRequiredField(name)) {
		showMessageCheck("subject-container-error",
				getValueField("message-subject-name"));
		return false;
	}
	if (checkRequiredField(image)) {
		showMessageCheck("subject-container-error",
				getValueField("message-image"));
		return false;
	}
	return true;
}

function checkErrorSubjectEdit(name) {
	if (checkRequiredField(name)) {
		showMessageCheck("subject-container-error",
				getValueField("message-subject-name"));
		return false;
	}
	return true;
}

function setOutItem(idChannel) {
	for (var i = 0; i < $listItemIn.length; i++) {
		var item = $listItemIn[i];
		if (item.idChannel == idChannel) {
			$listItemOut.push(item);
			$listItemIn.splice(i, 1);
			break;
		}
	}
	;
	createTableItemIn();
	createTableItemOut();
}

function setInItem(idChannel) {
	for (var i = 0; i < $listItemOut.length; i++) {
		var item = $listItemOut[i];
		if (item.idChannel == idChannel) {
			$listItemIn.push(item);
			$listItemOut.splice(i, 1);
			break;
		}
	}
	;
	createTableItemIn();
	createTableItemOut();
}

function createListItemInAdd() {
	var strId = "";
	for (var i = 0; i < $listItemIn.length; i++) {
		strId += $listItemIn[i].idChannel + ",";
	}
	return strId;
}

function createListItemInEdit() {
	var strId = "";
	for (var i = 0; i < $listItemIn.length; i++) {
		var check = false;
		for (var j = 0; j < $listItem.length; j++) {
			if ($listItemIn[i].idChannel == $listItem[j].idChannel) {
				check = true;
				break;
			}
		}
		if (!check) {
			strId += $listItemIn[i].idChannel + ",";
		}
	}
	return strId;
}

function createListItemOutEdit() {
	var strId = "";
	for (var i = 0; i < $listItemOut.length; i++) {
		var check = false;
		for (var j = 0; j < $listItem.length; j++) {
			if ($listItemOut[i].idChannel == $listItem[j].idChannel) {
				check = true;
				break;
			}
		}
		if (check) {
			strId += $listItemOut[i].idChannel + ",";
		}
	}
	return strId;
}
