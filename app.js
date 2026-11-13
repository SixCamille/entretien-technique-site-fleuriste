/**
 * Parenthèse Florale - Lyon 7ème
 * Script interactif pour le site vitrine & galerie Instagram
 */

document.addEventListener("DOMContentLoaded", () => {
  initLiveHoursStatus();
  initMobileNav();
  initHeaderScroll();
  initServiceFilters();
  initServiceModals();
  initInstagramGallery();
  initSeasonTabs();
  initWorkshopBookings();
  initContactForm();
  initSmoothScroll();
});

/* ==========================================================================
   1. Live Store Hours Status
   ========================================================================== */
function initLiveHoursStatus() {
  const badge = document.getElementById("liveHoursBadge");
  const tableRows = document.querySelectorAll(".hours-table tr");
  if (!badge) return;

  const now = new Date();
  const day = now.getDay(); // 0 = Dimanche, 1 = Lundi, 2 = Mardi...
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours + minutes / 60;

  // Highlight today's row in hours table
  // Table rows: 0: Mardi-Vendredi, 1: Samedi, 2: Dimanche, 3: Lundi
  tableRows.forEach(row => row.classList.remove("today-highlight"));
  if (day >= 2 && day <= 5 && tableRows[0]) tableRows[0].classList.add("today-highlight");
  else if (day === 6 && tableRows[1]) tableRows[1].classList.add("today-highlight");
  else if (day === 0 && tableRows[2]) tableRows[2].classList.add("today-highlight");
  else if (day === 1 && tableRows[3]) tableRows[3].classList.add("today-highlight");

  let isOpen = false;
  let closingMsg = "";

  if (day >= 2 && day <= 6) {
    // Mardi au Samedi: 10h - 19h30
    if (currentTime >= 10 && currentTime < 19.5) {
      isOpen = true;
      closingMsg = "Ouvert jusqu'à 19h30";
    } else {
      closingMsg = "Fermé • Réouverture demain 10h";
    }
  } else if (day === 0) {
    // Dimanche: 10h - 13h
    if (currentTime >= 10 && currentTime < 13) {
      isOpen = true;
      closingMsg = "Ouvert jusqu'à 13h";
    } else {
      closingMsg = "Fermé • Réouverture mardi 10h";
    }
  } else {
    // Lundi: Fermé
    closingMsg = "Fermé le lundi • Réouverture mardi 10h";
  }

  const dot = badge.querySelector(".status-dot");
  const text = badge.querySelector(".status-text");

  if (isOpen) {
    if (dot) dot.style.backgroundColor = "#2e9e51";
    if (text) text.textContent = `Boutique ouverte • ${closingMsg}`;
  } else {
    if (dot) {
      dot.style.backgroundColor = "#c07a60";
      dot.style.boxShadow = "0 0 0 3px rgba(192, 122, 96, 0.2)";
    }
    if (text) text.textContent = `Boutique : ${closingMsg}`;
  }
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggle = document.querySelector(".mobile-nav-toggle");
  const menu = document.querySelector(".mobile-nav-menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.contains("open");
    if (isOpen) {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    } else {
      menu.classList.add("open");
      toggle.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });

  menu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ==========================================================================
   3. Sticky Header Scrolled Effect
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* ==========================================================================
   4. Service Details Data & Modals
   ========================================================================== */
const SERVICES_DATA = {
  fraiches: {
    category: "Fleurs Fraîches & Saison",
    title: "Bouquets & Brassées de Saison",
    price: "À partir de 30 €",
    img: "assets/images/fleurs-fraiches.jpg",
    desc: "Des compositions florales poétiques, généreuses et respectueuses des cycles de la nature. Marion sélectionne chaque semaine le meilleur des producteurs français et régionaux (Dahlias, Pivoines, Tournesols, Chrysanthèmes de collection, Renoncules...).",
    highlights: [
      "100% fleurs françaises et de saison (Collectif de la Fleur Française)",
      "Retrait express Click & Collect au 69 rue de Marseille (disponible en 2-3h)",
      "Livraison éco-responsable à vélo dans tous les arrondissements de Lyon",
      "Emballage signature en textile réutilisable ou papier kraft naturel compostable"
    ]
  },
  mariage: {
    category: "Événements & Amour",
    title: "Mariages & Scénographie Florale",
    price: "Sur devis sur-mesure",
    img: "assets/images/mariage-couple.jpg",
    desc: "Votre mariage est une histoire unique que nous sublimons avec sensibilité. À travers nos échanges et moodboards, nous concevons une scénographie florale complète, harmonieuse et éco-conçue, en parfait accord avec vos souhaits.",
    highlights: [
      "Bouquet de mariée poétique, boutonnières, couronnes et peignes fleuris",
      "Grandes arches de cérémonie (ronde, déstructurée ou en colonnes végétales)",
      "Centres de table, chemins végétaux et suspensions aériennes",
      "Démarche 100% éco-responsable : sans mousse florale synthétique polluante",
      "Compte dédié pour les inspirations mariages : @parentheseflorale.mariages"
    ]
  },
  sechees: {
    category: "Créations Durables",
    title: "Fleurs Séchées & Objets Poétiques",
    price: "De 25 € à 95 €",
    img: "assets/images/fleurs-sechees-boutique.jpg",
    desc: "Un univers chaleureux et intemporel. Dans notre atelier-grenier de Lyon 7ème, nous faisons sécher nous-mêmes environ 50% de nos fleurs fraîches épanouies pour leur donner une seconde vie durable et féerique.",
    highlights: [
      "Bouquets de fleurs séchées de toutes tailles (du mini au format XL)",
      "Couronnes murales artisanales sur cercles dorés ou en rotin",
      "Cloches en verre poétiques et suspensions fleuries pour vos intérieurs",
      "Personnalisation sur tambour brodé (initiales, prénoms, dates clés)",
      "Apportez votre propre vase : nous créons une composition parfaitement ajustée !"
    ]
  },
  jungle: {
    category: "Végétalisation Intérieure",
    title: "Jungle Urbaine & Plantes Vertes",
    price: "À partir de 12 €",
    img: "assets/images/jungle-urbaine.jpg",
    desc: "Plongez dans notre jungle urbaine au cœur de Lyon 7ème. Une profusion de plantes dépolluantes, graphiques et adaptées à la vie citadine, accompagnées de pots en terre cuite artisanale et de terreau bio français.",
    highlights: [
      "Sélection soignée de Monsteras, Calatheas, Ficus, Pothos, Bégonias rares",
      "Pots en terre cuite italienne et céramique artisanale française",
      "Tout pour le rempotage : billes d'argile, terreau bio et engrais naturel",
      "Diagnostics et fiches de conseils personnalisés pour chaque plante"
    ]
  },
  ateliers: {
    category: "Transmission & DIY",
    title: "Ateliers d'Art Floral & Partage",
    price: "À partir de 55 € / pers.",
    img: "assets/images/atelier-creatif.jpg",
    desc: "Épanouissez votre créativité dans notre boutique chaleureuse. Autour d'un thé ou d'un apéritif convivial, Marion vous initie aux gestes de l'art floral et vous repartez avec votre création unique et personnalisée.",
    highlights: [
      "Thèmes variés : couronne de fleurs séchées, bouquet vrillé de saison, boule à facette fleurie, citrouille d'automne...",
      "Ateliers parents-enfants et séances afterwork conviviales",
      "Privatisation sur mesure pour EVJF, anniversaires et team building",
      "Matériel professionnel et végétaux fournis, collation offerte"
    ]
  },
  pro: {
    category: "Professionnels & B2B",
    title: "Abonnements & Scénographies Pro",
    price: "Formules flexibles",
    img: "assets/images/abonnements-fleurs.webp",
    desc: "Apportez une signature végétale élégante à vos espaces professionnels. Hôtels de charme, restaurants lyonnais, cabinets, boutiques et sièges d'entreprise : nous créons une ambiance sur mesure adaptée à votre image.",
    highlights: [
      "Abonnements floraux livrés à vélo chaque semaine ou toutes les deux semaines",
      "Végétalisation pérenne de vitrines, halls d'accueil et bureaux",
      "Scénographies éphémères pour shootings photo, défilés et lancements de produits",
      "Partenariats de prestige (ex : fleurissement de la Villa La Vigie à Monte-Carlo)"
    ]
  },
  deuil: {
    category: "Hommage & Sensibilité",
    title: "Au Revoir — Célébrer la Mémoire",
    price: "Sur devis délicat",
    img: "assets/images/ambiance-boutique.jpg",
    desc: "Dans les moments délicats, nous vous accompagnons avec douceur et respect. Nos compositions 'Au Revoir' honorent la mémoire de vos proches avec une touche naturelle, poétique et sans artifice plastique.",
    highlights: [
      "Compositions naturelles, couronnes champêtres et coussins de fleurs locales",
      "Matériaux 100% biodégradables, sans mousse phénolique synthétique",
      "Livraison et installation directement sur le lieu de cérémonie à Lyon et alentours"
    ]
  }
};

function initServiceFilters() {
  const filterBtns = document.querySelectorAll(".service-filters .filter-btn");
  const cards = document.querySelectorAll(".services-grid .service-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      cards.forEach(card => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

function initServiceModals() {
  const modal = document.getElementById("serviceDetailModal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".modal-close-btn");
  const modalCategory = modal.querySelector(".service-modal-category");
  const modalTitle = modal.querySelector(".service-modal-title");
  const modalPrice = modal.querySelector(".service-modal-price");
  const modalDesc = modal.querySelector(".service-modal-desc");
  const modalImg = modal.querySelector(".service-modal-image");
  const highlightsContainer = modal.querySelector(".service-modal-highlights");
  const bookBtn = modal.querySelector(".service-modal-book-btn");

  document.querySelectorAll("[data-open-service]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const serviceKey = btn.getAttribute("data-open-service");
      const data = SERVICES_DATA[serviceKey];
      if (!data) return;

      modalCategory.textContent = data.category;
      modalTitle.textContent = data.title;
      modalPrice.textContent = data.price;
      modalDesc.textContent = data.desc;
      modalImg.src = data.img;
      modalImg.alt = data.title;

      highlightsContainer.innerHTML = data.highlights
        .map(
          h => `
        <div class="service-modal-highlight-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${h}</span>
        </div>
      `
        )
        .join("");

      bookBtn.onclick = () => {
        closeModal(modal);
        prefillContactService(data.title);
      };

      openModal(modal);
    });
  });

  closeBtn.addEventListener("click", () => closeModal(modal));
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal(modal);
  });
}

