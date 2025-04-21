import { useParams } from 'react-router-dom'
import { unit_one, unit_two, unit_three, unit_four} from './modules'

const Objectives = () => {
  const { id: unitId } = useParams()

  const content = () => {
    if (unitId === '1') return unit_one
    if (unitId === '2') return unit_two
    if (unitId === '3') return unit_three
    if (unitId === '4') return unit_four
  }

  return content()
}

export default Objectives
