import React, { useEffect, useMemo, useState } from "react";

const CHARACTER_BANK = [
  { name: "Lionel Messi", hints: ["Balance", "Vision", "Quiet"], tags: ["sports", "global"] },
  { name: "Cristiano Ronaldo", hints: ["Discipline", "Presence", "Confidence"], tags: ["sports", "global"] },
  { name: "Michael Jordan", hints: ["Legacy", "Clutch", "Cold"], tags: ["sports", "global"] },
  { name: "LeBron James", hints: ["Power", "Longevity", "Control"], tags: ["sports", "global"] },
  { name: "Serena Williams", hints: ["Force", "Focus", "Champion"], tags: ["sports", "global"] },
  { name: "Roger Federer", hints: ["Grace", "Composed", "Classic"], tags: ["sports", "global"] },
  { name: "Novak Djokovic", hints: ["Elastic", "Relentless", "Precision"], tags: ["sports", "global"] },
  { name: "Rafael Nadal", hints: ["Grit", "Clay", "Fight"], tags: ["sports", "global"] },
  { name: "Usain Bolt", hints: ["Flash", "Relaxed", "Burst"], tags: ["sports", "global"] },
  { name: "Michael Phelps", hints: ["Water", "Routine", "Reach"], tags: ["sports", "global"] },
  { name: "Muhammad Ali", hints: ["Rhythm", "Verbal", "Aura"], tags: ["sports", "global"] },
  { name: "Mike Tyson", hints: ["Ferocity", "Pressure", "Explosion"], tags: ["sports", "global"] },
  { name: "Diego Maradona", hints: ["Chaos", "Magic", "Street"], tags: ["sports", "global"] },
  { name: "Pelé", hints: ["Royal", "Myth", "Timeless"], tags: ["sports", "global"] },
  { name: "Zinedine Zidane", hints: ["Elegant", "Calm", "Bald"], tags: ["sports", "global"] },
  { name: "Kylian Mbappé", hints: ["Burst", "Mask", "Future"], tags: ["sports", "global"] },
  { name: "Neymar", hints: ["Flair", "Show", "Brazilian"], tags: ["sports", "global"] },
  { name: "Ronaldinho", hints: ["Smile", "Playful", "Street"], tags: ["sports", "global"] },
  { name: "David Beckham", hints: ["Style", "Curve", "Famous"], tags: ["sports", "global"] },
  { name: "Shaquille O'Neal", hints: ["Huge", "Humor", "Power"], tags: ["sports", "global"] },
  { name: "Kobe Bryant", hints: ["Mamba", "Drive", "Obsessed"], tags: ["sports", "global"] },
  { name: "Stephen Curry", hints: ["Range", "Rhythm", "Smile"], tags: ["sports", "global"] },
  { name: "Kevin Durant", hints: ["Length", "Smooth", "Quiet"], tags: ["sports", "global"] },
  { name: "Magic Johnson", hints: ["Smile", "Passing", "Showtime"], tags: ["sports", "global"] },
  { name: "Larry Bird", hints: ["TrashTalk", "White", "Farm"], tags: ["sports", "global"] },
  { name: "Tiger Woods", hints: ["Focus", "Green", "Intensity"], tags: ["sports", "global"] },
  { name: "Lewis Hamilton", hints: ["Speed", "Fashion", "Smooth"], tags: ["sports", "global"] },
  { name: "Max Verstappen", hints: ["Aggressive", "Sharp", "Dutch"], tags: ["sports", "global"] },
  { name: "Ayrton Senna", hints: ["Rain", "Myth", "Brazil"], tags: ["sports", "global"] },
  { name: "Michael Schumacher", hints: ["Machine", "Red", "Dominance"], tags: ["sports", "global"] },
  { name: "Simone Biles", hints: ["Twist", "Airborne", "Tiny"], tags: ["sports", "global"] },
  { name: "Tom Brady", hints: ["Longevity", "Cold", "Rings"], tags: ["sports", "global"] },
  { name: "Conor McGregor", hints: ["Swagger", "Loud", "Tattoo"], tags: ["sports", "global"] },
  { name: "Khabib Nurmagomedov", hints: ["Calm", "Grapple", "Eagle"], tags: ["sports", "global"] },

  { name: "Taylor Swift", hints: ["Narrative", "Era", "Confessional"], tags: ["music", "global"] },
  { name: "Beyoncé", hints: ["Command", "Polished", "Queen"], tags: ["music", "global"] },
  { name: "Adele", hints: ["Heartbreak", "Powerful", "London"], tags: ["music", "global"] },
  { name: "Ed Sheeran", hints: ["Loop", "Guitar", "Ginger"], tags: ["music", "global"] },
  { name: "Drake", hints: ["Moody", "Canada", "Charts"], tags: ["music", "global"] },
  { name: "Rihanna", hints: ["Cool", "Fenty", "Island"], tags: ["music", "global"] },
  { name: "Lady Gaga", hints: ["Theatrical", "Costume", "Bold"], tags: ["music", "global"] },
  { name: "The Weeknd", hints: ["Nocturnal", "Toronto", "Falsetto"], tags: ["music", "global"] },
  { name: "Bruno Mars", hints: ["Funky", "Silk", "Showman"], tags: ["music", "global"] },
  { name: "Michael Jackson", hints: ["Moonwalk", "Glove", "Icon"], tags: ["music", "global"] },
  { name: "Elvis Presley", hints: ["Hips", "King", "Memphis"], tags: ["music", "global"] },
  { name: "Madonna", hints: ["Reinvent", "Provocative", "Blonde"], tags: ["music", "global"] },
  { name: "Freddie Mercury", hints: ["Mustache", "Operatic", "Stage"], tags: ["music", "global"] },
  { name: "Eminem", hints: ["Rapid", "Detroit", "Anger"], tags: ["music", "global"] },
  { name: "Kanye West", hints: ["Ego", "Chaotic", "Producer"], tags: ["music", "global"] },
  { name: "Kendrick Lamar", hints: ["Dense", "Pulitzer", "Compton"], tags: ["music", "global"] },
  { name: "Jay-Z", hints: ["Billionaire", "Brooklyn", "Mogul"], tags: ["music", "global"] },
  { name: "Nicki Minaj", hints: ["Barbz", "Animated", "Colorful"], tags: ["music", "global"] },
  { name: "Ariana Grande", hints: ["High", "Ponytail", "Petite"], tags: ["music", "global"] },
  { name: "Billie Eilish", hints: ["Whisper", "Oversized", "Neon"], tags: ["music", "global"] },
  { name: "Justin Bieber", hints: ["Teen", "Canada", "Fame"], tags: ["music", "global"] },
  { name: "Selena Gomez", hints: ["Gentle", "Disney", "Rare"], tags: ["music", "global"] },
  { name: "Shakira", hints: ["Hips", "Colombia", "Shake"], tags: ["music", "global"] },
  { name: "Snoop Dogg", hints: ["Laidback", "Smoke", "WestCoast"], tags: ["music", "global"] },
  { name: "Tupac Shakur", hints: ["Poetic", "Bandana", "Legend"], tags: ["music", "global"] },
  { name: "Notorious B.I.G.", hints: ["Heavy", "Brooklyn", "Smooth"], tags: ["music", "global"] },
  { name: "Bob Marley", hints: ["Reggae", "Roots", "Jamaica"], tags: ["music", "global"] },
  { name: "Whitney Houston", hints: ["Voice", "Church", "Power"], tags: ["music", "global"] },
  { name: "Celine Dion", hints: ["Titanic", "Ballad", "Canada"], tags: ["music", "global"] },
  { name: "Dua Lipa", hints: ["Disco", "Cool", "Albanian"], tags: ["music", "global"] },
  { name: "Olivia Rodrigo", hints: ["Diary", "Teenage", "Purple"], tags: ["music", "global"] },
  { name: "Bad Bunny", hints: ["Latin", "PuertoRico", "Unpredictable"], tags: ["music", "global"] },
  { name: "Post Malone", hints: ["Tattoo", "Melodic", "Beer"], tags: ["music", "global"] },
  { name: "Harry Styles", hints: ["Fluid", "Feather", "Charm"], tags: ["music", "global"] },
  { name: "Miley Cyrus", hints: ["Rebel", "Raspy", "Transformation"], tags: ["music", "global"] },

  { name: "Tom Cruise", hints: ["Stunt", "Run", "Intensity"], tags: ["cinema", "global"] },
  { name: "Leonardo DiCaprio", hints: ["Prestige", "Youngface", "Ocean"], tags: ["cinema", "global"] },
  { name: "Brad Pitt", hints: ["Cool", "Golden", "Fight"], tags: ["cinema", "global"] },
  { name: "Angelina Jolie", hints: ["Sharp", "Humanitarian", "Fierce"], tags: ["cinema", "global"] },
  { name: "Johnny Depp", hints: ["Eccentric", "Pirate", "Messy"], tags: ["cinema", "global"] },
  { name: "Dwayne Johnson", hints: ["Huge", "Smirk", "Jungle"], tags: ["cinema", "global"] },
  { name: "Jennifer Lawrence", hints: ["Dry", "Bow", "Frank"], tags: ["cinema", "global"] },
  { name: "Emma Watson", hints: ["Bookish", "British", "Poised"], tags: ["cinema", "global"] },
  { name: "Scarlett Johansson", hints: ["Lowvoice", "Marvel", "Cool"], tags: ["cinema", "global"] },
  { name: "Robert Downey Jr.", hints: ["Witty", "Comeback", "Metal"], tags: ["cinema", "global"] },
  { name: "Chris Hemsworth", hints: ["Hammer", "Australia", "Tall"], tags: ["cinema", "global"] },
  { name: "Chris Evans", hints: ["Shield", "Clean", "Boston"], tags: ["cinema", "global"] },
  { name: "Morgan Freeman", hints: ["Narrator", "Calm", "Wisdom"], tags: ["cinema", "global"] },
  { name: "Meryl Streep", hints: ["Versatile", "Accent", "Prestige"], tags: ["cinema", "global"] },
  { name: "Julia Roberts", hints: ["Smile", "Romance", "Star"], tags: ["cinema", "global"] },
  { name: "Will Smith", hints: ["Charisma", "Slap", "Blockbuster"], tags: ["cinema", "global"] },
  { name: "Keanu Reeves", hints: ["Gentle", "Neo", "Kind"], tags: ["cinema", "global"] },
  { name: "Ryan Reynolds", hints: ["Sarcastic", "Canada", "Gin"], tags: ["cinema", "global"] },
  { name: "Ryan Gosling", hints: ["Quiet", "Cool", "Drive"], tags: ["cinema", "global"] },
  { name: "Margot Robbie", hints: ["Doll", "Australia", "Bright"], tags: ["cinema", "global"] },
  { name: "Anne Hathaway", hints: ["Elegant", "Princess", "Smile"], tags: ["cinema", "global"] },
  { name: "Natalie Portman", hints: ["Poised", "Harvard", "Ballet"], tags: ["cinema", "global"] },
  { name: "Zendaya", hints: ["Tall", "Fashion", "Youth"], tags: ["cinema", "global"] },
  { name: "Timothée Chalamet", hints: ["Slim", "Soft", "French"], tags: ["cinema", "global"] },
  { name: "Joaquin Phoenix", hints: ["Intense", "Unsettling", "Method"], tags: ["cinema", "global"] },
  { name: "Tom Hanks", hints: ["Safe", "Warm", "Everyman"], tags: ["cinema", "global"] },
  { name: "Nicolas Cage", hints: ["Wild", "Meme", "Unhinged"], tags: ["cinema", "global"] },
  { name: "Al Pacino", hints: ["Intensity", "Roar", "Classic"], tags: ["cinema", "global"] },
  { name: "Robert De Niro", hints: ["Gritty", "Mafia", "Icon"], tags: ["cinema", "global"] },
  { name: "Jim Carrey", hints: ["Elastic", "Face", "Loud"], tags: ["cinema", "global"] },
  { name: "Rowan Atkinson", hints: ["Awkward", "Silent", "Rubberface"], tags: ["cinema", "global"] },
  { name: "Jackie Chan", hints: ["Stunts", "Agile", "Smile"], tags: ["cinema", "global"] },
  { name: "Arnold Schwarzenegger", hints: ["Muscle", "Accent", "Machine"], tags: ["cinema", "global"] },
  { name: "Sylvester Stallone", hints: ["Grit", "Mumble", "Boxing"], tags: ["cinema", "global"] },
  { name: "Harrison Ford", hints: ["Gruff", "Adventure", "Pilot"], tags: ["cinema", "global"] },

  { name: "Albert Einstein", hints: ["Theory", "Hair", "Thought"], tags: ["history", "global"] },
  { name: "Leonardo da Vinci", hints: ["Sketch", "Renaissance", "Curious"], tags: ["history", "global"] },
  { name: "William Shakespeare", hints: ["Tragedy", "Stage", "Quill"], tags: ["history", "global"] },
  { name: "Walt Disney", hints: ["Castle", "Animation", "Mouse"], tags: ["creators", "global"] },
  { name: "Steve Jobs", hints: ["Minimal", "Turtleneck", "Reveal"], tags: ["tech", "global"] },
  { name: "Bill Gates", hints: ["Glasses", "Software", "Philanthropy"], tags: ["tech", "global"] },
  { name: "Elon Musk", hints: ["Risk", "Chaos", "Vision"], tags: ["tech", "global"] },
  { name: "Mark Zuckerberg", hints: ["Algorithm", "Blank", "Meta"], tags: ["tech", "global"] },
  { name: "Jeff Bezos", hints: ["Bald", "Delivery", "Wealth"], tags: ["tech", "global"] },
  { name: "Oprah Winfrey", hints: ["Interview", "Empathy", "Authority"], tags: ["tv", "global"] },
  { name: "MrBeast", hints: ["Generosity", "Scale", "Thumbnail"], tags: ["creators", "global"] },
  { name: "Kim Kardashian", hints: ["Fame", "Contour", "Reality"], tags: ["tv", "global"] },
  { name: "David Attenborough", hints: ["Nature", "Voice", "Documentary"], tags: ["creators", "global"] },
  { name: "Gordon Ramsay", hints: ["Shout", "Kitchen", "Insult"], tags: ["creators", "global"] },
  { name: "J.K. Rowling", hints: ["Wizard", "British", "Controversial"], tags: ["creators", "global"] },
  { name: "George Lucas", hints: ["Galaxy", "Creator", "Saga"], tags: ["creators", "global"] },
  { name: "Steven Spielberg", hints: ["Blockbuster", "Director", "Wonder"], tags: ["creators", "global"] },
  { name: "Christopher Nolan", hints: ["Time", "Serious", "Complex"], tags: ["creators", "global"] },
  { name: "Quentin Tarantino", hints: ["Dialogue", "Violence", "Feet"], tags: ["creators", "global"] },
  { name: "Pablo Picasso", hints: ["Abstract", "Spain", "Faces"], tags: ["creators", "global"] },
  { name: "Vincent van Gogh", hints: ["Ear", "Swirl", "Yellow"], tags: ["creators", "global"] },
  { name: "Marie Curie", hints: ["Radiation", "Research", "Pioneer"], tags: ["history", "global"] },
  { name: "Nelson Mandela", hints: ["Prison", "Reconcile", "SouthAfrica"], tags: ["history", "global"] },
  { name: "Mahatma Gandhi", hints: ["Peaceful", "Thin", "March"], tags: ["history", "global"] },
  { name: "Winston Churchill", hints: ["Cigar", "War", "Speech"], tags: ["history", "global"] },
  { name: "Princess Diana", hints: ["Grace", "People", "Royal"], tags: ["history", "global"] },
  { name: "Barack Obama", hints: ["Measured", "Speech", "Hope"], tags: ["politics", "global"] },
  { name: "Donald Trump", hints: ["Loud", "Hair", "Deal"], tags: ["politics", "global"] },
  { name: "Vladimir Putin", hints: ["Cold", "Power", "Barechest"], tags: ["politics", "global"] },
  { name: "Pope Francis", hints: ["White", "Gentle", "Vatican"], tags: ["public", "global"] },
  { name: "Greta Thunberg", hints: ["Climate", "Youth", "Direct"], tags: ["public", "global"] },
  { name: "Malala Yousafzai", hints: ["Education", "Courage", "Young"], tags: ["public", "global"] },
  { name: "Che Guevara", hints: ["Revolution", "Beret", "Poster"], tags: ["history", "global"] },

  { name: "Gal Gadot", hints: ["Poised", "Israeli", "Heroic"], tags: ["cinema", "israel"] },
  { name: "Noa Kirel", hints: ["Pop", "Energetic", "Stage"], tags: ["music", "israel"] },
  { name: "Omer Adam", hints: ["Popular", "Local", "Crowd"], tags: ["music", "israel"] },
  { name: "Eyal Golan", hints: ["Mainstream", "Emotional", "Israeli"], tags: ["music", "israel"] },
  { name: "Ofra Haza", hints: ["Iconic", "Yemenite", "Classic"], tags: ["music", "israel"] },
  { name: "Yehuda Levi", hints: ["TV", "Handsome", "Local"], tags: ["cinema", "israel"] },
  { name: "Assi Azar", hints: ["Host", "Television", "Witty"], tags: ["tv", "israel"] },
  { name: "Dana International", hints: ["Eurovision", "Bold", "Legend"], tags: ["music", "israel"] },
  { name: "Benjamin Netanyahu", hints: ["Veteran", "Speech", "Polarizing"], tags: ["politics", "israel"] },
  { name: "Adi Ashkenazi", hints: ["Comedy", "Sharp", "Israeli"], tags: ["tv", "israel"] },
  { name: "Eden Golan", hints: ["Young", "Stage", "Recent"], tags: ["music", "israel"] },
  { name: "Static", hints: ["Colorful", "Pop", "Glasses"], tags: ["music", "israel"] },
  { name: "Ben El Tavori", hints: ["Pop", "Duo", "Energetic"], tags: ["music", "israel"] },
  { name: "Ninet Tayeb", hints: ["Rock", "Raspy", "Television"], tags: ["music", "israel"] },
  { name: "Shlomo Artzi", hints: ["Classic", "Israeli", "Beloved"], tags: ["music", "israel"] },
  { name: "Ishay Ribo", hints: ["Spiritual", "Gentle", "Israeli"], tags: ["music", "israel"] },
  { name: "Yehoram Gaon", hints: ["Veteran", "Jerusalem", "Classic"], tags: ["music", "israel"] },
  { name: "Moran Atias", hints: ["Model", "Actress", "International"], tags: ["cinema", "israel"] },
  { name: "Lior Raz", hints: ["Intense", "Security", "Israeli"], tags: ["cinema", "israel"] },
  { name: "Rotem Sela", hints: ["Host", "Fashion", "Popular"], tags: ["tv", "israel"] },
  { name: "Erez Tal", hints: ["Host", "Veteran", "Television"], tags: ["tv", "israel"] },
  { name: "Bar Refaeli", hints: ["Model", "Israeli", "Global"], tags: ["public", "israel"] },
  { name: "Eden Ben Zaken", hints: ["Popular", "Voice", "Israeli"], tags: ["music", "israel"] },
  { name: "Sarit Hadad", hints: ["Voice", "Mainstream", "Israeli"], tags: ["music", "israel"] },
  { name: "Hanan Ben Ari", hints: ["Lyrics", "Heart", "Israeli"], tags: ["music", "israel"] },
  { name: "Aviv Geffen", hints: ["Rebel", "Rock", "Black"], tags: ["music", "israel"] },
  { name: "Miri Mesika", hints: ["Ballad", "Warm", "Israeli"], tags: ["music", "israel"] },
  { name: "Asaf Avidan", hints: ["Unique", "Voice", "Indie"], tags: ["music", "israel"] },
  { name: "Niv Sultan", hints: ["Actress", "Young", "International"], tags: ["cinema", "israel"] },
  { name: "Anna Zak", hints: ["Influencer", "Young", "Pop"], tags: ["music", "israel"] },
  { name: "Oded Katash", hints: ["Basketball", "Coach", "Israeli"], tags: ["sports", "israel"] },
  { name: "Omri Casspi", hints: ["NBA", "Israeli", "Pioneer"], tags: ["sports", "israel"] },
  { name: "Eran Zahavi", hints: ["Goals", "Local", "Veteran"], tags: ["sports", "israel"] },
  { name: "Manor Solomon", hints: ["Football", "Fast", "Israeli"], tags: ["sports", "israel"] },
  { name: "Inbar Lavi", hints: ["Actress", "International", "Israeli"], tags: ["cinema", "israel"] },

  { name: "Sacha Baron Cohen", hints: ["Satire", "Accent", "Absurd"], tags: ["cinema", "global"] },
  { name: "Daniel Radcliffe", hints: ["Wizard", "British", "Short"], tags: ["cinema", "global"] },
  { name: "RuPaul", hints: ["Drag", "Runway", "Fierce"], tags: ["tv", "global"] },
  { name: "David Bowie", hints: ["Alien", "Reinvent", "Thin"], tags: ["music", "global"] },
  { name: "Prince", hints: ["Purple", "Mystery", "Genius"], tags: ["music", "global"] },
  { name: "Cher", hints: ["Timeless", "Camp", "Solo"], tags: ["music", "global"] },
  { name: "Bruce Springsteen", hints: ["Road", "America", "BlueCollar"], tags: ["music", "global"] },
  { name: "Elton John", hints: ["Piano", "Glasses", "Showy"], tags: ["music", "global"] },
  { name: "Paul McCartney", hints: ["Beatles", "Melody", "Knight"], tags: ["music", "global"] },
  { name: "John Lennon", hints: ["Peace", "RoundGlasses", "Imagine"], tags: ["music", "global"] },
  { name: "Mick Jagger", hints: ["Swagger", "Lips", "Rock"], tags: ["music", "global"] },
  { name: "Bono", hints: ["Sunglasses", "Activism", "Arena"], tags: ["music", "global"] },
  { name: "Alicia Keys", hints: ["Piano", "Natural", "Soulful"], tags: ["music", "global"] },
  { name: "Lana Del Rey", hints: ["Melancholy", "Vintage", "Slow"], tags: ["music", "global"] },
  { name: "Sia", hints: ["Hidden", "Wig", "Voice"], tags: ["music", "global"] },
  { name: "Travis Scott", hints: ["Rager", "Houston", "Hype"], tags: ["music", "global"] },
  { name: "Doja Cat", hints: ["Playful", "Online", "ShapeShift"], tags: ["music", "global"] },
  { name: "Ice Spice", hints: ["Orange", "Bronx", "New"], tags: ["music", "global"] },
  { name: "J Balvin", hints: ["Color", "Latin", "Reggaeton"], tags: ["music", "global"] },
  { name: "Karol G", hints: ["Pink", "Latin", "Confident"], tags: ["music", "global"] },
  { name: "Vin Diesel", hints: ["Bald", "Cars", "Family"], tags: ["cinema", "global"] },
  { name: "Jason Statham", hints: ["Bald", "British", "Action"], tags: ["cinema", "global"] },
  { name: "Pedro Pascal", hints: ["Protective", "Mustache", "Internet"], tags: ["cinema", "global"] },
  { name: "Jenna Ortega", hints: ["Dark", "Young", "Deadpan"], tags: ["cinema", "global"] },
  { name: "Sydney Sweeney", hints: ["Blonde", "Trending", "Drama"], tags: ["cinema", "global"] },
  { name: "Florence Pugh", hints: ["Blunt", "British", "Strong"], tags: ["cinema", "global"] },
  { name: "Cillian Murphy", hints: ["Piercing", "Quiet", "Irish"], tags: ["cinema", "global"] },
  { name: "Hugh Jackman", hints: ["Claws", "Musical", "Australia"], tags: ["cinema", "global"] },
  { name: "Benedict Cumberbatch", hints: ["Voice", "British", "Strange"], tags: ["cinema", "global"] },
  { name: "Millie Bobby Brown", hints: ["Young", "Telekinesis", "British"], tags: ["cinema", "global"] },
  { name: "Denzel Washington", hints: ["Authority", "Calm", "Gravitas"], tags: ["cinema", "global"] },
  { name: "Samuel L. Jackson", hints: ["Voice", "Fury", "Profanity"], tags: ["cinema", "global"] },
  { name: "Ben Stiller", hints: ["Awkward", "Comedy", "BlueSteel"], tags: ["cinema", "global"] },
  { name: "Owen Wilson", hints: ["Nose", "Wow", "Laidback"], tags: ["cinema", "global"] },
  { name: "Adam Sandler", hints: ["Goofy", "Basketball", "Netflix"], tags: ["cinema", "global"] },
  { name: "Seth Rogen", hints: ["Laugh", "Smoke", "Comedy"], tags: ["cinema", "global"] },
  { name: "Aubrey Plaza", hints: ["Dry", "Deadpan", "Indie"], tags: ["cinema", "global"] },
  { name: "Simon Cowell", hints: ["Judge", "Blunt", "Talent"], tags: ["tv", "global"] },
  { name: "Ellen DeGeneres", hints: ["Dance", "Daytime", "Host"], tags: ["tv", "global"] },
  { name: "Jimmy Fallon", hints: ["Games", "Laughing", "Tonight"], tags: ["tv", "global"] },
  { name: "Trevor Noah", hints: ["Accent", "Host", "SouthAfrica"], tags: ["tv", "global"] },
  { name: "Gigi Hadid", hints: ["Runway", "Model", "Blonde"], tags: ["public", "global"] },
  { name: "Bella Hadid", hints: ["Model", "Dark", "Fashion"], tags: ["public", "global"] },
  { name: "Kylie Jenner", hints: ["Cosmetics", "Fame", "Influencer"], tags: ["public", "global"] },
  { name: "Logan Paul", hints: ["Boxing", "YouTube", "Controversy"], tags: ["creators", "global"] },
  { name: "PewDiePie", hints: ["Gaming", "Sweden", "YouTube"], tags: ["creators", "global"] },
  { name: "Marques Brownlee", hints: ["Tech", "Crisp", "Reviewer"], tags: ["creators", "global"] },
  { name: "Casey Neistat", hints: ["Vlog", "Sunglasses", "NewYork"], tags: ["creators", "global"] },
  { name: "Gigi Buffon", hints: ["Keeper", "Italy", "Veteran"], tags: ["sports", "global"] },
  { name: "Luka Modrić", hints: ["Midfield", "Croatia", "Control"], tags: ["sports", "global"] },
  { name: "Andrés Iniesta", hints: ["Quiet", "Midfield", "Silk"], tags: ["sports", "global"] },
  { name: "Xavi", hints: ["Passing", "Brain", "Control"], tags: ["sports", "global"] },
  { name: "Ronda Rousey", hints: ["Armbar", "Pioneer", "Intense"], tags: ["sports", "global"] },
  { name: "Coco Gauff", hints: ["Young", "Fast", "American"], tags: ["sports", "global"] },
  { name: "Carlos Alcaraz", hints: ["Youth", "Spain", "Explosive"], tags: ["sports", "global"] },
  { name: "Lamine Yamal", hints: ["Teen", "LeftFoot", "Wonderkid"], tags: ["sports", "global"] },
  { name: "Jude Bellingham", hints: ["Young", "Midfield", "Mature"], tags: ["sports", "global"] },
  { name: "Erling Haaland", hints: ["Machine", "Tall", "Nordic"], tags: ["sports", "global"] },
  { name: "Mohamed Salah", hints: ["Egypt", "LeftFoot", "Humble"], tags: ["sports", "global"] },
  { name: "Sergio Ramos", hints: ["Aggressive", "Defender", "Hair"], tags: ["sports", "global"] },
  { name: "Manuel Neuer", hints: ["Keeper", "Sweeper", "Germany"], tags: ["sports", "global"] },
  { name: "Iker Casillas", hints: ["Keeper", "Spain", "Calm"], tags: ["sports", "global"] },
  { name: "Alex Morgan", hints: ["Football", "Blonde", "American"], tags: ["sports", "global"] },

  { name: "Yonit Levi", hints: ["podcast", "Unholy", "composed"], tags: ["tv", "israel"] },
  { name: "Danny Kushmaro", hints: ["marathon", "helmet", "breath"], tags: ["tv", "israel"] },
  { name: "Lucy Ayoub", hints: ["poetry", "bilingual", "stage"], tags: ["tv", "israel"] },
  { name: "Lucy Aharish", hints: ["torch", "wedding", "debate"], tags: ["tv", "israel"] },
  { name: "Ofira Asayag", hints: ["duo", "outburst", "storm"], tags: ["tv", "israel"] },
  { name: "Miki Haimovich", hints: ["plastic", "meatless", "green"], tags: ["tv", "israel"] },
  { name: "Geula Even", hints: ["anthem", "ceremony", "poise"], tags: ["tv", "israel"] },
  { name: "Dana Weiss", hints: ["panel", "direct", "interrupt"], tags: ["tv", "israel"] },
  { name: "Hila Korach", hints: ["clinic", "Galileo", "multitask"], tags: ["tv", "israel"] },
  { name: "Tamar Ish-Shalom", hints: ["diplomacy", "foreign", "reserved"], tags: ["tv", "israel"] },
  { name: "Guy Pines", hints: ["scoop", "rumor", "camera"], tags: ["tv", "israel"] },
  { name: "Haim Etgar", hints: ["trap", "victim", "expose"], tags: ["tv", "israel"] },
  { name: "Kobi Meidan", hints: ["books", "conversation", "measured"], tags: ["tv", "israel"] },
  { name: "Assaf Harel", hints: ["late", "podcast", "dry"], tags: ["tv", "israel"] },
  { name: "Eyal Berkovic", hints: ["argument", "shirt", "temper"], tags: ["sports", "israel"] },
  { name: "Guri Alfi", hints: ["roots", "journey", "warmth"], tags: ["tv", "israel"] },
  { name: "Assi Cohen", hints: ["faces", "voice", "switch"], tags: ["tv", "israel"] },
  { name: "Eyal Kitzis", hints: ["satire", "straightman", "smirk"], tags: ["tv", "israel"] },
  { name: "Yuval Semo", hints: ["rubber", "characters", "elastic"], tags: ["tv", "israel"] },
  { name: "Ofer Shechter", hints: ["chaos", "youth", "prank"], tags: ["tv", "israel"] },
  { name: "Adir Miller", hints: ["traffic", "family", "neat"], tags: ["tv", "israel"] },
  { name: "Maya Wertheimer", hints: ["vlog", "ring", "heels"], tags: ["tv", "israel"] },
  { name: "Shira Haas", hints: ["wig", "whisper", "tiny"], tags: ["cinema", "israel"] },
  { name: "Michael Aloni", hints: ["hat", "beard", "gentle"], tags: ["cinema", "israel"] },
  { name: "Tzachi Halevy", hints: ["undercover", "voice", "stubble"], tags: ["cinema", "israel"] },
  { name: "Aki Avni", hints: ["comeback", "passport", "brooding"], tags: ["cinema", "israel"] },
  { name: "Ayelet Zurer", hints: ["therapy", "prestige", "poise"], tags: ["cinema", "israel"] },
  { name: "Sasson Gabai", hints: ["band", "mustache", "silence"], tags: ["cinema", "israel"] },
  { name: "Chaim Topol", hints: ["milk", "village", "legend"], tags: ["cinema", "israel"] },
  { name: "Lior Ashkenazi", hints: ["wedding", "monologue", "intense"], tags: ["cinema", "israel"] },
  { name: "Keren Mor", hints: ["sarcasm", "ensemble", "dry"], tags: ["tv", "israel"] },
  { name: "Rotem Abuhab", hints: ["curly", "chaos", "warm"], tags: ["tv", "israel"] },
  { name: "Shahar Hasson", hints: ["heckler", "chaos", "loud"], tags: ["tv", "israel"] },
  { name: "Idan Raichel", hints: ["project", "dreads", "keys"], tags: ["music", "israel"] },
  { name: "Keren Peles", hints: ["piano", "notebook", "softness"], tags: ["music", "israel"] },
  { name: "Rita", hints: ["Persian", "shawl", "diva"], tags: ["music", "israel"] },
  { name: "Shiri Maimon", hints: ["ballad", "spotlight", "belt"], tags: ["music", "israel"] },
  { name: "Harel Skaat", hints: ["falsetto", "elegant", "spotlight"], tags: ["music", "israel"] },
  { name: "Harel Moyal", hints: ["finale", "soft", "believer"], tags: ["music", "israel"] },
  { name: "Nathan Goshen", hints: ["hoodie", "quiet", "notebook"], tags: ["music", "israel"] },
  { name: "Eden Hason", hints: ["anthem", "sensitive", "crowd"], tags: ["music", "israel"] },
  { name: "Narkis", hints: ["barefoot", "wedding", "faith"], tags: ["music", "israel"] },
  { name: "Mosh Ben Ari", hints: ["desert", "sun", "tribe"], tags: ["music", "israel"] },
  { name: "Eliad Nachum", hints: ["breakdance", "childhood", "hoodie"], tags: ["music", "israel"] },
  { name: "Ran Danker", hints: ["panic", "switch", "spotlight"], tags: ["music", "israel"] },
  { name: "Ravid Plotnik", hints: ["notebook", "beard", "stories"], tags: ["music", "israel"] },
  { name: "Tuna", hints: ["hoodie", "neighborhood", "concrete"], tags: ["music", "israel"] },
  { name: "Akiva", hints: ["guitar", "faith", "smile"], tags: ["music", "israel"] },
  { name: "Nasrin Kadri", hints: ["wedding", "power", "melisma"], tags: ["music", "israel"] },
  { name: "Jasmin Moallem", hints: ["night", "whisper", "attitude"], tags: ["music", "israel"] },
  { name: "Dikla", hints: ["shawl", "raw", "grain"], tags: ["music", "israel"] },
  { name: "Yuval Dayan", hints: ["chair", "raspy", "soul"], tags: ["music", "israel"] },
  { name: "Netta Barzilai", hints: ["loop", "feathers", "quirky"], tags: ["music", "israel"] },
  { name: "Yarden Gerbi", hints: ["tatami", "selfie", "grit"], tags: ["sports", "israel"] },
  { name: "Ori Sasson", hints: ["heavy", "tatami", "grit"], tags: ["sports", "israel"] },
  { name: "Linoy Ashram", hints: ["ribbon", "grace", "focus"], tags: ["sports", "israel"] },
  { name: "Peter Paltchik", hints: ["tattoo", "grip", "pressure"], tags: ["sports", "israel"] },
  { name: "Artem Dolgopyat", hints: ["floor", "twist", "landing"], tags: ["sports", "israel"] },
  { name: "Deni Avdija", hints: ["draft", "lefty", "overseas"], tags: ["sports", "israel"] },
  { name: "Lior Eliyahu", hints: ["hook", "yellow", "silk"], tags: ["sports", "israel"] },
  { name: "Tal Brody", hints: ["map", "speech", "legend"], tags: ["sports", "israel"] },
  { name: "Yael Arad", hints: ["first", "tatami", "trailblazer"], tags: ["sports", "israel"] },
  { name: "Gal Fridman", hints: ["board", "wind", "spray"], tags: ["sports", "israel"] },
  { name: "Yossi Benayoun", hints: ["captain", "dribble", "passport"], tags: ["sports", "israel"] },
  { name: "Titi Aynaw", hints: ["crown", "spotlight", "trailblazer"], tags: ["public", "israel"] }
];

