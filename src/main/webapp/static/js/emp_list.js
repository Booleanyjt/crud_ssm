var currentPage;


$(function(){
//	alert("aaa")
	
	to_page(1);
	
	
	
	//当点击添加按钮，则弹出模态框
	$("#add_btw").click(function(){
		
		loadDept("#myModal select");
		
		$('#myModal').modal({
			 show : true,
			 backdrop : false,
			 keyboard : false,
			}); 
	});
	
	//在模态框中点击保存，进行添加
	$("#addEmpBtw").click(function(){
		
		var flag=is_submit();
		if(flag){
			$.ajax({
				type:"POST",
				url:"/crud_ssm/emps",
				data:$("#empAddModel").serialize(),
				success:function(result){
//					console.log(result);
					if(result.code==100){
						
						$('#myModal').modal('hide');
						$("#empAddModel")[0].reset();
					}else if(result.code==200){
//						alert(result.extend.fielsErrors.email);
						if(undefined !=result.extend.fielsErrors.ename){
							show_validate_error("#ename_add_input","error",result.extend.fielsErrors.ename);
						}
						
						if(undefined !=result.extend.fielsErrors.email){
							show_validate_error("#email_add_input","error",result.extend.fielsErrors.email);
						}
						console.log(result);
					}
					
				}
			});
		}
		
	});
	
	
	//对输入框进行校验
	$(".form-control").blur(function(){
		var name=$(this).attr("name");
		var fun="validate_"+name+"()"
		eval(fun);
//		validate_ename();
//		validate_email();
	});
	
	//对更新员工的按钮进行监听
	$(document).on("click",".edit_emp_btws",function(){
//		alert("修 改");
		loadDept("#updateModal select");
		loadUpdate($(this).attr("edit_emp_id"));
		$('#updateModal').modal({
			 show : true,
			 backdrop : false,
			 keyboard : false,
		}); 
		
	});
	
	//对模态框中更新按钮进行监听
	$("#updateEmpBtw").click(function(){
		var flag=editEmailValidate();
		if(flag){
			$.ajax({
				type:"PUT",
				url:"/crud_ssm/emps/"+$(this).attr("edit_id"),
				data:$("#empUpdateModel").serialize(),
				success:function(result){
					console.log(result);
					if(result.code==100){
						
						$('#updateModal').modal('hide');
						$("#empUpdateModel")[0].reset();
						to_page(currentPage);
//						alert(nowPage)
					}/*else if(result.code==200){
						if(undefined !=result.extend.fielsErrors.email){
							show_validate_error("#email_add_input","error",result.extend.fielsErrors.email);
						}
						console.log(result);
					}*/
					
				}
			});
		}
	});
	
	//单个删除
	$(document).on("click",".del_emp_btws",function(){
		var ename=$(this).parents("tr").find("td:eq(2)").text();
		var eid=$(this).attr("del_emp_id")
		if(confirm("是否删除用户【"+ename+"】吗？")){
			$.ajax({
				type:"DELETE",
				url:"/crud_ssm/emps/"+eid,
				success:function(result){
//					console.log(result);
//					alert("处理成功！");
					to_page(currentPage);
				}
			});
		}
		
	});
	
	//批量删除
	$("#del_all_btw").click(function(){
//		alert("删除所有");
		var enames="";
		var eids="";
		$.each($(".checkItems:checked"),function(){
			enames+=$(this).parents("tr").find("td:eq(2)").text()+",";
			eids+=$(this).parents("tr").find("td:eq(1)").text()+"-";
		});
		enames=enames.substr(0, enames.length-1);
		eids=eids.substr(0, eids.length-1);
		
		if(confirm("是否删除用户【"+enames+"】吗？")){
			$.ajax({
				type:"DELETE",
				url:"/crud_ssm/emps/"+eids,
				success:function(result){
//					console.log(result);
//					alert("处理成功！");
					to_page(currentPage);
				}
			});
		}
	});
	
	
	
	
	//对批量批量删除全选按钮进行监听
	$("#checkAll").click(function(){
		$(".checkItems").prop("checked",$(this).prop("checked"));
	});
	
	//当点击5个按钮时，全选，否则不全选
	
	$(document).on("click",".checkItems",function(){
		var flag=$(".checkItems:checked").length==$(".checkItems").length;
		$("#checkAll").prop("checked",flag);
	});
/*	
	$(document).on("click","#checkAll",function(){
		$()
		$(this).
	});*/
	
/*	$(".edit_emp_btws").click(function(){
		
		alert("修改");
	});
	
*/	
});

