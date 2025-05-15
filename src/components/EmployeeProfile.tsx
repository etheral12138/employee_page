import React, { useState } from 'react';
import { getEmployeeService, updateEmployeeService, } from '../service/employee.ts';
import EmployeeProfileView from './EmployeeProfileView.tsx';
import EmployeeProfileEdit from './EmployeeProfileEdit.tsx';
import { Spinner, Card, addToast } from "@heroui/react";
import { useRequest } from 'ahooks';

interface EmployeeProfileProps {
    employeeId: string;
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ employeeId }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { data: employee, loading, error, mutate } = useRequest(getEmployeeService, {
        // 缓存键，用于缓存请求结果
        cacheKey: `employee-${employeeId}`,
        onError: (error) => ({
            data: undefined,
            isLoading: false,
            isError: true,
            error,
        }),
    });
    const { run: updateEmployee } = useRequest(updateEmployeeService, {
        manual: true,
        onSuccess: (result) => {
            if (result) {
                // console.log('result', result);
                mutate(result);
                addToast({
                    title: '成功',
                    description: '员工信息已更新',
                })
            }
            setIsEditing(false);
        },
        onError: (error) => {
            addToast({
                title: '失败',
                description: error.message,
            })
        }
    });
    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <Spinner size="sm" label="加载员工信息中..." />
            </div>
        );
    }

    if (error) {
        return (
            <Card className="p-3 bg-danger-50 dark:bg-danger-900">
                <p className="text-danger text-center text-xs">加载失败: {error?.message}</p>
            </Card>
        );
    }

    if (!employee) {
        return (
            <Card className="p-3 dark:bg-gray-800">
                <p className="text-center text-xs">未找到员工信息</p>
            </Card>
        );
    }


    return (
        <div className="container mx-auto">
            {isEditing ? (
                <EmployeeProfileEdit
                    employee={employee}
                    onSave={updateEmployee}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <EmployeeProfileView
                    employee={employee}
                    onEdit={() => setIsEditing(true)}
                />
            )}
        </div>
    );
};

export default EmployeeProfile;