const PLACES_OBJECTS_BANK = [
  { name: "Cinema", hints: ["Screen", "Popcorn", "Dark"], tags: ["places_objects", "global", "place"] },
  { name: "Theater", hints: ["Stage", "Curtain", "Applause"], tags: ["places_objects", "global", "place"] },
  { name: "Bowling Alley", hints: ["Pins", "Lanes", "Strikes"], tags: ["places_objects", "global", "place"] },
  { name: "Arcade", hints: ["Tokens", "Neon", "Buttons"], tags: ["places_objects", "global", "place"] },
  { name: "Escape Room", hints: ["Puzzles", "Locked", "Timer"], tags: ["places_objects", "global", "place"] },
  { name: "Aquarium", hints: ["Glass", "Fish", "Blue"], tags: ["places_objects", "global", "place"] },
  { name: "Zoo", hints: ["Animals", "Paths", "Cages"], tags: ["places_objects", "global", "place"] },
  { name: "Museum", hints: ["Exhibits", "Quiet", "History"], tags: ["places_objects", "global", "place"] },
  { name: "Art Gallery", hints: ["Frames", "Whitewalls", "Curator"], tags: ["places_objects", "global", "place"] },
  { name: "Library", hints: ["Shelves", "Silence", "Borrow"], tags: ["places_objects", "global", "place"] },
  { name: "Bookstore", hints: ["Browse", "Novel", "Receipt"], tags: ["places_objects", "global", "place"] },
  { name: "Coffee Shop", hints: ["Beans", "Steam", "Laptop"], tags: ["places_objects", "global", "place"] },
  { name: "Bakery", hints: ["Bread", "Oven", "Morning"], tags: ["places_objects", "global", "place"] },
  { name: "Restaurant", hints: ["Menu", "Waiter", "Table"], tags: ["places_objects", "global", "place"] },
  { name: "Diner", hints: ["Booth", "Refill", "LateNight"], tags: ["places_objects", "global", "place"] },
  { name: "Bar", hints: ["Glasses", "Music", "Counter"], tags: ["places_objects", "global", "place"] },
  { name: "Rooftop Bar", hints: ["Skyline", "Cocktails", "Night"], tags: ["places_objects", "global", "place"] },
  { name: "Nightclub", hints: ["Bass", "Lights", "Crowd"], tags: ["places_objects", "global", "place"] },
  { name: "Karaoke Room", hints: ["Mic", "Lyrics", "Applause"], tags: ["places_objects", "global", "place"] },
  { name: "Concert Hall", hints: ["Seats", "Orchestra", "Acoustics"], tags: ["places_objects", "global", "place"] },
  { name: "Opera House", hints: ["Balcony", "Aria", "Formal"], tags: ["places_objects", "global", "place"] },
  { name: "Jazz Club", hints: ["Saxophone", "Dim", "Improvisation"], tags: ["places_objects", "global", "place"] },
  { name: "Comedy Club", hints: ["Stage", "Jokes", "Heckle"], tags: ["places_objects", "global", "place"] },
  { name: "Food Court", hints: ["Tray", "Choices", "Mall"], tags: ["places_objects", "global", "place"] },
  { name: "Mall", hints: ["Shops", "Escalator", "Crowd"], tags: ["places_objects", "global", "place"] },
  { name: "Supermarket", hints: ["Cart", "Aisles", "Checkout"], tags: ["places_objects", "global", "place"] },
  { name: "Farmers Market", hints: ["Stalls", "Produce", "Fresh"], tags: ["places_objects", "global", "place"] },
  { name: "Flea Market", hints: ["Bargain", "Vintage", "Stalls"], tags: ["places_objects", "global", "place"] },
  { name: "Amusement Park", hints: ["Rides", "Tickets", "Scream"], tags: ["places_objects", "global", "place"] },
  { name: "Theme Park", hints: ["Mascot", "Queue", "Rollercoaster"], tags: ["places_objects", "global", "place"] },
  { name: "Water Park", hints: ["Slides", "Splash", "Lifeguard"], tags: ["places_objects", "global", "place"] },
  { name: "Roller Rink", hints: ["Wheels", "Music", "Circle"], tags: ["places_objects", "global", "place"] },
  { name: "Ice Rink", hints: ["Skates", "Cold", "Glide"], tags: ["places_objects", "global", "place"] },
  { name: "Gym", hints: ["Weights", "Sweat", "Mirror"], tags: ["places_objects", "global", "place"] },
  { name: "Yoga Studio", hints: ["Mat", "Stretch", "Breath"], tags: ["places_objects", "global", "place"] },
  { name: "Spa", hints: ["Steam", "Towels", "Relax"], tags: ["places_objects", "global", "place"] },
  { name: "Salon", hints: ["Mirror", "Scissors", "Hair"], tags: ["places_objects", "global", "place"] },
  { name: "Barbershop", hints: ["Clipper", "Fade", "Chair"], tags: ["places_objects", "global", "place"] },
  { name: "Tattoo Studio", hints: ["Ink", "Needle", "Stencil"], tags: ["places_objects", "global", "place"] },
  { name: "Barber College", hints: ["Fade", "Practice", "Mirror"], tags: ["places_objects", "global", "place"] },
  { name: "Barbershop Quartet Hall", hints: ["Harmony", "Blazers", "Vintage"], tags: ["places_objects", "global", "place"] },
  { name: "Beach", hints: ["Sand", "Waves", "Sun"], tags: ["places_objects", "global", "place"] },
  { name: "Boardwalk", hints: ["Arcade", "Sea", "Planks"], tags: ["places_objects", "global", "place"] },
  { name: "Promenade", hints: ["Benches", "Sea", "Walk"], tags: ["places_objects", "global", "place"] },
  { name: "Park", hints: ["Grass", "Bench", "Picnic"], tags: ["places_objects", "global", "place"] },
  { name: "Playground", hints: ["Slides", "Swings", "Kids"], tags: ["places_objects", "global", "place"] },
  { name: "Dog Park", hints: ["Leash", "Fence", "Bark"], tags: ["places_objects", "global", "place"] },
  { name: "Botanical Garden", hints: ["Flowers", "Paths", "Greenhouse"], tags: ["places_objects", "global", "place"] },
  { name: "Rose Garden", hints: ["Petals", "Paths", "Fragrant"], tags: ["places_objects", "global", "place"] },
  { name: "Greenhouse", hints: ["Humidity", "Plants", "Glass"], tags: ["places_objects", "global", "place"] },
  { name: "Campground", hints: ["Tent", "Firepit", "Stars"], tags: ["places_objects", "global", "place"] },
  { name: "Campsite", hints: ["Tent", "Lantern", "Dirt"], tags: ["places_objects", "global", "place"] },
  { name: "Picnic Area", hints: ["Blanket", "Basket", "Shade"], tags: ["places_objects", "global", "place"] },
  { name: "Lake", hints: ["Dock", "Still", "Paddle"], tags: ["places_objects", "global", "place"] },
  { name: "Riverbank", hints: ["Current", "Pebbles", "Grass"], tags: ["places_objects", "global", "place"] },
  { name: "Waterfall", hints: ["Mist", "Roar", "Cliff"], tags: ["places_objects", "global", "place"] },
  { name: "Hot Spring", hints: ["Steam", "Mineral", "Soak"], tags: ["places_objects", "global", "place"] },
  { name: "Pool", hints: ["Lanes", "Chlorine", "Diving"], tags: ["places_objects", "global", "place"] },
  { name: "Waterfront", hints: ["Boats", "Breeze", "Pier"], tags: ["places_objects", "global", "place"] },
  { name: "Marina", hints: ["Yachts", "Dock", "Ropes"], tags: ["places_objects", "global", "place"] },
  { name: "Pier", hints: ["Boards", "Sea", "Fishing"], tags: ["places_objects", "global", "place"] },
  { name: "Harbor", hints: ["Ships", "Crane", "Water"], tags: ["places_objects", "global", "place"] },
  { name: "Fishing Dock", hints: ["Bait", "Planks", "Reel"], tags: ["places_objects", "global", "place"] },
  { name: "Boat Ramp", hints: ["Trailer", "Launch", "Lake"], tags: ["places_objects", "global", "place"] },
  { name: "Stadium", hints: ["Crowd", "Seats", "Scoreboard"], tags: ["places_objects", "global", "place"] },
  { name: "Arena", hints: ["Lights", "Rows", "Cheer"], tags: ["places_objects", "global", "place"] },
  { name: "Sports Bar", hints: ["Screens", "Wings", "Cheer"], tags: ["places_objects", "global", "place"] },
  { name: "Baseball Field", hints: ["Diamond", "Dugout", "Bases"], tags: ["places_objects", "global", "place"] },
  { name: "Soccer Field", hints: ["Grass", "Goal", "Whistle"], tags: ["places_objects", "global", "place"] },
  { name: "Basketball Court", hints: ["Hoop", "Dribble", "Bounce"], tags: ["places_objects", "global", "place"] },
  { name: "Tennis Court", hints: ["Net", "Lines", "Serve"], tags: ["places_objects", "global", "place"] },
  { name: "Golf Course", hints: ["Fairway", "Cart", "Green"], tags: ["places_objects", "global", "place"] },
  { name: "Mini Golf", hints: ["Windmill", "Putter", "Obstacle"], tags: ["places_objects", "global", "place"] },
  { name: "Driving Range", hints: ["Buckets", "Tee", "Swing"], tags: ["places_objects", "global", "place"] },
  { name: "Skate Park", hints: ["Ramps", "Deck", "Grind"], tags: ["places_objects", "global", "place"] },
  { name: "Climbing Gym", hints: ["Wall", "Harness", "Grip"], tags: ["places_objects", "global", "place"] },
  { name: "Trampoline Park", hints: ["Bounce", "Foam", "Socks"], tags: ["places_objects", "global", "place"] },
  { name: "Laser Tag Arena", hints: ["Vest", "Fog", "Beam"], tags: ["places_objects", "global", "place"] },
  { name: "Paintball Field", hints: ["Mask", "Splatter", "Bunker"], tags: ["places_objects", "global", "place"] },
  { name: "Go-Kart Track", hints: ["Helmet", "Lap", "Engine"], tags: ["places_objects", "global", "place"] },
  { name: "Race Track", hints: ["Pitlane", "Lap", "Speed"], tags: ["places_objects", "global", "place"] },
  { name: "Bowling Pro Shop", hints: ["Ball", "Grip", "Shine"], tags: ["places_objects", "global", "place"] },
  { name: "Airport", hints: ["Boarding", "Runway", "Passport"], tags: ["places_objects", "global", "place"] },
  { name: "Train Station", hints: ["Platform", "Departure", "Tracks"], tags: ["places_objects", "global", "place"] },
  { name: "Bus Station", hints: ["Tickets", "Luggage", "Route"], tags: ["places_objects", "global", "place"] },
  { name: "Subway Station", hints: ["Turnstile", "Tunnel", "Map"], tags: ["places_objects", "global", "place"] },
  { name: "Taxi Stand", hints: ["Meter", "Curb", "Queue"], tags: ["places_objects", "global", "place"] },
  { name: "Gas Station", hints: ["Pump", "Nozzle", "Snack"], tags: ["places_objects", "global", "place"] },
  { name: "Car Wash", hints: ["Foam", "Tunnel", "Shine"], tags: ["places_objects", "global", "place"] },
  { name: "Parking Garage", hints: ["Levels", "Concrete", "Ticket"], tags: ["places_objects", "global", "place"] },
  { name: "Key", hints: ["Metal", "Unlock", "Pocket"], tags: ["places_objects", "global", "object"] },
  { name: "Padlock", hints: ["Shackle", "Click", "Secure"], tags: ["places_objects", "global", "object"] },
  { name: "Door Handle", hints: ["Turn", "Metal", "Entrance"], tags: ["places_objects", "global", "object"] },
  { name: "Flashlight", hints: ["Beam", "Battery", "Dark"], tags: ["places_objects", "global", "object"] },
  { name: "Lantern", hints: ["Glow", "Handle", "Camp"], tags: ["places_objects", "global", "object"] },
  { name: "Candle", hints: ["Wax", "Flame", "Melt"], tags: ["places_objects", "global", "object"] },
  { name: "Matchbox", hints: ["Strike", "Tiny", "Flame"], tags: ["places_objects", "global", "object"] },
  { name: "Lighter", hints: ["Flint", "Flame", "Pocket"], tags: ["places_objects", "global", "object"] },
  { name: "Compass", hints: ["North", "Needle", "Travel"], tags: ["places_objects", "global", "object"] },
  { name: "Map", hints: ["Fold", "Route", "Paper"], tags: ["places_objects", "global", "object"] },
  { name: "Binoculars", hints: ["Zoom", "Strap", "Distance"], tags: ["places_objects", "global", "object"] },
  { name: "Camera", hints: ["Lens", "Capture", "Click"], tags: ["places_objects", "global", "object"] },
  { name: "Tripod", hints: ["Legs", "Stable", "Camera"], tags: ["places_objects", "global", "object"] },
  { name: "Microphone", hints: ["Voice", "Stage", "Cable"], tags: ["places_objects", "global", "object"] },
  { name: "Speaker", hints: ["Bass", "Volume", "Sound"], tags: ["places_objects", "global", "object"] },
  { name: "Headphones", hints: ["Ears", "Music", "Cushion"], tags: ["places_objects", "global", "object"] },
  { name: "Earbuds", hints: ["Pocket", "Wireless", "Case"], tags: ["places_objects", "global", "object"] },
  { name: "Laptop", hints: ["Keyboard", "Screen", "Portable"], tags: ["places_objects", "global", "object"] },
  { name: "Tablet", hints: ["Touch", "Screen", "Slim"], tags: ["places_objects", "global", "object"] },
  { name: "Phone", hints: ["Pocket", "Apps", "Vibrate"], tags: ["places_objects", "global", "object"] },
  { name: "Remote Control", hints: ["Buttons", "Couch", "Channel"], tags: ["places_objects", "global", "object"] },
  { name: "Controller", hints: ["Buttons", "Joystick", "Console"], tags: ["places_objects", "global", "object"] },
  { name: "Keyboard", hints: ["Keys", "Typing", "Desk"], tags: ["places_objects", "global", "object"] },
  { name: "Mouse", hints: ["Cursor", "Click", "Desk"], tags: ["places_objects", "global", "object"] },
  { name: "Watch", hints: ["Wrist", "Time", "Tick"], tags: ["places_objects", "global", "object"] },
  { name: "Alarm Clock", hints: ["Beep", "Morning", "Numbers"], tags: ["places_objects", "global", "object"] },
  { name: "Hourglass", hints: ["Sand", "Flip", "Time"], tags: ["places_objects", "global", "object"] },
  { name: "Notebook", hints: ["Pages", "Spiral", "Notes"], tags: ["places_objects", "global", "object"] },
  { name: "Journal", hints: ["Pages", "Thoughts", "Private"], tags: ["places_objects", "global", "object"] },
  { name: "Bookmark", hints: ["Page", "Ribbon", "Novel"], tags: ["places_objects", "global", "object"] },
  { name: "Pen", hints: ["Ink", "Click", "Pocket"], tags: ["places_objects", "global", "object"] },
  { name: "Pencil", hints: ["Graphite", "Eraser", "Sketch"], tags: ["places_objects", "global", "object"] },
  { name: "Marker", hints: ["Cap", "Bold", "Color"], tags: ["places_objects", "global", "object"] },
  { name: "Paintbrush", hints: ["Bristles", "Paint", "Stroke"], tags: ["places_objects", "global", "object"] },
  { name: "Palette", hints: ["Paint", "Thumbhole", "Mix"], tags: ["places_objects", "global", "object"] },
  { name: "Scissors", hints: ["Blades", "Cut", "Handle"], tags: ["places_objects", "global", "object"] },
  { name: "Knife", hints: ["Sharp", "Blade", "Slice"], tags: ["places_objects", "global", "object"] },
  { name: "Fork", hints: ["Tines", "Dinner", "Metal"], tags: ["places_objects", "global", "object"] },
  { name: "Spoon", hints: ["Bowl", "Soup", "Metal"], tags: ["places_objects", "global", "object"] },
  { name: "Plate", hints: ["Round", "Meal", "Ceramic"], tags: ["places_objects", "global", "object"] },
  { name: "Mug", hints: ["Handle", "Steam", "Sip"], tags: ["places_objects", "global", "object"] },
  { name: "Wine Glass", hints: ["Stem", "Fragile", "Toast"], tags: ["places_objects", "global", "object"] },
  { name: "Bottle", hints: ["Cap", "Liquid", "Portable"], tags: ["places_objects", "global", "object"] },
  { name: "Thermos", hints: ["Insulated", "Hot", "Travel"], tags: ["places_objects", "global", "object"] },
  { name: "Umbrella", hints: ["Rain", "Canopy", "Fold"], tags: ["places_objects", "global", "object"] },
  { name: "Backpack", hints: ["Straps", "Zipper", "Carry"], tags: ["places_objects", "global", "object"] },
  { name: "Suitcase", hints: ["Wheels", "Travel", "Handle"], tags: ["places_objects", "global", "object"] },
  { name: "Wallet", hints: ["Cash", "Cards", "Pocket"], tags: ["places_objects", "global", "object"] },
  { name: "Coin", hints: ["Round", "Metal", "Change"], tags: ["places_objects", "global", "object"] },
  { name: "Ring", hints: ["Finger", "Shine", "Circle"], tags: ["places_objects", "global", "object"] },
  { name: "Necklace", hints: ["Chain", "Pendant", "Neck"], tags: ["places_objects", "global", "object"] },
  { name: "Bracelet", hints: ["Wrist", "Clasp", "Jewelry"], tags: ["places_objects", "global", "object"] },
  { name: "Sunglasses", hints: ["Tinted", "Summer", "Eyes"], tags: ["places_objects", "global", "object"] },
  { name: "Glasses", hints: ["Frames", "Lenses", "Face"], tags: ["places_objects", "global", "object"] },
  { name: "Hat", hints: ["Brim", "Head", "Shade"], tags: ["places_objects", "global", "object"] },
  { name: "Scarf", hints: ["Neck", "Warm", "Wrap"], tags: ["places_objects", "global", "object"] },
  { name: "Gloves", hints: ["Hands", "Warm", "Pairs"], tags: ["places_objects", "global", "object"] },
  { name: "Boots", hints: ["Laces", "Heavy", "Mud"], tags: ["places_objects", "global", "object"] },
  { name: "Sneakers", hints: ["Laces", "Rubber", "Run"], tags: ["places_objects", "global", "object"] },
  { name: "Helmet", hints: ["Head", "Protect", "Strap"], tags: ["places_objects", "global", "object"] },
  { name: "Mask", hints: ["Cover", "Face", "Elastic"], tags: ["places_objects", "global", "object"] },
  { name: "Hammer", hints: ["Nail", "Swing", "Tool"], tags: ["places_objects", "global", "object"] },
  { name: "Saw", hints: ["Teeth", "Cut", "Workshop"], tags: ["places_objects", "global", "object"] },
  { name: "Wrench", hints: ["Bolt", "Grip", "Tool"], tags: ["places_objects", "global", "object"] },
  { name: "Screwdriver", hints: ["Twist", "Screw", "Tool"], tags: ["places_objects", "global", "object"] },
  { name: "Drill", hints: ["Bit", "Power", "Hole"], tags: ["places_objects", "global", "object"] },
  { name: "Pliers", hints: ["Grip", "Pinch", "Tool"], tags: ["places_objects", "global", "object"] },
  { name: "Tape Measure", hints: ["Retract", "Length", "Tool"], tags: ["places_objects", "global", "object"] },
  { name: "Level", hints: ["Bubble", "Straight", "Tool"], tags: ["places_objects", "global", "object"] },
  { name: "Ladder", hints: ["Rungs", "Climb", "Tall"], tags: ["places_objects", "global", "object"] },
  { name: "Rope", hints: ["Knot", "Coil", "Pull"], tags: ["places_objects", "global", "object"] },
  { name: "Chain", hints: ["Links", "Metal", "Heavy"], tags: ["places_objects", "global", "object"] },
  { name: "Bucket", hints: ["Handle", "Carry", "Pail"], tags: ["places_objects", "global", "object"] },
  { name: "Shovel", hints: ["Dig", "Handle", "Dirt"], tags: ["places_objects", "global", "object"] },
  { name: "Rake", hints: ["Yard", "Teeth", "Leaves"], tags: ["places_objects", "global", "object"] },
  { name: "Broom", hints: ["Sweep", "Bristles", "Dust"], tags: ["places_objects", "global", "object"] },
  { name: "Mop", hints: ["Wet", "Floor", "Clean"], tags: ["places_objects", "global", "object"] },
  { name: "Vacuum", hints: ["Cord", "Suction", "Clean"], tags: ["places_objects", "global", "object"] },
  { name: "Detergent Bottle", hints: ["Soap", "Laundry", "Cap"], tags: ["places_objects", "global", "object"] },
  { name: "Soap Bar", hints: ["Foam", "Smooth", "Clean"], tags: ["places_objects", "global", "object"] },
  { name: "Towel", hints: ["Dry", "Cotton", "Bathroom"], tags: ["places_objects", "global", "object"] },
  { name: "Pillow", hints: ["Soft", "Sleep", "Bed"], tags: ["places_objects", "global", "object"] },
  { name: "Blanket", hints: ["Warm", "Fold", "Cozy"], tags: ["places_objects", "global", "object"] },
  { name: "Mattress", hints: ["Bed", "Spring", "Sleep"], tags: ["places_objects", "global", "object"] },
  { name: "Chair", hints: ["Seat", "Legs", "Sit"], tags: ["places_objects", "global", "object"] },
  { name: "Stool", hints: ["Seat", "NoBack", "Round"], tags: ["places_objects", "global", "object"] },
  { name: "Bench", hints: ["Long", "Sit", "Park"], tags: ["places_objects", "global", "object"] },
  { name: "Table", hints: ["Flat", "Legs", "Surface"], tags: ["places_objects", "global", "object"] },
  { name: "Mirror", hints: ["Reflection", "Glass", "Wall"], tags: ["places_objects", "global", "object"] },
  { name: "Frame", hints: ["Photo", "Border", "Wall"], tags: ["places_objects", "global", "object"] },
];

