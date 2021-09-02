import * as React from "react";
import "./App.scss";
import Table from './components/Table';
import {useEffect, useState} from 'react';
import {Api} from './api';

export default function App() {
  
  const [repos, setRepos] = useState([]);

  useEffect(() => {
	Api().getRepos().then(data => setRepos(data));
  }, []);

  const columns = React.useMemo(
	() => [
		  {
			Header: 'Owner photo',
			accessor: 'owner.avatar_url',
			Cell: ({ value }: {value: string}) => {
			  return (
				<img alt="Owner photo" src={value} />
			  );
			},
		  },
		  {
			Header: 'Owner',
			accessor: 'owner.login',
		  },
		  {
			Header: 'Repo',
			accessor: 'full_name',
		  },
		  {
			Header: 'Repo url',
			accessor: 'html_url',
			Cell: ({ value }: {value: string}) => {
			  return (
				<a href={value} >{value}</a>
			  );
			},
		  },
		  {
			Header: 'Repo description',
			accessor: 'description',
		  },
	],
	[]
  )
  
  
  return (
	<div className="table__container">
	  <Table columns={columns} data={repos} />
	</div>
  );
}
