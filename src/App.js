import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <div className="App">
        <Navbar/>
        {/* <HomePage/> */}
        <DetailPage/>
    </div>
  );
}

export default App;
