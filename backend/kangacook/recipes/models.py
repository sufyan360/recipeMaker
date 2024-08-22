from django.db import models
# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name
    
class Ingredient(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name
    
class Recipe(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    ingredients = models.ManyToManyField(Ingredient)
    prep_time = models.IntegerField(help_text = "Preparation Time (minutes)")
    cook_time = models.IntegerField(help_text = "Cooking Time (minutes)")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='recipes')

    def __str__(self) -> str:
        return self.title