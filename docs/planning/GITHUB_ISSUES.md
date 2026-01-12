# 📋 Issues Sprint 1 à 8 - Demandes de Maintenance

Ce document contient toutes les issues à créer sur GitHub pour les sprints de développement.

---

## 🚀 Sprint 1 - Auth & Layout (Semaine 2)

### [S1-1] Configuration Azure AD Production

**Labels** : `sprint-1`, `auth`, `priority-high`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Finaliser la configuration Azure AD et s'assurer que NextAuth fonctionne correctement en production.

## 📋 Tâches
- [ ] Demander la création d'une App Registration dédiée aux ops
- [ ] Configurer les redirect URIs (dev + prod)
- [ ] Tester le flow complet login/logout
- [ ] Vérifier la récupération des tokens (access + id)
- [ ] Documenter la configuration finale

## 📁 Fichiers concernés
- `src/app/api/auth/[...nextauth]/route.ts`
- `auth.config.ts`
- `.env` (production)
- `docs/AUTH.md`

## ✅ Definition of Done
- [ ] App Registration dédiée créée
- [ ] Login/logout fonctionnent en prod
- [ ] Tokens correctement récupérés
- [ ] Documentation à jour

## ⏱️ Estimation
0.5 jour
```

---

### [S1-2] Layout Principal et Structure

**Labels** : `sprint-1`, `ui`, `priority-high`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Créer le layout principal de l'application avec Header, contenu et footer.

## 📋 Tâches
- [ ] Créer le layout de base (Header/Content/Footer)
- [ ] Intégrer le Header existant
- [ ] Ajouter le container principal responsive
- [ ] Gérer les différentes largeurs de contenu
- [ ] Ajouter le footer avec infos projet

## 📁 Fichiers concernés
- `src/app/layout.tsx` (déjà existant, à affiner)
- `src/components/templates/MainLayout/index.tsx` (nouveau)
- `src/components/organisms/Footer/index.tsx` (nouveau)

## ✅ Definition of Done
- [ ] Layout responsive (mobile/tablet/desktop)
- [ ] Header s'affiche correctement
- [ ] Footer avec version et infos
- [ ] Structure réutilisable pour toutes les pages

## ⏱️ Estimation
0.5 jour
```

---

### [S1-3] Navigation Dynamique selon Rôle

**Labels** : `sprint-1`, `navigation`, `priority-high`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Créer un système de navigation qui s'adapte au rôle de l'utilisateur connecté.

## 📋 Tâches
- [ ] Créer le composant Navigation
- [ ] Définir les menus par rôle (Demandeur/Gestionnaire/Admin)
- [ ] Intégrer NavigationMenu Radix UI
- [ ] Ajouter les icônes Lucide
- [ ] Gérer l'item actif (highlight)
- [ ] Mode mobile (hamburger menu)

## 📁 Fichiers concernés
- `src/components/organisms/Navigation/index.tsx` (nouveau)
- `src/components/organisms/Header/index.tsx` (mise à jour)
- `src/config/navigation.ts` (nouveau - config des menus)

## Menus par rôle
### Demandeur
- Accueil
- Mes demandes
- Nouvelle demande

### Gestionnaire
- Accueil
- À valider
- Toutes les demandes

### Admin
- Accueil
- Administration
  - Sites/Services
  - Types de demande
  - Budgets
  - Utilisateurs

## ✅ Definition of Done
- [ ] Navigation s'adapte au rôle
- [ ] Responsive (desktop + mobile)
- [ ] Item actif mis en surbrillance
- [ ] Icônes claires et cohérentes

