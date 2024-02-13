---
layout: page
permalink: /gallery/
---

<style>
.gallery-title {
  font-size: 36px;
  margin-bottom: 20px;
  justify-content: center;
  color: #fff;
}

.gallery-table {
  column-count: 3; /* the number of columns */
  column-gap: 20px;
  margin-top: 20px;
}

.gallery-table div {
  break-inside: avoid;
  margin-bottom: 20px; /* spacing between items */
}

@media (max-width: 768px) {
  .gallery-table {
    column-count: 2; /* Less columns for smaller screens */
  }
}

.gallery-image {
  width: 100%;
  border-radius: 10px;
}

.gallery-caption {
  font-size: 14px;
  margin-top: 10px;
  color: black;
}

.tab-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 30px;
}

.tab {
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: 1px solid #444;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.tab.active {
  background-color: #555;
}

.gallery-container {
  display: none;
  margin-top: 20px;
}

.gallery-container.active {
  display: block;
}

@media (max-width: 768px) {
  .tab {
    margin-right: 5px;
    padding: 5px 10px;
    flex-wrap: wrap;
  }
}
</style>

# Gallery

<div class="tab-container">
  {% for gallery in site.data.gallery %}
    <div class="tab" onclick="showGallery('{{ gallery[0] | slugify }}')">{{ gallery[0] }}</div>
  {% endfor %}
</div>

{% for gallery in site.data.gallery %}
  <div class="gallery-container" id="{{ gallery[0] | slugify }}-gallery">
    <h1 class="gallery-title">{{ gallery[0] }}</h1>
    <div class="gallery-table">
      {% for item in gallery[1] %}
        <div>
          <img src="{{ item.imageUrl }}" alt="{{ item.description | escape }}" class="gallery-image">
          <p class="gallery-caption">{{ item.description }}</p>
        </div>
      {% endfor %}
    </div>
  </div>
{% endfor %}

<script>
function showGallery(galleryName) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.getAttribute('onclick').includes(galleryName)) {
      tab.classList.add('active');
    }
  });

  const galleries = document.querySelectorAll('.gallery-container');
  galleries.forEach(gallery => {
    gallery.style.display = 'none';
    if (gallery.id === galleryName + '-gallery') {
      gallery.style.display = 'block';
    }
  });
}
</script>
