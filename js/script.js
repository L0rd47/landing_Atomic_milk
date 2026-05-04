$(document).ready(function () {

    AOS.init({
        duration: 800,
        once: true,
        offset: 120,
        delay: 0,
        easing: 'ease-out'
    });


    const burger = document.getElementById('burger');
    const logo = document.getElementById('logo');
    const phone = document.getElementById('phone');
    const headerClose = document.getElementById('header-close');
    const logo3 = document.getElementById('logo3');
    const phoneOpen = document.getElementById('phone-open');
    const header = document.getElementById('header');
    const headerBottom = document.getElementById('header-bottom');
    const item1 = document.getElementById('item1');
    const item2 = document.getElementById('item2');
    const item3 = document.getElementById('item3');
    const item4 = document.getElementById('item4');
    const item5 = document.getElementById('item5');
    const item6 = document.getElementById('item6');
    const item7 = document.getElementById('item7');

    function closeMenu() {
        headerBottom.style.display = 'none';

        burger.style.display = 'block';
        logo.style.display = 'block';
        phone.style.display = 'block';

        headerClose.style.display = 'none';
        logo3.style.display = 'none';
        phoneOpen.style.display = 'none';
        header.classList.toggle('header_style');
    }

    burger.addEventListener('click', function () {

        headerBottom.style.display = 'flex';

        burger.style.display = 'none';
        logo.style.display = 'none';
        phone.style.display = 'none';

        headerClose.style.display = 'block';
        logo3.style.display = 'block';
        phoneOpen.style.display = 'block';
        header.classList.toggle('header_style');

    });

    headerClose.addEventListener('click', closeMenu);
    item1.addEventListener('click', closeMenu);
    item2.addEventListener('click', closeMenu);
    item3.addEventListener('click', closeMenu);
    item4.addEventListener('click', closeMenu);
    item5.addEventListener('click', closeMenu);
    item6.addEventListener('click', closeMenu);
    item7.addEventListener('click', closeMenu);

// Меняем картинку в хедере
    const sideImg = document.getElementById('header-picture');
    const defaultSrc = sideImg.src;

    document.querySelectorAll('.main-menu-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const newSrc = item.dataset.img;
            sideImg.src = newSrc;
        });

        item.addEventListener('mouseleave', () => {
            sideImg.src = defaultSrc;
        });
    });

// обрезка review
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trimEnd() + '...';
    }

    const elements = document.querySelectorAll('.review-text');

    if (window.innerWidth <= 767) {
        elements.forEach(el => {
            const fullText = el.textContent;
            el.textContent = truncateText(fullText, 100);
        });
    }
// открытие карточек
    const reviewModal = document.getElementById('reviewModal');
    const closeReviewModal = document.getElementById('closeReviewModal');
    const modalName = document.getElementById('modalName');
    const modalText = document.getElementById('modalText');
    const modalImage = document.getElementById('modalImage');

    document.querySelectorAll('.review-more').forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            const reviewCard = this.closest('.review');

            modalName.textContent = reviewCard.dataset.name;
            modalText.textContent = reviewCard.dataset.fulltext;
            modalImage.src = reviewCard.dataset.image;
            modalImage.alt = `${reviewCard.dataset.name}, отзыв`;

            reviewModal.showModal();
        });
    });

    closeReviewModal.addEventListener('click', () => {
        reviewModal.close();
    });

    reviewModal.addEventListener('click', (e) => {
        if (e.target === reviewModal) {
            reviewModal.close();
        }
    });

    reviewModal.addEventListener('close', () => {
        document.body.style.overflow = '';
    });

    reviewModal.addEventListener('cancel', (e) => {
        e.preventDefault();
        reviewModal.close();
    });
