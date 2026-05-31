import { describe, it, expect, vi, beforeEach } from "vitest";
import { loginController } from "../../controllers";
import * as models from "../../models";

vi.mock("../src/db", function () {
  return {
    loginUser: vi.fn(),
  };
});

describe("loginController", function () {
  beforeEach(function () {
    vi.clearAllMocks();
  });

  it("returns 200 and login result on success", async function () {
    const req = {
      body: {
        email: "test@email.com",
        password: "password123",
      },
    } as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    vi.mocked(models.loginUser).mockResolvedValue({
      token: "fake-token",
      user: {
        email: "test@email.com",
      },
    } as any);

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: "fake-token",
      user: {
        email: "test@email.com",
      },
    });
  });

  it("returns 400 on login failure", async function () {
    const req = {
      body: {
        email: "test@email.com",
        password: "wrongpassword",
      },
    } as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    vi.mocked(models.loginUser).mockRejectedValue(new Error("Invalid password"));

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid password",
    });
  });
});
