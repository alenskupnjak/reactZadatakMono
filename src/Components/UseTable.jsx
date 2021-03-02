import React from 'react'
import { Table, TableHead, TableRow, TableCell } from '@material-ui/core';

function UseTable (headerCell) {

  // Glavna tablica
  const TableContainer = (props) => {
    return (
      <Table>
          {props.children}
      </Table>
    )
    
  }


  // HEADER tablica
  const TableHeader = (props) => {
    return (
      <TableHead>
        <TableRow>
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

export default UseTable
