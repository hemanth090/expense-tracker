import { supabase } from './supabaseClient';

async function setupDatabase() {
  try {
    // Drop the existing expenses table
    await supabase.rpc('drop_expenses_table', {});

    // Create the new expenses table with updated schema
    const { error } = await supabase
      .from('expenses')
      .insert([
        {
          description: 'Initial test expense',
          amount: 0,
          category: 'Other',
          date: new Date().toISOString().split('T')[0]
        }
      ]);

    if (error) {
      // If table doesn't exist, create it
      await supabase.rpc('create_expenses_table', {});
    }

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

export { setupDatabase };
