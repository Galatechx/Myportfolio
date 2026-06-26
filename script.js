/**
 * Tab/Page Routing Management Engine
 * Handles explicit target views while removing any artificial overhead.
 */
function switchPage(targetPageId) {
    // Collect all valid page segments
    const pages = document.querySelectorAll('.page-view');
    const navItems = document.querySelectorAll('.nav-item');
    
    let targetExists = false;

    pages.forEach(page => {
        if (page.id === targetPageId) {
            page.classList.add('active');
            targetExists = true;
        } else {
            page.classList.remove('active');
        }
    });

    // Sync active state visually inside global navigation links
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href').replace('#', '');
        if (itemHref === targetPageId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Reset view position cleanly to prevent horizontal scrolling artifacting
    window.scrollTo({ top: 0, behavior: 'instant' });
}

// Intercept window location parameters directly to permit direct file hyperlinking
window.addEventListener('DOMContentLoaded', () => {
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash) {
        const potentialPage = document.getElementById(currentHash);
        if (potentialPage && potentialPage.classList.contains('page-view')) {
            switchPage(currentHash);
            return;
        }
    }
    // Fallback assignment to root view
    switchPage('home');
});

// Update runtime view tracking on popstate changes 
window.addEventListener('hashchange', () => {
    const activeHash = window.location.hash.replace('#', '');
    if (activeHash) {
        switchPage(activeHash);
    }
});
