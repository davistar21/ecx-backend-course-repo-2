import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { registerUser } from "../../src/controller/user.controller";
import { userModel as User } from "../../src/models/user.model";

// Mock the dependencies
jest.mock("../../src/models/user.model"); // Mock the User model
jest.mock("bcryptjs"); // Mock bcrypt

describe("registerUser function", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  let json: jest.Mock;
  let status: jest.Mock;

  beforeEach(() => {
    // Reset mocks and initialize request and response objects
    req = {
      body: {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "securePassword123",
      },
    };

    json = jest.fn();
    status = jest.fn(() => ({ json }));

    res = {
      status,
    };
    next = jest.fn()
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully register a user", async () => {
    // Mock database and bcrypt behavior
    (User.findOne as jest.Mock).mockResolvedValue(null); // User does not exist
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword123");
    (User.create as jest.Mock).mockResolvedValue({ id: "123", ...req.body });

    await registerUser(req as Request, res as Response, next as NextFunction);

    // Assertions
    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);
    expect(User.create).toHaveBeenCalledWith({
      name: req.body.name,
      email: req.body.email,
      password: "hashedPassword123",
    });
    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith({
      success: true,
      message: "User registered successfully",
      user: { id: "123", name: "John Doe", email: "johndoe@example.com" },
    });
  });

  it("should return 400 if email is already in use", async () => {
    // Mock User.findOne to simulate existing user
    (User.findOne as jest.Mock).mockResolvedValue({ email: req.body.email });

    await registerUser(req as Request, res as Response, next as NextFunction);

    // Assertions
    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      success: false,
      message: "Email is already registered",
    });
  });

  it("should return 500 if an unexpected error occurs", async () => {
    // Mock unexpected error
    (User.findOne as jest.Mock).mockRejectedValue(new Error("Database error"));

    await registerUser(req as Request, res as Response, next as NextFunction);

    // Assertions
    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({
      success: false,
      message: "Internal server error",
    });
  });
});
