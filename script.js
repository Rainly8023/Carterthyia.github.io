// ================= 全局变量 =================
let currentTheme = window.siteConfig?.defaultTheme || 'purple';
let isDarkMode = window.siteConfig?.defaultMode === 'dark';

// ================= 1. 初始化入口 =================
window.addEventListener('DOMContentLoaded', () => {
  if (!window.siteConfig) {
    console.error("配置文件 config.js 未正确加载！");
    return;
  }
  
  // A. 执行角色智能加载 (头像、描述、视频隐藏/显示)
  autoLoadRole();
  
  // B. 初始化 UI 功能
  initAnimations();
  initNavbar();
  initBackToTop();
  initDefaultThemeAndMode();
  
  // C. 初始化极限特效
  initParticleSystem();
  initRippleEffect();
});

// ================= 2. 角色智能加载 =================
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

// ================= 3. 极限特效系统 =================

// 特效 1: 智能粒子系统
function initParticleSystem() {
  const config = window.siteConfig.effectsConfig;
  if (!config || !config.enableAdvancedEffects) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  
  let w, h, particles = [];
  
  // 智能设备检测，手机端降低粒子数量
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const particleCount = isMobile ? config.maxParticlesMobile : config.maxParticlesDesktop;

  // 手机端优化：禁用高斯模糊变量
  if (isMobile && !config.enableBlurMobile) {
    document.documentElement.style.setProperty('--backdrop-blur', '0px');
  } else {
    document.documentElement.style.setProperty('--backdrop-blur', '10px');
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vy = -(Math.random() * 1 + 0.5);
      this.vx = (Math.random() - 0.5) * 0.5;
      this.r = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.3;
    }
    update() {
      this.y += this.vy;
      this.x += this.vx;
      if (this.y < 0) this.reset();
    }
    draw() {
      ctx.fillStyle = `rgba(138, 92, 247, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// 特效 2: 点击涟漪
function initRippleEffect() {
  document.body.addEventListener('click', function(e) {
    // 限制点击区域，避免误触元素
    const target = e.target.closest('.card-animate, .btn, .gallery-img, .nav-logo');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    target.style.overflow = 'hidden';
    target.style.position = 'relative';
    target.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
}

// ================= 4. UI 基础功能 =================

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