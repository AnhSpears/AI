document.addEventListener('DOMContentLoaded', () => {
  const chatList   = document.getElementById('chatList');
  const newChatBtn = document.getElementById('newChatBtn');
  const chatWindow = document.getElementById('chatWindow');
  const input      = document.getElementById('userInput');
  const sendBtn    = document.getElementById('sendBtn');

  let conversations = [];
  let currentId     = null;

  // Tạo cuộc chat mới
  function createConversation() {
    const id    = Date.now().toString();
    const title = `Chat ${conversations.length + 1}`;
    conversations.push({ id, title, messages: [] });
    selectConversation(id);
    renderConversationList();
  }

  // Đổi tên chat
  function renameConversation(id) {
    const conv = conversations.find(c => c.id === id);
    const newName = prompt('Tên mới:', conv.title);
    if (newName?.trim()) {
      conv.title = newName.trim();
      renderConversationList();
    }
  }

  // Render sidebar kèm nút rename
  function renderConversationList() {
    chatList.innerHTML = '';
    conversations.forEach(conv => {
      const wrapper = document.createElement('div');
      wrapper.className = 'flex items-center justify-between mb-1';

      const btn = document.createElement('button');
      btn.className = [
        'flex-1 text-left px-3 py-2 rounded transition',
        conv.id === currentId ? 'bg-gray-700 hover:bg-gray-700' : 'hover:bg-gray-700'
      ].join(' ');
      btn.textContent = conv.title;
      btn.onclick = () => selectConversation(conv.id);

      const renameBtn = document.createElement('button');
      renameBtn.className = 'ml-2 p-1 hover:bg-gray-700 rounded';
      renameBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"
             class="h-4 w-4 text-gray-300 hover:text-white"
             fill="none" viewBox="0 0 24 24"
             stroke="currentColor">
          <path stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M15.232 5.232l3.536 3.536
                   M9 11l3 3L19.071 6.929a1.5 1.5 0 00-2.121-2.121L9 11z"/>
        </svg>`;
      renameBtn.onclick = () => renameConversation(conv.id);

      wrapper.append(btn, renameBtn);
      chatList.appendChild(wrapper);
    });
  }

  // Chọn chat và load tin nhắn
  function selectConversation(id) {
    currentId = id;
    const conv = conversations.find(c => c.id === id);
    chatWindow.innerHTML = '';
    conv.messages.forEach(m => appendBubble(m.text, m.sender));
    input.value = '';
    input.focus();
    renderConversationList();
  }

  // Tạo bubble
  function appendBubble(text, sender) {
    const wrap = document.createElement('div');
    wrap.className = 'flex ' + (sender === 'user' ? 'justify-end' : 'justify-start');
    const bubble = document.createElement('div');
    bubble.className = [
      'max-w-[75%] px-4 py-2 rounded-lg transition-colors duration-200',
      sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
    ].join(' ');
    bubble.textContent = text;
    wrap.appendChild(bubble);
    chatWindow.appendChild(wrap);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // Gửi tin nhắn
  function sendMessage() {
    const t = input.value.trim();
    if (!t) return;
    const conv = conversations.find(c => c.id === currentId);
    conv.messages.push({ sender: 'user', text: t });
    appendBubble(t, 'user');
    input.value = '';
    setTimeout(() => {
      const r = 'Đây là phản hồi giả lập từ ChatGPT.';
      conv.messages.push({ sender: 'bot', text: r });
      appendBubble(r, 'bot');
    }, 500);
  }

  newChatBtn.addEventListener('click', createConversation);
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Khởi tạo chat đầu tiên
  createConversation();
});
