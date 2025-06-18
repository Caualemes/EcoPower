document.addEventListener('DOMContentLoaded', function() {
  // Menu Mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    this.classList.toggle('fa-times');
  });
  
  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
      menuToggle.classList.remove('fa-times');
    });
  });
  
  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 120,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Efeito de scroll no header
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.style.top = '0';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.top = '40px';
      header.style.boxShadow = 'none';
    }
  });
  
  // Animação ao rolar a página
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.projeto-card, .vantagem-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Inicializar elementos como invisíveis
  document.querySelectorAll('.projeto-card, .vantagem-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Executar uma vez ao carregar
});

function enviarWhatsApp(event) {
  event.preventDefault();
  
  // Coletar dados com sanitização
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const cidade = document.getElementById('cidade').value.trim();
  const consumo = document.getElementById('consumo').value.trim();

  // Validações reforçadas
  if (!nome || !telefone || !cidade || !consumo) {
    alert('Por favor, preencha todos os campos corretamente');
    return;
  }

  // Formatação PERFEITA (sem %0A* soltos)
  const mensagemBruta = `
  *COTAÇÃO ECOPOWER - ENERGIA SOLAR*

  *Nome:* ${nome}
  *WhatsApp:* ${telefone}
  *Cidade:* ${cidade}
  *Consumo:* ${consumo} kWh/mês

  _Por favor, envie proposta comercial detalhada_
  `;

  // Processamento especial para WhatsApp
  const mensagemFormatada = mensagemBruta
    .replace(/^\s+/gm, '') // Remove espaços no início de cada linha
    .replace(/\n/g, '%0A') // Converte quebras de linha
    .replace(/\s+/g, ' '); // Remove espaços duplicados

  // URL final otimizada
  const urlWhatsApp = `https://wa.me/551821911041?text=${mensagemFormatada}`;
  
  window.open(urlWhatsApp, '_blank');
  
  // Feedback visual (opcional)
  this.querySelector('button').textContent = 'Enviando...';
  setTimeout(() => {
    this.querySelector('button').innerHTML = '<i class="fab fa-whatsapp"></i> Proposta Enviada!';
  }, 1000);
}

// Navbar Dinâmica no Scroll
let lastScroll = 0;
const header = document.querySelector('header');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Esconde a navbar ao descer
  if (currentScroll > lastScroll && currentScroll > headerHeight) {
    header.style.top = `-${headerHeight}px`;
  } 
  // Mostra ao subir
  else {
    header.style.top = currentScroll > 40 ? '0' : '40px';
  }
  
  // Adiciona sombra quando scrollar
  header.style.boxShadow = currentScroll > 10 ? 
    '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none';
  
  lastScroll = currentScroll;
});

