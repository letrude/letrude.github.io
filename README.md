# Portfolio - Ange GRIMAUD 👨‍💻

![React](https://img.shields.io/badge/React-19.0-blue?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.0-purple?logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-FIBER-black?logo=three.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

Bienvenue sur le dépôt de mon **Portfolio Interactif**. Ce projet est une vitrine de mes compétences, combinant une expérience utilisateur immersive en 3D avec une interface web moderne et accessible.

🔗 **Démo en ligne** : [ange-grimaud.fr](https://ange-grimaud.fr)

---

## 🌟 À propos du projet

Ce portfolio a été conçu pour offrir deux expériences de navigation distinctes :

1.  **🌍 Mode Expérience (3D)** : Une expérience immersive où l'utilisateur navigue dans un environnement 3D (développé avec **Three.js** et **React Three Fiber**). Chaque élément du décor représente une section de mon parcours.
2.  **📄 Mode Classique** : Une interface web traditionnelle, épurée et réactive, pour une lecture rapide et efficace des informations.

L'objectif est de démontrer une maîtrise technique à la fois dans le développement web "classique" et dans la création d'expériences graphiques avancées.

---

## ✨ Fonctionnalités Clés

- **Switch Mode** : Passez instantanément du mode 3D au mode Classique.
- **Support Mobile** : Interface responsive adaptée aux écrans tactiles.
- **Dark/Light Mode** : Gestion des thèmes intégrée.
- **Multilingue** : Changement de langue dynamique & intégrale.
- **Animations** : Transitions fluides entre les pages et les états.

---

## 🛠️ Stack Technique

Ce projet utilise les dernières technologies de l'écosystème React :

### Core

- **[React 19](https://react.dev/)** : Bibliothèque UI principale.
- **[Vite](https://vitejs.dev/)** : Bundler ultra-rapide pour le développement.
- **[Zustand](https://github.com/pmndrs/zustand)** : Gestionnaire d'état global léger et performant.

### 3D & Graphisme

- **[Three.js](https://threejs.org/)** : Moteur 3D.
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)** : Réconciliateur React pour Three.js.
- **[@react-three/drei](https://github.com/pmndrs/drei)** : Collection d'aides et d'abstractions pour R3F.
- **[@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing)** : Effets de post-traitement.

### UI & Animations

- **[Framer Motion](https://www.framer.com/motion/)** : Bibliothèque d'animations pour React.
- **[CSS](https://developer.mozilla.org/fr/docs/Web/CSS)** : Gestion des styles globaux et dynamiques.

### Qualité de Code

- **[ESLint](https://eslint.org/)** : Linter pour assurer la qualité du code.

---

## 📂 Structure du Projet

L'architecture du projet est organisée par fonctionnalités (`features`) pour une meilleure maintenabilité :

```bash
├── 📁 public
│   ├── 📁 character
│   │   ├── 📄 animations.glb
│   │   ├── 📄 idle.glb
│   │   └── 📄 skin.glb
│   ├── 📁 cursors
│   │   ├── 📄 arrow.cur
│   │   └── 📄 hand.cur
│   ├── 📁 fonts
│   │   └── 📄 PersonalFont.ttf
│   ├── 📁 images
│   │   ├── 🖼️ ange.jpeg
│   │   └── 🖼️ kimono.png
│   ├── 📁 models
│   │   ├── 📁 buildings
│   │   │   ├── 📄 fountain.glb
│   │   │   ├── 📄 house.glb
│   │   │   ├── 📄 runeStone.glb
│   │   │   ├── 📄 tower.glb
│   │   │   └── 📄 treeStump.glb
│   │   ├── 📁 nature
│   │   │   ├── 📄 bush.glb
│   │   │   ├── 📄 rock.glb
│   │   │   └── 📄 tree.glb
│   │   └── 📁 props
│   │       └── 📄 sign.glb
│   ├── 📁 pdf
│   │   └── 📕 CV_Ange_GRIMAUD.pdf
│   ├── 📁 sounds
│   │   └── 🎵 background_music.mp3
│   ├── 📁 textures
│   │   └── 🖼️ grass.jpg
│   └── 📄 CNAME
├── 📁 src
│   ├── 📁 components
│   │   ├── 📁 books
│   │   │   ├── 📄 ProjectPage.jsx
│   │   │   ├── 📄 SkillsPage.jsx
│   │   │   └── 📄 TextPage.jsx
│   │   ├── 📁 classic
│   │   │   ├── 📄 ContactCard.jsx
│   │   │   ├── 📄 ProjectCard.jsx
│   │   │   └── 📄 SkillBar.jsx
│   │   ├── 📁 common
│   │   │   ├── 📄 KeyCap.jsx
│   │   │   ├── 📄 LanguageSwitchButton.jsx
│   │   │   └── 📄 ThemeSwitch.jsx
│   │   └── 📁 layout
│   │       ├── 📄 LoadingScreen.jsx
│   │       └── 📄 UI.jsx
│   ├── 📁 data
│   │   └── 📄 content.js
│   ├── 📁 features
│   │   ├── 📁 classic
│   │   │   └── 📄 ClassicPortfolio.jsx
│   │   ├── 📁 menu
│   │   │   └── 📄 MainMenu.jsx
│   │   └── 📁 world
│   │       ├── 📄 Effects.jsx
│   │       ├── 📄 Environment.jsx
│   │       ├── 📄 GameScene.jsx
│   │       ├── 📄 Player.jsx
│   │       └── 📄 World.jsx
│   ├── 📁 hooks
│   │   └── 📄 useIsMobile.js
│   ├── 📁 store
│   │   └── 📄 useStore.js
│   ├── 📁 styles
│   │   └── 🎨 index.css
│   ├── 📄 App.jsx
│   └── 📄 main.jsx
├── ⚙️ .gitignore
├── 📝 README.md
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── 📄 vite.config.js
```

---

## 🚀 Installation et Démarrage

Pour lancer ce projet localement, suivez ces étapes :

### Prérequis

- Node.js (v18+ recommandé)
- npm ou yarn

### Étapes

1.  **Cloner le dépôt**

    ```bash
    git clone https://github.com/Letrude/letrude.github.io.git
    cd letrude.github.io
    ```

2.  **Installer les dépendances**

    ```bash
    npm install
    ```

3.  **Lancer le serveur de développement**

    ```bash
    npm run dev
    ```

    L'application sera accessible à l'adresse `http://localhost:5173`.

4.  **Construire pour la production**
    ```bash
    npm run build
    ```

---

## 📬 Contact

**Ange GRIMAUD** - Développeur Fullstack

- 📧 Email : [ange.grimaud@etu.uca.fr](mailto:ange.grimaud@etu.uca.fr)
- 💼 LinkedIn : [Ange GRIMAUD](https://www.linkedin.com/in/ange-grimaud-95a24b38b/)
- 🐙 GitHub : [letrude](https://github.com/letrude/)

---

_Fait avec ❤️ et beaucoup de café ☕_
