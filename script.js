/* =========================================================
   PRAVIN KATKADE
   PREMIUM DATA / AI PORTFOLIO
   FINAL JAVASCRIPT
========================================================= */


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {
    const loader = document.querySelector(".page-loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("loaded");
        }, 700);
    }
});


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const scrollProgress = document.querySelector(".scroll-progress");

function updateScrollProgress() {
    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    if (scrollProgress) {
        scrollProgress.style.width = `${progress}%`;
    }
}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);

updateScrollProgress();


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.querySelector(".navbar");

function updateNavbar() {
    if (!navbar) return;

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);

updateNavbar();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        menuButton.classList.toggle("open");
        navLinks.classList.toggle("open");

    });

}


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-link").forEach((link) => {

    link.addEventListener("click", () => {

        if (menuButton) {
            menuButton.classList.remove("open");
        }

        if (navLinks) {
            navLinks.classList.remove("open");
        }

    });

});


/* =========================================================
   CINEMATIC REVEAL ANIMATIONS
========================================================= */

const revealElements = document.querySelectorAll(
    ".reveal"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");

            /*
                Animation happens only once.
                This makes the scrolling feel cinematic
                instead of constantly re-triggering.
            */

            revealObserver.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12,

        rootMargin:
            "0px 0px -70px 0px"
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   CINEMATIC HERO SCROLL
========================================================= */

const cinematicHero =
    document.querySelector(".hero");

const cinematicHeroContent =
    document.querySelector(
        ".cinematic-hero-content"
    );

const cinematicHeroVisual =
    document.querySelector(
        ".cinematic-hero-visual"
    );

const cinematicHeroScroll =
    document.querySelector(
        ".hero-scroll"
    );

let cinematicScrollTicking = false;


function updateCinematicHero() {

    if (!cinematicHero) {

        cinematicScrollTicking = false;

        return;
    }


    const scrollY =
        window.scrollY;


    const heroHeight =
        Math.max(
            cinematicHero.offsetHeight,
            window.innerHeight
        );


    /*
        Convert scroll position into
        a value between 0 and 1.
    */

    const progress =
        Math.min(
            Math.max(
                scrollY /
                (heroHeight * 0.9),
                0
            ),
            1
        );


    /* =====================================================
       HERO TEXT
    ===================================================== */

    if (cinematicHeroContent) {

        cinematicHeroContent.style.transform =
            `
            translate3d(
                0,
                ${progress * -85}px,
                0
            )
            scale(
                ${1 - progress * 0.035}
            )
            `;


        cinematicHeroContent.style.opacity =
            String(
                1 -
                progress * 1.15
            );

    }


    /* =====================================================
       HERO PHOTO
    ===================================================== */

    if (cinematicHeroVisual) {

        cinematicHeroVisual.style.transform =
            `
            translate3d(
                0,
                ${progress * -48}px,
                0
            )
            scale(
                ${1 - progress * 0.09}
            )
            `;


        cinematicHeroVisual.style.opacity =
            String(
                1 -
                progress * 0.72
            );

    }


    /* =====================================================
       SCROLL INDICATOR
    ===================================================== */

    if (cinematicHeroScroll) {

        cinematicHeroScroll.style.opacity =
            String(
                Math.max(
                    0,
                    1 -
                    progress * 2.8
                )
            );


        cinematicHeroScroll.style.transform =
            `
            translate3d(
                0,
                ${progress * 24}px,
                0
            )
            `;

    }


    /* Add class after user starts scrolling */

    document.body.classList.toggle(
        "cinematic-active",
        progress > 0.08
    );


    cinematicScrollTicking = false;

}


/* =========================================================
   REQUEST ANIMATION FRAME
========================================================= */

function requestCinematicHeroUpdate() {

    if (!cinematicScrollTicking) {

        requestAnimationFrame(
            updateCinematicHero
        );

        cinematicScrollTicking = true;

    }

}


window.addEventListener(
    "scroll",
    requestCinematicHeroUpdate,
    {
        passive: true
    }
);


window.addEventListener(
    "resize",
    requestCinematicHeroUpdate
);


updateCinematicHero();


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".nav-link"
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                const id =
                    entry.target.getAttribute(
                        "id"
                    );


                navigationLinks.forEach(
                    (link) => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute(
                                "href"
                            ) === `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    }
                );

            });

        },
        {
            threshold: 0.25
        }
    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================================================
   CURSOR LIGHT
========================================================= */

const cursorLight =
    document.querySelector(
        ".cursor-light"
    );


let cursorX = 0;
let cursorY = 0;

let lightX = 0;
let lightY = 0;


if (cursorLight) {

    window.addEventListener(
        "mousemove",
        (event) => {

            cursorX =
                event.clientX;

            cursorY =
                event.clientY;

        }
    );


    function animateCursorLight() {

        lightX +=
            (
                cursorX -
                lightX
            ) * 0.08;


        lightY +=
            (
                cursorY -
                lightY
            ) * 0.08;


        cursorLight.style.left =
            `${lightX}px`;

        cursorLight.style.top =
            `${lightY}px`;


        requestAnimationFrame(
            animateCursorLight
        );

    }


    animateCursorLight();

}


/* =========================================================
   HERO 3D MOUSE MOVEMENT
========================================================= */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


if (
    heroVisual &&
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    heroVisual.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                heroVisual.getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width;


            const y =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height;


            const rotateX =
                (
                    0.5 -
                    y
                ) * 8;


            const rotateY =
                (
                    x -
                    0.5
                ) * 8;


            heroVisual.style.transform =
                `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-4px)
                `;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            heroVisual.style.transform =
                "";

        }
    );

}


/* =========================================================
   PROJECT CARD 3D TILT
========================================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


if (
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    projectCards.forEach(
        (card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height;


                    const rotateX =
                        (
                            0.5 -
                            y
                        ) * 5;


                    const rotateY =
                        (
                            x -
                            0.5
                        ) * 5;


                    card.style.transform =
                        `
                        perspective(900px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-6px)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   BUTTON RIPPLE
========================================================= */

const buttons =
    document.querySelectorAll(
        ".button"
    );


buttons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            (event) => {

                const ripple =
                    document.createElement(
                        "span"
                    );


                const rect =
                    button.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;


                ripple.style.left =
                    `
                    ${
                        event.clientX -
                        rect.left -
                        size / 2
                    }px
                    `;


                ripple.style.top =
                    `
                    ${
                        event.clientY -
                        rect.top -
                        size / 2
                    }px
                    `;


                ripple.classList.add(
                    "button-ripple"
                );


                button.appendChild(
                    ripple
                );


                setTimeout(
                    () => {

                        ripple.remove();

                    },
                    650
                );

            }
        );

    }
);


