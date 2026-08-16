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

## 6quater. Version v4 « TV Gold » (16 août 2026) — boutons métalliques SVG + texte arabe uniquement

Nouvelle version complète fournie par l'utilisateur (3 points adressés d'après l'écran TV) :

### Point 1 — Auto-scroll playlist (Bug 1)
- `item.addEventListener('focus', () => item.scrollIntoView({ block: 'nearest', behavior: 'smooth' }))` sur chaque `.playlist-item` (auto-scroll dès Surah 3).
- Navigation D-Pad Up/Down dans `setupTVNavigation()` : flèche + `keyCode` 38/40, scroll-into-view, et débordement → `reciterBtn.focus()` (haut) / `textContainer.focus()` (bas).

### Point 2 — Nettoyage & résize du texte (Bug 2)
- **Couche de traduction française supprimée** (choix utilisateur) : plus de `.fr-text`, le fetch API est `quran-uthmani` seul (plus `fr.hamidullah`).
- `.ar-text` redimensionné : `font-size: clamp(20px, 2.8vw, 30px)` pour tenir dans le panneau (max-height 180px).

### Point 3 — Boutons de transport métalliques (Bug 3)
- Les caractères ASCII (`|<<`, `>`, `||`, `[]`, `>>|`) sont remplacés par des **icônes SVG vectorielles** (viewBox 24x24) dans les boutons.
- Finition or métallique : `fill: var(--accent)`, `drop-shadow`, bevels (`inset 0 1px 0`), focus → `fill #fff` + `scale(1.1)`, actif → `translateY(2px)`.

### Correctif ré-appliqué (régression évitée)
- Le tableau `RECITERS` de l'utilisateur réintroduisait le chemin 404 `Saood_Ash-Shuraym_128kbps` → **re-corrigé en** `Saood bin Ibraaheem Ash-Shuraym_128kbps` (vérifié HTTP 200). Les 9 autres chemins inchangés et valides.

### Autres conservations
- Picker récitateur : modal sombre custom (`.modal-overlay`/`.modal-card`/`.reciter-option`), `RECITERS` + `selectedReciterId`, trap modal Up/Down/Enter/Back/Escape/27, clic overlay ferme.
- Normalisation `key === 'Enter' || 13 || 'OK' || 'Select'`, `ArrowUp/38`, etc. (fallback keyCode TV).
- Basmalah (sauf Sourates 1 et 9), enchaînement des versets, spectre Web Audio, thème sombre/clair, FR/AR.

### Déploiement v4
- **Commit :** `d5f18fb` « TV Gold v4: SVG metallic transport buttons, Arabic-only resized text, playlist auto-scroll focus (re-apply Shuraim fix) ».
- `worker.js` régénéré (31 860 octets), vérifié (`node --check` + fetch 200/404 + contenu). Push GitHub → Pages + Vercel auto. `wrangler deploy` → **version `8ee8a327-435f-4e7b-9d14-f8fa3d636c54`**.
- **Vérifications post-déploiement :** les 3 plateformes servent 30 348 octets ; titre TV Gold, clamp arabe, SVG, Shuraim corrigé présents ; chemin cassé absent.

## 6quinquies. Version v5 — UI entièrement en arabe + 5 corrections (16 août 2026)

Nouvelle version complète fournie par l'utilisateur (page toute en arabe, `lang="ar"` `dir="rtl"`) avec 5 corrections TV :

### Fix 1 — Boutons de transport redimensionnés
- Boutons circulaires (rayon 50 %) : 42px de diamètre, bouton Lecture principal 50px. Icons SVG conservées.

### Fix 2 — Numéros de verset retirés de l'affichage
- L'affichage texte et le titre LCD n'affichent plus « 1/7 » : `arTextEl.textContent = displayAr` et `lcdTitle.textContent = surahs[currentSurahIndex].name`.

