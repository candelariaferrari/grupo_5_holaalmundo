
/* boton desplegable responsive */
const toggleButton = document.getElementById("toggle-button");
const navList = document.getElementById("navList");
toggleButton.addEventListener('click', () => {
  navList.classList.toggle('active');
})

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

/* ---- scroll chat -- */
const body = document.body;
const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll == 0) {
    body.classList.remove(scrollUp);
    return;
  }
  else if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
    // down
    body.classList.remove(scrollUp);
    body.classList.add(scrollDown);
  } else {
    // up
    body.classList.add(scrollDown);
    /* body.classList.add(scrollUp); */
  }
  lastScroll = currentScroll;
});


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

/* ---- PREVIEW CARRITO ----- */
function openNav() {
  document.getElementById("previewCarrito").style.width = "250px";
  document.getElementById("main").style.marginRight = "250px";
}

function closeNav() {
  document.getElementById("previewCarrito").style.width = "0";
  document.getElementById("main").style.marginRight = "0";
}

const template = document.createElement('template');

template.innerHTML = `
  <div id="previewCarrito" class="sidebar">
      <div class="title">
        <h4>Mi carrito</h4>
        <div href="javascript:void(0)" class="closebtn" onclick="closeNav()">
          <i class="far fa-times-circle"></i>
        </div>
      </div>
      <div class="details">
        <p>Nombre del paquete</p>
        <p><strong>El detalle de lo que contiene el paquete</strong></p>
      </div>
      <div class="details">
        <p>Cantidad</p>
        <p><strong>1</strong></p>
      </div>
      <div class="details">
        <p>Precio</p>
        <p><strong>$5000</strong></p>
      </div>
     <button>
      <i class="far fa-trash-alt"></i>
       Borrar
      </button>
     <button>
      <i class="far fa-smile-wink"></i>
       Comprar
      </button>
    </div>
`;

document.body.appendChild(template.content);