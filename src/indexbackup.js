import React from "react";
import { render } from "react-dom";
import { makeData } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Heute",
              accessor:"result.today"

            },
            {
              Header: "User",
              accessor: "result.name"

            },
            {
              Header: '7 Tage',
              accessor: "result.average"

            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />

      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
