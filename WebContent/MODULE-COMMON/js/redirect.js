var $permissionMap = {};
var KEY_PERMISSION = {
	welcome : 'mng-welcome',
	main : 'mng-main',
	movie : 'mng-movie',
	music : 'mng-music',
	livetv : 'mng-livetv',
	modetv : 'mng-modetv',
	ftp : 'mng-ftp',
	room : 'mng-room',
	user : 'mng-user',
	promotion : 'mng-promotion',
	interaction: 'mng-interaction',
	mystay : 'mng-mystay',
	message : 'mng-message',
	info: 'mng-info',
	internet: 'mng-internet',
	currency: 'mng-currency',
	dining: 'mng-dining',
	admin : 'admin',
};


$(function(){
	var conf = config;
	var name = $("#span-fullName").text();
	var userId = $("#userId").val().trim() ;
	$.ajax({
		type : "GET",
		url : $pathWebService+"/user",
		cache : false,
		data : {
			action : "getpermissionuser",
			userid : userId
		},
		success : function(response) {
			$permissionMap = response;
			showFunctionByPermission();
		},
		error : function (){
			$permissionMap = config;
			showFunctionByPermission();
		}
	})
	
//	window.onhashchange = onHashChange;
//	window.addEventListener("hashchange", onHashChange, false);
});
//function onHashChange(){
//	console.log(window.location.href);
//	console.log(e);
//}


function showFunctionByPermission () {	
	for (let i = 0, leng = $permissionMap.length ; i < leng ; i++) {
		var key = $permissionMap[i].per_key.toLowerCase() || "key";
		var checked = $permissionMap[i].checked || 0;
		
		if (checked == 1 && key == KEY_PERMISSION.admin ) return true;
	}
	
	for (let i = 0, leng = $permissionMap.length ; i < leng ; i++){
		var key = $permissionMap[i].per_key.toLowerCase() || "key";
		var checked = $permissionMap[i].checked || 0;
		
		if ((checked != 1)  ){
			if (key in KEY_PERMISSION) {
				$('.' + KEY_PERMISSION[key] ).hide();
			}
			else {
				console.log("Keys not found:" + key );
			}
		}
	}
}


var config = 
	[{
	      per_id : '1',
	      per_name: 'Manage Movie',
	      per_key : 'movie',
	      checked : '1'
	  },
	  {
	      per_id : '2',
	      per_name: 'Manage Music',
	      per_key : 'music',
	      checked : '1'
	  },
	  {
	      per_id : '3',
	      per_name: 'Manage Welcome',
	      per_key : 'welcome',
	      checked : '1'
	  },
	  {
	      per_id : '4',
	      per_name: 'Manage livetv',
	      per_key : 'livetv',
	      checked : '1'
	  },
	  {
	      per_id : '5',
	      per_name: 'Manage ftp',
	      per_key : 'ftp',
	      checked : '1'
	  },
	  {
	      per_id : '6',
	      per_name: 'Manage room',
	      per_key : 'room',
	      checked : '1'
	  },
	  {
	      per_id : '7',
	      per_name: 'Manage user',
	      per_key : 'user',
	      checked : '1'
	  },
	  {
	      per_id : '16',
	      per_name: 'Manage message',
	      per_key : 'message',
	      checked : '1'
	  },
	  {
	      per_id : '8',
	      per_name: 'Manage promotion',
	      per_key : 'promotion',
	      checked : '1'
	  },
	  {
	      per_id : '9',
	      per_name: 'Manage Interaction',
	      per_key : 'interaction',
	      checked : '1'
	  },
	  {
	      per_id : '10',
	      per_name: 'Manage Internet',
	      per_key : 'internet',
	      checked : '1'
	  },
	  {
	      per_id : '11',
	      per_name: 'Manage main',
	      per_key : 'main',
	      checked : '1'
	  },
	  {
	      per_id : '12',
	      per_name: 'Manage Mystay>Info',
	      per_key : 'info',
	      checked : '1'
	  },
	  {
	      per_id : '15',
	      per_name: 'Manage Mystay',
	      per_key : 'mystay',
	      checked : '1'
	  },
	  {
	      per_id : '13',
	      per_name: 'Manage Mystay>Dining',
	      per_key : 'dining',
	      checked : '1'
	  },
	  {
	      per_id : '14',
	      per_name: 'Manage Mystay>Currency',
	      per_key : 'currency',
	      checked : '1'
	  }
	]

function arrayToObject (array, keyField){
	
	var obj = {}
	obj = array.reduce( function(obj,item) {
		  obj["item"+item[keyField]] = item;
		  return obj;
	}, {});
	
	return obj;
}
