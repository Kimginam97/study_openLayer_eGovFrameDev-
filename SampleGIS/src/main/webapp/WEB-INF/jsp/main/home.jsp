<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	request.setCharacterEncoding("utf-8");
%>
<%
	response.setContentType("text/html;charset=UTF-8");
%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=10">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Web GIS</title>

<c:import url="../include/css_define.jsp"></c:import>
<c:import url="../include/js_define.jsp"></c:import>

</head>
<body>


	<div class="column-map" id='openlayers-map'></div>
	
</body>
</html>
