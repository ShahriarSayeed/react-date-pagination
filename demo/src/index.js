import React, { Component } from "react";
import { render } from "react-dom";

import DatePagination from "../../src/index";

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = { activePage: 1 };
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber });
  };

  render() {
    let daysArray = [
      { date: "2018-06-01" },
      { date: "2018-06-02" },
      { date: "2018-06-03" },
      { date: "2018-06-04" },
      { date: "2018-06-05" },
      { date: "2018-06-06" },
      { date: "2018-06-07" },
      { date: "2018-06-08" },
      { date: "2018-06-09" },
    ];

    return (
      <div>
        <h1>react-date-pagination Demo</h1>
        <DatePagination
          activePage={this.state.activePage}
          itemsCountPerPage={1}
          totalItemsCount={daysArray.length}
          days={daysArray}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          locale={"gb"}
          dateFormatActive={"ddd Do MMM YYYY"}
          dateFormat={"ddd Do"}
          hideFirstLastPages={false}
          prevPageText={"<"}
          firstPageText={"«"}
          lastPageText={"»"}
          nextPageText={">"}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
