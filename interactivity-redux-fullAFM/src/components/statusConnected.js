import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Kpi as KpiOrig, Execute as ExecuteOrig, AfmComponents } from '@gooddata/react-components';
import statusConnect from '../statusConnect'

const withoutKeys = (sourceObject, keysToExclude) => (
  Object.keys(sourceObject)
    .filter(key => !keysToExclude[key])
    .reduce((obj, key) => {
      obj[key] = sourceObject[key]
      return obj
    }, {})
)

/**
 * A wrapper for GoodData AFM Components connected to AFM controls via the
 * afmConnect method.
 */
export const StatusWrapper = (InnerComponent) => statusConnect(class extends Component {

  static propTypes = {
    componentId: PropTypes.string,
    projectId: PropTypes.string.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
    onLoadingChanged: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  }

  wrapperClassName() {
    return "loadingWrapper loadingWrapper"
      + InnerComponent.toString()
      + " "
      + this.props.loading ? "active" : ""
  }

  render() {
    const { onLoadingChanged, onError } = this.props
    return (
      <div className={this.wrapperClassName()}>
        <InnerComponent {...this.props}
          onLoadingChanged={status => onLoadingChanged(this.componentId, status)}
          onError={error => onError(this.componentId, error)}
        />
      </div>
    )
  }
})

export const PureLoadingIndicatorWrapper = ({ isLoading, error, children }) => {
  return <div /> // TODO
}