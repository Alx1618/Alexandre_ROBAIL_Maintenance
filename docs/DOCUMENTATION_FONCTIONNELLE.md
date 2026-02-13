# Documentation fonctionnelle - Parc d'attraction

## 1. Objectif de l’application

Permettre aux visiteurs de consulter les attractions visibles et leurs critiques, et aux administrateurs de gerer les attractions (creation, modification, visibilite) apres connexion.

## 2. Utilisateurs

- **Visiteur** : toute personne accedant au site sans se connecter.
- **Administrateur** : utilisateur connecte avec un compte (nom + mot de passe) enregistre en base.

## 3. Parcours utilisateur

### 3.1 Visiteur (page d’accueil)

1. Aller sur la page d’accueil (lien « Parc d’attraction » dans la barre de menu).
2. Voir la liste des **attractions visibles** (nom, description, difficulte affichee sous forme d’etoiles colorees ★☆☆☆☆ a ★★★★★).
   - La difficulte est representee par 5 etoiles : les etoiles remplies (★) sont colorees selon le niveau (vert pour 1-2, jaune pour 3, orange pour 4, rouge pour 5), les etoiles vides (☆) sont en gris.
3. Pour chaque attraction :
   - Consulter les **critiques** (auteur ou « Anonyme », note / 5, texte).
   - Cliquer sur **« Ajouter une critique »** pour ouvrir une fenetre avec un formulaire :
     - Votre avis (texte, minimum 10 caracteres)
     - Note de 1 a 5
     - Option « Publier en anonyme » : si desactivee, remplir Nom et Prenom (facultatifs)
     - Boutons « Annuler » et « Envoyer »
4. Les attractions non visibles (desactivees par l’admin) n’apparaissent pas et ne sont pas accessibles via l’API publique.

### 3.2 Administrateur

1. **Connexion**
   - Aller sur la page de connexion (ou y etre redirige en essayant d’acceder a l’admin).
   - Saisir le **Nom** et le **Mot de passe** du compte admin.
   - Cliquer sur **« Connexion »**. En cas de succes, redirection vers la page administrateur.

2. **Page administrateur**
   - Titre : « Page administrateur pour [Ajouter], modifier et supprimer des attractions ».
   - Pour chaque attraction existante : champs Nom, Description, Difficulté / 5, interrupteur **« Element visible »**, bouton **« Enregistrer »**.
   - **« Ajouter »** : ajoute une nouvelle ligne de formulaire pour une attraction ; remplir les champs et « Enregistrer » pour la creer.
   - Modifier les champs puis « Enregistrer » pour mettre a jour une attraction (y compris la visibilite).
   - Les attractions dont « Element visible » est desactive ne sont plus visibles sur la page d’accueil ni via les appels API non authentifies.

3. **Deconnexion**
   - Cliquer sur **« Deconnexion »** dans la barre de menu pour se deconnecter et revenir en mode visiteur.

## 4. Langues

- L’application est disponible en **francais** (langue par defaut) et en **anglais** (Angular i18n).
- En build de production, deux versions sont generees (fr et en). Le choix de la langue depend du deploiement (sous-dossiers ou en-tete Accept-Language selon la configuration serveur).
- En developpement : `npm run serve` (francais) ou `npm run serve:en` (anglais) dans le dossier `parc/`.

## 5. Regles metier resumees

- Seules les attractions avec **visible = oui** sont listees et accessibles pour les visiteurs.
- Une **critique** comprend : texte (obligatoire, min. 10 caracteres), note (1 a 5), et soit nom/prenom soit publication anonyme.
- L’admin peut uniquement gerer les attractions (pas les critiques dans cette version) ; la connexion est requise pour toute action d’administration.
