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

    const pointsElements = document.querySelectorAll(".list_item .item");

    if(pointsElements.length > 0){        
        
        ymaps.ready(init);

        function init() {
            const myMap = new ymaps.Map("map", {
                center: [55.7558, 37.6173], // Центр
                zoom: 10
            });

            myMap.behaviors.disable("scrollZoom"); // Отключаем зум колесом мыши

            const points = [];
            
            pointsElements.forEach(item => {
                const coords = item.getAttribute("data-coords")?.split(",").map(Number) || [0, 0];
                const title = item.querySelector(".title")?.textContent.trim();
                const address = item.querySelector(".contact_body.address")?.textContent.trim();
                const phone = item.querySelector(".phone")?.textContent.trim();
                const email = item.querySelector(".email")?.textContent.trim();
                const worktime = item.querySelector(".worktime")?.textContent.trim();
                const img = item.querySelector(".image img")?.getAttribute("src");
                const urlPage = item.querySelector(".link")?.getAttribute("href");

                points.push({ coords, title, address, phone, email, worktime, img, urlPage });
            });

            points.forEach(point => {
                let balloonContent = `<div class="baloon_map">`;

                if (point.title) {
                    balloonContent += `<a href="${point.urlPage || '#'}" class="name">${point.title}</a>`;
                }
                if (point.img) {
                    balloonContent += `<img src="${point.img}" style="width:100%; margin:10px 0;">`;
                }
                if (point.address) {
                    balloonContent += `<p><b>Адрес:</b> ${point.address}</p>`;
                }
                if (point.phone) {
                    balloonContent += `<p><b>Телефон:</b> <a href="tel:${point.phone}">${point.phone}</a></p>`;
                }
                if (point.email) {
                    balloonContent += `<p><b>Email:</b> <a href="mailto:${point.email}">${point.email}</a></p>`;
                }
                balloonContent += `<div class="baloon_bottom">`;
                if (point.worktime) {
                    balloonContent += `<div class="baloon_bottom"><p><b>График работы:</b> ${point.worktime}</p></div>`;
                }
                if (point.urlPage) {
                    balloonContent += `<a href="${point.urlPage}" style="color: blue;">Подробнее</a>`;
                }

                balloonContent += `</div></div>`;

                const placemark = new ymaps.Placemark(
                    point.coords,
                    { balloonContent },
                    { preset: "islands#icon", iconColor: "#0095b6" }
                );

                myMap.geoObjects.add(placemark);
            });

        }
    }


    const pointPage = document.querySelector('.point_page');

    if (pointPage) {
        ymaps.ready(initPage);

        function initPage() {
            const coords = pointPage.getAttribute("data-coords").split(",").map(Number);
            const title = pointPage.querySelector(".title").textContent.trim();
            const address = pointPage.querySelector(".address").textContent.trim();
            const phone = pointPage.querySelector(".phone").textContent.trim();
            const email = pointPage.querySelector(".email").textContent.trim();
            const worktime = pointPage.querySelector(".worktime").textContent.trim();
            const img = pointPage.getAttribute("data-img");

            var myMapPage = new ymaps.Map("map_point", {
                center: coords, // Координаты центра
                zoom: 10
            });

            myMapPage.behaviors.disable("scrollZoom");

            var placemark = new ymaps.Placemark(
                coords, 
                {
                    balloonContent: `
                        <div class="baloon_map">
                            <div class="name">${title}</div>
                            <img src="${img}" style="width:100%; margin:10px 0;">
                            <p><b>Адрес:</b> ${address}</p>
                            <p><b>Телефон:</b> <a href="tel:${phone}">${phone}</a></p>
                            <p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
                            <div class="baloon_bottom">
                                <p><b>График работы:</b> ${worktime}</p>
                            </div>
                        </div>
                    `
                },
                {
                    preset: "islands#icon",
                    iconColor: "#0095b6"
                }
            );

            myMapPage.geoObjects.add(placemark);
        }
    }

    if(document.querySelector('.mySwiper_gal')){
        const gallSwiper = new Swiper('.mySwiper_gal', {
            loop: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loopedSlides: 1,
            spaceBetween: 47,
            roundLengths: true,
            loopAdditionalSlides: 30,
            navigation: {
                nextEl: '.swiper-gal-next',
                prevEl: '.swiper-gal-prev',
            },
            lazy: true,
            breakpoints: {
                0: {
                    spaceBetween: 16,
                },
                768: {
                    spaceBetween: 30,
                },
                1100: {
                    spaceBetween: 47,
                },
            },
        });

        lightGallery(document.querySelector('.mySwiper_gal '), {
            animateThumb: false,
            zoomFromOrigin: false,
            allowMediaOverlap: true,
            toggleThumb: false,
            selector: 'a',
            counter: false,
            download: false
        });
    }

});

