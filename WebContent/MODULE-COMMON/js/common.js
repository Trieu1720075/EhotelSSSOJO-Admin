var $pathWebService = "";
var $pathVideo = "";
var $fileSize = 15 * 1024 * 1024;
var $fileSizeMin=1 * 1024 ;
var $typeMovies = 'VOD';
var $typeMusicVideo = 'MOD';
var $username = null;
var $checkAjaxShow = true;
var $langId = 0;
var $ip="http://"+location.hostname+":80/Image/";
var $pathLiveTV = $ip+"Livetv/";
var $pathMode = $ip+"Mode/";
var $pathVideo = $ip+"Video/";
var $pathMusic = $ip+"Music/";
var $path_image_flag = $ip+"Icon/";
var $path_image = $ip;
//var $path_image = "http://172.16.9.101:8080/";
var $path_image_background = $ip;
//var $path_link_html = 'http://ehotel.elcom.tv:80/Image/html/';
var $path_link_html = 'http://172.16.9.205:80/Image/html/';
//var $list_Main_HTML=["1","18","19","5"]; //12: viewbill , 27 service, 17: LEISURE, 34: feedback,35 housekeeping
var $list_Main_HTML=["1","18","19","12","27","17","34","35"];
var $list_Main_Exchange=["13"];
var $list_Main_Dining=["7"];
$(function() {
	$(".item-numberic").numeric();
	$pathWebService = getUrlService();
	$langId = getLanguageId();
});

jQuery(document).ajaxStart(function() {
	if ($checkAjaxShow) {
		showLoading();
	}
}).ajaxStop(function() {
	hideLoading();
});

function getUsername() {
	return $("#username-login").val();
}

function getLanguageId() {
	return $("#languageId").val();
}

function getUrlService() {
	var url = window.location.href;
	var arrUrl = url.split("/");
//	var urlService = arrUrl[0] + "//" + arrUrl[2] + "/WSeHotelAdminHTML/";
	var urlService = arrUrl[0] + "//" + arrUrl[2] + "/WS/";
	//var urlService="http://172.16.9.205:8888/WS/";
	return urlService;
}

function getUrl() {
	var url = window.location.href;
	var arrUrl = url.split("/");
	return arrUrl[0] + "//" + arrUrl[2];
}

function loadXMLString(text) {
	var xmlDocument = $.parseXML(text);
	return $(xmlDocument);
}

function loadMenu(name, action) {
	var a = document.getElementById("content-menu-current");
	a.href = action;
	a.innerHTML = name;
}

function openDialog(id) {
	$("#" + id).modal("show");
}

function closeDialog(id) {
	$("#" + id).modal("hide");
}

function checkRequiredField(value) {
	if (value == null || value.trim() == '' || value == "null"
			|| value == "undefined") {
		return true;
	}
	return false;
}

function checkMaxMin(value, min, max) {
	if (parseInt(value) < min || parseInt(value) > max) {
		return true;
	}
	return false;
}

function setValueField(id, value) {
	var item = document.getElementById(id);
	if (!checkRequiredField(value + "")) {
		item.value = value;
	} else {
		item.value = "";
	}
}

function getValueField(id) {
	var result = "";
	var item = document.getElementById(id);
	if (!checkRequiredField(item.value + "")) {
		result = item.value;
	}
	return result;
}

function setValueHTML(id, value) {
	var item = document.getElementById(id);
	if (!checkRequiredField(value + "")) {
		item.innerHTML = value;
	} else {
		item.innerHTML = "";
	}
}

function setValueImage(id, value) {
	var item = document.getElementById(id);
	if (!checkRequiredField(value)) {
		item.src = value;
	} else {
		item.src = "";
	}
}

