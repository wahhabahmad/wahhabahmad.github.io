// Blog rendering from JSON
window.loadBlogs = async function(category = 'all') {
    const container = document.getElementById('blog-grid');
    if (!container) {
        console.error('Blog grid container not found');
        return;
    }
    
    try {
        const response = await fetch('blogs/blogs.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (!data || !data.blogs || !Array.isArray(data.blogs)) {
            throw new Error('Invalid blog data structure');
        }
        
        // Filter by category if specified
        let filteredBlogs = data.blogs;
        if (category !== 'all') {
            const categoryMap = {
                'tutorial': ['Tutorial', 'Tutorials'],
                'pipeline': ['Pipeline'],
                'career': ['Career'],
                'design-philosophy': ['Design Philosophy']
            };
            const matchingCategories = categoryMap[category] || [];
            filteredBlogs = data.blogs.filter(blog => 
                blog.category && matchingCategories.some(cat => 
                    blog.category.toLowerCase().includes(cat.toLowerCase())
                )
            );
        }
        
        console.log('Blogs loaded:', filteredBlogs.length);
        renderBlogs(filteredBlogs);
    } catch (error) {
        console.error('Error loading blogs:', error);
        container.innerHTML = '<div class="text-center p-8"><p class="text-text-main mb-4">Failed to load blogs. Please try again later.</p><button onclick="window.loadBlogs()" class="btn-press px-6 py-3 rounded-2xl bg-primary text-white font-black shadow-game-btn hover:shadow-game-btn-hover transition-all">Retry</button></div>';
    }
}

function renderBlogs(blogs) {
    const container = document.getElementById('blog-grid');
    if (!container) return;
    
    if (!blogs || blogs.length === 0) {
        container.innerHTML = '<p class="text-center text-text-main">No blog posts available yet.</p>';
        return;
    }
    
    // Sort by date (newest first)
    const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Featured blog (first one)
    const featured = sortedBlogs[0];
    const featuredHtml = `
        <a href="${featured.link}" class="group relative bg-white rounded-[2.5rem] border-4 border-slate-100 shadow-game-card hover:-translate-y-2 transition-all duration-300 mb-16 overflow-hidden block cursor-pointer">
            <div class="absolute top-6 left-6 z-20 bg-tertiary text-text-heading px-4 py-1.5 rounded-full text-xs font-black uppercase shadow-md border-2 border-white transform -rotate-2 group-hover:rotate-0 transition-transform">
                Featured Quest
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div class="h-64 md:h-auto min-h-[300px] relative overflow-hidden bg-slate-100 border-b-4 md:border-b-0 md:border-r-4 border-slate-100 flex items-center justify-center">
                    ${featured.coverImage ? `<img src="${featured.coverImage}" alt="${featured.title}" class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" />` : '<div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"><span class="material-symbols-outlined text-4xl text-slate-400">article</span></div>'}
                </div>
                <div class="p-8 md:p-12 flex flex-col justify-center relative">
                    <div class="mb-4 flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-wide">
                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-base">calendar_today</span> ${formatDate(featured.date)}</span>
                        ${featured.readTime ? `<span>•</span><span class="flex items-center gap-1"><span class="material-symbols-outlined text-base">timer</span> ${featured.readTime}</span>` : ''}
                    </div>
                    <h2 class="font-display text-3xl md:text-4xl font-black text-text-heading mb-4 leading-tight group-hover:text-primary transition-colors">
                        ${featured.title}
                    </h2>
                    <p class="text-text-main opacity-80 font-bold leading-relaxed mb-8 text-lg">
                        ${featured.description}
                    </p>
                    <div class="flex items-center justify-between mt-auto">
                        <div class="flex gap-2 flex-wrap">
                            ${featured.tags.map(tag => `<span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-xs font-black uppercase">${tag}</span>`).join('')}
                        </div>
                        <div class="size-12 rounded-full bg-slate-100 group-hover:bg-primary group-hover:text-white text-text-heading flex items-center justify-center transition-colors shadow-sm pointer-events-none">
                            <span class="material-symbols-outlined text-2xl">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    `;
    
    // Regular blog cards
    const regularBlogs = sortedBlogs.slice(1);
    const cardsHtml = regularBlogs.map(blog => `
        <a class="group flex flex-col bg-white rounded-[2rem] shadow-sm hover:shadow-game-card hover:-translate-y-2 transition-all border-4 border-slate-50 overflow-hidden h-full" href="${blog.link}">
            <div class="aspect-[4/3] w-full relative overflow-hidden bg-slate-100 border-b-2 border-slate-100 flex items-center justify-center">
                ${blog.coverImage ? `<img src="${blog.coverImage}" alt="${blog.title}" class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />` : '<div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"><span class="material-symbols-outlined text-4xl text-slate-400">article</span></div>'}
                ${blog.category ? `<div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase ${getCategoryColor(blog.category)} shadow-sm z-10">${blog.category}</div>` : ''}
            </div>
            <div class="p-6 flex flex-col flex-1">
                <div class="mb-3 text-slate-400 text-xs font-bold uppercase tracking-wider">${formatDate(blog.date)}</div>
                <h3 class="font-display text-xl font-black text-text-heading mb-3 leading-snug group-hover:text-primary transition-colors">${blog.title}</h3>
                <p class="text-text-main text-sm font-bold opacity-70 line-clamp-3 mb-6">
                    ${blog.description}
                </p>
                <div class="mt-auto flex items-center text-primary font-black text-sm uppercase tracking-wide group-hover:underline decoration-2 underline-offset-4">
                    Read Article <span class="material-symbols-outlined text-sm ml-1">chevron_right</span>
                </div>
            </div>
        </a>
    `).join('');
    
    container.innerHTML = featuredHtml + '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">' + cardsHtml + '</div>';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getCategoryColor(category) {
    const colors = {
        'Character Art': 'text-secondary',
        'UI/UX': 'text-accent',
        'Performance': 'text-yellow-600',
        'Talks': 'text-primary',
        'Concept Art': 'text-secondary',
        'Career': 'text-accent',
        'Tutorial': 'text-tertiary-hover',
        'Design': 'text-primary',
        'Design Philosophy': 'text-purple-accent',
        'Process': 'text-secondary',
        'Pipeline': 'text-purple-accent',
        'Environment': 'text-secondary'
    };
    return colors[category] || 'text-primary';
}

// Filter functionality
window.filterBlogs = function(category, buttonElement) {
    // Update active button state - reset all buttons to inactive
    const buttons = document.querySelectorAll('.blog-filter-btn');
    buttons.forEach(btn => {
        // Remove active styles
        btn.classList.remove('active', 'bg-primary', 'text-white', 'font-black', 'shadow-game-btn');
        // Ensure inactive styles are present
        btn.classList.add('bg-white', 'text-slate-500', 'font-bold', 'border-b-4', 'border-slate-200');
    });
    
    // Set clicked button as active
    if (buttonElement) {
        // Remove inactive styles
        buttonElement.classList.remove('bg-white', 'text-slate-500', 'font-bold', 'border-b-4', 'border-slate-200');
        // Add active styles (matches the "All Posts" button initial state)
        buttonElement.classList.add('active', 'bg-primary', 'text-white', 'font-black', 'shadow-game-btn');
    }
    
    // Filter and reload blogs
    if (window.loadBlogs) {
        window.loadBlogs(category);
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('blog-grid')) {
            window.loadBlogs('all');
        }
    });
} else {
    // DOM is already loaded
    if (document.getElementById('blog-grid')) {
        window.loadBlogs('all');
    }
}

