export function SanitizeArray(inputString: string): string[]
{
    let unsanitizedArray = inputString.split(",");
    let sanitizedArray = Array<string>();
    for (const unsanitizedString of unsanitizedArray) 
    {
        sanitizedArray.push(unsanitizedString.trim());
    }
    return sanitizedArray;
}