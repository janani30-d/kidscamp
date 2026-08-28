/* =========================================================
   KIDCAMP DASHBOARD
   PART 3 — JAVASCRIPT
   HAMBURGER + SIDEBAR + DARK MODE + RTL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menuToggle =
        document.querySelector(".dashboard-menu-toggle");

    const sidebar =
        document.querySelector(".dashboard-sidebar");

    const overlay =
        document.querySelector(".dashboard-overlay");

    const darkModeButton =
        document.querySelector("#dashboardDarkMode");

    const rtlButton =
        document.querySelector("#dashboardRtl");


    /* =====================================================
       HAMBURGER MENU
    ===================================================== */

    function openSidebar() {

        if (!sidebar) return;

        sidebar.classList.add("active");

        if (overlay) {
            overlay.classList.add("active");
        }

        document.body.classList.add("sidebar-open");
    }


    function closeSidebar() {

        if (!sidebar) return;

        sidebar.classList.remove("active");

        if (overlay) {
            overlay.classList.remove("active");
        }

        document.body.classList.remove("sidebar-open");
    }


    /* Toggle sidebar */

    if (menuToggle) {

        menuToggle.addEventListener("click", function () {

            if (sidebar.classList.contains("active")) {

                closeSidebar();

            } else {

                openSidebar();
            }

        });
    }


    /* Click overlay to close */

    if (overlay) {

        overlay.addEventListener("click", function () {

            closeSidebar();

        });
    }


    /* =====================================================
       CLOSE SIDEBAR WHEN NAV LINK IS CLICKED
    ===================================================== */

    const navLinks =
        document.querySelectorAll(".dashboard-nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 1024) {

                closeSidebar();
            }

        });

    });


    /* =====================================================
       ESC KEY — CLOSE SIDEBAR
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeSidebar();

        }

    });


    /* =====================================================
       CLOSE SIDEBAR WHEN SCREEN BECOMES DESKTOP
    ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 1024) {

            closeSidebar();

        }

    });


    /* =====================================================
       DARK MODE
    ===================================================== */

    function setDarkMode(enabled) {

        document.body.classList.toggle(
            "dark-mode",
            enabled
        );

        localStorage.setItem(
            "kidcamp-dark-mode",
            enabled ? "enabled" : "disabled"
        );


        /* Update icon */

        if (darkModeButton) {

            const icon =
                darkModeButton.querySelector("i");

            if (icon) {

                icon.className =
                    enabled
                        ? "fas fa-sun"
                        : "fas fa-moon";
            }
        }
    }


    /* Load saved dark mode */

    const savedDarkMode =
        localStorage.getItem("kidcamp-dark-mode");


    if (savedDarkMode === "enabled") {

        setDarkMode(true);

    } else {

        setDarkMode(false);
    }


    /* Dark mode button */

    if (darkModeButton) {

        darkModeButton.addEventListener(
            "click",
            function () {

                const enabled =
                    !document.body.classList.contains(
                        "dark-mode"
                    );

                setDarkMode(enabled);

            }
        );
    }


    /* =====================================================
       RTL
    ===================================================== */

    function setRTL(enabled) {

        document.documentElement.dir =
            enabled ? "rtl" : "ltr";

        document.documentElement.lang =
            enabled ? "ar" : "en";

        localStorage.setItem(
            "kidcamp-rtl",
            enabled ? "enabled" : "disabled"
        );


        /* Update RTL button */

        if (rtlButton) {

            rtlButton.setAttribute(
                "aria-pressed",
                enabled ? "true" : "false"
            );

        }
    }


    /* Load saved RTL */

    const savedRTL =
        localStorage.getItem("kidcamp-rtl");


    if (savedRTL === "enabled") {

        setRTL(true);

    } else {

        setRTL(false);
    }


    /* RTL button */

    if (rtlButton) {

        rtlButton.addEventListener(
            "click",
            function () {

                const enabled =
                    document.documentElement.dir !== "rtl";

                setRTL(enabled);

            }
        );
    }


    /* =====================================================
       PREVENT BODY SCROLL WHEN SIDEBAR IS OPEN
       MOBILE + TABLET ONLY
    ===================================================== */

    function updateBodyScroll() {

        if (
            window.innerWidth <= 1024 &&
            sidebar &&
            sidebar.classList.contains("active")
        ) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "";
        }
    }


    /* Watch sidebar changes */

    if (sidebar) {

        const observer =
            new MutationObserver(function () {

                updateBodyScroll();

            });


        observer.observe(sidebar, {
            attributes: true,
            attributeFilter: ["class"]
        });
    }


    window.addEventListener(
        "resize",
        updateBodyScroll
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.forEach(function (item) {

                    item.classList.remove("active");

                });

                this.classList.add("active");

            }
        );

    });


    /* =====================================================
       INITIAL SETUP
    ===================================================== */

    closeSidebar();

});

