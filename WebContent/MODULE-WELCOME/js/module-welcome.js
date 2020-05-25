var $name_images = "";
$(function() {
	load_room();
	// loadDataList();
	Load_List_Background();
	load_data_content();
	Load_List_Background_Music();
	Load_List_Background_Standby();
	Load_List_Background_Back();
});

function load_room() {
	$("#id_room").empty();
	$.ajax({
		type : "GET",
		url : $pathWebService + "pmsfolio",
		cache : false,
		data : {
			action : "getlistfolio",
		},
		success : function(response) {
			var select = $("#id_room");
			var combo = "";
			$.each(response, function(i, item) {
				combo += "<option value='" + item.room + "'>" + item.room
						+ "</option>";
			});
			select.append(combo);
			var folionum = $("#id_room").val();
			load_customer(folionum);
		}
	});
}

function load_customer(folio) {
	$
			.ajax({
				type : "GET",
				url : $pathWebService + "pmsfolio",
				cache : false,
				data : {
					action : "getlistguest",
					folionum : folio,
				},
				success : function(response) {
					var html = "";
					$("#div_load_cus").empty();
					if (response.lenght == 0 || response == ""
							|| response == null) {
						html += '<div class="form-group" data-book-index="0">';
						html += '<div class="row">';
						html += '<div class="col-md-12">';
						html += '<div class="col-md-3">';
						html += '<input type="hidden" id="id_client_0" ></input>';
						html += '<input type="text" class="form-control" placeholder="Input firstname here..."  id="firstname_0" name="firstname" />';
						html += '</div>';
						html += '<div class="col-md-3">';
						html += '<input type="text" class="form-control" placeholder="Input lastname here..." id="lastname_0" name="lastname" />';
						html += '</div>';
						html += '<div class="col-md-3">';
						html += '<input type="text" class="form-control" id="clientname_0" placeholder="Input Mr,Mrs..." name="clientname" />';
						html += '</div>';
						html += '<div class="col-md-1">';
						html += '<input type="radio" name="cus_pri" id="cus_pri_0"></input>';
						html += '</div>';
						html += '<div class="col-md-2">';
						html += ' <button type="button" class="btn btn-default removeButton_load"><i class="fa fa-minus"></i></button>';
						html += ' <button type="button" class="btn btn-default addButton"><i class="fa fa-plus"></i></button>';
						html += '</div>';
						html += '</div>	';
						html += '</div>	';
						html += '</div>	';
						$("#div_load_cus").append(html);
						html = "";
					} else {
						$
								.each(
										response,
										function(i, item) {
											var str = "'" + folio + "','"
													+ item.clientid + "'";
											html += '<div class="form-group" data-book-index="'
													+ i + '">';
											html += '<div class="row">';
											html += '<div class="col-md-12">';
											html += '<div class="col-md-3">';
											html += '<input type="hidden" id="id_client_'
													+ i
													+ '" value="'
													+ $.trim(item.clientid)
													+ '"></input>';
											html += '<input type="text" class="form-control"  id="firstname_'
													+ i
													+ '" name="firstname" value="'
													+ $.trim(item.firstname)
													+ '" />';
											html += '</div>';
											html += '<div class="col-md-3">';
											html += '<input type="text" class="form-control" id="lastname_'
													+ i
													+ '" name="lastname" value="'
													+ $.trim(item.lastname)
													+ '" />';
											html += '</div>';
											html += '<div class="col-md-3">';
											html += '<input type="text" class="form-control" id="clientname_'
													+ i
													+ '" name="clientname" value="'
													+ $.trim(item.clientname)
													+ '" />';
											html += '</div>';
											if (item.roomsharer == 0) {
												html += '<div class="col-md-1">';
												html += '<input type="radio" name="cus_pri" id="cus_pri_'
														+ i
														+ '" checked="checked"></input>';
												html += '</div>';
											} else {
												html += '<div class="col-md-1">';
												html += '<input type="radio" name="cus_pri" id="cus_pri_'
														+ i + '"></input>';
												html += '</div>';
											}

											if (i > 0) {
												html += '<div class="col-md-2">';
												html += ' <button type="button" class="btn btn-default " onclick="delete_customer('
														+ str
														+ ');"><i class="fa fa-minus"></i></button>';
												html += '</div>';
											} else {
												html += '<div class="col-md-2">';
												html += ' <button type="button" class="btn btn-default " onclick="delete_customer('
														+ str
														+ ');"><i class="fa fa-minus"></i></button>';
												html += ' <button type="button" class="btn btn-default addButton"><i class="fa fa-plus"></i></button>';
												html += '</div>';
											}
											html += '</div>	';
											html += '</div>	';
											html += '</div>	';
											idx = i;
										});
					}

					$("#div_load_cus").append(html);
					html = "";
					idx++;
					$(".addButton")
							.click(
									function() {

										html += '<div class="form-group" data-book-index="'
												+ idx + '">';
										html += '<div class="row">';
										html += '<div class="col-md-12">';
										html += '<div class="col-md-3">';
										html += '<input type="hidden" id="id_client_'
												+ idx + '" ></input>';
										html += '<input type="text" class="form-control" placeholder="Input firstname here..." id="firstname_'
												+ idx + '" name="firstname" />';
										html += '</div>';
										html += '<div class="col-md-3">';
										html += '<input type="text" class="form-control" placeholder="Input lastname here..." id="lastname_'
												+ idx + '" name="lastname" />';
										html += '</div>';
										html += '<div class="col-md-3">';
										html += '<input type="text" class="form-control" placeholder="Input Mr,Mrs..." id="clientname_'
												+ idx
												+ '" name="clientname" />';
										html += '</div>';
										html += '<div class="col-md-1">';
										html += '<input type="radio" name="cus_pri" id="cus_pri_'
												+ idx + '"></input>';
										html += '</div>';
										html += '<div class="col-md-2">';
										html += ' <button type="button" class="btn btn-default removeButton_load"><i class="fa fa-minus"></i></button>';
										html += '</div>';
										html += '</div>	';
										html += '</div>	';
										html += '</div>	';
										$("#div_load_cus").append(html);
										html = "";
									});
				}
			});
}

