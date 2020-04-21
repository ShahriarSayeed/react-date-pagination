import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import './pagination.css'

const navListStyle={
  display: 'block',
  float: 'left',
  margin: '10px'
}

const itemListStyle={
  display: 'block',
  float: 'left',
  margin: '10px'
}

export default class Page extends Component {
  static propTypes = {
    pageText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    pageNumber: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool,
    isNavigationPage: PropTypes.bool,
    date: PropTypes.object
  };

  static defaultProps = {
    activeClass: 'active',
    itemClass: undefined,
    linkClass: undefined,
    activeLinkCLass: undefined,
    isActive: false,
    isDisabled: false,
    href: '#',
    isNavigationPage: false
  };

  handleClick=(e) => {
    const { isDisabled, pageNumber } = this.props
    e.preventDefault()

    if (isDisabled) {
      return
    }
    this.props.onClick(pageNumber)
  }

  render() {
    let {
      pageText,
      isActive,
      isDisabled,
      date,
      locale,
      dateFormatActive,
      dateFormat
    } = this.props

    let elem = this.props.isNavigationPage === true
      ? (
        <li className={isDisabled?'disabled':''} onClick={(e) => this.handleClick(e)}>
          <a href={'#'}>
            <strong>
              {pageText}
            </strong>
          </a>
        </li>
      )
      : (
        <li className={isActive?'active':''} onClick={(e) => this.handleClick(e)}>
          {isActive ?
            <a href={'#'}>
              {moment(date.date, 'YYYY-MM-DD').locale(locale).format(dateFormatActive)}
            </a>
            :
            <a href={'#'}>
              {moment(date.date, 'YYYY-MM-DD').locale(locale).format(dateFormat)}
            </a>
          }
        </li>
      )

    return (
      elem
    )
  }
}
