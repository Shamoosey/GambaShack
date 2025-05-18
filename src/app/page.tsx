import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LogoutButton";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  // Redirect if no user is found (this is a backup to your middleware protection)
  if (!data.user) {
    redirect("/login");
  }

  return (
    <div>
      <Navbar/>
      Hello {data.user?.email}
      <br/>
      <LogoutButton />
    </div>
  );
}
