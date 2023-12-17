# Sketchit
Sketchit is a browser app that allows you to make your own pixel art.  Users will have access to multiple different utensils and options to create whatever art they feel inspired to.

**Link to project:** 

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

For this project I opted for flexbox to handle all of the spacing and placement involved in this project.   I started out with two containers inside of a page container that encompasses everything.  One of the containers would be the controls for the actual app while the other would be the canvas for the user-created art.  The controls and buttons for the app were placed into the first of the two containers and was placed in the left side of the screen.  The canvas is a square grid filled with square divs whose dimensions can be set via a slider in the control panel.  This container was placed towards in right half of the screen.  The user is able to increase the dimensions up to 64x64 with the grid automatically readjusting to the larger dimensions.  

Whenever the user is content with the dimensions of their grid, they will be able to choose between multiple utensils via buttons with listeners attached to them to set whatever utensil they choose as the one in hand.  When this happens the program searches for any active utensils and disables them and removes their associated listeners before activating the one the user clicked on and its listeners.  This process is the backbone for the functionality of switching between different utensils.  When a button is clicked the appropriate mouse listeners associated to that button are added to respond to whatever the user decides to do.    

## Optimizations

An obvious optimization that I'd look at implementing within this app is the ability to export what you've created.  It's not nearly as much fun to create something if you aren't then able to save it.  Another optimization or set of optimizations would be to add more utensils.  I have several ideas of different tools I would add but in doing so would probably involve a rework of the UI and its layout.  

## Lessons Learned:

I greatly increased my understanding of event listeners after this project.  Figuring out how to manage selecting utensils and making sure that no more than one utensil is selected at a time was an invaluable experience.  With this being the largest amount of code I've written for a single project, I think I also learned a lot about ways to keep track of what I have and what still needs to be implemented.  There were pain points at times where I had to track down one line of code that was being used in a trail of functions incorrectly.  Obviously this is going to be a common occurrence but it felt like if I was better organized in my approach that I wouldn't have even encountered these roadblocks.    





