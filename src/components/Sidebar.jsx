import { FaTasks, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="../../src/assets/logo.png" alt="Logo da Empresa" />
        
      </div>

      <nav className="main-nav">
        <ul>
          <li className="nav-item active">
            <a href="#">
              <FaTasks /> <span>Minhas Tarefas</span>
            </a>
          </li>
          <li className="nav-item">
            <a href="#">
              <FaCog /> <span>Configurações</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <a href="#">
          <FaQuestionCircle /> <span>Ajuda</span>
        </a>
        <a href="#">
          <FaSignOutAlt /> <span>Sair</span>
        </a>
      </div>
    </aside>
  )
}
