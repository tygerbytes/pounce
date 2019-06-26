
(function() {
  var hamburger = {
    toggleButton: document.getElementById('hamburger-toggle'),

    headerLinks: document.getElementById('header-links'),
    siteMenu: document.querySelector('.site-menu'),
    headerLogo: document.getElementById('header-logo'),

    toggleMenu:  function(e) {
      e.preventDefault();
      this.toggleButton.classList.toggle('expanded');
      this.headerLinks.classList.toggle('visible');
      this.siteMenu.classList.toggle('visible');
      this.headerLogo.classList.toggle('visible-override');
    }
  };

  hamburger.toggleButton.addEventListener('click', function(e) {
    hamburger.toggleMenu(e);
  });
})();
