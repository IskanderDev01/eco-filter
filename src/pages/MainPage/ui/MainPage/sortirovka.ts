import { Client } from 'pages/MainPage/model/types/client'

export const sortirovka = (data: Client[], sortBy: string): Client[] => {
    return data.sort((a, b) => {
        const aExpiredFilters = a.filters.filter(filter => filter.status === 'expired');
        const bExpiredFilters = b.filters.filter(filter => filter.status === 'expired');
        const aOtherFilters = a.filters.filter(filter => filter.status !== 'expired');
        const bOtherFilters = b.filters.filter(filter => filter.status !== 'expired');

        if (sortBy === 'top') {
            if (aExpiredFilters.length > 0 && bExpiredFilters.length > 0) {
                const aMaxRemainingDays = Math.max(...aExpiredFilters.map(filter => filter.remaining_days));
                const bMaxRemainingDays = Math.max(...bExpiredFilters.map(filter => filter.remaining_days));
                return bMaxRemainingDays - aMaxRemainingDays;
            }

            if (aOtherFilters.length > 0 && bOtherFilters.length > 0) {
                const aMinRemainingDays = Math.min(...aOtherFilters.map(filter => filter.remaining_days));
                const bMinRemainingDays = Math.min(...bOtherFilters.map(filter => filter.remaining_days));
                return aMinRemainingDays - bMinRemainingDays;
            }
        } else if (sortBy === 'down') {
            if (aExpiredFilters.length > 0 && bExpiredFilters.length > 0) {
                const aMaxRemainingDays = Math.max(...aExpiredFilters.map(filter => filter.remaining_days));
                const bMaxRemainingDays = Math.max(...bExpiredFilters.map(filter => filter.remaining_days));
                return aMaxRemainingDays - bMaxRemainingDays;
            }

            if (aOtherFilters.length > 0 && bOtherFilters.length > 0) {
                const aMinRemainingDays = Math.min(...aOtherFilters.map(filter => filter.remaining_days));
                const bMinRemainingDays = Math.min(...bOtherFilters.map(filter => filter.remaining_days));
                return bMinRemainingDays - aMinRemainingDays;
            }
        }

        if (aExpiredFilters.length > 0) return 1;
        if (bExpiredFilters.length > 0) return -1;
        if (aOtherFilters.length > 0) return -1;
        if (bOtherFilters.length > 0) return 1;

        return 0;
    });
};