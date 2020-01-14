import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CollectionList = ({ collections, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {collections.map(collection => {
        return (
          <tr key={collection.id}>
            <td>
              <a
                className="btn btn-light"
                href={"http://pluralsight.com/collections/" + collection.slug}
              >
                Watch
              </a>
            </td>
            <td>
              <Link to={"/collection/" + collection.slug}>{collection.title}</Link>
            </td>
            <td>{collection.authorName}</td>
            <td>{collection.category}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(collection)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

CollectionList.propTypes = {
  collections: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CollectionList;