function Load_Language(response) {
	$("#myTableLanguage").empty();
	$('#tbl_language_item tbody').empty();

	var myTableLanguage = document.getElementById('myTableLanguage');
	var rowLanguage1 = myTableLanguage.insertRow(myTableLanguage.rows.length);
	var rowLanguage2 = myTableLanguage.insertRow(myTableLanguage.rows.length);
	$.each(response, function(i, item) {
		var columnLanguage1 = rowLanguage1.insertCell(i);
		var iconLanguage = document.createElement("img");
		iconLanguage.id = 'imgIconLanguage' + item.idLanguage;
		iconLanguage.src = $path_image_flag + item.flagimage;
		iconLanguage.setAttribute("class", "imgIconLanguage");
		iconLanguage.setAttribute('onclick', "openDialogEditLanguage('"
				+ item.idLang + "','" + item.name + "','" + item.code + "','"
				+ item.flagimage + "')");
		columnLanguage1.appendChild(iconLanguage);

		index = i;
	});

	var columnLanguage3 = rowLanguage1.insertCell(index + 1);
	var btnEditIconLanguage = document.createElement('input');
	btnEditIconLanguage.setAttribute('type', 'button');
	btnEditIconLanguage.setAttribute('onclick', "OpenFormAddLanguage()");
	btnEditIconLanguage.setAttribute('class', 'btnAdd');
	columnLanguage3.appendChild(btnEditIconLanguage);
}

function load_data_content() {
	$('#img_logo_small').empty();
	$('#img_logo').empty();
	$.ajax({
		type : "GET",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "gettextwelcome",
		},
		success : function(response) {
			var path_logo = response.logo;
			var path_logo_small = response.logosmall;
			$("#txt_gioithieu").val(response.line01);
			$("#txt_dichvu").val(response.line02);
			$('#img_logo').attr('src', $path_image + path_logo);
			$('#img_logo_small').attr('src', $path_image + path_logo_small);
			$('#file_logo_old').val(path_logo);
			$('#file_logo_small_old').val(path_logo_small);
		}
	});

}
function save_data_content() {
	var d = new Date();
	var image_name_logo = time_format(d);
	var file_logo = document.getElementById("file_logo").files[0];
	var txt_gioithieu = $("#txt_gioithieu").val();
	var txt_dichvu = $("#txt_dichvu").val();
	var txt_file_logo_old = $("#file_logo_old").val();
	var txt_file_logo_small_old = $("#file_logo_small_old").val();
	if (document.getElementById("file_logo").files.length == 0
			&& document.getElementById("file_logo_small").files.length == 0) {
		save_data_to_database(txt_gioithieu, txt_dichvu, txt_file_logo_old,
				txt_file_logo_small_old);
	} else if (document.getElementById("file_logo").files.length != 0
			&& document.getElementById("file_logo_small").files.length != 0) {
		upload_two_logo();
		save_data_to_database(txt_gioithieu, txt_dichvu, txt_file_logo_old,
				txt_file_logo_small_old);

	} else if (document.getElementById("file_logo").files.length != 0) {
		upload_file_logo();
		save_data_to_database(txt_gioithieu, txt_dichvu, txt_file_logo_old,
				txt_file_logo_small_old);

	} else if (document.getElementById("file_logo_small").files.length != 0) {
		upload_file_logo_small();
		save_data_to_database(txt_gioithieu, txt_dichvu, txt_file_logo_old,
				txt_file_logo_small_old);

	} else {

	}

}

function upload_two_logo() {
	var oData = new FormData(document.forms.namedItem("form_welcome"));
	var file_logo = document.getElementById("file_logo").files[0];
	var file_logo_small = document.getElementById("file_logo_small").files[0];
	oData.append("file_logo", file_logo);
	oData.append("file_logo_small", file_logo_small);
	$.ajax({
		type : "POST",
		url : 'welcome/save_two_logo.elcom',
		cache : false,
		data : oData,
		processData : false, // tell jQuery not to process the data
		contentType : false,
		success : function(response) {
			var name_logo = response.name_logo;
			var name_logo_small = response.name_logo_small;
			$("#file_logo_old").val(name_logo);
			$("#file_logo_small_old").val(name_logo_small);

		}
	});
}

function upload_file_logo() {
	var oData = new FormData(document.forms.namedItem("form_welcome"));
	var file_logo = document.getElementById("file_logo").files[0];
	oData.append("file_logo", file_logo);
	$.ajax({
		type : "POST",
		url : 'welcome/save_logo.elcom',
		cache : false,
		data : oData,
		processData : false, // tell jQuery not to process the data
		contentType : false,
		success : function(response) {
			var fileName = response.fileName;
			$("#file_logo_old").val(fileName);
		}
	});
}

