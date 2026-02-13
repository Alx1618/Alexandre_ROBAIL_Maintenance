DROP TABLE IF EXISTS critique;
DROP TABLE IF EXISTS attraction;

CREATE TABLE attraction (
    attraction_id int auto_increment,
    primary key(attraction_id),
    nom varchar(255) not null,
    description varchar(255) not null,
    difficulte int,
    visible bool default true
);

CREATE TABLE critique (
    critique_id int auto_increment,
    primary key(critique_id),
    attraction_id int not null,
    texte text not null,
    note int not null,
    nom varchar(255) default null,
    prenom varchar(255) default null,
    constraint fk_critique_attraction foreign key (attraction_id) references attraction(attraction_id) on delete cascade
);

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    users_id int auto_increment,
    primary key(users_id),
    name varchar(255) not null,
    password varchar(255) not null
);