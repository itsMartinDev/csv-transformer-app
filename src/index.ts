import { loadContent, saveToCsv, saveToJson, transformRows } from "./lib/file"
import { removeCommonPunctuation, removeDiacritics } from "./lib/string"

// Define input and output types
interface inputRow {
    CVEGEO : string
    CVE_ENT : string
    NOM_ENT : string
    NOM_ABR : string
    CVE_MUN : string
    NOM_MUN : string
    CVE_CAB : string
    NOM_CAB : string
    POB_TOTAL : string
    POB_MASCULINA : string
    POB_FEMENINA : string
}

interface outputRow {
    id: string
    label: string
}


// Define the function to transform each input_row to an output_row
const transformer = (inputRow: inputRow, index: number ) : outputRow =>  { 

    const cleanSubdivisionName = removeCommonPunctuation( 
            removeDiacritics(
                 inputRow.NOM_ENT
            )
        )
       .replaceAll(' ', '_')
       .toLocaleLowerCase()

    const cleanRegionName = removeCommonPunctuation( 
            removeDiacritics(
                 inputRow.NOM_MUN
            )
        )
       .replaceAll(' ', '_')
       .toLocaleLowerCase()

    // Format country.subdivision.region
    const id = `mx.${ cleanSubdivisionName }.${ cleanRegionName  }` 

    const label = `${ inputRow.NOM_MUN  }, ${ inputRow.NOM_ENT }, México`

    return {
       id: id,
       label: label
    }

}

// Load the content of the file
const fileContent = loadContent('./src/input/', 'mexico-localities.csv')


// Call to process the input file
const transformedRows = transformRows(fileContent, transformer)




// Call to save the files.
console.log('--------------------------------------------')
console.log('Saving to JSON file...' )
saveToJson( transformedRows, 'municipios.json')
console.log('JSON file saved!')

console.log('--------------------------------------------')
console.log('Saving to CSV file...' )
saveToCsv( transformedRows, 'municipios.csv')
console.log('CSV file saved!')
