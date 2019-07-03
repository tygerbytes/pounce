
(function() {

  function throttle(func, params) {
    if (func.throttled) {
      return;
    }
    func.throttled = true;
    func(params);
    window.setTimeout(() => func.throttled = false, 300);
  }

  var header = {
    me: document.getElementById('page-header'),
    links: document.getElementById('header-links'),
    logo: document.getElementById('header-logo'),
    lastY: 999999,

    toggleVisibility: function() {
      header.links.classList.toggle('visible');
      header.logo.classList.toggle('visible-override');
      this.me.classList.toggle('hamburger-mode');
    },

    toggleSticky: function(scrollY) {
      var atTopOfWindow = scrollY < 100;
      var scrollingUp = scrollY < this.lastY;
      var hamburgerMenuOpen = hamburger.isToggled;

      var isSticky = (atTopOfWindow||  hamburgerMenuOpen || scrollingUp);
      this.me.classList.toggle('sticky', isSticky);

      this.lastY = scrollY;
    }
  };

  var hamburger = {
    toggleButton: document.getElementById('hamburger-toggle'),
    menu: document.querySelector('.site-menu'),
    isToggled: false,

    toggleMenu:  function(e) {
      e.preventDefault();
      this.toggleButton.classList.toggle('expanded');
      this.isToggled = (this.toggleButton.classList.contains('expanded'));
      this.menu.classList.toggle('visible');
      header.toggleVisibility();
    }
  };

  hamburger.toggleButton.addEventListener('click', function(e) {
    hamburger.toggleMenu(e);
  });

  function scrollHandler(e) {
    let scrollY = window.scrollY;
    header.toggleSticky(scrollY);
  }
  window.addEventListener('scroll', (e) => throttle(scrollHandler, e));

})();
