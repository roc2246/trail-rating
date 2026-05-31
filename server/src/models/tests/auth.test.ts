import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginUser } from "../../models";
import { User } from "../../db";

vi.mock("../src/db", function () {
  return {
    User: {
      findOne: vi.fn(),
    },
  };
});

describe("loginUser", function () {
  beforeEach(function () {
    vi.clearAllMocks();
  });

  it("throws an error if user is not found", async function () {
    vi.mocked(User.findOne).mockReturnValue({
      select: vi.fn().mockResolvedValue(null),
    } as any);

    await expect(loginUser("test@email.com", "password123")).rejects.toThrow(
      "User not found"
    );
  });

  it("throws an error if password is invalid", async function () {
    vi.mocked(User.findOne).mockReturnValue({
      select: vi.fn().mockResolvedValue({
        email: "test@email.com",
        password: "hashed-password",
      }),
    } as any);

    vi.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

    await expect(loginUser("test@email.com", "wrongpassword")).rejects.toThrow(
      "Invalid password"
    );
  });

  it("returns a token and user if login succeeds", async function () {
    const mockUser = {
      _id: "123",
      email: "test@email.com",
      password: "hashed-password",
    };

    vi.mocked(User.findOne).mockReturnValue({
      select: vi.fn().mockResolvedValue(mockUser),
    } as any);

    vi.spyOn(bcrypt, "compare").mockResolvedValue(true as never);
    vi.spyOn(jwt, "sign").mockReturnValue("fake-token" as never);

    const result = await loginUser("test@email.com", "password123");

    expect(result.token).toBe("fake-token");
    expect(result.user).toEqual(mockUser);
  });
});
