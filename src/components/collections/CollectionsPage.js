import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import CollectionList from "./CollectionList";
import Spinner from "../common/Spinner";
import * as collectionActions from "../../redux/actions/collectionActions";

class collectionsPage extends React.Component {
  state = {
    redirectToAddCollectionPage: false
  };

  componentDidMount() {
    const { collections, actions } = this.props;

    if (collections.length === 0) {
      actions.loadCollections().catch(error => {
        console.log("Loading collections failed" + error);
      });
    }
  }

  handleDeleteCollection = async collection => {
    toast.success("Collection deleted");
    try {
      await this.props.actions.deleteCollection(collection);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCollectionPage && <Redirect to="/collection" />}
        <h2>collections</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-collection"
              onClick={() => this.setState({ redirectToAddCollectionPage: true })}
            >
              Add Collection
            </button>

            <CollectionList
              onDeleteClick={this.handleDeleteCollection}
              collections={this.props.collections}
            />
          </>
        )}
      </>
    );
  }
}

collectionsPage.propTypes = {
  collections: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    collections: state.collections,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCollections: bindActionCreators(collectionActions.loadCollections, dispatch),
      deleteCollection: bindActionCreators(collectionActions.deleteCollection, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(collectionsPage);
