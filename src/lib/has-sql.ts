import xregexp from "xregexp"

const paranoid = xregexp('((%27)|(\'))|(--)|((%23)|(#))', 'i');
const elevated = xregexp('((%3D)|(=))[^\n]*((%27)|(\')|(--)|(%3B)|(;))', 'ix');
const typical = xregexp('w*((%27)|(\'))((%6F)|o|(%4F))((%72)|r|(%52))', 'ix');

export default (value: any, level: string, keywords: object) => {
  return new Promise((resolve) => {
    if (value) {
      if (level == 'paranoid') {
        if (paranoid.test(value)) return resolve(true);
      }
      if (level == 'elevated' || level == 'paranoid') {
        if (elevated.test(value)) return resolve(true);
      }
      if (level == 'typical' || level == 'elevated' || level == 'paranoid') {
        if (typical.test(value)) return resolve(true);
      }
      if (keywords) {
        if (Array.isArray(keywords) && keywords.length > 0) {
          for (let i = 0; i < keywords.length; i++) {
            if (keywords[i].test(value)) return resolve(true);
          }
        }
      }
    }
    return resolve(false);
  });
};
