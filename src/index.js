import React from 'react'
import PropTypes from 'prop-types'
import Paginator from 'paginator'
import Page from './Page'
import cx from 'classnames'

import './pagination.css'

const ulStyle={
  minWidth: '696px',
  listStyle: 'none',
  paddingTop: '20px'
}

export default class Pagination extends React.Component {
  paginationInfo=null;

  static propTypes = {
    totalItemsCount: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    activePage: PropTypes.number,
    itemsCountPerPage: PropTypes.number,
    pageRangeDisplayed: PropTypes.number,
    prevPageText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    nextPageText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    hideDisabled: PropTypes.bool,
    hideNavigation: PropTypes.bool,
    itemClass: PropTypes.string,
    itemClassPrev: PropTypes.string,
    itemClassNext: PropTypes.string,
    linkClass: PropTypes.string,
    activeClass: PropTypes.string,
    activeLinkClass: PropTypes.string,
    linkClassPrev: PropTypes.string,
    linkClassNext: PropTypes.string,
    hideFirstLastPages: PropTypes.bool,
    getPageUrl: PropTypes.func,
    days: PropTypes.array,
    locale: PropTypes.string,
    dateFormat: PropTypes.string,
    dateFormatActive: PropTypes.string,
    prevPageText: PropTypes.string,
    firstPageText: PropTypes.string,
    nextPageText: PropTypes.string,
    lastPageText: PropTypes.string,
  };

  static defaultProps = {
    itemsCountPerPage: 10,
    pageRangeDisplayed: 5,
    activePage: 1,
    prevPageText: '⟨',
    firstPageText: '«',
    nextPageText: '⟩',
    lastPageText: '»',
    innerClass: 'pagination',
    itemClass: undefined,
    linkClass: undefined,
    activeLinkClass: undefined,
    hideFirstLastPages: false,
    getPageUrl: (i) => '#',
    locale: 'gb',
    dateFormatActive: 'ddd Do MMM YYYY',
    dateFormat: 'ddd Do'
  };

  componentWillUnmount() {
    this.paginationInfo = null
  }

  isFirstPageVisible(hasPreviousPage) {
    const { hideDisabled, hideNavigation, hideFirstLastPages } = this.props
    if (hideFirstLastPages || (hideDisabled && !hasPreviousPage)) return false
    return true
  }

  isPrevPageVisible(hasPreviousPage) {
    const { hideDisabled, hideNavigation } = this.props
    if (hideNavigation || (hideDisabled && !hasPreviousPage)) return false
    return true
  }

  isNextPageVisible(hasNextPage) {
    const { hideDisabled, hideNavigation } = this.props
    if (hideNavigation || (hideDisabled && !hasNextPage)) return false
    return true
  }

  isLastPageVisible(hasNextPage) {
    const { hideDisabled, hideNavigation, hideFirstLastPages } = this.props
    if (hideFirstLastPages || (hideDisabled && !hasNextPage)) return false
    return true
  }

  buildPages() {
    const pages = []
    const {
      itemsCountPerPage,
      pageRangeDisplayed,
      activePage,
      firstPageText,
      prevPageText,
      nextPageText,
      lastPageText,
      totalItemsCount,
      onChange,
      activeClass,
      itemClass,
      itemClassPrev,
      itemClassNext,
      activeLinkClass,
      linkClass,
      linkClassPrev,
      linkClassNext,
      getPageUrl,
      days,
      locale,
      dateFormatActive,
      dateFormat,
    } = this.props

    this.paginationInfo = new Paginator(
      itemsCountPerPage,
      pageRangeDisplayed,
    ).build(totalItemsCount, activePage)

    if (this.paginationInfo.next_page === this.paginationInfo.total_pages + 1) {
      this.paginationInfo.has_next_page = false
    }

    for (let i = this.paginationInfo.first_page; i <= this.paginationInfo.last_page; i++) {
      let date = days[i - 1]

      pages.push(
        <Page
          isActive={i === activePage}
          key={i}
          href={getPageUrl(i)}
          pageNumber={i}
          pageText={i + ''}
          onClick={onChange}
          itemClass={itemClass}
          linkClass={linkClass}
          activeClass={activeClass}
          activeLinkClass={activeLinkClass}
          date={date}
          locale={locale}
          dateFormatActive={dateFormatActive}
          dateFormat={dateFormat}
        />
      )
    }

    this.isPrevPageVisible(this.paginationInfo.has_previous_page) &&
    pages.unshift(
      <Page
        key={'prev' + this.paginationInfo.previous_page}
        pageNumber={this.paginationInfo.previous_page}
        onClick={onChange}
        pageText={prevPageText}
        isDisabled={!this.paginationInfo.has_previous_page}
        itemClass={cx(itemClass, itemClassPrev)}
        linkClass={cx(linkClass, linkClassPrev)}
        isNavigationPage={true}
      />
    )

    this.isFirstPageVisible(this.paginationInfo.has_previous_page) &&
    pages.unshift(
      <Page
        key={'first'}
        pageNumber={1}
        onClick={onChange}
        pageText={firstPageText}
        isDisabled={!this.paginationInfo.has_previous_page}
        itemClass={cx(itemClass, itemClassPrev)}
        linkClass={cx(linkClass, linkClassPrev)}
        isNavigationPage={true}
      />
    )

    this.isNextPageVisible(this.paginationInfo.has_next_page) &&
    pages.push(
      <Page
        key={'next' + this.paginationInfo.next_page}
        pageNumber={this.paginationInfo.next_page}
        onClick={onChange}
        pageText={nextPageText}
        isDisabled={!this.paginationInfo.has_next_page}
        itemClass={cx(itemClass, itemClassNext)}
        linkClass={cx(linkClass, linkClassNext)}
        isNavigationPage={true}
      />
    )

    this.isLastPageVisible(this.paginationInfo.has_next_page) &&
    pages.push(
      <Page
        key={'last'}
        pageNumber={this.paginationInfo.total_pages}
        onClick={onChange}
        pageText={lastPageText}
        isDisabled={!this.paginationInfo.has_next_page}
        itemClass={cx(itemClass, itemClassNext)}
        linkClass={cx(linkClass, linkClassNext)}
        isNavigationPage={true}
      />
    )
    return pages
  }

  render() {
    const pages = this.buildPages()

    return (
      <div className='react-date-pagination'>
        <ul>
          {pages}
        </ul>
      </div>
    )
  }
}
