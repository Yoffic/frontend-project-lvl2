import fs from 'fs';
import path from 'path';

export const getType = (filepath) => path.extname(filepath);

export const getContent = (filepath) => fs.readFileSync(path.join(process.cwd(), filepath), 'utf-8');