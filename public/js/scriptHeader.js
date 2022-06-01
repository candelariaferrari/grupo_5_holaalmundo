/* boton desplegable responsive */
const toggleButton = document.getElementById("toggle-button");
const navList = document.getElementById("navList");
toggleButton.addEventListener('click', () => {
  navList.classList.toggle('active');
})

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
