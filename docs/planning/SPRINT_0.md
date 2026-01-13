````markdown
# 🚀 Sprint 0 - Setup & Préparation

**Projet** : Demandes de Maintenance  
**Durée** : 1 semaine (5 jours)  
**Équipe** : Romain (Tech Lead) + Marie (Dev Fullstack)  
**Objectif** : Préparer le repo, la documentation et les outils pour démarrer le développement

---

## 📋 Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                     SPRINT 0 - SEMAINE 1                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  JOUR 1          JOUR 2          JOUR 3          JOUR 4-5       │
│  ──────          ──────          ──────          ────────       │
│                                                                  │
│  🔧 Setup Git    📊 BDD          🎨 UI           📝 Issues      │
│  ───────────     ───────         ────────        ──────────     │
│  • Créer repo    • Schéma        • Storybook     • Créer 8      │
│  • Branches      • Types TS      • Composants    •   issues     │
│  • Protections   • Connexion     • Guide style   • Planning     │
│  • CI/CD         • Seed data                     • Go/No-Go     │
│                                                                  │
│  👨‍💻 Romain       👩‍💻 Marie        🤝 Ensemble     🤝 Ensemble    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Les 5 Issues du Sprint 0

### Issue S0-1 : Setup Repository Git

### Issue S0-2 : Documentation Base de Données

### Issue S0-3 : Authentification Azure AD

### Issue S0-4 : Design System & Storybook

### Issue S0-5 : Création des Issues Sprint 1-8

---

## 📝 Détail des Issues (Copier-coller pour GitHub)

---

### 📋 Issue S0-1 : Setup Repository Git

**À créer sur GitHub avec :**

```
Titre : [S0-1] Setup Repository Git
Labels : sprint-0, setup, priority-high
Assignee : Romain
```

**Description :**

```markdown
## 🎯 Objectif

Créer le repository `demandes-maintenance` à partir du template Beneteau et configurer l'infrastructure Git.

## 📋 Tâches

### Création du repo

- [x] Créer le repo `demandes-maintenance` on GitHub
- [x] Cloner le template `template-nextjs-beneteau`
- [x] Copier les fichiers vers le nouveau repo
- [x] Supprimer les fichiers de démo non nécessaires

### Configuration des branches

- [x] Créer la branche `develop` depuis `main`
- [x] Configurer la protection de `main` :
    - Require PR + 1 review
    - Require CI to pass
    - No direct push
- [x] Configurer la protection de `develop` :
    - Require PR
    - Require CI to pass

### GitHub Project

- [x] Créer le Project Board "Demandes de Maintenance"
- [x] Configurer les colonnes : Backlog | Sprint | In Progress | Review | Done
- [x] Activer les automations (move to In Progress on PR, etc.)

### CI/CD

- [x] Vérifier que le workflow CI fonctionne
- [x] Créer une PR de test pour valider le pipeline
- [x] Configurer GitHub Copilot pour les PR (si disponible)

## 📁 Fichiers concernés

- `.github/workflows/ci.yml`
- `README.md` (mettre à jour le nom du projet)
- `.github/CODEOWNERS` (optionnel)

## ✅ Definition of Done

- [x] Repo `demandes-maintenance` accessible sur GitHub
- [x] Branches `main` et `develop` protégées
- [x] GitHub Project créé avec colonnes
- [x] CI passe sur une PR de test
- [x] README mis à jour avec le nom du projet

## ⏱️ Estimation

1 jour (Jour 1)
```

---

### 📋 Issue S0-2 : Documentation Base de Données

**À créer sur GitHub avec :**

```
Titre : [S0-2] Documentation Base de Données
Labels : sprint-0, database, documentation
Assignee : Marie
```

**Description :**

```markdown
## 🎯 Objectif

Documenter le schéma complet de la base de données `WF_Demandes_Maintenance` et créer les types TypeScript correspondants.

## 📋 Tâches

### Documentation schéma

- [x] Lister toutes les tables avec leurs champs
- [x] Documenter les relations entre tables
- [x] Identifier les champs obligatoires vs optionnels
- [x] Documenter le workflow de validation (champs concernés)

### Types TypeScript

- [x] Créer `src/core/types/database.types.ts`
- [x] Type `Demande` (40+ champs)
- [x] Type `Demandeur`
- [x] Type `Gestionnaire`
- [x] Type `Decideur`
- [x] Type `ValideurUnite`
- [x] Type `Administrateur`
- [x] Type `SiteService`
- [x] Type `TypeDemande`
- [x] Type `Budget`

### Connexion BDD

- [x] Vérifier la connexion Azure SQL
- [x] Tester avec le script `pnpm db:connect`
- [x] Documenter les variables d'environnement nécessaires

### Seed data (optionnel)

- [x] Créer script `scripts/seed-local-db.ts`
- [x] Insérer des données de test pour développement local

## 📁 Fichiers à créer/modifier

- `docs/planning/DATABASE.md` (nouveau)
- `src/core/types/database.types.ts` (compléter)
- `scripts/seed-local-db.ts` (nouveau, optionnel)
- `.env.example` (documenter les variables BDD)

## ✅ Definition of Done

- [x] DATABASE.md créé avec schéma complet
- [x] Tous les types TypeScript créés (9 tables)
- [x] `pnpm db:connect` fonctionne
- [x] PR mergée dans `develop`

## ⏱️ Estimation

1-2 jours (Jour 2-3)
```

