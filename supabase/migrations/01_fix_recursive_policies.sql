
-- First, create a security definer function to safely check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the policy for products to use the new function instead of directly querying profiles
DROP POLICY IF EXISTS "Only admins can insert products" ON products;
CREATE POLICY "Only admins can insert products"
  ON products FOR INSERT
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Only admins can update products" ON products;
CREATE POLICY "Only admins can update products"
  ON products FOR UPDATE
  USING (public.is_admin());

DROP POLICY IF EXISTS "Only admins can delete products" ON products;
CREATE POLICY "Only admins can delete products"
  ON products FOR DELETE
  USING (public.is_admin());

-- Also fix the same issue for any other tables with admin-only policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  USING (public.is_admin());

-- Make sure profiles has a basic policy for users to view their own profile
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
