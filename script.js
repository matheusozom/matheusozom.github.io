// ajusta vh para mobile
function setVH(){
  document.documentElement.style.setProperty(
    '--vh',
    window.innerHeight * 0.01 + 'px'
  );
}
window.addEventListener('resize', setVH);
setVH();

// balões
function launchBalloons(n=30){
  const C = document.getElementById('balloons');
  for(let i=0;i<n;i++){
    const b = document.createElement('div');
    b.className='balloon';
    const s = 50 + Math.random()*50;
    b.style.width = s+'px';
    b.style.height= s+'px';
    b.style.left  = Math.random()*100+'%';
    b.style.animationDuration = (4+Math.random()*4)+'s';
    C.appendChild(b);
    b.addEventListener('animationend', ()=>b.remove());
  }
}

// inicializa a interação
document.getElementById('capa').onclick = async function(){
  const audio = document.getElementById('bg-music');
  audio.currentTime = 0;
  audio.play().catch(()=>{});
  launchBalloons(30);

  try {
    await document.documentElement.requestFullscreen();
    await screen.orientation.lock('landscape-primary');
  } catch {}

  document.querySelector('.swiper').classList.add('active');
  this.classList.add('hidden');

  if(!window._swiper){
    window._swiper = new Swiper('.swiper', {
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      keyboard: { enabled: true },
      allowTouchMove: true
    });
    window._swiper.on('slideChange', ()=>{
      window._swiper.allowTouchMove = window._swiper.activeIndex!==3;
    });
  }
};

document.getElementById('go-gifts').onclick = function(){
  if(window._swiper) window._swiper.slideNext();
};
