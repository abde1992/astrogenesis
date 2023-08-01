# astrogenesis
AstroGenesis: Chronicles of the Starborn

A demo using Generative AI to procedurally generate environments and render them using Three.js.

In AstroGenesis, the player is a Starborn, an entity capable of creating and nurturing life on barren planets. The goal is to terraform procedurally generated planets and create a sustainable ecosystem.

### Procedural Planet Generation
The AI model's output, exposed at a local URL, is utilized in a Three.js game.

The project uses Generative Adversarial Networks (GANs) for the procedural generation of game terrains. The server-side Python code in /GANProject leverages a pretrained GAN model to create 2D terrain heightmaps, which are subsequently served to a client-side JavaScript game developed with Three.js.

The server.py file runs a Flask server, exposing an endpoint (/terrain-data-url) that delivers the generated terrain data. The terrain generation process, encapsulated in terrainGenerator.py, creates larger terrains by generating and stitching smaller terrain patches, taking into account overlapping regions for a smoother transition. The generator uses a GAN model (models/terrainModel.pth) trained to output a 64x64 patch from a 100-dimensional random noise vector. The generated terrains are then formatted and scaled appropriately before being returned to the client.

The client-side game, built with Three.js, uses this data to render the terrain in 3D, populate it with resources, and enable terraforming gameplay.

### Planet Rendering
Three.js, based on the information received from the server, would render the planet visually. The terrain would be created, atmosphere depicted, and resources placed accordingly.

### Gameplay
The gameplay would involve the player using tools to terraform the planet. Three.js would be responsible for handling user inputs, physics, and game logic.

This novel application of AI in game development presents a futuristic approach to procedural world generation, promoting enhanced diversity and complexity in game environments.
This game concept also exemplifies the potential of integrating Generative AI with Three.js to create an engaging gaming experience.
