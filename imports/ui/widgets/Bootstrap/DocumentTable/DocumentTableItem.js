import React from 'react';

import { goLink } from '/imports/modules/utils';

export const DocumentTableItem = ({ document }) => (
  <tr onClick={ goLink.bind(this, '/document/'+document._id+'/detail') }>
    <td>
      { document.title }
    </td>
  </tr>
);
