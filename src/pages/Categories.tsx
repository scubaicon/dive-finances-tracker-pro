
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { incomeCategories, expenseCategories } from '@/data/categories';
import { IncomeCategory, ExpenseCategory } from '@/types';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Categories: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'income' | 'expense'>('income');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [addingCategory, setAddingCategory] = useState(false);

  const [localIncomeCategories, setLocalIncomeCategories] = useState<IncomeCategory[]>(incomeCategories);
  const [localExpenseCategories, setLocalExpenseCategories] = useState<ExpenseCategory[]>(expenseCategories);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    const newCategory = {
      id: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
      name: newCategoryName,
      subcategories: []
    };

    if (activeTab === 'income') {
      setLocalIncomeCategories([...localIncomeCategories, newCategory]);
    } else {
      setLocalExpenseCategories([...localExpenseCategories, newCategory]);
    }

    setNewCategoryName('');
    setAddingCategory(false);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      if (activeTab === 'income') {
        setLocalIncomeCategories(localIncomeCategories.filter(cat => cat.id !== categoryId));
      } else {
        setLocalExpenseCategories(localExpenseCategories.filter(cat => cat.id !== categoryId));
      }
    }
  };

  const handleAddSubcategory = (categoryId: string) => {
    if (!newSubcategory.trim()) return;

    if (activeTab === 'income') {
      setLocalIncomeCategories(localIncomeCategories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, subcategories: [...cat.subcategories, newSubcategory] }
          : cat
      ));
    } else {
      setLocalExpenseCategories(localExpenseCategories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, subcategories: [...cat.subcategories, newSubcategory] }
          : cat
      ));
    }

    setNewSubcategory('');
    setEditingCategory(null);
  };

  const handleDeleteSubcategory = (categoryId: string, subcategoryIndex: number) => {
    if (activeTab === 'income') {
      setLocalIncomeCategories(localIncomeCategories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, subcategories: cat.subcategories.filter((_, index) => index !== subcategoryIndex) }
          : cat
      ));
    } else {
      setLocalExpenseCategories(localExpenseCategories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, subcategories: cat.subcategories.filter((_, index) => index !== subcategoryIndex) }
          : cat
      ));
    }
  };

  const currentCategories = activeTab === 'income' ? localIncomeCategories : localExpenseCategories;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="dive-card p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Categories</h1>
        <p className="text-gray-600">Configure income and expense categories for better financial tracking</p>
      </div>

      {/* Tab Navigation */}
      <div className="dive-card">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('income')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'income'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Income Categories ({localIncomeCategories.length})
            </button>
            <button
              onClick={() => setActiveTab('expense')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'expense'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Expense Categories ({localExpenseCategories.length})
            </button>
          </nav>
        </div>

        {/* Add New Category */}
        <div className="p-6 border-b border-gray-200">
          {!addingCategory ? (
            <Button onClick={() => setAddingCategory(true)} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add New {activeTab === 'income' ? 'Income' : 'Expense'} Category</span>
            </Button>
          ) : (
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md"
              />
              <Button onClick={handleAddCategory} size="sm">
                Add
              </Button>
              <Button onClick={() => {
                setAddingCategory(false);
                setNewCategoryName('');
              }} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Categories List */}
        <div className="p-6">
          <div className="space-y-4">
            {currentCategories.map((category) => (
              <Card key={category.id} className="border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => setEditingCategory(editingCategory === category.id ? null : category.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteCategory(category.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Subcategories */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Subcategories:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {category.subcategories.map((subcategory, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm">{subcategory}</span>
                          <button
                            onClick={() => handleDeleteSubcategory(category.id, index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Subcategory */}
                    {editingCategory === category.id && (
                      <div className="mt-3 flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Add subcategory"
                          value={newSubcategory}
                          onChange={(e) => setNewSubcategory(e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                        />
                        <Button 
                          onClick={() => handleAddSubcategory(category.id)}
                          size="sm"
                        >
                          Add
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <Card className="dive-card">
        <CardHeader>
          <CardTitle>Category Usage Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>Category usage statistics will be available once transactions are recorded.</p>
            <p className="text-sm mt-2">This will show which categories are most frequently used.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Categories;
