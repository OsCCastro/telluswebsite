/* Inline scripts extracted from index.html */

/* WordPress emoji support loader */
window._wpemojiSettings = {
  baseUrl: "https:\/\/s.w.org\/images\/core\/emoji\/15.0.3\/72x72\/",
  ext: ".png",
  svgUrl: "https:\/\/s.w.org\/images\/core\/emoji\/15.0.3\/svg\/",
  svgExt: ".svg",
  source: {
    concatemoji:
      "https:\/\/kitpro.site\/botanic\/wp-includes\/js\/wp-emoji-release.min.js?ver=6.7.3",
  },
};

!(function (i, n) {
  var o, s, e;
  function c(e) {
    try {
      var t = { supportTests: e, timestamp: new Date().valueOf() };
      sessionStorage.setItem(o, JSON.stringify(t));
    } catch (e) {}
  }
  function p(e, t, n) {
    (e.clearRect(0, 0, e.canvas.width, e.canvas.height),
      e.fillText(t, 0, 0));
    var t = new Uint32Array(
        e.getImageData(0, 0, e.canvas.width, e.canvas.height).data,
      ),
      r =
        (e.clearRect(0, 0, e.canvas.width, e.canvas.height),
        e.fillText(n, 0, 0),
        new Uint32Array(
          e.getImageData(0, 0, e.canvas.width, e.canvas.height).data,
        ));
    return t.every(function (e, t) {
      return e === r[t];
    });
  }
  function u(e, t, n) {
    switch (t) {
      case "flag":
        return n(
          e,
          "\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f",
          "\ud83c\udff3\ufe0f\u200b\u26a7\ufe0f",
        )
          ? !1
          : !n(
              e,
              "\ud83c\uddfa\ud83c\uddf3",
              "\ud83c\uddfa\u200b\ud83c\uddf3",
            ) &&
              !n(
                e,
                "\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f",
                "\ud83c\udff4\u200b\udb40\udc67\u200b\udb40\udc62\u200b\udb40\udc65\u200b\udb40\udc6e\u200b\udb40\udc67\u200b\udb40\udc7f",
              );
      case "emoji":
        return !n(
          e,
          "\ud83d\udc26\u200d\u2b1b",
          "\ud83d\udc26\u200b\u2b1b",
        );
    }
    return !1;
  }
  function f(e, t, n) {
    var r =
        "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
          ? new OffscreenCanvas(300, 150)
          : i.createElement("canvas"),
      a = r.getContext("2d", { willReadFrequently: !0 }),
      o = ((a.textBaseline = "top"), (a.font = "600 32px Arial"), {});
    return (
      e.forEach(function (e) {
        o[e] = t(a, e, n);
      }),
      o
    );
  }
  function t(e) {
    var t = i.createElement("script");
    ((t.src = e), (t.defer = !0), i.head.appendChild(t));
  }
  "undefined" != typeof Promise &&
    ((o = "wpEmojiSettingsSupports"),
    (s = ["flag", "emoji"]),
    (n.supports = { everything: !0, everythingExceptFlag: !0 }),
    (e = new Promise(function (e) {
      i.addEventListener("DOMContentLoaded", e, { once: !0 });
    })),
    new Promise(function (t) {
      var n = (function () {
        try {
          var e = JSON.parse(sessionStorage.getItem(o));
          if (
            "object" == typeof e &&
            "number" == typeof e.timestamp &&
            new Date().valueOf() < e.timestamp + 604800 &&
            "object" == typeof e.supportTests
          )
            return e.supportTests;
        } catch (e) {}
        return null;
      })();
      if (!n) {
        if (
          "undefined" != typeof Worker &&
          "undefined" != typeof OffscreenCanvas &&
          "undefined" != typeof URL &&
          URL.createObjectURL &&
          "undefined" != typeof Blob
        )
          try {
            var e =
                "postMessage(" +
                f.toString() +
                "(" +
                [JSON.stringify(s), u.toString(), p.toString()].join(
                  ",",
                ) +
                "));",
              r = new Blob([e], { type: "text/javascript" }),
              a = new Worker(URL.createObjectURL(r), {
                name: "wpTestEmojiSupports",
              });
            return void (a.onmessage = function (e) {
              (c((n = e.data)), a.terminate(), t(n));
            });
          } catch (e) {}
        c((n = f(s, u, p)));
      }
      t(n);
    })
      .then(function (e) {
        for (var t in e)
          ((n.supports[t] = e[t]),
            (n.supports.everything = n.supports.everything && n.supports[t]),
            "flag" !== t &&
              (n.supports.everythingExceptFlag =
                n.supports.everythingExceptFlag && n.supports[t]));
        ((n.supports.everythingExceptFlag =
          n.supports.everythingExceptFlag && !n.supports.flag),
          (n.DOMReady = !1),
          (n.readyCallback = function () {
            n.DOMReady = !0;
          }));
      })
      .then(function () {
        return e;
      })
      .then(function () {
        var e;
        n.supports.everything ||
          (n.readyCallback(),
          (e = n.source || {}).concatemoji
            ? t(e.concatemoji)
            : e.wpemoji && e.twemoji && (t(e.twemoji), t(e.wpemoji)));
      }));
})(window, window._wpemojiSettings);

