"use client"
import React, { FC, Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { DashboardLineChart, DashboardBarChart } from '@/components/dashboard';
import LoadingSpinner from '@/components/LoadingSpinner';
// const DashboardLineChart = dynamic(() => import('@/components/dashboard/dashboardLineChart'), { ssr: false })
// const DashboardBarChart = dynamic(() => import('@/components/dashboard/dashboardBarChart'), { ssr: false })

interface DashboardChartsProps {
}

const DashboardCharts: FC<DashboardChartsProps> = () => {

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient ?
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-300 p-4 mt-5">
            <DashboardLineChart />
          </div>
          <div className="bg-white border border-gray-300 p-4 mt-5">
            <DashboardBarChart />
          </div>
        </div>
      :
        <LoadingSpinner />
      }
    </>
  );
};

export default DashboardCharts;
