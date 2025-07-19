import { FaEdit, FaCheck, FaTimes, FaRegCheckCircle } from 'react-icons/fa'

export default function Tarefa({
  tarefa,
  index,
  editando,
  textoEditado,
  onEditar,
  onConfirmar,
  onRemover,
  onMarcarConcluida,
  onEditarTexto
}) {
  return (
    
    <li className={`task-item ${tarefa.concluida ? 'completed' : ''}`}>
      <input
        type="checkbox"
        id={`task_${index}`}
        checked={tarefa.concluida}
        onChange={() => onMarcarConcluida(index)}
      />

      {editando ? (
        <input
          type="text"
          value={textoEditado}
          onChange={(e) => onEditarTexto(e.target.value)}
          style={{ padding: '5px', width: '60%', marginLeft: '10px' }}
        />
      ) : (
        <label htmlFor={`task_${index}`} style={{ marginLeft: '10px' }}>
          {tarefa.texto}
        </label>
      )}

      <span className="task-actions">
        {editando ? (
          <button className="btn-icon" onClick={() => onConfirmar(index)}>
            <FaCheck />
          </button>
        ) : (
          <>
            <button className="btn-icon edit-task-btn" onClick={() => onEditar(index)}>
              <FaEdit />
            </button>
            <button className="btn-icon delete-task-btn" onClick={() => onRemover(index)}>
              <FaTimes />
            </button>
          </>
        )}
      </span>
    </li>
  )
}
