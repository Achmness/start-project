import './App.css'
import Header from './components/Header';
import CategoryCharts from './components/CategoryCharts';
import TransactionForm from './components/TransactionForms';
import TransactionList from './components/TransactionList';
import SummaryCards from './components/SummaryCards';

function App() {
 

  return (
    <>
      <Header />
      <SummaryCards />
      <div 
        className="transaction-category-container">
        <TransactionForm />
        <CategoryCharts />
      </div>
      <TransactionList />
    </>
  )
}

export default App
