document.addEventListener('DOMContentLoaded', () => {
  const chatWindow = document.getElementById('chatWindow');
  const input = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendBtn');

  function appendBubble(text, sender) {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex ' + (sender === 'user' ? 'justify-end' : 'justify-start');

    const bubble = document.createElement('div');
    bubble.className = [
      'max-w-[75%] px-4 py-2 rounded-lg transition-colors duration-200',
      sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
    ].join(' ');
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    chatWindow.appendChild(wrapper);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  sendBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    appendBubble(text, 'user');
    input.value = '';
    setTimeout(() => {
      appendBubble('Đây là phản hồi giả lập từ ChatGPT.', 'bot');
    }, 500);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });
});
