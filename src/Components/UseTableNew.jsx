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
} from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import { storeNotification } from '../Stores/StoreNotification';
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

  return (
    <React.Fragment>
      <Table>
        <TableHead className={props.css} >
          <TableRow>
            {store.headCellData.map((data) => (
              <TableCell key={data.id}>
                {data.disabledSorting ? (
                  data.label
                ) : (
                  <TableSortLabel
                    active={data.id === store.storeUseTable.orderSort}
                    direction={store.storeUseTable.orderSort}
                    onClick={() => {
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
              {store.headCellData.map((datacell, index) => {
                if (datacell.label.toLowerCase() !== 'action') {
                  return (
                    <TableCell key={index}>
                      {' '}
                      {data[datacell.label.toLowerCase()]}{' '}
                    </TableCell>
                  );
                }
                return null
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
                    props.store.setOpenCustomDialog(true);
                    props.store.setAddOrUpdate('updateFormValue');
                    props.store.onUpdate(data)
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
                    padding: '7px',
                    marginRight: '10px',
                  }}
                  onClick={() => {
                    props.store.setConfirmDialog({
                      isOpen: true,
                      title: 'Are you sure to delete this record?',
                      subTitle: "You can't undo this operation.",
                      onConfirm: () => {
                        props.store.setConfirmDialog({ isOpen: false });
                        //  FROM Backend  SERVICE
                        props.store.onDelete(data.id)
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
          count={props.store.filterRecordLength}
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
