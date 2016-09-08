import React from 'react';
import { Table, Alert } from 'react-bootstrap';

import { DocumentTableItem } from './DocumentTableItem.js';

export const DocumentTable = ({ documents }) => {
	return (
	  documents.length > 0
	  ? 
		  <div>
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
		  </div> 
	  :
		  <Alert bsStyle="warning">No Data found...</Alert>
	);
}
