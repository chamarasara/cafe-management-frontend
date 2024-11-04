import { createFileRoute } from '@tanstack/react-router'
import Root from '../components/Root'

export const Route = createFileRoute('/')({
  component: () => <Root/>,
})
