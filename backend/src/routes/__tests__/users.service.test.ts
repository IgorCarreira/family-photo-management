import { User } from "../../types/users.types";
import { mockFetch } from "../__mocks__/fetch-mock";
import { getUserById, getUsers } from "../users/users.service";

describe("Users Service", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("getUsers", () => {
    it("should fetch and return a list of users", async () => {
      const mockUsers: User[] = [
        { id: 1, username: "User1", email: "user1@example.com" },
        { id: 2, username: "User2", email: "user2@example.com" },
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUsers),
      });

      const result = await getUsers();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users",
      );
      expect(result).toEqual([
        { id: 1, username: "User1", email: "user1@example.com" },
        { id: 2, username: "User2", email: "user2@example.com" },
      ]);
    });

    it("should throw an error if the fetch fails", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });

      await expect(getUsers()).rejects.toThrow();
      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users",
      );
    });
  });

  describe("getUserById", () => {
    it("should fetch and return a user by ID", async () => {
      const mockUser: User = {
        id: 1,
        username: "User1",
        email: "user1@example.com",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await getUserById(1);

      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users/1",
      );
      expect(result).toEqual({
        id: 1,
        username: "User1",
        email: "user1@example.com",
      });
    });

    it("should throw an error if the fetch fails", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });

      await expect(getUserById(1)).rejects.toThrow();
      expect(mockFetch).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users/1",
      );
    });
  });
});
