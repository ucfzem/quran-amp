# Quran Amp — Android (Capacitor 7)

Version Android de « Quran Amp » (lecteur coranique style Winamp). L'original web vit dans le dossier parent (`../index.html`) et n'est **jamais** modifié : ce dossier `mobile/` contient une copie traitée dans `www/`.

## Structure

```
mobile/
├── package.json            # Capacitor 7 + scripts
├── capacitor.config.json   # appId com.ucfzem.quranamp, webDir www, splash
├── www/                    # COPIE traitée (jamais votre source)
│   ├── index.html          # + bridge natif, + polices locales, + JS obfusqué
│   ├── css/fonts.css       # @font-face locaux (Amiri, VT323, Tajawal)
│   ├── fonts/*.ttf         # polices TTF téléchargées en local
│   └── js/native-bridge.js # media session + bouton retour + cache API
├── scripts/
│   ├── install-fonts.mjs   # télécharge les TTF (idempotent)
│   ├── obfuscate.mjs       # obfuscation javascript-obfuscator
│   └── build.mjs           # fonts + transform + obfuscate -> www/
└── android/                # Projet Android natif (à ouvrir dans Android Studio)
```

## Commandes (dans `mobile/`)

```bash
npm install          # déjà fait
npm run build:web    # re-télécharge les polices si besoin + transforme + obfusque -> www/
npm run release      # = build:web + npx cap sync android
npx cap open android # ouvre Android Studio sur mobile/android/
```

Flux de publication :

1. `npm run release`
2. `npx cap open android`
3. Android Studio : `Build > Generate Signed Bundle / APK > Android App Bundle`
4. Suivez l'assistant (keystore → AAB) ; le fichier `.aab` est dans `mobile/android/app/build/outputs/bundle/release/`.

## Règles natives respectées

- **SDK** : `minSdk 23`, `compileSdk 35`, `targetSdk 35` (`mobile/android/variables.gradle`) — conforme exigences Google Play 2026.
- **Permissions** : `INTERNET` seul dans le manifest de l'app. Le plugin lock-screen (`@srikarthiks/capacitor-media-session`) ajoute obligatoirement `FOREGROUND_SERVICE` + `WAKE_LOCK` (+ nous déclarons `FOREGROUND_SERVICE_MEDIA_PLAYBACK`, exigé API 34+) — nécessaires à l'audio en arrière-plan, permissions normales sans prompt.
- **hardwareAccelerated="true"**, `supportsRtl="true"`, `allowMixedContent=false`, `webContentsDebuggingEnabled=false`.
- **Pas de zoom / scroll bounce** : viewport `user-scalable=no` déjà dans la source + `overscroll-behavior:none` injecté.
- **Polices locales** : Amiri (339 glyphes arabes), Tajawal, VT323 — plus aucune dépendance à fonts.googleapis.com.
- **Cache API** : `native-bridge.js` met en cache `api.alquran.cloud` dans `localStorage` (30 jours) via `window.fetch` patché.
- **Bouton retour** : ferme les modales, sinon quitte l'app (`@capacitor/app`).
- **Contenu** : aucun verset/récitateur/lien audio modifié — copie fidèle de `../index.html`.
- **Obfuscation** : `javascript-obfuscator` (stringArray base64, hex identifiers) appliquée au JS inline ; vérifiée par `node --check` dans le build.

## 🛡️ Politique de confidentialité (à publier, ex. `https://votredomaine.com/privacy.html` ou lien GitHub)

> **Quran Amp — Politique de confidentialité**
>
> Dernière mise à jour : 16 août 2026.
>
> Quran Amp ne collecte, ne stocke ni ne transmet aucune donnée personnelle. L'application fonctionne entièrement hors ligne pour son interface : aucun compte, aucune inscription, aucune analyse, aucune publicité, aucun suivi (tracking).
>
> Données échangées (nécessaires au fonctionnement) :
> - **Textes coraniques** : l'application charge la liste des sourates et les textes (`api.alquran.cloud`) pour afficher les versets.
> - **Audios** : les récitations sont lues en streaming depuis `everyayah.com`.
> - Ces requêtes sont effectuées directement par l'application ; aucune donnée personnelle n'y est attachée.
> - L'application conserve en cache local (sur votre appareil) certaines réponses API afin de réduire la consommation réseau. Ces données ne quittent jamais votre appareil.
>
> Aucun droit n'est cédé à des tiers. Pour toute question : vous pouvez ouvrir une issue sur le dépôt GitHub du projet.

## ✅ Réponses exactes pour le formulaire « Data Safety » de Google Play

| Question | Réponse |
|---|---|
| L'app collecte-t-elle des données ? | **Non** |
| Les données sont-elles partagées ? | **Non** |
| Chiffrement en transit | N/A (aucune collecte) |
| Possibilité de demander la suppression | N/A (aucune donnée stockée par nous) |
| **Types de données** | **Aucune** — ne pas cocher de catégorie |
| **Data types collected** | Aucune sélection |

> ⚠️ Même si l'app est « 100% non-collecte », Google Play vous demandera parfois de confirmer les données *non collectées*. Répondez simplement **Non** à chaque catégorie de collecte.

## Checklist avant soumission Play

- [ ] `npm run release` puis ouvrir `mobile/android/` dans Android Studio
- [ ] Générer le **AAB signé** (Build > Generate Signed Bundle) avec votre keystore
- [ ] Icône : les icônes par défaut Capacitor sont utilisables, mais remplacez-les par une icône propre (512×512) dans `android/app/src/main/res/mipmap-*/` avant publication
- [ ] Remplacer le lien de la politique de confidentialité ci-dessus par votre URL réelle
- [ ] Formulaire Data Safety : répondre **Non** partout (cf. tableau)
