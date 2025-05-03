import { useQuery } from '@tanstack/react-query';
import recipeApi from '../utils/recipeApi';

const url = '/COOKRCP01/json/0/1/RCP_NM=';

const fetchRecipe = ({ id, keyword, page, filter }) => {
  console.log(`fetchRecipe ${id} ${keyword} ${page} ${filter}`);
  return recipeApi.get(url + id);
};

const useRecipeSearchQuery = ({ id, keyword, page, filter }) => {
  return useQuery({
    queryKey: ['recipe-query', { id, keyword, page, filter }],
    queryFn: () => fetchRecipe({ id, keyword, page, filter }),
    retry: 3,
    retryDelay: (count) => {
      console.log('fetchRecipe, retry', count);
      Math.min(1000 * 2 ** count, 30000);
    },
    staleTime: 1000 * 60, // It is NOT requested for a minute.
    gcTime: 1000 * 60 * 5, // Cache is removed after 5 minutes.
    refetchOnMount: false, // It is NOT requested when the component is mounted.
    refetchOnWindowFocus: false, // It is NOT requested when the window is focused.
    // refetchInterval: 3000, should be requested every 3 seconds.
    // enabled: false, // It is NOT requested when the component is mounted.
    throwOnError: true,
  });
};

export default useRecipeSearchQuery;
