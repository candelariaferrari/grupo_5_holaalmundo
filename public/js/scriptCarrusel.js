/* --------- Carrusel inicial ----------*/
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activeDot", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " activeDot";
}



/* --- carrusel servicios ----- */
const serviceContainers = [...document.querySelectorAll('.serviceContainer')];// para que tome todos los servicios dentro de esa etiqueta
const nxtBtn = document.getElementsByClassName('nxtBtn');
const preBtn = document.getElementsByClassName('preBtn');

serviceContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener('click', () => {
    item.scrollLeft += containerWidth;
  })
  preBtn[i].addEventListener('click', () => {
    item.scrollLeft -= containerWidth;
  })
})





