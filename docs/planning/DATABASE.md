# 📊 Base de Données - WF_Demandes_Maintenance

**Serveur** : `gbensqlsvrpowerappsprd.database.windows.net`  
**Base** : `WF_Demandes_Maintenance`  
**Date d'analyse** : 05/01/2026  
**Source** : Métadonnées PowerApps

---

## 📋 Vue d'ensemble

Cette base contient **9 tables** :

- `Demandeur`
- `Type_Demande`
- `Sites_Services`
- `Gestionnaire`
- `Valideur_Unite`
- `Demande`
- `Decideur`
- `Budget`
- `Administrateur`

---

## 🗂️ Schéma Détaillé

### Table : `Demandeur`

**Table SQL** : `[dbo].[Demandeur]`  
**Nombre de colonnes** : 6

| Colonne | Type | Max Length | Nullable | Primary Key | Read-Only |
|---------|------|------------|----------|-------------|----------|
| `Dema_Id` | integer(int64) | - | ✅ | 🔑 | 🔒 |
| `Dema_Prenom` | string | 50 | ✅ | - | ✏️ |
| `Dema_Nom` | string | 50 | ✅ | - | ✏️ |
| `Dema_Mail` | string | 50 | ✅ | - | ✏️ |
| `Dema_Fullname` | string | 50 | ✅ | - | ✏️ |
| `Dema_Actif` | boolean | - | ✅ | - | ✏️ |

---

### Table : `Type_Demande`

**Table SQL** : `[dbo].[Type_Demande]`  
**Nombre de colonnes** : 2

| Colonne | Type | Max Length | Nullable | Primary Key | Read-Only |
|---------|------|------------|----------|-------------|----------|
| `Typ_Id` | integer(int64) | - | ✅ | 🔑 | 🔒 |
| `Typ_nom` | string | 50 | ✅ | - | ✏️ |

---

### Table : `Sites_Services`

**Table SQL** : `[dbo].[Sites_Services]`  
**Nombre de colonnes** : 2

| Colonne | Type | Max Length | Nullable | Primary Key | Read-Only |
|---------|------|------------|----------|-------------|----------|
| `Sit_Id` | integer(int64) | - | ✅ | 🔑 | 🔒 |
| `Sit_Nom` | string | 50 | ✅ | - | ✏️ |

---

### Table : `Gestionnaire`

**Table SQL** : `[dbo].[Gestionnaire]`  
**Nombre de colonnes** : 5

| Colonne | Type | Max Length | Nullable | Primary Key | Read-Only |
|---------|------|------------|----------|-------------|----------|
| `Ges_Id` | integer(int32) | - | ✅ | 🔑 | 🔒 |
| `Ges_Prenom` | string | 50 | ✅ | - | ✏️ |
| `Ges_Nom` | string | 50 | ✅ | - | ✏️ |
| `Ges_mail` | string | 50 | ✅ | - | ✏️ |
| `Ges_Fullname` | string | 50 | ✅ | - | ✏️ |

---

### Table : `Valideur_Unite`

**Table SQL** : `[dbo].[Valideur_Unite]`  
**Nombre de colonnes** : 6

| Colonne | Type | Max Length | Nullable | Primary Key | Read-Only |
|---------|------|------------|----------|-------------|----------|
| `Val_Id` | integer(int64) | - | ✅ | 🔑 | 🔒 |
| `Val_Prenom` | string | 50 | ✅ | - | ✏️ |
| `Val_Nom` | string | 50 | ✅ | - | ✏️ |
| `Val_Mail` | string | 50 | ✅ | - | ✏️ |
| `Val_Fullname` | string | 50 | ✅ | - | ✏️ |
| `Val_Actif` | boolean | - | ✅ | - | ✏️ |

---

### Table : `Demande`

**Table SQL** : `[dbo].[Demande]`  
**Nombre de colonnes** : 45

