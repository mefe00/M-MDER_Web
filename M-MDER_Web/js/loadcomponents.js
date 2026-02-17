// loadcomponents.js

function loadComponent(id, file, callback) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Dosya bulunamadı: ${file}`);
      return response.text();
    })
    .then(data => {
      const host = document.getElementById(id);
      if(host) {
        host.innerHTML = data;
        if (typeof callback === "function") callback(host);
      }
    })
    .catch(error => {
      console.error("Hata:", error);
    });
}

/* ==== TEK BİR MERKEZİ FONKSİYON İLE HER ŞEYİ YÖNETELİM ==== */
function initNavbarFunctions() {
  
  // 1. ELEMANLARI SEÇ
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const offcanvasMenu = document.getElementById('offcanvasMenu');
  const offcanvasBackdrop = document.getElementById('offcanvasBackdrop');
  
  const mobileDropdownBtn = document.getElementById('mobileDropdownBtn');
  const mobileDropdown = document.getElementById('mobileDropdown');

  const donationPopup = document.getElementById('donationPopup');
  const closePopupBtn = document.getElementById('popupClose');
  const destekBtns = document.querySelectorAll('#destekOlBtn, #destekOlBtnMobile');
  const pledgeBtn = document.getElementById('pledgeBtn');

  // 2. HAMBURGER MENÜ MANTIĞI
  function toggleMenu() {
    if(!hamburgerBtn || !offcanvasMenu || !offcanvasBackdrop) return;
    
    const isActive = hamburgerBtn.classList.contains('active');
    
    if (isActive) {
      // Kapat
      hamburgerBtn.classList.remove('active');
      offcanvasMenu.classList.remove('active');
      offcanvasBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      // Aç
      hamburgerBtn.classList.add('active');
      offcanvasMenu.classList.add('active');
      offcanvasBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  if(hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
  if(offcanvasBackdrop) offcanvasBackdrop.addEventListener('click', toggleMenu);

  // 3. MOBİL KURUMSAL AKORDİYON
  if(mobileDropdownBtn && mobileDropdown) {
    mobileDropdownBtn.addEventListener('click', function(e) {
      e.preventDefault();
      mobileDropdown.classList.toggle('active');
      const icon = this.querySelector('.fa-chevron-down');
      if(icon) {
        icon.style.transform = mobileDropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        icon.style.transition = 'transform 0.3s';
      }
    });
  }

  // 4. POPUP İŞLEMLERİ
  const openPopup = (e) => {
    e.preventDefault();
    if(donationPopup) {
      donationPopup.classList.add('active');
      // Mobil menü açıksa kapat
      if(offcanvasMenu && offcanvasMenu.classList.contains('active')) {
        toggleMenu();
      }
    }
  };

  const closePopup = () => {
    if(donationPopup) donationPopup.classList.remove('active');
  };

  destekBtns.forEach(btn => btn.addEventListener('click', openPopup));
  if(closePopupBtn) closePopupBtn.addEventListener('click', closePopup);
  
  if(donationPopup) {
    donationPopup.addEventListener('click', (e) => {
      if(e.target === donationPopup) closePopup();
    });
  }

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      closePopup();
      if(offcanvasMenu && offcanvasMenu.classList.contains('active')) toggleMenu();
    }
  });

  if(pledgeBtn) {
    pledgeBtn.addEventListener('click', () => {
      window.location.href = 'Projeler.html#pledge-section';
    });
  }
}

// 5. BAŞLATMA
document.addEventListener("DOMContentLoaded", () => {
  // Navbar'ı yükle ve yükleme bitince initNavbarFunctions'ı çalıştır
  loadComponent("navbar-placeholder", "navbar.html", function(){
    // Biraz gecikmeli başlatmak DOM'un oturmasını garanti eder
    setTimeout(initNavbarFunctions, 50);
  });
  
  loadComponent("footer-placeholder", "footer.html");
});