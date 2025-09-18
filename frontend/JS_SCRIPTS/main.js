const AppObj = {};

Object.defineProperty(AppObj, 'fname', {
  value: function() {
    let elems = document.querySelectorAll('[data-Class]');
    let firstNavBodySet = false;
    
    elems.forEach((elem) => {
      let dataClass = elem.getAttribute('data-Class');
      let dataType = elem.getAttribute('data-Type');
      
      if (!this[dataClass]) {
        this[dataClass] = {};
      }
      
      this[dataClass][dataType] = elem;
      
      if (dataType === "navBody") {
        if (!firstNavBodySet) {
          elem.style.display = "block";
          firstNavBodySet = true;
        } else {
          elem.style.display = "none";
        }
      }
      
      if (dataType === "mainNav") {
        elem.addEventListener('click', () => {
          
          for (let group in this) {
            if (this[group].navBody) {
              this[group].navBody.style.display = "none";
            }
            if (this[group].associate) {
  this[group].associate.style.display = 'none'
}
            if (this[group].mainNav) {
              const ancestor = this[group].mainNav.parentElement;
              if (ancestor) {
                ancestor.classList.remove('active');
              }
            }
          }
          

        
          const target = this[dataClass].navBody;
        if (target) {
      target.style.display = "flex";
      }

      if (this[dataClass].associate) {
  this[dataClass].associate.style.display = "flex";
        }

          const clickedAncestor = elem.parentElement;
          if (clickedAncestor) {
            clickedAncestor.classList.add('active');
          }
          if(elem.classList.contains('notification-dot')){
            elem.classList.remove('notification-dot')
          }
        });
      
      }
    });
   
  },
  enumerable: false
});

AppObj.fname();
document.querySelectorAll('.memory-slider-wrapper').forEach((wrapper) => {
  const memorySlider = wrapper.querySelector('.memory-slider');
  const memoryImages = wrapper.querySelectorAll('img.mem_img, video.mem_img');
  const dotContainer = wrapper.querySelector('.slider-dots');

  let memIndex = 0;
  let autoSlideTimeout;
  let startX = 0;

  const DELAY = {
    auto_image: 6000,
    user_image: 8000
  };

  // Create slider dots
  memoryImages.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      memIndex = i;
      updateMemorySlider(true);
    });
    dotContainer.appendChild(dot);
  });

  const dots = dotContainer.querySelectorAll('.dot');

  function updateMemorySlider(userTriggered = false) {
    memorySlider.style.transform = `translateX(-${memIndex * 100}%)`;

    memoryImages.forEach((el, i) => {
      el.classList.toggle('active', i === memIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === memIndex);
    });

    scheduleNextSlide(userTriggered);
  }

  function goToNextSlide() {
    memIndex = (memIndex + 1) % memoryImages.length;
    updateMemorySlider();
  }

  function scheduleNextSlide(userTriggered = false) {
    clearTimeout(autoSlideTimeout);

    const current = memoryImages[memIndex];
    const isVideo = current.tagName.toLowerCase() === 'video';

    memoryImages.forEach((el) => {
      if (el.tagName.toLowerCase() === 'video' && el !== current) {
        el.pause?.();
        el.currentTime = 0;
      }
    });

    if (isVideo) {
    
      current.play?.().catch(() => {});
      const delay = userTriggered ? DELAY.user_image : DELAY.user_image + 2000;
      autoSlideTimeout = setTimeout(goToNextSlide, delay);
    } else {
      const delay = userTriggered ? DELAY.user_image : DELAY.auto_image;
      autoSlideTimeout = setTimeout(goToNextSlide, delay);
    }
  }

  function handleMemorySwipe(startX, endX) {
    const diff = endX - startX;
    const threshold = 50;

    if (diff > threshold && memIndex > 0) {
      memIndex--;
      updateMemorySlider(true);
    } else if (diff < -threshold && memIndex < memoryImages.length - 1) {
      memIndex++;
      updateMemorySlider(true);
    }
  }

  // Swipe detection
  wrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  wrapper.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    handleMemorySwipe(startX, endX);
  });
  
  // Start slider
  updateMemorySlider();
});

// Lazy load all images/videos
document.querySelectorAll('img, video').forEach((el) => {
  el.setAttribute('loading', 'lazy');
});

// Close intro with fade and scroll-to-top
document.querySelectorAll('.close').forEach((elem) => {
  elem.addEventListener('click', () => {
    const intro = elem.parentElement;
    intro.classList.add('fade-out');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Remove intro after fade
    setTimeout(() => {
      intro.remove()
    }, 300);
  });
});

let hideTimeout, removeTimeout;

function showExtras() {
  const magnify = document.querySelector('.magNify');
  
  clearTimeout(hideTimeout);
  clearTimeout(removeTimeout);
  
  magnify.classList.remove('hide');
  magnify.style.display = 'flex';
  
  hideTimeout = setTimeout(() => {
    magnify.classList.add('hide');
    
    removeTimeout = setTimeout(() => {
      magnify.style.display = 'none';
    }, 500);
  }, 5000);
}
