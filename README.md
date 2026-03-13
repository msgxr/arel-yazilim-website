# Arel Yazılım Kulübü Web Portalı

> **Next.js 15 + TypeScript + Tailwind CSS + pnpm Monorepo**

## Yapı

```
website/
├── apps/web/          ← Next.js 15 public site
├── server/            ← Express.js backend (Railway)
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.base.json
```

## Hızlı Başlangıç

```bash
# 1. Bağımlılıkları kur
pnpm install

# 2. Web uygulamasını çalıştır
pnpm --filter @arel/web dev
```

## Komutlar

| Komut | Açıklama |
|-------|----------|
| `pnpm --filter @arel/web dev` | Next.js dev server (localhost:3000) |
| `pnpm --filter @arel/web build` | Production build |
| `pnpm --filter @arel/web lint` | ESLint |
| `pnpm --filter @arel/web type-check` | TypeScript check |
| `cd server && npm run dev` | Express backend |

## Ortam Değişkenleri

`apps/web/.env.local` dosyası oluşturun:

```env
BACKEND_API_URL=http://localhost:5000   # Express backend URL'i
```

## Teknoloji Yığını

- **Framework:** Next.js 15 App Router
- **Dil:** TypeScript (strict mode)
- **Stil:** Tailwind CSS 3 + CSS Variables
- **Paket Yöneticisi:** pnpm + Turborepo
- **Backend:** Express.js + SQLite (Railway'de)
- **Deploy:** Vercel (frontend) + Railway (backend)