---

### 📋 Issue S0-3 : Authentification Azure AD

**À créer sur GitHub avec :**

```
Titre : [S0-3] Validation Authentification Azure AD
Labels : sprint-0, auth, priority-high
Assignee : Romain
```

**Description :**

```markdown
## 🎯 Objectif

Valider que l'authentification Azure AD fonctionne correctement et documenter la configuration.

## 📋 Tâches

### Vérification auth existante

- [ ] Tester le flow de connexion complet
- [ ] Vérifier la récupération des infos utilisateur (nom, email, rôle)
- [ ] Tester la déconnexion
- [ ] Vérifier la persistence de session

### Middleware de protection

- [ ] Vérifier/créer le middleware de protection des routes
- [ ] Lister les routes publiques vs privées
- [ ] Tester la redirection si non connecté

### Hook useCurrentUser

- [ ] Créer/vérifier `src/hooks/useCurrentUser.ts`
- [ ] Retourner : id, nom, email, rôle
- [ ] Gérer l'état de chargement
- [ ] Gérer le cas non connecté

### Documentation

- [ ] Documenter les variables Azure AD nécessaires
- [ ] Documenter le flow d'authentification
- [ ] Ajouter au README si nécessaire

## 📁 Fichiers concernés

- `auth.config.ts`
- `src/contexts/auth.tsx`
- `src/hooks/useCurrentUser.ts` (nouveau)
- `src/app/api/auth/[...nextauth].ts`

## ✅ Definition of Done

- [ ] Login/logout fonctionnent
- [ ] Hook `useCurrentUser()` retourne les infos user
- [ ] Routes privées protégées
- [ ] Documentation auth complète
- [ ] PR mergée dans `develop`

## ⏱️ Estimation

0.5 jour (Jour 2)
```

---

### 📋 Issue S0-4 : Design System & Storybook

**À créer sur GitHub avec :**

```
Titre : [S0-4] Design System & Storybook
Labels : sprint-0, ui, design-system
Assignee : Romain, Marie
```

**Description :**

