from rest_framework import serializers
from .models import Transaccion, Categoria
from django.contrib.auth import get_user_model

User = get_user_model()

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nombre']

class TransaccionSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only=True)
    categoria_id = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(), source='categoria', write_only=True, required=False, allow_null=True
    )

    class Meta:
        model = Transaccion
        fields = ['id', 'usuario', 'categoria', 'categoria_id', 'descripcion', 'monto', 'fecha']
        read_only_fields = ['usuario']