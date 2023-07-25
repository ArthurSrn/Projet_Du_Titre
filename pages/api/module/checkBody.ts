export default function checkBody(body: Record<string, any>, keys: string[]): boolean {
    let isValid = true;
  
    for (const field of keys) {
      // if (!body[field] || body[field] === '') {
      if (body[field] === undefined || body[field] === '') {
        console.log(body[field]);
        isValid = false;
      }
    }
  
    return isValid;
  }
  
