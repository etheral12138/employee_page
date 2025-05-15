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
    lastUpdated: Date;
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

// 模拟员工数据
const mockEmployeeData: Employee = {
    id: "emp001",
    name: "张三 (测试)",
    title: "前端开发工程师",
    department: "技术研发部",
    email: "zhangsan@example.com",
    phone: "13800138000",
    bio: "我是一名充满激情的前端开发工程师，拥有丰富的Web开发经验，专注于构建可扩展和高性能的应用程序。我热爱学习新技术，并乐于在团队中分享知识。",
    location: "上海",
    timezone: "Asia/Shanghai",
    lastUpdated: new Date(),
    socialLinks: {
        linkedin: "https://www.linkedin.com/in/泽群-刘-545874295",
        github: "https://github.com/etheral12138",
        twitter: "https://twitter.com/etheral12138",
        personalWebsite: "https://blog.etheral.top",
    },
    skills: [
        { id: "skill001", name: "TypeScript", level: "专家" },
        { id: "skill002", name: "React", level: "高级" },
        { id: "skill003", name: "Node.js", level: "高级" },
        { id: "skill004", name: "Tailwind CSS", level: "中级" },
        { id: "skill005", name: "Go", level: "初级" },
    ],
    projects: [
        {
            id: "proj001",
            name: "企业级CRM系统",
            description: "负责核心模块的设计与开发，提升了系统30%的性能。",
            role: "技术负责人",
            startDate: "2022-01-15",
            endDate: "2023-06-30",
        },
        {
            id: "proj002",
            name: "电商平台重构",
            description: "参与前端架构升级，引入React和TypeScript，优化用户体验。",
            role: "前端工程师",
            startDate: "2021-05-01",
            endDate: "2021-12-20",
        },
    ],
};

// 内存中存储员工数据的映射
const employeesStore: Map<string, Employee> = new Map();

// 初始化数据
employeesStore.set(mockEmployeeData.id, mockEmployeeData);

// 数据访问方法
export const localStore = {
    // 获取员工信息
    getEmployee: () => {
        return employeesStore.get(mockEmployeeData.id);
    },
    // 更新员工信息
    updateEmployee: (employee: Employee)=> {
        employeesStore.set(employee.id, employee);
        return employee;
    },
};