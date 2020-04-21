# react-date-pagination

> react-date-pagination

[![NPM](https://img.shields.io/npm/v/react-date-pagination.svg)](https://www.npmjs.com/package/react-date-pagination) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Important Note
```text
More features and improvements of this library coming soon. Keep touch with it if you love it :)
```

## Install

```bash
npm install --save react-date-pagination
```

## Usage

```jsx
import React, { Component } from 'react'

import DatePagination from 'react-date-pagination'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {activePage: 1}
  }

  handlePageChange=(pageNumber) => {
    this.setState({activePage: pageNumber})
  }

  render () {
    let daysArray = [{date: '2018-06-01'}, {date: '2018-06-02'}, {date: '2018-06-03'},{date: '2018-06-04'}, {date: '2018-06-05'}, {date: '2018-06-06'},{date: '2018-06-07'}, {date: '2018-06-08'}, {date: '2018-06-09'}]

    return (

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

    )
  }
}

```

## License

MIT © [ShahriarSayeed](https://github.com/ShahriarSayeed)
