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
      axios.interceptors.request.use((request) => {
        this.updatePendingApiCall(request.url, true);
        return request;
      });

      axios.interceptors.response.use(
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

    updatePendingApiCall(url, inProgress) {
      if (apiPath === url) {
        this.setState({
          pendingApiCall: inProgress,
        });
      }
    }

    render() {
      return (
        <WrappedComponent
          pendingApiCall={this.state.pendingApiCall}
          {...this.props}
        ></WrappedComponent>
      );
    }
  };
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
