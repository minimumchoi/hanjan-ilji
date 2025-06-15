import { SVGIcon } from "@/components/SVGIcon";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();
  const currentMonth = new Date().getMonth();

  const navItems: { name: string; label: string; href: string }[] = [
    { name: "home", label: "홈", href: "/home" },
    {
      name: "calendar",
      label: "달력",
      href: `/calendar?month=${currentMonth}`,
    },
    { name: "food", label: "안주", href: "/food" },
    { name: "beer", label: "마이페이지", href: "/mypage" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 z-50 h-[3.75rem] w-full max-w-[430px] bg-white"
      aria-label="하단메뉴"
    >
      <ul className="flex h-full w-full flex-row">
        {navItems.map((item) => {
          const isCurrent = router.pathname === item.href;

          return (
            <li key={item.name} className="group flex-1">
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={isCurrent ? "page" : undefined}
                className="flex h-full w-full flex-col items-center justify-center"
              >
                <SVGIcon
                  name={item.name}
                  size={30}
                  className={`transition-colors duration-200 ${
                    isCurrent
                      ? "text-primary"
                      : "group-hover:text-primary text-gray-300"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
