 # Firebase Authentication Integration

## 概述

我们已经成功集成了 Firebase 身份验证系统，支持：

- 邮箱/密码注册和登录
- Google 账号登录
- 用户数据存储在 Firestore 的 `users` 集合中
- 受保护路由（需要登录才能访问）
- 用户个人资料页面

## 文件结构

```
src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx         # 登录页面
│   │   ├── register/
│   │   │   └── page.tsx         # 注册页面
│   │   └── layout.tsx           # 认证页面布局
│   └── protected/
│       ├── profile/
│       │   └── page.tsx         # 用户个人资料页面
│       └── layout.tsx           # 受保护路由布局
├── components/
│   └── auth/
│       ├── LoginForm.tsx        # 登录表单组件
│       ├── RegisterForm.tsx     # 注册表单组件
│       └── UserProfile.tsx      # 用户个人资料组件
├── lib/
│   ├── contexts/
│   │   └── AuthContext.tsx      # 认证上下文
│   ├── services/
│   │   └── authService.ts       # 认证服务
│   ├── firebase.ts              # Firebase 配置
│   └── types.ts                 # 类型定义
└── middleware.ts                # 中间件（保护路由）
```

## 设置步骤

### 1. 创建 Firebase 项目

1. 访问 [Firebase Console](https://console.firebase.google.com/)
2. 点击"添加项目"并按照设置步骤操作
3. 为项目命名并继续设置

### 2. 设置 Firebase 身份验证

1. 在 Firebase 项目中，转到左侧边栏中的"Authentication"
2. 点击"开始使用"
3. 启用"电子邮件/密码"提供程序
4. 启用"Google"提供程序
5. 如果提示，配置 OAuth 同意屏幕

### 3. 创建 Firestore 数据库

1. 转到左侧边栏中的"Firestore Database"
2. 点击"创建数据库"
3. 以生产模式或测试模式启动（稍后可以更改）
4. 为数据库选择位置
5. 点击"启用"

### 4. 设置安全规则

将这些安全规则添加到 Firestore 数据库以保护用户数据：

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 允许用户只读写自己的数据
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 根据需要为其他集合添加更多规则
  }
}
```

### 5. 获取 Firebase 配置

1. 转到项目设置（左上角的齿轮图标）
2. 滚动到"您的应用"部分
3. 如果尚未添加应用，请点击 Web 图标 (</>) 添加 Web 应用
4. 使用昵称注册您的应用
5. 复制 Firebase 配置对象

### 6. 设置环境变量

在项目根目录创建一个 `.env.local` 文件，并添加以下带有 Firebase 配置的变量：

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

### 7. 重启开发服务器

设置环境变量后，重启开发服务器以使更改生效。

## 使用说明

1. 用户可以通过点击页面右上角的"登录"或"注册"链接来访问认证页面
2. 登录后，用户头像和名称将显示在页面右上角
3. 用户可以点击他们的名称或头像访问个人资料页面
4. 用户可以通过点击"退出登录"按钮注销

## 扩展功能

您可以根据需要扩展此身份验证系统：

1. 添加密码重置功能
2. 添加电子邮件验证
3. 添加更多第三方登录提供程序（如 Facebook、Twitter 等）
4. 扩展用户个人资料以包含更多信息
5. 添加用户角色和权限系统