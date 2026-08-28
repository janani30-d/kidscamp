/* =========================================================
   KIDS SUMMER CAMP
   HEADER - PART 4
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;
    const html = document.documentElement;

    const hamburgerBtn =
        document.getElementById("hamburgerBtn");

    const mainNav =
        document.getElementById("mainNav");

    const themeToggle =
        document.getElementById("themeToggle");

    const mobileThemeToggle =
        document.getElementById("mobileThemeToggle");

    const rtlToggle =
        document.getElementById("rtlToggle");

    const mobileRtlToggle =
        document.getElementById("mobileRtlToggle");


    /* =====================================================
       HAMBURGER MENU
    ===================================================== */

    if (hamburgerBtn && mainNav) {

        hamburgerBtn.addEventListener("click", function () {

            const isOpen =
                mainNav.classList.toggle("active");

            hamburgerBtn.classList.toggle(
                "active",
                isOpen
            );

            hamburgerBtn.setAttribute(
                "aria-expanded",
                isOpen
            );

            hamburgerBtn.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });

    }


    /* =====================================================
       MOBILE DROPDOWNS
       HOME + PROGRAMS
    ===================================================== */

    const dropdownToggles =
        document.querySelectorAll(
            ".dropdown > .dropdown-toggle"
        );


    dropdownToggles.forEach(function (toggle) {

        toggle.addEventListener("click", function (event) {

            /* Only use click dropdown on mobile */

            if (window.innerWidth <= 1050) {

                event.preventDefault();

                const dropdown =
                    toggle.parentElement;

                const isActive =
                    dropdown.classList.contains("active");


                /* Close other dropdowns */

                document
                    .querySelectorAll(".dropdown.active")
                    .forEach(function (item) {

                        if (item !== dropdown) {

                            item.classList.remove("active");

                        }

                    });


                /* Toggle current dropdown */

                dropdown.classList.toggle(
                    "active",
                    !isActive
                );

            }

        });

    });


    /* =====================================================
       CLOSE MOBILE MENU
       WHEN NORMAL LINK IS CLICKED
    ===================================================== */

    const normalNavLinks =
        document.querySelectorAll(
            ".nav-item:not(.dropdown) .nav-link"
        );


    normalNavLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 1050) {

                mainNav.classList.remove("active");

                hamburgerBtn.classList.remove("active");

                hamburgerBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });


    /* =====================================================
       CLOSE MENU AFTER DROPDOWN LINK CLICK
    ===================================================== */

    const dropdownLinks =
        document.querySelectorAll(
            ".dropdown-menu a"
        );


    dropdownLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 1050) {

                mainNav.classList.remove("active");

                hamburgerBtn.classList.remove("active");

                hamburgerBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });


    /* =====================================================
       DARK MODE
    ===================================================== */

    function updateThemeIcon() {

        const isDark =
            body.classList.contains("dark-mode");


        const icons =
            document.querySelectorAll(
                ".theme-toggle i"
            );


        icons.forEach(function (icon) {

            if (isDark) {

                /* Sun icon in dark mode */

                icon.classList.remove("fa-moon");

                icon.classList.add("fa-sun");

            } else {

                /* Moon icon in light mode */

                icon.classList.remove("fa-sun");

                icon.classList.add("fa-moon");

            }

        });

    }


    function toggleDarkMode() {

        body.classList.toggle("dark-mode");


        const isDark =
            body.classList.contains("dark-mode");


        /* Save preference */

        localStorage.setItem(
            "campTheme",
            isDark ? "dark" : "light"
        );

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

        localStorage.setItem(
            "kidcamp-dark-mode",
            isDark ? "enabled" : "disabled"
        );


        updateThemeIcon();

    }


    /* Desktop theme button */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            toggleDarkMode
        );

    }


    /* Mobile theme button */

    if (mobileThemeToggle) {

        mobileThemeToggle.addEventListener(
            "click",
            toggleDarkMode
        );

    }


    /* =====================================================
       LOAD SAVED THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem("campTheme");

    const savedSiteTheme =
        localStorage.getItem("theme");

    const savedDashboardTheme =
        localStorage.getItem("kidcamp-dark-mode");

    if (
        savedTheme === "dark" ||
        savedSiteTheme === "dark" ||
        savedDashboardTheme === "enabled"
    ) {

        body.classList.add("dark-mode");

    } else {

        body.classList.remove("dark-mode");

    }


    updateThemeIcon();


    /* =====================================================
       RTL MODE
    ===================================================== */

    function toggleRTL() {

        const isRTL =
            body.getAttribute("dir") === "rtl";


        if (isRTL) {

            html.setAttribute("dir", "ltr");
            body.setAttribute("dir", "ltr");

            localStorage.setItem(
                "campDirection",
                "ltr"
            );

            localStorage.setItem(
                "direction",
                "ltr"
            );

            localStorage.setItem(
                "kidcamp-rtl",
                "disabled"
            );

        } else {

            html.setAttribute("dir", "rtl");
            body.setAttribute("dir", "rtl");

            localStorage.setItem(
                "campDirection",
                "rtl"
            );

            localStorage.setItem(
                "direction",
                "rtl"
            );

            localStorage.setItem(
                "kidcamp-rtl",
                "enabled"
            );

        }

    }


    /* Desktop RTL */

    if (rtlToggle) {

        rtlToggle.addEventListener(
            "click",
            toggleRTL
        );

    }


    /* Mobile RTL */

    if (mobileRtlToggle) {

        mobileRtlToggle.addEventListener(
            "click",
            toggleRTL
        );

    }


    /* =====================================================
       LOAD SAVED RTL
    ===================================================== */

    const savedDirection =
        localStorage.getItem("campDirection");

    const savedSiteDirection =
        localStorage.getItem("direction");

    const savedDashboardDirection =
        localStorage.getItem("kidcamp-rtl");

    if (
        savedDirection === "rtl" ||
        savedSiteDirection === "rtl" ||
        savedDashboardDirection === "enabled"
    ) {

        html.setAttribute("dir", "rtl");
        body.setAttribute("dir", "rtl");

    } else {

        html.setAttribute("dir", "ltr");
        body.setAttribute("dir", "ltr");

    }


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                window.innerWidth <= 1050 &&
                mainNav &&
                hamburgerBtn &&
                mainNav.classList.contains("active")
            ) {

                const clickedInsideMenu =
                    mainNav.contains(event.target);

                const clickedHamburger =
                    hamburgerBtn.contains(event.target);


                if (
                    !clickedInsideMenu &&
                    !clickedHamburger
                ) {

                    mainNav.classList.remove(
                        "active"
                    );

                    hamburgerBtn.classList.remove(
                        "active"
                    );

                    hamburgerBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


    /* =====================================================
       RESET MOBILE MENU WHEN RESIZING TO DESKTOP
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 1050) {

                if (mainNav) {

                    mainNav.classList.remove(
                        "active"
                    );

                }

                if (hamburgerBtn) {

                    hamburgerBtn.classList.remove(
                        "active"
                    );

                    hamburgerBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                /* Close mobile dropdowns */

                document
                    .querySelectorAll(".dropdown.active")
                    .forEach(function (dropdown) {

                        dropdown.classList.remove(
                            "active"
                        );

                    });

            }

        }
    );

});

