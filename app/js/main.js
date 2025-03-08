// Иконка меню на экранах мобильных устройств

let lastScrollY = window.scrollY;
const menuIcon = document.querySelector('.menu-icon');

window.addEventListener('scroll', () => {
	if (window.scrollY > lastScrollY) {
		menuIcon.style.opacity = '0';
	} else {
		menuIcon.style.opacity = '1';
	}
	lastScrollY = window.scrollY;
});


// Стрелочка вверх, которая появляется при скролле
const scrollToTopButton = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
	if (window.scrollY > 300) {
		scrollToTopButton.style.display = 'flex';
	} else {
		scrollToTopButton.style.display = 'none';
	}
});

scrollToTopButton.addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});

