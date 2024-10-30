import { createFileRoute } from '@tanstack/react-router'
import CafesPage from '../pages/CafesPage'

export const Route = createFileRoute('/')({
  component: () => <CafesPage/>,
})