function upload_file_logo_small() {
	var oData = new FormData(document.forms.namedItem("form_welcome"));
	var file_logo = document.getElementById("file_logo_small").files[0];
	oData.append("file_logo", file_logo);
	$.ajax({
		type : "POST",
		url : 'welcome/save_logo_small.elcom',
		cache : false,
		data : oData,
		processData : false, // tell jQuery not to process the data
		contentType : false,
		success : function(response) {
			var fileName = response.fileName;
			$("#file_logo_small_old").val(fileName);
		}
	});
}

function save_data(image_name_logo) {
	var txt_gioithieu = $("#txt_gioithieu").val();
	var txt_dichvu = $("#txt_dichvu").val();
	var name_logo_small = $("#file_logo_small_old").val();
	var image_name_logo = image_name_logo;
	var oData = new FormData(document.forms.namedItem("form_welcome"));
	var file_logo = document.getElementById("file_logo").files[0];
	oData.append("image_name_logo", image_name_logo);
	oData.append("file_logo", file_logo);
	$.ajax({
		type : "POST",
		url : 'welcome/save_Welcome.elcom',
		cache : false,
		data : oData,
		processData : false, // tell jQuery not to process the data
		contentType : false,
		success : function(response) {
			var fileName = response.fileName;
			$name_images = fileName;
			save_data_to_database(txt_gioithieu, txt_dichvu, $name_images,
					name_logo_small);
			load_data_content();
		}
	});

}
function save_data_to_database(gioithieu_, dichvu_, file_logo_,
		file_logo_small_) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "updatetextwelcome",
			line01 : gioithieu_,
			line02 : dichvu_,
			logo : file_logo_,
			logosmall : file_logo_small_
		},
		success : function(response) {
			if (response > 0) {
				// alert("Add successful");
				// showMessageSuccess(getValueField("create-success"));

			} else {
				// alert("Add not successful")
				showMessageError(getValueField("create-fail"));
			}
		}
	});
}

function openWindowLanguage() {
	openWindow("tbl_language");
}

function OpenFormAddLanguage() {
	$("#txt_tenquocgia").val("");
	$("#txt_maquocgia").val("");
	$("#file_lag").val("")
	$("#img_lag").attr('src', "");
	openWindow("form_language");
	closeWindow("tbl_language");
}

function loadDataList() {
	// var actionPath = 'welcome/load_language.elcom';
	$.ajax({
		type : "GET",
		url : $pathWebService + "pmslanguage",
		cache : false,
		data : {
			action : "getlistlanguage"
		},
		success : function(response) {
			Load_Language(response);

		}
	});
}

// upload a image file
function previewFile(idImage, idFile, idFileName) {
	var image = document.getElementById(idImage);
	var file = document.getElementById(idFile).files[0];
	var fileName = document.getElementById(idFileName);
	var reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = function() {
		if (checkFileImgage(file)) {
			image.src = reader.result;
			fileName.value = file.name;
		} else {
			image.src = "";
			fileName.value = "";
			document.getElementById(idFile).value = "";
			// alert("Please choose image");
			showMessageError("Please choose image");
		}
	};
}

// check file upload must be image file
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

function closedialogbackground() {
	closeWindow("form_add_background");
}
function opendialogbackground() {
	$("#file_background").val("");
	$("#img_background").attr('src', "");
	openWindow("form_add_background");
}

function openDialogEditLanguage(idLanguage, namelanguage, codelanguage,
		path_image) {
	openWindow("form_update_language");
	$("#id_language_update").val(idLanguage);
	$("#txt_tenquocgia_update").val(namelanguage);
	$("#txt_maquocgia_update").val(codelanguage);
	$("#img_lag_update").attr('src', $path_image_flag + path_image);
	$("#name_lag_update").val(path_image);
	$("#file_lag_update").val("");

}

function editLanguage() {
	var actionPath = 'welcome/add_language.elcom';
	// var name_imageupdate= $("#name_lag_update").val();
	var d = new Date();
	var image_name_flag = time_format(d);
	var file_flag = document.getElementById("file_lag_update").files[0];
	if (document.getElementById("file_lag_update").files.length != 0) {
		var oData = new FormData(document.forms
				.namedItem("id_form_update_language"));
		oData.append("image_name_flag", image_name_flag);
		oData.append("file_flag", file_flag);
		$.ajax({
			type : "POST",
			url : actionPath,
			data : oData,
			processData : false, // tell jQuery not to process the data
			contentType : false,
			success : function(response) {
				$name_images = response.fileName;
				if ($name_images != null) {
					edit_language_database($name_images);
				}
			}
		});
	} else {
		edit_language_database("");
	}

}
function edit_language_database(imagename) {
	if (imagename == null || imagename == "") {
		imagename = $("#name_lag_update").val();
	}
	var id_language = $("#id_language_update").val();
	var tenquocgia = $("#txt_tenquocgia_update").val();
	var maquocgia = $("#txt_maquocgia_update").val();

	$.ajax({
		type : "POST",
		url : $pathWebService + "pmslanguage",
		cache : false,
		data : {
			action : "editlanguage",
			name : tenquocgia,
			code : maquocgia,
			image : imagename,
			langId : id_language
		},
		success : function(response) {
			if (response > 0) {
				// alert("Edit language successful")
				// //showMessageSuccess("Delete successful");
				// showMessageSuccess(getValueField("edit-success"));
				loadDataList();
				closeWindow("form_update_language");
			} else if (response = -2) {
				// showMessageError("Delete not successful")
				// alert("Edit language exits")
				showMessageError(getValueField("edit-fail"));
			} else if (response = -1) {
				// showMessageError("Delete not successful")
				// alert("Edit language not successful")
				showMessageError(getValueField("edit-fail"));
			}

		}
	});
}

