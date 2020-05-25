<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!--
    @author: Tran Minh Dang(DangTM)
    @modify:     25/12/2015
-->
<div class="container">
	<ul id="gn-menu" class="gn-menu-main">
		<li class="gn-trigger"><a class="gn-icon gn-icon-menu"><span>Menu</span>
		</a> <nav class="gn-menu-wrapper">
			<div class="gn-scroller">
				<ul class="gn-menu">
					<li><a href="javascript:void()"><i class="fa-menu fa-files-o"></i>Content</a>
					</li>
					<li><a href="javascript:void()"><i class="fa-menu fa-desktop"></i>Layout</a>
					</li>
					<li><a href="javascript:void()"><i class="fa-menu fa-calendar"></i>
							Schedule</a>
					</li>
					<li><a href="javascript:void()" class="gn-icon gn-icon-archive">Box
							Player</a></li>
					<li><a href="user.elcom" class="gn-icon"><i
							class="fa-menu fa-users"></i> User</a>
					</li>
					
				</ul>
			</div>
			<!-- /gn-scroller --> </nav></li>
		<li><a href="index.html">eHotel</a>
		</li>
		<li class="dropdown"><a href="javascript:void(0)"
			class="dropdown-toggle" data-toggle="dropdown"> <span
				class="glyphicon glyphicon-user"></span> admin <span class="caret"></span>
		</a>
			<ul class="dropdown-menu pull-right">
				<li><a href="#">Profile</a>
				</li>
				<li><a href="#">Setting</a>
				</li>
				<li role="separator" class="divider"></li>
				<li><a href="#">Logout</a>
				</li>
			</ul></li>
	</ul>
</div>
