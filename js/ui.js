// ============ UI AND ANIMATIONS ============
function initNav() {
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  const ham = document.querySelector('.hamburger');
  let links = document.querySelector('.nav-links');
  if (!links) links = document.getElementById('mobilemenu');

  if (ham && links) {
    ham.addEventListener('click', () => {
      links.classList.toggle('open');
      ham.classList.toggle('active');
    });
  }

  const session = Auth.getSession();
  console.log("SESSION:", session); // 🔍 debug
  const authBtn = document.getElementById('authBtn');
  const adminBtn = document.getElementById('adminBtn');
  const base = getBasePath();

  if (authBtn) {
    if (session) {
      authBtn.textContent = '👤 ' + session.name.split(' ')[0];
      authBtn.href = base + 'pages/profile.html';  // ✅ always user page
      authBtn.style.background = 'var(--moss)';

      if (!document.getElementById('navLogout')) {
        const logoutBtn = document.createElement('button');
        logoutBtn.id = 'navLogout';
        logoutBtn.textContent = 'Logout';
        logoutBtn.className = 'btn-primary btn-primary-sm';
        logoutBtn.style.cssText = 'background:rgba(255,255,255,0.15);border:none;color:white;cursor:pointer;margin-left:8px;';
        logoutBtn.onclick = () => Auth.logout();
        authBtn.parentNode.appendChild(logoutBtn);
      }

      if (adminBtn && Auth.isAdmin()) {
        adminBtn.style.display = 'inline-block';
        adminBtn.href = base + 'pages/admin.html';  // ✅ correct
        adminBtn.target = "_blank"; // ✅ open in new tab
      }
    } else {
      authBtn.textContent = 'Login / Sign Up';
      authBtn.href = base + 'pages/login.html';
      authBtn.style.background = '';
      if (adminBtn) adminBtn.style.display = 'none';
      const logoutBtn = document.getElementById('navLogout');
      if (logoutBtn) logoutBtn.remove();
    }
  }

  try {
    if (typeof Cart !== 'undefined') Cart.updateBadge();
  } catch (e) {
    console.warn('Cart module not loaded');
  }

  const navLinksList = document.querySelectorAll('.nav-links a');
  navLinksList.forEach(a => {
    if (a.href === window.location.href.split('?')[0]) {
      navLinksList.forEach(l => l.classList.remove('active'));
      a.classList.add('active');
    }
  });
}

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();          // ✅ THIS IS MISSING
  initAnimations();
});

// document.addEventListener("DOMContentLoaded", () => {
//   const session = JSON.parse(localStorage.getItem("nt_session"));

//   const authBtn = document.querySelector(".nav-auth-left");

//   if (session && authBtn) {
//     authBtn.innerHTML = `
//       <span style="margin-right:10px;">Hi, ${session.name.split(" ")[0]}</span>
//       <button onclick="Auth.logout()" class="btn-primary btn-primary-sm">Logout</button>
//     `;
//   }
// });


