let start = 0;

// next/previous controls
function plusSlides(classNum, n) {
  showSlide(classNum, (start += n));
}

function showSlide(classNum, n) {
  let classNameSlides = `image-${classNum}`;
  let dotsNameSlides = `dot-${classNum}`;
  let slides = document.getElementsByClassName(classNameSlides);
  let dots = document.getElementsByClassName(dotsNameSlides);
  if (n < 0) {
    n = 0;
    start = 0;
  }
  if (n >= slides.length - 1) {
    n = slides.length - 1;
    start = n;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = "dot dot-1";
  }

  slides[n].style.display = "block";
  dots[n].className += " active";
}
