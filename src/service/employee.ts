import { createTRPCClient,httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@api/routes/_app';
import { Employee } from '@/types/employee';

// 创建tRPC客户端
const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: '/api/trpc',
        }),
    ],
});

// 获取员工信息
export const getEmployeeService = async () => {
    return trpc.getEmployee.query();
};

// 更新员工信息
export const updateEmployeeService = async(employee:Employee) => {
    return trpc.updateEmployee.mutate(employee);
};