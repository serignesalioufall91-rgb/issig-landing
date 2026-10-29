# CHANGELOG

## [v1.1.0] - 2026-10-29

### ✨ Ajouts
- Nouvelle page `formations.html` : catalogue des formations académiques (Informatique : 8, Gestion : 4) avec navigation par onglets
- Onglet Sciences commerciales avec message « bientôt disponible » (en attente de validation des formations)
- Section « Formations modulaires » : 10 formations courtes avec durée et prix
- Boutons « Postuler » sur toutes les cartes, qui ouvrent le formulaire de candidature
- Présélection automatique de la formation choisie dans le formulaire (attribut `data-formation`)
- Pied de page et formulaire de candidature sur la page formations
- Aperçu des formations sur l'accueil (3 cartes) avec le bouton « Voir toutes nos formations »

### 🎨 Améliorations
- Menu « Filière » du formulaire aligné sur le vrai catalogue (22 formations), sur l'accueil et sur la page formations
- Style des boutons « Postuler » harmonisé
- Liens vers la page formations ouverts dans un nouvel onglet
- Actualité « Intelligence Artificielle » : mention « Formation à venir », lien vers la page formations prêt mais masqué
- Plus de liens vides : actualité « Remise des diplômes » et icônes de réseaux sociaux sans lien en attendant les vraies pages
- Lien téléphone au format international (+221)

### 🔧 Corrections
- Erreur JavaScript sur la page formations : le code du formulaire ne s'exécute que si le formulaire existe sur la page
- Structure HTML de `formations.html` (balises mal fermées, `id` en double, contenu placé après `</html>`)
- Liens du pied de page de `formations.html` vers les sections de l'accueil
- Suppression du code des anciens onglets de l'accueil

## [v1.0.0] - 2026-07-14

### ✨ Ajouts
- Création de la Landing Page ISSIG
- Hero Section moderne
- Section "À propos de l'ISSIG"
- Section Formations
- Timeline du parcours étudiant
- Modal de candidature
- Formulaire connecté à Formspree
- Footer complet
- Responsive mobile et tablette
- Favicon
- Animations de défilement

### 🎨 Améliorations
- Refonte complète de la section À propos
- Amélioration du responsive
- Optimisation du Hero
- Organisation des assets
- Correction des liens et images

### 🔧 Technique
- Initialisation Git
- Dépôt GitHub
- Release officielle v1.0.0

## v1.0 - 30/06/2026

### Ajouts
- Création de la section Hero
- Création de la section À propos
- Refonte complète du design de la section À propos
- Intégration des cartes d'avantages
- Création du formulaire de candidature
- Connexion du formulaire à Formspree
- Fenêtre de confirmation après envoi
- Gestion du chargement pendant l'envoi
- Première version fonctionnelle du site

## Mise en place du projet - 20/06/2026
- Projet récupéré depuis Antigravity
- Configuration VS Code
- Configuration Git
- Premier dépôt GitHub
- Premier commit
- Live Server configuré
