import React from 'react';
import { Grid } from 'react-bootstrap';

import { NotFound } from '../NotFound/NotFound';

export const DocumentDetail = ({ document }) => {
	if(document)
		return(
			<Grid>
					<p>_id: { document._id }</p>
					<p>title: { document.title }</p>
			</Grid>
		);
	else
		return <NotFound />;
}