/* =========================================================
   HOME 1
   HERO SLIDER - PART 4
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------------------
       HERO SLIDER ELEMENTS
    ----------------------------------------------------- */

    const heroSlider = document.getElementById("heroSlider");

    if (!heroSlider) {
        return;
    }


    const slides =
        heroSlider.querySelectorAll(".hero-slide");

    const dots =
        heroSlider.querySelectorAll(".hero-dot");

    const prevButton =
        document.getElementById("heroPrev");

    const nextButton =
        document.getElementById("heroNext");


    /* -----------------------------------------------------
       SLIDER SETTINGS
    ----------------------------------------------------- */

    let currentSlide = 0;

    let slideInterval;

    const slideDuration = 5000;


    /* -----------------------------------------------------
       SHOW SLIDE
    ----------------------------------------------------- */

    function showSlide(index) {

        /* Handle previous/next boundaries */

        if (index >= slides.length) {

            currentSlide = 0;

        } else if (index < 0) {

            currentSlide = slides.length - 1;

        } else {

            currentSlide = index;
        }


        /* -------------------------------------------------
           Update slides
        ------------------------------------------------- */

        slides.forEach(function (slide, i) {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });


        /* -------------------------------------------------
           Update dots
        ------------------------------------------------- */

        dots.forEach(function (dot, i) {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    }


    /* -----------------------------------------------------
       NEXT SLIDE
    ----------------------------------------------------- */

    function nextSlide() {

        showSlide(currentSlide + 1);

    }


    /* -----------------------------------------------------
       PREVIOUS SLIDE
    ----------------------------------------------------- */

    function previousSlide() {

        showSlide(currentSlide - 1);

    }


    /* -----------------------------------------------------
       AUTO SLIDE
    ----------------------------------------------------- */

    function startSlider() {

        stopSlider();

        slideInterval = setInterval(
            nextSlide,
            slideDuration
        );

    }


    /* -----------------------------------------------------
       STOP AUTO SLIDE
    ----------------------------------------------------- */

    function stopSlider() {

        if (slideInterval) {

            clearInterval(slideInterval);

            slideInterval = null;
        }

    }


    /* -----------------------------------------------------
       NEXT BUTTON
    ----------------------------------------------------- */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                nextSlide();

                startSlider();

            }
        );

    }


    /* -----------------------------------------------------
       PREVIOUS BUTTON
    ----------------------------------------------------- */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function () {

                previousSlide();

                startSlider();

            }
        );

    }


    /* -----------------------------------------------------
       DOT NAVIGATION
    ----------------------------------------------------- */

    dots.forEach(function (dot, index) {

        dot.addEventListener(
            "click",
            function () {

                showSlide(index);

                startSlider();

            }
        );

    });


    /* -----------------------------------------------------
       PAUSE WHEN MOUSE IS OVER HERO
    ----------------------------------------------------- */

    heroSlider.addEventListener(
        "mouseenter",
        function () {

            stopSlider();

        }
    );


    /* -----------------------------------------------------
       START AGAIN WHEN MOUSE LEAVES
    ----------------------------------------------------- */

    heroSlider.addEventListener(
        "mouseleave",
        function () {

            startSlider();

        }
    );


    /* -----------------------------------------------------
       TOUCH / SWIPE SUPPORT
    ----------------------------------------------------- */

    let touchStartX = 0;

    let touchEndX = 0;


    heroSlider.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    heroSlider.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        { passive: true }
    );


    function handleSwipe() {

        const swipeDistance =
            touchEndX - touchStartX;


        /* Swipe left */

        if (swipeDistance < -50) {

            nextSlide();

            startSlider();

        }


        /* Swipe right */

        if (swipeDistance > 50) {

            previousSlide();

            startSlider();

        }

    }


    /* -----------------------------------------------------
       KEYBOARD NAVIGATION
    ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            /* Only respond when hero is visible */

            if (!heroSlider) {
                return;
            }


            if (event.key === "ArrowRight") {

                nextSlide();

                startSlider();

            }


            if (event.key === "ArrowLeft") {

                previousSlide();

                startSlider();

            }

        }
    );


    /* -----------------------------------------------------
       INITIAL SLIDE
    ----------------------------------------------------- */

    showSlide(0);


    /* -----------------------------------------------------
       START SLIDER
    ----------------------------------------------------- */

    startSlider();

});




