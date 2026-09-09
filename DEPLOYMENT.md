# Render deploy holati

Tayyorlangan sana: 2026-09-09

## Tayyorlangan o‘zgarishlar

- `requirements.txt` ga `gunicorn`, `whitenoise`, `dj-database-url` va `psycopg[binary]` qo‘shildi.
- `build.sh` har bir deployda `collectstatic` va `migrate` bajaradi.
- `render.yaml` bepul Render Web Service uchun build/start buyruqlarini va maxfiy environment variable’larni belgilaydi.
- `DJANGO_DEBUG=0`, `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, `DJANGO_CSRF_TRUSTED_ORIGINS`, HTTPS proxy va HSTS production sozlamalari qo‘shildi.
- Static fayllar WhiteNoise orqali `/static/` manzilidan beriladi. Portfolio rasmlari, CV va sertifikat `assets/` ichida repo bilan birga deploy qilinadi.
- `DATABASE_URL` mavjud bo‘lsa PostgreSQL, bo‘lmasa lokal SQLite ishlatiladi. Production’da `DATABASE_URL` kiritish shart.

## Muhim bepul hosting cheklovi

Render’ning bepul Web Service diski doimiy emas. Render’ning bepul Postgres bazasi ham 30 kundan keyin tugaydi va backup bermaydi. Shu sabab `render.yaml` ichiga Render Postgres servisi qo‘shilmadi: u foydalanuvchi, sharh va maqolalarni doimiy saqlash talabi uchun mos emas.

`DATABASE_URL` sifatida doimiy bepul PostgreSQL provayderidan olingan ulanish URL’ini Render paneliga kiritish kerak. Bunday provayder uchun alohida hisob va uning amaldagi bepul rejasi kerak bo‘ladi. Pullik resurs avtomatik yaratilmaydi.

Manbalar:

- https://render.com/docs/deploy-django
- https://render.com/docs/free

## GitHub va Render’da bosiladigan qadamlar

Hozirgi papkada Git repository yoki GitHub remote mavjud emas, shuningdek bu muhitda GitHub/Render akkauntiga rasmiy login sessiyasi yo‘q. Shu sabab deployni paneldagi login orqali yakunlash kerak:

1. GitHub’ga kiring va yangi private yoki public repository yarating.
2. `C:\Users\user\Desktop\portfolio-html` ichidagi fayllarni repository’ga yuklang. `.env`, `db.sqlite3`, `staticfiles/`, `.idea/` va `__pycache__/` yuklanmasin.
3. Render’ga `https://dashboard.render.com` orqali GitHub tugmasi bilan kiring.
4. **New → Web Service** ni bosing, repository’ni tanlang va **Blueprint** yoki `render.yaml` orqali yaratishni tanlang.
5. Plan sifatida **Free** ni tanlang. `render.yaml` build va start buyruqlarini avtomatik oladi.
6. Environment variables’da quyidagilarni tekshiring:

   - `DJANGO_DEBUG=0`
   - `DJANGO_SECRET_KEY` — Render’da **Generate** bilan yaratilgan maxfiy qiymat
   - `DJANGO_ALLOWED_HOSTS` — Render hostname avtomatik qo‘shiladi; kerak bo‘lsa `127.0.0.1,localhost` bilan qoldiring
   - `DJANGO_CSRF_TRUSTED_ORIGINS=https://YOUR-SERVICE-NAME.onrender.com`
   - `DATABASE_URL` — doimiy PostgreSQL provayderining SSL URL’i

7. **Create Web Service** ni bosing va build log’da `collectstatic` hamda `migrate` muvaffaqiyatli tugashini kuting.

## Mavjud SQLite ma’lumotlarini saqlash

Hozirgi lokal `db.sqlite3` ichida 1 ta user, 1 ta review va 0 ta article bor. `db.sqlite3` GitHub’ga yuborilmaydi. Tashqi PostgreSQL tayyor bo‘lgach, lokal PowerShell’da quyidagilarni bajaring:

