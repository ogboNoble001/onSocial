function showProfilePop(imageUrl, text) {
  const pic = document.getElementById('profilePic');
  const textBox = document.getElementById('textBox');
  
  // Reset
  pic.style.animation = 'none';
  textBox.classList.remove('visible');
  textBox.style.display = 'none';
  
  void pic.offsetWidth; // reflow
  
  pic.style.backgroundImage = `url(${imageUrl})`;
  textBox.innerText = text;
  
  // Trigger animation
  pic.style.animation =
    'scaleUp 0.6s forwards, slideLeft 0.5s forwards 0.59s, slideBack 0.5s forwards 3s, scaleDown 0.4s forwards 3.6s';
  
  // Show text after pic moves
  setTimeout(() => {
    textBox.style.display = 'block';
    textBox.classList.add('visible');
  }, 1100);
  
  // Hide text
  setTimeout(() => {
    textBox.classList.remove('visible');
  }, 2600);
  
  setTimeout(() => {
    textBox.style.display = 'none';
  }, 3000);
}

// Trigger once loaded
window.addEventListener('DOMContentLoaded', () => {
  showProfilePop('https://randomuser.me/api/portraits/men/64.jpg', `Andrea sent you a friend request`);
  setTimeout(() => {
    showProfilePop('https://randomuser.me/api/portraits/women/68.jpg', `Joy sent you a friend request`);
  }, 7000)
  setTimeout(() => {
    showProfilePop('https://randomuser.me/api/portraits/women/75.jpg', `Someone memtioned you in Computer Engineering Cruise`);
  }, 13000)
});