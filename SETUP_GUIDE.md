# Quick Setup Guide - HRMS Lite

## 📦 What to Download/Install

### 1. Python (Backend)
- **Download:** https://www.python.org/downloads/
- **Version:** Python 3.12 or higher
- **During installation:** Check "Add Python to PATH"

### 2. Node.js & npm (Frontend)
- **Download:** https://nodejs.org/
- **Version:** Node.js 16.x or higher (includes npm)
- **Verify installation:**
  ```bash
  python --version
  node --version
  npm --version
  ```

### 3. Git (Optional)
- **Download:** https://git-scm.com/downloads
- Useful for version control

## 🚀 Quick Start (Step-by-Step)

### Step 1: Backend Setup

1. **Open Terminal/PowerShell** and navigate to backend:
   ```bash
   cd Backend/HRM_SOFT
   ```

2. **Create virtual environment:**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r ../requirements.txt
   ```

4. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Start server:**
   ```bash
   python manage.py runserver
   ```
   
   ✅ Backend running at: `http://localhost:8000`

### Step 2: Frontend Setup

1. **Open a NEW Terminal/PowerShell** window

2. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start React app:**
   ```bash
   npm start
   ```
   
   ✅ Frontend running at: `http://localhost:3000`

## ✅ Verification

1. **Backend API Test:**
   - Open browser: `http://localhost:8000/api/emp/`
   - Should see: `[]` (empty array) or list of employees

2. **Frontend Test:**
   - Open browser: `http://localhost:3000`
   - Should see: Employee Registration form

## 🔧 Common Issues & Solutions

### Issue: "python: command not found"
**Solution:** 
- Windows: Use `py` instead of `python`
- Or add Python to PATH during installation

### Issue: "pip: command not found"
**Solution:**
```bash
python -m pip install -r ../requirements.txt
```

### Issue: "npm: command not found"
**Solution:**
- Reinstall Node.js with "Add to PATH" option
- Or restart terminal after Node.js installation

### Issue: Port 8000 already in use
**Solution:**
```bash
python manage.py runserver 8001
```
Then update `frontend/src/api/axios.js` baseURL to `http://localhost:8001/api/`

### Issue: Port 3000 already in use
**Solution:**
- React will automatically use port 3001
- Or stop the process using port 3000

### Issue: CORS errors
**Solution:**
- Ensure backend is running
- Check `CORS_ALLOW_ALL_ORIGINS = True` in `settings.py`
- Verify `django-cors-headers` is installed

## 📝 Testing the Application

1. **Add an Employee:**
   - Go to `http://localhost:3000`
   - Fill form and click "Register"
   - Should see success message

2. **View Employees:**
   - Click "View Employees"
   - Should see your added employee

3. **Mark Attendance:**
   - Click "Mark Attendance"
   - Select employee, date, and status
   - Click "Mark Attendance"

4. **View Attendance:**
   - From employee list, click "View Attendance"
   - Should see attendance records

## 🎯 Next Steps

- Read `README.md` for detailed documentation
- Check API endpoints at `http://localhost:8000/api/`
- Access Django admin at `http://localhost:8000/admin/` (create superuser first)

## 💡 Tips

- Keep both terminals open (backend + frontend)
- Backend must run before frontend
- Check browser console (F12) for errors
- Check terminal for backend errors

---

**Happy Coding! 🚀**
