'use client'
import React, { useState, useEffect }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getRecipes, createRecipe, updateRecipe, deleteRecipe, searchRecipes, 
  getCategories, createCategory, deleteCategory,
  getIngredients, createIngredient, deleteIngredient } from './api/calls';
import UpdateRecipeModal from './UpdateRecipeModal';
import { Modal, Button, Form, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ 
    title: '', 
    description: '',
    prep_time: '',
    cook_time: '',
    category: '' 
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
    const [showSearchResultsModal, setShowSearchResultsModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [categories, setCategories] = useState([]); 
  const [newCategory, setNewCategory] = useState('');

  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');

  const [showCategoryDeleteModal, setShowCategoryDeleteModal] = useState(false);

  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showIngredientDeleteModal, setShowIngredientDeleteModal] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] = useState(null);

  useEffect(() => {
    fetchRecipes();
    fetchCategories();
    fetchIngredients();
  }, []);

  const fetchRecipes = () => {
      getRecipes().then(response => {
          setRecipes(response.data);
      }).catch(error => {
          console.error('Error fetching recipes:', error);
      });
  };

  const fetchCategories = () => {
      getCategories().then(response => {
          setCategories(response.data);
      }).catch(error => {
          console.error('Error fetching categories:', error);
      });
  };

  const fetchIngredients = () => {
      getIngredients().then(response => {
          setIngredients(response.data);
      }).catch(error => {
          console.error('Error fetching ingredients:', error);
      });
  };

  const handleCreateRecipe = async () => {
      let categoryId = categories.find(cat => cat.name === newRecipe.category)?.id;

      if (!categoryId) {
          try {
              const categoryResponse = await createCategory({ name: newRecipe.category });
              categoryId = categoryResponse.data.id;
              fetchCategories();
          } catch (error) {
              console.error('Error creating category:', error);
          }
      }

      createRecipe({ ...newRecipe, category: categoryId }).then(() => {
          fetchRecipes();
          setNewRecipe({ title: '', description: '', prep_time: '', cook_time: '', category: '' });
      }).catch(error => {
          console.error('Error creating recipe:', error);
      });
  };

  const handleUpdateRecipe = async (id, updatedRecipe) => {
      let categoryId = categories.find(cat => cat.name === updatedRecipe.category)?.id;

      if (!categoryId) {
          try {
              const categoryResponse = await createCategory({ name: updatedRecipe.category });
              categoryId = categoryResponse.data.id;
              fetchCategories();
          } catch (error) {
              console.error('Error creating category:', error);
          }
      }

      updateRecipe(id, { ...updatedRecipe, category: categoryId }).then(() => {
          fetchRecipes();
          handleSearch();
      }).catch(error => {
          console.error('Error updating recipe:', error);
      });
  };

  const handleDeleteRecipe = (id) => {
      deleteRecipe(id).then(() => {
          fetchRecipes();
          handleSearch();
      }).catch(error => {
          console.error('Error deleting recipe:', error);
      });
  };

    const handleCreateCategory = () => {
        createCategory({ name: newCategory }).then(() => {
            fetchCategories();
            setNewCategory('');
        }).catch(error => {
            console.error('Error creating category:', error);
        });
    };

    const handleCreateIngredient = () => {
        createIngredient({ name: newIngredient }).then(() => {
            fetchIngredients();
            setNewIngredient('');
        }).catch(error => {
            console.error('Error creating ingredient:', error);
        });
    };

    const handleDeleteCategory = () => {
        deleteCategory(categoryToDelete.id).then(() => {
            fetchCategories();
            setShowCategoryDeleteModal(false);
        }).catch(error => {
            console.error('Error deleting category:', error);
        });
    };

    const handleDeleteIngredient = () => {
        deleteIngredient(ingredientToDelete.id).then(() => {
            fetchIngredients();
            setShowIngredientDeleteModal(false);
        }).catch(error => {
            console.error('Error deleting ingredient:', error);
        });
    };

    const handleOpenUpdateModal = (recipe) => {
        if (recipe && recipe.category) {
            setSelectedRecipe({
                ...recipe,
                category: recipe.category.name || '' 
            });
        } else {
            setSelectedRecipe({
                ...recipe,
                category: '' 
            });
        }
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedRecipe(null);
    };

    const handleOpenCategoryDeleteModal = (category) => {
        setCategoryToDelete(category);
        setShowCategoryDeleteModal(true);
    };

    const handleOpenIngredientDeleteModal = (ingredient) => {
        setIngredientToDelete(ingredient);
        setShowIngredientDeleteModal(true);
    };

    const handleSearch = () => {
        console.log('Searching for:', searchTerm);
        searchRecipes(searchTerm).then(response => {
            console.log('Search results:', response.data);
            setSearchResults(response.data);
            setShowSearchResultsModal(true);
        }).catch(error => {
            console.error('Error searching recipes:', error);
            setSearchResults([]);
            setShowSearchResultsModal(true); 
        });
    };
    


    return (
        <Container>
            <h1 className="text-center my-4">Kangacook App</h1>

            <Row className="mb-4">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Create New Recipe</Card.Title>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="Title"
                                        value={newRecipe.title || ''}
                                        onChange={e => setNewRecipe({ ...newRecipe, title: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="Description"
                                        value={newRecipe.description || ''}
                                        onChange={e => setNewRecipe({ ...newRecipe, description: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Preparation Time (mins)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        required
                                        placeholder="Preparation Time"
                                        value={newRecipe.prep_time || ''}
                                        onChange={e => setNewRecipe({ ...newRecipe, prep_time: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cook Time (mins)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        required
                                        placeholder="Cook Time"
                                        value={newRecipe.cook_time || ''}
                                        onChange={e => setNewRecipe({ ...newRecipe, cook_time: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="Category"
                                        value={newRecipe.category || ''}
                                        onChange={e => setNewRecipe({ ...newRecipe, category: e.target.value })}
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleCreateRecipe}>
                                    Create Recipe
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Search Recipes</Card.Title>
                            <Form className="mb-3">
                                <Form.Control
                                    type="text"
                                    required
                                    placeholder="Search recipes..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </Form>
                            <Button variant="primary" onClick={handleSearch}>Search</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={showSearchResultsModal} onHide={() => setShowSearchResultsModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Search Results</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {searchResults.length > 0 ? (
                        <ListGroup>
                            {searchResults.map(recipe => (
                                <ListGroup.Item key={recipe.id}>
                                    <Row>
                                        <Col>{recipe.title}</Col>
                                        <Col className="text-end">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleOpenUpdateModal(recipe)}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDeleteRecipe(recipe.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>No matches found.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSearchResultsModal(false)}>
                        Done
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col md={12}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Recipes</Card.Title>
                            <ListGroup>
                                {recipes.map(recipe => (
                                    <ListGroup.Item key={recipe.id}>
                                        <Row>
                                            <Col>{recipe.title}</Col>
                                            <Col>{recipe.description}</Col>
                                            <Col>{recipe.prep_time} minutes to prepare</Col>
                                            <Col className="text-end">
                                                <Button variant="secondary" size="sm" className="me-2" onClick={() => handleOpenUpdateModal(recipe)}>Update</Button>
                                                <Button variant="danger" size="sm" onClick={() => handleDeleteRecipe(recipe.id)}>Delete</Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Categories</Card.Title>
                            <Form className="mb-3">
                                <Form.Group>
                                    <Form.Label>Create New Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="Category Name"
                                        value={newCategory || ''}
                                        onChange={e => setNewCategory(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" className="mt-2" onClick={handleCreateCategory}>
                                    Create Category
                                </Button>
                            </Form>
                            <ListGroup>
                                {categories.map(category => (
                                    <ListGroup.Item key={category.id}>
                                        <Row>
                                            <Col>{category.name}</Col>
                                            <Col className="text-end">
                                                <Button variant="danger" size="sm" onClick={() => handleOpenCategoryDeleteModal(category)}>Delete</Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Ingredients</Card.Title>
                            <Form className="mb-3">
                                <Form.Group>
                                    <Form.Label>Create New Ingredient</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="Ingredient Name"
                                        value={newIngredient || ''}
                                        onChange={e => setNewIngredient(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" className="mt-2" onClick={handleCreateIngredient}>
                                    Create Ingredient
                                </Button>
                            </Form>
                            <ListGroup>
                                {ingredients.map(ingredient => (
                                    <ListGroup.Item key={ingredient.id}>
                                        <Row>
                                            <Col>{ingredient.name}</Col>
                                            <Col className="text-end">
                                                <Button variant="danger" size="sm" onClick={() => handleOpenIngredientDeleteModal(ingredient)}>Delete</Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {selectedRecipe && (
                <UpdateRecipeModal
                    show={showUpdateModal}
                    handleClose={handleCloseUpdateModal}
                    recipe={selectedRecipe}
                    handleSave={handleUpdateRecipe}
                />
            )}

            <Modal show={showCategoryDeleteModal} onHide={() => setShowCategoryDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the category "{categoryToDelete?.name}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCategoryDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteCategory}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showIngredientDeleteModal} onHide={() => setShowIngredientDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Ingredient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the ingredient "{ingredientToDelete?.name}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowIngredientDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteIngredient}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default App;
