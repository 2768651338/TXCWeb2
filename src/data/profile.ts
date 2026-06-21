// 个人信息数据源 — 单一可信源,所有组件从此读取

export interface Profile {
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  bio: string;
  bioLong: string;
  avatar: string;
  email: string;
  location: string;
  available: boolean;
  slogan: string;
}

export interface SkillCategory {
  category: string;
  label: string;
  level: number; // 0-100,用于雷达图
}

export interface SkillItem {
  name: string;
  level: number; // 0-100,用于技能条
  category: SkillCategory["category"];
}

export interface Work {
  id: string;
  title: string;
  year: string;
  description: string;
  cover: string;
  tags: string[];
  link: string;
  role: string;
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  organization: string;
  description: string;
  highlight: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // lucide icon name
  handle: string;
}

export const profile: Profile = {
  name: "田小橙",
  nameEn: "Tian Xiaocheng",
  title: "独立软件开发者 / 全栈工程师",
  titleEn: "Independent Developer × Full-stack Engineer",
  bio: "始终拥抱美好的未来,用代码构建独立的数字世界。",
  bioLong:
    "独立软件开发者与全栈工程师,擅长以 PHP、Java 为后端核心,HTML5/CSS3/JS 为前端基石,构建从支付系统到智慧校园的完整产品线。旗下运营 7 个线上站点,覆盖博客、电商、支付、授权、教育等多个领域。相信独立开发的力量 — 一个人,也能构建完整的数字生态。",
  avatar:
    "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Portrait%20of%20a%20creative%20independent%20developer%2C%20warm%20cinematic%20lighting%2C%20dark%20background%2C%20minimal%20style%2C%20high%20contrast%2C%20professional%20headshot%2C%20subtle%20orange%20accent%2C%20thoughtful%20expression&image_size=portrait_4_3",
  email: "contact@txc666.cn",
  location: "中国 · China",
  available: true,
  slogan: "始终拥抱美好的未来",
};

// 雷达图 5 维度 — 匹配真实技术栈
export const skillRadar: SkillCategory[] = [
  { category: "frontend", label: "前端开发", level: 90 },
  { category: "backend", label: "后端架构", level: 92 },
  { category: "system", label: "系统编程", level: 78 },
  { category: "independent", label: "独立开发", level: 95 },
  { category: "product", label: "产品运营", level: 85 },
];

