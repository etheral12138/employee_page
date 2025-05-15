import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
// import dotenv from 'dotenv';

// // 加载环境变量
// dotenv.config();

// 确保环境变量存在
if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL环境变量未设置');
    process.exit(1);
}

// 创建数据库连接
const sql = neon(process.env.DATABASE_URL!);

// 初始化Drizzle ORM
export const db = drizzle(sql, { schema });