import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Borrowing } from '@/types/api';
import { MemberDashboardData } from '@/types/dashboard';
import { borrowingsApi } from '@/utils/api';

const MemberDashboardContext = createContext<MemberDashboardData | undefined>(undefined);

export const MemberDashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['borrowings', 'member'],
    queryFn: async () => {
      const response = await borrowingsApi.search({ status: [] });
      return response;
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  const value: MemberDashboardData = {
    borrowings: data?.data ?? [],
    isLoading,
    error: error as Error | null,
  };

  return (
    <MemberDashboardContext.Provider value={value}>
      {children}
    </MemberDashboardContext.Provider>
  );
};

export const useMemberDashboard = () => {
  const context = useContext(MemberDashboardContext);
  if (!context) {
    throw new Error('useMemberDashboard must be used within a MemberDashboardProvider');
  }
  return context;
};
