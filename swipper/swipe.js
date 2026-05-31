var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

// GSAP
gsap.to(".head_image img", {
    y: -20,                // move up
    duration: 1.2,         // time for one move
    ease: "power1.inOut",  // smooth in/out
    repeat: -1,            // infinite loop
    yoyo: true             // go back automatically
});