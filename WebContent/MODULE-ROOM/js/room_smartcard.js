var $listItem = [];
var $smartcard="0";


function getListSmartcardInRoom(){
	$.ajax({
		type : "GET",
		url : $pathWebService+"pmsfolio",
		cache : false,
		data : {
			action : "getsmartcardfolio",		
			folionum:$idroom,
			
		},
		success : function(response) {		
			resetDataTable("table-item");
			createTableItem_Smartcard(response);
			createDataTable("table-item");
			
		}
	});
}

function createTableItem_Smartcard(data) {
	$listItem = [];
	$("#tbody-item").empty();
	var myBody = document.getElementById("tbody-item");
	$.each(data, function(i, item) {
		$listItem.push(item);
		
		var smartcard =item.serinumber;
		var ip =$.trim(item.idaddress);
		
		var row = myBody.insertRow(myBody.rows.length);
		var col1 = row.insertCell(0);
		col1.innerHTML = i + 1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = smartcard;
		
		var col3 = row.insertCell(2);
		col3.innerHTML = ip;		
	
		
		var col4 = row.insertCell(3);		
		var btnDelete = createButton(2);
		
		btnDelete.setAttribute("onclick", "openDeleteDialog('" +smartcard+"')");		
		col4.appendChild(btnDelete);
	
	});
}

function openDeleteDialog(smartcard){
	openDialog("dialog-delete");
	$smartcard=smartcard;
	$("#item-delete").html($smartcard);
}

function deleteSmartcard(){
	$.ajax({
		type : "POST",
		url : $pathWebService+"pmsfolio",
		cache : false,
		data : {
			action : "deletesmartcard",		
			serinumber:$smartcard,
			
		},
		success : function(response) {		
			closeDialog("dialog-delete");
			if (response > 0) {
				getListSmartcardInRoom();
				//showMessageSuccess(getValueField("delete-success"));
			} else if (response == -2) {
				showMessageError(getValueField("delete-duplicate"));
			} else {
				showMessageError(getValueField("delete-fail"));
			}
			
		}
	});
}