function prefillContactService(serviceName) {
  const select = document.getElementById("serviceSelect");
  const contactSection = document.getElementById("contact");
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.includes(serviceName) || serviceName.includes(select.options[i].text)) {
        select.selectedIndex = i;
        break;
      }
    }
  }
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
}

/* ==========================================================================
   5. Instagram Gallery Feed & Lightbox
   ========================================================================== */
const INSTAGRAM_POSTS = [
  {
    id: 1,
    category: "mariage",
    img: "assets/images/mariage-couple.jpg",
    alt: "Mariage bohème et arche florale dans la région lyonnaise",
    likes: 428,
    comments: 31,
    date: "Il y a 3 jours",
    caption:
      "On vous prépare un récap de nos plus beaux bouquets de mariée de cette année sur @parentheseflorale.mariages ! Place au tri de vos magnifiques galeries photos et à la préparation des mariages à venir. Dites-nous ce que vous avez le plus hâte de découvrir !",
    tags: ["#mariagelyon", "#fleuristemariage", "#fleurfrancaise", "#parentheseflorale", "#archeflorale"]
  },
  {
    id: 2,
    category: "fleurs",
    img: "assets/images/fleurs-fraiches.jpg",
    alt: "Brassée de dahlias et fleurs locales de saison",
    likes: 384,
    comments: 24,
    date: "Il y a 5 jours",
    caption:
      "Cette saison, nous avons eu le plaisir infini de vous proposer une multitude de dahlias cultivés par nos producteurs locaux partenaires. L'accueil que vous leur avez réservé en boutique est incroyable : ils sont à deux doigts de détrôner les pivoines !",
    tags: ["#dahlias", "#fleursdesaison", "#lyon7", "#collectifdelafleurfrancaise", "#fleuristelyon"]
  },
  {
    id: 3,
    category: "sechees",
    img: "assets/images/fleurs-sechees-boutique.jpg",
    alt: "L'univers fleurs séchées dans la boutique du 69 rue de Marseille",
    likes: 512,
    comments: 42,
    date: "Il y a 1 semaine",
    caption:
      "Éclats dorés sur les murs du 69 rue de Marseille. Ce qui brille n'a pas besoin de bruit... Couronnes murales, cloches et bouquets intemporels séchés par nos soins dans notre grenier lyonnais. Venez dénicher votre coup de cœur pour réchauffer votre intérieur !",
    tags: ["#fleurssechees", "#couronnefleurie", "#artisandart", "#zerodechet", "#lyonshopping"]
  },
  {
    id: 4,
    category: "ateliers",
    img: "assets/images/atelier-creatif.jpg",
    alt: "Atelier floral créatif animé par Marion",
    likes: 295,
    comments: 19,
    date: "Il y a 1 semaine",
    caption:
      "Un aperçu de notre dernier atelier d'art floral en boutique ! Des rires, de la créativité et de la transmission. Chacun(e) repart avec son œuvre fleurie sous le bras et de précieux conseils. Les prochaines dates sont en ligne, pensez à réserver !",
    tags: ["#atelierfloral", "#diylyon", "#workshoplyon", "#activitelyon", "#afterworklyon"]
  },
  {
    id: 5,
    category: "jungle",
    img: "assets/images/jungle-urbaine.jpg",
    alt: "Jungle urbaine lyonnaise au cœur du 7ème arrondissement",
    likes: 467,
    comments: 38,
    date: "Il y a 2 semaines",
    caption:
      "Plongez au cœur de notre Jungle Urbaine lyonnaise : une parenthèse végétale au cœur de la ville où la densité et la variété de nos plantes vous transportent. Ici, point de mobilier froid, seulement une profusion de végétaux et de terre cuite.",
    tags: ["#jungleurbaine", "#urbanjunglelyon", "#plantesvertes", "#plantlovers", "#lyon7eme"]
  },
  {
    id: 6,
    category: "mariage",
    img: "assets/images/mariage-arche.jpg",
    alt: "Grande arche fleurie pour cérémonie laïque en plein air",
    likes: 618,
    comments: 53,
    date: "Il y a 2 semaines",
    caption:
      "Faire de votre journée d'amour un moment inoubliable. Une arche fleurie tout en légèreté, composée de végétaux de saison cueillis la veille. Merci à nos mariés pour leur confiance si précieuse !",
    tags: ["#archeflorale", "#ceremonielaique", "#weddinginspiration", "#mariageecolo", "#parentheseflorale"]
  },
  {
    id: 7,
    category: "fleurs",
    img: "assets/images/bouquet-matcha.jpg",
    alt: "Bouquet signature Matcha Latte rose poudré et crème",
    likes: 342,
    comments: 21,
    date: "Il y a 3 semaines",
    caption:
      "Notre création 'Matcha Latte' : douceur pastel, rose poudré et touches végétales subtiles. À commander en Click & Collect sur notre boutique ou à faire livrer à vélo chez vos proches sur Lyon !",
    tags: ["#bouquetdefleurs", "#matchalatte", "#fleursfrancaises", "#livraisonvelo", "#lyoncadeau"]
  },
  {
    id: 8,
    category: "mariage",
    img: "assets/images/mariage-bouquet-mariee.jpg",
    alt: "Détail délicat du bouquet de mariée avec ruban de soie végétale",
    likes: 580,
    comments: 47,
    date: "Il y a 3 semaines",
    caption:
      "Le bouquet de mariée : le bijou végétal du grand jour. Confectionné sur mesure selon la silhouette de la robe, les teintes choisies et les fleurs qui vous font vibrer. Zoom sur nos teintes d'automne.",
    tags: ["#bouquetdemariee", "#mariagechic", "#fleursnaturelles", "#artisandartlyon"]
  },
  {
    id: 9,
    category: "fleurs",
    img: "assets/images/bouquet-textile.webp",
    alt: "Bouquet signature enveloppé dans un tissu écologique réutilisable",
    likes: 410,
    comments: 33,
    date: "Il y a 1 mois",
    caption:
      "Notre démarche jusqu'au bout des tiges : nos bouquets signatures sont enveloppés dans des tissus écoresponsables réutilisables, teintés végétalement ou chinés. Zéro plastique, 100% poésie.",
    tags: ["#zerowaste", "#furoshiki", "#teinturevegetale", "#slowfloral", "#fleuristeresponsable"]
  },
  {
    id: 10,
    category: "pro",
    img: "assets/images/abonnements-fleurs.webp",
    alt: "Abonnement floral professionnel pour bureaux et boutiques",
    likes: 275,
    comments: 15,
    date: "Il y a 1 mois",
    caption:
      "Embellir le quotidien des équipes et accueillir vos clients avec la fraîcheur des fleurs de saison. Nos abonnements pros sont livrés à vélo chaque semaine partout à Lyon. Contactez-nous pour une offre sur mesure !",
    tags: ["#fleursentreprise", "#b2blyon", "#vegetalisation", "#lyonentreprises"]
  },
  {
    id: 11,
    category: "ateliers",
    img: "assets/images/boutique-details.jpg",
    alt: "Céramiques artisanales et ambiances douces en boutique",
    likes: 388,
    comments: 27,
    date: "Il y a 1 mois",
    caption:
      "Vases en céramique émaillée, pichets vintage et pépites chinées : chez Parenthèse Florale, nous aimons associer la fleur au bel objet du quotidien.",
    tags: ["#ceramique", "#artdevivre", "#decorationlyon", "#conceptstorelyon"]
  },
  {
    id: 12,
    category: "fleurs",
    img: "assets/images/marion-producteur.jpg",
    alt: "Marion en visite chez un producteur local de fleurs dans la région",
    likes: 720,
    comments: 65,
    date: "Il y a 1 mois",
    caption:
      "Immersion dans les champs chez Clément, notre producteur partenaire. Voir grandir les fleurs, échanger avec les passionnés de la terre et vous rapporter le plus beau de la nature en boutique : voilà le cœur battant de Parenthèse Florale !",
    tags: ["#circuitcourt", "#producteurfrancais", "#fleurfrancaise", "#marionfleuriste", "#passionfleur"]
  },
  {
    id: 13,
    category: "mariage",
    img: "assets/images/mariage-table.jpg",
    alt: "Scénographie et centres de table fleuris pour réception de mariage",
    likes: 495,
    comments: 36,
    date: "Il y a 1 mois",
    caption:
      "L'élégance d'une table dressée avec poésie. Des compositions basses qui favorisent les conversations, des teintes chaudes et des matières naturelles. Pensé et fleuri par notre studio événementiel.",
    tags: ["#centredetable", "#mariagelyonnais", "#scenographieflorale", "#tablesetting", "#weddingdecor"]
  },
  {
    id: 14,
    category: "fleurs",
    img: "assets/images/bouquet-fraise.jpg",
    alt: "Bouquet pastel Fraise des Bois rose poudré et crème",
    likes: 360,
    comments: 22,
    date: "Il y a 1 mois",
    caption:
      "Notre création gourmande 'Fraise des Bois' 🍓 : un nuage de douceur rose poudré et crème, disponible en boutique et en livraison à vélo. Une vraie caresse visuelle pour égayer vos salons.",
    tags: ["#fraisedesbois", "#bouquetpastel", "#fleuristelyon7", "#douceurflorale"]
  },
  {
    id: 15,
    category: "mariage",
    img: "assets/images/mariage-shooting.jpg",
    alt: "Shooting d'inspiration mariage Maison NR par Parenthèse Florale",
    likes: 540,
    comments: 41,
    date: "Il y a 2 mois",
    caption:
      "Retour sur notre shooting d'inspiration avec la talentueuse équipe de Maison NR. Explorer de nouvelles harmonies, oser les textures aériennes et vous inspirer pour vos mariages de la saison prochaine.",
    tags: ["#shootinginspiration", "#mariageboheme", "#fleursfrancaises", "#mariage2026"]
  },
  {
    id: 16,
    category: "fleurs",
    img: "assets/images/bouquet-graphique.jpg",
    alt: "Bouquet de saison graphique et contemporain",
    likes: 315,
    comments: 18,
    date: "Il y a 2 mois",
    caption:
      "Le bouquet graphique : des hauteurs contrastées, des tiges sculptées et des variétés botaniques singulières. Pour les amateurs de design végétal et de compositions affirmées.",
    tags: ["#designvegetal", "#bouquetgraphique", "#artfloralcontemporain", "#fleuristeresponsable"]
  }
];

