import { Hono } from 'hono';
import { Employee, localStore } from '../data/localStore';

const employeeRoute = new Hono()
employeeRoute.get('/', (c) => {
    try {
        const employees = localStore.getEmployee();
        return c.json(employees);
    } catch (error) {
        console.error('获取员工信息时出错:', error);
        return c.json({ error: '服务器错误，无法获取员工' }, 500);
    }
})
employeeRoute.put('/', async (c) => {
    try {
        // 获取请求体
        const updatedEmployee = await c.req.json() as Employee;
        // 更新员工信息
        const result = localStore.updateEmployee(updatedEmployee);
        return c.json(result);
    } catch (error) {
        console.error('更新员工信息时出错:', error);
        return c.json({ error: '服务器错误，无法更新员工信息' }, 500);
    }
});
export { employeeRoute };