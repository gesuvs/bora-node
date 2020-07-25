import { format } from 'date-fns';
export const dateFormate = () =>
  format(new Date().getTime(), 'dd/MM/yyyy HH:mm:ss');
