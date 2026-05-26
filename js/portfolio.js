// Portfolio rendering from JSON
window.loadPortfolio = async function(category = 'all') {
    try {
        const response = await fetch('portfolio/portfolio.json');
        if (!response.ok) throw new Error('Failed to load portfolio');
        
        const data = await response.json();
        
        // Filter by category if specified
        let filteredProjects = data.projects;
        if (category !== 'all') {
            const categoryMap = {
                'games': ['Games', 'Environment', 'Character'],
                'ui': ['UI/UX'],
                '3d': ['3D Art', 'Environment', 'Character', 'Concept Art']
            };
            const matchingCategories = categoryMap[category] || [];
            filteredProjects = data.projects.filter(project => {
                // Check if category matches
                const categoryMatch = project.category && matchingCategories.some(cat => 
                    project.category.toLowerCase().includes(cat.toLowerCase())
                );
                // For UI/UX filter, also check if project has "UI/UX" in tags
                if (category === 'ui') {
                    const tagMatch = project.tags && project.tags.some(tag => 
                        tag.toLowerCase().includes('ui/ux')
                    );
                    return categoryMatch || tagMatch;
                }
                return categoryMatch;
            });
        }
        
        renderPortfolio(filteredProjects, category);
    } catch (error) {
        console.error('Error loading portfolio:', error);
        const container = document.getElementById('portfolio-grid');
        if (container) {
            container.innerHTML = '<p class="text-center text-text-main">Failed to load portfolio. Please try again later.</p>';
        }
    }
}

