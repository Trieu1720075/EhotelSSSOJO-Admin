var $modeChangePassword = 0;
$(function(){
	setHTML("span-fullName", unescape($("#hidden-fullName").val()));
});

function openProfileDialog() {
	openDialog("profile-dialog");
	closeMessageCheck("profile-container-error");
	$(".password").hide();
	$modeChangePassword = 2;
	setValueField("profile-fullName", unescape($("#hidden-fullName").val()));
	setValueField("profile-old-password", "");
	setValueField("profile-new-password", "");
	setValueField("profile-repassword", "");
}

function clickChangePassword() {
	closeMessageCheck("profile-container-error");
	if ($modeChangePassword == 1) {
		$modeChangePassword = 2;
		$(".password").hide();
	} else {
		$modeChangePassword = 1;
		$(".password").show();
	}
}

function editProfile() {
	var oldpassword = "";
	var password = "";
	var repassword = $("#profile-repassword").val();
	var fullname = $("#profile-fullName").val();
	if ($modeChangePassword == 1) {
		oldpassword = $("#profile-old-password").val();
		password = $("#profile-new-password").val();
	} else {
		oldpassword = '-1';
		password = '-1';
	}
	if (checkErrorProfile(fullname, oldpassword, password, repassword)) {
		$.ajax({
			type : "POST",
			url : $pathWebService,
			cache : false,
			data : {
				cmd : '057',
				username : $username,
				pwd : password,
				opwd : oldpassword,
				fullname : escape(fullname),
				status : 1,
				role : $("#roleIds").val()
			},
			success : function(response) {
				closeDialog("profile-dialog");
				if (response > 0) {
					showMessageSuccess("Edit your profile successfully");
					setValueField("hidden-fullName", escape($("#profile-fullName").val()));
				} else {
					showMessageError("Edit your profile failed");
				}
			}
		});
	}
}

function checkErrorProfile(fullname, oldpassword, password, repassword) {
	if (checkRequiredField(fullname)) {
		showMessageCheck("profile-container-error", "Please input full name");
		return false;
	} 
	
	if ($modeChangePassword == 2) {
		return true;
	}
	
	if (checkRequiredField(oldpassword)) {
		showMessageCheck("profile-container-error", "Please input old password");
		return false;
	} 
	
	if (checkRequiredField(password)) {
		showMessageCheck("profile-container-error", "Please input password");
		return false;
	} 
	
	if (checkRequiredField(repassword)) {
		showMessageCheck("profile-container-error", "Please input repassword");
		return false;
	} 
	
	if (oldpassword == password) {
		showMessageCheck("profile-container-error", "New password must be not match with Old password");
		return false;
	} 
	
	if (password != repassword) {
		showMessageCheck("profile-container-error", "Re-Password must be match with Password");
		return false;
	} 
	
	return true;
}