### Fix 3 — Noms arabes des récitateurs + liste élargie à 14
- Noms affichés en arabe (ex. « مشاري راشد العفاسي ») et 4 nouveaux récitateurs ajoutés :
  - `Muhammad_Jibreel_128kbps` ✅ 200
  - `Mustafa_Ismail_48kbps` ✅ 200
  - `Minshawy_Murattal_128kbps` ✅ 200
  - `Khaalid_Abdullaah_al-Qahtaanee_192kbps` ✅ 200 (le chemin de l'utilisateur `Kahlid_Al-Qahtanee_128kbps` renvoyait **404** → corrigé via la liste du dossier `everyayah.com/data/`)
- Chemin Shuraim déjà correct cette fois (`Saood bin Ibraaheem Ash-Shuraym_128kbps`, 200). **Les 14 chemins vérifiés HTTP 200.**

### Fix 4 — Visualiseur interactif (clic/OK)
- `canvas` rendu focusable (`tabindex="0"`) ; clic souris ou OK/Entrée bascule `vizMode` : 0 = barres, 1 = forme d'onde, 2 = ligne oscillante. Info-bulle « انقر لتغيير النمط ».

### Fix 5 — Barre de progression fluide sur toute la sourate
- Progression globale : `((currentAyahIndex + currentAyahProgress) / totalAyahs) * 100`, `step="0.1"` sur le `seek-bar`, lecture/seek sur l'ensemble de la sourate.

### Fix 6 (post-déploiement) — Basmalah en double
- L'API `quran-uthmani` intègre déjà بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ dans le texte du verset 1 de la plupart des sourates → le code la préfixait une 2e fois.
- Correction dans `playAyah()` : si `index === 0 && surahNum !== 1`, retrait de la Basmalah embarquée via `displayAr.replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/, '')`, puis préfixe stylisé sur sa propre ligne sauf Sourates 1 et 9.

### Déploiement v5
- **Commit v5 :** `0c1eca2` « v5: all-Arabic UI, 14 reciters, interactive visualizer, smooth progress ».
- **Commit Basmalah :** `1fbca3c` « v5: fix duplicate Basmalah (strip API-embedded, prepend styled) ».
- `worker.js` régénéré (32 148 octets), vérifié (`node --check` + fetch 200/404 + contenu). Push GitHub → Pages + Vercel auto. `wrangler deploy` → **version `1a3b988e-41c0-4f44-911d-4046bafbc10c`**.
- **Vérifications post-déploiement :** CF 200 (strip Basmalah présent), Vercel 200 + fix présent, Pages 200 + fix présent, portail 200.

## 6sexies. Version v6 — finale : texte tel quel + garde de la barre de progression pendant la Basmalah (16 août 2026)

Nouvelle version finale fournie par l'utilisateur avec deux changements de comportement :

### Changement — Affichage du texte « tel quel »
- `playAyah()` affiche désormais `ayahAr.text` **sans aucune transformation** (commentaire : « لا نضيف بسملة ولا نحذفها ») : plus de retrait de la Basmalah embarquée ni de préfixe stylisé.
- Vérification empirique de l'API `quran-uthmani` : la Basmalah est **embarquée dans le texte du verset 1** (ex. Sourate 2 : `بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ الٓمٓ`), Sourate 1 = Basmalah seule, Sourate 9 sans Basmalah. → Aucune duplication visuelle (plus de préfixe), Basmalah affichée en début de verset 1.
- La Basmalah **audio** (001001.mp3) reste jouée en intro des Sourates ≠ 1 et 9.

### Nouveau — Garde de la barre de progression
- Dans `seekBar.addEventListener('input')`, premier bloc : `if (isBasmalahPlaying) { isBasmalahPlaying = false; }` → si l'utilisateur déplace la barre pendant la Basmalah audio, son état est annulé pour éviter une « qafza ṣawtiyya » (saut audio) ; le seek global sur la sourate reste intact.

### Déploiement v6
- **Commit :** `7b95eef` « v6 final: display API text as-is, seekBar guard during audio Basmalah ».
- `worker.js` régénéré (30 987 octets), vérifié (`node --check` + fetch 200/404 + contenu : garde + commentaire présents). Push GitHub → Pages + Vercel auto. `wrangler deploy` → **version `cf5aa498-40c2-429e-a09b-cfd49d610a84`**.
- **Vérifications post-déploiement :** les 3 plateformes servent le code v6 (CF instantané, Vercel + Pages après ~20 s) ; les 14 chemins de récitateurs re-vérifiés HTTP 200.

## 6septies. Version v6.1 — garde Basmalah corrigée sur la barre de progression (16 août 2026)

Suite à la revue de l'utilisateur, son snippet pour `seekBar.addEventListener('input')` présentait **deux bugs** corrigés avant déploiement :
- `basmalaAudio.pause()` faisait référence à un élément **inexistant** (un seul `<audio id="audio-player">`) → `ReferenceError` au moment où le garde devait agir. Corrigé : abandon propre sur `audio` seul (swap vers `.../SSS001.mp3`, `load()`, `play()`).
- `(seekBar.value / 100) * audio.duration` cassait le **seek sur toute la sourate** (Fix 5) : `seekBar.value` = progression globale 0–100 sur toute la sourate, mais `audio.duration` = durée du seul verset courant. Corrigé : mapping `targetPercentage * totalAyahs` conservé (`playAyah(targetAyahIndex, true)` si changement de verset, `audio.currentTime = ayahFraction * audio.duration` sinon).

### Déploiement v6.1
- **Commit :** `d45e4fa` « v6.1: safe Basmalah abandonment on seek (no basmalaAudio ref), keep whole-surah seek ».
- `worker.js` régénéré (31 320 octets), vérifié (`node --check` + fetch 200/404 + garde présent + `basmalaAudio` absent). Push GitHub → Pages + Vercel auto. `wrangler deploy` → **version `3b03c6b9-6ec2-447a-acc7-303e6f58422a`**.
- **Vérifications post-déploiement :** les 3 plateformes servent le code v6.1 (CF instantané, Vercel + Pages au 1er poll ~20 s) ; texte tel quel conservé (pas de strip/préfixe Basmalah).

## 6octies. Version v7 — finale : chronomètre continu + seek optimisé `{ once: true }` (16 août 2026)

Version finale complète fournie par l'utilisateur, intégrée et déployée après validation.

### Chronomètre continu sur toute la sourate
- Nouvelle variable `totalElapsedBeforeCurrentAyah` qui cumule la durée des versets terminés.
- Dans `ended` : la durée (Basmala incluse) est ajoutée au cumul avant de passer au verset suivant.
- Dans `timeupdate` : affichage `totalElapsedBeforeCurrentAyah + audio.currentTime` → plus de retour à 00:00 entre versets ; utilitaire `formatTime(seconds)`.
- `totalElapsedBeforeCurrentAyah = 0` à chaque `loadSurah()`.

### Seek bar manuel optimisé (recommandation utilisateur intégrée)
- Le listener `loadedmetadata` utilise désormais **`{ once: true }`** : `audio.addEventListener('loadedmetadata', applySeek, { once: true })` → détruit automatiquement le listener après une exécution, aucune fuite mémoire ni comportement erratique lors d'un défilement rapide.
- Si le verset cible == verset courant : `applySeek()` immédiat (audio déjà chargé). Sinon `playAyah(targetAyahIndex, true)` + seek au chargement.
- La Basmala est annulée si l'utilisateur déplace la barre pendant l'intro.

### Déploiement v7
- **Commit :** `7a0090b` « v7 final: continuous surah chronometer, whole-surah seek with once-only loadedmetadata listener ».
- `worker.js` régénéré (32 475 octets), vérifié (`node --check` + fetch 200/404 + chronomètre + `{ once: true }` présents). Push GitHub → Pages + Vercel auto. `wrangler deploy` → **version `4748824d-5ec2-45e5-8c4e-23811ed9bbee`**.
- **Vérifications post-déploiement :** les 3 plateformes servent v7 (CF vérifié contenu, Vercel + Pages 200 avec le chronomètre dès le 1er poll) ; les 14 chemins de récitateurs re-vérifiés HTTP 200.

## 6novies. Version v8 — marqueurs de verset + compteur LCD + barre de progression par verset (16 août 2026)

Nouvelle version fournie par l'utilisateur, testée et déployée.

### Nouveautés v8
- **Marqueur de verset** dans le texte : `arTextEl.innerHTML = \`${ayahAr.text} <span class="ayah-marker">﴿${toArabicIndicNumber(ayahAr.numberInSurah)}﴾</span>\`` avec chiffres **arabo-indiens** (٠١٢٣…) via `ARABIC_INDIC_DIGITS` + `toArabicIndicNumber`.
- **Compteur LCD** : nouvelle ligne `.lcd-ayah-count` → `آية ${numberInSurah} / ${total}`.
- **Barre de progression par verset** (décision utilisateur, remplace le seek sur toute la sourate de v5/v7) : `seekBar.value = 0` à chaque `playAyah`/`loadSurah` ; `timeupdate` → `(current / audio.duration) * 100` (ignorée pendant la Basmalah) ; `input` → `audio.currentTime = (value/100) * audio.duration` avec garde `if (isBasmalahPlaying) return;`.
- **Tailles fixes** : `.ar-text` `font-size: 26px` (fini le clamp), `.quran-text-container` `height: 150px` fixe (pas de saut de layout), `.winamp-container` `gap: 14px`.
- Chronomètre continu v7 conservé (`totalElapsedBeforeCurrentAyah` + `formatTime`, Basmalah exclue du temps courant mais ajoutée au cumul à la fin).

### Déploiement v8
- **Commit :** `8b641e7` « v8: ayah markers (Arabic-Indic digits) + LCD ayah counter + per-ayah seek bar, fixed text/container sizes ».
- `worker.js` régénéré (31 541 octets), vérifié (`node --check` + fetch 200/404 + marqueur/chiffres/par-verset présents). Push GitHub → Pages + Vercel auto. `wrangler deploy` → **version `98244359-9a23-467c-addd-8d83af0f37db`**.
- **Vérifications post-déploiement :** les 3 plateformes servent v8 (CF vérifié, Vercel + Pages 200 dès le 1er poll) ; les 14 chemins de récitateurs re-vérifiés HTTP 200.

## 7. Vérification finale






- Portail live : ordre = 1 Quran Majeed v3 → 2 Quran Reader → **3 Quran Amp** → 4 Tanger d'Antan … → 15 SavoirsEnJouant. Section verrouillée intacte.
- Les 3 plateformes servent l'index corrigé (récitateur Shuraim réparé), la version TV Gold (contrôleur D-Pad, select agrandi, typographie 10 ft) **et** la correction 3 bugs (picker récitateur sombre, playlist Up/Down, focus RTL) **et** la v4 (boutons SVG métalliques, texte arabe uniquement résizé, auto-scroll playlist).

## 8. Étapes suivantes

- Tout futur changement : `git add -A && git commit -m "..." && git push origin main` (Vercel auto-déploie via le repo connecté).
- Cloudflare : reconstruire `worker.js` si `index.html` change puis `wrangler deploy`.
- Vérifier sur mobile/TV : défilement playlist, spectre, lecture enchaînée des versets, OK/Enter D-Pad sur webOS/Tizen, picker récitateur (Up/Down/Enter/Back dans les deux thèmes).
