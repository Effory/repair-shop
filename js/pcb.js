const svg = document.querySelector('.pcb-svg');
const block = document.querySelector('.hero-block');
const NS = "http://www.w3.org/2000/svg";

const W = () => svg.clientWidth;
const H = () => svg.clientHeight;

let activeLines = 0;
const MAX_LINES = 2;

/* cria via temporária */
function createVia(x, y) {
  const c = document.createElementNS(NS, 'circle');
  c.setAttribute('cx', x);
  c.setAttribute('cy', y);
  c.setAttribute('r', 5);
  svg.appendChild(c);

  setTimeout(() => {
    c.style.transition = "opacity .6s";
    c.style.opacity = 0;
    setTimeout(() => c.remove(), 600);
  }, 900);
}

/* calcula Y evitando o texto */
function safeY() {
  const top = block.offsetTop;
  const bottom = top + block.offsetHeight;

  let y;
  do {
    y = 60 + Math.random() * (H() - 120);
  } while (y > top && y < bottom);

  return y;
}

/* cria trilha */
function createTrace() {
  if (activeLines >= MAX_LINES) return;
  activeLines++;

  const startX = -120;
  const endX = W() + 120;

  const y = safeY();
  const midX = W() * 0.4;
  const bendY = y + (Math.random() > 0.5 ? 70 : -70);

  const path = document.createElementNS(NS, 'path');
  path.setAttribute('d', `
    M ${startX} ${y}
    H ${midX}
    V ${bendY}
    H ${endX}
  `);

  svg.appendChild(path);

  const len = path.getTotalLength();
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;

  /* desenha a trilha */
  path.animate(
    [
      { strokeDashoffset: len },
      { strokeDashoffset: 0 }
    ],
    {
      duration: 2200,
      easing: 'ease-in-out',
      fill: 'forwards'
    }
  );

  /* via aparece APÓS a curva */
  setTimeout(() => {
    createVia(midX, y);
    createVia(midX, bendY);
  }, 1600);

  /* fluxo contínuo */
  setTimeout(() => {
    path.animate(
      [
        { strokeDashoffset: 0 },
        { strokeDashoffset: -len }
      ],
      {
        duration: 14000,
        easing: 'linear',
        iterations: Infinity
      }
    );
  }, 2200);

  /* remove linha depois */
  setTimeout(() => {
    path.style.transition = "opacity 1.2s";
    path.style.opacity = 0;
    setTimeout(() => {
      path.remove();
      activeLines--;
    }, 1200);
  }, 18000);
}

/* loop calmo */
setInterval(() => {
  if (activeLines < MAX_LINES) {
    createTrace();
  }
}, 2600);

/* init */
function init() {
  svg.setAttribute('viewBox', `0 0 ${W()} ${H()}`);
}

window.addEventListener('resize', init);
init();
