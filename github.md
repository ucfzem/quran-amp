# 📝 Backup conversation — Quran Amp (Lecteur Coran Winamp rétro)

> **Fichier créé le :** 16 août 2026
> **But :** conserver le fil de la session : ajout du projet « Quran Amp » dans le portail `ucfzem.github.io/works`, section déverrouillée, 3ᵉ position sous « Quran Reader ».
> **Note sécurité :** aucun token ni mot de passe n'est stocké dans ce dépôt ou ce fichier. Tout token fourni en session est réutilisé ponctuellement et jamais écrit sur disque ni commité.

---

## 1. Le projet

Lecteur de Coran façon **Winamp rétro doré** — version finale optimisée fournie par l'utilisateur (celle-ci).
- Lecture **verset par verset** (mp3) depuis `everyayah.com` (10 récitateurs).
- Texte arabe (Uthmani) + traduction française (Hamidullah) synchronisés via `api.alquran.cloud`.
- Visualiseur de spectre (Web Audio API), LCD ticker, seek/volume, playlist des 114 sourates.
- Thème sombre/clair, interface FR/AR (RTL), auto-scroll du texte et de la playlist.
- Correctif apporté : récitateur **Saud Al-Shuraim** — le chemin `Saood_Ash-Shuraym_128kbps` renvoyait **404** ; corrigé en `Saood bin Ibraaheem Ash-Shuraym_128kbps` (vérifié HTTP 200).

## 2. Vérifications techniques effectuées avant déploiement

- `api.alquran.cloud/v1/surah` → **200**, 114 sourates.
- `api.alquran.cloud/v1/surah/1/editions/quran-uthmani,fr.hamidullah` → **200**, 2 éditions, 7/7 versets.
- `everyayah.com/data/.../001001.mp3` → **200** pour 9/10 récitateurs initiaux ; le 10ᵉ (Shuraim) **404** → chemin corrigé → **200**.
- CORS : `access-control-allow-origin: *` présent sur everyayah (requis pour le spectre).
- Syntaxe JS du fichier `index.html` validée (`new Function` OK), fixes optimisés présents (canvas 90x38, `#text-container`, `scrollPlaylistToActive`, `initAudioContext` sur Play).

## 3. Modification du portail (works/index.html)

- **Fichier :** `works/index.html` dans `ucfzem/ucfzem.github.io` (branche `main`).
- **Section ciblée :** `publicProjects` (applications déverrouillées) uniquement — **Projets verrouillés intacts**.
- **Emplacement :** insertion en **3ᵉ position**, immédiatement après « Quran Reader » (n°2).
- **Carte ajoutée :** `{ num: 3, emoji: "📖", name: "Quran Amp", tag: "Quran", icon: null, url: "https://ucfzem.github.io/quran-amp/", newTab: true }`.
- **Décalages (numéros) :** Tanger d'Antan 3→4, Blog 4→5, Lingotech 5→6, MicroInvoice 6→7, Droppy 7→8, Rafeeq 8→9, WebHealth 9→10, ElixirTech 10→11, EmailCollector 11→12, API JobFinder 12→13, Nuzhat al-Mushtaq 13→14, SavoirsEnJouant 14→15.
- **Compteur :** « 14 projets publics » → « 15 projets publics ».
- **JSON-LD :** item `position 3` ajouté (Quran Amp), positions 3→17 décalées en 4→18 (total 18 items, inchangés en contenu/ordre).
- **Meta description :** « Quran Amp » ajouté après « Quran Reader ».
- **Aucun autre élément modifié** (CSS, thème, verrouillage, autres liens).

## 4. Vérification jsdom (avant déploiement)

- Rendu = **15 cartes** dans l'ordre attendu : 1 Quran Majeed v3 → 2 Quran Reader → **3 Quran Amp** → 4 Tanger d'Antan → … → 15 SavoirsEnJouant.
- Carte n°3 : `href=https://ucfzem.github.io/quran-amp/`, nom « Quran Amp », emoji 📖, tag « Quran ».
- Section verrouillée : **9 dossiers, 39 cartes** — inchangées.
- JSON-LD : 18 items, position 3 = Quran Amp.
- Diff git : uniquement 4 lignes de changement ciblé (meta, JSON-LD, sous-titre, tableau `publicProjects`).

