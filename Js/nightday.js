//! Night/Day mode toggle for CodeCraft Agency
const moonIcon = document.querySelector('.nightandday .fa-moon');
const sunIcon = document.querySelector('.nightandday .fa-sun');

function enableNightMode() {
    document.body.classList.add('night-mode');
    document.body.classList.remove('day-mode');
}

function enableDayMode() {
    document.body.classList.add('day-mode');
    document.body.classList.remove('night-mode');
}

moonIcon.addEventListener('click', enableNightMode);
sunIcon.addEventListener('click', enableDayMode);

const mobileToggle = document.querySelector('.mobile-nav-toggle');
const mobilePanel = document.querySelector('.mobile-nav-panel');
const mobileIcons = document.querySelectorAll('.mobile-nav-icon');
const mobileThemeButtons = document.querySelectorAll('.theme-btn');

if (mobileToggle && mobilePanel) {
    mobileToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        mobilePanel.classList.toggle('open');
        mobileToggle.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!mobilePanel.contains(event.target) && !mobileToggle.contains(event.target)) {
            mobilePanel.classList.remove('open');
            mobileToggle.classList.remove('active');
        }
    });

    mobileIcons.forEach((icon) => {
        icon.addEventListener('click', () => {
            mobilePanel.classList.remove('open');
            mobileToggle.classList.remove('active');
        });
    });

    mobileThemeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            if (theme === 'night') {
                enableNightMode();
                localStorage.setItem('theme', 'night');
            } else if (theme === 'day') {
                enableDayMode();
                localStorage.setItem('theme', 'day');
            }
        });
    });
}

// !Optional: Save mode in localStorage
if (localStorage.getItem('theme') === 'night') {
    enableNightMode();
} else if (localStorage.getItem('theme') === 'day') {
    enableDayMode();
}

moonIcon.addEventListener('click', () => {
    localStorage.setItem('theme', 'night');
});
sunIcon.addEventListener('click', () => {
    localStorage.setItem('theme', 'day');
});

// !Stats Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

//! Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

//! Services Slider with Navigation Arrows
function initServicesSlider() {
    const leftServ = document.querySelector('.services .container .left-serv');
    if (!leftServ) return;

    // Get all service boxes
    const serviceBoxes = leftServ.querySelectorAll('.service-box');
    if (serviceBoxes.length === 0) return;

    let currentIndex = 0;

    // Add navigation arrows
    const prevArrow = document.createElement('button');
    prevArrow.className = 'nav-arrow prev-arrow';
    prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';

    const nextArrow = document.createElement('button');
    nextArrow.className = 'nav-arrow next-arrow';
    nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';

    leftServ.appendChild(prevArrow);
    leftServ.appendChild(nextArrow);

    // Show first service box
    serviceBoxes.forEach((box, index) => {
        if (index === 0) {
            box.classList.add('active');
        }
    });

    // Function to show service by index
    function showService(index) {
        serviceBoxes.forEach((box, i) => {
            box.classList.remove('active');
            if (i === index) {
                box.classList.add('active');
            }
        });
    }

    // Previous button click
    prevArrow.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = serviceBoxes.length - 1;
        }
        showService(currentIndex);
    });

    // Next button click
    nextArrow.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= serviceBoxes.length) {
            currentIndex = 0;
        }
        showService(currentIndex);
    });
}

//! Initialize services slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initServicesSlider);

//! Portfolio Slider with Navigation Arrows
function initPortfolioSlider() {
    const leftProf = document.querySelector('.portfolio .container .left-prof');
    if (!leftProf) return;

    // Get all project boxes
    const projectBoxes = leftProf.querySelectorAll('.project-box');
    if (projectBoxes.length === 0) return;

    let currentIndex = 0;

    // Add navigation arrows
    const prevArrow = document.createElement('button');
    prevArrow.className = 'nav-arrow prev-arrow';
    prevArrow.innerHTML = '<i class="fas fa-chevron-left"></i>';

    const nextArrow = document.createElement('button');
    nextArrow.className = 'nav-arrow next-arrow';
    nextArrow.innerHTML = '<i class="fas fa-chevron-right"></i>';

    leftProf.appendChild(prevArrow);
    leftProf.appendChild(nextArrow);

    // Show first project box
    projectBoxes.forEach((box, index) => {
        if (index === 0) {
            box.classList.add('active');
        }
    });

    // Function to show project by index
    function showProject(index) {
        projectBoxes.forEach((box, i) => {
            box.classList.remove('active');
            if (i === index) {
                box.classList.add('active');
            }
        });
    }

    // Previous button click
    prevArrow.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = projectBoxes.length - 1;
        }
        showProject(currentIndex);
    });

    // Next button click
    nextArrow.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= projectBoxes.length) {
            currentIndex = 0;
        }
        showProject(currentIndex);
    });
}

//! Initialize portfolio slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initPortfolioSlider);
