import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectIsCreating,
  selectEditingCar,
  selectCreateFormState,
  selectEditFormState,
} from "../../redux/garage/selectors";
import { createCar, editCar, generate100Cars } from "../../redux/garage/thunks";
import {
  clearCreateForm,
  clearEditForm,
  setCreating,
  setEditingCar,
  updateCreateForm,
  updateEditForm,
} from "../../redux/garage/actionCreators";
import "./style.scss";

export function CarForm() {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectIsCreating);
  const editingCar = useAppSelector(selectEditingCar);
  const createForm = useAppSelector(selectCreateFormState);
  const editForm = useAppSelector(selectEditFormState);

  const currentForm = editingCar ? editForm : createForm;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCar) {
      dispatch(
        editCar(editingCar.id, {
          name: editForm.name,
          color: editForm.color,
        })
      );
      dispatch(setEditingCar(null));
      dispatch(clearEditForm());
    } else {
      dispatch(
        createCar({
          name: createForm.name,
          color: createForm.color,
        })
      );
      dispatch(clearCreateForm());
    }

    dispatch(setCreating(false));
  };

  const handleCancel = () => {
    dispatch(setEditingCar(null));
    dispatch(setCreating(false));
    if (editingCar) {
      dispatch(clearEditForm());
    } else {
      dispatch(clearCreateForm());
    }
  };

  const handleNameChange = (name: string) => {
    if (editingCar) {
      dispatch(updateEditForm({ name }));
    } else {
      dispatch(updateCreateForm({ name }));
    }
  };

  const handleColorChange = (color: string) => {
    if (editingCar) {
      dispatch(updateEditForm({ color }));
    } else {
      dispatch(updateCreateForm({ color }));
    }
  };

  const handleGenerateCars = () => {
    dispatch(generate100Cars());
  };

  return (
    <div className="car-form">
      <div className="car-form__controls">
        <button
          className="btn btn--primary"
          onClick={() => dispatch(setCreating(true))}
          disabled={isCreating || !!editingCar}
        >
          Create
        </button>

        <button className="btn btn--secondary" onClick={handleGenerateCars}>
          Generate Cars
        </button>
      </div>

      {(isCreating || editingCar) && (
        <form className="car-form__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Car name"
              value={currentForm.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="color"
              className="form-color"
              value={currentForm.color}
              onChange={(e) => handleColorChange(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn--success">
              {editingCar ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="btn btn--cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
