
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
</head>
<body>
	<section class="home-section">
		<div class="container">
		    <div class="col-md-10 col-md-offset-1 item-main" style="margin-top: 50px">
		    	<div class="col-md-3 mng-welcome">
			    	<a class="thumbnail text-center" href="${pageContext.request.contextPath}/welcome/welcome.elcom">
			    		<div class="caption">
					 		<h4><s:property value="getText('menu.welcome')" /></h4>
					 	</div>	
			    		<img src="MODULE-COMMON/images/items/welcome.png" style="height: 150px; width: 100%">
			    	</a>
		    	</div>
		    	<div class="col-md-3 mng-main">
			    	<a class="thumbnail text-center" href="${pageContext.request.contextPath}/main/main.elcom">
			    		<div class="caption">
					 		<h4><s:property value="getText('menu.main')" /></h4>
					 	</div>	
			    		<img src="MODULE-COMMON/images/items/main.png" style="height: 150px; width: 100%">
			    	</a>
		    	</div>
		    	<div class="col-md-3 mng-movie">
			    	<a class="thumbnail text-center" href="${pageContext.request.contextPath}/movies/movies.elcom">
			    		<div class="caption">
					 		<h4><s:property value="getText('menu.movie')" /></h4>
					 	</div>	
			    		<img src="MODULE-COMMON/images/items/movies.png" style="height: 150px; width: 100%">
			    	</a>
		    	</div>
		    	<div class="col-md-3 hidden">
			    	<a class="thumbnail text-center" href="${pageContext.request.contextPath}/musicvideo/musicvideo.elcom">
			    		<div class="caption">
					 		<h4><s:property value="getText('menu.mv')" /></h4>
					 	</div>	
			    		<img src="MODULE-COMMON/images/items/mv.png" style="height: 150px; width: 100%">
			    	</a>
		    	</div>
		    	<div class="col-md-3 mng-music">
			    	<a class="thumbnail text-center" href="${pageContext.request.contextPath}/music/music.elcom">
			    		<div class="caption">
					 		<h4><s:property value="getText('menu.music')" /></h4>
					 	</div>	
			    		<img src="MODULE-COMMON/images/items/music.png" style="height: 150px; width: 100%">
			    	</a>
		    	</div>
		    	<div class="col-md-3 mng-livetv">
			    	<a class="thumbnail text-center" href="${pageContext.request.contextPath}/livetv/livetv.elcom">
			    		<div class="caption">
					 		<h4><s:property value="getText('menu.livetv')" /></h4>
					 	</div>	
			    		<img src="MODULE-COMMON/images/items/livetv.png" style="height: 150px; width: 100%">
			    	</a>
		    	</div>
		    	<div class="col-md-3 mng-modetv">
			    	<a class="thumbnail text-center" href="${pageContext.request.contextPath}/modetv/modetv.elcom">
			    		<div class="caption">
					 		<h4><s:property value="getText('menu.modetv')" /></h4>
					 	</div>	
			    		<img src="MODULE-COMMON/images/items/ftp.png" style="height: 150px; width: 100%">
			    	</a>
		    	</div>
		    	<div class="col-md-3 mng-ftp">
			    	<a class="thumbnail text-center" href="${pageContext.request.contextPath}/config.elcom">
			    		<div class="caption">
					 		<h4><s:property value="getText('menu.ftp')" /></h4>
					 	</div>	
			    		<img src="MODULE-COMMON/images/items/ftp.png" style="height: 150px; width: 100%">
			    	</a>
		    	</div>
		    	<div class="col-md-3 mng-promotion">
			    	<a class="thumbnail text-center" href="${pageContext.request.contextPath}/promotion/promotion_footer.elcom">
			    		<div class="caption">
					 		<h4><s:property value="getText('menu.promotion')" /></h4>
					 	</div>	
			    		<img src="MODULE-COMMON/images/items/promotion.png" style="height: 150px; width: 100%">
			    	</a>
		    	</div>
		    </div>
		</div>
	</section>
</body>
</html>

