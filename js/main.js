document.addEventListener("DOMContentLoaded", function () {
	const menuIcon = document.querySelector('.header__menu-btn');
	const menuList = document.querySelector('.header__menu-list');
	const menuLinks = document.querySelectorAll(".header__menu-link");
	const scrollToTopButton = document.getElementById('scrollToTop');

	let lastScrollY = window.scrollY;
	let scrollTimeout;

	// Плавный скролл и скрытие стрелки вверх
	window.addEventListener('scroll', () => {
		const currentScrollY = window.scrollY;
		clearTimeout(scrollTimeout);

		// Скрываем/показываем меню-кнопку
		menuIcon.style.opacity = currentScrollY > lastScrollY ? '0' : '1';
		menuIcon.style.pointerEvents = currentScrollY > lastScrollY ? 'none' : 'auto';

		// Скрываем/показываем стрелку вверх
		if (currentScrollY < lastScrollY && currentScrollY > 300) {
			scrollToTopButton.style.opacity = '1';
			scrollToTopButton.style.visibility = 'visible';
		} else {
			scrollTimeout = setTimeout(() => {
				scrollToTopButton.style.opacity = '0';
				scrollToTopButton.style.visibility = 'hidden';
			}, 300);
		}

		lastScrollY = currentScrollY;
	});

	// Клик по стрелке вверх
	scrollToTopButton.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	// Открыть/закрыть меню
	menuIcon.addEventListener('click', function (event) {
		event.stopPropagation();
		menuList.classList.toggle('active');
		document.body.classList.toggle('no-scroll'); // Блокируем прокрутку страницы
		menuIcon.textContent = menuList.classList.contains('active') ? '✖' : '☰';
	});

	// Закрыть меню при клике на пункт
	menuLinks.forEach(link => {
		link.addEventListener("click", function () {
			menuList.classList.remove("active");
			document.body.classList.remove("no-scroll");
			menuIcon.textContent = '☰';
		});
	});


// Выделить текущую страницу в меню
	const currentURL = window.location.pathname; // Получаем путь страницы

	// Снимаем выделение со всех пунктов
	menuLinks.forEach(link => link.classList.remove("active"));

	// Проверяем, если мы на странице projects.html
	let isProjects = currentURL.includes("projects.html");

	if (isProjects) {
		// Если находимся на projects.html, выделяем пункт "Проекты"
		menuLinks.forEach(link => {
			if (link.getAttribute("href").includes("projects.html")) {
				link.classList.add("active");
			}
		});
	} else if (menuLinks.length > 0) {
		// В остальных случаях выделяем первый пункт меню
		menuLinks[0].classList.add("active");
	}
});



//projects

function updateVisibleImages() {
	const gallery = document.querySelector(".gallery");
	const computedStyle = window.getComputedStyle(gallery);
	const columns = computedStyle.getPropertyValue("grid-template-columns").split(" ").length;

	// Все изображения
	const allImages = document.querySelectorAll(".gallery-item");

	// Скрываем все
	allImages.forEach(img => {
			img.classList.add("hidden");
	});

	let imagesToShow = columns === 1 ? 3 : columns; // Если 1 колонка — показываем 3, иначе по количеству колонок

	// Показываем нужное количество изображений
	for (let i = 0; i < imagesToShow; i++) {
			if (allImages[i]) {
					allImages[i].classList.remove("hidden");
			}
	}
}

// Обновляем при загрузке и изменении экрана
window.addEventListener("load", updateVisibleImages);
window.addEventListener("resize", updateVisibleImages);

// Кнопка "Посмотреть еще"
document.getElementById("loadMore").addEventListener("click", function () {
	document.querySelectorAll(".gallery-item.hidden").forEach(img => img.classList.remove("hidden"));
	this.style.display = "none"; // Скрываем кнопку
});




