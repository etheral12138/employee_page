import { z } from 'zod';
import { router, publicProcedure } from './trpc';
import { localStore } from '../data/localStore';

// 定义员工数据验证模式
const employeeSchema = z.object({
    id: z.string(),
    name: z.string(),
    title: z.string(),
    department: z.string(),
    email: z.string().email(),
    phone: z.string(),
    bio: z.string(),
    location: z.string(),
    timezone: z.string(),
    lastUpdated: z.string(),
    socialLinks: z.object({
        linkedin: z.string().optional(),
        github: z.string().optional(),
        twitter: z.string().optional(),
        personalWebsite: z.string().optional(),
    }),
    skills: z.array(z.object({
        id: z.string(),
        name: z.string(),
        level: z.string(),
    })),
    projects: z.array(z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        role: z.string(),
        startDate: z.string(),
        endDate: z.string(),
    })),
});

// 创建员工路由
export const employeeRouter = router({
    // 获取员工信息
    getEmployee: publicProcedure
        .query(() => {
            try {
                const employee = localStore.getEmployee();
                if (!employee) {
                    throw new Error('员工不存在');
                }
                return employee;
            } catch (error) {
                console.error('获取员工信息时出错:', error);
                throw new Error('服务器错误，无法获取员工');
            }
        }),

    // 更新员工信息
    updateEmployee: publicProcedure
        .input(employeeSchema)
        .mutation(({ input }) => {
            try {
                const result = localStore.updateEmployee(input);
                return result;
            } catch (error) {
                console.error('更新员工信息时出错:', error);
                throw new Error('服务器错误，无法更新员工信息');
            }
        }),
});