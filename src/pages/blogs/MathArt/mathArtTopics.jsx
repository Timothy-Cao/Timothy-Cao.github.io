const mathArtTopics = [
  {
    title: "Desmos",
    description: (
      <>
        Desmos is a graphing calculator founded in 2010. They uniquely offer a large variety of tools for visually communicating math. 
        It was because of their growing emphasis on visuals and performance, many creative math enthusiasts have turned to Desmos to artistically express themselves. 
        <br></br><br></br>
      </>
    ),
    type: "iframe",
    iframe: "https://www.desmos.com/calculator/ju2siypqc5",
  },
  {
    title: "Demo",
    description: (
      <>
        As a retired Desmos artist, much of my work has been far surpassed by talented mathematician artists with newfound features developed by the Desmos Team.
        This video made by JohnDoesStuff showcases a visually stunning arrangement of Desmos motion art of the modern age. <br></br> <br></br>
      </>
    ),
    type: "video",
    video: "https://www.youtube.com/embed/4_8eY_Ij-5k?start=11",
  },
  {
    title: "First Look into Mathematical Art",
    description: (
      <>
        My personal journey in Mathematical Art started in 2010 before Desmos was founded. Back then, the most powerful graphing calculator an elementary schooler had access to was a TI-84.
        The extent of mathematical art was limited to these calculators and had only seen the light of discussion in the most niche math forums.
        I was first inspired to explore this topic by a video shown to me by my math teacher.
        Since then, dozens of online graphing calculators have been founded and have changed the math art landscape considerably.<br></br> <br></br>
      </>
    ),
    type: "video",
    video: "https://www.youtube.com/embed/kkGeOWYOFoA",
  },
  {
    title: "A Mathematical Toolkit",
    description: (
      <>
        There is an uncountably infinite number of expressions in math. There exists an expression that perfectly illustrates any piece of art.
        However, as humans, it's impossible to determine such a "1-liner" for most cases. Instead, we will develop a toolkit of functions that can closely replicate
        almost anything you'd need to make.
        Useful functions for creating art include motion functions like sinusoidal and polynomial
        functions and art strokes formed by linear functions, conic sections, and splines.<br></br> <br></br>
      </>
    ),
    type: "images",
    images: [
      { src: "/assets/media/desmos/desmos_cubes.png", caption: "Linear Functions" },
      { src: "/assets/media/desmos/desmos_patrick.png", caption: "Conic Sections" },
      { src: "/assets/media/desmos/desmos_heart.png", caption: "An example of a 1-liner" },
    ],
  },
  {
    title: "Shading and Domains",
    description: (
      <>
        Custom RGB color schemes have revolutionized shading in Desmos. Previously limited to a handful
        of base colors, you can now create vibrant and dynamic visuals using direct RGB inputs.
        You can now create polygons using a set of points and an RGB(r,g,b) value. Explore the community artwork by investigating the rendering and colors folder.<br></br> <br></br>
      </>
    ),
    type: "iframe",
    iframe: "https://www.desmos.com/calculator/omsxmsm6gl",
  },
  {
    title: "Animation",
    description: (
      <>
        Sliders allow you to animate graphs by creating a variable that changes with time. When you construct expressions that depend on such values, you can put images into motion.
        These variables can be used to represent position, size, shape, and any combination to model anything that can be expressed in 2D. In the example, the variable q is a variable
        that changes with time. It is then used in a smooth interpolation function between a flower and a heart made with polar functions.<br></br> <br></br>
      </>
    ),
    type: "iframe",
    iframe: "https://www.desmos.com/calculator/wyvgcujo4p",
  },
  {
    title: "3D Graphing",
    description: (
      <>
        With enough cleverness, we can simulate a 3D image to the viewer with the use of lines that trace a 3D object.
        This is an example of a beating heart modeled in 3D. This engine was written to translate a 3D function into a 2D function image of a 3D function.
        Perspective can be changed, albeit unintuitively, by moving the black dots linked to the axes.<br></br> <br></br>
      </>
    ),
    type: "iframe",
    iframe: "https://www.desmos.com/calculator/ej6yyjpe3p",
  },
  {
    title: "Lag Management",
    description: (
      <>
        As with any high-level software, optimization can be a difficult challenge. With an excessive number of expressions, moving parts, and rerendering of complicated expressions,
        lag can very quickly become overwhelming even for powerful computers. Part of the challenge of creating art with math is to optimize your solutions. I would demonstrate a laggy
        expression in this section, but it would lag my website. So you'll have to experiment yourself.
      </>
    ),
    type: "text",
  },
  {
    title: "Lossy Rendering",
    description: (
      <>
        Detailed and computationally heavy graphs can result in rendering artifacts.
        It can create interesting but unexpected textures. Optimizing your graph structure can help
        mitigate these issues, but sometimes it's impossible to avoid. Here is an example of an overly detailed graph that causes a strange pattern to occur.<br></br> <br></br>
      </>
    ),
    type: "iframe",
    iframe: "https://www.desmos.com/calculator/q31kiip7cp",
  },
  {
    title: "Desmos Community",
    description: (
      <>
        The Desmos community is a treasure trove of ideas, inspiration, and tips. Explore what
        others have created and learn from their techniques. Check out their art competitions held every year. You'll be surprised at the amount of young talent.<br></br> <br></br>
      </>
    ),
    link: "https://www.desmos.com/art-2023#19",
  },
  {
    title: "Your Turn",
    description: (
      <>
        Often in school, we interpret logic and creativity as polar opposites, 
        but I believe it takes just as much creativity to do math as painting a painting or writing a song. 
        This has never been more true with Desmos Art. I implore you to be a little creative today and draw something!<br></br> <br></br>
      </>
    ),
    type: "iframe",
    iframe: "https://www.desmos.com/calculator/",
  },
];

export default mathArtTopics;
