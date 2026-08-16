/* =========================================================
   PRAVIN KATKADE
   PREMIUM PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader =
        document.querySelector(".page-loader");

    setTimeout(() => {

        loader.classList.add("loaded");

    }, 700);

});


/* =========================================================
   CURSOR LIGHT
========================================================= */

const cursorLight =
    document.querySelector(".cursor-light");


let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;


window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;

    mouseY = event.clientY;

});


function animateCursor() {

    currentX +=
        (mouseX - currentX) * 0.08;

    currentY +=
        (mouseY - currentY) * 0.08;


    if (cursorLight) {

        cursorLight.style.left =
            `${currentX}px`;

        cursorLight.style.top =
            `${currentY}px`;

    }


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();


/* =========================================================
   NAVBAR SCROLL
========================================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    () => {

        if (!navbar) return;


        if (window.scrollY > 40) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    },
    { passive: true }
);


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const scrollProgress =
    document.querySelector(
        ".scroll-progress"
    );


function updateScrollProgress() {

    const scrollTop =
        window.scrollY;


    const documentHeight =
        document.documentElement
            .scrollHeight;


    const viewportHeight =
        window.innerHeight;


    const scrollable =
        documentHeight -
        viewportHeight;


    if (scrollable <= 0) return;


    const progress =
        (scrollTop / scrollable) * 100;


    scrollProgress.style.width =
        `${progress}%`;

}


window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);


updateScrollProgress();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton =
    document.querySelector(
        ".menu-button"
    );


const nav =
    document.querySelector(
        ".nav-links"
    );


if (menuButton && nav) {

    menuButton.addEventListener(
        "click",
        () => {

            menuButton.classList.toggle(
                "open"
            );

            nav.classList.toggle(
                "open"
            );

        }
    );


    document
        .querySelectorAll(".nav-link")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    menuButton.classList.remove(
                        "open"
                    );

                    nav.classList.remove(
                        "open"
                    );

                }
            );

        });

}


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    targetId === "#"
                ) return;


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const offset = 78;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    offset;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });

            }
        );

    });


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");


                        revealObserver
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },

        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -50px 0px"
        }

    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


const sectionObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        const id =
                            entry.target.id;


                        navLinks.forEach(
                            (link) => {

                                link.classList
                                    .remove(
                                        "active"
                                    );


                                if (
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${id}`
                                ) {

                                    link.classList
                                        .add(
                                            "active"
                                        );

                                }

                            }
                        );

                    }

                }
            );

        },

        {
            rootMargin:
                "-30% 0px -60% 0px",

            threshold: 0
        }

    );


sections.forEach(
    (section) => {

        sectionObserver.observe(
            section
        );

    }
);


/* =========================================================
   HERO PHOTO PARALLAX
========================================================= */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


const photoFrame =
    document.querySelector(
        ".photo-frame"
    );


let heroMouseX = 0;
let heroMouseY = 0;

let heroCurrentX = 0;
let heroCurrentY = 0;


if (
    heroVisual &&
    photoFrame
) {

    window.addEventListener(
        "mousemove",
        (event) => {

            if (
                window.innerWidth < 900
            ) return;


            const rect =
                heroVisual
                    .getBoundingClientRect();


            const relativeX =
                event.clientX -
                (
                    rect.left +
                    rect.width / 2
                );


            const relativeY =
                event.clientY -
                (
                    rect.top +
                    rect.height / 2
                );


            heroMouseX =
                relativeX /
                rect.width;


            heroMouseY =
                relativeY /
                rect.height;

        }
    );


    function animatePhoto() {

        heroCurrentX +=
            (
                heroMouseX -
                heroCurrentX
            ) * 0.04;


        heroCurrentY +=
            (
                heroMouseY -
                heroCurrentY
            ) * 0.04;


        const rotateY =
            heroCurrentX * 8;


        const rotateX =
            heroCurrentY * -6;


        photoFrame.style.transform =
            `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            `;


        requestAnimationFrame(
            animatePhoto
        );

    }


    animatePhoto();

}


/* =========================================================
   PHOTO SCROLL PARALLAX
========================================================= */

const profilePhoto =
    document.querySelector(
        ".profile-photo"
    );


function photoScrollEffect() {

    if (
        !profilePhoto ||
        window.innerWidth < 760
    ) return;


    const scroll =
        window.scrollY;


    const heroHeight =
        window.innerHeight;


    if (
        scroll < heroHeight
    ) {

        const movement =
            scroll * 0.035;


        profilePhoto.style.transform =
            `translateY(${movement}px)`;

    }

}


window.addEventListener(
    "scroll",
    photoScrollEffect,
    { passive: true }
);


/* =========================================================
   PROJECT CARD TILT
========================================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth < 900
                ) return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateY =
                    (
                        (x - centerX) /
                        centerX
                    ) * 2.5;


                const rotateX =
                    (
                        (centerY - y) /
                        centerY
                    ) * 2.5;


                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-9px)
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


                ripple.style.position =
                    "absolute";


                ripple.style.borderRadius =
                    "50%";


                ripple.style.pointerEvents =
                    "none";


                ripple.style.background =
                    "rgba(255,255,255,0.18)";


                ripple.style.width =
                    "10px";


                ripple.style.height =
                    "10px";


                const rect =
                    button.getBoundingClientRect();


                ripple.style.left =
                    `${event.clientX - rect.left - 5}px`;


                ripple.style.top =
                    `${event.clientY - rect.top - 5}px`;


                ripple.animate(

                    [
                        {
                            transform:
                                "scale(1)",

                            opacity: 0.8
                        },

                        {
                            transform:
                                "scale(25)",

                            opacity: 0
                        }
                    ],

                    {
                        duration: 600,

                        easing:
                            "ease-out"
                    }

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
   SKILL ROW MOUSE EFFECT
========================================================= */

const skillRows =
    document.querySelectorAll(
        ".skill-row"
    );


skillRows.forEach(
    (row) => {

        row.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    row.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const percent =
                    (
                        x /
                        rect.width
                    ) * 100;


                row.style.background =
                    `
                    radial-gradient(
                        circle at ${percent}% 50%,
                        rgba(129,114,243,0.055),
                        transparent 40%
                    )
                    `;

            }
        );


        row.addEventListener(
            "mouseleave",
            () => {

                row.style.background =
                    "";

            }
        );

    }
);