function setValueMedia(id, value, type) {
	$("#" + id).empty();
	if (type == 1) {
		var audio = '<audio id="audio-player" class="audio-player" preload="metadata" controls autoplay><source src="' 
			+ value + '"></audio>';
		$("#" + id).append(audio); 
	} else {
		var video = '<video id="video-player" class="video-player" controls autoplay><source src="' 
			+ value + '"></video>';
		$("#" + id).append(video);
	}
}

function getStringTime(time) {
	time = Math.round(time);
	var strTime = "00:00:00";
	if (time <= 0) {
		return strTime;
	}

	var hour = parseInt(time / 3600);
	time = time - (hour * 3600);
	var minute = parseInt(time / 60);
	var second = time - (minute * 60);
	if (hour < 10) {
		hour = "0" + hour;
	}
	if (minute < 10) {
		minute = "0" + minute;
	}
	if (second < 10) {
		second = "0" + second;
	}
	var strTime = hour + ":" + minute + ":" + second;
	return strTime;
}

function getLongTime(strTime) {
	var array = strTime.split(":");
	var hours = parseInt(array[0]);
	var minutes = parseInt(array[1]);
	var seconds = parseInt(array[2]);
	return hours * 3600 + minutes * 60 + seconds;
}

function compareTime(strStartTime, strEndTime) {
	var startTime = getLongTime(strStartTime);
	var endTime = getLongTime(strEndTime);
	if (startTime > endTime || startTime == endTime) {
		return false;
	}
	return true;
}

function compareDistantTime(strStartTime1, strEndTime1, strStartTime2, strEndTime2) {
	var startTime1 = getLongTime(strStartTime1);
	var endTime1 = getLongTime(strEndTime1);
	var startTime2 = getLongTime(strStartTime2);
	var endTime2 = getLongTime(strEndTime2);
	if (startTime1 >= startTime2 && startTime1 <= endTime2) {
		return false;
	}
	if (endTime1 >= startTime2 && endTime1 <= endTime2) {
		return false;
	}
	if (startTime1 < startTime2 && endTime1 > endTime2) {
		return false;
	}
	return true;
}

function checkValidDate(txtDate) {
	if (txtDate == null || txtDate.trim() == '') {
		return false;
	}
	
	var date = txtDate.split('/');
	var month = parseInt(date[1], 10);
	var day = parseInt(date[0], 10);
	var year = parseInt(date[2], 10);
	if (month < 1 || month > 12) {
		return false;
	} else if (day < 1 || day > 31) {
		return false;
	} else if ((month == 4 || month == 6 || month == 9 || month == 11) && day >= 31) {
		return false;
	} else if (month == 2) {
		var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
		if (day > 29 || (day == 29 && !isleap)) {
			return false;
		}	
	}
	
	return true;
}

function compareDate(strFromDate, strFoDate) {
	var fromDate = strFromDate.split('/');
	var toDate = strFoDate.split('/');
	
	var date1 = new Date(fromDate[2], fromDate[1] - 1, fromDate[0]);
	var date2 = new Date(toDate[2], toDate[1] - 1, toDate[0]);
	
	if (date1 > date2) {
		return false;
	}
	
	return true;
}

function compareDateNow(strDate) {
	var arrayDate = strDate.split('/');
	var date = new Date(arrayDate[2], arrayDate[1] - 1, arrayDate[0]);
	var now = new Date();    
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
	if (date < today){
		return false;
	}
	return true;
}

function compareDateLong(time) {
	var now = new Date();    
	var timeNow = now.getTime();
	if (time < timeNow) {
		return false;
	}
	return true;
}

function createItemList(idParent, className, obj, path) {
	var div = document.createElement("div");
	div.className = "list-group-item  " + className;
	div.id = className + "-" + obj.id;
	div.setAttribute("data-id", obj.id);
	div.setAttribute('data-name', obj.name);
	div.setAttribute('data-image', obj.image);

	var img = document.createElement("img");
	var date = new Date().getTime();
	img.src = path + obj.image + '?param=' + date;
	img.setAttribute("style", "width: 40px; height: 40px; background: #f36f21; padding: 4px");
	var span = document.createElement("span");
	span.innerHTML = obj.name;
	if (obj.status == 1) {
		span.setAttribute("style", "margin-left:5px; color:red");
	} else {
		span.setAttribute("style", "margin-left:5px;");
	}
	div.appendChild(img);
	div.appendChild(span);
	document.getElementById(idParent).appendChild(div);
}

