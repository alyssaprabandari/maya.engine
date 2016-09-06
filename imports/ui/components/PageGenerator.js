import React from 'react';

export class PageGenerator extends React.Component {
  render() {
    return (
      <div>
          {this.props.pertama}
          {this.props.kedua}
      </div>
    )
  }
}