function deleteLanguage() {
	var idlang = $("#id_language_update").val();

	if (confirm("Are you sure?")) {
		$.ajax({
			type : "POST",
			url : $pathWebService + "pmslanguage",
			cache : false,
			data : {
				action : "deletelanguage",
				langId : idlang

			},
			success : function(response) {
				if (response > 0) {
					// alert("Delete successful")
					// //showMessageSuccess("Delete successful");
					// showMessageSuccess(getValueField("delete-success"));
					closeWindow("form_update_language");
					loadDataList();
				} else {
					// showMessageError("Delete not successful")
					// alert("Delete not successful")
					showMessageError(getValueField("delete-fail"));
				}

			}
		});
	}
	return false;

}
function showMessageSuccess(message) {
	$("#body-msg-success").empty();
	$("#body-msg-success").html(message);
	openDialog("msg-success");
	setTimeout(function() {
		closeDialog("msg-success");
	}, 2000);
}

function showMessageError(message) {
	$("#body-msg-error").empty();
	$("#body-msg-error").html(message);
	openDialog("msg-error");
	setTimeout(function() {
		closeDialog("msg-error");
	}, 2000);
}

function addlanguage() {
	var actionPath = 'welcome/add_language.elcom';
	var d = new Date();
	var image_name_flag = time_format(d);
	var tenquocgia = $("#txt_tenquocgia").val();
	var maquocgia = $("#txt_maquocgia").val();
	var file_flag = document.getElementById("file_lag").files[0];

	if (tenquocgia == null || tenquocgia == "") {

		showMessageError("Please input name");
		return false;
	}

	if (maquocgia == null || maquocgia == "") {
		// alert("Please input code");
		showMessageError("Please input code");
		return false;
	}

	if (file_flag == null) {
		// alert("Please choose image");
		showMessageError("Please choose image");
		return false;
	}

	var oData = new FormData(document.forms.namedItem("id_form_language"));
	oData.append("image_name_flag", image_name_flag);
	oData.append("file_flag", file_flag);
	$.ajax({
		type : "POST",
		url : actionPath,
		data : oData,
		processData : false, // tell jQuery not to process the data
		contentType : false,
		success : function(response) {
			$name_images = response.fileName;
			if ($name_images != null) {
				add_language_database($name_images);
			}
		}
	});

}
function add_language_database(imagename) {
	var tenquocgia = $("#txt_tenquocgia").val();
	var maquocgia = $("#txt_maquocgia").val();
	$.ajax({
		type : "POST",
		url : $pathWebService + "pmslanguage",
		cache : false,
		data : {
			action : "addlanguage",
			name : tenquocgia,
			code : maquocgia,
			image : imagename
		},
		success : function(response) {
			if (response > 0) {
				// alert("Add language successful")
				// showMessageSuccess(getValueField("create-success"));
				closeWindow("form_language");
				// //showMessageSuccess("Delete successful");
				loadDataList();
			} else if (response = -2) {
				// showMessageError("Delete not successful")
				// alert("Language exits")
				showMessageError(getValueField("create-fail"));
			} else if (response = -1) {
				// showMessageError("Delete not successful")
				// alert("Add language not successful")
				showMessageError(getValueField("create-fail"));
			}

		}
	});
}

function Load_List_Background() {
	$("#id_put_data_background").empty();
	$
			.ajax({
				type : "GET",
				url : $pathWebService + "system",
				cache : false,
				data : {
					action : "getlistadvertise",
					type : "WELCOME",

				},
				success : function(response) {
					var html = "";
					$
							.each(
									response,
									function(i, item) {
										var str = "'" + item.id + "','"
												+ item.image + "'";
										var str_invisible = "'" + item.id
												+ "','" + item.image + "','"
												+ item.background + "','"
												+ item.invisible + "'";
										html += '<div class="col-md-3" style="margin-bottom: 10px;">';
										html += '<div class="thumbnail text-center">';
										html += '<div style="font-size: 60px">';
										html += '<img alt="" src="'
												+ $path_image_background
												+ item.image + '"';
										html += 'style="height: 150px; width: 100%;">';
										html += '</div>';
										// html+='<div class="div_bottom"
										// style="padding: 0px;">';

										// html+='</div>';
										html += '<div class="panel-footer text-center">';
										var xx = parseInt(item.background);
										if (xx != 0) {
											html += '<label class="div_bottom">';
											html += '<input type="checkbox" class="div_checkbok" name="radio_main" checked="checked" onclick="setmain_background('
													+ str
													+ ')"><span class="label label-primary">Set BG</span>';
											html += '</label>';
										} else {

											html += '<label class="div_bottom">';
											html += '<input type="checkbox" class="div_checkbok"  name="radio_main" onclick="setmain_background('
													+ str
													+ ')"><span class="label label-primary">Set BG</span>';
											html += '</label>';

											html += '<label class="div_bottom">';
											html += '<span class="label label-info">Slide</span>';
											html += '</label>';
										}
										html += '<button type="button" class="btnDelete" onclick="deleted_background('
												+ str + ')"></button>';
										if (item.invisible == 1) {
											html += '<input id="isactive'
													+ item.id
													+ '" name="isactive"  type="checkbox" data-toggle="toggle"  data-size="mini" onchange="getChangestatus('
													+ str_invisible + ')">';
										} else if (item.invisible == 0) {
											html += '<input id="isactive'
													+ item.id
													+ '" name="isactive" checked="checked"  type="checkbox" data-toggle="toggle" data-size="mini" onchange="getChangestatus('
													+ str_invisible + ')">';
										}
										html += '</div>';
										html += '</div>';
										html += '</div>';

									});
					$("#id_put_data_background").append(html);
					$.each(response, function(i, item) {
						$("#isactive" + item.id).bootstrapToggle();
					});
				}
			});

}