function createInput(id, type, className, value) {
	var input = document.createElement("input");
	input.id = id;
	input.setAttribute("type", type);
	input.setAttribute("class", className);
	input.setAttribute("value", value);
	return input;
}

function createInputTime(id, value) {
	var div = document.createElement("div");
	div.className = "input-append timepicker";
	var input = document.createElement("input");
	input.type = "text";
	input.id = id;
	input.className = "input-time";
	input.value = value;
	input.setAttribute("data-format", "hh:mm:ss");
	input.setAttribute("required", "required");
	input.setAttribute("maxlength", "8");
	input.setAttribute("placeholder", "hh:mm:ss");
	var span = document.createElement("span");
	span.className = "add-on";
	var i = document.createElement("i");
	i.className = "icon-time";
	i.setAttribute("data-time-icon", "icon-time");
	span.appendChild(i);
	div.appendChild(input);
	div.appendChild(span);
	return div;
}

function createInputDate(id) {
	var div = document.createElement("div");
	div.className = "input-append datepicker";
	var input = document.createElement("input");
	input.type = "text";
	input.id = id;
	input.className = "input-date";
	input.setAttribute("data-format", "dd/MM/yyyy");
	input.setAttribute("required", "required");
	input.setAttribute("maxlength", "10");
	input.setAttribute("placeholder", "dd/MM/yyyy");
	var span = document.createElement("span");
	span.className = "add-on";
	var i = document.createElement("i");
	i.className = "icon-calendar";
	i.setAttribute("data-date-icon", "icon-calendar");
	span.appendChild(i);
	div.appendChild(input);
	div.appendChild(span);
	return div;
}

function initTimePicker() {
	$('.timepicker').each(function(i, obj) {
		$(obj).datetimepicker({
			format : 'hh:mm:ss',
			language : 'en',
			pickDate : false
		});
	});
}

function initDatePicker() {
	$('.datepicker').each(function(i, obj) {
		$(obj).datetimepicker({
			format: 'dd/MM/yyyy',
			language: 'en',
			pickDate: true,
			pickTime: false
		});
		$(obj).datetimepicker('setDate', new Date());
	});
}

function initDateTimePicker() {
	$('.datetimepicker').each(function(i, obj) {
		$(obj).datetimepicker({
			format: 'dd/MM/yyyy hh:mm:ss',
			language: 'en',
			locale: 'ru',
			pickDate: true,
			pickTime: true
		});
	});
}

function createButton(mode) {
	var button = document.createElement("button");
	button.setAttribute('type', 'button');
	var i = document.createElement("i");
	if (mode == 1) {
		button.setAttribute("class", "btn btn-default btn-xs");
		i.setAttribute("class", "fa fa-pencil-square-o");
	} else if (mode == 2) {
		button.setAttribute("class", "btn btn-danger btn-xs");
		i.setAttribute("class", "fa fa-trash-o");
	} else if (mode == 3) {
		button.setAttribute("class", "btn btn-danger btn-xs");
		i.setAttribute("class", "fa fa-minus-circle");
	} else {
		button.setAttribute("class", "btn btn-primary btn-xs");
		i.setAttribute("class", "fa fa-plus-circle");
	}
	button.appendChild(i);
	return button;
}

