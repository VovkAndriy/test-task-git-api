import {Column, useFilters, usePagination, useTable} from 'react-table';
import * as React from 'react';
import {useState} from 'react';

const Table = ({ columns, data }: { columns: Array<Column>; data: Array<any>}) => {
  const {
	getTableProps,
	getTableBodyProps,
	headerGroups,
	prepareRow,
	page,
	canPreviousPage,
	canNextPage,
	pageOptions,
	pageCount,
	gotoPage,
	nextPage,
	previousPage,
	setPageSize,
	state: { pageIndex, pageSize },
	setFilter
  } = useTable(
	{
	  columns,
	  data,
	  initialState: { pageIndex: 0 },
	},
	useFilters,
  usePagination,
  )
  
  const [searchInput, setSearchInput] = useState<string | undefined>("");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	const value = e.target.value || undefined;
	setFilter("full_name", value);
	setSearchInput(value);
  };
  
  return (
	<>
	  <input
		value={searchInput}
		onChange={handleSearchChange}
		placeholder={"Search name"}
	  />
	  <table {...getTableProps()}>
		<thead>
		{headerGroups.map(headerGroup => (
		  <tr {...headerGroup.getHeaderGroupProps()}>
			{headerGroup.headers.map(column => (
			  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
			))}
		  </tr>
		))}
		</thead>
		<tbody {...getTableBodyProps()}>
		{page.map((row, i) => {
		  prepareRow(row)
		  return (
			<tr {...row.getRowProps()}>
			  {row.cells.map(cell => {
				return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
			  })}
			</tr>
		  )
		})}
		</tbody>
	  </table>
	  <div className="pagination">
		<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
		  {'<<'}
		</button>{' '}
		<button onClick={() => previousPage()} disabled={!canPreviousPage}>
		  {'<'}
		</button>{' '}
		<button onClick={() => nextPage()} disabled={!canNextPage}>
		  {'>'}
		</button>{' '}
		<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
		  {'>>'}
		</button>{' '}
		<span>
          Page{' '}
		  <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
		<span>
          | Go to page:{' '}
		  <input
			type="number"
			defaultValue={pageIndex + 1}
			onChange={e => {
			  const page = e.target.value ? Number(e.target.value) - 1 : 0
			  gotoPage(page)
			}}
			style={{ width: '100px' }}
		  />
        </span>{' '}
		<select
		  value={pageSize}
		  onChange={e => {
			setPageSize(Number(e.target.value))
		  }}
		>
		  {[10, 20, 30, 40, 50].map(pageSize => (
			<option key={pageSize} value={pageSize}>
			  Show {pageSize}
			</option>
		  ))}
		</select>
	  </div>
	</>
  )
}

export default Table;
