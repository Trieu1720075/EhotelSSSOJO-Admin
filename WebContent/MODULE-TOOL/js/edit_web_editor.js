$(function(){
	Load_File_Data();
	//$("#txt_content").Editor();	
	 
});

/*function Load_Event_Click(){
	$("#txt_content").empty();			
	$("#content-paste").on("click",function(){	
		
		$(".Editor-editor").empty();	
		$(".Editor-editor").removeData();		
		openWindow("myModal");
		//$("#txt_content").Editor();			
	});	
	//create_file_type();
	$('#myImg').click(function () {
		$("input[id='file_upload']").focus().click();		
	});
}*/



/*function Load_Event_Click_add(){
	$("#txt_content").empty();			
	$("#content-paste").on("click",function(){			
		$(".Editor-editor").empty();	
		$(".Editor-editor").removeData();		
		openWindow("myModal");
		//$("#txt_content").Editor();			
	});	
	$('#myImg').click(function () {
		$("input[id='file_upload']").focus().click();		
	});
	//create_file_type();
}*/

function get_content_form(){
	var question=$(".Editor-editor").html();	
	if(question==null || question==""){
		return;
	}
	$("#content-paste").empty();
	$("#content-paste").append(question);
	
}

function Load_File_Data(){		
	 $.ajax({
	        type: "POST",
	        url: "tool/Load_Edit_File.elcom",	
	        data : {
				'url' : $path_file_html,				
			},   
	        success: function(response){	
	   		var data_=response.data;
	    //  alert(data_);
	      $("#div_center").html(data_);
	   //   Load_Event_Click_Edit();
	      Load_Event_Click();
	      
	      
	        },
	        error: function(x,e){
	            alert("error occur");
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
/*function previewFile(){	
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
					image.src="../html/images/"+name_image+".jpg";					
				}
			});
			
		} else {
			image.src = "";			
			document.getElementById("file_upload").value="";
			alert("Please choose image");			
		}
	};
}*/


function upload_file_html_edit(){
	var meta='<link href="css/app.min.css" rel="stylesheet">';
	meta+='<link href="css/font-awesome.min.css" rel="stylesheet">';	
	meta +='<meta charset="utf-8">';	
	var data =$("#div_center").html();
	
	//var file_name="";	
	//file_name=$("#file_name").val();		
	var name=$("#file_name").val();
	if(name==null || name==""){
		alert("Please enter name file");
		return false;
	}
	$.ajax({
        type: "POST",
        url: "tool/Edit_File.elcom",	        
        cache : false,		
        data : {
			'file_data': meta+data,	
			//'file_name':file_name,
		},  		
        success: function(response){        	
        	//alert(response.data);
        	EditContentInfo(name);
        	$(".Editor-editor").html("");
        	$("#content-paste").empty();
        	$("#file_name").val("");	
        	$("#item-html").hide();
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