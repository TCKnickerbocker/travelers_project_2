import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.MONGO_DB_URI);

app.get("/api/films", async (req, res) => {
  try {
    await client.connect();
    const filmsCollection = await client.db("swapi").collection("films");
    const films = await filmsCollection.find({}).toArray();
    res.status(200).json(films);
  } catch (error) {
    console.error("Error fetching films:", error?.message);
    res.status(500).json({ error: "Failed to fetch data. Try again later." });
  } finally {
    await client.close();
  }
});

app.get("/api/films/:id", async (req, res) => {
  try {
    await client.connect();
    const filmsCollection = await client.db("swapi").collection("films");
    const id = parseInt(req.params?.id);
    const film = await filmsCollection.findOne({ id });
    res.status(200).json(film);
  } catch (error) {
    console.error(`Error fetching film with id ${id}:`, error?.message);
    res.status(500).json({ error: "Failed to fetch data. Try again later." });
  } finally {
    await client.close();
  }
});

app.get("/api/films/:id/characters", async (req, res) => {
  try {
    await client.connect();
    const films_characterCollection = await client
      .db("swapi")
      .collection("films-characters");
    const id = parseInt(req.params?.id);
    const characters = await films_characterCollection
      .find({ film_id: id })
      .toArray();
    res.status(200).json(characters);
  } catch (error) {
    console.error(
      `Error fetching characters data for film with id ${id}:`,
      error?.message
    );
    res.status(500).json({ error: "Failed to fetch data. Try again later." });
  } finally {
    await client.close();
  }
});

app.get("/api/films/:id/planets", async (req, res) => {
  try {
    await client.connect();
    const films_planetsCollection = await client
      .db("swapi")
      .collection("films-planets");
    const id = parseInt(req.params?.id);
    const planets = await films_planetsCollection
      .find({ film_id: id })
      .toArray();
    res.status(200).json(planets);
  } catch (error) {
    console.error(
      `Error fetching planets data for film with id ${id}:`,
      error?.message
    );
    res.status(500).json({ error: "Failed to fetch data. Try again later." });
  } finally {
    await client.close();
  }
});

app.get("/api/characters", async (req, res) => {
  try {
    await client.connect();
    const charactersCollection = await client
      .db("swapi")
      .collection("characters");

    const characterName = req.query?.name;
    const query = characterName
      ? { name: { $regex: characterName, $options: "i" } }
      : {};
    const characters = await charactersCollection.find(query).toArray();
    res.status(200).json(characters);
  } catch (error) {
    console.error("Error fetching characters:", error?.message);
    res.status(500).json({ error: "Failed to fetch data. Try again later." });
  } finally {
    await client.close();
  }
});

app.get("/api/characters/:id", async (req, res) => {
  try {
    await client.connect();
    const charactersCollection = await client
      .db("swapi")
      .collection("characters");

    const id = parseInt(req.params?.id);
    const character = await charactersCollection.findOne({ id });

    res.status(200).json(character);
  } catch (error) {
    console.error(`Error fetching character with id ${id}:`, error?.message);
    res.status(500).json({ error: "Failed to fetch data. Try again later." });
  } finally {
    await client.close();
  }
});

app.get("/api/characters/:id/films", async (req, res) => {
  try {
    await client.connect();
    const character_filmsCollection = await client
      .db("swapi")
      .collection("films-characters");
    const id = parseInt(req.params?.id);
    const films = await character_filmsCollection
      .find({ character_id: id })
      .toArray();
    res.status(200).json(films);
  } catch (error) {
    console.error(
      `Error fetching films data for character with id ${id}:`,
      error?.message
    );
    res.status(500).json({ error: "Failed to fetch data. Try again later." });
  } finally {
    await client.close();
  }
});

app.get("/api/planets", async (req, res) => {
  try {
    await client.connect();
    const planetsCollection = await client.db("swapi").collection("planets");
    const planets = await planetsCollection.find({}).toArray();
    res.status(200).json(planets);
  } catch (error) {
    console.error("Error fetching planets:", error?.message);
    res.status(500).json({ error: "Failed to fetch data. Try again later." });
  } finally {
    await client.close();
  }
});

app.get("/api/planets/:id", async (req, res) => {
  try {
    await client.connect();
    const planetsCollection = await client.db("swapi").collection("planets");
    const id = parseInt(req.params?.id);
    const planet = await planetsCollection.findOne({ id });
    res.status(200).json(planet);
  } catch (error) {
    console.error(`Error fetching planet with id ${id}:`, error?.message);
    res.status(500).json({ error: "Failed to fetch data. Try again later." });
  } finally {
    await client.close();
  }
});

app.get("/api/planets/:id/films", async (req, res) => {
  try {
    await client.connect();
    const films_planetsCollection = await client
      .db("swapi")
      .collection("films-planets");
    const id = parseInt(req.params?.id);
    const films = await films_planetsCollection
      .find({ planet_id: id })
      .toArray();
    res.status(200).json(films);
  } catch (error) {
    console.error(
      `Error fetching films data for planet with id ${id}:`,
      error?.message
    );
    res.status(500).json({ error: "Failed to fetch data. Try again later." });
  } finally {
    await client.close();
  }
});

app.get("/api/planets/:id/characters", async (req, res) => {
  try {
    await client.connect();
    const character_planetsCollection = await client
      .db("swapi")
      .collection("characters");
    const id = parseInt(req.params?.id);
    const characters = await character_planetsCollection
      .find({
        homeworld: id,
      })
      .toArray();
    res.status(200).json(characters);
  } catch (error) {
    console.error(
      `Error fetching characters data for planet with id ${id}:`,
      error?.message
    );
    res.status(500).json({ error: "Failed to fetch data. Try again later." });
  } finally {
    await client.close();
  }
});

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Star Wars API! Use endpoints like /films, /characters, and /planets to explore data."
  );
});
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
