import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import DocumentsList from './DocumentsListContainer';
import { AddDocument } from './AddDocument';

export const Documents = () => (
  <Grid>
	  <Row>
	    <Col xs={ 12 }>
	      <h4 className="page-header">Documents</h4>
	      <AddDocument />
	      <DocumentsList />
	    </Col>
	  </Row>
	</Grid>
);
