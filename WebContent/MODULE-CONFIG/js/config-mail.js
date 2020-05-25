$(function(){
	var regexAddress = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;// Email address

	$('#mail-sender').tagsInput({
		width: 'auto',
		height: '50px',
		pattern: regexAddress,
		defaultText: 'Input email address',
		onAddTag : function(el){
			var length = $('#mail-sender').val().split(',').length;
			if (length >=2){
				$('#mail-sender').removeTag(el);
			}
		}
	});
	
	$('#box_mailto').tagsInput({
		width: 'auto',
		pattern: regexAddress,
		defaultText: 'Input email address'
	});
	
	$('#box_mailcc').tagsInput({
		width: 'auto',
		pattern: regexAddress,
		defaultText: 'Input email address'
	});
	
	$("#txt_content").Editor();
	
	getConfigMail();
})

function getConfigMail(){
	$.ajax({
		type : "GET",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "getconfigmail"
		},
		success : function(response) {
			var item = response;
			var security = response.secure || false;
			var signatureLink = response.footer || ($path_link_html + "/signature.html") ;
			var cc = item.cc;
			var to = item.to;
			
			$("#select-service").val(item.service).trigger("change");
			setValueField("mail-host", item.host);
			setValueField("mail-port", item.port);
			setValueField("mail-pass", item.pass);
			$("#mail-security").attr("checked", security);
			setValueField("link-file-signature", signatureLink);
			setValueField("mail-subject", item.subject);
			$("#mail-sender").addTag(item.user);
			

				
			 $.ajax({
		        type: "POST",
		        url: "tool/Load_Edit_File.elcom",	
		        data : {
					'url' : signatureLink,				
				},   
		        success: function(response){	
		        	var data = response.data;
		        	$("#mail-signature").html(data);
		        },
		        error: function(x,e){
		        	$("#mail-signature").html('');
		            showMessageError("Get file not success");
		        } 
			 });
			 
			 
			for ( let i = 0; i < cc.length ; i++ ) {
				var itemCC = cc[i];
				$("#box_mailcc").addTag(itemCC);
			}

			for ( let i = 0; i < to.length ; i++ ) {
				var itemTo = to[i];
				$("#box_mailto").addTag(itemTo);
			}
			 

			 
		},
		error : function(){
			showMessageWarning("Get data not success");
		}
	});
}

function editConfigMail() {
	closeMessageCheck("mail-container-error");
	
	var hostname = getValueField("mail-host") || '';
	var port = getValueField("mail-port") || '';
	var sender = getValueField("mail-sender") || '';
	var pass = getValueField("mail-pass") || '';
	var to = getValueField("box_mailto") || '';
	var cc = getValueField("box_mailcc");
	var subject = getValueField("mail-subject") || '';
	var signatureLink = getValueField("link-file-signature");
	var signatureFileName = signatureLink.split('/').pop();
	var service = getValueField("select-service");
	var secure = $('#mail-security').is(":checked");
	
	var signatureData = $("#mail-signature").html();
	
	if (hostname == ''){
		showMessageCheck("mail-container-error",getValueField("message-ftp-host"));
		return false;
	}

	if (port == ''){
		showMessageCheck("mail-container-error",getValueField("message-ftp-port"));
		return false;
	}
	
	if (sender == ''){
		showMessageCheck("mail-container-error",getValueField("message-mail-sender"));
		return false;
	}
	
	if (pass == ''){
		showMessageCheck("mail-container-error",getValueField("message-ftp-pass"));
		return false;
	}
	
	$.ajax({
        type: "POST",
        url: "tool/EditFileWithName.elcom",	        
        cache : false,		
        data : {
			'file_data': signatureData,	
			'fileName' : signatureFileName,
		},  		
        success: function(response){
        	console.log("Edit file html " + signatureFileName + response.result);
        },
        error: function() {
        	console.log("Edit error file signature html");
        } 
    });	
	
	$.ajax({
			type : "POST",
			url : $pathWebService + "system",
			cache : false,
			data : {
				action : 'editmailconfig',
				service : service,
				host : hostname,
				port : port,
				secure : secure,
				user : sender,
				from : sender,
				pass : pass,
				to : to,
				cc : cc,
				body: '',
				subject : subject,
				footer : signatureLink,
			},
			success : function(response) {
				if (response > 0) {
					closeMessageCheck("mail-container-error");
					showMessageSuccess(getValueField("edit-success"));
				} else {
					showMessageError(getValueField("edit-fail"));
				}
			},
			error : function (){
				showMessageError(getValueField("edit-fail"));
				console.log("HTTP Error");
			}
	})
	
	
	
}

function changeService() {
	var service = getValueField('select-service');
	if (service.toLowerCase() == 'gmail'){
		$(".sv-gmail").hide();
	}
	else {
		$(".sv-gmail").show();
	}
}

function getSignatureFile() {
	var html = $("#mail-signature").html();
	$("#txt_content").Editor("setText", html);
	openDialog("modal-signature");
}

function saveSignature() {
	var html = $("#txt_content").Editor("getText");
	$("#mail-signature").html(html);
}