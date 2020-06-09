<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!--
	@author: elcomprime.com.vn
	@modify:	 25/12/2015
-->
<link href='${pageContext.request.contextPath}/MODULE-MAIN/css/main.css'
	rel='stylesheet'>
<section class="home-section">
	<div class="container">
		<div class="row">
			<div class="col-xs-12 col-md-12 col-lg-12">
				<ul class="nav nav-tabs">
					<li class="active"><a href="#channel-livetv" data-toggle="tab"><s:property
								value="getText('livetv.channel')" /></a></li>
					<li><a href="#channel-video" data-toggle="tab">Video
							Channel</a></li>
					<li><a href="#announce-livetv" data-toggle="tab"><s:property
								value="getText('livetv.announce')" /></a></li>
					<li><a href="#mode-livetv" data-toggle="tab"><s:property
								value="getText('livetv.mode')" /></a></li>
				</ul>
				<div class="tab-content ">
					<div class="tab-pane active" id="channel-livetv"
						style="margin-bottom: 15px">
						<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
							<div class="panel panel-default">
								<div class="panel-body">
									<div id="div-list-group" class="list-group text-left"></div>
								</div>
								<div class="panel-footer text-center">
									<button class="hidden btn btn-primary btn-xs" type="button"
										onclick="openNewSubjectDialog()">
										<i class="fa fa-plus-circle"></i>
										<s:property value="getText('button.add')" />
									</button>
									<button class="hidden btn btn-default btn-xs" type="button"
										onclick="openEditSubjectDialog()">
										<i class="fa fa-pencil-square-o"></i>
										<s:property value="getText('button.edit')" />
									</button>
									<button class="hidden btn btn-danger btn-xs" type="button"
										onclick="openDeleteSubjectDialog()">
										<i class="fa fa-trash"></i>
										<s:property value="getText('button.delete')" />
									</button>
								</div>
							</div>
						</div>

						<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
							<div id="media" class="tab-pane active" role="tabpanel">
								<div
									class="col-xs-12 col-sm-12 col-md-12 col-lg-12 panel panel-default">
									<button class="btn btn-primary btn-xs" type="button"
										onclick="openNewDialog()" style="margin-top: 15px">
										<i class="fa fa-plus-circle"></i>
										<s:property value="getText('button.add')" />
									</button>
									<table id="table-item" class="table text-left">
										<thead>
											<tr>
												<th width="10%"><s:property value="getText('item.no')" /></th>
												<th width="25%"><s:property
														value="getText('item.name')" /></th>
												<th width="25%"><s:property
														value="getText('item.address')" /></th>
												<th width="10%"><s:property
														value="getText('item.image')" /></th>
												<th width="10%"><s:property
														value="getText('item.status')" /></th>
												<th width="10%"><s:property value="getText('item.idx')" /></th>
												<th width="10%"><s:property
														value="getText('item.action')" /></th>
											</tr>
										</thead>
										<tbody id="tbody-item">
										</tbody>
									</table>
								</div>
							</div>
						</div>

					</div>

					<div class="tab-pane" id="mode-livetv" style="margin-bottom: 15px">
						<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
							<div class="panel panel-default">
								<div class="panel-body">
									<div id="div-list-group-mode" class="list-group text-left"></div>
								</div>
								<div class="panel-footer text-center">
									<button class="hidden btn btn-primary btn-xs" type="button"
										onclick="openNewSubjectDialog()">
										<i class="fa fa-plus-circle"></i>
										<s:property value="getText('button.add')" />
									</button>
									<button class="hidden btn btn-default btn-xs" type="button"
										onclick="openEditSubjectDialog()">
										<i class="fa fa-pencil-square-o"></i>
										<s:property value="getText('button.edit')" />
									</button>
									<button class="hidden btn btn-danger btn-xs" type="button"
										onclick="openDeleteSubjectDialog()">
										<i class="fa fa-trash"></i>
										<s:property value="getText('button.delete')" />
									</button>
								</div>
							</div>
						</div>

						<div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
							<div id="media-mode" class="tab-pane" role="tabpanel">
								<div
									class="col-xs-12 col-sm-12 col-md-12 col-lg-12 panel panel-default">
									<button class="hidden btn btn-primary btn-xs" type="button"
										onclick="openNewDialog()" style="margin-top: 15px">
										<i class="fa fa-plus-circle"></i>
										<s:property value="getText('button.add')" />
									</button>
									<table id="table-item-mode" class="table text-left">
										<thead>
											<tr>
												<th width="10%"><s:property value="getText('item.no')" /></th>
												<th width="25%"><s:property
														value="getText('item.name')" /></th>
												<th width="25%"><s:property
														value="getText('item.address')" /></th>
												<th width="10%"><s:property
														value="getText('item.image')" /></th>
												<th width="10%"><s:property
														value="getText('item.status')" /></th>
												<th width="10%"><s:property value="getText('item.idx')" /></th>
												<th width="10%"><s:property
														value="getText('item.action')" /></th>
											</tr>
										</thead>
										<tbody id="tbody-item-mode">
										</tbody>
									</table>
								</div>
							</div>
						</div>

					</div>

					<div class="tab-pane" id="channel-video"
						style="margin-bottom: 20px">
						<div class="col-md-10 col-md-offset-1">
							<div class="panel panel-default">
								<div class="panel-heading text-right">
									<button type="button" class="btn btn-info btn-sm"
										onclick="openMyhotelNewDialog()">
										<i class="fa fa-floppy-o"></i>
										<s:property value="getText('button.add')" />
									</button>
								</div>
								<div class=" panel-body container-item-myhotel"
									id="container-item-myhotel"></div>
							</div>

						</div>

					</div>
					<div class="tab-pane" id="announce-livetv">
						<div class="col-md-6 col-xs-6 col-lg-6 col-xs-offset-3">
							<div class="form-horizontal" style="margin-top: 20px">
								<div class="form-group">
									<div class="col-md-4">
										<label class="control-label"><s:property
												value="getText('livetv.announce')" /></label>
									</div>
									<div class="col-md-8">
										<div class="colourpicker-input-container">
											<textarea class="form-control" id="txt_announcement" rows="4"
												style="background-color: #a2a2a2"></textarea>
										</div>
									</div>
								</div>

								<div class="form-group">
									<div class="col-md-4">
										<label class="control-label"><s:property
												value="getText('livetv.color')" /></label>
									</div>
									<div class="col-md-8">
										<input class="form-control" type="color" id="ip_color_livetv"
											style="width: 40px" onchange="changeColorAnnounce()" />
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-4">
										<label class="control-label"><s:property
												value="getText('livetv.bg.color')" /></label>
									</div>
									<div class="col-md-8">
										<!--<input class="form-control" type="color" id="ip_bg_color" style="width:40px" onchange="changeColorAnnounce()" /> -->
										<div style="width: 70px">
											<input type="text" id="ip_bg_clpicker"
												class="form-control my-cp" onchange="changeColorAnnounce()">
										</div>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-4">
										<label class="control-label">Font size</label>
									</div>
									<div class="col-md-8">
										<select id="fontsize_livetv">

											<option value="18px">18px</option>
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
											<option value="50px">50px</option>
										</select>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-4">
										<label class="control-label"><s:property
												value="getText('livetv.duration')" /></label>
									</div>
									<div class="col-md-8">
										<div class="input-append timepicker">
											<input id="duration-livetv" type="text"
												data-format="hh:mm:ss" style="width: auto !important;"
												class="input-time" maxlength="8" placeholder="hh:mm:ss"
												required="required" onchange="onchangeInputTime()">
											<span class="add-on"> <i class="icon-time"
												data-date-icon="icon-calendar"></i>
											</span>
										</div>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-4">
										<label class="control-label"><s:property
												value="getText('livetv.announce.turnon')" /></label>
									</div>
									<div class="col-md-8">
										<input type="checkbox" id="ip_status_livetv" />
									</div>
								</div>




								<div class="form-group pull-right">
									<button class="btn btn-primary btn-sm" id="btn_annoucne_livetv"
										onclick="updateAnnounceLivetv()">
										<i class="fa fa-floppy-o"></i>
										<s:property value="getText('button.save')" />
									</button>
								</div>

							</div>
						</div>
					</div>
				</div>

			</div>

		</div>
	</div>
	<div class="container">
		<!--edit group-->
		<div class="panel panel-default div-container"
			style="margin-top: 20px; display: none;">
			<form id="subject-upload-form"
				action="${pageContext.request.contextPath}/upload-file.elcom"
				method="post" enctype="multipart/form-data">
				<div class="panel-heading text-right">
					<button type="submit" class="btn btn-info btn-sm">
						<i class="fa fa-floppy-o"></i>
						<s:property value="getText('button.save')" />
					</button>
					<button type="button" class="btn btn-default btn-sm"
						onclick="closeLayout()">
						<i class="fa fa-times"></i>
						<s:property value="getText('button.close')" />
					</button>
				</div>
				<div class="panel-body">
					<div class="col-md-4">
						<table class="tableLayout">
							<tr>
								<td colspan="2">
									<div class="input-group">
										<div id="subject-container-error" class="alert alert-danger"
											style="display: none"></div>
									</div>
								</td>
							</tr>
							<tr>
								<td width="25%"><s:property value="getText('item.name')" />
									:</td>
								<td width="75%"><input type="text" id="subject-name"
									style="width: 100%"></td>
							</tr>
							<tr>
								<td><s:property value="getText('item.status')" /></td>
								<td id="status-subject-td"></td>
							</tr>
							<tr>
								<td><s:property value="getText('item.image')" /> :</td>
								<td><input type="file" name="file" id="subject-file"
									style="width: 100%"
									onchange="previewFileImage('subject-container-error', 'subject-image', 'subject-file', 'subject-file-name', 0)">
									<input type="hidden" name="fileName" id="subject-file-name">
								</td>
							</tr>
							<tr>
								<td></td>
								<td><img id="subject-image" alt="" src=""
									style="max-width: 100%; max-height: 150px"></td>
							</tr>
							<tr class="process-upload">
								<td></td>
								<td>
									<div class="progress-style">
										<div class="progress-bar"></div>
										<div class="progress-percent">0%</div>
									</div>
								</td>
							</tr>
						</table>
						<input type="hidden" id="subject-old-file-name" name="oldFileName">
						<input type="hidden" id="subject-status" name="status"> <input
							type="hidden" name="type" value="1">
					</div>
					<div class="col-md-4">
						<div class="panel panel-default">
							<div class="panel-heading text-center panel-title"></div>
							<div class="panel-body"
								style="max-height: 300px; overflow: auto;">
								<table class="table text-left">
									<thead>
										<tr>
											<th width="10%"><s:property value="getText('item.no')" /></th>
											<th width="55%"><s:property value="getText('item.name')" /></th>
											<th width="20%"><s:property
													value="getText('item.image')" /></th>
											<th width="15%"><s:property
													value="getText('item.remove')" /></th>
										</tr>
									</thead>
									<tbody id="tbody-item-in"></tbody>
								</table>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="panel panel-default">
							<div class="panel-heading text-center">Live TV</div>
							<div class="panel-body"
								style="max-height: 300px; overflow: auto;">
								<table class="table text-left">
									<thead>
										<tr>
											<th width="10%"><s:property value="getText('item.no')" /></th>
											<th width="55%"><s:property value="getText('item.name')" /></th>
											<th width="20%"><s:property
													value="getText('item.image')" /></th>
											<th width="15%"><s:property value="getText('item.add')" /></th>
										</tr>
									</thead>
									<tbody id="tbody-item-out"></tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</section>

