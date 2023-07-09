import { NextFunction, Request, Response } from 'express';
import { getDailyLogsAttributes } from '../../interfaces/IssueHistory';
import { AppDataSource } from '../../db/DataSource';
import { IssueHistory } from '../../db/entity/IssueHistory';

const issueHistoryRepository = AppDataSource.getRepository(IssueHistory);

export const getDailyLogsForIssue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const getDailyLogsInput: getDailyLogsAttributes = req.body;
  console.log("Invoked getDailyLogsForIssue with input: ", getDailyLogsInput);
  try {
    const result = await issueHistoryRepository.find({
      where: {
        issuedDate: new Date(getDailyLogsInput.date)
      },
      relations: {
        issuedBy: true,
        book: true,
        copy: true
      }
    });
    console.log("getDailyLogsForIssue RES: ", result);
    return res.status(200).json(result);
  } catch (err) {
    console.error("getDailyLogsForIssue ERR: ", err);
    return res.status(500).json(err);
  }
}