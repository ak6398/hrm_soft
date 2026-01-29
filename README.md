# HRMS Lite - Human Resource Management System

A lightweight, full-stack Human Resource Management System built with Django REST Framework (Backend) and React (Frontend). This application allows administrators to manage employee records and track daily attendance.

## 🚀 Features

### Employee Management
- ✅ Add new employees with unique Employee ID, Full Name, Email Address, and Department
- ✅ View list of all employees in a clean table format
- ✅ Delete employees with confirmation
- ✅ View individual employee attendance records

### Attendance Management
- ✅ Mark attendance for employees (Present/Absent)
- ✅ View attendance records for each employee
- ✅ Display attendance summary (Total Days, Present Days, Absent Days)
- ✅ Prevent duplicate attendance entries for the same date

### Additional Features
- ✅ Professional, responsive UI design
- ✅ Loading states for better UX
- ✅ Error handling with meaningful messages
- ✅ Empty states when no data is available
- ✅ Server-side validation
- ✅ Email format validation
- ✅ Duplicate employee ID and email prevention

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.4
- **React Router DOM** 7.13.0
- **Axios** 1.13.4
- **CSS3** (Custom styling with Poppins font)

### Backend
- **Python** 3.12+
- **Django** 6.0.1
- **Django REST Framework** 3.16.1
- **django-cors-headers** 4.9.0
- **SQLite** (Database)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Python** 3.12 or higher
- **Node.js** 16.x or higher
- **npm** or **yarn**
- **Git** (optional, for cloning)

## 🔧 Installation & Setup

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd Backend/HRM_SOFT
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r ../requirements.txt
   ```

4. **Run database migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a superuser (optional, for Django admin):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the Django development server:**
   ```bash
   python manage.py runserver
   ```
   
   The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   
   The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
hrm_soft_lite/
├── Backend/
│   ├── HRM_SOFT/
│   │   ├── api/              # API app (views, serializers, urls)
│   │   ├── Employee/         # Employee app (models)
│   │   ├── HRM_SOFT/         # Django project settings
│   │   └── manage.py
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── api/              # Axios configuration
│   │   ├── templates/        # React components
│   │   │   ├── Employees.jsx
│   │   │   ├── EmployeeList.jsx
│   │   │   ├── Attendance.jsx
│   │   │   └── AttendanceView.jsx
│   │   ├── App.js            # Main App component
│   │   └── index.js          # Entry point
│   └── package.json          # Node.js dependencies
└── README.md
```

## 🔌 API Endpoints

### Employee Endpoints
- `GET /api/emp/` - List all employees
- `POST /api/emp/` - Create a new employee
- `GET /api/emp/<id>/` - Get employee details
- `DELETE /api/emp/<id>/` - Delete an employee

### Attendance Endpoints
- `GET /api/att/` - List all attendance records
- `POST /api/att/` - Mark attendance
- `GET /api/att/employee/<employee_id>/` - Get attendance records for a specific employee
- `GET /api/att/<id>/` - Get attendance record details
- `DELETE /api/att/<id>/` - Delete an attendance record

## 🎯 Usage

1. **Add an Employee:**
   - Navigate to the home page (`/`)
   - Fill in Employee ID, Full Name, Email Address, and Department
   - Click "Register"

2. **View Employees:**
   - Click "View Employees" from any page
   - See all registered employees in a table
   - Click "View Attendance" to see attendance records for a specific employee
   - Click "Delete" to remove an employee

3. **Mark Attendance:**
   - Navigate to "Mark Attendance" page
   - Select an employee, date, and status (Present/Absent)
   - Click "Mark Attendance"

4. **View Attendance Records:**
   - From the employee list, click "View Attendance" for any employee
   - See all attendance records with summary statistics

## 🚢 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. **Create a new web service** on your chosen platform
2. **Set build command:** `pip install -r requirements.txt`
3. **Set start command:** `gunicorn HRM_SOFT.wsgi:application`
4. **Add environment variables:**
   - `SECRET_KEY` (generate a new Django secret key)
   - `DEBUG=False` (for production)
   - `ALLOWED_HOSTS=your-domain.com`

5. **Update CORS settings** in `settings.py` to allow your frontend domain

### Frontend Deployment (Vercel/Netlify)

1. **Build the React app:**
   ```bash
   npm run build
   ```

2. **Update API base URL** in `frontend/src/api/axios.js`:
   ```javascript
   baseURL: "https://your-backend-url.com/api/"
   ```

3. **Deploy the `build` folder** to your hosting platform

## ⚠️ Assumptions & Limitations

- **Single Admin User:** No authentication system implemented (as per requirements)
- **SQLite Database:** Uses SQLite for simplicity. For production, consider PostgreSQL or MySQL
- **No Date Range Filtering:** Basic attendance viewing (bonus feature not implemented)
- **No Dashboard:** Summary statistics are shown per employee, not globally

## 🐛 Troubleshooting

### Backend Issues
- **Port already in use:** Change the port: `python manage.py runserver 8001`
- **Migration errors:** Run `python manage.py migrate --run-syncdb`
- **CORS errors:** Ensure `django-cors-headers` is installed and `CORS_ALLOW_ALL_ORIGINS = True` in settings

### Frontend Issues
- **API connection errors:** Verify backend is running and check `baseURL` in `axios.js`
- **Module not found:** Run `npm install` again
- **Port conflicts:** React will prompt to use a different port automatically

## 📝 Notes

- The application uses SQLite database by default (stored in `db.sqlite3`)
- All API endpoints return JSON responses
- Frontend uses React Router for client-side routing
- CORS is enabled for all origins (development only - restrict in production)

## 👨‍💻 Development

To contribute or modify:

1. Backend changes: Modify models in `Employee/models.py`, views in `api/views.py`
2. Frontend changes: Modify components in `frontend/src/templates/`
3. API changes: Update serializers in `api/serializers.py` and URLs in `api/urls.py`

## 📄 License

This project is created for educational/assignment purposes.

## 🙏 Acknowledgments

- Django REST Framework for the robust API framework
- React team for the excellent frontend library
- Poppins font from Google Fonts

---

**Built with ❤️ using Django & React**
