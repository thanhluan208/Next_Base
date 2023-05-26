import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'src/constant/keys';
import homeServices from 'src/services/homeServices';

export const useGetListComment = () => {
  return useQuery([queryKeys.GET_LIST_COMMENT], () => homeServices.getListComment());
};
