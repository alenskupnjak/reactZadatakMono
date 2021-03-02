import React from 'react'
import { Table } from '@material-ui/core';

function UseTable (header) {

  // Glavna tablica
  const TableContainer = (props) => {
    return (
      <Table>
          {props.children}
      </Table>
    )
    
  }

  return {
    TableContainer
  }
}

export default UseTable
