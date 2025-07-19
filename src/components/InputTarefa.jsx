export default function InputTarefa({ novaTarefa, setNovaTarefa, adicionarTarefa }) {
  return (
    <div className="add-task-card card">
      <h3>Adicionar Nova Tarefa</h3>
      <div className="form-group">
        <input
          type="text"
          id="new-task-input"
          placeholder="Descreva sua nova tarefa..."
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />
        <button className="btn btn-add" id="add-task-btn" onClick={adicionarTarefa}>
          {/* <Plus size={16} style={{ marginRight: '5px' }} /> */}
          Adicionar
        </button>
      </div>
    </div>
  );
}