```markdown
## 🎯 Objectif

Valider et documenter le Design System existant, s'assurer que Storybook est à jour avec tous les composants.

## 📋 Tâches

### Audit composants existants

- [ ] Lister tous les atoms (9 composants)
- [ ] Lister toutes les molecules (9 composants)
- [ ] Lister tous les organisms (4 composants)
- [ ] Identifier les composants manquants pour le projet

### Storybook

- [ ] Vérifier que `pnpm storybook` fonctionne
- [ ] Créer les stories manquantes
- [ ] Documenter les props de chaque composant
- [ ] Ajouter des exemples d'utilisation

### Palette couleurs

- [ ] Définir/valider les couleurs du projet dans `tailwind.config.ts`
- [ ] Couleurs : primary, secondary, success, warning, error
- [ ] Couleurs statuts demande : en-attente, validé, refusé, etc.

### Composants à créer (si manquants)

- [ ] Badge (pour les statuts)
- [ ] StatusBadge (En attente, Validé, Refusé)
- [ ] PageLayout (structure standard des pages)
- [ ] LoadingSpinner

### Guide de style

- [ ] Créer `docs/UI_GUIDE.md` avec exemples
- [ ] Quand utiliser quel composant
- [ ] Conventions de nommage CSS/Tailwind

## 📁 Fichiers concernés

- `tailwind.config.ts`
- `src/components/atoms/**`
- `src/components/molecules/**`
- `src/components/organisms/**`
- `.storybook/`
- `docs/UI_GUIDE.md` (nouveau)

## ✅ Definition of Done

- [ ] `pnpm storybook` démarre sans erreur
- [ ] Tous les composants ont une story
- [ ] Palette couleurs définie dans Tailwind
- [ ] Guide UI créé
- [ ] PR mergée dans `develop`

## ⏱️ Estimation

1 jour (Jour 3)
```

---

### 📋 Issue S0-5 : Création Issues Sprint 1-8

**À créer sur GitHub avec :**

```
Titre : [S0-5] Création des Issues Sprint 1-8
Labels : sprint-0, planning
Assignee : Romain
```

**Description :**

```markdown
## 🎯 Objectif

Créer les 8 issues de développement (Sprint 1-8) sur GitHub pour que le backlog soit prêt.

## 📋 Tâches

### Issues à créer

#### Sprints Romain (4 issues)

- [ ] [S1] Auth & Layout (👨‍💻 Romain)
- [ ] [S2] Accueil & Dashboard (👨‍💻 Romain)
- [ ] [S3] Admin - Sites & Types (👨‍💻 Romain)
- [ ] [S4] Admin - Budgets & Users (👨‍💻 Romain)

#### Sprints Marie (4 issues)

- [ ] [S5] Demandes - Création (👩‍💻 Marie)
- [ ] [S6] Demandes - Liste & Détail (👩‍💻 Marie)
- [ ] [S7] Validation - Gestionnaire (👩‍💻 Marie)
- [ ] [S8] Validation - Décideur & Valideur (👩‍💻 Marie)

### Contenu de chaque issue

- Titre avec numéro de sprint et nom
- Labels : sprint-X, feature, assignee
- Description avec :
    - Objectif
    - Liste des tâches (checkbox)
    - Fichiers concernés
    - Definition of Done
    - Branche à créer

### Organisation

- [ ] Ajouter toutes les issues au GitHub Project
- [ ] Positionner dans la colonne "Backlog"
- [ ] Vérifier les dépendances (S1 avant S5, etc.)

## 📄 Référence

Utiliser le document [SPRINT_ROADMAP.md](./SPRINT_ROADMAP.md) pour le contenu des issues.

## ✅ Definition of Done

- [ ] 8 issues créées sur GitHub
- [ ] Toutes les issues dans le Project Board
- [ ] Chaque issue a : description, labels, assignee
- [ ] Backlog prêt pour Sprint 1

## ⏱️ Estimation

0.5 jour (Jour 4)
```

---

## 📅 Planning Jour par Jour

| Jour   | Romain                                               | Marie                                    | Ensemble              |
| ------ | ---------------------------------------------------- | ---------------------------------------- | --------------------- |
| **J1** | [S0-1] Setup Git : Créer repo, branches, protections | -                                        | Review structure repo |
| **J2** | [S0-3] Auth : Tester Azure AD, hook useCurrentUser   | [S0-2] BDD : Schéma, documentation       | Point synchro         |
| **J3** | [S0-4] UI : Storybook, composants                    | [S0-2] BDD : Types TypeScript, connexion | Review UI ensemble    |
| **J4** | [S0-5] Issues : Créer les 8 issues                   | [S0-4] UI : Guide style, exemples        | Validation issues     |
| **J5** | Review global                                        | Review global                            | **Go/No-Go Sprint 1** |

---

## ✅ Checklist "Ready for Sprint 1"

### Infrastructure

- [x] Repo `demandes-maintenance` créé et accessible
- [x] Branches `main` et `develop` configurées et protégées
- [x] CI/CD fonctionne (lint, type-check, build)
- [x] GitHub Project créé avec les 8 issues

### Base de données

- [x] DATABASE.md créé avec schéma complet
- [x] Types TypeScript pour les 9 tables
- [x] Connexion Azure SQL testée
- [x] Variables d'environnement documentées

### Authentification

- [x] Login/logout Azure AD fonctionnels
- [x] Hook `useCurrentUser()` prêt
- [x] Middleware protection routes prêt

### UI/Design System

- [x] Storybook fonctionne avec tous les composants
- [x] Palette couleurs définie
- [x] Guide UI documenté

### Organisation

- [x] 8 issues créées et dans le backlog
- [x] Romain sait exactement quoi faire en Sprint 1
- [x] Marie sait exactement quoi faire en Sprint 5

---

## 🚦 Go/No-Go Sprint 1

**Date** : Fin Jour 5

**Critères de Go** :

- ✅ Tous les items de la checklist sont cochés
- ✅ Romain et Marie ont validé ensemble
- ✅ Pas de bloqueur technique identifié

**Si No-Go** :

- Identifier les bloqueurs
- Prolonger Sprint 0 de 1-2 jours si nécessaire
- Prioriser ce qui débloque Sprint 1

---

## 📎 Templates d'Issues Sprint 1-8

### Template générique pour les issues de développement

```markdown
## 🎯 Objectif

[Description courte de l'objectif du sprint]

## 📋 Tâches

### [Catégorie 1]

- [ ] Tâche 1
- [ ] Tâche 2

### [Catégorie 2]

- [ ] Tâche 3
- [ ] Tâche 4

## 📁 Fichiers concernés

- `src/app/[module]/page.tsx`
- `src/core/services/[module].service.ts`
- `src/core/types/[module].types.ts`

## 🌿 Branche

`feature/[prenom]-[module]`

## ✅ Definition of Done

- [ ] Fonctionnalité X fonctionne
- [ ] Tests passent (si applicable)
- [ ] Code reviewé
- [ ] PR mergée dans `develop`
- [ ] Démo faite

## ⏱️ Estimation

1 semaine

## 🔗 Dépendances

- Requiert : [Issue précédente]
- Débloque : [Issue suivante]
```

---

## 📚 Ressources

- [SPRINT_ROADMAP.md](./SPRINT_ROADMAP.md) - Vision globale des 9 sprints
- [SYNTHESE_PRESENTATION_V2.md](../../SYNTHESE_PRESENTATION_V2.md) - Méthodologie binôme
- [README.md](../../README.md) - Documentation technique du template

---

> **Document maintenu par** : Romain BOTTERO  
> **Dernière mise à jour** : Janvier 2026  
> **Version** : 1.0
````
