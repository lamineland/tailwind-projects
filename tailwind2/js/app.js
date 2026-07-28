// =============================================
// The Daily Byte — Dynamic Blog Application
// =============================================

let blogData = null;
let currentCategory = 'all';

// ---- Color mapping for Tailwind classes ----
const colorMap = {
    indigo:  { bg50: 'bg-indigo-50', bg100: 'bg-indigo-100', text600: 'text-indigo-600', text700: 'text-indigo-700', badge: 'bg-indigo-600' },
    pink:    { bg50: 'bg-pink-50',   bg100: 'bg-pink-100',   text600: 'text-pink-600',   text700: 'text-pink-700',   badge: 'bg-pink-500' },
    emerald: { bg50: 'bg-emerald-50',bg100: 'bg-emerald-100', text600: 'text-emerald-600',text700: 'text-emerald-700',badge: 'bg-emerald-500' },
    red:     { bg50: 'bg-red-50',    bg100: 'bg-red-100',    text600: 'text-red-600',    text700: 'text-red-700',    badge: 'bg-red-600' },
    blue:    { bg50: 'bg-blue-50',   bg100: 'bg-blue-100',   text600: 'text-blue-600',   text700: 'text-blue-700',   badge: 'bg-blue-600' },
    purple:  { bg50: 'bg-purple-50', bg100: 'bg-purple-100', text600: 'text-purple-600', text700: 'text-purple-700', badge: 'bg-purple-500' },
    amber:   { bg50: 'bg-amber-50',  bg100: 'bg-amber-100',  text600: 'text-amber-600',  text700: 'text-amber-700',  badge: 'bg-amber-600' },
    orange:  { bg50: 'bg-orange-50', bg100: 'bg-orange-100', text600: 'text-orange-600', text700: 'text-orange-700', badge: 'bg-orange-600' },
    cyan:    { bg50: 'bg-cyan-50',   bg100: 'bg-cyan-100',   text600: 'text-cyan-600',   text700: 'text-cyan-700',   badge: 'bg-cyan-600' },
    teal:    { bg50: 'bg-teal-50',   bg100: 'bg-teal-100',   text600: 'text-teal-600',   text700: 'text-teal-700',   badge: 'bg-teal-600' },
    gray:    { bg50: 'bg-gray-50',   bg100: 'bg-gray-100',   text600: 'text-gray-600',   text700: 'text-gray-700',   badge: 'bg-gray-600' },
};

function getColor(color) {
    return colorMap[color] || colorMap.indigo;
}

