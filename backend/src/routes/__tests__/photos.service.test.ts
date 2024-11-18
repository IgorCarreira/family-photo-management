import { mockFetch } from "../__mocks__/fetch-mock";
import {
  createPhoto,
  deletePhoto,
  getAlbumsPhotos,
  getPhotoById,
  patchPhoto,
} from "../photos/photos.service";

jest.mock("../albums/albums.service", () => ({
  getAlbumById: jest.fn((id) =>
    Promise.resolve({
      id,
      title: `Album ${id}`,
      user: { id: 1, username: "User1" },
    }),
  ),
}));

describe("Photos Service", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("getAlbumsPhotos", () => {
    it("should fetch and return album and photos", async () => {
      const mockPhotos = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        title: `Photo ${i + 1}`,
        albumId: 1,
        url: `https://example.com/photo${i + 1}`,
        thumbnailUrl: `https://example.com/thumb${i + 1}`,
      }));

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockPhotos),
      });

      const result = await getAlbumsPhotos(1);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/photos",
      );
      expect(result).toEqual({
        album: { id: 1, title: "Album 1", user: { id: 1, username: "User1" } },
        photos: mockPhotos.slice(0, 10),
      });
    });

    it("should throw an error if fetching photos fails", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });

      await expect(getAlbumsPhotos(1)).rejects.toThrow(
        "Failed to fetch photos",
      );
    });
  });

  describe("getPhotoById", () => {
    it("should fetch and return a photo by ID", async () => {
      const mockPhoto = {
        id: 1,
        title: "Photo 1",
        albumId: 1,
        url: "https://example.com/photo1",
        thumbnailUrl: "https://example.com/thumb1",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockPhoto),
      });

      const result = await getPhotoById(1);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/photos/1",
      );
      expect(result).toEqual(mockPhoto);
    });
  });

  describe("createPhoto", () => {
    it("should create and return a new photo", async () => {
      const mockPhoto = {
        id: 1,
        title: "New Photo",
        albumId: 1,
        url: "https://example.com/new-photo",
        thumbnailUrl: "https://example.com/new-thumb",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockPhoto),
      });

      const result = await createPhoto({
        title: "New Photo",
        albumId: 1,
        url: "https://example.com/new-photo",
        thumbnailUrl: "https://example.com/new-thumb",
      });

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/photos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "New Photo",
            albumId: 1,
            url: "https://example.com/new-photo",
            thumbnailUrl: "https://example.com/new-thumb",
          }),
        },
      );
      expect(result).toEqual(mockPhoto);
    });
  });

  describe("deletePhoto", () => {
    it("should delete a photo and return the deleted photo data", async () => {
      const mockDeletedPhoto = {
        id: 1,
        title: "Deleted Photo",
        albumId: 1,
        url: "https://example.com/photo1",
        thumbnailUrl: "https://example.com/thumb1",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockDeletedPhoto),
      });

      const result = await deletePhoto(1);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/photos/1",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );
      expect(result).toEqual(mockDeletedPhoto);
    });
  });

  describe("patchPhoto", () => {
    it("should update a photo and return the updated data", async () => {
      const mockUpdatedPhoto = {
        id: 1,
        title: "Updated Photo",
        albumId: 1,
        url: "https://example.com/photo1",
        thumbnailUrl: "https://example.com/thumb1",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUpdatedPhoto),
      });

      const result = await patchPhoto(1, { title: "Updated Photo" });

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/photos/1",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "Updated Photo" }),
        },
      );
      expect(result).toEqual(mockUpdatedPhoto);
    });
  });
});
