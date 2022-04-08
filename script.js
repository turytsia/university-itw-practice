const navigation = document.getElementById('header-nav-bg')
const navigation_list = navigation.firstElementChild.firstElementChild
const navigation_hamburger = document.getElementById('header-nav-hamburger')
    // icons
const icons = {
    'Index': 'fa-solid fa-house',
    'O předmětu': 'fa-solid fa-circle-info',
    'Přednášky': 'fa-solid fa-tv',
    'Výsledky': 'fa-solid fa-face-grin-beam-sweat',
    'Cvičení': 'fa-solid fa-hammer',
    'Kontakt': 'fa-solid fa-envelope',
    'Související': 'fa-solid fa-code-branch',
    'bars': 'fa-solid fa-bars'
}

//<li><a href="#about">o předmětu</a></li>

const about = document.getElementById('op-about')
const lectures = document.getElementById('op-lectures')
const results = document.getElementById('op-results')
const excersices = document.getElementById('op-excersices')
const contact = document.getElementById('op-contact')
const footer = document.getElementById('op-footer')

about.addEventListener('click', scroll_handler.bind(null, document.getElementById('about')))
lectures.addEventListener('click', scroll_handler.bind(null, document.getElementById('lectures')))
results.addEventListener('click', scroll_handler.bind(null, document.getElementById('results')))
excersices.addEventListener('click', scroll_handler.bind(null, document.getElementById('excersices')))
contact.addEventListener('click', scroll_handler.bind(null, document.getElementById('footer')))
footer.addEventListener('click', scroll_handler.bind(null, document.getElementById('footer')))

function create_item(inner_html, target, show_text = false) {
    const navigation_item = document.createElement('li')
    navigation_item.addEventListener('click', scroll_handler.bind(null, document.getElementById(target)))
    const navigation_link = document.createElement('a')
    const icon = document.createElement('i')
    icon.className = icons[inner_html]
    if (show_text)
        navigation_link.innerHTML = inner_html
    navigation_link.prepend(icon)
    navigation_item.appendChild(navigation_link)

    return navigation_item
}

function remove_children(element) {
    let first_child = element.firstElementChild
    while (first_child) {
        first_child.remove()
        first_child = element.firstElementChild
    }
}

function scroll_handler(target) {
    if (target) {
        navigation_hamburger.classList.remove('navigation_hamburger--active')
        target.scrollIntoView({
            behavior: "smooth"
        });
    }
}

function resize_handler() {
    remove_children(navigation_list)
    if (window.innerWidth < 576) {
        navigation_list.appendChild(create_item('Index', 'header', true))
            //bars
        const bars = document.createElement('i')
        bars.className = icons['bars']
        navigation_list.appendChild(bars)
        bars.addEventListener('click', () => {
            navigation_hamburger.classList.toggle('navigation_hamburger--active')
        })
    } else if (window.innerWidth >= 576 && window.innerWidth <= 992) {
        navigation_list.appendChild(create_item("Index", 'header', true));
        navigation_list.appendChild(create_item("O předmětu", 'about'));
        navigation_list.appendChild(create_item("Přednášky", 'lectures'));
        navigation_list.appendChild(create_item("Výsledky", 'results'));
        navigation_list.appendChild(create_item("Cvičení", 'excersices'));
        navigation_list.appendChild(create_item("Kontakt", 'footer'));
        navigation_list.appendChild(create_item("Související", 'footer'));
    } else {
        navigation_list.appendChild(create_item("Index", 'header', true));
        navigation_list.appendChild(create_item("O předmětu", 'about', true));
        navigation_list.appendChild(create_item("Přednášky", 'lectures', true));
        navigation_list.appendChild(create_item("Výsledky", 'results', true));
        navigation_list.appendChild(create_item("Cvičení", 'excersices', true));
        navigation_list.appendChild(create_item("Kontakt", 'footer', true));
        navigation_list.appendChild(create_item("Související", 'footer', true));
    }
}

resize_handler()

window.addEventListener('resize', resize_handler)