<!-- Delete Subject Dialog -->
<div id="subject-delete-dialog" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 400px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">
					<s:property value="getText('subject.delete.title')" />
				</h5>
			</div>
			<div class="modal-body">
				<s:property value="getText('subject.delete.confirm')" />
				"<span style="color: red;" id="subject-content-delete"></span>" ?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-danger"
					onclick="deleteSubject()">
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

<!-- Item Dialog -->
<div id="item-dialog" class="modal fade" role="dialog">
	<form id="item-upload-form"
		action="${pageContext.request.contextPath}/upload-file.elcom"
		method="post" enctype="multipart/form-data">
		<div class="modal-dialog" style="width: 500px;">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="item-title"></h5>
				</div>
				<div class="modal-body">
					<table class="tableLayout">
						<tr>
							<td colspan="2">
								<div class="input-group">
									<div id="item-container-error" class="alert alert-danger"
										style="display: none"></div>
								</div>
							</td>
						</tr>
						<tr>
							<td><s:property value="getText('item.subject')" />:</td>
							<td><select name="listsubject" id="listsubject"></select></td>
							
						</tr>
						<tr>
							<td><s:property value="getText('item.name')" /> :</td>
							<td><input type="text" name="name" id="item-name"
								style="width: 100%"></td>
						</tr>
						<tr>
							<td><s:property value="getText('item.address')" /> :</td>
							<td><input type="text" name="address" id="item-address"
								style="width: 100%"></td>
						</tr>
						<tr>
							<td width="25%"><s:property value="getText('item.status')" />
								:</td>
							<td width="75%" id="status-td"></td>
						</tr>
						<tr>
							<td width="25%"><s:property value="getText('item.idx')" /> :
							</td>
							<td width="75%"><input type="text" id="item-idx" name="idx"
								class="item-numberic"></td>
						</tr>
						<tr>
							<td><s:property value="getText('item.image')" /> :</td>
							<td><input type="file" name="file" id="item-file"
								style="width: 100%"
								onchange="previewFileImage('item-container-error', 'item-image', 'item-file', 'item-file-name',0)">
								<input type="hidden" name="fileName" id="item-file-name">
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<div id="div-item-image">
									<img id="item-image" alt="" src="">
								</div>
							</td>
						</tr>
						<tr class="process-upload">
							<td></td>
							<td>
								<div class="progress-style">
									<div class="progress-bar"></div>
									<div class="progress-percent">0%</div>
								</div>
							</td>
						</tr>
					</table>
					<input type="hidden" id="item-old-file-name" name="oldFileName">
					<input type="hidden" id="item-status"> <input type="hidden"
						name="type" value="1">
					<!--
					<input type="hidden" id="item-cropX" name="cropX">
					<input type="hidden" id="item-cropY" name="cropY">
					<input type="hidden" id="item-cropW" name="cropW">
					<input type="hidden" id="item-cropH" name="cropH">
					-->
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-sm btn-primary btn-save"></button>
					<button type="button" class="btn btn-sm btn-danger"
						data-dismiss="modal">
						<s:property value="getText('button.cancel')" />
					</button>
				</div>
			</div>
		</div>
	</form>
