const fs = require("fs");

function ReadAndWrite(filePath) {
    this.filePath = filePath;

    this.readAllRecordsSync = function() {
        const content = fs.readFileSync(this.filePath, "utf-8").split("\n");
        const records = content.slice(0, content.length - 1);
        return records.map(record => JSON.parse(record));
    };

    this.readAllRecords = function(callback = () => {}) {
        fs.readFile(this.filePath, "utf-8", (err, content) => {
            if (err) {
                console.log(`Error ${err}`);
            } else {
                content = content.split("\n");
                const fileContents = content.slice(0, content.length - 1).map(record => JSON.parse(record));
                callback(fileContents);
            }
        });
    };

    this.appendRecordsSync = function(records) {
        let recordsString = "";
        for (let record of records) {
            recordsString += `${JSON.stringify(record)}\n`;
        }
        fs.appendFileSync(this.filePath, recordsString);
    };

    this.appendRecords = function(records, callback = () => {}) {
        let recordsString = "";
        for (let record of records) {
            recordsString += `${JSON.stringify(record)}\n`;
        }
        fs.appendFile(this.filePath, recordsString, err => {
            if (err) {
                console.log(`Error ${err}`);
            } else {
                callback();
            }
        });
    };

    this.writeRecordsSync = function(records) {
        let recordsString = "";
        for (let record of records) {
            recordsString += `${JSON.stringify(record)}\n`;
        }
        fs.writeFileSync(this.filePath, recordsString);
    };

    this.writeRecords = function(records, callback = () => {}) {
        let recordsString = "";
        for (let record of records) {
            recordsString += `${JSON.stringify(record)}\n`;
        }
        fs.writeFile(this.filePath, recordsString, err => {
            if (err) {
                console.log(`Error ${err}`);
            } else {
                callback();
            }
        });
    };

    this.deleteRecordSync = function(id) {
        let recordsString = "";
        const refactoredRecords = this.readAllRecordsSync().filter(record => {
            if (record[id.key] !== id.value) {
                recordsString += `${JSON.stringify(record)}\n`;
            }
            return record[id.key] !== id.value
        });
        fs.writeFileSync(this.filePath, recordsString);
        return refactoredRecords;
    };

    this.deleteRecord = function(id, callback = () => {}) {
        let recordsString = "";
        this.readAllRecords(fileContents => {
            const refactoredRecords = fileContents.filter(record => {
                if (record[id.key] !== id.value) {
                    recordsString += `${JSON.stringify(record)}\n`;
                }
                return record[id.key] !== id.value
            });
            fs.writeFile(this.filePath, recordsString, err => {
                if (err) {
                    console.log(`Error ${err}`);
                } else {
                    callback(refactoredRecords);
                }
            });
        });
    };

    this.editRecordSync = function(id, recordIdArray) {
        let recordsString = "";
        const refactoredRecords = this.readAllRecordsSync().map(record => {
            if (record[id.key] === id.value) {
                for (let recordId of recordIdArray) {
                    record[recordId.key] = recordId.value;
                }
            }
            recordsString += `${JSON.stringify(record)}\n`;
            return record;
        });
        fs.writeFileSync(this.filePath, recordsString);
        return refactoredRecords;
    };

    this.editRecord = function(id, recordIdArray, callback = () => {}) {
        let recordsString = "";
        this.readAllRecords(fileContents => {
            const refactoredRecords = fileContents.map(record => {
                if (record[id.key] === id.value) {
                    for (let recordId of recordIdArray) {
                        record[recordId.key] = recordId.value;
                    }
                }
                recordsString += `${JSON.stringify(record)}\n`;
                return record;
            });
            fs.writeFile(this.filePath, recordsString, err => {
                if (err) {
                    console.log(`Error ${err}`);
                } else {
                    callback(refactoredRecords);
                }
            });
        });
    };
}

module.exports.ReadAndWrite = ReadAndWrite;