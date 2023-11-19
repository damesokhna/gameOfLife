# Jeu de la Vie 
## Lien jeu deploye : https://damesokhna-esp-dic.netlify.app/
## Présentation

Ce projet implémente le Jeu de la Vie de Conway, un automate cellulaire qui évolue selon des règles simples. Le jeu consiste en une grille de cellules, chacune pouvant être vivante ou morte. Les cellules évoluent à travers des générations basées sur des règles spécifiques, créant des motifs intéressants.

## Mise en route

Pour exécuter le Jeu de la Vie, ouvrez le fichier `index.html` dans un navigateur web. Le jeu propose une interface utilisateur avec divers contrôles et options.

- **Vitesse :** Ajustez la vitesse du jeu à l'aide de l'entrée de plage.
- **Colonnes :** Définissez le nombre de colonnes dans la grille.
- **Lignes :** Définissez le nombre de lignes dans la grille.
- **Couleur des cellules vivantes :** Choisissez la couleur des cellules vivantes.
- **Forme des cellules :** Sélectionnez la forme des cellules (carré ou cercle).

## Contrôles

- **Réinitialiser :** Efface la grille et réinitialise le compteur de générations.
- **Démarrer/Arrêter :** Lance ou arrête le jeu.
- **Initialiser :** Peuple la grille de manière aléatoire.
- **Basculer le mode édition :** Permet de basculer l'édition interactive des cellules en cliquant dessus.

## Mode Édition

Basculez le "Mode Édition" pour activer ou désactiver l'édition interactive des cellules. Lorsqu'il est actif, cliquer sur les cellules bascule leur état.

## Développement

Le projet se compose de trois fichiers principaux :

- **index.html :** Contient la structure HTML du jeu.
- **styles.css :** Définit le style de l'interface du jeu.
- **script.js :** Implémente la logique du jeu et les interactions.

## Logique du Jeu

Le jeu suit les règles du Jeu de la Vie de Conway :

1. **Sous-population :** Une cellule vivante avec moins de deux voisins vivants meurt.
2. **Survie :** Une cellule vivante avec deux ou trois voisins vivants survit.
3. **Surnombre :** Une cellule vivante avec plus de trois voisins vivants meurt.
4. **Reproduction :** Une cellule morte avec exactement trois voisins vivants devient vivante.

Le jeu évolue à travers des générations, et des statistiques telles que la génération actuelle et la population sont affichées.

## Personnalisation

N'hésitez pas à expérimenter avec différentes tailles de grille, couleurs et formes de cellules pour observer des motifs et des comportements divers.

## Auteur

Cette implémentation du Jeu de la Vie a été créée par Dame SOKHNA. Si vous avez des questions ou des suggestions, n'hésitez pas à [me contacter](damesokhna@esp.sn).
