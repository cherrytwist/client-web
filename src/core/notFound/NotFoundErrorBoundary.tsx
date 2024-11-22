import { Component, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  errorComponent: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class NotFoundErrorBoundary extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: error instanceof NotFoundError,
    };
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorComponent;
    }
    return this.props.children;
  }
}

export class NotFoundError extends Error {}
