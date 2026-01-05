# 🗺️ Roadmap Sprints - Demandes de Maintenance

**Projet** : Migration PowerApps → Next.js  
**Équipe** : Romain (Tech Lead) + Marie (Dev Fullstack)  
**Durée totale** : 9 semaines (Sprint 0 + 8 sprints de développement)  
**Repo** : `demandes-maintenance` (nouveau repo à créer depuis template Beneteau)

---

## 📅 Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           TIMELINE PROJET (9 semaines)                               │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                      │
│  S0      S1      S2      S3      S4      S5      S6      S7      S8                 │
│  │       │       │       │       │       │       │       │       │                  │
│  ▼       ▼       ▼       ▼       ▼       ▼       ▼       ▼       ▼                  │
│  ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐             │
│  │ 0 │   │ 1 │   │ 2 │   │ 3 │   │ 4 │   │ 5 │   │ 6 │   │ 7 │   │ 8 │             │
│  └───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘   └───┘             │
│    │       │       │       │       │       │       │       │       │                │
│  Setup  Auth    Accueil  Admin   Admin   Demandes Demandes Valid.  Valid.           │
│         Layout  Dashboard Sites   Budget  Création Liste   Gest.   Décideur         │
│                          Types   Users           Détail                             │
│    │       │       │       │       │       │       │       │       │                │
│    └───────┴───────┴───────┴───────┼───────┴───────┴───────┴───────┘                │
│            ROMAIN (4 sprints)      │        MARIE (4 sprints)                       │
│                                    │                                                │
│  ──────────────────────────────────┼──────────────────────────────────────          │
│                                    │                                                │
│  🚀 Démarrage                  📍 Mi-parcours                    🏁 Livraison       │
│                                                                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Tableau des Sprints

| Sprint | Semaine | Responsable | Objectif | Livrable |
|--------|---------|-------------|----------|----------|
| **S0** | Sem 1 | 🤝 Ensemble | Setup & Préparation | Repo prêt, BDD documentée, Issues créées |
| **S1** | Sem 2 | 👨‍💻 Romain | Auth & Layout | Connexion Azure AD, Header, Navigation |
| **S2** | Sem 3 | 👨‍💻 Romain | Accueil & Dashboard | Page accueil, Dashboard par rôle, Stats |
| **S3** | Sem 4 | 👨‍💻 Romain | Admin - Sites & Types | CRUD Sites/Services, CRUD Types demande |
| **S4** | Sem 5 | 👨‍💻 Romain | Admin - Budgets & Users | CRUD Budgets, CRUD Utilisateurs |
| **S5** | Sem 6 | 👩‍💻 Marie | Demandes - Création | Formulaire, Validation, Upload fichiers |
| **S6** | Sem 7 | 👩‍💻 Marie | Demandes - Liste & Détail | Liste, Détail, Modification |
| **S7** | Sem 8 | 👩‍💻 Marie | Validation - Gestionnaire | Workflow gestionnaire, Liste à valider |
| **S8** | Sem 9 | 👩‍💻 Marie | Validation - Décideur | Workflows décideur/valideur, Notifications |

---

## 🎯 Détail par Sprint

### Sprint 0 - Setup & Préparation (Semaine 1)

**Objectif** : Préparer le terrain pour que Romain et Marie puissent démarrer efficacement

| Tâche | Responsable | Livrable |
|-------|-------------|----------|
| Créer repo `demandes-maintenance` | Romain | Repo GitHub configuré |
| Configurer branches (main/develop) | Romain | Protection branches |
| Créer GitHub Project Board | Romain | Board avec colonnes |
| Créer les 8 issues de développement | Romain | Issues prêtes |
| Documenter schéma BDD | Marie | DATABASE.md |
| Créer types TypeScript BDD | Marie | database.types.ts |
| Tester connexion Azure SQL | Marie | Script de test |
| Valider Design System | Ensemble | Storybook à jour |

**📄 Document détaillé** : [SPRINT_0.md](./SPRINT_0.md)

---

### Sprint 1 - Auth & Layout (Semaine 2)

**Responsable** : 👨‍💻 Romain  
**Branche** : `feature/romain-auth-layout`

| Livrable | Description |
|----------|-------------|
| Connexion Azure AD | Flow complet login/logout |
| Layout principal | Structure Header/Content/Footer |
| Navigation | Menu selon rôle utilisateur |
| Middleware auth | Protection routes privées |
| Hook `useCurrentUser()` | Récupération user connecté |

**Definition of Done** :
- [ ] Un utilisateur peut se connecter via Azure AD
- [ ] Le Header affiche nom + avatar utilisateur
- [ ] La navigation s'adapte au rôle (Demandeur/Gestionnaire/Admin)
- [ ] Les routes privées redirigent vers login si non connecté
- [ ] PR mergée dans `develop`

