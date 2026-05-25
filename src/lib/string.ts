

export function removeDiacritics(text: string): string {
    return text
        .normalize('NFD') // Separa las letras de sus acentos/diacríticos
        .replace(/[\u0300-\u036f]/g, ''); // Elimina los acentos dejando solo la letra base
}


export function removeCommonPunctuation(text: string): string {
    // La expresión regular busca los caracteres: , . ! ? ' " ; : ( ) [ ] { }
    // Puedes agregar o quitar caracteres dentro de los corchetes [] según lo necesites.
    return text.replace(/[,.!?'";:()[\]{}]/g, '');
}

