const siteConfig = {
    adminAccount: "admin",
    adminPassword: "carterthyia",

    siteDomain: "carterthyia.cloud",
    defaultTheme: "purple",
    defaultMode: "light",

    characters: {
        carter: {
            siteName: "卡提希娅的星光小站｜鸣潮3.1顶级主C",
            siteDescription: "于光影中守护的温柔使者 · 双形态战斗达人",
            avatar: "images/P1.jpg",     // 头像
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
            avatar: "images/P4.jpg",     // 头像
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

    effectsConfig: {
        enableAdvancedEffects: true,
        maxParticlesDesktop: 250,
        maxParticlesMobile: 60,
        enableBlurDesktop: true,
        enableBlurMobile: false
    },

    version: {
        gameVersion: "3.1.0",
        releaseDate: "2026-02-10",
        characters: ["卡提希娅", "爱弥斯"],
        updateNotes: "新增双形态切换系统｜电子幽灵特效｜优化粒子性能"
    }
};

window.siteConfig = siteConfig;