// Đợi DOM load xong mới bind event
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleBtn');
  const chatWindow = document.getElementById('chatWindow');
  const input = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendBtn');

  if (!sidebar || !toggleBtn) {
    console.error('Không tìm thấy sidebar hoặc toggleBtn');
    return;
  }

  // toggle sidebar rộng/hẹp
  toggleBtn.addEventListener('click', () => {
    console.log('Toggle sidebar');  // debug xem có chạy không
    sidebar.classList.toggle('w-64');
    sidebar.classList.toggle('w-16');
    // ẩn/hiện text trong sidebar
    sidebar.querySelectorAll('.sidebar-text').forEach(el => {
      el.classList.toggle('hidden');
    });
  });

  // hàm thêm bubble
  function appendBubble(text, sender) {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex ' + (sender === 'user' ? 'justify-end' : 'justify-start');

    const bubble = document.createElement('div');
    bubble.className = [
      'max-w-[75%] px-4 py-2 rounded-lg transition-colors duration-200',
      sender === 'user'
        ? 'bg-blue-600 text-white'
        : 'bg-gray-200 text-gray-800'
    ].join(' ');
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    chatWindow.appendChild(wrapper);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // gửi tin nhắn
  sendBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    appendBubble(text, 'user');
    input.value = '';
    setTimeout(() => appendBubble('Đây là phản hồi giả lập từ ChatGPT.', 'bot'), 500);
  });

  // enter để gửi
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });
});
