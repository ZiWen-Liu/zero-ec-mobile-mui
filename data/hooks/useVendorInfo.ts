import useSWR from "swr";

import vendorInfo from '../../mocks/vendorInfo.json'

const fetcher = () => Promise.resolve(vendorInfo);

export const useVendorInfo = (id: number) => {
    const { data, error } = useSWR(`/mkpl/restaurant/${id}`, fetcher);
    
    return {
        vendorInfo: data,
        isLoading: !error && !data,
        isError: error,
    }
}