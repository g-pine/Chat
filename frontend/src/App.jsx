import io from 'socket.io-client';
import { useState, useEffect } from 'react';

const socket = io("/");

function App() {
  
  const [message, setMessage] = useState('');
  const [mensajes, setMensajes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: 'Me'
    };
    setMensajes([...mensajes, newMessage]);
    socket.emit('message', message);
    setMessage('');
  }

  useEffect(() => {
    socket.on('message', receiveMessage);

    return () => {
      socket.off('message', receiveMessage);
    }
  }, []);

  const receiveMessage = (message) => {
    setMensajes((state) => [...state, message]);
  }

  return (
    <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='bg-zinc-900 p-10'>
        <h1 className='text-2xl font-bold my-2'>Chat React</h1>
        <input
          className='border-2 border-zinc-500 p-2 w-100 block text-black'
          type="text"
          placeholder='Write your message...'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <ul>
          {mensajes.map((dato, i) => (
            <li
              className={
                `my-2 p-2 table text-sm rounded-md bg-sky-700
                ${dato.from === 'Me' ? 'bg-sky-700 ml-auto' : 'bg-black-700'}`
              }
              key={i}>
              <span className='text-xs text-slate-300 block'>
                {dato.from}
              </span>
              <span className='text-md'>
                {dato.body}
              </span>
            </li>
          ))}
          <li></li>
        </ul>
      </form>
    </div>
  );
}

export default App;
