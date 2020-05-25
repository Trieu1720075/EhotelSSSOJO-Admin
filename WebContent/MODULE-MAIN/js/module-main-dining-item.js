/////////////////////////////////////////////////////////////////////////////////////////////////////////
//cho nay viet cho ham load item dining
var $typeMode=0;
var $ItemID=0;
var $listItem = [];
$(function(){
	$("#item-upload-form-dining").submit(function() {
		var name = getValueField("item-name-dining");		
		var image = getValueField("item-file-name-dining");	
	
		if ($typeMode == 1 && !checkErrorItemCreate(name, image)) {
			return false;
		} else if ($typeMode == 2 && !checkErrorItemEdit(name)) {
			return false;
		} else {
			return true;
		}
	});
	
	var bar = $('.progress-bar');
	var percent = $('.progress-percent');
	
	$("#item-upload-form-dining").ajaxForm({
	    beforeSend: function() {
	    	var fileDining =  document.getElementById("item-file-dining").files[0]; 
	    	if (fileDining != null) {
	    		$(".process-upload").show();
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
	        	if ($typeMode == 1) {
					createItemDining(response.fileName);
				} else {
					editItemDining(response.fileName);
				}
			} else {
				closeDialog("item-dialog");
				showMessageError(getValueField("item-upload-fail"));
			}
	    }
	});
});

function checkErrorItemCreate(name, image) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error-dining", getValueField("name-is-null"));
		return false;
	} 
	if (checkRequiredField(image)) {
		showMessageCheck("item-container-error-dining", getValueField("image-is-null"));
		return false;
	} 
	return true;
}

function checkErrorItemEdit(name) {
	if (checkRequiredField(name)) {
		showMessageCheck("item-container-error", getValueField("name-is-null"));
		return false;
	}
	return true;
}


function Load_list_Item_Dining(){
	$.ajax({
		type : "GET",
		url : $pathWebService+"pmsdining",
		
		cache : false,
		data : {
			action : "getitemdining",	
			itemid:$id_lever_one,
			langid:$langId,
		},
		success : function(response) {		
			resetDataTable("table-item");
			createTableItem_Dining(response);
			createDataTable("table-item");
			
		}
	});
}


function createTableItem_Dining(data){
	$listItem = [];
	$("#tbody-item").empty();
	var myBody = document.getElementById("tbody-item");
	$.each(data, function(i, item) {
		$listItem.push(item);
		var id = item.id;
		var name = unescape(item.name);		
		var def =unescape(item.def);		
		var active = item.active;		
		var price = item.price;		
		var iunit = item.iunit;		
		var image = item.image;	
		var index = item.index;	
		if(index=='null' ||index==null|| index=="" || index=="undefined"){
			index=0;
		}
		
		$ItemID=item.id;
	
		var subjectId = item.subjectId;		
		var langid = item.langid;		
		
		var str ="'"+id+"','"+unescape(name)+"','"+unescape(def)+"','"+active+"','"+price+"','"+iunit+"','"+image+"','"+subjectId+"','"+langid+"','"+index+"'";
		
		var row = myBody.insertRow(myBody.rows.length);
		var col1 = row.insertCell(0);
		col1.innerHTML = i + 1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = name;
		
		
		var col3 = row.insertCell(2);
		col3.appendChild(createItemImage($path_image + image));
		
		var col4 = row.insertCell(3);
		col4.appendChild(createItemInvisible_Dining(active));
		
		var col5 = row.insertCell(4);
		var btnEdit = createButton(1);

		btnEdit.setAttribute("onclick", "openEditDialog(" + str + ")");
		
		var btnDelete = createButton(2);
		btnDelete.setAttribute("onclick", "openDeleteDialog('" + id + "', '" + name + "')");
		col5.appendChild(btnEdit);
		col5.appendChild(btnDelete);
		
		
	
	});
}


function openDeleteDialog(id,name) {
	openDialog("delete-dialog-item");
	$("#item-delete-item").html(name);
	$ItemID = id;
	
}


function deleteItem() {
	$.ajax({
		type : "POST",
		url : $pathWebService + "pmsdining",
		cache : false,
		data : {
			action : 'deleteitemdining',
			itemid : $ItemID,
			
		},
		success : function(response) {
			
			if (response > 0) {	
				closeDialog("delete-dialog-item");
				Load_list_Item_Dining();
				//showMessageSuccess(getValueField("delete-success"));
			} else {
				showMessageError(getValueField("delete-fail"));
			}
		}
	});
}

