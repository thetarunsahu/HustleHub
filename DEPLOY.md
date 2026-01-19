# HustleHub Deployment Guide (Free Tier)

Follow these steps to deploy HustleHub for free using **Render** (Backend) and **Vercel** (Frontend).

---

## 📋 Prerequisites
1.  A **GitHub Account**.
2.  Code pushed to a GitHub repository.
3.  Accounts on [Render.com](https://render.com) and [Vercel.com](https://vercel.com).

---

## 🚀 Phase 1: Deploy Backend (Render)

1.  Log in to **[Render Dashboard](https://dashboard.render.com/)**.
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository.
4.  Configure the service:
    *   **Name**: `hustlehub-api` (or similar)
    *   **Root Directory**: `backend`  <-- **CRITICAL**: Do not miss this.
    *   **Environment**: `Node`
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start`
    *   **Instance Type**: Free
5.  **Environment Variables**:
    *   Scroll down to "Environment Variables".
    *   Add Key: `NODE_ENV` | Value: `production`
    *   *(Note: No MONGO_URI needed for now; it will auto-use the In-Memory DB).*
6.  Click **Create Web Service**.
7.  Wait for deployment to finish. **Copy the URL** provided at the top left (e.g., `https://hustlehub-api.onrender.com`).
    *   *Note: The free tier spins down after inactivity. The first request might take 50s.*

---

## 🌐 Phase 2: Deploy Frontend (Vercel)

1.  Log in to **[Vercel Dashboard](https://vercel.com/dashboard)**.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  Configure the project:
    *   **Framework Preset**: Vite (should be auto-detected).
    *   **Root Directory**: `./` (default).
5.  **Environment Variables**:
    *   Click to expand.
    *   Name: `VITE_API_URL`
    *   Value: `YOUR_RENDER_URL/api` 
        *   *Example*: `https://hustlehub-api.onrender.com/api`
6.  Click **Deploy**.
7.  Wait for the build. Once done, **Copy your new Domain** (e.g., `hustlehub.vercel.app`).

---

## 🔐 Phase 3: Configure Firebase Auth

1.  Go to the **[Firebase Console](https://console.firebase.google.com/)**.
2.  Select your project (**hustlehub**).
3.  Navigate to **Authentication** -> **Settings** -> **Authorized Domains**.
4.  Click **Add Domain**.
5.  Paste your Vercel domain (e.g., `hustlehub.vercel.app`).
    *   *Without this, Google/Phone Sign-In will fail.*

---

## ✅ Verification
1.  Open your Vercel URL.
2.  **Test Backend**: Try to **Login** or **Register**. If it works, the frontend is successfully talking to the Render backend.
3.  **Test Auth**: Try **Google Sign-In**. If the popup opens and succeeds, Firebase is configured correctly.

**🎉 You are live!**
