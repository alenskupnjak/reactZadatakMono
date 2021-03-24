import React from 'react';
import {
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
  TableBody,
  Button,
} from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import { storeNotification } from '../Stores/StoreNotification';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import {
  deleteListVehicleFromService,
  getListVehicleFromService,
} from '../Common/VehicleService';
import { observer } from 'mobx-react';

//
// CSS
const useStyles = makeStyles((theme) => ({
  table: {
    '& thead th': {
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
    },
    '& tbody tr:hover': {
      backgroundColor: '#0000001a',
      cursor: 'pointer',
    },
    '& .MuiButton-root ': {
      minWidth: '25px',
      backgroundColor: '#faebd7',
    },
  },
  pagination: {
    // backgroundColor: 'red',
    '& .MuiPaginationItem-textPrimary.Mui-selected': {
      backgroundColor: '#0000001a',
      color: 'black',
    },
  },
  tablehead: {
    '& .MuiTableCell-head': {
      backgroundColor: '#2543C5',
      color: '#fff',
    },
  },
}));

//
//  MAIN
function UseTableNew(props) {
  const classes = useStyles();
  console.log(props);

  // const { storeUseTable, headCellVechileData } = props.store;
  const { store } = props;
  console.log(store);
  console.log(store.headCellVechileData);
  console.log(store.storeUseTable);
  console.log(store.storeUseTable.orderSort);

  return (
    <React.Fragment>
      <Table>
        <TableHead className={classes.tablehead}>
          <TableRow>
            {store.headCellVechileData.map((data) => (
              <TableCell key={data.id}>
                {data.disabledSorting ? (
                  data.label
                ) : (
                  <TableSortLabel
                    active={data.id === store.storeUseTable.orderSort}
                    direction={store.storeUseTable.orderSort}
                    onClick={() => {
                      console.log('New');

                      props.store.storeUseTable.setOrderSortBy(data.id);
                      props.store.storeUseTable.setOrderSort();
                    }}
                  >
                    {data.label}
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {props.store.afterSortingAndFiltering().map((data) => (
            <TableRow key={data.id}>
              <TableCell> {data.model} </TableCell>
              <TableCell> {data.email} </TableCell>
              <TableCell> {data.mobile} </TableCell>
              <TableCell> {data.city} </TableCell>
              <TableCell> {data.motor} </TableCell>
              <TableCell> {data.producer} </TableCell>
              <TableCell>
                <Button
                  id={data.id}
                  className={classes.custom}
                  variant="contained"
                  style={{
                    backgroundColor: '#2543C5',
                    padding: '10px',
                    marginRight: '5px',
                  }}
                  onClick={() => {
                    props.store.setOpenCustomDialog(true);
                    props.store.setAddOrUpdate('updateFormValue');
                    storeNotification.setNotify({
                      isOpen: true,
                      msg: 'Edit Vehicle',
                      type: 'info',
                    });
                    props.store.vehicleFormValue = data;
                    props.store.setDisableSubmitButton(false);
                  }}
                  startIcon={<ListIcon></ListIcon>}
                ></Button>
                <Button
                  id={data.id}
                  className={classes.custom}
                  variant="outlined"
                  style={{
                    backgroundColor: '#f83245',
                    padding: '10px',
                    marginRight: '0px',
                  }}
                  onClick={() => {
                    props.store.setConfirmDialog({
                      isOpen: true,
                      title: 'Are you sure to delete this Vehicle?',
                      subTitle: "You can't undo this operation.",
                      onConfirm: () => {
                        props.store.setConfirmDialog({ isOpen: false });
                        storeNotification.setNotify({
                          isOpen: true,
                          msg: 'Delete Vehicle',
                          type: 'error',
                        });
                        //  FROM Backend  SERVICE
                        deleteListVehicleFromService(data.id);
                        props.store.listVehicle = getListVehicleFromService();
                      },
                    });
                  }}
                  startIcon={
                    <DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon>
                  }
                ></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        <TablePagination
          rowsPerPageOptions={props.store.storeUseTable.pages}
          component="div"
          count={
            props.store.filterRecordLength === 0 &&
            props.store.filterInputValue === ''
              ? props.store.listVehicleGet.length
              : props.store.filterRecordLength
          }
          rowsPerPage={props.store.storeUseTable.rowsPerPage}
          page={props.store.storeUseTable.page}
          onChangePage={(e, newPage) => {
            props.store.storeUseTable.setPage(newPage);
          }}
          onChangeRowsPerPage={(e) =>
            props.store.storeUseTable.handleChangeRowsPerPage(e)
          }
        ></TablePagination>
      </div>
    </React.Fragment>
  );
}

export default observer(UseTableNew);
