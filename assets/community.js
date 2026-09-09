'use strict';
const communityCopy = {
uz: {
profile:'Profil',login:'Kirish',register:'Ro‘yxatdan o‘tish',logout:'Chiqish',username:'Foydalanuvchi nomi',identifier:'Email yoki foydalanuvchi nomi',name:'Ism va familiya',email:'Elektron pochta',password:'Parol',passwordHelp:'Kamida 8 belgi; oddiy yoki faqat raqamlardan iborat bo‘lmasin.',save:'Saqlash',saved:'Saqlandi.',oldPassword:'Joriy parol',newPassword:'Yangi parol',confirmPassword:'Yangi parolni takrorlang',changePassword:'Parolni o‘zgartirish',loginReview:'Sharh qoldirish uchun profilingizga kiring.',location:'Manzil (ixtiyoriy)',rating:'Baho',body:'Sharhingiz',send:'Sharhni yuborish',posted:'Sharhingiz qabul qilindi va boshqalarga ko‘rinadi.',already:'Sharhingiz yuborilgan. Rahmat!',loading:'Yuklanmoqda…',retry:'Qayta urinish',admin:'Maqolalarni boshqarish',read:'O‘qish',back:'Maqolalarga qaytish',khan:'Khan Decor saytining backend qismini ishlab chiqdim.',alijahon:'Alijahon saytini yaratdim.',tech:'Texnologiyalar',errors:{network:'Server bilan bog‘lanib bo‘lmadi. Qayta urinib ko‘ring.',invalid:'Ma’lumotlarni tekshiring.',registration:'Foydalanuvchi nomi yoki email band, yoxud parol talablarga mos emas.',credentials:'Email/username yoki parol noto‘g‘ri.',login:'Avval profilingizga kiring.',password:'Joriy parol yoki yangi parol tasdig‘i noto‘g‘ri, yoxud yangi parol juda oddiy.',duplicate:'Siz allaqachon sharh qoldirgansiz.'}
},
ru:{
profile:'Профиль',login:'Войти',register:'Регистрация',logout:'Выйти',username:'Имя пользователя',name:'Имя и фамилия',email:'Электронная почта',password:'Пароль',passwordHelp:'Не менее 8 символов; не простой и не только цифры.',save:'Сохранить',saved:'Сохранено.',oldPassword:'Текущий пароль',newPassword:'Новый пароль',confirmPassword:'Повторите новый пароль',changePassword:'Изменить пароль',loginReview:'Войдите в профиль, чтобы оставить отзыв.',location:'Местоположение (необязательно)',rating:'Оценка',body:'Ваш отзыв',send:'Отправить отзыв',posted:'Отзыв опубликован и виден другим.',already:'Ваш отзыв уже отправлен. Спасибо!',loading:'Загрузка…',retry:'Повторить',admin:'Управление статьями',read:'Читать',back:'Вернуться к статьям',khan:'Разработал серверную часть сайта Khan Decor.',alijahon:'Создал сайт Alijahon.',tech:'Технологии',errors:{network:'Не удалось связаться с сервером. Попробуйте ещё раз.',invalid:'Проверьте введённые данные.',registration:'Имя пользователя занято или пароль не соответствует требованиям.',credentials:'Неверное имя пользователя или пароль.',login:'Сначала войдите в профиль.',password:'Неверный текущий пароль, пароли не совпадают или новый пароль слишком простой.',duplicate:'Вы уже оставили отзыв.'}
},
en:{
profile:'Profile',login:'Sign in',register:'Create account',logout:'Sign out',username:'Username',name:'Full name',email:'Email',password:'Password',passwordHelp:'At least 8 characters; not a common or entirely numeric password.',save:'Save',saved:'Saved.',oldPassword:'Current password',newPassword:'New password',confirmPassword:'Confirm new password',changePassword:'Change password',loginReview:'Sign in to your profile to leave a review.',location:'Location (optional)',rating:'Rating',body:'Your review',send:'Submit review',posted:'Your review is published and visible to others.',already:'You have already submitted a review. Thank you!',loading:'Loading…',retry:'Try again',admin:'Manage articles',read:'Read',back:'Back to articles',khan:'Developed the backend of the Khan Decor website.',alijahon:'Built the Alijahon website.',tech:'Technologies',errors:{network:'Could not connect to the server. Please try again.',invalid:'Check the entered information.',registration:'The username is taken or the password does not meet the requirements.',credentials:'Incorrect username or password.',login:'Sign in first.',password:'The current password or confirmation is incorrect, or the new password is too weak.',duplicate:'You have already submitted a review.'}
}
};
let account=null, csrf='', sessionReady=false, registration=false, renderVersion=0;
const originalRender=render;
const safe=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ct=()=>communityCopy[lang];
async function api(path, data){
  try{
    const response=await fetch('/api/'+path+'/',{method:data===undefined?'GET':'POST',credentials:'same-origin',headers:data===undefined?{}:{'Content-Type':'application/json','X-CSRFToken':csrf},body:data===undefined?undefined:JSON.stringify(data)});
    const result=await response.json();
    if(!response.ok)throw new Error(result.error||'network');
    if(result.csrf)csrf=result.csrf;
    return result;
  }catch(error){throw new Error(Object.hasOwn(ct().errors,error.message)?error.message:'network')}
}
function status(form,text,error=false){const box=form.querySelector('[role="status"]');box.textContent=text;box.classList.toggle('error',error)}
function field(name,title,type='text',value='',extra=''){
  return '<label class="form-field">'+safe(title)+'<input name="'+name+'" type="'+type+'" value="'+safe(value)+'" '+extra+' required></label>';
}
function projectCards(){
return '<div class="project-grid">'+[['Khan Decor',ct().khan,['Python','Django','REST APIs','PostgreSQL','Docker','Linux']],['Alijahon',ct().alijahon,['Python','Django','PostgreSQL','Git']]].map(([name,description,stack])=>'<article class="card project-card"><span class="project-symbol" aria-hidden="true">▣</span><h2>'+name+'</h2><p>'+description+'</p><div class="tags" aria-label="'+ct().tech+'">'+stack.map(s=>'<span class="tag">'+s+'</span>').join('')+'</div></article>').join('')+'</div>';
}
review=function(){return '<div id="reviewsList" aria-live="polite"><p class="empty">'+ct().loading+'</p></div><div id="reviewFormArea"></div>'};
function profilePage(){
const t=ct();
if(!sessionReady)return '<section class="wrap page"><h1>'+t.profile+'</h1><p class="empty">'+t.loading+'</p></section>';
const content=account?'<form id="profileForm" class="account-card"><h2>'+t.profile+'</h2>'+field('name',t.name,'text',account.name,'maxlength="150" autocomplete="name"')+field('email',t.email,'email',account.email,'maxlength="254" autocomplete="email"')+'<p class="mono">'+safe(account.username)+'</p><p role="status"></p><button class="button primary">'+t.save+'</button><button type="button" id="logout" class="button">'+t.logout+'</button>'+(account.staff?'<a class="button" href="/admin/portfolio/article/">'+t.admin+'</a>':'')+'</form><form id="passwordForm" class="account-card"><h2>'+t.changePassword+'</h2>'+field('old_password',t.oldPassword,'password','','autocomplete="current-password"')+field('new_password1',t.newPassword,'password','','minlength="8" autocomplete="new-password"')+field('new_password2',t.confirmPassword,'password','','minlength="8" autocomplete="new-password"')+'<p class="mono">'+t.passwordHelp+'</p><p role="status"></p><button class="button primary">'+t.changePassword+'</button></form>':
'<form id="authForm" class="account-card"><h2>'+t.login+'</h2>'+field('identifier',t.identifier,'email','','maxlength="254" autocomplete="email"')+field('password',t.password,'password','','autocomplete="current-password"')+'<p class="mono">Emailingiz yangi bo‘lsa, hisob avtomatik yaratiladi.</p><p role="status"></p><button class="button primary">'+t.login+'</button></form>';
return '<section class="wrap page profile-page">'+label(t.profile,'♟')+content+'</section>';
}
function bindForm(id,path,done){
const form=document.getElementById(id);if(!form)return;
form.addEventListener('submit',async event=>{
event.preventDefault();const button=form.querySelector('button:not([type="button"])');button.disabled=true;status(form,ct().loading);
const values=Object.fromEntries(new FormData(form));if(path==='reviews')values.rating=Number(values.rating);if(path==='register'){values.username=values.identifier;delete values.identifier}
try{const result=await api(path,values);await done(result,form)}catch(error){status(form,ct().errors[error.message]||ct().errors.network,true)}finally{button.disabled=false}
});
}
function bindProfile(){
document.querySelectorAll('[data-register]').forEach(b=>b.addEventListener('click',()=>{registration=b.dataset.register==='true';render()}));
bindForm('authForm',registration?'register':'login',result=>{account=result.user;location.hash='reviews';render()});
bindForm('profileForm','profile',(result,form)=>{account=result.user;status(form,ct().saved)});
bindForm('passwordForm','password',(result,form)=>{form.reset();status(form,ct().saved)});
document.getElementById('logout')?.addEventListener('click',async event=>{
event.target.disabled=true;try{await api('logout',{});account=null;registration=false;render()}catch(error){status(document.getElementById('profileForm'),ct().errors[error.message],true);event.target.disabled=false}
});
}
async function loadReviews(version){
const container=document.getElementById('reviewsList');if(!container)return;
try{
const result=await api('reviews');if(version!==renderVersion)return;
container.innerHTML=result.items.length?'<div class="review-grid">'+result.items.map(r=>'<article class="card review-card"><div class="review-author"><span class="avatar">'+safe(r.name.slice(0,1).toUpperCase())+'</span><div><h3>'+safe(r.name)+'</h3><p class="mono">'+safe(r.location)+'</p></div></div><p class="stars" aria-label="'+r.rating+' / 5">'+'★'.repeat(r.rating)+'☆'.repeat(5-r.rating)+'</p><p class="review-body">'+safe(r.body)+'</p><time class="mono">'+new Date(r.date).toLocaleDateString(lang==='uz'?'uz-UZ':lang)+'</time></article>').join('')+'</div>':'<div class="empty">'+copy[lang].noReviews+'</div>';
const area=document.getElementById('reviewFormArea');
area.innerHTML=!account?'<div class="review-contact"><h3>'+copy[lang].reviewTitle+'</h3><p>'+ct().loginReview+'</p><a class="button primary" href="#profile">'+ct().login+'</a></div>':result.has_review?'<p class="empty">'+ct().already+'</p>':
'<form class="account-card" id="reviewForm"><h2>'+copy[lang].reviewTitle+'</h2><label class="form-field">'+ct().location+'<input name="location" maxlength="120" autocomplete="address-level2"></label><label class="form-field">'+ct().rating+'<select name="rating" required><option value="5">★★★★★ · 5</option><option value="4">★★★★ · 4</option><option value="3">★★★ · 3</option><option value="2">★★ · 2</option><option value="1">★ · 1</option></select></label><label class="form-field">'+ct().body+'<textarea name="body" rows="5" maxlength="2000" required></textarea></label><p role="status"></p><button class="button primary">'+ct().send+'</button></form>';
bindForm('reviewForm','reviews',()=>loadReviews(version));
}catch(error){if(version!==renderVersion)return;container.innerHTML='<div class="empty">'+ct().errors.network+' <button class="button retry">'+ct().retry+'</button></div>';container.querySelector('.retry').onclick=()=>loadReviews(version)}
}
async function loadArticles(version){
const list=document.getElementById('articleList');if(!list)return;
try{
const response=await fetch('/api/articles/?lang='+encodeURIComponent(lang),{credentials:'same-origin',cache:'no-store'});
if(!response.ok)throw Error();const data=await response.json();if(version!==renderVersion)return;
const detail=location.hash.match(/^#article-(\d+)$/);
function show(query=''){
const items=data.items.filter(a=>a.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
if(detail){const article=data.items.find(a=>String(a.id)===detail[1]);list.innerHTML=article?'<article class="article-detail"><a href="#articles" class="mono">← '+ct().back+'</a><h1>'+safe(article.title)+'</h1><time class="mono">'+new Date(article.date).toLocaleDateString(lang==='uz'?'uz-UZ':lang)+'</time><div class="article-body">'+safe(article.body)+'</div></article>':'<div class="empty">'+copy[lang].noResults+'</div>';return}
list.innerHTML=items.length?items.map(a=>'<article class="article-row"><div><a href="#article-'+a.id+'"><h2>'+safe(a.title)+'</h2></a><time class="mono">'+new Date(a.date).toLocaleDateString(lang==='uz'?'uz-UZ':lang)+'</time></div><a class="button" href="#article-'+a.id+'">'+ct().read+' ↗</a></article>').join(''):'<div class="empty">'+(query?copy[lang].noResults:copy[lang].empty)+'</div>';
}
show();const input=main.querySelector('.search');if(input)input.addEventListener('input',()=>show(input.value));
}catch(error){if(version!==renderVersion)return;list.innerHTML='<div class="empty">'+ct().errors.network+' <button class="button retry">'+ct().retry+'</button></div>';list.querySelector('.retry').onclick=()=>loadArticles(version)}
}
render=function(){
originalRender();const version=++renderVersion,route=location.hash.slice(1);
document.getElementById('contactTop').href='#profile';document.getElementById('contactTop').textContent=ct().profile;document.getElementById('contactTop').classList.add('profile-link');
if(route==='profile'){main.innerHTML=profilePage();document.title=ct().profile+' — Doniyor Shirinov';bindProfile()}
if(route==='projects')main.querySelector('.empty').outerHTML=projectCards();
if(route==='articles'||/^article-\d+$/.test(route)){
main.innerHTML='<section class="wrap page">'+label(copy[lang].nav[0],'▤')+(route==='articles'?'<div class="page-head"><h1>'+copy[lang].titles[0]+'</h1><input type="search" class="search" aria-label="'+copy[lang].search+'" placeholder="'+copy[lang].search+'"></div>':'')+'<div id="articleList"><p class="empty">'+ct().loading+'</p></div></section>';loadArticles(version)
}
if(sessionReady)loadReviews(version);
};
async function bootstrap(){
try{const result=await api('session');account=result.user;sessionReady=true;render()}
catch(error){sessionReady=false;render();if(location.hash==='#profile'){main.innerHTML='<section class="wrap page"><h1>'+ct().profile+'</h1><div class="empty">'+ct().errors.network+' <button class="button" id="retrySession">'+ct().retry+'</button></div></section>';document.getElementById('retrySession').onclick=bootstrap}else{const area=document.getElementById('reviewsList');if(area)area.innerHTML='<div class="empty">'+ct().errors.network+' <button class="button" id="retrySession">'+ct().retry+'</button></div>';document.getElementById('retrySession')?.addEventListener('click',bootstrap)}}
}
render();bootstrap();

// Refresh articles when returning from the admin tab.
window.addEventListener('focus', () => {
  if (location.hash === '#articles' || /^#article-\d+$/.test(location.hash)) render();
});
