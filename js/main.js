document.addEventListener("DOMContentLoaded", () => {

  // --- 1. EFECTO PARALLAX EN LA FOTO ---
  const heroSection = document.querySelector('.hero-section');
  const profileImg = document.getElementById('parallax-img');

  if (heroSection && profileImg) {
    heroSection.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth - e.pageX * 2) / 90;
      const y = (window.innerHeight - e.pageY * 2) / 90;

      // Mueve sutilmente la imagen en la dirección opuesta al cursor
      profileImg.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      // Regresa a su posición original suavemente
      profileImg.style.transform = 'translate(0, 0) scale(1)';
    });
  }

  // --- 2. EFECTO TERMINAL (TYPEWRITER) PARA HABILIDADES ---
  const terminalContainer = document.getElementById('typewriter-container');

  // El texto real que simulará ser escrito
  const lines = [
    { text: "> Inicializando escaneo de sistema...", class: "accent" },
    { text: "> LENGUAJES: Java SE (8 al 21) | TypeScript | SQL", class: "" },
    { text: "> ARQUITECTURA Y PATRONES: MVC | DAO | Repository | Capas | POO Avanzada", class: "accent" },
    { text: "> BACKEND Y FRAMEWORKS: Spring Boot | Node.js | Express | MapStruct | Swagger/OpenAPI", class: "" },
    { text: "> INTEGRACIONES E IA: Azure AD | Microsoft Graph | LangChain4j | OpenAI", class: "accent" },
    { text: "> BASES DE DATOS Y ORMs: MySQL | PostgreSQL | Hibernate | JPA | JDBC | Drizzle ORM", class: "" },
    { text: "> FRONTEND: React | HTML | CSS | Tailwind | Radix/shadcn | Vite | TanStack Query", class: "" },
    { text: "> ENTORNOS (IDEs): IntelliJ IDEA | VS Code | NetBeans | Eclipse", class: "" },
    { text: "> HERRAMIENTAS Y CONTENEDORES: Git | GitHub | Maven | Gradle | Docker", class: "" },
    { text: "> TESTING Y APIs: JUnit 5 | Postman | Insomnia | Feign", class: "" },
    { text: "> Todos los módulos cargados correctamente. [OK]", class: "accent" }
  ];

  let lineIndex = 0;
  let charIndex = 0;

  function typeWriter() {
    if (!terminalContainer) return;

    if (lineIndex < lines.length) {
      const currentLine = lines[lineIndex];

      // Si es el primer carácter de la línea, creamos el elemento span
      if (charIndex === 0) {
        const lineElement = document.createElement("span");
        lineElement.className = `typewriter-line ${currentLine.class}`;
        lineElement.id = `line-${lineIndex}`;

        // Agregamos la línea antes del cursor intermitente
        const cursor = document.getElementById('term-cursor');
        if (cursor) {
          terminalContainer.insertBefore(lineElement, cursor);
        } else {
          terminalContainer.appendChild(lineElement);
          // Crear el cursor si no existe
          const newCursor = document.createElement("span");
          newCursor.className = "cursor";
          newCursor.id = "term-cursor";
          terminalContainer.appendChild(newCursor);
        }
      }

      // Escribir el carácter
      const currentElement = document.getElementById(`line-${lineIndex}`);
      currentElement.textContent += currentLine.text.charAt(charIndex);
      charIndex++;

      // Velocidad de escritura
      let typeSpeed = Math.random() * 50 + 20; // Entre 20ms y 70ms

      if (charIndex < currentLine.text.length) {
        setTimeout(typeWriter, typeSpeed);
      } else {
        // Pausa antes de la siguiente línea
        lineIndex++;
        charIndex = 0;
        setTimeout(typeWriter, 500);
      }
    }
  }

  // Usamos el Intersection Observer para que la animación empiece SOLO cuando llegas a la sección
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(typeWriter, 500);
        observer.disconnect(); // Solo animar una vez
      }
    });
  }, { threshold: 0.5 });

  if (terminalContainer) {
    observer.observe(terminalContainer);
  }
  // --- 3. LÓGICA DE PESTAÑAS TIPO SPA ---
  const navButtons = document.querySelectorAll('.nav-btn[data-target]');
  const sections = document.querySelectorAll('.toggleable-section');

  // Mostrar la sección "Sobre mí" por defecto al cargar la página
  const defaultSection = document.getElementById('sobre-mi');
  if (defaultSection) {
    defaultSection.classList.add('active-section');
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Evita que la página salte hacia abajo de golpe

      // 1. Ocultar todas las secciones
      sections.forEach(sec => {
        sec.classList.remove('active-section');
      });

      // 2. Mostrar la sección seleccionada
      const targetId = btn.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active-section');

        // Reiniciar el efecto Typewriter si se abre la pestaña de Habilidades
        if (targetId === 'habilidades' && terminalContainer.innerHTML.trim() !== '') {
          terminalContainer.innerHTML = ''; // Limpia la terminal
          lineIndex = 0;
          charIndex = 0;
          setTimeout(typeWriter, 300); // Vuelve a escribir
        }
      }
    });
  });
});

// --- PLUS SENIOR: Efecto Spotlight dinámico con el Cursor ---
document.addEventListener('mousemove', (e) => {
  const glow = document.getElementById('cursor-glow');
  if (glow) {
    // Posiciona el centro de la luz exactamente donde está el mouse
    const x = e.clientX;
    const y = e.clientY;
    glow.style.left = `${x}px`;
    glow.style.top = `${y}px`;
  }
});
