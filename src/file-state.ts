let currentFile: File | undefined;

export function setCurrentFile(file: File | undefined){
    currentFile = file
}

export function getCurrentFile(){
    return currentFile;
}