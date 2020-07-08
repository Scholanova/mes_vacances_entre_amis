# mes_vacances_entre_amis
Projet 2020 - Mes vacances entre amis

# Règles de structure

- API: route / service / repository
- Models: Nom de table en anglais au singulier.

# Rgèle de développement

- 1 feature = 1 issue = 1 branche
- Nom des branches = ${feature}-#${numero_issue} ( ex: creer_bdd-#5 )

# Architecture
Nous avons choisis d'utiliser nodeJS pour le backend pour ses performances et ça facilité de développement. [Mensonge flagrant].
Nous avons également choisis EJS pour le front de l'application afin de permettre au client de faire évoluer son backend et son front end avec du javascript. Cela permettra au client de pouvoir plus facilement embaucher un développeur qui maitrise le javascrit pour améliorer son front et son back.

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
