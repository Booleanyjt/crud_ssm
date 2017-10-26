package com.tao.crud.test;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.github.pagehelper.PageInfo;
import com.tao.crud.bean.Employee;

/**
 * 使用Spring测试模块提供的测试请求功能，测试curd请求的正确性
 * Spring4测试的时候，需要servlet3.0的支持
 * @author tao
 *
 */


//表明使用spring的测试
@RunWith(SpringJUnit4ClassRunner.class)
//注入WebApplicationContext
@WebAppConfiguration

//指明spring和springmvc的配置文件的位置
@ContextConfiguration(locations = {
		"classpath:applicationContext.xml",
		"file:src/main/webapp/WEB-INF/dispatcherServlet-servlet.xml"})
public class MvcTest {

	
	/*
	 * 传入spring mvc的ioc
	 * 因为自动装入的是spring本身的bean
	 * 所以需要在方法前注入WebApplicationContext
	 */
	@Autowired
	private WebApplicationContext context;
	
	//虚拟mvc请求，获取到处理后的结果
	private MockMvc mockMvc;
	
	@Before
	public void initMockMvc(){
		mockMvc=MockMvcBuilders.webAppContextSetup(context).build();
	}
	
	@Test
	public void MvcTest() throws Exception{
		
		MvcResult result=mockMvc.perform(MockMvcRequestBuilders.get("/emps").param("pn", "1"))
				.andReturn();
		
		MockHttpServletRequest request=result.getRequest();
		PageInfo<Employee> page=(PageInfo<Employee>) request.getAttribute("page");
		System.out.println("当前页码数："+page.getPageNum());
		System.out.println("总页码数+"+page.getPages());
		System.out.println("总记录数:"+page.getTotal());
		System.out.print("在页面需要连续显示的页码：");
		int[] nums=page.getNavigatepageNums();
		for (int i : nums) {
			System.out.print(i+" ");
		}
		System.out.println();
		
		List<Employee> list=page.getList();
		for (Employee employee : list) {
			System.out.println("员工数据为：id："+employee.getdId()
								+"姓名："+employee.getEname()
								+"email"+employee.getEmail()
								+"did:"+employee.getdId()
								+"部门名称："+employee.getDepartment().getDname());
		}
	}
}
