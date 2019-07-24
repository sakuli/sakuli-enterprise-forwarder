import { PathLike, promises as fs } from "fs";

export async function dirExists(path: PathLike) {
    try {

        const lstat = await fs.lstat(path);
        return lstat.isDirectory();
    } catch(e) {
        return false;
    }
}
