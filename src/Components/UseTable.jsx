import React from 'react';
import {
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
} from '@material-ui/core'
import { storeUseTable } from '../Common/StoreUseTable'


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
}));

// 
//  MAIN
function UseTable(record, headerCell, store) {
  const classes = useStyles();

  // return filtered and sorted data
  const afterSortingAndFiltering = () => {
    return storeUseTable.sortTable(store.filterFn.fn(record))
      .slice()
      .splice(storeUseTable.page * storeUseTable.rowsPerPage, storeUseTable.rowsPerPage);
  };

  // HEADER table
  const TblHeader = (props) => {
    return (
      <TableHead className={props.css} >
        <TableRow>
          {
            headerCell.map((data) => (
              <TableCell key={data.id}>
                {
                  data.disabledSorting ? (data.label) :
                    (
                      <TableSortLabel
                        active={data.id === storeUseTable.orderSort}
                        direction={storeUseTable.orderSort}
                        onClick={() => {
                          storeUseTable.setOrderSortBy(data.id);
                          storeUseTable.setOrderSort();
                        }}
                      >
                        {data.label}
                      </TableSortLabel>
                    )
                }
              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>
    );
  };

  // MAIN table
  const TblContainer = (props) => {
    return <Table className={classes.table}>{props.children}</Table>;
  };

  // PAGINATION table
  const TblPagination = () => (
    <TablePagination
      rowsPerPageOptions={storeUseTable.pages}
      component="div"
      count={record.length}
      rowsPerPage={storeUseTable.rowsPerPage}
      page={storeUseTable.page}
      onChangePage={(e, newPage) => {
        storeUseTable.setPage(newPage)
      }}
      onChangeRowsPerPage={(e) => storeUseTable.handleChangeRowsPerPage(e)}
    ></TablePagination>
  );

  return {
    afterSortingAndFiltering,
    TblHeader,
    TblContainer,
    TblPagination
  };
}

export default UseTable;
