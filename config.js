// ======================
// 全局角色配置（挂载到window避免作用域问题）
// ======================
window.characters = {
    carter: {
        name: "卡提希娅",
        avatar: "images/carte1.jpg",
        description: "于光影中守护的温柔使者 · 双形态战斗达人",
        story: "在星海尽头，她以光为刃，以影为盾。卡提希娅穿梭于现实与虚影之间，守护着被遗忘的星辰记忆。当双形态切换的刹那，时空为之震颤...",
        video: "videos/111.mp4"
    },
    aimis: {
        name: "爱弥斯",
        avatar: "images2/1.jpg",
        description: "来自数据世界的电子幽灵 · 战斗与科技的结合体",
        story: "她是代码与灵魂的交汇点，是未来之光。爱弥斯从数据深渊中苏醒，以电子幽灵之姿穿梭于现实与虚拟边界。她的每一次攻击都带着数据流的韵律，每一次闪避都留下像素残影...",
        video: "videos/12.mp4"
    }
};

// ======================
// 当前站点标识（自动判断并挂载到window）
// ======================
(function() {
    const path = window.location.pathname;
    window.currentSite = path.includes('index2') ? 'aimis' : 'carter';
    
    // 调试信息
    console.log(`[CONFIG] 当前站点: ${window.currentSite === 'carter' ? '卡提希娅' : '爱弥斯'}`);
    console.log(`[CONFIG] 路径检测: ${path}`);
})();