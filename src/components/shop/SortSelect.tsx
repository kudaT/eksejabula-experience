
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SortSelectProps {
  sortOption: string;
  onSortChange: (value: string) => void;
}

export const SortSelect = ({ sortOption, onSortChange }: SortSelectProps) => {
  return (
    <Select 
      value={sortOption} 
      onValueChange={onSortChange}
    >
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="popular">Popular</SelectItem>
        <SelectItem value="price-low">Price: Low to High</SelectItem>
        <SelectItem value="price-high">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
};
