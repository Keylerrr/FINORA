from rest_framework import viewsets, permissions
from .models import Transaccion, Categoria
from .serializers import TransaccionSerializer, CategoriaSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.AllowAny]  # en dev

class TransaccionViewSet(viewsets.ModelViewSet):
    queryset = Transaccion.objects.select_related('categoria', 'usuario').all()
    serializer_class = TransaccionSerializer
    permission_classes = [permissions.AllowAny]  # en dev

    def perform_create(self, serializer):
        # Si más tarde añades autenticación, usa self.request.user
        serializer.save(usuario=self.request.user if self.request.user.is_authenticated else None)