function renderPortfolio(projects, category = 'all') {
    const container = document.getElementById('portfolio-grid');
    if (!container) return;
    
    if (!projects || projects.length === 0) {
        let emptyMessage = 'No portfolio projects available yet.';
        if (category === 'ui') {
            emptyMessage = 'Portfolio not added yet. My work exists, but so does digital chaos.';
        }
        container.innerHTML = `<p class="text-center text-text-main">${emptyMessage}</p>`;
        return;
    }
    
    // Special layout for 3D Art category - grid of images with hover zoom and title reveal
    if (category === '3d') {
        const projectsHtml = projects.map((project) => {
            const thumbnail = project.thumbnail || '';
            return `
                <div class="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square bg-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    ${thumbnail ? `
                        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110" style="background-image: url('${thumbnail}');"></div>
                    ` : `
                        <div class="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                            <span class="material-symbols-outlined text-6xl text-slate-500">image</span>
                        </div>
                    `}
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div class="absolute inset-0 flex items-end p-4 md:p-6">
                        <div class="w-full transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                            <h3 class="font-display text-white text-xl md:text-2xl font-black drop-shadow-2xl">${project.title}</h3>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        container.innerHTML = `<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">${projectsHtml}</div>`;
        return;
    }
    
    const projectsHtml = projects.map((project, index) => {
        // Check if this is the last game in the games category
        const isLastGame = index === projects.length - 1;
        const isLarge = index === 0; // First project is large
        const colSpan = isLarge ? 'md:col-span-2 lg:col-span-3' : '';
        const flexDirection = isLarge ? 'md:flex-row' : '';
        
        return `
            <div class="group ${colSpan} bg-white rounded-[2rem] overflow-hidden shadow-game-card hover:-translate-y-2 transition-transform duration-300 border-4 border-slate-50 flex flex-col ${flexDirection} cursor-pointer relative">
                ${project.featured ? `<div class="absolute top-4 right-4 z-20 bg-white p-2 rounded-full shadow-md transform rotate-12 group-hover:rotate-0 transition-all duration-300">
                    <span class="material-symbols-outlined text-secondary text-2xl">favorite</span>
                </div>` : ''}
                <div class="${isLarge ? 'h-64 md:h-auto md:w-1/2' : 'h-56'} w-full relative overflow-hidden m-2 rounded-[1.5rem] border-2 border-black/5">
                    ${project.videoEmbed ? `
                        <div class="absolute inset-0">
                            <iframe class="w-full h-full" src="${project.videoEmbed}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    ` : `
                        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style="background-image: url('${project.thumbnail}');"></div>
                    `}
                    ${project.category ? `<div class="absolute top-4 left-4 bg-black/60 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase">${project.category}</div>` : ''}
                    ${['Golf Blitz', 'Bus Mania - Car Parking Jam', 'Water Mania', 'Water Jam Sort Puzzle', 'Stone Miner', 'Junkyard Keeper', 'Gameworld Master', 'CardaStation Metaverse Project', 'Queen Bee!', 'Ball Pals', 'IdleTower Rush'].includes(project.title) ? `
                        <div class="absolute bottom-4 right-4 z-20 bg-black/50 p-2 rounded-full">
                            <span class="material-symbols-outlined text-white text-xl">star</span>
                        </div>
                    ` : ''}
                </div>
                <div class="p-${isLarge ? '8' : '6'} ${isLarge ? 'md:w-1/2' : ''} flex flex-col ${isLarge ? 'justify-center' : 'flex-1'}">
                    <h3 class="font-display text-${isLarge ? '4xl' : '2xl'} font-black text-text-heading mb-${isLarge ? '4' : '2'} group-hover:text-primary transition-colors">${project.title}</h3>
                    <p class="text-text-main font-bold opacity-70 leading-relaxed mb-6 ${isLarge ? 'text-lg' : 'text-sm'}">${project.description}</p>
                    ${project.tags && project.tags.length > 0 ? `
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${project.tags.map(tag => `<div class="px-3 py-1 rounded-lg bg-orange-100 text-orange-600 text-xs font-black uppercase">${tag}</div>`).join('')}
                        </div>
                    ` : ''}
                    ${project.notPublished || project.notReleased ? `
                        <div class="mt-auto flex gap-3 ${isLarge ? '' : 'flex-col'}">
                            ${project.videoLink ? `
                                <a href="${project.videoLink}" ${project.videoLink.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} class="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-purple-accent text-white font-black text-sm uppercase shadow-game-btn-purple hover:translate-y-1 hover:shadow-game-btn-purple-hover transition-all">
                                    <span class="material-symbols-outlined text-lg">play_circle</span>
                                    <span>Video</span>
                                </a>
                            ` : ''}
                            <div class="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-grey-accent text-white font-black text-sm uppercase shadow-game-btn-grey cursor-not-allowed">
                                <span>${project.notReleased ? 'Not Released Yet' : 'Not Published Yet'}</span>
                            </div>
                        </div>
                    ` : (project.iosLink || project.androidLink || project.videoLink || project.websiteLink) ? `
                        <div class="mt-auto flex gap-3 ${isLarge ? '' : 'flex-col'}">
                            ${project.iosLink ? `
                                <a href="${project.iosLink}" target="_blank" rel="noopener noreferrer" class="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-primary text-white font-black text-sm uppercase shadow-game-btn hover:translate-y-1 hover:shadow-game-btn-hover transition-all">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                                    </svg>
                                    <span>iOS</span>
                                </a>
                            ` : ''}
                            ${project.androidLink ? `
                                <a href="${project.androidLink}" target="_blank" rel="noopener noreferrer" class="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-secondary text-white font-black text-sm uppercase shadow-game-btn-secondary hover:translate-y-1 hover:shadow-game-btn-secondary-hover transition-all">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                                    </svg>
                                    <span>Android</span>
                                </a>
                            ` : ''}
                            ${project.videoLink ? `
                                <a href="${project.videoLink}" ${project.videoLink.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} class="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-purple-accent text-white font-black text-sm uppercase shadow-game-btn-purple hover:translate-y-1 hover:shadow-game-btn-purple-hover transition-all">
                                    <span class="material-symbols-outlined text-lg">play_circle</span>
                                    <span>Video</span>
                                </a>
                            ` : ''}
                            ${project.websiteLink ? `
                                <a href="${project.websiteLink}" target="_blank" rel="noopener noreferrer" class="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-green-accent text-white font-black text-sm uppercase shadow-game-btn-green hover:translate-y-1 hover:shadow-game-btn-green-hover transition-all">
                                    <span class="material-symbols-outlined text-lg">language</span>
                                    <span>Website</span>
                                </a>
                            ` : ''}
                        </div>
                    ` : project.link ? `
                        <a href="${project.link}" class="mt-auto ${isLarge ? '' : 'w-full'} py-2 rounded-xl bg-slate-100 text-slate-500 font-black text-xs uppercase hover:bg-tertiary hover:text-text-heading transition-colors text-center">
                            View Details
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    // Add funny message if filtering by games category
    let funnyMessage = '';
    if (category === 'games' || (category === 'all' && projects.some(p => p.category === 'Games'))) {
        const gamesOnly = projects.filter(p => p.category === 'Games');
        if (gamesOnly.length > 0) {
            funnyMessage = `
                <div class="col-span-full text-center py-12 px-4">
                    <p class="text-text-main text-lg font-bold opacity-70 italic">
                        More games coming soon… my hard drive is currently locked behind a side quest.
                    </p>
                </div>
            `;
        }
    }
    
    container.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${projectsHtml}${funnyMessage}</div>`;
}

// Filter functionality
window.filterPortfolio = function(category, buttonElement) {
    // Update active button state - reset all buttons to inactive
    const buttons = document.querySelectorAll('.portfolio-filter-btn');
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
        // Add active styles (matches the "All" button initial state)
        buttonElement.classList.add('active', 'bg-primary', 'text-white', 'font-black', 'shadow-game-btn');
    }
    
    // Filter the portfolio
    window.loadPortfolio(category);
}

// Filter functionality for home page
window.filterPortfolioHome = function(category, buttonElement) {
    // Update active button state - reset all buttons to inactive
    const buttons = document.querySelectorAll('.portfolio-filter-btn');
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
        // Add active styles (matches the "All" button initial state)
        buttonElement.classList.add('active', 'bg-primary', 'text-white', 'font-black', 'shadow-game-btn');
    }
    
    // Filter the portfolio preview on home page
    if (window.loadPortfolioPreview) {
        window.loadPortfolioPreview(category);
    }
}

// Initialize on page load
if (document.getElementById('portfolio-grid')) {
    window.loadPortfolio();
}

