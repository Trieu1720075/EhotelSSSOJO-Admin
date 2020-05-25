var signableLayout = {
	widthContainer : 1280,
	heightContainer : 720,
	rateWidth : 0,
	rateHeight : 0,
	spaceTop : 6,
	spaceLeft : 11,
	countVideo : 0,
	countImage : 0,
	countBrowser : 0,
	countLabel : 0,
	countText : 0,
	countItem : 0,
	countFile : 0,
	listItem : [],
	listItemDelete : [],
	idLayout : 0,
	nameLayout : null,
	sizeLayout : 1,
	itemFocus : null
};


var $typeVideo = 1;
var $typeImage = 3;
var $typeMedia = 4;
var $typeText = 5;
var $typeWeb = 6;
var $typeSlide = 8;

var arrayImage=[];
var $Item=""
var $ImageName="";


var $top=0;
var $left=0;
var $width=0;
var $height=0;
$(function(){
	dataFilter();
	drapdrop();
	changeResolution();
	createRowEmpty("tbody-location", 7);
	createRowEmpty("tbody-location2", 7);
});

function drapdrop() {
	var gallery = "#gallery-drap-drop";
	var container = "#" + "div-tivi";
	
	dragItem("div", gallery);
	$(container).droppable({
		accept : "#gallery-drap-drop > div",
		async:true,
		drop : function(event, ui) {
			dropItem(ui, container);
		}
	});
};
function dragItem(item, gallery) {
	$(item, $(gallery)).draggable({
		async:true,
		revert : true,
		tolerance : 'fit',
		helper : "clone",
		cursor : "pointer",
		zIndex : 500,
	});
}
function dropItem(ui, container) {
	if (revertItem(ui, container)) {
		return;
	}
	var item = ui.draggable;
	var name = "";
	var top = getTopPosition(ui.offset.top);
	var left = getLeftPosition(ui.offset.left);
	var width = getWidth(ui.helper.width());
	var height = getHeight(ui.helper.height());
	var type = getTypeId(item.attr('title'));
	var itemClone = ui.helper.clone();
	ui.helper.remove();
	var classItem = item.attr('class');
	if (classItem.indexOf("drag-video") > -1) {
		itemClone.attr('class', 'drag-video-clone');
		signableLayout.countVideo++;
		name = "Video " + signableLayout.countVideo;
	} else if (classItem.indexOf("drag-image") > -1) {
		itemClone.attr('class', 'drag-image-clone');
		signableLayout.countImage++;
		name = "Image " + signableLayout.countImage;	
	} else if (classItem.indexOf("drag-browser") > -1) {
		itemClone.attr('class', 'drag-browser-clone');
		signableLayout.countBrowser++;
		name = "Browser " + signableLayout.countBrowser;
	} else if (classItem.indexOf("drag-text-label") > -1) {
		itemClone.attr('class', 'drag-label-clone');
		signableLayout.countLabel++;
		name = "Label " + signableLayout.countLabel;
	} else if (classItem.indexOf("drag-file") > -1) {
		itemClone.attr('class', 'drag-file-clone');
		signableLayout.countFile++;
		name = "File " + signableLayout.countFile;
	} else {
		itemClone.attr('class', 'drag-text-clone');
		signableLayout.countText++;
		name = "Text " + signableLayout.countText;
	}
	
	signableLayout.countItem++;
	
	var id = 'item-' + signableLayout.countItem;
	itemClone.attr('id', id);
	itemClone.attr('title', name);
	itemClone.attr('data-type', type);
	
	itemClone.draggable({
		helper: 'original',
		containment: container,
		tolerance: 'fit',
		drag: handleDrag
	});
	
	itemClone.resizable({
		containment : container,
		autoHide : true,
		resize : handleResize,
	});
	
	itemClone.appendTo(container);
	var leftContainer = $(container).offset().left;
	var topContainer = $(container).offset().top;
	$('#' + id).css('top', (ui.offset.top - topContainer + signableLayout.spaceTop) + "px");
	$('#' + id).css('left', (ui.offset.left - leftContainer + signableLayout.spaceLeft + 15) + "px");	
	
	addItem(id, -1, name, type, top, left, width, height, 1);
	//LoadItemDropFirt(id, -1, name, type, top, left, width, height, 1);
	arrayImage.push(itemClone);
	
	var check =itemClone.attr('data-type');
	if(check=="Text"){
		AdddivText(id);
	}
	
	$('#' + id).dblclick(function(){
		if(type=="Image"){			
			LoadClickImage(id);
		}else if(type=="Video"){
			LoadClickVideo(id);
		}
});
}