---

### Sprint 2 - Accueil & Dashboard (Semaine 3)

**Responsable** : 👨‍💻 Romain  
**Branche** : `feature/romain-accueil-dashboard`

| Livrable | Description |
|----------|-------------|
| Page d'accueil | Landing page avec actions rapides |
| Dashboard Demandeur | Mes demandes récentes, statuts |
| Dashboard Gestionnaire | Demandes à valider, stats |
| Dashboard Admin | Vue globale, indicateurs |
| Composant StatCard | Carte statistique réutilisable |

**Definition of Done** :
- [ ] La page d'accueil affiche le bon dashboard selon le rôle
- [ ] Les statistiques sont calculées depuis la BDD
- [ ] Les liens rapides fonctionnent
- [ ] Design responsive (mobile/desktop)
- [ ] PR mergée dans `develop`

---

### Sprint 3 - Admin Sites & Types (Semaine 4)

**Responsable** : 👨‍💻 Romain  
**Branche** : `feature/romain-admin-sites-types`

| Livrable | Description |
|----------|-------------|
| CRUD Sites/Services | Liste, Ajout, Modification, Suppression |
| CRUD Types de demande | Liste, Ajout, Modification, Suppression |
| DataTable Admin | Tableau avec tri, filtre, pagination |
| Formulaires Admin | Modales création/édition |
| Validation formulaires | Zod + react-hook-form |

**Definition of Done** :
- [ ] Admin peut gérer les Sites/Services (CRUD complet)
- [ ] Admin peut gérer les Types de demande (CRUD complet)
- [ ] Confirmation avant suppression
- [ ] Messages de succès/erreur (toast)
- [ ] PR mergée dans `develop`

---

### Sprint 4 - Admin Budgets & Users (Semaine 5)

**Responsable** : 👨‍💻 Romain  
**Branche** : `feature/romain-admin-budgets-users`

| Livrable | Description |
|----------|-------------|
| CRUD Budgets | Gestion complète des budgets |
| CRUD Demandeurs | Gestion utilisateurs demandeurs |
| CRUD Gestionnaires | Gestion utilisateurs gestionnaires |
| CRUD Décideurs | Gestion utilisateurs décideurs |
| CRUD Valideurs Unité | Gestion valideurs (max 4) |
| CRUD Administrateurs | Gestion admins système |

**Definition of Done** :
- [ ] Admin peut gérer tous les types d'utilisateurs
- [ ] Admin peut gérer les budgets
- [ ] Activation/désactivation utilisateurs
- [ ] Recherche dans les listes
- [ ] PR mergée dans `develop`

---

### Sprint 5 - Demandes Création (Semaine 6)

**Responsable** : 👩‍💻 Marie  
**Branche** : `feature/marie-demandes-creation`

| Livrable | Description |
|----------|-------------|
| Formulaire création | Tous les champs de la table Demande |
| Upload fichiers | Pièces jointes (si applicable) |
| Sélection Site/Type/Budget | Dropdowns liés |
| Validation formulaire | Champs obligatoires, formats |
| Enregistrement BDD | Server Action création |

**Definition of Done** :
- [ ] Un demandeur peut créer une nouvelle demande
- [ ] Tous les champs obligatoires sont validés
- [ ] Le site, type et budget sont sélectionnables
- [ ] La demande est enregistrée en BDD avec statut "En attente"
- [ ] PR mergée dans `develop`

---

### Sprint 6 - Demandes Liste & Détail (Semaine 7)

**Responsable** : 👩‍💻 Marie  
**Branche** : `feature/marie-demandes-liste-detail`

| Livrable | Description |
|----------|-------------|
| Liste "Mes demandes" | DataTable filtrable par statut |
| Page détail demande | Vue complète d'une demande |
| Modification demande | Édition si statut "Brouillon" |
| Historique demande | Timeline des validations |
| Export liste | CSV/Excel (optionnel) |

**Definition of Done** :
- [ ] Un demandeur voit la liste de ses demandes
- [ ] Filtres par statut, date, type fonctionnent
- [ ] Le détail affiche toutes les informations
- [ ] Modification possible si demande non validée
- [ ] PR mergée dans `develop`

---

### Sprint 7 - Validation Gestionnaire (Semaine 8)

**Responsable** : 👩‍💻 Marie  
**Branche** : `feature/marie-validation-gestionnaire`

| Livrable | Description |
|----------|-------------|
| Liste à valider | Demandes en attente gestionnaire |
| Page validation | Détail + actions Valider/Refuser |
| Commentaire validation | Motif obligatoire si refus |
| Mise à jour statut | `Dem_Validation_Gestionnaire` |
| Notification (optionnel) | Email au demandeur |

