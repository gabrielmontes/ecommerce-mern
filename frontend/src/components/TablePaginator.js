import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';


const TablePaginator = (props) => {
  return (
    <TablePagination
      component="div"
      colSpan={3}
      rowsPerPageOptions={[10, 20]}
      labelRowsPerPage={null}
      count={props.rows.length}
      page={props.page}
      onPageChange={props.handleChangePage}
      onRowsPerPageChange={props.handleChangeRowsPerPage}
      rowsPerPage={props.rowsPerPage}
    />

  );

};

export default TablePaginator;