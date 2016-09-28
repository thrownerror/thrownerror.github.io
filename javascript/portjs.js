	"use strict";
		window.onload = init;
			//controls
		var bl; //bottom left
		var tl; //top left
		var br;
		var tr;
		
		var bigBox; //for notes/about page
		
		//Scopes for button actions
		{
		var homePage = true;
		var levelPage = false;
		var designPage = false;
		var writingPage = false;
		var codePage = false;
		var aboutPage = false;
		var notesPage = false;
		//Constants
		var base ;
		var divMain ;
		var row1 ;
		var row2 ;
		var boxTL ;
		var boxTR ;
		var boxBL ;
		var boxBR ;
		var title;
	
		//pop up
		var lightbox;
		var lightson;
		
		//managment for off/on lightbox
		var parent;
		var chi; 
		var newBox;
		var oldHTML;
		var oldWidth;
		var stdGall;
		var gallIt;
		var mouseGall;
		var boxImg;
		
		var boxText;
		var bTextNode;
		//Image Galls
		var kfImg = ['media/kfArenaShot.jpg','media/kfalt1.png', 'media/kfalt2.png','media/kfalt3.png','media/kfalt4.png', 'media/kfalt5.png'];
		var psImg = ['media/pirateDeck.png', 'media/bottomDeck.png', 'media/crewQuarters.png', 'media/frontofDeck.png', 'media/storage.png'];
		var bgImg = ['media/bg1.jpg', 'media/bg2.jpg', 'media/bg3.jpg', 'media/bg4.jpg'];
		//var m9Img = ['media/m1911Still.png'];
		var idImg = ['media/boxart_indicecision.jpg', 'media/id1.jpg', 'media/inDiceDoc.png']
		var utImg = ['media/ut1.png', 'media/ut2.png','media/ut3.png', 'media/ut4.png', 'media/ut5.png', 'media/ut6.png', 'media/ut7.png', 'media/ut8.png'];
		var tdImg = ['media/2d2.png','media/2d3.png','media/2d4.png','media/2d5.png'];
		var thdImg = ['media/3d1.png','media/3d2.png','media/3d3.png','media/3d3.png','media/3d4.png','media/3d5.png','media/3d6.png'];
		var aaImg = ['media/aa1.png','media/aa2.png','media/aa3.png','media/aa4.png','media/aa5.png','media/aa6.png'];
		var cbImg = ['media/cb1.png','media/cb2.png','media/cb3.png','media/cb4.png','media/cb5.png','media/cb6.png'];
		var rnImg = ['media/randomnessDemo.png', 'media/rn1.png', 'media/rn2.png', 'media/rn3.png'];

		}
		function init(){
			mouseGall = false;
			boxImg = document.createElement("img");
			boxImg.className = "bImg";
			boxText = document.createElement("ul");
			//bTextNode = document.createTextNode
			var navBut = document.querySelector("#navButtonOpen");
			var navButClose = document.querySelector("#navButtonClose");
			title = document.querySelector("#title");
			navBut.onclick = navToggle;
			base = document.querySelector("#content");
			base.style.width = "100%";
			base.style.height = "100%";
		//	base.onclick = updateBoxes;
			//container
			divMain = document.createElement("div");
			divMain.style.width = "100%";
			divMain.style.height = "100%";
			
			//structure
			row1 = document.createElement("article");
			row1.className = "columnL";

			row2 = document.createElement("article");
			row2.className = "columnR";

			
			//lightbox
			lightbox = document.createElement("div");
			lightbox.id = "lightB";
			lightbox.addEventListener("click", function(e){
			if(!mouseGall)
			{
				$(lightbox).fadeOut(300, function(){ 
						lightbox.removeChild(newBox);
						content.removeChild(lightbox);
						lightson = false;
				});
			}
			});
			
			
			//ITEMS
			boxTL = document.createElement("div");
			boxTL.className = "box";
			//boxTL.style.backgroundColor = "blue";
			boxTL.innerHTML = 
			"<h1>Code</h1>";
			boxTL.onclick = function(){
				tr = false;
				tl = true;
				bl = false;
				br = false;
				updateBoxes();
			};
			
			boxTR = document.createElement("div");
			boxTR.className = "box";
			//boxTR.style.backgroundColor = "green";
			boxTR.innerHTML = 
			"<h1>Level Design</h1>";
			boxTR.onclick = function(){
				tr = true;
				tl = false;
				bl = false;
				br = false;
				updateBoxes();
			};
			
			boxBL = document.createElement("div");
			boxBL.className = "box";
			boxBL.innerHTML = 
			"<h1>Design</h1>";
			boxBL.onclick = function(){
				tr = false;
				tl = false;
				bl = true;
				br = false;
				updateBoxes();
			};
			
			boxBR = document.createElement("div");
			boxBR.className = "box";
			boxBR.innerHTML = 
			"<h1>Writing Examples</h1>";
			boxBR.onclick = function(){
				tr = false;
				tl = false;
				bl = false;
				br = true;
				updateBoxes();
			};
			
			bigBox = document.createElement("div");
			bigBox.id = "bigBox";
			bigBox.style.display = "none";
			
			newBox = document.createElement("div");
			//newBox.appendChild(boxImg);
			//Setup - assigning to page
			{
				document.querySelector("#container").appendChild(base);
				document.querySelector("#overlay").overflow = "hidden";
				//Attach all the content boxes
				base.appendChild(document.querySelector("#overlay"));
				base.appendChild(divMain);
				divMain.appendChild(bigBox);
				divMain.appendChild(row1);
				divMain.appendChild(row2);
				//divMain.appendChild(foot);
				row1.appendChild(boxTL);
				row2.appendChild(boxBL);
				row1.appendChild(boxTR);
				row2.appendChild(boxBR);
			}
			//Run the update to set all bools to home page value programmatically
			updateBoxes();
			
			//Bool collection of onClick event listeners for nav bar - just sets bools to proper page
				//Example - rest are derivative
				document.querySelector("#homeBut").addEventListener("click", function(e){
					e.stopPropagation();
					homePage = true;
					levelPage = false;
					designPage = false;
					writingPage = false;
					codePage = false;
					aboutPage = false;
					notesPage = false;
					mouseGall = false;
					lightbox.click();
					updateBoxes();
					navToggleDown();
				});
			{
				document.querySelector("#aboutBut").addEventListener("click", function(e){
					e.stopPropagation();
					homePage = false;
					levelPage = false;
					designPage = false;
					writingPage = false;
					codePage = false;
					aboutPage = true;
					mouseGall = false;
					lightbox.click();
					updateBoxes();
				//	navToggleDown();
				});

			}
		}

		function navToggle(){

			window.location.reload();
	
		}
		function navToggleDown(){
			var overlay = document.querySelector("#overlay");
			document.querySelector("#navButtonClose").style.display = "none";
			document.querySelector("#navButtonOpen").style.display = "inline";
			$(overlay).fadeToggle("slow");
		}
		
		function updateBoxes(){
			newBox.innerHTML = "";
		/* Set Default Values*/{
			boxBL.style.marginLeft = "0"
			boxBL.style.display = "inline-block";
			boxBR.style.display = "inline-block";
			boxTR.style.display = "inline-block";
			boxTL.style.display = "inline-block";
			
			bigBox.style.display = "none";
		//	foot.style.display = "none";
			
			row1.style.display = "inline-block";
			row2.style.display = "inline-block";
			
			boxBL.style.width = "50%";
			boxTL.style.width = "50%";
			boxTR.style.width = "50%";
			boxBR.style.width = "50%";
			
			boxTL.style.marginLeft = 0;
			boxBL.style.marginLeft = 0;
			boxTL.style.backgroundImage = "none";
			boxBL.style.backgroundImage = "none";
			boxBR.style.backgroundImage = "none";
			boxTR.style.backgroundImage = "none";

		}
	
	//Home Page Operation
		if(homePage)
			{
				title.innerHTML = "<h3>Robert Bailey's Portfolio<h3>";
				boxTL.innerHTML =
				"<h1>Code</h1>";
				boxTR.innerHTML = 
				"<h1>Levels</h1>";
				//boxBL.style.visibility = "visible";
				boxBL.innerHTML = 
				"<h1>Design and Modeling</h1>";
				//boxBR.style.display = "visible";
				boxBR.innerHTML = 
				"<h1>Writing</h1>";
				
				boxTL.style.backgroundImage = "url('media/3DAAworld.png')";
				boxTR.style.backgroundImage = "url('media/kfalt1.png')";
				boxBL.style.backgroundImage = "url('media/id1.jpg')";
				boxBR.style.backgroundImage = "url('media/gtCover.jpg')";
				
				
				if(bl)
				{
					homePage = false;
					levelPage = false;
					designPage = true;
					writingPage = false;
					codePage = false;
					aboutPage = false;
					notesPage = false;
				}
				if(tl)
				{	
					homePage = false;
					levelPage = false;
					designPage = false;
					writingPage = false;
					codePage = true;
					aboutPage = false;
					notesPage = false;
				}
				if(br)
				{
					homePage = false;
					levelPage = false;
					designPage = false;
					writingPage = true;
					codePage = false;
				}
				if(tr)
				{
					homePage = false;
					levelPage = true;
					designPage = false;
					writingPage = false;
					codePage = false;
					aboutPage = false;
					notesPage = false;					
				}
				bl = false;
				tl = false;
				tr = false;
				br = false;
			}
			//Level Page
			if(levelPage){	
				title.innerHTML = "<h3>Robert Bailey: Level Design<h3>";
				boxTL.style.width = "70%";
				boxTL.style.marginLeft = "15%";
				boxTL.innerHTML =
				"<h1>Unreal Tournament 2016</h1>";
				boxBL.style.marginLeft = "15%";
				boxBL.style.width = "70%";
				boxBL.innerHTML = 
				"<h1>Killing Floor 2</h1>";
				boxBR.style.display = "none";
				boxTR.style.display = "none";
				boxTL.style.backgroundImage = "url('media/highRes/ut1.png')";
				boxBL.style.backgroundImage = "url('media/highRes/kfalt1.png')";

				if(bl)
				{
					lightLoad(row2, boxBL, kfImg);
					lightson = true;
					boxText.innerHTML = 
						"<ul>"+
							"<li><p>Designing to feel like a decaying sports arena.</p></li>"+
							"<li><p>Focused on the survival game mode.</p></li>"+
							"<li><p>Pathing, geometry, and full gameplay loop all personaly designed</p></li>"+
							"<li><p>All assets and modeling created inside the Killing Floor 2 level editor.</p></li>"+
							"<li><p>Dynamic lighting and effects present.</p></li>"+
							"<li><a href = 'https://www.youtube.com/playlist?list=PLLJk-ai7N3j2r4Cn1FgENINjkGsVly3vr'>Commented Development Videos</a>"+
						"</ul>";
				}
				if(tl)
				{
					lightLoad(row1, boxTL, utImg);
					lightson = true;
					boxText.innerHTML = 
						"<ul>"+
						"<li><p>Made in the Unreal Tournament Editor on PC.</p></li>"+
						"<li><p>Designed to offer multiple lanes that reward various types of play, both for new and experienced players.</p></li>"+
						"<li><p>Geometry and terrain made using BSPs and terrain tools in UTE. All other assets included in Engine.</p></li>"+
						"<li><a href = 'https://www.youtube.com/playlist?list=PLLJk-ai7N3j39pDxOOiP7ZjRQoZkJlqlt'>Commentated Youtube Playlist of Level Development</a></li>"+
						"</ul>";
				}
			}
			//Design Page
			if(designPage){
				title.innerHTML = "<h3>Robert Bailey: Design<h3>";
				boxTL.innerHTML =
				"<h1>Board Game - Captain of the Stars</h1>";
				boxTR.innerHTML = 
				"<h1>Design Documentation</h1>";
				boxBL.innerHTML = 
				"<h1>inDICEcision</h1>";
				boxBR.innerHTML = 
				"<h1>Maya Pirate Ship in Unity</h1>";
				boxTL.style.backgroundImage = "url('media/bg1.jpg')";
				boxTR.style.backgroundImage = "url('media/cbscreen.png')";
				boxBL.style.backgroundImage = "url('media/id1.jpg')";
				boxBR.style.backgroundImage = "url('media/pirateDeck.png')"; 
				if(bl){
					lightLoad(row2, boxBL, idImg);
					lightson = true;
					boxText.innerHTML =
					"<ul>"+
						"<li><p>Group created dice game, inDICEsison, started as a class project.</p></li>"+
						"<li><p>A light dexterity game for families, allowing simple, fun experiences for players of all ages.</p></li>"+
						"<li><p>Focuses on using dice to manipulate point values, either by scoring points or knocking others away.</p></li>"+
						"<li><p>Also has a drafting mode where the dice get additional powers based off their colors.</p></li>"+
						"<li><p>Rules at:</p></li>"+
						"<li><p>Lead Designer and rules writer</p></li>"+
					"</ul>"
				}
				if(br){
					lightLoad(row2, boxBR, psImg);
					lightson = true;
					boxText.innerHTML =
					"<ul>"+
						"<li><p>Pirate ship where each solid object was constructed in Maya. Water and fog were done using Unity effects. Done in a group</p></li>"+
						"<li><p>My animations: Ship wheel, cannon firing, sails unfurling, cargo grate opening and closing.</p></li>"+
						"<li><p>My models and UV unwraps: Sails, masts, wheel, grate, barrel.</p></li>"+
						"<li><a href ='https://github.com/thrownerror/PirateShip'>Files and screenshots on Github</a></li>"+
					"</ul>";
				}
				if(tl){
					lightLoad(row1, boxTL, bgImg);
					lightson = true;
					boxText.innerHTML = 
					"<ul>"+
						"<li><p>Group created game, Captain of the Stars, that started as a class project.</p></li>"+
						"<li><p>Supports 3-6 players as they explore the fringes of civilized space.</p></li>"+
						"<li><p>Through streamlined systems, players can destroy each other, build settlements, and trade routes to earn victory points.</p></li>"+
						"<li><p>Violent actions reward players quickly, but run the risk of being confronted by the NPC Federation.</p></li>"+
						"<li><p>I worked predominatley on writing rules and mechanical design.</p></li>"+
					"</ul>";
				}
				if(tr){
					lightLoad(row1, boxTR, cbImg);
					lightson = true;
					boxText.innerHTML = 
					"<ul>"+
						"<li><p>Design document for a hypothetical mobile game, Combo Breaker.</li>"+
						"<li><p>Done as a class project, which required designing, mocking-up, and a final pitch document for a new mobile game.</p></li>"+
						"<li><p>Combo Breaker is a card game where players construct decks to do battle, similar to Hearthstone.</p></li>"+
						"<li><p>However, the game has a combo system, where players can string together attacks to form devasting assaults.</p></li>"+
						"<li><p>Their opponents can interrupt with reaction moves to try and regain the edge, or bide thier time as they wait for a moment to strike.</p></li>"+
						"<li><p>The purpose was to pitch a game that captured the feel and tactics of fighting games, without the same dexterity requriment.</p></li>"+
					"</ul>";
				}
			}
			//Writing Page
			if(writingPage)
			{
				title.innerHTML = "<h3>Robert Bailey: Writing<h3>";    
				boxTL.style.display = "none";
				boxTR.style.display = "none";
				boxBR.style.display = "none";
				boxBL.style.display = "none";
				
				bigBox.style.display = "inline";
				
				bigBox.innerHTML = 
				"<div id = 'bigLeft'>"+
					"<ul><li><a href='http://talesfromkingslanding.wikispaces.com/rbailey14'></a>"+
					"<br><p>My most relevant fiction writing exists <a href='http://talesfromkingslanding.wikispaces.com/rbailey14'>here</a> as part of Game Based Fiction, a class at RIT."+
					"<br>It follows the group-created House Fenshaw and its members adventures in King's Landing."+
					"<br>Due to the wiki nature, I'll link to my profile so my works can be seen with the surrounding context."+
					"<br>It also serves to have direct links to all my works (characters, stories, and locations) on the site.</p></li></ul>"+
					"<h3>Sample short Vignettes:</h3>"+
					"<ul><li class = 'itemList'><a href='http://talesfromkingslanding.wikispaces.com/The+Red+Hill'>The Red Hill</a>"+
							"<ul>"+
								"<li>Player character Emond Roebeck goes to rescue his brother from bandits.</li>"+
							"</ul>"+
						"</li>"+
						'<li class = "itemList"><a href="http://talesfromkingslanding.wikispaces.com/Evening+Walk">Evening Walk</a>'+
							"<ul>"+
								"<li>The Fenshaw members in King's Landing get attacked by thieves in the street.</li>"+
							"</ul>"+
						"</li>"+
						"<li class = 'itemList'><a href='https://talesfromkingslanding.wikispaces.com/A+Return+to+Form'>A Return to Form</a>"+
							"<ul>"+
								"<li>Emond rides against bandits outside the city.</li>"+
							"</ul>"+
						"</li>"+
						"<li class = 'itemList'><a href='http://talesfromkingslanding.wikispaces.com/Sins+Fully+Paid'>Sins Fully Paid</a>"+
							"<ul>"+
									"<li>The Fenshaw home gets attacked in the middle of the night.</li>"+
							"</ul>"+
						"</li>"+
					"</ul>"+
				"</div>"

			}
			//Code Page
			if(codePage){
				title.innerHTML = "<h3>Robert Bailey: Code<h3>";
				boxTL.innerHTML =
				"<h1>C# 3D Active Environment</h1>";
				boxTR.innerHTML = 
				"<h1>C# 3D Agents</h1>";
				boxBL.innerHTML = 
				"<h1>Processing Randomness</h1>";
				boxBR.innerHTML = 
				"<h1>Autonomous Agents</h1>";
				
				boxTL.style.backgroundImage = "url('media/3DAAworld.png')";
				boxTR.style.backgroundImage = "url('media/3Dagents.png')";
				boxBL.style.backgroundImage = "url('media/randomnessDemo.png')";
				boxBR.style.backgroundImage = "url('media/2d2.png')";
				if(bl){
					lightLoad(row2, boxBL, rnImg);
					lightson = true;
					boxText.innerHTML =
					"<ul>"+
						"<li><p>Uses Perlin noise to generate the scrolling ground.</p></li>"+
						"<li><p>Obstacle cars spawn from the top using Gaussian randomness, while the tower uses a standard Processing Random algorithms.</p></li>"+
						"<li><p>The dark car is controllable, and points are earned as obstacles are eveaded.</p></li>"+
						"<li><p>Made Using Processing</p></li>"+
						"<li><a href = 'https://github.com/thrownerror/Projects/tree/master/Processing/Randomness_Processing/MadMaxRandom' target = '_blank'>Code available on Github</a></li>"+
					"</ul>";
				}
				if(br){
					lightLoad(row2, boxBR, tdImg);
					lightson = true;
					boxText.innerHTML =
					"<ul>"+
						"<li><p>Uses evading, pursuing, bounding circle based obstacle avoidance, and other Reynold's based steering behaviors.</p></li>"+
						"<li><p>Inspired by Star Wars, I used PVectors to draw X-Wings and TIE Fighters.</p></li>"+
						"<li><p>Made Using Processing</p></li>"+
						"<li><a href = 'https://github.com/thrownerror/Projects/tree/master/Processing/TieFightervsXwing' target = '_blank'>Code available on Github</a></li>"+
					"</ul>";
				}
				if(tl){
					lightLoad(row1, boxTL, aaImg);
					lightson = true;
					boxText.innerHTML =
					"<ul>"+
						"<li><p>Evolution of the 3D flocking behavior system, adding path and leader following algorithms</p></li>"+
						"<li><p>Adds larger ships which seek clumps of the smaller ones, which scatter when approached</p></li>"+
						"<li><p>Textures and skyboxes from Unity Store</p></li>"+
						"<li><p>Programmed in C#</p></li>"+
						"<li><a href = 'https://github.com/thrownerror/UnityWork'>Code available on Github</a></li>"+
					"</ul>";
				}
				if(tr){
					lightLoad(row1, boxTR, thdImg);
					lightson = true;
					boxText.innerHTML =
					"<ul>"+
						"<li><p>Primarily uses Reynold's arrival and obstacle avoidance algorithms to navigate these ships in 3D space.</p></li>"+
						"<li><p>Asteroids, ships, and the target ring made in Maya. Used Unity Store textures and skyboxes.</p></li>"+
						"<li><p>Programmed in C#</p></li>"+
						"<li><a href = 'https://github.com/thrownerror/UnityWork'>Code available on Github</a></li>"+
					"</ul>";
				}
			}
			//Notes Page
			if(notesPage)
			{
				title.innerHTML = "<h3>Notes<h3>";
				boxTL.style.display = "none";
				boxTR.style.display = "none";
				boxBR.style.display = "none";
				boxBL.style.display = "none";
				
				bigBox.style.display = "inline";
				//foot.style.display = "block";
				row1.style.display = "none";
				row2.style.display = "none";
				bigBox.innerHTML = 
					"<h3>Image sources:</h3>"+
					"<ul>"+
						"<li><p>Background screen capped from <a href = 'https://www.youtube.com/watch?v=Qr0EnDsMNXU'>this youtube video.</a></p></li>"+
						"<li><p>A Song of Ice and Fire Roleplaying Book cover from <a href ='http://greenroninstore.com/products/a-song-of-ice-and-fire-roleplaying-a-game-of-thrones-edition-print'>Green Ronin</a></p></li>"+
						"<li><p>All others taken from my own projects</p></li>"+
					"</ul>"+
					"<br>"+
					"<h3>Notes and Above and Beyond</h3>"+
					"<ul>"+
						"<li><a href = '404.html'>Link to the 404 page</a></li>"+
						"<li><a href = 'protected/authPage.html'>Link to the authentication page</a></li>"+
						"<li><p>Implemented JQuery transitions for a nav. system</p></li>"+
						"<li><p>Coded the site almost entirely using Javascript</p></li>"+
						"<li><p>Have a gallery for each applicable entry</p></li>"+
						"<li><p>Made an original logo</p></li>"+
						"<li><p>Used JavaScript to handle click detection</p></li>"+
						"<li><p>Other Notes:"+
							"<ul>"+
								"<li><p>Logo created in Photoshop</p></li>"+
								"<li><p>Fonts from Google Fonts: Used Orbitron and Catamaran</p></li>"+
							"</ul>"+
						"</p></li>"+
					"</ul>"+
				"<h3>Contact Me</h3>"+
					"<ul>"+
						"<li><a href = 'https://www.linkedin.com/in/robert-bailey-699213a4'>LinkedIn</a></li>"+
						"<li><a href = 'https://twitter.com/thrownerror'>Twitter</a></li>"+
						"<li><a href=  'mailto:rxb2890@g.rit.edu'>rxb2890[at]g.rit.edu</a></li>"+
						"<li><a href='.../doc/RobertWBailey_Resume.pdf' target = '_blank'>Resume</a></li>"+
					"</ul>";
			}
			if(aboutPage)
			{
				title.innerHTML = "<h3>Robert Bailey: About Me<h3>";
				boxTL.style.display = "none";
				boxTR.style.display = "none";
				boxBR.style.display = "none";
				boxBL.style.display = "none";
				row1.style.display = "none";
				row2.style.display = "none";
				bigBox.style.display = "inline";
				//foot.style.display = "block";
				
				var test = document.createElement("img");
				test.src = "media/robHeadshot.jpg";
				bigBox.innerHTML = "";
				bigBox.appendChild(test);
				bigBox.innerHTML = bigBox.innerHTML + 
				"<p>"+
					"I'm Robert Bailey, a game designer focused on levels and narratives."+
					"<br>"+
					"<br>I attend the Rochester Institute of Technolgoy for Game Design and Development."+
					"<br>I have programmed in: C#, C++, Java, Processing, Javascrpt, HTML, and CSS. "+
					"<br>In addition, I've worked with Maya, Unity, Visual Studios, Monogame, SourceTree, and Photoshop."+
					"<br>Currently looking for co-op and internship opportunities in game design and software development."+
				"</p>"+
				"</p>"+
				"<p><br><b>Current project:</b> A deckbuilding game about exploring and looting dungeons."+
				"<br>"+
				"In early testing and card design, currently going through a rewrite after initial playtests</p>"+
				"<h3>Contact Me</h3>"+
					"<ul>"+
						"<li><a href = 'https://www.linkedin.com/in/robert-bailey-699213a4'>LinkedIn</a></li>"+
						"<li><a href = 'https://twitter.com/thrownerror'>Twitter</a></li>"+
						"<li><a href=  'mailto:rxb2890@g.rit.edu'>rxb2890[at]g.rit.edu</a></li>"+
						"<li><a href='doc/RobertWBailey_Resume.pdf' target = '_blank'>Resume</a></li>"+
					"</ul>";
			}
			tl = false;
			bl = false;
			tr = false;
			br = false;
			//About Page

	}
	function lightLoad(prnt, child, gall){
		parent = prnt;
		chi = child;
		oldHTML = child.innerHTML;
		stdGall = gall.slice(0);
		newBox = child.cloneNode(true);
		newBox.style.marginLeft = 0;
		newBox.innerHTML = "";
		newBox.id = "textBox";
		newBox.style.backgroundImage = "none";
		gallIt = 0;
		boxImg.src = stdGall[gallIt];
		newBox.appendChild(boxImg);
		newBox.appendChild(boxText);
		lightbox.appendChild(newBox);
		oldWidth = newBox.style.width;
		newBox.style.width = "80%";
		content.appendChild(lightbox);
		$(lightbox).fadeIn(300);
		$(newBox).fadeIn(300);
		
		newBox.addEventListener("click", function(e){
				if(gallIt < stdGall.length - 1)
				{
					gallIt++;
				}
				else
				{
					gallIt = 0;
				}
				boxImg.src = stdGall[gallIt];
				newBox.appendChild(boxImg);
				newBox.appendChild(boxText);
				
			});
			newBox.addEventListener("mouseover", function(e){
				mouseGall = true;
			//	console.log("debug");
			});
			newBox.addEventListener("mouseout", function(e){
				mouseGall = false;
			});
	}