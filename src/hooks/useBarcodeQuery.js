import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProductByBarcode = async (barcode) => {
  if (!barcode) {
    return;
  }
  const { data } = await axios.get(`https://team.ideatags.io/products/${barcode}`);
  return data;
};

const useBarcodeQuery = (barcode) => {
  return useQuery({
    queryKey: ['product', barcode],
    queryFn: () => fetchProductByBarcode(barcode),
    enabled: !!barcode,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
};

export default useBarcodeQuery;
