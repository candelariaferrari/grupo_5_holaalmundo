/* boton desplegable responsive */
const toggleButton = document.getElementById("toggle-button");
const navList = document.getElementById("navList");
toggleButton.addEventListener('click', () => {
  navList.classList.toggle('active');
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
document.body.appendChild(template.content);

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
