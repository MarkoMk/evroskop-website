const carousel = document.getElementById("hero-carousel");

if (carousel) {
    const slides = Array.from(
        carousel.querySelectorAll(".hero-slide")
    );

    const dots = Array.from(
        carousel.querySelectorAll(".hero-dot")
    );

    const previousButton = document.getElementById("hero-prev");
    const nextButton = document.getElementById("hero-next");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let currentSlide = 0;
    let intervalId = null;

    const intervalTime = 5000;


    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === currentSlide;

            slide.classList.toggle("opacity-100", isActive);
            slide.classList.toggle("opacity-0", !isActive);

            slide.setAttribute(
                "aria-hidden",
                isActive ? "false" : "true"
            );
        });


        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === currentSlide;

            dot.classList.toggle("w-8", isActive);
            dot.classList.toggle("w-2.5", !isActive);

            dot.classList.toggle(
                "bg-evroskop-blue",
                isActive
            );

            dot.classList.toggle(
                "bg-gray-400/70",
                !isActive
            );

            if (isActive) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });
    }


    function nextSlide() {
        showSlide(currentSlide + 1);
    }


    function previousSlide() {
        showSlide(currentSlide - 1);
    }


    function startCarousel() {
        if (prefersReducedMotion) {
            return;
        }

        stopCarousel();

        intervalId = window.setInterval(
            nextSlide,
            intervalTime
        );
    }


    function stopCarousel() {
        if (intervalId) {
            window.clearInterval(intervalId);
            intervalId = null;
        }
    }


    nextButton?.addEventListener("click", () => {
        nextSlide();
        startCarousel();
    });


    previousButton?.addEventListener("click", () => {
        previousSlide();
        startCarousel();
    });


    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const targetSlide = Number(
                dot.dataset.slideTo
            );

            showSlide(targetSlide);
            startCarousel();
        });
    });


    carousel.addEventListener("mouseenter", stopCarousel);
    carousel.addEventListener("mouseleave", startCarousel);

    carousel.addEventListener("focusin", stopCarousel);
    carousel.addEventListener("focusout", startCarousel);


    showSlide(0);
    startCarousel();
}