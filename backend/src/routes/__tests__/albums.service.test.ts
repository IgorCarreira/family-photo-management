import { mockFetch } from "../__mocks__/fetch-mock";
import {
  createAlbum,
  deleteAlbum,
  getAlbumById,
  getUserAlbums,
  patchAlbum,
} from "../albums/albums.service";

jest.mock("../users/users.service", () => ({
  getUserById: jest.fn((id) => Promise.resolve({ id, username: `User${id}` })),
}));

describe("Album Service", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("getUserAlbums", () => {
    it("should fetch and map albums correctly", async () => {
      const mockAlbums = [
        { id: 1, title: "Album 1", userId: 1 },
        { id: 2, title: "Album 2", userId: 1 },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockAlbums),
      });

      const result = await getUserAlbums(1);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users/1/albums",
      );
      expect(result).toEqual({
        user: { id: 1, username: "User1" },
        albums: [
          { id: 1, title: "Album 1" },
          { id: 2, title: "Album 2" },
        ],
      });
    });

    it("should throw an error if the API call fails", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });

      await expect(getUserAlbums(1)).rejects.toThrow("Failed to fetch albums");
    });
  });

  describe("getAlbumById", () => {
    it("should fetch and return album details", async () => {
      const mockAlbum = { id: 1, title: "Album 1", userId: 1 };

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue(mockAlbum),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue([]),
        });

      const result = await getAlbumById(1);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/albums/1",
      );
      expect(result).toEqual({
        id: 1,
        title: "Album 1",
        user: { username: "User1", id: 1 },
      });
    });

    it("should throw an error if the album API call fails", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });

      await expect(getAlbumById(1)).rejects.toThrow("Failed to fetch albums");
    });
  });

  describe("createAlbum", () => {
    it("should create and return a new album", async () => {
      const mockAlbum = { id: 1, title: "New Album", userId: 1 };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockAlbum),
      });

      const result = await createAlbum({ title: "New Album" });

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/albums",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "New Album" }),
        },
      );
      expect(result).toEqual(mockAlbum);
    });
  });

  describe("deleteAlbum", () => {
    it("should delete the album and return the deleted data", async () => {
      const mockDeletedAlbum = { id: 1, title: "Deleted Album", userId: 1 };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockDeletedAlbum),
      });

      const result = await deleteAlbum(1);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/albums/1",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );
      expect(result).toEqual(mockDeletedAlbum);
    });
  });

  describe("patchAlbum", () => {
    it("should update the album and return the updated data", async () => {
      const mockUpdatedAlbum = { id: 1, title: "Updated Album", userId: 1 };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUpdatedAlbum),
      });

      const result = await patchAlbum(1, { title: "Updated Album" });

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/albums/1",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "Updated Album" }),
        },
      );
      expect(result).toEqual(mockUpdatedAlbum);
    });
  });
});
