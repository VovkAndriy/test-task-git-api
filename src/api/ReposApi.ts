import { AxiosInstance } from 'axios';

export interface Repo {
  id: number;
  title: string;
  listenersCount: number;
}



export const ReposApi = (instance: AxiosInstance) => {
  return {
	getRepos: async (): Promise<any> => {
	  const { data } = await instance.get('/repositories');
	  return data;
	},
  };
};
