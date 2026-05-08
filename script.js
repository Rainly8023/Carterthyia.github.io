let currentTheme = window.siteConfig?.defaultTheme || 'purple';
let isDarkMode = window.siteConfig?.defaultMode === 'dark';

// ================= 初始化 (增加了安全检查) =================
window.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initNavbar();
  initBackToTop();
  
  // 只有存在对应元素时才初始化
  if (document.querySelector('.gallery-tab')) initGalleryFilter();
  if (document.querySelector('.tab-btn')) initGuideTab();
  if (document.getElementById('customColorPicker')) initCustomColorPicker();
  
  initDefaultThemeAndMode();
});

// 让 openLb 成为 previewImage 的别名，兼容你之前的写法
window.openLb = previewImage;

// ================= 核心功能 =================

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => window.scrollY > 50 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled'));
  
  const burger = document.getElementById('burger') || document.querySelector('.nav-toggle');
  const menu = document.getElementById('navLinks') || document.querySelector('.nav-menu');
  
  burger?.addEventListener('click', () => {
    menu?.classList.toggle('active');
    const icon = burger.querySelector('i');
    if (icon) {
      menu?.classList.contains('active') ? icon.classList.replace('fa-bars', 'fa-times') : icon.classList.replace('fa-times', 'fa-bars');
    }
  });
}

function previewImage(src) {
  const modal = document.getElementById('imagePreviewModal') || document.getElementById('lb');
  const previewImg = document.getElementById('previewImage') || document.getElementById('lbImg');
  if (!modal || !previewImg) return;
  previewImg.src = src;
  modal.classList.add('on'); // 兼容你新的 CSS class
  modal.classList.remove('modal-hidden');
  document.body.style.overflow = 'hidden';
}

function closeImagePreview() {
  const modal = document.getElementById('imagePreviewModal') || document.getElementById('lb');
  if (!modal) return;
  modal.classList.remove('on');
  modal.classList.add('modal-hidden');
  document.body.style.overflow = 'auto';
}

// 保留你最爱的：星空粒子 & 水滴涟漪
(function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'starCanvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w, h, mx, my, particles = [];
  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize); resize();
  mx = w / 2; my = h / 2; window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  class P {
    constructor() { this.reset(); }
    reset() { this.x = Math.random() * w; this.y = h + 20; this.vy = -(1 + Math.random() * 2); this.vx = (Math.random() - 0.5) * 0.6; this.r = Math.random() * 1.5 + 0.5; }
    update() { this.y += this.vy; this.x += this.vx; const dx = this.x - mx, dy = this.y - my, d = Math.hypot(dx, dy); if (d < 120) { this.x += dx / d * 1.2; this.y += dy / d * 1.2; } if (this.y < -20) this.y = h + 20; }
    draw() { ctx.beginPath(); ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fill(); }
  }
  function animate() { ctx.clearRect(0, 0, w, h); if (particles.length < (w < 768 ? 40 : 80)) particles.push(new P()); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
  animate();
})();

// 此处省略你原有的主题切换/调色函数（保持不变即可）...