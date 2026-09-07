# 仓库整理与发布检查

整理日期：2026-09-07。

## 当前版本

- 保留 main 的个人网站内容：本人照片、邮箱、社交链接、三个项目案例与实践文章。
- 删除未获许可的外部背景图、过时案例截图及未使用的旧背景素材；共享项目背景改用 CSS 绘制。
- 仍有效的设计思路收录在 [DESIGN.md](DESIGN.md)，AGENTS.md 仅保留当前维护规则。
- 按作者要求将开发历史收拢为一个最新快照，不保留旧版本分支或标签。
- MIT、贡献指南、安全政策、Issue / PR 模板及依赖许可声明继续保留。
- CI 顺序为安装、依赖审计、构建、测试，避免干净克隆缺少构建文件。

## 发布状态

- [x] 仓库已设为 Public，匿名 GitHub API 可以读取仓库，识别协议为 MIT。
- [x] 公开时 main 的 GitHub Actions 检查通过；没有 Artifacts、Releases、PR 或开放 Issues。Actions 中保留了一次较早的失败运行记录。
- [x] 整理后的最新网站已发布到 [线上站点](https://jasper-wei.vast-beech-4429.chatgpt.site/)。
- [x] 修正 Sites 路由回退：读取根路径的应用页面，避免 `/index.html` 的规范化重定向把详情链接带回首页。
- [ ] GitHub 私密漏洞报告尚未核实启用；现有 SECURITY.md 提供邮件报告渠道。

重写主分支不能保证 GitHub 旧提交缓存、其他人的克隆或 Fork 立即删除；本记录不代表平台彻底擦除。

## 检查范围

整理前 Git 远端只公布 main，无标签或公布的 PR 引用。原作者明确接受当前个人照片与联系方式继续展示；它们不属于本轮待删除内容。

本轮不删除电脑上的原始资料或设计参考目录。网站已单独部署；后续推送 GitHub 不会自动部署。托管商旧版本不在本轮 Git 清理范围内。

参考：[GitHub 历史清理的边界](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)。
