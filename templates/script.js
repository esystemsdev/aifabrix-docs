// Global site data - will be populated by build script
let siteData = {
    site: {
        title: "AI Fabrix Documentation",
        subtitle: "Enterprise AI platform with Azure-native ISO27k compliance",
        lastUpdated: new Date().toISOString().split('T')[0],
        repository: "esystemsdev/aifabrix-docs",
        commit: "latest"
    },
    navigation: {
        "getting-started": { title: "Getting Started", items: [] },
        "background": { title: "Platform Overview", items: [] },
        "architecture": { title: "Architecture", items: [] },
        "user-guides": { title: "User Guides", items: [] },
        "api": { title: "API Documentation", items: [] }
    },
    files: {
        docs: [],
        repository: []
    }
};

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function filterContent(searchTerm) {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.nav-section');
    
    navLinks.forEach(link => {
        const text = link.textContent.toLowerCase();
        const parent = link.closest('.nav-list');
        const section = parent.previousElementSibling;
        
        if (text.includes(searchTerm.toLowerCase()) || searchTerm === '') {
            link.style.display = 'block';
            parent.style.display = 'block';
            if (section) section.style.display = 'block';
        } else {
            link.style.display = 'none';
            const visibleLinks = parent.querySelectorAll('.nav-link[style*="block"], .nav-link:not([style*="none"])');
            if (visibleLinks.length === 0) {
                parent.style.display = 'none';
                if (section) section.style.display = 'none';
            }
        }
    });
}

function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

function generateNavigationHTML() {
    const sidebarNav = document.getElementById('sidebar-nav');
    if (!sidebarNav) return;
    
    let navHTML = '';
    
    Object.entries(siteData.navigation).forEach(([key, section]) => {
        if (section.items && section.items.length > 0) {
            navHTML += `
                <div class="nav-section">
                    <div class="nav-section-title">${section.title}</div>
                    <ul class="nav-list">
                        ${section.items.map(item => `
                            <li class="nav-item">
                                <a href="${item.path}" class="nav-link">${item.title}</a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }
    });
    
    sidebarNav.innerHTML = navHTML;
}

function generateFileGridHTML() {
    const docsGrid = document.getElementById('docs-grid');
    const repoGrid = document.getElementById('repo-grid');
    
    if (docsGrid && siteData.files.docs) {
        docsGrid.innerHTML = siteData.files.docs.map(file => `
            <div class="file-card">
                <div class="file-title">
                    <a href="${file.path}" class="file-link">${file.title}</a>
                </div>
                <div class="file-path">${file.path}</div>
            </div>
        `).join('');
    }
    
    if (repoGrid && siteData.files.repository) {
        repoGrid.innerHTML = siteData.files.repository.map(file => `
            <div class="file-card">
                <div class="file-title">
                    <a href="${file.path}" class="file-link">${file.title}</a>
                </div>
                <div class="file-path">${file.path}</div>
            </div>
        `).join('');
    }
}

function updatePageInfo() {
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');
    const footerLastUpdated = document.getElementById('footer-last-updated');
    
    if (pageTitle) pageTitle.textContent = siteData.site.title;
    if (pageSubtitle) pageSubtitle.textContent = siteData.site.subtitle;
    if (footerLastUpdated) footerLastUpdated.textContent = siteData.site.lastUpdated;
}

function loadSiteData() {
    // Try to load site data from JSON file
    fetch('site-data.json')
        .then(response => response.json())
        .then(data => {
            siteData = { ...siteData, ...data };
            initializeSite();
        })
        .catch(error => {
            console.warn('Could not load site-data.json, using default data:', error);
            initializeSite();
        });
}

function initializeSite() {
    generateNavigationHTML();
    generateFileGridHTML();
    updatePageInfo();
    highlightCurrentPage();
}

document.addEventListener('DOMContentLoaded', function() {
    loadSiteData();
    
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !document.getElementById('sidebar').contains(e.target) &&
            !e.target.classList.contains('mobile-menu-btn')) {
            document.getElementById('sidebar').classList.remove('open');
        }
    });
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.getElementById('sidebar').classList.remove('open');
    }
});