/* =========================================================
   PROGRAMS PAGE
   PART 5 — FILTER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const filterButtons = document.querySelectorAll(
        ".program-filter-btn"
    );

    const ageSelect = document.querySelector(
        "#programAge"
    );

    const programCards = document.querySelectorAll(
        ".program-card"
    );

    const programCount = document.querySelector(
        ".programs-count"
    );


    /* =====================================================
       FILTER FUNCTION
    ===================================================== */

    function filterPrograms() {

        const activeButton = document.querySelector(
            ".program-filter-btn.active"
        );

        const selectedCategory =
            activeButton
                ? activeButton.dataset.filter
                : "all";

        const selectedAge =
            ageSelect
                ? ageSelect.value
                : "all";


        let visibleCount = 0;


        /* =================================================
           LOOP THROUGH PROGRAM CARDS
        ================================================= */

        programCards.forEach(function (card) {

            const cardCategory =
                card.dataset.category;

            const cardAge =
                card.dataset.age;


            /* Category check */

            const categoryMatch =
                selectedCategory === "all" ||
                cardCategory === selectedCategory;


            /* Age check */

            const ageMatch =
                selectedAge === "all" ||
                cardAge === selectedAge;


            /* Show / hide */

            if (categoryMatch && ageMatch) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        /* =================================================
           UPDATE PROGRAM COUNT
        ================================================= */

        if (programCount) {

            programCount.textContent =
                visibleCount +
                (visibleCount === 1
                    ? " Program"
                    : " Programs");

        }

    }


    /* =====================================================
       CATEGORY BUTTONS
    ===================================================== */

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {


            /* Remove active state */

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

                btn.setAttribute(
                    "aria-selected",
                    "false"
                );

            });


            /* Add active state */

            this.classList.add("active");

            this.setAttribute(
                "aria-selected",
                "true"
            );


            /* Apply filter */

            filterPrograms();

        });

    });


    /* =====================================================
       AGE FILTER
    ===================================================== */

    if (ageSelect) {

        ageSelect.addEventListener(
            "change",
            filterPrograms
        );

    }


    /* =====================================================
       INITIAL FILTER
    ===================================================== */

    filterPrograms();

});
/* =========================================================
   ENROLLMENT
   PART 4 — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const childCards = document.querySelectorAll(
        ".enrollment-child-card"
    );

    const selectChildButtons = document.querySelectorAll(
        ".enrollment-select-btn"
    );

    const programCards = document.querySelectorAll(
        ".enrollment-program-card"
    );

    const programButtons = document.querySelectorAll(
        ".enrollment-program-btn"
    );

    const steps = document.querySelectorAll(
        ".enrollment-step"
    );


    /* =====================================================
       CHILD SELECTION
    ===================================================== */

    function selectChild(selectedCard) {

        childCards.forEach(card => {
            card.classList.remove("active");

            const check = card.querySelector(
                ".enrollment-child-check"
            );

            if (check) {
                check.innerHTML =
                    '<i class="fas fa-check"></i>';
            }

            const button = card.querySelector(
                ".enrollment-select-btn"
            );

            if (button) {
                button.textContent = "Select Child";
            }
        });


        selectedCard.classList.add("active");

        const selectedButton =
            selectedCard.querySelector(
                ".enrollment-select-btn"
            );

        if (selectedButton) {
            selectedButton.textContent = "Selected";
        }


        updateProgress(2);
    }


    childCards.forEach(card => {

        card.addEventListener("click", event => {

            /*
             * Prevent the card click from firing twice
             * when the button itself is clicked.
             */
            if (
                event.target.closest(
                    ".enrollment-select-btn"
                )
            ) {
                return;
            }

            selectChild(card);
        });

    });


    selectChildButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const card =
                button.closest(
                    ".enrollment-child-card"
                );

            if (card) {
                selectChild(card);
            }

        });

    });


    /* =====================================================
       PROGRAM SELECTION
    ===================================================== */

    function selectProgram(selectedCard) {

        programCards.forEach(card => {

            card.classList.remove("active");

            const button =
                card.querySelector(
                    ".enrollment-program-btn"
                );

            if (button) {
                button.textContent = "Enroll";
            }

        });


        selectedCard.classList.add("active");

        const selectedButton =
            selectedCard.querySelector(
                ".enrollment-program-btn"
            );

        if (selectedButton) {
            selectedButton.textContent =
                "Selected";
        }


        updateProgress(3);
    }


    programCards.forEach(card => {

        card.addEventListener("click", event => {

            if (
                event.target.closest(
                    ".enrollment-program-btn"
                )
            ) {
                return;
            }

            selectProgram(card);
        });

    });


    programButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const card =
                button.closest(
                    ".enrollment-program-card"
                );

            if (card) {
                selectProgram(card);
            }

        });

    });


    /* =====================================================
       PROGRESS
    ===================================================== */

    function updateProgress(currentStep) {

        steps.forEach((step, index) => {

            const stepNumber = index + 1;

            step.classList.remove("active");

            if (stepNumber <= currentStep) {
                step.classList.add("active");
            }

        });

    }


    /* =====================================================
       ADD CHILD
    ===================================================== */

    const addChildCard =
        document.querySelector(
            ".enrollment-add-child-card"
        );

    if (addChildCard) {

        addChildCard.addEventListener(
            "click",
            event => {

                event.preventDefault();

                /*
                 * Connect this to your Register /
                 * Add Child page later.
                 */

                window.location.href =
                    "register-child.html";
            }
        );

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateProgress(1);

});
/* =========================================================
   STEP 4 — ENROLLMENT CONFIRMATION
========================================================= */

const agreementCheckbox = document.querySelector(
    "#enrollment-agreement"
);

const confirmButton = document.querySelector(
    ".enrollment-confirm-btn"
);

const backButton = document.querySelector(
    ".enrollment-back-btn"
);

const confirmationSection = document.querySelector(
    ".enrollment-confirmation-section"
);


/* =========================================================
   AGREEMENT CHECKBOX
========================================================= */

if (agreementCheckbox && confirmButton) {

    agreementCheckbox.addEventListener("change", () => {

        confirmButton.disabled =
            !agreementCheckbox.checked;

    });

}


/* =========================================================
   BACK TO DETAILS
========================================================= */