// 技能条列表 — 真实技术栈
export const skillList: SkillItem[] = [
  { name: "PHP", level: 95, category: "backend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "HTML5", level: 92, category: "frontend" },
  { name: "CSS3", level: 88, category: "frontend" },
  { name: "Java", level: 82, category: "backend" },
  { name: "C 语言", level: 78, category: "system" },
  { name: "数据库设计", level: 85, category: "backend" },
  { name: "服务器运维", level: 80, category: "system" },
];

export const works: Work[] = [
  {
    id: "w1",
    title: "田小橙博客",
    year: "2024",
    role: "独立开发",
    description:
      "分享技术文章与生活感悟的个人博客,记录独立开发者的成长轨迹与技术沉淀。",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Minimalist%20blog%20website%20interface%20on%20dark%20background%20with%20warm%20orange%20accents%2C%20clean%20typography%2C%20editorial%20design%2C%20reading%20experience&image_size=landscape_4_3",
    tags: ["PHP", "博客", "内容创作"],
    link: "https://blog.txc666.cn/",
  },
  {
    id: "w2",
    title: "星河留言板",
    year: "2024",
    role: "独立开发",
    description:
      "在线留言互动平台,为站点访客提供温暖的交流空间,支持实时互动与情感表达。",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Star%20galaxy%20themed%20message%20board%20interface%20with%20glowing%20stars%20on%20deep%20space%20background%2C%20dreamy%20atmosphere%2C%20interactive%20design&image_size=landscape_4_3",
    tags: ["PHP", "互动", "社区"],
    link: "https://starboard.txc666.cn/",
  },
  {
    id: "w3",
    title: "太荒后台",
    year: "2023",
    role: "独立开发",
    description:
      "专业的后台管理系统,提供完整的权限控制、数据统计与业务管理能力。",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20admin%20dashboard%20interface%20with%20data%20charts%20and%20management%20panels%20on%20dark%20theme%2C%20clean%20UI%2C%20modern%20design%2C%20orange%20accent&image_size=landscape_4_3",
    tags: ["PHP", "后台", "管理系统"],
    link: "https://th.txc666.cn/",
  },
  {
    id: "w4",
    title: "田小橙云商店",
    year: "2023",
    role: "独立开发",
    description:
      "优质数字产品交易平台,支持在线购买、授权管理与自动化交付。",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Digital%20store%20interface%20with%20product%20cards%20on%20dark%20background%2C%20modern%20ecommerce%20design%2C%20clean%20layout%2C%20warm%20lighting&image_size=landscape_4_3",
    tags: ["PHP", "电商", "数字产品"],
    link: "https://shop.txc666.cn/",
  },
  {
    id: "w5",
    title: "筑梦云支付",
    year: "2022",
    role: "独立开发",
    description:
      "安全便捷的支付解决方案,对接多渠道支付,为独立开发者提供收款能力。",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Payment%20system%20interface%20with%20security%20shield%20icon%20and%20transaction%20flow%20on%20dark%20background%2C%20fintech%20design%2C%20orange%20glow&image_size=landscape_4_3",
    tags: ["PHP", "支付", "安全"],
    link: "https://pay.txc666.cn/",
  },
  {
    id: "w6",
    title: "云枢校园",
    year: "2022",
    role: "独立开发",
    description:
      "智慧校园综合服务平台,整合教务、生活、社交功能,服务校园数字化升级。",
    cover:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Smart%20campus%20platform%20interface%20with%20building%20icons%20and%20service%20modules%20on%20dark%20background%2C%20modern%20education%20tech%20design%2C%20clean%20UI&image_size=landscape_4_3",
    tags: ["Java", "教育", "平台"],
    link: "https://www.yuncampus.cn/",
  },
];

export const experiences: Experience[] = [
  {
    id: "e1",
    period: "2022 — 至今",
    role: "独立软件开发者",
    organization: "田小橙工作室",
    description:
      "独立运营 7 个线上站点,覆盖博客、社区、电商、支付、授权、教育等领域,构建完整的独立开发者生态。",
    highlight: "旗下 7 个站点,覆盖 6 大业务领域",
  },
  {
    id: "e2",
    period: "2020 — 2022",
    role: "全栈工程师",
    organization: "自由职业",
    description:
      "为客户提供从需求分析到上线部署的全栈开发服务,主导多个 Web 应用与后台系统的架构设计。",
    highlight: "交付 20+ 全栈项目,客户满意度 100%",
  },
  {
    id: "e3",
    period: "2018 — 2020",
    role: "后端开发工程师",
    organization: "互联网公司",
    description:
      "负责核心业务系统的后端开发,使用 PHP 与 Java 构建高并发服务,深入数据库优化与系统架构。",
    highlight: "系统支撑日均百万级请求",
  },
  {
    id: "e4",
    period: "2016 — 2018",
    role: "Web 开发者",
    organization: "起步阶段",
    description:
      "从 HTML/CSS/JS 起步,逐步掌握 PHP 与 Java,开始独立承接小型网站开发项目。",
    highlight: "完成首个独立上线的 Web 项目",
  },
];

export const socialLinks: SocialLink[] = [
  { platform: "主站", url: "https://www.txc666.cn", icon: "Globe", handle: "txc666.cn" },
  { platform: "博客", url: "https://blog.txc666.cn/", icon: "PenTool", handle: "blog.txc666.cn" },
  { platform: "云商店", url: "https://shop.txc666.cn/", icon: "ShoppingBag", handle: "shop.txc666.cn" },
  { platform: "云枢校园", url: "https://www.yuncampus.cn/", icon: "GraduationCap", handle: "yuncampus.cn" },
];

export const navSections = [
  { id: "hero", label: "首页", index: "01" },
  { id: "about", label: "关于", index: "02" },
  { id: "skills", label: "能力", index: "03" },
  { id: "works", label: "作品", index: "04" },
  { id: "timeline", label: "经历", index: "05" },
  { id: "contact", label: "联系", index: "06" },
] as const;
