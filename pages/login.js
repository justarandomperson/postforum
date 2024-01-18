import AuthForm from "@/components/auth/AuthForm";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

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
    const res = await signIn("credentials", {
      redirect: false,
      username: username,
      password: password,
    });
    setLoading(false);
    if (res.ok) {
      router.push("/");
    }
  };
  return (
    <AuthForm
      login={true}
      onSubmit={onSubmit}
      usernameRef={usernameRef}
      passwordRef={passwordRef}
      Loading={Loading}
    />
  );
}
