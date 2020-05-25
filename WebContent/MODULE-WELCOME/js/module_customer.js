var idx=0;

$(function(){	
	$("#id_room").change(function(){
		var folionum=$("#id_room").val();
		$.ajax({
			type : "GET",
			url : $pathWebService+"pmsfolio",
			cache : false,
			data : {
				action : "getlistguest",	
				folionum: folionum,
			},
			success : function(response) {	
				var html="";
				$("#div_load_cus").empty();
				if(response.lenght == 0 || response == "" ||response == null){
					 html+='<div class="form-group" data-book-index="0">';
					 html+='<div class="row">';
					  html+='<div class="col-md-12">';
					  html+='<div class="col-md-3">';
					  html+='<input type="hidden" id="id_client_0" ></input>';
					  html+='<input type="text" class="form-control" placeholder="Input firstname here..." id="firstname_0" name="firstname" />';
					  html+='</div>';
					  html+='<div class="col-md-3">';
					  html+='<input type="text" class="form-control" placeholder="Input lastname here..." id="lastname_0" name="lastname" />';
					  html+='</div>';
					  html+='<div class="col-md-3">';
					  html+='<input type="text" class="form-control" placeholder="Input Mr,Mrs..." id="clientname_0" name="clientname" />';
					  html+='</div>';					
					  html+='<div class="col-md-1">';
					  html+='<input type="radio" name="cus_pri" id="cus_pri_0"></input>';
					  html+='</div>';
					  html+='<div class="col-md-2">';
					  html+=' <button type="button" class="btn btn-default removeButton"><i class="fa fa-minus"></i></button>';
					  html+=' <button type="button" class="btn btn-default addButton"><i class="fa fa-plus"></i></button>';
					  html+='</div>';
					  html+='</div>	';
					  html+='</div>	';
					  html+='</div>	';			  		
					  $("#div_load_cus").append(html);
					  html="";
				}else{
					  $.each(response, function (i, item) {	
						  
						  var str="'"+folionum+"','"+item.clientid+"'";
						  
						  html+='<div class="form-group" data-book-index="'+i+'">';
						  html+='<div class="row">';
						  html+='<div class="col-md-12">';
						  html+='<div class="col-md-3">';
						  html+='<input type="hidden" id="id_client_'+i+'" value="'+$.trim(item.clientid)+'"></input>';
						  html+='<input type="text" class="form-control"  id="firstname_'+i+'" name="firstname" value="'+$.trim(item.firstname)+'" />';
						  html+='</div>';
						  html+='<div class="col-md-3">';
						  html+='<input type="text" class="form-control" id="lastname_'+i+'" name="lastname" value="'+$.trim(item.lastname)+'" />';
						  html+='</div>';
						  html+='<div class="col-md-3">';
						  html+='<input type="text" class="form-control" id="clientname_'+i+'" name="clientname" value="'+$.trim(item.clientname)+'" />';
						  html+='</div>';
						  if(item.roomsharer==0){
							  html+='<div class="col-md-1">';
							  html+='<input type="radio" name="cus_pri" id="cus_pri_'+i+'" checked="checked"></input>';
							  html+='</div>';
						  }else{
							  html+='<div class="col-md-1">';
							  html+='<input type="radio" name="cus_pri" id="cus_pri_'+i+'"></input>';
							  html+='</div>';
						  }
						  idx=i;
						  if(i>0){
							  html+='<div class="col-md-2">';
							  html+=' <button type="button" class="btn btn-default" onclick="delete_customer('+str+');"><i class="fa fa-minus"></i></button>';
							  html+='</div>';
						  }else {
							  html+='<div class="col-md-2">';
							  html+=' <button type="button" class="btn btn-default " onclick="delete_customer('+str+');"><i class="fa fa-minus"></i></button>';
							  html+=' <button type="button" class="btn btn-default addButton"><i class="fa fa-plus"></i></button>';
							  html+='</div>';
						  }
						  html+='</div>	';
						  html+='</div>	';
						  html+='</div>	';
					    });
				}
				
				  $("#div_load_cus").append(html);
				  html="";
				  idx++;
				  	$(".addButton").click(function(){			    		
				  		
				  		 html+='<div class="form-group" data-book-index="'+idx+'">';
				  		  html+='<div class="row">';
						  html+='<div class="col-md-12">';
						  html+='<div class="col-md-3">';
						  html+='<input type="hidden" id="id_client_'+idx+'" ></input>';
						  html+='<input type="text" class="form-control" placeholder="Input firstname here..." id="firstname_'+idx+'" name="firstname" />';
						  html+='</div>';
						  html+='<div class="col-md-3">';
						  html+='<input type="text" class="form-control" placeholder="Input lastname here..." id="lastname_'+idx+'" name="lastname" />';
						  html+='</div>';
						  html+='<div class="col-md-3">';
						  html+='<input type="text" class="form-control" placeholder="Input Mr,Mrs..." id="clientname_'+idx+'" name="clientname" />';
						  html+='</div>';					
						  html+='<div class="col-md-1">';
						  html+='<input type="radio" name="cus_pri" id="cus_pri_'+idx+'"></input>';
						  html+='</div>';
						  html+='<div class="col-md-2">';
						  html+=' <button type="button" class="btn btn-default removeButton_load"><i class="fa fa-minus"></i></button>';
						  html+='</div>';
						  html+='</div>	';
						  html+='</div>	';
						  html+='</div>	';
						  $("#div_load_cus").append(html);
						  html="";
			    	})  ;  
			}
		});
	});
	
	
	
	
	  var titleValidators = {
	            row: '.col-xs-4',   // The title is placed inside a <div class="col-xs-4"> element
	            validators: {
	                notEmpty: {
	                    message: 'The title is required'
	                }
	            }
	        },
	  
	        bookIndex = idx;

	    $('#bookForm').formValidation({
	            framework: 'bootstrap',	         
	        })
	       
	        // Remove button click handler
	        .on('click', '.removeButton', function() {
	            var $row  = $(this).parents('.form-group'),
	                index = $row.attr('data-book-index');

	            // Remove fields
	            $('#bookForm')
	            	.formValidation('removeField', $row.find('[name="id_client_'+index+'"]'))
	                .formValidation('removeField', $row.find('[name="firstname_'+index+'"]'))
	                .formValidation('removeField', $row.find('[name="lastname_'+index+'"]'))
	                .formValidation('removeField', $row.find('[name="clientname_'+index+'"]'))
	                .formValidation('removeField', $row.find('[name="cus_pri_'+index+'"]'));

	            // Remove element containing the fields
	            $row.remove();
	        })
	    
	    
	 // Remove button click handler
        .on('click', '.removeButton_load', function() {
            var $row  = $(this).parents('#div_load_cus .form-group'),
                index = $row.attr('data-book-index');

            // Remove fields
            $('#bookForm')
            	.formValidation('removeField', $row.find('[name="id_client_'+index+'"]'))
                .formValidation('removeField', $row.find('[name="firstname_'+index+'"]'))
                .formValidation('removeField', $row.find('[name="lastname_'+index+'"]'))
                .formValidation('removeField', $row.find('[name="clientname_'+index+'"]'))
                .formValidation('removeField', $row.find('[name="cus_pri_'+index+'"]'));

            // Remove element containing the fields
            $row.remove();
        });
	    
	  

});

