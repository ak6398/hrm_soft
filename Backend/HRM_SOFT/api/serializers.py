from rest_framework import serializers
from Employee.models import Employee,Attendance


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
    
    def validate_Employee_id(self, value):
        """Validate Employee ID is not empty"""
        if not value or not value.strip():
            raise serializers.ValidationError("Employee ID cannot be empty.")
        return value.strip()
    
    def validate_Email_Address(self, value):
        """Validate email format"""
        if not value or not value.strip():
            raise serializers.ValidationError("Email cannot be empty.")
        return value.strip().lower()

class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.Full_Name', read_only=True)
    employee_id = serializers.CharField(source='employee.Employee_id', read_only=True)
    
    class Meta:
        model = Attendance
        fields = '__all__'
    
    def validate(self, data):
        """Validate attendance data"""
        employee = data.get('employee')
        date = data.get('date')
        status = data.get('status')
        
        if not employee:
            raise serializers.ValidationError({"employee": "Employee is required."})
        
        if not date:
            raise serializers.ValidationError({"date": "Date is required."})
        
        if not status:
            raise serializers.ValidationError({"status": "Status is required. Use 'P' for Present or 'A' for Absent."})
        
        if status not in ['P', 'A']:
            raise serializers.ValidationError({"status": "Status must be 'P' (Present) or 'A' (Absent)."})
        
        # Check for duplicate attendance entry
        if Attendance.objects.filter(employee=employee, date=date).exists():
            if not self.instance:  # Only check on create, not update
                raise serializers.ValidationError("Attendance for this employee on this date already exists.")
        
        return data

