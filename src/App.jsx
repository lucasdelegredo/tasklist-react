import { useState } from 'react'
import InputTarefa from './components/InputTarefa'
import Tarefa from './components/Tarefa'
import PomodoroTimer from './components/PomodoroTimer'
import Sidebar from './components/Sidebar'


function App() {
  const [novaTarefa, setNovaTarefa] = useState('')
  const [tarefas, setTarefas] = useState([])
  const [editandoIndex, setEditandoIndex] = useState(null)
  const [textoEditado, setTextoEditado] = useState('')

  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return
    const nova = { texto: novaTarefa, concluida: false }
    setTarefas([...tarefas, nova])
    setNovaTarefa('')
  }

  const removerTarefa = (index) => {
    setTarefas(tarefas.filter((_, i) => i !== index))
  }

  const iniciarEdicao = (index) => {
    setEditandoIndex(index)
    setTextoEditado(tarefas[index].texto)
  }

  const confirmarEdicao = (index) => {
    const novas = [...tarefas]
    novas[index].texto = textoEditado
    setTarefas(novas)
    setEditandoIndex(null)
    setTextoEditado('')
  }

  const alternarConcluida = (index) => {
    const novas = [...tarefas]
    novas[index].concluida = !novas[index].concluida
    setTarefas(novas)
  }

  return (
    
    <div class="app-container">
      <Sidebar/>
      
      
      <section class="dashboard">
      <PomodoroTimer />
      
      <InputTarefa
        novaTarefa={novaTarefa}
        setNovaTarefa={setNovaTarefa}
        adicionarTarefa={adicionarTarefa}
      />
      
      <div class="tasks-list-card card">
      <h3>Tarefas Atuais</h3>
      <ul class="task-list" id="task-list">
        {tarefas.map((tarefa, index) => (
          <Tarefa
            key={index}
            tarefa={tarefa}
            index={index}
            editando={editandoIndex === index}
            textoEditado={textoEditado}
            onEditar={iniciarEdicao}
            onConfirmar={confirmarEdicao}
            onRemover={removerTarefa}
            onMarcarConcluida={alternarConcluida}
            onEditarTexto={setTextoEditado}
          />
        ))}
      </ul>
      </div>
      </section>
      
      
    </div>
  )
}

export default App
