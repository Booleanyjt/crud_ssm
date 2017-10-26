package com.tao.crud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tao.crud.bean.Department;
import com.tao.crud.bean.Msg;
import com.tao.crud.service.DepartmentService;

@Controller
public class DepartmentController {

	@Autowired
	private DepartmentService departmentService;
	
	//将返回对象转化成json字符串
	@ResponseBody
	@RequestMapping("depts")
	public Msg getDeptWhitJson(){
		
		List<Department> depts=departmentService.findDepts();
		
		return Msg.success().add("depts", depts);
		
	}
}