let currentInstaIndex = 0;

function initInstagramGallery() {
  const grid = document.getElementById("instaGrid");
  const modal = document.getElementById("instaModal");
  if (!grid || !modal) return;

  renderInstaGrid(INSTAGRAM_POSTS);

  // Filter tabs for instagram gallery
  const filterBtns = document.querySelectorAll(".insta-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-insta-filter");

      if (filter === "all") {
        renderInstaGrid(INSTAGRAM_POSTS);
      } else {
        const filtered = INSTAGRAM_POSTS.filter(p => p.category === filter);
        renderInstaGrid(filtered);
      }
    });
  });

  // Modal navigation
  const closeBtn = modal.querySelector(".modal-close-btn");
  const prevBtn = modal.querySelector(".insta-prev-btn");
  const nextBtn = modal.querySelector(".insta-next-btn");
  const likeBtn = modal.querySelector(".like-btn");

  closeBtn.addEventListener("click", () => closeModal(modal));
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal(modal);
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentInstaIndex = (currentInstaIndex - 1 + INSTAGRAM_POSTS.length) % INSTAGRAM_POSTS.length;
      updateInstaModal(INSTAGRAM_POSTS[currentInstaIndex]);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentInstaIndex = (currentInstaIndex + 1) % INSTAGRAM_POSTS.length;
      updateInstaModal(INSTAGRAM_POSTS[currentInstaIndex]);
    });
  }

  if (likeBtn) {
    likeBtn.addEventListener("click", () => {
      const isLiked = likeBtn.classList.toggle("liked");
      const post = INSTAGRAM_POSTS[currentInstaIndex];
      const likesCountSpan = modal.querySelector(".insta-likes-count");
      if (isLiked) {
        post.likes += 1;
      } else {
        post.likes -= 1;
      }
      likesCountSpan.textContent = `${post.likes} mentions J'aime`;
    });
  }

  // Keyboard navigation
  window.addEventListener("keydown", e => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeModal(modal);
    if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
    if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
  });
}

