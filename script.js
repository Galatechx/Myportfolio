/**
 * View Router and Mobile Interface Controller
 */

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

// Mobile Menu Event Handler
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

function switchPage(targetPageId) {
    const pages = document.querySelectorAll('.page-view');
    const navItems = document.querySelectorAll('.nav-item');
    
    pages.forEach(page => {
        if (page.id === targetPageId) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });

    navItems.forEach(item => {
        const itemHref = item.getAttribute('href').replace('#', '');
        if (itemHref === targetPageId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Close mobile side menu if navigation link selection occurs
    if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
}

// Deep linking router mapping initialization
window.addEventListener('DOMContentLoaded', () => {
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash) {
        const potentialPage = document.getElementById(currentHash);
        if (potentialPage && potentialPage.classList.contains('page-view')) {
            switchPage(currentHash);
            return;
        }
    }
    switchPage('home');
});

window.addEventListener('hashchange', () => {
    const activeHash = window.location.hash.replace('#', '');
    if (activeHash) {
        switchPage(activeHash);
    }
});
