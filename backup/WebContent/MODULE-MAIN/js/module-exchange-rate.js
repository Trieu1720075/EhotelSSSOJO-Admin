var $listItem = [];
var $typeMode=0;
var $itemId="0";
$(function(){
	
	Load_list_Exchange();
	
	$("#item-upload-form").submit(function() {
		var name = getValueField("item-name");
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
		}
	});
	
	var bar = $('.progress-bar');
	var percent = $('.progress-percent');
	
	$("#item-upload-form").ajaxForm({
	    beforeSend: function() {
	    	var file =  document.getElementById("item-file").files[0]; 
	    	if (file != null) {
	    		$(".process-upload").show();
	    	}else{
	    		$(".process-upload").hide();
	    	}
	    	var file_image =  document.getElementById("item-file-image").files[0]; 
	    	if (file_image != null) {
	    		$(".process-upload").show();
	    	}else{
	    		$(".process-upload").hide();
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
	        	if($typeMode == 1){
	        		addItem(response.fileName, response.fileNameImage);
	        	}else{
	        		editItem(response.fileName, response.fileNameImage);
	        	}	        
			} else {
				closeDialog("item-dialog");
				showMessageError(getValueField("item-upload-fail"));
			}
	    }
	});
	
});

function checkErrorItemCreate(name, code, buy,tranfer,sell,index) {
	
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error", getValueField("name-is-null"));
		return false;
	} 
	if (checkRequiredField(code)) {
		showMessageCheck("item-container-error", getValueField("code-is-null"));
		return false;
	} 
	if (checkRequiredField(buy)) {
		showMessageCheck("item-container-error", getValueField("buy-is-null"));
		return false;
	}
	if (checkRequiredField(tranfer)) {
		showMessageCheck("item-container-error", getValueField("tranfer-is-null"));
		return false;
	}
	if (checkRequiredField(sell)) {
		showMessageCheck("item-container-error", getValueField("sell-is-null"));
		return false;
	}
	if (checkRequiredField(index)) {
		showMessageCheck("item-container-error", getValueField("index-is-null"));
		return false;
	}
	return true;
}

function checkErrorItemEdit(name){
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error", getValueField("name-is-null"));
		return false;
	}
	return true;
}

function Load_list_Exchange(){
	$.ajax({
		type : "GET",
		url : $pathWebService+"pmsexchange",
		
		cache : false,
		data : {
			action : "getlistexchange",		
		},
		success : function(response) {		
			resetDataTable("table-item");
			createTableItem_Exchange(response);
			createDataTable("table-item");
			
		}
	});
}

function addItem(icon,image){
	var name = getValueField("item-name");
	var code =getValueField("item-code");	
	var buy =getValueField("item-buy");
	var tranfer =getValueField("item-transfer");
	var sell =getValueField("item-sell");
	var index = getValueField("item-index");	
	$.ajax({
		type : "POST",
		url : $pathWebService+"pmsexchange",
		
		cache : false,
		data : {
			action : "addexchange",	
			code:code,
			name:name,
			buy:buy,
			sell:sell,
			transfer:tranfer,
			image:image,
			icon:icon,
			invisible:"0",
			index:index,
			
		},		
		success : function(response) {		
			if(response>0){
				closeDialog("item-dialog");
				showMessageSuccess(getValueField("create-success"));
				Load_list_Exchange();
			}else{
				showMessageError(getValueField("create-fail"));
			}
			
			
		}
	});
}

function createTableItem_Exchange(data){
	$listItem = [];
	$("#tbody-item").empty();
	var myBody = document.getElementById("tbody-item");
	$.each(data, function(i, item) {
		$listItem.push(item);
		var id = item.id;
		var name = unescape(item.name);		
		var code =item.code;		
		var buy = item.buy;		
		var sell = item.sell;		
		var transfer = item.transfer;		
		var image = item.image;		
		var icon = item.icon;		
		var invisible = item.invisible;		
		var index = item.index;		
		
		var str ="'"+id+"','"+name+"','"+code+"','"+buy+"','"+sell+"','"+transfer+"','"+image+"','"+icon+"','"+invisible+"','"+index+"'";
		
		var row = myBody.insertRow(myBody.rows.length);
		var col1 = row.insertCell(0);
		col1.innerHTML = i + 1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = name;
		
		var col3 = row.insertCell(2);
		col3.innerHTML = code;
		
		var col4 = row.insertCell(3);
		col4.innerHTML = buy;
	
		var col5 = row.insertCell(4);
		col5.innerHTML = transfer;
		
		var col6 = row.insertCell(5);
		col6.innerHTML = sell;
		
		var col7 = row.insertCell(6);
		col7.appendChild(createItemImage($path_image + icon));
		
		var col8 = row.insertCell(7);
		col8.appendChild(createItemInvisible(invisible));
		
		var col9 = row.insertCell(8);
		var btnEdit = createButton(1);

		btnEdit.setAttribute("onclick", "openEditDialog(" + str + ")");
		
		var btnDelete = createButton(2);
		btnDelete.setAttribute("onclick", "openDeleteDialog('" + id + "', '" + name + "')");
		col9.appendChild(btnEdit);
		col9.appendChild(btnDelete);
	
	});
}

