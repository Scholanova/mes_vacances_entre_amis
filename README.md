# mes_vacances_entre_amis
Projet 2020 - Mes vacances entre amis
## Le but du projet :
    faire une application qui permet de gérer les dépenses d'un séjour entre amis. Nous devons permettre de s'authentifier avec mail et mot de passe, de créer un évenement qui peut être à la fois une vacance ou une soirée. Les utilisateurs doivent ensuite pouvoir ajouter des dépenses à cette évenement dire qui a participer à cette dépense et qui a payé quoi. L'application doit être capable de déterminé qui doit rembourser qui pour chaque dépense et à la fin du séjour.
    
# Règles
## Règles de Structures
- API: route / service / repository
- Models: Nom de table en anglais au singulier.

## Rgèle de développement

- 1 feature = 1 issue = 1 branche
- Nom des branches = ${feature}-#${numero_issue} ( ex: creer_bdd-#5 )

# Architecture
* Nous avons choisis d'utiliser nodeJS pour le backend pour ses performances et ça facilité de développement. [Mensonge flagrant].
* Nous avons également choisis EJS pour le front de l'application afin de permettre au client de faire évoluer son backend et son front end avec du javascript. Cela permettra au client de pouvoir plus facilement embaucher un développeur qui maitrise le javascrit pour améliorer son front et son back.
* On a choisit postgresql pour la base de donnée car c'est une base de donnée répandue 

# API

GET /events

GET /events/new 

POST /events/new 

GET /

GET /error

GET /auth/signup

GET /auth/signin

POST /auth/signup

POST /auth/signin

GET /users/event

POST /users/event

# Infos

- Lien application externe: https://vacanceentreamis.osc-fr1.scalingo.io
- Structure base de données: https://dbdiagram.io/d/5efca14a0425da461f041e98