```powershell
py manage.py dumpdata auth.user portfolio.review portfolio.article --indent 2 > portfolio-data.json
$env:DATABASE_URL="POSTGRES_URL"
py manage.py migrate
py manage.py loaddata portfolio-data.json
Remove-Item Env:DATABASE_URL
```

`portfolio-data.json` maxfiy ma’lumot (user email va password hash) bo‘lishi mumkin; uni GitHub’ga commit qilmang. Import tugagach, faylni lokal kompyuterdan o‘chirib tashlang yoki xavfsiz joyda saqlang.

Render Shell’da admin yaratish:

```bash
python manage.py createsuperuser
```

Admin manzili: `https://YOUR-SERVICE-NAME.onrender.com/admin/`.

## Rasmlar va media

Hozirgi admin modellari (`Article` va `Review`) fayl yuklash maydoniga ega emas. `assets/` ichidagi profil rasmi, `img.png` sertifikat, CV va screenshotlar GitHub repository’da saqlanadi va `collectstatic` orqali deploy qilinadi; ular restartda yo‘qolmaydi.

Kelajakda admin orqali yangi rasm yuklash kerak bo‘lsa, Render bepul web diskiga yozmang: object storage (masalan, bepul rejasi mavjud bo‘lgan alohida servis) ulash va modelga `ImageField` qo‘shish kerak bo‘ladi. Bu loyiha uchun hozircha bunday media modeli yo‘q.

## Deploydan keyingi tekshiruv

1. `https://YOUR-SERVICE-NAME.onrender.com/` bosh sahifasi 200 javob berishini tekshiring.
2. Browser DevTools Network’da `/static/assets/style.css`, `script.js`, `community.js` va profil rasmi 200 ekanini tekshiring.
3. `/admin/` da superuser bilan kiring.
4. Login, sharhlar, profil va maqolalar API’larini tekshiring.
5. `Ish → Sertifikatlar` bo‘limida `img.png` yuklanishini tekshiring.
6. Render log’da `DisallowedHost`, CSRF yoki database connection xatosi bo‘lmasin.

## Lokal production tekshiruvlari

```powershell
py -m pip install -r requirements.txt
$env:DJANGO_DEBUG="0"
$env:DJANGO_SECRET_KEY="local-long-test-secret-value-change-me"
$env:DJANGO_ALLOWED_HOSTS="localhost,127.0.0.1"
$env:DJANGO_CSRF_TRUSTED_ORIGINS="https://localhost"
$env:DATABASE_URL="postgresql://user:pass@localhost:5432/portfolio"
py manage.py check --deploy
py manage.py collectstatic --no-input
py manage.py test
node --check assets/script.js
node --check assets/community.js
```

## Hozirgi yakuniy holat

Fayllar Render deployiga tayyorlandi, lekin GitHub remote va Render akkaunt sessiyasi bo‘lmagani uchun bu muhitdan to‘g‘ridan-to‘g‘ri deploy qilinmadi. GitHub repository URL’i, doimiy PostgreSQL `DATABASE_URL` va Render hostname panel orqali kiritilgach, yuqoridagi qadamlar bilan deploy yakunlanadi. Deploy URL’i faqat Render servis yaratilgandan keyin ma’lum bo‘ladi.


## Render API: no such table

If `/api/reviews/` or `/api/articles/` returns `no such table`, database
migrations have not been applied to the running service's database.
`gunicorn.conf.py` runs `python manage.py migrate --no-input` in the master
process before any workers start. Gunicorn automatically loads this file
from the repository root, including with the existing start command:

```bash
gunicorn portfolio.wsgi:application --bind 0.0.0.0:$PORT
```

Use `bash build.sh` as the Build Command. It installs dependencies, collects
static files, and applies migrations during the build as well. A migration
failure stops startup instead of serving a site with broken database APIs.

Migrations create the schema; they do not recover lost records. Render's
local SQLite files are ephemeral. Configure a persistent PostgreSQL
`DATABASE_URL`, `DJANGO_SECRET_KEY`, and `DJANGO_DEBUG=0` for production.
Check `/api/reviews/` and `/api/articles/` after deploying: both should return
HTTP 200 with an `items` array (which may be empty).
