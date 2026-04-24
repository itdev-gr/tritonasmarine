import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pageFadeIn() {
  const main = document.querySelector("main");
  if (!main) return;
  gsap.fromTo(main, { autoAlpha: 0.6 }, { autoAlpha: 1, duration: 0.3, ease: "power1.out" });
}

function scrollReveals() {
  const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
  els.forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  });
}

function heroTitleReveal() {
  const el = document.querySelector<HTMLElement>("[data-hero-title]");
  if (!el) return;
  const split = new SplitText(el, { type: "words" });
  gsap.from(split.words, {
    autoAlpha: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.04,
    ease: "power3.out",
  });
}

function heroKenBurns() {
  const img = document.querySelector<HTMLElement>("[data-hero-image]");
  if (!img) return;
  gsap.fromTo(
    img,
    { scale: 1 },
    {
      scale: 1.08,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    },
  );
}

function heroParallax() {
  const img = document.querySelector<HTMLElement>("[data-hero-parallax]");
  if (!img) return;
  gsap.to(img, {
    yPercent: -15,
    ease: "none",
    scrollTrigger: {
      trigger: img,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

function statsCounters() {
  const counters = document.querySelectorAll<HTMLElement>("[data-stat-counter]");
  counters.forEach((el) => {
    const target = Number(el.dataset.statTarget ?? "0");
    const suffix = el.dataset.statSuffix ?? "";
    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = `${Math.round(obj.value)}${suffix}`;
      },
    });
  });
}

function servicesGridStagger() {
  const grid = document.querySelector<HTMLElement>("[data-services-grid]");
  if (!grid) return;
  const cards = grid.querySelectorAll<HTMLElement>("[data-reveal]");
  cards.forEach((card) => card.removeAttribute("data-reveal"));
  gsap.fromTo(
    cards,
    { autoAlpha: 0, y: 20 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: "power2.out",
      scrollTrigger: {
        trigger: grid,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    },
  );
}

function smoothAnchorScroll() {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      gsap.to(window, { duration: 0.6, scrollTo: target, ease: "power2.inOut" });
    });
  });
}

export function initAnimations() {
  if (prefersReducedMotion()) return;
  servicesGridStagger();
  scrollReveals();
  heroTitleReveal();
  heroKenBurns();
  heroParallax();
  statsCounters();
  smoothAnchorScroll();
  pageFadeIn();
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAnimations);
  } else {
    initAnimations();
  }
}
