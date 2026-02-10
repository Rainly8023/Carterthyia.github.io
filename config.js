const siteConfig = {
  characters: {
    // 角色 A：卡提希娅
    carter: {
      siteName: "卡提希娅的星光小站",
      siteDescription: "于光影中守护的温柔使者 · 双形态战斗达人",
      avatar: "favicon/1.png", 
      smallVideo: "videos/111.mp4",
      bigVideo: "videos/12.mp4"
    },
    // 角色 B：爱弥斯
    aimis: {
      siteName: "爱弥斯的璀璨星穹",
      siteDescription: "在星海间穿梭的自由之翼 · 幻梦掌控者",
      avatar: "images/P1.png",  // P1作为头像
      // 爱弥斯目前没有视频，所以不写视频配置
      smallVideo: null,
      bigVideo: null
    }
  },
  defaultTheme: "purple",
  defaultMode: "light"
};
window.siteConfig = siteConfig;