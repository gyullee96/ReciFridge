import { useQueries } from '@tanstack/react-query';
import recipeApi from '../utils/recipeApi';

const url = '/COOKRCP01/json/0/1000/RCP_PARTS_DTLS=';
const fetchRecipe = (ingredient) => {
  console.log(`fetch!!!!!!!!! ${url}`);
  return recipeApi.get(url + encodeURIComponent(ingredient));
};
const useRecipesByIngredientsQuery = (ingredients) => {
  const queries = useQueries({
    queries: ingredients.map((ingredient) => ({
      queryKey: ['ingredient', ingredient],
      queryFn: () => fetchRecipe(ingredient),
      select: (res) => res?.data?.COOKRCP01?.row || [],
    })),
  });

  const allData = queries.flatMap((q) => q.data || []);
  const uniqueByName = Object.values(
    allData.reduce((acc, item) => {
      const existing = acc[item.RCP_NM];
      if (!existing || Number(item.RCP_SEQ) > Number(existing.RCP_SEQ)) {
        acc[item.RCP_NM] = item;
      }
      return acc;
    }, {}),
  );
  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const error = queries.find((q) => q.isError)?.error;

  return {
    data: uniqueByName,
    isLoading,
    isError,
    error,
  };
};

export default useRecipesByIngredientsQuery;
