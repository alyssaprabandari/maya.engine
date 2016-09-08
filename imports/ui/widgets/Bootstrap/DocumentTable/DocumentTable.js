import React from 'react';
import { Grid, Table, Alert } from 'react-bootstrap';

import { DocumentTableItem } from './DocumentTableItem.js';

export const DocumentTable = ({ documents }) => {
	return (
	  documents.length > 0
	  ? 
		  <Grid>
		  	<p>documents.length:{ documents.length }</p>
			  <Table striped bordered condensed hover responsive>
					<thead>
						<tr>
							<th>Title</th>
						</tr>
					</thead>
					<tbody>
						{documents.map((document) => (
							<DocumentTableItem key={ document._id } document={ document } />
						))}
					</tbody>
			  </Table>
		  </Grid> 
	  :
		  <Alert bsStyle="warning">No Data found...</Alert>
	);
}
