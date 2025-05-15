import { Employee } from '@/types/employee';

// 获取员工信息的服务函数
export const getEmployeeService = async () => {
    const response = await fetch(`/api/employee`);

    if (!response.ok) {
        throw new Error(`获取员工信息失败: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<Employee>;
};

// 更新员工信息的服务函数
export const updateEmployeeService = async (employee: Employee) => {
    const response = await fetch(`/api/employee`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    });

    if (!response.ok) {
        throw new Error(`更新员工信息失败: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<Employee>;
};