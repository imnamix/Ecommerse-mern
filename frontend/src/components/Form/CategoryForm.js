// CategoryForm.js
import React from 'react';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      alert('Category name cannot be empty');
      return;
    }
    handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label className="form-label">Category Name</label>
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