const THEME_OPTIONS = [
  { value: "characters", label: "Characters" },
  { value: "places_objects", label: "Places & Objects" },
];

const CHARACTER_POOL_OPTIONS = [
  { value: "all", label: "All" },
  { value: "global", label: "Global" },
  { value: "israel", label: "Israel" },
];

const PLACES_OBJECTS_POOL_OPTIONS = [
  { value: "all", label: "All" },
  { value: "place", label: "Places" },
  { value: "object", label: "Objects" },
];

const DIFFICULTY_OPTIONS = [
  { value: "none", label: "No hint" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const PLAYER_CARD_COLORS = [
  "linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)",
  "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
  "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)",
  "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
  "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
];

const NO_SELECTION_STYLE = {
  userSelect: "none",
  WebkitUserSelect: "none",
  WebkitTouchCallout: "none",
  WebkitTapHighlightColor: "transparent",
};

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getActiveBank(theme) {
  if (theme === "places_objects") return PLACES_OBJECTS_BANK;
  return CHARACTER_BANK;
}

function filterItems(theme, pool) {
  const bank = getActiveBank(theme);
  if (pool === "all") return bank;
  return bank.filter((item) => item.tags.includes(pool));
}

function getPoolKey(theme = "characters", pool = "all") {
  if (theme === "characters") return pool;
  if (theme === "places_objects") return pool;
  return "all";
}

function getRoomKey(roomName, theme = "characters", pool = "all") {
  const normalized = roomName.trim().toLowerCase().replace(/\s+/g, "-");
  const poolKey = getPoolKey(theme, pool);
  return normalized ? `impostor-room-${theme}-${poolKey}-${normalized}` : "";
}

function loadRoomHistory(roomName, theme = "characters", pool = "all") {
  if (typeof window === "undefined") return [];
  const key = getRoomKey(roomName, theme, pool);
  if (!key) return [];

  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveRoomHistory(roomName, theme = "characters", pool = "all", usedCharacters) {
  if (typeof window === "undefined") return;
  const key = getRoomKey(roomName, theme, pool);
  if (!key) return;
  window.localStorage.setItem(key, JSON.stringify(usedCharacters));
}

function clearRoomHistory(roomName, theme = "characters", pool = "all") {
  if (typeof window === "undefined") return;
  const key = getRoomKey(roomName, theme, pool);
  if (!key) return;
  window.localStorage.removeItem(key);
}

function getHintByDifficulty(hints, difficulty) {
  if (difficulty === "none") return "";
  if (!Array.isArray(hints) || hints.length === 0) return "";
  if (difficulty === "easy") return hints[0] ?? hints[1] ?? hints[2] ?? "";
  if (difficulty === "medium") return hints[1] ?? hints[0] ?? hints[2] ?? "";
  return hints[2] ?? hints[1] ?? hints[0] ?? "";
}


function createImpostorCountMap(players, existingCounts = {}) {
  const next = {};
  players.forEach((player) => {
    next[player] = existingCounts[player] ?? 0;
  });
  return next;
}

function getRecencyPenalty(gap, playerCount) {
  if (gap < 0) return 1;

  if (playerCount <= 4) {
    if (gap === 0) return 0.25;
    if (gap === 1) return 0.55;
    if (gap === 2) return 0.8;
    return 1;
  }

  if (playerCount <= 7) {
    if (gap === 0) return 0.35;
    if (gap === 1) return 0.6;
    if (gap === 2) return 0.8;
    return 1;
  }

  if (gap === 0) return 0.45;
  if (gap === 1) return 0.7;
  if (gap === 2) return 0.85;
  return 1;
}

function pickWeightedPlayer(weightedPlayers) {
  const totalWeight = weightedPlayers.reduce((sum, item) => sum + item.weight, 0);
  if (totalWeight <= 0) {
    return pickRandom(weightedPlayers).player;
  }

  let threshold = Math.random() * totalWeight;
  for (const item of weightedPlayers) {
    threshold -= item.weight;
    if (threshold <= 0) return item.player;
  }

  return weightedPlayers[weightedPlayers.length - 1].player;
}

function pickBalancedImpostor(players, counts = {}, history = []) {
  if (!Array.isArray(players) || players.length === 0) return null;

  const normalizedCounts = createImpostorCountMap(players, counts);
  const minCount = Math.min(...players.map((player) => normalizedCounts[player] ?? 0));

  const weightedPlayers = players.map((player) => {
    const playerCount = normalizedCounts[player] ?? 0;
    const countWeight = Math.pow(0.65, playerCount - minCount);
    const historyIndex = history.indexOf(player);
    const recencyWeight = getRecencyPenalty(historyIndex, players.length);

    return {
      player,
      weight: countWeight * recencyWeight,
    };
  });

  return pickWeightedPlayer(weightedPlayers);
}


function buildRound(players, settings, usedCharacters, impostorMeta = {}, useBalancedImpostor = false) {
  const pool = filterItems(settings.theme, settings.pool);
  const usedSet = new Set(usedCharacters);
  const freshPool = pool.filter((item) => !usedSet.has(item.name));
  const selectionPool = freshPool.length > 0 ? freshPool : pool;
  const selectedCharacter = pickRandom(selectionPool);
  const selectedHint = getHintByDifficulty(selectedCharacter.hints, settings.difficulty);

  const nextImpostorPlayer = useBalancedImpostor
    ? pickBalancedImpostor(players, impostorMeta.counts ?? {}, impostorMeta.history ?? [])
    : pickRandom(players);

  const assignments = shuffle(
    players.map((player) => ({
      player,
      isImpostor: player === nextImpostorPlayer,
      word: player === nextImpostorPlayer ? "Impostor" : selectedCharacter.name,
      hint: selectedHint,
    }))
  );

  const nextImpostorCounts = createImpostorCountMap(players, impostorMeta.counts ?? {});
  if (nextImpostorPlayer) {
    nextImpostorCounts[nextImpostorPlayer] = (nextImpostorCounts[nextImpostorPlayer] ?? 0) + 1;
  }

  const historyLimit = Math.max(6, players.length * 2);
  const nextImpostorHistory = nextImpostorPlayer
    ? [nextImpostorPlayer, ...(impostorMeta.history ?? [])].slice(0, historyLimit)
    : [...(impostorMeta.history ?? [])].slice(0, historyLimit);

  return {
    character: selectedCharacter,
    selectedHint,
    assignments,
    impostorPlayer: nextImpostorPlayer,
    nextImpostorCounts,
    nextImpostorHistory,
  };
}

function createScoreMap(players, existingScores = {}) {
  const next = {};
  players.forEach((player) => {
    next[player] = existingScores[player] ?? 0;
  });
  return next;
}

function MetricCard({ label, value, accent, isMobile }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.78)",
        borderRadius: 20,
        padding: isMobile ? 14 : 18,
        border: "1px solid rgba(255,255,255,0.65)",
        boxShadow: "0 10px 24px rgba(32, 36, 80, 0.08)",
      }}
    >
      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: isMobile ? 18 : 24, fontWeight: 800, color: accent || "#111827" }}>
        {value}
      </div>
    </div>
  );
}

