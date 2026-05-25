

import * as fs from 'fs';
import * as path from 'path';
import Papa from 'papaparse';



export function saveToCsv<T>(list: T[], filenameWithExtension: string): void {

    
    // Convert list to csv string using paparse
    const csvContent = Papa.unparse(list, {
        quotes: true, // Wrap cell content between quotes.
        header: true  // Use the object keys as headers.
    });

    writeToDisk(csvContent, filenameWithExtension)

}


export function saveToJson<T>(list: T[], filenameWithExtension: string): void {

    // Convert list to string
    const jsonContent = JSON.stringify(list, null, 2);

    writeToDisk(jsonContent, filenameWithExtension)

}


export function writeToDisk(content: string, filenameWithExtension: string) {

    // Get output file path
    const outputDir = path.resolve('./output');
    const filePath = path.join(outputDir, filenameWithExtension);

    try {

        // Check if folder exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Write to disk
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Archivo JSON guardado con éxito en: ${filePath}`);
        
    } catch (error) {
        console.error('Error al guardar el archivo JSON:', error instanceof Error ? error.message : error);
    }

}


export function loadContent(folderPath:string, filenameWithExtension: string) {

    const csvFilePath = path.resolve(folderPath, filenameWithExtension);

    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');

    return fileContent

}


export function transformRows <T, R>(fileContent: string, transformer: (row: T, index : number) => R): R[] {

    const list : R[] = []

    Papa.parse<T>(fileContent, {

            header: true,
            skipEmptyLines: true,
            complete: (results) => {


                const rows = results.data;
                
                console.log(`Found ${rows.length} rows.`);
                
    
                rows.forEach((row, index) => {

                    const processedRow = transformer( row, index )

                    list.push( processedRow )
                    
                })


                
            },
            error: (error: Error) => {
                console.error('Error while parsing CSV:', error.message);
            }
    });

    console.log(`Processed ${list.length} rows.`);

    return list

}