
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!--
    @author: elcomprime.com.vn
    @day:    1/8/2018
 -->
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<title><tiles:insertAttribute name="title" ignore="true" /></title>
	<script src="${pageContext.request.contextPath}/MODULE-CONFIG/js/config.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-CONFIG/js/config-mail.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-TOOL/js/editor.js"></script>
	<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery.tagsinput.js"></script>
	<link href="${pageContext.request.contextPath}/MODULE-COMMON/css/jquery.tagsinput.css"  rel="stylesheet">
	<link href="${pageContext.request.contextPath}/MODULE-CONFIG/css/config.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/MODULE-TOOL/css/editor.css" rel="stylesheet">
</head>
<body>
	<section class="home-section">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<ul class="nav nav-tabs">
						<li class="active"><a href="#ftp"  data-toggle="tab">FTP</a></li>
						<li><a href="#mail" data-toggle="tab">Mail</a></li>
					</ul>
					
						<div class="tab-content" style="margin-top:20px">
							<div class="tab-pane active" id="ftp">
								<div class="panel panel-default col-md-6 col-md-offset-3">
									<div class="panel-body">
										<table class="tableLayout">
											<tr>
												<td colspan="2">
													<div class="input-group">
														<div id="item-container-error" class="alert alert-danger" style="display: none"></div>
													</div>
												</td>
											</tr>
											<tr>
												<td><s:property value="getText('item.host')" /> :</td>
												<td><input type="text" name="host" id="host" style="width: 100%"></td>
											</tr>
											<tr>
												<td><s:property value="getText('item.port')" /> :</td>
												<td><input type="text" name="port" id="port" style="width: 100%" class="item-numberic"></td>
											</tr>
											<tr>
												<td><s:property value="getText('item.user')" /> :</td>
												<td><input type="text" name="user" id="user" style="width: 100%"></td>
											</tr>
											<tr>
												<td><s:property value="getText('item.pass')" /> :</td>
												<td><input type="password" name="pass" id="pass" style="width: 100%"></td>
											</tr>
										</table>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-sm btn-primary btn-save" onclick="editConfig()">
											<s:property value="getText('button.save')" />
										</button>
										<button type="reset" class="btn btn-sm btn-danger" onclick="reset()">
											<s:property value="getText('button.reset')" />
										</button>
									</div>
								</div>
							</div>
							<div class="tab-pane" id="mail">
								<div class="panel panel-default col-md-6 col-md-offset-3">
									<div class="panel-body">
										<div class="row">
											<div class="col-md-12">
												<div id="mail-container-error" class="alert alert-danger" style="display: none"></div>
											</div>
										</div>
										<div class="row" style="margin-top:10px">
											<div class="col-md-3">
												Service:
											</div>
											<div class="col-md-9">
												<select id="select-service" onchange="changeService()">
													<option value="gmail">GMAIL</option>
													<option value="other">OTHER</option>
												</select>
											</div>

										
										</div>
										<div class="sv-gmail row" style="margin-top:10px">
											<div class="col-md-3">
												Hostname:
											</div>
											<div class="col-md-9">
												<input type="text" name="mail-host" id="mail-host" style="width: 100%">
											</div>
										</div>
										<div class="sv-gmail row" style="margin-top:10px">
											<div class="col-md-3">
												<s:property value="getText('item.port')" /> :
											</div>
											<div class="col-md-9">
												<input type="text" name="mail-port" id="mail-port" style="width: 100%" class="item-numberic" />
											</div>
										</div>
										
										<div class="sv-gmail row" style="margin-top:10px">
											<div class="col-md-3">
												<s:property value="getText('item.security')" /> :
											</div>
											<div class="col-md-9">
												<input type="checkbox" name="mail-security" id="mail-security"/>
											</div>
										</div>
										
										<div class="row" style="margin-top:10px">
											<div class="col-md-3">
												<s:property value="getText('mail.sender')" /> :
											</div>
											<div class="col-md-9">
												<input type="text"  type='text' name="mail-sender" id="mail-sender" class='tags' />
											</div>
										</div>
										
										<div class="row" style="margin-top:10px">
											<div class="col-md-3">
												<s:property value="getText('mail.password')" /> :
											</div>
											<div class="col-md-9">
												<input type="password" name="mail-pass" id="mail-pass" style="width: 100%">
											</div>
										</div>
										
										
										<div class="row" style="margin-top:10px">
											<div class="col-md-3">
												<s:property value="getText('mail.receiver')" /> :
											</div>
											<div class="col-md-9 text-right">
												<input id='box_mailto' type='text' class='tags'>
											</div>
										</div>
										
										<div class="row" style="margin-top:10px">
											<div class="col-md-3">
												<s:property value="getText('mail.cc')" /> :
											</div>
											<div class="col-md-9 text-right">
												<input  id="box_mailcc" type='text' class='tags' />
											</div>
										</div>
										
										<div class="row" style="margin-top:10px">
											<div class="col-md-3">
												<s:property value="getText('mail.subject')" /> :
											</div>
											<div class="col-md-9">
												<input type="text" name="mail-subject" id="mail-subject" style="width: 100%" />
											</div>
										</div>
										<div class="row" style="margin-top:10px">
											<div class="col-md-3">
												<s:property value="getText('mail.signature')" /> :
											</div>
											<div class="col-md-9">
												<div id="mail-signature" class="box-signature" onclick="getSignatureFile()">
    							
												</div>
												<input type="hidden" id="link-file-signature" />
											</div>
										</div>
										
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-sm btn-primary btn-save" onclick="editConfigMail()">
											<s:property value="getText('button.save')" />
										</button>
									</div>
								</div>					
							</div>
					</div>
				</div>



			</div>
		</div>
	</section>
	
	<!-- Popup show Signature Editor -->
	<div id="modal-signature" class="modal fade bd-example-modal-lg" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<textarea id="txt_content" name="txt_content" class="form-control"rows="5">
				</textarea>
				
				<div class="modal-footer">
					<button type="button" id="btn-signature" onclick="saveSignature()" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>

		</div>
	</div>
	
</body>
</html>