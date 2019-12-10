import fs from 'fs';
import path from 'path';
import { has } from 'lodash';

const getFileContent = (filePath) => fs.readFileSync(path.join(process.cwd(), filePath));

const genDiff = (pathToFile1, pathToFile2) => {
  const fileToCompare1 = getFileContent(pathToFile1);
  const fileToCompare2 = getFileContent(pathToFile2);

  const obj1 = JSON.parse(fileToCompare1);
  const obj2 = JSON.parse(fileToCompare2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqKeys = new Set(keys1.concat(keys2)).values();
  const allKeys = [...uniqKeys];

  const Diffs = allKeys.reduce((acc, key) => {
    if (has(obj1, key) && has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        return [...acc, `   ${key}: ${obj2[key]}`];
      }
      return [...acc, ` + ${key}: ${obj2[key]}`, ` - ${key}: ${obj1[key]}`];
    }
    if (has(obj1, key) && !has(obj2, key)) {
      return [...acc, ` - ${key}: ${obj1[key]}`];
    }
    return [...acc, ` + ${key}: ${obj2[key]}`];
  }, []).join('\n');

  return `{\n${Diffs}\n}`;
};

export default genDiff;