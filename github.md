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

## 6. Liens (validation)

| Élément | Lien |
|---|---|
| Projet Quran Amp | https://ucfzem.github.io/quran-amp/ |
| Portail Works (3ᵉ position) | https://ucfzem.github.io/works/ |
| Repo quran-amp | https://github.com/ucfzem/quran-amp |
| Source du portail | https://github.com/ucfzem/ucfzem.github.io/blob/main/works/index.html |
| Ce backup | github.md + `backups/` du portail |

## 7. Étapes suivantes

- Tout futur changement : `git add -A && git commit -m "..." && git push origin main`.
- Vérifier sur mobile/TV : défilement playlist, spectre, lecture enchaînée des versets.
