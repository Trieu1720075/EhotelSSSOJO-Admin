var name_image_;
var file_name;
var $listLanguage=[];
$(function(){	
	getListLanguage();
	$(".Editor-editor").html("");	//myModal
	$("#myModal").on('hidden', function(){
	    $(this).data('modal', null);
	});
	$("#txt_content").Editor();	
	 document.getElementById('btn_save_file').style.visibility = 'hidden';
	$( "#cbb_change" ).on( "change", function() {		
		
		document.getElementById('btn_save_file').style.visibility = 'visible';
		var temp_=$("#cbb_change").val();
		if(temp_==="temp0"){
			document.getElementById('btn_save_file').style.visibility = 'hidden';
			$("#div_center").empty();
			$("#id_form").empty();
		}
		else if(temp_==="temp1"){
			$("#div_center").empty();
			$("#id_form").empty();
			var temp1=Template1.load();
			$("#div_center").append(temp1);
			
			//var form_temp1=Template1.form();
			//$("#id_form").append(form_temp1);
		}else if(temp_==="temp2"){			
			$("#div_center").empty();
			$("#id_form").empty();
			var temp2=Template_2.load();
			$("#div_center").append(temp2);
				
			//var form_temp2=Template_2.form();
			//$("#id_form").append(form_temp2);
			
		}else if(temp_==="temp3"){			
			$("#div_center").empty();
			$("#id_form").empty();
			var temp3=Template_3.load();
			$("#div_center").append(temp3);
				
			//var form_temp3=Template_3.form();
			//$("#id_form").append(form_temp3);
			
		}else if(temp_==="temp4"){
			$("#div_center").empty();
			$("#id_form").empty();
			var temp4=Template_4.load();
			$("#div_center").append(temp4);
				
			//var form_temp4=Template_4.form();
			//$("#id_form").append(form_temp4);
		}else if(temp_==="temp5"){
			$("#div_center").empty();
			$("#id_form").empty();
			var temp5=Template_5.load();
			$("#div_center").append(temp5);
				
			//var form_temp5=Template_5.form();
			//$("#id_form").append(form_temp5);
		}else if(temp_==="temp6"){
			$("#div_center").empty();
			$("#id_form").empty();
			var temp6=Template_6.load();
			$("#div_center").append(temp6);
				
			//var form_temp6=Template_6.form();
			//$("#id_form").append(form_temp6);
		}		
		else if(temp_==="temp7"){
			$("#div_center").empty();
			$("#id_form").empty();
			var temp7=Template_7.load();
			$("#div_center").append(temp7);
				
			//var form_temp7=Template_7.form();
			//$("#id_form").append(form_temp7);
		}/*else{
			$("#div_center").empty();
			$("#id_form").empty();
		}	*/	
		
		//create_file_type();
		//get_content_form();
	/*	$("#content-paste").on("click",function(){			
			$("#txt_content").empty();	
			$(".Editor-editor").empty();	
			$(".Editor-editor").removeData();
			openWindow("myModal");
		});	*/
		Load_Event_Click();
		 
	});
	
	formatdata();
});
Template1={
		name : 'Temp1',	
		keyPress : false,
		subjectTemp : [],
}

Template1.load = function() {//<div class="col-xs-12 col-md-12" style="padding:0px !important" id="div-content">
	var temp='<div class="col-xs-12 col-md-12" id="div-content" style="padding: 0px!important;">'
	temp+='<div class="col-xs-5 col-md-5" >';//style="padding:0px !important"
	temp+=		'<img id="myImg" src="STYLE-INF/images/no_images.jpg" style="width: 100%;margin-top: 5px;"/>';
	temp+='</div>';
	temp+='<div class="col-xs-7 col-md-7 text-left" id="content-paste" style="word-wrap: break-word;padding:0px 0px 0px 10px !important">';
	temp+='Click here to input text ...';
	temp+='</div>';
	temp+='</div>';
	return temp;
	
	
}

Template1.form = function() {
	
	var temp= 	'<div class="form-group">';	
	temp+=		'<form id="form_image" enctype="multipart/form-data"  method="post">';
	temp+=  		'<input type="file" id="file_upload" name="file_upload" onchange="previewFile()" style="visibility: hidden;">';	
	temp+= 		'<input type="hidden" name="fileNameUpload" id="fileNameUpload">';	
	temp+=		' </form>';
	temp+=  	'</div>';
	temp+=  	'<div class="form-group">';	
	temp+=  		' <textarea id="txt_content" name="txt_content" class="form-control" rows="5"></textarea>';
	temp+=  	'</div>';	
	
	return temp;
}