function to_page(pn){
	$.ajax({
		type: "GET",
		url:"/crud_ssm/emps",
		data:"pn="+pn,
		success:function(result){
//			console.log(result);
			
			
			//将emp数据传入到表格
			build_emps_table(result);
			
			//封装分页信息
			build_page_info(result);
			
			//封装分页数据
			bulid_page_nva(result);
		}
	});
}


/*
 * 将emp数据传入到表格
 */

function build_emps_table(result){
	
	//获取json里边的客户信息
	var emps=result.extend.page.list;
	
	//每次设置值之前，将页面的信息清空
	$("#emps_table tbody").empty();
//	console.log(emps);
	
	//将数据放入页面
	$.each(emps,function(index,item){
//		alert("调用遍历方法");
		var checkItem=$("<td><input type='checkbox' class='checkItems' ></td>");
		var eid=$("<td></td>").append(item.eid);
		var ename=$("<td></td>").append(item.ename);
		var gender=$("<td></td>").append(item.gender=="M" ? "男" :"女");
		var email=$("<td></td>").append(item.email);
		var dept=$("<td></td>").append(item.department.dname);
		var emp=$("<tr></tr>");
		var edit_btw=$("<button></button>").addClass("btn btn-success btn-xs edit_emp_btws").append($("<span></span>").addClass("glyphicon glyphicon-pencil").append("修改"))
		edit_btw.attr("edit_emp_id",item.eid);
		edit_btw.attr("id","edit_emp_id");
		var del_btw=$("<button></button>").addClass("btn btn-danger btn-xs del_emp_btws").append($("<span></span>").addClass("glyphicon glyphicon-trash").append("删除"))
		del_btw.attr("del_emp_id",item.eid);
		del_btw.attr("id","del_emp_id");
		var btw_td=$("<td></td>").append(edit_btw).append(" ").append(del_btw)
		emp.append(checkItem).append(eid).append(ename).append(gender).append(email).append(dept).append(btw_td);
		emp.appendTo($("#emps_table tbody"));
		
	});
}


/*
 * 创建显示分页信息
 */
function build_page_info(result){
	
	//得到分页信息
	var page=result.extend.page;
	currentPage=page.pageNum;
	//将分页信息清空
	$("#page_info_area").empty();
	$("#page_info_area").append("总页数："+page.pages+" 当前页数"+page.pageNum+"总记录数："+page.total);
}


/*
 * 创建分页页面
 */
function bulid_page_nva(result){
	
	//将分页页面清空
	$("#page_nav_area").empty();
	
	//创建首页和上一页
	var ul=$("<ul></ul>").addClass("pagination pagination-sm");
	var page=result.extend.page;
	var headLi=$("<li></li>").append($("<a></a>").append("首页"));
	var preLi=$("<li></li>").append($("<a></a>").append("上一页"));
	
	//判断是否有上一页，有则将按钮设置为不能点击，否则添加点击事件
	if(!page.hasPreviousPage){
		headLi.addClass("disabled");
		preLi.addClass("disabled")
	}else{
		headLi.click(function(){
			to_page(1);
		});
		preLi.click(function(){
			to_page(page.pageNum-1);
		});
	}
	
	ul.append(headLi).append(preLi);
	
	//添加页码和页码事件
	$.each(page.navigatepageNums,function(index,item){
		var pageLi=$("<li></li>").append($("<a></a>").append(item));
		if(page.pageNum==item){
			pageLi.addClass("active")
		}
		
		pageLi.click(function(){
			to_page(item);
		})
		ul.append(pageLi);
	});
	
	
	//添加末页和下一页页面和事件
	var nextLi=$("<li></li>").append($("<a></a>").append("下一页"));
	var lastLi=$("<li></li>").append($("<a></a>").append("末页"));
	
	//如果有下一页，则添加点击事件，否则，设置为不能点击
	if(!page.hasNextPage){
		nextLi.addClass("disabled");
		lastLi.addClass("disabled");
	}else{
		nextLi.click(function(){
			to_page(page.pageNum+1);
		});
		lastLi.click(function(){
			to_page(page.pages);
		})
	}
	
	ul.append(nextLi).append(lastLi);
	var nav=$("<nav></nav>").attr("aria-label","Page navigation")
	nav.append(ul);
	nav.appendTo($("#page_nav_area"));
	
	
}

