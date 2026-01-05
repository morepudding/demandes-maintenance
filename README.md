# 🚀 Template Next.js Beneteau

> Template standardisé pour les applications internes Beneteau  
> **Stack** : Next.js 15 • React 19 • TypeScript • MSSQL • Azure AD • TailwindCSS

---

## 📋 Table des Matières

1. [Fonctionnalités](#-fonctionnalités)
2. [Démarrage Rapide](#-démarrage-rapide)
3. [Structure du Projet](#-structure-du-projet)
4. [Configuration](#-configuration)
5. [Workflow de Développement](#-workflow-de-développement)
6. [Commandes Disponibles](#-commandes-disponibles)
7. [Conventions](#-conventions)

---

## ✨ Fonctionnalités

### Stack Technique

| Technologie | Version | Usage |
|-------------|---------|-------|
| **Next.js** | 15.2 | Framework React avec App Router |
| **React** | 19 | Bibliothèque UI |
| **TypeScript** | 5.8 | Typage statique |
| **MSSQL** | 11 | Base de données SQL Server |
| **Azure AD** | - | Authentification SSO |
| **TailwindCSS** | 4.1 | Styles utilitaires |
| **Radix UI** | - | Composants accessibles |

### Outils de Développement

| Outil | Usage | Statut |
|-------|-------|--------|
| **ESLint** | Linting du code | ✅ Configuré |
| **Prettier** | Formatage du code | ✅ Configuré |
| **Husky** | Git hooks (pre-commit) | ✅ Nouveau |
| **lint-staged** | Lint uniquement les fichiers modifiés | ✅ Nouveau |
| **Vitest** | Tests unitaires | ✅ Configuré |
| **Storybook** | Documentation des composants | ✅ Configuré |
| **GitHub Actions** | CI/CD | ✅ Nouveau |

### Templates GitHub

| Template | Description |
|----------|-------------|
| Pull Request | Template structuré avec checklist |
| Issue - Feature | Pour les nouvelles fonctionnalités |
| Issue - Bug | Pour les rapports de bugs |
| Issue - Task | Pour les tâches techniques |

---

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** 20+ (voir `.nvmrc`)
- **pnpm** 8+
- **Docker Desktop** (pour la BDD locale)

### Installation

```bash
# 1. Cloner le repository
git clone <url-repo>
cd <nom-projet>

# 2. Installer les dépendances
pnpm install

# 3. Copier le fichier d'environnement
cp .environment.dev .env

# 4. Configurer les variables d'environnement
# Éditer .env avec vos valeurs

# 5. Lancer le serveur de développement
pnpm dev
```

### Base de Données Locale (Docker)

```bash
# 1. Tirer l'image Azure SQL Edge
docker pull mcr.microsoft.com/azure-sql-edge:latest

# 2. Créer le container
docker run --cap-add SYS_PTRACE -e 'ACCEPT_EULA=1' \
  -e 'MSSQL_SA_PASSWORD=votreMotDePasse!' \
  -p 1433:1433 --name azuresqledge \
  -d mcr.microsoft.com/azure-sql-edge

# 3. Tester la connexion
pnpm db:connect
```

---

## 📁 Structure du Projet

```
src/
├── app/                          # App Router Next.js 15
│   ├── layout.tsx                # Layout racine
│   ├── page.tsx                  # Page d'accueil
│   ├── globals.css               # Styles globaux
│   ├── actions/                  # Server Actions
│   │   └── *.actions.ts
│   └── (routes)/                 # Routes de l'application
│
├── components/                   # Composants (Atomic Design)
│   ├── atoms/                    # Composants de base
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Label/
│   │   └── ...
│   ├── molecules/                # Combinaisons d'atoms
│   │   ├── InputWithLabel/
│   │   ├── ButtonWithIcon/
│   │   └── ...
│   └── organisms/                # Sections complètes
│       ├── DataTable/
│       ├── Header/
│       └── ...
│
├── core/                         # Logique métier
│   ├── lib/                      # Utilitaires
│   │   ├── utils.ts
│   │   └── db/                   # Accès BDD
│   │       ├── index.ts          # Client MSSQL
│   │       ├── queries.ts        # Requêtes SQL
│   │       └── format.ts         # Formatage données
│   ├── services/                 # Services métier
│   │   └── *.service.ts
│   └── types/                    # Types TypeScript
│       └── *.types.ts
│
├── contexts/                     # React Contexts
│   └── auth.tsx
│
└── hooks/                        # Custom Hooks (à créer)
    └── use-*.ts

.github/                          # Configuration GitHub
├── workflows/
│   └── ci.yml                    # Pipeline CI
├── PULL_REQUEST_TEMPLATE.md      # Template PR
└── ISSUE_TEMPLATE/
    ├── feature.md
    ├── bug.md
    └── task.md

.husky/                           # Git Hooks
└── pre-commit                    # Lint avant commit
```

---

## ⚙️ Configuration

### Variables d'Environnement

Créer un fichier `.env` basé sur `.environment.dev` :

```env
# Base de données
DB_SERVER=localhost
DB_NAME=votre_bdd
DB_USER=sa
DB_PASSWORD=votreMotDePasse!

# Azure AD
AZURE_AD_CLIENT_ID=xxx
AZURE_AD_CLIENT_SECRET=xxx
AZURE_AD_TENANT_ID=xxx

# Next Auth
NEXTAUTH_SECRET=xxx
NEXTAUTH_URL=http://localhost:3000
```

### Prettier

La configuration Prettier est dans `.prettierrc.json`. Pour l'utiliser dans VS Code :

1. Installer l'extension Prettier
2. Activer "Format on Save"
3. Sélectionner Prettier comme formateur par défaut

### ESLint

Configuration dans `eslint.config.mjs`. Le linting est automatiquement exécuté :
- Au pre-commit (via Husky)
- Dans la CI (via GitHub Actions)

---

## 🔄 Workflow de Développement

### Branches

```
main ─────────────────────────► Production
  │
  └── develop ────────────────► Intégration
        │
        ├── feature/xxx ──────► Nouvelles fonctionnalités
        ├── fix/xxx ──────────► Corrections de bugs
        └── refactor/xxx ─────► Refactoring
```

### Processus

1. **Créer une branche** depuis `develop`
   ```bash
   git checkout develop && git pull
   git checkout -b feature/ma-feature
   ```

2. **Développer** avec des commits conventionnels
   ```bash
   git commit -m "feat(scope): description"
   ```

3. **Pousser** et créer une PR
   ```bash
   git push -u origin feature/ma-feature
   ```

4. **Review** puis merge après approbation

### Conventional Commits

| Type | Usage |
|------|-------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `refactor` | Refactoring |
| `style` | Formatage |
| `docs` | Documentation |
| `chore` | Maintenance |

---

## 📜 Commandes Disponibles

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build de production |
| `pnpm start` | Lancer le build |
| `pnpm lint` | Linter le code |
| `pnpm lint:fix` | Corriger automatiquement |
| `pnpm type-check` | Vérifier les types |
| `pnpm test` | Lancer les tests |
| `pnpm coverage` | Tests avec couverture |
| `pnpm storybook` | Lancer Storybook |
| `pnpm db:connect` | Tester la connexion BDD |

---

## 📐 Conventions

### Nommage des Fichiers

| Type | Convention | Exemple |
|------|------------|---------|
| Composant | `Dossier/index.tsx` | `Button/index.tsx` |
| Service | `nom.service.ts` | `demandes.service.ts` |
| Types | `nom.types.ts` | `demande.types.ts` |
| Server Action | `nom.actions.ts` | `demandes.actions.ts` |
| Hook | `use-nom.ts` | `use-demandes.ts` |

### Atomic Design

| Niveau | Description | Exemple |
|--------|-------------|---------|
| **Atom** | Composant de base, pas de logique métier | `Button`, `Input` |
| **Molecule** | Combine 2-3 atoms | `InputWithLabel` |
| **Organism** | Section complète, logique métier | `DataTable`, `Header` |

### TypeScript

- ❌ Éviter `any` - utiliser `unknown` si nécessaire
- ✅ Typer les props des composants
- ✅ Typer les retours des fonctions
- ✅ Utiliser des types plutôt que des interfaces pour les unions

---

## 📚 Documentation Supplémentaire

- [Guide de Collaboration](../GUIDE_TRAVAIL_EQUIPE.md) - Workflow équipe
- [Next.js Documentation](https://nextjs.org/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Atomic Design](https://atomicdesign.bradfrost.com/)

---

## 🏷️ Changelog

### v1.0.0 (Décembre 2024)

**🆕 Ajouté dans cette version :**
- ✅ Husky + lint-staged pour pre-commit hooks
- ✅ GitHub Actions CI pipeline
- ✅ Templates PR et Issues
- ✅ Script `type-check` séparé
- ✅ Documentation complète README

**📦 Existant du template original :**
- ✅ Next.js 15 + React 19 + TypeScript
- ✅ MSSQL avec Azure AD authentication
- ✅ TailwindCSS + Radix UI
- ✅ Atomic Design (atoms/molecules/organisms)
- ✅ ESLint + Prettier configurés
- ✅ Vitest pour les tests
- ✅ Storybook pour la documentation UI
- ✅ Docker support

---

> **Maintenu par** : Équipe Développement Beneteau  
> **Dernière mise à jour** : Décembre 2024