Template_2={
		name : 'Temp2',	
		keyPress : false,
		subjectTemp : [],
}

Template_2.load = function() {	
	
	var temp='<div class="col-xs-12 col-md-12 div-content" id="div-content" style="padding: 0px!important;">'
		+'<div class="col-xs-5 col-md-5 img" style="z-index: 1;">'
		+'<img src="STYLE-INF/images/no_images.jpg" id="myImg" width="100%";margin-top: 5px; >'
		+'</div>'
		+'<div class="col-xs-12 col-md-12 content text-left" id="content-paste">'
		+'Click here to input text ...'
		+'</div>'
		+'</div>';

	return temp;
}

Template_2.form = function() {
	
	var temp= 	'<div class="form-group">';	
	temp+=		'<form id="form_image" enctype="multipart/form-data"  method="post">';
	temp+=  		'<input type="file" id="file_upload" name="file_upload" onchange="previewFile()" style="visibility: hidden;"> ';	
	temp+= 		'<input type="hidden" name="fileNameUpload" id="fileNameUpload">';	
	temp+=		' </form>';
	temp+=  	'</div>';
	temp+=  	'<div class="col-xs-12 col-md-12 content">';	
	temp+=  		' <textarea  id="txt_content" name="txt_content" class="form-control" rows="5"></textarea>';
	temp+=  	'</div>';	
	//temp+='<button type="button" id="btn_send" onclick="send_data()" class="btn btn-info btn-sm"><i class="fa fa-floppy-o"></i> Send</button>';
	//temp+='<button type="button" id="btn_save_file" onclick="save_file()" class="btn btn-info btn-sm"><i class="fa fa-floppy-o"></i> Save file</button>';
	return temp;
}


Template_3={
		name : 'Temp3',	
		keyPress : false,
		subjectTemp : [],
}

Template_3.load = function() {
	var temp='<div class="col-xs-12 col-md-12" style="padding:0px !important" id="div-content">';
	temp+='<div class="col-xs-7 col-md-7 text-left" id="content-paste" style="word-wrap: break-word;padding:0px 0px 0px 10px !important">';
	temp+='Click here to input text ...';
	temp+='</div>';
	temp+='<div class="col-xs-5 col-md-5" style="padding:0px !important">';
	temp+=		'<img id="myImg" src="STYLE-INF/images/no_images.jpg" style="width: 100%; margin-top: 5px;"/>';
	temp+='</div>';
	temp+='</div>';
	return temp;
	
	
}

Template_3.form = function() {
	
	var temp= 	'<div class="form-group">';	
	temp+=		'<form id="form_image" enctype="multipart/form-data"  method="post">';
	temp+=  		'<input type="file" id="file_upload" name="file_upload" onchange="previewFile()" style="visibility: hidden;">';	
	temp+= 		'<input type="hidden" name="fileNameUpload" id="fileNameUpload">';	
	temp+=		' </form>';
	temp+=  	'</div>';
	temp+=  	'<div class="form-group">';	
	temp+=  		' <textarea id="txt_content" name="txt_content" class="form-control" rows="5"></textarea>';
	temp+=  	'</div>';	
	//temp+='<button type="button" id="btn_send" onclick="send_data()" class="btn btn-info btn-sm"><i class="fa fa-floppy-o"></i> Send</button>';
	//temp+='<button type="button" id="btn_save_file" onclick="save_file()" class="btn btn-info btn-sm"><i class="fa fa-floppy-o"></i> Save file</button>';
	return temp;
}



Template_4={
		name : 'Temp4',	
		keyPress : false,
		subjectTemp : [],
}

Template_4.load = function() {	
	
	/*var temp='<div class="col-xs-12 col-md-12 div-content" id="div-content" style="padding: 0px!important;">';
	
	temp+='<div class="col-xs-12 col-md-12 content text-left" style="word-wrap: break-word;" id="content-paste">';		
	temp+='</div>';
	temp+='<div class="col-xs-5 col-md-5 img" style="float:right;">';
	temp+='<img src="STYLE-INF/images/no_images.jpg" id="myImg" width="100%">';
	temp+='</div>';
	temp+='</div>';	
	return temp;*/
	
	var temp='<div class="col-xs-12 col-md-12" style="padding:0px !important" id="div-content">';
	temp+='<div class="col-xs-5 col-md-5 img" style="float:right;z-index: 1;">';
	temp+='<img src="STYLE-INF/images/no_images.jpg"  style="width: 100%; margin-top: 5px;" id="myImg">';
	temp+='</div>';
	temp+='<div class="col-xs-12 col-md-12 content" id="content-paste">';
	temp+='Click here to input text ...';
	temp+='</div>';
	temp+='</div>';
	return temp;
}

