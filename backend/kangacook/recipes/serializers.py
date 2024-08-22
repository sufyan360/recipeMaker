from rest_framework import serializers
from .models import Recipe, Ingredient, Category

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class RecipeSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    ingredients = IngredientSerializer(many = True, read_only = True)
    category = CategorySerializer(read_only = True)
    
    class Meta:
        model = Recipe
        fields = '__all__'