**Definition of Done** :
- [ ] Un gestionnaire voit les demandes à valider
- [ ] Il peut valider ou refuser avec commentaire
- [ ] Le statut de la demande est mis à jour
- [ ] Le demandeur est notifié (email ou in-app)
- [ ] PR mergée dans `develop`

---

### Sprint 8 - Validation Décideur & Valideur (Semaine 9)

**Responsable** : 👩‍💻 Marie  
**Branche** : `feature/marie-validation-decideur`

| Livrable | Description |
|----------|-------------|
| Workflow Décideur | Validation niveau 2 |
| Workflow Valideur Unité | Validation niveau 3 (4 valideurs) |
| Tableau de bord validation | Vue globale workflow |
| Notifications complètes | Toutes les étapes |
| Statut final | Demande approuvée/refusée |

**Definition of Done** :
- [ ] Le décideur peut valider après le gestionnaire
- [ ] Les 4 valideurs unité peuvent valider après le décideur
- [ ] Le workflow complet fonctionne de bout en bout
- [ ] Les notifications sont envoyées à chaque étape
- [ ] PR mergée dans `develop`

---

## 📍 Jalons Clés

| Date | Jalon | Critère de succès |
|------|-------|-------------------|
| **Fin S0** | 🚀 Go Sprint 1 | Repo prêt, issues créées, BDD documentée |
| **Fin S2** | 📍 Démo Auth | Un utilisateur peut se connecter et voir son dashboard |
| **Fin S4** | 📍 Démo Admin | L'administration est complète et fonctionnelle |
| **Fin S6** | 📍 Démo Demandes | Le cycle de vie d'une demande fonctionne |
| **Fin S8** | 🏁 Livraison | Application complète, testée, prête pour prod |

---

## 🔗 Dépendances entre Sprints

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  Sprint 0 ──────────────────────────────────────────────┐   │
│     │                                                    │   │
│     ▼                                                    │   │
│  Sprint 1 (Auth)                                         │   │
│     │                                                    │   │
│     ├──────────────────────┐                             │   │
│     ▼                      ▼                             │   │
│  Sprint 2 (Dashboard)   Sprint 5 (Demandes Création)     │   │
│     │                      │                             │   │
│     ▼                      ▼                             │   │
│  Sprint 3 (Admin Sites) Sprint 6 (Demandes Liste)        │   │
│     │                      │                             │   │
│     ▼                      ▼                             │   │
│  Sprint 4 (Admin Users) Sprint 7 (Valid. Gestionnaire)   │   │
│     │                      │                             │   │
│     │                      ▼                             │   │
│     │                   Sprint 8 (Valid. Décideur)       │   │
│     │                      │                             │   │
│     └──────────────────────┴──────────► LIVRAISON 🏁     │   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Dépendances critiques** :
- Sprint 1 (Auth) doit être terminé avant que Marie commence Sprint 5
- Sprint 3-4 (Admin) doivent fournir les données de référence (Sites, Types, Budgets, Users)
- Sprint 5-6 (Demandes) sont requis avant Sprint 7-8 (Validation)

---

## 📁 Structure du Repo

```
demandes-maintenance/
├── .github/
│   ├── workflows/ci.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
│       ├── feature.md
│       ├── bug.md
│       └── task.md
├── docs/
│   └── planning/
│       ├── SPRINT_ROADMAP.md      ← Ce document
│       ├── SPRINT_0.md            ← Détail Sprint 0
│       └── DATABASE.md            ← Schéma BDD
├── src/
│   ├── app/
│   │   ├── admin/                 # 👨‍💻 Romain
│   │   ├── demandes/              # 👩‍💻 Marie
│   │   └── validation/            # 👩‍💻 Marie
│   ├── components/
│   └── core/
│       ├── services/
│       │   ├── admin.service.ts   # 👨‍💻 Romain
│       │   ├── demandes.service.ts # 👩‍💻 Marie
│       │   └── validation.service.ts # 👩‍💻 Marie
│       └── types/
│           └── database.types.ts
└── README.md
```

---

## ✅ Checklist Projet

### Avant de commencer
- [ ] Repo `demandes-maintenance` créé
- [ ] Template Beneteau cloné
- [ ] GitHub Project configuré
- [ ] Accès BDD Azure pour Romain et Marie
- [ ] VS Code + extensions installées

### Pendant le développement
- [ ] PR quotidiennes (ou minimum à chaque fin de tâche)
- [ ] Review croisée obligatoire
- [ ] CI verte avant merge
- [ ] Point hebdo pour synchronisation

### À la fin de chaque sprint
- [ ] Démo des fonctionnalités
- [ ] Retrospective (ce qui a marché / à améliorer)
- [ ] Mise à jour du board GitHub Project
- [ ] Merge dans `develop`

---

> **Document maintenu par** : Romain BOTTERO  
> **Dernière mise à jour** : Janvier 2026  
> **Version** : 1.0
