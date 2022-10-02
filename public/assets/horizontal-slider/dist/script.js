const container = document.querySelector('.slider');
let scrollAmount = 0;
let scrollMax = container.clientWidth;

// Scroll next
document.querySelector('.next').onclick = function () {
  container.scrollTo({
    top: 0,
    left: scroll('right'),
    behavior: 'smooth' });

};

// Scroll prev
document.querySelector('.prev').onclick = function () {
  container.scrollTo({
    top: 0,
    left: scroll('left'),
    behavior: 'smooth' });

}; 


// Scroll/rewind function
function scroll(dir) {
  switch (dir) {
    case 'left':
      scrollAmount > 0 ? scrollAmount -= scrollMax : scrollAmount = container.scrollWidth - scrollMax;
      return scrollAmount;
      break;
    case 'right':
      scrollAmount <= container.scrollWidth - scrollMax ? scrollAmount += scrollMax : scrollAmount = 0;
      return scrollAmount;
      break;}

}


const slides = document.querySelectorAll('.item');

observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // if (entry.intersectionRatio > 0) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
});

slides.forEach(image => {
  observer.observe(image);
});


// ========================================================================================

const container1 = document.querySelector('.slider1');
let scrollAmount1 = 0;
let scrollMax1 = container1.clientWidth;

// Scroll next
document.querySelector('.next1').onclick = function () {
  container1.scrollTo({
    top: 0,
    left: scroll('right'),
    behavior: 'smooth' });

};

// Scroll prev
document.querySelector('.prev1').onclick = function () {
  container1.scrollTo({
    top: 0,
    left: scroll('left'),
    behavior: 'smooth' });

}; 


// Scroll/rewind function
function scroll(dir) {
  switch (dir) {
    case 'left':
      scrollAmount1 > 0 ? scrollAmount1 -= scrollMax1 : scrollAmount1 = container1.scrollWidth - scrollMax1;
      return scrollAmount1;
      break;
    case 'right':
      scrollAmount1 <= container1.scrollWidth - scrollMax1 ? scrollAmount1 += scrollMax1 : scrollAmount1 = 0;
      return scrollAmount1;
      break;}

}


const slides1 = document.querySelectorAll('.item1');

observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // if (entry.intersectionRatio > 0) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
});

slides1.forEach(image => {
  observer.observe(image);
});
