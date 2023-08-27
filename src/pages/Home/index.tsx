import { HandPalm, Play } from 'phosphor-react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import * as zod from 'zod'
import { useEffect, useState } from 'react'
// import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from './Components/NewCycleForm'
import { Countdown } from './Components/Countdown'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  finishedDate?: Date
}

export function Home() {
  
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null) // null -> não tem ciclo ativo

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) // mostrar o ciclo ativo

  // function handleCreateNewCycle(data: any) {
  function handleCreateNewCycle(data: NewCycleFormData) {
    // console.log(data)
    const id = String(new Date().getTime()) // Atribuir uma ID única para o ciclo, que neste caso é o timestamp atual em milissegundos

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
  
    // setCycles([...cycles, newCycle])
    setCycles((state) => [...state, newCycle]) // clousure, usar arrow function sempre que o estado atual depende do anterior
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    // setCycles(
    //   cycles.map((cycle) => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }


  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60) // arredonda pra baixo
  const secondsAmount = currentSeconds % 60 // quantos minutos sobraram da divisão

  const minutes = String(minutesAmount).padStart(2, '0') // padStart -> se tiver menos de 2 caracteres, preenche com 0
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const task = watch('task') // useForm
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
      <NewCycleForm />
        <Countdown
          activeCycle={activeCycle}
          setCycles={setCycles}
          activeCycleId={activeCycleId}
        />

        {activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisable} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}

      </form>
    </HomeContainer>
  )
}