</div>

<!-- Item Mode Dialog -->
<div id="item-mode-dialog" class="modal fade" role="dialog">
	<form id="item-mode-upload-form"
		action="${pageContext.request.contextPath}/upload-file.elcom"
		method="post" enctype="multipart/form-data">
		<div class="modal-dialog" style="width: 500px;">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="item-title"></h5>
				</div>
				<div class="modal-body">
					<table class="tableLayout">
						<tr>
							<td colspan="2">
								<div class="input-group">
									<div id="item-mode-container-error" class="alert alert-danger"
										style="display: none"></div>
								</div>
							</td>
						</tr>
						<tr>
							<td><s:property value="getText('item.mode')" />:</td>
							<td><select name="listmode" id="listmode"></select></td>
							
						</tr>
						<tr>
							<td><s:property value="getText('item.name')" /> :</td>
							<td><input type="text" name="name" id="item-name-mode"
								style="width: 100%"></td>
						</tr>
						<tr>
							<td><s:property value="getText('item.address')" /> :</td>
							<td><input type="text" name="address" id="item-address-mode"
								style="width: 100%"></td>
						</tr>
						<tr>
							<td width="25%"><s:property value="getText('item.status')" />
								:</td>
							<td width="75%" id="status-td-mode"></td>
						</tr>
						<tr>
							<td width="25%"><s:property value="getText('item.idx')" /> :
							</td>
							<td width="75%"><input type="text" id="item-idx-mode" name="idx"
								class="item-numberic"></td>
						</tr>
						<tr>
							<td><s:property value="getText('item.image')" /> :</td>
							<td><input type="file" name="file" id="item-file-mode"
								style="width: 100%"
								onchange="previewFileImage('item-mode-container-error', 'item-image-mode', 'item-file-mode', 'item-file-name-mode',0)">
								<input type="hidden" name="fileName" id="item-file-name-mode">
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<div id="div-item-image-mode">
									<img id="item-image-mode" alt="" src="">
								</div>
							</td>
						</tr>
						<tr class="process-upload">
							<td></td>
							<td>
								<div class="progress-style">
									<div class="progress-bar"></div>
									<div class="progress-percent">0%</div>
								</div>
							</td>
						</tr>
					</table>
					<input type="hidden" id="item-old-file-name-mode" name="oldFileName">
					<input type="hidden" id="item-status-mode"> <input type="hidden"
						name="type" value="1">
					<!--
					<input type="hidden" id="item-cropX" name="cropX">
					<input type="hidden" id="item-cropY" name="cropY">
					<input type="hidden" id="item-cropW" name="cropW">
					<input type="hidden" id="item-cropH" name="cropH">
					-->
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-sm btn-primary btn-save"></button>
					<button type="button" class="btn btn-sm btn-danger"
						data-dismiss="modal">
						<s:property value="getText('button.cancel')" />
					</button>
				</div>
			</div>
		</div>
	</form>
