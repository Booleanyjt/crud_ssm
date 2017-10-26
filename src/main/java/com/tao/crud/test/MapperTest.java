package com.tao.crud.test;

import java.util.UUID;

import org.apache.ibatis.session.SqlSession;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.tao.crud.bean.Department;
import com.tao.crud.bean.Employee;
import com.tao.crud.dao.DepartmentMapper;
import com.tao.crud.dao.EmployeeMapper;

/**
 *测试mapper的增删查改
 * @author tao
 *推荐Spring的项目就可以使用Spring的单元测试，可以自动注入我们需要的组件
 *1、导入SpringTest模块
 *2、@ContextConfiguration指定Spring配置文件的位置
 *3、直接autowired要使用的组件即可
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:applicationContext.xml"})
public class MapperTest {
	
	@Autowired
	private DepartmentMapper departmentMapper;
	
	@Autowired
	private EmployeeMapper employeeMapper;
	
	@Autowired
	private SqlSession sqlSession;
	
	@Test
	public void deptTest(){
		System.out.println(departmentMapper);
		departmentMapper.insertSelective(new Department(null, "产品部"));
		departmentMapper.insertSelective(new Department(null, "人事部"));
	}
	
	@Test
	public void empTest(){
//		employeeMapper.insertSelective(new Employee(null, "ljxx", "F", "equal.zheng@gmail.com",1 ));
		EmployeeMapper mapper=sqlSession.getMapper(EmployeeMapper.class);
		for(int i=0;i<100;i++){
			String uuid=UUID.randomUUID().toString().substring(0,5)+i;
			mapper.insertSelective(new Employee(null, uuid, "F", uuid+"@gmail.com", 1));
		}
	}
}
