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
        /* Remove the grid display type */
        /* display: grid; */
        /* grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); */
        
        /* New style */
        column-count: 3; /* Adjust the number of columns as needed */
        column-gap: 20px;
        margin-top: 20px;
    }

    /* Adjust the div containing the image and caption to break inside the column layout */
    .gallery-table div {
        break-inside: avoid;
        margin-bottom: 20px; /* Adjust spacing between items */
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

<div class="tab-container">
  <div class="tab active" onclick="showGallery('seasonal')">Tanning Season</div>
  <div class="tab" onclick="showGallery('spooky')">Spook Season</div>
  <div class="tab" onclick="showGallery('rabbit')">Rabbit Gallery</div>
  <div class="tab" onclick="showGallery('cooking')">Cooking Gallery</div>
</div>

<div class="gallery-container active" id="seasonal-gallery">
  <h1 class="gallery-title">Summer 2023</h1>
  <div class="gallery-table">
    <div>
      <img src="../assets/images/summer1.jpeg" alt="summer1" class="gallery-image">
      <p class="gallery-caption">3 Stooges</p>
    </div>
    <div>
      <img src="../assets/images/summer2.jpg" alt="summer2" class="gallery-image">
      <p class="gallery-caption">I'm something of a celebrity</p>
    </div>
    <div>
      <img src="../assets/images/summer3.jpg" alt="summer3" class="gallery-image">
      <p class="gallery-caption">POV: You're getting buried alive</p>
    </div>
    <div>
      <img src="../assets/images/summer4.jpg" alt="summer4" class="gallery-image">
      <p class="gallery-caption">Pinkies up!</p>
    </div>
    <div>
      <img src="../assets/images/summer5.jpg" alt="summer5" class="gallery-image">
      <p class="gallery-caption">I'm actually 100ft in the air</p>
    </div>
    <div>
      <img src="../assets/images/summer6.jpg" alt="summer6" class="gallery-image">
      <p class="gallery-caption">Creatures of the night</p>
    </div>
    <div>
      <img src="../assets/images/summer7.jpg" alt="summer6" class="gallery-image">
      <p class="gallery-caption">Bro is scared of the water</p>
    </div>
        <div>
      <img src="../assets/images/summer8.jpg" alt="summer6" class="gallery-image">
      <p class="gallery-caption">When I paint on the walls they call it vandalism</p>
    </div>
    <div>
      <img src="../assets/images/summer9.jpg" alt="summer6" class="gallery-image">
      <p class="gallery-caption">The ugly duckling that stayed ugly</p>
    </div>
    <div>
      <img src="../assets/images/summer10.jpg" alt="summer6" class="gallery-image">
      <p class="gallery-caption">Cloud.</p>
    </div>
    <div>
      <img src="../assets/images/summer11.jpg" alt="summer6" class="gallery-image">
      <p class="gallery-caption">Foie Gras is discarsting</p>
    </div>
    <div>
      <img src="../assets/images/summer12.jpg" alt="summer6" class="gallery-image">
      <p class="gallery-caption">POV: you can't afford roads</p>
    </div>
    
  </div>
</div>

<div class="gallery-container" id="rabbit-gallery">
  <h1 class="gallery-title">Pudding the Rabbit</h1>
  <div class="gallery-table">
    <div>
      <img src="../assets/images/pudding1.png" alt="Pudding 1" class="gallery-image">
      <p class="gallery-caption">She smells but not sees</p>
    </div>
    <div>
      <img src="../assets/images/pudding2.png" alt="Pudding 2" class="gallery-image">
      <p class="gallery-caption">Tranformed into loaf</p>
    </div>
    <div>
      <img src="../assets/images/pudding3.png" alt="Pudding 3" class="gallery-image">
      <p class="gallery-caption">Dreaming about bananas</p>
    </div>
    <div>
      <img src="../assets/images/pudding4.png" alt="Pudding 4" class="gallery-image">
      <p class="gallery-caption">Woken from  slumber</p>
    </div>
    <div>
      <img src="../assets/images/pudding5.png" alt="Pudding 5" class="gallery-image">
      <p class="gallery-caption">The worst spot to lounge</p>
    </div>
    <div>
      <img src="../assets/images/pudding6.png" alt="Pudding 6" class="gallery-image">
      <p class="gallery-caption">Stretching before the big game</p>
    </div>
    <div>
      <img src="../assets/images/pudding7.jpg" alt="Pudding" class="gallery-image">
      <p class="gallery-caption">On her way to hawaii</p>
    </div>
    <div>
      <img src="../assets/images/pudding8.jpg" alt="Pudding 6" class="gallery-image">
      <p class="gallery-caption">New friend!</p>
    </div>
    <div>
      <img src="../assets/images/pudding9.jpg" alt="Pudding 6" class="gallery-image">
      <p class="gallery-caption">Wearing a backpack</p>
    </div>
    <div>
      <img src="../assets/images/pudding10.jpg" alt="Pudding 6" class="gallery-image">
      <p class="gallery-caption">More flexible than me</p>
    </div>
    <div>
      <img src="../assets/images/pudding11.jpg" alt="Pudding 6" class="gallery-image">
      <p class="gallery-caption">Fort Night!</p>
    </div>
    <div>
      <img src="../assets/images/pudding12.jpg" alt="Pudding 6" class="gallery-image">
      <p class="gallery-caption">Checking out the new house</p>
    </div>
    
  </div>
</div>

<div class="gallery-container" id="cooking-gallery">
  <h1 class="gallery-title">Chef in Training</h1>
  <div class="gallery-table">
      <div>
      <img src="../assets/images/chef1.jpg" alt="Food 1" class="gallery-image">
      <p class="gallery-caption">Meatball[4][4]</p>
    </div>
    <div>
      <img src="../assets/images/chef2.jpg" alt="Food 1" class="gallery-image">
      <p class="gallery-caption">Comfort Food</p>
    </div>
    <div>
      <img src="../assets/images/chef3.jpg" alt="Food 1" class="gallery-image">
      <p class="gallery-caption">Pasta water = secret ingredient</p>
    </div>
    <div>
      <img src="../assets/images/chef4.jpg" alt="Food 1" class="gallery-image">
      <p class="gallery-caption">Unknown Spicyness</p>
    </div>
    <div>
      <img src="../assets/images/chef5.jpg" alt="Food 1" class="gallery-image">
      <p class="gallery-caption">Pineapple on pizza? Apple on pizza.</p>
    </div>
    <div>
      <img src="../assets/images/chef6.jpg" alt="Food 1" class="gallery-image">
      <p class="gallery-caption">No fish egg? Shreded carrots.</p>
    </div>
    <div>
      <img src="../assets/images/chef7.jpg" alt="Food 1" class="gallery-image">
      <p class="gallery-caption">Hola</p>
    </div>
    <div>
      <img src="../assets/images/chef8.jpg" alt="Food 1" class="gallery-image">
      <p class="gallery-caption">Messy</p>
    </div>
    <div>
      <img src="../assets/images/chef9.jpg" alt="Food 1" class="gallery-image">
      <p class="gallery-caption">Farmer's Market Cheese ></p>
    </div>
    <div>
      <img src="../assets/images/chef10.jpg" alt="Food 1" class="gallery-image">
      <p class="gallery-caption">Calories Galore</p>
    </div>
    <div>
      <img src="../assets/images/chef11.jpg" alt="Food 1" class="gallery-image">
      <p class="gallery-caption">Chicken Thigh >> Breast</p>
    </div>
    <div>
      <img src="../assets/images/chef12.jpg" alt="Food 1" class="gallery-image">
      <p class="gallery-caption">Guess the incoming dish</p>
    </div>
    
  </div>
</div>

<div class="gallery-container" id="spooky-gallery">
  <h1 class="gallery-title">Fall 2023</h1>
  <div class="gallery-table">
    <div>
      <img src="../assets/images/spook1.jpg" alt="Spook 1" class="gallery-image">
      <p class="gallery-caption">Pumpkins</p>
    </div>
    <div>
      <img src="../assets/images/spook2.jpg" alt="Spook 1" class="gallery-image">
      <p class="gallery-caption">More Pumpkins</p>
    </div>
        <div>
      <img src="../assets/images/spook3.jpg" alt="Spook 1" class="gallery-image">
      <p class="gallery-caption">Even More Pumpkins</p>
    </div>
        <div>
      <img src="../assets/images/spook4.jpg" alt="Spook 1" class="gallery-image">
      <p class="gallery-caption">Even Even More Pumpkins</p>
    </div>
        <div>
      <img src="../assets/images/spook5.jpg" alt="Spook 1" class="gallery-image">
      <p class="gallery-caption">Even Even Even More Pumpkins</p>
    </div>
        <div>
      <img src="../assets/images/spook6.jpg" alt="Spook 1" class="gallery-image">
      <p class="gallery-caption">Rawr</p>
    </div>
        <div>
      <img src="../assets/images/spook7.jpg" alt="Spook 1" class="gallery-image">
      <p class="gallery-caption">Murder mystery</p>
    </div>
        <div>
      <img src="../assets/images/spook8.png" alt="Spook 1" class="gallery-image">
      <p class="gallery-caption">The Exorcist</p>
    </div>
        <div>
      <img src="../assets/images/spook9.jpg" alt="Spook 1" class="gallery-image">
      <p class="gallery-caption">How to eat 3 apples in parallel </p>
    </div>
        <div>
      <img src="../assets/images/spook10.jpg" alt="Spook 1" class="gallery-image">
      <p class="gallery-caption">UFO spotting</p>
    </div>
        <div>
      <img src="../assets/images/spook11.jpg" alt="Spook 1" class="gallery-image">
      <p class="gallery-caption">Tribe Leader Cao</p>
    </div>
        <div>
      <img src="../assets/images/spook12.jpg" alt="Spook 1" class="gallery-image">
      <p class="gallery-caption">Autumn Painting</p>
  </div> 
</div>

<script>
  function showGallery(galleryName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    const galleries = document.querySelectorAll('.gallery-container');
    galleries.forEach(gallery => gallery.classList.remove('active'));

    const selectedTab = document.querySelector(`[onclick="showGallery('${galleryName}')"]`);
    const selectedGallery = document.querySelector(`#${galleryName}-gallery`);

    selectedTab.classList.add('active');
    selectedGallery.classList.add('active');
  }
</script>
