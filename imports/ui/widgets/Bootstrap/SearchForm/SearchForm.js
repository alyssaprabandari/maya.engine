import $ from 'jquery';
import 'jquery-validation';

import React from 'react';
import { Grid, Row, Col, FormGroup, FormControl, Button } from 'react-bootstrap';

import { getInputValue } from '/imports/modules/get-input-value';

let component;

const search = () => {
  let searchText = getInputValue(component.refs.searchText);
  if(searchText)
    searchText = searchText.trim();

  if(searchText === "")
    Session.delete('searchText');
  else
    Session.set('searchText', searchText);

};

const validate = () => {
  $(component.refs.searchForm).validate({
    rules: {
      searchText: {
        minlength: 3,
      },
    },
    messages: {
      searchText: {
        minlength: 'search needs at least 3 characters',
      },
    },
    submitHandler() { search(); },
  });
};

const handleSearch = (options) => {
  component = options.component;
  validate();
};



export class SearchForm extends React.Component {
  componentDidMount() {
    Session.delete('searchText');
    handleSearch({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return <Grid>
      <form ref="searchForm" onSubmit={ this.handleSubmit }>
        <Row>
          <Col xs={ 8 } sm={ 10 }>
            <FormGroup>
              <FormControl
                type="text"
                ref="searchText"
                name="searchText"
              />
            </FormGroup>
          </Col>
          <Col xs={ 4 } sm={ 2 }>
            <Button 
              type="submit" 
              bsStyle="success" 
              className="btn-block">
              Search
            </Button>
          </Col>
        </Row>
      </form>
    </Grid>
  }
}
