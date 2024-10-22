const request = require("supertest");
const http = require("http");
const { getAllGames } = require("../controllers");
const { app } = require("../index.js");

jest.mock("../controllers", () => {
  const actualModule = jest.requireActual("../controllers");
  return {
    ...actualModule,
    getAllGames: jest.fn(),
  };
});

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Controller Function Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return all games", () => {
    let mockGames = [
      {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
      {
        gameId: 2,
        title: "Red Dead Redemption 2",
        genre: "Action",
        platform: "PlayStation 4",
      },
      {
        gameId: 3,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        platform: "PC",
      },
    ];
    getAllGames.mockReturnValue(mockGames);
    let result = getAllGames();

    expect(result).toEqual(mockGames);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoints Tests", () => {
  it("GET /games should get all games", async () => {
    const mockResponse = {
      games: [
        {
          gameId: 1,
          title: "The Legend of Zelda: Breath of the Wild",
          genre: "Adventure",
          platform: "Nintendo Switch",
        },
        {
          gameId: 2,
          title: "Red Dead Redemption 2",
          genre: "Action",
          platform: "PlayStation 4",
        },
        {
          gameId: 3,
          title: "The Witcher 3: Wild Hunt",
          genre: "RPG",
          platform: "PC",
        },
      ],
    };

    const response = await request(server).get("/games");
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockResponse);
    expect(response.body.games.length).toBe(3);
  });

  it("GET /games/details/:id", async () => {
    const mockResponse = {
      game: {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
    };
  
    const response = await request(server).get("/games/details/1"); 
    expect(response.statusCode).toEqual(200); 
    expect(response.body).toEqual(mockResponse); response
    expect(Object.keys(response.body.game).length).toBe(4);
  });
});
