import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateRecipeModal = ({ show, handleClose, recipe, handleSave }) => {
  const [localRecipe, setLocalRecipe] = useState(recipe || { title: '', description: '', prep_time: '', cook_time: '', category: '' });

  useEffect(() => {
      setLocalRecipe(recipe || { title: '', description: '', prep_time: '', cook_time: '', category: '' });
  }, [recipe]);

  const handleSaveClick = () => {
      handleSave(localRecipe.id, localRecipe);
  };

  return (
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Update Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form>
                  <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                          type="text"
                          value={localRecipe.title}
                          onChange={e => setLocalRecipe({ ...localRecipe, title: e.target.value })}
                      />
                  </Form.Group>
                  <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                          type="text"
                          value={localRecipe.description}
                          onChange={e => setLocalRecipe({ ...localRecipe, description: e.target.value })}
                      />
                  </Form.Group>
                  <Form.Group className="mb-3">
                      <Form.Label>Preparation Time (mins)</Form.Label>
                      <Form.Control
                          type="number"
                          value={localRecipe.prep_time}
                          onChange={e => setLocalRecipe({ ...localRecipe, prep_time: e.target.value })}
                      />
                  </Form.Group>
                  <Form.Group className="mb-3">
                      <Form.Label>Cook Time (mins)</Form.Label>
                      <Form.Control
                          type="number"
                          value={localRecipe.cook_time}
                          onChange={e => setLocalRecipe({ ...localRecipe, cook_time: e.target.value })}
                      />
                  </Form.Group>
                  <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                          type="text"
                          value={localRecipe.category}
                          onChange={e => setLocalRecipe({ ...localRecipe, category: e.target.value })}
                      />
                  </Form.Group>
              </Form>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Close
              </Button>
              <Button variant="primary" onClick={handleSaveClick}>
                  Save Changes
              </Button>
          </Modal.Footer>
      </Modal>
  );
};


export default UpdateRecipeModal;
