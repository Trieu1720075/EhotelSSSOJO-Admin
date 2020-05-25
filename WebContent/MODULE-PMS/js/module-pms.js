$(function(){	
	 $("#datepicker").datepicker({
	        dateFormat: "dd/mm/yy"
	    }).datepicker("setDate", "0");
	 getFile();
});

function getDate() {
	getFile();
}


function dowloadFile(){
	 $.ajax({
	        type: "POST",
	        url: "download/dowloadFile.elcom",	       
	        success: function(response){
	        
	        }
	    });	
}

function getFile(){
	var date = $("#datepicker").val();	
	showLoading();
	 $.ajax({
	        type: "GET",
	        url: "pms/getFile.elcom",		
	        data:{
	        	date :date,
	        },
	        success: function(response){
	        	var response=response.listpms;
	        	resetDataTable("table-item");
				createTableItem(response);
				createDataTable("table-item");
				hideLoading();
	        }
	    });	
}

function createTableItem(data){	
	$("#tbody-item").empty();
	var myBody = document.getElementById("tbody-item");
	
	$.each(data, function(i, item) {
		var name = unescape(item.namefile);		
		var date =item.date;		
		/*var data = item.data;	*/
		
		var row = myBody.insertRow(myBody.rows.length);
		var col1 = row.insertCell(0);
		col1.innerHTML = i+1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = name;
		
		var col3 = row.insertCell(2);
		col3.innerHTML = date;
		
	/*	var col4 = row.insertCell(3);
		col4.innerHTML = data;*/
		
		var col4 = row.insertCell(3);
		var btnEdit = createButton(1);
		btnEdit.setAttribute("onclick", "openEditDialog('" + name + "')");
		col4.appendChild(btnEdit);
	});
}


function chooseFile(name){
	 $.ajax({
	        type: "POST",
	        url: "pms/chooseFile.elcom",
	        cache : false,
	        data : {
	        	filename : name,
			},
	        success: function(response){
	        	var response=response.data;
	        	if(response==null || response==""){
	        		$("#item-data").html("No data");
	        	}else{
	        		$("#item-data").html(response);
	        	}
	        	
	        }
	    });	
}

function openEditDialog(namefile){
	chooseFile(namefile);
	openDialog("item-dialog");
	$("#item-name-file").html(namefile);
}