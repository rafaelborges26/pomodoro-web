import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  fineshedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      // return {
      //  ...state,
      //  cycles: [...state.cycles, action.payload.newCycle],
      //  activeCycleId: action.payload.newCycle.id,
      // }
      // versão com o immer utilizando o draft como rascunha para atribuir os valores, sem precisar se preocupar com a imutabilidade
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //  ...state,
      //  cycles: state.cycles.map((cycle) => {
      //    if (cycle.id === state.activeCycleId) {
      //      return { ...cycle, interruptedDate: new Date() }
      //    } else {
      //      return cycle
      //    }
      //  }),
      //  activeCycleId: null,
      // }

      // mais simples
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      // return {
      //  ...state,
      //  cycles: state.cycles.map((cycle) => {
      //    if (cycle.id === state.activeCycleId) {
      //      return { ...cycle, fineshedDate: new Date() }
      //    } else {
      //      return cycle
      //    }
      //  }),
      //  activeCycleId: null,
      // }

      // mais simples
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.activeCycleId = null
        draft.cycles[currentCycleIndex].fineshedDate = new Date()
      })
    }

    default:
      return state
  }
}
