/* ==========================================================================
   IMPLEMENTACIÓN DEL ECOSISTEMA DIGITAL — interacciones
   100% JavaScript Vanilla. Sin librerías, sin jQuery.
   ========================================================================== */

   (function () {
    "use strict";
  
    var section = document.getElementById("ecosistema-digital");
    if (!section) return;
  
    var prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  
    /* ----------------------------------------------------------------
       1) Revelado en scroll: los elementos aparecen uno por uno
          usando Intersection Observer + un pequeño desfase (delay).
    ---------------------------------------------------------------- */
    var animatedItems = section.querySelectorAll("[data-animate]");
    var cards = section.querySelectorAll(".eco-card");
  
    if ("IntersectionObserver" in window && !prefersReducedMotion) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
  
            var el = entry.target;
  
            // Si es una tarjeta del grid, calculamos un desfase según
            // su posición para que aparezcan en cascada, fila por fila.
            if (el.classList.contains("eco-card")) {
              var index = Array.prototype.indexOf.call(cards, el);
              var columns = getColumnCount();
              var delay = (index % columns) * 0.08 + Math.floor(index / columns) * 0.06;
              el.style.setProperty("--delay", delay.toFixed(2) + "s");
            }
  
            el.classList.add("eco-visible");
            observer.unobserve(el);
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
  
      animatedItems.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Sin soporte de IO o con "reduced motion": mostrar todo directamente.
      animatedItems.forEach(function (el) {
        el.classList.add("eco-visible");
      });
    }
  
    function getColumnCount() {
      var width = window.innerWidth;
      if (width <= 600) return 1;
      if (width <= 992) return 2;
      return 4;
    }
  
    /* ----------------------------------------------------------------
       2) Glow que sigue el cursor dentro de cada tarjeta (spotlight).
    ---------------------------------------------------------------- */
    cards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", x + "%");
        card.style.setProperty("--my", y + "%");
      });
    });
  
    /* ----------------------------------------------------------------
       3) Mouse parallax muy sutil sobre los halos de fondo.
          Nada exagerado: desplazamiento máximo de unos pocos píxeles.
    ---------------------------------------------------------------- */
    if (!prefersReducedMotion) {
      var glowA = section.querySelector(".eco-glow--a");
      var glowB = section.querySelector(".eco-glow--b");
      var ticking = false;
      var targetX = 0;
      var targetY = 0;
  
      section.addEventListener("mousemove", function (e) {
        var rect = section.getBoundingClientRect();
        var relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 a 0.5
        var relY = (e.clientY - rect.top) / rect.height - 0.5;
  
        targetX = relX;
        targetY = relY;
  
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      });
  
      function updateParallax() {
        var maxOffset = 14; // px — desplazamiento sutil, nunca exagerado
  
        if (glowA) {
          glowA.style.transform =
            "translate3d(" +
            (targetX * maxOffset).toFixed(1) +
            "px," +
            (targetY * maxOffset).toFixed(1) +
            "px,0)";
        }
        if (glowB) {
          glowB.style.transform =
            "translate3d(" +
            (targetX * -maxOffset).toFixed(1) +
            "px," +
            (targetY * -maxOffset).toFixed(1) +
            "px,0)";
        }
        ticking = false;
      }
    }
  })();

  /* ==========================================================================
   ECOSISTEMA TECNOLÓGICO — interacciones
   100% JavaScript Vanilla. Sin librerías, sin jQuery.
   ========================================================================== */

