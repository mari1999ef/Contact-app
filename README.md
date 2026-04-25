# Contacts App

این پروژه شامل موارد زیر است:

- Next.js (App Router)
- احراز هویت ساده با اعتبار ثابت
- داشبورد مخاطبین با جستجو و صفحه‌بندی
- Tailwind CSS برای رابط کاربری
- TypeScript
- json-server برای شبیه‌سازی API

## Tech Stack

- Node.js `20+`
- Next.js `16.2.4`
- React `19.2.4`
- TypeScript `5.x`
- Tailwind CSS `4.x`
- json-server `0.17.4`

## Run Locally

ابتدا وابستگی‌ها را نصب کنید:

```bash
npm install
```

برای اجرای کامل در حالت توسعه، دو ترمینال باز کنید:

ترمینال اول (json-server):

```bash
npm run db
```

ترمینال دوم (Next.js):

```bash
npm run dev
```

اپ روی `http://localhost:3000` در دسترس است.

## Build & Start

```bash
npm run build
npm start
```

## Demo Credentials

- Email: `admin@example.com`
- Password: `123456`

## Implementation Notes

- داده مخاطبین در `db/db.json` قرار دارد.
- صفحه `dashboard/contacts` داده را بر اساس `page` و `search` نمایش می‌دهد.
- جستجو روی نام و ایمیل انجام می‌شود.
- صفحه‌بندی سمت سرور انجام می‌شود.
- در نبود json-server، منطق خواندن داده به صورت fallback از فایل `db/db.json` انجام می‌شود.
- API داخلی پروژه:
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/contacts`

## Project Structure (Key Paths)

- `src/app/(auth)/login`
- `src/app/dashboard/contacts`
- `src/app/api/auth`
- `src/app/api/contacts`
- `src/components/ui`
- `src/libs/contacts.ts`
- `db/db.json`
