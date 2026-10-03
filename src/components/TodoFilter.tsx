import type { FilterType } from "../types/todo";

type Props = {
  selectedFilter: FilterType["value"];
  onFilterChange: (filter: FilterType["value"]) => void;
};

const filterItems: FilterType[] = [
  {
    id: "1",
    value: "all",
  },
  {
    id: "2",
    value: "active",
  },
  {
    id: "3",
    value: "completed",
  },
];

export default function TodoFilter({ selectedFilter, onFilterChange }: Props) {
  return (
    <div>
      <select
        value={selectedFilter}
        onChange={(e) => {
          onFilterChange(e.currentTarget.value);
        }}
        style={{
          width: 120,
        }}
      >
        {filterItems.map((item) => (
          <option key={item.id} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
    </div>
  );
}
