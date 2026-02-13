# Documentation technique - Parc d'attraction

## 1. Architecture generale

L'application est composee de deux parties :

- **Frontend** : application Angular 17 (standalone components), Material Design, SCSS
- **Backend** : API REST Flask (Python), base de donnees MariaDB

Communication : le frontend appelle le backend en HTTP (CORS active). L'authentification admin repose sur un token JWT envoye dans l'en-tete `Authorization`.

## 2. Stack technique

### Frontend (dossier `parc/`)

- **Framework** : Angular 17
- **UI** : Angular Material (cards, formulaires, toolbar, dialog, snackbar)
- **Styles** : SCSS (global dans `src/styles.scss`, composants dans leur fichier `.scss`)
- **i18n** : Angular i18n (fichiers XLF en `src/locale/`), langues : francais (source), anglais
- **Routing** : `Router` avec garde `utilisateurEstConnecte` sur la route `/admin`
- **HTTP** : `HttpClient` avec intercepteur `authInterceptor` qui ajoute le token stocke en `localStorage`

Principaux modules :

- `AccueilComponent` : page publique des attractions visibles et des critiques (affichage de la difficulte sous forme d’etoiles colorees)
- `AdminComponent` : CRUD attractions (avec champ visible), reserve aux utilisateurs connectes
- `LoginComponent` : formulaire de connexion (nom + mot de passe)
- `CritiqueDialogComponent` : modal d’ajout de critique (texte, note, anonyme ou nom/prenom)
- `CritiqueListComponent` : liste des critiques par attraction + bouton « Ajouter une critique »

### Backend (dossier `python/`)

- **Framework** : Flask
- **CORS** : `flask_cors` pour autoriser les requetes depuis le frontend
- **Base de donnees** : MariaDB, acces via `request.request` (connexion, requetes parametrees)
- **Auth** : JWT (`PyJWT`), cle et duree de validite dans `controller.auth.auth`

Fichiers principaux :

- `app.py` : routes REST (attractions, critiques, login)
- `controller/attraction.py` : logique metier attractions (CRUD, filtre visible)
- `controller/critique.py` : ajout et liste des critiques par attraction
- `controller/auth/auth.py` : encodage/decodage JWT, verification du token
- `request/request.py` : connexion DB, `insert_in_db`, `select_from_db`, `delete_from_db`

## 3. Flux de donnees

### Attractions

- **GET /attraction** : sans token → uniquement les attractions avec `visible = 1`. Avec token admin valide → toutes les attractions.
- **GET /attraction/<id>** : sans token → 404 si l’attraction n’est pas visible ; avec token → retourne l’attraction si elle existe.
- **POST /attraction** : requis token admin ; creation ou mise a jour (selon `attraction_id`).
- **DELETE /attraction/<id>** : requis token admin.

Le frontend utilise un seul service `AttractionService.getAllAttraction()`. La page accueil n’envoie pas de token (ou token vide), l’admin envoie le token ; le backend adapte la reponse.

### Critiques

- **GET /attraction/<id>/critiques** : liste des critiques de l’attraction (public).
- **POST /attraction/<id>/critique** : ajout d’une critique (texte, note 1–5, optionnellement nom/prenom ou anonyme).

### Authentification

- **POST /login** : body `{ "name", "password" }` ; en cas de succes, reponse avec `token` et `name`. Le frontend stocke `{ token, name }` dans `localStorage` sous la cle `user`.
- Les requetes admin (POST/DELETE attraction) envoient `Authorization: Token <jwt>`.
- La garde de route `utilisateurEstConnecte` lit le token et redirige vers `/login` si non connecte.

## 4. Build et deploiement

- **Frontend** : `npm run build` (production) produit deux builds localises dans `dist/parc/browser/fr` et `dist/parc/browser/en`.
  - En developpement : `npm run serve` (francais) ou `npm run serve:en` (anglais).
- **Backend** : Flask ecoute sur le port configure (ex. 5000) ; la base est initialisee via les scripts SQL dans `python/sql_file/` (init.sql, create.sql).
- **Docker** : `docker-compose.yml` a la racine permet de lancer l’ensemble (frontend, backend, base, nginx) selon la configuration du projet.
  - **Important** : utiliser `docker compose down` (sans `-v`) pour conserver les donnees entre les redemarrages. `docker compose down -v` supprime les volumes et efface toutes les donnees.

## 5. Points d’attention

- L’URL de l’API est en dur dans `AttractionService` (`http://127.0.0.1:5000`) ; en production, utiliser un fichier d’environnement ou une config.
- La cle JWT et les identifiants DB sont dans le code ou des variables d’environnement ; en production, les sortir dans une config securisee.
