import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import CollectionForm from "./CollectionForm";
import Spinner from "../common/Spinner";
import { loadCollections, saveCollection } from "../../redux/actions/collectionActions";

const newCollection = {
  id: null,
  title: "",
  category: ""
};

export function ManageCollectionPage({
  collections,
  loadCollections,
  saveCollection,
  history,
  ...props
}) {
  const [collection, setCollection] = useState({ ...props.collection });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (collections.length === 0) {
      loadCollections().catch(error => {
        console.log("Loading collections failed" + error);
      });
    } else {
      setCollection({ ...props.collection });
    }
  }, [props.collection, collections.length, loadCollections]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCollection(prevCollection => ({
      ...prevCollection,
      [name]: value
    }));
  }

  function formIsValid() {
    const { title, category } = collection;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCollection(collection)
      .then(() => {
        toast.success("Collection saved.");
        history.push("/collections");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return collections.length === 0 ? (
    <Spinner />
  ) : (
    <CollectionForm
      collection={collection}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCollectionPage.propTypes = {
  collection: PropTypes.object.isRequired,
  collections: PropTypes.array.isRequired,
  loadCollections: PropTypes.func.isRequired,
  saveCollection: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getCollectionBySlug(collections, id) {
  return collections.find(collection => collection.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const collection =
    id && state.collections.length > 0
      ? getCollectionBySlug(state.collections, Number(id))
      : newCollection;
  return {
    collection,
    collections: state.collections,
  };
}

const mapDispatchToProps = {
  loadCollections,
  saveCollection
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCollectionPage);
