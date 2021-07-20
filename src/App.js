import './App.css';
import Header from './page/common/Header';
import Weather from './page/common/Weather';
import Footer from './page/common/Footer';
import './statics/iconfont/iconfont.css';

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <Header />
        </header>
        <section>
            <Weather />
        </section>
        <footer>
            <Footer />
        </footer>
    </div>
  );
}

export default App;
