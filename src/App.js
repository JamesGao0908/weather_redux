import logo from './logo.svg';
import './App.css';
import Header from './page/components/Header';
import Weather from './page/components/Weather';
import Footer from './page/components/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
		  <Header />
      </header>
	  <main>
		  <Weather />
	  </main>
	  <footer>
		  <Footer />
	  </footer>
    </div>
  );
}

export default App;
