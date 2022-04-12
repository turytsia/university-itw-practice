$(document).ready(() => {
    const navigation = document.getElementById("header-nav-bg");
    const navigation_list = navigation.firstElementChild.firstElementChild;
    const navigation_hamburger = document.getElementById("header-nav-hamburger");
    // icons
    const icons = {
        Index: "fa-solid fa-house",
        "O předmětu": "fa-solid fa-circle-info",
        Přednášky: "fa-solid fa-tv",
        Výsledky: "fa-solid fa-face-grin-beam-sweat",
        Cvičení: "fa-solid fa-hammer",
        Kontakt: "fa-solid fa-envelope",
        Související: "fa-solid fa-code-branch",
        bars: "fa-solid fa-bars",
    };

    const id = {
        "O předmětu": "about",
        Přednášky: "lectures",
        Výsledky: "results",
        Cvičení: "excersices",
        Kontakt: "footer",
        Související: "footer",
    };
    $('#op-about').click(() => scroll_handler(document.getElementById("about")))
    $("#op-lectures").click(() => scroll_handler(document.getElementById("lectures")))
    $("#op-results").click(() => scroll_handler(document.getElementById("results")))
    $("#op-excersices").click(() => scroll_handler(document.getElementById("excersices")))
    $("#op-contact").click(() => scroll_handler(document.getElementById("footer")))
    $("#op-footer").click(() => scroll_handler(document.getElementById("footer")))

    function create_item(inner_html, show_text = false) {
        return `
        <li class = "option">
            <a>
                <i class = "${icons[inner_html]}"></i>
                <span>${show_text ? inner_html : ""}</span>
                <p class = "hover-text">${inner_html}</p>
            </a>
        </li>
        `;
    }

    function remove_children(element) {
        let first_child = element.firstElementChild;
        while (first_child) {
            first_child.remove();
            first_child = element.firstElementChild;
        }
    }

    function scroll_handler(target) {
        if (target) {
            navigation_hamburger.classList.remove("navigation_hamburger--active");
            target.scrollIntoView({
                behavior: "smooth",
            });
        }
    }

    function resize_handler() {
        remove_children(navigation_list);
        if (window.innerWidth < 576) {
            $(navigation_list).append(create_item("Index", "header", true));
            //bars

            $(navigation_list)
                .append(`<i class = "${icons["bars"]}"></i>`)
                .click(() => {
                    navigation_hamburger.classList.toggle("navigation_hamburger--active");
                });
        } else if (window.innerWidth >= 576 && window.innerWidth <= 992) {
            //.click(scroll_handler.bind(null, document.getElementById('about')))
            $(navigation_list)
                .append($(create_item("Index", true)))
                .bind(null, document.getElementById("header"));
            for (const key in id) {
                $(navigation_list).append(
                    $(create_item(key)).click(
                        scroll_handler.bind(null, document.getElementById(id[key]))
                    )
                );
            }

            $(".option")
                .mouseenter((e) => {
                    $(e.target).find("p.hover-text").css("display", "inline-block");
                })
                .mouseleave((e) => {
                    $(e.target).find("p.hover-text").css("display", "none");
                });
        } else {
            $(navigation_list)
                .append($(create_item("Index", true)))
                .bind(null, document.getElementById("header"));
            for (const key in id) {
                $(navigation_list).append(
                    $(create_item(key, true)).click(
                        scroll_handler.bind(null, document.getElementById(id[key]))
                    )
                );
            }
        }
    }

    resize_handler();

    window.addEventListener("resize", resize_handler);
});