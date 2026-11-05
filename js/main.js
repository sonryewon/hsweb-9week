// 모바일 메뉴
const btn=document.querySelector('.burger'),gnb=document.querySelector('.gnb');
btn.addEventListener('click',()=>{const o=gnb.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
gnb.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{gnb.classList.remove('open');btn.setAttribute('aria-expanded',false)}));

// 히어로 슬라이더 (5초 자동, 점 클릭)
const slides=[...document.querySelectorAll('.slide')],dots=[...document.querySelectorAll('.dots button')];
let cur=0,timer;
function show(i){cur=(i+slides.length)%slides.length;slides.forEach((s,n)=>s.classList.toggle('on',n===cur));dots.forEach((d,n)=>d.classList.toggle('on',n===cur))}
function auto(){clearInterval(timer);timer=setInterval(()=>show(cur+1),5000)}
dots.forEach((d,n)=>d.addEventListener('click',()=>{show(n);auto()}));auto();

// 스크롤 등장 + 숫자 카운트
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  e.target.classList.add('in');
  e.target.querySelectorAll('[data-to]').forEach(c=>{
    const to=+c.dataset.to;let n=0;const step=Math.max(1,Math.ceil(to/60));
    const t=setInterval(()=>{n=Math.min(to,n+step);c.textContent=n;if(n>=to)clearInterval(t)},25);
  });
  io.unobserve(e.target);
}),{threshold:.25});
document.querySelectorAll('.tile,.wrap').forEach(el=>{el.classList.add('rv');io.observe(el)});

// 매장 찾기 (샘플 데이터)
const stores=[
  {n:'버거킹 강남점',a:'서울 강남구 (샘플 주소)'},
  {n:'버거킹 홍대점',a:'서울 마포구 (샘플 주소)'},
  {n:'버거킹 수원역점',a:'경기 수원시 (샘플 주소)'},
  {n:'버거킹 부산서면점',a:'부산 부산진구 (샘플 주소)'}
];
const list=document.getElementById('list'),q=document.getElementById('q');
function render(){
  const k=q.value.trim(),r=stores.filter(s=>!k||(s.n+s.a).includes(k));
  list.innerHTML=r.length?r.map(s=>`<li><b>${s.n}</b><span>${s.a}</span></li>`).join(''):'<li>검색 결과가 없습니다.</li>';
}
document.getElementById('go').addEventListener('click',render);
q.addEventListener('keydown',e=>{if(e.key==='Enter')render()});
render();
