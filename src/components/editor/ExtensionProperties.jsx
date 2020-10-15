import React from "react";
import { connect } from "react-redux";
import { modifyExtension, deleteExtension, deselect, addXConnection, changeXConnection } from "../../actions/actions";
//import IconButton from "@material-ui/core/IconButton";
//import DeleteIcon from "@material-ui/icons/Delete";

class ExtensionProperties extends React.Component {
  findExtensionIndex = (extension) => extension.id === this.props.selector.current.id;

  findParentIndex = (entity) => entity.id === this.props.selector.current.parentId;

  handleModifyExtension = (e) => {
    this.props.modifyExtension({
      id: this.props.selector.current.id,
      prop: e.target.id,
      value: e.target.value,
    });
  };

  render() {
    var extensionIndex = this.props.components.extensions.findIndex(this.findExtensionIndex);
    var parentIndex = this.props.components.entities.findIndex(this.findParentIndex);
    var content;
    if (this.props.components.extensions[extensionIndex].type === "specialize")
      content = (
        <Specialize
          extension={this.props.components.extensions[extensionIndex]}
          parent={this.props.components.entities[parentIndex]}
          handleModifyExtension={this.handleModifyExtension}
        />
      );
    else if (this.props.components.extensions[extensionIndex].type === "union")
      content = (
        <Union
          extension={this.props.components.extensions[extensionIndex]}
          parent={this.props.components.entities[parentIndex]}
          handleModifyExtension={this.handleModifyExtension}
        />
      );
    else content = null;

    const addEntityButton =
      this.props.components.extensions[extensionIndex].type !== "undefined" ? (
        <button
          className="properties-neutral-button"
          type="button"
          onClick={() => {
            this.props.addXConnection({ id: this.props.selector.current.id });
          }}
        >
          Add Entity
        </button>
      ) : null;

    return (
      <div className="sidepanel-content">
        <h3>Extension</h3>
        Type:
        <select
          id="type"
          value={this.props.components.extensions[extensionIndex].type}
          onChange={this.handleModifyExtension}
        >
          <option value="undefined" disabled>
            Select Type
          </option>
          <option value="specialize">Specialize</option>
          <option value="union">Union</option>
        </select>
        {content}
        <div className="buttons-list">
          {addEntityButton}
          <button
            className="properties-delete-button"
            type="button"
            onClick={() => {
              this.props.deleteExtension({ id: this.props.selector.current.id });
              this.props.deselect();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

const Specialize = (props) => {
  return (
    <table className="type-inputs">
      <tbody>
        <tr>
          <td>Participation:</td>
          <td>
            <select id="participation" value={props.extension.participation} onChange={props.handleModifyExtension}>
              <option value="partial">Partial</option>
              <option value="total">Total</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Cardinality:</td>
          <td>
            <select id="cardinality" value={props.extension.cardinality} onChange={props.handleModifyExtension}>
              <option value="disjoint">Disjoint</option>
              <option value="overlap">Overlap</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colSpan="2">{props.parent.name} specializes at:</td>
        </tr>
        <tr>
          <td colSpan="2">
            <XConnections extension={props.extension} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const Union = (props) => {
  return (
    <table className="type-inputs">
      <tbody>
        <tr>
          <td>Participation:</td>
          <td>
            <select id="participation" value={props.extension.participation} onChange={props.handleModifyExtension}>
              <option value="partial">Partial</option>
              <option value="total">Total</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colSpan="2"> {props.parent.name} is a Union of:</td>
        </tr>
        <tr>
          <td colSpan="2">
            <XConnections extension={props.extension} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => ({
  components: state.components,
  selector: state.selector,
});

const mapDispatchToProps = {
  modifyExtension,
  deleteExtension,
  deselect,
  addXConnection,
  changeXConnection,
};

// Component for all extension connections
const XConnections = connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
  let xconnectionList = [];
  const handleChangeXConnection = (xconnectionId, e) =>
    props.changeXConnection({
      id: props.extension.id,
      xconnectionIndex: xconnectionId,
      connectId: Number(e.target.value),
    });

  for (let i in props.extension.xconnections) {
    xconnectionList.push(
      <select
        key={i}
        value={props.extension.xconnections[i].connectId}
        onChange={(e) => handleChangeXConnection(props.extension.xconnections[i].id, e)}
      >
        <option value={0} disabled>
          Select Entity
        </option>
        <XEntityList extension={props.extension} />
      </select>
    );
  }
  return <div style={{ display: "flex", flexDirection: "column" }}>{xconnectionList}</div>;
});

const XEntityList = connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
  var entityList = [];
  var found;
  for (let i in props.components.entities) {
    found = false;
    if (props.components.entities[i].id === props.extension.parentId) continue;
    for (let j in props.extension.xconnections) {
      if (
        props.components.entities[i].id === props.extension.xconnections[j].connectId
      ) {
        found = true;
        break;
      }
    }
    entityList.push(
      <option key={props.components.entities[i].id} value={props.components.entities[i].id} disabled={found}>
        {props.components.entities[i].name}
      </option>
    );
  }
  return entityList;
});

export default connect(mapStateToProps, mapDispatchToProps)(ExtensionProperties);
