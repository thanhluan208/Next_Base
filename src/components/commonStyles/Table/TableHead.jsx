import React from 'react';
import CommonStyles from 'src/components/commonStyles';
import CommonIcons from 'src/components/commonIcons';
import { TableCell, TableRow, TableHead as MUITableHead } from '@mui/material';
import { isArray } from 'lodash';
import PropTypes from 'prop-types';

const propTypes = {
  columns: PropTypes.array,
  hasCheckbox: PropTypes.bool,
  disabledCheckboxHead: PropTypes.bool,
  onSelectAll: PropTypes.func,
  indeterminate: PropTypes.bool,
  filters: PropTypes.object,
  onSort: PropTypes.func
};

const TableHead = ({ columns, hasCheckbox, disabledCheckboxHead, onSelectAll, indeterminate, filters, onSort }) => {
  //! State
  const sortDirection = filters?.sortDirection || '';
  const sortBy = filters?.sortBy || '';

  //! Function
  const onClickSort = name => {
    if (sortBy === name) {
      onSort(name, sortDirection === 'asc' ? 'desc' : 'asc');
      return;
    }

    onSort(name, 'asc');
  };

  //! Render
  return (
    <MUITableHead>
      <TableRow>
        {hasCheckbox && !disabledCheckboxHead && (
          <TableCell padding='checkbox'>
            <CommonStyles.Checkbox onClick={onSelectAll} indeterminate={indeterminate} />
          </TableCell>
        )}
        {hasCheckbox && disabledCheckboxHead && <TableCell padding='checkbox' />}
        {isArray(columns)
          ? columns.map(elm => {
              const isSorting = sortBy === elm.id;
              return (
                <TableCell key={elm.id}>
                  <CommonStyles.Box
                    sx={{
                      display: 'flex',
                      gap: '10px',
                      cursor: 'pointer',
                      '&:hover': {
                        '& .sort-icon': {
                          opacity: '1'
                        }
                      }
                    }}
                    onClick={() => onClickSort(elm?.id)}
                  >
                    {elm?.customLabel ? elm.customLabel(elm) : elm.label}

                    {!!onSort && (
                      <CommonStyles.Box
                        sx={{
                          opacity: isSorting ? '1' : '0',
                          transition: 'all .3s ease',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        className='sort-icon'
                      >
                        {sortDirection === 'asc' ? <CommonIcons.sortUp /> : <CommonIcons.sortDown />}
                      </CommonStyles.Box>
                    )}
                  </CommonStyles.Box>
                </TableCell>
              );
            })
          : null}
      </TableRow>
    </MUITableHead>
  );
};

TableHead.propTypes = propTypes;
export default TableHead;
