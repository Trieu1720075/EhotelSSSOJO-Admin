var $itemId = 0;

$(function() {
	getConfig();
});

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
			setValueField("host", item.host);
			setValueField("port", item.port);
			setValueField("user", item.user);
			setValueField("pass", item.pass);
		}
	});
}

function editConfig() {
	if (checkErrorConfig()) {
		$.ajax({
			type : "POST",
			url : $pathWebService + "configftp",
			cache : false,
			data : {
				action : 'editftpconfig',
				host : getValueField("host"),
				port : getValueField("port"),
				user : getValueField("user"),
				pass : getValueField("pass")
			},
			success : function(response) {
				if (response > 0) {
					closeMessageCheck("item-container-error");
					showMessageSuccess(getValueField("ftp-edit-success"));
				} else {
					showMessageError(getValueField("ftp-edit-fail"));
				}
			}
		});
	}
}

function checkErrorConfig() {
	var host = getValueField("host");
	var port = getValueField("port");
	var user = getValueField("user");
	var pass = getValueField("pass");
	if (checkRequiredField(host)) {
		showMessageCheck("item-container-error", getValueField("message-ftp-host"));
		return false;
	} 
	if (checkRequiredField(port)) {
		showMessageCheck("item-container-error", getValueField("message-ftp-port"));
		return false;
	} 
	if (checkRequiredField(user)) {
		showMessageCheck("item-container-error", getValueField("message-ftp-user"));
		return false;
	} 
	if (checkRequiredField(pass)) {
		showMessageCheck("item-container-error", getValueField("message-ftp-pass"));
		return false;
	} 
	return true;
}

