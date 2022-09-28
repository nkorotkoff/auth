import { useContext, useEffect, useState } from "react";
import { getAuthUser } from "../api/api";
import { AuthContext } from "../AuthContext/AuthContext";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const { user, updateAuthUser } = useContext(AuthContext);
  useEffect(() => {
    getAuthUser()
      .then(({ data }) => {
        console.log(data);
        updateAuthUser(data);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err: Error) => {
        console.log(err);
        setTimeout(() => setLoading(false), 1000);
      });
  }, []);

  return { user, loading };
}
