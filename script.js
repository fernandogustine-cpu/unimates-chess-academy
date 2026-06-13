function markComplete(button) {
  const card = button.closest('.course-card');
  card.classList.toggle('completed');
  button.textContent = card.classList.contains('completed') ? 'Completed ✓' : 'Mark Complete';
}

function submitHomework(event) {
  event.preventDefault();
  const name = document.getElementById('studentName').value;
  const course = document.getElementById('courseName').value;
  document.getElementById('formMessage').textContent = `Thank you, ${name}. Your homework for ${course} has been recorded on this demo page.`;
  event.target.reset();
}
