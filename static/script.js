// Parallax scroll for .animate-float elements
function handleParallax() {
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  var parallax = document.querySelectorAll('.animate-float');
  var speed = 0.2;
  for (var i = 0; i < parallax.length; i++) {
    var yPos = -(scrolled * speed);
    parallax[i].style.transform = 'translateY(' + yPos + 'px)';
  }
}

// Intersection observer to pause/resume CSS animations until in view
function setupObserver() {
  var animated = document.querySelectorAll('.animate-float, .animate-glow, .animate-pulse-glow');
  if (!('IntersectionObserver' in window)) return;
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      } else {
        entry.target.style.animationPlayState = 'paused';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  for (var i = 0; i < animated.length; i++) {
    animated[i].style.animationPlayState = 'paused';
    observer.observe(animated[i]);
  }
}

window.addEventListener('scroll', handleParallax, { passive: true });
window.addEventListener('load', function(){
  handleParallax();
  setupObserver();
});