## 5. Déploiement

### Déploiement GitHub Pages — projet quran-amp
```
git init && git add -A && git commit -m "Add Winamp Quran Player (Gold Edition)"
git branch -M main
git remote add origin https://github.com/ucfzem/quran-amp.git
git push -u origin main
```
- GitHub Pages activé → `https://ucfzem.github.io/quran-amp/`

### Déploiement GitHub Pages — portail works
- Commit `works/index.html` dans `ucfzem/ucfzem.github.io` (main) → push.
- Pages se met à jour automatiquement → `https://ucfzem.github.io/works/`

### Déploiement Vercel
- `vercel --prod --yes` (token `vcp_…`) → projet `ucfzem-s-projects/quran-amp`, repo GitHub connecté (push = auto-deploy).
- Production : `https://quran-amp.vercel.app/`

### Déploiement Cloudflare Workers
- `worker.js` généré depuis `index.html` (réponse HTML directe, 20 975 octets).
- `wrangler deploy` (token `cfut_…`, compte `Azer.tyu199p@gmail.com's Account`).
- **Version ID (v1 Gold) :** `17661281-8339-469b-a3cd-cb20098f60d1`
- **Version ID (v2 TV Gold, actuelle) :** `8aa4cc32-e069-490e-b9d0-0bdec5b4b610`
- URL : `https://quran-amp.azer-tyu199p.workers.dev/`

## 6bis. Mise à jour « TV Gold Edition » (16 août 2026)

L'utilisateur a fourni une version optimisée pour Smart TV et demandé 3 correctifs critiques pour les anciens téléviseurs (webOS legacy, NetCast, Tizen 2.x, Android TV anciens) :

### Fix 1 — Global TV Keydown Controller (OK / Enter D-Pad)
- Ajout d'un `window.addEventListener('keydown', …)` dans `setupTVNavigation()`.
- `Enter` / `13` / `VK_ENTER` / `Select` → `active.click()` si un élément (≠ BODY) est focus.
- Flèches `ArrowLeft/37` et `ArrowRight/39` sur `input[type=range]` focus → ajustement seek/volume ±5 + `dispatchEvent(new Event('input'))`.
- Scroll `textContainer` en D-Pad haut/bas : ±60px (précédemment ±40px), avec `e.keyCode` comme fallback.

### Fix 2 — Native `<select>` sur télécommande
- `select` agrandi : `height: 52px`, `font-size: 18px`, `padding: 8px 16px`, `background-color: var(--panel-bg)`, `color: var(--text-main)`.

### Fix 3 — Échelle TV à 10 ft
- `.ar-text` : `clamp(32px, 4vw, 44px)` + `line-height: 1.8`.
- `.fr-text` : `clamp(18px, 2vw, 24px)`.
- `.playlist-item` : `padding: 14px 16px !important`, `font-size: 18px !important`.
- `.btn-winamp` : `height: 56px !important`, `font-size: 20px !important`.

### Déploiement v2
- **Commit :** `f7ea366` « TV Gold Edition: legacy remote D-Pad keydown controller, oversized select/controls, 10ft-scaled typography » (après `2966444`).
- `worker.js` régénéré depuis le nouvel `index.html` (25 031 octets), vérifié (`node --check` + fetch 200/404 via import ES module).
- Push GitHub → GitHub Pages + Vercel auto-déployés. `wrangler deploy` → version `8aa4cc32-e069-490e-b9d0-0bdec5b4b610`.
- **Vérifications post-déploiement :** les 3 plateformes servent 23 796 octets, titre « Winamp Quran Player - TV Gold Edition », contrôleur D-Pad (`VK_ENTER`) présent, `clamp(32px,4vw,44px)` présent, récitateur Shuraim corrigé présent.

## 6ter. Correction 3 bugs TV (16 août 2026)

L'utilisateur a identifié 3 bugs distincts et fourni une version complète corrigée (même pattern modal sombre que l'app Walkman) :

### Bug 1 — Playlist ne défile pas à la télécommande
- Avant : les `.playlist-item` n'avaient qu'un listener Enter/Space ; aucun Up/Down ne déplaçait le focus entre les items (dépendance à la spatial-navigation OS, peu fiable).
- Après : listener `keydown` sur `#playlist` (container) → Up/Down (flèches + `keyCode` 38/40) déplace le focus item par item et `scrollIntoView`. Fonction `normalizeDirection(e)` centralise la normalisation `e.key` + `keyCode` (40/38/37/39/13/32/27/10009/461 = Back) pour les anciens firmwares TV.

