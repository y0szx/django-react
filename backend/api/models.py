from django.db import models
from .managers import CustomUserManager
from django.contrib.auth.models import AbstractUser, Group, Permission


# Create your models here.
class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',
        blank=True
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
