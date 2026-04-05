export type CategoryFilter = 'all' | 'healthTips' | 'recipes' | 'nutrition';

export const filterOptions: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'blogPage.filters.all' },
  { id: 'healthTips', label: 'blogPage.filters.healthTips' },
  { id: 'recipes', label: 'blogPage.filters.recipes' },
  { id: 'nutrition', label: 'blogPage.filters.nutrition' },
];
