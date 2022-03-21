import rawBody from "raw-body";
import {Request, Response, NextFunction} from "express"
import hasSql from "./has-sql";
import formatKeywords from "./helpers/format-keywords";
import rejectRequest from "./reject-request";
import validateOptionValues from "./helpers/validate-options";

export default (options = {
  level: 'typical',
  keywords: [],
  checkHeaders: false,
}) => {

  const optionValues = validateOptionValues(options);

  const {
    level,
    keywords,
  } = optionValues;

  const formattedKeywords = formatKeywords(keywords);

  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl) {
      if (await hasSql(req.originalUrl, level, formattedKeywords)) return rejectRequest(res);
    }

    const body = await rawBody(req, {
      encoding: 'utf8',
    }).catch(err => next(err));

    if (await hasSql(body, level, formattedKeywords)) return rejectRequest(res);

    return next();
  };
};
