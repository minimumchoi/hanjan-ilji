import Button from "@/components/Button";
import { SVGIcon } from "@/components/SVGIcon";
import { createClient } from "@/utils/supabase/server-props";
import type { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const supabase = createClient(context);

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (user) {
//     return {
//       redirect: {
//         destination: "/home",
//         permanent: false,
//       },
//     };
//   }

//   return { props: {} };
// }

export default function Landing({}) {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between px-9 py-[8vh]">
      <div className="mt-[24vh]">
        <span className="text-base font-semibold">
          적당히 즐기는 음주 습관 기록장
        </span>
        <div className="flex h-12 flex-row items-center gap-0.5">
          <h1 className="h-12 text-[2.5rem] font-bold">한잔일지</h1>
          <SVGIcon name="beerCheers" size={60} />
        </div>
      </div>
      <div className="flex w-full flex-col gap-3.5">
        <Button color="primary" onClick={() => router.push("/login")}>
          로그인
        </Button>
        <Button color="accent" onClick={() => router.push("/signup")}>
          회원가입
        </Button>
      </div>
    </div>
  );
}