/* =========================================================
   SKILL ROW HOVER
========================================================= */

const skillRows =
    document.querySelectorAll(
        ".skill-row"
    );


skillRows.forEach(
    (row) => {

        row.addEventListener(
            "mouseenter",
            () => {

                row.classList.add(
                    "hovered"
                );

            }
        );


        row.addEventListener(
            "mouseleave",
            () => {

                row.classList.remove(
                    "hovered"
                );

            }
        );

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.querySelector(
        ".contact-form"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        () => {

            const submitButton =
                contactForm.querySelector(
                    "button[type='submit']"
                );


            if (submitButton) {

                submitButton.innerHTML =
                    `
                    Sending
                    <span>→</span>
                    `;

            }

        }
    );

}


/* =========================================================
   CINEMATIC AMBIENT PARALLAX
========================================================= */

const ambientOne =
    document.querySelector(
        ".ambient-one"
    );

const ambientTwo =
    document.querySelector(
        ".ambient-two"
    );


let ambientTicking =
    false;


function updateAmbientParallax() {

    const y =
        window.scrollY;


    if (ambientOne) {

        ambientOne.style.transform =
            `
            translate3d(
                0,
                ${y * 0.035}px,
                0
            )
            `;

    }


    if (ambientTwo) {

        ambientTwo.style.transform =
            `
            translate3d(
                0,
                ${y * -0.02}px,
                0
            )
            `;

    }


    ambientTicking = false;

}


window.addEventListener(
    "scroll",
    () => {

        if (!ambientTicking) {

            requestAnimationFrame(
                updateAmbientParallax
            );

            ambientTicking = true;

        }

    },
    {
        passive: true
    }
);


updateAmbientParallax();


/* =========================================================
   SMOOTH INTERNAL NAVIGATION
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView(
                    {
                        behavior: "smooth",
                        block: "start"
                    }
                );

            }
        );

    }
);


/* =========================================================
   REDUCED MOTION SUPPORT
========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (reducedMotion.matches) {

    document.documentElement.style
        .scrollBehavior = "auto";

}
/* =========================================================
   PHOTO CURSOR INTERACTION
========================================================= */

const cinematicPhoto =
    document.querySelector(".cinematic-photo");

const photoFeather =
    document.querySelector(".photo-feather");


if (
    cinematicPhoto &&
    photoFeather &&
    window.matchMedia("(pointer:fine)").matches
) {

    cinematicPhoto.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                cinematicPhoto.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width;

            const y =
                (event.clientY - rect.top)
                / rect.height;


            const moveX =
                (x - 0.5) * 14;

            const moveY =
                (y - 0.5) * 10;


            photoFeather.style.transform =
                `
                translate3d(
                    ${moveX}px,
                    ${moveY - 8}px,
                    0
                )
                `;

        }
    );


    cinematicPhoto.addEventListener(
        "mouseleave",
        () => {

            photoFeather.style.transform = "";

        }
    );

}
