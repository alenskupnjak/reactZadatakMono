import React, { useState } from 'react';
import {
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
} from '@material-ui/core';

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
function UseTable(record, headerCell, filterFn) {
  const classes = useStyles();
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[0]);
  const [orderSort, setOrderSort] = useState();
  const [orderSortBy, setOrderSortBy] = useState('model');

  // HEADER table
  const TblHeader = (props) => {
    // set sort direction
    const handleSort = (sortColumn) => {
      setOrderSortBy(sortColumn);
      setOrderSort(orderSort === 'asc' ? 'desc' : 'asc');
    };

    return (
      <TableHead className={props.css} >
        <TableRow>
          {headerCell.map((data) => (
            <TableCell key={data.id}>
              {data.disabledSorting ? (
                data.label
              ) : (
                <TableSortLabel
                  active={data.id === orderSort}
                  direction={orderSort}
                  onClick={() => {
                    handleSort(data.id);
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

  // change first page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // set page per pages
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //
  // function for sorting
  function sortTable(recordData) {
    // init setup sort
    if (!orderSort) {
      return recordData;
    }

    // stabilization
    const stabilizedThis = recordData.map((el, index) => [el, index]);
    const sortDirection = orderSort === 'asc' ? 1 : -1;

    let sortRecord = [...stabilizedThis].sort((a, b) => {
      const order = sortDirection * descendingComparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return sortRecord.map((el) => el[0]);
  }

  //
  function descendingComparator(a, b) {
    if (b[orderSortBy] < a[orderSortBy]) {
      return -1;
    }
    if (b[orderSortBy] > a[orderSortBy]) {
      return 1;
    }
    return 0;
  }

  // set page per pages
  const afterSortingAndFiltering = (event) => {
    return sortTable(filterFn.fn(record))
      .slice()
      .splice(page * rowsPerPage, rowsPerPage);
    // return  sortTable(record).slice().splice(page * rowsPerPage,rowsPerPage)
  };

  // Pagination
  const TblPagination = (props) => (
    <TablePagination
      rowsPerPageOptions={pages}
      component="div"
      count={record.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
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
