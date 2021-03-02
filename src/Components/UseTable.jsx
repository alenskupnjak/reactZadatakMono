import React from 'react'
import { Table } from '@material-ui/core';
import { observer } from 'mobx-react';

function UseTable (header) {

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
