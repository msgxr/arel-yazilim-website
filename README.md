# Arel Yazılım Kulübü Web Portalı

> **Next.js 15 + TypeScript + Tailwind CSS + Formspree + GitHub Pages**

Bu proje, İstanbul Arel Üniversitesi Yazılım Kulübü'nün (AYK) resmî web portalıdır. "Staff Engineer" standartlarında, performans ve erişilebilirlik odaklı olarak modernize edilmiştir.

## 🏗️ Proje Yapısı

```
website/
├── apps/web/          ← Next.js 15 Web Uygulaması (App Router)
├── server/            ← Express.js backend (İsteğe bağlı/Arşiv)
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.base.json
```

## 🚀 Öne Çıkan Özellikler

- **Modern Mimari:** Next.js 15 + React 19 ile en güncel teknoloji yığını.
- **Sağlam Form Altyapısı:** Formspree entegrasyonu ile sunucusuz (serverless) çalışan, güvenli iletişim ve üyelik formları.
- **Premium Tasarım:** Glassmorphism, modern tipografi ve dinamik mikro-animasyonlar.
- **Gelişmiş Form Deneyimi:** 3 adımlı (multi-step) profesyonel üyelik başvurusu.
- **Performans:** Statik export (SSG) ile ışık hızında yükleme süreleri.
- **Otomasyon:** GitHub Actions üzerinden her push sonrası otomatik canlıya alım (Deploy).

## 🛠️ Hızlı Başlangıç

```bash
# 1. Bağımlılıkları kur
pnpm install

# 2. Geliştirme sunucusunu başlat
pnpm --filter @arel/web dev
```

## ⚙️ Ortam Değişkenleri (.env)

`apps/web/.env.local` dosyasında şu değişkenlerin tanımlı olması gerekir:

```env
NEXT_PUBLIC_FORMSPREE_CONTACT_ID=mbdqzlvl
NEXT_PUBLIC_FORMSPREE_MEMBERSHIP_ID=mlgapdyw
```

## 🏗️ Canlıya Alım (Deployment)

Proje **GitHub Pages** üzerinde host edilmektedir. `main` branche yapılan pushlar sonrası GitHub Actions otomatik olarak derleme yapıp yayına alır.

---

**© 2025 Arel Yazılım Kulübü** · *Arel Tech Ecosystem tarafından sevgiyle geliştirildi.*
