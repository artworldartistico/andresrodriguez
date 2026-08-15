/* =========================================================
   Ecosistemas de Gestión de Clientes — JS Vanilla
   Sin dependencias. Todo defensivo (no rompe si falta un nodo).
   ========================================================= */
   (function () {
    "use strict";
  
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var $ = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  
    /* ---------- Año footer ---------- */
    var y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  
    /* ---------- Header sticky ---------- */
    var header = $("#header");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("is-stuck", window.scrollY > 12);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  
    /* ---------- Menú móvil ---------- */
    var toggle = $("#navToggle");
    var links = $("#navLinks");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      $$("a", links).forEach(function (a) {
        a.addEventListener("click", function () {
          links.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  
    /* ---------- Reveal on scroll ---------- */
    var revealables = $$(".reveal");
    if (revealables.length) {
      if (!("IntersectionObserver" in window) || reduced) {
        revealables.forEach(function (el) { el.classList.add("is-in"); });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
        revealables.forEach(function (el, i) {
          el.style.transitionDelay = Math.min(i % 4, 3) * 80 + "ms";
          io.observe(el);
        });
      }
    }
  
    /* ---------- Hero: flujo de arquitectura ---------- */
    var archNodes = $$(".arch__node");
    if (archNodes.length && !reduced) {
      var idx = 0;
      var tick = function () {
        archNodes.forEach(function (n, i) { n.classList.toggle("is-active", i === idx); });
        idx = (idx + 1) % archNodes.length;
      };
      tick();
      setInterval(tick, 1700);
    } else if (archNodes.length) {
      archNodes[0].classList.add("is-active");
    }
  
    /* ---------- Capas (tabs desktop / acordeón móvil) ---------- */
    var layerBtns = $$(".layer-btn");
    var layerPanels = $$(".layer-panel");
    var bar = $("#layerProgress");

    /* Contenedor original de los paneles (para poder restaurarlo al volver a desktop) */
    var layerPanelsHome = layerPanels.length ? layerPanels[0].parentNode : null;

    /* a11y: enlaza cada botón con su panel (no altera el HTML, solo añade atributos) */
    layerBtns.forEach(function (b) {
      var panel = layerPanels.filter(function (p) { return p.dataset.panel === b.dataset.layer; })[0];
      if (panel) {
        if (!panel.id) panel.id = "layer-panel-" + b.dataset.layer;
        b.setAttribute("aria-controls", panel.id);
        b.setAttribute("aria-expanded", "false");
      }
    });

    var mobileMedia = window.matchMedia("(max-width: 767px)");
    var isMobileLayers = false; // estado actual del acordeón (evita listeners/inicializaciones duplicadas)
    var mobileOpenLayer = null;

    /* ---- Comportamiento desktop (tabs), sin cambios de fondo ---- */
    function selectLayer(id) {
      layerBtns.forEach(function (b) {
        var active = b.dataset.layer === id;
        b.setAttribute("aria-selected", active ? "true" : "false");
        b.setAttribute("aria-expanded", active ? "true" : "false");
      });
      layerPanels.forEach(function (p) { p.hidden = p.dataset.panel !== id; });
      if (bar) {
        var pos = layerBtns.findIndex ? layerBtns.findIndex(function (b) { return b.dataset.layer === id; }) : 0;
        bar.style.width = ((pos + 1) / Math.max(layerBtns.length, 1)) * 100 + "%";
      }
    }

    /* ---- Comportamiento móvil (acordeón) ---- */
    function toggleMobileLayer(id) {
      var willOpen = mobileOpenLayer !== id;
      layerBtns.forEach(function (b) {
        var active = willOpen && b.dataset.layer === id;
        b.setAttribute("aria-selected", active ? "true" : "false");
        b.setAttribute("aria-expanded", active ? "true" : "false");
      });
      layerPanels.forEach(function (p) {
        p.classList.toggle("is-mobile-open", willOpen && p.dataset.panel === id);
      });
      mobileOpenLayer = willOpen ? id : null;
    }

    /* Reubica cada panel justo debajo de su botón (solo en el DOM, sin duplicar contenido) */
    function enterMobileLayers() {
      if (isMobileLayers || !layerBtns.length) return;
      isMobileLayers = true;
      layerBtns.forEach(function (b) {
        var panel = layerPanels.filter(function (p) { return p.dataset.panel === b.dataset.layer; })[0];
        if (panel) b.insertAdjacentElement("afterend", panel);
      });
      layerPanels.forEach(function (p) {
        p.hidden = false; // la visibilidad ahora la controla la clase .is-mobile-open (CSS)
        p.classList.remove("is-mobile-open");
      });
      layerBtns.forEach(function (b) {
        b.setAttribute("aria-selected", "false");
        b.setAttribute("aria-expanded", "false");
      });
      mobileOpenLayer = null;
    }

    /* Restaura el DOM y el estado de tabs de desktop */
    function exitMobileLayers() {
      if (!isMobileLayers) return;
      isMobileLayers = false;
      if (layerPanelsHome) {
        layerPanels.forEach(function (p) {
          p.classList.remove("is-mobile-open");
          layerPanelsHome.appendChild(p);
        });
      }
      var current = layerBtns.filter(function (b) { return b.getAttribute("aria-selected") === "true"; })[0];
      selectLayer(current ? current.dataset.layer : (layerBtns[0] && layerBtns[0].dataset.layer));
    }

    function activateLayer(id) {
      if (mobileMedia.matches) toggleMobileLayer(id); else selectLayer(id);
    }

    layerBtns.forEach(function (b) {
      b.addEventListener("click", function () { activateLayer(b.dataset.layer); });
      b.addEventListener("keydown", function (e) {
        var i = layerBtns.indexOf(b);
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          var n = layerBtns[(i + 1) % layerBtns.length];
          n.focus(); activateLayer(n.dataset.layer);
        }
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          var p = layerBtns[(i - 1 + layerBtns.length) % layerBtns.length];
          p.focus(); activateLayer(p.dataset.layer);
        }
      });
    });

    /* Init según el viewport actual */
    if (layerBtns.length) {
      if (mobileMedia.matches) enterMobileLayers(); else selectLayer(layerBtns[0].dataset.layer);
    }

    /* Cambios de breakpoint (resize / rotación) sin duplicar listeners */
    var onLayerBreakpointChange = function (e) {
      if (e.matches) enterMobileLayers(); else exitMobileLayers();
    };
    if (mobileMedia.addEventListener) mobileMedia.addEventListener("change", onLayerBreakpointChange);
    else if (mobileMedia.addListener) mobileMedia.addListener(onLayerBreakpointChange); // Safari viejo
  
    /* ---------- Ecosistema orbital ---------- */
    var orbit = $("#orbit");
    if (orbit) {
      var nodes = $$(".orbit__node", orbit);
      var svg = $("#orbitLines");
      var placeNodes = function () {
        var n = nodes.length;
        nodes.forEach(function (node, i) {
          var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
          var r = 40; // % del contenedor
          var x = 50 + Math.cos(angle) * r;
          var yy = 50 + Math.sin(angle) * r;
          node.style.left = x + "%";
          node.style.top = yy + "%";
          if (svg) {
            var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", "50%");
            line.setAttribute("y1", "50%");
            line.setAttribute("x2", x + "%");
            line.setAttribute("y2", yy + "%");
            line.style.animationDelay = (i * 0.35) + "s";
            svg.appendChild(line);
          }
        });
      };
      placeNodes();
  
      var roTitle = $("#ecoTitle");
      var roText = $("#ecoText");
      var roKicker = $("#ecoKicker");
      var setReadout = function (el) {
        if (roTitle) roTitle.textContent = el.dataset.name || "";
        if (roText) roText.textContent = el.dataset.desc || "";
        if (roKicker) roKicker.textContent = el.dataset.kicker || "Componente";
        nodes.forEach(function (n) { n.classList.toggle("is-active", n === el); });
      };
      nodes.forEach(function (n) {
        n.addEventListener("mouseenter", function () { setReadout(n); });
        n.addEventListener("focus", function () { setReadout(n); });
        n.setAttribute("tabindex", "0");
      });
      $$("#ecoMobile [data-name]").forEach(function (n) {
        n.addEventListener("click", function () { setReadout(n); });
      });
    }
  
    /* ---------- Videos: portada + MP4 + embeds externos ---------- */

    $$(".vid").forEach(function (card) {

      var btn = $(".vid__play", card);
      var slot = $(".vid__slot", card);

      if (!btn || !slot) return;

      var poster = card.dataset.poster;
      var srcVideo = card.dataset.video;
      var srcEmbed = card.dataset.embed;

      /*
      * ==========================================
      * PORTADA
      * ==========================================
      */

      if (poster) {

        var img = document.createElement("img");

        img.src = poster;
        img.alt = card.dataset.title || "Vista previa del video";
        img.loading = "lazy";
        img.decoding = "async";

        img.className = "vid__poster";

        slot.appendChild(img);
      }

      /*
      * ==========================================
      * CLICK EN REPRODUCIR
      * ==========================================
      */

      btn.addEventListener("click", function () {

        /*
        * Si ya está reproduciendo,
        * no volver a crear el video.
        */

        if (card.classList.contains("is-playing")) {
          return;
        }

        /*
        * ========================================
        * CERRAR OTROS VIDEOS
        * ========================================
        */

        $$(".vid.is-playing").forEach(function (other) {

          if (other !== card) {

            other.classList.remove("is-playing");

            var otherSlot = $(".vid__slot", other);

            if (otherSlot) {

              var otherVideo = $("video", otherSlot);

              if (otherVideo) {
                otherVideo.pause();
                otherVideo.removeAttribute("src");
                otherVideo.load();
              }

              otherSlot.innerHTML = "";

              /*
              * Volver a mostrar la portada
              */

              var otherPoster = other.dataset.poster;

              if (otherPoster) {

                var restoredPoster =
                  document.createElement("img");

                restoredPoster.src = otherPoster;
                restoredPoster.alt =
                  other.dataset.title || "Vista previa del video";

                restoredPoster.loading = "lazy";
                restoredPoster.decoding = "async";

                restoredPoster.className = "vid__poster";

                otherSlot.appendChild(restoredPoster);
              }
            }
          }
        });

        /*
        * ========================================
        * MP4 LOCAL
        * ========================================
        */

        if (srcVideo) {

          var video = document.createElement("video");

          video.src = srcVideo;

          video.controls = true;
          video.playsInline = true;

          /*
          * Carga diferida:
          * solo empieza a cargar cuando
          * el usuario pulsa reproducir.
          */
          video.preload = "metadata";

          video.className = "vid__video";

          video.setAttribute(
            "aria-label",
            card.dataset.title || "Video"
          );

          /*
          * Poster también sirve como respaldo
          * mientras el MP4 empieza a cargar.
          */

          if (poster) {
            video.poster = poster;
          }

          slot.innerHTML = "";
          slot.appendChild(video);

          card.classList.add("is-playing");

          /*
          * Intentar reproducir
          */

          var playPromise = video.play();

          if (playPromise !== undefined) {

            playPromise.catch(function () {

              /*
              * Si el navegador bloquea autoplay,
              * el usuario puede utilizar los controles.
              */

            });
          }

          return;
        }

        /*
        * ========================================
        * EMBED EXTERNO
        * ========================================
        */

        if (srcEmbed) {

          var iframe = document.createElement("iframe");

          iframe.src = srcEmbed;

          /*
          * Lazy loading del iframe.
          */

          iframe.loading = "lazy";

          iframe.title =
            card.dataset.title || "Video";

          iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

          iframe.allowFullscreen = true;

          iframe.className = "vid__iframe";

          slot.innerHTML = "";
          slot.appendChild(iframe);

          card.classList.add("is-playing");

          return;
        }

        /*
        * ========================================
        * SIN VIDEO
        * ========================================
        */

        var hint = $(".vid__hint", card);

        if (hint) {

          hint.textContent =
            "Video próximamente disponible";

          hint.style.opacity = "1";
        }

      });

    });

    // FAQ Accordion
    function initFAQ() {
      const faqItems = document.querySelectorAll(".faq-item");

      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {
          faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove("active");
            }
          });

          item.classList.toggle("active");
        });
      });
    }

    initFAQ();

    // Scroll del arrow down del header
    document.querySelector('.scroll-down').addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
      });
    });
  
    /* ---------- FAQ acordeón ---------- */
    $$(".faq-item").forEach(function (item) {
      var q = $(".faq-q", item);
      var a = $(".faq-a", item);
      if (!q || !a) return;
      q.addEventListener("click", function () {
        var open = item.classList.toggle("is-open");
        q.setAttribute("aria-expanded", open ? "true" : "false");
        a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
      });
    });
    window.addEventListener("resize", function () {
      $$(".faq-item.is-open .faq-a").forEach(function (a) { a.style.maxHeight = a.scrollHeight + "px"; });
    });
  
    /* ---------- Formulario ---------- */
    var form = $("#diagnosticForm");
    if (form) {
      var status = $("#formStatus");
      var showErr = function (name, msg) {
        var el = form.querySelector('[data-err="' + name + '"]');
        if (el) el.textContent = msg || "";
      };
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var data = new FormData(form);
        var ok = true;
        ["nombre", "email", "gestion"].forEach(function (k) {
          var v = String(data.get(k) || "").trim();
          if (!v) { showErr(k, "Este campo es necesario."); ok = false; } else { showErr(k, ""); }
        });
        var email = String(data.get("email") || "").trim();
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
          showErr("email", "Escribe un correo válido."); ok = false;
        }
        if (!form.querySelector("#consent").checked) {
          showErr("consent", "Necesitamos tu autorización para contactarte."); ok = false;
        } else { showErr("consent", ""); }
  
        if (!ok) {
          if (status) { status.textContent = "Revisa los campos marcados."; status.classList.add("is-error"); }
          return;
        }
        if (status) {
          status.classList.remove("is-error");
          status.textContent = "Gracias. Recibí tu información: te escribo para agendar el diagnóstico.";
        }
        form.reset();
        // Punto de integración: aquí puedes enviar los datos a tu endpoint/CRM.
        // fetch('/api/leads', { method:'POST', body: JSON.stringify(Object.fromEntries(data)) })
      });
    }
  })();
  