/* =========================================================
   Personal Portfolio - JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("mainNavbar");
    const backToTop = document.getElementById("backToTop");
    const navCollapse = document.getElementById("navbarContent");
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    const revealElements = document.querySelectorAll(".reveal");
    const typingText = document.getElementById("typingText");
    const currentYear = document.getElementById("currentYear");
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    /* Current year */
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* Navbar + back-to-top state */
    const updateScrollUI = () => {
        const scrolled = window.scrollY > 50;

        navbar.classList.toggle("scrolled", scrolled);
        backToTop.classList.toggle("show", window.scrollY > 500);
    };

    window.addEventListener("scroll", updateScrollUI, { passive: true });
    updateScrollUI();

    /* Smooth scrolling for internal links */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                event.preventDefault();
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });

                if (navCollapse.classList.contains("show")) {
                    bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
                }
            }
        });
    });

    /* Scroll reveal */
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    /* Typing effect */
    const words = ["Web Developer", "Front-End Developer", "UI Developer"];
    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const typeEffect = () => {
        if (!typingText) return;

        const currentWord = words[wordIndex];

        if (!deleting) {
            typingText.textContent = currentWord.slice(0, characterIndex + 1);
            characterIndex++;

            if (characterIndex === currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }
        } else {
            typingText.textContent = currentWord.slice(0, characterIndex - 1);
            characterIndex--;

            if (characterIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, deleting ? 55 : 90);
    };

    typeEffect();

    /* Back-to-top */
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* Contact form validation */
    const setFieldError = (field, message) => {
        const errorElement = field.parentElement.querySelector(".error-message");
        field.classList.toggle("is-invalid", Boolean(message));

        if (errorElement) {
            errorElement.textContent = message;
        }
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");

        let valid = true;

        if (name.value.trim().length < 2) {
            setFieldError(name, "Please enter your name.");
            valid = false;
        } else {
            setFieldError(name, "");
        }

        if (!isValidEmail(email.value.trim())) {
            setFieldError(email, "Please enter a valid email.");
            valid = false;
        } else {
            setFieldError(email, "");
        }

        if (subject.value.trim().length < 3) {
            setFieldError(subject, "Please enter a subject.");
            valid = false;
        } else {
            setFieldError(subject, "");
        }

        if (message.value.trim().length < 10) {
            setFieldError(message, "Message should be at least 10 characters.");
            valid = false;
        } else {
            setFieldError(message, "");
        }

        if (!valid) {
            formStatus.textContent = "Please correct the highlighted fields.";
            formStatus.style.color = "#ff8d9b";
            return;
        }

        /*
         * Front-end demo:
         * This validates the form but does not send email.
         * Connect Formspree, EmailJS, a PHP backend, or your own API
         * when you want real message delivery.
         */
        formStatus.textContent = "Message validated successfully. Connect a backend/email service to send it.";
        formStatus.style.color = "#16c7a4";
        contactForm.reset();
    });

    /* Remove field errors while typing */
    contactForm.querySelectorAll(".form-control").forEach((field) => {
        field.addEventListener("input", () => {
            setFieldError(field, "");
            formStatus.textContent = "";
        });
    });
});
