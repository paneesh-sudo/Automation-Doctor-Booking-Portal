document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const slideCount = slides.children.length;
    let currentIndex = 0;

    function changeSlide() {
        currentIndex = (currentIndex + 1) % slideCount; // Loop back to the first slide
        const offset = -currentIndex * 100; // Calculate offset in percentage
        slides.style.transform = `translateX(${offset}%)`;
    }

    setInterval(changeSlide, 5000); // Change slide every 3 seconds
});