function renderInstaGrid(posts) {
  const grid = document.getElementById("instaGrid");
  if (!grid) return;

  grid.innerHTML = posts
    .map((post, idx) => {
      return `
      <div class="insta-card" data-post-id="${post.id}" tabindex="0" role="button" aria-label="Voir la publication Instagram">
        <img class="insta-card-img" src="${post.img}" alt="${post.alt}" loading="lazy">
        <div class="insta-card-overlay">
          <div class="insta-card-top">
            <span class="insta-card-category">${post.category}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </div>
          <div class="insta-card-content">
            <p class="insta-card-caption-preview">${post.caption}</p>
            <div class="insta-card-metrics">
              <span class="insta-card-metric">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                ${post.likes}
              </span>
              <span class="insta-card-metric">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                ${post.comments}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  // Attach click handlers
  grid.querySelectorAll(".insta-card").forEach(card => {
    card.addEventListener("click", () => {
      const postId = parseInt(card.getAttribute("data-post-id"));
      const postIdx = INSTAGRAM_POSTS.findIndex(p => p.id === postId);
      if (postIdx !== -1) {
        currentInstaIndex = postIdx;
        const modal = document.getElementById("instaModal");
        updateInstaModal(INSTAGRAM_POSTS[currentInstaIndex]);
        openModal(modal);
      }
    });

    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });
}

function updateInstaModal(post) {
  const modal = document.getElementById("instaModal");
  if (!modal) return;

  const modalImg = modal.querySelector(".insta-modal-img");
  const modalCaption = modal.querySelector(".insta-modal-caption");
  const likesCountSpan = modal.querySelector(".insta-likes-count");
  const dateSpan = modal.querySelector(".insta-post-date");
  const tagsContainer = modal.querySelector(".insta-modal-tags");
  const likeBtn = modal.querySelector(".like-btn");

  modalImg.src = post.img;
  modalImg.alt = post.alt;
  modalCaption.textContent = post.caption;
  likesCountSpan.textContent = `${post.likes} mentions J'aime`;
  dateSpan.textContent = post.date;

  if (tagsContainer) {
    tagsContainer.innerHTML = post.tags.map(t => `<span style="color: var(--terracotta); margin-right: 6px; font-weight: 500;">${t}</span>`).join(" ");
  }

  if (likeBtn) {
    likeBtn.classList.remove("liked");
  }
}

/* ==========================================================================
   6. Seasonal Calendar Tabs & Data
   ========================================================================== */
const SEASONS_DATA = {
  printemps: {
    period: "Mars • Avril • Mai",
    name: "L'Éveil Fleuri du Printemps",
    flowers: [
      { icon: "🌸", name: "Pivoine", origin: "Producteurs du Var & Drôme" },
      { icon: "🌷", name: "Tulipe Française", origin: "Région Auvergne-Rhône-Alpes" },
      { icon: "🌺", name: "Renoncule Clovis", origin: "Côte d'Azur & Provence" },
      { icon: "🌿", name: "Lilas & Pois de Senteur", origin: "Jardins de la Loire" }
    ],
    tip: "Le printemps célèbre l'explosion des couleurs pastel et des parfums délicats. C'est la pleine saison des pivoines françaises qui font vibrer la boutique !"
  },
  ete: {
    period: "Juin • Juillet • Août",
    name: "La Féerie Ensoleillée de l'Été",
    flowers: [
      { icon: "🌻", name: "Tournesol", origin: "Champs du Rhône & Isère" },
      { icon: "🏵️", name: "Dahlia de Collection", origin: "Producteurs locaux Drômois" },
      { icon: "🌾", name: "Hortensia Champêtre", origin: "Pépinières de proximité" },
      { icon: "🌿", name: "Lavande & Cosmos", origin: "Provence & Terres du Sud" }
    ],
    tip: "En été, les dahlias sont les rois de nos bouquets de mariée et de nos créations quotidiennes. Leurs facettes de couleurs réchauffent chaque pièce !"
  },
  automne: {
    period: "Septembre • Octobre • Novembre",
    name: "Les Teintes Chaudes de l'Automne",
    flowers: [
      { icon: "🍁", name: "Chrysanthème Vienna", origin: "Horticulture locale durable" },
      { icon: "🎃", name: "Coloquinte Fleurie", origin: "Maraîchers régionaux" },
      { icon: "🌾", name: "Graminées & Épis", origin: "Cueillies dans la région" },
      { icon: "🍂", name: "Eucalyptus & Branchages", origin: "Forêts & vergers français" }
    ],
    tip: "Oubliez les clichés sur le chrysanthème : les variétés Vienna Cooper, Momoko ou Santini sont spectaculaires, sculpturales et durent jusqu'à 3 semaines !"
  },
  hiver: {
    period: "Décembre • Janvier • Février",
    name: "La Douceur Poétique de l'Hiver",
    flowers: [
      { icon: "🌼", name: "Mimosa Sauvage", origin: "Collines du Massif du Tanneron" },
      { icon: "❄️", name: "Hellébore (Rose de Noël)", origin: "Producteurs d'Auvergne" },
      { icon: "🌾", name: "Fleurs Séchées du Grenier", origin: "Atelier Parenthèse Florale" },
      { icon: "🌲", name: "Pin, Cèdre & Amaryllis", origin: "Cultures françaises protégées" }
    ],
    tip: "Pas de roses importées par avion chez nous en hiver ! Nous sublimons le mimosa d'or, les hellébores sauvages et nos magnifiques fleurs séchées locales."
  }
};

function initSeasonTabs() {
  const tabs = document.querySelectorAll(".season-tab-btn");
  const periodEl = document.getElementById("seasonPeriod");
  const titleEl = document.getElementById("seasonName");
  const flowersGrid = document.getElementById("seasonFlowersGrid");
  const tipEl = document.getElementById("seasonTip");

  if (!tabs.length || !periodEl) return;

  function renderSeason(seasonKey) {
    const data = SEASONS_DATA[seasonKey];
    if (!data) return;

    periodEl.textContent = data.period;
    titleEl.textContent = data.name;
    tipEl.textContent = data.tip;

    flowersGrid.innerHTML = data.flowers
      .map(
        f => `
      <div class="season-flower-card">
        <div class="season-flower-icon">${f.icon}</div>
        <div class="season-flower-name">${f.name}</div>
        <div class="season-flower-origin">${f.origin}</div>
      </div>
    `
      )
      .join("");
  }

  // Initial render (Automne or current season)
  const currentMonth = new Date().getMonth(); // 0 to 11
  let defaultSeason = "automne";
  if (currentMonth >= 2 && currentMonth <= 4) defaultSeason = "printemps";
  else if (currentMonth >= 5 && currentMonth <= 7) defaultSeason = "ete";
  else if (currentMonth >= 8 && currentMonth <= 10) defaultSeason = "automne";
  else defaultSeason = "hiver";

  tabs.forEach(t => {
    if (t.getAttribute("data-season") === defaultSeason) {
      t.classList.add("active");
    } else {
      t.classList.remove("active");
    }
  });
  renderSeason(defaultSeason);

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
      const season = btn.getAttribute("data-season");
      renderSeason(season);
    });
  });
}

