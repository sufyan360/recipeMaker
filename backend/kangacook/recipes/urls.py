from django.urls import path
from .views import(
    RecipeListCreateAPIView,
    RecipeRetrieveUpdateDestroyAPIView,
    IngredientListCreateAPIView,
    IngredientRetrieveUpdateDestroyAPIView,
    CategoryListCreateAPIView,
    CategoryRetrieveUpdateDestroyAPIView
)

urlpatterns = [
    path('recipes/', RecipeListCreateAPIView.as_view(), name = 'recipe-list-create'),
    path('recipes/<int:pk>', RecipeRetrieveUpdateDestroyAPIView.as_view(), name = 'recipe-detail'),
    path('ingredients/', IngredientListCreateAPIView.as_view(), name = 'ingredient-list-create'),
    path('ingredients/<int:pk>', IngredientRetrieveUpdateDestroyAPIView.as_view(), name = 'ingredient-detail'),
    path('categories/', CategoryListCreateAPIView.as_view(), name = 'category-list-create'),
    path('categories/<int:pk>', CategoryRetrieveUpdateDestroyAPIView.as_view(), name = 'category-detail'),
]