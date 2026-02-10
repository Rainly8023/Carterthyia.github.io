// ================= 1. 初始化与角色加载 =================
window.addEventListener('DOMContentLoaded', () => {
  if (!window.siteConfig) {
    console.error("配置文件 config.js 未正确加载！");
    return;
  }
  
  // 执行角色智能加载
  autoLoadRole();
  
  // 初始化通用 UI 功能
  initAnimations();
  initNavbar();
  initBackToTop();
  initDefaultThemeAndMode();
});

function autoLoadRole() {
  const pageName = window.location.pathname.toLowerCase();
  // 识别页面：文件名包含 '2' 或是 'aimis' 就加载爱弥斯配置
  const roleKey = (pageName.includes("2") || pageName.includes("aimis")) ? "aimis" : "carter";
  const data = window.siteConfig.characters[roleKey];

  if (!data) return;

  // A. 替换文本信息
  document.title = data.siteName;
  const descTag = document.querySelector('.site-description');
  if (descTag) descTag.textContent = data.siteDescription;

  // B. 替换头像 (P1)
  const avatarImg = document.getElementById('userAvatar');
  if (avatarImg && data.avatar) {
    avatarImg.src = data.avatar;
  }

  // C. 视频区域逻辑处理
  const videoSection = document.querySelector('.video-section'); 
  const smallVid = document.getElementById('smallVideo');
  const bigVid = document.getElementById('bigVideo');

  if (!data.smallVideo && !data.bigVideo) {
    // 如果没有视频数据（如爱弥斯），直接隐藏整个视频区域
    if (videoSection) videoSection.style.display = 'none';
  } else {
    // 如果有视频（如卡提），显示并加载路径
    if (videoSection) videoSection.style.display = 'block';
    if (smallVid && data.smallVideo) { smallVid.src = data.smallVideo; smallVid.load(); }
    if (bigVid && data.bigVideo) { bigVid.src = data.bigVideo; bigVid.load(); }
  }
}

// ================= 2. 核心 UI 功能 =================

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-animate, .card-animate').forEach(el => observer.observe(el));
}

function initNavbar() {
  const nav = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    window.scrollY > 50 ? nav?.classList.add('scrolled') : nav?.classList.remove('scrolled');
  });
}

function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    window.scrollY > 300 ? btn?.classList.remove('hidden') : btn?.classList.add('hidden');
  });
  btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initDefaultThemeAndMode() {
  // 设置默认主题色
  document.documentElement.style.setProperty('--primary-color', '#8a5cf7');
}

// 供按钮调用的视频切换函数
function switchVideo(type) {
  const s = document.getElementById('smallVideo');
  const b = document.getElementById('bigVideo');
  if(type === 'small') {
    s?.classList.remove('hidden'); b?.classList.add('hidden');
  } else {
    s?.classList.add('hidden'); b?.classList.remove('hidden');
  }
}