function getChangestatus(id, name_, background_, invisible_) {
	if (invisible_ == 0) {
		invisible_ = 1;
	} else if (invisible_ == 1) {
		invisible_ = 0;
	}
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "editadvertise",
			advid : id,
			name : "",
			image : name_,
			type : "WELCOME",
			setbg : background_,
			invisible : invisible_

		},
		success : function(response) {
			if (response > 0) {
				// alert("set invisible successful")
				// showMessageSuccess(getValueField("edit-success"));
				Load_List_Background();
			} else if (response = -2) {
				// alert("set invisible exits")
				showMessageError(getValueField("edit-fail"));
			} else if (response = -1) {
				// alert("set invisible not successful")
				showMessageError(getValueField("edit-fail"));
			}

		}
	});
}

function setmain_background(id, name_) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "editadvertise",
			advid : id,
			name : "",
			image : name_,
			type : "WELCOME",
			setbg : "1",
			invisible : "0"

		},
		success : function(response) {
			if (response > 0) {
				// alert("set main image successful")
				// showMessageSuccess(getValueField("edit-success"));
				Load_List_Background();
			} else if (response = -2) {
				// alert("set main image exits")
				showMessageError(getValueField("edit-fail"));
			} else if (response = -1) {
				// alert("set main image not successful")
				showMessageError(getValueField("edit-fail"));
			}

		}
	});
}

function deleted_background(id, name_) {
	var name = name_;

	if (confirm("Are you sure?")) {
		$.ajax({
			type : "POST",
			url : $pathWebService + "system",
			cache : false,
			data : {
				action : "deleteadvertise",
				id : id,

			},
			success : function(response) {
				if (response > 0) {
					// alert("Deleted image successful")
					// showMessageSuccess(getValueField("delete-success"));
					// delele_file(name);//cho nay xoa file tren server
					Load_List_Background();
					Load_List_Background_Music();
					Load_List_Background_Standby();
					Load_List_Background_Back();
				} else if (response = -2) {
					// alert("Deleted image exits")
					showMessageError(getValueField("delete-fail"));
				} else if (response = -1) {
					// alert("Deleted image not successful")
					showMessageError(getValueField("delete-fail"));
				}

			}
		});
	}
	return false;
}

function delele_file(name_delete) {

	$.ajax({
		type : "POST",
		url : 'welcome/delete_file.elcom',
		cache : false,
		data : {
			file_name : name_delete,
		},
		// processData: false, // tell jQuery not to process the data
		// contentType: false ,
		success : function(response) {

		}
	});

}

function addbackground() {
	showLoading();
	var actionPath = 'welcome/add_background.elcom';
	var d = new Date();
	var image_name_flag = time_format(d);
	var file_background = document.getElementById("file_background").files[0];
	if (document.getElementById("file_background").files.length == 0) {
		alert("Please choose image");
		return false;
	}

	var oData = new FormData(document.forms.namedItem("id_form_add_background"));
	oData.append("image_name_flag", image_name_flag);
	oData.append("file_background", file_background);
	$.ajax({
		type : "POST",
		url : actionPath,
		data : oData,
		processData : false, // tell jQuery not to process the data
		contentType : false,
		success : function(response) {
			$name_images = response.fileName;

			if ($name_images != null) {
				add_background_database($name_images);
			}
		}
	});

}

function add_background_database(name_) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "addadvertise",
			name : "",
			image : name_,
			type : "WELCOME",
			setbg : "0",
			invisible : "0"

		},
		success : function(response) {
			if (response > 0) {
				hideLoading();
				// showMessageSuccess(getValueField("create-success"));
				closeWindow("form_add_background");
				Load_List_Background();
			} else if (response = -2) {
				// alert("set main image exits")
				showMessageError(getValueField("create-fail"));
			} else if (response = -1) {
				// alert("Add background not successful")
				showMessageError(getValueField("create-fail"));
			}

		}
	});
}

function closedialogbackground_standby() {
	closeWindow("form_add_background_standby");
}
function opendialogbackground_standby() {
	$("#file_background_standby").val("");
	$("#img_background_standby").attr('src', "");
	openWindow("form_add_background_standby");
}

function addbackground_standby() {
	showLoading();
	var actionPath = 'welcome/add_background.elcom';
	var d = new Date();
	var image_name_flag = time_format(d);
	var file_background = document.getElementById("file_background_standby").files[0];
	if (document.getElementById("file_background_standby").files.length == 0) {
		alert("Please choose image");
		return false;
	}

	var oData = new FormData(document.forms
			.namedItem("id_form_add_background_standby"));
	oData.append("image_name_flag", image_name_flag);
	oData.append("file_background", file_background);
	$.ajax({
		type : "POST",
		url : actionPath,
		data : oData,
		processData : false, // tell jQuery not to process the data
		contentType : false,
		success : function(response) {
			$name_images = response.fileName;
			if ($name_images != null) {
				add_background_standby_database($name_images);
			}
		}
	});

}