/* =========================================================
   CONTACT FORM FEEDBACK
========================================================= */

const contactForm =
    document.querySelector(
        ".contact-form"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        () => {

            const button =
                contactForm.querySelector(
                    ".submit-button"
                );


            if (button) {

                button.innerHTML =
                    `
                    Sending...

                    <span>→</span>
                    `;

            }

        }
    );

}


/* =========================================================
   INTERACTION WITH FORM FIELDS
========================================================= */

const formInputs =
    document.querySelectorAll(
        ".form-field input, .form-field textarea"
    );


formInputs.forEach(
    (input) => {

        input.addEventListener(
            "focus",
            () => {

                input
                    .closest(".form-field")
                    .classList
                    .add("focused");

            }
        );


        input.addEventListener(
            "blur",
            () => {

                input
                    .closest(".form-field")
                    .classList
                    .remove("focused");

            }
        );

    }
);


/* =========================================================
   ESC KEY CLOSES MOBILE MENU
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            menuButton?.classList.remove(
                "open"
            );

            nav?.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   PERFORMANCE
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            document
                .querySelectorAll(
                    ".photo-orbit, .photo-glow, .floating-label"
                )
                .forEach(
                    (element) => {

                        element.style
                            .animationPlayState =
                            "paused";

                    }
                );

        } else {

            document
                .querySelectorAll(
                    ".photo-orbit, .photo-glow, .floating-label"
                )
                .forEach(
                    (element) => {

                        element.style
                            .animationPlayState =
                            "running";

                    }
                );

        }

    }
);