# Quran Amp — Lecteur Coran rétro (Winamp)

Lecteur de Coran façon **Winamp rétro doré** : récitation verset par verset (mp3),
texte arabe + traduction française synchronisés, spectre audio animé, liste des 114 sourates.

## Fonctionnalités

- 🎧 10 récitateurs (everyayah.com) — lecture **verset par verset**
- 📖 Texte arabe (Uthmani) + traduction française (Hamidullah) synchronisés (api.alquran.cloud)
- 🎚️ Seek, volume, écouteur précédent / suivant, lecture automatique enchaînée
- 🎨 Thème sombre / clair (bouton ☀)
- 🌍 Interface FR / AR (bouton AR), direction RTL
- 📺 Auto-scroll du texte et de la playlist
- 📈 Visualiseur de spectre (Web Audio API)

## Déploiement

GitHub Pages : `https://ucfzem.github.io/quran-amp/`

```
git init
git add -A
git commit -m "Add Winamp Quran Player (Gold Edition)"
git branch -M main
git remote add origin https://github.com/ucfzem/quran-amp.git
git push -u origin main
```

Sources audio : [EveryAyah](https://everyayah.com) · Texte : [api.alquran.cloud](https://alquran.cloud/api)