Template_4.form = function() {
	
	var temp= 	'<div class="form-group">';	
	temp+=		'<form id="form_image" enctype="multipart/form-data"  method="post">';
	temp+=  		'<input type="file" id="file_upload" name="file_upload" onchange="previewFile()" style="visibility: hidden;"> ';	
	temp+= 		'<input type="hidden" name="fileNameUpload" id="fileNameUpload">';	
	temp+=		' </form>';
	temp+=  	'</div>';
	temp+=  	'<div class="col-xs-12 col-md-12 content">';	
	temp+=  		' <textarea  id="txt_content" name="txt_content" class="form-control" rows="5"></textarea>';
	temp+=  	'</div>';	
	return temp;
}


Template_5={
		name : 'Temp5',	
		keyPress : false,
		subjectTemp : [],
}

Template_5.load = function() {	
	
	var temp='<div class="col-xs-12 col-md-12 div-content" id="div-content" style="padding: 0px!important;">'		
		+'<img src="STYLE-INF/images/no_images.jpg" id="myImg" width="100%"  style= "padding:5px 5px 5px 5px;">'		
		+'</div>';
	return temp;
}

Template_5.form = function() {
	
	var temp= 	'<div class="form-group">';	
	temp+=		'<form id="form_image" enctype="multipart/form-data"  method="post">';
	temp+=  		'<input type="file" id="file_upload" name="file_upload" onchange="previewFile()" style="visibility: hidden;"> ';	
	temp+= 		'<input type="hidden" name="fileNameUpload" id="fileNameUpload">';	
	temp+=		' </form>';
	temp+=  	'</div>';	
	return temp;
}

Template_6={
		name : 'Temp5',	
		keyPress : false,
		subjectTemp : [],
}

Template_6.load = function() {	
	
	var temp='<div class="col-xs-12 col-md-12 div-content" id="div-content" style="padding: 0px!important;">'		
		//+'<img src="STYLE-INF/images/no_images.jpg" id="myImg" width="100%";margin-top: 5px;>'		
		+'<div class="col-xs-12 col-md-12 content" id="content-paste">'
		+'Click here to input text ...'
		+'</div>';
	//+'<img id="myImg" src="" style="visibility: hidden;"></img>'
	+'</div>';
	return temp;
}

Template_6.form = function() {
	var temp=  	'<div class="col-xs-12 col-md-12 content">';	
	temp+=  		' <textarea  id="txt_content" name="txt_content" class="form-control" rows="5"></textarea>';
	temp+=  	'</div>';	
	return temp;
}



Template_7={
		name : 'Temp7',	
		keyPress : false,
		subjectTemp : [],
}

Template_7.load = function() {	
	
	var temp='<div class="col-xs-12 col-md-12 div-content" id="div-content" style="padding: 0px!important;">'
		+'<div class="col-xs-12 col-md-12">'
		+'<img src="STYLE-INF/images/no_images.jpg" id="myImg"  style="width: 100%; margin-top: 5px;">'
		+'</div>'
		+'<div class="col-xs-12 col-md-12 text-left " id="content-paste" style="word-wrap: break-word;">'
		+'Click here to input text ...'
		+'</div>'
		+'</div>';

	return temp;
}

Template_7.form = function() {
	
	var temp= 	'<div class="form-group">';	
	temp+=		'<form id="form_image" enctype="multipart/form-data"  method="post">';
	temp+=  		'<input type="file" id="file_upload" name="file_upload" onchange="previewFile()" style="visibility: hidden;"> ';	
	temp+= 		'<input type="hidden" name="fileNameUpload" id="fileNameUpload">';	
	temp+=		' </form>';
	temp+=  	'</div>';
	temp+=  	'<div class="col-xs-12 col-md-12 content">';	
	temp+=  		' <textarea  id="txt_content" name="txt_content" class="form-control" rows="5"></textarea>';
	temp+=  	'</div>';	
	//temp+='<button type="button" id="btn_send" onclick="send_data()" class="btn btn-info btn-sm"><i class="fa fa-floppy-o"></i> Send</button>';
	//temp+='<button type="button" id="btn_save_file" onclick="save_file()" class="btn btn-info btn-sm"><i class="fa fa-floppy-o"></i> Save file</button>';
	return temp;
}

function getListLanguage(){
	$.ajax({
		type : "GET",
		url : $pathWebService + "pmslanguage",
		cache : false,
		async : true,
		data : {
			action : 'getlistlanguage',			
		},
		success : function(response) {		
			$.each(response, function(i, item) {
				var listlang = {
					id : item.idLang,
					name : unescape(item.name),
					code : unescape(item.code),
					invisible : item.invisible,					
					image:item.flagimage
				};
				$listLanguage.push(listlang);				
			});
			
		}
	});
}

