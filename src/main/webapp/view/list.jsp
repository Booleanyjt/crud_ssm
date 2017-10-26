<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
/* String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/"; */
pageContext.setAttribute("path", request.getContextPath());
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
<%--     <base href="<%=basePath%>">
 --%>    
    <title>员工列表</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="${path }/static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
	<script src="${path }/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
	<script src="${path }/static/js/jquery-3.2.1.js"></script>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
  	<div class="container">
  		<div class="row">
  			<div class="col-md-12">
  				<h1>CRUD_SSM</h1>
  			</div>
  		</div>
  		
  		<div class="row">
  			<div class="col-md-2 col-md-offset-7">
  				<button class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-plus"></span>新增</button>
  				<button class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span>删除</button>
  			</div>
  		</div>
  		
  		<div class="row">
  			<div class="col-md-12">
	  			<table class="table table-hover">
	  				<tr>
	  					<td>#</td>
	  					<td>姓名</td>
	  					<td>性别</td>
	  					<td>email</td>
	  					<td>部门</td>
	  					<td>操作</td>
	  				</tr>
	  				<c:forEach items="${page.list }" var="emp">
	  				<tr>
	  					<td>${emp.eid }</td>
	  					<td>${emp.ename }</td>
	  					<td>${emp.gender }</td>
	  					<td>${emp.email }</td>
	  					<td>${emp.department.dname }</td>
	  					<td>
	  						<button class="btn btn-success btn-xs"><span class="glyphicon glyphicon-pencil"></span>修改</button>
	  						<button class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span>删除</button>
	  						
	  					</td>
	  				</tr>
	  				</c:forEach>
	  			</table>
  			</div>
  		</div>
  		
  		<div class="row">
  			<div class="col-md-6">
  				总页数：${page.pages }&nbsp 总记录数：${page.total }
  			</div>
  			<div class="col-md-6">
  				<nav aria-label="Page navigation">
				  <ul class="pagination pagination-sm">
				  
				  <li><a href="${path }/emps?pn=1">首页</a></li>
				  
				  <c:if test="${page.hasPreviousPage }">
					   	<li>
					      <a href="${path }/emps?pn=${page.prePage }" aria-label="Previous">
					        <span aria-hidden="true">&laquo;</span>
					      </a>
					    </li>
				  </c:if>
				    
				  
				    <c:forEach items="${page.navigatepageNums}" var="pageNum">
				    	<c:choose >
				    		<c:when test="${pageNum eq page.pageNum }">
				    			<li class="active"><a href="${path }/emps?pn=${pageNum}">${pageNum }</a></li>
				    		</c:when>
				    		<c:otherwise>
				    			<li><a href="${path }/emps?pn=${pageNum}">${pageNum }</a></li>
				    		</c:otherwise>
				    	</c:choose>
				    </c:forEach>
				    
				    
				    <c:if test="${page.hasNextPage }">
					    <li>
					      <a href="${path }/emps?pn=${page.nextPage }" aria-label="Next">
					        <span aria-hidden="true">&raquo;</span>
					      </a>
					    </li>
				    </c:if>
				    
				    <li><a href="${path }/emps?pn=${page.pages}">尾页</a></li>
				  </ul>
				</nav>
  			</div>
  		</div>
  	</div>
  </body>
</html>
