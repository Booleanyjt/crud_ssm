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
	<script src="${path }/static/js/jquery-3.2.1.js"></script>
	<link href="${path }/static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
	<script src="${path }/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
	<script src="${path }/static/js/emp_list.js"></script>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

  </head>
  
  <body>
  
  
  	 	
  	<!-- 修改模态框 -->
   <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="exampleModalLabel">更新员工</h4>
	      </div>
	      <div class="modal-body">
	        <form class="form-horizontal" id="empUpdateModel">
		        
			     <div class="form-group">
				    <label class="col-sm-2 control-label">姓名：</label>
				    <div class="col-sm-10">
				      <p id="ename_update_text" class="form-control-static"></p>
				    </div>
				 </div>
				 
				 <div class="form-group">
				    <label class="col-sm-2 control-label">性别：</label>
				    <div class="col-sm-10">
				      <label class="radio-inline"><input type="radio" name="gender"  id="gender_update_radio1" checked="checked" value="M">男</label>
				      <label class="radio-inline"><input type="radio" name="gender"  id="gender_update_radio2" value="F">女</label>
				      <span class="help-block"></span>
				    </div>
				 </div>
				 
				 <div class="form-group">
				    <label class="col-sm-2 control-label">email：</label>
				    <div class="col-sm-10">
				      <input type="text" name="email" class="form-control" id="email_update_input" placeholder="your email">
				      <span class="help-block"></span>
				    </div>
				 </div>
				 
				 <div class="form-group">
				    <label class="col-sm-2 control-label">部门：</label>
				    <div class="col-sm-10">
				      <select name="dId" id="dId" ></select>
				      <span class="help-block"></span>
				    </div>
				 </div>
			  
		        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	        <button type="button" class="btn btn-primary" id="updateEmpBtw">更新</button>
	      </div>
	    </div>
	  </div>
	</div>
  
  
  
  	
  	<!-- 模态框 -->
   <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="exampleModalLabel">添加员工</h4>
	      </div>
	      <div class="modal-body">
	        <form class="form-horizontal" id="empAddModel">
		        
			     <div class="form-group">
				    <label class="col-sm-2 control-label">姓名：</label>
				    <div class="col-sm-10">
				      <input type="text" name="ename" class="form-control" id="ename_add_input" placeholder="your name">
				      <span class="help-block"></span>
				    </div>
				 </div>
				 
				 <div class="form-group">
				    <label class="col-sm-2 control-label">性别：</label>
				    <div class="col-sm-10">
				      <label class="radio-inline"><input type="radio" name="gender"  id="gender_add_radio" checked="checked" value="M">男</label>
				      <label class="radio-inline"><input type="radio" name="gender"  id="gender_add_radio" value="F">女</label>
				      <span class="help-block"></span>
				    </div>
				 </div>
				 
				 <div class="form-group">
				    <label class="col-sm-2 control-label">email：</label>
				    <div class="col-sm-10">
				      <input type="text" name="email" class="form-control" id="email_add_input" placeholder="your email">
				      <span class="help-block"></span>
				    </div>
				 </div>
				 
				 <div class="form-group">
				    <label class="col-sm-2 control-label">部门：</label>
				    <div class="col-sm-10">
				      <select name="dId" id="dId"></select>
				      <span class="help-block"></span>
				    </div>
				 </div>
			  
		        </form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
	        <button type="button" class="btn btn-primary" id="addEmpBtw">添加</button>
	      </div>
	    </div>
	  </div>
	</div>
  
  
  
  
  	<div class="container">
  		<div class="row">
  			<div class="col-md-12">
  				<h1>CRUD_SSM</h1>
  			</div>
  		</div>
  		
  		<div class="row">
  			<div class="col-md-2 col-md-offset-7">
  				<button id="add_btw"  class="btn btn-primary btn-sm" ><span class="glyphicon glyphicon-plus"></span>新增</button>
  				<button class="btn btn-danger btn-sm" id="del_all_btw"><span class="glyphicon glyphicon-trash"></span>删除</button>
  			</div>
  		</div>
  		
  		<div class="row">
  			<div class="col-md-12">
	  			<table class="table table-hover" id="emps_table">
	  				<thead>
	  				<tr>
	  					<td><input type="checkbox" id="checkAll" ></td>
	  					<td>#</td>
	  					<td>姓名</td>
	  					<td>性别</td>
	  					<td>email</td>
	  					<td>部门</td>
	  					<td>操作</td>
	  				</tr>
	  				</thead>
	  				<tbody>
	  				
	  				</tbody>
	  				
	  			</table>
  			</div>
  		</div>
  		
  		<div class="row">
  			<div class="col-md-6" id="page_info_area">
  				
  			</div>
  			<div class="col-md-6" id="page_nav_area">
  			</div>
  		</div>
  	</div>
  <!-- 	
  	<script type="text/javascript">
  		function show_model(){
  		
  			//alert("test");
  			$('#myModal').modal('show');
  		}
  	</script> -->
  </body>
</html>
