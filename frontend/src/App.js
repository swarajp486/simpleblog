import { useRoutes } from 'react-router-dom';
import './App.css';
import Header from './Component/header/Header';
import { routes } from './routes';






function App() {
const element=useRoutes(routes)

  return (
  <>
  <main>
  <Header/>
  {element}
  </main>
  </>
  );
}

export default App;
