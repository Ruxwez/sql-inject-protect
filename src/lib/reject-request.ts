import { Response } from "express";

export default (res: Response) => res.status(403).json({
  error: 'SQL Detected, Request Rejected.',
});
