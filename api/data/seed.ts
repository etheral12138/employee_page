import { db } from './db';
import { employees, skills, projects } from './schema';

async function seed() {
    console.log('开始初始化数据库...');

    try {
        // 清空现有数据（如果需要）
        await db.delete(skills);
        await db.delete(projects);
        await db.delete(employees);

        // 插入员工数据
        await db.insert(employees).values({
            id: "emp001",
            name: "张三 (测试)",
            title: "前端开发工程师",
            department: "技术研发部",
            email: "zhangsan@example.com",
            phone: "13800138000",
            bio: "我是一名充满激情的前端开发工程师，拥有丰富的Web开发经验，专注于构建可扩展和高性能的应用程序。我热爱学习新技术，并乐于在团队中分享知识。",
            location: "上海",
            timezone: "Asia/Shanghai",
            lastUpdated: new Date().toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }),
            socialLinks: {
                linkedin: "https://www.linkedin.com/in/泽群-刘-545874295",
                github: "https://github.com/etheral12138",
                twitter: "https://twitter.com/etheral12138",
                personalWebsite: "https://blog.etheral.top",
            },
        });

        // 插入技能数据
        await db.insert(skills).values([
            { id: "skill001", name: "TypeScript", level: "专家", employeeId: "emp001" },
            { id: "skill002", name: "React", level: "高级", employeeId: "emp001" },
            { id: "skill003", name: "Node.js", level: "高级", employeeId: "emp001" },
            { id: "skill004", name: "Tailwind CSS", level: "中级", employeeId: "emp001" },
            { id: "skill005", name: "Go", level: "初级", employeeId: "emp001" },
        ]);

        // 插入项目数据
        await db.insert(projects).values([
            {
                id: "proj001",
                name: "企业级CRM系统",
                description: "负责核心模块的设计与开发，提升了系统30%的性能。",
                role: "技术负责人",
                startDate: "2022-01-15",
                endDate: "2023-06-30",
                employeeId: "emp001",
            },
            {
                id: "proj002",
                name: "电商平台重构",
                description: "参与前端架构升级，引入React和TypeScript，优化用户体验。",
                role: "前端工程师",
                startDate: "2021-05-01",
                endDate: "2021-12-20",
                employeeId: "emp001",
            },
        ]);

        console.log('数据库初始化成功！');
    } catch (error) {
        console.error('数据库初始化失败:', error);
        process.exit(1);
    }
}

seed();