</div>

<!-- Delete Item Dialog -->
<div id="item-delete-dialog" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 400px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">
					<s:property value="getText('livetv.delete.item.title')" />
				</h5>
			</div>
			<div class="modal-body">
				<s:property value="getText('livetv.delete.item.confirm')" />
				"<span style="color: red;" id="item-delete"></span>" ?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-danger"
					onclick="deleteItem()">
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

<!--MyHotel Item Dialog -->
<div id="myhotel-item-dialog" class="modal fade" role="dialog">
	<form id="myhotel-item-upload-form"
		action="${pageContext.request.contextPath}/upload-file-myhotel.elcom"
		method="post" enctype="multipart/form-data">
		<div class="modal-dialog" style="width: 1000px;">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="myhotel-item-title"></h5>
				</div>
				<div class="modal-body">
					<table class="tableLayout">
						<tr>
							<td colspan="4">
								<div class="input-group">
									<div id="myhotel-item-container-error"
										class="alert alert-danger" style="display: none"></div>
								</div>
							</td>
						</tr>
						<tr>
							<td width="10%"><s:property value="getText('item.name')" /></td>
							<td width="40%"><input type="text" name="name"
								id="myhotel-item-name" style="width: 100%"></td>
							<td width="10%"><s:property value="getText('item.status')" /></td>
							<td width="40%" id="myhotel-status-td"></td>
						</tr>
						<tr>
							<td><s:property value="getText('item.link')" /></td>
							<td><input type="text" name="mediaName"
								id="myhotel-item-link" style="width: 100%" readonly="readonly">
							</td>
							<td><s:property value="getText('item.image')" /></td>
							<td><input type="file" name="file" id="myhotel-item-file"
								style="width: 100%"
								onchange="previewMyhotelFileImage('myhotel-item-container-error', 'myhotel-item-image', 'myhotel-item-file', 'myhotel-item-file-name', 1)">
								<span style="color: red; font-size: 12px;">Image with
									width &#8805; 135px, height &#8805; 200px</span> <input type="hidden"
								name="fileName" id="myhotel-item-file-name"></td>
						</tr>
						<tr>
							<td></td>
							<td>
								<div id="container-ftp" class="container-ftp"></div>
								<div id="media-player" class="media-player"></div>
							</td>
							<td></td>
							<td>
								<div id="myhotel-div-item-image">
									<img id="myhotel-item-image" alt="" src="">
								</div>
							</td>
						</tr>
						<tr class="process-upload">
							<td colspan="4">
								<div class="progress-style">
									<div class="progress-bar"></div>
									<div class="progress-percent">0%</div>
								</div>
							</td>
						</tr>
					</table>
					<input type="hidden" id="myhotel-item-old-file-name"
						name="oldFileName"> <input type="hidden"
						id="myhotel-item-status" name="status"> <input
						type="hidden" id="item-cropX" name="cropX"> <input
						type="hidden" id="item-cropY" name="cropY"> <input
						type="hidden" id="item-cropW" name="cropW"> <input
						type="hidden" id="item-cropH" name="cropH"> <input
						type="hidden" id="item-host" name="host"> <input
						type="hidden" id="item-port" name="port"> <input
						type="hidden" id="item-user" name="user"> <input
						type="hidden" id="item-pass" name="pass"> <input
						type="hidden" id="item-type" name="type"> <input
						type="hidden" id="myhotel-item-path" name="mediaPath">
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-sm btn-primary btn-save"></button>
					<button type="button" class="btn btn-sm btn-danger"
						onclick="closeDialogItem()">
						<s:property value="getText('button.cancel')" />
					</button>
				</div>
			</div>
		</div>
	</form>
</div>

<!-- MyHotel delete item dialog -->
<div id="myhotel-item-delete-dialog" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 400px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">
					<s:property value="getText('hotel.delete.item.title')" />
				</h5>
			</div>
			<div class="modal-body">
				<s:property value="getText('hotel.delete.item.confirm')" />
				"<span style="color: red;" id="myhotel-item-delete"></span>" ?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-sm btn-danger"
					onclick="deleteMyhotelItem()">
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


<script
	src="${pageContext.request.contextPath}/MODULE-LIVETV/js/announcement-livetv.js"></script>
<script
	src="${pageContext.request.contextPath}/MODULE-LIVETV/js/subject.js"></script>
<script
	src="${pageContext.request.contextPath}/MODULE-LIVETV/js/item.js"></script>
<script
	src="${pageContext.request.contextPath}/MODULE-LIVETV/js/myhotel.js"></script>