let state = {
  choice: null,
  gui: null,
  slider: null,
  conc: null,
  s_indicator: null,
  pH: "",
  selected:null,
};


function setup() {
  createCanvas(windowWidth, windowHeight);
  state.choice = new toggleSwitch(490, 60, 'Acids', 'Bases', true, 190, 40)
  setupButtons()
  
  //slider for concentration
  //using the p5.gui library to create the slider
  state.gui = createGui(); //intializes an object based on p5.gui library
  state.gui.loadStyle('Blue');
  state.slider = createSlider('slider', 450, 350, 270, 32, 1, 1000)
  
}


function setupButtons(){
  //creates an object of class buttons
  let buttonW = 70
  let buttonH = 30
  let buttonX = 490
  let buttonY = 150
  //acids
  
  h2co3 = new buttons(buttonX, buttonY, 'H₂CO₃', buttonW, buttonH )
  h2s = new buttons(buttonX+110, buttonY, 'H₂S', buttonW, buttonH)
  hcl = new buttons(buttonX, buttonY+90, 'HCl',buttonW,buttonH)
  h2so4 = new buttons(buttonX+110, buttonY+90, 'H₂SO₄',buttonW,buttonH)
  //bases 
  naoh = new buttons (buttonX, buttonY, 'NaOH', buttonW, buttonH)
  baoh2 = new buttons (buttonX+110, buttonY, 'Ba(OH)₂', buttonW, buttonH)
};
function grid(){
  // Draw grid
  stroke(190);
  strokeWeight(0.5);
  for (i = -10; i < width; i += 20) { //draws vertical lines along the x-axis until 
    line(i, 0, i, width);                  // i is less than width
  }
  for (i = -10; i < height; i += 20) {    //draws horizontal lines 
    line(0, i, 800, i);
  }
}

function beaker(){
  // Draw beaker shape
  
  noStroke()
  fill(	174, 216, 248, 90)
  rect(70, 120, 280, 230)
  
  stroke(47, 144, 218)
  strokeWeight(5)
  for(i=120; i<350; i+=60){
    line(330, i, 350, i)
  }

  noFill();
  stroke(47, 144, 218);  //beaker has nofill, blue stroke, and stroke weight of5
  strokeWeight(5);
  beginShape();          //beginShape function: creates custom shape
  vertex(50, 90);        //begins by adding vertices to a custom shape
  vertex(70, 120);
  vertex(70, 350);
  vertex(350, 350);
  vertex(350, 120);
  vertex(370, 90);          //endShape() stops adding vertices
  endShape();
  
}
 


function handleSlider(){
  //slider
   drawGui();
  //maps the slider by taking its value
  // of [0,1000] and remaps into [-3,0]
  // the result is an exponent to 10

  state.conc = pow(10, map(state.slider.val, 0, 1000, -3, 0));
  state.conc = state.conc.toFixed(3) 
  //fixed to 3 decimal places
  
   //displays concentration
  fill(255)
  stroke(47, 144, 218)
  rect(730, 352, 60, 30, 10)
  text(state.conc, 735, 375)
  noStroke()
  fill(0)
  //calculating pH dynamically
   if (state.selected) {
    if (['hcl', 'h2so4'].includes(state.selected)) {
      strongAcids(state.conc, state.selected === 'h2so4' ? 2 : 1);
    } else if (['h2co3', 'h2s'].includes(state.selected)) {
      weakAcids(state.conc, state.selected === 'h2co3' ? 0.00000045 : 0.0000001);
    } else if (['naoh', 'baoh2'].includes(state.selected)) {
      strongBase(state.conc, state.selected === 'baoh2' ? 2 : 1);
    }
  }
}

 
function handleToggle(){
  if(state.choice.state){
    displayAcids()
  } else{
    displayBases()
  }
}
function displayAcids(){
  //displays acid buttons
  text('Weak Acids', 490, 140)
  h2co3.show()
  h2s.show()
  text('Strong Acids', 490, 230)
  hcl.show()
  h2so4.show()
  //button handling for acid
  handleButtons_acids()
  showText_A()
  
}
function displayBases(){
  //displays bases buttons
  fill(0)
  text('Strong Bases', 490, 140)
  naoh.show()
  baoh2.show()
  //button handling for base
  handleButtons_base()
  showText_B()
}


 
function handleButtons_acids(){
  if (h2co3.isPressed()){
      print('Button Pressed')
      state.selected = 'h2co3'
    //sets global variable selected to
    //name of button
    }
    else if (hcl.isPressed() ){
      state.selected = 'hcl'
    }
    
    else if (h2so4.isPressed() ){
      state.selected = 'h2so4'
    }
    
    else if (h2s.isPressed() ){
      state.selected= 'h2s'
    }  
}
function handleButtons_base(){
    if (naoh.isPressed() ){
      state.selected = 'naoh'
    
    }
    
    else if(baoh2.isPressed()){
      state.selected = 'baoh2'
    }
}
function handleIndicator(){
  //selecting indicator
  //electric indicator
  electric = new pHbutton(470, 395, 'Electric', 70, 70)
  litmus = new pHbutton(560, 395, 'Litmus Paper', 70, 70)
  //instantiating buttons and using pHshow() class method
  
  electric.pHshow()
  litmus.pHshow()
  
  if (electric.isPressed() ){
    state.s_indicator = 'electric' //sets s_indicator to electric
                               
  }
  else if (litmus.isPressed()){
    state.s_indicator = 'litmus'
  }
}

 
function litmusButton(){
  //litmus paper
  fill(255, 235, 158)
  rect(585, 405, 20, 50, 5)
  fill(	242, 152, 93)
  rect(585, 435, 20, 20)
}

