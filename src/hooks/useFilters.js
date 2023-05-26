import { useCallback, useMemo, useState } from 'react';
import { cloneDeep } from 'lodash';

const useFilters = initialState => {
  const [filters, setFilters] = useState(initialState || {});
  const [rowsSelected, setRowsSelected] = useState([]);

  //! Function
  const handleSelect = useCallback(data => {
    setRowsSelected(curRowsSelected => {
      let nextRowsSelected = cloneDeep(curRowsSelected);
      const idsSelected = nextRowsSelected.map(el => el.id);
      if (idsSelected.includes(data.id)) {
        nextRowsSelected = nextRowsSelected.filter(el => el.id !== data.id);
      } else {
        nextRowsSelected = [...nextRowsSelected, data];
      }

      return nextRowsSelected;
    });
  }, []);

  const handleRequestSort = useCallback(
    (nameField = '') =>
      value => {
        setFilters(curFilters => {
          const nextFilters = cloneDeep(curFilters);
          nextFilters[nameField] = value;
          nextFilters.page = 1;
          return nextFilters;
        });
      },
    []
  );

  const handleChangePage = useCallback((event, page) => {
    setFilters(curFilters => {
      const nextFilters = cloneDeep(curFilters);
      if ('page' in nextFilters) {
        nextFilters.page = page;
      }

      return nextFilters;
    });
  }, []);

  const handleSelectAll = useCallback(data => {
    setRowsSelected(data);
  }, []);

  const handleSearch = useCallback(
    (nameField = '') =>
      value => {
        setFilters(curFilters => {
          const nextFilters = cloneDeep(curFilters);
          nextFilters[nameField] = value;
          nextFilters.page = 1;
          return nextFilters;
        });
      },
    []
  );

  const handleSelectOne = useCallback(data => {
    setRowsSelected([data]);
  }, []);

  const exported = useMemo(() => {
    return {
      filters,
      rowsSelected,
      setFilters,
      handleSelectAll,
      handleChangePage,
      handleRequestSort,
      handleSelect,
      handleSearch,
      handleSelectOne,
      setRowsSelected
    };
  }, [
    filters,
    rowsSelected,
    setFilters,
    handleSelectAll,
    handleChangePage,
    handleRequestSort,
    handleSelect,
    handleSearch,
    handleSelectOne,
    setRowsSelected
  ]);

  return exported;
};

export default useFilters;
