# 🎨 Guide du Design System

## 📋 Qu'est-ce qu'un Design System ?

Un **Design System** est comme une **boîte à outils** qui contient tous les composants visuels (boutons, formulaires, etc.) que l'on utilise dans l'application.

**Pourquoi c'est utile ?**
- ✅ **Cohérence** : Tous les boutons, tous les formulaires se ressemblent partout dans l'app
- ✅ **Rapidité** : Au lieu de recréer un bouton à chaque fois, on réutilise le même
- ✅ **Maintenance** : Si on change un composant, ça change partout automatiquement

---

## 🧱 Architecture : Atomic Design

Notre app est organisée en **3 niveaux** (du plus petit au plus gros) :

```
⚛️  ATOMS (Atomes)          - Les briques de base
    ↓
🧬  MOLECULES (Molécules)    - Combinaison d'atomes
    ↓
🦠  ORGANISMS (Organismes)   - Combinaison de molécules
```

### ⚛️ Atoms (9 composants)

**Ce sont les plus petits composants** - on ne peut pas les diviser davantage.

| Composant | Usage | Exemple |
|-----------|-------|---------|
| `Button` | Bouton cliquable | "Enregistrer", "Annuler" |
| `Input` | Champ de saisie | Email, nom, etc. |
| `Label` | Étiquette de champ | "Nom :", "Email :" |
| `Badge` | Petite étiquette | Nouveau composant ! |
| `StatusBadge` | Badge de statut | ⏳ En attente, ✅ Validé |
| `Avatar` | Photo de profil | Image ronde de l'utilisateur |
| `Table` | Tableau de données | Liste de demandes |
| `Select` | Liste déroulante | Choix d'un site |
| `Checkbox` | Case à cocher | J'accepte les conditions |

### 🧬 Molecules (9 composants)

**Combinaison d'atomes** pour former quelque chose d'utile.

| Composant | Usage | Composition |
|-----------|-------|-------------|
| `InputWithLabel` | Champ avec étiquette | Label + Input |
| `ButtonWithIcon` | Bouton avec icône | Button + Icon |
| `ButtonLink` | Bouton qui navigue | Button + Link |
| `Dialog` | Fenêtre modale | Popup avec contenu |
| `DropDownMenu` | Menu déroulant | Bouton + Liste d'options |
| `NavigationMenu` | Menu de navigation | Liste de liens |
| `PopUp` | Info-bulle | Texte qui apparaît au survol |
| `ToolTip` | Bulle d'aide | Mini texte explicatif |
| `ButtonsList` | Groupe de boutons | Plusieurs boutons alignés |

### 🦠 Organisms (4 composants)

**Gros composants** qui forment des sections complètes de l'interface.

| Composant | Usage |
|-----------|-------|
| `Header` | Barre de navigation en haut |
| `HeaderWrapper` | Conteneur du header avec auth |
| `DataTable` | Tableau avec tri, filtre, pagination |
| `EditTable` | Tableau modifiable |

---

## 🎨 Palette de Couleurs

### Couleurs principales

```typescript
primary    - Couleur principale (bleu Bénéteau)
secondary  - Couleur secondaire
success    - Vert pour succès
warning    - Orange pour attention
error      - Rouge pour erreur
```

### Couleurs des statuts de demandes

```typescript
status.pending    - #FCD34D (Jaune)  → En attente
status.approved   - #34D399 (Vert)   → Validé
status.rejected   - #F87171 (Rouge)  → Refusé  
status.abandoned  - #9CA3AF (Gris)   → Abandonné
```

---

## 📖 Comment utiliser les composants ?

### Exemple 1 : Afficher un statut

```tsx
import { StatusBadge } from "@/components/atoms/StatusBadge";

function MaDemande() {
  return (
    <div>
      <h2>Ma demande</h2>
      <StatusBadge status="En attente" />
    </div>
  );
}
```

**Résultat** : ⏳ En attente (avec fond jaune)

### Exemple 2 : Créer un formulaire

```tsx
import { InputWithLabel } from "@/components/molecules/InputWithLabel";
import { Button } from "@/components/atoms/Button";

function MonFormulaire() {
  return (
    <form>
      <InputWithLabel 
        label="Titre de la demande" 
        placeholder="Ex: Réparation machine"
      />
      <Button type="submit">Envoyer</Button>
    </form>
  );
}
```

### Exemple 3 : Afficher un tableau de demandes

```tsx
import { DataTable } from "@/components/organisms/DataTable";
import { StatusBadge } from "@/components/atoms/StatusBadge";

const columns = [
  { header: "Numéro", accessor: "numero" },
  { header: "Titre", accessor: "titre" },
  { 
    header: "Statut", 
    accessor: "statut",
    cell: (value) => <StatusBadge status={value} />
  },
];

const data = [
  { numero: "DM-001", titre: "Réparation", statut: "En attente" },
  { numero: "DM-002", titre: "Installation", statut: "Validé" },
];

function ListeDemandes() {
  return <DataTable columns={columns} data={data} />;
}
```

---

## 🔍 Storybook - Tester les composants

**Storybook** est une interface où tu peux **voir et tester** tous les composants sans avoir à lancer toute l'application.

### Lancer Storybook

```bash
pnpm storybook
```

Puis ouvre http://localhost:6006

### À quoi ça sert ?

- 👀 **Voir** tous les composants disponibles
- 🎨 **Tester** les différentes variantes (couleurs, tailles, etc.)
- 📝 **Documentation** automatique de chaque composant
- ✅ **Valider** que tout fonctionne avant d'utiliser dans l'app

---

## ✅ Bonnes pratiques

### 1. Toujours réutiliser les composants existants

❌ **Mauvais** : Créer un nouveau bouton à chaque fois
```tsx
<button className="bg-blue-500 text-white px-4 py-2">
  Cliquer
</button>
```

✅ **Bon** : Utiliser le composant Button
```tsx
<Button>Cliquer</Button>
```

### 2. Utiliser StatusBadge pour les statuts

❌ **Mauvais** : Écrire le statut en texte brut
```tsx
<span>En attente</span>
```

✅ **Bon** : Utiliser StatusBadge
```tsx
<StatusBadge status="En attente" />
```

### 3. Ne pas mélanger les niveaux

❌ **Mauvais** : Mettre un organism dans un atom

✅ **Bon** : Respecter la hiérarchie
- Atoms utilisent uniquement du HTML de base
- Molecules utilisent des Atoms
- Organisms utilisent des Molecules

---

## 📚 Ressources

- **Storybook local** : http://localhost:6006
- **Tailwind Config** : `tailwind.config.ts`
- **Composants** : `src/components/`

---

> **Note** : Ce guide sera enrichi au fur et à mesure de l'ajout de nouveaux composants.
