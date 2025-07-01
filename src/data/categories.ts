
import { IncomeCategory, ExpenseCategory } from '@/types';

export const incomeCategories: IncomeCategory[] = [
  {
    id: 'dive-courses',
    name: 'Dive Courses',
    subcategories: ['Open Water', 'Advanced Open Water', 'Rescue Diver', 'Divemaster', 'Instructor', 'Specialty Courses']
  },
  {
    id: 'equipment-rental',
    name: 'Equipment Rental',
    subcategories: ['Full Gear', 'BCD', 'Regulator', 'Wetsuit', 'Mask & Fins', 'Camera']
  },
  {
    id: 'diving-trips',
    name: 'Diving Trips',
    subcategories: ['Daily Boat Diving', 'Beach Dive', 'Boat Intro', 'Beach Intro', 'Snorkeling']
  },
  {
    id: 'merchandise',
    name: 'Merchandise',
    subcategories: ['T-Shirts', 'Dive Gear', 'Accessories', 'Books', 'DVDs']
  },
  {
    id: 'services',
    name: 'Services',
    subcategories: ['Nitrox', 'Transfer', 'Camera Services', 'Equipment Service']
  },
  {
    id: 'other',
    name: 'Other Income',
    subcategories: ['Miscellaneous', 'Refunds', 'Late Fees']
  }
];

export const expenseCategories: ExpenseCategory[] = [
  {
    id: 'staff',
    name: 'Staff Expenses',
    subcategories: ['Salaries', 'Benefits', 'Training', 'Bonuses', 'Travel Allowance']
  },
  {
    id: 'equipment',
    name: 'Equipment',
    subcategories: ['Tank Filling', 'Equipment Maintenance', 'New Equipment', 'Repairs', 'Replacement Parts']
  },
  {
    id: 'utilities',
    name: 'Utilities',
    subcategories: ['Electricity', 'Water', 'Internet', 'Phone', 'Gas']
  },
  {
    id: 'facility',
    name: 'Facility',
    subcategories: ['Rent', 'Maintenance', 'Insurance', 'Security', 'Cleaning']
  },
  {
    id: 'supplies',
    name: 'Supplies',
    subcategories: ['Office Supplies', 'Cleaning Supplies', 'Safety Equipment', 'First Aid']
  },
  {
    id: 'marketing',
    name: 'Marketing',
    subcategories: ['Advertising', 'Website', 'Social Media', 'Brochures', 'Events']
  },
  {
    id: 'other',
    name: 'Other Expenses',
    subcategories: ['Miscellaneous', 'Bank Fees', 'Legal', 'Taxes']
  }
];
