import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const Table = ( { tableData, headingColumns, title, tdClick, breakOn = 'medium' } ) =>
{
  let tableClass = 'table-container__table';

  if ( breakOn === 'small' )
  {
    tableClass += ' table-container__table--break-sm';
  } else if ( breakOn === 'medium' )
  {
    tableClass += ' table-container__table--break-md';
  } else if ( breakOn === 'large' )
  {
    tableClass += ' table-container__table--break-lg';
  }

  const data = tableData.map( ( row, index ) =>
  {
    return <tr id={ row.id } key={ index }>
      <td>{ row.name } </td>
      <td>{ row.min } </td>
      <td>{ row.max } </td>
      <td onClick={ tdClick }><FontAwesomeIcon icon={ faPen } /></td>
    </tr>;
  } );

  return (
    <div className="table-container">
      <div className="table-container__title">
        <h2>{ title }</h2>
      </div>
      <table className={ tableClass }>
        <thead>
          <tr>
            { headingColumns.map( ( col, index ) => (
              <th key={ index }>{ col }</th>
            ) ) }
          </tr>
        </thead>
        <tbody>
          { data }
        </tbody>
      </table>
    </div>
  );
};

export default Table;