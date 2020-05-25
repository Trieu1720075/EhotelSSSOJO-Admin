var $userList = {};
var $permissionList = [];

$(function(){
	getListUser();
	getListPermission();
});

function getListUser(){

	$.ajax({
		type : "GET",
		url : $pathWebService+"user",
		cache : false,
		data : {
			action : "getlistuser",			
		},
		success : function(response) {
			resetDataTable("table-user");
			createTableItem(response);
			createDataTable("table-user");
		},
		error : function (){
			showMessageWarning("Get data not success");
			resetDataTable("table-user");
			var response =[];
			createTableItem(response);
			
			createDataTable("table-user");
		}
	});
}


function createTableItem(data) {
	$listItem = [];
	$("#tbody-user").empty();
	var myBody = document.getElementById("tbody-user");
	
	$.each(data, function(i, item) {
		
		$listItem.push(item);
		

		
		var id = item.user_id|"";
		var username = item.user_name||"";		
		var fullname = item.full_name||"";		
		var permission = item.permission||[];
		
		var textPermission = permission.map(function(item){
			return item.per_name;
		}).join(", ");
		
		if (textPermission.length > 70) {
			textPermission = textPermission.substring(0,70) + "...";
		}
		
		var row = myBody.insertRow(myBody.rows.length);
		
		var col1 = row.insertCell(0);
		col1.innerHTML = i + 1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = username;
		
		var col3 = row.insertCell(2);
		col3.innerHTML = fullname;
		
		var col4 = row.insertCell(3);
		col4.innerHTML = textPermission;
		
		var btnEdit = createButton(1, " Edit");
		btnEdit.setAttribute("onclick","openEditDialog('" + id + "')");
		var btnDelete = createButton(2);
		btnDelete.setAttribute("onclick","openDeleteDialog('" + id + "')")
		var col5 = row.insertCell(4);
		col5.appendChild(btnEdit);
		col5.appendChild(btnDelete);
			
	});
	

	$userList = arrayToObject($listItem,'user_id');
}

function openDeleteDialog( id ) {
	var user = $userList["item"+id];
	var name = user.user_name;
	$("#item-delete").text(name);
	setValueField("item-user-id", id);
	openDialog("dialog-delete");
}

function openDialogAddUser () {
	setValueField("item-username","");
	setValueField("item-fullname","");
	setValueField("item-pass","");
	$(".row-pass").show();
	$('input[name="permission[]"]').prop("checked",false);
	$("#btn-user-save").text(getValueField("btn-create")).attr("onclick","addUser()");
	closeMessageCheck("item-container-error");
	openDialog("dialog-mng-user");
}

function openEditDialog(id){
	$('input[name="permission[]"]').prop("checked",false);
	
	var user = $userList["item"+id] || {};
	var username = user.user_name || "";
	var fullname = user.full_name || "";
	var permission = user.permission || [];
	$(".row-pass").hide();
	setValueField("item-pass","");
	setValueField("item-username", username);
	setValueField("item-fullname", fullname);
	
	for (let i = 0, leng = permission.length; i < leng; i++){
		var per_id = permission[i].per_id||"";
		if (per_id != ""){
			let val = "value=" + per_id; 
			$('input[name="permission[]"][' + val + ']').prop("checked", true);
		}
	}

	$("#btn-user-save").text(getValueField("btn-edit")).attr("onclick","editUser(" + id + ")");
	closeMessageCheck("item-container-error");
	openDialog("dialog-mng-user");
}

function editUser (userId) {
	var username = getValueField("item-username")||"";
	var fullname = getValueField("item-fullname")||"";
		
	if (checkRequiredField(username)){
		showMessageCheck("item-container-error", "Please input username");
		return false;
	}
	
	var permissionList = [];
	$('input[name="permission[]"]:checked').each(function(){
		let value = this.value; 
		permissionList.push(value);
	});
	var permissionText = permissionList.join(',');
	
	closeDialog("dialog-mng-user");
	$.ajax({
		type : "POST",
		url : $pathWebService+"user",
		cache : false,
		data : {
			action : "edituser",
			username : username,
			userid: userId,
			fullname : fullname ,
			permission : permissionText
		},
		success : function(response) {
			hideLoading();
			showMessageSuccess(getValueField("edit-success"));
			getListUser();
		},
		error : function (){
			hideLoading();
			showMessageError(getValueField("edit-fail"));
		}
	})
	
}

