
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!--
    @author: Tran Minh Dang(DangTM)
    @day:    25/12/2015
 -->
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<title><tiles:insertAttribute name="title" ignore="true" /></title>
	<script src="${pageContext.request.contextPath}/MODULE-LOGIN/js/config.js"></script>
</head>
<body>
	<section class="home-section">
		<div class="container">
			<div class="row">
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
		</div>
	</section>
</body>
</html>