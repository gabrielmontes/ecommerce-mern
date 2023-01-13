import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../../actions/userActions';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Progress from '../Progress';
import DeleteUserProduct from '../DeleleteUserProduct';
import { SeverityPill } from '../SeverityPill';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import TablePaginator from '../TablePaginator';

const CustomerListResults = ({ customers, ...rest }) => {
  const dispatch = useDispatch();

  const [showdelete, setShowdelete] = useState(false);
  const [userid, setUserid] = useState(false);
  const [username, setUsername] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const userDelete = useSelector((state) => state.userDelete);
  const { success, loading } = userDelete;

  const currentUser = useSelector((state) => state.userLogin);
  const { email: currentUserEmail } = currentUser.userInfo;


  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, success]);

  const handleUserDelete = (id, name) => {
    setShowdelete(!showdelete);
    setUserid(id);
    setUsername(name);
  };

  return (
    <Card {...rest}>
      {loading && <Progress />}
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Nombre
              </TableCell>
              <TableCell>
                Correo electrónico
              </TableCell>
              <TableCell>
                Administrador
              </TableCell>
              <TableCell>
                Fecha de registro
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : customers
            )?.map((customer) => (
              <TableRow hover key={customer.id}>
                <TableCell sx={{ textTransform: "capitalize" }}>
                  {customer.name} {customer.lastname}
                </TableCell>
                <TableCell>
                  {customer.email}
                </TableCell>
                <TableCell>
                  <SeverityPill color={(customer.isAdmin) ? 'success' : 'info'}>
                    {customer.isAdmin ? "Administrador" : "Cliente"}
                  </SeverityPill>
                </TableCell>
                <TableCell>
                  {customer.createdAt?.substring(0, 10)}
                </TableCell>
                <TableCell>
                  <IconButton disabled={(customer.email === currentUserEmail) ? true : false}
                    onClick={() => handleUserDelete(customer._id, customer.name)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton disabled={(customer.email === currentUserEmail) ? true : false}
                    href={`/admin/user/${customer._id}`}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePaginator rows={customers}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={10}
      />
      {showdelete &&
        <DeleteUserProduct
          id={userid}
          variant="user"
          text={`¿Desea eliminar el usuario: ${username}?`}
        />}
    </Card>
  );
};

export default CustomerListResults;