function createButton(mode, text) {
	var t = document.createTextNode(text||"");
	var button = document.createElement("button");
	button.setAttribute('type', 'button');
	var i = document.createElement("i");
	if (mode == 1) {
		button.setAttribute("class", "btn btn-default btn-xs");
		button.setAttribute("title","Edit");
		i.setAttribute("class", "fa fa-pencil-square-o");
		
	} else if (mode == 2) {
		button.setAttribute("class", "btn btn-danger btn-xs");
		button.setAttribute("title","Delete");
		i.setAttribute("class", "fa fa-trash-o");
		
	} else if (mode == 3) {
		button.setAttribute("class", "btn btn-danger btn-xs");
		i.setAttribute("class", "fa fa-minus-circle");
	} else {
		button.setAttribute("class", "btn btn-primary btn-xs");
		i.setAttribute("class", "fa fa-plus-circle");
	}
	button.appendChild(i);
	button.appendChild(t);
	return button;
}

function checkMenuDisplay(id) {
	var display = $('#' + id).attr('class');
	if (display.indexOf("active") > -1) {
		return true;
	}
	return false;
}

function showMessageCheck(idDiv, message) {
	var div = document.getElementById(idDiv);
	div.style.display = "block";
	div.innerHTML = message;
}

function closeMessageCheck(idDiv) {
	var div = document.getElementById(idDiv);
	div.style.display = "none";
	div.innerHTML = "";
}

//upload a image file 
function previewFileImage(idDiv, idImage, idFile, idFileName, mode) {
	var image = document.getElementById(idImage);	
    var file =  document.getElementById(idFile).files[0]; 
    var fileName = document.getElementById(idFileName);	
    var _URL = window.URL || window.webkitURL;
    var file_, img;


	if (file_ = file) {
	    img = new Image();
	    img.onload = function() {
	        width=this.width;
	        height=this.height;
	        
	        var reader = new FileReader();
	        reader.readAsDataURL(file);
	    	reader.onloadend = function() {		
	    		if (file.size >= $fileSize) {
	    			image.src = "";
	    			fileName.value = "";
	    			showMessageCheck(idDiv, getValueField("message-image-size"));
	    		}
	    		else if (checkFileImgage(file)) {
	    			image.src = reader.result;
	    			fileName.value = file.name.replace(/\s/g, "_");			
	    			closeMessageCheck(idDiv);
	    			
	    			
	    			if (mode == 1) {					
	    				$("#item-image").attr("style", "");
	    				$("#div-item-image").attr("style", "");						
	    			
	    				
	    				if(width < 135 || height < 200){
	    					image.src = "";
	    					fileName.value = "";
	    					showMessageCheck(idDiv, "Please choose image with width &#8805; 135px, height &#8805; 200px");
	    					destroyCropImage("item-image");
	    				}else{
	    					closeMessageCheck(idDiv);
	    					
	    				}
	    				
	    				if (file.size < $fileSizeMin) {					
	    					image.src = "";
	    					fileName.value = "";
	    					showMessageCheck(idDiv, getValueField("message-image-size-min"));
	    					destroyCropImage("item-image");
	    				}
	    				else {
	    					$('#div-item-image').addClass('div-item-image');
	    					destroyCropImage("item-image");
	    					cropImage("item-image");
	    				}
	    			}
	    		} 
	    		else {
	    			image.src = "";
	    			fileName.value = "";
	    			showMessageCheck(idDiv, getValueField("message-image-type"));
	    		}
	    	};
	        
	    };
	    
	    
	    img.onerror = function() {};
	    img.src = _URL.createObjectURL(file_);

	}

}


//upload a image file 
/*
function previewFileImage_Rectangle(idDiv, idImage, idFile, idFileName, mode) {
	var image = document.getElementById(idImage);
    var file =  document.getElementById(idFile).files[0]; 
    var fileName = document.getElementById(idFileName);	
    var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = function() {
		if (file.size >= $fileSize) {
			image.src = "";
			fileName.value = "";
			showMessageCheck(idDiv, getValueField("message-image-size"));
		}
		else if (checkFileImgage(file)) {
			image.src = reader.result;
			fileName.value = file.name.replace(/\s/g, "_");			
			closeMessageCheck(idDiv);
			if (mode == 1) {
				$("#item-image").attr("style", "");
				$("#div-item-image").attr("style", "");
				$('#div-item-image').addClass('div-item-image');
				destroyCropImage("item-image");
				cropImage_Rectangle("item-image");
			}
		} else {
			image.src = "";
			fileName.value = "";
			showMessageCheck(idDiv, getValueField("message-image-type"));
		}
	};
}
*/

