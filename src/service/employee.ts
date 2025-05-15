import { httpLink } from '@trpc/client';
import type { AppRouter } from '@api/routes/_app';
import { Employee } from '@/types/employee';
import { createTRPCNext } from '@trpc/next';

// 创建tRPC客户端
export const trpc = createTRPCNext<AppRouter>({
    config() {
        return {
            links: [
                httpLink({
                    url: '/api/trpc',
                }),
            ],
        };
    },
});

// 获取员工信息
export const getEmployeeService = async () => {
    return trpc.getEmployee.query();
};

// 更新员工信息
export const updateEmployeeService = async(employee:Employee) => {
    return trpc.updateEmployee.mutate(employee);
};