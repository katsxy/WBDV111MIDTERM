const sliders = document.querySelectorAll(".slider");

sliders.forEach(slider => {

    const slides = slider.querySelector(".slides");
    const slide = slider.querySelectorAll(".slide");
    const dots = slider.querySelectorAll(".dot");

    let index = 0;

    const next = slider.querySelector(".next");
    const prev = slider.querySelector(".prev");

    function updateSlider(){

        slides.style.transform = `translateX(-${index * 400}px)`;

        dots.forEach(d => d.classList.remove("active"));
        dots[index].classList.add("active");

    }

    next.onclick = () => {
        index = (index + 1) % slide.length;
        updateSlider();
    };

    prev.onclick = () => {
        index = (index - 1 + slide.length) % slide.length;
        updateSlider();
    };

    dots.forEach((dot, i)=>{
        dot.onclick = ()=>{
            index = i;
            updateSlider();
        };
    });

/* AUTO SLIDE */

setInterval(()=>{
    index = (index + 1) % slide.length;
    updateSlider();
},4000);

});