function previewFileImage_Rectangle(idDiv, idImage, idFile, idFileName, mode) {
	var image = document.getElementById(idImage);
    var file =  document.getElementById(idFile).files[0]; 
    var fileName = document.getElementById(idFileName);	
    
    
    var _URL = window.URL || window.webkitURL;
    var file_, img;
    if (file_ = file) {
    	 img = new Image();
         img.onload = function() {
        	  width=this.width;
              height=this.height;        
              var reader = new FileReader();
          	reader.readAsDataURL(file);
          	reader.onloadend = function() {
          		if (file.size >= $fileSize) {
          			image.src = "";
          			fileName.value = "";
          			showMessageCheck(idDiv, getValueField("message-image-size"));
          		}
          		else if (checkFileImgage(file)) {
          			image.src = reader.result;
          			fileName.value = file.name.replace(/\s/g, "_");			
          			closeMessageCheck(idDiv);
          			if (mode == 1) {
          				$("#item-image").attr("style", "");
          				$("#div-item-image").attr("style", "");
          			/*	var width = image.clientWidth;
          				var height = image.clientHeight;*/
          				if(width < 220 || height < 110){
          					image.src = "";
          					fileName.value = "";
          					showMessageCheck(idDiv, "Please choose image with width &#8805; 220px, height &#8805; 110px");
          					destroyCropImage("item-image");
          				}else{
          					closeMessageCheck(idDiv);
          					//$('#div-item-image').addClass('div-item-image');
          					destroyCropImage("item-image");
          					cropImage_Rectangle("item-image");
          				}
          				
          			/*	$("#item-image").attr("style", "");
          				$("#div-item-image").attr("style", "");*/
          			
          			}
          		} else {
          			image.src = "";
          			fileName.value = "";
          			showMessageCheck(idDiv, getValueField("message-image-type"));
          		}
          	};
         }
         img.onerror = function() {
             
         };
         img.src = _URL.createObjectURL(file_);
    }
}



function checkFileImgage(file) {
	var fileName = file.name;
	var arrayFileName = fileName.split('.');
	var extension = arrayFileName[arrayFileName.length - 1].toLowerCase();
	if (extension == 'jpg' || extension == 'jpeg' || extension == 'gif'
			|| extension == 'png' || extension == 'bmp') {
		return true;
	} else {
		return false;
	}
}

//upload a video file 
function previewFileVideo(idDiv, idMedia, idFile, idFileName) {
    var file = document.getElementById(idFile).files[0]; 
    var fileName = document.getElementById(idFileName);	
    var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = function() {
		if (file.size >= $fileSize) {
			fileName.value = "";
			showMessageCheck(idDiv, "File upload must be less than 15MB");
		} else if (checkFileVideo(file) > 0) {
			fileName.value = file.name.replace(/\s/g, "_");	
			$typeMediaVideo = checkFileVideo(file);
			$("#" + idMedia).empty();
			
			url = URL.createObjectURL(file);
			if ($typeMediaVideo == $typeMedia) {
				var audio = '<audio id="audio-player" class="audio-player" preload="metadata" controls autoplay><source src="' 
					+ url + '"></audio>';
				$("#" + idMedia).append(audio); 
			} else {
				var video = '<video id="video-player" class="video-player" controls autoplay><source src="' 
					+ url + '"></video>';
				$("#" + idMedia).append(video);
			}
		} else {
			fileName.value = "";
			showMessageCheck(idDiv, "File upload must be have extension follow : <br>" 
					+ "1. Audio : *.mp3, *.m4a, *.wav, *.aac, *.flac, *.webm <br>"
					+ "2. Video : *.mp4 , *.mkv, *.3gp, *.mov");
		}
	};
}

