import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import AddData from "@/pages/AddData";
import RelationshipView from "@/pages/RelationshipView";

/* Simple Navbar */
function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold text-blue-400">
        CampusIQ
      </h1>

      <div className="flex gap-6 text-sm">
        <a href="/" className="hover:text-blue-400">Dashboard</a>
        <a href="/add" className="hover:text-blue-400">Add Data</a>
      </div>
    </nav>
  );
}

/* Router */
function Router() {
  return (
    <Switch>

      <Route path="/">
        <Dashboard />
      </Route>

      <Route path="/add">
        <AddData />
      </Route>

      <Route path="/student/:id">
        <RelationshipView />
      </Route>

      <Route>
        <NotFound />
      </Route>

    </Switch>
  );
}

/* Main App */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>

        <div className="min-h-screen bg-slate-950 text-white">

          <Navbar />

          <main className="p-6 max-w-7xl mx-auto">
            <Router />
          </main>

        </div>

        <Toaster />

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;