function openEditDialog(id,name,def,active,price,iunit,image,subjectId,langid,index){
	$ItemID=id;
	$typeMode=2;
	openDialog("item-dialog-dining");
	$(".process-upload").hide();
	$("#item-title-dining").html(getValueField("dining-edit-title"));
	closeMessageCheck("item-container-error-dining");
	setValueField("item-name-dining",name);
	setValueImage("item-image-dining", $path_image+image);
	setValueHTML("item-def-dining", def);
	setValueField("item-price-dining", price);
	setValueField("item-iunit-dining",iunit);
	setValueField("item-status-dining",active);
	setValueField("item-index-dining", index);
	setValueField("item-file-dining", "");
	setValueField("item-file-name-dining", "");
	setValueField("item-old-file-name-dining",image);	
	createStatusDining(active);
/*	for(var i=0;i<$listItem.length;i++){
		if($listItem[i].id==$ItemID){		
			setValueField("item-name-dining", unescape($listItem[i].name));
			setValueImage("item-image-dining", $path_image+$listItem[i].image);
			setValueHTML("item-def-dining", $listItem[i].def);
			setValueField("item-price-dining", price);
			setValueField("item-iunit-dining", $listItem[i].iunit);
			setValueField("item-status-dining", $listItem[i].active);
			setValueField("item-index-dining", $listItem[i].index);
			setValueField("item-file-dining", "");
			setValueField("item-file-name-dining", "");
			setValueField("item-old-file-name-dining", $listItem[i].image);	
			createStatusDining($listItem[i].active);
		}
	}*/
	
	
	
	
}

function openAddDialog(){
	$typeMode=1;
	openDialog("item-dialog-dining");
	$(".process-upload").hide();
	$("#item-title-dining").html(getValueField("dining-add-title"));
	closeMessageCheck("item-container-error-dining");
	setValueField("item-name-dining", "");
	setValueImage("item-image-dining", "");
	setValueField("item-def-dining", "");
	setValueField("item-price-dining", "");
	setValueField("item-iunit-dining", "USD");
	setValueField("item-status-dining", "1");
	setValueField("item-index-dining", "0");
	setValueField("item-file-dining", "");
	setValueField("item-file-name-dining", "");
	setValueField("item-old-file-name-dining", "");	
	createStatusDining(1);
	
}

function closeDialogItemDining(){
	closeDialog("item-dialog-dining");
}


function editItemDining(fileName) {
			$.ajax({
			type : "POST",
			url : $pathWebService + "pmsdining",
			cache : false,
			data : {
				action : 'edititemdining',
				itemid: $ItemID,
				name : getValueField("item-name-dining"),
				image : fileName,
				def : getValueField("item-def-dining"),			
				price : getValueField("item-price-dining"),
				iunit:getValueField("item-iunit-dining"),
				active:getValueField("item-status-dining"),
				index:getValueField("item-index-dining"),
				langId:$langId,
				
			},
			success : function(response) {	
				
				if (response > 0) {		
					closeDialog("item-dialog-dining");
					//showMessageSuccess(getValueField("edit-success"));
					Load_list_Item_Dining();
				} else {
					showMessageError(getValueField("edit-fail"));
				}
			}
		});
}

function createItemDining(fileName) {
	$.ajax({
	type : "POST",
	url : $pathWebService + "pmsdining",
	cache : false,
	data : {
		action : 'additemdining',
		subjectid: $id_lever_one,
		name : getValueField("item-name-dining"),
		image : fileName,
		def : getValueField("item-def-dining"),			
		price : getValueField("item-price-dining"),
		iunit:getValueField("item-iunit-dining"),
		active:getValueField("item-status-dining"),
		index:getValueField("item-index-dining"),
		
		
	},
	success : function(response) {	
		
		if (response > 0) {		
			closeDialog("item-dialog-dining");
			//showMessageSuccess(getValueField("create-success"));
			Load_list_Item_Dining();
		} else {
			showMessageError(getValueField("create-fail"));
		}
	}
});
}

