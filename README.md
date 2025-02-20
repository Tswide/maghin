# Maghin Refont

Maghin Refont est une refonte visant à approfondir mes connaissances en **backend** en utilisant **AdonisJS**, un framework TypeScript inspiré de Laravel. Ce projet m'a permis d'explorer les concepts avancés du backend, la gestion des bases de données et l'authentification des utilisateurs.

## 🚀 Technologies utilisées

- [AdonisJS](https://adonisjs.com/) - Framework backend en TypeScript, similaire à Laravel.
- [SQLite](https://www.sqlite.org/) - Base de données légère et facile à gérer.
- [TypeScript](https://www.typescriptlang.org/) - Typage statique pour un code plus robuste.
- [Node.js](https://nodejs.org/) - Environnement d'exécution pour JavaScript côté serveur.

## 🎯 Objectifs du projet

- Approfondir mes compétences en **backend avec AdonisJS**.  
- Comprendre la **gestion des bases de données et des migrations**.  
- Implémenter une **authentification utilisateur sécurisée**.  

## 📦 Installation et utilisation

1. **Cloner le projet**  
   ```sh
   git clone https://github.com/Tswide/maghin.git
   cd maghin
   ```
2. **Installer les dépendances**
   
    ```sh
     npm install
    ```

3. **Créer la base de données SQLite**
    ```sh
     touch tmp/db.sqlite3
    ```


4. **Lancer le projet**
   
    ```sh
     npm run dev
    ```

## ⚠️ Important : Accorder les droits administrateur
Après avoir créé un compte utilisateur, vous devez modifier les permissions dans la base de données :

  **Accéder à SQLite**
  
  ```sh
  sqlite3 tmp/db.sqlite3
  ```
  
  **Mettre à jour les droits**
  
  ```sh
  UPDATE users SET admin = 1 WHERE email = 'votre-email@example.com';
  ```
Cela vous permettra d'obtenir les privilèges d'administrateur sur l'application.
