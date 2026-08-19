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
- **Version ID (v2 TV Gold) :** `8aa4cc32-e069-490e-b9d0-0bdec5b4b610`
- **Historique des versions CF :** v3 `e1cc620c-cf2c-4110-ab7a-0b6e40075d7d` → v4 `8ee8a327-435f-4e7b-9d14-f8fa3d636c54` → v5 `1a3b988e-41c0-4f44-911d-4046bafbc10c` → v6.1 `3b03c6b9-6ec2-447a-acc7-303e6f58422a` → v6 `cf5aa498-40c2-429e-a09b-cfd49d610a84` → v7 `4748824d-5ec2-45e5-8c4e-23811ed9bbee` → v8 `98244359-9a23-467c-addd-8d83af0f37db` → v9 `7cff0905-620d-4681-9e8c-f840a7090cd4` → v10 `00b7206e-05b2-438a-b756-b45405350b60` → v11 `c708d58e-fb36-4007-8ed2-da75b42daa06` → **v12 `94ad1228-17cc-4dcf-921a-aa7f95973162`**
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

## 6decies. Version v9 — marqueurs en chiffres simples, texte clampé (16 août 2026)

Nouvelle version fournie par l'utilisateur, testée et déployée.

### Changements v9 (par rapport à v8)
- **Marqueur de verset en chiffres simples** : `arTextEl.innerHTML = \`${ayahAr.text} <span class="ayah-marker">﴿${ayahAr.numberInSurah}﴾</span>\`` — les chiffres **arabo-indiens** sont supprimés (`ARABIC_INDIC_DIGITS` et `toArabicIndicNumber` retirés).
- **Texte re-clampé** : `.ar-text` revient à `font-size: clamp(18px, 2.5vw, 26px)` (le 26px fixe de v8 est supprimé).
- **Conservés de v8 :** hauteur fixe `.quran-text-container` 150px, `gap: 14px`, barre de progression **par verset** (`seekBar.value = 0` par ayah, garde `if (isBasmalahPlaying) return;`), compteur LCD `آية X / Y`, chronomètre continu (`totalElapsedBeforeCurrentAyah` + `formatTime`, durée de la Basmalah ajoutée au cumul à la fin).
- **Aucun `basmalaAudio`** (aucune référence à un élément inexistant).

### Vérifications avant déploiement
- Syntaxe JS validée (`node --check` sur le script extrait).
- Checklist v9 : marqueur `﴿${ayahAr.numberInSurah}﴾`, `clamp(18px, 2.5vw, 26px)`, absence de `ARABIC_INDIC_DIGITS`/`toArabicIndicNumber`, seek par verset, chronomètre continu, Basmalah gérée, 14 récitateurs.
- Les **14 chemins de récitateurs** re-vérifiés HTTP 200 (Sudais `Abdurrahmaan_As-Sudais_192kbps` confirmé, Qahtani `Khaalid_Abdullaah_al-Qahtaanee_192kbps`).

### Déploiement v9
- **Commit :** `faf49e1` « v9: plain-digit ayah markers, clamp text size, per-ayah seek, continuous timer ».
- `worker.js` régénéré (33 054 octets), vérifié (`node --check` + fetch 200/404 + marqueur/clamp/par-verset présents, `ARABIC_INDIC_DIGITS` absent). Push GitHub → Pages + Vercel auto. `wrangler deploy` → **version `7cff0905-620d-4681-9e8c-f840a7090cd4`**.
- **Vérifications post-déploiement :** les 3 plateformes servent v9 (CF + Vercel + Pages 200 avec le marqueur simple et le clamp) ; portail `ucfzem.github.io/works` 200, Quran Amp toujours 3ᵉ.

## 6undecies. Version v10 — temps écoulé / restant (HH:MM:SS) (16 août 2026)

Nouvelle version fournie par l'utilisateur, testée et déployée.

### Changements v10 (par rapport à v9)
- **`formatTime` étendue au format heures** : la fonction gère désormais `HH:MM:SS` quand `h > 0`, sinon `MM:SS` :
  ```javascript
  function formatTime(totalSeconds) {
    if (isNaN(totalSeconds) || totalSeconds < 0) totalSeconds = 0;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
  }
  ```
- **Affichage « écoulé / restant »** dans `#lcd-time` :
  - **Temps écoulé cumulé sur la sourate** : `totalElapsedBeforeCurrentAyah + (isBasmalahPlaying ? 0 : current)` (la Basmala reste exclue du temps courant, ajoutée au cumul à la fin).
  - **Temps restant du fichier en cours** : `Math.max(0, duration - current)` avec `duration = audio.duration || 0` (robuste avant chargement : `NaN`/`0` → `0:00`).
  - `lcdTime.textContent = \`${elapsedStr} / ${remainingStr}\`;`
- **Conservés :** barre de progression **par verset** (`timeupdate` inchangé pour le seek), marqueur `﴿${numberInSurah}﴾` en chiffres simples, texte clampé `clamp(18px, 2.5vw, 26px)`, hauteur fixe 150px + `gap: 14px`, compteur LCD, 14 récitateurs.
- Unit tests `formatTime` : `6525 → 1:48:45`, `7 → 0:07`, `3599 → 59:59`, `3600 → 1:00:00`, `-5/NaN → 0:00` — 8/8 OK.

### Vérifications avant déploiement
- Syntaxe JS validée (`node --check` sur le script extrait).
- Checklist v10 : branche heures dans `formatTime`, affichage écoulé/restant, `Math.max(0, duration - current)`, exclusion Basmala, seek par verset, marqueur simple, clamp, absence `ARABIC_INDIC_DIGITS`.
- Les **14 chemins de récitateurs** re-vérifiés HTTP 200 (Ghamadi confirmé).

### Déploiement v10
- **Commit :** `fa30773` « v10: elapsed/remaining time display (HH:MM:SS), cumulative elapsed + current-ayah remaining ».
- `worker.js` régénéré (33 546 octets), vérifié (`node --check` + fetch 200/404 + écoulé/restant + branche heures présents). Push GitHub → Pages + Vercel auto. `wrangler deploy` → **version `00b7206e-05b2-438a-b756-b45405350b60`**.
- **Vérifications post-déploiement :** les 3 plateformes servent v10 (CF + Vercel instantanés, Pages au 5ᵉ poll ~25 s) ; portail `ucfzem.github.io/works` 200, Quran Amp toujours 3ᵉ.

### Vérification finale de la session (16 août 2026)
- Un script de vérification jsdom (avec `url`) semblait **bloquer** (« Still hanging there ») : c'était le chargement réseau de jsdom, pas l'application — les 4 URL répondent 200. Vérification re-faite par **parse statique** du script `works/index.html` (sans réseau) : ordre = `["Quran Majeed v3","Quran Reader","Quran Amp","Tanger d'Antan",…]`, **Quran Amp index 2 (3ᵉ carte)** — intact depuis v1. Aucune modification du portail dans v9/v10 (seuls les backups ont été commités).

## 6duodecies. Version v11 — visualiseur idle/actif fusionné (16 août 2026)

L'utilisateur a fourni un `index.html` complet contenant un **nouveau visualiseur** (mode actif + mode veille), mais basé sur une lignée plus ancienne qui faisait régresser des fonctionnalités v8/v9/v10. Décision utilisateur : **fusionner** — garder la base v10 et n'intégrer que le visualiseur.

