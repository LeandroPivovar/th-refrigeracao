(function () {
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("menu-mobile");

  // Header ganha fundo quando o topo da página sai da tela
  var sentinel = document.createElement("div");
  sentinel.style.cssText = "position:absolute;top:0;height:40px;width:1px;pointer-events:none";
  document.body.prepend(sentinel);
  new IntersectionObserver(function (entries) {
    nav.classList.toggle("is-scrolled", !entries[0].isIntersecting);
  }).observe(sentinel);

  // Menu mobile
  function setMenu(open) {
    menu.hidden = !open;
    nav.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    toggle.innerHTML = open ? '<i class="ph ph-x" aria-hidden="true"></i>' : '<i class="ph ph-list" aria-hidden="true"></i>';
  }
  toggle.addEventListener("click", function () { setMenu(menu.hidden); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) setMenu(false); });

  // Entrada dos elementos ao rolar
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  // Setas do carrossel de depoimentos
  var track = document.querySelector(".reviews__track");
  document.querySelectorAll("[data-scroll]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = track.querySelector(".review");
      var step = card ? card.getBoundingClientRect().width + 16 : 320;
      track.scrollBy({ left: step * Number(btn.dataset.scroll), behavior: "smooth" });
    });
  });

  // FAQ: um item aberto por vez
  var items = document.querySelectorAll(".qa");
  items.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      items.forEach(function (other) { if (other !== item) other.open = false; });
    });
  });

  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();
