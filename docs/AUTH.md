# 🔐 Authentification Azure AD

## 📋 Vue d'ensemble

L'application utilise **NextAuth.js** avec le provider **Azure Active Directory** pour l'authentification.

### Stack
- **NextAuth.js v4** - Gestion de l'authentification
- **Azure AD** - Provider d'authentification Microsoft
- **JWT** - Stratégie de session

---

## ⚙️ Configuration

### Variables d'environnement requises

Ajoutez ces variables dans votre fichier `.env` :

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_string_here

# Azure AD App Registration
AZURE_AD_CLIENT_ID=your_azure_ad_client_id
AZURE_AD_CLIENT_SECRET=your_azure_ad_client_secret
AZURE_AD_TENANT_ID=your_azure_ad_tenant_id
AZURE_AD_SCOPE=openid profile email
```

> **Note pour le développement** : En attendant la création de l'App Registration dédiée, 
> vous pouvez utiliser temporairement les credentials d'une autre application Azure AD 
> (ex: app Print) pour tester l'authentification en local.

### Comment obtenir les credentials Azure AD

1. Aller sur [Azure Portal](https://portal.azure.com)
2. Naviguer vers **Azure Active Directory** > **App registrations**
3. Créer une nouvelle application (ou utiliser une existante)
4. Récupérer :
   - **Client ID** (Application ID)
   - **Tenant ID** (Directory ID)
5. Créer un **Client Secret** dans "Certificates & secrets"
6. Configurer les **Redirect URIs** :
   - `http://localhost:3000/api/auth/callback/azure-ad` (dev)
   - `https://votre-domaine.com/api/auth/callback/azure-ad` (prod)

---

## 🔧 Utilisation

### Hook `useCurrentUser()`

Hook client-side pour accéder aux informations de l'utilisateur connecté.

```tsx
"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function MaPage() {
  const { name, email, isAuthenticated, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <div>Vous devez être connecté</div>;
  }

  return (
    <div>
      <h1>Bonjour {name}</h1>
      <p>Email: {email}</p>
    </div>
  );
}
```

### Boutons Login / Logout

```tsx
"use client";

import { signIn, signOut } from "next-auth/react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function AuthButtons() {
  const { isAuthenticated } = useCurrentUser();

  if (isAuthenticated) {
    return (
      <button onClick={() => signOut()}>
        Déconnexion
      </button>
    );
  }

  return (
    <button onClick={() => signIn("azure-ad")}>
      Connexion Azure AD
    </button>
  );
}
```

### Server-side (Server Components)

```tsx
import { getServerSession } from "next-auth/next";
import authOptions from "@/auth.config";

export default async function MaPageServer() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Non connecté</div>;
  }

  return (
    <div>
      <h1>Bonjour {session.user?.name}</h1>
    </div>
  );
}
```

---

## 🛡️ Protection des routes

### Middleware automatique

Le fichier `src/middleware.ts` protège automatiquement toutes les routes sauf :
- `/` (page d'accueil publique)
- `/api/auth/*` (routes NextAuth)

En **développement** (`NODE_ENV=development`), toutes les routes sont accessibles sans authentification.

En **production**, les routes privées redirigent vers `/` si l'utilisateur n'est pas connecté.

### Désactiver la protection (dev uniquement)

Dans `src/app/layout.tsx`, la redirection automatique est désactivée en dev :

```tsx
{process.env.NODE_ENV !== 'development' && !session && <SignInRedirect />}
```

---

## 📁 Structure des fichiers

```
src/
├── app/
│   ├── layout.tsx              # Layout racine avec AuthProvider
│   ├── SignInRedirect.tsx      # Composant de redirection
│   └── SignOutRedirect.tsx     # Composant de déconnexion
├── contexts/
│   └── auth.tsx                # AuthProvider (wrapper SessionProvider)
├── hooks/
│   └── useCurrentUser.ts       # Hook pour accéder au user
├── middleware.ts               # Protection des routes
├── page/
│   └── api/
│       └── auth/
│           └── [...nextauth].ts # Configuration NextAuth
└── auth.config.ts              # Config partagée
```

---

## 🧪 Tests

### Tester en local

1. Configurer les variables d'environnement dans `.env`
2. Lancer l'application : `pnpm dev`
3. Cliquer sur "Connexion" → Redirection vers Azure AD
4. Se connecter avec un compte Microsoft valide
5. Vérifier que vous êtes redirigé vers l'application

### Mode développement (sans Azure AD)

En développement, vous pouvez travailler sans authentification :
- `NODE_ENV=development` désactive les redirections forcées
- Toutes les routes sont accessibles

---

## 🚀 Prochaines étapes (quand les specs métier seront définies)

- [ ] Ajouter la récupération du **rôle** utilisateur depuis la BDD
- [ ] Créer un hook `useUserRole()` pour gérer les permissions
- [ ] Implémenter les rôles : Demandeur, Gestionnaire, Décideur, ValideurUnite, Admin
- [ ] Protéger les routes par rôle (ex: `/admin` uniquement pour Admin)
- [ ] Ajouter les guards de permissions dans les composants

---

## 📚 Ressources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Azure AD Provider](https://next-auth.js.org/providers/azure-ad)
- [JWT Strategy](https://next-auth.js.org/configuration/options#session)
