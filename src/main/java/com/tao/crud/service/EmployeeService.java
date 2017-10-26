package com.tao.crud.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tao.crud.bean.Employee;
import com.tao.crud.bean.EmployeeExample;
import com.tao.crud.bean.EmployeeExample.Criteria;
import com.tao.crud.bean.EmployeeExample.Criterion;
import com.tao.crud.dao.EmployeeMapper;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeMapper employeeMapper;
	
	public List<Employee> getAll() {
		return employeeMapper.selectByExampleWithDept(null);
	}

	public void saveEmployee(Employee employee) {
		employeeMapper.insertSelective(employee);
		
	}

	public boolean validate_email(String ename) {
		// TODO Auto-generated method stub
		
		EmployeeExample example=new EmployeeExample();
		Criteria criteria=example.createCriteria();
		criteria.andEnameEqualTo(ename);
		long count=employeeMapper.countByExample(example);
		return count==0;
	}

	public Employee findEmp(Integer id) {
		
		return employeeMapper.selectByPrimaryKey(id);
	}

	public void updateEmployee(Employee employee) {
		employeeMapper.updateByPrimaryKeySelective(employee);
	}

	public void delEmpById(Integer eid) {
		employeeMapper.deleteByPrimaryKey(eid);
	}

	public void delEmpByIds(List<Integer> list) {
		EmployeeExample example=new EmployeeExample();
		Criteria criteria=example.createCriteria();
		criteria.andEidIn(list);
		employeeMapper.deleteByExample(example);
	}

}
