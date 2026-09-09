'use strict';
const copy = {
uz: {
nav:['Maqolalar','Yangiliklar','Loyihalar','Ish','Sharhlar'], contact:"Bog‘lanish", role:'PYTHON BACKEND DASTURCHI',
hero:'Men <em>Doniyor</em> — ishlab chiqarish darajasidagi veb-ilovalar quraman.',
lead:"Django, real-time tizimlar va ko‘p funksiyali Telegram botlar. Bu yerda ishlarim, yangiliklarim va yozganlarimni bo‘lishaman.",
cv:'CV yuklab olish',read:"Maqolalarni o‘qish",available:'Ish uchun ochiqman',since:'BACKEND · 2025-DAN',technologies:'TEXNOLOGIYALAR',siteLanguages:'SAYT TILLARI',
about:'Men haqimda',aboutTitle:'Python Backend dasturchi',
about1:"Salom! Men Doniyor Shirinov. Django va FastAPI yordamida veb-ilovalar, REST API va Telegram botlar yarataman. Ma’lumotlar bazasini loyihalash, toza arxitektura va qayta foydalaniladigan kod yozishga e’tibor beraman.",
about2:"Xan Decor’da backend dasturchi sifatida ishlayman. PostgreSQL bilan ma’lumotlar yaxlitligi va unumdorligini ta’minlash, Docker orqali ilovalarni joylashtirish va Linux serverlarini boshqarish bilan shug‘ullanaman.",
reviewsTitle:'Odamlar nima deydi',noReviews:"Hali sharhlar yo‘q.",reviewTitle:'Sharh qoldiring',reviewText:"Birga ishlagan bo‘lsak, fikringizni elektron pochta orqali yuboring.",reviewButton:'Sharhni email orqali yuborish',
titles:['Yozuvlar va maqolalar',"So‘nggi yangiliklar",'Tanlangan ishlar va yutuqlar','Ish tajribasi','Odamlar nima deydi'],
empty:"Bu yerda hozircha hech narsa yo‘q.",projectsEmpty:'Loyihalar tez orada.',search:"Sarlavha bo‘yicha qidirish...",noResults:'Hech narsa topilmadi.',
present:'hozirgacha',mentor:'Python mentor',education:'Ta’lim',skills:"Ko‘nikmalar",languages:'Tillar',languageText:"O‘zbek tili · Ingliz tili — B1",certificates:'Sertifikatlar',certificateName:'PDP Academy · Math Olympic',certificateDownload:'Sertifikatni yuklab olish',projects:[{name:'Khan Decor',symbol:'◈',description:'Buyurtmalar va ichki jarayonlarni boshqarishdagi qo‘lda bajariladigan ishlar ko‘p vaqt olardi. Django va REST API yordamida ma’lumotlarni markazlashtirdim, PostgreSQL bilan ishlashni tartibga soldim va Docker orqali barqaror joylashtirish jarayonini yo‘lga qo‘ydim.',stack:'Django · REST API · PostgreSQL · Docker'},{name:'Alijahon',symbol:'↗',description:'Xizmatlar haqidagi ma’lumotlarni bir joyda ko‘rsatish va mijozlar bilan aloqa qilish qulay emas edi. Tezkor, moslashuvchan sahifa tuzib, asosiy kontent va aloqa oqimini soddalashtirdim.',stack:'Python · Django · HTML · CSS'}],
work:['Python (Django / REST API) yordamida backend xizmatlarini ishlab chiqish va qo‘llab-quvvatlash.','Ichki va mijoz ilovalari uchun REST API loyihalash va yaratish.','PostgreSQL’da ma’lumotlar yaxlitligi va unumdorlikni optimallashtirish.','Docker yordamida ilovalarni joylashtirish va Linux serverlarini boshqarish.'],
mentoring:['Python’da dasturiy ta’minot yaratish va qo‘llab-quvvatlash.','Bilim va ko‘nikmalarni rivojlantirish uchun o‘quv mashg‘ulotlarini tayyorlash va o‘tkazish.'],
university:'Toshkent davlat transport universiteti',tashkent:'Toshkent',bukhara:'Buxoro',rights:'Barcha huquqlar himoyalangan.',theme:'Rejimni almashtirish',menu:'Menyu',skip:'Asosiy mazmunga o‘tish'
},
ru:{
nav:['Статьи','Новости','Проекты','Работа','Отзывы'],contact:'Связаться',role:'PYTHON BACKEND РАЗРАБОТЧИК',
hero:'Я <em>Дониёр</em> — создаю веб-приложения для реальных задач.',
lead:'Django, системы реального времени и многофункциональные Telegram-боты. Здесь я делюсь работами, новостями и статьями.',
cv:'Скачать резюме',read:'Читать статьи',available:'Открыт к предложениям',since:'BACKEND · С 2025',technologies:'ТЕХНОЛОГИЙ',siteLanguages:'ЯЗЫКИ САЙТА',
about:'Обо мне',aboutTitle:'Python Backend разработчик',
about1:'Привет! Я Дониёр Ширинов. Создаю веб-приложения, REST API и Telegram-ботов с Django и FastAPI. Уделяю внимание проектированию баз данных, чистой архитектуре и повторно используемому коду.',
about2:'Работаю backend-разработчиком в Xan Decor. Обеспечиваю целостность данных и производительность PostgreSQL, развёртываю приложения с Docker и администрирую Linux-серверы.',
reviewsTitle:'Что говорят люди',noReviews:'Отзывов пока нет.',reviewTitle:'Оставьте отзыв',reviewText:'Если мы работали вместе, отправьте ваш отзыв по электронной почте.',reviewButton:'Отправить отзыв по email',
titles:['Заметки и статьи','Последние новости','Избранные работы и достижения','Опыт работы','Что говорят люди'],
empty:'Здесь пока ничего нет.',projectsEmpty:'Проекты скоро появятся.',search:'Поиск по заголовку...',noResults:'Ничего не найдено.',
present:'настоящее время',mentor:'Наставник по Python',education:'Образование',skills:'Навыки',languages:'Языки',languageText:'Узбекский · Английский — B1',certificates:'Сертификаты',certificateName:'PDP Academy · Math Olympic',certificateDownload:'Скачать сертификат',projects:[{name:'Khan Decor',symbol:'◈',description:'Ручная обработка заказов и внутренних процессов занимала много времени. Я централизовал данные с Django и REST API, настроил работу с PostgreSQL и стабильное развёртывание через Docker.',stack:'Django · REST API · PostgreSQL · Docker'},{name:'Alijahon',symbol:'↗',description:'Информация об услугах и связь с клиентами были разрознены. Я собрал понятную адаптивную страницу и упростил основной путь пользователя.',stack:'Python · Django · HTML · CSS'}],
work:['Разработка и поддержка backend-сервисов на Python (Django / REST API).','Проектирование и реализация REST API для внутренних и клиентских приложений.','Обеспечение целостности данных и оптимизация производительности PostgreSQL.','Развёртывание приложений с Docker и администрирование Linux-серверов.'],
mentoring:['Разработка и поддержка программного обеспечения на Python.','Подготовка и проведение занятий для развития знаний и навыков.'],
university:'Ташкентский государственный транспортный университет',tashkent:'Ташкент',bukhara:'Бухара',rights:'Все права защищены.',theme:'Переключить тему',menu:'Меню',skip:'Перейти к содержимому'
},
en:{
nav:['Articles','News','Projects','Work','Reviews'],contact:'Get in touch',role:'PYTHON BACKEND DEVELOPER',
hero:'I’m <em>Doniyor</em> — I build production-ready web applications.',
lead:'Django, real-time systems, and multifunctional Telegram bots. This is where I share my work, updates, and writing.',
cv:'Download CV',read:'Read articles',available:'Open to work',since:'BACKEND · SINCE 2025',technologies:'TECHNOLOGIES',siteLanguages:'SITE LANGUAGES',
about:'About me',aboutTitle:'Python Backend Developer',
about1:'Hi! I’m Doniyor Shirinov. I build web applications, REST APIs, and Telegram bots using Django and FastAPI. I focus on database design, clean architecture, and maintainable, reusable code.',
about2:'I work as a Backend Developer at Xan Decor, ensuring data integrity and performance with PostgreSQL, deploying applications with Docker, and managing Linux servers.',
reviewsTitle:'What people say',noReviews:'No reviews yet.',reviewTitle:'Leave a review',reviewText:'If we have worked together, send your feedback by email.',reviewButton:'Send a review by email',
titles:['Writing and articles','Latest news','Selected work and achievements','Work experience','What people say'],
empty:'There is nothing here yet.',projectsEmpty:'Projects coming soon.',search:'Search by title...',noResults:'No results found.',
present:'present',mentor:'Python Mentor',education:'Education',skills:'Skills',languages:'Languages',languageText:'Uzbek · English — B1',certificates:'Certificates',certificateName:'PDP Academy · Math Olympic',certificateDownload:'Download certificate',projects:[{name:'Khan Decor',symbol:'◈',description:'Manual order and internal process handling was taking too much time. I centralized the data with Django and REST API, structured PostgreSQL workflows, and made deployment more reliable with Docker.',stack:'Django · REST API · PostgreSQL · Docker'},{name:'Alijahon',symbol:'↗',description:'Service information and customer contact were scattered. I built a clear responsive page and simplified the main user journey.',stack:'Python · Django · HTML · CSS'}],
work:['Developed and maintained backend services using Python (Django / REST API).','Designed and implemented RESTful APIs for internal and client applications.','Ensured data integrity and optimized performance with PostgreSQL.','Deployed applications using Docker and managed Linux servers.'],
mentoring:['Developed and maintained software in Python.','Created and facilitated training sessions to develop knowledge and skills.'],
university:'Tashkent State Transport University',tashkent:'Tashkent',bukhara:'Bukhara',rights:'All rights reserved.',theme:'Toggle color theme',menu:'Menu',skip:'Skip to content'
}
};
const skills = ['Python','FastAPI','PostgreSQL','Redis','Linux','CI/CD','Aiogram','Django','REST APIs','SQLAlchemy','Docker','Git','WebSocket'];
const routes = ['articles','news','projects','work','reviews'];
const symbols = ['▤','⚑','■','▣','★'];
const storage = {get(key){try{return localStorage.getItem(key)}catch{return null}},set(key,value){try{localStorage.setItem(key,value)}catch{}}};
let lang = storage.get('language');
if (!Object.hasOwn(copy,lang)) lang = 'uz';
let theme = storage.get('theme') === 'dark' ? 'dark' : 'light';
const main = document.getElementById('content');
function label(text, symbol=''){return '<div class="section-label"><span>'+symbol+'</span>'+text+'</div>'}
function tags(){return '<div class="tags">'+skills.map(s=>'<span class="tag">'+s+'</span>').join('')+'</div>'}
function review(t){return '<div class="empty">'+t.noReviews+'</div><div class="review-contact"><h3>'+t.reviewTitle+'</h3><p>'+t.reviewText+'</p><a class="button primary" href="mailto:shirinovdoniyorfx01@gmail.com?subject=Portfolio%20review">'+t.reviewButton+'</a></div>'}
function birthdayInfo(now = new Date()) {
  const age = now.getFullYear() - 2006 - (now.getMonth() === 0 && now.getDate() < 2 ? 1 : 0);
  const text = {
    uz: 'Tug‘ilgan sana: 02.01.2006 · Yosh: ' + age,
    ru: 'Дата рождения: 02.01.2006 · Возраст: ' + age,
    en: 'Date of birth: 2 January 2006 · Age: ' + age
  };
  return '<p class="mono">' + text[lang] + '</p>';
}
function home(t){return '<div class="wrap hero"><div class="hero-text"><p class="eyebrow">'+t.role+'</p><h1>'+t.hero+'</h1><p class="lead">'+t.lead+'</p><div class="hero-actions"><a class="button primary" href="/static/assets/Doniyor_Shirinov_resume%20(6).pdf" download="Doniyor_Shirinov_CV.pdf"><span aria-hidden="true">↓</span>'+t.cv+'</a><a class="button" href="#articles"><span aria-hidden="true">▤</span>'+t.read+'</a></div><div class="stats"><div class="stat"><strong><span>▣</span>2025</strong><small>'+t.since+'</small></div><div class="stat"><strong><span>⌘</span>'+skills.length+'</strong><small>'+t.technologies+'</small></div><div class="stat"><strong><span>文</span>3</strong><small>'+t.siteLanguages+' · UZ / RU / EN</small></div></div></div><div class="portrait"><img src="/static/assets/ChatGPT%20Image%20Sep%209,%202026,%2011_35_57%20AM.png" alt="Doniyor Shirinov" width="1254" height="1254" fetchpriority="high"><span class="availability">'+t.available+'</span></div></div><section class="section"><div class="wrap about-grid"><div>'+label(t.about,'♟')+'<h2>'+t.aboutTitle+'</h2></div><div class="about-copy"><p>'+t.about1+'</p>'+birthdayInfo()+'<p>'+t.about2+'</p>'+tags()+'</div></div></section><section class="section home-reviews"><div class="wrap">'+label(t.nav[4],'★')+'<h2>'+t.reviewsTitle+'</h2>'+review(t)+'</div></section>'}
function experience(title,date,city,items){return '<article class="experience"><h3>'+title+'</h3><p class="mono">'+date+' · '+city+'</p><ul>'+items.map(item=>'<li>'+item+'</li>').join('')+'</ul></article>'}
function projects(t){return '<div class="project-grid">'+t.projects.map(project=>'<article class="card project-card"><span class="project-symbol" aria-hidden="true">'+project.symbol+'</span><h2>'+project.name+'</h2><p class="project-description">'+project.description+'</p><p class="mono project-stack">'+project.stack+'</p></article>').join('')+'</div>'}
function work(t){return '<div class="timeline">'+experience('Xan Decor · Backend Developer','04/2025 — '+t.present,t.tashkent,t.work)+experience(t.mentor,'03/2025 — 07/2025',t.bukhara,t.mentoring)+'</div><section class="education"><h2>'+t.education+'</h2><div class="education-grid"><article class="card"><h3>'+t.university+'</h3><p class="mono">09/2023 — '+t.present+' · '+t.tashkent+'</p></article><article class="card"><h3>PDP Academy</h3><p class="mono">07/2024 — 07/2025 · '+t.tashkent+'</p></article></div></section><section class="education"><h2>'+t.skills+'</h2>'+tags()+'</section><div class="education-grid"><section class="card"><h3>'+t.languages+'</h3><p>'+t.languageText+'</p></section><section class="card certificate-card"><h3>'+t.certificates+'</h3><p>'+t.certificateName+'</p><a class="button primary certificate-link" href="/static/assets/img.png" download="Doniyor_Shirinov_certificate.png">↓ '+t.certificateDownload+'</a></section></div>'}
function render(){
const t=copy[lang], route=location.hash.slice(1), index=routes.indexOf(route);
document.documentElement.lang=lang;
document.title='Doniyor Shirinov — '+(index<0?'Python Backend Developer':t.nav[index]);
document.querySelector('nav').innerHTML=routes.map((r,i)=>'<a href="#'+r+'"'+(r===route?' aria-current="page"':'')+'><span class="nav-icon" aria-hidden="true">'+symbols[i]+'</span>'+t.nav[i]+'</a>').join('');
document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
document.getElementById('contactTop').textContent=t.contact;
document.getElementById('copyright').textContent='© '+new Date().getFullYear()+' Doniyor Shirinov. '+t.rights;
document.getElementById('themeToggle').setAttribute('aria-label',t.theme);
document.getElementById('menuToggle').setAttribute('aria-label',t.menu);
document.querySelector('.skip').textContent=t.skip;
if(index<0){main.innerHTML=home(t)}else{
const search=index<2?'<input class="search" type="search" aria-label="'+t.search+'" placeholder="'+t.search+'">':'';
let body=index===2?projects(t):index===3?work(t):index===4?review(t):'<div class="empty" role="status">'+t.empty+'</div>';
main.innerHTML='<section class="wrap page">'+label(t.nav[index],symbols[index])+'<div class="page-head"><h1>'+t.titles[index]+'</h1>'+search+'</div>'+body+'</section>';
const field=main.querySelector('.search');if(field)field.addEventListener('input',()=>{main.querySelector('.empty').textContent=field.value.trim()?t.noResults:t.empty});
}
document.querySelector('nav').classList.remove('open');
document.getElementById('menuToggle').setAttribute('aria-expanded','false');
}
function setTheme(){document.documentElement.dataset.theme=theme;const button=document.getElementById('themeToggle');button.textContent=theme==='dark'?'☀':'☾';button.setAttribute('aria-pressed',String(theme==='dark'))}
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{lang=button.dataset.lang;storage.set('language',lang);render()}));
document.getElementById('themeToggle').addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';storage.set('theme',theme);setTheme()});
document.getElementById('menuToggle').addEventListener('click',()=>{const open=document.querySelector('nav').classList.toggle('open');document.getElementById('menuToggle').setAttribute('aria-expanded',String(open))});
window.addEventListener('hashchange',()=>{render();window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true})});
setTheme();render();