### Bug 2 — Popup récitateur blanc en mode sombre
- Avant : `<select>` natif — la liste d'options est rendue par l'OS/le navigateur et ignore `--panel-bg`/`--text-main`.
- Après : converti en **picker modal sombre personnalisé** (`.reciter-trigger` + `.reciter-modal` fixe avec overlay + `<ul class="reciter-list">` de `<li>`). Le `<select id="reciter-select">` natif est conservé **caché** (`style="display:none"`) uniquement pour l'état/valeur (`reciterSelect.value` et l'événement `change` inchangés — `selectReciter()` met à jour `selectedIndex` puis `dispatchEvent(new Event('change'))`). Thème sombre/clair respecté, sélection marquée ✓ via `.selected`.

### Bug 3 — Focus « reste en arrière » près du panneau récitateur (RTL)
- Avant : spatial-nav OS sur `<select>` natif = piège connu (focus derrière le panneau).
- Après : le picker étant du DOM `<div>`/`<li>` sous notre contrôle, Up/Down/Enter/Back sont gérés par notre JS (listener `keydown` sur `#reciter-list`), et le handler global D-Pad s'efface quand le modal est ouvert (`if (!reciterModal.classList.contains('hidden')) return;`) ou quand le focus est sur un `.reciter-item`/`.playlist-item` (évite les doubles déclenchements).

### Test demandé par l'utilisateur
- Ouvrir le picker récitateur à la télécommande : Up/Down scroll + surlignage dans les deux thèmes, Enter sélectionne, Back/Escape ferme.

### Déploiement v3
- **Commit :** `828aef7` « TV fixes: custom dark reciter modal (was white popup), playlist Up/Down remote nav, normalizeDirection keycode fallback » (après `726705f`).
- `worker.js` régénéré (34 996 octets), vérifié (`node --check` + fetch 200/404 + contenu). Push GitHub → Pages + Vercel auto. `wrangler deploy` → **version `e1cc620c-cf2c-4110-ab7a-0b6e40075d7d`**.
- **Vérifications post-déploiement :** les 3 plateformes servent 33 253 octets ; titre TV Gold, `normalizeDirection`, `reciter-trigger`, `<select>` caché, récitateur Shuraim corrigé — tous présents. Portail intact.

## 6. Liens (validation) — tous HTTP 200 vérifiés

| Élément | Lien |
|---|---|
| Projet Quran Amp (GitHub Pages) | https://ucfzem.github.io/quran-amp/ |
| Projet Quran Amp (Vercel) | https://quran-amp.vercel.app/ |
| Projet Quran Amp (Cloudflare) | https://quran-amp.azer-tyu199p.workers.dev/ |
| Portail Works (3ᵉ position) | https://ucfzem.github.io/works/ |
| Repo quran-amp | https://github.com/ucfzem/quran-amp |
| Source du portail | https://github.com/ucfzem/ucfzem.github.io/blob/main/works/index.html |
| Ce backup | github.md + `backups/` du portail |

## 7. Vérification finale

- Portail live : ordre = 1 Quran Majeed v3 → 2 Quran Reader → **3 Quran Amp** → 4 Tanger d'Antan … → 15 SavoirsEnJouant. Section verrouillée intacte.
- Les 3 plateformes servent l'index corrigé (récitateur Shuraim réparé), la version TV Gold (contrôleur D-Pad, select agrandi, typographie 10 ft) **et** la correction 3 bugs (picker récitateur sombre, playlist Up/Down, focus RTL).

## 8. Étapes suivantes

- Tout futur changement : `git add -A && git commit -m "..." && git push origin main` (Vercel auto-déploie via le repo connecté).
- Cloudflare : reconstruire `worker.js` si `index.html` change puis `wrangler deploy`.
- Vérifier sur mobile/TV : défilement playlist, spectre, lecture enchaînée des versets, OK/Enter D-Pad sur webOS/Tizen, picker récitateur (Up/Down/Enter/Back dans les deux thèmes).