//слайдеры
    $('.products').slick({
        centerMode: true,
        slidesToScroll: 1,
        variableWidth: true,
        dots: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev macaroon-arrow"><img src="image/left.png" alt="Назад"></button>',
        nextArrow: '<button type="button" class="slick-next macaroon-arrow"><img src="image/right.png" alt="Вперед"></button>',
        infinite: true,
        speed: 500,
        autoplay: false,
        swipe: true,
        touchMove: true,
        accessibility: false,
    });


    $('.reviews-list').slick({
        centerMode: true,
        variableWidth: true,
        centerPadding: '100px',
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev macaroon-arrow"><img src="image/reviewLeft.png" alt="Назад"></button>',
        nextArrow: '<button type="button" class="slick-next macaroon-arrow"><img src="image/reviewRight.png" alt="Вперед"></button>',
        infinite: true,
        speed: 500,
        autoplay: false,
        swipe: true,
        touchMove: true,
        accessibility: false,
    });


    $('.merchandise-list').slick({
        centerMode: true,
        variableWidth: true,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev macaroon-arrow"><img src="image/left.png" alt="Назад"></button>',
        nextArrow: '<button type="button" class="slick-next macaroon-arrow"><img src="image/right.png" alt="Вперед"></button>',
        infinite: true,
        speed: 500,
        autoplay: false,
        swipe: true,
        touchMove: true,
        accessibility: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: true
                }
            },
        ]
    });

    const inputIndex = document.getElementById('input-index');
    const inputName = document.getElementById('input-name');
    const inputPhone = document.getElementById('input-phone');
    const loader = document.getElementById('loader');
    const inputs = document.querySelectorAll('.form-control');
    const thanksClose = document.getElementById('thanks-close');
    const thanks = document.querySelector('.thanks');
    const orderBtn = document.getElementById('order-form-btn');

    thanksClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        thanks.style.display = 'none';
    });


    inputPhone.onkeydown = function(e) {
        if ([8, 46, 37, 39, 9, 86].includes(e.keyCode) ||
            (e.ctrlKey && e.keyCode === 86) ||
            /[0-9]/.test(e.key)) {
            return;
        }
        e.preventDefault();
    };

    inputPhone.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '').slice(0, 11);
        let formatted = '+7 ';
        if (value.length > 1) formatted += `(${value.slice(1,4)}`;
        if (value.length > 4) formatted += `) ${value.slice(4,7)}`;
        if (value.length > 7) formatted += `-${value.slice(7,9)}`;
        if (value.length > 9) formatted += `-${value.slice(9,11)}`;

        e.target.value = formatted;
    });

    function validatePhone(value) {
        return /^\+?\d{10,15}$/.test(value.replace(/\s/g, ''));
    }

    function validateIndex(value) {
        return /^\d{6}$/.test(value);
    }

    orderBtn.addEventListener('click', function () {
        loader.style.display = 'flex';

        let hasError = false;

        inputs.forEach(input => {
            input.style.borderColor = '';
            if (input.nextElementSibling) {
                input.nextElementSibling.style.display = 'none';
            }
        });

        inputs.forEach(input => {
            const value = input.value.trim();

            if (!value) {
                if (input.nextElementSibling) {
                    input.nextElementSibling.style.display = 'block';
                }
                input.style.borderColor = 'red';
                hasError = true;
            } else if (input === inputPhone && !validatePhone(value)) {
                if (input.nextElementSibling) {
                    input.nextElementSibling.textContent = 'Введите корректный номер телефона';
                    input.nextElementSibling.style.display = 'block';
                }
                input.style.borderColor = 'red';
                hasError = true;
            } else if (input === inputIndex && !validateIndex(value)) {
                if (input.nextElementSibling) {
                    input.nextElementSibling.textContent = 'Введите корректный индекс';
                    input.nextElementSibling.style.display = 'block';
                }
                input.style.borderColor = 'red';
                hasError = true;
            }
        });

        if (hasError) {
            loader.style.display = 'none';
            return;
        }

        $.ajax({
            method: "POST",
            url: "https://testologia.ru/checkout",
            data: {product: inputIndex.value, name: inputName.value, phone: inputPhone.value}
        }).done(function (msg) {
            loader.style.display = 'none';
            if (msg.success) {
                thanks.style.display = 'block';
            } else {
                alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
            }
        });
    });
});