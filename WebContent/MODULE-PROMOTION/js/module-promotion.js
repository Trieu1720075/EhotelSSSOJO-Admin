var $idItem =0;
var $listItem = [];
var $htmlName="";
var $listLanguage=[];
var $typeMode=0;
var $icon_promotion="";
$(function(){
	Load_list_Promotion();
	getListLanguage();
	
	
	$("#item-upload-form").submit(function() {
		showLoading();
		var name = getValueField("item-name");
		var def =getValueField("item-def");	
		
	/*	var name = getValueField("item-name");
		var code =getValueField("item-code");	
		var buy =getValueField("item-buy");
		var tranfer =getValueField("item-transfer");
		var sell =getValueField("item-sell");
		var index = getValueField("item-index");	
		
		if ($typeMode == 1 && !checkErrorItemCreate(name, code, buy,tranfer,sell,index)) {
			return false;
		} else if ($typeMode == 2 && !checkErrorItemEdit(name)) {
			return false;
		} else {
			return true;
		}*/
	});
	
	var bar = $('.progress-bar');
	var percent = $('.progress-percent');
	
	$("#item-upload-form").ajaxForm({
		
	    beforeSend: function() {
	    	var file =  document.getElementById("item-file").files[0]; 
	    /*	if (file != null) {
	    		$(".process-upload").show();
	    	}else{
	    		$(".process-upload").hide();
	    	}*/
	    	var filePromotion =  document.getElementById("item-file-promotion").files[0]; 
	/*    	if (filePromotion != null) {
	    		$(".process-upload").show();
	    	}else{
	    		$(".process-upload").hide();
	    	}
	        var percentVal = '0%';
	        bar.width(percentVal);
	        percent.html(percentVal);*/
	    },
	/*    uploadProgress: function(event, position, total, percentComplete) {
	        var percentVal = percentComplete + '%';
	        bar.width(percentVal);
	        percent.html(percentVal + " " + getValueField("item-uploading"));
	        if (percentComplete == 100) {
	 	        percent.html(percentVal + " " + getValueField("item-saving"));
	        }
	    },*/
	    success: function(response) {
	        var percentVal = '100%';
	        bar.width(percentVal);
	        percent.html(percentVal + " " + getValueField("item-complete"));
	        
	        if (response.status == 'SUCCESS') {	
	        	$icon_promotion=response.fileName;
	        	$("#myImg").attr("src", $path_image+response.fileNamePromotion);
	        	if($typeMode==1){	        		
	        		createFilePromotion();	
	        		//closeDialog("item-dialog");    
	        	}
	        	else{
	        		editFilePromotion();
	        		//closeDialog("item-dialog");    
	        	}
	        	      
			} else {
				closeDialog("item-dialog");
				showMessageError(getValueField("item-upload-fail"));
			}
	    }
	});
});

function Load_list_Promotion(){
	$.ajax({
		type : "GET",
		url : $pathWebService+"pmspromotion",
		
		cache : false,
		data : {
			action : "getlistpromotion",
			langid: $langId
		},
		success : function(response) {		
			resetDataTable("table-item");
			createTableItem_Promotion(response);
			createDataTable("table-item");
			
		}
	});
}

function createTableItem_Promotion(data){
	$listItem = [];
	$("#tbody-item").empty();
	var myBody = document.getElementById("tbody-item");
	$.each(data, function(i, item) {
		$listItem.push(item);
		var id = item.id;
		var name = unescape(item.name);		
		var def =unescape(item.def);			
		var image = item.image;		
		var url = item.url;		
		var invisible = item.invisible;		
		var langid = item.langid;		
		
		var str ="'"+id+"','"+name+"','"+def+"','"+image+"','"+url+"','"+invisible+"'";
		
		var row = myBody.insertRow(myBody.rows.length);
		var col1 = row.insertCell(0);
		col1.innerHTML = i + 1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = name;
		
		/*var col3 = row.insertCell(2);
		col3.innerHTML = def;*/
		
		var col3 = row.insertCell(2);
		col3.appendChild(createItemImage($path_image + image));
	
		var col4 = row.insertCell(3);
		col4.innerHTML = url;	
		
		
		var col5 = row.insertCell(4);
		col5.appendChild(createItemInvisible(invisible));
		
		var col6 = row.insertCell(5);
		var btnEdit = createButton(1);

		btnEdit.setAttribute("onclick", "openEditDialog(" + str + ")");
		
		var btnDelete = createButton(2);
		btnDelete.setAttribute("onclick", "openDeleteDialog('" + id + "', '" + name + "')");
		col6.appendChild(btnEdit);
		col6.appendChild(btnDelete);
	
	});
}

function openNewDialog(){
	$typeMode=1;
	openDialog("item-dialog");	
	$("#item-title").html(getValueField("promotion.add.title"));	
	createStatus(0);
	setValueField("item-id", "");
	setValueField("item-name", "");
	setValueField("item-def", "");
	setValueField("item-status", "0");
	setValueField("item-file-name", "");
	setValueField("item-file", "");
	//$("#item-image").attr("src", "../MODULE-PROMOTION/images/no-image.png");		
	setValueField("item-old-file-name", "");
	setValueImage("item-image", "");
	/*$("#div-item-image").attr("style", "width:0px; height:0px");
	$("#item-image").attr("style", "");*/
	
	setValueField("item-file-promotion", "");
	setValueField("item-file-name-promotion", "");
	setValueField("item-file-promotion", "");
	$("#item-image-promotion").attr("src", "");		
	setValueField("item-old-file-name-promotion", "");
	$("#myImg").attr("src", "");	
	
}

