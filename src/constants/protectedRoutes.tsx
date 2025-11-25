import DashboardPage from "../pages/DashboardPage";
import DepositPage from "../pages/DepositPage";
import WithdrawPage from "../pages/WithdrawPage";
import HistoryPage from "../pages/HistoryPage";
import WatchlistPage from "../pages/WatchlistPage";
import SettingsPage from "../pages/SettingsPage";

export const protectedRoutes = [
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/deposit", element: <DepositPage /> },
  { path: "/withdraw", element: <WithdrawPage /> },
  { path: "/history", element: <HistoryPage /> },
  { path: "/watchlist", element: <WatchlistPage /> },
  { path: "/settings", element: <SettingsPage /> },
];