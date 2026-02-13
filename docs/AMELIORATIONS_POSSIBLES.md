# Ameliorations possibles - Parc d'attraction

Estimation en jours ouvre (j.h.) pour une personne.

---

## 1. Ameliorations fonctionnelles

| Amelioration | Description | Estimation |
|--------------|-------------|------------|
| Suppression / moderation des critiques | Permettre a l’admin de supprimer ou masquer une critique (route DELETE, champ « moderee » ou suppression en base). | 1 j.h. |
| Pagination des attractions et des critiques | Paginer les listes cote backend (LIMIT/OFFSET ou curseur) et frontend (boutons ou infinite scroll). | 1,5 j.h. |
| Recherche / filtres | Filtre par difficulte, recherche par nom d’attraction sur la page d’accueil. | 1 j.h. |
| Compte visiteur (inscription) | Inscription + connexion visiteur pour « mes critiques » ou pre-remissage nom/prenom. | 2 j.h. |
| Upload d’images pour les attractions | Stockage (serveur ou S3), affichage dans les cartes, gestion admin. | 2 j.h. |
| Notifications (ex. email) | Envoi d’un email de confirmation apres ajout d’une critique ou en cas de nouveau message admin. | 1,5 j.h. |
| Export des donnees (CSV/Excel) | Export des attractions et/ou des critiques pour l’admin. | 1 j.h. |
| Tableau de bord admin | Statistiques : nombre de critiques par attraction, notes moyennes, evolution. | 2 j.h. |

**Total ordre de grandeur (fonctionnel)** : environ **12 j.h.**

---

## 2. Ameliorations techniques

| Amelioration | Description | Estimation |
|--------------|-------------|------------|
| Configuration des URLs API | Remplacer l’URL en dur par un fichier d’environnement (ex. `environment.ts`) ou une config build. | 0,5 j.h. |
| Securite : hash des mots de passe | Remplacer le stockage du mot de passe en clair par un hash (bcrypt/argon2) et verification au login. | 1 j.h. |
| Securite : injection SQL | Verifier que toutes les requetes utilisent des parametres (deja le cas pour la plupart ; corriger l’UPDATE dans `add_attraction` si encore en concaténation). | 0,5 j.h. |
| HTTPS et cookie HttpOnly pour le token | Utiliser HTTPS en production et, si le token est stocke en cookie, HttpOnly + Secure. | 0,5 j.h. |
| Tests unitaires et e2e | Tests unitaires (services, composants) et e2e (Playwright/Cypress) pour les parcours critiques. | 3 j.h. |
| Gestion d’erreurs et messages utilisateur | Messages d’erreur clairs (ex. « Attraction non trouvee », « Erreur reseau ») et affichage coherent (snackbar/toast). | 1 j.h. |
| Accessibilite (a11y) | Labels, roles ARIA, navigation clavier, contraste pour les principaux ecrans. | 1,5 j.h. |
| Performance frontend | Lazy loading des routes, optimisation des images, reduction du bundle (tree-shaking, analyse). | 1 j.h. |
| Logs et monitoring | Logs structures cote backend, health-check, monitoring (ex. erreurs 5xx, temps de reponse). | 1,5 j.h. |

**Total ordre de grandeur (technique)** : environ **10,5 j.h.**

---

## 3. Resume des estimations

| Domaine | Estimation totale |
|---------|-------------------|
| Fonctionnel | ~12 j.h. |
| Technique   | ~10,5 j.h. |
| **Total**   | **~22,5 j.h.** |

Les durees sont donnees a titre indicatif et peuvent varier selon l’environnement et les choix d’implementation.
