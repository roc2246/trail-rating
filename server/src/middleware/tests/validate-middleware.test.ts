import { describe, it, expect, vi } from "vitest";
import { z } from "zod";
import { validateBody } from "../../middleware";

describe("validateBody", function () {
  it("calls next if request body is valid", function () {
    const schema = z.object({
      email: z.string().email(),
    });

    const req = {
      body: {
        email: "test@email.com",
      },
    } as any;

    const res = {} as any;
    const next = vi.fn();

    validateBody(schema)(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("returns 400 if request body is invalid", function () {
    const schema = z.object({
      email: z.string().email(),
    });

    const req = {
      body: {
        email: "bad-email",
      },
    } as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    const next = vi.fn();

    validateBody(schema)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
