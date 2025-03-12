import path from "path";
import fs from "fs";
import { compileFromFile } from "json-schema-to-typescript";

async function compileJSONSchema() {
    try {
        const jsonDir = path.join(__dirname, 'drafts');
        const promiseArr: any[] = [];
        getCompileFromDir(jsonDir, promiseArr)
        const compileRet: string[] = await Promise.all(promiseArr);
        let writeStr = '';
        for (let one of compileRet) {
            one = one.slice(236);
            writeStr += one + '\n';
        }
        const distDir = path.join(__dirname, 'dist');   
        if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
        const indexPath = path.join(distDir, 'index.d.ts');
        if (fs.existsSync(indexPath)) {
            const existingTypes = fs.readFileSync(indexPath, { encoding: 'utf-8' });
            fs.writeFileSync(indexPath, existingTypes + writeStr, { encoding: 'utf-8' })
        } else {
            fs.writeFileSync(indexPath, writeStr, { encoding: 'utf-8' })
        }
    } catch (error) {
        console.error(error);
    }
}

function getCompileFromDir(dir: string, promiseArr: any[]) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        if (fs.lstatSync(path.join(dir, file)).isDirectory()) {
            getCompileFromDir(path.join(dir, file), promiseArr);
        } else {
            if (file.endsWith('.json')) promiseArr.push(compileFromFile(path.join(dir, file)));
        }
    })
}

compileJSONSchema();