// =========================================================
// KIDCAMP GALLERY
// PART 4 : JAVASCRIPT CAROUSEL
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    const galleryTrack = document.querySelector(".gallery-track");
    const galleryCards = document.querySelectorAll(".gallery-card");

    const previousButton = document.querySelector(".gallery-prev");
    const nextButton = document.querySelector(".gallery-next");

    if (
        !galleryTrack ||
        !galleryCards.length ||
        !previousButton ||
        !nextButton
    ) {
        return;
    }


    /* =====================================================
       SETTINGS
    ===================================================== */

    let currentIndex = 0;


    /* =====================================================
       GET NUMBER OF VISIBLE CARDS
    ===================================================== */

    function getVisibleCards() {

        const screenWidth = window.innerWidth;

        if (screenWidth <= 767) {
            return 1;
        }

        if (screenWidth <= 1023) {
            return 2;
        }

        if (screenWidth <= 1199) {
            return 3;
        }

        return 4;
    }


    /* =====================================================
       UPDATE CAROUSEL
    ===================================================== */

    function updateGallery() {

        const visibleCards = getVisibleCards();

        const totalCards = galleryCards.length;

        /*
         * Maximum position that the track can move.
         */

        const maxIndex = Math.max(
            0,
            totalCards - visibleCards
        );


        /*
         * Prevent going outside the available images.
         */

        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        if (currentIndex < 0) {
            currentIndex = 0;
        }


        /*
         * Get the actual card width.
         */

        const cardWidth =
            galleryCards[0].getBoundingClientRect().width;


        /*
         * Get the gap between cards.
         */

        const trackStyle =
            window.getComputedStyle(galleryTrack);

        const gap =
            parseFloat(trackStyle.columnGap) ||
            parseFloat(trackStyle.gap) ||
            0;


        /*
         * Move the track.
         */

        const moveAmount =
            currentIndex * (cardWidth + gap);


        galleryTrack.style.transform =
            `translateX(-${moveAmount}px)`;


        /*
         * Update arrow states.
         */

        previousButton.disabled =
            currentIndex === 0;

        nextButton.disabled =
            currentIndex === maxIndex;


        /*
         * Accessibility.
         */

        previousButton.setAttribute(
            "aria-disabled",
            currentIndex === 0
        );

        nextButton.setAttribute(
            "aria-disabled",
            currentIndex === maxIndex
        );
    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    nextButton.addEventListener("click", function () {

        const visibleCards = getVisibleCards();

        const maxIndex = Math.max(
            0,
            galleryCards.length - visibleCards
        );

        if (currentIndex < maxIndex) {

            currentIndex++;

            updateGallery();
        }
    });


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    previousButton.addEventListener("click", function () {

        if (currentIndex > 0) {

            currentIndex--;

            updateGallery();
        }
    });


    /* =====================================================
       WINDOW RESIZE
    ===================================================== */

    window.addEventListener("resize", function () {

        updateGallery();

    });


    /* =====================================================
       TOUCH SWIPE FOR MOBILE
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    galleryTrack.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    galleryTrack.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        { passive: true }
    );


    function handleSwipe() {

        const swipeDistance =
            touchStartX - touchEndX;


        /*
         * Swipe left
         */

        if (swipeDistance > 50) {

            nextButton.click();

        }


        /*
         * Swipe right
         */

        else if (swipeDistance < -50) {

            previousButton.click();

        }
    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateGallery();

});


