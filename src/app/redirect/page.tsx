"use client";
import {useRouter} from "next/navigation";
// TODO add redirect logic like checking auth etc
import React, {useEffect} from "react";
import LoadingPage from "../loading";

function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);
  return (
    <div>
      <LoadingPage />
    </div>
  );
}

export default Page;
