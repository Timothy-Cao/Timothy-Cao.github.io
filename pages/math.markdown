---
layout: page
permalink: /math/
---

<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

## Introduction to Desmos

[Desmos](https://www.desmos.com/calculator) has recently trascended it's original role of an online graphing calculator. It's grown into sort of a powerful tool for artistic creation. It presents an unique way to express creavitiy in a visual way. While it may appear overly complex for its intentions, it possesses advantages over other mediums. 

Mathematical art, unconfined by the physical limits of a canvas, offers endless possibilities.

Animations can be done efficiently and accurately. Animating by hand is tough work, but with math, motion can be described precisely with the physical equations of the world.

Furthermore, Desmos provides profound insights into the fundamental aspects of natural geometries, perspective, motion, and vision by deconstructing phenomena into their underlying mathematical principles and forms.

## Demonstration of Art with Desmos

Through Desmos, mathematical functions reveal their unexpected versatility, transforming into visually stunning artworks. From elementary shapes to elaborate designs, Desmos empowers artists to navigate the elegance of mathematics in a distinctly visual manner. Here is one of my favourite videos of a community member's desmos creations. It highlights the visually stunning capabiltiies of math by just an individual in 2 months. 

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin-bottom: 20px;">
<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/4_8eY_Ij-5k?start=11" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<br>

## My first introduction into Mathematical Art

In recent years, the rise of Desmos.com has expanded the reach of mathematical art, which was once even more of a niche than it is currently. Back around 2012, during my years in elementary school, "math" art was largely impractical for the average individual. Graphing calculators were predominantly handheld and quite cumbersome to use. At best, a few individuals managed to graph expressions like a heart, and some exceptionally smart and dedicated internet users created a batman symbol. My interest in drawing with math was sparked after one of my math teachers showed us a video illustrating the mathematics in our everyday lives. It was only years later when I discovered Desmos, and it's capability that far surpasses any handheld graphing calculator. 

<div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin-bottom: 20px;">
<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/kkGeOWYOFoA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<br>

## Expressions Most Useful for Art

The journey into Desmos art begins with an understanding of the fundamental mathematical expressions and their potential for visual representation. 

There are numerous classes of functions, but when it comes to art, some functions are more useful than others. We will stick to a toolbelt of particularly useful funtions. We will group them into a two categories.

1. Motion Functions

For depicting the motion of everyday objects, sinusoidal and polynomial functions are often sufficient. While there are exceptions, for most practical applications outside of, say, plotting the complex orbits in a three-body problem, these two categories will serve us well. Additionally, it's worth noting that more intricate motions can be approximated using these functions through methods such as Fourier or Taylor series expansions.

2. Art Strokes

For representing objects, we find that nearly all forms can be approximated using linear functions and conic sections. Essentially, when we draw, we create lines and curves, mimicking the motion of a hand pivoting on a specific point on the paper. For crafting more elaborate shapes, one can either tailor an expression for a particular form or amalgamate segments of lines and conic sections. This approach offers a more streamlined and legible collection of mathematical expressions, which can be easily adjusted later on.

While other functions like rational, exponential, and logarithmic functions play a pivotal role in describing various phenomena, their graphical utility in art tends to be eclipsed by the aforementioned functions.


### Linear

Linear functions, epitomized by the equation $$y = mx + b$$, lay the groundwork for crafting straight lines, an essential element in both abstract and representational art within Desmos.

Cityscapes and angular abstract art can often be drawn with only a few linear functions. 

![Cubes](../assets/images/desmos_cubes.png){:width="200px" height="200px"}

### Conic Sections

Conic sections expand the artist's palette with curves derived from the intersections of a plane with a cone, including circles, ellipses, parabolas, and hyperbolas, each offering unique aesthetic contributions to Desmos art.

Here is an example graph of Patrick that demos the use of many types of conic sections. His belly is a circle, his arms are quadratics, eyes are ellipses, and other lines are sections of circles. 

![Patrick Star](../assets/images/desmos_patrick.png){:width="200px" height="200px"}

### Splines

Splines, particularly useful for creating smooth curves that pass through a set of points, offer flexibility in design and are instrumental in drawing complex shapes and patterns with grace and precision. Try playing with splines to see how they function and morph a path between two points in a smooth manner.

<iframe src="https://www.desmos.com/calculator/vd1lfjkqai" width="100%" style="min-height:400px"></iframe>

### Fun Expressions to Know

Certain expressions, such as those forming the shape of a heart or a flower, introduce an element of whimsy and creativity, showcasing the delightful possibilities within the realm of mathematical art.

![Heart](../assets/images/desmos_heart.png){:width="300px" height="300px"}

## Shading and Domains

The recent introduction of custom color schemes to Desmos marks a significant enhancement in its artistic capabilities. Previously, artists were limited to a palette of just six base colors, necessitating the use of transparency and color layering to achieve a wider spectrum of hues. Now, the ability to directly input RGB values opens up a whole new dimension of creativity. This advancement allows for the use of custom colors drawn from a vast array of beautiful color palettes, providing artists with unprecedented control and flexibility in their designs. Here's how you can now bring a richer, more vibrant range of colors to your Desmos art projects using custom RGB values.

<iframe src="https://www.desmos.com/calculator/7phesdm2cz" width="100%" style="min-height:400px"></iframe>

## Animation and Sliders

The dynamism of art is explored through animation and sliders, transforming static images into narratives of motion and change, thus breathing life into mathematical constructs.

<iframe src="https://www.desmos.com/calculator/wyvgcujo4p" width="100%" style="min-height:400px"></iframe>

## 3D Graphing

Venturing into the third dimension, this section elucidates the process of crafting and animating 3D graphs in Desmos, adding depth and complexity to the artistic endeavor. Clever people have devised 3D engines in this 2D graphing calculator you can use to plot and animate your own 3D functions. Hit play on the W variable to animate this example.

<iframe src="https://www.desmos.com/calculator/indpgfg1xp" width="100%" style="min-height:400px"></iframe>

## Lag Management

As creations grow in complexity, so too does the potential for lag. Without delving too much into it's computational complexity, as a general rule of thumb is to minimize the number of expressions, and use easily computable expressions. For now, the toolkit described before is relatively efficient. 

One tip to managing lag is to minimize the use of implicit functions as they are parituclarly expensive to compute. 

## Lossy Rendering

Certain expressions can lose it's ability to render accurately due to the computational restratints of rendering. For example, the graph below is not composed of countless confetti, but rather due to the inability to render such detailed and computationally heavy sections. Minimizing nested expressions can mitigate this result. However, sometimes this texture is desired.

<iframe src="https://www.desmos.com/calculator/q31kiip7cp" width="100%" style="min-height:400px"></iframe>
## Desmos Community

The Desmos community is a dynamic and vibrant assembly where individuals unite to exchange ideas, share artistic techniques, and showcase their creations. 

Explore a diverse range of community art and learn more by visiting [Desmos Art](https://www.desmos.com/art).


## Thanks for checking this out

Prominent mathematicians and philosophers have pondered whether math is a discovery or an invention. I believe it falls into the realm of discovery. Math itself is not a tangible object but rather a concept; it exists inherently, not necessitating our conceptualization to be. However, the methods we employ to describe, comprehend, and communicate mathematical ideas are indeed inventions. Whenever you create something new on Desmos, you are engaging in an act of invention or reinvention. So, I encourage you to venture forth and invent.
