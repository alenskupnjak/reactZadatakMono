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
import {storeUseTable} from '../Common/StoreUseTable'


//
// Style CSS
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


  // HEADER table
  const TblHeader = (props) => {

    return (
      <TableHead className={props.css} >
        <TableRow>
          {headerCell.map((data) => (
            <TableCell key={data.id}>
              {data.disabledSorting ? (
                data.label
              ) : (
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
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  // MAIN table
  const TblContainer = (props) => {
    return <Table className={classes.table}>{props.children}</Table>;
  };

  //
  // function for sorting
  function sortTable(recordData) {
    // init setup sort
    if (!storeUseTable.orderSort) {
      return recordData;
    }

    // stabilization
    const stabilizedThis = recordData.map((el, index) => [el, index]);
    const sortDirection = storeUseTable.orderSort === 'asc' ? 1 : -1;

    let sortRecord = [...stabilizedThis].sort((a, b) => {
      const order = sortDirection * descendingComparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return sortRecord.map((el) => el[0]);
  }

  //
  function descendingComparator(a, b) {
    if (b[storeUseTable.orderSortBy] < a[storeUseTable.orderSortBy]) {
      return -1;
    }
    if (b[storeUseTable.orderSortBy] > a[storeUseTable.orderSortBy]) {
      return 1;
    }
    return 0;
  }

  
  // set page per pages
  const afterSortingAndFiltering = (event) => {
    return sortTable(store.filterFn.fn(record))
      .slice()
      .splice(storeUseTable.page * storeUseTable.rowsPerPage, storeUseTable.rowsPerPage);
  };



  

  // Pagination
  const TblPagination = (props) => (

    <TablePagination
      rowsPerPageOptions={storeUseTable.pages}
      component="div"
      count={record.length}
      rowsPerPage={storeUseTable.rowsPerPage}
      page={storeUseTable.page}
      onChangePage={ (e,newPage) => {
        storeUseTable.setPage(newPage)
      }}
      onChangeRowsPerPage={(e)=>storeUseTable.handleChangeRowsPerPage(e)}
    ></TablePagination>
  );

  return {
    TblContainer,
    TblHeader,
    TblPagination,
    afterSortingAndFiltering,
  };
}

export default UseTable;