function LoadClickImage(id){
	for(var i=0;i<arrayImage.length;i++){
		if(arrayImage[i].attr('id')==id){
			 var _="";		
			 Upload_Image(id);				
		}
	}
}
function LoadClickVideo(id){	
	for(var i=0;i<arrayImage.length;i++){
		if(arrayImage[i].attr('id')==id){			
			
			uploadVideo(id);
			 
		}
	}
}

function AdddivText(id){
	$("#"+id).append('<textarea rows="" cols="" ></textarea>');
}


var $path_folder_video="/home/dangtm/uploads/images/Video/";
var $ip="http://172.16.9.141";//server location.hostname
var ip ="172.16.9.141";
function uploadVideo(itemid){
	var div=itemid;
	$("input[id='file-video']").focus().click();		
	 $('#file-video').one('change', function(){	    
		 var file_video = document.getElementById("file-video");	  
		// var files=$(this).get(0).files;
		 var arr_video = [];
	    	var date_ = new Date();
	        for (var i = 0; i < file_video.files.length; i++) {   
	        	var extension= "";
	        	extension=file_video.files[i].name.split('.').pop();	        	
	        	
	        	var name_ = date_.getTime();
	        	name_+=i;	   
	        	arr_video.push($path_folder_video + name_+"."+extension);
	        	 var ip_link="http://172.16.9.141:3119/content/images/Video/"+ name_+"."+extension;
	        }
	     
      	var obj = {
	        		ip: ip ,// 172.16.9.141
	        		fileOut:arr_video ,//["/home/dangtm/uploads/images/Video/abc.mp4"]
	        		files:file_video.files,
	        		progress: function(evt){
	        			if (evt.lengthComputable) {
	        	            // calculate the percentage of upload compleed
	        	            var percentComplete = evt.loaded / evt.total;
	        	            percentComplete = parseInt(percentComplete * 100);	        	
	        	            // update the Bootstrap progress bar with the new percentage
	        	            $('.progress-bar').text(percentComplete + '%');
	        	            $('.progress-bar').width(percentComplete + '%');
	        	
	        	            // once the upload reaches 100%, set the progress bar text to done
	        	            if (percentComplete === 100) {
	        	            	// closeDialog("add-image-slide-2");
	        	              $('.progress-bar').html('Done');
	        	             
	        	            }

	        	          }
	        		},
	        		success: function(response){
	        			console.log('@author DangTM ELCOM --> Upload successful!\n' + response);
	        			var html='<video id="myVideo" width="100%" height="100%" controls>';
	        				html +='<source src="'+ip_link+'" type="video/mp4;codecs=avc1.42E01E, mp4a.40.2">';
	        			html +=' Your browser does not support the video tag.';
	        			html+='</video>';	        			
	        			$("#"+div).append(html);
	        		}, 
	        		error: function(){
	        		}
	        };
	        $('#file-video').Upload(obj);	
	    });
	 $('#file-video').val('');
}

function revertItem(ui, container) {
	var left = $('#' + "div-tivi").offset().left;
	var top = $('#' + "div-tivi").offset().top;
	
	if ((ui.offset.left + 1) < left || ui.offset.top < top 
			|| getLeftPosition(ui.offset.left + ui.helper.width()) > (signableLayout.widthContainer + 2)
			|| getTopPosition(ui.offset.top + ui.helper.height()) - 7 > signableLayout.heightContainer) {
		return true;
	}
	return false;
};

