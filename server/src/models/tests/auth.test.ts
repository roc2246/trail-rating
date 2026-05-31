import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginUser } from "../auth";
import { User } from "../../db";

describe("loginUser", function () {
  beforeEach(function () {
    vi.clearAllMocks();
  });

  afterEach(function () {
    vi.restoreAllMocks();
  });

  it("throws an error if user is not found", async function () {
    vi.spyOn(User, "findOne").mockResolvedValue(null);

    await expect(
      loginUser("test@email.com", "password123")
    ).rejects.toThrow("User not found");
  });

  it("throws an error if password is invalid", async function () {
    vi.spyOn(User, "findOne").mockResolvedValue({
      email: "test@email.com",
      password: "hashed-password",
    } as any);

    vi.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

    await expect(
      loginUser("test@email.com", "wrongpassword")
    ).rejects.toThrow("Invalid password");
  });

  it("returns a token and user if login succeeds", async function () {
    const mockUser = {
      _id: "123",
      email: "test@email.com",
      password: "hashed-password",
    };

    vi.spyOn(User, "findOne").mockResolvedValue(mockUser as any);

    vi.spyOn(bcrypt, "compare").mockResolvedValue(true as never);
    vi.spyOn(jwt, "sign").mockReturnValue("fake-token" as never);

    const result = await loginUser("test@email.com", "password123");

    expect(result.token).toBe("fake-token");
    expect(result.user).toEqual(mockUser);
  });
});