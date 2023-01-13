import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
} from '@mui/material';
import TablePaginator from '../TablePaginator';

const OrderProductList = ({ products, ...rest }) => {
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card {...rest}>
      <CardHeader title="Productos de la orden" subheader="Detalles de productos:" />
      <Divider />
      <CardContent>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Producto
                </TableCell>
                <TableCell>
                  Precio
                </TableCell>
                <TableCell>
                  Cantidad
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? location.state.products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : location.state.products
              )?.map((item) => (
                <TableRow hover key={item._id}>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {item.name}
                  </TableCell>
                  <TableCell>
                    {item.price}
                  </TableCell>
                  <TableCell>
                    {item.qty}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
      <TablePaginator rows={location.state.products}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={3}
      />
    </Card>
  );
};

export default OrderProductList;