function add_background_standby_database(name_) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "addadvertise",
			name : "",
			image : name_,
			type : "STANDBY",
			setbg : "0",
			invisible : "0"

		},
		success : function(response) {
			if (response > 0) {
				hideLoading();
				// showMessageSuccess(getValueField("create-success"));
				closeWindow("form_add_background_standby");
				Load_List_Background_Standby();
			} else if (response = -2) {
				showMessageError(getValueField("create-fail"));
			} else if (response = -1) {
				showMessageError(getValueField("create-fail"));
			}

		}
	});
}

function Load_List_Background_Standby() {
	$("#item-background-standby").empty();
	$
			.ajax({
				type : "GET",
				url : $pathWebService + "system",
				cache : false,
				data : {
					action : "getlistadvertise",
					type : "STANDBY",

				},
				success : function(response) {
					var html = "";
					$
							.each(
									response,
									function(i, item) {
										var str = "'" + item.id + "','"
												+ item.image + "'";
										var str_invisible = "'" + item.id
												+ "','" + item.image + "','"
												+ item.background + "','"
												+ item.invisible + "'";
										html += '<div class="col-md-3" style="margin-bottom: 10px;">';
										html += '<div class="thumbnail text-center">';
										html += '<div style="font-size: 60px">';
										html += '<img alt="" src="'
												+ $path_image_background
												+ item.image + '"';
										html += 'style="height: 150px; width: 100%;">';
										html += '</div>';
										html += '<div class="panel-footer text-center">';
										/*
										 * var xx=parseInt(item.background);
										 * if(xx != 0){ html+='<label
										 * class="div_bottom">'; html+='<input
										 * type="checkbox" class="div_checkbok"
										 * name="radio_main" checked="checked"
										 * onclick="setmain_background_music('+str+')"><span
										 * class="label label-primary">Set BG</span>';
										 * html+='</label>'; }else{
										 * 
										 * html+='<label class="div_bottom">';
										 * html+='<input type="checkbox"
										 * class="div_checkbok"
										 * name="radio_main"
										 * onclick="setmain_background_music('+str+')"><span
										 * class="label label-primary">Set BG</span>';
										 * html+='</label>';
										 * 
										 * html+='<label class="div_bottom">';
										 * html+='<span class="label
										 * label-info">Slide</span>'; html+='</label>'; }
										 */
										html += '<button type="button" class="btnDelete" onclick="deleted_background('
												+ str + ')"></button>';
										if (item.invisible == 1) {
											html += '<input id="isactive_standby'
													+ item.id
													+ '" name="isactive"  type="checkbox" data-toggle="toggle"  data-size="mini" onchange="getChangestatus_standby('
													+ str_invisible + ')">';
										} else if (item.invisible == 0) {
											html += '<input id="isactive_standby'
													+ item.id
													+ '" name="isactive" checked="checked"  type="checkbox" data-toggle="toggle" data-size="mini" onchange="getChangestatus_standby('
													+ str_invisible + ')">';
										}
										html += '</div>';
										html += '</div>';
										html += '</div>';

									});
					$("#item-background-standby").append(html);
					$.each(response, function(i, item) {
						$("#isactive_standby" + item.id).bootstrapToggle();
					});
				}
			});
}
function getChangestatus_standby(id, name_, background_, invisible_) {
	if (invisible_ == 0) {
		invisible_ = 1;
	} else if (invisible_ == 1) {
		invisible_ = 0;
	}
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "editadvertise",
			advid : id,
			name : "",
			image : name_,
			type : "STANDBY",
			setbg : background_,
			invisible : invisible_

		},
		success : function(response) {
			if (response > 0) {
				// alert("set invisible successful")
				// showMessageSuccess(getValueField("edit-success"));
				Load_List_Background_Standby();
			} else if (response = -2) {
				// alert("set invisible exits")
				showMessageError(getValueField("edit-fail"));
			} else if (response = -1) {
				// alert("set invisible not successful")
				showMessageError(getValueField("edit-fail"));
			}

		}
	});
}

function setmain_background_standby(id, name_) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "editadvertise",
			advid : id,
			name : "",
			image : name_,
			type : "STANDBY",
			setbg : "1",
			invisible : "0"

		},
		success : function(response) {
			if (response > 0) {
				// alert("set main image successful")
				// showMessageSuccess(getValueField("edit-success"));
				Load_List_Background_Standby();
			} else if (response = -2) {
				// alert("set main image exits")
				showMessageError(getValueField("edit-fail"));
			} else if (response = -1) {
				// alert("set main image not successful")
				showMessageError(getValueField("edit-fail"));
			}

		}
	});
}

function closedialogbackground_back() {
	closeWindow("form_add_background_back");
}
function opendialogbackground_back() {
	$("#file_background_back").val("");
	$("#img_background_back").attr('src', "");
	openWindow("form_add_background_back");
}

function addbackground_back() {
	showLoading();
	var actionPath = 'welcome/add_background.elcom';
	var d = new Date();
	var image_name_flag = time_format(d);
	var file_background = document.getElementById("file_background_back").files[0];
	if (document.getElementById("file_background_back").files.length == 0) {
		alert("Please choose image");
		return false;
	}

	var oData = new FormData(document.forms
			.namedItem("id_form_add_background_back"));
	oData.append("image_name_flag", image_name_flag);
	oData.append("file_background", file_background);
	$.ajax({
		type : "POST",
		url : actionPath,
		data : oData,
		processData : false, // tell jQuery not to process the data
		contentType : false,
		success : function(response) {
			$name_images = response.fileName;
			if ($name_images != null) {
				add_background_back_database($name_images);
			}
		}
	});

}

