# Quran Audio Player - Technical Architecture

## Audio Duration & Countdown System
* **Engine**: HEAD Requests + CBR (Constant Bitrate) Math.
* **Why**: Avoids downloading multi-megabyte MP3 files and eliminates reliance on third-party full-Surah APIs.
* **Calculation**: `Duration = Content-Length (bytes) / (Bitrate (bits/sec) / 8)`
* **Bitrate Detection**: Extracted dynamically from reciter ID strings (e.g., `_128kbps` -> 128,000 bps; defaults to 128,000 bps).

## Key State Properties
* `window.__surahTotal`: Total precomputed duration of the current Surah.
* `window.__surahDurations`: Array containing each Ayah's calculated duration.
* `window.__ayahBases`: Cumulative start-time offsets array for zero-drift countdown tracking.
* `window.__surahElapsedBase`: Timing offset base for the currently playing Ayah.

## Performance Guarantees
* Batch size for parallel HEAD requests: `10`
* Memory safety: No dynamic `<audio>` DOM elements created or leaked during duration fetching.