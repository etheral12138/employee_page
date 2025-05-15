# 员工信息

这是一个基于 React 和 Hono 构建的员工信息应用，可以轻松部署到 Vercel 平台。

## 技术栈

- **React**: 用于构建用户界面的 JavaScript 库
- **TypeScript**: JavaScript 的超集，提供类型检查
- **Vite**: 现代前端构建工具，提供极速的开发体验
- **Hono**: 轻量级、高性能的 Web 框架，适用于边缘计算环境
- **tRPC**: 端到端类型安全的 API 开发框架，无需手动定义 API 类型
- **ahooks**: 实用的 React Hooks 库，提供丰富的自定义 hooks
- **HeroUI**: 美观且可定制的 UI 组件库
- **Tailwind CSS**: 实用优先的 CSS 框架
- **Vercel**: 现代网站和应用的部署平台

## 本地开发

### 安装步骤

1. **克隆仓库**


2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **启动开发服务器**

   ```bash
   pnpm dev
   ```

   这将启动两个服务器:
   - **前端**: 运行在 `http://localhost:5173/`，提供 React 应用
   - **API**: 运行在 `http://localhost:3000/api`，提供 Hono API 服务

## 项目结构

```
employee_page/
├── api/                  # Hono 服务端路由
│   ├── [[...route]].ts   # API 路由入口
│   ├── data/             # 数据存储
│   └── routes/           # API 路由定义
│       ├── employee.ts   # 员工 API 路由
│       ├── employeeRouter.ts # tRPC 员工路由
│       ├── trpc.ts       # tRPC 初始化
│       └── trpcAdapter.ts # tRPC 适配器
├── public/               # 静态资源
├── src/
│   ├── components/       # 共享组件
│   ├── service/          # API 服务
│   ├── styles/           # 样式
│   ├── types/            # TypeScript 类型定义
│   ├── App.tsx           # 应用入口组件
│   └── main.tsx          # 应用入口点
├── index.html            # HTML 模板
├── package.json          # 项目依赖和脚本
├── tailwind.config.ts    # Tailwind CSS 配置
├── tsconfig.json         # TypeScript 配置
└── vite.config.ts        # Vite 配置
```

## 构建与部署

### 本地构建

```bash
pnpm build
```

这将在 `dist` 目录中生成生产就绪的静态文件。

### 部署到 Vercel

该项目已配置为可以直接部署到 Vercel。只需将代码推送到 GitHub 仓库，然后在 Vercel 中导入该仓库即可。

或者，您可以使用 Vercel CLI 进行部署:

```bash
npm install -g vercel
vercel
```

## 功能特点

- 前后端一体化开发体验
- 基于 Hono 的高性能 API
- 使用 tRPC 实现端到端类型安全的 API
- 使用 ahooks 简化状态管理和异步操作
- 响应式设计，适配各种设备
- TypeScript 支持，提供类型安全
- 开箱即用的 UI 组件库

## tRPC 集成

本项目集成了 tRPC，提供了端到端类型安全的 API 开发体验：

- **类型安全**: 前端和后端共享相同的类型定义，无需手动维护 API 类型
- **自动补全**: 在前端调用 API 时享受完整的类型提示和自动补全
- **运行时验证**: 使用 Zod 进行请求和响应数据的验证
- **兼容性**: 通过适配器同时支持传统 REST API 和 tRPC 调用

### tRPC 使用示例

```typescript
// 前端调用示例
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@api/routes/trpcAdapter';

// 创建 tRPC 客户端
const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: '/api/trpc',
        }),
    ],
});

// 获取员工信息 - 享受完整的类型安全和自动补全
const getEmployee = async () => {
    return trpc.employee.getEmployee.query();
};
```
