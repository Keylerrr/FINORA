from rest_framework import routers
from .views import TransaccionViewSet, CategoriaViewSet

router = routers.DefaultRouter()
router.register(r'transacciones', TransaccionViewSet, basename='transacciones')
router.register(r'categorias', CategoriaViewSet, basename='categorias')

urlpatterns = router.urls