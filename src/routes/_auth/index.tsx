import { createFileRoute } from '@tanstack/react-router'
import Index from '../../components/index'

export const Route = createFileRoute('/_auth/')({
  component: Index,
})
