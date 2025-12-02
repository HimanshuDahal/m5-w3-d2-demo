import React from "react";
import Lists from "./Lists";
import CreateList from "./CreateList";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      singledata: {
        _id: "",
        title: "",
        author: "",
      },
    };
  }

  // READ
  getLists = () => {
    this.setState({ loading: true });
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((result) =>
        this.setState({
          loading: false,
          alldata: result,
        })
      )
      .catch(console.log);
  };

  // Handle input changes for Create/Update
  handleChange = (event) => {
    let title = this.state.singledata.title;
    let author = this.state.singledata.author;

    if (event.target.name === "title") title = event.target.value;
    else author = event.target.value;

    this.setState({
      singledata: {
        title: title,
        author: author,
      },
    });
  };

  // CREATE
  createList = () => {
    fetch("http://localhost:5000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.singledata),
    }).then(() => {
      this.setState({
        singledata: { _id: "", title: "", author: "" },
      });
      this.getLists();
    });
  };

  // GET single item for Update/Delete
  getList = (event, id) => {
    this.setState(
      {
        singledata: { title: "Loading...", author: "Loading..." },
      },
      () => {
        fetch("http://localhost:5000/books/" + id)
          .then((res) => res.json())
          .then((result) => {
            this.setState({
              singledata: {
                _id: result._id,
                title: result.title,
                author: result.author || "",
              },
            });
          });
      }
    );
  };

  // UPDATE
  updateList = (event, id) => {
    fetch("http://localhost:5000/books/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.singledata),
    })
      .then((res) => res.json())
      .then(() => {
        this.setState({ singledata: { _id: "", title: "", author: "" } });
        this.getLists();
      });
  };

  // DELETE
  deleteList = (event, id) => {
    fetch("http://localhost:5000/books/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        this.setState({ singledata: { _id: "", title: "", author: "" } });
        this.getLists();
      });
  };

  render() {
    const listTable = this.state.loading ? (
      <span>Loading Data... Please be patient.</span>
    ) : (
      <Lists
        alldata={this.state.alldata}
        singledata={this.state.singledata}
        getList={this.getList}
        updateList={this.updateList}
        deleteList={this.deleteList}
        handleChange={this.handleChange}
      />
    );

    return (
      <div className="container">
        <span className="title-bar">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.getLists}
          >
            Get Lists
          </button>
          <CreateList
            allData={this.state.alldata}
            singledata={this.state.singledata}
            handleChange={this.handleChange}
            createList={this.createList}
          />
        </span>
        {listTable}
      </div>
    );
  }
}

export default App;
