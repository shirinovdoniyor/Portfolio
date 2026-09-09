# Doniyor Shirinov portfolio

HTML/CSS/JavaScript interfeys, Django backend va SQLite ma’lumotlar bazasi.

## Ishga tushirish
```powershell
py -m pip install -r requirements.txt
py manage.py migrate
py manage.py runserver
```
Brauzer: http://127.0.0.1:8000
Profil va sharhlar ishlashi uchun saytni shu manzildan oching. index.html faylini bevosita ochish backendni ishga tushirmaydi.

## Maqola qo‘shish
```powershell
py manage.py createsuperuser
```
http://127.0.0.1:8000/admin/ sahifasiga o‘zingiz yaratgan admin hisob bilan kiring.
Articles → Add orqali sarlavha, til va oddiy matn kiriting. Published belgisi bilan e’lon qiling.
UZ/RU/EN maqolalar alohida yozuvlar sifatida kiritiladi. Oddiy tashrifchilar maqola qo‘sha olmaydi.
Reviews bo‘limida sharhlarni yashirish (Visible belgisini olib tashlash) yoki o‘chirish mumkin.

## Profil va sharhlar
Foydalanuvchi nomi, ism, email va parol bilan ro‘yxatdan o‘tiladi. Kirish foydalanuvchi nomi va parol orqali.
Email manzili tasdiqlanmaydi; email orqali parol tiklash hali ulanmagan.
Har bir hisob bitta sharh qoldiradi. Sharh darhol umumiy ro‘yxatda ko‘rinadi.
Ism, manzil, baho va sharh ochiq; email ommaga berilmaydi.
Profilni va parolni o‘zgartirish mumkin. Parollar Django orqali xeshlanadi.

## Loyihalar
Khan Decor: backend. Alijahon: sayt yaratish.
Texnologiya teglari foydalanuvchi so‘roviga binoan rezyumedagi mos ko‘nikmalardan tanlangan.
Loyiha URL manzillari taqdim etilmagani uchun taxminiy havolalar qo‘yilmadi.

## Tekshirish
```powershell
py manage.py check
py manage.py test
node --check assets/script.js
node --check assets/community.js
```

## Internetga joylashtirish
Hozirgi sozlamalar lokal ishlab chiqish uchun. Boshqa qurilmalardan foydalanish uchun backend doimiy serverda ishlashi kerak.
Production uchun DJANGO_DEBUG=0, kuchli DJANGO_SECRET_KEY va DJANGO_ALLOWED_HOSTS sozlang.
HTTPS, WSGI server (portfolio.wsgi:application), static fayllar va bazaning doimiy saqlanishini sozlang.
`py manage.py collectstatic` fayllarni staticfiles/ ga yig‘adi; /assets/ ni staticfiles/assets/ ga, /static/ ni staticfiles/ ga ulang.
Kirish/ro‘yxatdan o‘tish so‘rovlarini server darajasida tezlik bo‘yicha cheklang va bazadan zaxira nusxa oling.
Django manbalar: https://docs.djangoproject.com/en/6.0/howto/csrf/ va https://docs.djangoproject.com/en/6.0/howto/deployment/checklist/
