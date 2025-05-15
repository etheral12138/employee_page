import { Hono } from 'hono';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { employeeRouter } from './employeeRouter';
import { router } from './trpc';

// 创建根路由
export const appRouter = router({
    employee: employeeRouter,
});

// 导出类型
export type AppRouter = typeof appRouter;

// 创建tRPC适配器
export const createTRPCAdapter = () => {
    const trpcApp = new Hono();

    // 处理所有tRPC请求
    trpcApp.all('*', async (c) => {
        const res = await fetchRequestHandler({
            endpoint: '/api/trpc',
            req: c.req.raw,
            router: appRouter,
            createContext: () => ({}),
        });
        return res;
    });

    return trpcApp;
};

// 创建兼容原有API路径的适配器
export const createEmployeeAdapter = () => {
    const employeeApp = new Hono();

    // 获取员工信息
    employeeApp.get('/', async (c) => {
        try {
            const caller = appRouter.createCaller({});
            const employee = await caller.employee.getEmployee();
            return c.json(employee);
        } catch (error) {
            console.error('获取员工信息时出错:', error);
            return c.json({ error: '服务器错误，无法获取员工' }, 500);
        }
    });

    // 更新员工信息
    employeeApp.put('/', async (c) => {
        try {
            const updatedEmployee = await c.req.json();
            const caller = appRouter.createCaller({});
            const result = await caller.employee.updateEmployee(updatedEmployee);
            return c.json(result);
        } catch (error) {
            console.error('更新员工信息时出错:', error);
            return c.json({ error: '服务器错误，无法更新员工信息' }, 500);
        }
    });

    return employeeApp;
};