function PillButton({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "11px 16px",
        borderRadius: 999,
        border: active ? "1px solid transparent" : "1px solid rgba(116, 125, 155, 0.28)",
        background: active ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" : "rgba(255,255,255,0.72)",
        color: active ? "white" : "#172554",
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: active ? "0 10px 22px rgba(79, 70, 229, 0.28)" : "none",
      }}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [players, setPlayers] = useState(["Alon", "Dana", "Yossi", "Maya"]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [settings, setSettings] = useState({
    theme: "characters",
    pool: "all",
    difficulty: "medium",
    impostorGetsHint: true,
  });
  const [usedCharacters, setUsedCharacters] = useState([]);
  const [round, setRound] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showFinalRevealScreen, setShowFinalRevealScreen] = useState(false);
  const [showFinalResults, setShowFinalResults] = useState(false);
  const [competitionMode, setCompetitionMode] = useState(false);
  const [balancedImpostorMode, setBalancedImpostorMode] = useState(false);
  const [impostorCounts, setImpostorCounts] = useState(() => createImpostorCountMap(["Alon", "Dana", "Yossi", "Maya"]));
  const [impostorHistory, setImpostorHistory] = useState([]);
  const [scores, setScores] = useState(() => createScoreMap(["Alon", "Dana", "Yossi", "Maya"]));
  const [roundScored, setRoundScored] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const isMobile = windowWidth < 768;
  const currentAssignment = round?.assignments?.[currentIndex] ?? null;
  const canStart = players.length >= 3;
  const roomPoolCount = useMemo(
    () => filterItems(settings.theme, settings.pool).length,
    [settings.theme, settings.pool]
  );
  const themeLabel = settings.theme === "places_objects" ? "Places & Objects" : "Characters";
  const activePoolLabel =
    settings.theme === "characters"
      ? CHARACTER_POOL_OPTIONS.find((option) => option.value === settings.pool)?.label ?? "All"
      : PLACES_OBJECTS_POOL_OPTIONS.find((option) => option.value === settings.pool)?.label ?? "All";
  const pageTitle = settings.theme === "places_objects" ? "Impostor: Places & Objects" : "Impostor: Famous People";
  const pageSubtitle =
    settings.theme === "places_objects"
      ? "One-word English hints, a clean theme selector, separate pools for places or objects, and room memory per pool."
      : "One-word English hints, adjustable difficulty, editable player names, room memory, and optional competition mode.";


  const sortedScores = useMemo(() => {
    return Object.entries(scores).sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    });
  }, [scores]);

  useEffect(() => {
    setUsedCharacters(loadRoomHistory(roomName, settings.theme, settings.pool));
  }, [roomName, settings.theme, settings.pool]);

  useEffect(() => {
    setScores((prev) => createScoreMap(players, prev));
  }, [players]);

  useEffect(() => {
    setImpostorCounts((prev) => createImpostorCountMap(players, prev));
    setImpostorHistory((prev) => prev.filter((player) => players.includes(player)));
  }, [players]);

  useEffect(() => {
    setRound(null);
    setCurrentIndex(0);
    setRevealed(false);
    setShowFinalRevealScreen(false);
    setShowFinalResults(false);
    setRoundScored(false);
  }, [settings.theme]);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function addPlayer() {
    const trimmed = playerName.trim();
    if (!trimmed) return;
    if (players.includes(trimmed)) return;
    setPlayers((prev) => [...prev, trimmed]);
    setPlayerName("");
  }

  function removePlayer(name) {
    setPlayers((prev) => prev.filter((player) => player !== name));
    setScores((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function beginEditPlayer(index) {
    setEditingIndex(index);
    setEditingValue(players[index]);
  }

  function saveEditPlayer() {
    const trimmed = editingValue.trim();
    if (!trimmed) {
      setEditingIndex(null);
      setEditingValue("");
      return;
    }

    const oldName = players[editingIndex];
    const duplicateExists = players.some((player, index) => index !== editingIndex && player === trimmed);
    if (duplicateExists) {
      setEditingIndex(null);
      setEditingValue("");
      return;
    }

    const nextPlayers = players.map((player, index) => (index === editingIndex ? trimmed : player));

    setPlayers(nextPlayers);

    setScores((prev) => {
      const next = { ...prev };
      const oldScore = next[oldName] ?? 0;
      delete next[oldName];
      next[trimmed] = oldScore;
      return createScoreMap(nextPlayers, next);
    });

    setEditingIndex(null);
    setEditingValue("");
  }

  function startRound() {
    if (!canStart) return;
    if (competitionMode && showFinalResults && !roundScored) return;

    const nextRound = buildRound(
      players,
      settings,
      usedCharacters,
      { counts: impostorCounts, history: impostorHistory },
      balancedImpostorMode
    );
    setRound(nextRound);
    setCurrentIndex(0);
    setRevealed(false);
    setShowFinalRevealScreen(false);
    setShowFinalResults(false);
    setRoundScored(false);
    setImpostorCounts(nextRound.nextImpostorCounts);
    setImpostorHistory(nextRound.nextImpostorHistory);

    const nextUsed = [...usedCharacters, nextRound.character.name];
    setUsedCharacters(nextUsed);
    if (roomName.trim()) {
      saveRoomHistory(roomName, settings.theme, settings.pool, nextUsed);
    }
  }

  function skipRound() {
    if (!canStart) return;
    if (!round) return;

    const nextRound = buildRound(
      players,
      settings,
      usedCharacters,
      { counts: impostorCounts, history: impostorHistory },
      balancedImpostorMode
    );
    setRound(nextRound);
    setCurrentIndex(0);
    setRevealed(false);
    setShowFinalRevealScreen(false);
    setShowFinalResults(false);
    setRoundScored(false);
    setImpostorCounts(nextRound.nextImpostorCounts);
    setImpostorHistory(nextRound.nextImpostorHistory);

    const nextUsed = [...usedCharacters, nextRound.character.name];
    setUsedCharacters(nextUsed);
    if (roomName.trim()) {
      saveRoomHistory(roomName, settings.theme, settings.pool, nextUsed);
    }
  }

  function nextPlayer() {
    if (!round) return;

    if (currentIndex < round.assignments.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setRevealed(false);
      return;
    }

    setShowFinalRevealScreen(true);
    setRevealed(false);
  }


  function resetRoomMemory() {
    setUsedCharacters([]);
    setImpostorCounts(createImpostorCountMap(players));
    setImpostorHistory([]);
    clearRoomHistory(roomName, settings.theme, settings.pool);
  }

  function resetScores() {
    setScores(createScoreMap(players));
    setImpostorCounts(createImpostorCountMap(players));
    setImpostorHistory([]);
    setRoundScored(false);
  }

  function beginHold() {
    setRevealed(true);
  }

  function endHold() {
    setRevealed(false);
  }

  function toggleCompetitionMode() {
    setCompetitionMode((prev) => {
      const nextMode = !prev;
      if (!prev) {
        setScores((existing) => createScoreMap(players, existing));
      }
      return nextMode;
    });
  }

  function toggleBalancedImpostorMode() {
    setBalancedImpostorMode((prev) => !prev);
  }

  function awardImpostorWin() {
    if (!round || roundScored) return;
    const impostorPlayer = round.assignments.find((assignment) => assignment.isImpostor)?.player;
    if (!impostorPlayer) return;

    setScores((prev) => ({
      ...prev,
      [impostorPlayer]: (prev[impostorPlayer] ?? 0) + 3,
    }));
    setRoundScored(true);
  }

  function awardCrewWin() {
    if (!round || roundScored) return;
    const impostorPlayer = round.assignments.find((assignment) => assignment.isImpostor)?.player;
    if (!impostorPlayer) return;

    setScores((prev) => {
      const next = { ...prev };
      players.forEach((player) => {
        if (player !== impostorPlayer) {
          next[player] = (next[player] ?? 0) + 1;
        }
      });
      return next;
    });
    setRoundScored(true);
  }

  const finished = round && showFinalResults;
  const playerCardColor =
    currentAssignment && currentIndex < round?.assignments?.length
      ? PLAYER_CARD_COLORS[currentIndex % PLAYER_CARD_COLORS.length]
      : PLAYER_CARD_COLORS[0];

  const impostorPlayer = round?.assignments?.find((assignment) => assignment.isImpostor)?.player ?? null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(168, 85, 247, 0.65), transparent 25%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.55), transparent 25%), linear-gradient(135deg, #eef2ff 0%, #f5f3ff 35%, #eff6ff 100%)",
        fontFamily: "Inter, Arial, sans-serif",
        color: "#111827",
        padding: isMobile ? 12 : 24,
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.12fr 0.88fr",
          gap: isMobile ? 16 : 24,
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.68)",
            backdropFilter: "blur(16px)",
            borderRadius: isMobile ? 22 : 30,
            padding: isMobile ? 18 : 28,
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 18px 40px rgba(76, 29, 149, 0.14)",
          }}
        >
          <div
            style={{
              fontSize: isMobile ? 28 : 36,
              fontWeight: 900,
              marginBottom: 10,
              color: "#172554",
              lineHeight: 1.05,
              textAlign: "center",
            }}
          >
            {pageTitle}
          </div>

          <div
            style={{
              color: "#475569",
              marginBottom: 28,
              fontSize: isMobile ? 15 : 17,
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            {pageSubtitle}
          </div>

          <div style={{ display: "grid", gap: 16, marginBottom: 26 }}>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700, color: "#172554", textAlign: "center" }}>Room name</span>
              <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Friday Group"
                style={{
                  padding: 14,
                  borderRadius: 18,
                  border: "1px solid rgba(99, 102, 241, 0.18)",
                  background: "rgba(255,255,255,0.82)",
                  fontSize: 16,
                  outline: "none",
                }}
              />
            </label>

            <div style={{ display: "grid", gap: 10 }}>
              <span style={{ fontWeight: 700, color: "#172554", textAlign: "center" }}>Game theme</span>
              <select
                value={settings.theme}
                onChange={(e) => setSettings((prev) => ({ ...prev, theme: e.target.value }))}
                style={{
                  padding: 14,
                  borderRadius: 18,
                  border: "1px solid rgba(99, 102, 241, 0.18)",
                  background: "rgba(255,255,255,0.82)",
                  fontSize: 16,
                  outline: "none",
                  color: "#172554",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {THEME_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {settings.theme === "characters" ? (
              <div style={{ display: "grid", gap: 10 }}>
                <span style={{ fontWeight: 700, color: "#172554", textAlign: "center" }}>Character pool</span>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                  {CHARACTER_POOL_OPTIONS.map((option) => (
                    <PillButton
                      key={option.value}
                      active={settings.pool === option.value}
                      onClick={() => setSettings((prev) => ({ ...prev, pool: option.value }))}
                    >
                      {option.label}
                    </PillButton>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                <span style={{ fontWeight: 700, color: "#172554", textAlign: "center" }}>Places & Objects pool</span>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                  {PLACES_OBJECTS_POOL_OPTIONS.map((option) => (
                    <PillButton
                      key={option.value}
                      active={settings.pool === option.value}
                      onClick={() => setSettings((prev) => ({ ...prev, pool: option.value }))}
                    >
                      {option.label}
                    </PillButton>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "grid", gap: 10 }}>
              <span style={{ fontWeight: 700, color: "#172554", textAlign: "center" }}>Hint difficulty</span>
              <select
                value={settings.difficulty}
                onChange={(e) => setSettings((prev) => ({ ...prev, difficulty: e.target.value }))}
                style={{
                  padding: 14,
                  borderRadius: 18,
                  border: "1px solid rgba(99, 102, 241, 0.18)",
                  background: "rgba(255,255,255,0.82)",
                  fontSize: 16,
                  outline: "none",
                  color: "#172554",
                  fontWeight: 700,
                }}
              >
                {DIFFICULTY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <span style={{ fontWeight: 700, color: "#172554", textAlign: "center" }}>Competition mode</span>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                <PillButton active={competitionMode} onClick={toggleCompetitionMode}>
                  {competitionMode ? "Competition ON" : "Competition OFF"}
                </PillButton>

                <button
                  onClick={toggleBalancedImpostorMode}
                  style={{
                    padding: "11px 14px",
                    borderRadius: 999,
                    border: balancedImpostorMode
                      ? "1px solid transparent"
                      : "1px solid rgba(116, 125, 155, 0.28)",
                    background: balancedImpostorMode
                      ? "linear-gradient(135deg, #0f766e 0%, #0ea5e9 100%)"
                      : "rgba(255,255,255,0.72)",
                    color: balancedImpostorMode ? "white" : "#172554",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: balancedImpostorMode ? "0 10px 22px rgba(14, 165, 233, 0.22)" : "none",
                    whiteSpace: "nowrap",
                  }}
                  title="Reduce repeat impostors without removing randomness"
                >
                  {balancedImpostorMode ? "Balanced impostor" : "Impostor random"}
                </button>

                {competitionMode && (
                  <button
                    onClick={resetScores}
                    style={{
                      padding: "11px 16px",
                      borderRadius: 999,
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                      background: "rgba(255,255,255,0.72)",
                      color: "#b91c1c",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    Reset scores
                  </button>
                )}
              </div>
            </div>

            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700, color: "#172554", textAlign: "center" }}>Add player</span>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
                  gap: 12,
                }}
              >
                <input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addPlayer()}
                  placeholder="Player name"
                  style={{
                    width: "100%",
                    padding: 14,
                    borderRadius: 18,
                    border: "1px solid rgba(99, 102, 241, 0.18)",
                    background: "rgba(255,255,255,0.82)",
                    fontSize: 16,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  onClick={addPlayer}
                  style={{
                    width: isMobile ? "100%" : "auto",
                    padding: "14px 20px",
                    borderRadius: 18,
                    border: 0,
                    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: 800,
                    boxShadow: "0 12px 24px rgba(79, 70, 229, 0.28)",
                  }}
                >
                  Add
                </button>
              </div>
            </label>
          </div>

          <div style={{ marginBottom: 26 }}>
            <div
              style={{
                fontWeight: 800,
                marginBottom: 12,
                color: "#172554",
                fontSize: isMobile ? 18 : 20,
                textAlign: "center",
              }}
            >
              Players ({players.length})
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {players.map((player, index) => (
                <div
                  key={`${player}-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "rgba(255,255,255,0.82)",
                    borderRadius: 999,
                    padding: "10px 14px",
                    border: "1px solid rgba(99, 102, 241, 0.14)",
                    boxShadow: "0 8px 18px rgba(99, 102, 241, 0.08)",
                  }}
                >
                  {editingIndex === index ? (
                    <input
                      autoFocus
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      onBlur={saveEditPlayer}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEditPlayer();
                        if (e.key === "Escape") {
                          setEditingIndex(null);
                          setEditingValue("");
                        }
                      }}
                      style={{
                        border: 0,
                        outline: "none",
                        background: "transparent",
                        fontSize: 17,
                        minWidth: 70,
                        color: "#111827",
                      }}
                    />
                  ) : (
                    <button
                      onClick={() => beginEditPlayer(index)}
                      style={{
                        border: 0,
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: 17,
                        color: "#111827",
                      }}
                      title="Click to edit"
                    >
                      {player}
                    </button>
                  )}
                  <button
                    onClick={() => removePlayer(player)}
                    style={{
                      border: 0,
                      background: "transparent",
                      cursor: "pointer",
                      color: "#64748b",
                      fontWeight: 800,
                      fontSize: 16,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 10, color: "#64748b", fontSize: 14, textAlign: "center" }}>
              Click a player name to edit it.
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
              gap: 14,
              marginBottom: 26,
            }}
          >
            <MetricCard label="Items in pool" value={roomPoolCount} accent="#4f46e5" isMobile={isMobile} />
            <MetricCard label="Used in this pool" value={usedCharacters.length} accent="#7c3aed" isMobile={isMobile} />
            <MetricCard
              label="Hint style"
              value={settings.difficulty === "none" ? "No hint" : settings.difficulty.charAt(0).toUpperCase() + settings.difficulty.slice(1)}
              accent="#ea580c"
              isMobile={isMobile}
            />
          </div>

          {competitionMode && (
            <div
              style={{
                marginBottom: 26,
                background: "rgba(255,255,255,0.8)",
                borderRadius: 22,
                padding: 18,
                border: "1px solid rgba(99, 102, 241, 0.14)",
              }}
            >
              <div
                style={{
                  fontWeight: 800,
                  marginBottom: 12,
                  color: "#172554",
                  fontSize: isMobile ? 18 : 20,
                  textAlign: "center",
                }}
              >
                Scoreboard
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                {sortedScores.map(([name, points], index) => (
                  <div
                    key={name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: index === 0 ? "rgba(79,70,229,0.08)" : "rgba(255,255,255,0.65)",
                      borderRadius: 16,
                      padding: "12px 14px",
                      border: "1px solid rgba(99, 102, 241, 0.1)",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: "#172554" }}>{name}</div>
                    <div style={{ fontWeight: 900, color: "#4f46e5" }}>{points}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            <button
              onClick={startRound}
              disabled={!canStart || (competitionMode && showFinalResults && !roundScored)}
              style={{
                padding: "14px 22px",
                borderRadius: 18,
                border: 0,
                background:
                  !canStart || (competitionMode && showFinalResults && !roundScored)
                    ? "#9ca3af"
                    : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                color: "white",
                cursor:
                  !canStart || (competitionMode && showFinalResults && !roundScored)
                    ? "not-allowed"
                    : "pointer",
                fontWeight: 800,
                boxShadow:
                  !canStart || (competitionMode && showFinalResults && !roundScored)
                    ? "none"
                    : "0 12px 24px rgba(79, 70, 229, 0.25)",
              }}
            >
              Start round
            </button>

            <button
              onClick={skipRound}
              disabled={!round}
              style={{
                padding: "14px 22px",
                borderRadius: 18,
                border: 0,
                background: !round ? "#9ca3af" : "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)",
                color: "white",
                cursor: !round ? "not-allowed" : "pointer",
                fontWeight: 800,
                boxShadow: !round ? "none" : "0 12px 24px rgba(14, 165, 233, 0.22)",
              }}
            >
              Skip round
            </button>

            <button
              onClick={resetRoomMemory}
              style={{
                padding: "14px 22px",
                borderRadius: 18,
                border: 0,
                background: "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)",
                color: "white",
                cursor: "pointer",
                fontWeight: 800,
                boxShadow: "0 12px 24px rgba(236, 72, 153, 0.22)",
              }}
            >
              Clear room memory
            </button>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.68)",
            backdropFilter: "blur(16px)",
            borderRadius: isMobile ? 22 : 30,
            padding: isMobile ? 18 : 28,
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 18px 40px rgba(37, 99, 235, 0.14)",
          }}
        >
          <div
            style={{
              fontSize: isMobile ? 28 : 36,
              fontWeight: 900,
              marginBottom: 10,
              color: "#172554",
              textAlign: "center",
            }}
          >
            Private reveal
          </div>

          {!round && (
            <div style={{ color: "#475569", fontSize: isMobile ? 16 : 18, textAlign: "center" }}>
              Start a round, then pass the device between players.
            </div>
          )}

          {round && !finished && !showFinalRevealScreen && currentAssignment && (
            <div style={{ display: "grid", gap: 18 }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.85)",
                  borderRadius: 22,
                  padding: 20,
                  textAlign: "center",
                  border: "1px solid rgba(99, 102, 241, 0.14)",
                }}
              >
                <div style={{ fontSize: 12, color: "#64748b", letterSpacing: 1.4, textTransform: "uppercase" }}>
                  Current player
                </div>
                <div
                  style={{
                    fontSize: isMobile ? 28 : 34,
                    fontWeight: 900,
                    marginTop: 8,
                    color: "#1e1b4b",
                    lineHeight: 1.05,
                  }}
                >
                  {currentAssignment.player}
                </div>
                <div style={{ color: "#64748b", marginTop: 8 }}>Only this player should look at the screen.</div>
              </div>

              <div
                onPointerDown={beginHold}
                onPointerUp={endHold}
                onPointerLeave={endHold}
                onPointerCancel={endHold}
                onContextMenu={(e) => e.preventDefault()}
                onSelectStart={(e) => e.preventDefault()}
                style={{
                  position: "relative",
                  height: isMobile ? 260 : 320,
                  perspective: "1200px",
                  cursor: "pointer",
                  touchAction: "manipulation",
                  ...NO_SELECTION_STYLE,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 26,
                    overflow: "hidden",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: revealed ? "rotateY(180deg)" : "rotateY(0deg)",
                    transformStyle: "preserve-3d",
                    WebkitTransformStyle: "preserve-3d",
                    transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                    background: playerCardColor,
                    color: "white",
                    padding: 26,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: "0 18px 36px rgba(49, 46, 129, 0.25)",
                    ...NO_SELECTION_STYLE,
                  }}
                >
                  <div style={{ fontSize: 14, marginBottom: 14 }}>Hold to reveal</div>
                  <div draggable={false} style={{ fontSize: isMobile ? 28 : 32, fontWeight: 900, lineHeight: 1.05, ...NO_SELECTION_STYLE }}>
                    Press and hold
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 26,
                    overflow: "hidden",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: revealed ? "rotateY(0deg)" : "rotateY(-180deg)",
                    transformStyle: "preserve-3d",
                    WebkitTransformStyle: "preserve-3d",
                    transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                    background: currentAssignment.isImpostor
                      ? "linear-gradient(135deg, #7f1d1d 0%, #dc2626 100%)"
                      : playerCardColor,
                    color: "white",
                    padding: 26,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: "0 18px 36px rgba(49, 46, 129, 0.25)",
                    ...NO_SELECTION_STYLE,
                  }}
                >
                  {currentAssignment.isImpostor ? (
                    <>
                      <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 10 }}>Your role</div>
                      <div draggable={false} style={{ color: "#fee2e2", fontSize: isMobile ? 28 : 32, fontWeight: 900, lineHeight: 1.05, ...NO_SELECTION_STYLE }}>
                        You are the Impostor
                      </div>

                      {settings.impostorGetsHint && currentAssignment.hint && (
                        <div draggable={false} style={{ marginTop: 12, fontSize: isMobile ? 16 : 18, fontWeight: 700, ...NO_SELECTION_STYLE }}>
                          Hint: {currentAssignment.hint}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 14, marginBottom: 10 }}>Your word</div>
                      <div draggable={false} style={{ fontSize: isMobile ? 30 : 36, fontWeight: 900, lineHeight: 1.05, ...NO_SELECTION_STYLE }}>
                        {currentAssignment.word}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 12,
                }}
              >

                <button
                  onClick={skipRound}
                  style={{
                    padding: "14px 18px",
                    borderRadius: 18,
                    border: 0,
                    background: "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: 800,
                    boxShadow: "0 12px 24px rgba(14, 165, 233, 0.24)",
                  }}
                >
                  Skip round
                </button>

                <button
                  onClick={nextPlayer}
                  style={{
                    padding: "14px 18px",
                    borderRadius: 18,
                    border: 0,
                    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: 800,
                    boxShadow: "0 12px 24px rgba(79, 70, 229, 0.24)",
                  }}
                >
                  Next player
                </button>
              </div>
            </div>
          )}

          {showFinalRevealScreen && !showFinalResults && round && (
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <div style={{ fontSize: isMobile ? 24 : 28, fontWeight: 900, marginBottom: 12 }}>
                Everyone is ready
              </div>

              <button
                onClick={() => setShowFinalResults(true)}
                style={{
                  width: isMobile ? "100%" : "auto",
                  padding: "16px 20px",
                  borderRadius: 20,
                  border: 0,
                  background: "#6366f1",
                  color: "white",
                  fontSize: isMobile ? 18 : 20,
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Reveal results
              </button>
            </div>
          )}

          {finished && round && (
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <div style={{ fontSize: isMobile ? 22 : 24, fontWeight: 900 }}>
                Final round details
              </div>

              <div style={{ marginTop: 10 }}>Answer: {round.character.name}</div>
              <div>Hint: {round.selectedHint || "No hint"}</div>
              <div>Impostor: {impostorPlayer}</div>

              {competitionMode && (
                <div
                  style={{
                    marginTop: 18,
                    background: "rgba(255,255,255,0.82)",
                    borderRadius: 20,
                    padding: 18,
                    border: "1px solid rgba(99, 102, 241, 0.14)",
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#172554", marginBottom: 12 }}>
                    Choose the winner
                  </div>

                  {!roundScored ? (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <button
                        onClick={awardImpostorWin}
                        style={{
                          padding: "12px 18px",
                          borderRadius: 14,
                          border: 0,
                          background: "linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)",
                          color: "white",
                          fontWeight: 800,
                          cursor: "pointer",
                        }}
                      >
                        Impostor won (+3)
                      </button>

                      <button
                        onClick={awardCrewWin}
                        style={{
                          padding: "12px 18px",
                          borderRadius: 14,
                          border: 0,
                          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                          color: "white",
                          fontWeight: 800,
                          cursor: "pointer",
                        }}
                      >
                        Crew won (+1 each)
                      </button>
                    </div>
                  ) : (
                    <div style={{ color: "#4b5563", fontWeight: 700 }}>
                      Score saved. You can start a new round now.
                    </div>
                  )}
                </div>
              )}

              {!competitionMode && (
                <button
                  onClick={startRound}
                  style={{
                    marginTop: 16,
                    width: isMobile ? "100%" : "auto",
                    padding: "12px 18px",
                    borderRadius: 14,
                    border: 0,
                    background: "#4f46e5",
                    color: "white",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  New round
                </button>
              )}

              {competitionMode && roundScored && (
                <button
                  onClick={startRound}
                  style={{
                    marginTop: 16,
                    width: isMobile ? "100%" : "auto",
                    padding: "12px 18px",
                    borderRadius: 14,
                    border: 0,
                    background: "#4f46e5",
                    color: "white",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  New round
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}