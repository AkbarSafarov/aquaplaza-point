document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tabs_title li");

    if(tabs){
        const tabBodies = document.querySelectorAll(".tab_body");

        tabs.forEach(tab => {
            tab.addEventListener("click", function (e) {
                e.preventDefault();
                
                const targetId = this.querySelector("a").getAttribute("href").substring(1);
                
                tabs.forEach(t => t.classList.remove("active"));
                tabBodies.forEach(body => body.classList.remove("active"));
                
                this.classList.add("active");
                document.getElementById(targetId).classList.add("active");
            });
        });
    }
});

ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.7558, 37.6173], // Москва
        zoom: 10
    });

    myMap.behaviors.disable("scrollZoom");

    var points = [
        {
            coords: [55.750446, 37.617494],
            title: "ТК Твой дом (г. Мытищи, Остафьевское ш., 2)",
            address: "г Москва, шоссе Энтузиастов, д 12 к 2",
            phone: "+74954765101",
            email: "info@site.ru",
            worktime: "Пн.-Пт. с 10 до 19",
            img: "files/point1.jpg",
            urlPage: "#"
        },
        {
            coords: [55.689444, 37.856667],
            title: "ТК Новый рынок (г. Видное, ул. Центральная, 5)",
            address: "г Видное, ул. Центральная, д 5",
            phone: "+74951234567",
            email: "contact@site.ru",
            worktime: "Ежедневно с 9 до 21",
            img: "files/point2.jpg",
            urlPage: "#"
        }
    ];

    points.forEach(point => {
        var placemark = new ymaps.Placemark(
            point.coords,
            {
                balloonContent: `
                    <div class="baloon_map">
                        <a href="${point.urlPage}" class="name">${point.title}</a>
                        <img src="${point.img}" style="width:100%; margin:10px 0;">
                        <p><b>Адрес:</b> ${point.address}</p>
                        <p><b>Телефон:</b> ${point.phone}</p>
                        <p><b>Email:</b> <a href="mailto:${point.email}">${point.email}</a></p>
                        <div class="baloon_bottom">
                            <p><b>График работы:</b> ${point.worktime}</p>
                            <a href="${point.urlPage}" style="color: blue;">Подробнее</a>
                        </div>
                    </div>
                `
            },
            {
                preset: "islands#icon",
                iconColor: "#0095b6"
            }
        );

        myMap.geoObjects.add(placemark);
    });
}


$(function(){

	// $('.slider_block_wr').each(function(){
	//     const slider = $(this).find('.swiper');
	//     const sliderId = slider.data('id');
	//     const sliderClass = '.' + sliderId;
	//     const arrow = slider.data('arrow');    

	//     const newProductsSwiper = new Swiper(sliderClass, {
	// 		loop: true,
	// 		slidesPerView: 1,
	// 		loopedSlides: 1,
	// 		navigation: {
	// 		    nextEl: '.swiper-' + arrow + '-next',
	// 		    prevEl: '.swiper-' + arrow + '-prev',
	// 		},
	// 		pagination: {
	// 			el: ".swiper-pagination",
	// 		},
	// 		effect: "fade",
	// 		lazy: true
	//     });
	// })


    // const newProductsSwiper = new Swiper('.slider-wrap_material', {
    //     loop: false,
    //     slidesPerView: 5,
    //     spaceBetween: 0,
    //     lazy: true,
    //     breakpoints: {
    //         0: {
    //           slidesPerView: 'auto',
    //           spaceBetween: 12,
    //           centeredSlides: true,
    //           loop: true,
    //         },
    //         768: {
    //           slidesPerView: 5,
    //           spaceBetween: 0,
    //         },
    //         1024: {
    //           slidesPerView: 5,
    //           spaceBetween: 0,
    //         },
    //     },
    // });
    
});