function add_background_back_database(name_) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "addadvertise",
			name : "",
			image : name_,
			type : "BACK",
			setbg : "0",
			invisible : "0"

		},
		success : function(response) {
			if (response > 0) {
				hideLoading();
				// showMessageSuccess(getValueField("create-success"));
				closeWindow("form_add_background_back");
				Load_List_Background_Back();
			} else if (response = -2) {
				showMessageError(getValueField("create-fail"));
			} else if (response = -1) {
				showMessageError(getValueField("create-fail"));
			}

		}
	});
}

function Load_List_Background_Back() {
	$("#item-background-back").empty();
	$
			.ajax({
				type : "GET",
				url : $pathWebService + "system",
				cache : false,
				data : {
					action : "getlistadvertise",
					type : "BACK",

				},
				success : function(response) {
					var html = "";
					$
							.each(
									response,
									function(i, item) {
										var str = "'" + item.id + "','"
												+ item.image + "'";
										var str_invisible = "'" + item.id
												+ "','" + item.image + "','"
												+ item.background + "','"
												+ item.invisible + "'";
										html += '<div class="col-md-3" style="margin-bottom: 10px;">';
										html += '<div class="thumbnail text-center">';
										html += '<div style="font-size: 60px">';
										html += '<img alt="" src="'
												+ $path_image_background
												+ item.image + '"';
										html += 'style="height: 150px; width: 100%;">';
										html += '</div>';
										html += '<div class="panel-footer text-center">';
										/*
										 * var xx=parseInt(item.background);
										 * if(xx != 0){ html+='<label
										 * class="div_bottom">'; html+='<input
										 * type="checkbox" class="div_checkbok"
										 * name="radio_main" checked="checked"
										 * onclick="setmain_background_music('+str+')"><span
										 * class="label label-primary">Set BG</span>';
										 * html+='</label>'; }else{
										 * 
										 * html+='<label class="div_bottom">';
										 * html+='<input type="checkbox"
										 * class="div_checkbok"
										 * name="radio_main"
										 * onclick="setmain_background_music('+str+')"><span
										 * class="label label-primary">Set BG</span>';
										 * html+='</label>';
										 * 
										 * html+='<label class="div_bottom">';
										 * html+='<span class="label
										 * label-info">Slide</span>'; html+='</label>'; }
										 */
										html += '<button type="button" class="btnDelete" onclick="deleted_background('
												+ str + ')"></button>';
										if (item.invisible == 1) {
											html += '<input id="isactive_back'
													+ item.id
													+ '" name="isactive"  type="checkbox" data-toggle="toggle"  data-size="mini" onchange="getChangestatus_back('
													+ str_invisible + ')">';
										} else if (item.invisible == 0) {
											html += '<input id="isactive_back'
													+ item.id
													+ '" name="isactive" checked="checked"  type="checkbox" data-toggle="toggle" data-size="mini" onchange="getChangestatus_back('
													+ str_invisible + ')">';
										}
										html += '</div>';
										html += '</div>';
										html += '</div>';

									});
					$("#item-background-back").append(html);
					$.each(response, function(i, item) {
						$("#isactive_back" + item.id).bootstrapToggle();
					});
				}
			});
}
function getChangestatus_back(id, name_, background_, invisible_) {
	if (invisible_ == 0) {
		invisible_ = 1;
	} else if (invisible_ == 1) {
		invisible_ = 0;
	}
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "editadvertise",
			advid : id,
			name : "",
			image : name_,
			type : "BACK",
			setbg : background_,
			invisible : invisible_

		},
		success : function(response) {
			if (response > 0) {
				// alert("set invisible successful")
				// showMessageSuccess(getValueField("edit-success"));
				Load_List_Background_Back();
			} else if (response = -2) {
				// alert("set invisible exits")
				showMessageError(getValueField("edit-fail"));
			} else if (response = -1) {
				// alert("set invisible not successful")
				showMessageError(getValueField("edit-fail"));
			}

		}
	});
}

function setmain_background_back(id, name_) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "editadvertise",
			advid : id,
			name : "",
			image : name_,
			type : "BACK",
			setbg : "1",
			invisible : "0"

		},
		success : function(response) {
			if (response > 0) {
				// alert("set main image successful")
				// showMessageSuccess(getValueField("edit-success"));
				Load_List_Background_Back();
			} else if (response = -2) {
				// alert("set main image exits")
				showMessageError(getValueField("edit-fail"));
			} else if (response = -1) {
				// alert("set main image not successful")
				showMessageError(getValueField("edit-fail"));
			}

		}
	});
}

function closedialogbackground_music() {
	closeWindow("form_add_background_music");
}
function opendialogbackground_music() {
	$("#file_background_music").val("");
	$("#img_background_music").attr('src', "");
	openWindow("form_add_background_music");
}

function addbackground_music() {
	showLoading();
	var actionPath = 'welcome/add_background.elcom';
	var d = new Date();
	var image_name_flag = time_format(d);
	var file_background = document.getElementById("file_background_music").files[0];
	if (document.getElementById("file_background_music").files.length == 0) {
		alert("Please choose image");
		return false;
	}

	var oData = new FormData(document.forms
			.namedItem("id_form_add_background_music"));
	oData.append("image_name_flag", image_name_flag);
	oData.append("file_background", file_background);
	$.ajax({
		type : "POST",
		url : actionPath,
		data : oData,
		processData : false, // tell jQuery not to process the data
		contentType : false,
		success : function(response) {
			$name_images = response.fileName;
			if ($name_images != null) {
				add_background_music_database($name_images);
			}
		}
	});

}

