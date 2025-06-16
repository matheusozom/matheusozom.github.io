// ajusta a unidade vh no mobile
function setVH(){
  document.documentElement.style.setProperty(
    '--vh', window.innerHeight * 0.01 + 'px'
  );
}
window.addEventListener('resize', setVH);
setVH();

// gera balões
function launchBalloons(n=30){
  const C = document.getElementById('balloons');
  for(let i=0;i<n;i++){
    const b = document.createElement('div');
    b.className='balloon';
    const size = 50 + Math.random()*50;
    b.style.width = size+'px';
    b.style.height= size+'px';
    b.style.left  = Math.random()*100+'%';
    b.style.animationDuration = (4+Math.random()*4)+'s';
    C.appendChild(b);
    b.addEventListener('animationend', ()=>b.remove());
  }
}

// clique no envelope
document.getElementById('capa').onclick = async function(){
  document.getElementById('bg-music').play().catch(()=>{});
  launchBalloons(30);

  try{
    await document.documentElement.requestFullscreen();
    await screen.orientation.lock('landscape-primary');
  }catch{}

  document.querySelector('.swiper').classList.add('active');
  this.classList.add('hidden');

  if(!window._swiper){
    window._swiper = new Swiper('.swiper', {
      navigation:{ nextEl:'.swiper-button-next', prevEl:'.swiper-button-prev' },
      keyboard:{ enabled:true },
      allowTouchMove:true
    });
    window._swiper.on('slideChange', ()=>{
      window._swiper.allowTouchMove = window._swiper.activeIndex!==3;
    });
  }
};

// botão de presentes
document.getElementById('go-gifts').onclick = ()=> {
  if(window._swiper) window._swiper.slideNext();
};
