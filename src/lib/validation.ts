export function condense_location(start: string, end: string): string {
    console.assert(start.indexOf("市") != -1, "地点格式不对");
    console.assert(end.indexOf("市") != -1, "地点格式不对");
    start = start.split("市").pop();
    end = end.split("市").pop();
    if (start === end) {
      return start;
    } else {
      return `${start}-${end}`;
    }
  }