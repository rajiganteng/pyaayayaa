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

Catatan penting soal sound: iOS Safari & kebanyakan browser HP punya kebijakan sistem yang MELARANG audio berbunyi otomatis sebelum ada interaksi apapun dari user (ini bukan bug kode, tapi aturan dari Apple/Google demi baterai & UX — tidak bisa di-bypass 100% lewat kode apapun, di semua website manapun). Yang website ini lakukan untuk meminimalisir itu:
- Saat halaman dibuka, script langsung coba `play()` lagu tanpa mute sama sekali. Di banyak browser (termasuk Chrome desktop/Android dengan riwayat kunjungan, atau browser yang mengizinkan autoplay), lagu akan langsung bunyi tanpa perlu apapun.
- Kalau percobaan itu diblokir, fallback ke autoplay muted (biar tetap "jalan" dari awal), lalu dengar-dengaran ke HAMPIR SEMUA jenis interaksi sekecil apapun (gerak mouse, scroll, sentuh, keydown, dsb) untuk langsung unmute — jadi begitu ada gerakan sekecil apapun di layar, lagu langsung terdengar tanpa perlu tap ke tombol khusus manapun.

Kalau tetap tidak bunyi sama sekali di suatu HP, itu murni pembatasan OS/browser di perangkat tersebut, bukan sesuatu yang bisa diperbaiki dari sisi kode website.

Tidak ada dependency, tidak perlu `npm install`, tidak perlu `vercel.json`.
