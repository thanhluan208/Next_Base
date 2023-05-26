import * as React from 'react';
import MUITable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from './TableHead';
import CommonStyles from '..';
import { cloneDeep, isArray } from 'lodash';
import { TablePagination } from '@mui/material';
import PropTypes from 'prop-types';

const Data = [
  {
    id: '646db65d48813415a83a8b2a',
    index: 0,
    guid: '39edfc25-443a-49ea-87fe-e7473377c4a2',
    isActive: true,
    balance: '$2,657.23',
    age: 37,
    eyeColor: 'green',
    name: 'Michael Perkins'
  },
  {
    id: '646db65dbe5d44f1b279396d',
    index: 1,
    guid: '5c0c1950-2d00-444a-9ec3-81e30aa18fbb',
    isActive: true,
    balance: '$2,301.27',
    age: 37,
    eyeColor: 'green',
    name: 'Velma Carter'
  },
  {
    id: '646db65d90d20b5e9755a740',
    index: 2,
    guid: '43ea9763-b542-4206-b77a-5b2305296733',
    isActive: false,
    balance: '$3,173.17',
    age: 39,
    eyeColor: 'brown',
    name: 'Lena Hooper'
  },
  {
    id: '646db65df0d74a45557bfcf4',
    index: 3,
    guid: '653cbdac-066f-4b29-a3d4-b6bff36df203',
    isActive: false,
    balance: '$3,953.09',
    age: 32,
    eyeColor: 'brown',
    name: 'Tucker Becker'
  },
  {
    id: '646db65d6f73a1fc48a4fb62',
    index: 4,
    guid: 'dc320985-42c9-4fb6-a14e-228973df22ed',
    isActive: false,
    balance: '$1,989.75',
    age: 38,
    eyeColor: 'brown',
    name: 'Whitney Sanders'
  },
  {
    id: '646db65df0388f18dff21d08',
    index: 5,
    guid: 'ba647fa4-e980-47f5-8ba4-0108e0c1ffd3',
    isActive: false,
    balance: '$2,727.75',
    age: 36,
    eyeColor: 'brown',
    name: 'Barrett Kemp'
  }
];

const Columns = [
  {
    label: 'Name',
    id: 'name'
  },
  {
    label: 'Age',
    id: 'age'
  },
  {
    label: 'Eye Color',
    id: 'eyeColor'
  }
];

const propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  filters: PropTypes.object,
  setFilters: PropTypes.func,
  rowSelected: PropTypes.array,
  setRowsSelected: PropTypes.func,
  hasCheckbox: PropTypes.bool,
  disabledCheckboxHead: PropTypes.bool,
  allowSelectOneOnly: PropTypes.bool,
  enableSort: PropTypes.bool,
  count: PropTypes.number,
  paginationProps: PropTypes.object,
  tableProps: PropTypes.object
};

const Table = props => {
  //! State
  const {
    columns = Columns,
    data = Data,
    filters,
    setFilters,
    rowSelected,
    setRowsSelected,
    hasCheckbox = true,
    disabledCheckboxHead = true,
    allowSelectOneOnly = true,
    enableSort = true,
    count = 500,
    paginationProps = {},
    tableProps = {},
    disabledPagination = false
  } = props;

  //! Function

  const onSelectAll = () => {
    if (isArray(rowSelected) && rowSelected.length < data.length) {
      setRowsSelected(data);
      return;
    }

    setRowsSelected([]);
  };

  const onSelectRow = row => {
    if (allowSelectOneOnly) {
      setRowsSelected([row]);
      return;
    }

    const index = rowSelected.findIndex(elm => elm.id === row.id);

    if (index === -1) {
      setRowsSelected([...rowSelected, row]);
      return;
    }

    setRowsSelected(cloneDeep(rowSelected).splice(index, 1));
  };

  const onSort = (name, direction) => {
    const newFilters = cloneDeep(filters);
    newFilters.sortBy = name;
    newFilters.sortDirection = direction;

    setFilters(newFilters);
  };

  const onChangePage = (event, newPage) => {
    const newFilters = cloneDeep(filters);
    newFilters.page = newPage;

    setFilters(newFilters);
  };

  const onChangeRowsPerPage = event => {
    const newFilters = cloneDeep(filters);
    newFilters.rowsPerPage = event.target.value;

    setFilters(newFilters);
  };

  //! Render
  return (
    <TableContainer component={Paper}>
      <MUITable sx={{ minWidth: 650 }} aria-label='simple table' {...tableProps}>
        <TableHead
          columns={columns}
          disabledCheckboxHead={disabledCheckboxHead}
          hasCheckbox={hasCheckbox}
          rowSelected={rowSelected}
          onSelectAll={onSelectAll}
          indeterminate={isArray(rowSelected) && rowSelected.length > 0 && rowSelected.length < data.length}
          onSort={enableSort ? onSort : null}
          filters={filters}
        />
        <TableBody>
          {isArray(data)
            ? data.map((eachRow, eachRowIndex) => {
                const isSelected = isArray(rowSelected) && rowSelected.some(elm => elm.id === eachRow.id);
                return (
                  <TableRow key={eachRow.id || `${eachRowIndex}`}>
                    {hasCheckbox && (
                      <TableCell padding='checkbox'>
                        <CommonStyles.Checkbox checked={isSelected} onClick={() => onSelectRow(eachRow)} />
                      </TableCell>
                    )}
                    {isArray(columns)
                      ? columns.map((eachCol, eachColIndex) => {
                          return (
                            <TableCell key={eachCol.id || `${eachColIndex}`}>
                              {eachCol.Cell ? eachCol.Cell(eachRow) : eachRow[eachCol.id]}
                            </TableCell>
                          );
                        })
                      : null}
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </MUITable>
      {!disabledPagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={count || 0}
          rowsPerPage={filters?.rowsPerPage || 5}
          page={filters?.page || 0}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
          showFirstButton={true}
          showLastButton={true}
          {...paginationProps}
        />
      )}
    </TableContainer>
  );
};

Table.propTypes = propTypes;
export default Table;
