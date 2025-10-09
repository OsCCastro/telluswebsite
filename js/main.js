/**
 * Comportamiento frontal simplificado para el sitio estático de Tellus Consultoría.
 * Consolida los scripts originales de WordPress/Elementor en un paquete ligero
 * que mantiene las interacciones esenciales funcionando de forma local.
 */
(function () {
  "use strict";

  const ready = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  };

  const parseJSON = (value) => {
    if (!value) {
      return {};
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      console.warn("No fue posible interpretar la configuración JSON", error);
      return {};
    }
  };

  const toNumber = (value) => {
    const number = Number(value);
    return Number.isFinite(number) ? number : undefined;
  };

  const closeToggle = (toggle, navLayout) => {
    toggle.classList.remove("hfe-active-menu");
    toggle.setAttribute("aria-expanded", "false");
    if (navLayout) {
      navLayout.classList.remove("menu-is-active");
      navLayout.setAttribute("aria-hidden", "true");
    }
  };

  const setupNavigation = () => {
    const toggles = Array.from(
      document.querySelectorAll(".hfe-nav-menu__toggle"),
    );

    if (!toggles.length) {
      return;
    }

    const closeAll = () => {
      toggles.forEach((toggle) => {
        const navLayout = toggle.parentElement?.nextElementSibling;
        closeToggle(toggle, navLayout);
      });
    };

    toggles.forEach((toggle) => {
      const navLayout = toggle.parentElement?.nextElementSibling;
      if (!navLayout) {
        return;
      }

      navLayout.setAttribute("aria-hidden", "true");

      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const shouldOpen = !toggle.classList.contains("hfe-active-menu");

        closeAll();

        if (shouldOpen) {
          toggle.classList.add("hfe-active-menu");
          toggle.setAttribute("aria-expanded", "true");
          navLayout.classList.add("menu-is-active");
          navLayout.setAttribute("aria-hidden", "false");
        }
      });
    });

    document.addEventListener("click", (event) => {
      if (
        toggles.some((toggle) => {
          const navLayout = toggle.parentElement?.nextElementSibling;
          return (
            toggle.contains(event.target) ||
            (navLayout && navLayout.contains(event.target))
          );
        })
      ) {
        return;
      }

      closeAll();
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        closeAll();
      }
    });
  };

  const setupSubmenus = () => {
    document.querySelectorAll(".hfe-nav-menu .menu-item-has-children").forEach((item) => {
      const toggle = item.querySelector(".hfe-menu-toggle");
      const link = item.querySelector(".hfe-menu-item");

      if (!toggle) {
        return;
      }

      link?.setAttribute("aria-expanded", "false");

      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const isActive = item.classList.toggle("sub-menu-active");
        link?.setAttribute("aria-expanded", String(isActive));
      });
    });
  };

  const setupLazyload = () => {
    const lazyloadRunObserver = () => {
      const lazyloadBackgrounds = document.querySelectorAll(
        ".e-con.e-parent:not(.e-lazyloaded)",
      );

      const lazyloadBackgroundObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("e-lazyloaded");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "200px 0px 200px 0px" },
      );

      lazyloadBackgrounds.forEach((lazyloadBackground) => {
        lazyloadBackgroundObserver.observe(lazyloadBackground);
      });
    };

    lazyloadRunObserver();
    document.addEventListener("elementor/lazyload/observe", lazyloadRunObserver);
  };

  const cleanupSlide = (slide) => {
    const preserved = Array.from(slide.classList).filter((cls) => {
      return !cls.startsWith("swiper-slide-") && cls !== "swiper-slide";
    });

    slide.className = ["swiper-slide", ...preserved].join(" ").trim();
    slide.removeAttribute("data-swiper-slide-index");
    slide.removeAttribute("style");
    slide.removeAttribute("role");
    slide.removeAttribute("aria-label");
    slide.removeAttribute("aria-hidden");
    slide.removeAttribute("inert");
    slide.querySelectorAll("[style]").forEach((child) => {
      child.removeAttribute("style");
    });
  };

  const normaliseSwiperMarkup = (container) => {
    const wrapper = container.querySelector(".swiper-wrapper");
    if (!wrapper) {
      return;
    }

    const slides = Array.from(wrapper.children).filter((child) =>
      child.classList.contains("swiper-slide"),
    );

    if (!slides.length) {
      return;
    }

    const uniqueSlides = [];
    const seen = new Set();

    slides.forEach((slide, index) => {
      const key = slide.getAttribute("data-swiper-slide-index") ?? index;
      if (seen.has(key)) {
        return;
      }
      seen.add(key);

      const clone = slide.cloneNode(true);
      cleanupSlide(clone);
      uniqueSlides.push(clone);
    });

    if (uniqueSlides.length) {
      wrapper.innerHTML = "";
      uniqueSlides.forEach((slide) => wrapper.appendChild(slide));
    }

    container.classList.remove(
      "swiper-initialized",
      "swiper-horizontal",
      "swiper-pointer-events",
      "swiper-backface-hidden",
      "swiper-rtl",
      "swiper-autoheight",
    );

    container.removeAttribute("style");
    container.removeAttribute("dir");
    container.removeAttribute("aria-live");
    container.removeAttribute("aria-label");
    container.removeAttribute("aria-roledescription");
    wrapper.removeAttribute("id");
    wrapper.removeAttribute("style");
    container
      .querySelectorAll(".swiper-notification, .swiper-pagination, .swiper-scrollbar")
      .forEach((el) => el.remove());
  };

  const buildImageCarouselOptions = (settings) => {
    const mobileSlides = toNumber(settings?.slides_to_show_mobile);
    const tabletSlides = toNumber(settings?.slides_to_show_tablet);
    const desktopSlides =
      toNumber(settings?.slides_to_show) || tabletSlides || mobileSlides || 1;

    const mobileGroup =
      toNumber(settings?.slides_to_scroll_mobile) ||
      toNumber(settings?.slides_to_scroll_tablet) ||
      toNumber(settings?.slides_to_scroll) ||
      1;
    const tabletGroup =
      toNumber(settings?.slides_to_scroll_tablet) || mobileGroup || 1;
    const desktopGroup =
      toNumber(settings?.slides_to_scroll) || tabletGroup || mobileGroup || 1;

    const mobileSpace = toNumber(settings?.image_spacing_custom_mobile?.size);
    const tabletSpace = toNumber(settings?.image_spacing_custom_tablet?.size);
    const desktopSpace = toNumber(settings?.image_spacing_custom?.size) || 0;

    const options = {
      slidesPerView: mobileSlides || tabletSlides || desktopSlides,
      slidesPerGroup: mobileGroup,
      spaceBetween: mobileSpace ?? tabletSpace ?? desktopSpace,
      loop: settings?.infinite === "yes",
      speed: toNumber(settings?.speed) || 500,
      allowTouchMove: true,
    };

    const breakpoints = {};

    if (tabletSlides || tabletGroup || tabletSpace !== undefined) {
      breakpoints[768] = {
        slidesPerView: tabletSlides || desktopSlides,
        slidesPerGroup: tabletGroup,
        spaceBetween: tabletSpace ?? desktopSpace,
      };
    }

    breakpoints[1024] = {
      slidesPerView: desktopSlides,
      slidesPerGroup: desktopGroup,
      spaceBetween: desktopSpace,
    };

    options.breakpoints = breakpoints;

    if (settings?.autoplay === "yes") {
      options.autoplay = {
        delay: toNumber(settings?.autoplay_speed) || 5000,
        disableOnInteraction: settings?.pause_on_interaction !== "no",
      };
    }

    return options;
  };

  const buildTestimonialOptions = (config) => {
    const options = {
      slidesPerView: config?.slidesPerView || 1,
      slidesPerGroup: config?.slidesPerGroup || 1,
      spaceBetween: config?.spaceBetween || 0,
      speed: config?.speed || 500,
      loop: Boolean(config?.loop),
      allowTouchMove: true,
    };

    if (config?.autoplay) {
      options.autoplay = {
        delay: config?.autoplaySpeed || 5000,
        disableOnInteraction: true,
      };
    }

    if (config?.breakpoints) {
      const breakpoints = {};
      Object.entries(config.breakpoints).forEach(([width, values]) => {
        const breakpointWidth = Number(width);
        if (!Number.isFinite(breakpointWidth)) {
          return;
        }

        breakpoints[breakpointWidth] = {
          slidesPerView: values.slidesPerView ?? options.slidesPerView,
          slidesPerGroup: values.slidesPerGroup ?? options.slidesPerGroup,
          spaceBetween: values.spaceBetween ?? options.spaceBetween,
        };
      });

      options.breakpoints = breakpoints;
    }

    return options;
  };

  const setupSwipers = () => {
    if (typeof Swiper === "undefined") {
      console.warn("Swiper library is not loaded. Skipping sliders.");
      return;
    }

    document
      .querySelectorAll(".elementor-widget-image-carousel .swiper")
      .forEach((container) => {
        normaliseSwiperMarkup(container);
        const widget = container.closest(".elementor-widget-image-carousel");
        const settings = parseJSON(widget?.getAttribute("data-settings"));
        const options = buildImageCarouselOptions(settings);
        const instance = new Swiper(container, options);

        if (options.autoplay && options.autoplay.disableOnInteraction) {
          container.addEventListener("mouseleave", () => {
            instance.autoplay?.start();
          });
        }
      });

    document
      .querySelectorAll(".elementskit-testimonial-slider .swiper")
      .forEach((container) => {
        normaliseSwiperMarkup(container);
        const widget = container.closest(".elementskit-testimonial-slider");
        const config = parseJSON(widget?.getAttribute("data-config"));
        const options = buildTestimonialOptions(config);
        const instance = new Swiper(container, options);

        if (config?.pauseOnHover && options.autoplay) {
          container.addEventListener("mouseenter", () => {
            instance.autoplay?.stop();
          });
          container.addEventListener("mouseleave", () => {
            instance.autoplay?.start();
          });
        }
      });
  };

  ready(() => {
    setupNavigation();
    setupSubmenus();
    setupLazyload();
    setupSwipers();
  });
})();
