
import { Button } from '@/components/ui/button';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="md:hidden mb-6 animate-slide-up">
      <div className="overflow-x-auto pb-2 flex space-x-2">
        <Button
          variant={activeCategory === 'all' ? 'default' : 'outline'}
          onClick={() => onCategoryChange('all')}
          className="rounded-full flex-shrink-0"
        >
          All
        </Button>
        <Button
          variant={activeCategory === 'jerseys' ? 'default' : 'outline'}
          onClick={() => onCategoryChange('jerseys')}
          className="rounded-full flex-shrink-0"
        >
          Jerseys
        </Button>
        <Button
          variant={activeCategory === 'beanies' ? 'default' : 'outline'}
          onClick={() => onCategoryChange('beanies')}
          className="rounded-full flex-shrink-0"
        >
          Beanies
        </Button>
        <Button
          variant={activeCategory === 'art' ? 'default' : 'outline'}
          onClick={() => onCategoryChange('art')}
          className="rounded-full flex-shrink-0"
        >
          Art
        </Button>
      </div>
    </div>
  );
};
