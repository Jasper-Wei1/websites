# 素材与第三方声明

根目录 MIT 协议适用于本项目原创代码及技术文档。它不改变第三方许可，也不向复用者授予 Jasper 的肖像、身份标识、个人文案或案例截图的独立再利用权利。

## 图片与个人内容

| 文件或内容 | 来源与状态 | 复用说明 |
| --- | --- | --- |
| `public/assets/jasper-original.jpg` | Jasper 提供的真实个人照片 | 不纳入 MIT；复用时替换，其他用途另行取得许可 |
| `public/assets/thermal-field.png` | 项目制作期间生成的 ImageGen 纹理，用于静态回退 | 不纳入代码 MIT；复用时替换或向维护者确认许可 |
| 网站中的姓名、介绍、联系方式与案例文案 | Jasper 的个人内容，按作者要求公开展示 | 不纳入代码 MIT；复用时替换，不暗示原作者背书 |

项目背景由 `src/case-study.css` 中的 CSS 渐变绘制。当前版本不含旧案例截图或外部网站下载的背景图。

## 依赖与字体

以下为当前直接依赖的许可摘要，具体版权和条款以包内原文为准。完整依赖版本记录在 `package-lock.json`，间接依赖仍遵循各自许可。

| 依赖 | 许可 | 保留声明 |
| --- | --- | --- |
| React / React DOM | MIT | `public/licenses/react.txt`、`public/licenses/react-dom.txt` |
| Vite / React 插件 | MIT（Vite 声明另列捆绑组件） | `public/licenses/vite.txt`、`public/licenses/vitejs-plugin-react.txt` |
| Lenis | MIT | `public/licenses/lenis.txt` |
| Phosphor React | MIT | `public/licenses/phosphor-icons-react.txt` |
| Anton（Fontsource） | SIL OFL 1.1 | `public/fonts/Anton-OFL.txt` |
| Inter（Fontsource） | SIL OFL 1.1 | `public/fonts/Inter-OFL.txt` |

`public/` 中的声明会随前端构建一起输出，供分发时保留。字体或依赖升级后，应同步核对声明。根目录 MIT 不替代上述许可。
