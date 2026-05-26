// Shared Navbar Component
function createNavbar(currentPage = '', basePath = '') {
    const pages = {
        'index': 'index.html',
        'about': 'about.html',
        'portfolio': 'portfolio.html',
        'blog': 'blog.html',
        'contact': 'contact.html'
    };
    
    // Determine base path - if we're in a subdirectory (like blogs/), add ../
    if (!basePath) {
        const path = window.location.pathname;
        if (path.includes('/blogs/')) {
            basePath = '../';
        } else {
            basePath = '';
        }
    }
    
    const getActiveClass = (page) => {
        return currentPage === page ? 'text-primary bg-white shadow-sm' : 'text-text-main hover:bg-white hover:text-primary hover:shadow-sm';
    };
    
    return `
        <div class="fixed top-4 z-50 w-full px-4 md:px-10 lg:px-40 flex justify-center pointer-events-none">
            <header class="pointer-events-auto bg-white/95 backdrop-blur-md border-b-4 border-slate-100 rounded-full px-4 py-2 shadow-game-card flex items-center justify-between gap-4 max-w-[900px] w-full transition-all duration-300">
                <div class="flex items-center gap-2">
                    <a class="flex items-center gap-2 no-underline" href="${basePath}index.html">
                        <img src="${basePath}assets/logo.png" alt="Wahab Ahmad Logo" class="h-12 w-auto object-contain transform -rotate-3 hover:rotate-3 transition-transform"/>
                        <span class="hidden sm:block text-2xl font-display font-black tracking-tight text-text-heading hover:text-primary transition-colors">Wahab <span class="text-primary">Ahmad</span></span>
                    </a>
                </div>
                <nav class="hidden md:flex items-center gap-2 bg-slate-50 p-1.5 rounded-full border border-slate-100">
                    <a class="px-5 py-2 rounded-full text-base font-bold transition-all ${getActiveClass('index')}" href="${basePath}index.html">Home</a>
                    <a class="px-5 py-2 rounded-full text-base font-bold transition-all ${getActiveClass('about')}" href="${basePath}about.html">About</a>
                    <a class="px-5 py-2 rounded-full text-base font-bold transition-all ${getActiveClass('portfolio')}" href="${basePath}portfolio.html">Portfolio</a>
                    <a class="px-5 py-2 rounded-full text-base font-bold transition-all ${getActiveClass('blog')}" href="${basePath}blog.html">Blog</a>
                </nav>
                <a class="btn-press flex items-center justify-center rounded-full h-12 px-6 bg-secondary text-white text-base font-black uppercase tracking-wide shadow-game-btn-secondary hover:shadow-game-btn-secondary-hover hover:translate-y-[2px] transition-all" href="${basePath}assets/Wahab Ahmad CV--.pdf" download>
                    <span class="mr-2">Resume</span>
                    <span class="material-symbols-outlined text-xl">download</span>
                </a>
            </header>
        </div>
    `;
}

// Shared Footer Component
function createFooter(basePath = '') {
    // Determine base path - if we're in a subdirectory (like blogs/), add ../
    if (!basePath) {
        const path = window.location.pathname;
        if (path.includes('/blogs/')) {
            basePath = '../';
        } else {
            basePath = '';
        }
    }
    
    return `
        <footer class="bg-background-dark py-12 relative overflow-hidden">
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div class="layout-container flex flex-col md:flex-row justify-between items-center px-4 md:px-10 lg:px-40 max-w-[1200px] mx-auto gap-8 relative z-10">
                <div class="flex flex-col items-center md:items-start gap-2">
                    <div class="flex items-center gap-3 text-white">
                        <img src="${basePath}assets/logo.png" alt="Wahab Ahmad Logo" class="h-10 w-auto object-contain transform -rotate-6"/>
                        <span class="font-display font-black text-2xl tracking-tight">Wahab <span class="text-primary">Ahmad</span></span>
                    </div>
                    <p class="text-slate-500 text-sm font-bold">Thanks for playing!</p>
                </div>
                <div class="flex gap-4">
                    <a class="size-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-[#0077B5] hover:text-white hover:scale-110 hover:-rotate-6 transition-all border border-white/10" href="https://www.linkedin.com/in/wahhab-/" target="_blank" rel="noopener noreferrer">
                        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                    <a class="size-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-[#FF0000] hover:text-white hover:scale-110 hover:rotate-6 transition-all border border-white/10" href="https://www.youtube.com/@wahabahmad1" target="_blank" rel="noopener noreferrer">
                        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                    </a>
                    <a class="size-12 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-[#13AFF0] hover:text-white hover:scale-110 hover:-rotate-3 transition-all border border-white/10" href="https://www.artstation.com/wahhabahmad" target="_blank" rel="noopener noreferrer">
                        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 22h4l1.6-4h8.8l1.6 4h4L12 2zm-2.4 12L12 6l2.4 8H9.6z"/>
                        </svg>
                    </a>
                </div>
                <div class="text-slate-400 text-sm font-bold text-center md:text-right">
                    © 2023 Wahab Ahmad. <br/> Leveling up since 2013.
                </div>
            </div>
        </footer>
    `;
}

// Initialize components on page load
function initComponents(currentPage = '') {
    // Determine base path
    let basePath = '';
    const path = window.location.pathname;
    if (path.includes('/blogs/')) {
        basePath = '../';
    }
    
    // Inject navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = createNavbar(currentPage, basePath);
    }
    
    // Inject footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = createFooter(basePath);
    }
}