/* =========================================================
   AUTH CONTROL
   RTL + DARK MODE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const darkModeButton = document.querySelector("#dark-mode-toggle");
    const rtlButton = document.querySelector("#rtl-toggle");

    const html = document.documentElement;
    const body = document.body;


    /* =====================================================
       DARK MODE
    ====================================================== */

    const savedTheme = localStorage.getItem("theme");
    const savedCampTheme = localStorage.getItem("campTheme");
    const savedDashboardTheme = localStorage.getItem("kidcamp-dark-mode");

    if (
        savedTheme === "dark" ||
        savedCampTheme === "dark" ||
        savedDashboardTheme === "enabled"
    ) {
        body.classList.add("dark-mode");

        if (darkModeButton) {
            darkModeButton.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        }
    }


    /* =====================================================
       DARK MODE BUTTON
    ====================================================== */

    if (darkModeButton) {

        darkModeButton.addEventListener("click", () => {

            body.classList.toggle("dark-mode");

            const isDarkMode =
                body.classList.contains("dark-mode");

            localStorage.setItem(
                "theme",
                isDarkMode ? "dark" : "light"
            );

            localStorage.setItem(
                "campTheme",
                isDarkMode ? "dark" : "light"
            );

            localStorage.setItem(
                "kidcamp-dark-mode",
                isDarkMode ? "enabled" : "disabled"
            );

            darkModeButton.setAttribute(
                "aria-label",
                isDarkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

        });

    }


    /* =====================================================
       RTL
    ====================================================== */

    const savedDirection =
        localStorage.getItem("direction");

    const savedCampDirection =
        localStorage.getItem("campDirection");

    const savedDashboardDirection =
        localStorage.getItem("kidcamp-rtl");

    if (
        savedDirection === "rtl" ||
        savedCampDirection === "rtl" ||
        savedDashboardDirection === "enabled"
    ) {

        html.setAttribute("dir", "rtl");
        body.setAttribute("dir", "rtl");

    } else {

        html.setAttribute("dir", "ltr");
        body.setAttribute("dir", "ltr");

    }


    /* =====================================================
       RTL BUTTON
    ====================================================== */

    if (rtlButton) {

        rtlButton.addEventListener("click", () => {

            const currentDirection =
                html.getAttribute("dir");

            const newDirection =
                currentDirection === "rtl"
                    ? "ltr"
                    : "rtl";

            html.setAttribute(
                "dir",
                newDirection
            );

            body.setAttribute(
                "dir",
                newDirection
            );

            localStorage.setItem(
                "direction",
                newDirection
            );

            localStorage.setItem(
                "campDirection",
                newDirection
            );

            localStorage.setItem(
                "kidcamp-rtl",
                newDirection === "rtl"
                    ? "enabled"
                    : "disabled"
            );

            rtlButton.setAttribute(
                "aria-label",
                newDirection === "rtl"
                    ? "Switch to left-to-right"
                    : "Switch to right-to-left"
            );

        });

    }

});


/* =========================================================
   SCROLL TO TOP
========================================================= */

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
