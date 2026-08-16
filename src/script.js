/* =========================================================
   PRAVIN KATKADE PORTFOLIO
   JAVASCRIPT
========================================================= */


/* ================= CURSOR GLOW ================= */

const cursorGlow =
    document.querySelector(".cursor-glow");


window.addEventListener("mousemove", (event) => {

    if (!cursorGlow) return;

    cursorGlow.style.left =
        `${event.clientX}px`;

    cursorGlow.style.top =
        `${event.clientY}px`;

});


/* ================= MOBILE MENU ================= */

const menuButton =
    document.querySelector(".menu-btn");

const navLinks =
    document.querySelector(".nav-links");


if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        menuButton.textContent =
            navLinks.classList.contains("open")
                ? "✕"
                : "☰";

    });


    document
        .querySelectorAll(".nav-links a")
        .forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuButton.textContent = "☰";

            });

        });

}


/* ================= TYPING EFFECT ================= */

const typedText =
    document.querySelector(".typed-text");


const words = [

    "data-driven solutions.",

    "intelligent applications.",

    "AI/ML experiments.",

    "meaningful insights.",

    "software experiences."

];


let wordIndex = 0;

let charIndex = 0;

let deleting = false;


function typingAnimation() {

    if (!typedText) return;


    const currentWord =
        words[wordIndex];


    if (deleting) {

        charIndex--;

    } else {

        charIndex++;

    }


    typedText.textContent =
        currentWord.substring(
            0,
            charIndex
        );


    let speed =
        deleting
            ? 45
            : 85;


    if (
        !deleting &&
        charIndex === currentWord.length
    ) {

        speed = 1600;

        deleting = true;

    }


    else if (
        deleting &&
        charIndex === 0
    ) {

        deleting = false;

        wordIndex++;

        if (
            wordIndex >= words.length
        ) {

            wordIndex = 0;

        }

        speed = 400;

    }


    setTimeout(
        typingAnimation,
        speed
    );

}


typingAnimation();


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

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

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* ================= SCROLL PROGRESS ================= */

const progressBar =
    document.querySelector(
        ".scroll-progress"
    );


window.addEventListener("scroll", () => {

    if (!progressBar) return;


    const scrollTop =
        window.scrollY;


    const totalHeight =
        document.documentElement
            .scrollHeight
        - window.innerHeight;


    if (totalHeight <= 0) return;


    const percentage =
        (scrollTop / totalHeight) * 100;


    progressBar.style.width =
        `${percentage}%`;

});


/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navigationItems =
    document.querySelectorAll(
        ".nav-links a"
    );


const activeObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {

                    const currentId =
                        entry.target.id;


                    navigationItems
                        .forEach((link) => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute(
                                    "href"
                                ) ===
                                `#${currentId}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                }

            });

        },

        {
            threshold: 0.35
        }

    );


sections.forEach((section) => {

    activeObserver.observe(section);

});


/* ================= 3D PROJECT CARDS ================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach((card) => {


    card.addEventListener(
        "mousemove",
        (event) => {


            /*
             * Disable strong 3D effect
             * on small screens.
             */

            if (
                window.innerWidth < 700
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
                ((x - centerX) /
                    centerX) * 5;


            const rotateX =
                ((centerY - y) /
                    centerY) * 5;


            card.style.transform =
                `
                perspective(1000px)
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

});


/* ================= SKILL CARD EFFECT ================= */

const skillCards =
    document.querySelectorAll(
        ".skill-card"
    );


skillCards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            if (
                window.innerWidth < 700
            ) return;


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            card.style.background =
                `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(139,92,246,0.13),
                    rgba(255,255,255,0.035) 45%
                )
                `;
        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.background = "";

        }
    );

});


/* ================= BUTTON RIPPLE ================= */

const buttons =
    document.querySelectorAll(".btn");


buttons.forEach((button) => {

    button.addEventListener(
        "click",
        (event) => {


            const rect =
                button.getBoundingClientRect();


            const ripple =
                document.createElement(
                    "span"
                );


            ripple.classList.add(
                "ripple"
            );


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
                `${event.clientX - rect.left - size / 2}px`;


            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;


            button.appendChild(
                ripple
            );


            setTimeout(() => {

                ripple.remove();

            }, 600);

        }
    );

});


/* ================= HERO PARALLAX ================= */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            !heroVisual ||
            window.innerWidth < 700
        ) return;


        const scroll =
            window.scrollY;


        if (
            scroll <
            window.innerHeight
        ) {

            heroVisual.style.transform =
                `translateY(${scroll * 0.08}px)`;

        }

    }
);


/* ================= CONTACT GLOW ================= */

const contactCard =
    document.querySelector(
        ".contact-card"
    );


if (contactCard) {

    contactCard.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                contactCard.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            contactCard.style.background =
                `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    rgba(139,92,246,0.15),
                    rgba(255,255,255,0.035) 45%
                )
                `;
        }
    );


    contactCard.addEventListener(
        "mouseleave",
        () => {

            contactCard.style.background = "";

        }
    );

}


/* ================= CONSOLE ================= */

console.log(
    "%cPRAVIN KATKADE",
    "color:#22d3ee;font-size:22px;font-weight:bold;"
);


console.log(
    "%cData Science • AI/ML • Software Engineering",
    "color:#8b5cf6;font-size:14px;"
);