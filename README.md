Un script Nodejs pour vous permettre de supprimer automatiquement et de maniere efficace les surplus de messages de certains administrateurs dans vos canaux Telegram.

PREREQUIS : 
1- Installer Nodejs (Si vous ne l'avez pas encore)

<a href="https://nodejs.org/fr/download" target="_blank">Telecharger Nodejs</a>

2- Installer le module d'API de bot Telegram

npm install node-telegram-bot-api

TRAVAIL A FAIRE EN AMONT:

1- Creer votre bot Telegram avec BotFather et recuperez le TOKEN

2-Demarrer une discussion avec le bot que vous venez de creer (Un simple /start sera suffisant)

3-Mettre le bot que vous venez de creer administrateur (Avec tous les droits) dans votre canal.

ETAPE INTERMEDIAIRE :

1-Remplacer les mots clés YOUR_BOT_TOKEN et  yourchannelid (par le TOKEN de votre bot et le username de votre canal) dans le fichier getadmin.js (Ligne 4 et Ligne 7)

UTILISATION DU SCRIPT :

1-Premierement lancez getadmin.js pour recuperer la liste des administrateurs de votre canal. Il sera creer unn fichier adminlist.txt dans votre repertoire, le fichier conntiendra les signatures de chacun de votre administrateurs.

node getadmin.js

ETAPE INTERMEDIAIRE FINALE:

2-Remplacer les mots clés  YOUR_BOT_TOKEN et YOUR_ID (par le TOKEN de votre bot et votre ID TELEGRAM , pas votre username) dans le fichier autodeleter.js (Ligne 2 et Ligne 9)

3-Remplacer les mots clés Admin Signature par les signatures des admins autorisés à poster dans le canal, les signatures se trouvent dans le fichier adminlist.txt que vous avez eu précedemment. (Ligne 12)

UTILISATION FINALE DU SCRIPT :

2-Lancer autodeleter.js et laissez le travail se faire😋

node autodeleter.js
