const siteConfig = {
    // 管理员配置
    adminAccount: "admin",
    adminPassword: "carterthyia", // 基于角色名+版本号
    
    // 站点基础配置
    siteDomain: "carterthyia.cloud",
    defaultTheme: "purple", // 未来扩展用
    defaultMode: "light",   // 未来扩展用
    
    // 角色数据（严格遵循鸣潮3.1官方设定）
    characters: {
        carter: {
            siteName: "卡提希娅的星光小站｜鸣潮3.1顶级主C",
            siteDescription: "于光影中守护的温柔使者 · 双形态战斗达人",
            avatar: "favicon/1.png",
            smallVideo: "videos/111.mp4", // 迅刀形态
            bigVideo: "videos/12.mp4",   // 巨剑形态
            lore: {
                title: "芙露德莉丝（岁主共鸣者）",
                background: "卡提希娅作为埃格拉小镇少女，拥有迅刀与巨剑双形态切换能力，在汐塔守护中觉醒为岁主共鸣者...",
                source: "鸣潮3.1主线第4章「汐光回响」"
            },
            combat: {
                element: "气动",
                weapon: "迅刀/巨剑",
                skill: "气刃回旋（高频风蚀叠加）",
                liberation: "苍穹崩裂（真实伤害终结技）"
            }
        },
        aimis: {
            siteName: "爱弥斯 | 鸣潮3.1新角色",
            siteDescription: "星炬学院的电子幽灵 · 以数据之躯守护世界的温柔灵魂",
            avatar: "images/P1.png",
            smallVideo: null,
            bigVideo: null,
            tags: ["五星·热熔", "迅刀", "TGA 2025实机演示"],
            lore: {
                title: "星海轻歌的电子幽灵",
                background: "原星炬学院拉贝尔学部隧者适格者，训练中遭遇虚质磁暴事故，以电子形态继续存在...",
                source: "鸣潮3.1 PV《祝福》"
            },
            combat: {
                element: "热熔",
                weapon: "迅刀",
                skill: "长航的星辉（震潜/聚爆双模态）",
                liberation: "星海终焉（范围爆发）"
            }
        }
    },
    
    // 特效配置（针对不同设备优化）
    effectsConfig: {
        enableAdvancedEffects: true,    // 桌面端启用高级特效
        maxParticlesDesktop: 250,       // 桌面端粒子数量
        maxParticlesMobile: 60,         // 移动端粒子数量
        enableBlurDesktop: true,        // 桌面端背景模糊
        enableBlurMobile: false         // 移动端禁用模糊（性能优化）
    },
    
    // 版本信息（鸣潮3.1官方数据）
    version: {
        gameVersion: "3.1.0",
        releaseDate: "2026-02-10",
        characters: ["卡提希娅", "爱弥斯"],
        updateNotes: "新增双形态切换系统｜电子幽灵特效｜优化粒子性能"
    }
};

// 暴露全局变量
window.siteConfig = siteConfig;

// =============== 鸣潮3.1官方数据验证 ===============
if (typeof window !== 'undefined') {
    console.log(`%c鸣潮3.1角色数据加载完成`, 'color: #38bdf8; font-weight: bold;');
    console.log(`角色库: ${Object.keys(siteConfig.characters).join(', ')}`);
    console.log(`当前版本: ${siteConfig.version.gameVersion}`);
}