import Link from "next/link";
import {useRouter} from "next/router";
import {signOut} from "next-auth/react";
import Logo from "@/components/Logo";

export default function Nav({show}) {
  const inactiveLink = 'flex gap-1 p-1';
  const activeLink = inactiveLink+' bg-highlight text-black rounded-sm';
  const inactiveIcon = 'w-6 h-6';
  const activeIcon = inactiveIcon + ' text-primary';
  const router = useRouter();
  const {pathname} = router;
  async function logout() {
    await router.push('/');
    await signOut();
  }
  return (
    <aside className={(show?'left-0':'-left-full')+" top-0 text-gray-500 p-4 fixed w-full bg-bgGray h-full md:static md:w-auto transition-all"}>
      <div className="mb-4 mr-4">
        <Logo />
      </div>
      <nav className="flex flex-col gap-2">
        <Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname === '/' ? activeIcon : inactiveIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Главная
        </Link>
        <Link href={'/products'} className={pathname.includes('/products') ? activeLink : inactiveLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('/products') ? activeIcon : inactiveIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          Товары
        </Link>
        <Link href={'/news'} className={pathname.includes('/news') ? activeLink : inactiveLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 122.88 101.16" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('/news') ? activeIcon : inactiveIcon}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M35.34,16.5h72.75v30.73l-72.75,0V16.5L35.34,16.5z M23.42,91.7c-0.67,2.24-1.63,4.05-2.8,5.46l88.47,0l0.04,0 c3.19-0.18,5.57-1.03,7.16-2.54c1.56-1.48,2.43-3.69,2.62-6.62V3.97H24.36v80.06C24.36,87.43,24.4,88.42,23.42,91.7L23.42,91.7 L23.42,91.7z M13.15,101.13c-0.45,0.03-0.91,0.03-1.36,0.01c-1.82-0.11-3.61-0.67-5.23-1.62c-3.55-2.09-6.29-6.09-6.54-11.32 C0.01,88.12,0,88.03,0,87.95v-70.4c0-1.1,0.89-1.98,1.98-1.98l18.41,0V1.98c0-1.1,0.89-1.98,1.98-1.98l98.52,0 c1.1,0,1.98,0.89,1.98,1.98v86.07c0,0.11-0.01,0.21-0.02,0.31c-0.27,3.9-1.55,6.95-3.84,9.13c-2.28,2.17-5.5,3.38-9.67,3.62 c-0.08,0.01-0.17,0.02-0.26,0.02L13.15,101.13L13.15,101.13L13.15,101.13z M12.05,97.19c0.1-0.02,0.21-0.03,0.32-0.03h0.72 c0.79-0.08,1.56-0.3,2.28-0.68c4.41-2.31,5.02-7.95,5.02-12.42V19.53H3.97v68.41c0,0.02,0,0.05,0,0.07 c0.19,3.76,2.12,6.62,4.61,8.09c1.08,0.64,2.26,1.01,3.43,1.08L12.05,97.19L12.05,97.19L12.05,97.19z M40.87,24.15h3.9l5.07,8.52 v-8.52h3.94v15.42l-3.94,0l-5.04-8.47v8.47h-3.92V24.15L40.87,24.15z M57.21,24.15h11.17v3.3l-6.98,0v2.46l6.47,0v3.14H61.4v3.04 h7.19v3.49H57.21V24.15L57.21,24.15L57.21,24.15z M70.12,24.15h3.96l1.42,8.61l2.09-8.61h3.93l2.1,8.62l1.43-8.62H89l-2.98,15.42 l-4.09,0l-2.37-9.71l-2.36,9.71h-4.09L70.12,24.15L70.12,24.15L70.12,24.15z M90.31,34.48l3.96-0.28c0.08,0.73,0.26,1.29,0.52,1.67 c0.43,0.62,1.04,0.93,1.84,0.93c0.59,0,1.05-0.16,1.37-0.48c0.32-0.32,0.48-0.69,0.48-1.11c0-0.4-0.15-0.76-0.46-1.07 c-0.3-0.32-1.02-0.61-2.13-0.89c-1.83-0.47-3.13-1.09-3.91-1.87c-0.79-0.78-1.18-1.77-1.18-2.97c0-0.79,0.2-1.54,0.6-2.24 c0.4-0.71,1.01-1.26,1.81-1.66c0.81-0.4,1.92-0.6,3.32-0.6c1.73,0,3.04,0.37,3.95,1.1c0.91,0.73,1.44,1.9,1.62,3.5l-3.92,0.27 c-0.1-0.7-0.32-1.21-0.66-1.53c-0.34-0.32-0.8-0.48-1.39-0.48c-0.48,0-0.85,0.12-1.1,0.35c-0.25,0.23-0.37,0.52-0.37,0.86 c0,0.24,0.1,0.46,0.3,0.66c0.19,0.2,0.66,0.39,1.39,0.57c1.82,0.45,3.13,0.9,3.91,1.36c0.79,0.46,1.36,1.03,1.72,1.71 c0.36,0.68,0.54,1.44,0.54,2.28c0,0.99-0.24,1.9-0.72,2.74c-0.48,0.83-1.15,1.47-2.01,1.9c-0.86,0.43-1.94,0.65-3.25,0.65 c-2.3,0-3.89-0.51-4.77-1.52C90.93,37.31,90.43,36.03,90.31,34.48L90.31,34.48L90.31,34.48z M35.8,60.85 c-1.1,0-1.98-0.89-1.98-1.98s0.89-1.98,1.98-1.98h30.25c1.09,0,1.98,0.89,1.98,1.98s-0.89,1.98-1.98,1.98H35.8L35.8,60.85z M74.73,60.85c-1.1,0-1.99-0.89-1.99-1.99c0-1.1,0.89-1.99,1.99-1.99h32.63c1.1,0,1.99,0.89,1.99,1.99c0,1.1-0.89,1.99-1.99,1.99 H74.73L74.73,60.85z M74.73,72.36c-1.1,0-1.99-0.89-1.99-1.99s0.89-1.99,1.99-1.99h32.63c1.1,0,1.99,0.89,1.99,1.99 c0,1.1-0.89,1.99-1.99,1.99H74.73L74.73,72.36z M74.73,83.87c-1.1,0-1.99-0.89-1.99-1.99s0.89-1.99,1.99-1.99l32.63,0 c1.1,0,1.99,0.89,1.99,1.99c0,1.1-0.89,1.99-1.99,1.99L74.73,83.87L74.73,83.87z M35.8,83.87c-1.1,0-1.98-0.89-1.98-1.98 s0.89-1.98,1.98-1.98l30.25,0c1.09,0,1.98,0.89,1.98,1.98s-0.89,1.98-1.98,1.98L35.8,83.87L35.8,83.87z M36.76,72.36 c-1.1,0-1.98-0.89-1.98-1.98s0.89-1.98,1.98-1.98h30.25c1.1,0,1.98,0.89,1.98,1.98s-0.89,1.98-1.98,1.98H36.76L36.76,72.36z" />      </svg>
          Новости 
        </Link>
        <Link href={'/categories'} className={pathname.includes('/categories') ? activeLink : inactiveLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('/categories') ? activeIcon : inactiveIcon}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        Категории
        </Link>
        <Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('/orders') ? activeIcon : inactiveIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
          </svg>
          Заказы
        </Link>
        {/* <Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('/settings') ? activeIcon : inactiveIcon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </Link> */}
        <button onClick={logout} className={inactiveLink}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Выйти
        </button>
      </nav>
    </aside>
  );
}