/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

// === Dynamic Underline Implementation ===
document.addEventListener('DOMContentLoaded', function () {
    const navMenu = document.querySelector('.nav__menu')
    const navLinks = document.querySelectorAll('.nav__menu a')
    // Create underline element
    let underline = document.createElement('span')
    underline.className = 'nav-underline'
    navMenu.style.position = 'relative'
    navMenu.appendChild(underline)

    function moveUnderline(link) {
        if (!link) {
            underline.style.opacity = '0'
            return
        }
        const menuRect = navMenu.getBoundingClientRect()
        const linkRect = link.getBoundingClientRect()
        underline.style.left = (linkRect.left - menuRect.left) + 'px'
        underline.style.width = linkRect.width + 'px'
        underline.style.opacity = '1'
    }

    function setActive(link) {
        navLinks.forEach(l => l.classList.remove('active'))
        if (link) link.classList.add('active')
        moveUnderline(link)
    }

    // Click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            setActive(this)
            // Smooth scroll
            const href = this.getAttribute('href')
            if (href && href.startsWith('#')) {
                const section = document.querySelector(href)
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    e.preventDefault()
                }
            }
        })
    })

    // IntersectionObserver for scroll
    const sections = document.querySelectorAll('section[id]')
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px', // earlier detection for About
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
        }
        const observer = new IntersectionObserver((entries) => {
            let best = null
            let maxRatio = 0
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                    best = entry
                    maxRatio = entry.intersectionRatio
                }
            })
            if (best) {
                const id = best.target.getAttribute('id')
                const activeLink = document.querySelector('.nav__menu a[href*="' + id + '"]')
                setActive(activeLink)
            }
        }, observerOptions)
        sections.forEach(s => observer.observe(s))

        // Fallback: on scroll, check which section is in view and set underline
        window.addEventListener('scroll', function () {
            let found = false
            sections.forEach(section => {
                const rect = section.getBoundingClientRect()
                if (rect.top <= 80 && rect.bottom > 80 && !found) {
                    const activeLink = document.querySelector('.nav__menu a[href*="' + section.id + '"]')
                    if (activeLink) setActive(activeLink)
                    found = true
                }
            })
        })
    }

    // On resize, reposition underline
    window.addEventListener('resize', function () {
        const active = document.querySelector('.nav__menu a.active')
        moveUnderline(active)
    })

    // On load, set underline to first active or first link
    setTimeout(function () {
        const active = document.querySelector('.nav__menu a.active') || navLinks[0]
        setActive(active)
    }, 100)
})

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})

/*SCROLL HOME*/
sr.reveal('.home__title', {})
sr.reveal('.home__scroll', { delay: 200 })
sr.reveal('.home__img', { origin: 'right', delay: 400 })

/*SCROLL ABOUT*/
/* Removed animation for about__img */
sr.reveal('.about__subtitle', { delay: 300 })
sr.reveal('.about__profession', { delay: 400 })
sr.reveal('.about__text', { delay: 500 })
sr.reveal('.about__social-icon', { delay: 600, interval: 200 })

/*SCROLL SKILLS*/
sr.reveal('.skills__subtitle', {})
sr.reveal('.skills__name', { distance: '20px', delay: 50, interval: 100 })
sr.reveal('.skills__img', { delay: 400 })

/*SCROLL PORTFOLIO*/
sr.reveal('.portfolio__img', { interval: 200 })

/*SCROLL CONTACT*/
sr.reveal('.contact__subtitle', {})
sr.reveal('.contact__text', { interval: 200 })
sr.reveal('.contact__input', { delay: 400 })
sr.reveal('.contact__button', { delay: 600 })



/* Confetti Animation on Send Button Click */

// Confetti Animation on Send Button Click
document.querySelector('.contact__form').addEventListener('submit', function (e) {
    e.preventDefault(); // stop immediate form submission
    const form = this;
    const duration = 1500; // 1.5 seconds
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#5bfcc4', '#f593e4', '#71a4f0']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#5bfcc4', '#f593e4', '#71a4f0']
        });

        if (Date.now() < end) requestAnimationFrame(frame);
    })();

    // Wait 1.5s, then submit the form
    setTimeout(() => form.submit(), duration);
});

// Update all buttons to use class="button" for Uiverse.io style
// Resume buttons
const resumeBtns = document.querySelectorAll('.about__resume-btn')
resumeBtns.forEach(btn => {
    btn.classList.remove('simple-button', 'about__resume-btn', 'send-btn')
    btn.classList.add('button')
})
// Send Message button
const sendBtn = document.getElementById('sendButton')
if (sendBtn) {
    sendBtn.className = 'button'
}

