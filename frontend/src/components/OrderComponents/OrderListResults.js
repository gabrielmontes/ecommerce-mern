import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableSortLabel,
  TableRow,
  Tooltip,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SeverityPill } from '../SeverityPill';
import TablePaginator from '../TablePaginator';

const OrderListResults = ({ orders, user, ...rest }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleOrderProducts = (orderId, products) => {
    if (userInfo.isAdmin) {
      navigate(`/admin/order/${orderId}`, { state: { products: products } })
    } else {
      navigate(`/order/${orderId}`, { state: { products: products } })
    };
  }

  return (
    <Card {...rest}>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                ID
              </TableCell>
              {(userInfo.isAdmin) &&
                <TableCell>
                  Usuario
                </TableCell>
              }
              <TableCell>
                Total
              </TableCell>
              <TableCell>
                Metodo de pago
              </TableCell>
              <TableCell>
                Estado de la orden
              </TableCell>
              <TableCell>
                Estado del pago
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip enterDelay={300} title="Ordenar">
                  <TableSortLabel active direction="desc">
                    Fecha de compra
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Fecha de envio
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : orders
            )?.map((order) => (
              <TableRow hover key={order._id}>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {order.id}
                </TableCell>
                {(userInfo.isAdmin) &&
                  <TableCell>
                    {order.user.email}
                  </TableCell>
                }
                <TableCell>
                  {order.totalPrice}
                </TableCell>
                <TableCell>
                  {order.paymentMethod}
                </TableCell>
                <TableCell>
                  <SeverityPill color={(order.isDelivered) ? 'success' : 'warning'}>
                    {order.isDelivered ? "Enviada" : "Pendiente"}
                  </SeverityPill>
                </TableCell>
                <TableCell>
                  <SeverityPill color={(order.isDelivered) ? 'success' : 'warning'}>
                    {order.isPaid ? "Pagada" : "Pendiente"}
                  </SeverityPill>
                </TableCell>
                <TableCell>
                  {order.createdAt?.substring(0, 10)}
                </TableCell>
                <TableCell>
                  {order.updatedAt?.substring(0, 10)}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOrderProducts(order._id, order.orderItems)}>
                    {(userInfo.isAdmin) ? <EditIcon /> : <VisibilityIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePaginator rows={orders}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={10}
      />
    </Card >
  );
};

export default OrderListResults;
