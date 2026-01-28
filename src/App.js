import FilComp from './components/FilComp';
import AddComp from './components/AddComp';
import './App.css';

function App() {
  const handleRefresh = () => {
    // A simple way to refresh would be to lift state up, 
    // but for now, we can reload or rely on the user to search/refresh as per "Atelier" scope.
    // Or simpler: Trigger a re-fetch in FilComp via a shared context/prop, 
    // but without complicating, let's just let the user see the new UI.
    // Actually, let's force a reload for now to see the new item, 
    // or just let FilComp handle itself with mount.
    window.location.reload();
  };

  return (
    <div className="App">
      <h1 className="app-title">AMEZIANE STORE</h1>

      <div className="dashboard-grid">
        <aside>
          <AddComp onProductAdded={handleRefresh} />
        </aside>

        <main>
          <FilComp />
        </main>
      </div>
    </div>
  );
}

export default App;