(function () {
  "use strict";

  var section = document.getElementById("ecosistema-tecnologico");
  if (!section) return;

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ----------------------------------------------------------------
     1) Revelado en scroll con Intersection Observer + desfase en
        cascada para las tarjetas del grid.
  ---------------------------------------------------------------- */
  var animatedItems = section.querySelectorAll("[data-animate]");
  var cards = section.querySelectorAll(".stack-card");

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          var el = entry.target;

          if (el.classList.contains("stack-card")) {
            var index = Array.prototype.indexOf.call(cards, el);
            var columns = getColumnCount();
            var delay = (index % columns) * 0.09 + Math.floor(index / columns) * 0.07;
            el.style.setProperty("--delay", delay.toFixed(2) + "s");
          }

          el.classList.add("stack-visible");
          observer.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    animatedItems.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    animatedItems.forEach(function (el) {
      el.classList.add("stack-visible");
    });
  }

  function getColumnCount() {
    var width = window.innerWidth;
    if (width <= 600) return 1;
    if (width <= 992) return 2;
    return 3;
  }

  /* ----------------------------------------------------------------
     2) Glow que sigue el cursor dentro de cada tarjeta (spotlight).
  ---------------------------------------------------------------- */
  cards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", x + "%");
      card.style.setProperty("--my", y + "%");
    });
  });

  /* ----------------------------------------------------------------
     3) Parallax muy sutil sobre los halos de fondo.
  ---------------------------------------------------------------- */
  if (!prefersReducedMotion) {
    var glowA = section.querySelector(".stack-glow--a");
    var glowB = section.querySelector(".stack-glow--b");
    var ticking = false;
    var targetX = 0;
    var targetY = 0;

    section.addEventListener("mousemove", function (e) {
      var rect = section.getBoundingClientRect();
      var relX = (e.clientX - rect.left) / rect.width - 0.5;
      var relY = (e.clientY - rect.top) / rect.height - 0.5;

      targetX = relX;
      targetY = relY;

      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });

    function updateParallax() {
      var maxOffset = 12;

      if (glowA) {
        glowA.style.transform =
          "translate3d(" +
          (targetX * maxOffset).toFixed(1) +
          "px," +
          (targetY * maxOffset).toFixed(1) +
          "px,0)";
      }
      if (glowB) {
        glowB.style.transform =
          "translate3d(" +
          (targetX * -maxOffset).toFixed(1) +
          "px," +
          (targetY * -maxOffset).toFixed(1) +
          "px,0)";
      }
      ticking = false;
    }
  }

  /* ----------------------------------------------------------------
     4) Fallback de logos: si un ícono SVG de marca no carga (por
        ejemplo, sin conexión al CDN), se reemplaza por un ícono
        genérico de Font Awesome para no romper el diseño.
  ---------------------------------------------------------------- */
  var brandImages = section.querySelectorAll(".stack-logo-mark img");
  brandImages.forEach(function (img) {
    img.addEventListener("error", function () {
      var wrapper = img.parentElement;
      if (!wrapper) return;
      var icon = document.createElement("i");
      icon.className = "fa-solid fa-cube";
      wrapper.replaceChild(icon, img);
    });
  });
})();


//WEBFORM
let captchaResult;

function generateCaptcha() {

    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;

    captchaResult = num1 + num2;

    document.getElementById("captchaQuestion").textContent =
        `${num1} + ${num2} = ?`;
}

generateCaptcha(); 


