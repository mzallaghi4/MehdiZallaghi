document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header and Scroll Effect ---
    const header = document.querySelector('.site-header');
    const heroSection = document.getElementById('hero'); // Assuming your hero section has id="hero"

    // Function to add/remove 'scrolled' class based on scroll position
    const handleScroll = () => {
        // Get the bottom position of the hero section
        const heroBottom = heroSection ? heroSection.getBoundingClientRect().bottom : 0;

        // Add 'scrolled' class if past the hero section or a certain offset
        if (window.scrollY > heroBottom || window.scrollY > 100) { // Use heroBottom or a fixed pixel value
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Also call it on load in case the page is loaded already scrolled down
    handleScroll();


    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            siteNav.classList.toggle('active');
            // Optional: Toggle aria-expanded for accessibility
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close the menu when a link is clicked (for smooth scrolling)
        siteNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Delay closing slightly to allow smooth scroll to start
                setTimeout(() => {
                     siteNav.classList.remove('active');
                     menuToggle.setAttribute('aria-expanded', 'false');
                }, 300); // Adjust delay if needed
            });
        });
    }


    // --- Smooth Scrolling (Optional - CSS scroll-behavior: smooth is simpler but JS offers more control & fallback) ---
    // Using JavaScript for smooth scrolling, accounting for sticky header height
     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get the height of the fixed header
                const headerHeight = header.offsetHeight;

                // Calculate the position to scroll to, accounting for the header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerHeight;

                // Check if target is the hero section (scroll to top)
                 // Adjust if the hero section starts exactly at the top and doesn't need header offset
                 const scrollToY = (targetId === '#hero') ? 0 : offsetPosition;


                window.scrollTo({
                    top: scrollToY,
                    behavior: 'smooth' // Use smooth scrolling
                });

                // Optional: Update URL hash after scrolling (less jarring than default)
                // window.history.pushState(null, null, targetId);
            }
        });
    });


    // --- Dynamic Year in Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    // --- Fade-in Sections (Assuming you had existing JS for this) ---
    // If you had JS for fade-in sections, make sure it's here or integrate
    // A simple example:
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once it's visible
                // observer.unobserve(entry.target);
            } else {
                 // Optional: Remove the class if you want the fade effect to reset on scroll up
                 // entry.target.classList.remove('is-visible');
            }
        });
    }, options);

    fadeInSections.forEach(section => {
        observer.observe(section);
    });

    // You'll need CSS for .fade-in-section and .fade-in-section.is-visible
    // Example CSS (add this to your style.css):
    /*
    .fade-in-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-section.is-visible {
        opacity: 1;
        transform: translateY(0);
    }
    */

});
