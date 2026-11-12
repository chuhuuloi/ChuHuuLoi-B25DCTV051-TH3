import React, { useState, useEffect, useRef, useContext } from 'react';
import { useFetch } from './hooks/useFetch';
import { useClock } from './hooks/useClock';
import { ThemeContext } from './contexts/ThemeContext';

function App() {
  const { data: expenses, loading, error, addData, deleteData } = useFetch();
  const time = useClock();
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  const [filter, setFilter] = useState('Tất cả');
  const [search, setSearch] = useState('');
  
  // States cho Form
  const [content, setContent] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [date, setDate] = useState('');
  
  const contentInputRef = useRef(null); // useRef để focus[cite: 1]

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content || !amount || !date) return alert('Nhập đủ thông tin!');
    
    addData({ content, amount: Number(amount), category, date });
    setContent(''); setAmount(''); setCategory('Ăn uống'); setDate('');
    
    contentInputRef.current.focus(); // Focus vào ô nhập liệu sau khi thêm[cite: 1]
  };

  // Lọc và Tìm kiếm
  const displayedExpenses = expenses.filter(item => {
    const matchCategory = filter === 'Tất cả' || item.category === filter;
    const contentStr = item.content || ''; 
    const matchSearch = contentStr.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const total = displayedExpenses.reduce((sum, item) => sum + Number(item.amount), 0);

  useEffect(() => {
    document.title = `Tổng chi: ${total.toLocaleString()} đ`; // useEffect thay cho componentDidUpdate[cite: 1]
  }, [total]);

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ borderBottom: '1px solid gray', paddingBottom: '10px' }}>
        <h2>Sổ Chi Tiêu (Hooks) <button onClick={toggleTheme}>Đổi Theme ({theme})</button></h2>
        <p>Bây giờ là: {time}</p>
      </header>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{color: 'red'}}>Lỗi: {error}</p>}

      <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
        <input ref={contentInputRef} value={content} onChange={e => setContent(e.target.value)} placeholder="Nội dung" style={{ marginRight: '5px' }} />
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Số tiền" style={{ marginRight: '5px' }} />
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ marginRight: '5px' }}>
          <option value="Ăn uống">Ăn uống</option>
          <option value="Đi lại">Đi lại</option>
          <option value="Học tập">Học tập</option>
          <option value="Giải trí">Giải trí</option>
        </select>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ marginRight: '5px' }}/>
        <button type="submit">Thêm</button>
      </form>

      <div style={{ marginBottom: '20px' }}>
        <strong>Lọc: </strong>
        <select onChange={e => setFilter(e.target.value)}>
          <option value="Tất cả">Tất cả</option>
          <option value="Ăn uống">Ăn uống</option>
          <option value="Đi lại">Đi lại</option>
          <option value="Học tập">Học tập</option>
          <option value="Giải trí">Giải trí</option>
        </select>
        <input type="text" placeholder="Tìm kiếm nội dung..." value={search} onChange={e => setSearch(e.target.value)} style={{ marginLeft: '15px' }} />
      </div>

      <ul>
        {displayedExpenses.map(item => (
          <li key={item.id}>
            {item.content} - {Number(item.amount).toLocaleString()}đ ({item.category})
            <button onClick={() => deleteData(item.id)} style={{ marginLeft: '10px', color: 'red' }}>Xóa</button>
          </li>
        ))}
      </ul>
      <h3>Tổng tiền: {total.toLocaleString()} đ</h3>
    </div>
  );
}

export default App;