function addUser() {
	var username = getValueField("item-username")||"";
	var fullname = getValueField("item-fullname")||"";
	var password = getValueField("item-pass") || "";	
	if (checkRequiredField(username)){
		showMessageCheck("item-container-error", "Please input username");
		return false;
	}
	
	if (checkRequiredField(password)){
		showMessageCheck("item-container-error", "Please input password");
		return false;
	}
	
	var permissionList = [];
	$('input[name="permission[]"]:checked').each(function(){
		let value = this.value; 
		permissionList.push(value);
	});
	
	var permissionText = permissionList.join(',');
	
	closeDialog("dialog-mng-user");
	$.ajax({
		type : "POST",
		url : $pathWebService+"user",
		cache : false,
		data : {
			action : "adduser",
			username : username,
			fullname : fullname ,
			pass: password,
			permission : permissionText
		},
		success : function(response) {
			hideLoading();
			showMessageSuccess(getValueField("create-success"));
			getListUser();
		},
		error : function (){
			hideLoading();
			showMessageError(getValueField("create-fail"));
		}
	})
	
}

function deleteUser () {
	var id = getValueField("item-user-id");
	closeDialog("dialog-delete");
	showLoading();
	$.ajax({
		type : "POST",
		url : $pathWebService+"user",
		cache : false,
		data : {
			action : "deleteuser",
			userid : id,
		},
		success : function(response) {
			hideLoading();
			showMessageSuccess(getValueField("delete-success"));
			getListUser();
		},
		error : function (){
			hideLoading();
			showMessageError(getValueField("delete-fail"));
		}
	})
}

function getListPermission() {
	$.ajax({
		type : "GET",
		url : $pathWebService+"user",
		cache : false,
		data : {
			action : "getlistpermission",
		},
		success : function(response) {
			createTablePermission(response);
		},
		error : function (){
			showMessageWarning("Get data not success");
			var response= [{
				      per_id : '1',
				      per_name: 'Manage Movie',
				      per_key : 'MOVIE'
				  },
				  {
				      per_id : '2',
				      per_name: 'Manage Music',
				      per_key : 'MUSIC'
				  },{
				      per_id : '3',
				      per_name: 'Manage WELCOME',
				      per_key : 'WELCOME'
				  }];
			createTablePermission(response);
		}
	})
}

function createTablePermission (data){
	$permissionList = [];
	
	$("#tbody-permission").empty();
	var myBody = document.getElementById("tbody-permission");
	for (let i = 0, leng = data.length ; i < leng; i=i+2 ){
		var item = data[i] ;
		var item2 = data[i+1] || null;
		
		var row = myBody.insertRow(myBody.rows.length);
		
		$permissionList.push(item);
		var col1 = row.insertCell(0);
		col1.innerHTML = '<span class="label label-success">'+ item.per_name + '</span>' || "";
		
		var col2 = row.insertCell(1);
		col2.innerHTML = '<input type="checkbox" name="permission[]" value='+ item.per_id +'></input>';
		
		var col3 = row.insertCell(2);
		var col4 = row.insertCell(3);
		
		if (item2 != null){
			$permissionList.push(item2);
			col3.innerHTML = '<span class="label label-success">'+ item2.per_name + '</span>' || "";
			col4.innerHTML = '<input type="checkbox" name="permission[]" value='+ item2.per_id +'></input>';
		}	
	}
	
}

function arrayToObject (array, keyField){
	
	var obj = {}
	obj = array.reduce( function(obj,item) {
		  obj["item"+item[keyField]] = item;
		  return obj;
	}, {});
	
	return obj;
}