import React from 'react';

import { NotFound } from '../NotFound/NotFound';

export const DocumentDetail = ({ document }) => {
	if(document)
		return(
			<div>
					<p>_id: { document._id }</p>
					<p>title: { document.title }</p>
			</div>
		);
	else
		return <NotFound />;
}
