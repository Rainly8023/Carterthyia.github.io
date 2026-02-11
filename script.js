// ================== 粒子背景 ==================
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const config = siteConfig.effectsConfig || {};
    const maxParticles = window.innerWidth > 768 ? 
        (config.maxParticlesDesktop || 250) : 
        (config.maxParticlesMobile || 60);
    
    let particles = [];
    const mouse = { x: null, y: null };
    
    // 监听鼠标
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });
    
    // 粒子类
    class Particle {
        constructor(x, y) {
            this.x = x || Math.random() * canvas.width;
            this.y = y || Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `hsl(${Math.random() * 60 + 240}, 70%, 60%)`;
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            // 鼠标吸引
            if (mouse.x && mouse.y) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    this.x -= dx * 0.02;
                    this.y -= dy * 0.02;
                }
            }
            
            // 边界反弹
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            
            this.x += this.speedX;
            this.y += this.speedY;
        }
        
        draw() {
            ctx.fillStyle = `rgba(138, 43, 226, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // 初始化粒子
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }
    
    // 连接粒子
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(100, 80, 180, ${1 - distance/100})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(15, 12, 41, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (const particle of particles) {
            particle.update();
            particle.draw();
        }
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    // 响应窗口大小
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    animate();
}

// ================== 导航栏滚动效果 ==================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ================== 图集筛选 ==================
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryImgs = document.querySelectorAll('.gallery-img');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 筛选图片
            const filter = btn.dataset.filter;
            galleryImgs.forEach(img => {
                if (filter === 'all' || img.dataset.type === filter) {
                    img.style.display = 'block';
                    // 添加入场动画
                    setTimeout(() => {
                        img.style.opacity = '1';
                        img.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    img.style.opacity = '0';
                    img.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        img.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ================== 返回顶部 ==================
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ================== 初始化 ==================
document.addEventListener('DOMContentLoaded', () => {
    // 初始化粒子背景
    if (siteConfig.effectsConfig?.enableAdvancedEffects !== false) {
        initParticles();
    }
    
    // 导航栏滚动效果
    initNavbarScroll();
    
    // 图集筛选
    initGalleryFilter();
    
    // 返回顶部
    initBackToTop();
    
    // 站点配置初始化
    if (typeof initSiteConfig === 'function') {
        initSiteConfig();
    }
    
    // 控制台欢迎信息
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   ✨ 卡提希娅 & 爱弥斯双站系统加载完成 ✨                 ║
║                                                            ║
║   📌 路径说明：                                            ║
║      P1 = favicon/13.ico      (网站图标)                   ║
║      P2 = Aemeath image/1.jpg (爱弥斯头像｜第一张)         ║
║      P3 = images/P3.jpg       (网站主视觉头像｜首页大图)   ║
║                                                            ║
║   🌐 访问：                                                ║
║      卡提希娅站：index.html                                ║
║      爱弥斯站：index2.html                                 ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);
});