<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<link
	href='${pageContext.request.contextPath}/MODULE-WELCOME/css/welcome.css'
	rel='stylesheet'>
<%-- <link href='${pageContext.request.contextPath}/MODULE-COMMON/css/bootstrap.min.css' rel='stylesheet'> --%>
<link
	href='${pageContext.request.contextPath}/MODULE-WELCOME/css/formValidation.css'
	rel="stylesheet">

<script
	src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery-2.1.3.min.js"></script>
<script
	src="${pageContext.request.contextPath}/MODULE-WELCOME/js/module-welcome.js"></script>
<script
	src="${pageContext.request.contextPath}/MODULE-WELCOME/js/module_customer.js"></script>
<script
	src="${pageContext.request.contextPath}/MODULE-WELCOME/js/module-birthday.js"></script>

<script
	src="${pageContext.request.contextPath}/MODULE-WELCOME/js/module-video.js"></script>

<script
	src="${pageContext.request.contextPath}/MODULE-WELCOME/js/formValidation.js"></script>
<script
	src="${pageContext.request.contextPath}/MODULE-WELCOME/js/bootstrap.min.js"></script>
</head>
<body>
	<section class="home-section">
	<div class="container">
		<div class="col-xs-12 col-md-5">
			<div class="panel panel-default ">
				<div class="panel-heading">
					<div class="text-center" style="font-size: 18px;">
						<label><s:property value="getText('welcome.form.welcome')" /></label>
						<%-- <button type="button" class="btn btn-info btn-sm" onclick="opendialogbackground();"><i class="fa fa-floppy-o"></i> <s:property value="getText('welcome.button.addbackground')"/></button>		  --%>
					</div>
				</div>
				<div class="panel-body">
					<div class="col-xs-12 col-md-12" id="id_put_data_2">
						<form class="form-horizontal" role="form" id="form_welcome">
							<div class="form-group">
								<label class="control-label col-sm-4" for="pwd"><s:property
										value="getText('welcome.introduce')" />:</label>
								<div class="col-sm-8">
									<textarea class="form-control" id="txt_gioithieu" rows="4"
										placeholder="Nhập giới thiệu"></textarea>

								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="pwd"><s:property
										value="getText('welcome.chooseservice')" />:</label>
								<div class="col-sm-8">
									<textarea class="form-control" id="txt_dichvu" rows="4"
										placeholder="Nhập thông báo"></textarea>

								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="pwd"><s:property
										value="getText('welcome.logo.small')" />:</label>
								<div class="col-sm-4">
									<!-- <input id="file_logo_small" name="file_logo_small" type="file" class="file-loading" onchange="previewFile('img_logo_small','file_logo_small','name_logo_small')">
						<input id="name_logo_small" name="name_logo_small" type="hidden">	 -->
									<div class="btn btn-default btn-file">
										<s:property value="getText('welcome.browser')" />
										<input type="file" id="file_logo_small" name="file_logo_small"
											onchange="previewFile('img_logo_small','file_logo_small','name_logo_small')">
									</div>
									<input id="name_logo_small" name="name_logo_small"
										type="hidden">
								</div>
								<div class="col-sm-4">
									<img id="img_logo_small" alt="" src=""
										style="height: 50px; width: 100px; float: right;">
								</div>
								<input id="file_logo_small_old" type="hidden"></input>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="pwd"><s:property
										value="getText('welcome.logo')" />:</label>
								<!-- <div class="col-sm-4">					
						<input id="file_logo" name="file_logo" type="file"  onchange="previewFile('img_logo','file_logo','name_logo')">
						<input id="name_logo" name="name_logo" type="hidden">							
					</div> -->
								<div class="col-sm-4">
									<div class="btn btn-default btn-file">
										<s:property value="getText('welcome.browser')" />
										<input type="file" id="file_logo" name="file_logo"
											onchange="previewFile('img_logo','file_logo','name_logo')">
									</div>
									<input id="name_logo" name="name_logo" type="hidden">
								</div>
								<div class="col-sm-4">
									<img id="img_logo" alt="" src=""
										style="height: 50px; width: 100px; float: right;">
								</div>
								<input id="file_logo_old" type="hidden"></input>
							</div>

						</form>
						<div class="modal-footer">
							<div class="form-group">
								<div class="col-sm-4"></div>
								<div class="col-sm-4">
									<button type="button" class="btn btn-info btn-sm"
										onclick="save_data_content();">
										<i class="fa fa-floppy-o"></i>
										<s:property value="getText('welcome.save')" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="col-xs-12 col-md-7">
			<!--Add or Edit Schedule Daily-->
			<div class="panel panel-default">
				<div class="panel-heading">
					<div class="text-right">
						<label class="control-label col-sm-2" style="font-size: 18px"><s:property
								value="getText('welcome.room')" /></label> <select class="col-xs-2"
							id="id_room">
						</select>
						<button type="button" class="btn btn-info btn-sm"
							onclick="insert_customer();">
							<i class="fa fa-floppy-o"></i>
							<s:property value="getText('welcome.save')" />
						</button>
						<!--  <button type="button" class="btn btn-default btn-sm"><i class="fa fa-times"></i> Close</button>		  -->
					</div>
				</div>
				<div class="panel-body"
					style="overflow-x: hidden; overflow-y: auto; height: 417px;">
					<div class="col-xs-12 col-md-12" id="id_put_data">
						<form id="bookForm" method="post" class="form-horizontal">
							<div class="form-group" id="div_load_cus"></div>
							<!-- The template for adding new field -->
							<div class="form-group hide" id="bookTemplate">
								<div class="row">
									<div class="col-xs-2">
										<%--   <label><s:property value="getText('welcome.customer')"/></label> --%>
										<input type="hidden" name="id_client"></input>
									</div>
									<div class="col-xs-3">
										<input type="text" class="form-control" name="firstname"
											id="firstname" placeholder="Firstname" />
									</div>
									<div class="col-xs-3">
										<input type="text" class="form-control" name="lastname"
											id="lastname" placeholder="Lastname" />
									</div>
									<div class="col-xs-2">
										<input type="text" class="form-control" name="clientname"
											id="clientname" placeholder="Mr..." />
									</div>
									<div class="col-xs-1">
										<input type="radio" name="cus_pri"></input>
									</div>
									<div class="col-xs-1">
										<button type="button" class="btn btn-default removeButton">
											<i class="fa fa-minus"></i>
										</button>
									</div>
								</div>
							</div>
							<div class="form-group text-right">
								<div class="col-xs-12 ">
									<%-- <button type="button" id="btn_save_cus" onclick="insert_customer();" class="btn btn-default"><s:property value="getText('welcome.save')"/></button> --%>
								</div>
							</div>
						</form>

						<div class="form-group">
							<label class="control-label col-sm-2" for="pwd"></label>
							<div class="col-sm-3"></div>
							<div class="col-sm-4">
								<table id="myTableLanguage"></table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>




		<div class="col-xs-12 col-md-12"
			style="margin-top: 50px; margin-bottom: 10px">
			<ul class="nav nav-tabs">
				<li class="active"><a href="#welcome-bg-welcome"
					data-toggle="tab"> <s:property
							value="getText('welcome.backgound.welcome')" /></a></li>
				<li><a href="#welcome-bg-standby" data-toggle="tab"> <s:property
							value="getText('welcome.backgound.standby')" /></a></li>
				<li><a href="#welcome-bg-back" data-toggle="tab"> <s:property
							value="getText('welcome.backgound.back')" /></a></li>
				<li><a href="#welcome-bg-music" data-toggle="tab"> <s:property
							value="getText('welcome.backgound.music')" /></a></li>
				<li><a href="#welcome-video" data-toggle="tab"> <s:property
							value="getText('welcome.video')" /></a></li>
				<li><a href="#welcome-birthday" data-toggle="tab"> <s:property
							value="getText('welcome.birthday')" />
				</a></li>

			</ul>
			<br>
			<div class="tab-content ">
				<div class="tab-pane active" id="welcome-bg-welcome">
					<div class="" style="margin-top: 0px; margin-bottom: 500px">
						<div style="margin-bottom: 10px;">
							<button type="button" class="btn btn-info btn-sm"
								onclick="opendialogbackground();">
								<i class="fa fa-plus-circle"></i>
								<s:property value="getText('button.add')" />
							</button>
						</div>


						<div class="panel panel-default">
							<div class="panel-body">
								<div class="" id="id_put_data_background"></div>
							</div>
						</div>
					</div>
				</div>

				<div class="tab-pane" id="welcome-bg-standby">
					<div class="" style="margin-top: 0px; margin-bottom: 50px">
						<div style="margin-bottom: 10px">
							<button type="button" class="btn btn-info btn-sm"
								onclick="opendialogbackground_standby();">
								<i class="fa fa-plus-circle"></i>
								<s:property value="getText('button.add')" />
							</button>
						</div>
						<div class="panel panel-default">
							<div class="panel-body">
								<div class="" id="item-background-standby"></div>
							</div>
						</div>
					</div>

				</div>
				
				<div class="tab-pane" id="welcome-bg-back">
					<div class="" style="margin-top: 0px; margin-bottom: 50px">
						<div style="margin-bottom: 10px">
							<button type="button" class="btn btn-info btn-sm"
								onclick="opendialogbackground_back();">
								<i class="fa fa-plus-circle"></i>
								<s:property value="getText('button.add')" />
							</button>
						</div>
						<div class="panel panel-default">
							<div class="panel-body">
								<div class="" id="item-background-back"></div>
							</div>
						</div>
					</div>

				</div>

				<div class="tab-pane" id="welcome-bg-music">
					<div class="" style="margin-top: 0px; margin-bottom: 50px">
						<div style="margin-bottom: 10px">
							<button type="button" class="btn btn-info btn-sm"
								onclick="opendialogbackground_music();">
								<i class="fa fa-plus-circle"></i>
								<s:property value="getText('button.add')" />
							</button>
						</div>
						<div class="panel panel-default">
							<div class="panel-body">
								<div class="" id="item-background-music"></div>
							</div>
						</div>
					</div>

				</div>
				<div class="tab-pane" id="welcome-video">
					<div class="" style="margin-top: 0px; margin-bottom: 10px">
						<div style="margin-bottom: 10px">
							<button class="btn btn-primary btn-sm" type="button"
								onclick="openNewDialogVideo()">
								<i class="fa fa-plus-circle"></i>
								<s:property value="getText('button.add')" />
							</button>
						</div>
						<div class="panel panel-default">
							<div class="panel-body">
								<table id="table-item-video" class="table text-left">
									<thead>
										<tr>
											<th width="10%"><s:property value="getText('item.no')" />
											</th>
											<th width="30%"><s:property value="getText('item.name')" />
											</th>
											<th width="40%"><s:property value="getText('item.link')" />
											</th>
											<th width="10%"><s:property
													value="getText('item.status')" /></th>
											<th width="10%"><s:property
													value="getText('item.action')" /></th>
										</tr>
									</thead>
									<tbody id="tbody-item-video">
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

				<div class="tab-pane" id="welcome-birthday">

					<div class="" style="margin-top: 10px; margin-bottom: 10px">
						<div class="panel panel-default">
							<div class="panel-body">
								<table id="table-item-birthday" class="table text-left">
									<thead>
										<tr>
											<th width="10%"><s:property value="getText('item.no')" /></th>
											<th width="30%"><s:property value="getText('item.name')" /></th>
											<th width="40%"><s:property value="getText('item.link')" /></th>
											<th width="10%"><s:property
													value="getText('item.status')" /></th>
											<th width="10%"><s:property
													value="getText('item.action')" /></th>
										</tr>
									</thead>
									<tbody id="tbody-item-birthday">
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div id="form-edit-birthday" class="" style="display: none;">
						<div class="row">
							<div class="col-md-6">
								<div class="row" style="margin-bottom: 15px">
									<label class="col-md-2"> Template </label>
									<div class="col-md-10">
										<input id="birthday-name" type="text" style="width: 100%;">
									</div>
								</div>
								<div class="row" style="margin-bottom: 10px">
									<label class="col-md-2"> Name </label>
									<div class="col-md-10">
										<input id="bdcustomer" class="form-control" disabled
											type="text" style="width: 100%;">
									</div>
								</div>
								<div class="row" style="margin-bottom: 15px">
									<label class="col-md-2"> Color </label>
									<div class="col-md-4">
										<input id="bdcustomer-color" type="color">
									</div>
									<label class="col-md-2"> Font size </label>
									<div class="col-md-4">
										<select id="bdcustomer-fontsize">
											<option value="30px">30px</option>
											<option value="32px">32px</option>
											<option value="34px">34px</option>
											<option value="36px">36px</option>
											<option value="38px">38px</option>
											<option value="40px">40px</option>
											<option value="44px">44px</option>
											<option value="48px">48px</option>
											<option value="52px">52px</option>
											<option value="56px">56px</option>
											<option value="56px">60px</option>
										</select>
									</div>
								</div>
								<div class="row" style="margin-bottom: 10px">
									<label class="col-md-2"> Text </label>
									<div class="col-md-10">
										<input id="birthday-text" type="text" style="width: 100%;">
									</div>
								</div>
								<div class="row" style="margin-bottom: 15px">
									<label class="col-md-2"> Color </label>
									<div class="col-md-4">
										<input id="birthday-color" type="color">
									</div>
									<label class="col-md-2"> Font size </label>
									<div class="col-md-4">
										<select id="birthday-fontsize">
											<option value="20px">20px</option>
											<option value="22px">22px</option>
											<option value="24px">24px</option>
											<option value="26px">26px</option>
											<option value="28px">28px</option>
											<option value="30px">30px</option>
											<option value="32px">32px</option>
											<option value="34px">34px</option>
											<option value="36px">36px</option>
											<option value="38px">38px</option>
											<option value="40px">40px</option>
										</select>
									</div>
								</div>

								<div class="row" style="margin-bottom: 10px">
									<label class="col-md-2"> Background </label>
									<div class="col-md-6">
										<input id="bday-image" type='file'
											accept="image/jpeg, image/png">
									</div>
									<div class="col-md-4">(*.jpeg,*.jpg,*.png)</div>
								</div>
								<div class="row" style="margin-bottom: 10px">
									<label class="col-md-2"> Duration </label>
									<div class="col-md-10">
										<div class="input-append timepicker">
											<input id="birthday-duration" type="text"
												data-format="hh:mm:ss" style="width: auto !important;"
												class="input-time" maxlength="8" placeholder="hh:mm:ss"
												required="required" /> <span class="add-on"> <i
												class="icon-time" data-date-icon="icon-calendar"></i>
											</span>
										</div>

										<input id="bday-id" type="hidden" /> <input type="hidden"
											id="birthday-url" />
									</div>
								</div>
								<div class="row" style="margin-bottom: 10px">
									<div class="col-md-2"></div>
									<div class="col-md-10">

										<button onclick="previewTemplate()">Preview</button>
										<button class="btn-primary" onclick="saveFileHtml()">Save</button>
									</div>
								</div>
							</div>
							<div></div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<iframe id="birthday_iframe" src="about:blank" width=""
									height="600" style="width: 100%; border: 1px solid lightgrey;"></iframe>
							</div>
						</div>
					</div>

				</div>

			</div>
		</div>

	</div>
	</section>
	<!--Add or Edit Schedule Daily-->
	<!-- cho nay dung cho load table Language -->
	<div class="modal fade" id="tbl_language" role="dialog">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header">
					<!-- <button type="button" class="close" data-dismiss="modal">&times;</button>       -->
				</div>
				<div class="modal-body">
					<table class="table text-left" id="tbl_language_item">
						<thead>
							<tr>
								<th><s:property value="getText('welcome.table.stt')" /></th>
								<th><s:property value="getText('welcome.table.name')" /></th>
								<th><s:property value="getText('welcome.table.image')" /></th>
								<th><s:property value="getText('welcome.table.deleted')" /></th>
								<th><s:property value="getText('welcome.table.add')" /></th>
							</tr>
						</thead>
						<tbody>
							<tr></tr>
						</tbody>
					</table>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>


	<!-- cho nay dung de add form language -->
	<div class="modal fade" id="form_language" role="dialog">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header text-center" style="font-size: 18px;">
					<s:property value="getText('welcome.title.addlanguage')" />
					<!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="id_form_language" role="form">
						<div class="form-group">
							<label class="control-label col-sm-3"><s:property
									value="getText('welcome.name.nation')" />:</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="txt_tenquocgia"
									placeholder="Nhập tên quốc gia">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-3"><s:property
									value="getText('welcome.code.nation')" />:</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="txt_maquocgia"
									placeholder="Nhập mã quốc gia">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-offset-3 col-sm-4">
								<input id="file_lag" name="file_lag" type="file"
									class="file-loading"
									onchange="previewFile('img_lag','file_lag','name_lag')">
								<input id="name_lag" name="name_lag" type="hidden">
							</div>
							<div class="col-sm-4">
								<img id="img_lag" alt="" src=""
									style="height: 30px; width: 80px; float: right;">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-12">
								<!-- <button type="button" class="btn btn-default" style="float: right;" onclick="addlanguage();">Submit</button> -->
								<div class="text-center">
									<button type="button" class="btn btn-info btn-sm"
										onclick="addlanguage();">
										<i class="fa fa-floppy-o"></i>
										<s:property value="getText('welcome.button.save')" />
									</button>
									<button type="button" class="btn btn-default btn-sm"
										onclick="closedialogaddlanguage();">
										<i class="fa fa-times"></i>
										<s:property value="getText('welcome.button.close')" />
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>

			</div>
		</div>
	</div>

	<!-- cho nay dung de edit form language -->
	<div class="modal fade" id="form_update_language" role="dialog">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header text-center" style="font-size: 18px;">
					<s:property value="getText('welcome.title.editlanguage')" />
					<!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="id_form_update_language"
						role="form">
						<div class="form-group">
							<label class="control-label col-sm-3"><s:property
									value="getText('welcome.name.nation')" />:</label>
							<div class="col-sm-9">
								<input type="text" class="form-control"
									id="txt_tenquocgia_update" placeholder="Nhập tên quốc gia">
							</div>
						</div>
						<div class="form-group">
							<label class="control-label col-sm-3"><s:property
									value="getText('welcome.code.nation')" />:</label>
							<div class="col-sm-9">
								<input type="text" class="form-control"
									id="txt_maquocgia_update" placeholder="Nhập mã quốc gia">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-offset-3 col-sm-5">
								<input id="file_lag_update" name="file_lag_update" type="file"
									class="file-loading"
									onchange="previewFile('img_lag_update','file_lag_update','name_lag_1')">
								<input id="name_lag_1" name="name_lag_1" type="hidden">

							</div>
							<div class="col-sm-4">
								<img id="img_lag_update" alt="" src=""
									style="height: 30px; width: 80px; float: right;">
							</div>
						</div>
						<div class="form-group">
							<div class="col-sm-12">
								<!-- <button type="button" class="btn btn-default" style="float: right;" onclick="editLanguage();">Update</button> -->
								<div class="text-right">
									<button type="button" class="btn btn-danger btn-sm"
										onclick="deleteLanguage();">
										<i class="fa fa-floppy-o"></i>
										<s:property value="getText('welcome.button.delete')" />
									</button>
									<button type="button" class="btn btn-info btn-sm"
										onclick="editLanguage();">
										<i class="fa fa-floppy-o"></i>
										<s:property value="getText('welcome.button.update')" />
									</button>
									<button type="button" class="btn btn-default btn-sm"
										onclick="closedialogeditlanguage();">
										<i class="fa fa-times"></i>
										<s:property value="getText('welcome.button.close')" />
									</button>
								</div>
							</div>
						</div>
						<input id="name_lag_update" name="name_lag_update" type="hidden">
						<input type="hidden" id="id_language_update"></input>
					</form>
				</div>

			</div>
		</div>
	</div>

	<!-- cho nay dung de add image background -->
	<div class="modal fade" id="form_add_background" role="dialog">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header text-center" style="font-size: 18px;">
					<s:property value="getText('welcome.title.image')" />
					<!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="id_form_add_background"
						role="form">
						<%-- <div class="col-sm-4">
						<label class="control-label col-sm-12" for="pwd"><s:property value="getText('welcome.button.background')"/>:</label>						
					</div> --%>

						<div class="col-md-12">
							<div>
								<input id="file_background" name="file_background" type="file"
									class="file-loading"
									onchange="previewFile('img_background','file_background','name_background')">
								<input id="name_background" name="name_background" type="hidden">
							</div>
							<div style="margin-top: 10px;">
								<img id="img_background" alt="" src=""
									style="height: 120px; width: 260px; float: left:;">
							</div>
						</div>
						<!-- <div class="col-sm-5">
							<img id="img_background" alt="" src=""
								style="height: 100px; width: 200px; float: right;">
						</div> -->
						<div class="form-group">
							<div class="col-sm-12" style="margin-top: 15px;">
								<div class="text-center">
									<button type="button" class="btn btn-info btn-sm"
										onclick="addbackground();">
										<i class="fa fa-floppy-o"></i>
										<s:property value="getText('welcome.button.save')" />
									</button>
									<%-- <button type="button" class="btn btn-info btn-sm" style="float:right;margin-right: 13px;" onclick="addbackground();"><s:property value="getText('welcome.button.save')"/></button> --%>
									<button type="button" class="btn btn-default btn-sm"
										onclick="closedialogbackground();">
										<i class="fa fa-times"></i>
										<s:property value="getText('welcome.button.close')" />
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- cho nay dung de add image background standby -->
	<div class="modal fade" id="form_add_background_standby" role="dialog" >
		<div class="modal-dialog modal-md">
			<div class="modal-content" style="width: 400px;left: 100px;">
				<div class="modal-header text-center" style="font-size: 18px;">
					<s:property value="getText('welcome.title.image')" />
					<!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="id_form_add_background_standby"
						role="form">
						<%-- <div class="col-sm-4">
						<label class="control-label col-sm-12" for="pwd"><s:property value="getText('welcome.button.background')"/>:</label>						
					</div> --%>

						<div class="col-md-12">
							<div>
								<input id="file_background_standby" name="file_background_standby"
									type="file" class="file-loading"
									onchange="previewFile('img_background_standby','file_background_standby','name_background_standby')">
								<input id="name_background_standby" name="name_background_standby"
									type="hidden">
							</div>
							<div style="margin-top: 10px;">
								<img id="img_background_standby" alt="" src=""
									style="height: 120px; width: 260px; float: left:;">
							</div>
						</div>
						<!-- <div class="col-sm-5">
							<img id="img_background" alt="" src=""
								style="height: 100px; width: 200px; float: right;">
						</div> -->
						<div class="form-group">
							<div class="col-sm-12" style="margin-top: 15px;">
								<div class="text-center">
									<button type="button" class="btn btn-info btn-sm"
										onclick="addbackground_standby();">
										<i class="fa fa-floppy-o"></i>
										<s:property value="getText('welcome.button.save')" />
									</button>
									<%-- <button type="button" class="btn btn-info btn-sm" style="float:right;margin-right: 13px;" onclick="addbackground_standby();"><s:property value="getText('welcome.button.save')"/></button> --%>
									<button type="button" class="btn btn-default btn-sm"
										onclick="closedialogbackground_standby();">
										<i class="fa fa-times"></i>
										<s:property value="getText('welcome.button.close')" />
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	
	<!-- cho nay dung de add image background back -->
	<div class="modal fade" id="form_add_background_back" role="dialog">
		<div class="modal-dialog modal-md">
			<div class="modal-content" style="width: 400px;left: 100px;">
				<div class="modal-header text-center" style="font-size: 18px;">
					<s:property value="getText('welcome.title.image')" />
					<!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="id_form_add_background_back"
						role="form">
						<%-- <div class="col-sm-4">
						<label class="control-label col-sm-12" for="pwd"><s:property value="getText('welcome.button.background')"/>:</label>						
					</div> --%>

						<div class="col-md-12">
							<div>
								<input id="file_background_back" name="file_background_back"
									type="file" class="file-loading"
									onchange="previewFile('img_background_back','file_background_back','name_background_back')">
								<input id="name_background_back" name="name_background_back"
									type="hidden">
							</div>
							<div style="margin-top: 10px;">
								<img id="img_background_back" alt="" src=""
									style="height: 120px; width: 260px; float: left:;">
							</div>
						</div>
						<!-- <div class="col-sm-5">
							<img id="img_background" alt="" src=""
								style="height: 100px; width: 200px; float: right;">
						</div> -->
						<div class="form-group">
							<div class="col-sm-12" style="margin-top: 15px;">
								<div class="text-center">
									<button type="button" class="btn btn-info btn-sm"
										onclick="addbackground_back();">
										<i class="fa fa-floppy-o"></i>
										<s:property value="getText('welcome.button.save')" />
									</button>
									<%-- <button type="button" class="btn btn-info btn-sm" style="float:right;margin-right: 13px;" onclick="addbackground_standby();"><s:property value="getText('welcome.button.save')"/></button> --%>
									<button type="button" class="btn btn-default btn-sm"
										onclick="closedialogbackground_back();">
										<i class="fa fa-times"></i>
										<s:property value="getText('welcome.button.close')" />
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- cho nay dung de add image background -->
	<div class="modal fade" id="form_add_background_music" role="dialog">
		<div class="modal-dialog modal-md">
			<div class="modal-content">
				<div class="modal-header text-center" style="font-size: 18px;">
					<s:property value="getText('welcome.title.image')" />
					<!-- <button type="button" class="close" data-dismiss="modal">&times;</button> -->
				</div>
				<div class="modal-body">
					<form class="form-horizontal" id="id_form_add_background_music"
						role="form">
						<%-- <div class="col-sm-4">
						<label class="control-label col-sm-12" for="pwd"><s:property value="getText('welcome.button.background')"/>:</label>						
					</div> --%>

						<div class="col-md-12">
							<div>
								<input id="file_background_music" name="file_background_music"
									type="file" class="file-loading"
									onchange="previewFile('img_background_music','file_background_music','name_background_music')">
								<input id="name_background_music" name="name_background_music"
									type="hidden">
							</div>
							<div style="margin-top: 10px;">
								<img id="img_background_music" alt="" src=""
									style="height: 120px; width: 260px; float: left:;">
							</div>
						</div>
						<!-- <div class="col-sm-5">
							<img id="img_background" alt="" src=""
								style="height: 100px; width: 200px; float: right;">
						</div> -->
						<div class="form-group">
							<div class="col-sm-12" style="margin-top: 15px;">
								<div class="text-center">
									<button type="button" class="btn btn-info btn-sm"
										onclick="addbackground_music();">
										<i class="fa fa-floppy-o"></i>
										<s:property value="getText('welcome.button.save')" />
									</button>
									<%-- <button type="button" class="btn btn-info btn-sm" style="float:right;margin-right: 13px;" onclick="addbackground();"><s:property value="getText('welcome.button.save')"/></button> --%>
									<button type="button" class="btn btn-default btn-sm"
										onclick="closedialogbackground_music();">
										<i class="fa fa-times"></i>
										<s:property value="getText('welcome.button.close')" />
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- Item Video Dialog -->
	<div id="video-dialog" class="modal fade" role="dialog">
		<form id="item-upload-form-video"
			action="${pageContext.request.contextPath}/upload-file-video-welcome.elcom"
			method="post" enctype="multipart/form-data">
			<div class="modal-dialog" style="width: 500px;">
				<!-- Modal content-->
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="item-title-video"></h5>
					</div>
					<div class="modal-body">
						<table class="tableLayout">
							<tr>
								<td colspan="6">
									<div class="input-group">
										<div id="item-container-error-video"
											class="alert alert-danger" style="display: none"></div>
									</div>
								</td>
							</tr>
							<tr>
								<td><s:property value="getText('item.name')" /></td>
								<td><input type="text" name="name" id="item-name-video"
									style="width: 100%"></td>
							</tr>
							<tr>
								<td width="10%"><s:property value="getText('item.status')" /></td>
								<td width="15%" id="status-td-video"></td>
							</tr>
							<tr>
								<td><s:property value="getText('item.link')" /></td>
								<td><input type="text" name="mediaName"
									id="item-link-video" style="width: 100%" readonly="readonly">
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<div id="container-ftp-video" class="container-ftp"></div>
									<div id="media-player-video" class="media-player"></div>
								</td>
							</tr>
						</table>
						<input type="hidden" id="item-status-video" name="status">
						<input type="hidden" id="item-host-video" name="host"> <input
							type="hidden" id="item-port-video" name="port"> <input
							type="hidden" id="item-user-video" name="user"> <input
							type="hidden" id="item-pass-video" name="pass"> <input
							type="hidden" id="item-type-video" name="type"> <input
							type="hidden" id="item-path-video" name="mediaPath"> <input
							type="hidden" id="item-index-video" name="item-index">
					</div>
					<div class="modal-footer">
						<button type="submit" class="btn btn-sm btn-primary btn-save"></button>
						<button type="button" class="btn btn-sm btn-danger"
							onclick="closeDialogItemVideo()">
							<s:property value="getText('button.cancel')" />
						</button>
					</div>
				</div>
			</div>
		</form>
	</div>

	<!-- Delete Vdieo Item Dialog -->
	<div id="video-delete-dialog" class="modal fade" role="dialog">
		<div class="modal-dialog" style="width: 400px;">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">
						<s:property value="getText('welcome.delete.video')" />
					</h5>
				</div>
				<div class="modal-body">
					<s:property value="getText('mv.delete.item.confirm')" />
					"<span style="color: red;" id="item-delete-video"></span>" ?
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-sm btn-danger"
						onclick="deleteVideo()">
						<s:property value="getText('button.yes')" />
					</button>
					<button type="button" class="btn btn-sm btn-default"
						data-dismiss="modal">
						<s:property value="getText('button.no')" />
					</button>
				</div>
			</div>
		</div>
	</div>


	<div id='ajax-loading' style="display: none;">
		<img
			src="${pageContext.request.contextPath}/MODULE-COMMON/images/spinner.gif"
			class="img-loading"></img>
	</div>
</body>
</html>