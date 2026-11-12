import React, { Component } from 'react';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '', amount: '', category: 'Ăn uống', date: '' };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { content, amount, category, date } = this.state;
    
    if (!content.trim() || !amount || !date) return alert('Vui lòng nhập đủ thông tin!');
    if (Number(amount) <= 0) return alert('Số tiền phải lớn hơn 0!');

    this.props.addExpense({ content, amount: Number(amount), category, date });
    this.setState({ content: '', amount: '', category: 'Ăn uống', date: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" name="content" placeholder="Nội dung" value={this.state.content} onChange={this.handleChange} style={{ marginRight: '5px' }}/>
        <input type="number" name="amount" placeholder="Số tiền" value={this.state.amount} onChange={this.handleChange} style={{ marginRight: '5px' }}/>
        <select name="category" value={this.state.category} onChange={this.handleChange} style={{ marginRight: '5px' }}>
          <option value="Ăn uống">Ăn uống</option>
          <option value="Đi lại">Đi lại</option>
          <option value="Học tập">Học tập</option>
          <option value="Giải trí">Giải trí</option>
        </select>
        <input type="date" name="date" value={this.state.date} onChange={this.handleChange} style={{ marginRight: '5px' }}/>
        <button type="submit">Thêm khoản chi</button>
      </form>
    );
  }
}

export default ExpenseForm;