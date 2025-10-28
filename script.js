// Fixed JavaScript for section highlighting and dark mode
window.onscroll = () => {
    let header = document.querySelector(".header");
    header.classList.toggle("sticky", window.scrollY > 100);
};

/* Menu icon navbar */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* Improved scroll sections active link */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if(top >= offset && top < offset + height) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section link
            // Using attribute selector for more reliable targeting
            let currentLink = document.querySelector(`header nav a[href="#${id}"]`);
            if (currentLink) {
                currentLink.classList.add('active');
            }
        }
    });
    
    /* Sticky navbar */
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
    
    /* Remove menu icon navbar when click navbar link (scroll) */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* Dark/light mode */
let darkModeIcon = document.querySelector('#darkMode-icon');

// Check if dark mode was previously enabled
if(localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.add('bx-sun');
}

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if(document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
};

/* Scroll reveal */
ScrollReveal({ 
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .projects-box, .certifications-container, .experience-container, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
