import {AppContextProvider} from './contexts/AppContext';
import './App.css';
import {MainContent} from './components/MainContent';

function App() {

  return (
    <AppContextProvider>
       <MainContent />
    </AppContextProvider>
  )
}

export default App