function loadDept(ele){
	$.ajax({
		type: "GET",
		url:"/crud_ssm/depts",
		success:function(result){
			var depts=result.extend.depts;
			$(ele).empty();
			$.each(depts,function(index,item){
				$("<option></option>").attr("value",item.did).append(item.dname).appendTo($(ele));
			});
			console.log(result);
		}
	});
}

function validate_ename(){
//		alert("验证用户名");
		var ename=$("#ename_add_input").val();
		var enameVil=/(^[a-zA-Z0-9_-]{2,16}$)|(^[\u2E80-\u9FFF]{2,5})/;
		if(!enameVil.test(ename)){
			show_validate_error("#ename_add_input","error","用户名请在2-5个中文或者6-16个英文");
			return false;
		}
		
		$.ajax({
			type:"GET",
			url:"/crud_ssm/validate_ename",
			data:"ename="+ename,
			success:function(result){
				if(result.code==200){
					show_validate_error("#ename_add_input","error","用户名已存在！");
					return false;
				}
//				console.log(result);
			}
		});
		
		show_validate_error("#ename_add_input","success","");
		return true;
		

		
	
		
	
}

function validate_email(){
//	alert("验证邮箱");
	var email=$("#email_add_input").val();
	var emailVil=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
	if(!emailVil.test(email)){
		show_validate_error("#email_add_input","error","email格式不正确");
		return false;
	}else{
		show_validate_error("#email_add_input","success","");
		return true;
	}
	
	
	
}

function show_validate_error(ele,code,msg){
//	alert("显示错误信息")
	var errorSpan=$(ele).next("span");
	var div=$(ele).parent();
	if("error"==code){
		errorSpan.empty();
		div.addClass("has-error");
		errorSpan.append(msg);
	}else if("success"==code){
		errorSpan.empty();
		div.removeClass("has-error");
		errorSpan.val("");
	}
}

function is_submit(){
	var flag=true;
	if(!validate_email()){
		flag=false;
	}
	
	if(!validate_ename()){
		flag=false;
	}
	return flag;
}

function loadUpdate(id){
	$.ajax({
		type:"GET",
		url:"/crud_ssm/emp/"+id,
		success:function(result){
			console.log(result);
			var emp=result.extend.emp;
			$("#ename_update_text").text(emp.ename);
			$("#email_update_input").val(emp.email);
			$("#updateModal input[name=gender]").val([emp.gender]);
			$("#updateModal select").val([emp.dId]);
			$("#updateEmpBtw").attr("edit_id",emp.eid);
			/*$("#ename_update_text").append(emp.ename);
			if("M"==emp.gender){
				$("#gender_update_radio1").attr("checked",true);
			}else if("F"==emp.gender){
				$("#gender_update_radio2").attr("checked",true);
			}
			$("#email_update_input").append(emp.email);
			var options=$("#dId option");
			$("#dId option").each(function(index,item){
				console.log(item);
				if($(item).val()==emp.dId){
					$(item).attr("seleted",true);
				}
			});*/
		}
	});
}

function editEmailValidate(){
	var email=$("#email_update_input").val();
	var emailVil=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
	if(!emailVil.test(email)){
		show_validate_error("#email_update_input","error","email格式不正确");
		return false;
	}else{
		show_validate_error("#email_update_input","success","");
		return true;
	}
}

