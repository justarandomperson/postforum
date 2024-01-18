import AuthForm from "@/components/auth/AuthForm";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    setLoading(true);
    const res = await fetch(`/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(false);
    if (res.ok) {
      router.push("/login");
    }
  };
  return (
    <AuthForm
      login={false}
      onSubmit={onSubmit}
      usernameRef={usernameRef}
      passwordRef={passwordRef}
      Loading={Loading}
    />
  );
}
