export interface DemoItem {
  value: number;
  title: string;
}
const start = 1990;
const years: DemoItem[] = [];
for (let i = 0; i < 100; i++) {
  years.push({
    value: start + i,
    title: `${start + i}`,
  });
}
const dayStart = 1;
const days: DemoItem[] = [];
for (let i = 0; i < 30; i++) {
  days.push({
    value: dayStart + i,
    title: `${dayStart + i}`,
  });
}

const months: DemoItem[] = [
  { value: 1, title: 'January' },
  { value: 2, title: 'February' },
  { value: 3, title: 'March' },
  { value: 4, title: 'April' },
  { value: 5, title: 'May' },
  { value: 6, title: 'June' },
  { value: 7, title: 'July' },
  { value: 8, title: 'August' },
  { value: 9, title: 'September' },
  { value: 10, title: 'October' },
  { value: 11, title: 'November' },
  { value: 12, title: 'December' },
];
export { years, days, months };
