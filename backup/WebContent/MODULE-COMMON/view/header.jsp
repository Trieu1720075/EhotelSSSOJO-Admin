<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!--
    @author: Tran Minh Dang(DangTM)
    @modify:     25/12/2015
-->
<script type="text/javascript">
	function changeLanguage(obj) {
		var lang = $(obj).attr("data-lang");
		var url = window.location.href;
		if (url.indexOf('?') < 0) {
			url += '?request_locale=' + lang;
		} else {
			if (url.indexOf('request_locale') < 0) {
				url += '&request_locale=' + lang;
			} else {
				url = replaceUrlParam(url, 'request_locale', lang);
			}
		}
		window.location.href = url;
	}

	function replaceUrlParam(url, paramName, paramValue) {
		var pattern = new RegExp('(\\?|\\&)(' + paramName + '=).*?(&|$)')
		var newUrl = url
		if (url.search(pattern) >= 0) {
			newUrl = url.replace(pattern, '$1$2' + paramValue + '$3');
		} else {
			newUrl = newUrl + (newUrl.indexOf('?') > 0 ? '&' : '?') + paramName
					+ '=' + paramValue
		}
		return newUrl
	}
</script>

<div class="container">
	<ul id="gn-menu" class="gn-menu-main">
		<li class="gn-trigger"><a class="gn-icon gn-icon-menu"><span>Menu</span>
		</a>
			<nav class="gn-menu-wrapper">
				<div class="gn-scroller">
					<ul class="gn-menu">
						<li><a href="${pageContext.request.contextPath}/welcome/welcome.elcom">
							<i class="fa-menu fa-files-o"></i>
							<s:property value="getText('menu.welcome')" />
						</a></li>
						<li><a href="${pageContext.request.contextPath}/main/main.elcom">
							<i class="fa-menu fa-files-o"></i>
							<s:property value="getText('menu.main')" />
						</a></li>
						<li><a href="${pageContext.request.contextPath}/movies/movies.elcom">
							<i class="fa-menu fa-files-o"></i>
							<s:property value="getText('menu.movie')"/>
						</a></li>
						<li><a href="${pageContext.request.contextPath}/musicvideo/musicvideo.elcom">
							<i class="fa-menu fa-files-o"></i>
							<s:property value="getText('menu.mv')"/>
						</a></li>
						<li><a href="${pageContext.request.contextPath}/music/music.elcom">
							<i class="fa-menu fa-files-o"></i>
							<s:property value="getText('menu.music')"/>
						</a></li>
						<li><a href="${pageContext.request.contextPath}/livetv/livetv.elcom">
							<i class="fa-menu fa-files-o"></i>
							<s:property value="getText('menu.livetv')"/>
						</a></li>
						<li><a href="${pageContext.request.contextPath}/config.elcom">
							<i class="fa-menu fa-files-o"></i>
							<s:property value="getText('menu.ftp')"/>
						</a></li>

					</ul>
				</div>
				<!-- /gn-scroller -->
			</nav></li>
		<li><a id="content-menu-current" href="${pageContext.request.contextPath}/home.elcom">eHotel</a></li>
		<li class="dropdown pull-right" style="margin-right: 10px; border-right: 0px">
			<!-- <input type="button" onclick="changeLanguage(this)" class="btnLa" data-lang="la"> -->
			<input type="button" onclick="changeLanguage(this)" class="btnEn" data-lang="en">
			 <input type="button" onclick="changeLanguage(this)" class="btnVn" data-lang="vn">
		</li>
		<li class="dropdown">
			<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown"> 
				<span class="glyphicon glyphicon-user"></span>
				<span id="span-fullName"></span>
				<span class="caret"></span>
			</a>
			<ul class="dropdown-menu pull-right">
				<li><a onclick="openProfileDialog()">Profile</a></li>
				<li><a href="#">Setting</a></li>
				<li role="separator" class="divider"></li>
				<li><a href="login.elcom">Logout</a></li>
			</ul>
		</li>
	</ul>
</div>

<div class="modal fade" role="dialog" id="msg-error">
	<div class="modal-dialog modal-sm">
		<div class="modal-content text-danger">
			<div class="modal-header" style="background-color: white !important;">
				<h4 class="modal-title" style="color: #a94442 !important;">ERROR</h4>
			</div>
			<div class="modal-body" id="body-msg-error"></div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" role="dialog" id="msg-success">
	<div class="modal-dialog modal-sm">
		<div class="modal-content text-success">
			<div class="modal-header" style="background-color: white !important;">
				<h4 class="modal-title" style="color: #3c763d !important;">SUCCESS</h4>
			</div>
			<div class="modal-body" id="body-msg-success"></div>
			<div class="modal-footer">
				<button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" role="dialog" id="msg-warning">
	<div class="modal-dialog modal-sm">
		<div class="modal-content text-warning">
			<div class="modal-header" style="background-color: white !important;">
				<h4 class="modal-title" style="color: #8a6d3b !important;">WARNING</h4>
			</div>
			<div class="modal-body" id="body-msg-warning"></div>
			<div class="modal-footer">
				<button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<div id="profile-dialog" class="modal fade" role="dialog">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content" style="width: 500px;">
			<div class="modal-header">
				<h5 class="modal-title">Profile</h5>
			</div>
			<div class="modal-body">
				<div class="input-group">
				  	<div id="profile-container-error" class="alert alert-danger" style="display: none"></div>
				</div>
				<table class="tableLayout">
					<tr>
						<td width="25%">Username</td>
						<td width="50%">
							${objectBean.username}
						</td>
						<td width="25%" align="right">
							<button class="btn btn-default btn-xs" type="button" onclick="clickChangePassword()">
								<i class="fa fa-pencil-square-o"></i> Change Password
							</button>
						</td>
					</tr>
					<tr class="password">
						<td>Old Password</td>
						<td colspan="2">
							<input type="password" id="profile-old-password" placeholder="old password" style="width: 100%"/>
						</td>
					</tr>
					<tr class="password">
						<td>New Password</td>
						<td colspan="2">
							<input type="password" id="profile-new-password" placeholder="new password" style="width: 100%"/>
						</td>
					</tr>
					<tr class="password">
						<td>Re-Password</td>
						<td colspan="2">
							<input type="password" id="profile-repassword" placeholder="re-password" style="width: 100%"/>
						</td>
					</tr>
					<tr>
						<td>Full Name</td>
						<td colspan="2">
							<input type="text" id="profile-fullName" placeholder="full name" value='${user.fullName}' style="width: 100%"/>
						</td>
					</tr>
					<tr>
						<td>Role</td>
						<td colspan="2">
							${user.role}	
						</td>
					</tr>
				</table>
			</div>
			<div class="modal-footer">				
				<button type="button" class="btn btn-sm btn-primary btn-edit" onclick="editProfile()">Save</button>
				<button type="button" class="btn btn-sm btn-danger" data-dismiss="modal">Cancel</button>
			</div>
		</div>
	</div>
</div>

<div id='ajax-loading' >
   	<img src="${pageContext.request.contextPath}/MODULE-COMMON/images/spinner.gif" class="img-loading"></img>
</div>

<input type="hidden" id="hidden-fullName" value="${objectBean.username}">
<input type="hidden" id="languageId" value="${objectBean.languageId}">
<input type="hidden" id="contextPath" value="${pageContext.request.contextPath}">