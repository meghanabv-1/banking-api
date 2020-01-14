import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const CollectionForm = ({
  collection,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{collection.id ? "Edit" : "Add"} Collection</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        type="text"
        name="title"
        label="Title"
        value={collection.title}
        onChange={onChange}
        error={errors.title}
      />

      <TextInput
        type="text"
        name="category"
        label="Category"
        value={collection.category}
        onChange={onChange}
        error={errors.category}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

CollectionForm.propTypes = {
  collection: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default CollectionForm;
