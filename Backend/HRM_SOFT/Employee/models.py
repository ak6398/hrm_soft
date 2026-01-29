from django.db import models

# Create your models here.

class Employee(models.Model):
    Employee_id=models.CharField(max_length=20,unique=True)
    Full_Name=models.CharField(max_length=20)
    Email_Address=models.EmailField(unique=True)
    Department=models.CharField(max_length=50)

    def __str__(self):
        return self.Full_Name
    

class Attendance(models.Model):
    STATUS_CHOICES=(('P','Present'),('A','Absent'))
    employee=models.ForeignKey(Employee,on_delete=models.CASCADE,related_name='attendance')
    date=models.DateField()
    status=models.CharField(max_length=1,choices=STATUS_CHOICES)

    class Meta:
        unique_together=('employee','date')
        ordering=['-date']

    def __str__(self):
        return f"{self.employee.Full_Name}"
