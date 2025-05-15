import { pgTable, text, varchar,json } from 'drizzle-orm/pg-core';

// 技能表
export const skills = pgTable('skills', {
    id: varchar('id', { length: 50 }).primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    level: varchar('level', { length: 50 }).notNull(),
    employeeId: varchar('employee_id', { length: 50 }).notNull().references(() => employees.id, { onDelete: 'cascade' }),
});

// 项目表
export const projects = pgTable('projects', {
    id: varchar('id', { length: 50 }).primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description').notNull(),
    role: varchar('role', { length: 100 }).notNull(),
    startDate: varchar('start_date', { length: 50 }).notNull(),
    endDate: varchar('end_date', { length: 50 }).notNull(),
    employeeId: varchar('employee_id', { length: 50 }).notNull().references(() => employees.id, { onDelete: 'cascade' }),
});

// 员工表
export const employees = pgTable('employees', {
    id: varchar('id', { length: 50 }).primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    title: varchar('title', { length: 100 }).notNull(),
    department: varchar('department', { length: 100 }).notNull(),
    email: varchar('email', { length: 100 }).notNull(),
    phone: varchar('phone', { length: 50 }).notNull(),
    bio: text('bio').notNull(),
    location: varchar('location', { length: 100 }).notNull(),
    timezone: varchar('timezone', { length: 50 }).notNull(),
    lastUpdated: varchar('last_updated', { length: 50 }).notNull(),
    socialLinks: json('social_links').$type<{
        linkedin?: string;
        github?: string;
        twitter?: string;
        personalWebsite?: string;
    }>().default({}).notNull(),
});