/* ==========================================================================
   7. Workshop Bookings & Form Pre-fill
   ========================================================================== */
function initWorkshopBookings() {
  document.querySelectorAll("[data-book-workshop]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const workshopTitle = btn.getAttribute("data-book-workshop");
      const select = document.getElementById("serviceSelect");
      const msg = document.getElementById("messageInput");
      const contactSection = document.getElementById("contact");

      if (select) {
        select.value = "ateliers";
      }
      if (msg) {
        msg.value = `Bonjour Marion, je souhaite réserver ma place pour l'atelier "${workshopTitle}". Merci de me confirmer les modalités !`;
      }
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/* ==========================================================================
   8. Contact & Quote Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("quoteContactForm");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = form.querySelector("#nameInput").value.trim();
    const email = form.querySelector("#emailInput").value.trim();
    const service = form.querySelector("#serviceSelect").value;
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!name || !email) {
      showToast("Veuillez renseigner votre nom et votre adresse email.");
      return;
    }

    // Button loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="0.85"></path></svg>
      Envoi en cours...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      showToast(`Merci ${name} ! Votre demande pour "${service || "votre projet floral"}" a bien été transmise à Marion.`);
    }, 1100);
  });
}

/* ==========================================================================
   9. Modal Helpers & Toast Notification
   ========================================================================== */
function openModal(modal) {
  if (!modal) return;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function showToast(message) {
  let toast = document.querySelector(".toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast-notification";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-gold); flex-shrink: 0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <div>
      <div style="font-weight: 600; font-size: 0.92rem;">Parenthèse Florale</div>
      <div style="font-size: 0.84rem; opacity: 0.9;">${message}</div>
    </div>
  `;

  toast.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, 4800);
}

/* ==========================================================================
   10. Smooth Scroll for Anchor Links
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

// Keyframe animation for spinner
const style = document.createElement("style");
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
