function changePassword() {
	var currentPassword = getValueField("current-password");
	var newPassword = getValueField("new-password");
	var confirmPassword = getValueField("confirm-password");
	closeMessageCheck("item-container-error");
	
	if (checkRequiredField(currentPassword)) {
		showMessageCheck("item-container-error", getValueField("message-user-currentpass"));
		return false;
	} 
	if (checkRequiredField(newPassword)) {
		showMessageCheck("item-container-error", getValueField("message-user-newpass"));
		return false;
	} 
	if (checkRequiredField(confirmPassword)) {
		showMessageCheck("item-container-error", getValueField("message-user-confirmpass"));
		return false;
	} 
	if (newPassword !=confirmPassword) {
		showMessageCheck("item-container-error", getValueField("message-user-notmatchpass"));
		return false;
	} 
	
	var userid = getValueField("user-id").trim();
	$.ajax({
		type : "POST",
		url : $pathWebService + "user",
		cache : false,
		data : {
			action : 'changepass',
			userid : userid,
			oldpass : currentPassword,
			newpass : newPassword
		},
		success : function(response) {
			hideLoading();
			if (response > 0) {
				closeMessageCheck("item-container-error");
				showMessageSuccess(getValueField("edit-success"));
			} else {
				showMessageError(getValueField("edit-fail"));
			}
			
		},
		error : function () {
			showMessageError(getValueField("edit-success"))
		}
	});
}