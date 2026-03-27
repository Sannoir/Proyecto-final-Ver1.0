document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     MODAL DE TABLAS
  ========================= */
  const botones = document.querySelectorAll(".btn-tabla");
  const modal = document.getElementById("modalTabla");
  const imagen = document.getElementById("imagenTabla");
  const cerrar = document.getElementById("cerrarModal");

  if (botones.length > 0 && modal && imagen && cerrar) {
    botones.forEach((boton) => {
      boton.addEventListener("click", () => {
        const rutaImagen = boton.getAttribute("data-img");
        if (rutaImagen) {
          imagen.src = rutaImagen;
          modal.style.display = "flex";
        }
      });
    });

    cerrar.addEventListener("click", () => {
      modal.style.display = "none";
      imagen.src = "";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        imagen.src = "";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display === "flex") {
        modal.style.display = "none";
        imagen.src = "";
      }
    });
  }

  /* =========================
     GSAP / SCROLLTRIGGER
  ========================= */
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP o ScrollTrigger no cargaron.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* =========================
     REVEAL DE SECCIONES
  ========================= */
  const revealElements = gsap.utils.toArray(".reveal");
  if (revealElements.length > 0) {
    gsap.set(revealElements, {
      opacity: 0,
      y: 50
    });

    revealElements.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    });
  }

  /* =========================
     CARDS ESCALONADAS
  ========================= */
  const featureCards = gsap.utils.toArray(".feature-card");
  if (featureCards.length > 0) {
    gsap.set(featureCards, {
      opacity: 0,
      y: 40
    });

    featureCards.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
    });
  }

  /* =========================
   HERO CARRUSEL FLUIDO FINAL ESTABLE
========================= */
const heroCarousel = document.querySelector("#heroCarousel");

if (heroCarousel) {
  const allSlides = heroCarousel.querySelectorAll(".carousel-item");
  let slideAnimationTimeout = null;

  const resetSlideContent = (slide) => {
    if (!slide) return;

    const slideBg = slide.querySelector(".hero-slide");
    const title = slide.querySelector("h1");
    const text = slide.querySelector("p");
    const button = slide.querySelector(".btnPrincipal");

    gsap.killTweensOf([slideBg, title, text, button]);

    if (slideBg) {
      gsap.set(slideBg, { scale: 1 });
    }

    if (title) gsap.set(title, { opacity: 0, y: 18 });
    if (text) gsap.set(text, { opacity: 0, y: 18 });
    if (button) gsap.set(button, { opacity: 0, y: 18 });
  };

  const prepareSlideContent = (slide) => {
    if (!slide) return;

    const slideBg = slide.querySelector(".hero-slide");
    const title = slide.querySelector("h1");
    const text = slide.querySelector("p");
    const button = slide.querySelector(".btnPrincipal");

    if (slideBg) {
      gsap.set(slideBg, {
        scale: 1.02,
        force3D: true
      });
    }

    if (title) gsap.set(title, { opacity: 0, y: 18, force3D: true });
    if (text) gsap.set(text, { opacity: 0, y: 18, force3D: true });
    if (button) gsap.set(button, { opacity: 0, y: 18, force3D: true });
  };

  const animateSlideContent = (slide) => {
    if (!slide) return;

    const slideBg = slide.querySelector(".hero-slide");
    const title = slide.querySelector("h1");
    const text = slide.querySelector("p");
    const button = slide.querySelector(".btnPrincipal");

    if (!slideBg || !title || !text || !button) return;

    gsap.killTweensOf([slideBg, title, text, button]);

    gsap.timeline()
      .to(slideBg, {
        scale: 1,
        duration: 1.4,
        ease: "power2.out",
        force3D: true
      }, 0)
      .to(title, {
        opacity: 1,
        y: 0,
        duration: 0.36,
        ease: "power2.out",
        force3D: true
      }, 0.06)
      .to(text, {
        opacity: 1,
        y: 0,
        duration: 0.32,
        ease: "power2.out",
        force3D: true
      }, 0.11)
      .to(button, {
        opacity: 1,
        y: 0,
        duration: 0.28,
        ease: "power2.out",
        force3D: true
      }, 0.15);
  };

  // Estado inicial
  allSlides.forEach((slide) => resetSlideContent(slide));

  const firstSlide = heroCarousel.querySelector(".carousel-item.active");
  if (firstSlide) {
    prepareSlideContent(firstSlide);
    requestAnimationFrame(() => {
      animateSlideContent(firstSlide);
    });
  }

  // Cuando empieza el cambio:
  // se prepara el siguiente y se anima casi al mismo tiempo
  heroCarousel.addEventListener("slide.bs.carousel", (event) => {
    const nextSlide = event.relatedTarget;
    if (!nextSlide) return;

    clearTimeout(slideAnimationTimeout);

    allSlides.forEach((slide) => resetSlideContent(slide));
    prepareSlideContent(nextSlide);

    // pequeño delay para que la imagen entre y el texto salga fluido
    slideAnimationTimeout = setTimeout(() => {
      animateSlideContent(nextSlide);
    }, 90);
  });

  // Respaldo por si el wrap (3 -> 1) no tomó bien la animación
  heroCarousel.addEventListener("slid.bs.carousel", (event) => {
    const activeSlide = event.relatedTarget || heroCarousel.querySelector(".carousel-item.active");
    if (!activeSlide) return;

    const title = activeSlide.querySelector("h1");
    if (title && getComputedStyle(title).opacity === "0") {
      animateSlideContent(activeSlide);
    }
  });
}
});