# Jasper — 个人网站

Jasper Wei 的个人网站，用来介绍自己、展示正在做的项目，并记录实践过程。

基于 React、Vite 和原生 CSS 构建，包含 WebGL 波动光场、平滑滚动、响应式页面和减少动态效果支持。

> 当前处于开源准备阶段。代码采用 MIT 协议；图片及个人内容的授权范围见 [素材与第三方声明](THIRD_PARTY_NOTICES.md)。当前版本与发布检查见 [仓库整理记录](docs/OPEN_SOURCE_CHECKLIST.md)。

## 页面与功能

- **首页** `/`：Home → About me → Work → Photography，包含个人介绍、项目入口、真实照片和联系信息。
- **项目列表** `/work`：直播切片工作流、目标澄清 Skill、AI Native 项目管理工具。
- **项目详情** `/work/livestream-clipping`、`/work/goal-clarifier`、`/work/ai-native-project-management`：项目概览、交互式流程和设计决策。
- **实践文章** `/writing/livestream-clipping`：直播切片的历史实践记录。
- **动态效果**：WebGL 光场、展开菜单、前景覆盖式滚动；支持暂停、系统减少动态效果偏好，以及 WebGL 失败时的静态回退。

这是个人展示网站。案例页介绍的工具和工作流不包含在本仓库中；案例中的历史数据也不代表当前产品验收结果。Photography 目前是一张个人照片展示，尚无完整相册。

## 本地运行

需要 **Node.js 24 LTS** 和 npm。版本记录在 [.nvmrc](.nvmrc)，不需要 API Key、数据库或环境变量。

```bash
git clone https://github.com/Jasper-Wei1/websites.git
cd websites
npm ci
npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
```

打开 <http://127.0.0.1:4173/>。仓库尚未公开时，克隆需要仓库访问权限。

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动 Vite 开发服务 |
| `npm test` | 运行现有 Node.js 测试 |
| `npm run test:sites` | 单独检查 Sites Worker 的路由回退 |
| `npm run build` | 构建前端并准备 Sites 部署文件 |
| `npm run preview -- --host 127.0.0.1 --port 4173` | 本地预览构建后的前端 |

验证时先运行 `npm run build`，再运行 `npm test`；打包测试需要构建产物。

现有测试包含源码结构检查、动效计算和 Worker 行为测试，不能替代浏览器中的视觉、键盘与移动端验收。

## 修改自己的内容

| 位置 | 内容 |
| --- | --- |
| `src/App.jsx` | 首页、菜单、个人介绍、邮箱、社交链接和页脚 |
| `src/WorkPages.jsx` | 项目入口与项目列表 |
| `src/project-cases.js` / `src/ProjectCase.jsx` | 通用项目数据与详情模板 |
| `src/LivestreamCase.jsx` | 直播切片详情及实践文章 |
| `src/type-system.css` | 共享字号、宽度与间距 |
| `src/styles.css` / `src/case-study.css` | 首页与案例视觉规则 |
| `src/WaveLight.jsx` / `src/wave-field.js` | WebGL 光场 |
| `src/usePageMotion.js` / `src/motion.css` | 滚动与动态效果 |
| `src/useRoute.js` | 浏览器 History API 路由 |
| `public/assets/` | 图片及其来源说明 |
| `worker/index.js` | 托管环境的单页应用路由回退 |

复用代码时，请替换姓名、照片、联系方式、社交链接和项目文案，并使用你有权发布的图片。Jasper 的个人素材不随代码的 MIT 协议一起授权。

## 构建与部署

`npm run build` 输出：

```text
dist/
├── client/               # 可托管的静态前端
├── server/index.js       # Sites Worker
└── .openai/hosting.json  # 当前站点配置
```

普通静态托管使用 `dist/client`，并为页面路由配置回退到 `/index.html`，否则直接访问或刷新 `/work/...` 会返回 404。当前资源使用根路径，默认部署在域名根目录；GitHub Pages 的仓库子路径部署需要额外调整资源路径和路由，不是开箱即用。

本仓库保留现有 Sites 站点配置。Fork 后使用 Sites 时，应在自己的账户中建立站点并使用自己的配置，不能复用原作者的 `project_id`。构建只生成文件，不会发布站点；推送 GitHub 也不会自动部署。当前 CI 只运行测试和构建。

## 数据与隐私

网站没有应用内分析埋点、登录、表单后端或服务端数据存储。字体随构建本地提供。社交链接跳转到外部服务；邮件链接调用邮件客户端；复制邮箱使用浏览器剪贴板 API。托管商和外部网站可能有各自的访问日志及隐私政策。

不要向本项目提交密钥、`.env`、个人草稿、原始客户素材或内部截图。被 Git 跟踪过的文件不会因为加入 `.gitignore` 就从历史中消失。

## 参与维护

- 报告问题或提议改进：[GitHub Issues](https://github.com/Jasper-Wei1/websites/issues)
- 开发与提交规范：[贡献指南](CONTRIBUTING.md)
- 安全问题私下报告：[安全政策](SECURITY.md)
- 当前仓库状态：[整理与发布检查](docs/OPEN_SOURCE_CHECKLIST.md)
- 页面结构与取舍：[设计思路](docs/DESIGN.md)

## 协议与致谢

原创代码及技术文档采用 [MIT License](LICENSE)，允许在保留版权和许可声明的前提下使用、修改和分发，包括商业用途。

个人照片、身份标识、案例内容、生成纹理和依赖包有各自的权利边界，详见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

项目背景由本地 CSS 渐变绘制。感谢 React、Vite、Lenis、Phosphor Icons、Fontsource，以及 Anton 和 Inter 字体的维护者。
