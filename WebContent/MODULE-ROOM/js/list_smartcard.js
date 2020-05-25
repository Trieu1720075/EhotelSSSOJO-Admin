$(function(){
	getListSmartcard();
});

function getListSmartcard(){
	$.ajax({
		type : "GET",
		url : $pathWebService+"pmsfolio",
		cache : false,
		data : {
			action : "getlistsmartcard",
		
			
		},
		success : function(response) {		
			resetDataTable("table-item-smartcard");
			createTableItem_ListSmartcard(response);
			createDataTable("table-item-smartcard");
			
		}
	});
}

function createTableItem_ListSmartcard(data){
	$("#tbody-item-smartcard").empty();
	var myBody = document.getElementById("tbody-item-smartcard");
	$.each(data, function(i, item) {	
		
		var smartcard =$.trim(item.serinumber);
		var ip =$.trim(item.idaddress);
		var room =$.trim(item.room);
		
		var row = myBody.insertRow(myBody.rows.length);
		var col1 = row.insertCell(0);
		col1.innerHTML = i + 1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = room;
		
		var col3 = row.insertCell(2);
		col3.innerHTML = smartcard;		
	
		
		var col4 = row.insertCell(3);		
		col4.innerHTML = ip;		
		
		
	
	});
}