function time_format(d) {
	day =format_two_digits(d.getDay()+1);
    hours = format_two_digits(d.getHours());
    minutes = format_two_digits(d.getMinutes());
    seconds = format_two_digits(d.getSeconds());
    return day+hours +minutes + seconds;
}

function format_two_digits(n) {
    return n < 10 ? '0' + n : n;
}

function previewFile(){	
	var d = new Date();
	var image_name = time_format(d);
	var image = document.getElementById("myImg");
    var file =  document.getElementById("file_upload").files[0];   
    var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = function() {
		if (checkFileImgage(file)) {	
			//image.src=reader.result;
			var oData = new FormData(document.forms.namedItem("form_image"));
			oData.append("image_name", image_name);
			oData.append("file", file);
			$.ajax({
				type : "POST",
				url : 'Upload_Image.elcom',
				cache : false,		
				data : oData,
				processData: false,  // tell jQuery not to process the data
		        contentType: false ,
				success : function(response) {
					var name_image =response.data;					
					image.src=$path_image+ "/images/"+name_image+".jpg?param="+image_name;					
				}
			});
			
		} else {
			image.src = "";			
			document.getElementById("file_upload").value="";
			alert("Please choose image");			
		}
	};
}

function upload_file_html(){
	var meta='<link href="css/app.min.css" rel="stylesheet">';
	meta+='<link href="css/font-awesome.min.css" rel="stylesheet">';	
	meta +='<meta charset="utf-8">';	
	var data =$("#div_center").html();
	 var d = new Date();
	 file_name = time_format(d);
	//var file_name="";	
	//file_name=$("#file_name").val();		
	 var name_ =$("#file_name").val();	
		if(name_==null || name_==""){
			alert("Please enter name");
			return false;
		}
	if(name==null || name==""){
		
	}
	 var arr = JSON.stringify($listLanguage);
	// for(var i=0;i<$listLanguage.length;i++){
			$.ajax({
		        type: "POST",
		        url: "insert_file.elcom",	        
		        cache : false,		
		        data : {
					'file_data': meta+data,	
					'file_name':file_name,
					'code':arr,				
				},  		
		        success: function(response){        	
		        	alert(response.data);
		        	addContentfFiletoDatabase(name_);
		        	$(".Editor-editor").html("");
		        	$("#content-paste").empty();
		        	$("#file_name").val("");	
		        	var image = document.getElementById("myImg");
		        	if(image!=null){
		        		image.src="STYLE-INF/images/no_images.jpg";
		        	}else if(image=null){        	
		        		var image_ = document.createElement('img');
		        		image_.src="STYLE-INF/images/no_images.jpg";
		        	}
		        	
		        },
		        error: function(x,e){
		            alert("error occur");
		        } 
		    });	
	// }

}



function save_file(){	
	/*var file_name="";	
	file_name=$("#file_name").val();	
	if(file_name==null || file_name==""){
		alert("Please enter file name");
		 return false; ;
	}*/
	upload_file_html();

}

function formatdata(){
	var pastedData="";
	$(".Editor-editor").empty();
	$(".Editor-editor").bind("paste", function(e){		
		 pastedData = e.originalEvent.clipboardData.getData('text');	  
		 document.execCommand('insertText', false, pastedData);
		 event.preventDefault();
		
		} );
}

function get_content_form(){
	//$("#content-paste").empty();
	/*var question=$(".Editor-editor").html();	
	$("#content-paste").append(question);
	*/
	
	var question=$(".Editor-editor").html();	
	
	if(question==null || question==""){
		return;
	}
	$("#content-paste").empty();
	$("#content-paste").append(question);
	
}

/*function create_file_type(){
	$("#myImg").empty();
	$( "#myImg").unbind( "click" );	
	alert("111");
	$("#myImg").on("click",function(){		
		  $("input[id='file_upload']").focus().click();		
		 
	});
	
}*/	


function checkFileImgage(file) {
	var fileName = file.name;
	var extension = fileName.substr((fileName.lastIndexOf('.') + 1));
	if (extension == 'jpg' || extension == 'jpeg' || extension == 'gif'
			|| extension == 'png' || extension == 'bmp') {
		return true;
	} else {
		return false;
	}
}

//open window
function openWindow(id) {
	//$('#' + id).window('open');
	$("#" + id).modal("show");
}

// close window
function closeWindow(id) {
	//$('#' + id).window('close');
	 $("#" + id).modal("hide");
}


