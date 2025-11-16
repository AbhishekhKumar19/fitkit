# NutriTrack AI Backend - Quick Start Guide

Get the backend up and running in 5 minutes! ⚡

---

## 🚀 Fastest Path to Running Backend

### Option 1: Local Development (5 minutes)

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Start MongoDB (if installed locally)
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Windows: Start MongoDB service

# 4. Start backend server
npm run dev

# ✅ Backend running on http://localhost:5000

# 5. In another terminal, start ML service
cd backend/ml-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py

# ✅ ML service running on http://localhost:8000
```

### Option 2: Deploy to Render.com (10 minutes - Free)

```bash
# 1. Create MongoDB Atlas account (free)
# Visit: https://www.mongodb.com/cloud/atlas
# Create M0 free cluster
# Get connection string

# 2. Push code to GitHub (already done! ✅)

# 3. Go to https://render.com
# - Sign up / Login
# - Click "New +" → "Blueprint"
# - Connect GitHub repository: AbhishekhKumar19/fitkit
# - Render will detect render.yaml automatically

# 4. Set environment variables:
MONGODB_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<generate-random-32-char-string>

# 5. Click "Apply"
# Wait 5-10 minutes for deployment

# ✅ Backend deployed!
# ✅ ML service deployed!
# URLs provided by Render
```

---

## 🧪 Test Your Backend

### Health Check
```bash
# Local
curl http://localhost:5000/api/health

# Production
curl https://your-app.onrender.com/api/health
```

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "age": 25,
    "weight": 70,
    "height": 170,
    "gender": "male",
    "activityLevel": "moderate",
    "goal": "loss"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

---

## 🔗 Connect to Frontend

### Update Frontend API URL

**File**: `src/services/api.ts`

```typescript
// For Production
const API_BASE_URL = 'https://your-backend.onrender.com/api';

// For Local Development
// const API_BASE_URL = 'http://localhost:5000/api';

// For Android Emulator
// const API_BASE_URL = 'http://10.0.2.2:5000/api';
```

### Run React Native App

```bash
# In root directory (not backend/)
npm start

# In another terminal
npm run android
# or
npm run ios
```

---

## 📦 Seed Food Database

```bash
cd backend
npm run seed
```

This adds 50+ food items to your database.

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `backend/.env` | Environment variables |
| `backend/src/server.ts` | Server entry point |
| `backend/README.md` | Full documentation |
| `backend/DEPLOYMENT.md` | Deployment guide |
| `backend/postman_collection.json` | API testing |

---

## 🐛 Quick Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill process if needed
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

### MongoDB connection error
```bash
# Check MongoDB is running
mongosh

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env
```

### ML service error
```bash
# Install Python dependencies
cd backend/ml-service
pip install -r requirements.txt

# Run again
python app.py
```

---

## ✅ Success Indicators

You'll know it's working when:

- ✅ Backend logs show "MongoDB Connected Successfully"
- ✅ Backend logs show "Server running on port 5000"
- ✅ ML service shows "Application startup complete"
- ✅ Health check returns success
- ✅ Frontend can register/login users

---

## 🎯 Next Steps

1. ✅ Backend running locally or deployed
2. ✅ Frontend connected to backend
3. Test registration → Should work! ✅
4. Test meal upload → Should work! ✅
5. Test analytics → Should work! ✅

**You're all set! 🎉**

---

## 📚 More Resources

- **Full Documentation**: `backend/README.md`
- **API Docs**: `backend/API_DOCUMENTATION.md`  
- **Deployment Guide**: `backend/DEPLOYMENT.md`
- **Integration Guide**: `INTEGRATION_GUIDE.md`
- **Postman Collection**: `backend/postman_collection.json`

---

## 🆘 Need Help?

1. Check logs: `cd backend && npm run dev` (watch console)
2. Test endpoints with Postman
3. Verify environment variables
4. Check GitHub Issues
5. Review documentation

**Backend is ready to use! 🚀**
