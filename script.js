// Variables globales
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');

// Objets JavaScript pour les données du portfolio
const portfolioData = {
    owner: {
        nom: "Rakotondrambelo",
        prenom: "Tsiory Nehemiah",
        profession: "Développeur Web en devenir",
        email: "raktsio@gmail.com",
        description: "Passionné par la création de sites web modernes et interactifs"
    },
    
    projets: [
        {
            id: 1,
            titre: "Jeu de Memory Interactif",
            description: "Un mini-jeu de memory développé en JavaScript vanilla utilisant les événements DOM et la manipulation d'objets.",
            technologies: ["HTML", "CSS", "JavaScript"],
            image: "fas fa-gamepad",
            details: "Ce projet utilise des concepts avancés de JavaScript comme les closures, les événements et la manipulation du DOM. Le jeu génère aléatoirement des paires de cartes et mesure le temps de résolution.",
            lien: "#"
        },
        {
            id: 2,
            titre: "Application Mobile Responsive",
            description: "Une application web responsive simulant une interface mobile avec navigation tactile et animations CSS.",
            technologies: ["HTML5", "CSS3", "JavaScript"],
            image: "fas fa-mobile-alt",
            details: "Interface entièrement responsive avec des animations CSS3, utilisation de flexbox et grid, optimisée pour tous les écrans.",
            lien: "#"
        },
        {
            id: 3,
            titre: "Générateur de Code QR",
            description: "Application web permettant de générer des codes QR personnalisés avec prévisualisation en temps réel.",
            technologies: ["HTML", "CSS", "JavaScript", "API"],
            image: "fas fa-qrcode",
            details: "Utilisation d'une API externe pour générer des QR codes, validation des données utilisateur et téléchargement automatique.",
            lien: "#"
        }
    ],
    
    competences: {
        soft: [
            { nom: "Gestion de projet", niveau: 85 },
            { nom: "Résolution de problème", niveau: 90 },
            { nom: "Adaptabilité", niveau: 80 },
            { nom: "Communication", niveau: 75 }
        ],
        hard: [
            { nom: "HTML", niveau: 90 },
            { nom: "CSS", niveau: 85 },
            { nom: "JavaScript", niveau: 75 },
            { nom: "VS Code", niveau: 95 },
            { nom: "Git", niveau: 70 }
        ]
    }
};

// Fonction d'initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    setupEventListeners();
    observeSkillsSection();
    updateNavOnScroll();
});

// Initialisation du portfolio avec les données
function initializePortfolio() {
    // Mise à jour des informations personnelles
    const brandName = document.querySelector('.brand-name');
    const brandSurname = document.querySelector('.brand-surname');
    const heroTitle = document.querySelector('.hero-content h1');
    
    if (brandName) brandName.textContent = portfolioData.owner.nom.toUpperCase();
    if (brandSurname) brandSurname.textContent = portfolioData.owner.prenom.toUpperCase();
    
    // Mise à jour des projets
    updateProjectsDisplay();
    
    // Animation d'entrée pour les éléments
    animateOnScroll();
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Menu hamburger
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Navigation smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Fermeture du modal
    closeModal.addEventListener('click', closeProjectModal);
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Cartes de projets
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.dataset.project;
            openProjectModal(projectId);
        });
    });
    
    // Bouton CV
    const cvButton = document.querySelector('.cv-button');
    if (cvButton) {
        cvButton.addEventListener('click', downloadCV);
    }
    
    // Redimensionnement de la fenêtre
    window.addEventListener('resize', handleWindowResize);
    
    // Gestion du scroll
    window.addEventListener('scroll', handleScroll);
}

// Fonction de scroll fluide vers une section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Gestion du menu mobile
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animation des barres du hamburger
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
}

// Gestion des clics de navigation
function handleNavClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    scrollToSection(targetId);
    
    // Fermer le menu mobile si ouvert
    if (navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    // Mettre à jour le lien actif
    updateActiveNavLink(this);
}

// Mise à jour du lien de navigation actif
function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Observation de la section compétences pour animer les barres
function observeSkillsSection() {
    const skillsSection = document.getElementById('competences');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(skillsSection);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(skillsSection);
}

// Animation des barres de compétences
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const skillLevel = bar.dataset.skill;
        setTimeout(() => {
            bar.style.width = skillLevel + '%';
        }, index * 200);
    });
}

