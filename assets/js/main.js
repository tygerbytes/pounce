
(function() {

  function throttle(func, params) {
    if (func.throttled) {
      return;
    }
    func.throttled = true;
    func(params);
    window.setTimeout(() => func.throttled = false, 100);
  }

  var header = {
    me: document.getElementById('page-header'),
    links: document.getElementById('header-links'),
    logo: document.getElementById('header-logo'),
    lastY: 999999,

    toggleVisibility: function() {
      header.links.classList.toggle('visible');
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
    menu: document.getElementById('site-menu'),
    isToggled: false,

    toggleMenu:  function(e) {
      if (e) {
        e.preventDefault();
      }
      this.toggleButton.classList.toggle('expanded');
      this.isToggled = (this.toggleButton.classList.contains('expanded'));
      // The rotated bars convey the state visually; aria-expanded is what says
      // it to a screen reader.
      this.toggleButton.setAttribute('aria-expanded', String(this.isToggled));
      this.menu.classList.toggle('visible');
      header.toggleVisibility();
    },

    closeMenu: function() {
      if (!this.isToggled) {
        return;
      }
      this.toggleMenu();
      // The menu just became visibility:hidden. Without this, focus would be
      // stranded on a link inside it and the next Tab would start from the top
      // of the document.
      this.toggleButton.focus();
    },

    // The toggle sits before the menu in the document, so it is the natural
    // first stop; tabbing past the last link wraps back round to it.
    tabStops: function() {
      return [this.toggleButton].concat(
        Array.prototype.slice.call(this.menu.querySelectorAll('a[href]'))
      );
    },

    // The overlay covers the page but does not remove it, so without a trap
    // Tab walks straight out of the menu and into content the visitor cannot
    // see.
    trapFocus: function(e) {
      if (!this.isToggled || e.key !== 'Tab') {
        return;
      }
      var items = this.tabStops();
      if (items.length === 0) {
        return;
      }
      var current = items.indexOf(document.activeElement);

      if (current === -1) {
        // Focus is somewhere behind the overlay; pull it back in.
        e.preventDefault();
        items[0].focus();
      } else if (e.shiftKey && current === 0) {
        e.preventDefault();
        items[items.length - 1].focus();
      } else if (!e.shiftKey && current === items.length - 1) {
        e.preventDefault();
        items[0].focus();
      }
    }
  };

  hamburger.toggleButton.addEventListener('click', function(e) {
    hamburger.toggleMenu(e);
  });

  // Escape is the expected way out of an overlay menu. Enter and Space need no
  // handling: the toggle is a real <button>.
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hamburger.closeMenu();
    } else {
      hamburger.trapFocus(e);
    }
  });

  function scrollHandler(e) {
    let scrollY = window.scrollY;
    header.toggleSticky(scrollY);
  }
  window.addEventListener('scroll', (e) => throttle(scrollHandler, e));

})();
