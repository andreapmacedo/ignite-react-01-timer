import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState } from 'react'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  MinutesAmountInput,
  StartCountdownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  
  // controlled
  // const [task, setTask] = useState('')
  
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null) // null -> não tem ciclo ativo

  // uncontroled
  // function handleSubmit(event: any) {
  //   event.preventDefault()
  //   console.log(event.target.task.value)
  //   // setTask(event.target.task.value)
  // }

  // useForm
  // const { register, handleSubmit, watch } = useForm()
  // const { register, handleSubmit, watch } = useForm({
  // const { register, handleSubmit, watch } = useForm<NewCycleFormData>({
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  // function handleCreateNewCycle(data: any) {
  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data)
    const id = String(new Date().getTime()) // Atribuir uma ID única para o ciclo, que neste caso é o timestamp atual em milissegundos

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }
  
    // setCycles([...cycles, newCycle])
    setCycles((state) => [...state, newCycle]) // clousure, usar arrow function sempre que o estado atual depende do anterior
    setActiveCycleId(id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId) // mostrar o ciclo ativo

  console.log(activeCycle)

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      {/* <form> */}
      {/* uncontroled -> <form onSubmit={handleSubmit}> */}
      {/* <form onSubmit={handleSubmit}> */}
      {/* useForm */}
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          {/* <input id="task" /> */}
          {/* <TaskInput id="task" placeholder="Dê um nome para o seu projeto" /> */}
          <TaskInput
            id="task"
            // name="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            // controlled
            // value={task}
            // onChange={(event) => setTask(event.target.value)}
            // useForm
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Banana" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          {/* <input type="number" id="minutesAmount" /> */}
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        {/* <button type="submit"> */}
        {/* <Play size={24} />
          Começar */}
        {/* </button> */}
         {/* <StartCountdownButton disabled type="submit"> */}
        {/* <StartCountdownButton disabled={!task} type="submit"> */}
        <StartCountdownButton disabled={isSubmitDisable} type="submit">
          <Play size={24} />
          Começar
         </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}