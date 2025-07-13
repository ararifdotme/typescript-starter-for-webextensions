import '../styles/main.css';
import browser from 'webextension-polyfill';

const countSpan = document.getElementById('count');
const incrementBtn = document.getElementById('incrementBtn');
const openOptionsBtn = document.getElementById('openOptions');
let count: number = 0;

if (countSpan && incrementBtn) {
  incrementBtn.addEventListener('click', () => {
    count++;
    countSpan.textContent = count.toString();
  });
}

if (openOptionsBtn) {
  openOptionsBtn.addEventListener('click', () => {
    browser.runtime.openOptionsPage().catch((error) => {
      console.error('Error opening options page:', error);
    });
  });
}