import { db } from './db';
import { employees, skills, projects } from './schema';
import { eq } from 'drizzle-orm';

// 员工数据类型
export interface Employee {
    id: string;
    name: string;
    title: string;
    department: string;
    email: string;
    phone: string;
    bio: string;
    location: string;
    timezone: string;
    lastUpdated: string;
    socialLinks: {
        linkedin?: string;
        github?: string;
        twitter?: string;
        personalWebsite?: string;
    };
    skills: Array<{
        id: string;
        name: string;
        level: string;
    }>;
    projects: Array<{
        id: string;
        name: string;
        description: string;
        role: string;
        startDate: string;
        endDate: string;
    }>;
}

// 默认员工ID
const DEFAULT_EMPLOYEE_ID = "emp001";

// 数据访问方法
export const localStore = {
    // 获取员工信息
    getEmployee: async (): Promise<Employee | undefined> => {
        try {
            // 获取员工基本信息
            const employeeData = await db.query.employees.findFirst({
                where: eq(employees.id, DEFAULT_EMPLOYEE_ID),
            });

            if (!employeeData) return undefined;

            // 获取员工技能
            const skillsData = await db.query.skills.findMany({
                where: eq(skills.employeeId, DEFAULT_EMPLOYEE_ID),
            });

            // 获取员工项目
            const projectsData = await db.query.projects.findMany({
                where: eq(projects.employeeId, DEFAULT_EMPLOYEE_ID),
            });

            // 组合完整的员工信息
            return {
                ...employeeData,
                skills: skillsData.map(skill => ({
                    id: skill.id,
                    name: skill.name,
                    level: skill.level,
                })),
                projects: projectsData.map(project => ({
                    id: project.id,
                    name: project.name,
                    description: project.description,
                    role: project.role,
                    startDate: project.startDate,
                    endDate: project.endDate,
                })),
            };
        } catch (error) {
            console.error('获取员工信息时出错:', error);
            return undefined;
        }
    },

    // 更新员工信息
    updateEmployee: async (employee: Employee): Promise<Employee> => {
        try {
            // 开始事务
            // 更新员工基本信息
            await db.update(employees)
                .set({
                    name: employee.name,
                    title: employee.title,
                    department: employee.department,
                    email: employee.email,
                    phone: employee.phone,
                    bio: employee.bio,
                    location: employee.location,
                    timezone: employee.timezone,
                    lastUpdated: employee.lastUpdated,
                    socialLinks: employee.socialLinks,
                })
                .where(eq(employees.id, employee.id));

            // 删除现有技能，然后重新插入
            await db.delete(skills).where(eq(skills.employeeId, employee.id));
            if (employee.skills.length > 0) {
                await db.insert(skills).values(
                    employee.skills.map(skill => ({
                        id: skill.id,
                        name: skill.name,
                        level: skill.level,
                        employeeId: employee.id,
                    }))
                );
            }

            // 删除现有项目，然后重新插入
            await db.delete(projects).where(eq(projects.employeeId, employee.id));
            if (employee.projects.length > 0) {
                await db.insert(projects).values(
                    employee.projects.map(project => ({
                        id: project.id,
                        name: project.name,
                        description: project.description,
                        role: project.role,
                        startDate: project.startDate,
                        endDate: project.endDate,
                        employeeId: employee.id,
                    }))
                );
            }

            return employee;
        } catch (error) {
            console.error('更新员工信息时出错:', error);
            throw new Error('更新员工信息失败');
        }
    },
};