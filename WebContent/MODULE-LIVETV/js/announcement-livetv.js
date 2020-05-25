function updateAnnounceLivetv() {
	var color = getValueField("ip_color_livetv");
	var status = $('#ip_status_livetv').prop('checked') ? "1" : "0";
	var text = getValueField("txt_announcement");
	var size = getValueField("fontsize_livetv");
	var duration = getValueField("duration-livetv");
	var bg_color = $("#ip_bg_clpicker").colourpicker('value');
	
	if (checkRequiredField(text)) {
		showMessageWarning("Please input announcement ");
		return false;
	}
	
	$.ajax({
		type : "POST",
		url : $pathWebService + "livetv",
		cache : false,
		data : {
			action : 'editnotifylivetv',
			text : text,
			color : color,
			background_color : bg_color, 
			size : size,
			status : status,
			duration : duration,
			langid : $langId,

		},
		success : function(response) {
			if (response > 0) {
				showMessageSuccess(getValueField("edit-success"));
			} else {
				showMessageError(getValueField("edit-fail"));
			}
				
		},
		error : function() {
			showMessageError(getValueField("edit-fail"));
		}
	});
}

function getAnnounceLivetv() {
    $("#ip_bg_clpicker").colourpicker({
      allowAlpha: true,
      showColour: "both",
      //returnName: true
    });
    
	$.ajax({
		type : "GET",
		url : $pathWebService + "livetv",
		cache : false,
		data : {
			action : 'getnotifylivetv',
			langid : $langId,
		},
		success : function(response) {
			var res = response;
			setValueField("txt_announcement", res.text);
			setValueField("fontsize_livetv", res.size);
			setValueField("ip_color_livetv", res.color);
			setValueField("duration-livetv", res.duration || "00:05:00");
//			$("#ip_bg_clpicker").colourpicker('value',res.background_color || "#FFFFFF25")
			document.querySelector("#ip_bg_clpicker").style.backgroundColor = res.background_color || "#FFFFFF25";
			
			var status = response.status;
			if (status=="1"){
				$('#ip_status_livetv').prop('checked',true);
			}else {
				$('#ip_status_livetv').prop('checked',false);
			}
			
			$("#txt_announcement").css("color",res.color);
			document.querySelector("#txt_announcement").style.backgroundColor = res.background_color || "#FFFFFF25";
			
			initTimePicker();
		},
		error : function() {
			showMessageWarning("Get data not success");
		}
	});
}

function changeColorAnnounce() {
	var color = $("#ip_color_livetv").val();
	var bg_color = $("#ip_bg_clpicker").colourpicker('value');
	$("#txt_announcement").css("color", color);
	document.querySelector("#ip_bg_clpicker").style.backgroundColor = bg_color;
	document.querySelector("#txt_announcement").style.backgroundColor = bg_color;
	//$("#txt_announcement").css("background-color", bg_color);
}


function onchangeInputTime() {

}