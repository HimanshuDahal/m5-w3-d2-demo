import React from "react";

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        alldata: [],
        singledata: {
          id: "",
          title: "",
          author: ""
        }
      };
    }
  }

export default App;