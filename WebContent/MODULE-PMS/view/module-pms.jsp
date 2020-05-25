<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>

</head>
<body>
<section class="home-section">
	<div class="container">
		<div class="row" >				
			<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 col-md-offset-1" style="overflow: auto;">
				<div id="exchange_rate" class="tab-pane active" role="tabpanel">
				
				
				
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 panel panel-default">	
					<div class="dataTables_filter" style="float: right;width: 430px">
					<p  style="font-family: Arial;font-weight: 300;font-size: 14px;;margin-right: 0px;text-align: right;"><s:property value="getText('pms.date')"/> <input type="text" style="mafont-size: 12px;margin-top: 10px; margin-left: 5px;" id="datepicker" onchange="getDate()"></p>						
					</div>	
					
						<table id="table-item" class="table text-left" style="width: 100%">
							<thead>
								<tr>
									<th width="5%"><s:property value="getText('pms.no')"/></th>
									<th width="50%"><s:property value="getText('pms.name')"/></th>
									<th width="40%"><s:property value="getText('pms.createdate')"/></th>		
									<th width="5%"><s:property value="getText('pms.view')"/></th>									
									
								</tr>
							</thead>
							<tbody id="tbody-item">
							</tbody>
						</table>
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="float: left;padding-left: 0px;margin-top:20px;height: 50px">
						<a href="${pageContext.request.contextPath}/dowload/dowloadFile.elcom" class="btn btn-info" role="button" style="margin-left: 0px;">Download log</a>
						</div>
						
						
					</div>
				</div>
			</div>	
		</div>
	</div>
	
</section>

<div id="item-dialog" class="modal fade" role="dialog">
	<div class="modal-dialog" style="width: 1000px;">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title"> <span id="item-name-file"></span></h5><!-- <s:property value="getText('pms.code')"/> -->
			</div>
			<div class="modal-body">
				<span style="color: blue;" id="item-data"></span>
			</div>
			<div class="modal-footer">				
				<button type="button" class="btn btn-sm btn-default" data-dismiss="modal"><s:property value="getText('button.close')"/></button>
			</div>
		</div>
	</div>
</div>


</body>
 <link href="${pageContext.request.contextPath}/MODULE-PMS/css/jquery-ui.css" rel="stylesheet">
  <link href="${pageContext.request.contextPath}/MODULE-PMS/css/module-pms.css" rel="stylesheet">
  
<script src="${pageContext.request.contextPath}/MODULE-COMMON/js/jquery-1.11.1.min.js"></script>
<script src="${pageContext.request.contextPath}/MODULE-PMS/js/module-pms.js"></script>
</html>