function checkFileVideo(file) {
	var fileName = file.name;
	var arrayFileName = fileName.split('.');
	var extension = arrayFileName[arrayFileName.length - 1].toLowerCase();
	if (extension == 'mp3' || extension == 'm4a' || extension == 'wav' || extension == 'aac'
			|| extension == 'flac' || extension == 'webm' ) {
		return $typeMedia;
	} else if (extension == 'mp4' || extension == 'mkv' || extension == '3gp' || extension == 'mov') {
		return $typeVideo;
	} else {
		return 0;
	}
}

function dragItem(item, gallery) {
	$(item, $(gallery)).draggable({
		revert : true,
		tolerance : 'fit',
		helper : "clone",
		cursor : "pointer",
		zIndex : 500,
	});
}

function createListItem(idParent, className, xml) {
	$('#' + idParent).empty();
	xml.find('item').each(function(i, element) {
		var id = $(element).attr("id");
		var name = unescape($(element).find("name").text());
		var note = unescape($(element).find("note").text());
		createItemList(idParent, id, className, name, note);
	});
}

function formatDate(strDate) {
	var arrayDate = strDate.split('-');
	return arrayDate[2] + "/" + arrayDate[1] + "/" + arrayDate[0];
}

function createDivName(className, name, width) {
	var div = document.createElement("div");
	div.className = className;
	div.setAttribute('title', name);
	div.setAttribute('style', "width: " + width + "%");
	div.innerHTML = name;
	return div;
}

function createDivType(className, type, width) {
	var div = document.createElement("div");
	div.className = className;
	div.setAttribute('data-type', type);
	div.setAttribute('style', "width: " + width + "%");
	return div;
}

function showMessageSuccess(message) {
	$("#body-msg-success").empty();
	$("#body-msg-success").html(message);
	openDialog("msg-success");
	setTimeout(function() {
		closeDialog("msg-success");
	}, 2000);
}

function showMessageError(message) {
	$("#body-msg-error").empty();
	$("#body-msg-error").html(message);
	openDialog("msg-error");
	setTimeout(function() {
		closeDialog("msg-error");
	}, 2000);
}

function showMessageWarning(message) {
	$("#body-msg-warning").empty();
	$("#body-msg-warning").html(message);
	openDialog("msg-warning");
	setTimeout(function() {
		closeDialog("msg-warning");
	}, 2000);
}

function createRowEmpty(id, col) {
	$("#" + id).empty();
	$("#" + id).append("<tr><td colspan='" + col + "'>No data available in table</td></tr>");
}

function showLoading() {
	$('#ajax-loading').show();
}

function hideLoading() {
	$('#ajax-loading').hide();
}

function setHTML(id, label) {
	document.getElementById(id).innerHTML = label;
}

function createDataTable(id) {
	$("#" + id).dataTable({
		"bFilter" : true,
		"iDisplayLength" : 10,
		"sPaginationType" : "full_numbers",
		"sDom" : 'T<"clear">lfrtip',
		"bAutoWidth" : true,
		"bStateSave" : true,
		"bRetrieve" : true,
		"aLengthMenu" : [ [ 10, 20, 50, 100, 200, -1 ], [ 10, 20, 50, 100, 200, "All" ] ],
		"language" : {
			"sEmptyTable":     getValueField("table-empty"),
		    "sInfo":           getValueField("table-info"),
		    "sInfoEmpty":      getValueField("table-info-empty"),
		    "sInfoFiltered":   getValueField("table-filtered"),
		    "sLengthMenu":     getValueField("table-menu"),
		    "sLoadingRecords": getValueField("table-loading"),
		    "sProcessing":     getValueField("table-processing"),
		    "sSearch":         getValueField("table-search"),
		    "sZeroRecords":    getValueField("table-record-zero"),
		    "oPaginate": {
		        "sNext":     getValueField("table-next"),
		        "sPrevious": getValueField("table-previous")
		    }
		}
	});
}

