
/*
 * Toggle display of element by ID
 */
function toggleDisplay(id) {
  var el = document.getElementById(id);
  
  if (el.style.display == '') {
    el.style.display = 'none';
  } else {
    el.style.display = '';
  }
}


function toggleMobileMenu() {
  toggleDisplay('site-nav-menu-mobile-btn-icon-open');
  toggleDisplay('site-nav-menu-mobile-btn-icon-close');
  toggleDisplay('site-nav-menu-mobile');
}


window.addEventListener('resize', function (event) {
  var el = document.getElementById('site-nav-menu-mobile');
  el.style.display = 'none';
  
  el = document.getElementById('site-nav-menu-mobile-btn-icon-open');
  el.style.display = '';
  
  el = document.getElementById('site-nav-menu-mobile-btn-icon-close');
  el.style.display = 'none';
});


// Attach FastClick to mobile menu buttons
FastClick.attach(document.getElementById('site-nav-menu-mobile-btn'));
