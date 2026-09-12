"use strict";


/* ==========================================================
   MOBILE MENU
========================================================== */

const menuButton =
    document.querySelector(".menu-button");

const mobileMenu =
    document.querySelector(".mobile-menu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        () => {

            const open =
                menuButton.getAttribute(
                    "aria-expanded"
                ) === "true";

            menuButton.setAttribute(
                "aria-expanded",
                String(!open)
            );

            menuButton.classList.toggle(
                "active"
            );

            mobileMenu.classList.toggle(
                "open"
            );

        }
    );


    mobileMenu
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuButton.classList.remove(
                        "active"
                    );

                    mobileMenu.classList.remove(
                        "open"
                    );

                }
            );

        });

}



/* ==========================================================
   SMOOTH INTERNAL NAVIGATION
========================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            function (event) {

                const href =
                    this.getAttribute("href");

                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(href);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const reduceMotion =
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches;

                target.scrollIntoView({

                    behavior:
                        reduceMotion
                            ? "auto"
                            : "smooth",

                    block: "start"

                });

            }
        );

    });



/* ==========================================================
   MOBILE BOTTOM NAV ACTIVE STATE
========================================================== */

const trackedSections = [

    {
        id: "home",
        nav: "home"
    },

    {
        id: "experience",
        nav: "experience"
    },

    {
        id: "project",
        nav: "experience"
    },

    {
        id: "education",
        nav: "education"
    },

    {
        id: "skills",
        nav: "skills"
    },

    {
        id: "certification",
        nav: "skills"
    },

    {
        id: "contact",
        nav: "contact"
    }

];


const bottomLinks =
    document.querySelectorAll(
        ".bottom-link"
    );


function updateBottomNav() {

    if (
        window.innerWidth >
        850
    ) {
        return;
    }

    const position =
        window.scrollY +
        window.innerHeight * 0.35;

    let activeNav =
        "home";


    trackedSections.forEach(
        (item) => {

            const section =
                document.getElementById(
                    item.id
                );

            if (
                section &&
                section.offsetTop <=
                    position
            ) {

                activeNav =
                    item.nav;
            }

        }
    );


    bottomLinks.forEach(
        (link) => {

            const target =
                link
                    .getAttribute("href")
                    .replace("#", "");

            link.classList.toggle(
                "active",
                target === activeNav
            );

        }
    );

}


let ticking =
    false;


window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            requestAnimationFrame(
                () => {

                    updateBottomNav();

                    ticking = false;

                }
            );

            ticking = true;
        }

    },
    {
        passive: true
    }
);


window.addEventListener(
    "resize",
    updateBottomNav,
    {
        passive: true
    }
);


updateBottomNav();
