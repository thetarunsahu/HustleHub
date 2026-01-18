# HustleHub Deployment Guide

The code is pre-configured for deployment. Follow these steps to take your app live.

## 1. Backend Deployment (Render)
Recommended: **Render** (Free Tier, supports Node.js + MongoDB)

1.  **Push to GitHub**: Connect this folder to a GitHub repository.
2.  **Create Web Service**:
    - Go to [render.com](https://render.com).
    - Select **New +** -> **Web Service**.
    - Connect your GitHub repo.
3.  **Configure Service**:
    - **Root Directory**: `backend`
    - **Build Command**: `npm install`
    - **Start Command**: `node server.js`
4.  **Environment Variables**:
    Add the following variables in the Render dashboard:
    - `MONGO_URI`: Your MongoDB Atlas Connection String.
    - `JWT_SECRET`: A secure random string.
    - `PORT`: `10000` (Render sets this automatically usually).
5.  **Deploy**: Click "Create Web Service".
6.  **Copy URL**: Once live, copy your backend URL (e.g., `https://hustlehub.onrender.com`).

## 2. Frontend Deployment (Vercel)
Recommended: **Vercel** (Fastest for React/Vite)

1.  **Dashboard**: Go to [vercel.com](https://vercel.com).
2.  **Add New Project**: Import the same GitHub repo.
3.  **Configure Project**:
    - **Framework Preset**: Vite
    - **Root Directory**: `./` (default)
4.  **Environment Variables**:
    - `VITE_API_URL`: Paste your **Backend URL** from Step 1 (append `/api` if needed).
    - Example: `https://hustlehub.onrender.com/api`
5.  **Deploy**: Click "Deploy".

## 3. Verification
- Open your Vercel URL.
- Try **Sign Up**.
- If it works, your full-stack app is live!

> **Troubleshooting**: If you see "Network Error", check the browser console. It usually means `VITE_API_URL` is wrong or the Backend is sleeping (Render free tier takes 50s to wake up).
