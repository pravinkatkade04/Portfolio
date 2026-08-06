// ---------- Scroll progress + navbar shadow ----------
  const progressBar = document.getElementById('progress-bar');
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
    navbar.classList.toggle('shadow-md', h.scrollTop > 10);
  });

  // ---------- Mobile menu ----------
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // ---------- Custom cursor ----------
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (isFinePointer) {
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    let cursorStarted = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
      if (!cursorStarted) { ringX = mouseX; ringY = mouseY; cursorStarted = true; }
      cursorDot.classList.remove('is-hidden');
      cursorRing.classList.remove('is-hidden');
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.classList.add('is-hidden');
      cursorRing.classList.add('is-hidden');
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const interactiveSelector = 'a, button, input, textarea, .skill-chip, .project-card';
    document.querySelectorAll(interactiveSelector).forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('is-active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-active'));
    });
  } else {
    cursorDot.style.display = 'none';
    cursorRing.style.display = 'none';
  }

  // ---------- Magnetic buttons ----------
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // ---------- Project card 3D tilt ----------
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-10px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.015)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // ---------- Photo tilt on mouse ----------
  const heroWrap = document.getElementById('hero-3d');
  const photo = document.getElementById('photo-tilt');
  heroWrap.addEventListener('mousemove', (e) => {
    const rect = heroWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    photo.style.transform = `translate(-50%,-50%) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  });
  heroWrap.addEventListener('mouseleave', () => {
    photo.style.transform = 'translate(-50%,-50%) rotateY(0deg) rotateX(0deg)';
  });

  // ---------- Contact form (Web3Forms) ----------
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const key = form.access_key.value;
    statusEl.classList.remove('hidden', 'text-teal', 'text-amber');

    // honeypot: if a bot filled this hidden field in, silently drop the submission
    if (form.botcheck && form.botcheck.checked) {
      statusEl.textContent = 'Message sent — thank you!';
      statusEl.classList.add('text-teal');
      form.reset();
      return;
    }
    if (key === 'YOUR_ACCESS_KEY_HERE') {
      statusEl.textContent = 'Add your free Web3Forms access key in the form to enable sending.';
      statusEl.classList.add('text-amber');
      return;
    }
    statusEl.textContent = 'Sending…';
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) });
      const data = await res.json();
      if (data.success) {
        statusEl.textContent = 'Message sent — thank you!';
        statusEl.classList.add('text-teal');
        form.reset();
      } else {
        statusEl.textContent = 'Something went wrong. Please try again.';
        statusEl.classList.add('text-amber');
      }
    } catch (err) {
      statusEl.textContent = 'Network error. Please try again.';
      statusEl.classList.add('text-amber');
    }
  });

  // ---------- Three.js 3D network sphere ----------
  (function initHero3D() {
    const canvas = document.getElementById('hero-canvas');
    const container = document.getElementById('hero-3d');
    if (!window.THREE) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 4.4;

    function resize() {
      const size = container.clientWidth;
      renderer.setSize(size, size, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    // Icosahedron wireframe "network" shell
    const geo = new THREE.IcosahedronGeometry(1.7, 1);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x12172b, wireframe: true, transparent: true, opacity: 0.35 });
    const wireMesh = new THREE.Mesh(geo, wireMat);
    scene.add(wireMesh);

    // Node points at vertices
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', geo.attributes.position);
    const nodeMat = new THREE.PointsMaterial({ color: 0xff8c42, size: 0.06, sizeAttenuation: true });
    const points = new THREE.Points(nodeGeo, nodeMat);
    scene.add(points);

    // Inner accent sphere
    const innerGeo = new THREE.IcosahedronGeometry(0.95, 0);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x4c3ae3, wireframe: true, transparent: true, opacity: 0.5 });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    let targetX = 0, targetY = 0;
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 1.2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 1.2;
    });

    function animate() {
      requestAnimationFrame(animate);
      wireMesh.rotation.y += 0.0022;
      wireMesh.rotation.x += 0.0009;
      points.rotation.copy(wireMesh.rotation);
      innerMesh.rotation.y -= 0.0035;
      innerMesh.rotation.x -= 0.0015;

      scene.rotation.y += (targetX * 0.4 - scene.rotation.y) * 0.03;
      scene.rotation.x += (-targetY * 0.4 - scene.rotation.x) * 0.03;

      renderer.render(scene, camera);
    }
    animate();
  })();