// ---- Simple Markdown-like parser ----
function parseContent(text) {
    if (!text) return '';
    return text
        .split('\n\n')
        .map(paragraph => {
            // Headers
            if (paragraph.startsWith('## ')) {
                return `<h3 class="text-xl font-bold mt-8 mb-3 text-gray-900">${paragraph.replace('## ', '')}</h3>`;
            }
            // Numbered list items
            if (paragraph.match(/^\d+\.\s/m)) {
                const items = paragraph.split('\n').map(item => {
                    const content = item.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    return `<li class="ml-6 list-decimal mb-1">${content}</li>`;
                }).join('');
                return `<ol class="space-y-1 mb-4 text-gray-700">${items}</ol>`;
            }
            // Unordered list items
            if (paragraph.match(/^-\s/m)) {
                const items = paragraph.split('\n').map(item => {
                    const content = item.replace(/^-\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    return `<li class="ml-6 list-disc mb-1">${content}</li>`;
                }).join('');
                return `<ul class="space-y-1 mb-4 text-gray-700">${items}</ul>`;
            }
            // Regular paragraph with bold
            const formatted = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            return `<p class="mb-4 text-gray-700 leading-relaxed">${formatted}</p>`;
        })
        .join('');
}

// ---- Load Data ----
async function loadData() {
    try {
        const response = await fetch('data/posts.json');
        blogData = await response.json();
        renderApp();
    } catch (error) {
        console.error('Failed to load blog data:', error);
    }
}

// ---- Render Everything ----
function renderApp() {
    renderHeader();
    renderHero();
    renderFeatured();
    renderCategories();
    renderRecent();
    renderNewsletter();
    renderFooter();
    renderPostDetailModal();
    setupScrollAnimations();
}

// ---- HEADER ----
function renderHeader() {
    const name = blogData.blog.name;
    document.getElementById('blog-logo').textContent = name;
}

// ---- HERO ----
function renderHero() {
    const { tagline, description } = blogData.blog;
    document.getElementById('hero-tagline').innerHTML = `Stories That <span class="text-yellow-300">${tagline.split(' ').pop()}</span>`;
    document.getElementById('hero-description').textContent = description;
}

// ---- FEATURED POSTS ----
function renderFeatured() {
    const featured = blogData.posts.filter(p => p.featured);
    const container = document.getElementById('featured-grid');
    container.innerHTML = featured.map(post => {
        const c = getColor(post.badgeColor);
        return `
        <article class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer hover:-translate-y-1 group" onclick="openPost(${post.id})">
            <div class="relative overflow-hidden">
                <img src="${post.image}" alt="${post.title}" class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300">
                <span class="absolute top-4 left-4 ${c.badge} text-white text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                </span>
            </div>
            <div class="p-6">
                <div class="flex items-center gap-3 mb-3">
                    <img src="${post.author.avatar}" alt="${post.author.name}" class="w-8 h-8 rounded-full">
                    <div>
                        <p class="text-sm font-medium text-gray-800">${post.author.name}</p>
                        <p class="text-xs text-gray-400">${post.date} · ${post.readTime}</p>
                    </div>
                </div>
                <h3 class="text-xl font-bold mb-3 text-gray-900 group-hover:text-indigo-600 transition">
                    ${post.title}
                </h3>
                <p class="text-gray-600 text-sm leading-relaxed mb-4">${post.excerpt}</p>
                <div class="flex flex-wrap gap-2">
                    ${post.tags.map(tag => `<span class="${c.bg50} ${c.text600} text-xs font-medium px-3 py-1 rounded-full">${tag}</span>`).join('')}
                </div>
            </div>
        </article>`;
    }).join('');
}

// ---- CATEGORIES ----
function renderCategories() {
    const container = document.getElementById('categories-grid');
    const tagsContainer = document.getElementById('tags-container');

    container.innerHTML = `
        <a href="#" onclick="filterByCategory('all'); return false;"
           class="group bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all border-2 ${currentCategory === 'all' ? 'border-indigo-500' : 'border-gray-100'}">
            <div class="text-4xl mb-3">🔥</div>
            <h3 class="font-semibold text-gray-800 group-hover:text-indigo-600 transition">All Posts</h3>
            <p class="text-xs text-gray-400 mt-1">${blogData.posts.length} articles</p>
        </a>
    ` + blogData.categories.map(cat => `
        <a href="#" onclick="filterByCategory('${cat.id}'); return false;"
           class="group bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all border-2 ${currentCategory === cat.id ? 'border-indigo-500' : 'border-gray-100'}">
            <div class="text-4xl mb-3">${cat.icon}</div>
            <h3 class="font-semibold text-gray-800 group-hover:text-indigo-600 transition">${cat.name}</h3>
            <p class="text-xs text-gray-400 mt-1">${cat.count} articles</p>
        </a>
    `).join('');

    const tagColors = [
        { bg: 'bg-indigo-100', text: 'text-indigo-700', hover: 'hover:bg-indigo-200' },
        { bg: 'bg-pink-100', text: 'text-pink-700', hover: 'hover:bg-pink-200' },
        { bg: 'bg-emerald-100', text: 'text-emerald-700', hover: 'hover:bg-emerald-200' },
        { bg: 'bg-amber-100', text: 'text-amber-700', hover: 'hover:bg-amber-200' },
        { bg: 'bg-purple-100', text: 'text-purple-700', hover: 'hover:bg-purple-200' },
        { bg: 'bg-cyan-100', text: 'text-cyan-700', hover: 'hover:bg-cyan-200' },
        { bg: 'bg-rose-100', text: 'text-rose-700', hover: 'hover:bg-rose-200' },
        { bg: 'bg-teal-100', text: 'text-teal-700', hover: 'hover:bg-teal-200' },
    ];
    tagsContainer.innerHTML = blogData.tags.map((tag, i) => {
        const tc = tagColors[i % tagColors.length];
        return `<span class="${tc.bg} ${tc.text} text-sm font-medium px-4 py-2 rounded-full ${tc.hover} cursor-pointer transition">#${tag}</span>`;
    }).join('');
}

// ---- RECENT POSTS ----
function renderRecent() {
    const container = document.getElementById('recent-list');
    let posts = blogData.posts;
    if (currentCategory !== 'all') {
        posts = posts.filter(p => p.category === currentCategory);
    }

    if (posts.length === 0) {
        container.innerHTML = `
            <div class="text-center py-16 text-gray-400">
                <div class="text-5xl mb-4">📭</div>
                <p class="text-lg">No posts found in this category yet.</p>
                <button onclick="filterByCategory('all')" class="mt-4 text-indigo-600 font-medium hover:underline">View all posts →</button>
            </div>`;
        return;
    }

    container.innerHTML = posts.map(post => {
        const c = getColor(post.badgeColor);
        const catObj = blogData.categories.find(cat => cat.id === post.category);
        const catName = catObj ? catObj.name : post.category;
        return `
        <article class="flex flex-col sm:flex-row gap-5 p-5 bg-gray-50 rounded-xl hover:shadow-md transition-all cursor-pointer group" onclick="openPost(${post.id})">
            <img src="${post.image}" alt="${post.title}" class="w-full sm:w-48 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300">
            <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                    <span class="${c.bg100} ${c.text600} text-xs font-medium px-3 py-1 rounded-full">${catName}</span>
                    <span class="text-xs text-gray-400">${post.date}</span>
                </div>
                <h3 class="text-lg font-bold mb-2 text-gray-900 group-hover:text-indigo-600 transition">
                    ${post.title}
                </h3>
                <p class="text-gray-500 text-sm">${post.excerpt}</p>
                <div class="flex items-center gap-3 mt-3">
                    <img src="${post.author.avatar}" alt="${post.author.name}" class="w-6 h-6 rounded-full">
                    <span class="text-xs text-gray-500">${post.author.name} · ${post.readTime}</span>
                </div>
            </div>
        </article>`;
    }).join('');
}

// ---- NEWSLETTER ----
function renderNewsletter() {
    // Already static, but we could make it dynamic if needed
}

// ---- FOOTER ----
function renderFooter() {
    const name = blogData.blog.name;
    const brandEls = document.querySelectorAll('.footer-brand-name');
    brandEls.forEach(el => el.textContent = name);

    const categoriesList = document.getElementById('footer-categories');
    categoriesList.innerHTML = blogData.categories.slice(0, 4).map(cat =>
        `<li><a href="#" onclick="filterByCategory('${cat.id}'); scrollToSection('recent'); return false;" class="hover:text-white transition">${cat.name}</a></li>`
    ).join('');
}

// ---- POST DETAIL MODAL ----
function renderPostDetailModal() {
    // Modal is created dynamically when a post is opened
}

function openPost(postId) {
    const post = blogData.posts.find(p => p.id === postId);
    if (!post) return;

    const c = getColor(post.badgeColor);
    const catObj = blogData.categories.find(cat => cat.id === post.category);
    const catName = catObj ? catObj.name : post.category;

    // Find related posts (same category, excluding current)
    const related = blogData.posts.filter(p => p.category === post.category && p.id !== postId).slice(0, 3);

    const modal = document.getElementById('post-modal');
    const content = document.getElementById('post-modal-content');

    content.innerHTML = `
    <div class="relative">
        <!-- Hero Image -->
        <div class="relative h-64 md:h-80 overflow-hidden">
            <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <button onclick="closePost()" class="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg z-10">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
            <div class="absolute bottom-6 left-6 right-6">
                <div class="flex items-center gap-3 mb-3">
                    <span class="${c.badge} text-white text-xs font-bold px-3 py-1 rounded-full">${catName}</span>
                    <span class="text-white/80 text-sm">${post.date} · ${post.readTime}</span>
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white leading-tight">${post.title}</h1>
            </div>
        </div>

        <!-- Content -->
        <div class="max-w-3xl mx-auto px-6 py-8">
            <!-- Author Info -->
            <div class="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                <img src="${post.author.avatar}" alt="${post.author.name}" class="w-12 h-12 rounded-full">
                <div>
                    <p class="font-semibold text-gray-900">${post.author.name}</p>
                    <p class="text-sm text-gray-500">${post.author.role}</p>
                </div>
            </div>

            <!-- Article Body -->
            <div class="prose max-w-none">
                ${parseContent(post.content)}
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
                ${post.tags.map(tag => `<span class="${c.bg100} ${c.text700} text-sm font-medium px-4 py-1.5 rounded-full">${tag}</span>`).join('')}
            </div>

            ${related.length > 0 ? `
            <!-- Related Posts -->
            <div class="mt-10 pt-8 border-t border-gray-200">
                <h3 class="text-xl font-bold mb-6 text-gray-900">Related Articles</h3>
                <div class="grid grid-cols-1 sm:grid-cols-${Math.min(related.length, 3)} gap-4">
                    ${related.map(rp => {
                        const rc = getColor(rp.badgeColor);
                        return `
                        <div class="bg-gray-50 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition group" onclick="openPost(${rp.id})">
                            <img src="${rp.image}" alt="${rp.title}" class="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300">
                            <div class="p-4">
                                <h4 class="font-bold text-sm text-gray-900 group-hover:text-indigo-600 transition mb-1">${rp.title}</h4>
                                <p class="text-xs text-gray-400">${rp.date}</p>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </div>` : ''}
        </div>
    </div>`;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closePost() {
    const modal = document.getElementById('post-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// ---- CATEGORY FILTERING ----
function filterByCategory(categoryId) {
    currentCategory = categoryId;
    renderCategories();
    renderRecent();
    scrollToSection('recent');
}

// ---- UTILS ----
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

// ---- SCROLL ANIMATIONS ----
function setupScrollAnimations() {
    // Only animate sections below the fold
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('section').forEach(section => {
        // Skip hero section — it's always visible
        if (section.id === 'home') return;
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(section);
    });

    // Fallback: ensure all sections become visible after a short delay
    setTimeout(() => {
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('animate-in');
            section.style.opacity = '';
            section.style.transform = '';
        });
    }, 1000);
}

// ---- MOBILE MENU ----
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// ---- MODAL KEYBOARD HANDLER ----
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePost();
});

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    loadData();
});

// Make animate-in work
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);