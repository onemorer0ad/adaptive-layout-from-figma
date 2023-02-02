(() => {
  let hamburger = document.querySelector(".hamburger");
  let menu = document.querySelector(".header__nav-wrap");
  let menuLinks = menu.querySelectorAll(".header__link");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("is-active");

    menu.classList.toggle("header__nav-wrap--active");
    menu.style.transition = "visibility var(--short), transform var(--short)";

    document.body.classList.toggle("stop-scroll");
  });

  menu.addEventListener("transitionend", function () {
    if (!menu.classList.contains("header__nav-wrap--active")) {
      menu.removeAttribute("style");
    }
  });

  menuLinks.forEach((element) => {
    element.addEventListener("click", function () {
      hamburger.classList.remove("is-active");

      menu.classList.remove("header__nav-wrap--active");

      document.body.classList.remove("stop-scroll");
    });
  });
})();

(() => {
  const swiper = new Swiper(".js-hero-slider", {
    slidesPerView: 1,

    loop: true,

    pagination: {
      el: ".js-hero-pagination",
      type: "bullets",
      clickable: true,
    },
  });
})();

(() => {
  const firstParams = {
    tabsBtnClass: "js-tab-btn",
    wrap: "js-tabs-wrap",
    content: "js-tab-content",
    active: "active",
  };

  function setTabs(params) {
    const tabBtns = document.querySelectorAll(`.${params.tabsBtnClass}`);

    function onTabClick(e) {
      e.preventDefault();
      const path = e.target.dataset.path;
      const wrap = e.target.closest(`.${params.wrap}`);
      const currentContent = wrap.querySelector(
        `.${params.content}[data-target="${path}"]`
      );

      const contents = wrap.querySelectorAll(`.${params.content}`);

      contents.forEach((el) => {
        el.classList.remove(params.active);
      });

      currentContent.classList.add(params.active);

      tabBtns.forEach((el) => {
        el.classList.remove(params.active);
      });

      this.classList.add(params.active);
    }

    tabBtns.forEach(function (el) {
      el.addEventListener("click", onTabClick);
    });
  }

  setTabs(firstParams);
})();

new Accordion(".accordion-list", {
  elementClass: "accordion",
  triggerClass: "accordion__control",
  panelClass: "accordion__content",
  activeClass: "accordion--active",
});

(() => {
  function setSearch(params) {
    const openBtn = document.querySelector(`.${params.openBtnClass}`);
    const search = document.querySelector(`.${params.searchClass}`);
    const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

    search.addEventListener("animationend", function (evt) {
      if (this._isOpened) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
        this._isOpened = false;
      } else {
        this._isOpened = true;
      }
    });

    search.addEventListener("click", function (evt) {
      evt._isSearch = true;
    });

    openBtn.addEventListener("click", function (evt) {
      this.disabled = true;

      if (
        !search.classList.contains(params.activeClass) &&
        !search.classList.contains(params.hiddenClass)
      ) {
        search.classList.add(params.activeClass);
      }
    });

    closeBtn.addEventListener("click", function () {
      openBtn.disabled = false;
      search.classList.add(params.hiddenClass);
    });

    document.body.addEventListener("click", function (evt) {
      if (!evt._isSearch && search._isOpened) {
        openBtn.disabled = false;
        search.classList.add(params.hiddenClass);
      }
    });
  }

  setSearch({
    openBtnClass: "js-open-search", // класс кнопки открытия
    closeBtnClass: "js-close", // класс кнопки закрытия
    searchClass: "js-form", // класс формы поиска
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed", // класс закрывающегося состояния (удаляется сразу после закрытия)
  });
})();
