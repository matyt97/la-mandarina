// Simple scroll effect for navbar
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('shadow-md');
    } else {
        header.classList.remove('shadow-md');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        if (isOpen) {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = '<span class="material-symbols-outlined text-3xl">menu</span>';
        } else {
            mobileMenu.classList.remove('hidden');
            mobileMenuBtn.innerHTML = '<span class="material-symbols-outlined text-3xl">close</span>';
        }
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = '<span class="material-symbols-outlined text-3xl">menu</span>';
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mock reservation submission
const resForm = document.getElementById('reservation-form');
if (resForm) {
    resForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('res-name').value;
        const email = document.getElementById('res-email').value;
        const date = document.getElementById('res-date').value;
        const time = document.getElementById('res-time').value;
        const people = document.getElementById('res-people').value;

        // Custom premium popup
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-5 right-5 z-50 bg-primary text-cream-base px-6 py-4 rounded-xl shadow-2xl border border-secondary/20 flex flex-col gap-1 transition-all transform translate-y-10 opacity-0 duration-300';
        notification.innerHTML = `
            <div class="font-headline-sm text-sm text-secondary font-bold">Reserva Solicitada</div>
            <div class="text-sm">Gracias, ${name}. Hemos registrado tu solicitud para el ${date} a las ${time} para ${people}. Nos pondremos en contacto a ${email}.</div>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.remove('translate-y-10', 'opacity-0');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-y-10', 'opacity-0');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        resForm.reset();
    });
}

// Menu tabs switching logic
const tabButtons = document.querySelectorAll('.menu-tab-btn');
const menuPanels = document.querySelectorAll('.menu-panel');

if (tabButtons && menuPanels) {
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Switch active button styling
            tabButtons.forEach(b => {
                b.classList.remove('active', 'bg-primary', 'text-white', 'shadow-md');
                b.classList.add('bg-surface-container', 'text-on-surface-variant');
            });
            btn.classList.add('active', 'bg-primary', 'text-white', 'shadow-md');
            btn.classList.remove('bg-surface-container', 'text-on-surface-variant');

            // Toggle panels visibility
            menuPanels.forEach(panel => {
                if (panel.id === targetTab) {
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            });
        });
    });
}
