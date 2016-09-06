import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory } from 'react-router';
import { ProgressBar, FormGroup, FormControl, ControlLabel, ButtonGroup, Button } from 'react-bootstrap';

import { EditorGenerator } from './EditorGenerator';
import { formProcessor } from '/imports/modules/formProcessor';

export class FormGenerator extends React.Component {
  constructor(props) {   
    super(props);

    this.inputFields  = _.where(this.props.formAttributes.fields, {componentClass: 'input'});
    this.stateFields  = _.where(this.props.formAttributes.fields, {componentClass: 'state'});
    this.editorFields  = _.where(this.props.formAttributes.fields, {componentClass: 'editor'});

    let initStateFields = {};

    this.stateFields.map(function(field){
      let fieldValue;

      if(field.defaultValue)
        fieldValue = field.defaultValue;

      if(this.props.doc && this.props.doc && this.props.doc[field.name])
        fieldValue = this.props.doc[field.name];

      if(fieldValue)
        initStateFields[field.name] = fieldValue;
    }, this);

    // initStateFields['uploadProgress'] = new ReactiveVar();

    this.state = initStateFields;
    this.state.isLoading = false;

    this.cancelForm = () => {
      let cancelPath = '/';
      if(this.props.formAttributes.cancel && this.props.formAttributes.cancel.path){
        cancelPath = this.props.formAttributes.cancel.path; 
        if(this.props.doc && this.props.doc[this.props.formAttributes.cancel.param])
          cancelPath = cancelPath + this.props.doc[this.props.formAttributes.cancel.param];
      }
      browserHistory.push(cancelPath);
    }
    // this.saveForm = () => ReactDOM.findDOMNode(this.refs.form).dispatchEvent(new Event('submit'));
    
    this.stateChange = (fieldState) => {
      this.setState(fieldState);
    };

    this.renderFields = () => (
      this.props.formAttributes.fields.map((field)=>{
        if(field.componentClass === 'input')
          return this.renderInputField(field);
        if(field.componentClass === 'state')
          return this.renderStateField(field);
      })
    );

    this.renderEditorFields = () => (
      this.editorFields.map((field)=>{
        let content;
        if(this.props.doc && this.props.doc[field.name])
          content = this.props.doc[field.name];
        field.content = content;
        return (
          <EditorGenerator key={ field.name } ref={ field.name } field={ field } callbackParent={ this.stateChange } />
        )
      }, this)
    );

    this.renderInputField = (field) => {
      if(field.type === 'file')
        return(
          <FormGroup key={ field.name }>
            <ControlLabel>{ field.label }</ControlLabel>
            <FormControl
              type={ field.type }
              ref={ field.name }
              name={ field.name }
              onChange={ this.upload.bind(this) } 
            />
            <ProgressBar active now={ this.state.progress } label={`${ this.state.progress }%`} />
          </FormGroup>
        );
      else if(field.type === 'textarea' || field.type === 'array')
        return(
          <FormGroup key={ field.name }>
            <ControlLabel>{ field.label }</ControlLabel>
            <FormControl
              componentClass='textarea'
              ref={ field.name }
              name={ field.name }
              placeholder={ field.placeholder }
            />
          </FormGroup>
        );
      else
        return (
          <FormGroup key={ field.name }>
            <ControlLabel>{ field.label }</ControlLabel>
            <FormControl
              type={ field.type }
              ref={ field.name }
              name={ field.name }
              placeholder={ field.placeholder }
            />
          </FormGroup>
        );
    };

    this.renderStateField = (field) => (
      <div key={ field.name }>
        <ControlLabel>{ field.label }</ControlLabel>
        <br/>
        <ButtonGroup ref={ field.name } >
          { this.renderStateFieldAllowedValues(field) }
        </ButtonGroup>
        <br/>
        <br/>
      </div>
    );

    this.renderStateFieldAllowedValues = (field) => (
      field.allowedValues.map(function(fieldValue){
        let modifier={};
        modifier[field.name] = fieldValue;
        return(
          <Button key={ field.name+'.'+fieldValue } onClick={ this.stateChange.bind(this, modifier) } active={ this.state[field.name] === fieldValue }>{ fieldValue }</Button>
      )}, this)
    );

  }

  componentWillMount() {
    Slingshot.fileRestrictions("uploadImage", {
      allowedFileTypes: ["image/png", "image/jpeg", "image/jpg"],
      maxSize: 1 * 1024 * 1024 // in bytes, 1 MB (use null for unlimited)
    });
  }



  componentDidMount() {
    formProcessor({ component: this, formAttributes: this.props.formAttributes });

    this.inputFields.map(function(field){  
      let fieldValue;

      if(field.defaultValue)
        fieldValue = field.defaultValue;
      
      if(this.props.doc && this.props.doc[field.name])
        fieldValue = this.props.doc[field.name];

      if(fieldValue){
        if(field.type === 'date'){
          ReactDOM.findDOMNode(this.refs[field.name]).value = fieldValue.toISOString().split('T')[0];
        }
        else if(field.type === 'array'){
          ReactDOM.findDOMNode(this.refs[field.name]).value = JSON.stringify(fieldValue);
        }
        else
          ReactDOM.findDOMNode(this.refs[field.name]).value = fieldValue;
      }
    }, this);

  }// end componentDidMount

  handleSubmit(event) {
    event.preventDefault();
  }

  upload(event){
    var userId = Meteor.user()._id;
    var metaContext = {avatarId: userId};
    var uploader = new Slingshot.Upload("uploadImage", metaContext);

    uploader.send(event.target.files[0], function (error, downloadUrl) {
      computation.stop();
      if (error) {
        // Log service detailed response.
        // console.error('Error uploading', uploader.xhr);
        this.setState({ progress: 0});
        Bert.alert(error.message, 'danger');
      }
      else {
        console.log('downloadUrl:', downloadUrl);
        this.setState({ imgUrl: downloadUrl });
        // Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
      }
    }.bind(this));

    this.setState({imgUrl: uploader.url(true) });

    let computation = Tracker.autorun(() => {
      if(!isNaN(uploader.progress())) {
        this.setState({ progress: Math.round(uploader.progress() * 100) });
      }
    });

    
    // this.setState({uploadProgress:uploader});

    // uploader.send(
    //   // you can use refs if you like 
    //   // document.getElementById('imgUrl').files[0],
    //   event.target.files[0],

    //   function (error, downloadUrl) { 
    //     if (error) {
    //       // Log service detailed response
    //       console.error('Error uploading', uploader.xhr.response);
    //       alert (error); // you may want to fancy this up when you're ready instead of a popup.
    //     } else {
    //       // we use $set because the user can change their avatar so it overwrites the url :)
    //       Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": downloadUrl}}); 
    //     }
    //     // you will need this in the event the user hit the update button because it will remove the avatar url
    //     this.setState({avatar: downloadUrl});
    //   }.bind(this)
    // );
  }

  render() {
    return (
      <div>

        { this.renderEditorFields() }

        <form ref="form" name="form" className="form" onSubmit={ this.handleSubmit }>
          { this.renderFields() }          
          <Button ref="button_cancel" name="button_cancel" bsStyle="danger" onClick={ this.cancelForm }>Cancel</Button>
          <Button ref="button_save" name="button_save" bsStyle="success" type="submit" disabled={this.state.isLoading} >Save</Button>
        </form>

        <hr/>
        
          <img src={ this.state.imgUrl }/>

        <hr/>

      </div>
    );
  }
}

FormGenerator.propTypes = {
  doc: React.PropTypes.object,
  formAttributes: React.PropTypes.object,
};