function electricButton(){
  //drawing the indicators on the buttons
  noStroke()
  fill(100)        //drawing electrical
  rect(495, 415, 5, 30, 5)  //indicator
  strokeWeight(3)
  stroke(244, 214, 99)
  fill(255, 235, 158)
  rect(490, 410, 35, 20,5)
  noStroke()
  fill(0)
  textSize(15)
  text('pH', 495, 425)
}

function draw() {
  background(255);
  grid()
  beaker()
  
  // Options Panel
  fill(255); 
  rect(450, 50, 280, 260, 20);

  // Display text label and check for mouse interaction
  noStroke();
  fill(0);
  textSize(20);
  text('Concentration', 460, 340)
  
  
  //toggle switch
  state.choice.show()
  state.choice.toggle()
  handleSlider()
  handleToggle()
  
  handleIndicator()
  displayIndicator() //passes the value in s_indicator
  electricButton()
  litmusButton()
  
  //display text
  fill(0)
  text('H₂O', 300, 345 )
  
}


function showText_A(){
  let HA = 'HA'
  let A = 'A⁻'

   textSize(26)  
   if (state.selected == 'h2so4'){
      HA = 'H₂SO₄'
      A = 'HSO4⁻'
    } else if(state.selected == 'hcl'){
      HA = 'HCl'
      A = 'Cl⁻'
    } else if (state.selected == 'h2co3'){
      HA = 'H₂CO₃'
      A = 'HCO₃⁻'
    } else if (state.selected == 'h2s'){
      HA = 'H₂S'
      A = 'HS⁻'
    }
    text(HA, 30, 400)
    text('  +  H₂O ⇌           + H₃O',110, 400)
    text(A, 240, 400)
   
}

function showText_B(){
  textSize(26)

  let B = 'B'      ///i made this a local variable, possibly
  let BH = 'BH⁺'       //write about that
  if (state.selected == 'naoh'){
    B = 'NaOH'
    BH = 'Na⁺'
  } else if (state.selected == 'baoh2'){
    B = 'Ba(OH)₂'
    BH = 'Ba²⁺'
  }
  text(B, 40, 400)
  text('  +  H₂O ⇌        + OH⁻',130, 400)
  text(BH, 250, 400)
  
   
}

function displayIndicator(){
  if (state.s_indicator == 'electric'){
    electricpH()
      
  } else if (state.s_indicator == 'litmus'){
    litmuspaper()
  } 
}
function electricpH(){
    fill(200)
    rect(105, 70, 10, 80, 5)  //draws the indicator
    fill(255)                   //on screen
    strokeWeight(3)
    stroke(0)
    rect(100, 70, 75, 40, 5)
    fill(0)
    noStroke()
    textSize(20)
    text('pH:', 105, 95)     //draws the value of pH of
    text(state.pH, 137, 95)     //selected compound
}

function mouseReleased(){
  state.choice.pressed = true
}
function litmuspaper(){
  const colors = [
    [255, 0, 0],       // pH 0
    [255, 51, 0],      // pH 1
    [255, 102, 0],     // pH 2
    [255, 153, 0],     // pH 3
    [255, 204, 0],     // pH 4
    [255, 255, 0],     // pH 5
    [204, 255, 0],     // pH 6
    [0, 255, 0],       // pH 7
    [0, 255, 102],     // pH 8
    [0, 255, 255],     // pH 9
    [0, 204, 255],     // pH 10
    [0, 153, 255],     // pH 11
    [0, 102, 255],     // pH 12
    [0, 51, 204],      // pH 13
    [102, 0, 153]      // pH 14
    ];
  
    state.pH = Math.round(state.pH)
    let [r, g, b] = colors[state.pH] //pH is an index to colors
    fill(230)                  //assigns value into r,g,b
    rect(100, 70, 40, 100, 5)
    fill(r, g, b)  
    rect(100, 120, 40, 50)
  
    //pH chart
    for(x=0;x<colors.length; x++){   //iterates over colors
        [r,g,b] = colors[x]          //x is an index to access colors
        fill(r,g,b)                  //pass value to r,g,b and is used as a fill
        rect(95+ x * 15,25,30,35)    //draws colors in regular intervals
    }
    fill(0)
    textSize(10)
    strokeWeight(1)
    //pHnumbers
    for (x= 0; x<15; x++){    
      text(x, 100+x*15 , 20)  //draws the no. in 
    }                         //regular intervals
    textSize(20)
    text('pH', 60, 50)
}



function strongAcids(conc, moles){
  if (moles == 2){    //if there are 2 moles of an acid(H2SO4)
    conc = conc * 2    //multiply conc by 2
  }
  state.pH = -Math.log10(conc)
  state.pH = state.pH.toFixed(1)
  print(state.pH)
}

function weakAcids(conc, Ka){
  state.pH = Math.sqrt(Ka*conc)   //(Ka)Acid dissociation 
  state.pH = -Math.log10(state.pH)    //constant multiplied to conc. 
  state.pH = state.pH.toFixed(1)
  print(state.pH)
}

function strongBase(conc, moles){
  if (moles == 2){
    conc = conc * 2
  }
  state.pH = -Math.log10(conc)//-log of conc
  state.pH = 14 - state.pH   
  state.pH = state.pH.toFixed(1)
  print(state.pH)
}


class pHbutton extends buttons{
  //pHbutton inherits from buttons
  pHshow(){
    fill(16, 142, 237);
    rect(this.x, this.y, this.w, this.h, 10);
    fill(111, 182, 237);
    rect(this.x + 4, this.y + 5, this.w - 10, this.h - 10, 10);
  }
}


