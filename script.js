// ======================
// 图集过滤功能（完整实现）
// ======================
function initGalleryFilter() {
    const filters = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-img');
    
    // 初始化：确保所有图片可见并添加错误处理
    galleryItems.forEach(img => {
        img.style.opacity = '1';
        img.style.transform = 'translateY(0)';
        img.style.display = 'block';
        
        // 添加加载错误处理（关键修复）
        img.onerror = function() {
            console.warn(`⚠️ 图片加载失败: ${this.src}`);
            // 替换为占位图并更新alt文本
            this.src = 'https://via.placeholder.com/300x400/2a1b4a/ffffff?text=图片缺失';
            this.alt = "资源加载失败";
            this.style.opacity = '0.7';
            this.style.border = '2px dashed #8a2be2';
        };
        
        // 添加加载成功提示
        img.onload = function() {
            console.log(`✅ 图片加载成功: ${this.src.split('/').pop()}`);
        };
    });

    // 绑定过滤事件
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            // 更新激活状态
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            const type = filter.dataset.filter;
            
            // 过滤图片（带动画效果）
            galleryItems.forEach((item, index) => {
                if (type === 'all' || item.dataset.type === type) {
                    item.style.display = 'block';
                    // 延迟显示实现入场动画
                    setTimeout(() => {
                        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        item.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
                    }, 50 * index); // 阶梯式延迟
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    item.style.boxShadow = 'none';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 默认触发"全部"筛选（确保页面加载时图集可见）
    const allFilter = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilter) {
        allFilter.click();
    }
}

// ======================
// 页面加载初始化（完整流程）
// ======================
document.addEventListener('DOMContentLoaded', () => {
    // 1. 输出站点标识（使用window.currentSite确保可访问）
    const siteName = window.currentSite === 'carter' ? '卡提希娅' : '爱弥斯';
    console.log(`🚀 ${siteName} 站点已加载 | 路径: ${window.location.pathname}`);
    
    // 2. 初始化图集过滤器
    initGalleryFilter();
    
    // 3. 添加图片悬停效果
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.boxShadow = '0 0 25px rgba(138, 43, 226, 0.85)';
            img.style.zIndex = '20';
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            img.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
            img.style.zIndex = '1';
        });
    });
    
    // 4. 头像点击跳转增强（添加视觉反馈）
    const avatarWrapper = document.querySelector('.avatar-wrapper');
    if (avatarWrapper) {
        avatarWrapper.addEventListener('click', () => {
            avatarWrapper.style.transform = 'scale(0.95)';
            setTimeout(() => {
                avatarWrapper.style.transform = '';
            }, 150);
        });
    }
    
    // 5. 检查关键资源加载状态（2秒后执行）
    setTimeout(() => {
        const missingImages = Array.from(document.images).filter(img => 
            !img.complete || (img.naturalWidth === 0 && img.naturalHeight === 0)
        );
        
        if (missingImages.length > 0) {
            console.warn(`⚠️ 检测到 ${missingImages.length} 张图片加载失败`);
            missingImages.forEach(img => {
                console.warn(`  - 文件: ${img.src.split('/').pop()} | 路径: ${img.src}`);
            });
            
            // 在页面顶部显示警告（仅开发环境）
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                const warning = document.createElement('div');
                warning.innerHTML = `
                    <div style="
                        position: fixed;
                        top: 10px;
                        left: 50%;
                        transform: translateX(-50%);
                        background: #ff4757;
                        color: white;
                        padding: 10px 20px;
                        border-radius: 8px;
                        z-index: 9999;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                        font-weight: bold;
                        animation: pulse 2s infinite;
                    ">
                        ⚠️ ${missingImages.length} 张图片加载失败！请检查 images/ 和 images2/ 文件夹
                    </div>
                    <style>
                        @keyframes pulse {
                            0% { box-shadow: 0 0 0 0 rgba(255,71,87,0.7); }
                            70% { box-shadow: 0 0 0 10px rgba(255,71,87,0); }
                            100% { box-shadow: 0 0 0 0 rgba(255,71,87,0); }
                        }
                    </style>
                `;
                document.body.appendChild(warning);
                
                // 5秒后自动消失
                setTimeout(() => {
                    warning.style.opacity = '0';
                    warning.style.transition = 'opacity 0.5s';
                    setTimeout(() => warning.remove(), 500);
                }, 5000);
            }
        } else {
            console.log('✅ 所有图片资源加载正常 | 共检测 ' + document.images.length + ' 张图片');
        }
    }, 2000);
    
    // 6. 按钮悬停音效（可选增强）
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-tertiary').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (typeof window.AudioContext !== 'undefined' && Math.random() > 0.7) {
                const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                oscillator.type = 'sine';
                oscillator.frequency.value = 300 + Math.random() * 200;
                gainNode.gain.value = 0.05;
                oscillator.start();
                setTimeout(() => {
                    oscillator.stop();
                }, 100);
            }
        });
    });
});

// ======================
// 跳转辅助函数（完整实现）
// ======================
function goToCharacter(site) {
    if (site === 'carter') {
        console.log('→ 跳转至卡提希娅站点');
        window.location.href = 'index.html';
    } else if (site === 'aimis') {
        console.log('→ 跳转至爱弥斯站点');
        window.location.href = 'index2.html';
    } else {
        console.error('❌ 无效的站点标识:', site);
    }
}

// ======================
// 全局错误捕获（增强稳定性）
// ======================
window.addEventListener('error', (e) => {
    if (e.message.includes('Failed to load resource')) {
        console.error('🚨 资源加载错误:', e.message);
        // 不阻止默认行为，仅记录
    }
});

// ======================
// 页面卸载前清理（可选）
// ======================
window.addEventListener('beforeunload', () => {
    console.log('👋 离开页面，清理资源...');
});