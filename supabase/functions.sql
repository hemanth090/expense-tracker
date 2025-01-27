-- Function to drop the expenses table
CREATE OR REPLACE FUNCTION drop_expenses_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DROP TABLE IF EXISTS public.expenses CASCADE;
END;
$$;

-- Function to create the expenses table with the new schema
CREATE OR REPLACE FUNCTION create_expenses_table()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create the expenses table
  CREATE TABLE public.expenses (
      id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      description TEXT NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      category TEXT NOT NULL,
      date DATE NOT NULL DEFAULT CURRENT_DATE,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Enable Row Level Security (RLS)
  ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

  -- Create policy to allow users to select their own expenses
  CREATE POLICY "Users can view their own expenses"
      ON public.expenses
      FOR SELECT
      USING (auth.uid() = user_id);

  -- Create policy to allow users to insert their own expenses
  CREATE POLICY "Users can insert their own expenses"
      ON public.expenses
      FOR INSERT
      WITH CHECK (auth.uid() = user_id);

  -- Create policy to allow users to update their own expenses
  CREATE POLICY "Users can update their own expenses"
      ON public.expenses
      FOR UPDATE
      USING (auth.uid() = user_id);

  -- Create policy to allow users to delete their own expenses
  CREATE POLICY "Users can delete their own expenses"
      ON public.expenses
      FOR DELETE
      USING (auth.uid() = user_id);

  -- Create an index on user_id for better query performance
  CREATE INDEX expenses_user_id_idx ON public.expenses(user_id);

  -- Create a trigger to automatically update the updated_at column
  CREATE TRIGGER update_expenses_updated_at
      BEFORE UPDATE ON public.expenses
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
END;
$$;
