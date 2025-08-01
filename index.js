$(document).ready(function() {
    // Preloader
    const preloader = $('#preloader');
    const progress = $('#progress');
    const percentage = $('#percentage');

    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.css('opacity', '0');
                setTimeout(() => {
                    preloader.css('display', 'none');
                }, 500);
            }, 500);
        } else {
            width++;
            progress.css('width', width + '%');
            percentage.text(width + '%');
        }
    }, 10);

    // Mobile Navigation
    const hamburger = $('#hamburger');
    const navLinks = $('#navLinks');
    const navItems = $('.nav-link');

    hamburger.on('click', () => {
        navLinks.toggleClass('active');
        hamburger.toggleClass('active');
        $('body').css('overflow', navLinks.hasClass('active') ? 'hidden' : '');
    });

    // Close mobile menu when clicking a link
    navItems.on('click', () => {
        navLinks.removeClass('active');
        hamburger.removeClass('active');
        $('body').css('overflow', '');
    });

    // Update active nav link on scroll
    const sections = $('section');
    const navLi = $('nav ul li');

    $(window).on('scroll', () => {
        let current = '';
        sections.each(function() {
            const sectionTop = $(this).offset().top;
            const sectionHeight = $(this).outerHeight();
            if ($(window).scrollTop() >= sectionTop - 100) {
                current = $(this).attr('id');
            }
        });

        navLi.each(function() {
            $(this).find('a').removeClass('active');
            if ($(this).find('a').attr('href') === `#${current}`) {
                $(this).find('a').addClass('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        const targetId = $(this).attr('href');
        if (targetId === '#') return;

        const targetElement = $(targetId);
        if (targetElement.length) {
            $('html, body').animate({
                scrollTop: targetElement.offset().top - 80
            }, 1000);
        }
    });

    // Back to top button
    const backToTopButton = $('#backToTop');

    $(window).on('scroll', () => {
        if ($(window).scrollTop() > 300) {
            backToTopButton.addClass('active');
        } else {
            backToTopButton.removeClass('active');
        }
    });

    // Theme toggle
    const themeToggle = $('#themeToggle');
    const themeIcon = themeToggle.find('i');

    themeToggle.on('click', () => {
        $('body').toggleClass('light-mode dark-mode');

        if ($('body').hasClass('light-mode')) {
            themeIcon.removeClass('fa-sun').addClass('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.removeClass('fa-moon').addClass('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        $('body').removeClass('dark-mode').addClass('light-mode');
        themeIcon.removeClass('fa-sun').addClass('fa-moon');
    }

    // Typed text effect
    const typedText = $('#typed-text');
    const cursor = $('#cursor');
    const textArray = ["Java Developer", "Backend Specialist", "Problem Solver", "Tech Enthusiast"];
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textArrayIndex];
        if (isDeleting) {
            typedText.text(currentText.substring(0, charIndex - 1));
            charIndex--;
        } else {
            typedText.text(currentText.substring(0, charIndex + 1));
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    setTimeout(type, 500);

    // Scroll down button
    const scrollDown = $('#scrollDown');

    scrollDown.on('click', () => {
        const nextSection = $('#about');
        $('html, body').animate({
            scrollTop: nextSection.offset().top - 80
        }, 1000);
    });

    // Animate on scroll
    function animateOnScroll() {
        const elements = $('.timeline-item, .project-card, .education-item, .certification-card');

        elements.each(function(index) {
            const elementPosition = $(this).offset().top;
            const windowHeight = $(window).height();

            if ($(window).scrollTop() + windowHeight - 100 > elementPosition) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                }).addClass('visible');

                // For project cards and certification cards
                if ($(this).hasClass('project-card') || $(this).hasClass('certification-card')) {
                    $(this).css('--index', index);
                }
            }
        });
    }

    // Initial check
    animateOnScroll();

    // Check on scroll
    $(window).on('scroll', () => {
        animateOnScroll();

        // Animate skill progress bars when they come into view
        const skillBars = $('.skill-progress');
        skillBars.each(function() {
            const barPosition = $(this).offset().top;
            const windowHeight = $(window).height();

            if ($(window).scrollTop() + windowHeight - 100 > barPosition) {
                const width = $(this).parent().siblings('.skill-level').text();
                let widthValue;

                switch(width) {
                    case 'Expert':
                        widthValue = '90%';
                        break;
                    case 'Advanced':
                        widthValue = '75%';
                        break;
                    case 'Intermediate':
                        widthValue = '60%';
                        break;
                    case 'Basic':
                        widthValue = '45%';
                        break;
                    default:
                        widthValue = '0%';
                }

                $(this).css('width', widthValue);
            }
        });

        // Animate stats when they come into view
        const statValues = $('.stat-value');
        statValues.each(function() {
            const statPosition = $(this).offset().top;
            const windowHeight = $(window).height();

            if ($(window).scrollTop() + windowHeight - 100 > statPosition) {
                const countTo = $(this).attr('data-count');
                const $this = $(this);

                $({ countNum: $this.text() }).animate(
                    { countNum: countTo },
                    {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                    }
                );
            }
        });
    });

    // Skills tabs
    const tabButtons = $('.tab-btn');
    const tabContents = $('.tab-content');

    tabButtons.on('click', function() {
        const tabId = $(this).attr('data-tab');

        tabButtons.removeClass('active');
        tabContents.removeClass('active');

        $(this).addClass('active');
        $(`#${tabId}`).addClass('active');
    });

    // Project filter
    const filterButtons = $('.filter-btn');
    const projectCards = $('.project-card');

    filterButtons.on('click', function() {
        const filter = $(this).attr('data-filter');

        filterButtons.removeClass('active');
        $(this).addClass('active');

        if (filter === 'all') {
            projectCards.show();
        } else {
            projectCards.each(function() {
                if ($(this).attr('data-category') === filter) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });

    // Testimonials slider
    $('.testimonials-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: $('.slider-prev'),
        nextArrow: $('.slider-next'),
        appendDots: $('.testimonials-slider')
    });

    // Contact form submission
    const contactForm = $('#contactForm');

    contactForm.on('submit', (e) => {
        e.preventDefault();

        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();

        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, subject, message });

        // Show success message
        alert('Thank you for your message! I will get back to you soon.');

        // Reset form
        contactForm.trigger('reset');
    });

    // Initialize animations
    setTimeout(animateOnScroll, 500);
});
