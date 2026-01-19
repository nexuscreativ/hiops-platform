import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserAccount } from "@/components/user-account"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function SiteHeader() {
  // Fetch dynamic settings and nav
  const session = await getServerSession(authOptions)
  const settings = await prisma.siteSetting.findMany()
  const navItems = await prisma.navigationItem.findMany({
    where: { group: "HEADER" },
    orderBy: { order: "asc" }
  })

  const settingsMap = settings.reduce((acc: any, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {})

  const siteName = settingsMap.siteName || "HIOPS"

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={navItems} siteName={siteName} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {!session ? (
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "text-primary font-bold hover:bg-primary/5 rounded-xl hidden md:flex",
                })}
              >
                Personnel Login
              </Link>
            ) : (
              <UserAccount />
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
