/* Casual obscurity gate for the UCG preview.
   Not a security boundary — anyone who reads the source can find the
   password — just enough friction that someone who stumbles across the
   repo on GitHub Pages won't accidentally browse the unreleased site. */
(function () {
  var KEY = "ucg_preview_auth_v1";
  var PASSWORD = "fortheloveofthesport";

  function isAuthed() {
    try { return sessionStorage.getItem(KEY) === "1"; } catch (e) { return false; }
  }

  function unlock() {
    try { sessionStorage.setItem(KEY, "1"); } catch (e) {}
    var gate = document.querySelector(".gate");
    if (gate) gate.remove();
    document.body.classList.remove("is-locked");
  }

  function renderGate() {
    document.body.classList.add("is-locked");
    // Resolve the logo path relative to the gate.js script itself so this
    // works from any page depth without per-page configuration.
    var scriptEl = document.currentScript || (function () {
      var s = document.getElementsByTagName("script");
      return s[s.length - 1];
    })();
    var scriptSrc = scriptEl ? scriptEl.src : "";
    var logoUrl = scriptSrc.replace(/\/[^/]*$/, "/") +
                  "../img/UCG Logo without Words.svg";
    var html =
      '<div class="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">' +
        '<div class="gate__card">' +
          '<div class="gate__mark" style="background:transparent;">' +
            '<img src="' + logoUrl + '" alt="" style="width:80px;height:80px;display:block;" />' +
          '</div>' +
          '<h1 id="gate-title">Private Preview</h1>' +
          '<p>Internal preview of the UCG (formerly NAIGC) site redesign. Please enter the shared password to continue.</p>' +
          '<form class="gate__form" id="gate-form" autocomplete="off">' +
            '<input type="password" id="gate-input" name="password" placeholder="Password" aria-label="Password" required />' +
            '<button type="submit" class="btn btn--primary" style="width:100%;justify-content:center;">Enter preview</button>' +
            '<div class="gate__error" id="gate-error">Incorrect password. Please try again.</div>' +
          '</form>' +
          '<p class="gate__note">Confidential draft — please don\'t share the link.</p>' +
        '</div>' +
      '</div>';
    var wrap = document.createElement("div");
    wrap.innerHTML = html;
    document.body.appendChild(wrap.firstChild);

    var form = document.getElementById("gate-form");
    var input = document.getElementById("gate-input");
    setTimeout(function () { input.focus(); }, 50);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if ((input.value || "").trim().toLowerCase() === PASSWORD) {
        unlock();
      } else {
        document.querySelector(".gate").classList.add("is-error");
        input.value = "";
        input.focus();
      }
    });
  }

  function init() {
    if (isAuthed()) return;
    renderGate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
