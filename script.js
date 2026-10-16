const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
    mainNav.querySelectorAll('a').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const storyCards = document.querySelectorAll('.story-card');
const emptyStories = document.querySelector('#emptyStories');

function filterStories(category, query = '') {
  let visibleCount = 0;
  storyCards.forEach(card => {
    const matchesCategory = category === 'all' || card.dataset.category === category;
    const matchesQuery = !query || card.dataset.search.toLowerCase().includes(query.toLowerCase());
    const visible = matchesCategory && matchesQuery;
    card.hidden = !visible;
    if (visible) visibleCount++;
  });
  emptyStories.hidden = visibleCount > 0;
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    filterStories(button.dataset.filter);
  });
});

document.querySelector('#searchForm').addEventListener('submit', event => {
  event.preventDefault();
  const query = document.querySelector('#destinationSearch').value.trim();
  document.querySelector('#stories').scrollIntoView({ behavior: 'smooth' });
  filterButtons.forEach(item => item.classList.remove('active'));
  document.querySelector('[data-filter="all"]').classList.add('active');
  filterStories('all', query);
});

document.querySelectorAll('.destination').forEach(card => {
  card.addEventListener('click', () => {
    const place = card.dataset.destination;
    document.querySelector('#routePlace').value = place;
  });
});

document.querySelector('#routeForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = document.querySelector('#routeName').value.trim();
  const place = document.querySelector('#routePlace').value.trim();
  const story = document.querySelector('#routeStory').value.trim();
  const email = document.querySelector('#routeEmail').value.trim();
  const message = document.querySelector('#formMessage');

  if (!name || !place || !story || !email) {
    message.textContent = 'Пожалуйста, заполните все обязательные поля.';
    return;
  }
  message.textContent = 'Спасибо! Форма заполнена корректно. Для реальной отправки подключите форму к почте или серверу.';
  message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  // Front-end demo only: no data is sent to a server.
});

document.querySelector('#newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  const emailInput = document.querySelector('#newsletterEmail');
  const message = document.querySelector('#newsletterMessage');
  if (!emailInput.checkValidity()) {
    emailInput.reportValidity();
    return;
  }
  message.textContent = 'Спасибо за интерес! Для реальной подписки нужно подключить email-сервис.';
  emailInput.value = '';
});
