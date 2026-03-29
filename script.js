document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Logic
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.transform = 'translateY(-100%)';
        }, 1500);
    });

    // 2. Scroll Reveal Observer
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));

    // 3. Navbar Sticky Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Cart State Management
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartUI() {
        const counts = document.querySelectorAll('.cart-count, .count');
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        counts.forEach(el => el.textContent = total);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    window.addToCart = function(id, title, price, img) {
        const exist = cart.find(i => i.id === id);
        if (exist) {
            exist.quantity += 1;
        } else {
            cart.push({ id, title, price, image: img, quantity: 1 });
        }
        updateCartUI();
        
        // Elite Feedback
        const target = event.target;
        const original = target.innerHTML;
        target.innerHTML = 'SHOPPED';
        target.style.background = '#000';
        
        setTimeout(() => {
            target.innerHTML = original;
            target.style.background = '';
        }, 2000);
    };

    // 5. Content Security
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
        if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || (e.ctrlKey && e.keyCode === 85)) {
            e.preventDefault();
        }
    });

    updateCartUI();
});
