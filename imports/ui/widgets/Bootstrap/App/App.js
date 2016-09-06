import React from 'react';

const renderWidgets = (props) => {
  let widgets = [];
  Object.keys(props).forEach(function(objectKey){
    if(objectKey.startsWith('widget')){
      widgets.push(props[objectKey]);
    }
  });
  return widgets;
}

export class App extends React.Component {
  render() {
    return (
      <div>
        { renderWidgets(this.props) }
      </div>
    )
  }
}
