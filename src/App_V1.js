import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Logo from './components/Logo';
import Menu from './components/Menu';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className='logo'>
      <Logo />

      <Header />

      <Footer title="Facebook" website='www.facebook.com' postcode={41000} isOpen={true} />

      <Sidebar />

      <Menu />
    </div>
  );
}

export default App;
