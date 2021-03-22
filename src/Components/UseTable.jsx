import React from 'react';
import {
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

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
}));

//
//  MAIN
function UseTable(record, headerCell, storeTemp) {
  const classes = useStyles();

  // HEADER table
  const TblHeader = (props) => {
    return (
      <TableHead className={props.css}>
        <TableRow>
          {headerCell.map((data) => (
            <TableCell key={data.id}>
              {data.disabledSorting ? (
                data.label
              ) : (
                <TableSortLabel
                  active={data.id === storeTemp.storeUseTable.orderSort}
                  direction={storeTemp.storeUseTable.orderSort}
                  onClick={() => {
                    storeTemp.storeUseTable.setOrderSortBy(data.id);
                    storeTemp.storeUseTable.setOrderSort();
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

  // CONTAINER table
  const TblContainer = (props) => {
    return <Table className={classes.table}>{props.children}</Table>;
  };

  // PAGINATION table
  const TblPagination = () => (
    <div>
      <TablePagination
        backIconButtonText="ajmoo"
        rowsPerPageOptions={storeTemp.storeUseTable.pages}
        component="div"
        count={
          storeTemp.filterRecordLength === 0
            ? record.length
            : storeTemp.filterRecordLength
        }
        rowsPerPage={storeTemp.storeUseTable.rowsPerPage}
        page={storeTemp.storeUseTable.page}
        onChangePage={(e, newPage) => {
          storeTemp.storeUseTable.setPage(newPage);
        }}
        onChangeRowsPerPage={(e) =>
          storeTemp.storeUseTable.handleChangeRowsPerPage(e)
        }
      ></TablePagination>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        Page
        <Pagination
          className={classes.pagination}
          color="primary"
          hideNextButton={true}
          hidePrevButton={true}
          page={storeTemp.storeUseTable.page + 1}
          count={
            storeTemp.filterRecordLength === 0
              ? Math.ceil(record.length / storeTemp.storeUseTable.rowsPerPage)
              : Math.ceil(
                  storeTemp.filterRecordLength /
                    storeTemp.storeUseTable.rowsPerPage,
                )
          }
        ></Pagination>
      </div>
    </div>
  );

  return {
    TblHeader,
    TblContainer,
    TblPagination,
  };
}

export default UseTable;