function delete_customer(idroom,idclient){
	if (confirm("Are you sure?")) {
		$.ajax({
			type : "POST",
			url : $pathWebService+"pmsfolio",		
			cache : false,
			data : {		
				action: "removeguest",
				folionum:idroom,						
				clientid:idclient	
				
			},
			success : function(response) {
				if(response>0){
					//alert("Delete successful");
					//showMessageSuccess(getValueField("delete-success"));
					load_customer(idroom);
				}else{
					//alert("Delete not successful");
					showMessageError(getValueField("delete-fail"));
				}
			}
		});
	}
	return false;
}

function insert_customer(){	
	var length = $( '#bookForm .form-group .row ' ).length;	
	$.each($('#bookForm .form-group .row'), function (i, item) {		
		var id_room=$("#id_room").val();
		if(i !== (length -1 )){
		 	var client_id =  $("#id_client_"+i).val();
		 	if(client_id=="" || client_id==null){
		 		client_id ="-1";
		 	}
		 	var firstname =  $("#firstname_"+i).val();	
			var lastname =  $("#lastname_"+i).val();	
			var clientname =  $("#clientname_"+i).val();	
			var myRadio = $('input[id=cus_pri_'+i+']');
			var checkedValue = myRadio.filter(':checked').val();
			if(checkedValue=="on"){
				checkedValue="0";
			}else{
				checkedValue="1";
			}
			var cus_pri=  checkedValue;					
				$.ajax({
					type : "POST",
					url : $pathWebService+"pmsfolio",		
					cache : false,
					data : {		
						action: "addorupdateguest",
						folionum:id_room,						
						clientid:client_id,
						firstname:firstname,
						lastname:lastname,
						personal:clientname,
						roomshare:cus_pri
						
					},
					success : function(response) {
						if(response>0){
							//alert("Add successful");
							//showMessageSuccess(getValueField("create-success"));
						}else{
							showMessageError(getValueField("create-fail"));
						}
					}
				});
				
		 }
		
	});

}
