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

    ymaps.ready(init);

    function init() {
        const myMap = new ymaps.Map("map", {
            center: [55.7558, 37.6173], // Центр
            zoom: 10
        });

        myMap.behaviors.disable("scrollZoom"); // Отключаем зум колесом мыши

        const points = [];
        const pointsElement = document.querySelectorAll(".list_item .item");

        if(pointsElement){
            pointsElement.forEach(item => {
                const coords = item.getAttribute("data-coords").split(",").map(Number);
                const title = item.querySelector(".title").textContent.trim();
                const address = item.querySelector(".contact_body.address").textContent.trim();
                const phone = item.querySelector(".phone").textContent.trim();
                const email = item.querySelector(".email").textContent.trim();
                const worktime = item.querySelector(".worktime").textContent.trim();
                const img = item.querySelector(".image img").getAttribute("src");
                const urlPage = item.querySelector(".link").getAttribute("href");

                points.push({ coords, title, address, phone, email, worktime, img, urlPage });
            });
        }

        points.forEach(point => {
            const placemark = new ymaps.Placemark(
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
});



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
