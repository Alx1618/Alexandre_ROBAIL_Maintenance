# Documentation - Parc d'attraction

Ce dossier contient la documentation complete de l'application Parc d'attraction.

## Documents disponibles

### 📋 [Documentation technique](DOCUMENTATION_TECHNIQUE.md)
Description technique de l'application : architecture, stack technique, flux de donnees, build et deploiement.

### 👥 [Documentation fonctionnelle](DOCUMENTATION_FONCTIONNELLE.md)
Guide d'utilisation de l'application : objectif, parcours utilisateur (visiteur et administrateur), regles metier.

### 🗄️ [Schema de base de donnees](SCHEMA_BASE_DE_DONNEES.md)
Structure complete de la base de donnees : tables, colonnes, contraintes, relations.

### 🚀 [Ameliorations possibles](AMELIORATIONS_POSSIBLES.md)
Liste des ameliorations fonctionnelles et techniques possibles avec estimations en jours/homme.

---

## Resume rapide

### Fonctionnalites principales

- **Visiteurs** : consultation des attractions visibles, ajout de critiques
- **Administrateurs** : gestion des attractions (CRUD), controle de la visibilite
- **Internationalisation** : francais (par defaut) et anglais
- **Interface** : design moderne avec Material Design, affichage de la difficulte par etoiles colorees

### Technologies

- **Frontend** : Angular 17, Angular Material, SCSS, i18n
- **Backend** : Flask (Python), MariaDB
- **Deploiement** : Docker Compose

### Lancement

```bash
docker compose up
```

Acces : http://localhost:4200

Pour plus de details, consulter les documents ci-dessus.
