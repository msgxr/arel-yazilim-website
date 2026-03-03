/* ============================================================
   AREL YAZILIM KULÜBÜ — Gemini AI Chatbot Widget
   Self-contained: injects HTML + CSS, calls Gemini 2.0 Flash
   ============================================================ */

(function () {
    'use strict';

    /* ── CONFIG ─────────────────────────────────────────────── */
    const GEMINI_API_KEY = 'BURAYA_API_KEYI_YAZ';  // <-- replace with your key
    const GEMINI_MODEL = 'gemini-2.0-flash';
    const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

    /* ── CLUB SYSTEM CONTEXT (Turkish) ──────────────────────── */
    const SYSTEM_CONTEXT = `
Sen Arel Yazılım Kulübü'nün (AYK) yapay zeka asistanısın. Sana kulüp hakkında kapsamlı bilgi veriyorum; bu bilgilere dayanarak Türkçe olarak yardımcı ol.

## Kulüp Kimliği
- **İsim:** Arel Yazılım Kulübü (AYK) 
- **Üniversite:** İstanbul Arel Üniversitesi, Tepekent Kemal Gözükara Yerleşkesi, Büyükçekmece / İstanbul
- **Kuruluş:** 2022
- **Misyon:** Öğrencilerin teknik becerilerini geliştirmek, endüstri bağlantıları kurmak ve yazılım kültürü oluşturmak
- **Vizyon:** İstanbul'un en aktif ve etkili öğrenci yazılım topluluğu olmak

## Odak Alanları
1. **Yapay Zeka & Makine Öğrenmesi** — Python, TensorFlow, PyTorch, Scikit-learn, NLP, derin öğrenme
2. **Yazılım Geliştirme** — Frontend (React, Vue.js, Next.js), Backend (Node.js, Python, FastAPI), DevOps (Docker, Kubernetes, CI/CD), Veritabanı (PostgreSQL, MongoDB)
3. **Veri Bilimi** — Pandas, SQL, Tableau, Apache Spark, veri analizi ve görselleştirme

## Etkinlikler
- Seminerler, workshoplar, hackathonlar, mentorship programları
- Geçmiş etkinlikler: İşlemcilerin İsimlendirilmesi (60+ katılımcı), AI Trendleri Semineri (80+), Python ile Veri Analizi (25 kişilik workshop), İstanbul Üniversite Hackathonu (En İyi Sunum ödülü), Git & GitHub Workshop
- Yaklaşan: React Modern Web Uygulamaları workshop (15 kişilik kontenjan), Yazılım Kariyeri Yol Haritası semineri

## Yönetim Kadrosu
- **Kerim Can Karadağ** — Yazılım Müh. 2. Sınıf (Başkan)
- **Muhammed Sina Gün** — Bilgisayar Müh. 2. Sınıf (Genel Koordinatör)  
- **Eren Bahadır** — Bilgisayar Müh. 3. Sınıf (CTO)
- **Mahsun Ulusal** — Yazılım Müh. 2. Sınıf (Başkan Yardımcısı)
- Ve 9 departman sorumlusu daha (Teknik, İçerik, Tasarım, Sponsorluk, Sosyal Medya, vb.)

## İletişim & Sosyal Medya
- **E-posta:** yazilimkulubu@istanbularel.edu.tr
- **Instagram:** @arel.yazilim
- **X (Twitter):** @ArelSoftware
- **LinkedIn:** Arel Yazılım Kulübü
- **GitHub:** github.com/ArelSoftwareClub
- **Website:** arelsoftwareclub.github.io/website
- **Üyelik başvurusu:** iletişim formu üzerinden

## İstatistikler
- 197+ aktif üye
- 20+ düzenlenen etkinlik
- 3 temel odak alanı
- 2022'den beri aktif

## Katılım
Kulübe katılmak için: iletisim.html sayfasındaki formu doldurun veya Instagram'dan DM gönderin. Üyelik ücretsizdir. Tüm İstanbul Arel Üniversitesi öğrencileri başvurabilir.

## Konuşma Kuralların
- **Sadece Türkçe** konuş (kullanıcı başka dilde yazsa bile Türkçe yanıtla)
- Samimi, yardımsever ve motive edici ol
- Kulüp dışında kalan sorulara kibar şekilde "Üzgünüm, sadece Arel Yazılım Kulübü hakkında yardım edebiliyorum." de
- Cevapları kısa ve net tut (6 cümleyi geçme)
- Emoji kullanımı hoş ama aşırıya kaçma
- Üyelik, etkinlik veya teknik sorularda spesifik öner
`;

    const SUGGESTIONS = [
        'Kulübe nasıl katılabilirim?',
        'Yaklaşan etkinlikler neler?',
        'Hangi teknolojiler öğretiliyor?',
        'Ekip kimlerden oluşuyor?',
        'İletişim bilgileri nedir?',
        'Hackathon\'a katılabilir miyim?',
    ];

    /* ── INJECT CSS ─────────────────────────────────────────── */
    const css = `
    #ayk-chat-widget * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    
    #ayk-chat-toggle {
      position: fixed; bottom: 28px; right: 28px; z-index: 9999;
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg, #E8531D, #C43F0E);
      border: none; cursor: pointer;
      box-shadow: 0 4px 24px rgba(232,83,29,0.45);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
      color: #fff;
    }
    #ayk-chat-toggle:hover { transform: scale(1.1); box-shadow: 0 6px 32px rgba(232,83,29,0.55); }
    #ayk-chat-toggle svg { width: 28px; height: 28px; transition: all 0.3s; }
    #ayk-chat-toggle .close-icon { display: none; }
    #ayk-chat-toggle.open .chat-icon { display: none; }
    #ayk-chat-toggle.open .close-icon { display: block; }
    
    /* Pulse ring animation */
    #ayk-chat-toggle::before {
      content: ''; position: absolute; inset: -4px; border-radius: 50%;
      border: 2px solid rgba(232,83,29,0.4);
      animation: ayk-pulse 2.5s ease-out infinite;
    }
    @keyframes ayk-pulse {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    #ayk-chat-toggle.open::before { display: none; }
    
    /* Chat window */
    #ayk-chat-window {
      position: fixed; bottom: 100px; right: 28px; z-index: 9998;
      width: 380px; height: 560px;
      background: #fff; border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08);
      display: flex; flex-direction: column; overflow: hidden;
      opacity: 0; transform: translateY(20px) scale(0.96);
      pointer-events: none;
      transition: opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
    }
    #ayk-chat-window.open {
      opacity: 1; transform: translateY(0) scale(1); pointer-events: all;
    }
    @media (max-width: 440px) {
      #ayk-chat-window { width: calc(100vw - 24px); right: 12px; height: 70vh; bottom: 90px; }
    }
    
    /* Header */
    .ayk-header {
      background: linear-gradient(135deg, #E8531D, #C43F0E);
      padding: 16px 18px; display: flex; align-items: center; gap: 12px;
      color: #fff; flex-shrink: 0;
    }
    .ayk-avatar {
      width: 42px; height: 42px; border-radius: 50%;
      background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0;
    }
    .ayk-header-info { flex: 1; }
    .ayk-header-name { font-weight: 700; font-size: 15px; }
    .ayk-header-status { font-size: 12px; opacity: 0.85; display: flex; align-items: center; gap: 5px; margin-top: 2px; }
    .ayk-status-dot { width: 7px; height: 7px; border-radius: 50%; background: #4cff91; display: inline-block; }
    .ayk-close-btn {
      background: rgba(255,255,255,0.15); border: none; cursor: pointer; color: #fff;
      width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
      transition: background 0.2s; font-size: 18px; line-height: 1;
    }
    .ayk-close-btn:hover { background: rgba(255,255,255,0.25); }
    
    /* Messages area */
    .ayk-messages {
      flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px;
      scroll-behavior: smooth;
    }
    .ayk-messages::-webkit-scrollbar { width: 4px; }
    .ayk-messages::-webkit-scrollbar-track { background: transparent; }
    .ayk-messages::-webkit-scrollbar-thumb { background: #E0E0E0; border-radius: 4px; }
    
    .ayk-msg { display: flex; gap: 8px; align-items: flex-end; max-width: 100%; }
    .ayk-msg.user { flex-direction: row-reverse; }
    
    .ayk-bubble {
      max-width: 78%; padding: 10px 14px; border-radius: 16px;
      font-size: 13.5px; line-height: 1.5; word-wrap: break-word;
    }
    .ayk-msg.bot .ayk-bubble {
      background: #F4F4F4; color: #1a1a1a; border-bottom-left-radius: 4px;
    }
    .ayk-msg.user .ayk-bubble {
      background: linear-gradient(135deg, #E8531D, #C43F0E);
      color: #fff; border-bottom-right-radius: 4px;
    }
    .ayk-msg-avatar {
      width: 28px; height: 28px; border-radius: 50%;
      background: linear-gradient(135deg, #E8531D, #C43F0E);
      display: flex; align-items: center; justify-content: center;
      font-size: 14px; flex-shrink: 0; color: #fff;
    }
    
    /* Typing indicator */
    .ayk-typing { display: flex; gap: 4px; padding: 12px 14px; align-items: center; }
    .ayk-typing span {
      width: 7px; height: 7px; border-radius: 50%; background: #C0C0C0;
      animation: ayk-bounce 1.2s ease-in-out infinite;
    }
    .ayk-typing span:nth-child(2) { animation-delay: 0.2s; }
    .ayk-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes ayk-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-6px); }
    }
    
    /* Suggestions */
    .ayk-suggestions {
      padding: 0 16px 10px; display: flex; flex-wrap: wrap; gap: 7px; flex-shrink: 0;
    }
    .ayk-suggestion-btn {
      background: #FFF3EE; border: 1.5px solid #E8531D; color: #E8531D;
      border-radius: 20px; padding: 5px 12px; font-size: 12px; cursor: pointer;
      transition: all 0.2s; white-space: nowrap; font-weight: 500;
    }
    .ayk-suggestion-btn:hover { background: #E8531D; color: #fff; }
    
    /* Input area */
    .ayk-input-row {
      padding: 12px 14px; border-top: 1px solid #F0F0F0;
      display: flex; gap: 8px; align-items: flex-end; flex-shrink: 0;
    }
    .ayk-input {
      flex: 1; border: 1.5px solid #E0E0E0; border-radius: 12px;
      padding: 9px 14px; font-size: 13.5px; outline: none; resize: none;
      max-height: 100px; line-height: 1.4; color: #1a1a1a;
      transition: border-color 0.2s; font-family: inherit;
    }
    .ayk-input:focus { border-color: #E8531D; }
    .ayk-input::placeholder { color: #ABABAB; }
    .ayk-send-btn {
      width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg, #E8531D, #C43F0E);
      border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
      color: #fff; transition: transform 0.2s, opacity 0.2s;
    }
    .ayk-send-btn:hover { transform: scale(1.08); }
    .ayk-send-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .ayk-send-btn svg { width: 18px; height: 18px; }
    
    /* Powered by */
    .ayk-powered {
      text-align: center; font-size: 10.5px; color: #ABABAB;
      padding: 6px 0 8px; flex-shrink: 0;
    }
    .ayk-powered a { color: #E8531D; text-decoration: none; }
  `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    /* ── INJECT HTML ─────────────────────────────────────────── */
    const wrapper = document.createElement('div');
    wrapper.id = 'ayk-chat-widget';
    wrapper.innerHTML = `
    <!-- Toggle Button -->
    <button id="ayk-chat-toggle" aria-label="AI Asistan">
      <svg class="chat-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.02 2 11c0 2.93 1.42 5.55 3.64 7.27L4 22l4.1-1.97C9.27 20.63 10.6 21 12 21c5.52 0 10-4.02 10-9S17.52 2 12 2zm0 16c-1.15 0-2.26-.23-3.28-.65L8 17.88l.33-1.15C6.83 15.72 6 13.43 6 11c0-3.87 2.69-7 6-7s6 3.13 6 7-2.69 7-6 7z"/>
        <circle cx="9" cy="11" r="1.2" fill="currentColor"/>
        <circle cx="12" cy="11" r="1.2" fill="currentColor"/>
        <circle cx="15" cy="11" r="1.2" fill="currentColor"/>
      </svg>
      <svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>

    <!-- Chat Window -->
    <div id="ayk-chat-window" role="dialog" aria-label="Arel Yazılım Kulübü AI Asistanı">
      <div class="ayk-header">
        <div class="ayk-avatar">🤖</div>
        <div class="ayk-header-info">
          <div class="ayk-header-name">AYK — AI Asistan</div>
          <div class="ayk-header-status">
            <span class="ayk-status-dot"></span>
            Çevrimiçi · Gemini ile güçlendirildi
          </div>
        </div>
        <button class="ayk-close-btn" aria-label="Kapat">✕</button>
      </div>

      <div class="ayk-messages" id="ayk-messages"></div>

      <div class="ayk-suggestions" id="ayk-suggestions"></div>

      <div class="ayk-input-row">
        <textarea class="ayk-input" id="ayk-input" placeholder="Bir şey sor..." rows="1" aria-label="Mesaj gir"></textarea>
        <button class="ayk-send-btn" id="ayk-send" aria-label="Gönder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>
      <div class="ayk-powered">Powered by <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noopener">Google Gemini</a></div>
    </div>
  `;
    document.body.appendChild(wrapper);

    /* ── STATE & REFS ────────────────────────────────────────── */
    const toggleBtn = document.getElementById('ayk-chat-toggle');
    const chatWindow = document.getElementById('ayk-chat-window');
    const messagesEl = document.getElementById('ayk-messages');
    const inputEl = document.getElementById('ayk-input');
    const sendBtn = document.getElementById('ayk-send');
    const suggestionsEl = document.getElementById('ayk-suggestions');

    let isOpen = false;
    let isLoading = false;
    let firstOpen = true;
    const history = [];   // { role: 'user'|'model', parts: [{text}] }

    /* ── HELPERS ─────────────────────────────────────────────── */
    function createMsgEl(role, text) {
        const isBot = role === 'bot';
        const div = document.createElement('div');
        div.className = `ayk-msg ${isBot ? 'bot' : 'user'}`;
        if (isBot) { div.innerHTML = `<div class="ayk-msg-avatar">🤖</div>`; }
        const bubble = document.createElement('div');
        bubble.className = 'ayk-bubble';
        // Simple markdown: bold, newlines
        bubble.innerHTML = text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        div.appendChild(bubble);
        return div;
    }

    function addMessage(role, text) {
        const el = createMsgEl(role, text);
        messagesEl.appendChild(el);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return el;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'ayk-msg bot';
        div.id = 'ayk-typing';
        div.innerHTML = `
      <div class="ayk-msg-avatar">🤖</div>
      <div class="ayk-bubble ayk-typing">
        <span></span><span></span><span></span>
      </div>`;
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function hideTyping() {
        const el = document.getElementById('ayk-typing');
        if (el) el.remove();
    }

    function showSuggestions() {
        suggestionsEl.innerHTML = '';
        SUGGESTIONS.forEach(s => {
            const btn = document.createElement('button');
            btn.className = 'ayk-suggestion-btn';
            btn.textContent = s;
            btn.onclick = () => sendMessage(s);
            suggestionsEl.appendChild(btn);
        });
    }

    function hideSuggestions() {
        suggestionsEl.innerHTML = '';
    }

    /* ── GEMINI API CALL ─────────────────────────────────────── */
    async function callGemini(userText) {
        // Build conversation history for Gemini
        history.push({ role: 'user', parts: [{ text: userText }] });

        const body = {
            system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
            contents: history,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 512,
                topP: 0.9,
            },
            safetySettings: [
                { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
                { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
            ],
        };

        const res = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            if (res.status === 400 && GEMINI_API_KEY === 'BURAYA_API_KEYI_YAZ') {
                throw new Error('API_KEY_MISSING');
            }
            throw new Error(err.error?.message || `HTTP ${res.status}`);
        }

        const data = await res.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!reply) throw new Error('Yanıt alınamadı');

        history.push({ role: 'model', parts: [{ text: reply }] });
        return reply;
    }

    /* ── SEND MESSAGE ────────────────────────────────────────── */
    async function sendMessage(text) {
        text = (text || inputEl.value).trim();
        if (!text || isLoading) return;

        inputEl.value = '';
        inputEl.style.height = 'auto';
        isLoading = true;
        sendBtn.disabled = true;
        hideSuggestions();

        addMessage('user', text);
        showTyping();

        try {
            const reply = await callGemini(text);
            hideTyping();
            addMessage('bot', reply);
        } catch (err) {
            hideTyping();
            if (err.message === 'API_KEY_MISSING') {
                addMessage('bot', '⚠️ Henüz API key tanımlanmamış. Lütfen `chatbot.js` dosyasındaki `GEMINI_API_KEY` alanını doldurun.');
            } else {
                addMessage('bot', '😕 Bir hata oluştu, lütfen tekrar dene. (' + err.message + ')');
            }
        } finally {
            isLoading = false;
            sendBtn.disabled = false;
            inputEl.focus();
        }
    }

    /* ── TOGGLE ──────────────────────────────────────────────── */
    function toggleChat() {
        isOpen = !isOpen;
        toggleBtn.classList.toggle('open', isOpen);
        chatWindow.classList.toggle('open', isOpen);

        if (isOpen && firstOpen) {
            firstOpen = false;
            // Welcome message
            setTimeout(() => {
                addMessage('bot', '👋 **Merhaba! Ben AYK AI Asistanı.**\n\nArel Yazılım Kulübü hakkında her şeyi sorabilirsn — etkinlikler, üyelik, teknik alanlar ve daha fazlası. Sana nasıl yardımcı olabilirim?');
                showSuggestions();
            }, 300);
        }
        if (isOpen) inputEl.focus();
    }

    /* ── EVENT LISTENERS ─────────────────────────────────────── */
    toggleBtn.addEventListener('click', toggleChat);
    chatWindow.querySelector('.ayk-close-btn').addEventListener('click', toggleChat);

    sendBtn.addEventListener('click', () => sendMessage());

    inputEl.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    inputEl.addEventListener('input', () => {
        inputEl.style.height = 'auto';
        inputEl.style.height = Math.min(inputEl.scrollHeight, 100) + 'px';
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && isOpen) toggleChat();
    });

})();
