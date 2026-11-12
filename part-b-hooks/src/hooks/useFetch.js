import { useState, useEffect } from 'react';

// THAY LINK MOCKAPI CỦA BẠN VÀO ĐÂY
const API_URL = 'https://6af51cb7f6270fa08d67bca4.mockapi.io/expenses'; 

export const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const result = await res.json();
      setData(result);
    } catch (err) { setError(err.message); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const addData = async (newItem) => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newItem)
      });
      const result = await res.json();
      setData(prev => [...prev, result]);
    } catch (err) { setError(err.message); } 
    finally { setLoading(false); }
  };

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) { setError(err.message); } 
    finally { setLoading(false); }
  };

  return { data, loading, error, addData, deleteData };
};