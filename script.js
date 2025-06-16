document.getElementById('capa').onclick = async function() {
  const audio = document.getElementById('bg-music');
  audio.play();

  try {
    await document.documentElement.requestFullscreen();
    await screen.orientation.lock("landscape-primary");
  } catch (err) {
    console.log("O bloqueio de orientação não é suportado neste navegador.");
  }

  document.querySelector('.swiper').classList.add("active");
  this.classList.add("hidden");
};