/* Scroll to top behaviour */
(function (global) {
  function init($) {
    "use strict";
    $(document).ready(function () {
      const win = $(global);
      if (win.scrollTop() > 100) {
        $(".hfe-scroll-to-top-wrap").removeClass("hfe-scroll-to-top-hide");
      }

      win.on("scroll", function () {
        win.scrollTop() < 100
          ? $(".hfe-scroll-to-top-wrap").fadeOut(300)
          : $(".hfe-scroll-to-top-wrap").fadeIn(300);
      });

      $(".hfe-scroll-to-top-wrap").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 300);
        return !1;
      });
    });
  }

  if (global.jQuery) {
    init(global.jQuery);
  } else {
    global.addEventListener("DOMContentLoaded", function () {
      if (global.jQuery) {
        init(global.jQuery);
      }
    });
  }
})(window);

/* Elementor lazyload observer */
const lazyloadRunObserver = () => {
  const lazyloadBackgrounds = document.querySelectorAll(
    `.e-con.e-parent:not(.e-lazyloaded)`
  );
  const lazyloadBackgroundObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyloadBackground = entry.target;
          if (lazyloadBackground) {
            lazyloadBackground.classList.add("e-lazyloaded");
          }
          lazyloadBackgroundObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "200px 0px 200px 0px" },
  );
  lazyloadBackgrounds.forEach((lazyloadBackground) => {
    lazyloadBackgroundObserver.observe(lazyloadBackground);
  });
};

["DOMContentLoaded", "elementor/lazyload/observe"].forEach((event) => {
  document.addEventListener(event, lazyloadRunObserver);
});

/* Plugin configuration objects */
var elementskit = {
  resturl: "https://kitpro.site/botanic/wp-json/elementskit/v1/",
};

