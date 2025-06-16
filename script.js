// Ajusta a unidade vh para dispositivos móveis
function setVH() {
  document.documentElement.style.setProperty(
    '--vh', window.innerHeight * 0.01 + 'px'
  );
}
window.addEventListener('resize', setVH);
setVH();

// Gera os balões para a animação
function launchBalloons(n = 30) {
  const C = document.getElementById('balloons');
  for (let i = 0; i < n; i++) {
    const b = document.createElement('div');
    b.className = 'balloon';
    const size = 50 + Math.random() * 50;
    b.style.width = size + 'px';
    b.style.height = size + 'px';
    b.style.left = Math.random() * 100 + '%';
    b.style.animationDuration = (4 + Math.random() * 4) + 's';
    C.appendChild(b);
    b.addEventListener('animationend', () => b.remove());
  }
}

// Ao clicar no envelope, dispara a animação, solicita fullscreen e remove o envelope
document.getElementById('capa').onclick = async function() {
  const audio = document.getElementById('bg-music');
  audio.currentTime = 0;
  audio.play().catch(() => {});
  launchBalloons(30);

  try {
    await document.documentElement.requestFullscreen();
    await screen.orientation.lock('landscape-primary');
  } catch (err) {
    console.log("Bloqueio de orientação não suportado:", err);
  }

  // Ativa o slider e remove o envelope permanentemente
  document.querySelector('.swiper').classList.add('active');
  this.remove();

  if (!window._swiper) {
    window._swiper = new Swiper('.swiper', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      keyboard: {
        enabled: true
      },
      allowTouchMove: true
    });
    window._swiper.on('slideChange', () => {
      window._swiper.allowTouchMove = window._swiper.activeIndex !== 3;
    });
  }
};

// Botão de "presentes"
document.getElementById('go-gifts').onclick = () => {
  if (window._swiper) window._swiper.slideNext();
};
