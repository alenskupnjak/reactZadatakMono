import React from 'react';
import { observer } from 'mobx-react';
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
  Typography,
} from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

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
    '& .MuiButton-root': {
      minWidth: '5px',
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
  custom: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    '&.MuiButton-root': {
      minWidth: '5px',
    },
    '& .MuiSvgIcon-root': {
      marginLeft: '10px',
    },
  },
}));

//
//  MAIN
function UseTableNew(props) {
  const classes = useStyles();
  const { store } = props;

  // console.log(store);

  return (
    <React.Fragment>
      <Table>
        <TableHead className={props.css}>
          <TableRow>
            {store.storeUseTable.fn.headCellData.map((data) => (
              <TableCell key={data.id}>
                {data.disabledSorting ? (
                  data.label
                ) : (
                  <TableSortLabel
                    active={data.id === store.storeUseTable.orderSort}
                    direction={store.storeUseTable.orderSort}
                    onClick={() => {
                      store.storeUseTable.setOrderSortBy(data.id);
                      store.storeUseTable.setOrderSort();
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
          {store.storeUseTable.fn.afterSortingAndFiltering().map((data) => (
            <TableRow key={data.id}>
              {store.storeUseTable.fn.headCellData.map((datacell, index) => {
                if (datacell.label.toLowerCase() !== 'action') {
                  return (
                    <TableCell key={index}>
                      {' '}
                      {data[datacell.label.toLowerCase()]}{' '}
                    </TableCell>
                  );
                }
                return null;
              })}
              <TableCell>
                <Button
                  id={data.id}
                  className={classes.custom}
                  variant="contained"
                  style={{
                    backgroundColor: '#2543C5',
                    padding: '7px',
                    marginRight: '15px',
                    alignItems: 'center',
                  }}
                  onClick={() => {
                    store.storeUseTable.fn.setOpenCustomDialog(true);
                    store.storeUseTable.fn.setAddOrUpdate('updateFormValue');
                    store.storeUseTable.fn.onUpdate(data);
                    store.storeUseTable.fn.setDisableSubmitButton(false);
                  }}
                  startIcon={<ListIcon></ListIcon>}
                ></Button>
                <Button
                  id={data.id}
                  className={classes.custom}
                  variant="outlined"
                  style={{
                    backgroundColor: '#f83245',
                    padding: '7px',
                    marginRight: '10px',
                  }}
                  onClick={() => {
                    store.storeUseTable.fn.setConfirmDialog({
                      isOpen: true,
                      onConfirm: () => {
                        store.storeUseTable.fn.setConfirmDialog({
                          isOpen: false,
                        });
                        store.storeUseTable.fn.onDelete(data.id);
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

      {/* NO filter data */}
      {store.storeUseTable.fn.afterSortingAndFiltering().length === 0 ? (
        <Typography
          variant="h6"
          style={{
            justifyContent: 'center',
            textAlign: 'center',
            color: 'red',
          }}
        >
          No filter data.
        </Typography>
      ) : (
        ''
      )}

      {/* PAGINATION  */}
      <div>
        <TablePagination
          rowsPerPageOptions={store.storeUseTable.pages}
          component="div"
          count={store.filterRecordLength}
          rowsPerPage={store.storeUseTable.rowsPerPage}
          page={store.storeUseTable.page}
          onChangePage={(e, newPage) => {
            store.storeUseTable.setPage(newPage);
          }}
          onChangeRowsPerPage={(e) =>
            store.storeUseTable.handleChangeRowsPerPage(e)
          }
        ></TablePagination>
      </div>
    </React.Fragment>
  );
}

export default observer(UseTableNew);
