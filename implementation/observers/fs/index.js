export async function observeJSONL(refToBindData = true) {

/* if (refToBindData) { */

    const fileToWatch = "index.jsonl";

    const 
        dirHandle = await window.showDirectoryPicker()
        ,
        fileHandle = await dirHandle.getFileHandle(fileToWatch)
        ;

    // Optional: ensure read permission
    const permission = await fileHandle.requestPermission({ mode: "read" });
        if (permission !== "granted") {
            throw new Error("Permission denied to access the file.");
        }

    const observer = new FileSystemObserver(async (changes) => {
        for (const change of changes) {
            if (change.changedHandle && change.changedHandle.kind === "file" &&
                change.changedHandle.name === fileToWatch &&
                change.type === "modified") {
                const file = await fileHandle.getFile();
                const content = await file.text();
                const lines = /* text */content.split('\n').filter(Boolean);
                const data = lines.map(line => JSON.parse(line)); // Usea  complete run-time `data` reference for archiving within IndexedDB
                
                Object.assign(refToBindData, { data: data })
            }
        }
    }, { /* recursive: false is ignored for files */ });

    await observer.observe(fileHandle);

/* } */

}