function resetDataTable(id) {
	$('#' + id).dataTable().fnClearTable();
	$('#' + id).dataTable().fnDestroy();
}

function cropImage(id) {
	$('#' + id).Jcrop({
		onChange : showCoords,
		onSelect : showCoords,
		setSelect : [ 0, 0, 135, 200 ],
		minSize : [ 135, 200 ],
		maxSize : [ 135, 200 ]
	});
}

function cropImage_Rectangle(id) {
	$('#' + id).Jcrop({
		onChange : showCoords,
		onSelect : showCoords,
		setSelect : [ 0, 0, 220, 110 ],
		minSize : [ 220, 110 ],
		maxSize : [ 220, 110 ]
	});
}
//
//function showCoords(c) {
//	var imageheight = document.getElementById('item-image').naturalHeight;
//	var imagewidth = document.getElementById('item-image').naturalWidth;
//	var xper = (c.x * 100 / jQuery('#item-image').width());
//	var yper = (c.y * 100 / jQuery('#item-image').height());
//	var wPer = (c.w * 100 / jQuery('#item-image').width());
//	var hper = (c.h * 100 / jQuery('#item-image').height());
//
//	var actX = (xper * imagewidth / 100);
//	var actY = (yper * imageheight / 100);
//	var actW = (wPer * imagewidth / 100);
//	var actH = (hper * imageheight / 100);
//	setValueField("item-cropX", parseInt(actX));
//	setValueField("item-cropY", parseInt(actY));
//	setValueField("item-cropW", parseInt(actW));
//	setValueField("item-cropH", parseInt(actH));
//};

function showCoords(c){

	var actX = c.x;
	var actY = c.y;
	var actW = c.w;
	var actH = c.h;
	
	setValueField("item-cropX", parseInt(actX));
	setValueField("item-cropY", parseInt(actY));
	setValueField("item-cropW", parseInt(actW));
	setValueField("item-cropH", parseInt(actH));
}

function destroyCropImage(id) {
	var JcropAPI = $('#' + id).data('Jcrop');
	if (JcropAPI != null) {
		JcropAPI.destroy();
	}
}

function createItemStatus(status) {
	var button = document.createElement("button"); 
	button.setAttribute('type', 'button');
	if (status == 0) {
		button.className = "status-inactive";
	} else {
		button.className = "status-active";
	}
	return button;
}

function createItemInvisible(status) {
	var button = document.createElement("button"); 
	button.setAttribute('type', 'button');
	if (status == 1) {
		button.className = "status-inactive";
	} else {
		button.className = "status-active";
	}
	return button;
}


function createItemImageMovie(image) {
	var date = new Date().getTime();
	var img = document.createElement("img");
	img.style = "width:80px; height:100px";
	img.src = image + '?param=' + date;
	return img;
}

function createItemImage(image) {
	var date = new Date().getTime();
	var img = document.createElement("img");
	img.style = "width:80px; height:50px";
	img.src = image + '?param=' + date;
	return img;
}

function createOptionSelect(id, list) {
	$("#" + id).empty();
	var select = document.getElementById(id);
	$.each(list, function(i, item) {
		var option = document.createElement("option");
		option.value = item.id;
		option.innerHTML = item.name;
		select.appendChild(option);
	});
}

function reset() {
	var inputElements = document.getElementsByTagName("input");
	for (var i = 0; i < inputElements.length; i++) {
	    if (inputElements[i].type == 'text' || inputElements[i].type == 'password') {
	        inputElements[i].value = '';
	    }
	}
}



