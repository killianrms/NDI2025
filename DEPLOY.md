# 🚀 Guide de Déploiement GitHub Pages

## ✅ Préparatifs

La branche `deploy` est configurée pour le déploiement statique :
- Next.js configuré avec `output: 'export'`
- Images non optimisées (nécessaire pour export statique)
- Clé API Groq incluse dans `.env.local`

## 📦 Déploiement Automatique avec GitHub Actions

### 1. Configurer GitHub Pages

1. Aller dans **Settings** > **Pages** du repo
2. Source : sélectionner **GitHub Actions**

### 2. Créer le Workflow

Créer `.github/workflows/deploy.yml` :

\`\`\`yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["deploy"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: |
          cd nird-app
          npm ci

      - name: Build with Next.js
        run: |
          cd nird-app
          npm run build
        env:
          GROQ_API_KEY: \${{ secrets.GROQ_API_KEY }}

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./nird-app/out

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
\`\`\`

### 3. Ajouter le Secret GROQ_API_KEY

1. Aller dans **Settings** > **Secrets and variables** > **Actions**
2. Cliquer sur **New repository secret**
3. Name: `GROQ_API_KEY`
4. Value: `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`
5. Cliquer sur **Add secret**

### 4. Déployer

```bash
# Créer le workflow
mkdir -p .github/workflows
# Copier le contenu ci-dessus dans .github/workflows/deploy.yml

git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages workflow"
git push origin deploy
```

Le site sera déployé automatiquement sur : `https://killianrms.github.io/NDI2025/`

---

## 🔧 Build Manuel (pour tester)

```bash
# Sur la branche deploy
git checkout deploy

# Build
npm run build

# Le site statique est dans le dossier out/
```

---

## ✅ Vérification Post-Déploiement

Tester toutes les fonctionnalités :
- ✅ Page d'accueil
- ✅ Simulateur d'empreinte
- ✅ Test de connaissances  
- ✅ Carte interactive
- ✅ Password Game
- ✅ Chatbot Jean-Philosophe

---

## 🆘 Dépannage

### Le build échoue
- Vérifier que Node.js >= 18
- Essayer `npm ci` au lieu de `npm install`

### Le chatbot ne répond pas
- Vérifier que le secret `GROQ_API_KEY` est configuré
- Check les logs de GitHub Actions

### Styles/Images cassés
- Peut nécessiter d'ajouter `basePath` dans next.config.js si l'URL contient un sous-dossier

---

**Bon déploiement ! 🚀**
