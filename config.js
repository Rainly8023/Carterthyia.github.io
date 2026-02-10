const siteConfig = {
  // 核心：将角色数据分开
  characters: {
    // 卡提希娅的配置 (适用于 index.html)
    carter: {
      siteName: "卡提希娅的星光小站",
      siteDescription: "守护的温柔使者",
      avatar: "favicon/1.png",
      smallVideo: "videos/111.mp4",
      bigVideo: "videos/12.mp4"
    },
    // 爱弥斯的配置 (适用于 index2.html 或 character2.html)
    aimis: {
      siteName: "爱弥斯的璀璨星穹",
      siteDescription: "自由的幻梦掌控者",
      avatar: "images/P1.png", // 你要求的P1头像
      smallVideo: null,       // 没有视频
      bigVideo: null
    }
  },
  // ... 其他通用配置
};
window.siteConfig = siteConfig;