function create_Item_Level(idParent, className, obj, path) {
	for(var i=0;i<$list_Main_Hide.length;i++){
		if(obj.id==$list_Main_Hide[i]){
			var div = document.createElement("div");
			div.className = "list-group-item " + className;
			div.id = className + "-" + obj.id;
			div.setAttribute("data-id", obj.id);
			div.setAttribute('data-name', obj.name);
			div.setAttribute('data-image', obj.image);
			div.setAttribute('data-index', obj.index);
			div.setAttribute('data-status', obj.status);
			
			var img = document.createElement("img");
			img.src = path + obj.image;
			img.setAttribute("style", "width: 40px; height: 40px; background: #f36f21; padding: 4px");
			var span = document.createElement("span");
			span.innerHTML = obj.name;
			if (obj.status == 1) {
				span.setAttribute("style", "margin-left:5px; color:red");
			} else {
				span.setAttribute("style", "margin-left:5px;");
			}
			div.appendChild(img);
			div.appendChild(span);
			document.getElementById(idParent).appendChild(div);
		}
	}
/*	if(obj.id==1 || obj.id==18 || obj.id==19){
		var div = document.createElement("div");
		div.className = "list-group-item " + className;
		div.id = className + "-" + obj.id;
		div.setAttribute("data-id", obj.id);
		div.setAttribute('data-name', obj.name);
		div.setAttribute('data-image', obj.image);
		div.setAttribute('data-index', obj.index);
		div.setAttribute('data-status', obj.status);
		
		var img = document.createElement("img");
		img.src = path + obj.image;
		img.setAttribute("style", "width: 40px; height: 40px; background: #f36f21; padding: 4px");
		var span = document.createElement("span");
		span.innerHTML = obj.name;
		if (obj.status == 1) {
			span.setAttribute("style", "margin-left:5px; color:red");
		} else {
			span.setAttribute("style", "margin-left:5px;");
		}
		div.appendChild(img);
		div.appendChild(span);
		document.getElementById(idParent).appendChild(div);
	}*/
	
}


function create_Item_Subject_HTML(idParent, className, obj, path) {
	var div = document.createElement("div");
	div.className = "list-group-item " + className;
	div.id = className + "-" + obj.id;
	div.setAttribute("data-id", obj.id);
	div.setAttribute('data-name', obj.name);
	div.setAttribute('data-image', obj.image);
	div.setAttribute('data-index', obj.index);
	div.setAttribute('data-status', obj.status);
	
	var img = document.createElement("img");
	var date = new Date().getTime();
	img.src = path + obj.image + '?param=' + date;
	img.setAttribute("style", "width: 40px; height: 40px; background: #f36f21; padding: 4px");
	var span = document.createElement("span");
	span.innerHTML = obj.name;
	if (obj.status == 1) {
		span.setAttribute("style", "margin-left:5px; color:red");
	} else {
		span.setAttribute("style", "margin-left:5px;");
	}
	div.appendChild(img);
	div.appendChild(span);
	document.getElementById(idParent).appendChild(div);
}

function create_Item_Subject_Dining(idParent, className, obj, path) {
	var div = document.createElement("div");
	div.className = "list-group-item " + className;
	div.id = className + "-" + obj.id;
	div.setAttribute("data-id", obj.id);
	div.setAttribute('data-name', obj.name);
	div.setAttribute('data-image', obj.image);
	div.setAttribute('data-index', obj.index);
	div.setAttribute('data-status', obj.status);
	
	var img = document.createElement("img");
	var date = new Date().getTime();
	img.src = path + obj.image + '?param=' + date;
	img.setAttribute("style", "width: 40px; height: 40px; background: #f36f21; padding: 4px");
	var span = document.createElement("span");
	span.innerHTML = obj.name;
	if (obj.status == 0) {
		span.setAttribute("style", "margin-left:5px; color:red");
	} else {
		span.setAttribute("style", "margin-left:5px;");
	}
	div.appendChild(img);
	div.appendChild(span);
	document.getElementById(idParent).appendChild(div);
}