if (backButton) {

    backButton.addEventListener("click", () => {

        const detailsSection = document.querySelector(
            ".enrollment-details-section"
        );

        if (detailsSection) {

            detailsSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

}


/* =========================================================
   CONFIRM ENROLLMENT
========================================================= */

if (confirmButton) {

    confirmButton.addEventListener("click", () => {

        if (!agreementCheckbox ||
            !agreementCheckbox.checked) {

            return;

        }


        /* Mark Step 4 as completed */

        if (typeof steps !== "undefined") {

            steps.forEach(step => {

                step.classList.remove("active");

                const stepNumber =
                    Number(
                        step.querySelector(
                            ".enrollment-step-number"
                        )?.textContent
                    );

                if (stepNumber <= 4) {
                    step.classList.add("completed");
                }

            });

        }


        /* Button state */

        confirmButton.disabled = true;

        confirmButton.innerHTML = `
            Enrollment Confirmed
            <i class="fas fa-check"></i>
        `;


        /* Confirmation message */

        if (confirmationSection) {

            const heading =
                confirmationSection.querySelector(
                    ".enrollment-confirmation-heading h3"
                );

            const paragraph =
                confirmationSection.querySelector(
                    ".enrollment-confirmation-heading p"
                );

            if (heading) {
                heading.textContent =
                    "Enrollment Confirmed";
            }

            if (paragraph) {
                paragraph.textContent =
                    "Your enrollment request has been submitted successfully.";
            }

        }

    });

}
/* =========================================================
   SCHEDULE & CALENDAR
   PART 4 — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const calendarDays = document.querySelector(
        "#scheduleCalendarDays"
    );

    const monthElement = document.querySelector(
        "#scheduleMonth"
    );

    const yearElement = document.querySelector(
        "#scheduleYear"
    );

    const previousButton = document.querySelector(
        "#schedulePrevMonth"
    );

    const nextButton = document.querySelector(
        "#scheduleNextMonth"
    );

    const todayButton = document.querySelector(
        "#scheduleTodayBtn"
    );

    const viewButtons = document.querySelectorAll(
        ".schedule-view-btn"
    );


    /* =====================================================
       STOP IF CALENDAR IS NOT PRESENT
    ===================================================== */

    if (!calendarDays) {
        return;
    }


    /* =====================================================
       CURRENT DATE
    ===================================================== */

    const today = new Date();

    let currentDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );

    let selectedDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );


    /* =====================================================
       MONTH NAMES
    ===================================================== */

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    /* =====================================================
       SAMPLE EVENTS
       Replace with your real data later
    ===================================================== */

    const scheduleEvents = [

        {
            date: "2026-08-31",
            title: "Creative Arts",
            type: "activity"
        },

        {
            date: "2026-09-02",
            title: "Music & Rhythm",
            type: "program"
        },

        {
            date: "2026-09-04",
            title: "Kids Sports",
            type: "activity"
        },

        {
            date: "2026-09-07",
            title: "Parent Meeting",
            type: "event"
        },

        {
            date: "2026-09-10",
            title: "Story Time",
            type: "activity"
        }

    ];


    /* =====================================================
       FORMAT DATE
    ===================================================== */

    function formatDate(year, month, day) {

        const monthValue =
            String(month + 1).padStart(2, "0");

        const dayValue =
            String(day).padStart(2, "0");

        return `${year}-${monthValue}-${dayValue}`;
    }


    /* =====================================================
       CHECK TODAY
    ===================================================== */

    function isToday(year, month, day) {

        return (
            year === today.getFullYear() &&
            month === today.getMonth() &&
            day === today.getDate()
        );

    }


    /* =====================================================
       CHECK SELECTED DATE
    ===================================================== */

    function isSelected(year, month, day) {

        return (
            year === selectedDate.getFullYear() &&
            month === selectedDate.getMonth() &&
            day === selectedDate.getDate()
        );

    }


    /* =====================================================
       GET EVENTS
    ===================================================== */

    function getEvents(date) {

        return scheduleEvents.filter(
            event => event.date === date
        );

    }


    /* =====================================================
       RENDER CALENDAR
    ===================================================== */

    function renderCalendar() {

        calendarDays.innerHTML = "";


        const year =
            currentDate.getFullYear();

        const month =
            currentDate.getMonth();


        /* First day of current month */

        const firstDay =
            new Date(year, month, 1).getDay();


        /* Number of days in current month */

        const daysInMonth =
            new Date(
                year,
                month + 1,
                0
            ).getDate();


        /* Number of days in previous month */

        const daysInPreviousMonth =
            new Date(
                year,
                month,
                0
            ).getDate();


        /* Total calendar cells */

        const totalCells =
            Math.ceil(
                (firstDay + daysInMonth) / 7
            ) * 7;


        /* =================================================
           UPDATE MONTH / YEAR
        ================================================= */

        if (monthElement) {
            monthElement.textContent =
                monthNames[month];
        }

        if (yearElement) {
            yearElement.textContent =
                year;
        }


        /* =================================================
           CREATE DAYS
        ================================================= */

        for (
            let index = 0;
            index < totalCells;
            index++
        ) {

            const dayElement =
                document.createElement("div");

            dayElement.className =
                "schedule-calendar-day";


            let day;
            let dayMonth = month;
            let dayYear = year;


            /* Previous month */

            if (index < firstDay) {

                day =
                    daysInPreviousMonth -
                    firstDay +
                    index +
                    1;

                dayMonth = month - 1;

                if (dayMonth < 0) {
                    dayMonth = 11;
                    dayYear--;
                }

                dayElement.classList.add(
                    "other-month"
                );

            }


            /* Current month */

            else if (
                index <
                firstDay + daysInMonth
            ) {

                day =
                    index -
                    firstDay +
                    1;

            }


            /* Next month */

            else {

                day =
                    index -
                    firstDay -
                    daysInMonth +
                    1;

                dayMonth = month + 1;

                if (dayMonth > 11) {
                    dayMonth = 0;
                    dayYear++;
                }

                dayElement.classList.add(
                    "other-month"
                );

            }


            const dateString =
                formatDate(
                    dayYear,
                    dayMonth,
                    day
                );


            /* =================================================
               TODAY
            ================================================= */

            if (
                isToday(
                    dayYear,
                    dayMonth,
                    day
                )
            ) {

                dayElement.classList.add(
                    "today"
                );

            }


            /* =================================================
               SELECTED
            ================================================= */

            if (
                isSelected(
                    dayYear,
                    dayMonth,
                    day
                )
            ) {

                dayElement.classList.add(
                    "selected"
                );

            }


            /* =================================================
               DAY NUMBER
            ================================================= */

            const numberElement =
                document.createElement("div");

            numberElement.className =
                "schedule-day-number";

            numberElement.textContent =
                day;


            dayElement.appendChild(
                numberElement
            );


            /* =================================================
               EVENTS
            ================================================= */

            const events =
                getEvents(dateString);


            if (events.length > 0) {

                const eventsContainer =
                    document.createElement("div");

                eventsContainer.className =
                    "schedule-day-events";


                events.forEach(event => {

                    const eventElement =
                        document.createElement("div");

                    eventElement.className =
                        "schedule-day-event";

                    eventElement.textContent =
                        event.title;

                    eventElement.title =
                        event.title;

                    eventElement.dataset.type =
                        event.type;

                    eventsContainer.appendChild(
                        eventElement
                    );

                });


                dayElement.appendChild(
                    eventsContainer
                );

            }


            /* =================================================
               CLICK DATE
            ================================================= */

            dayElement.addEventListener(
                "click",
                () => {

                    selectedDate =
                        new Date(
                            dayYear,
                            dayMonth,
                            day
                        );

                    currentDate =
                        new Date(
                            dayYear,
                            dayMonth,
                            1
                        );

                    renderCalendar();

                    showSelectedDate(
                        dateString
                    );

                }
            );


            calendarDays.appendChild(
                dayElement
            );

        }

    }


    /* =====================================================
       SHOW SELECTED DATE
    ===================================================== */

    function showSelectedDate(date) {

        const events =
            getEvents(date);

        const scheduleItems =
            document.querySelectorAll(
                ".schedule-item"
            );


        /* If no event, keep normal schedule list */

        if (!events.length) {
            return;
        }


        /*
         * Highlight matching schedule items
         * if data-date is added later.
         */

        scheduleItems.forEach(item => {

            item.classList.remove(
                "selected"
            );

            if (
                item.dataset.date === date
            ) {

                item.classList.add(
                    "selected"
                );

            }

        });

    }


    /* =====================================================
       PREVIOUS MONTH
    ===================================================== */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            () => {

                currentDate.setMonth(
                    currentDate.getMonth() - 1
                );

                selectedDate =
                    new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        1
                    );

                renderCalendar();

            }
        );

    }


    /* =====================================================
       NEXT MONTH
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                currentDate.setMonth(
                    currentDate.getMonth() + 1
                );

                selectedDate =
                    new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        1
                    );

                renderCalendar();

            }
        );

    }


    /* =====================================================
       TODAY BUTTON
    ===================================================== */

    if (todayButton) {

        todayButton.addEventListener(
            "click",
            () => {

                currentDate =
                    new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        1
                    );

                selectedDate =
                    new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate()
                    );

                renderCalendar();

            }
        );

    }


    /* =====================================================
       MONTH / WEEK VIEW
    ===================================================== */

    viewButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                viewButtons.forEach(
                    item => {
                        item.classList.remove(
                            "active"
                        );
                    }
                );

                button.classList.add(
                    "active"
                );


                const view =
                    button.dataset.view;


                if (view === "week") {

                    /*
                     * Week view can be connected
                     * to the detailed weekly layout later.
                     */

                    console.log(
                        "Week view selected"
                    );

                }

            }
        );

    });


    /* =====================================================
       INITIAL RENDER
    ===================================================== */

    renderCalendar();

});
/* =========================================================
   SCHEDULE & CALENDAR
   PART 5 — SELECTED DATE + EVENT DETAILS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const calendarDays = document.querySelector(
        "#scheduleCalendarDays"
    );

    const scheduleList = document.querySelector(
        ".schedule-list"
    );

    const emptyState = document.querySelector(
        "#scheduleEmptyState"
    );

    if (!calendarDays) {
        return;
    }


    /* =====================================================
       EVENT DATA
    ===================================================== */

    const events = [

        {
            date: "2026-08-31",
            title: "Creative Arts",
            child: "Alex",
            program: "Creative Arts Program",
            time: "4:00 PM – 5:30 PM",
            location: "Activity Room",
            icon: "fa-palette"
        },

        {
            date: "2026-09-02",
            title: "Music & Rhythm",
            child: "Emma",
            program: "Music Program",
            time: "3:00 PM – 4:00 PM",
            location: "Music Room",
            icon: "fa-music"
        },

        {
            date: "2026-09-04",
            title: "Kids Sports",
            child: "Alex",
            program: "Sports Program",
            time: "5:00 PM – 6:30 PM",
            location: "Sports Ground",
            icon: "fa-running"
        },

        {
            date: "2026-09-07",
            title: "Parent Meeting",
            child: "Emma",
            program: "Parent Meeting",
            time: "6:00 PM – 7:00 PM",
            location: "Meeting Room",
            icon: "fa-users"
        },

        {
            date: "2026-09-10",
            title: "Story Time",
            child: "Alex",
            program: "Story Time Program",
            time: "4:00 PM – 5:00 PM",
            location: "Reading Room",
            icon: "fa-book"
        }

    ];


    /* =====================================================
       FORMAT DATE
    ===================================================== */

    function formatDate(date) {

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                date.getDate()
            ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }


    /* =====================================================
       FORMAT DISPLAY DATE
    ===================================================== */

    function formatDisplayDate(dateString) {

        const date =
            new Date(
                `${dateString}T00:00:00`
            );

        return date.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );
    }


    /* =====================================================
       FIND EVENTS
    ===================================================== */

    function getEventsForDate(date) {

        return events.filter(
            event => event.date === date
        );

    }


    /* =====================================================
       CREATE SELECTED DATE HEADER
    ===================================================== */

    function createSelectedDateHeader(
        date,
        hasEvents
    ) {

        const existing =
            document.querySelector(
                ".schedule-selected-date"
            );

        if (existing) {
            existing.remove();
        }


        const header =
            document.createElement("div");

        header.className =
            "schedule-selected-date";


        const title =
            document.createElement("h3");

        title.textContent =
            formatDisplayDate(date);


        const count =
            document.createElement("span");

        count.textContent =
            hasEvents
                ? `${getEventsForDate(date).length} activity`
                : "No activities";


        header.appendChild(title);
        header.appendChild(count);


        const upcomingSection =
            document.querySelector(
                ".schedule-upcoming-section"
            );

        if (upcomingSection) {

            const sectionHeader =
                upcomingSection.querySelector(
                    ".schedule-section-header"
                );

            if (sectionHeader) {

                sectionHeader.after(header);

            }

        }

    }


    /* =====================================================
       SHOW EVENTS
    ===================================================== */

    function showSelectedEvents(date) {

        const selectedEvents =
            getEventsForDate(date);


        createSelectedDateHeader(
            date,
            selectedEvents.length > 0
        );


        /* No events */

        if (!selectedEvents.length) {

            if (scheduleList) {
                scheduleList.style.display =
                    "none";
            }

            if (emptyState) {

                emptyState.hidden = false;

                const heading =
                    emptyState.querySelector("h3");

                const paragraph =
                    emptyState.querySelector("p");


                if (heading) {
                    heading.textContent =
                        "No Activities This Day";
                }

                if (paragraph) {
                    paragraph.textContent =
                        "There are no activities scheduled for this date.";
                }

            }

            return;
        }


        /* Events available */

        if (emptyState) {
            emptyState.hidden = true;
        }

        if (!scheduleList) {
            return;
        }

        scheduleList.style.display =
            "flex";

        scheduleList.innerHTML = "";


        selectedEvents.forEach(event => {

            const item =
                document.createElement("div");

            item.className =
                "schedule-item";

            item.dataset.date =
                event.date;


            item.innerHTML = `

                <div class="schedule-item-icon">
                    <i class="fas ${event.icon}"></i>
                </div>

                <div class="schedule-item-content">

                    <div class="schedule-item-top">

                        <h3>
                            ${event.title}
                        </h3>

                        <span class="schedule-status">
                            Scheduled
                        </span>

                    </div>

                    <p>
                        ${event.child} • ${event.program}
                    </p>

                    <div class="schedule-item-meta">

                        <span>
                            <i class="fas fa-clock"></i>
                            ${event.time}
                        </span>

                        <span>
                            <i class="fas fa-map-marker-alt"></i>
                            ${event.location}
                        </span>

                    </div>

                </div>
            `;


            scheduleList.appendChild(item);

        });

    }


    /* =====================================================
       DATE CLICK
    ===================================================== */

    calendarDays.addEventListener(
        "click",
        event => {

            const day =
                event.target.closest(
                    ".schedule-calendar-day"
                );

            if (!day) {
                return;
            }


            const number =
                day.querySelector(
                    ".schedule-day-number"
                );

            if (!number) {
                return;
            }


            const allDays =
                [...calendarDays.children];

            const index =
                allDays.indexOf(day);


            /*
             * Get the displayed calendar date
             * from the selected calendar cell.
             */

            const currentMonthText =
                document.querySelector(
                    "#scheduleMonth"
                )?.textContent;

            const currentYearText =
                document.querySelector(
                    "#scheduleYear"
                )?.textContent;


            const monthIndex =
                new Date(
                    `${currentMonthText} 1, ${currentYearText}`
                ).getMonth();


            let dayNumber =
                Number(number.textContent);


            let month =
                monthIndex;

            let year =
                Number(currentYearText);


            const firstDay =
                new Date(
                    year,
                    month,
                    1
                ).getDay();


            if (
                day.classList.contains(
                    "other-month"
                )
            ) {

                if (index < firstDay) {

                    month--;

                    if (month < 0) {
                        month = 11;
                        year--;
                    }

                } else {

                    month++;

                    if (month > 11) {
                        month = 0;
                        year++;
                    }

                }

            }


            const date =
                `${year}-${String(
                    month + 1
                ).padStart(2, "0")}-${String(
                    dayNumber
                ).padStart(2, "0")}`;


            showSelectedEvents(date);

        }
    );


    /* =====================================================
       SHOW TODAY ON FIRST LOAD
    ===================================================== */

    const today = new Date();

    const todayString =
        formatDate(today);

    showSelectedEvents(todayString);

});
/* =========================================================
   DAILY ACTIVITIES
   PART 4 — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const activityList =
        document.querySelector("#dailyActivityList");

    const childFilter =
        document.querySelector("#dailyChildFilter");

    const statusFilter =
        document.querySelector("#dailyStatusFilter");

    const todayButton =
        document.querySelector("#dailyTodayBtn");

    const previousDay =
        document.querySelector("#dailyPrevDay");

    const nextDay =
        document.querySelector("#dailyNextDay");

    const dayName =
        document.querySelector("#dailyDayName");

    const dateDisplay =
        document.querySelector("#dailyDate");

    const progressFill =
        document.querySelector("#dailyProgressFill");

    const progressPercent =
        document.querySelector("#dailyProgressPercent");

    const completedCount =
        document.querySelector("#dailyCompletedCount");

    const remainingCount =
        document.querySelector("#dailyRemainingCount");

    const totalCount =
        document.querySelector("#dailyTotalCount");

    const emptyState =
        document.querySelector("#dailyEmptyState");


    if (!activityList) {
        return;
    }


    /* =====================================================
       CURRENT DATE
    ===================================================== */

    const today = new Date();

    let selectedDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );


    /* =====================================================
       UPDATE DATE DISPLAY
    ===================================================== */

    function updateDateDisplay() {

        const dayOptions = {
            weekday: "long"
        };

        const dateOptions = {
            month: "long",
            day: "numeric",
            year: "numeric"
        };


        if (dayName) {
            dayName.textContent =
                selectedDate.toLocaleDateString(
                    "en-US",
                    dayOptions
                );
        }


        if (dateDisplay) {
            dateDisplay.textContent =
                selectedDate.toLocaleDateString(
                    "en-US",
                    dateOptions
                );
        }

    }


    /* =====================================================
       CHECK IF SELECTED DATE IS TODAY
    ===================================================== */

    function isToday() {

        return (
            selectedDate.getFullYear() ===
                today.getFullYear() &&

            selectedDate.getMonth() ===
                today.getMonth() &&

            selectedDate.getDate() ===
                today.getDate()
        );

    }


    /* =====================================================
       DATE NAVIGATION
    ===================================================== */

    if (previousDay) {

        previousDay.addEventListener(
            "click",
            () => {

                selectedDate.setDate(
                    selectedDate.getDate() - 1
                );

                updateDateDisplay();

            }
        );

    }


    if (nextDay) {

        nextDay.addEventListener(
            "click",
            () => {

                selectedDate.setDate(
                    selectedDate.getDate() + 1
                );

                updateDateDisplay();

            }
        );

    }


    /* =====================================================
       TODAY BUTTON
    ===================================================== */

    if (todayButton) {

        todayButton.addEventListener(
            "click",
            () => {

                selectedDate = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate()
                );

                updateDateDisplay();

            }
        );

    }


    /* =====================================================
       FILTER ACTIVITIES
    ===================================================== */

    function filterActivities() {

        const selectedChild =
            childFilter
                ? childFilter.value
                : "all";

        const selectedStatus =
            statusFilter
                ? statusFilter.value
                : "all";


        const activities =
            activityList.querySelectorAll(
                ".daily-activity-item"
            );


        let visibleCount = 0;


        activities.forEach(activity => {

            const child =
                activity.dataset.child;

            const status =
                activity.dataset.status;


            const childMatch =
                selectedChild === "all" ||
                child === selectedChild;


            const statusMatch =
                selectedStatus === "all" ||
                status === selectedStatus;


            if (
                childMatch &&
                statusMatch
            ) {

                activity.style.display =
                    "flex";

                visibleCount++;

            } else {

                activity.style.display =
                    "none";

            }

        });


        /* =================================================
           EMPTY STATE
        ================================================= */

        if (emptyState) {

            emptyState.hidden =
                visibleCount !== 0;

        }

    }


    /* =====================================================
       FILTER EVENTS
    ===================================================== */

    if (childFilter) {

        childFilter.addEventListener(
            "change",
            filterActivities
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterActivities
        );

    }


    /* =====================================================
       UPDATE PROGRESS
    ===================================================== */

    function updateProgress() {

        const activities =
            [
                ...activityList.querySelectorAll(
                    ".daily-activity-item"
                )
            ];


        const visibleActivities =
            activities.filter(
                activity =>
                    activity.style.display !== "none"
            );


        const total =
            visibleActivities.length;


        const completed =
            visibleActivities.filter(
                activity =>
                    activity.classList.contains(
                        "completed"
                    )
            ).length;


        const remaining =
            total - completed;


        let percentage = 0;


        if (total > 0) {

            percentage =
                Math.round(
                    (completed / total) * 100
                );

        }


        if (progressPercent) {

            progressPercent.textContent =
                `${percentage}%`;

        }


        if (progressFill) {

            progressFill.style.width =
                `${percentage}%`;

        }


        if (completedCount) {

            completedCount.textContent =
                completed;

        }


        if (remainingCount) {

            remainingCount.textContent =
                remaining;

        }


        if (totalCount) {

            totalCount.textContent =
                total;

        }

    }


    /* =====================================================
       MARK ACTIVITY COMPLETED
    ===================================================== */

    activityList.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".daily-complete-btn"
                );


            if (!button) {
                return;
            }


            const activity =
                button.closest(
                    ".daily-activity-item"
                );


            if (!activity) {
                return;
            }


            /* Already completed */

            if (
                activity.classList.contains(
                    "completed"
                )
            ) {
                return;
            }


            /* Change status */

            activity.classList.remove(
                "upcoming",
                "in-progress"
            );

            activity.classList.add(
                "completed"
            );


            activity.dataset.status =
                "completed";


            /* Update status text */

            const status =
                activity.querySelector(
                    ".daily-activity-status"
                );


            if (status) {

                status.textContent =
                    "Completed";

            }


            /* Change button */

            button.disabled = true;

            button.setAttribute(
                "aria-label",
                "Activity completed"
            );


            button.innerHTML =
                '<i class="fas fa-check"></i>';


            /* Update progress */

            updateProgress();


            /* Re-apply active filters */

            filterActivities();

        }
    );


    /* =====================================================
       INITIAL SETUP
    ===================================================== */

    updateDateDisplay();

    filterActivities();

    updateProgress();

});
/* =========================================================
   PAYMENT PAGE
   PART 3 — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const payNowBtn =
        document.getElementById("payNowBtn");

    const checkoutSection =
        document.getElementById("paymentCheckoutSection");

    const confirmPaymentBtn =
        document.getElementById("confirmPaymentBtn");

    const successSection =
        document.getElementById("paymentSuccessSection");

    const receiptSection =
        document.getElementById("paymentReceiptSection");

    const downloadReceiptBtn =
        document.getElementById("downloadReceiptBtn");

    const receiptDownloadBtn =
        document.getElementById("receiptDownloadBtn");

    const receiptPrintBtn =
        document.getElementById("receiptPrintBtn");

    const paymentMethods =
        document.querySelectorAll(
            'input[name="paymentMethod"]'
        );

    const cardFields =
        document.getElementById("paymentCardFields");

    const upiFields =
        document.getElementById("paymentUpiFields");

    const bankFields =
        document.getElementById("paymentBankFields");

    const cardNumber =
        document.getElementById("cardNumber");

    const cardExpiry =
        document.getElementById("cardExpiry");

    const cardCvv =
        document.getElementById("cardCvv");

    const cardName =
        document.getElementById("cardName");

    const upiId =
        document.getElementById("upiId");

    const bankSelect =
        document.getElementById("bankSelect");

    const receiptMethod =
        document.getElementById("receiptMethod");

    const successReceiptNumber =
        document.getElementById("successReceiptNumber");

    const receiptNumber =
        document.getElementById("receiptNumber");

    const paymentHistoryBody =
        document.getElementById("paymentHistoryBody");


    /* =====================================================
       PAYMENT AMOUNT
    ====================================================== */

    const paymentAmount = "₹8,000";


    /* =====================================================
       SHOW CHECKOUT SECTION
    ====================================================== */

    if (payNowBtn) {

        payNowBtn.addEventListener("click", () => {

            if (!checkoutSection) return;

            checkoutSection.hidden = false;

            checkoutSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }


    /* =====================================================
       PAYMENT METHOD SWITCH
    ====================================================== */

    paymentMethods.forEach(method => {

        method.addEventListener("change", () => {

            const selectedMethod =
                document.querySelector(
                    'input[name="paymentMethod"]:checked'
                )?.value;


            /* CARD */

            if (cardFields) {
                cardFields.hidden =
                    selectedMethod !== "card";
            }


            /* UPI */

            if (upiFields) {
                upiFields.hidden =
                    selectedMethod !== "upi";
            }


            /* NET BANKING */

            if (bankFields) {
                bankFields.hidden =
                    selectedMethod !== "netbanking";
            }

        });

    });


    /* =====================================================
       CARD NUMBER FORMAT
    ====================================================== */

    if (cardNumber) {

        cardNumber.addEventListener("input", () => {

            let value =
                cardNumber.value
                    .replace(/\D/g, "")
                    .substring(0, 16);

            value =
                value.replace(
                    /(.{4})/g,
                    "$1 "
                ).trim();

            cardNumber.value = value;

        });

    }


    /* =====================================================
       EXPIRY FORMAT
    ====================================================== */

    if (cardExpiry) {

        cardExpiry.addEventListener("input", () => {

            let value =
                cardExpiry.value
                    .replace(/\D/g, "")
                    .substring(0, 4);

            if (value.length >= 3) {

                value =
                    value.substring(0, 2)
                    + " / "
                    + value.substring(2);

            }

            cardExpiry.value = value;

        });

    }


    /* =====================================================
       CVV — NUMBERS ONLY
    ====================================================== */

    if (cardCvv) {

        cardCvv.addEventListener("input", () => {

            cardCvv.value =
                cardCvv.value
                    .replace(/\D/g, "")
                    .substring(0, 4);

        });

    }


    /* =====================================================
       VALIDATE PAYMENT
    ====================================================== */

    function validatePayment() {

        const selectedMethod =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            )?.value;


        /* CARD */

        if (selectedMethod === "card") {

            if (
                !cardNumber ||
                cardNumber.value.replace(/\D/g, "").length !== 16
            ) {

                alert("Please enter a valid card number.");

                cardNumber?.focus();

                return false;
            }


            if (
                !cardExpiry ||
                cardExpiry.value.replace(/\D/g, "").length !== 4
            ) {

                alert("Please enter a valid expiry date.");

                cardExpiry?.focus();

                return false;
            }


            if (
                !cardCvv ||
                cardCvv.value.length < 3
            ) {

                alert("Please enter a valid CVV.");

                cardCvv?.focus();

                return false;
            }


            if (
                !cardName ||
                cardName.value.trim() === ""
            ) {

                alert("Please enter the cardholder name.");

                cardName?.focus();

                return false;
            }

        }


        /* UPI */

        if (selectedMethod === "upi") {

            if (
                !upiId ||
                !upiId.value.trim()
            ) {

                alert("Please enter your UPI ID.");

                upiId?.focus();

                return false;
            }

        }


        /* NET BANKING */

        if (selectedMethod === "netbanking") {

            if (
                !bankSelect ||
                !bankSelect.value
            ) {

                alert("Please select your bank.");

                bankSelect?.focus();

                return false;
            }

        }


        return true;

    }


    /* =====================================================
       GENERATE RECEIPT NUMBER
    ====================================================== */

    function generateReceiptNumber() {

        const randomNumber =
            Math.floor(
                1000 + Math.random() * 9000
            );

        return `RCP-2026-${randomNumber}`;

    }


    /* =====================================================
       GET PAYMENT METHOD NAME
    ====================================================== */

    function getPaymentMethodName() {

        const selectedMethod =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            )?.value;

        if (selectedMethod === "upi") {
            return "UPI";
        }

        if (selectedMethod === "netbanking") {
            return "Net Banking";
        }

        return "Card";

    }


    /* =====================================================
       COMPLETE PAYMENT
    ====================================================== */

    if (confirmPaymentBtn) {

        confirmPaymentBtn.addEventListener(
            "click",
            () => {

                if (!validatePayment()) {
                    return;
                }


                /* Generate receipt */

                const newReceiptNumber =
                    generateReceiptNumber();

                const method =
                    getPaymentMethodName();


                /* Update receipt information */

                if (successReceiptNumber) {
                    successReceiptNumber.textContent =
                        newReceiptNumber;
                }

                if (receiptNumber) {
                    receiptNumber.textContent =
                        newReceiptNumber;
                }

                if (receiptMethod) {
                    receiptMethod.textContent =
                        method;
                }


                /* Disable button temporarily */

                confirmPaymentBtn.disabled = true;

                confirmPaymentBtn.innerHTML = `
                    <i class="fas fa-spinner fa-spin"></i>
                    Processing Payment...
                `;


                /* Simulated payment processing */

                setTimeout(() => {

                    confirmPaymentBtn.disabled = false;

                    confirmPaymentBtn.innerHTML = `
                        <i class="fas fa-lock"></i>
                        Confirm &amp; Pay ${paymentAmount}
                    `;


                    /* Hide checkout */

                    if (checkoutSection) {
                        checkoutSection.hidden = true;
                    }


                    /* Show success */

                    if (successSection) {
                        successSection.hidden = false;
                    }


                    /* Show receipt */

                    if (receiptSection) {
                        receiptSection.hidden = false;
                    }


                    /* Scroll to success */

                    if (successSection) {

                        successSection.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }, 1200);

            }
        );

    }


    /* =====================================================
       DOWNLOAD RECEIPT
    ====================================================== */

    function downloadReceipt() {

        const receiptNo =
            receiptNumber?.textContent.trim()
            || "RCP-2026-0000";

        const child =
            document.getElementById(
                "receiptChild"
            )?.textContent.trim()
            || "Alex";

        const program =
            document.getElementById(
                "receiptProgram"
            )?.textContent.trim()
            || "Creative Learning Program";

        const description =
            document.getElementById(
                "receiptDescription"
            )?.textContent.trim()
            || "Annual Program Fee";

        const date =
            document.getElementById(
                "receiptDate"
            )?.textContent.trim()
            || new Date().toLocaleDateString();


        /* Receipt text */

        const receiptText = `
LITTLE STEPS
Official Payment Receipt
----------------------------------------

Payment Successful

Receipt Number : ${receiptNo}
Child          : ${child}
Program        : ${program}
Description    : ${description}
Payment Date   : ${date}
Payment Method : ${receiptMethod?.textContent.trim() || "Card"}

Amount Paid    : ${paymentAmount}

----------------------------------------
Thank you for your payment.

This is a computer-generated payment receipt.
        `.trim();


        /* Create downloadable file */

        const blob =
            new Blob(
                [receiptText],
                {
                    type: "text/plain"
                }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `${receiptNo}.txt`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    }


    /* =====================================================
       DOWNLOAD BUTTONS
    ====================================================== */

    if (downloadReceiptBtn) {

        downloadReceiptBtn.addEventListener(
            "click",
            downloadReceipt
        );

    }


    if (receiptDownloadBtn) {

        receiptDownloadBtn.addEventListener(
            "click",
            downloadReceipt
        );

    }


    /* =====================================================
       PRINT RECEIPT
    ====================================================== */

    if (receiptPrintBtn) {

        receiptPrintBtn.addEventListener(
            "click",
            () => {

                window.print();

            }
        );

    }


    /* =====================================================
       PAYMENT HISTORY DOWNLOAD
    ====================================================== */

    if (paymentHistoryBody) {

        paymentHistoryBody.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        ".history-download-btn"
                    );

                if (!button) return;

                const receipt =
                    button.dataset.receipt
                    || "payment-receipt";

                const receiptText = `
LITTLE STEPS
Payment Receipt
----------------------------------------

Receipt Number : ${receipt}
Payment Status : Paid

This is a computer-generated payment receipt.
                `.trim();


                const blob =
                    new Blob(
                        [receiptText],
                        {
                            type: "text/plain"
                        }
                    );

                const url =
                    URL.createObjectURL(blob);

                const link =
                    document.createElement("a");

                link.href = url;

                link.download =
                    `${receipt}.txt`;

                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);

                URL.revokeObjectURL(url);

            }
        );

    }

});
/* =========================================================
   LOGOUT CONFIRMATION
   PART 3 — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const logoutBtn =
        document.getElementById("logoutBtn");

    const logoutOverlay =
        document.getElementById("logoutOverlay");

    const logoutYesBtn =
        document.getElementById("logoutYesBtn");

    const logoutNoBtn =
        document.getElementById("logoutNoBtn");


    /* =====================================================
       OPEN LOGOUT POPUP
    ====================================================== */

    if (logoutBtn && logoutOverlay) {

        logoutBtn.addEventListener("click", function (event) {

            event.preventDefault();

            logoutOverlay.hidden = false;

            document.body.classList.add(
                "logout-popup-open"
            );

        });

    }


    /* =====================================================
       YES — LOGOUT
    ====================================================== */

    if (logoutYesBtn) {

        logoutYesBtn.addEventListener("click", function () {

            /*
             * Go to login page
             */

            window.location.href = "login.html";

        });

    }


    /* =====================================================
       NO — STAY
    ====================================================== */

    if (logoutNoBtn && logoutOverlay) {

        logoutNoBtn.addEventListener("click", function () {

            /*
             * Close popup only.
             * User remains on the same page.
             */

            logoutOverlay.hidden = true;

            document.body.classList.remove(
                "logout-popup-open"
            );

        });

    }


    /* =====================================================
       CLICK OUTSIDE POPUP
    ====================================================== */

    if (logoutOverlay) {

        logoutOverlay.addEventListener("click", function (event) {

            if (event.target === logoutOverlay) {

                logoutOverlay.hidden = true;

                document.body.classList.remove(
                    "logout-popup-open"
                );

            }

        });

    }


    /* =====================================================
       ESC KEY
    ====================================================== */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            logoutOverlay &&
            !logoutOverlay.hidden
        ) {

            logoutOverlay.hidden = true;

            document.body.classList.remove(
                "logout-popup-open"
            );

        }

    });

});