document.getElementById("mG61Hd").addEventListener("submit", function(e) {
    e.preventDefault();

    let isValid = true;

    const successAlert = document.getElementById("successAlert");

    // Reset errores
    document.querySelectorAll(".error-message").forEach(el => el.style.display = "none");
    successAlert.style.display = "none";

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const city = document.getElementById("city");
    const service = document.getElementById("service");
    const message = document.getElementById("message");

    const captchaAnswer =
    document.getElementById("captchaAnswer").value;

    if (parseInt(captchaAnswer) !== captchaResult) {

        document.getElementById("captchaError").style.display = "block";

        document.getElementById("captchaAnswer").value = "";
        generateCaptcha();

        isValid = false;
    }

    // Función helper para errores
    function showError(input, errorId) {
        document.getElementById(errorId).style.display = "block";
        input.style.borderColor = "#ef4444";
        isValid = false;
    }

    function clearError(input) {
        input.style.borderColor = "rgba(255,255,255,0.08)";
    }

    // Validaciones
    if (name.value.trim() === "") {
        showError(name, "nameError");
    } else {
        clearError(name);
    }

    if (!email.value.includes("@")) {
        showError(email, "emailError");
    } else {
        clearError(email);
    }

    if (phone.value.trim() === "") {
        showError(phone, "phoneError");
    } else {
        clearError(phone);
    }

    if (city.value.trim() === "") {
        showError(city, "cityError");
    } else {
        clearError(city);
    }

    if (service.value === "") {
        showError(service, "serviceError");
    } else {
        clearError(service);
    }

    if (message.value.trim() === "") {
        showError(message, "messageError");
    } else {
        clearError(message);
    }

    if (!isValid) return;

    // Estado botón
    const button = document.getElementById("submitButton");
    const buttonText = button.querySelector(".button-text");

    button.disabled = true;
    buttonText.textContent = "Enviando...";

    // Datos
    const formData = new FormData();
    formData.append("entry.986028393", name.value);
    formData.append("entry.1240404565", email.value);
    formData.append("entry.558641381", phone.value);
    formData.append("entry.650908303", city.value);
    formData.append("entry.594277303", service.value);
    formData.append("entry.1470397911", message.value);

    fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLScEfhaPnenzk8FLizBL3cVPJNaYnn0WA8umPaeAzWukOIbNBQ/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formData
    })
    .then(() => {
        // Mostrar éxito
        successAlert.style.display = "block";

        // Reset form
        document.getElementById("mG61Hd").reset();

        generateCaptcha();

        // Scroll suave al mensaje
        successAlert.scrollIntoView({ behavior: "smooth", block: "center" });
    })
    .catch(() => {
        alert("Hubo un error al enviar el formulario.");
    })
    .finally(() => {
        button.disabled = false;
        buttonText.textContent = "Enviar Solicitud";
    });
});

document.querySelectorAll(".form-input, .form-textarea, select").forEach(input => {
    input.addEventListener("input", () => {
        input.style.borderColor = "rgba(255,255,255,0.08)";
    });
});

//Contact by WhatsApp

popupWhatsApp = () => {
  
  let btnClosePopup = document.querySelector('.closePopup');
  let btnOpenPopup = document.querySelector('.whatsapp-button');
  let popup = document.querySelector('.popup-whatsapp');
  let sendBtn = document.getElementById('send-btn');

  // Recuperar el estado guardado en localStorage
  let isPopupActive = localStorage.getItem('isPopupActive') === 'true';
  let hasSeenPopup = localStorage.getItem('hasSeenPopup') === 'true';

  // Establecer el estado inicial del popup
  if (isPopupActive) {
      popup.classList.add('is-active-whatsapp-popup');
  } else {
      popup.classList.remove('is-active-whatsapp-popup');
  }

  // Mostrar el popup automáticamente después de 3 segundos, solo si no se ha visto antes
  if (!hasSeenPopup) {
      setTimeout(() => {
          popup.classList.add('is-active-whatsapp-popup');
          localStorage.setItem('isPopupActive', 'true'); // Guardar estado abierto
          localStorage.setItem('hasSeenPopup', 'true'); // Marcar que ya se mostró una vez
      }, 3000);
  }

  btnClosePopup.addEventListener("click",  () => {
    popup.classList.toggle('is-active-whatsapp-popup');
    localStorage.setItem('isPopupActive', 'false'); // Guardar estado cerrado
  })
  
  btnOpenPopup.addEventListener("click",  () => {
    popup.classList.toggle('is-active-whatsapp-popup');
    popup.style.animation = "fadeIn .6s 0.0s both";
    // Guardar estado abierto/cerrado
    if (popup.classList.contains('is-active-whatsapp-popup')) {
      localStorage.setItem('isPopupActive', 'true');
      } else {
          localStorage.setItem('isPopupActive', 'false');
      }
  });
  
  sendBtn.addEventListener("click", () => {
  let msg = document.getElementById('whats-in').value;
  let relmsg = msg.replace(/ /g,"%20");
    
  window.open('https://wa.me/573213900071?text='+relmsg, '_blank'); 
  
  });
}

popupWhatsApp();