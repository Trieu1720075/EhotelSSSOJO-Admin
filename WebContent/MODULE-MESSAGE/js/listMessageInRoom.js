var $listItem = [];
var $idroom_list="0";
var $idmessage="0";
$(function(){
	$("#item-content").Editor();	
});

function getListMessageInRoom(){
	$.ajax({
		type : "GET",
		url : $pathWebService+"pmsfolio",
		cache : false,
		data : {
			action : "getlistmessage",		
			folionum:$idroom,
			langid : $langId,
		},
		success : function(response) {		
			resetDataTable("table-item");
			createTableItem_Message(response);
			createDataTable("table-item");
			
		}
	});
}

function createTableItem_Message(data) {
	$listItem = [];
	$("#tbody-item").empty();
	var myBody = document.getElementById("tbody-item");
	$.each(data, function(i, item) {
		$listItem.push(item);
		var roomId = item.roomId;
		var messageId = item.messageId;		
		var title = unescape(item.title);		
		var content = unescape(item.content);		
		var top = unescape(item.top);		
		var bottom = unescape(item.bottom);		
		var sender = unescape(item.sender);		
		var dateSend = item.dateSend;		
		var dateRead = item.dateRead;		
		var isRead = item.isRead;		
		var status = item.status;		
		
		var row = myBody.insertRow(myBody.rows.length);
		var col1 = row.insertCell(0);
		col1.innerHTML = i + 1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = sender;
		
		var col3 = row.insertCell(2);
		col3.innerHTML = title;
		
		var col4 = row.insertCell(3);
		col4.innerHTML = dateSend;
	
		
		var col5 = row.insertCell(4);
		var btnEdit = createButton(1);
//		var str = "'" + roomId + "','" + messageId + "', '" + title + "', '" + escape(content) + "', '" + top + "', '" 
//			+ bottom + "', '" + sender + "', '" + dateSend + "', '" + dateRead + "', '" + isRead + "', '" + status + "'";
		btnEdit.setAttribute("onclick", "openEditDialog(" + messageId + ")");
		
		var btnDelete = createButton(2);
		btnDelete.setAttribute("onclick", "openDeleteDialog('" + roomId + "', '" + messageId + "','"+title+"')");
		col5.appendChild(btnEdit);
		col5.appendChild(btnDelete);
	
	});
}

function openEditDialog(roomid){//,messageid,title,content,top,bottom,sender,datasend,dataread,isread,status
	$("#item-save-message").hide();
	for(var i=0;i<$listItem.length;i++){
		if($listItem[i].messageId==roomid){			
			openDialog("item-edit-dialog");	
			setValueField("item-sender", $listItem[i].sender);
			setValueField("item-title", $listItem[i].title);	
			$(".Editor-editor").html($listItem[i].content);
			
		}
	}
}

function openNewDialog(){
	openDialog("item-edit-dialog");	
	$("#item-save-message").show();
	setValueField("item-sender", "");
	setValueField("item-title", "");	
	$(".Editor-editor").html("");
}

function addNewMessage(){
	var item_room=$idroom;
	var item_sender = $("#item-sender").val();
	var item_title = $("#item-title").val();		
	var item_content = $(".Editor-editor").html();	
	item_content='<font color="white">'+item_content+'</font>';
	if(item_sender==null || item_sender==""){			
		$("#item-sender").focus();
		return false;
	}
	
	if(item_title==null || item_title==""){		
		$("#item-title").focus();
		return false;
	}
	$.ajax({
		type : "POST",
		url : $pathWebService+"pmsfolio",		
		cache : false,
		data : {			
			action: "addmessage",					
			folionum:	item_room,
			sender	:	item_sender,
			title	:		item_title,
			content :	item_content,
		},
		success : function(response) {
			if(response>0){			
				closeDialog("item-edit-dialog");	
				//showMessageSuccess(getValueField("create-success"));
				getListMessageInRoom();
			}else {				
				showMessageError(getValueField("create-fail"));
			}
		
		}
	});
	
}

function openDeleteDialog(roomid,messageId,title){
	openDialog("item-delete-dialog");
	$("#item-delete").html(title);
	$idroom_list=roomid;
	$idmessage=messageId;
}

function deleteItem(){
	$.ajax({
		type : "POST",
		url : $pathWebService+"pmsfolio",		
		cache : false,
		data : {			
			action: "deletemessage",					
			folionum:	$idroom_list,
			messid	:	$idmessage
		},
		success : function(response) {
			if(response>0){			
				//showMessageSuccess(getValueField("delete-success"));
				closeDialog("item-delete-dialog");
				getListMessageInRoom();
			}else {				
				showMessageError(getValueField("delete-fail"));
			}
		
		}
	});
}

/*function openDeleteDialog(roomid,messageId){
	if(confirm("Are you sure?")){
		$.ajax({
			type : "POST",
			url : $pathWebService+"pmsfolio",		
			cache : false,
			data : {			
				action: "deletemessage",					
				folionum:	roomid,
				messid	:	messageId
			},
			success : function(response) {
				if(response>0){			
					//showMessageSuccess(getValueField("delete-success"));
					getListMessageInRoom();
				}else {				
					showMessageError(getValueField("delete-fail"));
				}
			
			}
		});
	}
	return false;
}*/