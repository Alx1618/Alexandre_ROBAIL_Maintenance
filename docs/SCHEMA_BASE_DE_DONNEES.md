# Schema de la base de donnees - Parc d'attraction

Base : MariaDB (MySQL compatible).

## 1. Table `attraction`

| Colonne        | Type         | Contraintes              | Description                    |
|----------------|--------------|--------------------------|--------------------------------|
| attraction_id  | INT          | AUTO_INCREMENT, PK       | Identifiant unique             |
| nom            | VARCHAR(255) | NOT NULL                 | Nom de l'attraction            |
| description    | VARCHAR(255) | NOT NULL                 | Description                    |
| difficulte     | INT          | -                        | Niveau de difficulte (ex. 1-5) |
| visible        | BOOL         | DEFAULT true             | Visible sur l’ecran visiteurs  |

```sql
CREATE TABLE attraction (
    attraction_id int auto_increment,
    primary key(attraction_id),
    nom varchar(255) not null,
    description varchar(255) not null,
    difficulte int,
    visible bool default true
);
```

## 2. Table `critique`

| Colonne    | Type         | Contraintes              | Description                    |
|------------|--------------|--------------------------|--------------------------------|
| critique_id| INT          | AUTO_INCREMENT, PK       | Identifiant unique             |
| attraction_id | INT        | NOT NULL, FK → attraction| Attraction concernee           |
| texte      | TEXT         | NOT NULL                 | Contenu de la critique         |
| note       | INT          | NOT NULL                 | Note (1 a 5)                   |
| nom        | VARCHAR(255) | DEFAULT NULL             | Nom (optionnel, anonyme si NULL) |
| prenom     | VARCHAR(255) | DEFAULT NULL             | Prenom (optionnel)             |

Contrainte etrangere : `attraction_id` reference `attraction(attraction_id)` avec `ON DELETE CASCADE` (suppression d’une attraction supprime ses critiques).

```sql
CREATE TABLE critique (
    critique_id int auto_increment,
    primary key(critique_id),
    attraction_id int not null,
    texte text not null,
    note int not null,
    nom varchar(255) default null,
    prenom varchar(255) default null,
    constraint fk_critique_attraction foreign key (attraction_id)
        references attraction(attraction_id) on delete cascade
);
```

## 3. Table `users`

| Colonne  | Type         | Contraintes        | Description        |
|----------|--------------|--------------------|--------------------|
| users_id | INT          | AUTO_INCREMENT, PK | Identifiant unique |
| name     | VARCHAR(255) | NOT NULL           | Nom de connexion   |
| password | VARCHAR(255) | NOT NULL           | Mot de passe       |

Utilisee pour l’authentification des administrateurs (connexion par nom + mot de passe, token JWT emis cote backend).

```sql
CREATE TABLE users (
    users_id int auto_increment,
    primary key(users_id),
    name varchar(255) not null,
    password varchar(255) not null
);
```

## 4. Schema relationnel (resume)

```
attraction (1) -----< (N) critique
    attraction_id  <----  attraction_id (FK, CASCADE)

users : independant (auth admin)
```
