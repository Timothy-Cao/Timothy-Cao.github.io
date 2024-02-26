---
layout: page
permalink: /nasa/
---

<h2 class="apod-title">Picture of the day</h2>

<p><span id="current-day"></span></p>

<p class="apod-description"></p>
<div class="apod-image" style="max-width:100%; overflow:hidden;">
  <img src="" alt="Picture of the Day" style="max-width:100%; height:auto;">
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
        const apodContainer = document.querySelector('.apod-image');
        const apodDescription = document.querySelector('.apod-description');

        // Clear previous content
        apodContainer.innerHTML = '';
        apodDescription.textContent = '';

        // Handle image or video
        if (data.media_type === 'image') {
          const img = document.createElement('img');
          img.src = data.url;
          img.alt = data.title;
          img.style.maxWidth = '100%';
          img.style.height = 'auto';
          apodContainer.appendChild(img);
        } else if (data.media_type === 'video') {
          const iframe = document.createElement('iframe');
          iframe.src = data.url;
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allowfullscreen', 'true');
          iframe.style.width = '100%';
          iframe.style.height = '500px'; // Adjust height as needed
          apodContainer.appendChild(iframe);
        }

        apodDescription.textContent = data.explanation;
      })
      .catch(error => {
        console.error('Error fetching NASA APOD:', error);
      });
  });
</script>


<p> An astronomy picture a day keeps the anthropocentrism away. </p>