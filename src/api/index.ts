import axios from 'axios';
import { ReposApi} from './ReposApi';

type ApiReturnType = ReturnType<typeof ReposApi> & ReturnType<typeof ReposApi>;

export const Api = (ctx?: any): ApiReturnType => {

  const instance = axios.create({
	baseURL: 'https://api.github.com',
  });
  
  return [ReposApi].reduce((prev, f) => ({ ...prev, ...f(instance) }), {} as ApiReturnType);
};
