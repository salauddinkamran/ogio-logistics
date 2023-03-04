// smooth scrolling 

gsap.registerPlugin(ScrollTrigger);

// // //////////////////////////////////
// smooth scrolling
// // //////////////////////////////////
function smoothScroll(content, viewport, smoothness) {
    content = gsap.utils.toArray(content)[0];
    smoothness = smoothness || 3;

    gsap.set(viewport || content.parentNode, { overflow: "hidden", position: "fixed", height: "100%", width: "100%", top: 0, left: 0, right: 0, bottom: 0 });
    gsap.set(content, { overflow: "visible", width: "100%" });

    let getProp = gsap.getProperty(content),
        setProp = gsap.quickSetter(content, "y", "px"),
        setScroll = ScrollTrigger.getScrollFunc(window),
        removeScroll = () => content.style.overflow = "visible",
        killScrub = trigger => {
            let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
            scrub && scrub.pause();
            trigger.animation.progress(trigger.progress);
        },
        height, isProxyScrolling;

    function refreshHeight() {
        height = content.clientHeight;
        content.style.overflow = "visible"
        document.body.style.height = height + "px";
        return height - document.documentElement.clientHeight;
    }

    ScrollTrigger.addEventListener("refresh", () => {
        removeScroll();
        requestAnimationFrame(removeScroll);
    })
    ScrollTrigger.defaults({ scroller: content });
    ScrollTrigger.prototype.update = p => p; // works around an issue in ScrollTrigger 3.6.1 and earlier (fixed in 3.6.2, so this line could be deleted if you're using 3.6.2 or later)

    ScrollTrigger.scrollerProxy(content, {
        scrollTop(value) {
            if (arguments.length) {
                isProxyScrolling = true;
                setProp(-value);
                setScroll(value);
                return;
            }
            return -getProp("y");
        },
        scrollHeight: () => document.body.scrollHeight,
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        }
    });

    return ScrollTrigger.create({
        animation: gsap.fromTo(content, { y: 0 }, {
            y: () => document.documentElement.clientHeight - height,
            ease: "none",
            onUpdate: ScrollTrigger.update
        }),
        scroller: window,
        invalidateOnRefresh: true,
        start: 0,
        end: refreshHeight,
        refreshPriority: -999,
        scrub: smoothness,
        onUpdate: self => {
            if (isProxyScrolling) {
                killScrub(self);
                isProxyScrolling = false;
            }
        },
        onRefresh: killScrub // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
    });
}
smoothScroll("#body-content");





// menu hidden fuction 

let menuBtn = document.querySelector("#menu");

menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".topbar").classList.add("active");
})

document.querySelector("#menu-cancel").addEventListener("click", () => {
    document.querySelector(".topbar").classList.remove("active");
})


//  AOS init 
AOS.init({
    // once:true
});
$(document).ready(function () {
    // ready function start

    // counter up js
    $('.counter').counterUp({
        time: 800
    });
    // swipper js
    new Swiper(".swiper-container", {
        spaceBetween: 50,
        slidesPerView: 3,
        centeredSlides: true,
        roundLengths: true,
        loop: true,
        // loopAdditionalSlides: 10,
        speed: 1000,
        center: true,
        pauseOnMouseEnter: true,
        autoplay: {
            delay: 3500,
        },
        breakpoints: {
            100: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            450: {
                slidesPerView: 1,
                spaceBetween: 40, 
            }
        }
    });
    new Swiper(".swiper-rating", {
        spaceBetween: 500,
        slidesPerView: 1,
        centeredSlides: true,
        roundLengths: true,
        loop: true,
        // loopAdditionalSlides: 10,
        speed: 1000,
        center: true,
        pauseOnMouseEnter: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // autoplay: {
        //     delay: 3500,
        // },
        // breakpoints: {
        //     100: {
        //         slidesPerView: 1,
        //     },
        //     768: {
        //         slidesPerView: 3,
        //         // spaceBetween: 40,
        //     },
        // }
    });

    // preloader function

    $("#preloader").fadeOut(1000)



})


