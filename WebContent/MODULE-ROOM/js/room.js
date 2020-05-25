var $idroom="";
$(function(){
	loadListRoom();
});

function loadListRoom(){
	$.ajax({
		type : "GET",
		url : $pathWebService+"pmsfolio",
		cache : false,
		data : {
			action : "getlistfolio",			
		},
		success : function(response) {				
			createTableItem(response);
			createDataTable("table-room");
			getvalueitemlist();
		}
	});
}

function getvalueitemlist(){
	$idroom = $('#table-room tr').find("td").eq(1).html();
	$('#table-room tr:first').addClass('highlight');
	getListSmartcardInRoom();
	$('#table-room tbody').on('click', 'tr', function() {
		$idroom = $(this).closest('tr').children('td:nth-child(2)').text();
		$(this).addClass('highlight').siblings().removeClass('highlight');
		getListSmartcardInRoom();
	});
}

function createTableItem(data) {
	$listItem = [];
	$("#tbody-room").empty();
	var myBody = document.getElementById("tbody-room");
	$.each(data, function(i, item) {
		$listItem.push(item);
		var id = item.room;
		var type = unescape(item.type);		
		var status = item.status;		
		
		var row = myBody.insertRow(myBody.rows.length);
		var col1 = row.insertCell(0);
		col1.innerHTML = i + 1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = id;
		
		var col3 = row.insertCell(2);
		col3.innerHTML = type;
	
	});
}