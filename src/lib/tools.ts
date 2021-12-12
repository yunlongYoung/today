export function getDateStr(): string {
  let dt = new Date();
  return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
}
export function compareDateDesc(a: { date: string }, b: { date: string }): number {
  const dateA = a.date;
  const dateB = b.date;

  let comparison = 0;
  if (dateA > dateB) {
    comparison = -1;
  } else if (dateA < dateB) {
    comparison = 1;
  }
  return comparison;
}
export function compareTimeDesc(a: { start_time: string }, b: { start_time: string }): number {
  const timea = a.start_time;
  const timeb = b.start_time;

  let comparison = 0;
  if (timea > timeb) {
    comparison = -1;
  } else if (timea < timeb) {
    comparison = 1;
  }
  return comparison;
}
export function merge_date(start: string, end: string): string {
  //要确保日期的字符串确实是这种格式的，否则就throw错误
  console.assert(start.slice(4, 5) === "-", "日期格式不对");
  console.assert(start.slice(7, 8) === "-", "日期格式不对");
  console.assert(end.slice(4, 5) === "-", "日期格式不对");
  console.assert(end.slice(7, 8) === "-", "日期格式不对");
  start = start.slice(5, 10);
  end = end.slice(5, 10);
  if (start === end) {
    return start;
  } else {
    return `${start}至${end}`;
  }
}
export function condense_location(place: string): string {
  if (place.startsWith('甘肃省')) {
    place = place.substr(3)
  }
  if (place.startsWith('陇南市')) {
    place = place.substr(3)
  }
  return place;
}
export function get_index(family: Array<object>, id: string) {
  for (let index in family) {
    if (family[index]['id'] == id) { return Number(index) }
  }
}