function add_background_music_database(name_) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "addadvertise",
			name : "",
			image : name_,
			type : "MUSIC",
			setbg : "0",
			invisible : "0"

		},
		success : function(response) {
			if (response > 0) {
				hideLoading();
				// showMessageSuccess(getValueField("create-success"));
				closeWindow("form_add_background_music");
				Load_List_Background_Music();
			} else if (response = -2) {
				showMessageError(getValueField("create-fail"));
			} else if (response = -1) {
				showMessageError(getValueField("create-fail"));
			}

		}
	});
}

function Load_List_Background_Music() {
	$("#item-background-music").empty();
	$
			.ajax({
				type : "GET",
				url : $pathWebService + "system",
				cache : false,
				data : {
					action : "getlistadvertise",
					type : "MUSIC",

				},
				success : function(response) {
					var html = "";
					$
							.each(
									response,
									function(i, item) {
										var str = "'" + item.id + "','"
												+ item.image + "'";
										var str_invisible = "'" + item.id
												+ "','" + item.image + "','"
												+ item.background + "','"
												+ item.invisible + "'";
										html += '<div class="col-md-3" style="margin-bottom: 10px;">';
										html += '<div class="thumbnail text-center">';
										html += '<div style="font-size: 60px">';
										html += '<img alt="" src="'
												+ $path_image_background
												+ item.image + '"';
										html += 'style="height: 150px; width: 100%;">';
										html += '</div>';
										html += '<div class="panel-footer text-center">';
										/*
										 * var xx=parseInt(item.background);
										 * if(xx != 0){ html+='<label
										 * class="div_bottom">'; html+='<input
										 * type="checkbox" class="div_checkbok"
										 * name="radio_main" checked="checked"
										 * onclick="setmain_background_music('+str+')"><span
										 * class="label label-primary">Set BG</span>';
										 * html+='</label>'; }else{
										 * 
										 * html+='<label class="div_bottom">';
										 * html+='<input type="checkbox"
										 * class="div_checkbok"
										 * name="radio_main"
										 * onclick="setmain_background_music('+str+')"><span
										 * class="label label-primary">Set BG</span>';
										 * html+='</label>';
										 * 
										 * html+='<label class="div_bottom">';
										 * html+='<span class="label
										 * label-info">Slide</span>'; html+='</label>'; }
										 */
										html += '<button type="button" class="btnDelete" onclick="deleted_background('
												+ str + ')"></button>';
										if (item.invisible == 1) {
											html += '<input id="isactive_music'
													+ item.id
													+ '" name="isactive"  type="checkbox" data-toggle="toggle"  data-size="mini" onchange="getChangestatus_music('
													+ str_invisible + ')">';
										} else if (item.invisible == 0) {
											html += '<input id="isactive_music'
													+ item.id
													+ '" name="isactive" checked="checked"  type="checkbox" data-toggle="toggle" data-size="mini" onchange="getChangestatus_music('
													+ str_invisible + ')">';
										}
										html += '</div>';
										html += '</div>';
										html += '</div>';

									});
					$("#item-background-music").append(html);
					$.each(response, function(i, item) {
						$("#isactive_music" + item.id).bootstrapToggle();
					});
				}
			});

}

function getChangestatus_music(id, name_, background_, invisible_) {
	if (invisible_ == 0) {
		invisible_ = 1;
	} else if (invisible_ == 1) {
		invisible_ = 0;
	}
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "editadvertise",
			advid : id,
			name : "",
			image : name_,
			type : "MUSIC",
			setbg : background_,
			invisible : invisible_

		},
		success : function(response) {
			if (response > 0) {
				//alert("set invisible successful")		
				//showMessageSuccess(getValueField("edit-success"));
				Load_List_Background_Music();
			} else if (response = -2) {
				//alert("set invisible exits")
				showMessageError(getValueField("edit-fail"));
			} else if (response = -1) {
				//alert("set invisible not successful")
				showMessageError(getValueField("edit-fail"));
			}

		}
	});
}

function setmain_background_music(id, name_) {
	$.ajax({
		type : "POST",
		url : $pathWebService + "system",
		cache : false,
		data : {
			action : "editadvertise",
			advid : id,
			name : "",
			image : name_,
			type : "MUSIC",
			setbg : "1",
			invisible : "0"

		},
		success : function(response) {
			if (response > 0) {
				//	alert("set main image successful")		
				//showMessageSuccess(getValueField("edit-success"));
				Load_List_Background_Music();
			} else if (response = -2) {
				//alert("set main image exits")
				showMessageError(getValueField("edit-fail"));
			} else if (response = -1) {
				//alert("set main image not successful")
				showMessageError(getValueField("edit-fail"));
			}

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

function time_format(d) {
	day = format_two_digits(d.getDay() + 1);
	hours = format_two_digits(d.getHours());
	minutes = format_two_digits(d.getMinutes());
	seconds = format_two_digits(d.getSeconds());
	return day + hours + minutes + seconds;
}

function format_two_digits(n) {
	return n < 10 ? '0' + n : n;
}

function closedialogaddlanguage() {
	closeWindow("form_language");
}

function closedialogeditlanguage() {
	closeWindow("form_update_language");
}

function showLoading() {
	$('#ajax-loading').show();
}

function hideLoading() {
	$('#ajax-loading').hide();
}