function openNewDialog(){
	openDialog("item-dialog");	
	$("#item-title").html(getValueField("exchange-item-title-add"));
	//destroyCropImage("item-image");
	$("#item-container-error").hide();
	$typeMode=1;
	setValueField("item-name", "");
	setValueField("item-code", "");
	setValueField("item-index", "0");
	setValueField("item-buy", "");
	setValueField("item-transfer", "");
	setValueField("item-sell", "");	
	createStatus(0);
	setValueField("item-file-name", "");
	setValueField("item-file", "");
	setValueField("item-old-file-name", "");


	//$("#item-image").attr("src", "");	
	setValueImage("item-image", "");
	$("#item-image").attr("src", "");

	$("#div-item-image").attr("style", "width:0px; height:0px");
	$("#item-image").attr("style", "");	

	//$("#item-image").attr("src", "");

	/*$("#div-item-image").attr("style", "width:0px; height:0px");
	$("#item-image").attr("style", "");*/
	

	setValueField("item-file-name-image", "");
	setValueField("item-file-image", "");
	setValueField("item-old-file-name-image", "");
	$("#item-image-image").attr("src", "");
}

function openEditDialog(id,name,code,buy,sell,transfer,image,icon,invisible,index){
	openDialog("item-dialog");	
	//destroyCropImage("item-image");
	$("#item-title").html(getValueField("exchange-item-title-edit"));
	$("#item-container-error").hide();
	$typeMode=2;
	setValueField("item-id", id);
	setValueField("item-name", name);
	setValueField("item-code", code);
	setValueField("item-index", index);
	setValueField("item-buy", buy);;
	setValueField("item-transfer",transfer);
	setValueField("item-sell", sell);	
	setValueField("item-file-name", "");
	setValueField("item-file", "");
	setValueField("item-old-file-name",icon);
	$("#item-image").attr("src", $path_image+ icon);	
	/*$("#div-item-image").attr("style", "width:135px; height:200px");
	$("#item-image").attr("style", "width:135px; height:200px");*/
	setValueField("item-file-name-image", "");
	setValueField("item-file-image", "");
	setValueField("item-old-file-name-image",image);	
	$("#item-image-image").attr("src",$path_image+ image);
	createStatus(invisible);
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

function openDeleteDialog(id,name) {
	openDialog("item-delete-dialog");
	$("#item-delete").html(name);
	$itemId = id;
	
}


function deleteItem() {
	$.ajax({
		type : "POST",
		url : $pathWebService + "pmsexchange",
		cache : false,
		data : {
			action : 'deleteexchange',
			id : $itemId,
			
		},
		success : function(response) {
			closeDialog("item-delete-dialog");
			if (response > 0) {	
				Load_list_Exchange();
				showMessageSuccess(getValueField("delete-success"));
			} else {
				showMessageError(getValueField("delete-fail"));
			}
		}
	});
}

function editItem(icon, image){
		var id = getValueField("item-id");
		var name = getValueField("item-name");
		var code =getValueField("item-code");	
		var buy =getValueField("item-buy");
		var tranfer =getValueField("item-transfer");
		var sell =getValueField("item-sell");
		var index = getValueField("item-index");	
		var invisible=getValueField("item-status");	
		$.ajax({
			type : "POST",
			url : $pathWebService+"pmsexchange",
			
			cache : false,
			data : {
				action : "editexchange",	
				id:id,
				code:code,
				name:name,
				buy:buy,
				sell:sell,
				transfer:tranfer,
				image:image,
				icon:icon,
				invisible:invisible,
				index:index,
				
			},		
			success : function(response) {		
				if(response>0){
					closeDialog("item-dialog");
					showMessageSuccess(getValueField("edit-success"));
					Load_list_Exchange();
				}else{
					showMessageError(getValueField("edit-fail"));
				}
				
				
			}
		});
}