## ⏱️ Estimation
1 jour
```

---

### [S1-4] Middleware Protection Routes

**Labels** : `sprint-1`, `auth`, `middleware`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Protéger les routes privées avec un middleware NextAuth et rediriger les utilisateurs non connectés.

## 📋 Tâches
- [ ] Affiner le middleware existant (`src/middleware.ts`)
- [ ] Définir les routes publiques vs privées
- [ ] Redirection vers `/test-auth` si non connecté
- [ ] Redirection vers page appropriée après login
- [ ] Gestion des rôles (optionnel pour Sprint 1)

## 📁 Fichiers concernés
- `src/middleware.ts` (déjà créé, à affiner)
- `src/config/routes.ts` (nouveau - config des routes)

## Routes publiques
- `/test-auth`
- `/api/auth/*`

## Routes privées
- `/` (accueil)
- `/demandes/*`
- `/admin/*`
- `/validation/*`

## ✅ Definition of Done
- [ ] Routes privées protégées
- [ ] Redirection automatique si non connecté
- [ ] Callback vers page demandée après login
- [ ] Tests manuels OK

## ⏱️ Estimation
0.5 jour
```

---

### [S1-5] Hook useCurrentUser et Session

**Labels** : `sprint-1`, `auth`, `hooks`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Améliorer le hook useCurrentUser pour récupérer aussi le rôle depuis la BDD.

## 📋 Tâches
- [ ] Hook useCurrentUser déjà créé ✅
- [ ] Créer une API route pour récupérer le rôle `/api/user/role`
- [ ] Interroger la BDD pour trouver le rôle (Demandeur, Gestionnaire, etc.)
- [ ] Mettre en cache le rôle dans la session
- [ ] Créer un Context Provider pour le user global

## 📁 Fichiers concernés
- `src/hooks/useCurrentUser.ts` (mise à jour)
- `src/app/api/user/role/route.ts` (nouveau)
- `src/contexts/UserContext.tsx` (nouveau)
- `src/core/services/user.service.ts` (nouveau)

## Logique de détermination du rôle
1. Chercher l'email dans `Administrateur` → rôle: Admin
2. Sinon chercher dans `Gestionnaire` → rôle: Gestionnaire
3. Sinon chercher dans `Decideur` → rôle: Decideur
4. Sinon chercher dans `ValideurUnite` → rôle: ValideurUnite
5. Sinon chercher dans `Demandeur` → rôle: Demandeur
6. Sinon → rôle: null (non autorisé)

## ✅ Definition of Done
- [ ] useCurrentUser retourne le rôle
- [ ] Rôle récupéré depuis la BDD
- [ ] Context Provider créé
- [ ] Tests avec différents utilisateurs

## ⏱️ Estimation
1 jour
```

---

## 🏠 Sprint 2 - Accueil & Dashboard (Semaine 3)

### [S2-1] Page Accueil Responsive

**Labels** : `sprint-2`, `ui`, `priority-high`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Créer la page d'accueil avec présentation et actions rapides.

## 📋 Tâches
- [ ] Créer `src/app/page.tsx` (déjà existe, à enrichir)
- [ ] Section Hero avec titre et description
- [ ] Cards d'actions rapides selon le rôle
- [ ] Design responsive (mobile-first)
- [ ] Animations subtiles (fade-in)

## Actions rapides par rôle
### Demandeur
- Créer une demande
- Voir mes demandes

### Gestionnaire
- Demandes à valider
- Toutes les demandes

### Admin
- Administration
- Statistiques globales

## ✅ Definition of Done
- [ ] Page accueil responsive
- [ ] Actions adaptées au rôle
- [ ] Design cohérent avec UI Guide
- [ ] Animations fluides

## ⏱️ Estimation
0.5 jour
```

---

### [S2-2] Dashboard Demandeur

**Labels** : `sprint-2`, `dashboard`, `demandeur`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Créer le dashboard pour les demandeurs avec leurs demandes récentes.

## 📋 Tâches
- [ ] Créer `src/app/dashboard/demandeur/page.tsx`
- [ ] Composant StatCard (réutilisable)
- [ ] Afficher stats : Total, En attente, Validées, Refusées
- [ ] Liste des 5 dernières demandes
- [ ] Graphique simple (optionnel)

## Statistiques à afficher
- Total de mes demandes
- En attente
- Validées
- Refusées

## ✅ Definition of Done
- [ ] Stats calculées depuis BDD
- [ ] Liste des dernières demandes
- [ ] Liens cliquables vers détails
- [ ] Design cohérent

## ⏱️ Estimation
1 jour
```

---

### [S2-3] Dashboard Gestionnaire

**Labels** : `sprint-2`, `dashboard`, `gestionnaire`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Créer le dashboard pour les gestionnaires avec les demandes à valider.

## 📋 Tâches
- [ ] Créer `src/app/dashboard/gestionnaire/page.tsx`
- [ ] Stats : À valider, Validées aujourd'hui, Refusées
- [ ] Liste des demandes en attente de validation
- [ ] Filtres rapides (par site, par type)
- [ ] Boutons d'action rapide

## Statistiques
- Demandes en attente de validation
- Validées cette semaine
- Refusées cette semaine
- Délai moyen de traitement

## ✅ Definition of Done
- [ ] Dashboard fonctionnel
- [ ] Stats pertinentes
- [ ] Actions rapides (valider/refuser)
- [ ] Filtres fonctionnels

## ⏱️ Estimation
1 jour
```

---

### [S2-4] Dashboard Admin

**Labels** : `sprint-2`, `dashboard`, `admin`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Créer le dashboard admin avec vue globale du système.

## 📋 Tâches
- [ ] Créer `src/app/dashboard/admin/page.tsx`
- [ ] Stats globales (toutes demandes)
- [ ] Répartition par statut (graphique)
- [ ] Top 5 sites avec le plus de demandes
- [ ] Top 5 types de demandes
- [ ] Liens vers administration

## Statistiques globales
- Total demandes (tous utilisateurs)
- Par statut (En attente, Validé, Refusé)
- Par site
- Par type
- Tendance sur 30 jours

## ✅ Definition of Done
- [ ] Vue globale complète
- [ ] Graphiques clairs
- [ ] Liens vers admin
- [ ] Performance optimisée

## ⏱️ Estimation
1 jour
```

---

### [S2-5] Composant StatCard Réutilisable

**Labels** : `sprint-2`, `components`, `ui`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Créer un composant de carte statistique réutilisable pour tous les dashboards.

## 📋 Tâches
- [ ] Créer `src/components/molecules/StatCard/index.tsx`
- [ ] Props : title, value, icon, color, trend (optionnel)
- [ ] Variantes de couleurs
- [ ] Animation au hover
- [ ] Storybook story

## Props
```ts
interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  onClick?: () => void;
}
```

## ✅ Definition of Done
- [ ] Composant créé et typé
- [ ] Story Storybook
- [ ] Responsive
- [ ] Réutilisable dans tous dashboards

## ⏱️ Estimation
0.5 jour
```

---

## 🔧 Sprint 3 - Admin Sites & Types (Semaine 4)

### [S3-1] Page Admin Sites/Services

**Labels** : `sprint-3`, `admin`, `crud`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Créer la page d'administration des Sites et Services avec CRUD complet.

## 📋 Tâches
- [ ] Créer `src/app/admin/sites/page.tsx`
- [ ] DataTable avec liste des sites
- [ ] Bouton "Ajouter un site"
- [ ] Actions : Modifier, Supprimer
- [ ] Recherche et filtres
- [ ] Pagination

## Colonnes DataTable
- ID
- Nom du site
- Date création
- Actions

## ✅ Definition of Done
- [ ] Liste complète des sites
- [ ] Recherche fonctionnelle
- [ ] Tri par colonne
- [ ] Actions visibles

## ⏱️ Estimation
1 jour
```

---

### [S3-2] Modal Création/Édition Site

**Labels** : `sprint-3`, `admin`, `forms`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Créer la modale de création et d'édition d'un site/service.

## 📋 Tâches
- [ ] Créer composant Dialog (Radix UI)
- [ ] Formulaire avec react-hook-form
- [ ] Validation avec Zod
- [ ] Server Action pour créer/modifier
- [ ] Messages de succès/erreur (toast)

## Champs du formulaire
- Nom du site (requis, max 50 caractères)

## Validation Zod
```ts
const siteSchema = z.object({
  nom: z.string().min(1).max(50)
});
```

## ✅ Definition of Done
- [ ] Création fonctionne
- [ ] Modification fonctionne
- [ ] Validation correcte
- [ ] Messages utilisateur clairs

## ⏱️ Estimation
1 jour
```

---

### [S3-3] Suppression Site avec Confirmation

**Labels** : `sprint-3`, `admin`, `crud`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Permettre la suppression d'un site avec dialogue de confirmation.

## 📋 Tâches
- [ ] Bouton Supprimer dans DataTable
- [ ] Dialog de confirmation
- [ ] Server Action pour supprimer
- [ ] Vérifier les contraintes (FK)
- [ ] Message si impossible de supprimer

## Dialog de confirmation
"Êtes-vous sûr de vouloir supprimer le site [Nom] ?"
- Bouton Annuler
- Bouton Supprimer (rouge)

## ✅ Definition of Done
- [ ] Suppression fonctionne
- [ ] Confirmation obligatoire
- [ ] Gestion des erreurs FK
- [ ] Toast de succès

## ⏱️ Estimation
0.5 jour
```

---

### [S3-4] Page Admin Types de Demande

**Labels** : `sprint-3`, `admin`, `crud`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Créer la page d'administration des Types de demande (même structure que Sites).

## 📋 Tâches
- [ ] Créer `src/app/admin/types/page.tsx`
- [ ] DataTable liste types
- [ ] Modal création/édition
- [ ] Suppression avec confirmation
- [ ] Réutiliser composants de Sites

## Colonnes
- ID
- Nom du type
- Date création
- Actions

## ✅ Definition of Done
- [ ] CRUD complet
- [ ] Même UX que Sites
- [ ] Code réutilisé

## ⏱️ Estimation
1 jour
```

---

### [S3-5] Server Actions CRUD

**Labels** : `sprint-3`, `backend`, `api`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Créer toutes les Server Actions pour les opérations CRUD Sites et Types.

## 📋 Tâches
- [ ] `createSite(data)` - INSERT
- [ ] `updateSite(id, data)` - UPDATE
- [ ] `deleteSite(id)` - DELETE
- [ ] `createType(data)` - INSERT
- [ ] `updateType(id, data)` - UPDATE
- [ ] `deleteType(id)` - DELETE

## Fichiers
- `src/app/admin/sites/actions.ts`
- `src/app/admin/types/actions.ts`
- `src/core/services/sites.service.ts`
- `src/core/services/types.service.ts`

## ✅ Definition of Done
- [ ] Toutes actions créées
- [ ] Gestion d'erreurs
- [ ] Transactions si nécessaire
- [ ] Logs appropriés

## ⏱️ Estimation
1 jour
```

---

## 💰 Sprint 4 - Admin Budgets & Users (Semaine 5)

### [S4-1] Page Admin Budgets

**Labels** : `sprint-4`, `admin`, `crud`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Page d'administration des budgets avec CRUD complet.

## 📋 Tâches
- [ ] Page `src/app/admin/budgets/page.tsx`
- [ ] DataTable budgets
- [ ] Modal création/édition
- [ ] Suppression avec confirmation
- [ ] Réutiliser pattern de Sprint 3

## Colonnes
- ID
- Nom du budget
- Date création
- Actions

## ✅ Definition of Done
- [ ] CRUD complet budgets
- [ ] UX cohérente
- [ ] Performance OK

## ⏱️ Estimation
1 jour
```

---

### [S4-2] Page Admin Demandeurs

**Labels** : `sprint-4`, `admin`, `users`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Gérer les utilisateurs Demandeurs.

## 📋 Tâches
- [ ] Page `src/app/admin/users/demandeurs/page.tsx`
- [ ] DataTable avec Nom, Prénom, Email, Actif
- [ ] Création/édition demandeur
- [ ] Activation/désactivation (toggle)
- [ ] Recherche par nom/email

## Champs formulaire
- Prénom (requis)
- Nom (requis)
- Email (requis, format email, unique)
- Actif (boolean, défaut: true)
- Fullname (auto-généré)

## ✅ Definition of Done
- [ ] CRUD demandeurs
- [ ] Toggle actif/inactif
- [ ] Validation email unique

## ⏱️ Estimation
1 jour
```

---

### [S4-3] Page Admin Gestionnaires

**Labels** : `sprint-4`, `admin`, `users`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Gérer les utilisateurs Gestionnaires (même structure que Demandeurs).

## 📋 Tâches
- [ ] Page `src/app/admin/users/gestionnaires/page.tsx`
- [ ] Même structure que Demandeurs
- [ ] Champs : Prénom, Nom, Email, Mail (doublon?), Fullname, Actif

## ✅ Definition of Done
- [ ] CRUD gestionnaires
- [ ] Même UX que demandeurs

## ⏱️ Estimation
0.5 jour
```

---

### [S4-4] Page Admin Décideurs et Valideurs

**Labels** : `sprint-4`, `admin`, `users`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Gérer Décideurs et Valideurs Unité.

## 📋 Tâches
- [ ] Page décideurs
- [ ] Page valideurs unité (max 4 valideurs)
- [ ] Même structure que gestionnaires
- [ ] Validation : max 4 valideurs unité

## ✅ Definition of Done
- [ ] CRUD décideurs
- [ ] CRUD valideurs (limite 4)
- [ ] Message si limite atteinte

## ⏱️ Estimation
1 jour
```

---

### [S4-5] Page Admin Administrateurs

**Labels** : `sprint-4`, `admin`, `users`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Gérer les administrateurs système.

## 📋 Tâches
- [ ] Page administrateurs
- [ ] Validation : ne peut pas se supprimer soi-même
- [ ] Au moins 1 admin requis dans le système

## ✅ Definition of Done
- [ ] CRUD admins
- [ ] Protections en place
- [ ] Impossible de tout supprimer

## ⏱️ Estimation
0.5 jour
```

---

### [S4-6] Composant DataTable Réutilisable

**Labels** : `sprint-4`, `components`, `ui`  
**Assignee** : Romain

**Description** :
```markdown
## 🎯 Objectif
Extraire un composant DataTable générique réutilisable.

## 📋 Tâches
- [ ] Créer `src/components/organisms/DataTable/index.tsx`
- [ ] Props génériques (columns, data, actions)
- [ ] Tri par colonne
- [ ] Recherche intégrée
- [ ] Pagination
- [ ] Storybook story

## ✅ Definition of Done
- [ ] Composant générique
- [ ] Utilisé dans toutes pages admin
- [ ] Performance OK (>1000 lignes)
- [ ] Story complète

## ⏱️ Estimation
1 jour
```

---

## 📝 Sprint 5 - Demandes Création (Semaine 6)

### [S5-1] Formulaire Création Demande - Partie 1

**Labels** : `sprint-5`, `demandes`, `forms`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Créer le formulaire de création de demande (partie 1 : champs de base).

## 📋 Tâches
- [ ] Page `src/app/demandes/new/page.tsx`
- [ ] Formulaire react-hook-form
- [ ] Champs : Titre, Description, Délai souhaité
- [ ] Validation Zod
- [ ] Design multi-étapes (wizard)

## Champs partie 1
- Titre (requis, max 200)
- Description (requis, textarea)
- Délai souhaité (date)
- Commentaire délai

## ✅ Definition of Done
- [ ] Formulaire responsive
- [ ] Validation temps réel
- [ ] UX fluide

## ⏱️ Estimation
1 jour
```

---

### [S5-2] Formulaire Création Demande - Partie 2

**Labels** : `sprint-5`, `demandes`, `forms`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Compléter le formulaire avec les sélections (Site, Type, Budget, etc.).

## 📋 Tâches
- [ ] Dropdowns : Site, Type, Budget
- [ ] Dropdown : Gestionnaire assigné
- [ ] Prix indicatif
- [ ] Études de rentabilité
- [ ] Validation complète

## Champs partie 2
- Site/Service (select, requis)
- Type de demande (select, requis)
- Budget (select, requis)
- Gestionnaire (select, optionnel)
- Prix indicatif (number)
- Études rentabilité (textarea)

## ✅ Definition of Done
- [ ] Tous champs intégrés
- [ ] Dropdowns chargés depuis BDD
- [ ] Validation complète

## ⏱️ Estimation
1 jour
```

---

### [S5-3] Server Action Création Demande

**Labels** : `sprint-5`, `backend`, `api`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Créer la Server Action pour enregistrer une demande en BDD.

## 📋 Tâches
- [ ] `createDemande(data)` server action
- [ ] Générer le numéro MNTSE unique
- [ ] Définir le statut initial "En attente"
- [ ] Assigner le demandeur (user connecté)
- [ ] Transaction BDD
- [ ] Notifications (optionnel)

## Fichiers
- `src/app/demandes/new/actions.ts`
- `src/core/services/demandes.service.ts`

## ✅ Definition of Done
- [ ] Demande créée en BDD
- [ ] Numéro MNTSE unique
- [ ] Statut correct
- [ ] Gestion d'erreurs

## ⏱️ Estimation
1 jour
```

---

### [S5-4] Upload Pièces Jointes

**Labels** : `sprint-5`, `upload`, `files`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Permettre l'upload de pièces jointes lors de la création.

## 📋 Tâches
- [ ] Composant upload fichier
- [ ] Validation (taille, type)
- [ ] Upload vers Azure Blob Storage (ou local en dev)
- [ ] Association demande ↔ fichiers
- [ ] Liste des fichiers uploadés
- [ ] Suppression fichier

## Contraintes
- Max 10 MB par fichier
- Types : PDF, Images, Word, Excel
- Max 5 fichiers par demande

## ✅ Definition of Done
- [ ] Upload fonctionne
- [ ] Validation correcte
- [ ] Fichiers associés à la demande
- [ ] Liste affichée

## ⏱️ Estimation
1.5 jour
```

---

### [S5-5] Validation et Messages Utilisateur

**Labels** : `sprint-5`, `ux`, `validation`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Affiner la validation et les messages utilisateur du formulaire.

## 📋 Tâches
- [ ] Messages d'erreur clairs par champ
- [ ] Toast de succès après création
- [ ] Loader pendant l'enregistrement
- [ ] Confirmation avant quitter (si non sauvegardé)
- [ ] Redirection vers détail demande

## ✅ Definition of Done
- [ ] UX fluide et intuitive
- [ ] Messages clairs
- [ ] Pas de perte de données

## ⏱️ Estimation
0.5 jour
```

---

## 📋 Sprint 6 - Demandes Liste & Détail (Semaine 7)

### [S6-1] Page Liste Mes Demandes

**Labels** : `sprint-6`, `demandes`, `list`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Créer la page listant toutes les demandes de l'utilisateur connecté.

## 📋 Tâches
- [ ] Page `src/app/demandes/page.tsx`
- [ ] DataTable avec colonnes : Numéro, Titre, Statut, Date, Actions
- [ ] Filtres : Statut, Date, Type, Site
- [ ] Recherche par numéro ou titre
- [ ] Badge de statut (StatusBadge)
- [ ] Pagination

## Colonnes
- Numéro MNTSE
- Titre
- Statut (badge coloré)
- Site
- Type
- Date création
- Actions (Voir détail)

## ✅ Definition of Done
- [ ] Liste complète affichée
- [ ] Filtres fonctionnels
- [ ] Recherche OK
- [ ] Performance <500ms

## ⏱️ Estimation
1 jour
```

---

### [S6-2] Page Détail Demande

**Labels** : `sprint-6`, `demandes`, `detail`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Afficher tous les détails d'une demande.

## 📋 Tâches
- [ ] Page `src/app/demandes/[id]/page.tsx`
- [ ] Affichage de tous les champs
- [ ] Informations demandeur
- [ ] Historique des validations
- [ ] Pièces jointes téléchargeables
- [ ] Bouton Modifier (si statut permet)

## Sections
1. Informations générales
2. Détails techniques
3. Validations
4. Pièces jointes
5. Commentaires

## ✅ Definition of Done
- [ ] Toutes infos affichées
- [ ] Design clair et lisible
- [ ] Historique visible
- [ ] PJ téléchargeables

## ⏱️ Estimation
1 jour
```

---

### [S6-3] Timeline Historique Validations

**Labels** : `sprint-6`, `demandes`, `ui`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Créer un composant Timeline pour afficher l'historique des validations.

## 📋 Tâches
- [ ] Composant `Timeline`
- [ ] Afficher : Date, Valideur, Action, Commentaire
- [ ] Icônes par type (✓, ✗, ⏳)
- [ ] Ordre chronologique inversé
- [ ] Design vertical responsive

## Événements à afficher
- Création demande
- Validation gestionnaire (✓/✗)
- Validation décideur (✓/✗)
- Validation unité 1-4 (✓/✗)
- Abandon

## ✅ Definition of Done
- [ ] Timeline claire
- [ ] Icônes appropriées
- [ ] Responsive
- [ ] Réutilisable

## ⏱️ Estimation
1 jour
```

---

### [S6-4] Modification Demande

**Labels** : `sprint-6`, `demandes`, `edit`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Permettre la modification d'une demande (si statut permet).

## 📋 Tâches
- [ ] Page `src/app/demandes/[id]/edit/page.tsx`
- [ ] Réutiliser formulaire de création
- [ ] Pré-remplir avec données existantes
- [ ] Validation : seulement si statut "En attente" ou "Refusé"
- [ ] Server Action `updateDemande`

## Règles de modification
- Autorisée si : En attente, Refusé, Abandonné
- Interdite si : Validé (en cours ou complet)

## ✅ Definition of Done
- [ ] Modification fonctionne
- [ ] Règles respectées
- [ ] Message si non modifiable

## ⏱️ Estimation
1 jour
```

---

### [S6-5] Export Liste CSV

**Labels** : `sprint-6`, `demandes`, `export`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Permettre l'export de la liste des demandes en CSV.

## 📋 Tâches
- [ ] Bouton "Exporter CSV"
- [ ] Génération fichier CSV côté client
- [ ] Colonnes : Numéro, Titre, Statut, Site, Type, Date
- [ ] Respect des filtres actifs
- [ ] Nom fichier : demandes_YYYYMMDD.csv

## ✅ Definition of Done
- [ ] Export fonctionne
- [ ] CSV valide
- [ ] Nom fichier approprié
- [ ] Encodage UTF-8

## ⏱️ Estimation
0.5 jour (optionnel)
```

---

## ✅ Sprint 7 - Validation Gestionnaire (Semaine 8)

### [S7-1] Page Demandes à Valider (Gestionnaire)

**Labels** : `sprint-7`, `validation`, `gestionnaire`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Liste des demandes en attente de validation par le gestionnaire.

## 📋 Tâches
- [ ] Page `src/app/validation/gestionnaire/page.tsx`
- [ ] DataTable demandes en attente
- [ ] Filtres : Site, Type, Date
- [ ] Tri par ancienneté
- [ ] Bouton action rapide "Valider"

## Critères d'affichage
Afficher les demandes où :
- `Dem_Validation_Gestionnaire` = "En attente"
- `Dem_Gestionnaire` = gestionnaire connecté (optionnel)

## ✅ Definition of Done
- [ ] Liste correcte affichée
- [ ] Filtres OK
- [ ] Actions visibles

## ⏱️ Estimation
1 jour
```

---

### [S7-2] Page Validation Demande (Gestionnaire)

**Labels** : `sprint-7`, `validation`, `gestionnaire`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Page détaillée pour valider ou refuser une demande.

## 📋 Tâches
- [ ] Page `src/app/validation/gestionnaire/[id]/page.tsx`
- [ ] Affichage complet demande
- [ ] Zone commentaire (requis si refus)
- [ ] Boutons : Valider / Refuser
- [ ] Confirmation avant action
- [ ] Server Action validation

## Actions
**Valider** :
- Met `Dem_Validation_Gestionnaire` = "Validé"
- Met `Dem_Date_Validation_Gestionnaire` = NOW()
- Met `Dem_Commentaire_Gestionnaire` = commentaire

**Refuser** :
- Met `Dem_Validation_Gestionnaire` = "Refusé"
- Commentaire obligatoire
- Met statut global = "Refusé"

## ✅ Definition of Done
- [ ] Validation fonctionne
- [ ] Refus fonctionne
- [ ] Commentaire obligatoire si refus
- [ ] Workflow correct

## ⏱️ Estimation
1.5 jour
```

---

### [S7-3] Notifications Email (Optionnel)

**Labels** : `sprint-7`, `notifications`, `email`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Envoyer un email au demandeur après validation/refus.

## 📋 Tâches
- [ ] Intégrer service email (Resend, SendGrid, ou SMTP)
- [ ] Template email validation
- [ ] Template email refus
- [ ] Envoi asynchrone
- [ ] Logs d'envoi

## Contenu email validation
```
Objet : Demande [Numéro] validée par le gestionnaire

Bonjour [Nom],

Votre demande [Titre] a été validée par le gestionnaire.
Numéro : [Numéro MNTSE]
Commentaire : [Commentaire]

Cordialement,
L'équipe Maintenance
```

## ✅ Definition of Done
- [ ] Emails envoyés
- [ ] Templates clairs
- [ ] Logs fonctionnels

## ⏱️ Estimation
1 jour (optionnel)
```

---

### [S7-4] Statistiques Gestionnaire

**Labels** : `sprint-7`, `stats`, `gestionnaire`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Ajouter des statistiques sur le dashboard gestionnaire.

## 📋 Tâches
- [ ] Compléter dashboard gestionnaire (S2-3)
- [ ] Stats : Nb validées cette semaine, Nb refusées
- [ ] Délai moyen de validation
- [ ] Graphique évolution validations

## ✅ Definition of Done
- [ ] Stats pertinentes
- [ ] Calculs corrects
- [ ] Graphique clair

## ⏱️ Estimation
0.5 jour
```

---

### [S7-5] Historique Validations Gestionnaire

**Labels** : `sprint-7`, `validation`, `history`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Page historique des validations effectuées par le gestionnaire.

## 📋 Tâches
- [ ] Page `src/app/validation/gestionnaire/history/page.tsx`
- [ ] Liste des demandes traitées
- [ ] Filtres : Validé/Refusé, Date
- [ ] Export CSV

## ✅ Definition of Done
- [ ] Historique complet
- [ ] Filtres OK
- [ ] Export fonctionne

## ⏱️ Estimation
1 jour
```

---

## 👔 Sprint 8 - Validation Décideur & Valideur (Semaine 9)

### [S8-1] Page Validation Décideur

**Labels** : `sprint-8`, `validation`, `decideur`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Workflow de validation pour le décideur (niveau 2).

## 📋 Tâches
- [ ] Page `src/app/validation/decideur/page.tsx`
- [ ] Liste demandes où gestionnaire a validé
- [ ] Page validation (même structure que gestionnaire)
- [ ] Server Action validation décideur

## Critères d'affichage
- `Dem_Validation_Gestionnaire` = "Validé"
- `Dem_Validation_Decideur` = "En attente"

## Actions
**Valider** : Met `Dem_Validation_Decideur` = "Validé"
**Refuser** : Met `Dem_Validation_Decideur` = "Refusé" + statut global

## ✅ Definition of Done
- [ ] Workflow décideur complet
- [ ] Même UX que gestionnaire
- [ ] Workflow correct

## ⏱️ Estimation
1 jour
```

---

### [S8-2] Workflow Valideur Unité (4 valideurs)

**Labels** : `sprint-8`, `validation`, `valideur`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Gérer les 4 valideurs unité (validation niveau 3).

## 📋 Tâches
- [ ] Page valideur unité
- [ ] Logique : 4 validations séquentielles
- [ ] Chaque valideur voit seulement ce qui le concerne
- [ ] Server Actions pour chaque valideur

## Logique des 4 valideurs
1. Valideur 1 valide → passe à Valideur 2
2. Valideur 2 valide → passe à Valideur 3
3. Valideur 3 valide → passe à Valideur 4
4. Valideur 4 valide → Demande complètement validée

Si un valideur refuse → statut global "Refusé"

## Champs BDD
- `Dem_Valideur1` / `Dem_Validation_Valideur1` / `Dem_Date_Validation_Valideur1`
- Idem pour Valideur 2, 3, 4

## ✅ Definition of Done
- [ ] 4 validations séquentielles OK
- [ ] Workflow correct
- [ ] Refus bloque le processus

## ⏱️ Estimation
2 jours
```

---

### [S8-3] Dashboard Workflow Global

**Labels** : `sprint-8`, `dashboard`, `workflow`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Vue globale du workflow de validation pour les admins.

## 📋 Tâches
- [ ] Page `src/app/workflow/page.tsx`
- [ ] Schéma visuel du workflow
- [ ] Stats par étape de validation
- [ ] Demandes bloquées (highlights)

## Stats à afficher
- En attente gestionnaire : X
- En attente décideur : X
- En attente valideurs unité : X
- Validées complètes : X
- Refusées : X

## ✅ Definition of Done
- [ ] Vue globale claire
- [ ] Schéma workflow compréhensible
- [ ] Stats pertinentes

## ⏱️ Estimation
1 jour
```

---

### [S8-4] Notifications Multi-étapes

**Labels** : `sprint-8`, `notifications`, `workflow`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Envoyer des notifications à chaque étape du workflow.

## 📋 Tâches
- [ ] Notifications après validation gestionnaire
- [ ] Notifications après validation décideur
- [ ] Notifications après chaque valideur unité
- [ ] Notification finale au demandeur
- [ ] In-app notifications (optionnel)

## Destinataires
- Validation gestionnaire → Décideur + Demandeur
- Validation décideur → Valideurs Unité + Demandeur
- Validation valideur → Valideur suivant + Demandeur
- Validation finale → Demandeur

## ✅ Definition of Done
- [ ] Notifications à chaque étape
- [ ] Emails envoyés
- [ ] Logs corrects

## ⏱️ Estimation
1 jour
```

---

### [S8-5] Tests End-to-End Workflow Complet

**Labels** : `sprint-8`, `testing`, `e2e`  
**Assignee** : Marie

**Description** :
```markdown
## 🎯 Objectif
Tester le workflow complet de bout en bout.

## 📋 Tâches
- [ ] Test : Création → Validation complète
- [ ] Test : Création → Refus gestionnaire
- [ ] Test : Création → Refus décideur
- [ ] Test : Création → Refus valideur
- [ ] Test : Abandon demande
- [ ] Corriger bugs identifiés

## Scénarios à tester
1. Happy path : Tout validé
2. Refus niveau 1
3. Refus niveau 2
4. Refus niveau 3
5. Modification après refus

## ✅ Definition of Done
- [ ] Tous scénarios testés
- [ ] Aucun bug bloquant
- [ ] Workflow fluide

## ⏱️ Estimation
1 jour
```

---

## 📊 Résumé

- **Sprint 1** : 5 issues (Auth & Layout)
- **Sprint 2** : 5 issues (Dashboards)
- **Sprint 3** : 5 issues (Admin Sites/Types)
- **Sprint 4** : 6 issues (Admin Budgets/Users)
- **Sprint 5** : 5 issues (Création demandes)
- **Sprint 6** : 5 issues (Liste/Détail)
- **Sprint 7** : 5 issues (Validation Gestionnaire)
- **Sprint 8** : 5 issues (Validation Décideur/Valideur)

**Total** : **41 issues** à créer sur GitHub

---

> **Document créé pour** : Sprint 0 - Issue S0-5  
> **Date** : Janvier 2026  
> **Version** : 1.0
