// Loaded via a plain <script> tag (not a module) so this works when the file
// is opened directly by double-clicking — no local web server needed.
const { createClient } = supabase;
const sb = createClient(
  "https://ifexxmqlsentbxdtsdvz.supabase.co",
  "sb_publishable_j87wxmy8WgbVr5tP3Z9aHA_Ws_gWjJ-"
);

const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const leadsBody = document.getElementById('leads-body');
const leadCount = document.getElementById('lead-count');
const emptyNote = document.getElementById('empty-note');
const searchInput = document.getElementById('search-input');

let allLeads = [];
let allReviews = [];
let currentPassword = '';
const sourceLabels = { google:'Google', telegram:'Telegram', apple:'Apple', phone:'Телефон' };

function starsText(n){ return '★'.repeat(n) + '☆'.repeat(5 - n); }

function formatDate(iso){
  if(!iso) return '—';
  const d = new Date(iso);
  if(isNaN(d)) return '—';
  const pad = n => String(n).padStart(2,'0');
  return pad(d.getDate())+'.'+pad(d.getMonth()+1)+'.'+d.getFullYear()+' '+pad(d.getHours())+':'+pad(d.getMinutes());
}

function reviewCellHtml(lead){
  const review = allReviews.find(r => r.lead_id === lead.id);
  if(review){
    return '<span class="review-stars">' + starsText(review.rating) + '</span><br>' +
           '<span class="review-text">' + (review.review_text || '') + '</span>';
  }
  return '<button type="button" class="add-review-btn" data-lead-id="' + lead.id + '" data-lead-name="' + (lead.name || '').replace(/"/g,'&quot;') + '">+ Добавить</button>' +
         '<div class="review-form" data-lead-id="' + lead.id + '" style="display:none;">' +
           '<textarea class="review-text-input" placeholder="Текст отзыва..."></textarea>' +
           '<select class="review-rating-input">' +
             '<option value="5">★★★★★</option><option value="4">★★★★☆</option>' +
             '<option value="3">★★★☆☆</option><option value="2">★★☆☆☆</option><option value="1">★☆☆☆☆</option>' +
           '</select>' +
           '<button type="button" class="save-review-btn">Сохранить</button>' +
         '</div>';
}

function renderLeads(list){
  leadsBody.innerHTML = '';
  if(list.length === 0){
    emptyNote.textContent = 'Пока нет ни одной заявки.';
    emptyNote.style.display = 'block';
    leadCount.textContent = '';
    return;
  }
  emptyNote.style.display = 'none';
  leadCount.textContent = 'Всего заявок: ' + allLeads.length + (list.length !== allLeads.length ? ' (показано: ' + list.length + ')' : '');
  list.forEach(lead=>{
    const tr = document.createElement('tr');
    tr.innerHTML =
      '<td>' + (lead.name || '—') + '</td>' +
      '<td class="mono">' + (lead.contact || '—') + '</td>' +
      '<td><span class="source-tag">' + (sourceLabels[lead.source] || lead.source || '—') + '</span></td>' +
      '<td class="row-date">' + formatDate(lead.created_at) + '</td>' +
      '<td class="review-cell">' + reviewCellHtml(lead) + '</td>' +
      '<td><button type="button" class="delete-lead-btn" data-lead-id="' + lead.id + '" aria-label="Удалить" title="Удалить заявку">🗑</button></td>';
    leadsBody.appendChild(tr);
  });
}

leadsBody.addEventListener('click', async (e)=>{
  const delBtn = e.target.closest('.delete-lead-btn');
  if(delBtn){
    const id = delBtn.dataset.leadId;
    const lead = allLeads.find(l => l.id === id);
    const label = (lead && lead.name) || 'эту заявку';
    if(!confirm('Удалить заявку от «' + label + '»? Это необратимо.')) return;
    delBtn.disabled = true;
    delBtn.textContent = '…';
    const { error } = await sb.rpc('delete_lead', { p_password: currentPassword, p_id: id });
    if(!error){
      allLeads = allLeads.filter(l => l.id !== id);
      renderStats(allLeads);
      renderLeads(allLeads);
    } else {
      delBtn.disabled = false;
      delBtn.textContent = '🗑';
      alert('Не удалось удалить, попробуйте ещё раз.');
    }
    return;
  }
  const addBtn = e.target.closest('.add-review-btn');
  if(addBtn){
    const form = leadsBody.querySelector('.review-form[data-lead-id="' + addBtn.dataset.leadId + '"]');
    if(form) form.style.display = 'block';
    addBtn.style.display = 'none';
    return;
  }
  const saveBtn = e.target.closest('.save-review-btn');
  if(saveBtn){
    const form = saveBtn.closest('.review-form');
    const leadId = form.dataset.leadId;
    const lead = allLeads.find(l => l.id === leadId);
    const text = form.querySelector('.review-text-input').value.trim();
    const rating = Number(form.querySelector('.review-rating-input').value);
    if(!text) return;
    saveBtn.disabled = true;
    saveBtn.textContent = 'Сохранение…';
    const { error } = await sb.rpc('add_review', {
      p_password: currentPassword,
      p_name: (lead && lead.name) || 'Клиент',
      p_text: text,
      p_rating: rating,
      p_lead_id: leadId
    });
    if(!error){
      await loadReviews();
      renderLeads(allLeads);
    } else {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Сохранить';
    }
  }
});

searchInput.addEventListener('input', ()=>{
  const q = searchInput.value.trim().toLowerCase();
  if(!q){ renderLeads(allLeads); return; }
  renderLeads(allLeads.filter(l =>
    (l.name||'').toLowerCase().includes(q) || (l.contact||'').toLowerCase().includes(q)
  ));
});

document.getElementById('export-btn').addEventListener('click', ()=>{
  if(allLeads.length === 0) return;
  const rows = [['Имя','Контакт','Источник','Дата']];
  allLeads.forEach(l => rows.push([l.name||'', l.contact||'', sourceLabels[l.source]||l.source||'', formatDate(l.created_at)]));
  const csv = rows.map(r => r.map(v => '"' + String(v).replace(/"/g,'""') + '"').join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'viamor-tour-leads.csv';
  a.click();
});

document.getElementById('logout-btn').addEventListener('click', ()=>{
  loginScreen.style.display = 'flex';
  dashboard.style.display = 'none';
  document.getElementById('admin-password').value = '';
});

async function loadLeads(password){
  leadsBody.innerHTML = '';
  emptyNote.style.display = 'none';
  leadCount.textContent = 'Загрузка…';
  const { data, error } = await sb.rpc('get_all_leads', { p_password: password });
  if(error){
    return { ok: false };
  }
  allLeads = data || [];
  renderStats(allLeads);
  await loadReviews();
  renderLeads(allLeads);
  return { ok: true };
}

function renderStats(leads){
  const statToday = document.getElementById('stat-today');
  const statMonth = document.getElementById('stat-month');
  const statPopular = document.getElementById('stat-popular');
  if(!statToday) return;

  const now = new Date();
  const todayStr = now.toDateString();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  let todayCount = 0, monthCount = 0;
  const tourCounts = {};
  const TOUR_NAMES = {
    georgia:'Грузия', turkey:'Турция', uae:'ОАЭ', egypt:'Египет', maldives:'Мальдивы', azerbaijan:'Азербайджан'
  };

  leads.forEach(l=>{
    const d = new Date(l.created_at);
    if(d.toDateString() === todayStr) todayCount++;
    if(d.getMonth() === thisMonth && d.getFullYear() === thisYear) monthCount++;
    if(l.source && l.source.startsWith('booking_')){
      const key = l.source.replace('booking_', '');
      tourCounts[key] = (tourCounts[key] || 0) + 1;
    }
  });

  statToday.textContent = todayCount;
  statMonth.textContent = monthCount;

  const entries = Object.entries(tourCounts);
  if(entries.length === 0){
    statPopular.textContent = '—';
  } else {
    entries.sort((a,b)=> b[1] - a[1]);
    const topKey = entries[0][0];
    statPopular.textContent = TOUR_NAMES[topKey] || topKey;
  }
}

async function loadReviews(){
  const { data, error } = await sb.from('reviews').select('*');
  if(!error) allReviews = data || [];
}

loginForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  loginError.classList.remove('show');
  const password = document.getElementById('admin-password').value;
  const result = await loadLeads(password);
  if(result.ok){
    currentPassword = password;
    loginScreen.style.display = 'none';
    dashboard.style.display = 'block';
  } else {
    loginError.textContent = 'Неверный пароль.';
    loginError.classList.add('show');
  }
}); 