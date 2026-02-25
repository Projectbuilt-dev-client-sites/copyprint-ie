import { type User, type InsertUser, type ContactMessage, type InsertContact, type ArtworkSubmission, type InsertArtwork } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContact): Promise<ContactMessage>;
  createArtworkSubmission(submission: InsertArtwork): Promise<ArtworkSubmission>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessage>;
  private artworkSubmissions: Map<string, ArtworkSubmission>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.artworkSubmissions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContact): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { ...insertMessage, id };
    this.contactMessages.set(id, message);
    return message;
  }

  async createArtworkSubmission(insertSubmission: InsertArtwork): Promise<ArtworkSubmission> {
    const id = randomUUID();
    const submission: ArtworkSubmission = { ...insertSubmission, id };
    this.artworkSubmissions.set(id, submission);
    return submission;
  }
}

export const storage = new MemStorage();
