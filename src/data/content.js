const translations = {
  fr: {
    menu: {
      title: "DÉVELOPPEUR INFORMATIQUE",
      enter3d: "🎮 EXPÉRIENCE 3D",
      enter3dDesc: "Explorez mon univers interactif",
      enter2d: "📄 PORTFOLIO CLASSIQUE",
      keyboardReq: "⚠️ Clavier requis (PC)",
      enter2dDesc: "Version sobre et épurée",
      choose: "Choisissez votre expérience pour commencer",
      loading: "Chargement de l'application...",
    },
    ui: {
      contact: "CONTACT",
      classic: "PORTFOLIO CLASSIQUE",
      enter: "Entrer",
      space: "ESPACE",
      discovered: "Lieu découvert",
      experience3d: "EXPÉRIENCE 3D",
      move: "SE DÉPLACER",
      prev: "Précédent",
      next: "Suivant",
      navHelp: "Utilisez les flèches\nou Q/D pour naviguer",
      loading: "Chargement du monde",
      init: "Initialisation...",
      download: "Téléchargement des ressources...",
      compiling: "Compilation des shaders & Préchauffage GPU...",
      viewCode: "Voir le code",
      launching: "Lancement...",
      backToMenu: "MENU PRINCIPAL",
    },
    zones: {
      Propos: {
        title: "À Propos",
        pages: [
          {
            type: "text",
            content:
              "👋 À propos de moi\n\nDéterminé et passionné, j'aime explorer de nouveaux horizons et repousser mes limites. Que ce soit en informatique, en sport ou à travers divers projets, chaque expérience est une occasion d'apprendre et de progresser.\n\nDécouvrez mon parcours et ce qui me motive au quotidien !",
          },
          {
            type: "text",
            content:
              "👨‍💻 Qui suis-je ?\n\nJe m'appelle Ange GRIMAUD, je suis actuellement étudiant en deuxième année de BUT informatique à Aubière (63) dans le but de devenir informaticien.\n\nJ'ai pu acquérir des compétences dans le développement de sites web, la gestion de bases de données ainsi que dans la programmation d'algorithmes.",
          },
          {
            type: "text",
            content:
              "🚀 Ma Philosophie\n\nJe suis quelqu'un d'assez déterminé et persévérant, toujours en étant en quête d'amélioration. La curiosité me pousse à découvrir et m'informer sur de nouvelles technologies, tandis que la rigueur me pousse à me donner à fond dans toutes circonstances.\n\nPour moi, le travail et l'apprentissage sont des processus continus dans lesquels on doit apprendre de chaque erreur pour s'améliorer et chaque défi permet de repousser ses limites.",
          },
          {
            type: "text",
            content:
              "🎯 Mon Objectif\n\nJe suis à la recherche d'un stage de 10 semaines à partir du 6 avril 2026, dans la création et le développement de sites web ou d'applications.\n\nMon but est de devenir un développeur compétent capable de trouver des solutions performantes et adaptées.",
          },
        ],
      },
      Projets: {
        title: "Mes Projets",
        pages: [
          {
            type: "project",
            title: "🌍 Portfolio 3D/2D Optimisé",
            tech: "React / Three.js / R3F / Framer Motion",
            desc: "Développement d'un portfolio bimodal offrant une expérience interactive en 3D et une version classique et épurée (2D), garantissant accessibilité, fluidité et originalité.",
            details:
              "Projet personnel mené sur 105 heures, centré sur l'optimisation de l'expérience utilisateur (UX) et des performances. J'ai consacré une phase d'étude et d'analyse approfondie, documentant chaque détail et recherchant les meilleures pratiques pour garantir un rendu fluide et agréable, notamment l'intégration du 3D temps réel (R3F) et la finesse des animations (Framer Motion). Ce travail démontre ma rigueur dans la conception d'interfaces avancées.",
            link: "https://github.com/letrude/letrude.github.io",
          },
          {
            type: "project",
            title: "♟️ Quarto",
            tech: "C# / .NET / XAML",
            desc: "Application de bureau Windows du jeu de stratégie Quarto. Projet universitaire (SAÉ) de 4 mois axé sur l'architecture logicielle.",
            details:
              "Rôle : Développeur et Chef de projet. L'application intègre une interface utilisateur en XAML, une séparation Modèle-Vue, la sérialisation des parties et des tests unitaires validés par intégration continue.",
            link: "https://github.com/letrude/Quarto",
          },
          {
            type: "project",
            title: "⚔️ Knights-Arena",
            tech: "Langage C",
            desc: "Un jeu de combat stratégique (Pierre-Feuille-Ciseaux) développé en binôme sur 40h. L'objectif était de comparer différentes approches algorithmiques.",
            details:
              "Projet de première année de BUT. J'ai principalement travaillé sur la gestion des entités 'chevaliers', la mise en place du système de sauvegarde des parties et l'optimisation des algorithmes de tri et de recherche au sein des structures de données.",
            link: "https://github.com/letrude/Knights-Arena",
          },
          {
            type: "project",
            title: "📋 Gestion de Stages",
            tech: "Langage C",
            desc: "Application complète permettant de gérer le cycle de vie des stages : offres, candidatures, affectation automatique et notation.",
            details:
              "Réalisé en binôme (30h). J'ai eu la charge de la gestion rigoureuse des données (fichiers), de l'implémentation du système de candidatures et de l'optimisation des algorithmes pour le traitement et l'affectation des étudiants.",
            link: "https://github.com/letrude/Gestion_de_stages",
          },
          {
            type: "project",
            title: "🍉 Le Jeu de la Pastèque",
            tech: "Python",
            desc: "Reproduction du célèbre 'Suika Game'. Un projet personnel autodidacte pour explorer la création d'interfaces graphiques et la logique ludique.",
            details:
              "Ce projet m'a poussé à faire des recherches techniques approfondies pour maîtriser de nouvelles bibliothèques Python. Il démontre ma capacité à mener un projet de A à Z : de la compréhension de la logique de jeu à l'interface utilisateur finale.",
            link: "https://github.com/letrude/jeu_de_la_pasteque",
          },
        ],
      },
      Competences: {
        title: "Mes Compétences",
        pages: [
          {
            type: "text",
            content:
              "🛠️ Mes Compétences\n\nAu cours de ma formation et de mes projets personnels, j'ai acquis une base solide dans plusieurs domaines.\n\nCe qui m'intéresse, c'est la polyvalence : être capable de concevoir une base de données robuste, de développer la logique métier en back-end, et de créer une interface agréable en front-end.",
          },
          {
            type: "text",
            content:
              "💯 Notation\n\nLe système de notation se base sur les notes que j'ai pu avoir durant ma scolarité et de ce que les professeurs attendaient de moi. 100% ne signifie pas que je maitrise à 100% une compétence mais que j'ai répondu entièrement aux attentes de mes professeurs.",
          },
          {
            type: "skills",
            category: "💻 Front-end, Back-end & SGBD",
            items: [
              { name: "HTML", level: 90 },
              { name: "CSS", level: 90 },
              { name: "JavaScript", level: 80 },
              { name: "PHP", level: 75 },
              { name: "PostgreSQL / SQL", level: 80 },
              { name: "MCD / MLD", level: 85 },
            ],
          },
          {
            type: "skills",
            category: "⚙️ Language Système & Versioning",
            items: [
              { name: "Python", level: 90 },
              { name: "C", level: 85 },
              { name: "C++", level: 80 },
              { name: "Linux / Bash", level: 80 },
              { name: "Git / GitHub", level: 80 },
              { name: "Visual Studio Code", level: 85 },
            ],
          },
        ],
      },
      Parcours: {
        title: "Mon Parcours",
        pages: [
          {
            type: "text",
            content:
              "🎓 Parcours Scolaire\n\nAprès l'obtention de mon baccalauréat général avec mention, j'ai choisi de continuer mes études en me dirigeant vers un BUT informatique.\n\nCe qui m'a particulièrement attiré dans cette formation, c'est d'apprendre de A à Z comment concevoir et développer des sites web ainsi que des applications.",
          },
          {
            type: "text",
            content:
              "📚 La Formation BUT\n\nCe qui est intéressant en suivant ce cursus, c'est qu'on nous enseigne une grande variété de langages de programmation et de notions essentielles pour acquérir des compétences variées et solides.\n\nL'informatique étant un domaine en constante évolution, il permet de toujours avoir des défis à relever.",
          },
          {
            type: "text",
            content:
              "🏫 2024 - Aujourd'hui\n\nBUT Informatique\nIUT d'Aubière (63)\n\nApprentissage approfondi du développement, des systèmes d'exploitation et des réseaux. Je souhaite devenir un développeur compétent capable de trouver des solutions performantes.",
          },
          {
            type: "text",
            content:
              "🏫 2021 - 2024\n\nBaccalauréat Général\nClermont-Ferrand (63)\n\nMention Assez Bien.\nSpécialités : Mathématiques et Numérique & Sciences Informatiques (NSI).",
          },
        ],
      },
      Loisirs: {
        title: "Mes Loisirs",
        pages: [
          {
            type: "text",
            content:
              "🥋 Judo : Une école de rigueur\n\nBien plus qu'un sport, le judo a façonné ma personnalité. Pratiquant depuis mes 5 ans (14 ans d'expérience), l'obtention de ma Ceinture Noire à 16 ans a été la concrétisation d'un travail de longue haleine.\n\nJ'ai eu l'opportunité de tester mes limites lors de stages intensifs internationaux (Croatie, Italie). Ces expériences m'ont enseigné que la progression passe par la répétition, l'humilité et la capacité à se relever après chaque chute. Une rigueur que j'applique aujourd'hui dans mes études.",
          },
          {
            type: "text",
            content:
              "🧠 Logique & Stratégie\n\n🎲 Rubik's Cube : Mon record de 56s est le résultat d'un entraînement méthodique. Ce qui me passionne, c'est la reconnaissance de motifs (patterns) pour appliquer instantanément l'algorithme le plus efficient, une démarche purement logique.\n\n♟️ Échecs : Un exercice complet d'anticipation. Chaque partie m'oblige à calculer plusieurs coups à l'avance, à évaluer les risques et à adapter ma stratégie en temps réel. C'est l'entraînement idéal pour la prise de décision complexe.",
          },
          {
            type: "text",
            content:
              "🎯 Précision & Exploration\n\n🎳 Bowling : Un sport d'exigence et de régularité. J'apprécie l'analyse technique nécessaire pour s'adapter à la piste et la concentration requise pour reproduire le geste parfait à chaque lancer.\n\n🎮 Tunic : Ce jeu m'a fasciné par son mystère. Sans aucun texte lisible ni guide, j'ai dû décrypter les règles et comprendre le monde par l'observation et la déduction. C'est une expérience qui valorise la curiosité et la persévérance face à l'inconnu, des qualités essentielles en développement.",
          },
        ],
      },
      Contact: {
        title: "Me Contacter",
        pages: [
          {
            type: "contact_card",
            title: "Email",
            value: "ange.grimaud@etu.uca.fr",
            link: "mailto:ange.grimaud@etu.uca.fr",
            icon: "📧",
          },
          {
            type: "contact_card",
            title: "LinkedIn",
            value: "Ange GRIMAUD",
            link: "https://www.linkedin.com/in/ange-grimaud-95a24b38b/",
            icon: "💼",
          },
          {
            type: "contact_card",
            title: "GitHub",
            value: "letrude",
            link: "https://github.com/letrude/",
            icon: "🐙",
          },
          {
            type: "cv_download",
            title: "Mon CV",
            desc: "Télécharger au format PDF",
          },
        ],
      },
    },
  },
  en: {
    menu: {
      title: "SOFTWARE DEVELOPER",
      enter3d: "🎮 3D EXPERIENCE",
      enter3dDesc: "Explore my interactive world",
      enter2d: "📄 CLASSIC PORTFOLIO",
      keyboardReq: "⚠️ Keyboard required (PC)",
      enter2dDesc: "Clean and simple version",
      choose: "Choose your experience to start",
      loading: "Loading application...",
    },
    ui: {
      contact: "CONTACT",
      classic: "CLASSIC PORTFOLIO",
      enter: "Enter",
      space: "SPACE",
      discovered: "Location Discovered",
      experience3d: "3D EXPERIENCE",
      move: "MOVE",
      prev: "Previous",
      next: "Next",
      navHelp: "Use arrows\nor W/D to navigate",
      loading: "Loading World",
      init: "Initializing...",
      download: "Downloading resources...",
      compiling: "Compiling shaders & Warming up GPU...",
      viewCode: "View Code",
      launching: "Launching...",
      backToMenu: "MAIN MENU",
    },
    zones: {
      Propos: {
        title: "About Me",
        pages: [
          {
            type: "text",
            content:
              "👋 About Me\n\nDetermined and passionate, I enjoy exploring new horizons and pushing my limits. Whether in IT, sports or through various projects, every experience is an opportunity to learn and progress.\n\nFind out more about my education and what motivates me every day!",
          },
          {
            type: "text",
            content:
              "👨‍💻 Who am I?\n\nMy name is Ange GRIMAUD, I am currently a second-year student in a University Bachelor of Technology (BUT) in Computer Science in Aubière (63), aiming to become a software engineer.\n\nI have acquired skills in web development, database management, and algorithm programming.",
          },
          {
            type: "text",
            content:
              "🚀 My Philosophy\n\nI am a fairly determined and persevering person, always striving for improvement. Curiosity drives me to discover and learn about new technologies, while rigour drives me to give my all in all circumstances.\n\nFor me, work and learning are ongoing processes in which you have to learn from every mistake in order to improve, and every challenge allows you to push your limits.",
          },
          {
            type: "text",
            content:
              "🎯 My Goal\n\nI am looking for a 10-week internship starting on 6 April 2026, in web or application creation and development.\n\nMy goal is to become a competent developer capable of finding efficient and adapted solutions.",
          },
        ],
      },
      Projets: {
        title: "My Projects",
        pages: [
          {
            type: "project",
            title: "🌍 Optimized 3D/2D Portfolio",
            tech: "React / Three.js / R3F / Framer Motion",
            desc: "Development of a dual-mode portfolio, offering both an interactive 3D experience and a clean, classic 2D version, ensuring accessibility, fluidity, and originality.",
            details:
              "Personal project spanning 105 hours, focused on optimizing user experience (UX) and performance. I conducted an in-depth study and analysis phase, documenting every detail and researching best practices to ensure smooth, pleasant rendering, notably the integration of real-time 3D (R3F) and the subtlety of animations (Framer Motion). This work showcases my rigor in designing advanced interfaces.",
            link: "https://github.com/letrude/letrude.github.io",
          },
          {
            type: "project",
            title: "♟️ Quarto",
            tech: "C# / .NET / XAML",
            desc: "Windows desktop application of the strategy game Quarto. 4-month university project focused on software architecture.",
            details:
              "Role: Developer and Project Manager. The application integrates a XAML user interface, Model-View separation, game serialization, and unit tests validated by continuous integration.",
            link: "https://github.com/letrude/Quarto",
          },
          {
            type: "project",
            title: "⚔️ Knights-Arena",
            tech: "C Language",
            desc: "A strategic combat game (Rock-Paper-Scissors) developed in a pair over 40 hours. The goal was to compare different algorithmic approaches.",
            details:
              "First-year project. I mainly worked on managing 'knight' entities, implementing the game save system, and optimizing sorting and search algorithms within data structures.",
            link: "https://github.com/letrude/Knights-Arena",
          },
          {
            type: "project",
            title: "📋 Internship Management",
            tech: "C Language",
            desc: "Complete application to manage the internship lifecycle: offers, applications, automatic assignment, and grading.",
            details:
              "Made in a pair (30h). I was in charge of rigorous data management (files), implementing the application system, and optimizing algorithms for processing and assigning students.",
            link: "https://github.com/letrude/Gestion_de_stages",
          },
          {
            type: "project",
            title: "🍉 Watermelon Game",
            tech: "Python",
            desc: "Reproduction of the famous 'Suika Game'. A self-taught personal project to explore GUI creation and game logic.",
            details:
              "This project pushed me to do in-depth technical research to master new Python libraries. It demonstrates my ability to lead a project from A to Z: from understanding game logic to the final user interface.",
            link: "https://github.com/letrude/jeu_de_la_pasteque",
          },
        ],
      },
      Competences: {
        title: "My Skills",
        pages: [
          {
            type: "text",
            content:
              "🛠️ My Skills\n\nDuring my education and personal projects, I have acquired a solid foundation in several areas.\n\nWhat interests me is versatility: being able to design a robust database, develop business logic in the back-end, and create a pleasant interface in the front-end.",
          },
          {
            type: "text",
            content:
              "💯 Rating\n\nThe grading system is based on the grades I received during my schooling and what teachers expected of me. 100% does not mean I have mastered a skill 100%, but that I fully met my teachers' expectations.",
          },
          {
            type: "skills",
            category: "💻 Front-end, Back-end & Databases",
            items: [
              { name: "HTML", level: 90 },
              { name: "CSS", level: 90 },
              { name: "JavaScript", level: 80 },
              { name: "PHP", level: 75 },
              { name: "PostgreSQL / SQL", level: 80 },
              { name: "MCD / MLD", level: 85 },
            ],
          },
          {
            type: "skills",
            category: "⚙️ System Languages & Version Control",
            items: [
              { name: "Python", level: 90 },
              { name: "C", level: 85 },
              { name: "C++", level: 80 },
              { name: "Linux / Bash", level: 80 },
              { name: "Git / GitHub", level: 80 },
              { name: "VS Code", level: 85 },
            ],
          },
        ],
      },
      Parcours: {
        title: "Education",
        pages: [
          {
            type: "text",
            content:
              "🎓 Academic Background\n\nAfter obtaining my general baccalaureate with honors, I chose to continue my studies by heading towards a BUT in Computer Science.\n\nWhat particularly attracted me to this training is learning from A to Z how to design and develop websites and applications.",
          },
          {
            type: "text",
            content:
              "📚 The BUT Training\n\nWhat is interesting about following this curriculum is that we are taught a wide variety of programming languages and essential concepts to acquire varied and solid skills.\n\nComputer science being a constantly evolving field, it allows for always having challenges to take on.",
          },
          {
            type: "text",
            content:
              "🏫 2024 - Today\n\nBUT Computer Science\nIUT d'Aubière (63)\n\nIn-depth learning of development, operating systems, and networks. I wish to become a competent developer capable of finding efficient solutions.",
          },
          {
            type: "text",
            content:
              "🏫 2021 - 2024\n\nGeneral Baccalaureate\nClermont-Ferrand (63)\n\nWith Honors.\nSpecialties: Mathematics and Digital & Computer Sciences (NSI).",
          },
        ],
      },
      Loisirs: {
        title: "Hobbies",
        pages: [
          {
            type: "text",
            content:
              "🥋 Judo: A School of Rigor\n\nMuch more than just a sport, judo has shaped my personality. Practising since I was 5 years old (14 years of experience), obtaining my black belt at 16 was the culmination of a long journey.\n\nI had the opportunity to test my limits during intensive international training courses (Croatia, Italy). These experiences taught me that progress comes through repetition, humility and the ability to get back up after every fall. I now apply this rigour to my studies.",
          },
          {
            type: "text",
            content:
              "🧠 Logic & Strategy\n\n🎲 Rubik's Cube: My record of 56s is the result of methodical training. What fascinates me is pattern recognition to instantly apply the most efficient algorithm, a purely logical approach.\n\n♟️ Chess: A complete exercise in anticipation. Each game forces me to calculate several moves ahead, evaluate risks, and adapt my strategy in real-time. It's the ideal training for complex decision-making.",
          },
          {
            type: "text",
            content:
              "🎯 Precision & Exploration\n\n🎳 Bowling: A sport of requirement and regularity. I appreciate the technical analysis necessary to adapt to the lane and the concentration required to reproduce the perfect gesture at each throw.\n\n🎮 Tunic: This game fascinated me with its mystery. Without any readable text or guide, I had to decipher the rules and understand the world through observation and deduction. It is an experience that values curiosity and perseverance in the face of the unknown, essential qualities in development.",
          },
        ],
      },
      Contact: {
        title: "Contact Me",
        pages: [
          {
            type: "contact_card",
            title: "Email",
            value: "ange.grimaud@etu.uca.fr",
            link: "mailto:ange.grimaud@etu.uca.fr",
            icon: "📧",
          },
          {
            type: "contact_card",
            title: "LinkedIn",
            value: "Ange GRIMAUD",
            link: "https://www.linkedin.com/in/ange-grimaud-95a24b38b/",
            icon: "💼",
          },
          {
            type: "contact_card",
            title: "GitHub",
            value: "letrude",
            link: "https://github.com/letrude/",
            icon: "🐙",
          },
          {
            type: "cv_download",
            title: "My CV",
            desc: "Download as PDF",
          },
        ],
      },
    },
  },
};

export default translations;
