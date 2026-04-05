export type CategoryFilter = 'all' | 'healthTips' | 'recipes' | 'nutrition';

export const filterOptions: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'Բոլորը' },
  { id: 'healthTips', label: 'Առողջության խորհուրդներ' },
  { id: 'recipes', label: 'Արտադրանքի ուղեցույցներ' },
  { id: 'nutrition', label: 'Բաղադրիչներ' },
];
