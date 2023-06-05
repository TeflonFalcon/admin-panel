import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import NoAuthLayout from '@/layouts/NoAuthLayout'
import LoginPage from '@/pages/LoginPage'
import AccessDeniedPage from '@/pages/AccessDeniedPage'
import MainLayout from '@/layouts/MainLayout'
import ComplaintsPage from '@/pages/ComplaintsPage'
import NotificationPage from '@/pages/NotificationPage'
import EducationPage from '@/pages/EducationPage'
import ModeratorsPage from '@/pages/ModeratorsPage'
import ComplaintDetailPage from '@/pages/ComplaintDetailPage'
import CreateComplaintPage from '@/pages/CreateComplaintPage'
import CreateEducationPage from '@/pages/CreateEducationPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <NoAuthLayout />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/denied',
        element: <AccessDeniedPage />,
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/complaints',
        element: <ComplaintsPage />,
      },
      {
        path: '/complaints/:id',
        element: <ComplaintDetailPage />,
      },
      {
        path: '/complaints/create',
        element: <CreateComplaintPage />,
      },
      {
        path: '/moderators',
        element: <ModeratorsPage />,
      },
      {
        path: '/education',
        element: <EducationPage />,
      },
      {
        path: '/education/create',
        element: <CreateEducationPage />,
      },
      {
        path: '/notification',
        element: <NotificationPage />,
      },
    ],
  },
])
export default router
