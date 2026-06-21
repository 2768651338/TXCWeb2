# 田小橙 · 个人主页

> 始终拥抱美好的未来 — 一个人,也能构建完整的数字生态。

基于 React + Three.js + GSAP + Canvas 构建的个人主页,遵循"特效服务于功能"的核心设计原则。所有视觉效果以提升阅读体验、强化个人品牌认知为明确目标。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript + Vite |
| 3D / WebGL | Three.js + @react-three/fiber + @react-three/drei + postprocessing |
| 动画 | GSAP + ScrollTrigger |
| 样式 | Tailwind CSS 3 |
| 图标 | lucide-react |
| 字体 | Fraunces (Display) + JetBrains Mono (Mono) |

## 核心特性

### 视觉与交互
- **3D 粒子背景** — Three.js 实现 800 粒子网络,鼠标视差 + Bloom 后处理
- **Canvas 雷达图** — 原生 Canvas 绘制 5 维能力图,鼠标 hover 高亮顶点
- **Canvas 流动背景** — 联系区波形粒子动画
- **GSAP 滚动叙事** — ScrollTrigger 驱动章节入场、技能条 tween、时间线生长
- **磁吸交互** — CTA 按钮鼠标跟随弹性回弹
- **自定义光标** — 混合模式圆点 + 跟随圆环,hover 可交互元素放大

### 工程优化
- **设备分级** — `useDeviceTier` hook 桌面/平板/移动端差异化粒子数量与后处理
- **懒加载 3D** — Hero 场景 Suspense lazy 加载,首屏先渲染文字
- **响应式设计** — 移动端导航折叠,触摸设备禁用 hover 3D 倾斜
- **无障碍** — `prefers-reduced-motion` 支持、键盘导航、skip-to-content 链接、focus-visible
- **性能** — 字体 preconnect、图片 lazy、content-visibility、page-grain 覆盖层

## 项目结构

```
src/
├── components/          # UI 组件
│   ├── Hero.tsx         # 首屏 — 3D 粒子 + 主标题
│   ├── HeroScene.tsx    # Three.js 粒子场景
│   ├── About.tsx        # 关于 — 头像视差 + 数字计数
│   ├── Skills.tsx       # 能力 — Canvas 雷达图 + 技能条
│   ├── Works.tsx        # 作品 — hover 遮罩 + 3D 倾斜
│   ├── Timeline.tsx     # 经历 — 滚动生长时间线
│   ├── Contact.tsx      # 联系 — Canvas 流动背景 + 邮箱复制
│   ├── Navbar.tsx       # 导航 — 滚动隐藏 + 移动端错峰菜单
│   ├── Marquee.tsx      # 跑马灯 — 章节过渡
│   ├── PageLoader.tsx   # 加载动画 — 数字计数 + 幕布
│   ├── CustomCursor.tsx # 自定义光标
│   ├── SectionIndicator.tsx  # 侧边章节指示器
│   ├── SectionWatermark.tsx  # 大编号水印
│   ├── ScrollToTop.tsx  # 回到顶部
│   └── LiveClock.tsx    # 实时时钟
├── data/
│   └── profile.ts       # 单一数据源 — 所有个人信息
├── hooks/
│   ├── useDeviceTier.ts # 设备性能分级
│   ├── useMagnetic.ts   # 磁吸交互
│   ├── useKeyboardNav.ts # 键盘导航
│   ├── useImageLoad.ts  # 图片模糊加载
│   └── useReveal.ts     # 滚动入场
├── lib/
│   └── utils.ts         # cn 类名合并
├── pages/
│   └── Home.tsx         # 首页 — 组装所有章节
├── index.css            # 全局样式 + Tailwind
└── App.tsx              # 路由入口
```

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装与运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 类型检查
npm run check

# 生产构建
npm run build

# 预览构建产物
npm run preview
```

## 自定义

所有个人信息集中在 `src/data/profile.ts`,修改以下字段即可:

```typescript
export const profile: Profile = {
  name: "田小橙",
  nameEn: "Tian Xiaocheng",
  title: "独立软件开发者 / 全栈工程师",
  bio: "始终拥抱美好的未来,用代码构建独立的数字世界。",
  // ...
};

export const works: Work[] = [ /* 作品列表 */ ];
export const experiences: Experience[] = [ /* 经历列表 */ ];
export const skillRadar: SkillCategory[] = [ /* 雷达图维度 */ ];
export const skillList: SkillItem[] = [ /* 技能条 */ ];
export const socialLinks: SocialLink[] = [ /* 社交链接 */ ];
```

## 设计原则

1. **特效服务于功能** — 每个视觉元素都有明确的用户引导或价值传递作用
2. **视觉层次引导注意力** — 通过特效引导用户关注关键内容区域
3. **性能与体验平衡** — 设备分级确保不同环境下的一致体验
4. **可读性优先** — 3D 背景增强深度但不干扰内容阅读

## 开源协议

[MIT License](./LICENSE) © 2025 田小橙 Tian Xiaocheng
