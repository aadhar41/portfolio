# 🚀 Deploying a Full-Stack Application (Laravel + React) for Free

Deploying a full-stack application (Laravel + React) completely free requires three distinct parts:  
- A **static host** for the React frontend  
- A **PHP runtime** for the Laravel API  
- A **managed database**  

This guide outlines the most reliable **"Free Stack" strategy**.

---

## 1️⃣ The Strategy: The "Splitting" Method

For best performance and zero cost, host the frontend and backend separately:

- **Frontend (React)**: Vercel or Netlify  
- **Backend (Laravel API)**: Render or Koyeb  
- **Database (MySQL)**: Aiven or TiDB Cloud  

---

## 2️⃣ Step-by-Step "How-To"

### Phase A: The Database (Aiven)
Most free backend hosts don’t include a permanent database.

1. Sign up for **Aiven** and create a *Free Plan* MySQL instance.  
2. Copy the Host, Port, Database Name, User, and Password.  
3. Update your Laravel `.env` with these details to test remote connectivity.  

---

### Phase B: The Backend (Render)
Render offers a free tier for web services.

1. Connect your GitHub repository.  
2. Select the **portfolio-backend** folder as the root.  
3. Add all `.env` keys (APP_KEY, DB_HOST, etc.) to the Render dashboard.  
4. ⚠️ Note: Free tiers on Render **spin down** after 15 minutes of inactivity. The first request after a break may take ~30 seconds.  

---

### Phase C: The Frontend (Vercel)
Vercel is ideal for React deployment.

1. Connect your GitHub repository.  
2. Select the **portfolio-frontend** folder as the root.  
3. Set environment variable:  
   ```env
   VITE_API_URL=https://portfolio-api.onrender.com/api/v1