import React, { Component } from 'react';
import Header from './Header';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: [
        { id: 1, content: 'Bữa sáng', amount: 35000, category: 'Ăn uống', date: '2026-11-12' },
        { id: 2, content: 'Mua sách', amount: 150000, category: 'Học tập', date: '2026-11-12' }
      ],
      filterCategory: 'Tất cả'
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.expenses !== this.state.expenses || prevState.filterCategory !== this.state.filterCategory) {
      document.title = `Tổng chi: ${this.calculateTotal().toLocaleString()} đ`;
    }
  }

  addExpense = (expense) => {
    this.setState(prevState => ({ expenses: [...prevState.expenses, { ...expense, id: Date.now() }] }));
  }

  deleteExpense = (id) => {
    this.setState(prevState => ({ expenses: prevState.expenses.filter(item => item.id !== id) }));
  }

  calculateTotal = () => {
    return this.getFilteredExpenses().reduce((sum, item) => sum + item.amount, 0);
  }

  getFilteredExpenses = () => {
    const { expenses, filterCategory } = this.state;
    if (filterCategory === 'Tất cả') return expenses;
    return expenses.filter(item => item.category === filterCategory);
  }

  render() {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <Header />
        <ExpenseForm addExpense={this.addExpense} />
        
        <div style={{ marginBottom: '20px' }}>
          <strong>Lọc: </strong>
          <select onChange={(e) => this.setState({ filterCategory: e.target.value })}>
            <option value="Tất cả">Tất cả</option>
            <option value="Ăn uống">Ăn uống</option>
            <option value="Đi lại">Đi lại</option>
            <option value="Học tập">Học tập</option>
            <option value="Giải trí">Giải trí</option>
          </select>
        </div>

        <ExpenseList expenses={this.getFilteredExpenses()} deleteExpense={this.deleteExpense} />
        
        <h3>Tổng tiền: {this.calculateTotal().toLocaleString()} đ</h3>
      </div>
    );
  }
}

export default App;