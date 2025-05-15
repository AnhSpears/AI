document.addEventListener('DOMContentLoaded', () => {
  // DOM
  const chatList   = document.getElementById('chatList');
  const newChatBtn = document.getElementById('newChatBtn');
  const chatWindow = document.getElementById('chatWindow');
  const input      = document.getElementById('userInput');
  const sendBtn    = document.getElementById('sendBtn');

  // Data
  let conversations = [];      // mảng các phiên chat
  let currentId     = null;    // id của phiên đang mở

  // Tạo một phiên chat mới và chọn nó
  function createConversation() {
    const id = Date.now().toString();
    const title = `Chat ${conversations.length + 1}`;
    conversations.push({ id, title, messages: [] });
    selectConversation(id);
    renderConversationList();
  }

  // Render sidebar list
  function renderConversationList() {
    chatList.innerHTML = '';
    conversations.forEach(conv => {
      const btn = document.createElement('button');
      btn.className = [
        'w-full text-left px-3 py-2 rounded flex items-center transition',
        conv.id === currentId
          ? 'bg-gray-700 hover:bg-gray-700'
          : 'hover:bg-gray-700'
      ].join(' ');
      btn.textContent = conv.title;
      btn.onclick = () => selectConversation(conv.id);
      chatList.appendChild(btn);
    });
  }

  // Chọn vào một conversation, load messages lên UI
  function selectConversation(id) {
    currentId = id;
    const conv = conversations.find(c => c.id === id);
    chatWindow.innerHTML = '';
    conv.messages.forEach(m => appendBubble(m.text, m.sender));
    input.value = '';
    input.focus();
    renderConversationList();
  }

  // Tạo bubble text
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

  // Gửi tin nhắn
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    const conv = conversations.find(c => c.id === currentId);
    // push user
    conv.messages.push({ sender: 'user', text });
    appendBubble(text, 'user');
    input.value = '';
    // giả lập bot trả lời
    setTimeout(() => {
      const reply = 'Đây là phản hồi giả lập từ ChatGPT.';
      conv.messages.push({ sender: 'bot', text: reply });
      appendBubble(reply, 'bot');
    }, 500);
  }

  // Event bindings
  newChatBtn.addEventListener('click', createConversation);
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Khởi tạo khi load: tạo conversation đầu tiên
  createConversation();
});
