import { createTRPCClient,httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@api/routes/trpcAdapter';
import { Employee } from '@/types/employee';

// 创建tRPC客户端
// 使用 createTRPCClient 替代已弃用的 createTRPCProxyClient
const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: '/api/trpc',
        }),
    ],
});

// 获取员工信息
export const getEmployeeService = async () => {
    return trpc.employee.getEmployee.query();
};

// 更新员工信息
export const updateEmployeeService = async(employee:Employee) => {
    return trpc.employee.updateEmployee.mutate(employee);
};