| Colonne | Type | Max Length | Nullable | Primary Key | Read-Only |
|---------|------|------------|----------|-------------|----------|
| `Dem_Id` | integer(int64) | - | ✅ | 🔑 | 🔒 |
| `Dem_Titre` | string | 255 | ✅ | - | ✏️ |
| `Dem_Sites_Services` | integer(int64) | - | ✅ | - | ✏️ |
| `Dem_Type_Demande` | integer(int64) | - | ✅ | - | ✏️ |
| `Dem_Budget` | integer(int64) | - | ✅ | - | ✏️ |
| `Dem_Numero_Compte_Imputation` | string | 255 | ✅ | - | ✏️ |
| `Dem_Descriptif` | string | 255 | ✅ | - | ✏️ |
| `Dem_Delai_Souhaite` | string(date) | - | ✅ | - | ✏️ |
| `Dem_Code_Projet` | integer(int32) | - | ✅ | - | ✏️ |
| `Dem_Etudes_Rentabilite` | string | 255 | ✅ | - | ✏️ |
| `Dem_Fournisseur_Souhaite` | string | 50 | ✅ | - | ✏️ |
| `Dem_Prix_Indicatif` | number(currency) | - | ✅ | - | ✏️ |
| `Dem_Validation_Unite` | boolean | - | ✅ | - | ✏️ |
| `Dem_Validation_Decideur` | boolean | - | ✅ | - | ✏️ |
| `Dem_Gestionnaire` | integer(int32) | - | ✅ | - | ✏️ |
| `Dem_Decideur` | integer(int64) | - | ✅ | - | ✏️ |
| `Dem_Delai` | string(date) | - | ✅ | - | ✏️ |
| `Dem_Numero_Mntse` | string | 50 | ✅ | - | ✏️ |
| `Dem_Valideur1` | integer(int64) | - | ✅ | - | ✏️ |
| `Dem_Valideur2` | integer(int64) | - | ✅ | - | ✏️ |
| `Dem_Valideur3` | integer(int64) | - | ✅ | - | ✏️ |
| `Dem_Valideur4` | integer(int64) | - | ✅ | - | ✏️ |
| `Dem_Validation_Valideur1` | boolean | - | ✅ | - | ✏️ |
| `Dem_Validation_Valideur2` | boolean | - | ✅ | - | ✏️ |
| `Dem_Validation_Valideur3` | boolean | - | ✅ | - | ✏️ |
| `Dem_Validation_Valideur4` | boolean | - | ✅ | - | ✏️ |
| `Dem_Validation_Gestionnaire` | boolean | - | ✅ | - | ✏️ |
| `Dem_Prix` | number(currency) | - | ✅ | - | ✏️ |
| `Dem_Fournisseur` | string | 50 | ✅ | - | ✏️ |
| `Dem_Assigne_A` | string | 50 | ✅ | - | ✏️ |
| `Dem_Cree_Par` | integer(int64) | - | ✅ | - | ✏️ |
| `Dem_Commentaire_Abandon` | string | 255 | ✅ | - | ✏️ |
| `Dem_Commentaire_Unite` | string | 255 | ✅ | - | ✏️ |
| `Dem_Commentaire_Demandeur` | string | 255 | ✅ | - | ✏️ |
| `Dem_Commentaire_Delai` | string | 255 | ✅ | - | ✏️ |
| `Dem_Etat_Demande` | string | 50 | ✅ | - | ✏️ |
| `Dem_pieces_jointes` | string(byte) | - | ✅ | - | ✏️ |
| `Dem_Validation_Demandeur` | boolean | - | ✅ | - | ✏️ |
| `Dem_Remarques` | string | 255 | ✅ | - | ✏️ |
| `Dem_Date_Creation` | string(date) | - | ✅ | - | ✏️ |
| `Dem_Date_Validation_Unite` | string(date) | - | ✅ | - | ✏️ |
| `Dem_Date_Validation_Demandeur` | string(date) | - | ✅ | - | ✏️ |
| `Dem_Date_Validation_Gestionnaire` | string(date) | - | ✅ | - | ✏️ |
| `Dem_Date_Validation_Decideur` | string(date) | - | ✅ | - | ✏️ |
| `Dem_Cree_Par_Labele` | string | 255 | ✅ | - | ✏️ |

---

### Table : `Decideur`

**Table SQL** : `[dbo].[Decideur]`  
**Nombre de colonnes** : 5

| Colonne | Type | Max Length | Nullable | Primary Key | Read-Only |
|---------|------|------------|----------|-------------|----------|
| `Dec_Id` | integer(int64) | - | ✅ | 🔑 | 🔒 |
| `Dec_Prenom` | string | 50 | ✅ | - | ✏️ |
| `Dec_Nom` | string | 50 | ✅ | - | ✏️ |
| `Dec_Mail` | string | 50 | ✅ | - | ✏️ |
| `Dec_Fullname` | string | 50 | ✅ | - | ✏️ |

---

### Table : `Budget`

**Table SQL** : `[dbo].[Budget]`  
**Nombre de colonnes** : 2

| Colonne | Type | Max Length | Nullable | Primary Key | Read-Only |
|---------|------|------------|----------|-------------|----------|
| `Bud_Id` | integer(int64) | - | ✅ | 🔑 | 🔒 |
| `Bud_Nom` | string | 50 | ✅ | - | ✏️ |

---

### Table : `Administrateur`

**Table SQL** : `[dbo].[Administrateur]`  
**Nombre de colonnes** : 4

| Colonne | Type | Max Length | Nullable | Primary Key | Read-Only |
|---------|------|------------|----------|-------------|----------|
| `Adm_Id` | integer(int64) | - | ✅ | 🔑 | 🔒 |
| `Adm_Nom` | string | 50 | ✅ | - | ✏️ |
| `Adm_Prenom` | string | 50 | ✅ | - | ✏️ |
| `Adm_Fullname` | string | 100 | ✅ | - | ✏️ |

---

## 🔗 Relations Identifiées

Basé sur les conventions de nommage :

- `Demande.Dem_Type_Demande` → `Demandeur` (probable)
- `Demande.Dem_Budget` → `Budget` (probable)
- `Demande.Dem_Validation_Decideur` → `Decideur` (probable)
- `Demande.Dem_Gestionnaire` → `Gestionnaire` (probable)
- `Demande.Dem_Decideur` → `Decideur` (probable)
- `Demande.Dem_Validation_Gestionnaire` → `Gestionnaire` (probable)
- `Demande.Dem_Assigne_A` → `Administrateur` (probable)
- `Demande.Dem_Commentaire_Demandeur` → `Demandeur` (probable)
- `Demande.Dem_Etat_Demande` → `Demandeur` (probable)
- `Demande.Dem_Validation_Demandeur` → `Demandeur` (probable)
- `Demande.Dem_Date_Validation_Demandeur` → `Demandeur` (probable)
- `Demande.Dem_Date_Validation_Gestionnaire` → `Gestionnaire` (probable)
- `Demande.Dem_Date_Validation_Decideur` → `Decideur` (probable)

---

