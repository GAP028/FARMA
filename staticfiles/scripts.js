// Blog Carousel JavaScript
const blogs = [
    {
        id: 1,
        date: '3 AVRIL, 2023',
        title: 'Turpis at eleifend Aenean porta',
        description: 'Turpis at eleifend ps mi elit Aenean porta ac sed faucibus. Nunc urna...',
        image: 'images/blog1.jpeg', // Change to relative path
        link: '#'
    },
    {
        id: 2,
        date: '1 AVRIL, 2023',
        title: 'Morbi condimentum molestie Nam',
        description: 'Sed mauris Pellentesque elit Aliquam at lacus interdum nascetur elit...',
        image: 'images/blog2.jpeg', // Change to relative path
        link: '#'
    },
    {
        id: 3,
        date: '18 MARS, 2023',
        title: 'Curabitur at elit Vestibulum',
        description: 'Mi vitae magnis Fusce laoreet nibh felis porttitor laoreet Vestibulum...',
        image: 'images/blog3.jpeg', // Change to relative path
        link: '#'
    },
    {
        id: 5,
        date: '12 MARS, 2023',
        title: 'Etiam sit amet orci eget',
        description: 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient...',
        image: 'images/blog5.jpeg', // Change to relative path
        link: '#'
    }
];

const blogCarousel = document.getElementById('blog-carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let current = 0;

function updateCarousel() {
    blogCarousel.innerHTML = blogs.map(blog => `
        <div class="w-full flex-shrink-0 md:w-1/3 px-4">
            <div class="relative group">
                <img src="${blog.image}" alt="${blog.title}" class="w-full h-60 object-cover rounded-lg shadow-md" />
                <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>&gt;</span>
                </div>
            </div>
            <div class="text-left mt-4">
                <span class="text-green-600">${blog.date}</span>
                <h3 class="text-xl font-bold mt-2">${blog.title}</h3>
                <p class="text-gray-600 mt-2">${blog.description}</p>
                <a href="${blog.link}" class="text-blue-500 mt-2 inline-block">LIRE LA SUITE</a>
            </div>
        </div>
    `).join('');
    blogCarousel.style.transform = `translateX(-${current * 100}%)`;
}

prevBtn.addEventListener('click', () => {
    current = current === 0 ? blogs.length - 1 : current - 1;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    current = current === blogs.length - 1 ? 0 : current + 1;
    updateCarousel();
});

updateCarousel();

// Brands Grid JavaScript
const brands = [
    { src: 'images/a.jpeg', alt: 'AXS Health' },
    { src: 'images/b.jpeg', alt: 'BioZen Medical' },
    { src: 'images/c.jpeg', alt: 'Consure Medical' },
    { src: 'images/d.jpeg', alt: 'Healthcare' },
    { src: 'images/e.jpeg', alt: 'LifeOmic' },
    { src: 'images/f.jpeg', alt: 'Matrix Medical Network' },
    { src: 'images/g.jpeg', alt: 'Medical-X' },
    { src: 'images/h.jpeg', alt: 'PageMed' },
    { src: 'images/i.jpeg', alt: 'Primacy Medical Centre' },
    { src: 'images/j.jpeg', alt: 'Stomach Care' }
];

const brandsGrid = document.querySelector('.grid');
brandsGrid.innerHTML = brands.map(brand => `
    <div class="flex justify-center">
        <img src="${brand.src}" alt="${brand.alt}" class="brand-logo" />
    </div>
`).join('');

document.addEventListener('DOMContentLoaded', () => {
    const drawerToggleBtn = document.querySelector('.drawer-toggle-btn');
    const drawerNav = document.querySelector('.drawer-nav');
    const drawerOverlay = document.querySelector('.drawer-overlay');
    const submenuToggleBtn = document.querySelector('.submenu-toggle-btn');
    const submenu = document.querySelector('.submenu');
  
    drawerToggleBtn.addEventListener('click', () => {
      drawerNav.classList.toggle('open');
      drawerOverlay.classList.toggle('open');
    });
  
    drawerOverlay.addEventListener('click', () => {
      drawerNav.classList.remove('open');
      drawerOverlay.classList.remove('open');
    });
  
    submenuToggleBtn.addEventListener('click', () => {
      submenu.classList.toggle('open');
    });
  });
  