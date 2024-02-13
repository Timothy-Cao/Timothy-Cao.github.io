---
layout: page
title: Music & AI
permalink: /music/
---

# Music & AI
<hr class="star-light" />

![alt text](../assets/images/musescore.png){:width="1000px" height="400px"}

I have written music on and off since elementary school. These projects can often take dozens of hours, and if progress slows down, they may never be touched again. 

<br>

## <span style="color: #6666FF;">Dodoman's Theme</span>
I wrote this piece in 2021 for a symphonic orchestra with a choir. The music takes light inspiration from Schubert Ständchen and Luigi's mansion. This piece took around 40 hours of work. 


<div class="iframe-wrapper">
  <iframe src="https://www.youtube.com/embed/8N39upFgpts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<br>
## <span style="color: #6666FF;">Other pieces</span>

Here are a sample some of my other compositions over the years.

<head>
  <style>
    select {
      padding: 8px 16px;
      border-radius: 4px;
      border: 1px solid #ccc;
      background-color: white;
      font-family: Arial, sans-serif;
      font-size: 16px;
      margin-top: 20px;
      cursor: pointer;
      outline: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    select:focus {
      border-color: #6666FF;
    }
  </style>
</head>

<select id="compositionSelect">
    <option value="">Select a Composition</option>
    <option value="MySeptember">My September</option>
    <option value="8BitNostalgia">8 bit nostalgia</option>
    <option value="ThreeHands">3 Hands</option>
    <option value="GameOST4">Game OST 4</option>
    <option value="SadgeInC">Sadge in C</option>
    <option value="PuddingsDayOff">Puddings day off</option>
    <option value="GameOST2">Game OST 2</option>
    <option value="ViolinNostalgia">Violin nostalgia</option>
    <option value="AutumnLeavesVariations">Autumn Leaves variations</option>
</select>

<!-- Placeholder where the audio player will be displayed -->
<div id="audioPlayerContainer"></div>

<script>
document.getElementById('compositionSelect').addEventListener('change', function() {
    var selectedValue = this.value;
    var content = '';

    switch(selectedValue) {
        case 'MySeptember':
            content = `<p>Written 2023, for solo piano.</p>
                <audio controls><source src="../assets/audio/myseptember.mp3" type="audio/mpeg"></audio>`;
            break;
        case '8BitNostalgia':
            content = `<p>Written 2021, for solo piano (synth).</p>
                <audio controls><source src="../assets/audio/8_bit_nostalgia.mp3" type="audio/mpeg"></audio>`;
            break;
        case 'ThreeHands':
            content = `<p> Written 2022, for piano duet. Unknown inspiration.</p>
                <audio controls><source src="../assets/audio/4hand_remix.mp3" type="audio/mpeg"></audio>`;
            break;
        case 'GameOST4':
            content = `<p>Written 2020, for orchestra. Inspiration from Sonny.</p>
                <audio controls><source src="../assets/audio/Game_OST_4.mp3" type="audio/mpeg"></audio>`;
            break;
        case 'SadgeInC':
            content = `<p>Written 2019, for solo piano (synth).</p>
                <audio controls><source src="../assets/audio/sadgeC.mp3" type="audio/mpeg"></audio>`;
            break;
        case 'PuddingsDayOff':
            content = `<p> Written 2022, for solo piano.</p>
                <audio controls><source src="../assets/audio/Puddings_day_off.mp3" type="audio/mpeg"></audio>`;
            break;
        case 'GameOST2':
            content = `<p>Written 2019, for orchestra.</p>
                <audio controls><source src="../assets/audio/Game_OST_3.mp3" type="audio/mpeg"></audio>`;
            break;
        case 'ViolinNostalgia':
            content = `<p>Written 2018, for violin & piano.</p>
                <audio controls><source src="../assets/audio/violin_nostalgia.mp3" type="audio/mpeg"></audio>`;
            break;
        case 'AutumnLeavesVariations':
            content = `<p>Written 2023, for piano, guitar & trumpet.</p>
                <audio controls><source src="../assets/audio/Tim\'s Leaves.mp3" type="audio/mpeg"></audio>`;
            break;
    }

    document.getElementById('audioPlayerContainer').innerHTML = content;
});
</script>

<br><br><br>

## <span style="color: #6666FF;">A fresh listening experience</span>

The thing with music is that once experienced, it loses the element of surprise. To create music that always leave the listener curious, we would need to write music that continously evolves but how can we achieve that? Let's start off by delving into the world of generative AI for music. 




<br><br><br><br>
