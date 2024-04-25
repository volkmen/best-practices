import React from 'react';
import ErrorMessage from 'components/ErrorMessage';
import TextResourceContext from 'contexts/TextResource';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryFunc />;
    } else {
      return this.props.children;
    }
  }
}

const ErrorBoundaryFunc = () => {
  const { getTextResourceByKey } = React.useContext(TextResourceContext);

  return (
    <div className='absolute-centered w-100'>
      <ErrorMessage message={<h1 className='text-center'>{getTextResourceByKey('errorOccured')}</h1> || ''} />
    </div>
  );
};
