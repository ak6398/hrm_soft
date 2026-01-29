from django.urls import path
from .views import (
    EmployeeListCreateView,
    AttendanceList,
    EmployeeEdit,
    AttendanceEdit,
    employee_attendance
)

urlpatterns = [
    path('emp/', EmployeeListCreateView.as_view(), name='emp'),
    path('emp/<int:pk>/', EmployeeEdit.as_view(), name='emp-detail'),
    path('att/', AttendanceList.as_view(), name='attendance-list'),
    path('att/<int:pk>/', AttendanceEdit.as_view(), name='attendance-detail'),
    path('att/employee/<str:employee_id>/', employee_attendance, name='employee-attendance'),
]   