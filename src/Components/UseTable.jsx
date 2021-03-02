import React, {useState} from 'react'
import { makeStyles,Table, TableHead, TableRow, TableCell, TablePagination, } from '@material-ui/core';



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
      backgroundColor: '#faebd7'
    },
  },
}));


// 
function UseTable(zapis, headerCell) {
  const classes = useStyles();

  const pages = [3,6,10];
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[0])

  

  // HEADER table
  const TblHeader = (props) => {
    return (
      <TableHead >
        <TableRow >
          {
            headerCell.map(data => (
              <TableCell key={data.id} >
                {data.naziv}
              </TableCell>
            ))
          }
        </TableRow>
      </TableHead>
    )
    
  }

  // MAIN table
  const TblContainer = (props) => (
      <Table className={classes.table} >
          {props.children}
      </Table>
  )
    

  // change first page
  const handleChangePage = (event, newPage) => {
    console.log('handleChangePage');
    setPage(newPage);
  };

  // Pagination
  const TblPagination = (props) => (
      <TablePagination 
        rowsPerPageOptions={pages}
        component="div"
        count={zapis.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      // onChangeRowsPerPage={handleChangeRowsPerPage}
      >
      </TablePagination>
    )
  

  return {
    TblContainer,
    TblHeader,
    TblPagination
  }
}

export default UseTable