// Gestion du scroll pour la navigation
function updateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Ouverture du modal de projet
function openProjectModal(projectId) {
    const projet = portfolioData.projets.find(p => p.id == projectId);
    
    if (projet) {
        modalContent.innerHTML = `
            <h2>${projet.titre}</h2>
            <div class="modal-project-content">
                <div class="modal-project-icon">
                    <i class="${projet.image}"></i>
                </div>
                <p class="project-description">${projet.details}</p>
                <div class="project-technologies">
                    <h3>Technologies utilisées :</h3>
                    <div class="tech-tags">
                        ${projet.technologies.map(tech => `<span class="tech-tag">#${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="project-actions">
                    <a href="${projet.lien}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                        Voir le projet
                    </a>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Fermeture du modal de projet
function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Mise à jour de l'affichage des projets
function updateProjectsDisplay() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        if (portfolioData.projets[index]) {
            const projet = portfolioData.projets[index];
            const projectIcon = card.querySelector('.project-image i');
            const projectTitle = card.querySelector('.project-content h3');
            const techTags = card.querySelector('.project-tech');
            
            if (projectIcon) projectIcon.className = projet.image;
            if (projectTitle) projectTitle.textContent = projet.description;
            if (techTags) {
                techTags.innerHTML = projet.technologies
                    .map(tech => `<span class="tech-tag">#${tech}</span>`)
                    .join('');
            }
        }
    });
}

// Gestion du formulaire de contact
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        prenom: document.getElementById('prenom').value,
        nom: document.getElementById('nom').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Validation des données
    if (validateForm(formData)) {
        // Simulation d'envoi
        showNotification('Message envoyé avec succès !', 'success');
        resetForm();
    } else {
        showNotification('Veuillez remplir tous les champs correctement.', 'error');
    }
}

// Validation du formulaire
function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return data.prenom.trim() !== '' &&
           data.nom.trim() !== '' &&
           emailRegex.test(data.email) &&
           data.message.trim() !== '';
}

// Réinitialisation du formulaire
function resetForm() {
    document.getElementById('contactForm').reset();
}

// Affichage de notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-color)' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Suppression automatique après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Téléchargement du CV (simulation)
function downloadCV() {
    showNotification('Fonctionnalité de téléchargement en cours de développement.', 'info');
}

// Animation des éléments au scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll(
        '.project-card, .about-content, .skill-item, .section-title'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Gestion du redimensionnement
function handleWindowResize() {
    // Fermer le menu mobile si ouvert lors du redimensionnement
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// Gestion générale du scroll
function handleScroll() {
    const scrolled = window.scrollY;
    
    // Effet parallaxe pour la section hero
    const heroImage = document.querySelector('.developer-illustration');
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    // Navbar transparente/opaque
    if (scrolled > 100) {
        navbar.style.background = 'rgba(44, 44, 84, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--dark-color)';
        navbar.style.backdropFilter = 'none';
    }
}

// Ajout des styles CSS pour les animations via JavaScript
function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
        
        .modal-project-content {
            text-align: center;
        }
        
        .modal-project-icon {
            font-size: 4rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        
        .project-description {
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
            color: var(--gray);
            line-height: 1.6;
        }
        
        .project-technologies h3 {
            color: var(--dark-color);
            margin-bottom: 0.5rem;
        }
        
        .tech-tags {
            margin-bottom: 2rem;
        }
        
        .project-actions .project-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: var(--gradient);
            color: white;
            padding: 0.8rem 1.5rem;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            transition: var(--transition);
        }
        
        .project-actions .project-link:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow);
        }
    `;
    
    document.head.appendChild(style);
}

// Initialiser les styles personnalisés
addCustomStyles();

// Chargement de la photo de profil
function loadProfileImage() {
    const profileImage = document.getElementById('profileImage');
    const profilePicture = document.getElementById('profilePicture');
    
    console.log('Tentative de chargement de l\'image:', profileImage.src);
    
    // Teste si l'image existe et peut être chargée
    profileImage.onload = function() {
        console.log('Image chargée avec succès!');
        this.style.display = 'block';
        profilePicture.classList.add('has-image');
    };
    
    profileImage.onerror = function() {
        console.log('❌ Image de profil non trouvée à:', this.src);
        console.log('Vérifiez que le fichier existe à cet emplacement');
        this.style.display = 'none';
        profilePicture.classList.remove('has-image');
    };
    
    // Force le rechargement pour tester
    const originalSrc = profileImage.src;
    profileImage.src = '';
    setTimeout(() => {
        profileImage.src = originalSrc;
    }, 10);
}

// Fonction utilitaire pour déboguer (à retirer en production)
function debugPortfolio() {
    console.log('Portfolio Data:', portfolioData);
    console.log('Navigation éléments:', navLinks.length);
    console.log('Projets chargés:', portfolioData.projets.length);
}

// Appel de debug en mode développement
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    debugPortfolio();
}