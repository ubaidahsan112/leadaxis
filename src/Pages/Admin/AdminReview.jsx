import { MessageSquare, Star } from "lucide-react";

import AdminSidebar from "../../Components/AdminSidebar";

const AdminReview = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#080a08] dark:text-white">
      <AdminSidebar />

      <div className="lg:pl-[260px]">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#080a08]/90">
          <div className="flex min-h-20 items-center px-5 py-3 sm:px-8">
            <div className="pl-12 lg:pl-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-600 dark:text-lime-300">
                LeadAxis
              </p>

              <h1 className="mt-0.5 text-xl font-bold sm:text-2xl">
                Reviews
              </h1>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-5 py-7 sm:px-8 sm:py-9">
          {/* Heading */}
          <section className="mb-7">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage customer feedback and reviews.
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Customer Reviews
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              Reviews will be displayed here once the
              LeadAxis review system is connected to the
              database.
            </p>
          </section>

          {/* Empty State */}
          <section className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 text-center shadow-sm dark:border-white/10 dark:bg-[#101310]">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-lime-100 text-lime-700 dark:bg-lime-300/10 dark:text-lime-300">
              <MessageSquare size={34} />
            </div>

            <h3 className="mt-6 text-xl font-bold">
              No reviews yet
            </h3>

            <p className="mt-3 max-w-lg text-sm leading-7 text-gray-500 dark:text-gray-400">
              There are currently no reviews stored in
              the system. Once your website review form
              and reviews database are connected, real
              customer reviews will appear here.
            </p>

            <div className="mt-7 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs font-medium text-gray-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400">
              <Star size={15} />
              Review system not connected
            </div>
          </section>

          <footer className="mt-8 pb-4 text-center text-xs text-gray-400">
            LeadAxis Admin Panel
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminReview;