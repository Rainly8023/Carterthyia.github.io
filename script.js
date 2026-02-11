// =============== 鸣潮3.1官方配置加载 ===============
if (!window.siteConfig) {
    console.error("❌ config.js 未加载！请检查路径");
}

// =============== 角色自动识别系统 ===============
function autoLoadRole() {
    const pageName = window.location.pathname.toLowerCase();
    let roleKey;
    
    if (pageName.includes("index2")) {
        roleKey = "aimis";
    } else if (pageName.includes("index")) {
        roleKey = "carter";
    } else {
        roleKey = "carter"; // 默认角色
    }
    
    const data = window.siteConfig?.characters?.[roleKey];
    if (!data) {
        console.error(`角色数据缺失: ${roleKey}`);
        return;
    }
    
    // 动态更新页面标题
    document.title = data.siteName;
    
    // 更新站点描述
    const descTag = document.querySelector('.site-description');
    if (descTag) descTag.textContent = data.siteDescription;
    
    // 更新头像
    const avatarImg = document.getElementById('userAvatar');
    if (avatarImg && data.avatar) {
        avatarImg.src = data.avatar;
    }
    
    // 爱弥斯专属处理：移除视频区
    if (roleKey === 'aimis') {
        const videoSec = document.querySelector('.video-section');
        if (videoSec) videoSec.style.display = 'none';
        
        // 显示电子幽灵特效
        const glitchEffect = document.querySelector('.electronic-glitch');
        if (glitchEffect) {
            glitchEffect.style.display = 'block';
        }
    }
    
    // 卡提希娅专属：显示视频
    if (roleKey === 'carter' && (data.smallVideo || data.bigVideo)) {
        const videoSec = document.querySelector('.video-section');
        if (videoSec) videoSec.style.display = 'block';
        
        // 填充视频内容
        const smallVideo = document.querySelector('.small-video');
        const bigVideo = document.querySelector('.big-video');
        
        if (smallVideo && data.smallVideo) {
            smallVideo.querySelector('source').src = data.smallVideo;
            smallVideo.load();
        }
        
        if (bigVideo && data.bigVideo) {
            bigVideo.querySelector('source').src = data.bigVideo;
            bigVideo.load();
        }
    }
    
    // 根据角色设置标签
    if (roleKey === 'aimis' && data.tags) {
        const tagsContainer = document.querySelector('.tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            data.tags.forEach(tag => {
                const tagEl = document.createElement('span');
                tagEl.className = 'tag';
                tagEl.textContent = tag;
                tagsContainer.appendChild(tagEl);
            });
        }
    }
}

// =============== 画廊点击放大功能 ===============
function initGalleryClickEffect() {
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: pointer;
                transition: opacity 0.3s;
            `;
            
            const bigImg = document.createElement('img');
            bigImg.src = this.src;
            bigImg.alt = this.alt || '角色大图';
            bigImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 8px;
                box-shadow: 0 0 30px rgba(255, 105, 180, 0.7);
            `;
            
            overlay.appendChild(bigImg);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
            
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    document.body.removeChild(overlay);
                    document.body.style.overflow = '';
                }
            });
            
            // 按ESC关闭
            const escHandler = (e) => {
                if (e.key === 'Escape') {
                    document.body.removeChild(overlay);
                    document.body.style.overflow = '';
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);
        });
    });
}

// =============== 粒子背景系统（鸣潮3.1特效） ===============
function initParticleSystem() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const config = window.siteConfig?.effectsConfig || {};
    const isMobile = window.innerWidth < 768;
    const maxParticles = isMobile ? (config.maxParticlesMobile || 60) : (config.maxParticlesDesktop || 250);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    class Particle {
        constructor(x, y, size, speedX, speedY, color, opacity) {
            this.x = x || Math.random() * canvas.width;
            this.y = y || Math.random() * canvas.height;
            this.size = size || Math.random() * 3 + 1;
            this.speedX = speedX || Math.random() * 1 - 0.5;
            this.speedY = speedY || Math.random() * 1 - 0.5;
            this.color = color || (isMobile ? '#ffffff' : '#e0b0ff');
            this.opacity = opacity || Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // 边界反弹
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
            
            // 缓慢改变方向
            if (Math.random() > 0.98) {
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function init() {
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new Particle());
        }
        
        // 添加中心聚集的粒子
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        for (let i = 0; i < Math.min(30, maxParticles / 5); i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            const size = Math.random() * 2 + 1;
            const speed = 0.2 + Math.random() * 0.3;
            
            particles.push(new Particle(
                x,
                y,
                size,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                '#a8dadc',
                0.7
            ));
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制粒子连线
        if (!isMobile && config.enableAdvancedEffects) {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance / 1000})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // 更新和绘制粒子
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // 重置粒子
        particles = [];
        init();
    }
    
    window.addEventListener('resize', handleResize);
    init();
    animate();
}

// =============== 涟漪点击效果 ===============
function initRippleEffect() {
    document.addEventListener('click', function(e) {
        // 忽略特定元素
        if (e.target.closest('a, button, .gallery-img, video, .back-to-top')) {
            return;
        }
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = (e.clientX - 50) + 'px';
        ripple.style.top = (e.clientY - 50) + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// =============== 元素动画（滚动触发） ===============
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.section-animate, .card-animate').forEach(el => {
        observer.observe(el);
    });
}

// =============== 导航栏滚动变色 ===============
function initNavbar() {
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

// =============== 返回顶部按钮 ===============
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =============== 故事背景展开功能 ===============
function initStoryToggle() {
    const toggleBtn = document.querySelector('.story-toggle');
    const storyContent = document.querySelector('.story-hidden');
    
    if (toggleBtn && storyContent) {
        toggleBtn.addEventListener('click', () => {
            storyContent.classList.toggle('story-hidden');
            toggleBtn.textContent = storyContent.classList.contains('story-hidden') 
                ? '展开完整故事' 
                : '收起故事';
        });
    }
}

// =============== 选项卡系统 ===============
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 更新内容面板
            const tabId = btn.dataset.tab;
            document.querySelectorAll('.tab-pane').forEach(panel => {
                panel.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// =============== 画廊筛选功能 ===============
function initGalleryFilter() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 筛选图片
            const filter = btn.dataset.filter;
            document.querySelectorAll('.gallery-img').forEach(img => {
                if (filter === 'all' || img.dataset.type === filter) {
                    img.style.display = 'block';
                    setTimeout(() => {
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    img.style.opacity = '0';
                    img.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        img.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// =============== 电子幽灵特效（爱弥斯专属） ===============
function initElectronicGlitch() {
    const glitchEffect = document.querySelector('.electronic-glitch');
    if (!glitchEffect) return;
    
    // 随机闪烁效果
    setInterval(() => {
        if (Math.random() > 0.7) {
            glitchEffect.style.opacity = Math.random() > 0.5 ? '0.6' : '0.3';
            glitchEffect.style.filter = Math.random() > 0.8 
                ? 'blur(1px)' 
                : 'none';
        }
    }, 300);
    
    // 鼠标移入头像时增强效果
    const avatar = document.querySelector('.avatar-img');
    if (avatar) {
        avatar.addEventListener('mouseenter', () => {
            glitchEffect.style.animation = 'glitch 0.1s infinite linear';
        });
        
        avatar.addEventListener('mouseleave', () => {
            glitchEffect.style.animation = 'glitch 2s infinite linear';
        });
    }
}

// =============== 全局初始化 ===============
window.addEventListener('DOMContentLoaded', () => {
    if (!window.siteConfig) {
        console.error("配置文件未加载！");
        return;
    }
    
    // 初始化所有功能
    autoLoadRole();
    initAnimations();
    initNavbar();
    initBackToTop();
    initParticleSystem();
    initRippleEffect();
    initGalleryClickEffect();
    initStoryToggle();
    initTabs();
    initGalleryFilter();
    initElectronicGlitch();
    
    // 控制台彩蛋
    console.log("%c✨ 欢迎来到鸣潮3.1角色站 ✨", "color: #ff6b9d; font-size: 16px; font-weight: bold;");
    console.log("卡提希娅 & 爱弥斯 · 由玩家用心搭建");
    console.log("%c✅ 所有功能已初始化完成", "color: #34d399; font-weight: bold;");
    
    // 性能优化提示
    if (window.siteConfig.effectsConfig.enableAdvancedEffects === false) {
        console.log("%c💡 已禁用高级特效（移动设备优化）", "color: #fbbf24;");
    }
    
    // 角色识别调试
    const pageName = window.location.pathname.toLowerCase();
    console.log(`📊 当前角色: ${pageName.includes("index2") ? "爱弥斯" : "卡提希娅"}`);
});

// =============== 响应式处理 ===============
window.addEventListener('resize', () => {
    // 重新初始化粒子系统
    initParticleSystem();
    
    // 移动端隐藏导航链接
    const isMobile = window.innerWidth < 768;
    const navLinks = document.querySelector('.nav-links');
    
    if (isMobile && navLinks) {
        navLinks.style.display = 'none';
    }
});