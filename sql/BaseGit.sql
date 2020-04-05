Create database BaseGit;
Use BaseGit;
CREATE table User(id_usu int not null auto_increment primary key,nom_usu varchar(40) not null,app_usu varchar(40) not null,apm_usu varchar(40) not null,cor_usu varchar(60) not null, pass_usu varchar(60) not null);