<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%@ page session="true" %>
<!--
	@author: damthn@elcom.com.vn
	@modify:	 30/05/2018
-->
<section class="home-section">
	<div class="container">
		<div class="row">
			<div class="col-md-6 col-md-offset-3">
				<div class="panel panel-default ">
					<div class="panel-heading">
						<s:property value="getText('user.change-password.title')" />
					</div>
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
								<td><s:property value="getText('user.current-password')" /> *</td>
								<td><input type="password" name="current-password" id="current-password" style="width: 100%"></td>
							</tr>
							<tr>
								<td><s:property value="getText('user.new-password')" /> *</td>
								<td><input type="password" name="new-password" id="new-password" style="width: 100%"></td>
							</tr>
							<tr>
								<td><s:property value="getText('user.confirm-new-password')" /> *</td>
								<td><input type="password" name="confirm-password" id="confirm-password" style="width: 100%"></td>
							</tr>
							<tr>
								<td>
									<input type="hidden" id="user-id" value="${sessionScope.userId}" />	
								</td>
							
							</tr>

						</table>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-sm btn-primary btn-save" onclick="changePassword()">
							<s:property value="getText('button.save')" />
						</button>
						<button type="reset" class="btn btn-sm btn-danger" onclick="reset()">
							<s:property value="getText('button.reset')" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<script src="${pageContext.request.contextPath}/MODULE-USER/js/module-change-password.js"></script>