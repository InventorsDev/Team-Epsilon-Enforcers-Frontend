import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type {
  SupabaseClient,
  User,
  AuthChangeEvent,
} from "@supabase/supabase-js";
import { supabase } from "@/supabaseClient";

type AuthContextValue = {
  user: User | null;
  supabase: SupabaseClient;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const initializeSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          // eslint-disable-next-line no-console
          console.error("Error getting session:", error.message);
        }
        if (!isMounted) return;
        setUser(data.session?.user ?? null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initializeSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session:any) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, supabase, isLoading }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


