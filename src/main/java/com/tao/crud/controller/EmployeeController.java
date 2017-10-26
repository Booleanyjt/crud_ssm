package com.tao.crud.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.junit.runners.Parameterized.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tao.crud.bean.Employee;
import com.tao.crud.bean.Msg;
import com.tao.crud.service.EmployeeService;

/**
 * 处理员工crud请求
 * @author tao
 *
 */

@Controller
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;
	
	@ResponseBody
	@RequestMapping(value="/emps/{eids}",method=RequestMethod.DELETE )
	public Msg delEmpByIds(@PathVariable("eids") String eids){
		if(eids.contains("-")){
			List<Integer> list=new ArrayList<Integer>();
			String[] ids=eids.split("-");
			for (String id : ids) {
				list.add(Integer.parseInt(id));
			}
			employeeService.delEmpByIds(list);
			return Msg.success();
		}
		employeeService.delEmpById(Integer.parseInt(eids));
		return Msg.success();
	}
	
	
	@ResponseBody
	@RequestMapping(value="/emps/{eid}", method=RequestMethod.PUT)
	public Msg updateEmp(Employee employee){
		employeeService.updateEmployee(employee);
		return Msg.success();
	}
	
	
	@ResponseBody
	@RequestMapping(value="/emp/{id}",method=RequestMethod.GET)
	public Msg findEmp(@PathVariable("id") Integer id){
		Employee employee=employeeService.findEmp(id);
		return Msg.success().add("emp", employee);
	}
	
	@ResponseBody
	@RequestMapping("/validate_ename")
	public Msg validate_email(Employee employee){
		boolean flag=employeeService.validate_email(employee.getEname());
		if(flag){
			return Msg.success();
		}else {
			return Msg.fail();
		}
		
	}
	
	@ResponseBody
	@RequestMapping(value="/emps",method=RequestMethod.POST)
	public Msg saveEmpsWhitJson(@Valid Employee employee,BindingResult result){
		if(result.hasErrors()){
			Map<String,Object> map=new HashMap<String, Object>();
			List<FieldError> fieldErrors=result.getFieldErrors();
			for (FieldError fieldError : fieldErrors) {
				System.out.println("错误的字段名："+fieldError.getField());
				System.out.println("错误信息："+fieldError.getDefaultMessage());
				map.put(fieldError.getField(), fieldError.getDefaultMessage());
			}
			return Msg.fail().add("fielsErrors", map);
		}
		
		employeeService.saveEmployee(employee);
		return Msg.success();
	}
	
	@ResponseBody
	@RequestMapping("/emps")
	public Msg getEmpsWithJson(@RequestParam(value="pn" , defaultValue="1") Integer pn){
		/*
		 * 这不是一个分页查询；
		 * 引入PageHelper分页插件
		 * 在查询之前只需要调用，传入页码，以及每页的大小
		 */
		
		
		PageHelper.startPage(pn, 5);
		
		// startPage后面紧跟的这个查询就是一个分页查询
		List<Employee> employees = employeeService.getAll();
		
		// 使用pageInfo包装查询后的结果，只需要将pageInfo交给页面就行了。
		// 封装了详细的分页信息,包括有我们查询出来的数据，传入连续显示的页数
		PageInfo<Employee> page=new PageInfo<Employee>(employees,5);
		
		
		return Msg.success().add("page", page);
	}
	
	/**
	 * 查询员工数据（分页显示）
	 * @param pn
	 * @param model
	 * @return
	 */
//	@RequestMapping("/emps")
	public String getEmps(@RequestParam(value="pn" , defaultValue="1") Integer pn,Model model){
		
		/*
		 * 这不是一个分页查询；
		 * 引入PageHelper分页插件
		 * 在查询之前只需要调用，传入页码，以及每页的大小
		 */
		PageHelper.startPage(pn, 5);
		
		// startPage后面紧跟的这个查询就是一个分页查询
		List<Employee> employees = employeeService.getAll();
		
		// 使用pageInfo包装查询后的结果，只需要将pageInfo交给页面就行了。
		// 封装了详细的分页信息,包括有我们查询出来的数据，传入连续显示的页数
		PageInfo<Employee> page=new PageInfo<Employee>(employees,5);
		model.addAttribute("page", page);
		
		return "list";
	}
}




