# UCG (formerly NAIGC) — site mockup

Internal preview of the rebrand. **Password: `fortheloveofthesport`**

This folder is the entire deployable site. It's plain static HTML / CSS / JS — no build step, no dependencies.

## Deploy to GitHub Pages

Three options, from simplest to most flexible:

### Option A — user/org site (recommended)
Create a new public repo named `<your-username>.github.io`. Copy the **contents** of this `site/` folder (not the folder itself) into the repo root, commit, push. Pages serves from `main` automatically. URL: `https://<your-username>.github.io/`.

### Option B — project site
Create any repo, e.g. `ucg-preview`. Copy the contents of `site/` into the repo root, commit, push. In repo Settings → Pages, set source to `main` / `/ (root)`. URL: `https://<your-username>.github.io/ucg-preview/`. **All internal links use relative paths so this works without changes.**

### Option C — gh-pages branch
If you'd rather not pollute `main`, push to a `gh-pages` branch and set Pages to serve from that branch.

## Notes
- `.nojekyll` is present so GitHub doesn't try to run Jekyll.
- `robots.txt` blocks all crawlers — keep this until launch.
- Every page has `<meta name="robots" content="noindex, nofollow" />` for the same reason.
- All page meta titles are set; favicon/OG images haven't been added (TODO before launch).

## Password gate

`assets/js/gate.js` shows a password screen until the user enters `fortheloveofthesport`. Authentication is cached in `sessionStorage` so they only enter it once per browser session.

**This is not a security boundary** — the password is in the source. It just stops casual browsers who stumble onto the repo. Don't link this from anywhere public until launch.

To remove the gate before launch: delete the `<script src=".../gate.js"></script>` tag from each page (or just delete `gate.js`).

## Editing

Pages are independent HTML files. There's no template engine, but the chrome (top bar, header, footer) is identical across pages — if you change one, change the others. The original generator script is at `../build_pages.py` (one level up from this `site/` folder); it can re-emit any page from a single source of truth.

## Pages

```
/                       Home
/about/                 Our Story (hub)
/about/disciplines      WAG, MAG, UAG, T&T, Masters
/about/leadership       Board + OLT
/about/governance       Policies, minutes, elections
/about/clubs            Searchable directory
/about/faqs             FAQs

/compete/               Season overview hub
/compete/nationals/     Nationals 2026 hub
/compete/masters        Masters division
/compete/events         Sanctioned events calendar
/compete/retreats       FlipFest + FlipStar
/compete/rules/         Rule books + CoP
/compete/host           Host a meet
/compete/registration   Registration help
/compete/training       Training resources

/join/                  Hub
/join/membership        Individual + club
/join/start-club        Start a UCG club
/join/volunteer         Open positions
/join/donate            Donate
/join/sponsor           Sponsorship packages

/members/               Benefits overview
/members/discounts      Sponsor discounts
/members/scholarships   Scholarships
/members/healthcare     Healthcare team
```