function getLeftPosition(left) {
	var result = 0;
	var leftContainer = $('#' + "div-tivi").offset().left;
	result = (left - leftContainer) * signableLayout.rateWidth;
	
	if (result < 0) {
		return 0;
	}
	return (Math.round(result));
}
function getTopPosition(top) {
	var result = 0;
	var topContainer = $('#' + "div-tivi").offset().top;
	result = (top - topContainer) * signableLayout.rateHeight;
	
	if (result < 0) {
		return 0;
	}
	return (Math.round(result));
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

function getHeight(height) {
	return (Math.round(height * signableLayout.rateHeight));
}

function getWidth(width) {
	return (Math.round(width * signableLayout.rateWidth));
}

function getTypeId(name) {
	var result = 0;
	switch(name){
		case "Video": 
			result = "Video";
			break;
		case "Media": 
			result = "Media";
			break;
		case "Image": 
			result = "Image";
			break;
		case "Browser": 
			result = "Browser";
			break;
		case "Text": 
			result = "Text";
			break;
		case "Slide": 
			result = "Slide";
			break;
		case "Label": 
			result = "Label";
			break;
		case "File": 
			result = "File";
			break;
	}
	return result;
}

function handleDrag(event, ui) {
	var id = ui.helper.attr('id');
	var left = getLeftPosition(ui.offset.left);
	var top = getTopPosition(ui.offset.top);
	var width = $('#' + id + '-width').val();
	var height = $('#' + id + '-height').val();
	var elementX = '#' + id + '-left';
	var elementY = '#' + id + '-top';
	$(elementX).val(left);
	$(elementY).val(top);

	$.each(signableLayout.listItem, function(i, item) {
		if (item.idItem == id) {
			var itemClone = item;
			itemClone.top = String(top);
			itemClone.left = String(left);
			itemClone.width = String(width);
			itemClone.height = String(height);
			signableLayout.listItem[i] = itemClone;
			
			
			/*var name= ui.helper.attr('title');
			var type= ui.helper.attr('data-type');
			var myTable = document.getElementById("tbody-location2");

			$("#tbody-location2").empty();

			
			var rowContent = myTable.insertRow(myTable.rows.length);
			rowContent.setAttribute('data-id', id);
			var colContent1 = rowContent.insertCell(0);
			colContent1.innerHTML = "1";//signableLayout.countItem;
			
			var colContent2 = rowContent.insertCell(1);
			var inputName = createInput(id + "-name", "text", "input-text", name);
			inputName.setAttribute('style', 'width:70px !important');
			inputName.setAttribute('onchange', 'updateItemName(this)');
			colContent2.appendChild(inputName);
			
			var colContent3 = rowContent.insertCell(2);
			colContent3.innerHTML = type;//getTypeName(type);
			
			var colContent4 = rowContent.insertCell(3);
			var inputLeft = createInput(id + "-left", "text", "input-num", left);
			inputLeft.setAttribute('onchange', 'updatePosition(this)');
			colContent4.appendChild(inputLeft);
			
			var colContent5 = rowContent.insertCell(4);
			var inputTop = createInput(id + "-top", "text", "input-num", top);
			inputTop.setAttribute('onchange', 'updatePosition(this)');
			colContent5.appendChild(inputTop);
			
			var colContent6 = rowContent.insertCell(5);
			var inputWidth = createInput(id + "-width", "text", "input-num", itemClone.width);
			inputWidth.setAttribute('onchange', 'updatePosition(this)');
			colContent6.appendChild(inputWidth);
			
			var colContent7 = rowContent.insertCell(6);
			var inputHeight = createInput(id + "-height", "text", "input-num", itemClone.height);
			inputHeight.setAttribute('onchange', 'updatePosition(this)');
			colContent7.appendChild(inputHeight);
			*/
			
		}
	});
	
	

};

function handleResize(event, ui) {
	var id = ui.originalElement.attr('id');
	//alert("id "+id);
	var left = $('#' + id + '-left').val();
	var top = $('#' + id + '-top').val();
	var width = getWidth(ui.size.width);
	var height = getHeight(ui.size.height);
	var name= ui.originalElement.attr('title');
	//alert("name "+name);
	var type= ui.originalElement.attr('data-type');
	//alert("type "+type);
	var elementW = '#' + id + '-width';
	var elementH = '#' + id + '-height';
	$(elementW).val(width);
	$(elementH).val(height);
	
	
	$.each(signableLayout.listItem, function(i, item) {
		if (item.idItem == id) {
			var itemClone = item;
			itemClone.top = String(top);
			itemClone.left = String(left);
			itemClone.width = String(width);
			itemClone.height = String(height);
			signableLayout.listItem[i] = itemClone;
			
			/*var myTable = document.getElementById("tbody-location2");
			$("#tbody-location2").empty();
		
			
			var rowContent = myTable.insertRow(myTable.rows.length);
			rowContent.setAttribute('data-id', id);
			var colContent1 = rowContent.insertCell(0);
			colContent1.innerHTML =1 //signableLayout.countItem;
			
			var colContent2 = rowContent.insertCell(1);
			var inputName = createInput(id + "-name", "text", "input-text", name);
			inputName.setAttribute('style', 'width:70px !important');
			inputName.setAttribute('onchange', 'updateItemName(this)');
			colContent2.appendChild(inputName);
			
			var colContent3 = rowContent.insertCell(2);
			colContent3.innerHTML = type;//getTypeName(type);
			
			var colContent4 = rowContent.insertCell(3);
			var inputLeft = createInput(id + "-left", "text", "input-num", left);
			inputLeft.setAttribute('onchange', 'updatePosition(this)');
			colContent4.appendChild(inputLeft);
			
			var colContent5 = rowContent.insertCell(4);
			var inputTop = createInput(id + "-top", "text", "input-num", top);
			inputTop.setAttribute('onchange', 'updatePosition(this)');
			colContent5.appendChild(inputTop);
			
			var colContent6 = rowContent.insertCell(5);
			var inputWidth = createInput(id + "-width", "text", "input-num", signableLayout.listItem[i].w);
			inputWidth.setAttribute('onchange', 'updatePosition(this)');
			colContent6.appendChild(inputWidth);
			
			var colContent7 = rowContent.insertCell(6);
			var inputHeight = createInput(id + "-height", "text", "input-num", height);
			inputHeight.setAttribute('onchange', 'updatePosition(this)');
			colContent7.appendChild(inputHeight);
			
	
			
			$('.input-num').numeric({});*/
		}
	});

		
			
			
			
			
		}

function Upload_Image(id){	
	var $path_folder_image="/home/dangtm/uploads/images/";
	var $ip="http://172.16.9.141";//server location.hostname
	var ip ="172.16.9.141";
	$("input[id='item-file']").focus().click();		
	 $('#item-file').one('change', function(){	   
		 var ip_link="";
	    	var file = document.getElementById("item-file");	   
	    	
	    	var arr = [];
	    	var date = new Date();
	        for (var i = 0; i < file.files.length; i++) {   
	        	var extension= "";
	        	extension=file.files[i].name.split('.').pop();	        	
	        	var name = date.getTime();
	        	name+=i;	   
	        	arr.push($path_folder_image + name+"."+extension);
	        	//ip_link="'http://172.16.9.141:3119/content/images/'"+"'"+name+"'"+"."+"'"+extension+"'";
	        	 ip_link="http://172.16.9.141:3119/content/images/"+ name+"."+extension;
	        }
	        
    	var obj = {
	        		ip: ip,// 172.16.9.141
	        		fileOut: arr,
	        		files: file.files,
	        		progress: function(evt){
	        			if (evt.lengthComputable) {
	        	            // calculate the percentage of upload compleed
	        	            var percentComplete = evt.loaded / evt.total;
	        	            percentComplete = parseInt(percentComplete * 100);	        	
	        	            // update the Bootstrap progress bar with the new percentage
	        	            $('.progress-bar').text(percentComplete + '%');
	        	            $('.progress-bar').width(percentComplete + '%');
	        	
	        	            // once the upload reaches 100%, set the progress bar text to done
	        	            if (percentComplete === 100) {
	        	            	// closeDialog("add-image-slide-2");
	        	              $('.progress-bar').html('Done');
	        	             
	        	            }

	        	          }
	        		},
	        		success: function(response){
	        			console.log('@author DangTM ELCOM --> Upload successful!\n' + response);
	        			$("#"+id).css('background-image',"url("+ip_link+")")	;
	        		}, 
	        		error: function(){
	        		}
	        };
	        $('#item-file').Upload(obj);	
	    });
	 $('#item-file').val('');
	
}


function time_format(d) {
	day =format_two_digits(d.getDay()+1);
    hours = format_two_digits(d.getHours());
    minutes = format_two_digits(d.getMinutes());
    seconds = format_two_digits(d.getSeconds());
   
    return day+hours +minutes + seconds;
}

function format_two_digits(n) {
    return n < 10 ? '0' + n : n;
}

function addItem(idItem, id, name, type, top, left, width, height, mode) {
	var myTable = document.getElementById("tbody-location");
	if (signableLayout.countItem == 1) {
		$("#tbody-location").empty();
	}
	
	var rowContent = myTable.insertRow(myTable.rows.length);
	rowContent.setAttribute('data-id', idItem);
	var colContent1 = rowContent.insertCell(0);
	colContent1.innerHTML = signableLayout.countItem;
	
	var colContent2 = rowContent.insertCell(1);
	var inputName = createInput(idItem + "-name", "text", "input-text", name);
	inputName.setAttribute('style', 'width:70px !important');
	inputName.setAttribute('onchange', 'updateItemName(this)');
	colContent2.appendChild(inputName);
	
	var colContent3 = rowContent.insertCell(2);
	colContent3.innerHTML = type;//getTypeName(type);
	
	var colContent4 = rowContent.insertCell(3);
	var inputLeft = createInput(idItem + "-left", "text", "input-num", left);
	inputLeft.setAttribute('onchange', 'updatePosition(this)');
	colContent4.appendChild(inputLeft);
	
	var colContent5 = rowContent.insertCell(4);
	var inputTop = createInput(idItem + "-top", "text", "input-num", top);
	inputTop.setAttribute('onchange', 'updatePosition(this)');
	colContent5.appendChild(inputTop);
	
	var colContent6 = rowContent.insertCell(5);
	var inputWidth = createInput(idItem + "-width", "text", "input-num", width);
	inputWidth.setAttribute('onchange', 'updatePosition(this)');
	colContent6.appendChild(inputWidth);
	
	var colContent7 = rowContent.insertCell(6);
	var inputHeight = createInput(idItem + "-height", "text", "input-num", height);
	inputHeight.setAttribute('onchange', 'updatePosition(this)');
	colContent7.appendChild(inputHeight);
	
	if (mode == 1) {
		var object = {};
		object['idItem'] = idItem;
		object['idcontent'] = String(id);
		object['name'] = name;
		object['type'] = String(type);
		object['left'] = String(left);
		object['top'] = String(top);
		object['width'] = String(width);
		object['height'] = String(height);
		signableLayout.listItem.push(object);
	}
	
	$('.input-num').numeric({});
}

function createInput(id, type, className, value) {
	var input = document.createElement("input");
	input.id = id;
	input.setAttribute("type", type);
	input.setAttribute("class", className);
	input.setAttribute("value", value);
	return input;
}

function getTypeName(code) {
	var result = "";
	code = parseInt(code);
	switch(code){
		case $typeVideo: 
			result = "Video";
			break;
		case $typeMedia: 
			result = "Media";
			break;
		case $typeImage: 
			result = "Image";
			break;
		case $typeWeb: 
			result = "Browser";
			break;
		case $typeText: 
			result = "Text";
			break;
		case $typeSlide: 
			result = "Slide";
			break;
	}
	return result;
}

function changeResolution() {
	var container = document.getElementById("div-tivi");
	var widthReality = container.clientWidth - 2;
	var heightReality = container.clientHeight - 2;
	signableLayout.rateWidth = signableLayout.widthContainer / widthReality;
	signableLayout.rateHeight = signableLayout.heightContainer / heightReality;
};

function updatePosition($this) {
	var id = $($this).parent().parent().attr('data-id');
	var top = parseInt($('#' + id + "-top").val());
	var left = parseInt($('#' + id + "-left").val());
	var width = parseInt($('#' + id + "-width").val());
	var height = parseInt($('#' + id + "-height").val());
	var check = false;
	var message = "";
	$('#' + id + "-top").removeAttr("style");
	$('#' + id + "-left").removeAttr("style");
	$('#' + id + "-width").removeAttr("style");
	$('#' + id + "-height").removeAttr("style");

	if((top + height) > signableLayout.heightContainer){
		$('#' + id + "-top").attr("style", "border: 1px solid #FF0000 !important");
		$('#' + id + "-height").attr("style", "border: 1px solid #FF0000 !important");
		message += "Max height of screen : " + signableLayout.heightContainer + "</br>";
		check = true;
	} else {
		$('#' + id).css('top', getMaskTop(top) + "px");
		$('#' + id).css('height', getMaskHeight(height) + "px");
	}
	
	if((left + width) > signableLayout.widthContainer) {
		$('#' + id + "-left").attr("style", "border: 1px solid #FF0000 !important");
		$('#' + id + "-width").attr("style", "border: 1px solid #FF0000 !important");
		message += "Max width of screen : " + signableLayout.widthContainer;
		check = true;
	} else {
		$('#' + id).css('left', getMaskLeft(left) + "px");
		$('#' + id).css('width', getMaskWidth(width) + "px");
	}
	
	if (!check) {
		$.each(signableLayout.listItem, function(i, item) {
			if (item.idItem == id) {
				var itemClone = item;
				itemClone.top = String(top);
				itemClone.left = String(left);
				itemClone.width = String(width);
				itemClone.height = String(height);
				signableLayout.listItem[i] = itemClone;
			}
		});
	} else {
		showMessageWarning(message);
	}
	
	signableLayout.itemFocus = id;
}

function getMaskTop(top){
	var result = 0;
	result = top/signableLayout.rateHeight;
	
	if(result < 0){
		return 0;
	}
	return (Math.round(result));
}

function getMaskWidth(width) {
	return (Math.round(width / signableLayout.rateWidth));
}

function getMaskHeight(height){
	return (Math.round(height / signableLayout.rateHeight));
}

function getMaskLeft(left){
	var result = 0;
	result = left/signableLayout.rateWidth;
	
	if(result < 0){
		return 0;
	}
	return (Math.round(result));
}

function updateItemName($this) {
	var id = $($this).parent().parent().attr('data-id');
	var value = $($this).val();
	$('#' + id).attr("title", value);
	
	$.each(signableLayout.listItem, function(i, item) {
		if (item.idItem == id) {
			var itemClone = item;
			itemClone.name = value;
			signableLayout.listItem[i] = itemClone;
		}
	});
	signableLayout.itemFocus = id;
}


function dataFilter() {
	$('.dropdown-menu-resolution li a').on('click', function() {
		var width = $(this).attr('data-width');
		var height = $(this).attr('data-height');
		var value = $(this).attr('data-value');
		signableLayout.sizeLayout = value;
		signableLayout.widthContainer = parseInt(width);
		signableLayout.heightContainer = parseInt(height);
		changeResolution();
		changeTableResolution();
		
		if ("1" == value) {
			$('.keep-open-resolution button span:first').text('HD 1280x720');
		} else if ("2" == value) {
			$('.keep-open-resolution button span:first').text('Full HD 1920x1080');
		} else if ("3" == value) {
			$('.keep-open-resolution button span:first').text('2K 2048x1080');
		} else {
			$('.keep-open-resolution button span:first').text('4K 3840x2160');
		}
	});
};

function changeTableResolution() {
	var table = document.getElementById("tbody-location");
	for (var i = 0; i < table.rows.length; i++) {
		var id = table.rows[i].getAttribute("data-id");
		var left = getLeftPosition($("#" + id).offset().left);
		var top = getTopPosition($("#" + id).offset().top);
		var width = getWidth($("#" + id).width());
		var height = getHeight($("#" + id).height());
		var elementLeft = '#' + id + '-left';
		var elementTop = '#' + id + '-top';
		var elementWidth = '#' + id + '-width';
		var elementHeight = '#' + id + '-height';
		$(elementLeft).val(left);
		$(elementTop).val(top);
		$(elementWidth).val(width);
		$(elementHeight).val(height);

		var item = signableLayout.listItem[i];
		item.top = String(top);
		item.left = String(left);
		item.width = String(width);
		item.height = String(height);
		signableLayout.listItem[i] = item;
	}
} 

function createRowEmpty(id, col) {
	$("#" + id).empty();
	$("#" + id).append("<tr><td colspan='" + col + "'>No data available in table</td></tr>");
}



function createNewLayout(){
	signableLayout.countVideo = 0;
	signableLayout.countImage = 0;
	signableLayout.countBrowser = 0;
	signableLayout.countText = 0;
	signableLayout.countItem = 0;
	signableLayout.listItem = [];
	$("#div-tivi").empty();
	$("#tbody-location").empty();
	createRowEmpty("tbody-location", 7);
	createRowEmpty("tbody-location2", 7);
}


function LoadItemDropFirt(idItem, id, name, type, top, left, width, height, mode) {
	$("#tbody-location2").empty();
	var myTable = document.getElementById("tbody-location2");
	if (signableLayout.countItem == 1) {
		$("#tbody-location2").empty();
	}
	
	var rowContent = myTable.insertRow(myTable.rows.length);
	rowContent.setAttribute('data-id', idItem);
	var colContent1 = rowContent.insertCell(0);
	colContent1.innerHTML = "1";
	
	var colContent2 = rowContent.insertCell(1);
	var inputName = createInput(idItem + "-name", "text", "input-text", name);
	inputName.setAttribute('style', 'width:70px !important');
	inputName.setAttribute('onchange', 'updateItemName(this)');
	colContent2.appendChild(inputName);
	
	var colContent3 = rowContent.insertCell(2);
	colContent3.innerHTML = type;//getTypeName(type);
	
	var colContent4 = rowContent.insertCell(3);
	var inputLeft = createInput(idItem + "-left", "text", "input-num", left);
	inputLeft.setAttribute('onchange', 'updatePosition(this)');
	colContent4.appendChild(inputLeft);
	
	var colContent5 = rowContent.insertCell(4);
	var inputTop = createInput(idItem + "-top", "text", "input-num", top);
	inputTop.setAttribute('onchange', 'updatePosition(this)');
	colContent5.appendChild(inputTop);
	
	var colContent6 = rowContent.insertCell(5);
	var inputWidth = createInput(idItem + "-width", "text", "input-num", width);
	inputWidth.setAttribute('onchange', 'updatePosition(this)');
	colContent6.appendChild(inputWidth);
	
	var colContent7 = rowContent.insertCell(6);
	var inputHeight = createInput(idItem + "-height", "text", "input-num", height);
	inputHeight.setAttribute('onchange', 'updatePosition(this)');
	colContent7.appendChild(inputHeight);
	
	if (mode == 1) {
		var object = {};
		object['idItem'] = idItem;
		object['idcontent'] = String(id);
		object['name'] = name;
		object['type'] = String(type);
		object['left'] = String(left);
		object['top'] = String(top);
		object['width'] = String(width);
		object['height'] = String(height);
		signableLayout.listItem.push(object);
	}
	
	$('.input-num').numeric({});
}
