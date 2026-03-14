/**
 * Interactive Functionality for Aadhar Gaur Portfolio - Cinematic V2
 */

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('#navbar');
    const mobileMenuBtn = document.querySelector('#mobile-menu-btn');
    const mobileMenu = document.querySelector('#mobile-menu');
    const bars = [
        document.querySelector('#bar1'),
        document.querySelector('#bar2'),
        document.querySelector('#bar3')
    ];

    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isActive = mobileMenu.classList.toggle('menu-active');
            
            if (isActive) {
                bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
                document.body.style.overflow = 'hidden';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu on link click
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('menu-active');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Scroll Effects
    const handleScroll = () => {
        // Navbar transparency
        if (window.scrollY > 50) {
            navbar.classList.add('py-2', 'bg-slate-950/90', 'shadow-2xl');
            navbar.classList.remove('py-4', 'bg-slate-900/80');
        } else {
            navbar.classList.add('py-4', 'bg-slate-900/80');
            navbar.classList.remove('py-2', 'bg-slate-950/90', 'shadow-2xl');
        }

        // Reveal on scroll
        const revealElements = document.querySelectorAll('.reveal-content');
        const triggerBottom = window.innerHeight * 0.9;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                el.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on init

    // Smooth Scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Interactivity
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner animate-spin"></i> Sending...';
            btn.disabled = true;

            // Simple Success Simulation
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                btn.classList.add('bg-green-600', 'text-white');
                btn.classList.remove('bg-white', 'text-slate-950');
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.remove('bg-green-600', 'text-white');
                    btn.classList.add('bg-white', 'text-slate-950');
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
