# memories-site

Website statis (HTML/CSS/JS murni, tanpa build step) — siap deploy ke Vercel.

## Struktur
```
index.html
style.css
script.js
assets/photos/photo1.jpg ... photo10.jpg   <-- GANTI dengan fotomu
assets/song/song.mp3                       <-- GANTI dengan lagumu (58 detik, akan loop otomatis)
```

## Cara pakai
1. Ganti 10 file di `assets/photos/` (photo1.jpg s/d photo10.jpg) dengan foto aslimu. Nama file & jumlah harus tetap sama, atau edit daftar `PHOTOS` di `script.js`.
2. Ganti `assets/song/song.mp3` dengan lagu aslimu (nama file harus tetap `song.mp3`). Lagu otomatis diputar dan loop setelah loading screen selesai.
3. Push ke GitHub repo baru.
4. Import repo itu ke Vercel (Framework Preset: **Other** / static) → Deploy.

Catatan: sebagian browser (terutama di HP) memblokir audio otomatis sebelum ada interaksi user. Kalau lagu tidak langsung bunyi, script sudah menangani ini — lagu akan mulai otomatis begitu user tap/klik pertama kali di layar.

Tidak ada dependency, tidak perlu `npm install`, tidak perlu `vercel.json`.
