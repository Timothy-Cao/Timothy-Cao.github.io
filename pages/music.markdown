---
layout: page
title: Music & AI
permalink: /music/
---

# Music & AI
<hr class="star-light" />

![alt text](../assets/images/musescore.png){:width="1000px" height="400px"}

I have written music on and off since elementary school. These projects can often take dozens of hours, and if progress slows down, they may never be touched again. 

## <span style="color: #6666FF;">Dodoman's Theme</span>
I wrote this piece in 2021, and written for a symphonic orchestra with a choir. This piece took me nearly a 30 hours of work. 
The music takes light inspiration from Schubert Ständchen and Luigi's mansion. 

<div class="iframe-wrapper">
  <iframe src="https://www.youtube.com/embed/8N39upFgpts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

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
    var audioHtml = '';

    switch(selectedValue) {
        case 'MySeptember':
            audioHtml = '<audio controls><source src="../assets/audio/myseptember.mp3" type="audio/mpeg"></audio>';
            break;
        case '8BitNostalgia':
            audioHtml = '<audio controls><source src="../assets/audio/8_bit_nostalgia.mp3" type="audio/mpeg"></audio>';
            break;
        case 'ThreeHands':
            audioHtml = '<audio controls><source src="../assets/audio/4hand_remix.mp3" type="audio/mpeg"></audio>';
            break;
        case 'GameOST4':
            audioHtml = '<audio controls><source src="../assets/audio/Game_OST_4.mp3" type="audio/mpeg"></audio>';
            break;
        case 'SadgeInC':
            audioHtml = '<audio controls><source src="../assets/audio/sadgeC.mp3" type="audio/mpeg"></audio>';
            break;
        case 'PuddingsDayOff':
            audioHtml = '<audio controls><source src="../assets/audio/Puddings_day_off.mp3" type="audio/mpeg"></audio>';
            break;
        case 'GameOST2':
            audioHtml = '<audio controls><source src="../assets/audio/Game_OST_3.mp3" type="audio/mpeg"></audio>';
            break;
        case 'ViolinNostalgia':
            audioHtml = '<audio controls><source src="../assets/audio/violin_nostalgia.mp3" type="audio/mpeg"></audio>';
            break;
        case 'AutumnLeavesVariations':
            audioHtml = '<audio controls><source src="../assets/audio/Tim\'s Leaves.mp3" type="audio/mpeg"></audio>';
            break;
        // Add more cases as necessary for each piece
    }

    document.getElementById('audioPlayerContainer').innerHTML = audioHtml;
});
</script>

Music, once experienced, reveals its essence, losing the element of surprise for the listener who can no longer approach it with the same curiosity. My aim is to delve into music generation, striving to create compositions that continually evolve, ensuring a perpetually fresh listening experience.

Let's begin by investigating how existing generative AI works to create music from existing works.
