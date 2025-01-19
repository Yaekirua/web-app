// Dynamic navigation
function navigateTo(page) {
    window.location.href = page;
}

// Header hide/reappear on scroll and shrink effect
let lastScrollY = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Hide header on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('hidden');
    } else if (currentScrollY < lastScrollY) {
        header.classList.remove('hidden');
    }

    // Add 'scrolled' class to shrink header after scrolling down
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');

    if (body.classList.contains('light-theme')) {
        body.style.backgroundColor = '#f8f9fa';
        body.style.color = '#121212';
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light'); // Save theme preference
    } else {
        body.style.backgroundColor = '#121212';
        body.style.color = '#fff';
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark'); // Save theme preference
    }
});

// Preserve Theme Preference on Reload
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        body.style.backgroundColor = '#f8f9fa';
        body.style.color = '#121212';
        themeToggle.querySelector('i').classList.add('fa-sun');
        themeToggle.querySelector('i').classList.remove('fa-moon');
    } else {
        body.classList.remove('light-theme');
        body.style.backgroundColor = '#121212';
        body.style.color = '#fff';
        themeToggle.querySelector('i').classList.add('fa-moon');
        themeToggle.querySelector('i').classList.remove('fa-sun');
    }

    // Start the typing effect when DOM is ready
    typeEffect();
});

// Typing Effect for Hero Section
const textElement = document.querySelector('.hero h2'); // Target the element
const texts = ["Stay Informed, Stay Safe", "Protect Yourself from Phishing", "Awareness is the Key to Safety"]; // Texts to cycle through
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        // Remove a character
        charIndex--;
    } else {
        // Add a character
        charIndex++;
    }

    // Update the text content
    textElement.textContent = currentText.slice(0, charIndex);

    // Determine the typing speed
    let typingSpeed = isDeleting ? 100 : 200;

    // If word is fully typed
    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 1500; // Pause before deleting
        isDeleting = true;
    }
    // If word is fully deleted
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length; // Move to the next text
    }

    // Call the function again after a delay
    setTimeout(typeEffect, typingSpeed);
}
