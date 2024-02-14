---
layout: page
permalink: /nasa/
---


 <h2 class="apod-title">Picture of the day</h2>
    <p style="text-align: center; margin: 10px 0;">Photo for <span id="current-day"></span></p>
    <div class="apod-image">
      <img src="" alt="Picture of the Day">
    </div>
    <p class="apod-description"></p>



    
<h2 class="apod-title">Picture of the day</h2>

<p><span id="current-day"></span></p>

<p class="apod-description"></p>

<div class="apod-image">
  <img src="" alt="Picture of the Day">
</div>
<script>
  const currentDaySpan = document.getElementById('current-day');
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  currentDaySpan.textContent = today.toLocaleDateString(undefined, options);

  document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=JELkWxHjp7EmBUP9qCRfEOycHBZtmpf5k5qWlhsT')
      .then(response => response.json())
      .then(data => {
        const apodImage = document.querySelector('.apod-image img');
        const apodDescription = document.querySelector('.apod-description');

        apodImage.src = data.hdurl || data.url;
        apodImage.alt = data.title;
        apodDescription.textContent = data.explanation;
      })
      .catch(error => {
        console.error('Error fetching NASA APOD:', error);
      });
  });
</script>

<p> An astronomy picture a day keeps the anthropocentrism away. </p>