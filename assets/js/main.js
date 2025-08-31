/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        const sel = '.nav__menu a[href*="' + sectionId + '"]'
        const link = document.querySelector(sel)
        if(!link) return
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            link.classList.add('active-link')
        }else{
            link.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SMOOTH SCROLLING ===============*/
const links = document.querySelectorAll('a[href^="#"]')

for (const link of links) {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href') || ''
        // If href is just '#', smoothly scroll to top and return
        if (href === '#' || href.length === 1) {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }
        const target = document.querySelector(href)
        if (!target) return // Allow default if target not found
        e.preventDefault()
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({ top: offsetTop - 70, behavior: 'smooth' })
    })
}

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form'),
      contactName = document.getElementById('contact-name'),
      contactEmail = document.getElementById('contact-email'),
      contactSubject = document.getElementById('contact-subject'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
    e.preventDefault()
    
    // Check if the field has a value
    if(contactName.value === '' || contactEmail.value === '' || contactSubject.value === '' || contactMessage.value === ''){
        // Add and remove color
        contactForm.classList.remove('color-green')
        contactForm.classList.add('color-red')
        
        // Show message
        setTimeout(() => {
            contactForm.classList.remove('color-red')
        }, 3000)
    } else {
        // Create mailto link
        const subject = encodeURIComponent(contactSubject.value)
        const body = encodeURIComponent(`Name: ${contactName.value}\nEmail: ${contactEmail.value}\n\nMessage:\n${contactMessage.value}`)
        const mailtoLink = `mailto:adultchairuser@gmail.com?subject=${subject}&body=${body}`
        
        // Open email client
        window.location.href = mailtoLink
        
        // Add color during sending
        contactForm.classList.add('color-green')
        
        // Remove message after three seconds
        setTimeout(() => {
            contactForm.classList.remove('color-green')
        }, 3000)
        
        // Clear input fields
        contactName.value = ''
        contactEmail.value = ''
        contactSubject.value = ''
        contactMessage.value = ''
    }
}

if (contactForm) contactForm.addEventListener('submit', sendEmail)

/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
      distance: '60px',
      duration: 2500,
      delay: 400,
      // reset: true
  })
  sr.reveal('.hero__content, .section__title', {delay: 600})
  sr.reveal('.hero__image', {delay: 700, origin: 'top'})
  sr.reveal('.about__content, .contact__content', {origin: 'left'})
  sr.reveal('.about__image, .contact__form', {origin: 'right'})
  sr.reveal('.resource__card, .story__card, .gallery__item', {interval: 100})
  sr.reveal('.footer__content', {interval: 100, origin: 'bottom'})
}

/*=============== ACCESSIBILITY IMPROVEMENTS ===============*/
// Add focus management for mobile menu
document.addEventListener('DOMContentLoaded', function() {
    // Trap focus in mobile menu when open
    const navMenu = document.getElementById('nav-menu')
    const navToggle = document.getElementById('nav-toggle')
    const navClose = document.getElementById('nav-close')
    const navLinks = document.querySelectorAll('.nav__link')
    
    // Focus management
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            setTimeout(() => {
                if (navClose) navClose.focus()
            }, 100)
        })
    }
    
    // Keyboard navigation for mobile menu
    if (navMenu) {
        navMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navMenu.classList.remove('show-menu')
                if (navToggle) navToggle.focus()
            }
        })
    }
    
    // Add current year to footer if element exists
    const currentYearElement = document.getElementById('current-year')
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear()
    }
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]')
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target
                img.src = img.dataset.src
                img.classList.remove('lazy')
                imageObserver.unobserve(img)
            }
        })
    })
    
    images.forEach(img => imageObserver.observe(img))
    
    // Add loading states for form submission
    const forms = document.querySelectorAll('form')
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitButton = form.querySelector('button[type="submit"]')
            if (submitButton) {
                submitButton.disabled = true
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
                
                setTimeout(() => {
                    submitButton.disabled = false
                    submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message'
                }, 3000)
            }
        })
    })
})

/*=============== TREATMENT CARD INTERACTIONS ===============*/
document.addEventListener('DOMContentLoaded', function() {
    const treatmentCards = document.querySelectorAll('.treatment__card')
    
    treatmentCards.forEach(card => {
        const details = card.querySelector('.treatment__details')
        if (details) {
            // Add toggle functionality for mobile
            const title = card.querySelector('.resource__title')
            if (title && window.innerWidth <= 768) {
                title.style.cursor = 'pointer'
                title.addEventListener('click', () => {
                    details.style.display = details.style.display === 'none' ? 'block' : 'none'
                })
            }
        }
    })
})

/*=============== ENHANCED FORM VALIDATION ===============*/
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

function showFormMessage(form, message, isError = false) {
    // Remove existing message
    const existingMessage = form.querySelector('.form-message')
    if (existingMessage) {
        existingMessage.remove()
    }
    
    // Create new message
    const messageDiv = document.createElement('div')
    messageDiv.className = `form-message ${isError ? 'form-message--error' : 'form-message--success'}`
    messageDiv.textContent = message
    
    // Add styles
    messageDiv.style.padding = '1rem'
    messageDiv.style.borderRadius = '0.5rem'
    messageDiv.style.marginTop = '1rem'
    messageDiv.style.textAlign = 'center'
    messageDiv.style.backgroundColor = isError ? '#dc3545' : '#28a745'
    messageDiv.style.color = '#fff'
    
    form.appendChild(messageDiv)
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.remove()
    }, 5000)
}

// Enhanced contact form validation
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault()
        
        const name = contactName.value.trim()
        const email = contactEmail.value.trim()
        const subject = contactSubject.value.trim()
        const message = contactMessage.value.trim()
        
        // Validation
        if (!name) {
            showFormMessage(this, 'Please enter your name.', true)
            contactName.focus()
            return
        }
        
        if (!email) {
            showFormMessage(this, 'Please enter your email address.', true)
            contactEmail.focus()
            return
        }
        
        if (!validateEmail(email)) {
            showFormMessage(this, 'Please enter a valid email address.', true)
            contactEmail.focus()
            return
        }
        
        if (!subject) {
            showFormMessage(this, 'Please enter a subject.', true)
            contactSubject.focus()
            return
        }
        
        if (!message) {
            showFormMessage(this, 'Please enter your message.', true)
            contactMessage.focus()
            return
        }
        
        // If all validation passes, proceed with email
        const emailSubject = encodeURIComponent(subject)
        const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
        const mailtoLink = `mailto:adultchairuser@gmail.com?subject=${emailSubject}&body=${emailBody}`
        
        window.location.href = mailtoLink
        
        showFormMessage(this, 'Email client opened! Please send the email from your email application.', false)
        
        // Clear form
        this.reset()
    })
}
