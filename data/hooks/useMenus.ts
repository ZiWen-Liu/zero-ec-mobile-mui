import useSWR from "swr";

import menus from '../../mocks/menu.json'

const fetcher = () => Promise.resolve(menus);

export const useMenus = (id: number) => {
    const { data, error } = useSWR(`/mkpl/menus/${id}`, fetcher);

    return {
        menus: data,
        isLoading: !error && !data,
        isError: error,
    }
}