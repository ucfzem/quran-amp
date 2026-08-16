(function () {
  'use strict';

  function isNative() {
    return typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();
  }

  var TTL = 30 * 24 * 60 * 60 * 1000;
  var KEY = 'qa_fetch_';

  (function patchFetch() {
    var origFetch = window.fetch ? window.fetch.bind(window) : null;
    if (!origFetch) return;
    window.fetch = function (input, init) {
      var url = '';
      if (typeof input === 'string') url = input;
      else if (input && input.url) url = input.url;
      var isGet = !init || !init.method || init.method === 'GET' || init.method === 'get';
      if (isGet && url.indexOf('api.alquran.cloud') !== -1) {
        try {
          var raw = localStorage.getItem(KEY + url);
          if (raw) {
            var rec = JSON.parse(raw);
            if (Date.now() - rec.t < TTL) {
              return Promise.resolve(new Response(rec.body, {
                status: 200,
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
              }));
            }
            localStorage.removeItem(KEY + url);
          }
        } catch (e) {}
        return origFetch(input, init).then(function (res) {
          if (res && res.ok) {
            res.clone().text().then(function (body) {
              try { localStorage.setItem(KEY + url, JSON.stringify({ t: Date.now(), body: body })); } catch (e) {}
            });
          }
          return res;
        });
      }
      return origFetch(input, init);
    };
  })();

  if (!isNative()) return;

  var App = window.Capacitor.Plugins && window.Capacitor.Plugins.App;
  var MediaSession = window.Capacitor.Plugins && window.Capacitor.Plugins.MediaSession;

  function closeOpenModal() {
    var overlays = document.querySelectorAll('.modal-overlay.open');
    if (overlays.length) {
      overlays[0].classList.remove('open');
      return true;
    }
    return false;
  }

  if (App && App.addListener) {
    App.addListener('backButton', function () {
      if (closeOpenModal()) return;
      if (App.exitApp) App.exitApp();
    });
  }

  function getAudio() { return document.getElementById('audio-player'); }
  function textOf(id) {
    var el = document.getElementById(id);
    return el ? (el.textContent || '').trim() : '';
  }

  function pushMeta() {
    if (!MediaSession || !MediaSession.setMetadata) return;
    var audio = getAudio();
    MediaSession.setMetadata({
      title: textOf('lcd-title') || 'Quran Amp',
      artist: textOf('reciter-label'),
      album: 'القرآن الكريم',
    });
    if (audio && audio.duration) {
      MediaSession.setPositionState({ duration: audio.duration, position: audio.currentTime || 0, playbackRate: 1 });
    }
  }

  function pushState() {
    if (!MediaSession || !MediaSession.setPlaybackState) return;
    var audio = getAudio();
    var state = audio && !audio.paused && !audio.ended ? 'playing' : 'paused';
    MediaSession.setPlaybackState({ playbackState: state });
    if (audio) {
      MediaSession.setPositionState({ duration: audio.duration || 0, position: audio.currentTime || 0, playbackRate: 1 });
    }
  }

  if (MediaSession) {
    try {
      ['play', 'pause', 'previoustrack', 'nexttrack', 'stop', 'seekto'].forEach(function (a) {
        if (MediaSession.setActionHandler) MediaSession.setActionHandler({ action: a });
      });
      MediaSession.addListener('play', function () {
        var a = getAudio();
        if (a && a.paused) a.play().catch(function () {});
      });
      MediaSession.addListener('pause', function () {
        var a = getAudio();
        if (a) a.pause();
      });
      MediaSession.addListener('previoustrack', function () {
        var btn = document.getElementById('btn-prev');
        if (btn) btn.click();
      });
      MediaSession.addListener('nexttrack', function () {
        var btn = document.getElementById('btn-next');
        if (btn) btn.click();
      });
      MediaSession.addListener('seekto', function (data) {
        var a = getAudio();
        if (a && data && typeof data.seekTime === 'number') a.currentTime = data.seekTime;
      });
    } catch (e) {}
  }

  function wire() {
    var audio = getAudio();
    if (!audio) return;
    ['play', 'pause', 'playing', 'waiting', 'ended', 'loadedmetadata', 'timeupdate'].forEach(function (ev) {
      audio.addEventListener(ev, function () { pushMeta(); pushState(); }, false);
    });
    pushMeta();
    pushState();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();

  try {
    var mo = new MutationObserver(function () { pushMeta(); });
    ['lcd-title', 'reciter-label'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) mo.observe(el, { childList: true, characterData: true, subtree: true });
    });
  } catch (e) {}
})();
