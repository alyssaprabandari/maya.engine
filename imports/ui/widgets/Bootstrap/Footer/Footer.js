import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export const Footer = () => (
	<div>
		<hr/>
		<Grid>
			<Row>
				<Col xs={12} md={12}>
						{ Meteor.settings.public.tenant }
				</Col>
			</Row>
		</Grid>
	</div>
);
