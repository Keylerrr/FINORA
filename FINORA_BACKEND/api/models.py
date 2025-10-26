from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def str(self):
        return self.nombre

class Transaccion(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transacciones')
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True)
    descripcion = models.CharField(max_length=200)
    monto = models.FloatField()
    fecha = models.DateField()

    def str(self):
        return f"{self.descripcion} ({self.monto})"