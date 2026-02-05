import { ShoppingBag, IndianRupee, BookOpen, Grid, Plus, Table, ClipboardList } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#05080f] via-[#0b1220] to-[#05080f] text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-[#070d1a] border-r border-white/5 p-6 flex flex-col">
        <h1 className="text-xl font-semibold text-blue-400 mb-8">TasteBox</h1>
        <nav className="space-y-4 text-sm flex-1">
          {["Dashboard", "Menu", "Orders", "Tables", "Coupons"].map(item => (
            <div
              key={item}
              className={`cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-500/10 ${item === "Dashboard" ? "bg-blue-500/10 text-blue-400" : "text-white/80"}`}
            >
              {item}
            </div>
          ))}
        </nav>
        <button className="text-red-400 text-sm mt-6">Logout</button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-white/60 mb-6">Overview of your restaurant performance</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Orders" value="1,248" icon={<ShoppingBag />} />
          <StatCard title="Revenue" value="₹4,0000" icon={<IndianRupee />} />
          <StatCard title="Menu Items" value="36" icon={<BookOpen />} />
          <StatCard title="Active Tables" value="5" icon={<Grid />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-[#0b1220] rounded-xl border border-white/5 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Recent Orders</h3>
              <span className="text-blue-400 text-sm cursor-pointer">View All →</span>
            </div>

            <table className="w-full text-sm">
              <thead className="text-white/60 border-b border-white/5">
                <tr>
                  <th className="text-left py-3">Order ID</th>
                  <th className="text-left">Customer</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <OrderRow id="#ORD-1023" cust="Table 4" amt="₹600" status="Completed" color="green" />
                <OrderRow id="#ORD-1024" cust="Table 2" amt="₹350" status="Pending" color="yellow" />
                <OrderRow id="#ORD-1025" cust="Online" amt="₹1160" status="Preparing" color="blue" />
              </tbody>
            </table>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#0b1220] rounded-xl border border-white/5 p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <ActionButton icon={<Plus />} text="Add New Menu Item" />
            <ActionButton icon={<ClipboardList />} text="Manage Orders" />
            <ActionButton icon={<Table />} text="Manage Tables" />
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-[#0b1220] rounded-xl border border-white/5 p-6 flex justify-between items-center">
      <div>
        <p className="text-white/60 text-sm">{title}</p>
        <p className="text-xl font-semibold mt-1">{value}</p>
      </div>
      <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">{icon}</div>
    </div>
  )
}

function OrderRow({ id, cust, amt, status, color }) {
  const colors = {
    green: "bg-green-500/10 text-green-400",
    yellow: "bg-yellow-500/10 text-yellow-400",
    blue: "bg-blue-500/10 text-blue-400",
  }

  return (
    <tr className="border-b border-white/5 last:border-none">
      <td className="py-3">{id}</td>
      <td>{cust}</td>
      <td>{amt}</td>
      <td>
        <span className={`px-3 py-1 rounded-full text-xs ${colors[color]}`}>
          {status}
        </span>
      </td>
    </tr>
  )
}

function ActionButton({ icon, text }) {
  return (
    <button className="w-full flex justify-between items-center px-4 py-3 mb-3 rounded-lg bg-[#070d1a] hover:bg-blue-500/10 transition">
      <span className="flex items-center gap-2 text-sm">{icon}{text}</span>
      →
    </button>
  )
}