var elementorFrontendConfig = {
  environmentMode: {
    edit: false,
    wpPreview: false,
    isScriptDebug: false,
  },
  i18n: {
    shareOnFacebook: "Share on Facebook",
    shareOnTwitter: "Share on Twitter",
    pinIt: "Pin it",
    download: "Download",
    downloadImage: "Download image",
    fullscreen: "Fullscreen",
    zoom: "Zoom",
    share: "Share",
    playVideo: "Play Video",
    previous: "Previous",
    next: "Next",
    close: "Close",
    a11yCarouselWrapperAriaLabel:
      "Carousel | Horizontal scrolling: Arrow Left & Right",
    a11yCarouselPrevSlideMessage: "Previous slide",
    a11yCarouselNextSlideMessage: "Next slide",
    a11yCarouselFirstSlideMessage: "This is the first slide",
    a11yCarouselLastSlideMessage: "This is the last slide",
    a11yCarouselPaginationBulletMessage: "Go to slide",
  },
  is_rtl: false,
  breakpoints: { xs: 0, sm: 480, md: 768, lg: 1025, xl: 1440, xxl: 1600 },
  responsive: {
    breakpoints: {
      mobile: {
        label: "Mobile Portrait",
        value: 767,
        default_value: 767,
        direction: "max",
        is_enabled: true,
      },
      mobile_extra: {
        label: "Mobile Landscape",
        value: 880,
        default_value: 880,
        direction: "max",
        is_enabled: false,
      },
      tablet: {
        label: "Tablet Portrait",
        value: 1024,
        default_value: 1024,
        direction: "max",
        is_enabled: true,
      },
      tablet_extra: {
        label: "Tablet Landscape",
        value: 1200,
        default_value: 1200,
        direction: "max",
        is_enabled: false,
      },
      laptop: {
        label: "Laptop",
        value: 1366,
        default_value: 1366,
        direction: "max",
        is_enabled: false,
      },
      widescreen: {
        label: "Widescreen",
        value: 2400,
        default_value: 2400,
        direction: "min",
        is_enabled: false,
      },
    },
    hasCustomBreakpoints: false,
  },
  version: "3.25.9",
  is_static: false,
  experimentalFeatures: {
    e_font_icon_svg: true,
    additional_custom_breakpoints: true,
    container: true,
    e_swiper_latest: true,
    e_nested_atomic_repeaters: true,
    e_optimized_control_loading: true,
    e_onboarding: true,
    e_css_smooth_scroll: true,
    "hello-theme-header-footer": true,
    home_screen: true,
    "landing-pages": true,
    "nested-elements": true,
    editor_v2: true,
    "link-in-bio": true,
    "floating-buttons": true,
  },
  urls: {
    assets:
      "https:\/\/kitpro.site\/botanic\/wp-content\/plugins\/elementor\/assets\/",
    ajaxurl: "https:\/\/kitpro.site\/botanic\/wp-admin\/admin-ajax.php",
    uploadUrl:
      "https:\/\/kitpro.site\/botanic\/wp-content\/uploads\/sites\/288",
  },
  nonces: { floatingButtonsClickTracking: "d0cf65a55d" },
  swiperClass: "swiper",
  settings: { page: [], editorPreferences: [] },
  kit: {
    body_background_background: "classic",
    active_breakpoints: ["viewport_mobile", "viewport_tablet"],
    global_image_lightbox: "yes",
    lightbox_enable_counter: "yes",
    lightbox_enable_fullscreen: "yes",
    lightbox_enable_zoom: "yes",
    lightbox_enable_share: "yes",
    lightbox_title_src: "title",
    lightbox_description_src: "description",
    hello_header_logo_type: "title",
    hello_header_menu_layout: "horizontal",
    hello_footer_logo_type: "logo",
  },
  post: { id: 789, title: "Botanic", excerpt: "", featuredImage: false },
};

var jkit_ajax_url =
    "https://kitpro.site/botanic/?jkit-ajax-request=jkit_elements",
  jkit_nonce = "a39344c6d6";

var GutenverseFrontendConfig = {
  wpjson_url: "https:\/\/kitpro.site\/botanic\/wp-json/",
  wpjson_nonce: "1fb37b4484",
  wpjson_endpoint:
    "https:\/\/kitpro.site\/botanic\/wp-admin\/admin-ajax.php?action=rest-nonce",
  framework_asset:
    "https:\/\/kitpro.site\/botanic\/wp-content\/plugins\/gutenverse\/lib\/framework\/assets/",
  framework_version: "1.2.1",
  image_placeholder:
    "https:\/\/kitpro.site\/botanic\/wp-content\/plugins\/gutenverse\/lib\/framework\/assets\/img\/img-placeholder.jpg",
};

var GutenverseData = {
  postId: "789",
  homeUrl: "https:\/\/kitpro.site\/botanic",
  query: { q_search: null },
  settingsData: [],
  activePlugins: [
    "elementskit-lite\/elementskit-lite.php",
    "envato-elements\/envato-elements.php",
    "jeg-elementor-kit\/jeg-elementor-kit.php",
    "header-footer-elementor\/header-footer-elementor.php",
    "metform\/metform.php",
    "template-kit-export\/template-kit-export.php",
    "wp-rollback\/wp-rollback.php",
    "elementor\/elementor.php",
    "gutenverse\/gutenverse.php",
    "gutenverse-themes-builder\/themes-builder.php",
    "gutenverse-companion\/gutenverse-companion.php",
    "gutenverse-form\/gutenverse-form.php",
  ],
  featuredImage: "",
};

var GutenverseFormValidationData = {
  data: [],
  missingLabel:
    "Form action is missing, please assign form action into this form.",
  isAdmin: "",
};

var ekit_config = {
  ajaxurl: "https:\/\/kitpro.site\/botanic\/wp-admin\/admin-ajax.php",
  nonce: "bf93623525",
};
