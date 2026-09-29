import './SummaryCards.css';

function SummaryCards () {
  return (
    <div className='summary-container'>
      <div 
        className="net-balamce">
        <p>Net Balance</p>
      </div>
      <div 
        className="total-income">
          <p>Total Income</p>
      </div>
      <div 
        className="total-expense">
          <p>Total Expense</p>
      </div>
    </div>
  );
}

export default SummaryCards;