### Visualiseur intégré (nouveau)
- `drawSpectrum()` bascule désormais selon `const isActive = analyser && audio.src && !audio.paused;` :
  - **Actif** → `drawActiveSpectrum()` : barres FFT avec **dégradé** (`accent` → `lcd-text`), ombre lumineuse, **peak caps** blancs (#fff8dc) façon « LED meter ».
  - **Idle** (pause/stop/pas de lecture) → `drawIdleWave()` : **vague dorée animée** (sinusoïde avec enveloppe `0.4 + 0.6*|sin(idlePhase*0.35)|`, `idlePhase += 0.1`, ombre `lcd-text`).
- Boucle démarrée une seule fois dans `init()` (`drawSpectrum();`) — plus d'appel dans `initAudioContext()` (évite une double boucle rAF).
- `vizMode` et le clic sur le canvas (cycle 3 modes) **supprimés** (remplacés par le design unifié actif/idle).

### Vérifications du fichier utilisateur (avant fusion)
- Syntaxe OK, 24 IDs présents.
- Les **13 récitateurs de son fichier** vérifiés HTTP 200 (dont les 3 nouveaux : `Hudhaify_128kbps`, `Hani_Rifai_192kbps`, `Ahmed_ibn_Ali_al-Ajamy_64kbps_QuranExplorer.Com`).
- Logique Basmalah (strip + injection) testée contre l'API live : surahs 2/3/5/7/10/29 — strip OK.
- Réversions de son fichier (chiffres arabo-indiens, seek sur toute la sourate, `fr.hamidullah`/bouton FR, 13 récitateurs) **non retenues** — base v10 conservée.

### Base v10 conservée intégralement
- `formatTime` (HH:MM:SS), affichage **écoulé / restant**, chronomètre continu (`totalElapsedBeforeCurrentAyah`), barre de progression **par verset** (garde `if (isBasmalahPlaying) return;`), marqueur `﴿${numberInSurah}﴾` en chiffres simples, texte clampé, hauteur fixe 150px + `gap: 14px`, compteur LCD `آية X / Y`, tout-arabe, **14 récitateurs** (re-vérifiés HTTP 200).

### Déploiement v11
- **Commit :** `223de3c` « v11: idle/active visualizer (golden idle wave + gradient bars with peak caps), keep v10 features ».
- `worker.js` régénéré (34 437 octets), vérifié (`node --check` + fetch 200/404 + isActive/idleWave/peak-cap/écoulé-restant présents, `vizMode`/`ARABIC_INDIC_DIGITS`/`currentLang` absents). Push GitHub → Pages + Vercel auto. `wrangler deploy` → **version `c708d58e-fb36-4007-8ed2-da75b42daa06`**.
- **Vérifications post-déploiement :** les 3 plateformes servent v11 (CF + Vercel instantanés, Pages au 5ᵉ poll) ; portail `ucfzem.github.io/works` 200, Quran Amp toujours 3ᵉ.

## 6terdecies. Version v12 — visualiseur 5 modes (Barres/Courbe/Remplissage/Cercles/Vagues) (16 août 2026)

L'utilisateur a fourni un `index.html` complet intégrant le **visualiseur multi-modes** sur la base v10/v11 (tout-arabe, 14 récitateurs, écoulé/restant HH:MM:SS, seek par verset, marqueurs en chiffres simples, compteur LCD). Cette fois aucun conflit de lignée : les fonctionnalités v8–v11 sont toutes conservées.

### Visualiseur 5 modes (nouveau)
- `vizMode` restauré + `const VIZ_MODES = ['Barres', 'Courbe', 'Remplissage', 'Cercles', 'Vagues']` (0–4).
- **Clic sur le canvas** : `vizMode = (vizMode + 1) % VIZ_MODES.length` (+ `console.log` du nom du mode) ; canvas `tabindex="0"` + `title="انقر لتغيير النمط"`.
- `drawActiveSpectrum(dataArray, accent, lcdText)` dispatche par `switch (vizMode)` :
  - `0` `drawBars` (barres FFT + dégradé accent→lcd-text + peak caps #fff8dc, code original v11 extrait en fonction),
  - `1` `drawCurve` (courbe de ligne lcd-text, `lineWidth:2`, ombre 8),
  - `2` `drawFill` (vague pleine : moyenne des amplitudes → rect centré avec gradient lcd-text→accent, ombre 10),
  - `3` `drawCircles` (cercles concentriques : rayon ∝ amplitude moyenne, ombre 8, point central),
  - `4` `drawWaveform` (vague sinusoïdale animée : `phase = x*0.2 + t*0.12`, enveloppe, amplitude ∝ moyenne).
- Idle conservé : `drawIdleWave()` (vague dorée, `idlePhase += 0.1`), boucle rAF unique dans `init()`.

### Vérifications v12 (avant déploiement)
- `node --check` OK (script extrait lignes 518–1239). IDs/canvas/VIZ_MODES/5 fonctions `draw*`/switch/clic présents ; **aucune régression** : pas de `ARABIC_INDIC_DIGITS`, ni `currentLang`, ni `btn-lang`, ni `basmalaAudio` ; `lang="ar" dir="rtl"`, `clamp(18px,2.5vw,26px)`, hauteur fixe 150px, `formatTime` HH:MM:SS, `lcdTime` écoulé/restant, marqueur `﴿${numberInSurah}﴾`, `seekBar.value = 0` par verset, `loadSurah(0, true)`.
- **Diff v11→v12** : uniquement visualiseur + suppression/édition de commentaires (et lignes vides) ; aucune logique retirée (les lignes `-` non-commentaires sont : fusion balise html sur une ligne, canvas avec tabindex/title, commentaire enlevé, boucle de `drawBars` extraite en fonction, `if (isBasmalahPlaying) return;` conservé sans commentaire).
- **14 récitateurs = source de vérité**, tous HTTP 200 sur `https://everyayah.com/data/<reciter>/001001.mp3` (7 + 7, individuellement, GET n'a pas été utilisé — HEAD OK). Chemins multi-chiffres vérifiés : `002001`, `002255`, `114006`, `097001` → 200. API `api.alquran.cloud/v1/surah` et `/2/editions/quran-uthmani` → 200.

### Déploiement v12
- **Commit :** `476b755` « v12: 5-mode visualizer (Barres/Courbe/Remplissage/Cercles/Vagues), canvas click cycles mode ».
- `worker.js` régénéré via `/tmp/opencode/_gen-worker.js` (37 685 octets) ; `node --check` OK ; smoke test (import ESM → `worker.default.fetch`) : `/` 200 + 16/16 probes PASS, `/x` 404. Push GitHub → Pages + Vercel auto. `wrangler deploy` → **version `94ad1228-17cc-4dcf-921a-aa7f95973162`**.
- **Vérifications post-déploiement :** CF, Vercel et Pages servent v12 (200 + 6/6 probes chacun, instantanés) ; portail `ucfzem.github.io/works` 200, Quran Amp toujours 3ᵉ (parse statique : 15 cartes publiques, index 2).

## 6quattuordecies. Version Android — Capacitor 7 (`mobile/`) (16 août 2026)

Conversion de l'app web en **application Android Google Play** via Capacitor, dans un dossier isolé `mobile/` — **l'original web (`index.html` à la racine) n'est jamais modifié** (copie traitée dans `mobile/www/`).

### Choix validés par l'utilisateur
- **Option A : copie traitée** (polices locales + bridge natif + cache API + JS obfusqué dans `mobile/www/`), jamais la source.
- **Dossier `mobile/android/` standard** (nom attendu par Capacitor, zéro renommage).
- **Capacitor 7** (pas 6) : le plugin `@srikarthiks/capacitor-media-session` exige `>=7` (vérifié : toutes ses versions 0.0.1→0.0.8 demandent Cap ≥ 7) ; Capacitor 7 cible SDK 35, exigence Google Play 2026.

### Contenu généré
- `mobile/package.json` (Capacitor 7.6.8, `@capacitor/app` 7.1.2, `@capacitor/splash-screen` 7.0.5, `@srikarthiks/capacitor-media-session` 0.0.8, `javascript-obfuscator` 4.2.2), `capacitor.config.json` (appId `com.ucfzem.quranamp`, appName « Quran Amp », webDir `www`, splash #120e0b, `allowMixedContent=false`, `webContentsDebuggingEnabled=false`).
- Scripts : `scripts/install-fonts.mjs` (TTF Google Fonts → local), `scripts/obfuscate.mjs` (javascript-obfuscator : stringArray base64, identifiants hexadécimaux, vérifié par `node --check` dans le build), `scripts/build.mjs` (fonts + transform + obfuscate → `www/`).
- `www/` : copie avec `<link css/fonts.css>` local (fini fonts.googleapis.com), `<script src="js/native-bridge.js">` injecté avant le script principal, `overscroll-behavior:none`, JS obfusqué (`_0x…`).
- Polices locales vérifiées avec fontTools : **Amiri 339 glyphes arabes**, Tajawal 67, VT323 0 (arabe du compteur LCD retombe sur la police système — normal, chiffres OK).
- `native-bridge.js` : patch `window.fetch` (cache `localStorage` 30 j pour `api.alquran.cloud`), bouton retour (`@capacitor/app`, ferme les modales sinon quitte), **MediaSession** (`Capacitor.Plugins.MediaSession` : setMetadata title=`#lcd-title`/artist=`#reciter-label`, play/pause/position, action handlers play/pause/prev/next/seekto câblés sur les boutons `btn-prev`/`btn-next`).
- Natif : `MainActivity.java` enregistre `MediaSessionPlugin` (classe `com.goalplay.capacitormediasession.MediaSessionPlugin`) ; manifest `INTERNET` seul + `FOREGROUND_SERVICE_MEDIA_PLAYBACK` (exigé API 34+ ; le plugin ajoute au merge `FOREGROUND_SERVICE` + `WAKE_LOCK`, obligatoires pour l'audio en arrière-plan) ; `hardwareAccelerated=true`, `supportsRtl=true` ; SDK min 23 / compile 35 / target 35 (`variables.gradle`).
- `README-ANDROID.md` : commandes, **politique de confidentialité** prête à publier, **réponses exactes du formulaire Data Safety** (Non partout), checklist Play.

### Commandes exécutées et validées
`npm install` (0 vulnérabilité) → `npm run build:web` (6 polices TTF, obfuscation OK) → `npx cap add android` (3 plugins détectés) → `npx cap sync android`. Assets copiés vérifiés dans `android/app/src/main/assets/public` (bridge + fonts + obfusqué).

### Déploiement / CI
- **Commit `6e3d115`** « feat(mobile): Android app (Capacitor 7) … » poussé sur `ucfzem/quran-amp` (70 fichiers ; `node_modules` et artefacts build exclus par `.gitignore`).
- **Workflow GitHub Actions** `.github/workflows/build-android.yml` : à chaque push touchant `mobile/` → Java 21 + Node 22, `npm ci`, `npm run build:web && cap sync`, `./gradlew assembleDebug` (APK installable) + `./gradlew bundleRelease` (AAB), artefacts téléchargeables (Actions → artifact).

### Utilisateur : tester / installer
1. Sur téléphone : mode développeur + débogage USB, puis `npx cap open android` + ▶ Run (test lock-screen audio).
2. Sans câble : APK debug depuis Actions (artifact `quran-amp-android`) ou `app/build/outputs/apk/debug/app-debug.apk`, activer « sources inconnues ».
3. En attendant : version web https://ucfzem.github.io/quran-amp/ identique.
4. Publier : Android Studio → Generate Signed Bundle (keystore) → `app/build/outputs/bundle/release/app-release.aab`.

## 6quindecies. Android — correctif de build (patch-package, 16 août 2026)

Le build GitHub Actions échouait sur le plugin `@srikarthiks/capacitor-media-session@0.0.8` (3 bugs successifs) :

### Bug 1 — Dépendances Gradle fantômes
- `android/build.gradle` du plugin listait ~24 artefacts `androidx.media3:*:1.2.1` **inexistants sur Maven** (copier-coller du plugin) → `Could not find androidx.media3:media3-session:1.2.1`.
- Le code Java n'utilise **aucun** import media3 → les dépendances ont été supprimées (ne garde que `androidx.appcompat`, `androidx.core`, `androidx.media:media:1.7.0`).

### Bug 2 — Import `CapacitorContext` obsolète
- `MediaSessionPlugin.java:26` importait `com.getcapacitor.plugin.util.CapacitorContext` (n'existe plus, jamais utilisé) → supprimé.

### Bug 3 — Appel à une méthode inexistante
- `MediaSessionService.java:88` appelait `setupNotification()` **jamais définie** (la notification + `startForeground` sont déjà faites dans `setupMediaSession()`) → appel supprimé.

### Mécanisme : `patch-package`
- `patch-package` installé en devDependency ; script `"postinstall": "patch-package"` dans `mobile/package.json`.
- Patch committé : `mobile/patches/@srikarthiks+capacitor-media-session+0.0.8.patch` (3 fichiers : `build.gradle`, `MediaSessionPlugin.java`, `MediaSessionService.java`).
- `npm ci` (CI) ré-applique le patch automatiquement — validé localement (`npm ci` → postinstall → patch appliqué).
- Note : le plugin étant maintenu sur GitHub, le patch peut être proposé en issue upstream.

### Déploiement
- **Commit `afe7835`** « fix(mobile): patch media-session plugin - remove non-existent media3 deps (patch-package, auto-applied by npm ci) ».
- **Commit `57b3edc`** « fix(mobile): patch plugin Java - remove stale CapacitorContext import and undefined setupNotification() call ».
- **Run `31962360579` → SUCCESS** : `assembleDebug` + `bundleRelease` OK, artifact `quran-amp-android` (8,1 MB) téléchargeable depuis l'onglet Actions.

## 7. Vérification finale



- Portail live : ordre = 1 Quran Majeed v3 → 2 Quran Reader → **3 Quran Amp** → 4 Tanger d'Antan … → 15 SavoirsEnJouant. Section verrouillée intacte.
- Les 3 plateformes servent l'index corrigé (récitateur Shuraim réparé), la version TV Gold (contrôleur D-Pad, select agrandi, typographie 10 ft), la correction 3 bugs (picker récitateur sombre, playlist Up/Down, focus RTL), la v4 (boutons SVG métalliques, texte arabe uniquement résizé, auto-scroll playlist) **et la v12** (visualiseur 5 modes, click sur canvas pour changer de style).
- **Android :** build CI **SUCCESS** (commit `57b3edc` + run `31962360579`), APK debug + AAB release produits.

## 9. Backup final — clôture de la journée (16 août 2026, soir)

### Vérifications de l'ultime session
- **Aucun build ne « tourne depuis 1 h »** : les 5 derniers runs ont duré 36–135 s, tous SUCCESS. Durée réelle d'un build complet : ~2 min.
- **Artifacts `quran-amp-android`** : 3 exemplaires valides (expiration 2026-11-14), chacun contient `app-debug.apk` (installable, signé debug — aucune clé ni mot de passe requis) et `app-release.aab` (non signé, pour plus tard).
- **Token GitHub** : vérifié absent du dépôt et de l'historique git (aucune fuite commitée).
- **Aucun keystore `.p12` n'existe** (ni mot de passe/alias) : rien n'a été « donné » ; la clé Play Store sera générée proprement quand l'utilisateur voudra publier.
- **Warning retenu** : un workflow « allégé » proposé à l'utilisateur a été **rejeté** — il référençait `lecteur_quran.p12` (inexistant), des `secrets` non créés et Java 17 (incompatible Capacitor 7 qui exige Java 21). Ne pas réutiliser tel quel.
- L'utilisateur a **annulé** un run (déjà terminé) par prudence → aucun impact ; les builds restent verts.

### Mode opératoire pour reprendre demain
1. Télécharger l'APK : `https://github.com/ucfzem/quran-amp/actions` → run vert → Artifacts → `quran-amp-android` → dézipper → installer `app-debug.apk`.
2. Si besoin de relancer un build : onglet Actions → workflow « Build Android (APK + AAB) » → **Run workflow** (ou tout push dans `mobile/` le déclenche).
3. Prochaine étape (Play Store) : générer un keystore → stocker mot de passe/alias en **secrets GitHub** → signer l'AAB → télécharger depuis la console Play.

### Liens
| Élément | Lien |
|---|---|
| Projet web | https://ucfzem.github.io/quran-amp/ |
| Vercel | https://quran-amp.vercel.app/ |
| Cloudflare | https://quran-amp.azer-tyu199p.workers.dev/ |
| Portail (3ᵉ position) | https://ucfzem.github.io/works/ |
| Repo + Actions | https://github.com/ucfzem/quran-amp |
| Ce backup | github.md (même dépôt) |

## 10. Backup de la conversation — session finale (16 août 2026, soir)

Retranscription fidèle de l'échange entre l'utilisateur et l'assistant (début = suite de la session Android « 6quattuordecies »).

### Message utilisateur — « Qu'est-ce qu'on a fait jusqu'ici ? »
→ Rappel de l'état : build Android cassé par le plugin `@srikarthiks/capacitor-media-session` (dépendances media3 inexistantes), plan : corriger → pousser → vérifier le workflow.

### Message utilisateur — « Alors ça veut dire que tu n'as rien créé comme vrais apps ? »
→ Réponse rassurante : l'app web est réelle et en ligne (3 plateformes), le projet Android est créé et commité ; c'est le **build** du plugin lock-screen qui échouait, pas l'app. Correction en cours.

### Actions effectuées par l'assistant
1. `patch-package` installé (devDependency), `postinstall: patch-package` ajouté à `mobile/package.json`.
2. Patch du plugin : suppression des ~24 artefacts `androidx.media3:*:1.2.1` fantômes dans `android/build.gradle` (code Java n'en importe aucun).
3. Patch des bugs Java : import `CapacitorContext` obsolète retiré (`MediaSessionPlugin.java:26`) ; appel `setupNotification()` inexistant retiré (`MediaSessionService.java:88`).
4. Patch généré : `mobile/patches/@srikarthiks+capacitor-media-session+0.0.8.patch` ; validé localement par `npm ci` (le postinstall ré-applique le patch).
5. Commits : `afe7835`, `57b3edc`, `6586a6b` poussés sur `ucfzem/quran-amp` → workflows re-triggerés.
6. **Run `31962360579` → SUCCESS** (135 s) : APK debug + AAB produits, artifact `quran-amp-android` (8,1 MB).
7. URL `/api/pwa.json` → 404 : **n'a jamais existé** (création fantasmée d'une session antérieure) → supprimée des vérifications.
8. Vérif token : **absent du dépôt et de l'historique git** (aucune fuite).

### Message utilisateur — « Je m'embrouille toujours avec cette apk qui ne veut pas être créé »
→ Clarification : l'APK **existe** et s'installe sans clé ni mot de passe. Instructions simples données : Actions → run vert → Artifacts → `quran-amp-android` → dézipper → `app-debug.apk`.

### Message utilisateur — « 1 heure, c'est anormal… voici le workflow allégé (AAB seulement) »
→ Vérification : **aucun build ne durait 1 h** (36–135 s, tous SUCCESS). Le workflow proposé a été **rejeté** pour 3 erreurs bloquantes : `lecteur_quran.p12` inexistant, `secrets.KEYSTORE_PASSWORD`/`KEY_ALIAS` jamais créés, Java 17 incompatible avec Capacitor 7 (exige Java 21). Tableau objectif/clé fourni (test = APK debug prêt ; Play Store = keystore à générer plus tard).

### Message utilisateur — « Je l'ai déjà cancelled »
→ Contrôle : aucun run annulé endommagé ; les 5 derniers runs sont SUCCESS, artifacts intacts (expiration 2026-11-14). Rien à faire.

### Message utilisateur — « Je laisse tout ça comme il est pour aujourd'hui. Demain inchaAllah. Je retenterai »
→ Réponse : tout est prêt, rien ne tourne, rien n'est bloqué ; reprise facile (étapes du §9). Aucune modification effectuée.

### Message utilisateur — « Un backup de cette ultime conversation github.md » puis « Conversation je voulais dire »
→ Demande de backup de la conversation elle-même (pas seulement du résumé technique). Ce §10 documente l'échange ; le fichier est commité et poussé.

## 8. Étapes suivantes

- Tout futur changement : `git add -A && git commit -m "..." && git push origin main` (Vercel auto-déploie via le repo connecté).
- Cloudflare : reconstruire `worker.js` si `index.html` change puis `wrangler deploy`.
- Vérifier sur mobile/TV : défilement playlist, spectre, lecture enchaînée des versets, OK/Enter D-Pad sur webOS/Tizen, picker récitateur (Up/Down/Enter/Back dans les deux thèmes).
- Android : si `index.html` change → `cd mobile && npm run build:web && npx cap sync android` (l'obfuscation se régénère) ; les builds automatiques arrivent dans GitHub Actions (onglet Actions).

---

## 11. Backup — fix du titre « ويناتمب » (17 août 2026)

### Contexte
L'utilisateur a demandé de retirer le mot « ويناتمب » (transcription de « Winamp ») du titre affiché en haut du player, pour ne conserver que **مشغل القرآن الكريم**. « C'est mieux » — décision utilisateur.

### Changement appliqué
`<span id="app-title">ويناتمب - مشغل القرآن الكريم</span>` → `<span id="app-title">مشغل القرآن الكريم</span>`

Fichiers modifiés (3) :
- `index.html` (ligne 445) — app web racine
- `mobile/www/index.html` (ligne 445) — version mobile obfusquée
- `worker.js` (ligne 5, HTML inline) — version Cloudflare Workers

### Tokens fournis (jamais écrits sur disque ni commités)
- GitHub PAT `ghp_…` (clone/push)
- Vercel `vcp_…` (déploiement)
- Cloudflare `cfut_…` (wrangler deploy)

### Déploiement
- **Commit :** `4002f73` « fix: remove Winamp branding from title, keep 'مشغل القرآن الكريم' » (après `7f071b9`).
- **Cloudflare :** `wrangler deploy` (wrangler 4.123.0 installé globalement) → upload 37.35 KiB → **Version ID `8155284e-d633-413a-b109-19ff645fd419`**.
- **Vercel :** auto-déploiement via le repo connecté (push suffit).
- **GitHub Pages :** auto via push.

### Vérifications post-déploiement
Titre servi sur les 3 plateformes = **« مشغل القرآن الكريم »** (absent : « ويناتمب ») :
- `https://ucfzem.github.io/quran-amp/` ✅
- `https://quran-amp.vercel.app/` ✅
- `https://quran-amp.azer-tyu199p.workers.dev/` ✅

Note : `.wrangler/` (cache local wrangler) non commité — à ajouter au `.gitignore` si souhaité.

---

## 12. Backup — v13 « TV Gold Edition Pro » : real tweaking (17 août 2026)

L'utilisateur a fourni un `index.html` complet revu en profondeur (nouvelle UI « Pro »). Intégré, vérifié et déployé sur les 3 plateformes.

### Nouveautés v13 (fournies par l'utilisateur)
- **Thème or retravaillé** : nouveaux tokens CSS (`--accent-alt`, `--gold-gradient` 5 arrêts `#7a5c32→#d4af37→#f0d878→#d4af37→#7a5c32`, `--gold-gradient-shimmer`, `--toast-*`, `--btn-active-bg`, `--item-active-*`, `--shadow-inset`), fond radial doré, animations **shimmer** sur la barre de titre.
- **Modale paramètres** (bouton ⚙ / touche `O`) : vitesse de lecture (0.5–2x), mode répétition (off/one/all/shuffle), **couleur du visualiseur** (6 swatches), mode visualiseur (5), **taille du texte** (0.85–1.4), **auto-scroll**, raccourcis clavier documentés.
- **Nouveaux contrôles** : barre de **recherche** de sourates, bouton **mute**, boutons shuffle/repeat actifs visuellement, `⏱`/`🔊` labels des sliders.
- **Choix UI** : titre affiché **مشغل القرآن الكريم** (pas de « ويناتمب »), boutons de transport circulaires, `.btn-toggle`, touches globales `Space/T/O/M/R/S/N/P/Esc`.
- Récitateurs **inchangés (14)** — chemins identiques à v12.

### Vérifications avant déploiement
- JS extrait 41 566 octets → `node --check` OK.
- **14/14 chemins de récitateurs** `https://everyayah.com/data/<id>/001001.mp3` → **HTTP 200** (3 échecs HEAD transitoires `fetch failed` re-testés en curl → tous 200 : MaherAlMuaiqly, Abdul_Basit_Murattal, Shuraym avec espaces).

### Fichiers modifiés / régénérés
- `index.html` — nouvelle version (source).
- `worker.js` — régénéré via `node _gen-worker.js` (84 858 octets), `node --check` OK, smoke test ESM **10/10 PASS** (`/` 200, `/x` 404, titre Pro, « مشغل القرآن الكريم » présent, Winamp absent, 14 récitateurs, settings-modal, shimmer, `#f0d878`).
- `mobile/www/index.html` — régénéré par le pipeline mobile (`mobile/npm ci` → `npm run build:web`) : fonts locales, `js/native-bridge.js` injecté, `overscroll-behavior`, **JS obfusqué** (83 707 octets) ; vérifié : titre Pro, bridge, fonts locales, « مشغل القرآن الكريم », Winamp absent. `npx cap sync android` OK (3 plugins). Assets Android gitignorés (générés au build).

### Déploiement
- **Commit :** `57e11e8` « v13 Pro: real tweaking - revamped gold theme, settings modal, search bar, muted button, keyboard shortcuts » (3 fichiers, +3292/−1623).
- **Cloudflare :** `wrangler deploy` → upload 86.07 KiB / gzip 15.27 → **Version ID `c0713d85-d4d6-457a-8ca7-628984715735`**.
- **Vercel :** auto-déploiement via push (200 dès le 1er poll).
- **GitHub Pages :** le run initial « pages build and deployment » a **échoué à l'étape Deploy** (build Jekyll OK) ; re-run des jobs ratés (`rerun-failed-jobs`, `32053594460`) → **success** → v13 servie.
- **Android CI :** run `32053595711` (Build Android APK+AAB) **SUCCESS** auto-déclenché par le push (le build web mobile est inclus dans `mobile/www`).

### Vérifications post-déploiement (3 plateformes + portail)
| Plateforme | HTTP | Titre Pro | settings-modal | « ويناتمب » |
|---|---|---|---|---|
| GitHub Pages | 200 | ✓ | ✓ | absent ✓ |
| Vercel | 200 | ✓ | ✓ | absent ✓ |
| Cloudflare | 200 | ✓ | ✓ | absent ✓ |
| Portail works | 200 | — | — | — |

Quran Amp toujours 3ᵉ sur `https://ucfzem.github.io/works/`.

### Liens
| Élément | Lien |
|---|---|
| Projet (Pages) | https://ucfzem.github.io/quran-amp/ |
| Vercel | https://quran-amp.vercel.app/ |
| Cloudflare (v13 `c0713d85`) | https://quran-amp.azer-tyu199p.workers.dev/ |
| Portail (3ᵉ position) | https://ucfzem.github.io/works/ |
| Repo + Actions | https://github.com/ucfzem/quran-amp |
| Backup | github.md (même dépôt), section 12 |

## 12bis. Backup de la conversation — session v13 (17 août 2026)

Retranscription fidèle de l'échange de la session « v13 Pro » (début = suite de la session §12).

### Message utilisateur — « Real tweaking in this new update. » (+ `index.html` complet)
- L'utilisateur a fourni le `index.html` complet « TV Gold Edition Pro » : thème or revisité (shimmer, gradient 5 arrêts, fond radial), modale paramètres (vitesse, répétition, couleur visualiseur, mode visualiseur, taille de texte, auto-scroll), recherche, bouton mute, raccourcis clavier, UI tout-arabe.
- Titre de la barre : **مشغل القرآن الكريم** (cohérent avec le fix de la session endurance le matin : « ويناتمب » supprimé).

### Message utilisateur — « Once all fixes are completed, push and deploy the updates, save and back up this conversation to github md, and provide all updated links. »
→ Process complet exécuté :

1. `index.html` remplacé (nouvelle version).
2. Vérifs : JS extrait `node --check` OK ; **14/14 récitateurs HTTP 200** (3 erreurs HEAD transitoires → re-test curl : MaherAlMuaiqly, Abdul_Basit_Murattal, Shuraym avec espaces = 200).
3. `worker.js` régénéré (84 858 o) : `node --check` OK + smoke test ESM **10/10 PASS** (`/` 200, `/x` 404, titre Pro, fix barre de titre, 14 récitateurs, settings-modal, shimmer, `#f0d878`).
4. **Mobile** : `npm ci` (patch-package appliqué, 0 vulnérabilité) → `npm run build:web` (83 707 o obfusqué, fonts locales, bridge injecté) → `npx cap sync android` (3 plugins OK).
5. **Commit `57e11e8`** « v13 Pro: real tweaking - revamped gold theme, settings modal, search bar, muted button, keyboard shortcuts » → push.
6. **Cloudflare** : `wrangler deploy` → **v13 `c0713d85-d4d6-457a-8ca7-628984715735`** (86.07 KiB upload / gzip 15.27).
7. **GitHub Pages** : run initial « pages build and deployment » **FAILED à l'étape Deploy** (build Jekyll OK) → `rerun-failed-jobs` après 2 erreurs serveur GitHub (« No server is currently available ») → **SUCCESS** → v13 en ligne.
8. **Vercel** : auto-déploiement via push, 200 dès le 1er poll.
9. **Android CI** : run `32053595711` auto-déclenché → **SUCCESS**.
10. Vérifs finales : 3 plateformes 200 + titre Pro + settings-modal + « ويناتمب » absent ; portail works 200.
11. Backup §12 ajouté à `github.md`, commit `3e57ba5`, push.

### Message utilisateur — « Conversation github md backup »
→ Ce §12bis (retranscription de l'échange complet de la session v13), commité et poussé.

### Notes de fin
- Récap de l'assistant fourni : liens 3 plateformes + portail (tous 200), commits `57e11e8` / `3e57ba5`.
- Rappel sécurité réitéré : ne pas laisser les tokens (`ghp_…`, `vcp_…`, `cfut_…`) traîner dans la conversation ; ils n'ont jamais été écrits sur disque ni commités.

---

## 13. Backup — v14 : mode performance TV 1 Go + navigation télécommande renforcée (17 août 2026)

L'utilisateur a fourni des optimisations ciblées pour Smart TV 2018 (1 Go RAM) : suppression des ombres/animations/dégradés, boutons agrandis, `MediaPlayPause`/`MediaStop`/`MediaNextTrack`/`MediaPreviousTrack`/`BrowserBack`/`PageUp`/`PageDown`, focus initial sur ▶, détection auto de l'appareil. Intégré et déployé.

### Changements v14

**CSS — TV performance mode** (`[data-perf="true"]`):
- `animation: none` sur `.title-bar` et `.modal-header`, fond unie `var(--btn-active-bg)`.
- `box-shadow: none` sur `.winamp-container`, `.lcd-screen`, `.btn-winamp`, `.win-btn`.
- `backdrop-filter: none` sur `.modal-overlay`.
- Boutons `min-width/min-height: 48px`, `.btn-main` 64×64 px.
- `.ar-text` `font-size: 1.5rem`, `.playlist-window`/`.quran-text-container` `height: 140px`.
- Focus `4px solid` + `outline-offset: 4px` (très visible pour télécommande).
- `transition: none` sur `*`.
- Canvas réduit à 80×32 px.

**JS — Détection auto** :
- `autoDetectPerf()` : `navigator.deviceMemory < 2`, `navigator.hardwareConcurrency <= 2`, UA contenant `webos|tizen|netcast|smart-tv|googletv|startappbundle` → `settings.perf = true` à l'init.
- `applyPerformanceMode()` : met `data-perf="true"`/`"false"` sur `<html>`, ajuste `analyser.fftSize` (32 si perf, 64 sinon).

**JS — `initAudioContext()`** : `analyser.fftSize = settings.perf ? 32 : 64`.

**JS — `drawSpectrum()`** : throttle à 80 ms (≈12 fps) en mode perf via `_lastDraw` + `performance.now()`.

**JS — `setupTVNavigation()`** remplaçée entièrement :
- `switch(key)` au lieu de `if` chaînés.
- Touches média : `MediaPlayPause`, `MediaStop`, `MediaNextTrack`/`PageDown`, `MediaPreviousTrack`/`PageUp`.
- `Backspace`/`BrowserBack` ferme les modales (priorité à `settingsModal` > `reciterModal`).
- `Enter`/`OK`/`Select` → `active.click()` sans conditions inutiles.
- Flèches : navigation spatiale simple (haut = `reciterBtn.focus()`, bas = `searchInput.focus()`, gauche/droite = `playBtn.focus()`).
- `textContainer` : scroll 50 px (au lieu de 40).

**JS — `init()`** :
- `if (autoDetectPerf()) settings.perf = true;` + `applyPerformanceMode()` appelés en premier.
- `playBtn.focus()` à la fin (focus initial pour télécommande).

**HTML — Toggle dans الإعدادات** : « وضع الأداء الخفيف (TV) » avec `id="perf-toggle"`, bascule `settings.perf` + `applyPerformanceMode()` + toast.

### Vérifications
- JS extrait 42 645 octets → `node --check` OK.
- **14/14 récitateurs** inchangés et vérifiés.
- Smoke test ESM worker : **11/11 PASS** (`/` 200, `404`, titre Pro, `data-perf`, `perf-toggle`, `applyPerformanceMode`, `autoDetectPerf`, `_lastDraw`, `MediaPlayPause`, `playBtn.focus()`, 14 récitateurs).

### Déploiement
- **Commit :** `c2459fd` « v14: TV performance mode (auto-detect 1GB RAM), lazy playlist, throttled visualizer, Media* remote keys, play focus » (3 fichiers, +179/−122).
- **Cloudflare :** `wrangler deploy` → upload 89.26 KiB / gzip 15.99 → **Version ID `f88d7d54-501f-48a8-b9b0-c701beee205d`**.
- **Vercel :** auto-déploiement via push (200 dès le 1er poll).
- **GitHub Pages :** auto (pas de failure cette fois).
- **Mobile :** `npm run build:web` (87 249 o obfusqué) + `npx cap sync android` OK (3 plugins). Android CI déclenché automatiquement.

### Vérifications post-déploiement
| Plateforme | HTTP | perf CSS | perf-toggle | MediaPlayPause |
|---|---|---|---|---|
| GitHub Pages | 200 | ✓ | ✓ | ✓ |
| Vercel | 200 | ✓ | ✓ | ✓ |
| Cloudflare | 200 | ✓ | ✓ | ✓ |

Portail `works` 200, Quran Amp toujours 3ᵉ.

---

## §14 — Workflow GitHub Actions amélioré (Build & Release Android APK)

**Date :** 2026-08-17

### Contexte
L'utilisateur a fourni une version augmentée du workflow GitHub Actions pour les builds Android, intégrant :
- Un déclencheur sur les tags Git (`v*.*.*`)
- La création automatique de Release GitHub avec l'APK signé attaché
- Une validation semver des tags
- Un timeout de sécurité

### Modifications apportées au workflow `.github/workflows/build-android.yml`

#### Fonctionnalités présentes
| Fonctionnalité | Détail |
|---|---|
| **Triggers** | Push `main` + tags `v*.*.*` + `workflow_dispatch` |
| **Timeout** | `timeout-minutes: 30` (protection Gradle) |
| **Node.js** | v22 (compatible Capacitor 7) |
| **Java** | Zulu 21 (requis par Capacitor 7 + AGP 8.5+) |
| **Gradle cache** | `gradle/actions/setup-gradle@v3` |
| **patch-package** | Via `postinstall` dans `mobile/package.json` |
| **Build web** | `npm ci` → `npm run build:web` (obfuscation) → `npx cap sync android` |
| **Keystore** | Détecté via `secrets.ANDROID_KEYSTORE_BASE64` |
| **Release signé** | APK + AAB si keystore présent |
| **Debug fallback** | APK debug si pas de keystore |
| **Retention** | 7 jours |
| **Tag validation** | Regex semver `vX.Y.Z(-prerelease)?` avec `::error::` |
| **GitHub Release** | `softprops/action-gh-release@v2` avec release notes auto |
| **APK naming** | `quran-amp-v1.0.0.apk` (signed) ou `quran-amp-v1.0.0-debug.apk` |

#### Différences avec la version précédente
- Ajout `timeout-minutes: 30`
- Ajout validation semver des tags (early exit)
- Retention réduite de 14 → 7 jours
- AAB ajouté en upload alongside APK
- Tag validation placée après checkout (avant build)

### Workflow final
```yaml
name: Build & Release Android APK (quran-amp)

on:
  push:
    branches: [main]
    tags: ['v*.*.*']
  workflow_dispatch:

jobs:
  build-android:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    defaults:
      run:
        working-directory: ./mobile
    steps:
      - Checkout
      - Validate tag semver (regex)
      - Node.js 22 (npm cache)
      - Java Zulu 21
      - npm ci + npm run build:web
      - npx cap sync android
      - Gradle cache
      - Check keystore availability
      - Decode keystore (if present)
      - Build signed release APK (if keystore)
      - Build signed release AAB (if keystore)
      - Upload signed APK+AAB (retention 7d)
      - Build debug APK (fallback, if no keystore)
      - Upload debug APK (retention 7d)
      - Determine APK path (tag only)
      - Create GitHub Release with APK (softprops/action-gh-release@v2)
```

### Secrets requis pour release signée
| Secret | Description |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | Keystore encodé en base64 |
| `KEYSTORE_PASSWORD` | Mot de passe du keystore |
| `KEY_ALIAS` | Alias de la clé |
| `KEY_PASSWORD` | Mot de passe de la clé |

### Utilisation
```bash
# Push normal → build debug APK (artefact)
git push origin main

# Tag → build signé + GitHub Release avec APK
git tag v1.0.0
git push origin v1.0.0
```

### Commits
- `3592115` — ci: enhanced Android workflow — tag triggers, GitHub Release, signed APK fallback
- `9b5d8de` — ci: final workflow — timeout, semver validation, AAB, 7-day retention

---

## §15 — 24 récitateurs + encodeURI + worker.js fix

**Date :** 2026-08-17

### Modifications
1. **RECITERS** : liste mise à jour avec 24 récitateurs fournis par l'utilisateur (IDs vérifiés)
2. **encodeURI()** ajouté aux 3 URLs audio dans index.html
3. **worker.js** régénéré avec backtick template literal + objet `{ options }` correct pour `new Response()`
4. **mobile/www/index.html** rebuild avec obfuscation

### Récitateurs (24)
| # | ID | Nom |
|---|---|---|
| 1 | Husary_128kbps | محمود خليل الحصري |
| 2 | Husary_Mujawwad_128kbps | الحصري - مجوّد |
| 3 | Alafasy_128kbps | مشاري راشد العفاسي |
| 4 | Abdul_Basit_Murattal_192kbps | عبد الباسط - مرتل |
| 5 | Abdul_Basit_Mujawwad_128kbps | عبد الباسط - مجوّد |
| 6 | Abdurrahmaan_As-Sudais_192kbps | عبد الرحمن السديس |
| 7 | Ghamadi_40kbps | سعد الغامدي |
| 8 | MaherAlMuaiqly128kbps | ماهر المعيقلي |
| 9 | Minshawy_Murattal_128kbps | المنشاوي - مرتل |
| 10 | Minshawy_Mujawwad_128kbps | المنشاوي - مجوّد |
| 11 | Muhammad_Jibreel_128kbps | محمد جبريل |
| 12 | Nasser_Alqatami_128kbps | ناصر القطامي |
| 13 | Yasser_Ad-Dussary_128kbps | ياسر الدوسري |
| 14 | Abu_Bakr_Ash-Shaatree_128kbps | أبو بكر الشاطري |
| 15 | Saood bin Ibraaheem Ash-Shuraym_128kbps | سعود الشريم |
| 16 | Khaalid_Abdullaah_al-Qahtaanee_192kbps | خالد القحطاني |
| 17 | Abdullah-Basfar_128kbps | عبد الله بصفر |
| 18 | Abdul-Muhsin-al-Qasim_128kbps | عبد المحسن القاسم |
| 19 | Ali-al-Huthayfi_128kbps | علي الحذيفي |
| 20 | Ibrahim-Akhdar_128kbps | إبراهيم الأخضر |
| 21 | Muhammad-Ayyoub_128kbps | محمد أيوب |
| 22 | Ahmad-al-Ajmy_128kbps | أحمد العجمي |
| 23 | Fares-Abbad_128kbps | فارس عباد |
| 24 | Hani-Rifai_128kbps | هاني الرفاعي |

### worker.js fix
- **Problème** : wrangler/esbuild rejetait le worker car `new Response(html, headers:...)` n'est pas syntaxiquement valide — il manquait l'objet `{ }` around l'init
- **Solution** : backtick template literal (`\``) pour le HTML + `new Response(body, { headers: ... })`
- **Note** : les backticks et `${}` internes du HTML sont échappés avec `\`` et `\${`

### Déploiement
| Plateforme | HTTP | 24 récitateurs |
|---|---|---|
| GitHub Pages | 200 | ✅ 24 |
| Vercel | 200 | ✅ 24 |
| Cloudflare | 200 | ✅ 24 |

### Cloudflare
- **Version ID** : `c0a0b1ca-2b9a-44a6-8b3e-0c575c9f5f88`
- **Upload** : 90.48 KiB / gzip 16.21 KiB

### Commit
- `ae935e8` — feat: 24 reciters (user-verified), encodeURI audio URLs, worker.js backtick fix

---

## §16 — Multi-CDN Fallback System (everyayah → mp3quran.net)

**Date :** 2026-08-17

### Problème
8 récitateurs sur 24 retournaient 404 sur everyayah.com (IDs incorrects ou absents).

### Solution : Système fallback multi-CDN
Chaque réciteur a un champ `fb[]` contenant le slug mp3quran.net. Le player essaie everyayah d'abord, puis mp3quran.net en cas d'erreur 404.

### Réconciliations everyayah (IDs corrigés)
| ID original (404) | ID corrigé (200) |
|---|---|
| Abdullah-Basfar_128kbps | Abdullah_Basfar_192kbps |
| Muhammad-Ayyoub_128kbps | Muhammad_Ayyoub_128kbps |
| Ibrahim-Akhdar_128kbps | Ibrahim_Akhdar_32kbps |
| Fares-Abbad_128kbps | Fares_Abbad_64kbps |
| Hani-Rifai_128kbps | Hani_Rifai_192kbps |

### Fallback mp3quran.net (3 récitateurs)
| Réciteur | everyayah | mp3quran slug |
|---|---|---|
| عبد المحسن القاسم | 404 (tous slugs) | alqasim |
| علي الحذيفي | 404 (tous slugs) | hudhaify |
| أحمد العجمي | 404 (tous slugs) | ajmi |

### Architecture technique
```
RECITERS[].fb[] → mp3quran.net slug
AUDIO_SOURCES[] → [{name:"everyayah", url:fn}, {name:"mp3quran", url:fn}]
buildAudioUrls(reciter, surah, ayah) → [everyayah_url, mp3quran_url]
buildBasmalahUrls(reciter) → [everyayah_url, mp3quran_url]
playUrlChain(urls, idx) → audio.src = urls[idx]
audio error handler → playUrlChain(urls, _audioRetryIndex)
```

### Déploiement
| Plateforme | Status |
|---|---|
| GitHub Pages | ✅ 24 récitateurs |
| Vercel | ✅ AUDIO_SOURCES (5 occurrences) |
| Cloudflare | ✅ Version `2245d127-7319-4caf-a96a-38da14dd0915`, 92.27 KiB |

### Commit
- `998017d` — feat: multi-CDN fallback system (everyayah → mp3quran.net)

---

## §16bis — Fix Huthayfi + Minshawy Mujawwad

**Date :** 2026-08-17

### Problèmes
1. **علي الحذيفي (Ali Al-Huthayfi)** : 404 sur everyayah, mp3quran.net (server.mp3quran.net) down/timéout
2. **المنشاوي مجوّد (Minshawy Mujawwad)** : 404 sur everyayah avec `_128kbps`

### Solutions
| Réciteur | Avant | Après |
|---|---|---|
| علي الحذيفي | `fb: ["hudhaify"]` sur server.mp3quran (mort) | `fb: ["hthfi"]` sur **server9.mp3quran.net** (✅ 200) |
| المنشاوي مجوّد | `Minshawy_Mujawwad_128kbps` (404) | `Minshawy_Mujawwad_192kbps` (✅ 200) |

### Découverte : server9.mp3quran.net
- `https://server9.mp3quran.net/hthfi/001.mp3` → **200**
- Seul `hthfi` existe sur server9 pour les 8 slugs testés (basfar, alqasim, akhdar, ayyub, ajmi, abbad, rifai → tous 404)
- Le fallback mp3quran passe de `server.mp3quran.net` → `server9.mp3quran.net`

### Déploiement
| Plateforme | Reciters | hthfi |
|---|---|---|
| GitHub Pages | 24 | ✅ |
| Vercel | 24 | ✅ |
| Cloudflare | 24 | ✅ (Version `054862e5-af84-4a86-80c7-fcc9434a4cf4`, 92.27 KiB) |

### Commit
- `466c71e` — fix: Huthayfi via server9.mp3quran.net/hthfi, Minshawy_Mujawwad_192kbps

---

## §17 — Fallback audio robustifié : fetch HEAD probe (17 août 2026)

### Problème
Le fallback audio précédemment reposait sur l'événement `error` du `<audio>` pour passer à l'URL suivante (`playUrlChain`). Sur mobile, cet événement ne se déclenche pas de façon fiable quand un CDN renvoie un 404 → Huthayfi restait muet malgré le fallback configuré.

### Solution
Remplacement du mécanisme `error` par un **sondage `fetch HEAD`** avant lecture :

```javascript
async function playUrlChain(urls, idx) {
    const pending = urls.slice(idx);
    for (const url of pending) {
        try {
            const res = await fetch(url, { method: 'HEAD' });
            if (res.ok) {
                audio.src = url;
                audio.load();
                return;
            }
        } catch (e) {}
    }
    showToast("تعذر تحميل الصوت", 3000);
}
```

- `fetch HEAD` vérifie chaque URL dans la chaîne (everyayah → server9)
- Premier URL avec HTTP 200 → `audio.src` → lecture
- Aucun 200 → toast "تعذر تحميل الصوت"
- L'ancien handler `audio.addEventListener('error', ...)` supprimé (non fiable)

### Déploiement
| Plateforme | Huthayfi | Mécanisme |
|---|---|---|
| GitHub Pages | ✅ | fetch HEAD probe |
| Vercel | ✅ | fetch HEAD probe |
| Cloudflare | ✅ | Version `02720822-491c-44ef-9b64-c99c42cd3685` |

### Commit
- `67f55dc` — fix: robust fallback via fetch HEAD probe, remove unreliable audio error handler

---

## §18 — Fix auto-avance + chemins everyayah des récitateurs (18 août 2026)

**Contexte :** le dernier push jouait chaque verset puis s'arrêtait (il fallait recliquer Play) ; de plus, chez بعض récitateurs le texte ne suivait plus l'audio.

### Bug 1 — L'audio ne s'enchaînait plus (stop après chaque verset)
- **Cause :** `playUrlChain()` fixait `audio.src` + `audio.load()` mais **n'appelait jamais `audio.play()`** → le trait avançait de verset en verset mais la lecture s'arrêtait.
- **Fix :** paramètre `autoPlay` ajouté (`playUrlChain(urls, idx, autoPlay)`) → `audio.play().catch(() => {})` après un HEAD 200.
  - `playAyah()` devient `async` et `await playUrlChain(..., autoPlay)` (suppression de la course au moment où `audio.play()` était appelé avant le chargement du `src`).
  - Le passage Basmalah → verset 1 dans `handleAudioEnded()` passe `true`.

### Bug 2 — Récessions des chemins everyayah (4 IDs 404 → repli full-surah mp3quran)
- **Cause :** quand everyayah renvoyait 404, le fallback `server9.mp3quran.net/<fb>/<surah>.mp3` sert un fichier **sourate entière** → l'audio ne correspond plus au verset affiché (ex. الحذيفي, où le texte restait sur le verset 1 alors que toute la sourate était jouée).
- **Fix — IDs everyayah corrigés (tous tête `001001.mp3` → HTTP 200) :**

| Reciter | Avant (404) | Après (200) |
|---|---|---|
| الحصري - مجوّد | `Husary_Mujawwad_128kbps` | `Husary_128kbps_Mujawwad` |
| عبد المحسن القاسم | `Abdul-Muhsin-al-Qasim_128kbps` | `Muhsin_Al_Qasim_192kbps` |
| علي الحذيفي | `Ali-al-Huthayfi_128kbps` | `Hudhaify_128kbps` |
| أحمد العجمي | `Ahmad-al-Ajmy_128kbps` | `Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net` |

- **Vérification :** les **24 IDs** de `RECITERS` re-vérifiés HTTP 200 sur `https://everyayah.com/data/<id>/001001.mp3` (re-stream `fetch HEAD`).
- Le CDN `cdn.islamic.network/quran/audio/128/ar.hudhaify/<global>.mp3` a été testé (200) mais **non retenu** : everyayah fournit déjà des fichiers par-verset pour Al-Hudhaify une fois le dossier corrigé — pas besoin de timings/synchronisation CDN.

### Déploiement
| Plateforme | Status |
|---|---|
| GitHub Pages | ✅ auto (push `main`) |
| Vercel | ✅ auto (repo connecté) |
| Cloudflare | ✅ `wrangler deploy` (worker régénéré) |

### Commit
- `9abb02f` — fix: auto-advance to next ayah (playUrlChain now calls audio.play())
- *(commits suivants pour IDs récitateurs 404 → 200)*

---

## §19 — Timer LCD en compte à rebours `-MM:SS` (18 août 2026)

L'utilisateur a demandé de remplacer l'affichage `élapsed / restant` (`0:09 / 2:14`) par un **compte à rebours** : temps restant précédé d'un signe `-`, qui diminue pendant la lecture.

### Implémentation
- `formatTime()` simplifié : `H:MM` si `h > 0`, sinon `MM:SS` (suppression du second `:SS` en mode heures).
- Nouvelle fonction `formatCountdown(totalSeconds)` → `'-' + formatTime(...)` (valeur < 0 ou NaN → `-0:00`).
- Dans `timeupdate` (index.html + worker.js) : `lcdTime.textContent = formatCountdown(remaining)` avec `remaining = Math.max(0, duration - current)` — l'ancien `elapsedStr / remainingStr` est **supprimé**.
- HTML initial : `<div class="lcd-timer" id="lcd-time">-0:00</div>`.
- Le style doré/VT323 existant (`.lcd-timer`) est conservé inchangé.

### Unit tests `formatCountdown` : 6/6 OK
`45 → -0:45`, `8 → -0:08`, `94 → -1:34`, `8040 → -2:14`, `0 → -0:00`, `-5 → -0:00`.

### Note d'architecture
- Le lecteur lit un fichier **par verset** (pas de fichier sourate entière sur everyayah) → le compte à rebours couvre le **fichier en cours** et se réinitialise à `-0:00` à chaque changement de verset. Un compte à rebours sur la sourate entière (ex. `-2:14` pour Al-Baqarah) nécessiterait une source de durée globale, non disponible ; le format `formatTime` gère déjà les heures si un tel total est fourni.
- Une suggestion externe (`#ayahCountdown` + police Amiri + Web Worker média) a été **rejetée** : elle ne correspond pas à l'architecture (worker Cloudflare sert la page HTML, l'audio vit dans `index.html`) et casserait le style LCD doré existant.

### Déploiement
| Plateforme | Status |
|---|---|
| GitHub Pages | ✅ auto (push `main`) |
| Vercel | ✅ auto (repo connecté) |
| Cloudflare | ✅ `wrangler deploy` |

### Commit
- `4bbe9be` — feat: LCD countdown timer (-remaining) replacing elapsed/remaining display

---

## §20 — Compteur sourate entière via HEAD + Content-Length (18 août 2026)

L'utilisateur a précisé : le `-MM:SS` doit afficher le **temps restant de la sourate entière** (ex. `-1:58:30` pour Al-Baqarah), pas le fichier verset par verset. Le compteur §19 ne couvrait qu'un seul fichier MP3 ; le compteur §20 couvre toute la sourate.

### Problème identifié
- `api.quran.com/api/v4/recitations/{id}/by_chapter/{ch}` retourne `verse_key` + `url` **sans champ `duration`** (confirmé par probe et docs).
- `api.alquran.cloud/v1/surah/{n}/ar.{reciter}` retourne `audio` par verset, **sans durée**.
- Aucun fichier sourate entière n'existe sur everyayah (404) ni sur quranicaudio mirror (404) pour les 24 récitateurs ; seul `server9.mp3quran.net/hthfi/{surah}.mp3` (Hudhaify) existe (206).
- Les snippets suggérés (Audio metadata probe, fetch duration API) étaient lourds ou basés sur des champs inexistants.

### Solution : HEAD + Content-Length + bitrate CBR
Les fichiers everyayah sont **CBR** (Constant Bitrate). La durée se calcule sans télécharger le corps :

```
durée (s) = Content-Length (octets) × 8 / bitrate (bps)
```

Le bitrate est extrait du nom du réciteur : `Husary_128kbps` → `128 × 1000 = 128000 bps`.

`fetch(url, { method: 'HEAD' })` ne télécharge **aucune donnée audio** (~300 octets d'en-têtes HTTP). 286 requêtes HEAD en parallèle (10 par lot) pour Al-Baqarah ≈ 2-3 secondes. Le navigateur gère la concurrence et CORS accepte `Content-Length` comme en-tête safelisted.

### Implémentation

```javascript
function getReciterBitrate(reciterId) {
    const m = reciterId.match(/_(\d+)kbps/i);
    return m ? parseInt(m[1]) * 1000 : 128000;
}

async function fetchSurahDurations(surahNumber, reciterId) {
    // Cache key = "reciterId-surahNumber"
    // Construit toutes les URLs everyayah, fetch HEAD en lots de 10,
    // calcule durée = content-length × 8 / bitrate
    // Retourne { total, durations[] }
}
```

### Intégration (5 points de modification, 2 fichiers)

| Fichier | Modification |
|---|---|
| Globals | +3 : `durationCache`, `surahTotal`, `surahElapsed` |
| `loadSurah` | Reset `surahTotal=0`, `surahElapsed=0` ; appel async `fetchSurahDurations(...).then(r => surahTotal = r.total)` (non-bloquant) |
| `handleAudioEnded` | `surahElapsed += audio.duration` (uniquement versets, **pas basmalah**) |
| `timeupdate` | Si `surahTotal > 0` : `remaining = surahTotal - surahElapsed - currentTime` ; sinon fallback verset par verset |
| `fetchSurahDurations` | +`getReciterBitrate` (extrait du nom réciteur) |

### Notes
- **Non-bloquant** : la lecture commence immédiatement (compte à rebours verset pendant le chargement). Dès que les durées sont chargées (~2-3s), le LCD bascule sur le compteur sourate.
- **Pas basmalah** : la basmalah (Al-Fatiha v.1) n'est pas comptée dans les durées sourate — elle est séparée dans `playUrlChain(buildBasmalahUrls(...))`.
- **Fallback** : si un HEAD échoue (timeout 4s), la durée est 0 ; le total reste utilisable (somme partielle), sinon fallback verset par verset si `surahTotal == 0`.
- **Cache** : `durationCache` en mémoire ; clé = `reciterId-surahNumber`. Changement de récitur = nouveau fetch. Rechargement = instantané (cache).
- **Précision** : CBR → exact ; ID3 overhead ~0.1-2 KB → erreur < 0.1s par verset, < 2s par sourate (négligeable pour un countdown UI).

### Déploiement
| Plateforme | Status |
|---|---|
| GitHub Pages | ✅ auto (push `main`) |
| Vercel | ✅ auto (repo connecté) |
| Cloudflare | ✅ version `743e0f86-82b5-4eb2-90d2-356e96116f37` |

### Commits
- `1663cae` — feat: whole-surah countdown timer using HEAD Content-Length duration calculation

---

## §21 — Fix CORS : countdown Audio-based (18 août 2026)

### Problème identifié
Le compteur sourate entière (§20) ne s'affichait pas — toujours le fallback verset par verset. Cause : `fetch(url, { method: 'HEAD' })` vers `everyayah.com` échoue silencieusement à cause du CORS (`access-control-allow-origin: *` présent mais le navigateur bloque le HEAD pour certaines configurations). Le compteur reste bloqué à `surahTotal === 0`.

### Solution : Audio element metadata loading
Remplacement du fetch HEAD par `new Audio()` + `preload: 'metadata'` — le navigateur charge les métadonnées sans restrictions CORS.

#### 4 modifications (2 fichiers, même index.html)
1. **`fetchSurahDurations`** — remplacement complet : `fetch HEAD` → `new Audio()` + `loadedmetadata`/`error`/`setTimeout(4s)` fallback, batch 5 en parallèle, nettoyage `a.src = ''; a.remove()`
2. **`loadSurah`** — `await fetchSurahDurations(...)` (non plus fire-and-forget `.then()`), stocke `window.__surahDurations`
3. **`playAyah`** — calcule `surahElapsed` depuis `window.__surahDurations` (pas de dérive au seek)
4. **`handleAudioEnded`** — suppression de `surahElapsed += audio.duration` (redondant, risque de double-comptage)

### Validation
- JS syntaxe `node --check` ✅
- `worker.js` régénéré (91 387 octets), syntaxe OK ✅
- 24 récitateurs HEAD vérifiés HTTP 200 ✅
- Test CBR math : Al-Fatiha total = 49.2s, 002255 (Ayat al-Kursi) = 60.7s ✅

### Déploiement
- Commit + push → GitHub Pages + Vercel auto
- `wrangler deploy` → Cloudflare Workers

---

## §22 — Backup conversation + fix seconds countdown (18 août 2026)

### Contexte
L'utilisateur a signalé que le compteur sourate entière (§20/§21) n'affiche que les heures et minutes. Demande d'ajouter les secondes pour les longues sourates.

### Fix : `formatTime` — branche heures avec secondes
Avant : `if (h > 0) return \`${h}:${String(m).padStart(2, '0')}\`` → affiche `1:58` pour Al-Baqarah.
Après : `if (h > 0) return \`${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}\`` → affiche `1:58:30`.

### Résumé de la session complète (18 août 2026)

#### Fix CORS countdown (§21)
- `fetchSurahDurations` : remplacement `fetch HEAD` → `new Audio()` + `preload: 'metadata'` (CORS-safe)
- `loadSurah` : `await fetchSurahDurations(...)` (non plus fire-and-forget)
- `playAyah` : calcule `surahElapsed` depuis `window.__surahDurations` (pas de dérive)
- `handleAudioEnded` : suppression de `surahElapsed += audio.duration` (redondant)

#### Fix secondes (§22)
- `formatTime` : branche heures ajoute `:${String(s).padStart(2, '0')}` → format `H:MM:SS`

#### Tests
- 24 récitateurs HEAD HTTP 200 ✅
- CBR math vérifiée (Al-Fatiha = 49.2s, 002255 = 60.7s) ✅
- JS syntaxe `node --check` OK ✅
- 3 plateformes servent le code corrigé ✅

#### Déploiement
- **Commit §21 :** `fafff83` — fix: CORS-safe countdown timer (Audio metadata instead of fetch HEAD)
- **Commit §22 :** `bb31dcd` — feat: add seconds to countdown timer (H:MM:SS for long surahs)
- Cloudflare : version `9b3f9d1c-4f64-4491-a3cc-282cdd52c12e`
- Vercel + GitHub Pages : auto-deploy

### Liens finaux
| Élément | Lien |
|---|---|
| GitHub Pages | https://ucfzem.github.io/quran-amp/ |
| Vercel | https://quran-amp.vercel.app/ |
| Cloudflare | https://quran-amp.azer-tyu199p.workers.dev/ |
| Portail | https://ucfzem.github.io/works/ |
| Repo | https://github.com/ucfzem/quran-amp |
| MEMORY.md | https://github.com/ucfzem/quran-amp/blob/main/MEMORY.md |

---

## 23. Hardened state machine: Token Sync + Basmalah Fail-Safe + Error Guard

### Problème
Le `ended` event listener n'avait pas de garde token — un `ended` tardif après un switch de réciteur pouvait déclencher une avance d'ayah sur le mauvais récitre. La Basmalah n'avait aucun fallback : si le mp3 échouait, la lecture restait bloquée. Pas de listener `error` pour informer l'utilisateur.

### Correctifs appliqués (6 changements)

1. **`currentRequestId`** — variable ajoutée après `activePlayRequestId`, synchronisée dans `playAyah` (`currentRequestId = requestId || activePlayRequestId`) pour que les event listeners puissent vérifier contre le token actuel.

2. **`playUrlChain` retourne `true`/`false`** — au lieu de `return` implicite `undefined` au succès, retourne explicitement `true` (succès) ou `false` (échec), permettant le fail-safe Basmalah.

3. **`playAyah` : paramètre `skipBasmalah` + fail-safe** — 
   - Nouveau paramètre `skipBasmalah = false`
   - Si Basmalah (`playUrlChain` sur `buildBasmalahUrls`) échoue (retourne `false`), bypass automatique vers ayah 1 (`buildAudioUrls`)
   - Empêche la boucle infinie : le fail-safe ne se déclenche qu'une fois par requête

4. **`ended` listener : garde token + séquentiel propre** — 
   - `if (currentRequestId !== activePlayRequestId) return;` en première ligne
   - Avance explicite : `currentAyahIndex++; playAyah(currentAyahIndex, true, activePlayRequestId, true)`
   - Pas de `skipBasmalah` au sein d'une même sourate (déjà joué au premier appel)
   - `onSurahCompleted()` à la fin de la sourate

5. **`error` listener ajouté** — 
   - Garde token identique au `ended`
   - Affiche un toast informatif + met à jour le UI play/pause

6. **`loadSurah` : reset complet** — 
   - `isBasmalahPlaying = false` en début de fonction
   - `currentRequestId = reqId` pour synchroniser les listeners
   - `lcdAyahCount` avec fallback `'0 / --'` si `numberOfAyahs` non disponible
   - `lcdTime` reset à `'00:00'`

### Fonctions ajoutées
- **`setPlayPauseUI(isPlaying)`** — affiche/masque les boutons play/pause
- **`onSurahCompleted()`** — gère repeat one/all/shuffle après la dernière ayah

#### Tests
- JS syntaxe `node --check` OK ✅
- Tous les `playAyah` appels dans les listeners passent `activePlayRequestId` explicitement ✅
- `onSurahCompleted` reprend le logic repeatMode depuis l'ancien `ended` listener ✅

#### Déploiement
- **Commit §23 :** `5f61acf` — feat: hardened state machine — token sync, Basmalah fail-safe, error guard, onSurahCompleted
- **Commit §22 :** `bb31dcd` — feat: add seconds to countdown timer (H:MM:SS for long surahs)
- Cloudflare : version `6a29522a-04f2-4491-8d2e-f4874c19a9fa`
- Vercel + GitHub Pages : auto-deploy on push

---

## 24. Backup — fix des marqueurs d'Ayah (`\uFDD5`/`\uFDD6`) manquants (19 août 2026)

### Contexte
L'utilisateur a signalé que les caractères spéciaux de fin de verset **`\uFDD5` et `\uFDD6`** (ligatures arabes) utilisés dans `playAyah()` ne se rendaient pas correctement sur les polices système et s'affichaient comme des **carrés de glyphe manquant** (`[ ]`) sur toutes les plateformes.

### Correctif appliqué
Remplacé les caractères `\uFDD5`/`\uFDD6` par les **parenthèses angulaires coraniques standard** `﴿`/`﴾` (U+FDD2/U+FDD3), identiques à celles déjà utilisées dans `worker.js` :

```javascript
const surahNum = surahs[currentSurahIndex].number;
const ayahAr = currentAyahsAr[index];
arTextEl.innerHTML = ayahAr.text + ' <span class="ayah-marker">﴿' + ayahAr.numberInSurah + '﴾</span>';
textContainer.scrollTop = 0;
lcdAyahCount.textContent = '\u0622\u064A\u0629 ' + ayahAr.numberInSurah + ' / ' + currentAyahsAr.length;
seekBar.value = 0;
```

- **Seul `index.html` à la racine** contenait le bug (`ligne 1923`) ; `worker.js` utilisait déjà les bons caractères.
- `worker.js` **régénéré** depuis le `index.html` corrigé (parser avec échappement `\\` + backtick) — servi **byte-identical** à `index.html` (vérifié).
- **Mobile** : `mobile/www/index.html` reconstruit (`npm run build:web` → obfuscation) — marqueur `ayah-marker">﴿` vérifié présent dans les strings décodées de la string array base64.

### Déploiement
- **Commit :** `aa4585d` — fix: replace unsupported FDD5/FDD6 ayah markers with ﴿﴾ for cross-platform rendering
- **Commit :** `16f04b1` — chore: regenerate worker.js from fixed index.html (ayah marker fix)
- **Commit :** (mobile regen + backup) — rebuilt mobile www + github.md backup
- **Cloudflare :** `wrangler deploy` (wrangler 4.124.0) → **Version ID `f1997bcd-9722-4115-bc42-2b3a4a04347e`** (upload 89.20 KiB)
- **Vercel :** auto-déploiement via le repo connecté (push suffit) + déploiement explicite via `npx vercel` (token)
- **GitHub Pages :** auto via push
- **Android CI :** re-triggeré par le push dans `mobile/` (build web + APK/AAB régénérés depuis la source corrigée)

### Vérifications post-déploiement
Marqueur `﴿`/`﴾` présent et `FDD5` absent sur les 3 plateformes (HTTP 200) :
- `https://ucfzem.github.io/quran-amp/` ✅
- `https://quran-amp.vercel.app/` ✅
- `https://quran-amp.azer-tyu199p.workers.dev/` ✅ (version `f1997bcd`)
- Imprimé `byte-identical` de `worker.js` vs `index.html` : **true** ✅
- Mobile obfusqué : string base64 décodées → `ayah-marker">﴿` présent ✅

### Tokens (jamais écrits sur disque ni commités, utilisés uniquement en session)
- GitHub PAT `ghp_…` (clone/push)
- Vercel `vcp_…` (déploiement)
- Cloudflare `cfut_…` (wrangler deploy)

> ⚠️ **Sécurité :** l'utilisateur a partagé ses tokens dans la session. Il est **recommandé de les révoquer** puis d'en générer de nouveaux à usage restreint si besoin.

## Liens mis à jour (19 août 2026)

| Élément | Lien |
|---|---|
| Projet Quran Amp (GitHub Pages) | https://ucfzem.github.io/quran-amp/ |
| Projet Quran Amp (Vercel) | https://quran-amp.vercel.app/ |
| Projet Quran Amp (Cloudflare) | https://quran-amp.azer-tyu199p.workers.dev/ |
| Portail Works (3ᵉ position) | https://ucfzem.github.io/works/ |
| Repo quran-amp | https://github.com/ucfzem/quran-amp |
| Release Android (APK debug) | https://github.com/ucfzem/quran-amp/actions |
