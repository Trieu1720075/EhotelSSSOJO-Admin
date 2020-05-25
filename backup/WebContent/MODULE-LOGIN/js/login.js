$(document).keypress(function(e) {
    if(e.which == 13) {
    	fnLogin();
    }
});

function fnLogin(event) {
	$('.c-login-process').empty();
	var success = '<span style="font-size:14px; color: white">Login successfully</span>';
	var error = "<span style='font-size:14px; color: red'> Username or Password is invalid</span>";
	var strError = "";
	var name = $('#username').val();
	var pass = $('#password').val();
	if (name == "" && pass == "") {
		strError = "<span style='font-size:15px' class='glyphicon glyphicon-exclamation-sign glyphicon-m'> </span> <span style='font-size:15px'> Username and Password is required</span>";
		$('.c-login-process').append(strError);
		return false;
	}
	if (name == "") {
		strError = "<span style='font-size:15px' class='glyphicon glyphicon-exclamation-sign glyphicon-m'></span> <span style='font-size:15px'> Username is required</span>";
		$('.c-login-process').append(strError);
	}
	if (pass == "") {
		strError = "<span style='font-size:15px' class='glyphicon glyphicon-exclamation-sign glyphicon-m'> </span> <span style='font-size:15px'> Password is required</span>";
		$('.c-login-process').append(strError);
	}
	if (strError != "") {
		return false;
	}
	
	var url = window.location.href;
	var arrUrl = url.split("/");
//	var urlService = arrUrl[0] + "//" + arrUrl[2] + "/WSeHotelAdminHTML/";
//	var urlService = arrUrl[0] + "//" + arrUrl[2] + "/WS/";
	var urlService="http://172.16.9.188:8989/WS/";
	showLoading();
	$.ajax({
		type : "POST",
		url : urlService + "home",
		cache : false,
		data : {
			action : "checklogin",
			username : name,
			password : pass
		},
		success : function(response) {			
			if (response > 0) {
				setTimeout(function() {
					hideLoading();
					$('.c-login-process').append(success);
					setTimeout(function() {
						$.ajax({
							type : "POST",
							url : "authentication.elcom",
							cache : false,
							data : {
								userId : response,
								username : name
							},
							success : function() {			
								var width = $(window).width();
								window.location.href = "home.elcom";
							}
						});
					}, 500);
				}, 3000);
			} else {
				setTimeout(function() {
					hideLoading();
					$('.c-login-process').append(error);
				}, 3000);
				return false;
			}
		}
	});
	
	return false;
}

function showLoading() {
	$('#ajax-loading').show();
}

function hideLoading() {
	$('#ajax-loading').hide();
}