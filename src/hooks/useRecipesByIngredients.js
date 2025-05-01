import { useQuery } from '@tanstack/react-query';
import recipeApi from '../utils/recipeApi';
const url = '/COOKRCP01/json/0/1000/RCP_PARTS_DTLS=';

const fetchRecipe = (ingredient) => {
  console.log(`fetch!!!!!!!!! ${ingredient}`);
  return recipeApi.get(url + encodeURIComponent(ingredient));
};

const useRecipesByIngredientsQuery = (ingredients) => {
  return useQuery({
    queryKey: ['ingredients-query', { ingredients }],
    queryFn: () => fetchRecipe(ingredients),
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
    select: (result) => result.data.COOKRCP01.row,
  });
};

export default useRecipesByIngredientsQuery;
