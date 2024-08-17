import './App.css';
import AppStyle from './AppContainer.module.css'; 
import { HeaderComponent } from '../Header/headerComponent';



function App() {
  return (
    <div className={AppStyle.AppContainer}>
      <HeaderComponent></HeaderComponent>
    </div>
  );
}

export default App;
