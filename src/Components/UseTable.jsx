import React from 'react'
import { makeStyles,Table, TableHead, TableRow, TableCell } from '@material-ui/core';



// ************************
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


export default function UseTable (headerCell) {

 

  // Glavna tablica
  const TableContainer = (props) => {
    const classes = useStyles();
    return (
      <Table className={classes.table} >
          {props.children}
      </Table>
    )
    
  }


  // HEADER tablica
  const TableHeader = (props) => {

    return (
      <TableHead >
        <TableRow >
          {
            headerCell.map(data => {
              return <TableCell key={data.id} >{data.naziv}</TableCell>
            })
          }
        </TableRow>
      </TableHead>
    )
    
  }

  return {
    TableContainer,
    TableHeader
  }
}

// export default UseTable
