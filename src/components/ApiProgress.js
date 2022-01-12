import axios from "axios";
import React, { Component } from "react";

export function withApiProgress(WrappedComponent, apiPath) {
  return class extends Component {
    static displayName =
      "ApiProgress(" + getDisplayName(WrappedComponent) + ")";

    state = {
      pendingApiCall: false,
    };

    componentDidMount() {
      this.requestInterceptorId = axios.interceptors.request.use((request) => {
        this.updatePendingApiCall(request.url, true);
        return request;
      });

      this.responseInterceptorId = axios.interceptors.response.use(
        (response) => {
          this.updatePendingApiCall(response.config.url, false);
          return response;
        },
        (error) => {
          this.updatePendingApiCall(error.config.url, false);
          throw error;
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptorId);
      axios.interceptors.response.eject(this.responseInterceptorId);
    }

    updatePendingApiCall(url, inProgress) {
      if (apiPath === url) {
        this.setState({
          pendingApiCall: inProgress,
        });
      }
    }

    render() {
      const pendingApiCall =
        this.state.pendingApiCall || this.props.pendingApiCall;
      return (
        <WrappedComponent
          {...this.props}
          pendingApiCall={pendingApiCall}
        ></WrappedComponent>
      );
    }
  };
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
