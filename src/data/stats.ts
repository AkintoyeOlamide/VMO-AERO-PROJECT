export interface Stat {
  id: number;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export const stats: Stat[] = [
  {
    id: 1,
    value: 1067,
    label: "Flights Coordinated",
    prefix: "",
    suffix: "+"
  },
  {
    id: 2,
    value: 100,
    label: "Destinations Covered",
    prefix: "",
    suffix: "+"
  },
  {
    id: 3,
    value: 300,
    label: "Clients Managed",
    prefix: "",
    suffix: "+"
  }
];