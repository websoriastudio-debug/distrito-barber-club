(() => {
  "use strict";

  const D = window.DBC;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktop = window.matchMedia("(min-width: 960px)");

  const img = (id, w, h, q = 70) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=${q}`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const price = (n) => `${n} ${D.moneda}`;
  const firstName = (n) => n.split(" ")[0];

  /* ---------- servicios ---------- */
  const variants = ["svc--a", "svc--b", "svc--c"];
  $("[data-services]").innerHTML = D.servicios.map((s, i) => {
    const [w, h] = s.proporcion || [4, 5];
    const featured = variants[i % 3] === "svc--c";
    const iw = featured ? 1800 : 1000;
    return `
      <article class="svc ${variants[i % 3]}" id="servicio-${esc(s.id)}">
        <div class="svc__media frame" data-reveal="image" style="--ar:${w} / ${h}">
          <img src="${img(s.imagen, iw)}"
               srcset="${img(s.imagen, Math.round(iw / 2))} ${Math.round(iw / 2)}w, ${img(s.imagen, iw)} ${iw}w"
               sizes="${featured ? "100vw" : "(min-width: 900px) 50vw, 100vw"}"
               width="${w * 300}" height="${h * 300}" loading="lazy" decoding="async" alt="${esc(s.alt)}">
        </div>
        <div class="svc__body" data-reveal>
          <h3 class="svc__name">${esc(s.nombre)}</h3>
          <p class="svc__desc">${esc(s.descripcion)}</p>
          <dl class="svc__meta">
            <dt>Precio</dt><dd class="svc__price">${price(s.precio)}</dd>
            <dt>Duración</dt><dd class="svc__time">${s.duracion} min</dd>
          </dl>
          <a class="btn btn--primary svc__cta" href="#reserva" data-book-service="${esc(s.id)}">Reservar ${esc(s.nombre.toLowerCase())}</a>
        </div>
      </article>`;
  }).join("");

  /* ---------- equipo ---------- */
  $("[data-team]").innerHTML = D.equipo.map((m) => `
    <li class="member">
      <div class="member__photo frame" data-reveal="image">
        <img src="${img(m.imagen, 800, 1000)}"
             srcset="${img(m.imagen, 480, 600)} 480w, ${img(m.imagen, 800, 1000)} 800w"
             sizes="(min-width: 720px) 32vw, 100vw" width="800" height="1000" loading="lazy" decoding="async" alt="${esc(m.alt)}">
      </div>
      <div data-reveal>
        <h3 class="member__name">${esc(m.nombre)}</h3>
        <p class="member__role">${esc(m.especialidad)}</p>
      </div>
      <a class="link member__cta" href="#reserva" data-book-barber="${esc(m.id)}">Reservar con ${esc(firstName(m.nombre))}</a>
    </li>`).join("");

  /* ---------- contacto, horario y pie ---------- */
  const N = D.negocio;
  const mapUrl = N.mapa || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${N.nombre}, ${N.direccion}, ${N.ciudad}`)}`;
  $$("[data-biz]").forEach((el) => { el.textContent = N[el.dataset.biz] || ""; });
  $$("[data-biz-link]").forEach((a) => {
    const k = a.dataset.bizLink;
    if (k === "tel") { a.href = `tel:${N.telefono.replace(/[^\d+]/g, "")}`; a.textContent = N.telefono; }
    if (k === "email") { a.href = `mailto:${N.email}`; a.textContent = N.email; }
    if (k === "mapa") { a.href = mapUrl; }
    if (k === "instagram" && N.instagram) { a.href = N.instagram; $("[data-biz-instagram]").hidden = false; }
  });
  $("[data-hours]").innerHTML = D.horario.map((h) => `<dt>${esc(h.dias)}</dt><dd>${esc(h.horas)}</dd>`).join("");
  $("[data-year]").textContent = `© ${new Date().getFullYear()}`;
  $("[data-demo-note]").hidden = !D.demo;

  // Datos estructurados para buscadores
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BarberShop",
    name: N.nombre,
    address: { "@type": "PostalAddress", streetAddress: N.direccion, addressLocality: N.ciudad },
    telephone: N.telefono,
    email: N.email,
    hasMap: mapUrl,
    makesOffer: D.servicios.map((s) => ({
      "@type": "Offer", price: s.precio, priceCurrency: "EUR",
      itemOffered: { "@type": "Service", name: s.nombre, description: s.descripcion },
    })),
  });
  document.head.appendChild(ld);

  /* ---------- vídeo de portada opcional ---------- */
  const saveData = navigator.connection && navigator.connection.saveData;
  if (D.portadaVideo && desktop.matches && !reduceMotion.matches && !saveData) {
    const media = $("[data-hero-media]");
    const poster = $("img", media);
    const v = document.createElement("video");
    Object.assign(v, { muted: true, loop: true, playsInline: true, autoplay: true, preload: "auto" });
    v.setAttribute("aria-hidden", "true");
    v.poster = poster.currentSrc || poster.src;
    v.src = D.portadaVideo;
    v.style.opacity = "0";
    v.style.transition = "opacity .8s";
    v.addEventListener("playing", () => { v.style.opacity = "1"; }, { once: true });
    media.appendChild(v);
  }

  /* ---------- cabecera y menú ---------- */
  const header = $("[data-header]");
  const onScroll = () => header.classList.toggle("is-solid", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = $("[data-menu-toggle]");
  const nav = $("#menu");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    $(".sr-only", toggle).textContent = open ? "Cerrar menú" : "Abrir menú";
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) $("a", nav).focus();
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); }
  });
  desktop.addEventListener("change", () => setMenu(false));

  // Marca la sección visible en la navegación
  const navLinks = $$(".nav__list a");
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.setAttribute("aria-current", String(a.hash === `#${en.target.id}`)));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navLinks.forEach((a) => { const s = $(a.hash); if (s) sectionObs.observe(s); });

  /* ---------- revelados ---------- */
  const reveals = $$("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); obs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    // Escalona elementos hermanos que entran juntos
    reveals.forEach((el) => {
      const sibs = [...el.parentElement.children].filter((c) => c.hasAttribute("data-reveal") && c.dataset.reveal !== "image");
      const i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty("--d", `${Math.min(i, 4) * 0.08}s`);
      obs.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- el oficio: secuencia pegada ---------- */
  const craftSteps = $$("[data-craft-step]");
  const craftImgs = $$("[data-craft-img]");
  const bar = $("[data-craft-bar]");
  let current = 0;
  const activate = (i) => {
    if (i === current) return;
    craftImgs.forEach((im, k) => {
      im.classList.toggle("was-active", k === current);
      im.classList.toggle("is-active", k === i);
    });
    craftSteps.forEach((s, k) => s.classList.toggle("is-active", k === i));
    bar.style.width = `${((i + 1) / craftSteps.length) * 100}%`;
    current = i;
  };
  // Precarga las imágenes de la secuencia cuando la sección se acerca
  const craftSection = $("#oficio");
  new IntersectionObserver((entries, o) => {
    if (entries[0].isIntersecting) { craftImgs.forEach((im) => { im.loading = "eager"; }); o.disconnect(); }
  }, { rootMargin: "600px 0px" }).observe(craftSection);
  const stepObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) activate(Number(en.target.dataset.craftStep)); });
  }, { rootMargin: "-48% 0px -48% 0px" });
  craftSteps.forEach((s) => stepObs.observe(s));

  /* ---------- galería: filtros y visor ---------- */
  const chips = $$("[data-filter]");
  const items = $$("[data-gallery] > li");
  const status = $("[data-gallery-status]");
  const labels = { todo: "todas las imágenes", cortes: "cortes", barba: "barba", espacio: "espacio", detalles: "detalles" };
  chips.forEach((chip) => chip.addEventListener("click", () => {
    const f = chip.dataset.filter;
    chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    let n = 0;
    items.forEach((li) => {
      const show = f === "todo" || li.dataset.cat === f;
      li.hidden = !show;
      li.classList.remove("is-entering");
      if (show) { n++; if (!reduceMotion.matches) { void li.offsetWidth; li.classList.add("is-entering"); } }
    });
    status.textContent = `Mostrando ${n} ${n === 1 ? "imagen" : "imágenes"}: ${labels[f]}.`;
  }));

  const box = $("[data-lightbox]");
  const boxFrame = $("[data-lightbox-frame]");
  const boxCap = $("[data-lightbox-caption]");
  const boxImg = document.createElement("img");
  boxImg.decoding = "async";
  boxFrame.appendChild(boxImg);
  let visible = [];
  let idx = 0;
  let opener = null;
  const show = (i) => {
    idx = (i + visible.length) % visible.length;
    const source = $("img", visible[idx]);
    boxImg.src = source.dataset.full;
    boxImg.alt = source.alt;
    boxImg.width = source.width;
    boxImg.height = source.height;
    boxCap.textContent = `${source.alt} (${idx + 1} de ${visible.length})`;
  };
  items.forEach((li) => $("button", li).addEventListener("click", (e) => {
    visible = items.filter((x) => !x.hidden);
    opener = e.currentTarget;
    show(visible.indexOf(li));
    box.showModal();
  }));
  $("[data-lightbox-close]").addEventListener("click", () => box.close());
  $("[data-lightbox-prev]").addEventListener("click", () => show(idx - 1));
  $("[data-lightbox-next]").addEventListener("click", () => show(idx + 1));
  box.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
  box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
  box.addEventListener("close", () => { if (opener) opener.focus(); });

  /* ---------- reserva ---------- */
  const form = $("[data-booking]");
  const R = D.reservas;
  const useSystem = Boolean(R.sistemaUrl);

  $("[data-booking-services]").innerHTML = D.servicios.map((s) => `
    <label class="option">
      <input type="radio" name="servicio" value="${esc(s.id)}" aria-describedby="error-servicio">
      <span>${esc(s.nombre)} <small>${s.duracion} min, ${price(s.precio)}</small></span>
    </label>`).join("");
  $("[data-booking-team]").innerHTML = [{ id: "cualquiera", nombre: "Sin preferencia" }, ...D.equipo].map((m, i) => `
    <label class="option">
      <input type="radio" name="barbero" value="${esc(m.id)}"${i === 0 ? " checked" : ""}>
      <span>${esc(m.id === "cualquiera" ? m.nombre : firstName(m.nombre))}</span>
    </label>`).join("");

  const submitBtn = $("[data-booking-submit]");
  const preview = $("[data-booking-preview]");
  const note = $("[data-booking-note]");
  const errorEl = $('[data-error="servicio"]');
  if (useSystem) {
    submitBtn.textContent = "Continuar en el sistema de reservas";
    $("[data-booking-explainer]").textContent = "Elige servicio y barbero y continúa en nuestro sistema de reservas para escoger hora.";
    $("[data-booking-step3]").textContent = "Elige la hora en el sistema de reservas.";
  }

  const read = () => {
    const fd = new FormData(form);
    const s = D.servicios.find((x) => x.id === fd.get("servicio"));
    const b = D.equipo.find((x) => x.id === fd.get("barbero"));
    return { s, b, nombre: String(fd.get("nombre") || "").trim(), pref: String(fd.get("preferencia") || "").trim() };
  };
  const message = ({ s, b, nombre, pref }) => {
    const lines = [`Hola, ${N.nombre}. ${nombre ? `Soy ${nombre} y ` : ""}${nombre ? "me" : "Me"} gustaría reservar una cita.`];
    lines.push(`Servicio: ${s.nombre} (${s.duracion} min, ${price(s.precio)})`);
    lines.push(`Barbero: ${b ? b.nombre : "sin preferencia"}`);
    if (pref) lines.push(`Me vendría bien: ${pref}`);
    lines.push("¿Qué horas tenéis disponibles?");
    return lines.join("\n");
  };
  const update = () => {
    const data = read();
    if (data.s) {
      preview.textContent = message(data);
      form.querySelector(".field").classList.remove("has-error");
      errorEl.hidden = true;
    } else {
      preview.textContent = "Elige un servicio para ver el mensaje.";
    }
  };
  form.addEventListener("input", update);
  form.addEventListener("change", update);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = read();
    if (!data.s) {
      form.querySelector(".field").classList.add("has-error");
      errorEl.hidden = false;
      $('input[name="servicio"]', form).focus();
      return;
    }
    let url;
    if (useSystem) {
      url = R.sistemaUrl;
      note.textContent = "Se ha abierto el sistema de reservas en una pestaña nueva.";
    } else {
      url = `https://wa.me/${R.whatsapp}?text=${encodeURIComponent(message(data))}`;
      note.textContent = "Se ha abierto WhatsApp con tu mensaje. Envíalo para pedir la cita; la hora queda pendiente hasta que la barbería te responda.";
    }
    // Sin "noopener" en la llamada: con él window.open devuelve null y no se
    // podría detectar un bloqueo. Se corta el vínculo justo después.
    const w = window.open(url, "_blank");
    if (w) w.opener = null;
    else window.location.href = url;
  });

  // Enlaces "Reservar este servicio" / "Reservar con…" preseleccionan el formulario
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-book-service], [data-book-barber]");
    if (!a) return;
    const { bookService, bookBarber } = a.dataset;
    if (bookService) { const r = $(`input[name="servicio"][value="${bookService}"]`, form); if (r) r.checked = true; }
    if (bookBarber) { const r = $(`input[name="barbero"][value="${bookBarber}"]`, form); if (r) r.checked = true; }
    update();
  });

  update();
})();
