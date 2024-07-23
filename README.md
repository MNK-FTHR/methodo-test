# Testing de script

GRANIER VICTOR - Methodo Tests Ynov 2024

## Projet

### Le projet répond à la demande suivante

Un fichier.csv nous est fournie contenant des données sur des exercices réaliser à certaines dates avec l'ID de la session de la personne qui les effectue

Un exercice peut être assis ou allongé
Un exercice peut être de 5’ (niveau=1) ou de 10’ (niveau=2)

Un utilisateur doit effectuer 2 exercices de 5’ ou 1 exercice de 10’ pour compléter une séance.

Une pratique est un couple séance assis et séance allongé le même jour.

Chaque jour d’affilée pratiqué incrémente la série de +1.

L’utilisateur dispose de 2 vies pour pallier l’absence de pratique sur un jour
Chaque jour sans pratique consume 1 vie.
Les jours compensés par une vie peuvent être marqué par une ligne « Allonge=False » et « Assis=False »
Lorsque l’utilisateur a consumé plus de vie qu’il n’en avait
    -la série est « cassée » et reprend de 0
    -2 vies sont recréditées

1 vie est regagnée tous les 5 jours consécutifs de pratique.
Le nombre de vies maximal est 2.

### Réalisation

Le projet est réalisé en Node.JS Typescript sans bibliothèques et dépendances supplémentaires.
Les fichiers Typescript sont transformés en exécutables côté développeur et seulement ces fichiers exécutables sont rendus avec les fichiers bash essentiels.
Les exécutables sont au nombre de 3, un pour Linux, Windows et Mac afin de couvrir un maximum de machine.
Ces exécutables sont lancés depuis le fichier index.sh, plusieurs lancements sont possibles:
    -"sh index.sh": simple lancement du script qui va lire le fichier Enregistrement.csv donnée au préalable dans l'énoncé et sortir un fichier output.csv avec la donnée "série" ajoutée
    -"sh index.sh MonFichier.csv": lancement du script avec le fichier csv de votre choix (veuillez le mettre à la racine de ce projet afin qu'il soit détectable par le script)
    -"sh index.sh -t"/"sh index.sh --tests": lancement de tous les tests puis du script avec le fichier Enregistrement.csv
    -"sh index.sh -t1"/"sh index.sh --test1": lancement d'un test spécifique (va de t1 à t5)
    -"sh index.sh -h": ouvre la liste des flags possibles

Le projet a été testé sur mon pc, celui d'un proche ne possédant aucune application ou outil de devs et sur un Mac, cela a fonctionné en suivant les procédures de lancement

## Procédures de lancement

-Lancer gitBash dans le dossier du projet
-Executer la commande "sh index.sh -h" afin de voir toute les possibilités de lancement

Les commandes possibles pour mon script s'afficheront et vous pourrez utiliser celle qui vous intéresse.
La description des tests s'affiche lors de leur lancement.

Si vous désirez voir le code de mon script, envoyez moi un mail à <victorgranier.pierre@gmail.com>.

Merci de votre attention.
