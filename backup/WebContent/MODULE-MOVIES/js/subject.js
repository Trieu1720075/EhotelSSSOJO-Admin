var $subjectId = 0;
var $subjectName = "";
var $subjectImage = "";
var $subjectStatus = 0;
var $typeMode = 0;

$(function() {
	getSubject(-1);
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
	    beforeSend: function() {
	    	var file =  document.getElementById("subject-file").files[0]; 
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

function getSubject(mode) {
	$.ajax({
		type : "GET",
		url : $pathWebService + "vod",
		cache : false,
		async : true,
		data : {
			action : 'getlistsubject',
			langid : $langId,
			type : $typeMovies
		},
		success : function(response) {
			$('#div-list-group').empty();
			var listSubject = [];
			if (response.length > 0) {
				$.each(response, function(i, item) {
					var obj = {
						id : item.id,
						name : unescape(item.name),
						image : unescape(item.image),
						index : item.index,
						status : item.invisible
					};
					listSubject.push(obj);
					createItemList("div-list-group", "item-subject", obj, $pathVideo);
				});
				
				if (mode == 1) {
					$('.item-subject:last').addClass("item-selected");
				} else if (mode == 2) {
					$("#item-subject-" + $subjectId).addClass("item-selected");
				} else {
					$('.item-subject:first').addClass("item-selected");
				}
				
				$subjectId = $('.item-selected').attr("data-id");
				$subjectName = $('.item-selected').attr("data-name");
				$subjectImage = $('.item-selected').attr("data-image");
				$subjectStatus = $('.item-selected').attr("data-status");
				$(".panel-title").html($subjectName);
				getItem();
				closeLayout();
				createOptionSelect("item-subject", listSubject);
				
				$('.item-subject').click(function(e) {
					$('.item-subject').removeClass("item-selected");
					$(this).addClass("item-selected");
					$subjectId = $('.item-selected').attr("data-id");
					$subjectName = $('.item-selected').attr("data-name");
					$subjectImage = $('.item-selected').attr("data-image");
					$subjectStatus = $('.item-selected').attr("data-status");
					$(".panel-title").html($subjectName);
					getItem();
					closeLayout();
				});
			}
		}
	});
}

function openNewSubjectDialog() {
	openDialog("subject-dialog");
	$(".process-upload").hide();
	$("#subject-title").html(getValueField("subject-create-title"));
	closeMessageCheck("subject-container-error");
	setValueField("subject-name", "");
	setValueField("subject-file", "");
	setValueField("subject-file-name", "");
	setValueField("subject-old-file-name", "");
	setValueImage("subject-image", "");
	setValueField("subject-status", 0);
	createStatusSubject(0);
	$(".btn-save").html(getValueField("btn-create"));
	$typeMode = 1;
}

function openEditSubjectDialog() {
	if ($subjectId != 0) {
		openDialog("subject-dialog");
		$(".process-upload").hide();
		$("#subject-title").html(getValueField("subject-edit-title"));
		closeMessageCheck("subject-container-error");
		setValueField("subject-name", $subjectName);
		setValueField("subject-file", "");
		setValueField("subject-file-name", "");
		setValueField("subject-old-file-name", $subjectImage);
		setValueImage("subject-image", $pathVideo + $subjectImage);
		setValueField("subject-status", $subjectStatus);
		createStatusSubject($subjectStatus);
		$(".btn-save").html(getValueField("btn-save"));
		$typeMode = 2;
	}  else {
		showMessageWarning(getValueField("item-edit-fail"));
	}
}

function openDeleteSubjectDialog() {
	if ($subjectId != 0) {
		openDialog("subject-delete-dialog");
		$("#subject-content-delete").html($subjectName);
	}  else {
		showMessageWarning(getValueField("item-delete-fail"));
	}
}

function createSubject(fileName) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "vod",
		cache : false,
		data : {
			action : 'addsubject',
			name : escape(getValueField("subject-name")),
			image : fileName,
			invisible : getValueField("subject-status"),
			type : $typeMovies
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
		url : $pathWebService + "vod",
		cache : false,
		data : {
			action : 'editsubject',
			langid : $langId,
			idsubject : $subjectId,
			name : escape(getValueField("subject-name")),
			image : fileName,
			invisible : getValueField("subject-status"),
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
		url : $pathWebService + "vod",
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
		showMessageCheck("subject-container-error", getValueField("message-subject-name"));
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
		showMessageCheck("subject-container-error", getValueField("message-subject-name"));
		return false;
	} 
	if (checkRequiredField(image)) {
		showMessageCheck("subject-container-error", getValueField("message-image"));
		return false;
	}
	return true;
}

function checkErrorSubjectEdit(name) {
	if (checkRequiredField(name)) {
		showMessageCheck("subject-container-error", getValueField("message-subject-name"));
		return false;
	} 
	return true;
}

function changeStatusSubject() {
	if (getValueField("subject-status") == 1) {
		setValueField("subject-status", 0);
		createStatusSubject(0);
	} else {
		setValueField("subject-status", 1);
		createStatusSubject(1);
	}
}

function createStatusSubject(status) {
	var statusItem = createItemInvisible(status);
	statusItem.setAttribute("onclick", "changeStatusSubject()");
	$("#status-subject-td").empty();
	document.getElementById("status-subject-td").appendChild(statusItem);
}