function openEditDialog(id,name,def,image,url,invisible){
	$typeMode=2;
	openDialog("item-dialog");	
	$("#item-title").html(getValueField("promotion.edit.title"));	
	var iii=url;	
	Load_file_html(iii);
	setValueField("item-id", id);
	setValueField("item-name", name);
	setValueField("item-def", def);
	setValueField("item-status", invisible);
	setValueField("item-file-name", "");
	setValueField("item-file", "");
	$("#item-image").attr("src", $path_image+image);		
	setValueField("item-old-file-name", image);
	
	setValueField("item-file-promotion", "");	
	createStatus(invisible);
	
	
}

function openDeleteDialog(id,name){
	openDialog("item-delete-dialog");
	$("#item-delete").html(name);
	$itemId = id;
}


function Load_file_html(namefile){
	 $.ajax({
	        type: "POST",
	        url: "promotion/Load_Edit_File_promotion.elcom",	
	        data : {
				'url' : namefile,				
			},   
	        success: function(response){	
	   		var data_=response.data;	 
	   		$htmlName=response.fileName;
	   		setValueField("item-old-file-name-promotion", response.fileNamePromotion);	   		
	   		$("#div_center").html(data_);	
	        },
	        error: function(x,e){
	            alert("error occur");
	        } 
	    });	
}

function deleteItem(){
	$.ajax({
		type : "POST",
		url : $pathWebService + "pmspromotion",
		cache : false,
		data : {
			action : 'deletepromotion',
			id : $itemId,
			
		},
		success : function(response) {
			closeDialog("item-delete-dialog");
			if (response > 0) {	
				Load_list_Promotion();
				//showMessageSuccess(getValueField("delete-success"));
			} else {
				showMessageError(getValueField("delete-fail"));
			}
		}
	});
}

function changeStatus() {
	if (getValueField("item-status") == 1) {
		setValueField("item-status", 0);
		createStatus(0);
	} else {
		setValueField("item-status", 1);
		createStatus(1);
	}
}

function createStatus(status) {
	var statusItem = createItemInvisible(status);
	statusItem.setAttribute("onclick", "changeStatus()");
	$("#status-td").empty();
	document.getElementById("status-td").appendChild(statusItem);
}


function createFilePromotion(){
	var meta='<link href="css/app.min.css" rel="stylesheet">';
	meta+='<link href="css/font-awesome.min.css" rel="stylesheet">';	
	meta +='<meta charset="utf-8">';	
	var data =$("#div_center").html();
	var d = new Date();
	$htmlName = time_format(d);
	// var arr = JSON.stringify($listLanguage);
	$.ajax({
        type: "POST",
        url: "promotion/createfile_promotion.elcom",	        
        cache : false,		
        data : {
			'file_data': meta+data,	
			'file_name':$htmlName,		
		//	'code':arr,
		},  		
        success: function(response){        	
        	if(response.status == 'SUCCESS'){
        		addItem();
        		
        	}
        },
        error: function(x,e){
            alert("error occur");
        } 
    });	
	 
}

function editFilePromotion(){
	var data = $("#div_center").html();

	//var arr = JSON.stringify($listLanguage);
	$.ajax({
        type: "POST",
        url: "promotion/Edit_File_promotion.elcom",	        
        cache : false,		
        data : {
			'file_data': data,	
			'file_name': $htmlName,		
			//'code':arr,
		},  		
        success: function(response){        	
        	if(response.status == 'SUCCESS'){
        		editItem();
        		
        	}
        },
        error: function(x,e){
            alert("error occur");
        } 
    });	
	 
}

function addItem(){
	var name = getValueField("item-name");
	var def =getValueField("item-def");	
	var namehtml=$htmlName+".html";
	$.ajax({
		type : "POST",
		url : $pathWebService+"pmspromotion",
		
		cache : false,
		data : {
			action : "addpromotion",		
			name: name,			
			def: def,
			image: $icon_promotion,
			url: $path_link_html + namehtml,			
			invisible:"0",
			
		},  		
        success: function(response){        	
        	if(response>0){
        		closeDialog("item-dialog");   
        		hideLoading();
        		Load_list_Promotion();
        		//showMessageSuccess(getValueField("create-success"));
        		
        	}else{
        		showMessageError(getValueField("create-fail"));
        	}
        },
        error: function(x,e){
            alert("error occur");
        } 
    });	
}

function editItem(){
	
	var id = getValueField("item-id");
	var name = getValueField("item-name");
	var def =getValueField("item-def");	
	var namehtml=$htmlName;
	var image=getValueField("item-old-file-name");
	var invisible =getValueField("item-status");

	$.ajax({
		type : "POST",
		url : $pathWebService+"pmspromotion",
		
		cache : false,
		data : {
			action : "editpromotion",		
			id:id,
			name:name,			
			def:def,
			image:$icon_promotion,
			url:$path_link_html+namehtml,			
			invisible:invisible,
			langid:$langId,
			
		},  		
        success: function(response){        	
        	if(response>0){
        		closeDialog("item-dialog");    
        		hideLoading();
        		Load_list_Promotion();
        		//showMessageSuccess(getValueField("edit-success"));
        		
        	}else{
        		showMessageError(getValueField("edit-fail"));
        	}
        },
        error: function(x,e){
            alert("error occur");
        } 
    });	
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
function getListLanguage(){
	
	$.ajax({
		type : "GET",
		url : $pathWebService + "pmslanguage",
		cache : false,
		async : true,
		data : {
			action : 'getlistlanguage',			
		},
		success : function(response) {		
			$.each(response, function(i, item) {
				var listlang = {
					id : item.idLang,
					name : unescape(item.name),
					code : unescape(item.code),
					invisible : item.invisible,					
					image:item.flagimage
				};
				$listLanguage.push(listlang);				
			});
			
		}
	});
}

function showLoading() {
	$('#ajax-loading').show();
}

function hideLoading() {
	$('#ajax-loading').hide();
}