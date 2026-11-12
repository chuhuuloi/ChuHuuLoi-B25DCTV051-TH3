import React, { Component } from 'react';

class ExpenseList extends Component {
  handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      this.props.deleteExpense(id);
    }
  }

  render() {
    const { expenses } = this.props;
    return (
      <ul>
        {expenses.map(item => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            {item.content} - {item.amount.toLocaleString()}đ ({item.category} | {item.date}) 
            <button onClick={() => this.handleDelete(item.id)} style={{ marginLeft: '10px', color: 'red' }}>Xóa</button>
          </li>
        ))}
      </ul>
    );
  }
}

export default ExpenseList;