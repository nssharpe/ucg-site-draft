/* Home page interactions:
   1. Pathway selector — clicking an "I'm a..." card swaps the right panel
   2. Quick-Find search — filters the index, popovers, chip shortcuts */
(function () {

  // ===== Pathway selector =====================================================
  var PATHS = {
    prospective: {
      photo: "assets/img/photos/feed-03-team-cheer.jpg",
      eyebrow: "Welcome",
      title: "Join a club — or just jump in.",
      lead: "Two ways in: train with one of 150+ UCG clubs around the country, or register as an Independent Gymnast and compete unattached. Same membership, same events, same rulebook — your choice.",
      steps: [
        { n: 1, label: "Find a club near you",            href: "about/clubs.html" },
        { n: 2, label: "Or sign up as an Independent",    href: "join/membership.html" },
        { n: 3, label: "Pick a season starter event",     href: "compete/events.html" }
      ],
      cta: { label: "Start your membership →", href: "join/membership.html" }
    },
    returning: {
      photo: "assets/img/photos/feed-01-stretch.jpg",
      eyebrow: "Welcome back",
      title: "There's a way back to the floor.",
      lead: "We run adult-only divisions at every event and a Masters bracket for athletes returning to the sport. Join a local club, or register as an Independent and show up to compete — whatever fits your life right now.",
      steps: [
        { n: 1, label: "Browse adult-friendly clubs",     href: "about/clubs.html" },
        { n: 2, label: "Or compete as an Independent",    href: "join/membership.html" },
        { n: 3, label: "See how Masters works",           href: "compete/masters.html" }
      ],
      cta: { label: "See how Masters works →", href: "compete/masters.html" }
    },
    officer: {
      photo: "assets/img/photos/feed-09-volunteers.jpg",
      eyebrow: "Tools & forms",
      title: "Everything you need to run a season.",
      lead: "Club registration, hosting a sanctioned meet, finding judges, accessing equipment discounts — the things club officers actually have to do, pulled into a single hub.",
      steps: [
        { n: 1, label: "Renew club membership",           href: "join/membership.html" },
        { n: 2, label: "Submit roster + insurance",       href: "join/start-club.html" },
        { n: 3, label: "Host a meet on the calendar",     href: "compete/host.html" }
      ],
      cta: { label: "Open the officer hub →", href: "join/start-club.html" }
    },
    coach: {
      photo: "assets/img/photos/feed-12-bars-chalk-bw.jpg",
      eyebrow: "Rules & officiating",
      title: "Rules, calculators, sanctioning — all linked.",
      lead: "Current Code of Points by discipline, scoring tools, the open scoring system, and the judge-certification ladder — without three layers of menus to dig through.",
      steps: [
        { n: 1, label: "Read the current Code of Points", href: "compete/rules/index.html" },
        { n: 2, label: "Score-builder calculators",       href: "compete/rules/mag.html" },
        { n: 3, label: "Become a sanctioned judge",       href: "compete/training.html" }
      ],
      cta: { label: "Open rule books →", href: "compete/rules/index.html" }
    }
  };

  var tabs       = document.querySelectorAll("#pathway-tabs .pathway-card");
  var photoEl    = document.getElementById("pathway-photo");
  var eyebrowEl  = document.getElementById("pathway-eyebrow");
  var titleEl    = document.getElementById("pathway-title");
  var leadEl     = document.getElementById("pathway-lead");
  var stepsEl    = document.getElementById("pathway-steps");
  var ctaEl      = document.getElementById("pathway-cta");

  function renderPathway(key) {
    var p = PATHS[key];
    if (!p) return;
    photoEl.style.backgroundImage = "url(\"" + p.photo + "\")";
    eyebrowEl.textContent = p.eyebrow;
    titleEl.textContent   = p.title;
    leadEl.textContent    = p.lead;
    stepsEl.innerHTML = p.steps.map(function (s) {
      return (
        '<a href="' + s.href + '" class="hero__panel__step">' +
          '<span class="hero__panel__step__n">' + s.n + '</span>' +
          '<span>' + s.label + '</span>' +
          '<span class="hero__panel__step__arrow">→</span>' +
        '</a>'
      );
    }).join("");
    ctaEl.textContent = p.cta.label;
    ctaEl.href = p.cta.href;
    tabs.forEach(function (t) {
      var active = t.getAttribute("data-pathway") === key;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      renderPathway(t.getAttribute("data-pathway"));
    });
  });
  // Hydrate the default pathway on load.
  if (tabs.length) renderPathway("prospective");


  // ===== Quick-Find search ====================================================
  var QF_INDEX = [
    // Rules
    { title: "Code of Points — WAG",        cat: "Rules",      icon: "WAG", href: "compete/rules/wag.html" },
    { title: "Code of Points — MAG",        cat: "Rules",      icon: "MAG", href: "compete/rules/mag.html" },
    { title: "UAG / Decathlon rules",            cat: "Rules",      icon: "UAG", href: "compete/rules/uag.html" },
    { title: "Trampoline & Tumbling rules",      cat: "Rules",      icon: "T&T", href: "compete/rules/tnt.html" },
    { title: "Masters routine table",            cat: "Rules",      icon: "M",   href: "compete/masters.html" },
    // Membership
    { title: "Individual membership",                                cat: "Membership", icon: "$",   href: "join/membership.html" },
    { title: "Independent Gymnast — compete unattached",        cat: "Membership", icon: "IG",  href: "join/membership.html" },
    { title: "Club membership",                                      cat: "Membership", icon: "CL",  href: "join/membership.html" },
    { title: "Coach membership",                                     cat: "Membership", icon: "CO",  href: "join/membership.html" },
    // Events
    { title: "Nationals 2027 — Portland",   cat: "Events",     icon: "N27", href: "compete/nationals/index.html" },
    { title: "FlipFest 2026 — Crossville",  cat: "Events",     icon: "FF",  href: "compete/retreats.html" },
    { title: "Season calendar",                  cat: "Events",     icon: "CAL", href: "compete/events.html" },
    { title: "Host a sanctioned meet",           cat: "Events",     icon: "H",   href: "compete/host.html" },
    // Clubs
    { title: "Find a club near you",             cat: "Clubs",      icon: "CL",  href: "about/clubs.html" },
    { title: "Start a new UCG club",             cat: "Clubs",      icon: "NEW", href: "join/start-club.html" },
    // Account / registration
    { title: "ScoreFlippers registration",       cat: "Register",   icon: "SF",  href: "https://scoreflippers.com/INSIGHT/League/NAIGC/NAIGC_Registration.aspx" },
    { title: "My UCG login",                     cat: "Account",    icon: "→", href: "https://scoreflippers.com/INSIGHT/League/NAIGC/NAIGC_Registration.aspx" },
    { title: "Need help registering?",           cat: "Account",    icon: "?",   href: "compete/registration.html" },
    // Members
    { title: "Sponsor discounts",                cat: "Members",    icon: "%",   href: "members/discounts.html" },
    { title: "Scholarships",                     cat: "Members",    icon: "$",   href: "members/scholarships.html" },
    { title: "Healthcare at events",             cat: "Members",    icon: "H+",  href: "members/healthcare.html" },
    // About
    { title: "Our story",                        cat: "About",      icon: "•", href: "about/index.html" },
    { title: "Leadership & board",               cat: "About",      icon: "BD",  href: "about/leadership.html" },
    { title: "Disciplines",                      cat: "About",      icon: "5",   href: "about/disciplines.html" },
    { title: "Volunteer with UCG",               cat: "About",      icon: "V",   href: "join/volunteer.html" },
    { title: "Donate",                           cat: "About",      icon: "$",   href: "join/donate.html" },
    { title: "Become a sponsor",                 cat: "About",      icon: "SP",  href: "join/sponsor.html" }
  ];

  var qfInput    = document.getElementById("qf-input");
  var qfPopover  = document.getElementById("qf-popover");
  var qfWrap     = document.getElementById("qf-search-wrap");
  var qfChips    = document.querySelectorAll("[data-qf-chip]");
  var qfGo       = document.getElementById("qf-go");

  function isExternal(href) {
    return /^https?:/i.test(href);
  }

  function renderResults(q) {
    var needle = (q || "").trim().toLowerCase();
    if (!needle) { qfPopover.classList.remove("is-open"); qfPopover.innerHTML = ""; return; }
    var hits = QF_INDEX.filter(function (it) {
      return it.title.toLowerCase().indexOf(needle) !== -1
          || it.cat.toLowerCase().indexOf(needle) !== -1;
    }).slice(0, 8);
    if (hits.length === 0) {
      qfPopover.innerHTML =
        '<div class="qf-empty">No matches for &ldquo;' +
        needle.replace(/[<>&]/g, "") +
        '&rdquo;. Try ' +
        '<a href="#" data-qf-suggest="rules">rules</a> or ' +
        '<a href="#" data-qf-suggest="nationals">nationals</a>.' +
        '</div>';
    } else {
      qfPopover.innerHTML = hits.map(function (r) {
        var ext = isExternal(r.href) ? ' target="_blank" rel="noopener"' : '';
        return (
          '<a href="' + r.href + '"' + ext + ' class="qf-result" role="option">' +
            '<span class="qf-result__icon">' + r.icon + '</span>' +
            '<span class="qf-result__text">' +
              '<span class="qf-result__title">' + r.title + '</span>' +
              '<span class="qf-result__sub">' + r.href + '</span>' +
            '</span>' +
            '<span class="qf-result__cat">' + r.cat + '</span>' +
          '</a>'
        );
      }).join("");
    }
    qfPopover.classList.add("is-open");
  }

  if (qfInput) {
    qfInput.addEventListener("input", function () { renderResults(qfInput.value); });
    qfInput.addEventListener("focus", function () {
      if (qfInput.value) renderResults(qfInput.value);
    });
  }
  if (qfGo) {
    qfGo.addEventListener("click", function () {
      if (qfInput.value) renderResults(qfInput.value);
      qfInput.focus();
    });
  }
  qfChips.forEach(function (c) {
    c.addEventListener("click", function () {
      var q = c.getAttribute("data-qf-chip");
      qfInput.value = q;
      qfInput.focus();
      renderResults(q);
    });
  });
  // Suggested links inside the empty state
  qfPopover && qfPopover.addEventListener("click", function (e) {
    var t = e.target.closest("[data-qf-suggest]");
    if (!t) return;
    e.preventDefault();
    var q = t.getAttribute("data-qf-suggest");
    qfInput.value = q;
    qfInput.focus();
    renderResults(q);
  });
  // Click outside to close
  document.addEventListener("mousedown", function (e) {
    if (qfWrap && !qfWrap.contains(e.target)) qfPopover && qfPopover.classList.remove("is-open");
  });
  // Esc to close
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") qfPopover && qfPopover.classList.remove("is-open");
  });

})();
