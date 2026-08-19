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

Catatan penting soal sound: iOS Safari & kebanyakan browser HP punya kebijakan sistem yang MELARANG audio berbunyi otomatis sebelum ada interaksi apapun dari user (ini bukan bug kode, tapi aturan dari Apple/Google demi baterai & UX — tidak bisa di-bypass lewat kode apapun). Yang website ini lakukan:
- Lagu langsung mulai diputar dalam kondisi muted begitu halaman terbuka (supaya "jalan" dari awal, tanpa delay).
- Begitu ada gerakan apapun dari user — scroll, sentuh layar, atau klik sekali saja (termasuk yang tidak disengaja saat scroll pertama) — otomatis unmute dan lagu langsung terdengar tanpa perlu tap khusus ke tombol apapun.

Jadi secara teknis nggak ada tombol "tap to play", tapi kalau user belum menyentuh layar sama sekali (benar-benar diam), sound memang belum akan bunyi — ini batas dari sistem browser, bukan dari website-nya.

Tidak ada dependency, tidak perlu `npm install`, tidak perlu `vercel.json`.
