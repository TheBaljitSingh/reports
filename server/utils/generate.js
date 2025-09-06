export async function generateRandomId(){

    //random number to converting hexadecimal and slicing it
    const id = Math.random().toString(16).slice(10);
    return id;
}