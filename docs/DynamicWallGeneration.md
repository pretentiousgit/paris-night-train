# Dynamic Walls In Phaser-CE
## For ProcGen and similar jams

### Intro and Rationale
Making a rogueike is the first thing many people think of when considering a procedural jam game, and I enjoy these as well. Unfortunately, roguelikes are, well... pretty same-y. They tend to focus on turn-based steps, or caves, or Medieval Graphics, all of which are less interesting than the possibility of procedural generation promises.

Before you can make your Dream Generated Game, you need a basic world set up. Unity is an interesting way to go with this - loads of shaders, many models, the possibility of a new world - but I got tripped up on C# not having a simple and straightforward `.map` command. LINQ isn't really good enough to keep your code in your head while you're trying to concentrate on something else entirely.

Therefore, we move to a more laid-back platform. Javascript is an officially Weird language, and working with Phaser in it makes it Weirder, but with a little help from contemporary build tools like Webpack, we can get a lot of the advantages of a compiled game environment with few of the downsides of Javascript all-in-one development.

## Basic World Setup and Dependencies

### Dependency #1 - phaser-manifest-loader
Phaser is a pretty solid game engine, but most of game development isn't the engine - it's organizing your code to take up the least space possible in your head and your reading. `phaser-manifest-loader` helps with that problem by loading all your images and assets automatically using a JSON file.

### Basic World Setup: Tilemaps

Getting a character to walk  

