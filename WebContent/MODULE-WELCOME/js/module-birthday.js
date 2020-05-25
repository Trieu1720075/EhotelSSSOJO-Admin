var $layoutBirthday = {}
var $dataHtml = "";
var $domHtml;
$(function() {
	getItem();
});
function getItem() {
	$("#form-edit-birthday").hide();
	$.ajax({
		type : "GET",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "getbackgroundbirthday",
			langid : $langId
		},
		success : function(response) {

			createTableItem(response);

		},
		error : function (){
			showMessageWarning("Get data not success");
		}
	});
}

function createTableItem(data) {
	$listItem = [];
	$("#tbody-item-birthday").empty();
	var myBody = document.getElementById("tbody-item-birthday");
	$.each(data, function(i, item) {
		$listItem.push(item);
		var id = item.id;
		var name = unescape(item.name);
		var url = item.url_file;
		var invisible = item.status;
		
		var row = myBody.insertRow(myBody.rows.length);
		var col1 = row.insertCell(0);
		col1.innerHTML = i + 1;
		
		var col2 = row.insertCell(1);
		col2.innerHTML = name;
		
		var col3 = row.insertCell(2);
		col3.innerHTML = url;
		
		var col4 = row.insertCell(3);
		col4.appendChild(createIconStatus(id,invisible));
		
		var col5 = row.insertCell(4);
		var btnEdit = createButton(1);
		btnEdit.setAttribute("onclick", "openEditDialog('" + id + "')");
		col5.appendChild(btnEdit);

	});
	
	$layoutBirthday = arrayToObject($listItem,'id');
}
function openEditDialog(id) {
	var item = $layoutBirthday["item"+id];
	var url = item.url_file || "";
	var id = item.id;
	var duration = item.duration || "00:05:00";
	var name = item.name || "";
	
	setValueField("bday-id", item.id);
	setValueField("birthday-name", name);
	setValueField("birthday-duration", duration);
	setValueField("birthday-url", url);
	
	initTimePicker();
	
	if (url == ""){
		return fasle;
	}
	else {
		
		 $.ajax({
				type : "POST",
				url : 'getBirthdayHtml.elcom',
				data : {
					'urlFile': url 
				},
				success : function(response) {
					console.log(response);
					$dataHtml = response.data || "";
					injectHTML("birthday_iframe", $dataHtml);
					convertStringtoDom($dataHtml);
					
					
					var x = document.getElementById("birthday_iframe");
					var fr = (x.contentWindow || x.contentDocument);
					if (fr.document) fr = fr.document;
					var name = fr.querySelector("#birthday-welcome h4").innerHTML;
					var style = fr.querySelector("#birthday-welcome").style;
					
					var nameCus = fr.querySelector("#birthday-name h4").innerHTML;
					var styleCus = fr.querySelector("#birthday-name").style;
					
					$("#birthday-text").val(name);
					$("#birthday-color").val(rgbToHex(style.color) || "#ffff00");
					$("#birthday-fontsize").val(style.fontSize || "30px");
					
					$("#bdcustomer").val(nameCus);
					$("#bdcustomer-color").val(rgbToHex(styleCus.color) || "#ffffff");
					$("#bdcustomer-fontsize").val(styleCus.fontSize || "60px");
					
					$("#form-edit-birthday").show();
				},
				error: function (){
					showMessageWarning("Get file not success");
					return false;
				}
			});
		
	}
	

}
function previewTemplate() {
	var textBd = getValueField("birthday-text");
	var color = $("#birthday-color").val();
	var fontSize = $("#birthday-fontsize").val();
	
	var colorCus = $("#bdcustomer-color").val();
	var fontSizeCus = $("#bdcustomer-fontsize").val();
	
	var files = document.querySelector('#bday-image').files;
	
	var x = document.getElementById("birthday_iframe");
	var fr = (x.contentWindow || x.contentDocument);
	if (fr.document) fr = fr.document;
	fr.querySelector("#birthday-welcome h4").innerHTML = textBd ;
	fr.querySelector("#birthday-welcome").style.color = color ;
	fr.querySelector("#birthday-welcome").style.fontSize = fontSize;
	
	fr.querySelector("#birthday-name").style.color = colorCus ;
	fr.querySelector("#birthday-name").style.fontSize = fontSizeCus;
	
	if (files.length > 0){
		var file = files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			var base64 = reader.result;
			fr.querySelector("body").style.backgroundImage = "url('"+ base64 + "')";
			
		};
		
		reader.onerror = function (error) {
			console.log('Error: ' + error);
		}
	}
}

function saveFileHtml() {
	previewTemplate();
	var url = getValueField("birthday-url");
	var backgroundId = getValueField("bday-id");
	var backgroundName = getValueField("birthday-name");
	var duration = getValueField("birthday-duration");
	
	setTimeout(function(){
		var html = $('#birthday_iframe').contents().find('html').html();
		$.ajax({
			type : "POST",
			url : 'saveBirthdayHtml.elcom',
			data : {
				'urlFile': url,
				'data' : html
			},
			success : function(response) {
				var result = response.result;
				if (result != 'success'){
					showMessageWarning("Save file not success");
				}
				else {
					$.ajax({
						type : "POST",
						url : $pathWebService + "system",
						cache : false,
						data : {
							action : "editbackgroundbirthday",
							langid : $langId,
							id : backgroundId,
							name : backgroundName,
							duration : duration,
							url_file : url,
						},
						success : function(response) {
							getItem();
							showMessageSuccess(getValueField("edit-success"));
						},
						error : function (){
							getItem();
							showMessageError(getValueField("edit-fail"));
						}
					})
				}
			},
			error: function (){
				showMessageWarning("Save file not success");
				return false;
			}
		});
		
	}, 1000);


	
	
}

function convertStringtoDom (html) {
	var $domHtml = document.createElement('html');
	$domHtml.innerHTML = html;
}

function createIconStatus(id,invisible) {
	var str = "'" + id + "','" + invisible + "'";
	var button = document.createElement("button"); 
	button.setAttribute('type', 'button');
	button.setAttribute('onclick', 'setBackgroundBirthday(' + str + ')');
	if (invisible == 1) {
		button.className = "status-active";
	} else {
		button.className = "status-inactive";
	}
	return button;
}

function setBackgroundBirthday(id ,status){
	
	if(status == 1) {
		return false;
	}else{
		status=1;
	}
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : 'setbackgroundbirthday',
			langid : $langId,
			id : id
		},
		success : function(response) {
			if (response > 0) {
				getItem();
				showMessageSuccess(getValueField("edit-success"));
			} else {
				showMessageSuccess(getValueField("edit-fail"));
			}
		},
		error : function(){
			showMessageSuccess(getValueField("edit-fail"));
		}
	});	
	
}

function injectHTML(id, html){
    var iframe = document.getElementById(id);
    var iframedoc = iframe.document;
        if (iframe.contentDocument)
            iframedoc = iframe.contentDocument;
        else if (iframe.contentWindow)
            iframedoc = iframe.contentWindow.document;
 
     if (iframedoc){
         iframedoc.open();
         iframedoc.writeln(html);
         iframedoc.close();
     } else {
        console.log('Cannot inject dynamic contents into iframe.');
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

function rgbToHex(col)
{
    if(col.charAt(0)=='r')
    {
        col=col.replace('rgb(','').replace(')','').split(',');
        var r=parseInt(col[0], 10).toString(16);
        var g=parseInt(col[1], 10).toString(16);
        var b=parseInt(col[2], 10).toString(16);
        r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
        var colHex='#'+r+g+b;
        return colHex;
    }
}